import gql from 'graphql-tag'

const createRestaurant = gql`
  mutation createRestaurant(
    $name: String!
    $neighborhoodId: ID!
    $address1: String
    $address2: String
    $city: String
    $state: String
    $zipCode: String
    $url: String
  ) {
    createRestaurant(
      name: $name
      neighborhoodsIds: [$neighborhoodId]
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zipCode: $zipCode
      url: $url
    ) {
      id
      neighborhoods {
        id
        name
      }
      name
      address1
      address2
      city
      state
      zipCode
      url
    }
  }
`
export default createRestaurant
