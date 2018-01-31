import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'

function Layout(props) {
  const { subtitle, children } = props
  return (
    <div className="layout">
      <Header subtitle={subtitle} />
      <div className="main">
        <div className="grid">
          {children}
          <Footer />
        </div>
      </div>
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
