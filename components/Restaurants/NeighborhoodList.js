import { graphql } from 'react-apollo'
import Card from '../shared/Card'
import allNeighborhoods from '../../gql/allNeighborhoods'

const NEIGHBORHOODS_PER_PAGE = 10

function renderRestaurant(restaurant) {
  return (
    <li key={restaurant.id}>
      <a href={restaurant.url}>{restaurant.name}</a>
      <style jsx>
        {`
          li {
            padding: 0;
            font-size: 0.9rem;
          }
        `}
      </style>
    </li>
  )
}

function renderNeighborhood(neighborhood) {
  if (neighborhood && neighborhood.restaurants.length > 0) {
    return (
      <div key={neighborhood.id} className="neighborhood">
        <Card>
          <strong className="name">{neighborhood.name}</strong>
          <ul className="restaurants">
            {neighborhood.restaurants.map(n => renderRestaurant(n))}
          </ul>
        </Card>
        <style jsx>
          {`
            .neighborhood {
              width: 100%;
              overflow-wrap: break-word;
            }
            @media (min-width: 1400px) {
              .neighborhood {
                width: 33%;
              }
            }
            .restaurants {
              padding: 0;
              margin: 0.2rem 0 1rem 0;
              font-size: 1.2rem;
              list-style: none;
            }
            .name {
              text-transform: uppercase;
              font-size: 2rem;
            }
          `}
        </style>
      </div>
    )
  }
  return null
}
function NeighborhoodList({
  data: { loading, error, allNeighborhoods, _allNeighborhoodsMeta },
  loadMoreNeighborhoods
}) {
  if (error) return <div>{console.log(error)}</div>
  if (allNeighborhoods && allNeighborhoods.length) {
    const areMoreNeighborhoods =
      allNeighborhoods.length < _allNeighborhoodsMeta.count
    return (
      <section className="NeighborhoodList">
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
        <style jsx>
          {`
            .NeighborhoodList {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }
          `}
        </style>
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
  props: ({ data }) => ({
    data,
    loadMoreNeighborhoods: () => {
      return data.fetchMore({
        variables: {
          skip: data.allNeighborhoods.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
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
