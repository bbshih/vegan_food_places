import {gql, graphql} from 'react-apollo'
import NeighborhoodsDropdown from './NeighborhoodsDropdown'

let neighborhoodId = ''
function RestaurantForm({createRestaurant}) {
  function handleChange(id) {
    neighborhoodId = id
    debugger
  }
  function handleSubmit(e) {
    e.preventDefault()
    const {elements} = e.target
    let name = elements.name.value
    // let neighborhoodId = elements.neighborhoodId.value
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
      <input placeholder="url" name="url" />
      <input placeholder="address1" name="address1" />
      <input placeholder="address2" name="address2" />
      <input placeholder="city" name="city" />
      <input placeholder="state" name="state" value="WA" required />
      <input placeholder="zipCode" name="zipCode" />
      <button type="submit">Submit</button>
      <style jsx>{`
        form {
          padding: 1rem 0;
        }

        input {
          display: block;
          margin-bottom: 1rem;
        }
      `}</style>
    </form>
  )
}

const createRestaurant = gql`
  mutation createRestaurant(
    $name: String!
    $neighborhoodId: ID!
    $address1: String
    $address2: String
    $city: String
    $state: String!
    $zipCode: String
    $url: String
  ) {
    createRestaurant(
      name: $name
      neighborhoodsIds: [$neighborhoodId]
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zipCode: $zipCode
      url: $url
    ) {
      id
      neighborhoods {
        id
        name
      }
      name
      address1
      address2
      city
      state
      zipCode
      url
    }
  }
`

export default graphql(createRestaurant, {
  props: ({mutate}) => ({
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
          allRestaurants: (previousResult, {mutationResult}) => {
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
