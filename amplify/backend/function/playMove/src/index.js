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

exports.handler = async event => {
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

  // 1. get game object using id (ensure it exists)

  // 2. ensure game is active

  // 3. check that the current user is a participant in the game & it is that players turn

  // 4. ensure index is valid (not > 8 && not occupied)

  // 5. update state, check if move is a terminal one & update winner, status, and turn

  // 6. return updated game
};
