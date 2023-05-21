import { gql } from "@apollo/client"


export const INSERT_USERS_RELATIONSHIPS_ONE_MUTATION = gql`
mutation ($follow_pk: Int!, $follower_pk: Int!, $follow_id: String!, $follower_id: String!) {
    insert_users_relationships_one(object: {follow_pk: $follow_pk, follower_pk: $follower_pk, follow_id: $follow_id, follower_id: $follower_id}) {
      follow_pk
      follower_pk
      follow_id
      follower_id
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