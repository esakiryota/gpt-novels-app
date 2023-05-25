import { gql } from "@apollo/client"

export const GET_AI_NOVELS = gql`
query MyQuery {
    ai_novels {
      ai_novels_category {
        name
        pk
      }
      category_pk
      content
      title
      pk
    }
  }
`