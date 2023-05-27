import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import TopBar from '../../components/topBar';

import Link from 'next/link';
import { GET_USERS_ONE_BY_ID_FOR_PROFILE } from '../../lib/graphql/query/usersQuery'
import { GET_USERS_FOLLOW_RELATIONSHIPS_QUERY } from '../../lib/graphql/query/usersRelationshipsQuery'
import { DELETE_NOVELS_ONE_MUTATION } from '../../lib/graphql/mutation/novelsMutation';
import { INSERT_USERS_RELATIONSHIPS_ONE_MUTATION, DELETE_USERS_RELATIONSHIPS_ONE_MUTATION } from '../../lib/graphql/mutation/usersRelationshipsMutation'
import { useQuery, useMutation } from "@apollo/client"
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast'

import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/ironSession/config"; 
import { auth } from "../../lib/firebase/checkAuthToken";

import { GET_NOVEL_BY_USER_QUERY } from '../../lib/graphql/query/novelsQuery'


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      const url = req.url;
      const pattern = /\/profile\/(\d+)/;
      const matches = url.match(pattern);
      const user = req.session.user;

      if (!user) {
        return {
          redirect: {
            permanent: false,
            destination: '/signin'
          }
        }
      }

    if (matches && matches.length > 1) {
        const pk = matches[1];
        if (user.pk === parseInt(pk)) {
            console.log("redirect")
            return {
                redirect: {
                  permanent: false,
                  destination: '/profile/'
                }
              }
        }
    } else {
        console.log("ID not found");
    }
      return {
        props: {
          user
        },
      };
    },
    ironOptions
  );

function FollowButton({user_pk, user_id, pk, id}) {
    const checkFollowQuery = useQuery(
        GET_USERS_FOLLOW_RELATIONSHIPS_QUERY,
        { 
            variables: { follow_pk: user_pk, follower_pk: pk } ,
            fetchPolicy: 'network-only',
            onError: (error) => {
                toast.error("データの取得に失敗しました。");
                console.error(error);
            },
        }
    )

    const [followBoolean, setFollowBoolean] = React.useState(checkFollowQuery.data?.users_relationships.length > 0)
    
    const [insert_users_relationships_one, { data: usersRelationshipsData }] = useMutation(INSERT_USERS_RELATIONSHIPS_ONE_MUTATION);
    
    const follow = checkFollowQuery.loading ? false : checkFollowQuery.data.users_relationships.length;
    const handleFollow = (e) => {
        setFollowBoolean(true)
        insert_users_relationships_one({
            variables: {follow_pk: user_pk, follower_pk: pk, follow_id: user_id, follower_id: id},
            onError: (error) => {
                toast.error("データの更新に失敗しました。");
                console.error(error);
                setFollowBoolean(false)
            },
            onCompleted: () => {
                toast.success("フォローしました。");
                checkFollowQuery.refetch()
            }
        })
    }

    const [delete_users_relationships, { data: deletedUsersRelationshipsData }] = useMutation(DELETE_USERS_RELATIONSHIPS_ONE_MUTATION);

    const handleDeleteFollow = async (e) => {
        setFollowBoolean(false)
        delete_users_relationships({
            variables: {follow_pk: user_pk, follower_pk: pk} ,
            onError: (error) => {
                toast.error("データの更新に失敗しました。");
                console.error(error);
                setFollowBoolean(true)
            },
            onCompleted: () => {
                toast.success("フォローを外しました。");
                checkFollowQuery.refetch()
            }
        })
    }
    return (
        <>
        {
            checkFollowQuery.loading ?
            <></>
            :
            <>
            {
            followBoolean ?
            <Button onClick={handleDeleteFollow}>フォローを外す</Button>
            :
            <Button onClick={handleFollow}>フォローする</Button>
        }
            </>

        }
        </>
    )
}

function StrToDate(props) {
    const date = props.date;
    const arr = date.split('T')
    return (
        <>
        {arr[0]}
        </>
    )
}


function ProfileCard({user, user_pk, user_id}) {
    return (
        <>
        <Paper sx={{ width: "100%", }} style={{ padding: 3, textAlign: "center" ,marginBottom: 5}}>
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
                        {user.username}
                    </Typography>
                    <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line' }} >
                        {user.introduce}
                    </Typography>
                </Grid>
                <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Link href="/" style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                    コメント<br/>
                    {user.users_comments_aggregate.aggregate.count}
                    </Link>
                </Grid>
                <Grid item xs={4}>
                <Link href={`/profile/follow/${user.pk}`} style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                    フォロー<br/>
                    {user.users_follow_relationships_aggregate.aggregate.count}
                    </Link>
                </Grid>
                <Grid item xs={4}>
                <Link href={`/profile/follower/${user.pk}`} style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                    フォロワー<br/>
                    {user.users_follower_relationships_aggregate.aggregate.count}
                    </Link>
                </Grid>
                </Grid>
            </Grid> 
            <Grid>
                    <FollowButton user_pk={user_pk} user_id={user_id} pk={user.pk} id={user.id}/>
            </Grid>
        </Paper>
        </>
    )
}

function NovelContent(props) {
    const content = props.content;
    var result = content.substr( 0, 100 );
    if (result.length > 99) {
        result += "..."
    }

    return (
        <>
        {result}
        </>
    )
}

function ProfileNovels(props) {
    const router = useRouter();
    const [delete_novels_by_pk, { data: deletedNovelsData }] = useMutation(DELETE_NOVELS_ONE_MUTATION);
    const limit = 4; // 1ページあたりのアイテム数
    const [offset, setOffset] = React.useState(0);
    const handleDeleteClick = async (pk) => {
        delete_novels_by_pk(
            {
                variables: {pk},
                onError: (error) => {
                    toast.error("データの更新に失敗しました。");
                    console.error(error);
                },
                onCompleted: () => {
                    toast.success("小説を削除しました。");
                    props.profile.refetch();
                }
             });
    }

    const user_pk = props.profile.data?.users[0].pk

    const novelsQuery = useQuery(
        GET_NOVEL_BY_USER_QUERY,
        { 
            variables: { limit, offset, user_pk} ,
            fetchPolicy: 'network-only'
        }
    )

    console.log(novelsQuery)


    return (
        <>
        <TopBar name={"投稿した小説"} />
        {
            novelsQuery.loading ?
            <CircularProgress/>
            :
            <>
        <Paper sx={{ width: "100%" }}>
            {novelsQuery.data.novels.map((value, index) => (
                <>
                    <Grid style={{ display: 'flex', padding: 10, margin: 3 }}>
                        <Grid container sx={{ marginLeft: 3, fontWeight: "bold" }}>
                            <Grid item xs={8} md={8}>
                                <Typography variant="body2" color="text.secondary">
                                   <StrToDate date={value["created_at"]} />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography variant="h5" component="div">
                                    {value["title"]}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        <><Chip label={value.category["name"]} variant="outlined" size="small" sx={{ marginLeft: 1 }} ></Chip></>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
                                <Typography variant="body2">
                                   <NovelContent content={value["content"]} />
                                   <Link href={`/novels/${value["pk"]}`}>続きを読む</Link>
                                </Typography>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Divider />
                </>
            ))}
        </Paper>
        <Box sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sx={{ textAlign: "center", margin: 5 }}>
            <Button variant="outlined" color="inherit" style={{ backgroudColor: "black" }} size="large" onClick={() => setOffset(offset - limit)} disabled={offset === 0}>
                {
        novelsQuery.loading ?
        <CircularProgress />
        :
        <>前</>
    }
            </Button>
            <Button variant="outlined" color="inherit" style={{ backgroudColor: "black" }} size="large" onClick={() => setOffset(offset + limit)} disabled={novelsQuery.data.novels.length < limit}>
                {
        novelsQuery.loading ?
        <CircularProgress />
        :
        <>次</>
    }
            </Button>
        </Grid>
    </Box>
    </>
}
        </>
    )
}

function ProfileComments(props) {
    return (
        <>
        <TopBar name={"投稿したコメント"} />
       
        <Paper sx={{ width: "100%" }}>
        {props.comments.map((value, index) => (
            <>
                <Grid style={{ display: 'flex', padding: 10, margin: 3 }}>
                    <Grid container sx={{ marginLeft: 3, fontWeight: "bold" }}>
                        <Grid item xs={8} md={8}>
                            <Typography variant="body2" color="text.secondary">
                            <StrToDate date={value["created_at"]} />
                            </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                        <Typography >
                                <Link href={`/novel/${ value["novel"]["pk"]}`} style={{textDecoration: "none", color: "black"}}>{value["novel"]["title"]}へ</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h5" component="div">
                                {value["title"]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
                            <Typography variant="body2">
                               <NovelContent content={value["content"]} />
                            </Typography>
                        </Grid>

                    </Grid>

                </Grid>
                <Divider />
            </>
        ))}

    </Paper>
    </>
    )
}


export default function Profile({user}) {
    const router = useRouter();
    const { pk } = router.query
    const profile = useQuery(
        GET_USERS_ONE_BY_ID_FOR_PROFILE, 
        { 
            variables: { pk } ,
            fetchPolicy: 'network-only',
            onError: (error) => {
                toast.error("データの取得に失敗しました。");
                console.error(error);
            },
        })
    
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} style={{}}>
                    {profile.loading ?
                    <CircularProgress />
                    :
                    <ProfileCard user={profile.data?.users[0]} user_pk={user.pk} user_id={user.id}/>
                    }
                </Grid>
                <Grid item xs={12} md={8} style={{}}>
                    {profile.loading ?
                    <CircularProgress />
                    :
                    <ProfileNovels novels={profile.data?.users[0].users_novels} profile={profile} />
                    }
                </Grid>
            </Grid>
            <Toaster/>
        </Box>
    )
}