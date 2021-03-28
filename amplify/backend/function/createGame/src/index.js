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
  const initiator = event.identity.username;
  const invitee = event.arguments.invitee;
  // 1. make sure both initiator and invitee exist
  const query = gql`
    query getPlayer($username: String!) {
      getPlayer(username: $username) {
        id
      }
    }
  `;
  try {
    // initiator
    const initiatorResponse = await graphqlClient.query({
      query,
      variables: {
        username: initiator,
      },
    });
    // invitee
    const iniviteeResponse = await graphqlClient.query({
      query,
      variables: {
        username: invitee,
      },
    });
    if (!initiatorResponse.data.getPlayer) {
      throw new Error('Initiator does not exist');
    } else if (!iniviteeResponse.data.getPlayer) {
      throw new Error('Invitee does not exist');
    } else if (
      initiatorResponse.data.getPlayer === iniviteeResponse.data.getPlayer
    ) {
      throw new Error('Player cannot invite themselves');
    }
  } catch (error) {
    callback(error);
  }
  // 2. create a new game
  const mutation = gql`
    mutation createGame(
      $status: GameStatus!
      $owners: [String!]!
      $initiator: String!
      $turn: String!
      $state: [Symbol]!
    ) {
      createGame(
        input: {
          status: $status
          owners: $owners
          initiator: $initiator
          turn: $turn
          state: $state
        }
      ) {
        id
        state
        status
        turn
        winner
      }
    }
  `;
  let gameResponse;
  try {
    gameResponse = await graphqlClient.mutate({
      mutation,
      variables: {
        status: 'REQUESTED',
        owners: [initiator, invitee],
        initiator: initiator,
        turn: Math.random() < 0.5 ? initiator : invitee,
        state: new Array(9).fill(null),
      },
    });
  } catch (error) {
    callback(error);
  }
  // 3. link the game with the players (using playerGame model)
  const playerGameMutation = gql`
    mutation createPlayerGame(
      $gameId: ID!
      $playerUsername: String!
      $owners: [String!]!
    ) {
      createPlayerGame(
        input: {
          gameId: $gameId
          playerUsername: $playerUsername
          owners: $owners
        }
      ) {
        id
      }
    }
  `;
  let initiatorPlayerGameResponse, inviteePlayerGameResponse;
  try {
    initiatorPlayerGameResponse = await graphqlClient.mutate({
      mutation: playerGameMutation,
      variables: {
        gameId: gameResponse.data.createGame.id,
        playerUsername: initiator,
        owners: [initiator, invitee],
      },
    });
    inviteePlayerGameResponse = await graphqlClient.mutate({
      mutation: playerGameMutation,
      variables: {
        gameId: gameResponse.data.createGame.id,
        playerUsername: invitee,
        owners: [invitee, initiator],
      },
    });
  } catch (error) {
    callback(error);
  }
  // 4. TODO: push notifications
  return {
    id: gameResponse.data.createGame.id,
    status: gameResponse.data.createGame.status,
    turn: gameResponse.data.createGame.turn,
    state: gameResponse.data.createGame.state,
    winner: gameResponse.data.createGame.winner,
  };
};
