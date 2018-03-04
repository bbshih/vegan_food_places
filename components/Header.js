import { withApollo, compose } from 'react-apollo'
import styled from 'styled-components'
import cookie from 'cookie'
import PropTypes from 'prop-types'
import withData from '../lib/withData'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import Link from './shared/Link'

const HeaderComponent = styled.header`
  font-size: 1rem;
  padding: 0 1rem;
  background-color: black;
  height: 3rem;
`

const NavLink = styled.a`
  height: 2rem;
  line-height: 2rem;
  padding: 0.5rem;

  &:hover {
    background-color: #31dd51;
  }

  &:link,
  &:visited {
    color: #fff;
    display: inline-block;
  }
`

const NavButton = NavLink.withComponent('button')

class Header extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    return { loggedInUser }
  }

  static propTypes = {
    client: PropTypes.object.required,
    loggedInUser: PropTypes.object,
    subtitle: PropTypes.string
  }

  signout() {
    const { client } = this.props
    document.cookie = cookie.serialize('token', '', {
      maxAge: -1 // Expire the cookie immediately
    })

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    client.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, '/signin')
    })
  }

  renderAuth() {
    const { loggedInUser } = this.props
    if (loggedInUser) {
      return (
        <div className="signed-in">
          {loggedInUser.user.name}
          <NavButton onClick={this.signOut}>Sign out</NavButton>
        </div>
      )
    }

    return (
      <Link href="/signin">
        <NavLink>Sign In</NavLink>
      </Link>
    )
  }
  render() {
    const { subtitle } = this.props
    return (
      <HeaderComponent>
        <nav>
          <Link href="/">
            <NavLink>Home</NavLink>
          </Link>{' '}
          -
          <Link href="/about">
            <NavLink>About</NavLink>
          </Link>{' '}
          -
          <Link href="/restaurants/add">
            <NavLink>Add Restaurant</NavLink>
          </Link>
          {this.renderAuth()}
        </nav>
      </HeaderComponent>
    )
  }
}
Header.propTypes = {
  subtitle: PropTypes.string
}
export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Header)
