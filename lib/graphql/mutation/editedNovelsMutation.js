import { gql } from "@apollo/client"

export const INSERT_EDITED_NOVELS_ONE_MUTATION = gql`
mutation ($content: String!, $category_pk: Int!, $editor_comment: String!, $original_pk: Int!, $title: String!, $user_id: String!, $user_pk: Int!) {
    insert_edited_novels_one(object: {content: $content, category_pk: $category_pk, editor_comment: $editor_comment, original_pk: $original_pk, title: $title, user_id: $user_id, user_pk: $user_pk}) {
      content
      category_pk
      created_at
      editor_comment
      pk
      title
    }
  }
`

export const UPDATE_EDITED_NOVELS_ONE_MUTATION = gql`
mutation MyMutation($pk: Int = 10, $content: String = "", $editor_comment: String = "", $title: String = "") {
    update_edited_novels_by_pk(pk_columns: {pk: $pk}, _set: {content: $content, editor_comment: $editor_comment, title: $title}) {
      original_pk
      content
      title
    }
  }
`

export const DELETE_EDITED_NOVELS_ONE_MUTATION = gql`
mutation MyMutation($pk: Int = 10) {
  delete_edited_novels_by_pk(pk: $pk) {
    pk
    title
    content
  }
}
`