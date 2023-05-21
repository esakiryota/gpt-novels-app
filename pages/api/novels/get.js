import client from '../../../lib/graphql/apolloClient';
import { GET_NOVELS_QUERY } from '../../../lib/graphql/query/novelsQuery'

export default async function handler(req, res) {
    const {data , loading, error} = await client.query({ 
        query: GET_NOVELS_QUERY
    });

    const novels = data.novels;

    if (data.novels) {
        res.status(200).json(novels);
    }
}