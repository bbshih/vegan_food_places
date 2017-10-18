import {gql, graphql} from 'react-apollo'

const RESTAURANTS_PER_PAGE = 10

function RestaurantList({
  data: {loading, error, allRestaurants, _allRestaurantsMeta},
  loadMoreRestaurants
}) {
  if (error) return <div>Error loading restaurants.</div>
  if (allRestaurants && allRestaurants.length) {
    const areMoreRestaurants = allRestaurants.length < _allRestaurantsMeta.count
    return (
      <section>
        <ul>
          {allRestaurants.map((restaurant, index) => (
            <li key={restaurant.id}>
              <div>
                <span>{index + 1}. </span>
                <a href={restaurant.url}>{restaurant.name}</a>
              </div>
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
        <style jsx>{`
          section {
            padding-bottom: 20px;
          }
          li {
            display: block;
            margin-bottom: 10px;
          }
          div {
            align-items: center;
            display: flex;
          }
          a {
            font-size: 14px;
            margin-right: 10px;
            text-decoration: none;
            padding-bottom: 0;
            border: 0;
          }
          span {
            font-size: 14px;
            margin-right: 5px;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          button:before {
            align-self: center;
            border-style: solid;
            border-width: 6px 4px 0 4px;
            border-color: #ffffff transparent transparent transparent;
            content: '';
            height: 0;
            margin-right: 5px;
            width: 0;
          }
        `}</style>
      </section>
    )
  }
  return <div>Loading</div>
}

const allRestaurants = gql`
  query allRestaurants($first: Int!, $skip: Int!) {
    allRestaurants(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      name
      url
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
