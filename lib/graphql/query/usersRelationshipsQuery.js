import { gql } from "@apollo/client"

export const GET_USERS_FOLLOW_RELATIONSHIPS_QUERY = gql`
query MyQuery($follow_pk: Int!, $follower_pk: Int!) {
    users_relationships(where: {_and: {follow_pk: {_eq: $follow_pk}, follower_pk: {_eq: $follower_pk}}}) {
      follow_pk
      follower_pk
      pk
    }
  }
`