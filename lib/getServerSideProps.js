import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "./ironSession/config";
import client from './graphql/apolloClient';
import { auth } from './firebase/config'
import { getAccessToken } from '@auth0/nextjs-auth0';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      // const auth = getAuth()
      const cu = auth.currentUser;
      const user = req.session.user;
      if (!user) {
        return {
          redirect: {
            permanent: false,
            destination: '/signin'
          }
        }
      }
      return {
        props: {
          user
        },
      };
    },
    ironOptions
  );