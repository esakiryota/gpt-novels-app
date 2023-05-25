import { gql } from "@apollo/client"

export const GET_USERS_QUERY = gql`
query {
    users {
      pk
      username
      image
      id
    }
  }
`

export const GET_USERS_ONE_BY_PK_QUERY = gql`
query ($pk: Int!) {
    users_by_pk(pk: $pk) {
      pk
      image
      id
      username
    }
  }
`

export const GET_USERS_ONE_BY_EMAIL_QUERY = gql`
query ($email: String!) {
    users(where: {email: {_eq: $email}}) {
      email
      id
      image
      username
      password
      pk
    }
  }
`

export const GET_USERS_ONE_BY_ID_FOR_PROFILE = gql`
query MyQuery($pk: Int!) {
  users(where: {pk: {_eq: $pk}}) {
    email
    id
    image
    pk
    username
    introduce
    users_novels {
      category {
        name
        pk
      }
      category_pk
      content
      created_at
      favorites
      pk
      read_later
      title
    }
    users_follow_relationships_aggregate {
      aggregate {
        count
      }
    }
    users_follower_relationships_aggregate {
      aggregate {
        count
      }
    }
    users_comments_aggregate {
      aggregate {
        count
      }
    }
  }
}
`

export const GET_USERS_ONE_BY_ID_FOR_FOLLOW = gql`
query ($pk: Int!) {
  users_by_pk(pk: $pk) {
    users_follow_relationships {
      users_follower_relationships_user {
        introduce
        username
        pk
        users_follow_relationships_aggregate {
          aggregate {
            count
          }
        }
        users_follower_relationships_aggregate {
          aggregate {
            count
          }
        }
        users_comments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
}
`

export const GET_USERS_ONE_BY_ID_FOR_FOLLOWER = gql`
query MyQuery($pk: Int!) {
  users_by_pk(pk: $pk) {
    users_follower_relationships {
      users_follow_relationships_user {
        introduce
        username
        pk
        users_follow_relationships_aggregate {
          aggregate {
            count
          }
        }
        users_follower_relationships_aggregate {
          aggregate {
            count
          }
        }
        users_comments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
}
`

export const GET_CHATGPT_USER_QUERY = gql`
query {
  users(where: {username: {_eq: "chatgpt"}}) {
    username
    id
    pk
  }
}
`