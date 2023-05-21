import { gql } from "@apollo/client"


export const INSERT_USERS_ONE_MUTATION = gql`
mutation ($id: String = "", $email: String = "", $password: String = "", $username: String = "") {
    insert_users_one(object: {id: $id, email: $email, password: $password, username: $username}) {
      id
      email
      password
      username
      pk
    }
  }
`

export const UPDATE_USER_ONE_MUTATION = gql`
mutation ($username: String!, $introduce: String!, $pk: Int!) {
  update_users_by_pk(_set: {username: $username, introduce: $introduce}, pk_columns: {pk: $pk}) {
    username
    pk
  }
}
`

