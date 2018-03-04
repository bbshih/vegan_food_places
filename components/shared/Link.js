import styled from 'styled-components'
import NextLink from 'next/link'
import PropTypes from 'prop-types'

// Need to always use passHref so styled-components links work correctly
function Link({ href, children }) {
  return (
    <NextLink href={href} passHref>
      {children}
    </NextLink>
  )
}
Link.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  href: PropTypes.string.isRequired
}

export default Link
