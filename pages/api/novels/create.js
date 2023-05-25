import client from '../../../lib/graphql/apolloClient';
import { INSERT_NOVELS_ONE_MUTATION } from '../../../lib/graphql/mutation/novelsMutation'

export default async function handler(req, res) {
    const { title, user_pk, content, category_pk, user_id } = JSON.parse(req.body);
    const insertNovel = await client.mutate({
        mutation: INSERT_NOVELS_ONE_MUTATION,
        variables: { title, user_pk, content, category_pk, user_id }
    });

    const data = {msg: "success!"}
    
    if (insertNovel.data.insert_novels_one) {
        res.status(200).json(data);
    }
}