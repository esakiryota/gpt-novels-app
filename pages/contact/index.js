import Box from '@mui/material/Box';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { getServerSideProps } from '../../lib/getServerSideProps'

export { getServerSideProps };


function Contact() {
    const homeUrl = process.env.PUBLIC_URL;

    const [alert, setAlert] = React.useState(0)
    const handleSendClick = async () => {
        // const res = await sendEmail(value)
        // if (!res.ok) {
        //     setAlert(1)
        // } else {
        //     setAlert(2)
        // }
    }

    let value = {
        "email": "",
        "content": "",
    }


     return (
        <Box >
            <Container component="main" maxWidth="sm">
            <Paper maxWidth="xs" elevation={3} sx={{ padding: 2, marginBottom: 2 }} >
                <Grid style={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
                    <Grid >
                        お問い合わせ
                    </Grid>
                </Grid>
            </Paper>
            <Paper>
                
                  <FormControl fullWidth>
                  {alert == 1 && <Alert severity="error">送信が完了できませんでした。</Alert>}
                  {alert == 2 && <Alert severity="success">送信が完了しました。</Alert>}
                    <TextField
                        id="outlined-multiline-flexible"
                        label="返信用メールアドレス"
                        sx={{margin: 3}}
                        onChange={(e) => value["email"] = e.target.value}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="内容"
                        multiline
                        rows={4}
                        defaultValue="内容"
                        sx={{margin: 3}}
                        onChange={(e) => value["content"] = e.target.value}
                    />
                    <Grid sx={{textAlign:"center"}}>
                    <Button variant="contained" sx={{ margin: 3, width: '25%', height: "25%" }} onClick={handleSendClick}>
                        Send
                    </Button>
                    </Grid>
                </FormControl>
            </Paper>
            </Container>
        </Box>

    )
}

export default Contact;