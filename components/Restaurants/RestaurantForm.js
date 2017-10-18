import {gql, graphql} from 'react-apollo'

function RestaurantForm({createRestaurant}) {
  function handleSubmit(e) {
    e.preventDefault()
    const {elements} = e.target
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

    createRestaurant(name, url, address1, address2, city, state, zipCode)

    // reset form
    // elements.name.value = ''
    // elements.url.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" name="name" required />
      <input placeholder="url" name="url" />
      <input placeholder="address1" name="address1" />
      <input placeholder="address2" name="address2" />
      <input placeholder="city" name="city" />
      <input placeholder="state" name="state" required />
      <input placeholder="zipCode" name="zipCode" />
      <button type="submit">Submit</button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  )
}

const createRestaurant = gql`
  mutation createRestaurant(
    $name: String!
    $address1: String
    $address2: String
    $city: String
    $state: String!
    $zipCode: String
    $url: String!
  ) {
    createRestaurant(
      name: $name
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      zipCode: $zipCode
      url: $url
    ) {
      id
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
    createRestaurant: (name, url, address1, address2, city, state, zipCode) =>
      mutate({
        variables: {name, url, address1, address2, city, state, zipCode},
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
