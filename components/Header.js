import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'

function Header(props) {
  const {subtitle} = props
  return (
    <div>
      <Head>
        <title>Vegan Food Places 🥑 {subtitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        -
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        -
        <Link href="/restaurants/add">
          <a>Add Restaurant</a>
        </Link>
      </nav>
    </div>
  )
}

Header.propTypes = {
  subtitle: PropTypes.string
}
export default Header
