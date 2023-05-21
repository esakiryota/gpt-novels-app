import { gql } from "@apollo/client"

export const INSERT_NOVELS_ONE_MUTATION = gql`
mutation MyMutation($user_id: String!, $user_pk: Int!, $title: String!, $content: String!, $category_pk: Int!) {
  insert_novels_one(object: {category_pk: $category_pk, user_id: $user_id, user_pk: $user_pk, title: $title, content: $content}) {
    category_pk
    content
    created_at
  }
}
`

export const DELETE_NOVELS_ONE_MUTATION = gql`
mutation delete_novels_by_pk($pk: Int!) {
    delete_novels_by_pk(pk: $pk) {
      category_pk
      content
      pk
      title
    }
  }
`

export const UPDATE_NOVELS_ONE_MUTATION = gql`
mutation ($pk: Int!, $content: String!, $category_pk: Int!, $title: String!) {
    update_novels_by_pk(pk_columns: {pk: $pk}, _set: {content: $content, category_pk: $category_pk, title: $title}) {
      title
      user_pk
      user_id
      content
      category_pk
    }
  }
`