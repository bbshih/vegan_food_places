import {gql, graphql} from 'react-apollo'
import allNeighborhoods from '../../gql/allNeighborhoods'
const NEIGHBORHOODS_PER_PAGE = 10

function renderRestaurant(restaurant) {
  return (
    <li key={restaurant.id}>
      <a href={restaurant.url}>{restaurant.name}</a>
      <style jsx>{`
        li {
          margin: 0 1rem;
          font-size: 1rem;
        }
      `}</style>
    </li>
  )
}

function renderNeighborhood(neighborhood) {
  if (neighborhood && neighborhood.restaurants.length > 0) {
    return (
      <ul key={neighborhood.id}>
        <strong>{neighborhood.name}</strong>
        {neighborhood.restaurants.map(n => renderRestaurant(n))}
        <style jsx>{`
          ul {
            padding: 0;
            font-size: 1.2rem;
          }
        `}</style>
      </ul>
    )
  }
  return null
}
function NeighborhoodList({
  data: {loading, error, allNeighborhoods, _allNeighborhoodsMeta},
  loadMoreNeighborhoods
}) {
  if (error) return <div>{console.log(error)}</div>
  if (allNeighborhoods && allNeighborhoods.length) {
    const areMoreNeighborhoods =
      allNeighborhoods.length < _allNeighborhoodsMeta.count
    return (
      <section>
        {allNeighborhoods.map((neighborhood, index) =>
          renderNeighborhood(neighborhood)
        )}
        {areMoreNeighborhoods ? (
          <button onClick={() => loadMoreNeighborhoods()}>
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

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (NeighborhoodList)
export default graphql(allNeighborhoods, {
  options: {
    variables: {
      skip: 0,
      first: NEIGHBORHOODS_PER_PAGE
    }
  },
  props: ({data}) => ({
    data,
    loadMoreNeighborhoods: () => {
      return data.fetchMore({
        variables: {
          skip: data.allNeighborhoods.length
        },
        updateQuery: (previousResult, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return Object.assign({}, previousResult, {
            // Append the new restaurants results to the old one
            allNeighborhoods: [
              ...previousResult.allNeighborhoods,
              ...fetchMoreResult.allNeighborhoods
            ]
          })
        }
      })
    }
  })
})(NeighborhoodList)
