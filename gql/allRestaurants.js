import {gql} from 'react-apollo'

const allRestaurants = gql`
  query allRestaurants($first: Int!, $skip: Int!) {
    allRestaurants(orderBy: name_ASC, first: $first, skip: $skip) {
      id
      name
      url
      neighborhoods {
        name
      }
    }
    _allRestaurantsMeta {
      count
    }
  }
`
export default allRestaurants
