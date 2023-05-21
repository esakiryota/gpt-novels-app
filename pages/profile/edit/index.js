import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import { getServerSideProps } from '../../../lib/getServerSideProps';
import { UPDATE_USER_ONE_MUTATION } from '../../../lib/graphql/mutation/usersMutation'
import { GET_USERS_ONE_BY_ID_FOR_PROFILE } from '../../../lib/graphql/query/usersQuery'
import { useRouter } from 'next/router';
import { useQuery, useMutation } from "@apollo/client";
import client from '../../../lib/graphql/apolloClient';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast'

export { getServerSideProps };

export default function EditProfile({user}) {
    const pk = user.pk
    const profile = useQuery(GET_USERS_ONE_BY_ID_FOR_PROFILE, { variables: { pk } });
    const user_data = profile.data?.users[0];
    const router = useRouter();
    const [userValue, setUserValue] = React.useState({ "username": user_data?.username, "introduce": user_data?.introduce, "pk":  user_data?.pk});
    const [updateError, setUpdateError] = React.useState(0);

    const [update_users_by_pk, { data: usersRelationshipsData }] = useMutation(UPDATE_USER_ONE_MUTATION);


    const onClickUserForm = async (e) => {
        update_users_by_pk(
            {
                variables: userValue,
                onError: (error) => {
                    toast.error("データの更新に失敗しました。");
                    console.error(error);
                },
                onCompleted: () => {
                    router.replace('/profile');
                }
            }
            );
    }
    return (
        <Box>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }} >
                <Grid style={{ display: 'flex', justifyContent: 'center', padding: 3 }}>
                    <Grid >
                        プロフィール編集
                    </Grid>
                </Grid>
            </Paper>
            {
                profile.loading ? 
                <CircularProgress/>
                :
                <Paper>
                <FormControl fullWidth>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="名前"
                        defaultValue={user_data.username}
                        sx={{ margin: 3 }}
                        onChange={(e) => setUserValue({ ...userValue, "username": e.target.value })}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="自己紹介"
                        multiline
                        rows={4}
                        defaultValue={user_data.introduce}
                        sx={{ margin: 3 }}
                        onChange={(e) => setUserValue({ ...userValue, "introduce": e.target.value })}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3 }} onClick={(e) => onClickUserForm(e)} >
                        Send
                    </Button>
                </FormControl>
                <Toaster/>
            </Paper>

            }
        </Box>

    )
}