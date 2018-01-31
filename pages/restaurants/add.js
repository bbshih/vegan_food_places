import { gql, graphql } from 'react-apollo'
import withData from '../../lib/withData'
import Layout from '../../components/Layout'
import RestaurantForm from '../../components/Restaurants/RestaurantForm'

function RestaurantAdd() {
  return (
    <Layout subtitle="Add Restaurant">
      <div className="add-restaurant">
        <h1>Add Restaurant</h1>
        <RestaurantForm />
        <style jsx>
          {`
            .add-restaurant {
              grid-column: 1 / span 3;
            }
          `}
        </style>
      </div>
    </Layout>
  )
}

export default withData(RestaurantAdd)
