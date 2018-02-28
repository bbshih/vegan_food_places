import gql from 'graphql-tag'

const allNeighborhoods = gql`
  query allNeighborhoods($first: Int!, $skip: Int!) {
    allNeighborhoods(orderBy: name_ASC, first: $first, skip: $skip) {
      id
      name
      restaurants {
        id
        name
        url
      }
    }
    _allNeighborhoodsMeta {
      count
    }
  }
`
export default allNeighborhoods
