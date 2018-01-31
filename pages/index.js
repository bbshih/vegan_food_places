import Layout from '../components/Layout'
import withData from '../lib/withData'
import Card from '../components/shared/Card'
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
          <Card>
            <h3 className="add-title">Add Restaurant</h3>
            <RestaurantForm />
          </Card>
        </div>
        <style jsx>
          {`
            .main {
              grid-column: 1 / span 2;
              grid-column-gap: 1rem;
              grid-row: 1 /1;
            }
            .right {
              grid-column: 3;
              grid-row: 1 /1;
              padding-left: 1rem;
            }
            .add-title {
              margin-top: 0;
            }
          `}
        </style>
      </Layout>
    )
  }
}

export default withData(IndexPage)
