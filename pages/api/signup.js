import { useQuery } from "@apollo/client"
import { GET_USERS_ONE_BY_EMAIL_QUERY } from "../../lib/graphql/query/usersQuery"
import crypto from 'crypto';
import client from '../../lib/graphql/apolloClient';
import { INSERT_USERS_ONE_MUTATION } from  "../../lib/graphql/mutation/usersMutation"

import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/ironSession/config";

export default withIronSessionApiRoute(handler, ironOptions);


async function handler(req, res) {
    const { email, password, id } = req.body;

    const {data , loading, error} = await client.query({ 
        query: GET_USERS_ONE_BY_EMAIL_QUERY,
        variables: { email } 
    });

    if (data.users.length !== 0) {
        return res.status(200).json({ message: '存在するユーザーです。' });
    }

    const hashPassword = (password) => {
      const secretWord = process.env.PASSWORD_SECRET;
      const hash = crypto.createHash('sha256').update(`${password}${secretWord}`).digest('hex');
      return hash;
    }

    const insertUser = await client.mutate({
        mutation: INSERT_USERS_ONE_MUTATION,
        variables: { email: email, password: hashPassword(password), id: id, username: "ユーザー" } 
    });

    if (insertUser.data.insert_users_one) {
      req.session.user = { username: insertUser.data.insert_users_one.username, id: insertUser.data.insert_users_one.id, email: insertUser.data.insert_users_one.email, pk: insertUser.data.insert_users_one.pk};
      await req.session.save();
      res.send({ ok: true });
    } else {
      res.send({ ok: false });
    }
  }