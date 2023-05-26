import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { auth } from "../../lib/firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { checkAuthToken } from "../../lib/firebase/checkAuthToken";
import toast, { Toaster } from 'react-hot-toast'
// import { getServerSideProps } from '../../lib/getServerSideProps'

// export { getServerSideProps };

const theme = createTheme();

export default function Register() {

  const [auth, setAuth] = React.useState(false);
  const [auth_error, setAuthError] = React.useState({});
  const onClickRegister = async (e) => {
  }

  const [username, setUsername] = React.useState("username");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const router = useRouter();

  const [isInvalidEmail, setIsInvalidEmail] = React.useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = React.useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsInvalidEmail(false);
    setIsInvalidPassword(false);
    const auth = getAuth();
    let user;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const id = userCredential.user.uid

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, id }),
    });

    if (res.ok) {
       router.replace(`/novels/`);
    } else {
      console.error("signup失敗");
    }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      if (errorCode === "auth/invalid-email") {
        setIsInvalidEmail(true);
      } 
      if (errorCode === "auth/missing-password" || errorCode === "auth/wrong-password") {
        setIsInvalidPassword(true);
      }
      if (errorCode === "auth/email-already-in-use") {
        toast.error("そのユーザーは既に登録ずみです");
      }
      toast.error("アカウント作成できませんでした。")
      // ..
    });
  }


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            アカウント作成
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
           
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="名前"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                                {
                                    isInvalidEmail && 
                                    <Typography
                                    sx={{ display: 'inline', color: "red" }}
                                    component="span"
                                    variant="body2"
                                  >
                                    ※メールアドレスが正しくありません
                                  </Typography>
                                }
                                </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) =>setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                                {
                                    isInvalidPassword && 
                                    <Typography
                                    sx={{ display: 'inline', color: "red" }}
                                    component="span"
                                    variant="body2"
                                  >
                                    ※パスワードが正しくありません
                                  </Typography>
                                }
                                </Grid>
            </Grid>
            <Grid sx={{ textAlign: "center"}}>
            <Button
              onClick={handleSubmit}
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              アカウントを作成
            </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link href="/signin" variant="body2">
                 ログインする
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Toaster />
      </Container>
  );
}