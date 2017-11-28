import Head from 'next/head'
import Link from 'next/link'
import PropTypes from 'prop-types'

function Header(props) {
  const {subtitle} = props
  return (
    <header>
      <Head>
        <title>Vegan Food Places 🥑 {subtitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400"
          rel="stylesheet"
        />
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
      <style jsx global>{`
        html {
          font-family: 'Lato', sans-serif;
          font-size: 20px;
        }
        @media (max-width: 900px) {
          html {
            font-size: 18px;
          }
        }
        @media (max-width: 400px) {
          html {
            font-size: 15px;
          }
        }

        /* Type will scale with document */
        h1 {
          font-size: 3em;
          margin-top: 1rem;
        }
        h2 {
          font-size: 2.5em;
          margin-top: 1rem;
        }
        h3 {
          font-size: 2em;
          margin-top: 1rem;
        }
        a {
          text-decoration: underline;
        }
        a:hover {
          background-color: #31dd51;
        }
        a:link,
        a:active,
        a:visited {
          color: #000;
        }
      `}</style>
      <style jsx>
        {`
          header {
            font-size: 1rem;
            padding: 0 1rem;
            background-color: black;
            height: 3rem;
          }

          a {
            height: 2rem;
            line-height: 2rem;
            padding: 0.5rem;
          }
          a:hover {
            background-color: #31dd51;
          }
          a:link,
          a:visited {
            color: #fff;
            display: inline-block;
          }
        `}
      </style>
    </header>
  )
}

Header.propTypes = {
  subtitle: PropTypes.string
}
export default Header
