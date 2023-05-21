import styles from '../styles/Home.module.css';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import Link from 'next/link';
import Root from '../components/navigation'
import { useQuery } from "@apollo/client"
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/ironSession/config";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      const user = req.session.user;
      if (!user) {
        const authCheck = false;
        return {
            props: {
                auth: authCheck
            }
        }
      } else {
        const authCheck = true;
        return {
            props: {
                user: user,
                auth: authCheck
            }
        }
      }
    },
    ironOptions
  );

export default function Home({user}) {
  const width = typeof window !== "undefined" ? window.innerWidth : undefined;
  const height = typeof window !== "undefined" ? window.innerWidth : undefined;

  const [width_state, setWidthState] = React.useState(width);
  const [height_state, setHeightState] = React.useState(height);
  React.useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const updateSize = () => {
        setWidthState(window.innerWidth);
        setHeightState(window.innerHeight);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
    }
  }, [])

  const TopPageView = styled(Paper)(({ theme }) => ({
      backgroundImage: `url(${process.env.PUBLIC_URL + '/top.png'})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      margin: -30,
      width: width_state,
      height: height_state,
      '&::before': {
          position: "absolute",
          left: 0,
          top: 63,
          width: width_state,
          height: height_state,
          backgroundColor: "rgba(0,0,0,.5)",
          content: `''`,
      }
  }))

  return (
      <TopPageView>
          <Typography variant="h6" component="div" sx={{ textAlign: "center", verticalAlign: 'center', position: "relative", top: "20%", fontWeight: "bold", fontSize: "40px", color: "white" }}>
          <img src='/levonia.png'/><br /><span style={{ fontSize: "30px" }}>〜AI小説のシェアプラットフォーム〜</span>
              <br /><Link href={`/novels/`} style={{ color: "black", textDecoration: "none" }}><Button variant="contained"  style={{backgroundColor: 'blue'}}>AI小説を読む</Button></Link>
          </Typography>
      </TopPageView>
  )
}
