import Layout from '../components/Layout'
import withData from '../lib/withData'
import RestaurantList from '../components/Restaurants/RestaurantList'

export default withData(props => (
  <Layout subtitle="Home" pathname={props.url.pathname}>
    <h1>Vegan Food Places</h1>
    <div>Restaurant List:</div>
    <RestaurantList />
  </Layout>
))
