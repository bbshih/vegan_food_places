import Header from './Header'
import Footer from './Footer'
import PropTypes from 'prop-types'
import stylesheet from 'styles/global.scss'

function Layout(props) {
  const {subtitle} = props
  return (
    <div>
      <Header subtitle={subtitle} />
      <div className="main">{props.children}</div>
      <Footer />
      <style dangerouslySetInnerHTML={{__html: stylesheet}} />
      <style jsx>{`
        .main {
          padding: 1rem;
        }
      `}</style>
    </div>
  )
}

Layout.propTypes = {
  subtitle: PropTypes.string
}
export default Layout
