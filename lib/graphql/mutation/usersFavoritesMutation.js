import { gql } from "@apollo/client"

export const INSERT_USERS_FAVORITES_ONE_MUTATION = gql`
mutation ($user_pk: Int!, $novel_pk: Int!, $user_id: String!) {
    insert_users_favorite_one(object: {novel_pk: $novel_pk, user_pk: $user_pk, user_id: $user_id}) {
      novel_pk
      pk
      user_pk
    }
  }
`

export const DELETE_USERS_FAVORITES_ONE_MUTATION = gql`
mutation ($pk: Int!) {
    delete_users_favorite_by_pk(pk: $pk) {
      novel_pk
      pk
      user_pk
      user_id
    }
  }
`