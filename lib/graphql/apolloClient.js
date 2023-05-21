import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,  // エンドポイント
    headers: { 'x-hasura-admin-secret': process.env.HASURA_CLIENT_ADMIN_SECRET },  // ヘッダー
    cache: new InMemoryCache(),  // キャッシュを利用する設定
});

export default client;