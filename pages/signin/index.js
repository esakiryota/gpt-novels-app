import { signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert'
import Script from 'next/script'
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/ironSession/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase/config";
import toast, { Toaster } from 'react-hot-toast'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user;
        if (user) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/top'
                }
            }
        }
        return {
            props: {},
        };
    },
    ironOptions
);

const theme = createTheme();

export default function Login() {
    // const [auth, setAuth] = React.useState(false);
    const [auth_error, setAuthError] = React.useState(0);
    const [username, setUsername] = React.useState("username");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    // const session = useSession();

    const [invalidEmailBoolean, setInvalidEmailBoolean] = React.useState(false);
    const [invalidPasswordBoolean, setInvalidPasswordBoolean] = React.useState(false);
    const router = useRouter();

    const onClickLogin = async (e) => {
        e.preventDefault();
        setInvalidEmailBoolean(false);
        setInvalidPasswordBoolean(false);
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;

        const res = await fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (res.ok) {
            toast.success("ログインしました。");
            router.replace(`/novels/`);
        } else {
            toast.error("ログイン失敗しました。");
        }
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            if (errorCode === "auth/invalid-email") {
                setInvalidEmailBoolean(true);
            } 
            if (errorCode === "auth/missing-password" || errorCode === "auth/wrong-password") {
                setInvalidPasswordBoolean(true);
            }
            console.log(errorMessage)
            toast.error("ログインできませんでした。")
            // ..
          });

        
    }

    return (
        <>
            <Script src="https://example.com/script.js" />
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
                        ログイン
                    </Typography>
                    {/* <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                            <img src="/sign_in_with_google.png" onClick={() => signIn('google')} width={300} />
                        </Grid>
                        <Divider />
                    </Box> */}
                    <form method="post">
                        <Box sx={{ mt: 3 }}>
                            {auth_error == 1 && <Alert severity="error">正しいメールアドレスとパスワードを入力してください。</Alert>}
                            <Grid container spacing={2}>
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
                                    invalidEmailBoolean && 
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
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                {
                                    invalidPasswordBoolean && 
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
                                // type="submit"
                                onClick={onClickLogin}
                                // fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                ログイン
                            </Button>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        アカウントを作成
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Box>
                <Toaster />
            </Container>
        </>
    );
}





