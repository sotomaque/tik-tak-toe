import gql from 'graphql-tag';

export const getPlayer = gql`
  query getPlayer(
    $username: String!
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    getPlayer(username: $username) {
      id
      games(
        limit: $limit
        nextToken: $nextToken
        sortDirection: $sortDirection
      ) {
        items {
          game {
            id
            initiator
            owners
            status
            winner
            players {
              items {
                player {
                  username
                  name
                }
              }
            }
          }
        }
        nextToken
      }
    }
  }
`;
