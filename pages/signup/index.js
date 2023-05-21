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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    let user;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
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
            {"username" in auth_error && <Alert severity="error">正しい名前を入れてください。</Alert>}
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
              {"email" in auth_error && <Alert severity="error">正しいメールアドレスを入れてください。</Alert>}
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
              {"password" in auth_error && <Alert severity="error">正しいパスワードを入れてください。</Alert>}
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
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              アカウントを作成
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link href="/login" variant="body2">
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