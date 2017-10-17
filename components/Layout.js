import Header from './Header'
import Footer from './Footer'
import PropTypes from 'prop-types'

function Layout(props) {
  const {subtitle} = props
  return (
    <div>
      <Header subtitle={subtitle} />
      {props.children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  subtitle: PropTypes.string
}
export default Layout
