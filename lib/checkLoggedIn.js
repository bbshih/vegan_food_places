import gql from 'graphql-tag'

export default (context, apolloClient) =>
  apolloClient
    .query({
      query: gql`
        query getUser {
          user {
            id
            name
          }
        }
      `
    })
    .then(({ data }) => {
      console.log(`Data: ${data}`)
      
      return { loggedInUser: data }
    })
    .catch(() => {
      // Fail gracefully
      console.log('Data: FAILED!!')
      return { loggedInUser: {} }
    })
