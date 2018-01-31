import PropTypes from 'prop-types'

function Card({ className, children }) {
  return (
    <div className={`card ${className}`}>
      {children}
      <style jsx>
        {`
          .card {
            padding: 2rem;
            box-shadow: 0px 4px 5px rgba(0, 0, 255, 0.2);
            margin: 0.5rem 0;
          }
        `}
      </style>
    </div>
  )
}
Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.string
}

export default Card
