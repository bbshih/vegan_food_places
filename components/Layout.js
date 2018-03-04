import PropTypes from 'prop-types'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

function Layout(props) {
  const { subtitle, children } = props

  return (
    <div className="layout">
      <Head>
        <title>Vegan Food Places 🥑 {subtitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400"
          rel="stylesheet"
        />
      </Head>
      <Header subtitle={subtitle} />
      <div className="main">
        <div className="grid">
          {children}
          <Footer />
        </div>
      </div>
      <style jsx global>
        {`
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
        `}
      </style>
      <style jsx>
        {`
          .main {
            max-width: 1500px;
            margin: 0 auto;
          }
          .grid {
            display: block;
          }
          @media (min-width: 500px) {
            .grid {
              display: grid;
              grid-template-columns: 1fr 2fr 1fr;
            }
          }
        `}
      </style>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  subtitle: PropTypes.string
}
export default Layout
