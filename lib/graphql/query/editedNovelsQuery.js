import { gql } from "@apollo/client"

export const GET_EDITED_NOVEL_BY_SEARCH = (content, category) => {
    if (content === "" && category === "全て") {
      return gql`
      query($order_by: [edited_novels_order_by!],  $offset: Int = 0, $limit: Int = 10) {
        edited_novels(
          order_by: $order_by,
          offset: $offset, 
          limit: $limit
          ) 
          {
          category_pk
          content
          created_at
          pk
          title
          user_pk
          user {
            email
            id
            image
            pk
            username
          }
          category {
            name
            pk
          }
        }
      }
      `
    } else if (content === "") {
      return gql`
      query($order_by: [edited_novels_order_by!],  $offset: Int = 0, $limit: Int = 10, $category: String!) {
        edited_novels(where: {
          category: { name: { _eq: $category } } },
          order_by: $order_by,
          offset: $offset, 
          limit: $limit
          ) 
          {
          category_pk
          content
          created_at
          pk
          title
          user_pk
          user{
            email
            id
            image
            pk
            username
          }
          category {
            name
            pk
          }
        }
      }
      `
    } else if (category === "全て") {
      return gql`
      query($order_by: [edited_novels_order_by!],  $offset: Int = 0, $limit: Int = 10, $content: String!) {
        edited_novels(where: {
          content: {_iregex: $content}},
          order_by: $order_by,
          offset: $offset, 
          limit: $limit
          ) 
          {
          category_pk
          content
          created_at
          favorites
          pk
          title
          user_pk
          user{
            email
            id
            image
            pk
            username
          }
          category {
            name
            pk
          }
        }
      }
      `
    }
    return gql`
    query($order_by: [edited_novels_order_by!], $content: String!, $category: String!, $offset: Int = 0, $limit: Int = 10) {
      edited_novels(where: {
        content: {_iregex: $content},
        category: { name: { _eq: $category } } },
        order_by: $order_by,
        offset: $offset, 
        limit: $limit
        ) 
        {
        category_pk
        content
        created_at
        pk
        title
        user_pk
        user{
          email
          id
          image
          pk
          username
        }
        category {
          name
          pk
        }
      }
    }
    `
  }

export const GET_EDITED_NOVEL_BY_PK_QUERY = gql`
query($pk: Int!) {
    edited_novels_by_pk(pk: $pk) {
      category_pk
      content
      original_pk
      editor_comment
      created_at
      pk
      title
      category {
        name
        pk
      }
      user {
        pk
        username
      }
      user_pk
    }
  }
`

export const GET_EDITED_NOVEL_BY_USER_QUERY = gql`
query MyQuery($offset: Int = 10, $limit: Int = 10, $user_pk: Int = 10) {
  edited_novels(offset: $offset, limit: $limit, where: {user_pk: {_eq: $user_pk}}) {
    category_pk
    content
    created_at
    pk
    title
    user_pk
    category {
      name
      pk
    }
  }
}
`