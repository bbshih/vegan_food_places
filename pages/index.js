import cookie from 'cookie'
import { withApollo, compose } from 'react-apollo'

import withData from '../lib/withData'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import Layout from '../components/Layout'
import Card from '../components/shared/Card'
import RestaurantList from '../components/Restaurants/RestaurantList'
import NeighborhoodList from '../components/Restaurants/NeighborhoodList'
import RestaurantForm from '../components/Restaurants/RestaurantForm'

const RESTAURANT = 'Restaurant'
const NEIGHBORHOOD = 'Neighborhood'

class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    if (!loggedInUser.user) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/signin')
    }

    return { loggedInUser }
  }

  constructor(props) {
    super(props)
    this.state = {
      listType: NEIGHBORHOOD
    }
    this.handleSwitchListType = this.handleSwitchListType.bind(this)
  }

  signout() {
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    this.props.client.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/signin')
    })
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
            Hello {this.props.loggedInUser.user.name}!<br />
            <button onClick={this.signout}>Sign out</button>
          </div>
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

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Index)
