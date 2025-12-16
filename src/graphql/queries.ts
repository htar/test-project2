export const Q_CHARACTERS = /* GraphQL */ `
  query Characters($page: Int, $name: String, $status: String) {
    characters(page: $page, filter: { name: $name, status: $status }) {
      info {
        pages
        count
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        gender
      }
    }
  }
`

export const Q_CHARACTER = /* GraphQL */ `
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      gender
      type
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`

export const Q_EPISODES = /* GraphQL */ `
  query Episodes($page: Int, $name: String) {
    episodes(page: $page, filter: { name: $name }) {
      info {
        pages
        count
        next
        prev
      }
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`

export const Q_EPISODE = /* GraphQL */ `
  query Episode($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      episode
      characters {
        id
        name
        image
        status
      }
    }
  }
`
