import { gql } from "@apollo/client"

export const GET_NOVELS_QUERY = gql`
query {
    novels {
        content
        created_at
        category_pk
        favorites
        pk
        read_later
        title
        user_pk
        category {
          name
          pk
        }
        user {
          pk
          username
        }
      }
  }
  `
export const GET_NOVEL_BY_PK_QUERY = gql`
query($pk: Int!) {
    novels_by_pk(pk: $pk) {
      category_pk
      content
      created_at
      favorites
      pk
      read_later
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
      novels_users_favorites {
        user_pk
      }
      novels_users_favorites_aggregate {
        aggregate {
          count
        }
      }
      novels_comments {
        comment
        novel_pk
        pk
        title
        user_pk
      }
    }
  }
`

export const GET_NOVEL_BY_SEARCH = (content, category) => {
  if (content === "" && category === "全て") {
    return gql`
    query($order_by: [novels_order_by!],  $offset: Int = 0, $limit: Int = 10) {
      novels(
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
        read_later
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
        novels_users_favorites {
          user_pk
        }
        novels_users_favorites_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    `
  } else if (content === "") {
    return gql`
    query($order_by: [novels_order_by!],  $offset: Int = 0, $limit: Int = 10, $category: String!) {
      novels(where: {
        category: { name: { _eq: $category } } },
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
        read_later
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
        novels_users_favorites {
          user_pk
        }
        novels_users_favorites_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    `
  } else if (category === "全て") {
    return gql`
    query($order_by: [novels_order_by!],  $offset: Int = 0, $limit: Int = 10, $content: String!) {
      novels(where: {
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
        read_later
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
        novels_users_favorites {
          user_pk
        }
        novels_users_favorites_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    `
  }
  return gql`
  query($order_by: [novels_order_by!], $content: String!, $category: String!, $offset: Int = 0, $limit: Int = 10) {
    novels(where: {
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
      favorites
      pk
      read_later
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
      novels_users_favorites {
        user_pk
      }
      novels_users_favorites_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  `
} 

export const GET_NOVEL_BY_USER_QUERY = gql`
query MyQuery($offset: Int = 10, $limit: Int = 10, $user_pk: Int = 10) {
  novels(offset: $offset, limit: $limit, where: {user_pk: {_eq: $user_pk}}) {
    category_pk
    content
    created_at
    favorites
    pk
    read_later
    title
    user_pk
    category {
      name
      pk
    }
  }
}
`

export const GET_AI_NOVEL_BY_SEARCH = (content, category) => {
  if (content === "" && category === "全て") {
    return gql`
    query($order_by: [novels_order_by!],  $offset: Int = 0, $limit: Int = 10, $user_id: String!) {
      novels(
        where: {user_id: { _eq: $user_id } },
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
        read_later
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
        novels_users_favorites {
          user_pk
        }
        novels_users_favorites_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    `
  } else if (content === "") {
    return gql`
    query($order_by: [novels_order_by!],  $offset: Int = 0, $limit: Int = 10, $category: String!, $user_id: String!) {
      novels(where: {
        category: { name: { _eq: $category } }, user_id: { _eq: $user_id } },
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
        read_later
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
        novels_users_favorites {
          user_pk
        }
        novels_users_favorites_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    `
  } else if (category === "全て") {
    return gql`
    query($order_by: [novels_order_by!],  $offset: Int = 0, $limit: Int = 10, $content: String!, $user_id: String!) {
      novels(where: {
        content: {_iregex: $content}, user_id: { _eq: $user_id }},
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
        read_later
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
        novels_users_favorites {
          user_pk
        }
        novels_users_favorites_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    `
  }
  return gql`
  query($order_by: [novels_order_by!], $content: String!, $category: String!, $offset: Int = 0, $limit: Int = 10, $user_id: String!) {
    novels(where: {
      content: {_iregex: $content},
      category: { name: { _eq: $category } } , user_id: { _eq: $user_id }},
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
      read_later
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
      novels_users_favorites {
        user_pk
      }
      novels_users_favorites_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  `
} 

