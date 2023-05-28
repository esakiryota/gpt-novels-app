import { gql } from "@apollo/client"

export const GET_USERS_FAVORITES_ONE = gql`
query ($novel_pk: Int!, $user_pk: Int!) {
    users_edited_novel_favorite(where: {_and: {edited_novel_pk: {_eq: $novel_pk}, user_pk: {_eq: $user_pk}}}) {
      edited_novel_pk
      pk
      user_pk
    }
  }
`