import {gql, graphql} from 'react-apollo'

const RESTAURANTS_PER_PAGE = 10

function getNeighborhoodNames(neighborhoods) {
  return neighborhoods.map(neighborhood => neighborhood.name).join(', ')
}
function RestaurantList({
  data: {loading, error, allRestaurants, _allRestaurantsMeta},
  loadMoreRestaurants
}) {
  if (error) return <div>{console.log(error)}</div>
  if (allRestaurants && allRestaurants.length) {
    const areMoreRestaurants = allRestaurants.length < _allRestaurantsMeta.count
    return (
      <section>
        <ul>
          {allRestaurants.map((restaurant, index) => (
            <li key={restaurant.id}>
              <a href={restaurant.url}>{restaurant.name}</a> &mdash;{' '}
              {restaurant.neighborhoods &&
                restaurant.neighborhoods.length > 0 &&
                getNeighborhoodNames(restaurant.neighborhoods)}
            </li>
          ))}
        </ul>
        {areMoreRestaurants ? (
          <button onClick={() => loadMoreRestaurants()}>
            {' '}
            {loading ? 'Loading...' : 'Show More'}{' '}
          </button>
        ) : (
          ''
        )}
      </section>
    )
  }
  return <div>Loading</div>
}

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

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default graphql(allRestaurants, {
  options: {
    variables: {
      skip: 0,
      first: RESTAURANTS_PER_PAGE
    }
  },
  props: ({data}) => ({
    data,
    loadMoreRestaurants: () => {
      return data.fetchMore({
        variables: {
          skip: data.allRestaurants.length
        },
        updateQuery: (previousResult, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new restaurants results to the old one
            allRestaurants: [
              ...previousResult.allRestaurants,
              ...fetchMoreResult.allRestaurants
            ]
          })
        }
      })
    }
  })
})(RestaurantList)
