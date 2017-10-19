import Layout from '../components/Layout'
import withData from '../lib/withData'
import RestaurantList from '../components/Restaurants/RestaurantList'
import NeighborhoodList from '../components/Restaurants/NeighborhoodList'
import RestaurantForm from '../components/Restaurants/RestaurantForm'

const RESTAURANT = 'Restaurant'
const NEIGHBORHOOD = 'Neighborhood'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listType: NEIGHBORHOOD
    }
    this.handleSwitchListType = this.handleSwitchListType.bind(this)
  }
  handleSwitchListType() {
    const listType =
      this.state.listType === RESTAURANT ? NEIGHBORHOOD : RESTAURANT
    this.setState({
      ...this.state,
      listType
    })
  }
  render() {
    return (
      <Layout subtitle="Home" pathname={this.props.url.pathname}>
        <div className="main">
          <h1>Vegan Food Places</h1>
          <div>
            Switch to: {' '}
            {this.state.listType === RESTAURANT ? (
              <a onClick={this.handleSwitchListType}>Group by Neighborhood</a>
            ) : (
              <a onClick={this.handleSwitchListType}>Alphabetical List</a>
            )}
          </div>

          {this.state.listType === RESTAURANT && <RestaurantList />}
          {this.state.listType === NEIGHBORHOOD && <NeighborhoodList />}
        </div>
        <div className="right">
          <h3>Add Restaurant</h3>
          <RestaurantForm />
        </div>
        <style jsx>{`
          .main {
            grid-column: 1 / span 2;
            grid-row: 1 /1;
          }
          .right {
            grid-column: 3;
            grid-row: 1 /1;
          }
        `}</style>
      </Layout>
    )
  }
}

export default withData(IndexPage)
