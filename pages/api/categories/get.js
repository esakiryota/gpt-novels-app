import client from '../../../lib/graphql/apolloClient';
import { GET_CATEGORIES_QUERY } from '../../../lib/graphql/query/categoriesQuery'

export default async function handler(req, res) {
    const {data , loading, error} = await client.query({ 
        query: GET_CATEGORIES_QUERY
    });

    const categories = data.categories;

    if (data.categories) {
        res.status(200).json(categories);
    }
}