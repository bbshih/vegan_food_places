import Header from './Header'
import Footer from './Footer'
import PropTypes from 'prop-types'

function Layout(props) {
  const {subtitle} = props
  return (
    <div className="layout">
      <Header subtitle={subtitle} />
      <div className="main">
        <div className="grid">
          {props.children}
          <Footer />
        </div>
      </div>
      <style jsx>{`
        .main {
          padding: 0 1rem;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: auto 1fr;
        }
      `}</style>
    </div>
  )
}

Layout.propTypes = {
  subtitle: PropTypes.string
}
export default Layout
