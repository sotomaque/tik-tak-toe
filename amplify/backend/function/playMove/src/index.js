/* Amplify Params - DO NOT EDIT
	API_TIKTAKTOE_GRAPHQLAPIENDPOINTOUTPUT
	API_TIKTAKTOE_GRAPHQLAPIIDOUTPUT
	API_TIKTAKTOE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const appsync = require('aws-appsync');
const gql = require('graphql-tag');
require('cross-fetch/polyfill');

const isTerminal = require('./isTerminal');

exports.handler = async (event, context, callback) => {
  const graphqlClient = new appsync.AWSAppSyncClient({
    url: process.env.API_TIKTAKTOE_GRAPHQLAPIENDPOINTOUTPUT,
    region: process.env.REGION,
    auth: {
      type: 'AWS_IAM',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
    },
    disableOffline: true,
  });

  const player = event.identity.username;
  const gameId = event.arguments.game;
  const index = event.arguments.index;

  // 1. get game object + validation
  const query = gql`
    query getGame($id: ID!) {
      getGame(id: $id) {
        id
        turn
        state
        status
        winner
        owners
        initiator
      }
    }
  `;
  let game;
  try {
    const gameResponse = await graphqlClient.query({
      query,
      variables: {
        id: gameId,
      },
    });
    game = gameResponse.data.getGame;
    if (!game) {
      throw new Error('Game not found!');
    }
    // 1.2. ensure game is active
    if (game.status !== 'REQUESTED' && game.status !== 'ACTIVE') {
      throw new Error('Game is not active!');
    }
    // 1.3. check that the current user is a participant in the game & it is that players turn
    if (!game.owners.includes(player)) {
      throw new Error('Logged in player is not participating in this game!');
    }
    // 1.4. ensure its the current users turn
    if (game.turn !== player) {
      throw new Error('Not your turn!');
    }
    // 1.5  ensure index is valid (not > 8 && not occupied)
    if (index > 8 || game.state[index]) {
      throw new Error('Invalid Move');
    }
  } catch (error) {
    callback(error);
  }
  // 2. update state, check if move is a terminal one & update winner, status, and turn
  const mutation = gql`
    mutation updateGame(
      $id: ID!
      $turn: String!
      $winner: String
      $status: GameStatus!
      $state: [Symbol]!
      $player: String
    ) {
      updateGame(
        input: {
          id: $id
          turn: $turn
          winner: $winner
          status: $status
          state: $state
        }
        condition: { turn: { eq: $player } }
      ) {
        id
        turn
        winner
        status
        state
      }
    }
  `;
  const symbol = player === game.initiator ? 'x' : 'o';
  const nextTurn = game.owners.find(p => p !== game.turn);
  const invitee = game.owners.find(p => p !== game.initiator);
  const newState = [...game.state];
  newState[index] = symbol;

  let newStatus = 'ACTIVE';
  let newWinner = null;

  const terminalState = isTerminal(newState);

  if (terminalState) {
    newStatus = 'FINISHED';
    if (terminalState.winner === 'x') {
      newWinner = game.initiator;
    } else if (terminalState.winner === 'o') {
      newWinner = invitee;
    }
  }

  let updateGameResponse;
  try {
    updateGameResponse = await graphqlClient.mutate({
      mutation,
      variables: {
        id: gameId,
        turn: nextTurn,
        winner: newWinner,
        status: newStatus,
        state: newState,
        player: player,
      },
    });
  } catch (error) {
    callback(error);
  }

  // 3. return updated game
  return updateGameResponse.data.updateGame;
};
