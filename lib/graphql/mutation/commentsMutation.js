import { gql } from "@apollo/client"

export const INSERT_COMMENT_ONE_MUTATION = gql`
mutation ($comment: String!, $novel_pk: Int!, $title: String!, $user_pk: Int!, $user_id: String!) {
    insert_comments_one(object: {comment: $comment, novel_pk: $novel_pk, title: $title, user_pk: $user_pk, user_id: $user_id}) {
      comment
      novel_pk
      pk
      title
      user_pk
      user_id
    }
  }
`

export const DELETE_COMMENT_ONE_MUTATION = gql`
mutation ($pk: Int!) {
    delete_comments_by_pk(pk: $pk) {
      comment
      novel_pk
      pk
      title
      user_pk
      user_id
    }
  }
`

export const UPDATE_COMMENT_ONE_MUTATION = gql`
mutation MyMutation($comment: String = "", $title: String = "", $pk: Int = 10, $user_id: String = "", $user_pk: Int = 10, $novel_pk: Int = 10) {
  update_comments_by_pk(pk_columns: {pk: $pk}, _set: {comment: $comment, title: $title, user_id: $user_id, user_pk: $user_pk, novel_pk: $novel_pk}) {
    comment
    title
    user_id
    user_pk
    novel_pk
    pk
  }
}
`