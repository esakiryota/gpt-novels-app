import { gql } from "@apollo/client"

export const INSERT_USERS_FAVORITES_ONE_MUTATION = gql`
mutation MyMutation($edited_novel_pk: Int = 10, $user_id: String = "", $user_pk: Int = 10) {
    insert_users_edited_novel_favorite_one(object: {edited_novel_pk: $edited_novel_pk, user_id: $user_id, user_pk: $user_pk}) {
      created_at
      edited_novel_pk
      pk
      user_id
      user_pk
    }
  }
`

export const DELETE_USERS_FAVORITES_ONE_MUTATION = gql`
mutation MyMutation($pk: Int!) {
    delete_users_edited_novel_favorite_by_pk(pk: $pk) {
      pk
      user_id
      user_pk
      edited_novel_pk
    }
  }
`