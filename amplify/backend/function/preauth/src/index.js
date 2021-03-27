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

  const query = gql`
    query getPlayer($username: String!) {
      getPlayer(username: $username) {
        id
      }
    }
  `;

  const mutation = gql`
    mutation createPlayer(
      $name: String!
      $cognitoId: String!
      $username: String!
      $email: AWSEmail!
    ) {
      createPlayer(
        input: {
          cognitoId: $cognitoId
          email: $email
          name: $name
          username: $username
        }
      ) {
        id
      }
    }
  `;

  try {
    // find user in db
    const response = await graphqlClient.query({
      query,
      variables: {
        username: event.userName,
      },
    });
    // did find user case
    if (response.data.getPlayer) {
      callback(null, event);
    }
    // did not find user
    else {
      try {
        // create user
        await graphqlClient.mutate({
          mutation,
          variables: {
            name: event.request.userAttributes.name,
            username: event.userName,
            cognitoId: event.request.userAttributes.sub,
            email: event.request.userAttributes.email,
          },
        });
        callback(null, event);
      } catch (error) {
        // failed to create user
        callback(error);
      }
    }
  } catch (error) {
    // failed to query user
    callback(error);
  }
};
