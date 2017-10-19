function Footer(props) {
  return (
    <footer>
      <div>Vegan Food Places 🥑</div>
      <style jsx>
        {`
          footer {
            padding: 1rem;
            border-top: 1px solid #ddd;
            grid-column: 1 / span 3;
            grid-row: 2/ 2;
          }
        `}
      </style>
    </footer>
  )
}

export default Footer
