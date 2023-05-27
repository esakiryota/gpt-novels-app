import { gql } from "@apollo/client"


export const INSERT_USERS_RELATIONSHIPS_ONE_MUTATION = gql`
mutation MyMutation($follow_id: String = "", $follow_pk: Int = 10, $follower_id: String = "", $follower_pk: Int = 10) {
  insert_users_relationships_one(object: {follow_id: $follow_id, follow_pk: $follow_pk, follower_id: $follower_id, follower_pk: $follower_pk}) {
    follow_id
    follow_pk
    follower_id
    follower_pk
    pk
  }
}
`

export const DELETE_USERS_RELATIONSHIPS_ONE_MUTATION = gql`
mutation ($follow_pk: Int!, $follower_pk: Int!) {
    delete_users_relationships(where: {_and: {follow_pk: {_eq: $follow_pk}, follower_pk: {_eq: $follower_pk}}}) {
      returning {
        follow_pk
        follower_pk
        follow_id
        follower_id
        pk
      }
    }
  }
`