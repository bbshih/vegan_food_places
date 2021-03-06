import { gql, graphql } from 'react-apollo'
import createRestaurant from '../../gql/createRestaurant'
import NeighborhoodsDropdown from './NeighborhoodsDropdown'

let neighborhoodId = ''
function RestaurantForm({ createRestaurant }) {
  function handleChange(id) {
    neighborhoodId = id
  }
  function handleSubmit(e) {
    e.preventDefault()
    const { elements } = e.target
    let name = elements.name.value
    let url = elements.url.value
    let address1 = elements.address1.value
    let address2 = elements.address2.value
    let city = elements.city.value
    let state = elements.state.value
    let zipCode = elements.zipCode.value

    // prepend http if missing from url
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = `http://${url}`
    }

    createRestaurant(
      name,
      neighborhoodId,
      url,
      address1,
      address2,
      city,
      state,
      zipCode
    )

    // reset form
    // elements.name.value = ''
    // elements.url.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" name="name" required />
      <NeighborhoodsDropdown handleChange={handleChange} />
      <button type="submit">Submit</button>
      <hr />
      <small>Optional fields</small>
      <input placeholder="url" name="url" />
      <input placeholder="state" name="state" defaultValue="WA" />
      <input placeholder="address1" name="address1" />
      <input placeholder="address2" name="address2" />
      <input placeholder="city" name="city" defaultValue="Seattle" />
      <input placeholder="zipCode" name="zipCode" />
      <style jsx>
        {`
          input {
            display: block;
            margin-bottom: 1rem;
          }
          button {
            color: #fff;
            background-color: #31dd51;
            border: 2px solid #fff;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            box-shadow: 0 1px 1px gray;
          }
        `}
      </style>
    </form>
  )
}

export default graphql(createRestaurant, {
  props: ({ mutate }) => ({
    createRestaurant: (
      name,
      neighborhoodId,
      url,
      address1,
      address2,
      city,
      state,
      zipCode
    ) =>
      mutate({
        variables: {
          name,
          neighborhoodId,
          url,
          address1,
          address2,
          city,
          state,
          zipCode
        },
        updateQueries: {
          allRestaurants: (previousResult, { mutationResult }) => {
            const newPost = mutationResult.data.createRestaurant
            return Object.assign({}, previousResult, {
              // Append the new post
              allRestaurants: [newPost, ...previousResult.allRestaurants]
            })
          }
        }
      })
  })
})(RestaurantForm)
