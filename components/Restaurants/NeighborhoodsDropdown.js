import {gql, graphql} from 'react-apollo'

function renderNeighborhoodOption(neighborhood) {
  return (
    <option key={neighborhood.id} value={neighborhood.id}>
      {neighborhood.name}
    </option>
  )
}

class NeighborhoodsDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.props.handleChange(e.target.value)
  }
  render() {
    const {
      data: {loading, error, allNeighborhoods, _allNeighborhoodsMeta},
      loadMoreRestaurants
    } = this.props
    if (error) return <div>{console.log(error)}</div>
    if (allNeighborhoods && allNeighborhoods.length) {
      return (
        <select name="neighborhoods" onChange={this.handleChange}>
          {allNeighborhoods.map(neighborhood =>
            renderNeighborhoodOption(neighborhood)
          )}
          <style jsx>
            {`
              select {
                margin-bottom: 1rem;
              }
            `}
          </style>
        </select>
      )
    }
    return null
  }
}
const allNeighborhoods = gql`
  {
    allNeighborhoods {
      id
      name
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default graphql(allNeighborhoods, {
  props: ({data}) => ({
    data
  })
})(NeighborhoodsDropdown)
