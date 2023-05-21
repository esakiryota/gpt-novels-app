import { useQuery } from "@apollo/client"
import { GET_USERS_ONE_BY_EMAIL_QUERY } from "../../lib/graphql/query/usersQuery";
import crypto from 'crypto';
import client from '../../lib/graphql/apolloClient';

import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/ironSession/config";

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
    const { email, password } = req.body;

    const {data , loading, error} = await client.query({ 
      query: GET_USERS_ONE_BY_EMAIL_QUERY,
      variables: { email } 
    });

    const hashPassword = (password) => {
      const secretWord = process.env.PASSWORD_SECRET;
      const hash = crypto.createHash('sha256').update(`${password}${secretWord}`).digest('hex');
      return hash;
    };

    if (email === data.users[0].email && hashPassword(password) === data.users[0].password) {
      req.session.user = { username: data.users[0].username, id: data.users[0].id, email: data.users[0].email, pk: data.users[0].pk};
      await req.session.save();
      res.send({ ok: true });
    } else {
      res.send({ ok: false });
    }
  }