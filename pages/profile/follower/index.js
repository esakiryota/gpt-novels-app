import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import ModeIcon from '@mui/icons-material/Mode';
import TopBar from '../../../components/topBar';
import { getServerSideProps } from '../../../lib/getServerSideProps';
import { GET_USERS_ONE_BY_PK_QUERY, GET_USERS_ONE_BY_ID_FOR_FOLLOWER } from "../../../lib/graphql/query/usersQuery"
import { useQuery } from "@apollo/client"
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast'

export { getServerSideProps };

export default function ProfileFollowList({user}) {

    const userQuery = useQuery(
        GET_USERS_ONE_BY_ID_FOR_FOLLOWER, 
        {
            variables: { pk: user.pk },
            onError: (error) => {
                toast.error("データの取得に失敗しました。");
                console.error(error);
            },
        })

    return (
        <Box>
            <TopBar name="フォローされている人" />
            <Grid container spacing={3}>
                {
                    userQuery.loading ?
                    <CircularProgress />
                    :
                    <>
                    {userQuery.data.users_by_pk.users_follower_relationships.map((value, index) => (
                        <Grid item xs={12} md={4} style={{ display: 'flex' }}>
                            <Link href={`/profile/${value.users_follow_relationships_user.pk}`} style={{ width: "100%", textDecoration: "none", color: "black" }}>
                                <Paper sx={{ width: "100%", }} style={{ padding: 3, textAlign: "center", marginBottom: 5 }}>
                                    <Grid style={{ padding: 10, margin: 3 }}>
                                        <Typography variant="h6" component="div" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Avatar
                                                sx={{ bgcolor: "grey" }}
                                                alt="Remy Sharp"
                                                src="/broken-image.jpg"
                                            >
                                                <PersonIcon />
                                            </Avatar>
                                        </Typography>
                                        <Grid>
                                            <Typography variant="h6" component="div" >
                                                {value.users_follow_relationships_user.username}
                                            </Typography>
                                            <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line' }} >
                                                {value.users_follow_relationships_user.introduce}
                                            </Typography>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={4}>
                                            <Link href="/" style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                                                    コメント<br />
                                                    {value.users_follow_relationships_user.users_comments_aggregate.aggregate.count}
                                                </Link>
                                            </Grid>
                                            <Grid item xs={4}>
                                              <Link href="/" style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                                                    フォロー<br />
                                                    {value.users_follow_relationships_user.users_follow_relationships_aggregate.aggregate.count}
                                                </Link>
                                            </Grid>
                                            <Grid item xs={4}>
                                            <Link href="/" style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                                                    フォロワー<br />
                                                    {value.users_follow_relationships_user.users_follower_relationships_aggregate.aggregate.count}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                    </>

                }
            </Grid>
            <Toaster/>
        </Box>
    )
}