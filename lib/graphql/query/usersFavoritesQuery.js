import { gql } from "@apollo/client"

export const GET_USERS_FAVORITES_ONE = gql`
query ($novel_pk: Int!, $user_pk: Int!) {
    users_favorite(where: {_and: {novel_pk: {_eq: $novel_pk}, user_pk: {_eq: $user_pk}}}) {
      novel_pk
      pk
      user_pk
    }
  }
`