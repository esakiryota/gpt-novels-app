import client from '../../../lib/graphql/apolloClient';
import { GET_CHATGPT_USER_QUERY } from '../../../lib/graphql/query/usersQuery'

export default async function handler(req, res) {
    const {data , loading, error} = await client.query({ 
        query: GET_CHATGPT_USER_QUERY
    });

    const user = data.users[0];

    if (data.users) {
        res.status(200).json(user);
    }
}