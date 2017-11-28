import {gql, graphql} from 'react-apollo'
import withData from '../../lib/withData'
import Layout from '../../components/Layout'
import RestaurantForm from '../../components/Restaurants/RestaurantForm'

function RestaurantEdit() {
  return (
    <Layout subtitle="Add Restaurant">
      <h1>Add Restaurant</h1>
      <RestaurantForm />
    </Layout>
  )
}

export default withData(RestaurantEdit)
