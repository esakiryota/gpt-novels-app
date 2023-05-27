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
import { getServerSideProps } from '../../lib/getServerSideProps'
import { GET_USERS_ONE_BY_ID_FOR_PROFILE } from '../../lib/graphql/query/usersQuery'
import { GET_NOVEL_BY_USER_QUERY } from '../../lib/graphql/query/novelsQuery'
import { GET_EDITED_NOVEL_BY_USER_QUERY } from '../../lib/graphql/query/editedNovelsQuery'
import { DELETE_EDITED_NOVELS_ONE_MUTATION } from '../../lib/graphql/mutation/editedNovelsMutation'
import { DELETE_NOVELS_ONE_MUTATION } from '../../lib/graphql/mutation/novelsMutation'
import { useQuery, useMutation } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import client from '../../lib/graphql/apolloClient';
import toast, { Toaster } from 'react-hot-toast'

export { getServerSideProps };


function StrToDate(props) {
    const date = props.date;
    const arr = date.split('T')
    return (
        <>
        {arr[0]}
        </>
    )
}


function ProfileCard({user}) {
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
                    <Link href="/profile/follow/" style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                    フォロー<br/>
                    {user.users_follow_relationships_aggregate.aggregate.count}
                    </Link>
                </Grid>
                <Grid item xs={4}>
                <Link href="/profile/follower/" style={{textDecoration: 'none', color: "black", fontSize: 14}}>
                    フォロワー<br/>
                    {user.users_follower_relationships_aggregate.aggregate.count}
                    </Link>
                </Grid>
                </Grid>
            </Grid>
            <Grid>
                    <Link href="/profile/edit"><Button>プロフィール編集</Button></Link>
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

function ProfileNovelsComponent({loading, novels, limit, offset, handleDeleteClick, setOffset, title}) {
    console.log(novels)
    return (
        <>
        <TopBar name={title} />
        {
            loading ?
            <CircularProgress/>
            :
            <>
            <Paper sx={{ width: "100%" }}>
            {novels.map((value, index) => (
                <>
                    <Grid style={{ display: 'flex', padding: 10, margin: 3 }}>
                        <Grid container sx={{ marginLeft: 3, fontWeight: "bold" }}>
                            <Grid item xs={8} md={8}>
                                <Typography variant="body2" color="text.secondary">
                                   <StrToDate date={value["created_at"]} />
                                </Typography>
                            </Grid>
                            <Grid item xs={4} md={4} sx={{ textAlign: "right" }}>
                                {title === "投稿した小説" && <><Link href={`/profile/novel/update/${value["pk"]}`}><ModeEditIcon /></Link><DeleteIcon onClick={(e) => handleDeleteClick(value["pk"])} /></>}
                                {title === "編集した小説" && <><Link href={`/profile/edited-novel/update/${value["pk"]}`}><ModeEditIcon /></Link><DeleteIcon onClick={(e) => handleDeleteClick(value["pk"])} /></>}
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
        loading ?
        <CircularProgress />
        :
        <>前</>
    }
            </Button>
            <Button variant="outlined" color="inherit" style={{ backgroudColor: "black" }} size="large" onClick={() => setOffset(offset + limit)} disabled={novels.length < limit}>
                {
        loading ?
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

function ProfileNovels({user_pk, novelType}) {
    const router = useRouter();
    const limit = 4; // 1ページあたりのアイテム数
    const [offset, setOffset] = React.useState(0);
    const [delete_novels_by_pk, { data }] = useMutation(DELETE_NOVELS_ONE_MUTATION);
    const [delete_edited_novels_by_pk, { data: editedNovelData }] = useMutation(DELETE_EDITED_NOVELS_ONE_MUTATION)

    const novelsQuery = useQuery(
        GET_NOVEL_BY_USER_QUERY,
        { 
            variables: { limit, offset, user_pk} ,
            fetchPolicy: 'network-only'
        }
    )

    const editedNovelsQuery = useQuery(
        GET_EDITED_NOVEL_BY_USER_QUERY,
        {
            variables: { limit, offset, user_pk} ,
            fetchPolicy: 'network-only'
        }
    )

    // const [novelsQuery,  setNovelsQuery] = React.useState(initNovelsQuery)

    if (novelType === 0) {

    }

    const handleNovelsDeleteClick = async (pk) => {
        delete_novels_by_pk({
            variables: {pk},
            onError: (error) => {
                toast.error("データの更新に失敗しました。");
                console.error(error);
            },
            onCompleted: () => {
                toast.success("小説を削除しました。");
                novelsQuery.refetch();
            }
        })
    }

    const handleEditedNovelsDeleteClick = async (pk) => {
        delete_edited_novels_by_pk({
            variables: {pk},
            onError: (error) => {
                toast.error("データの更新に失敗しました。");
                console.error(error);
            },
            onCompleted: () => {
                toast.success("小説を削除しました。");
                editedNovelsQuery.refetch();
            }
        })
    }

    console.log(novelsQuery.loading)

    return (
        <>
        {novelType === 0 && 
         <>
        {
            novelsQuery.loading ?
            <></>
            :
            <ProfileNovelsComponent loading={novelsQuery.loading} novels={novelsQuery.data?.novels} limit={limit} offset={offset} handleDeleteClick={handleNovelsDeleteClick} setOffset={setOffset} title={"投稿した小説"}/>
        }
        </>
        }
        {novelType === 1 && 
        <>
        {
        editedNovelsQuery.loading ?
        <></>
        :
            <ProfileNovelsComponent loading={editedNovelsQuery.loading} novels={editedNovelsQuery.data?.edited_novels} limit={limit} offset={offset} handleDeleteClick={handleEditedNovelsDeleteClick} setOffset={setOffset} title={"編集した小説"}/>
    }
    </>
}
        </>
    )
}


export default function Profile({user}) {
    const pk = user.pk
    const [novelType, setNovelType] = React.useState(0);
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
        const handleClick = (e) => {
            const text = e.target.innerText;
            if (text === "投稿した小説") {
                setNovelType(0)
            } else if (text === "編集した小説") {
                setNovelType(1)
            } else if (text === "いいねした小説") {
                setNovelType(2)
            } else if (text === "コメントした小説") {
                setNovelType(3)
            }
        }


    
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} style={{}}>
                    {profile.loading ?
                    <CircularProgress />
                    :
                    <ProfileCard user={profile.data?.users[0]}/>
                    }
                    <Paper sx={{ width: "100%", padding: 3 }}>
        <Chip label={"投稿した小説"} variant={novelType === 0 ? "filled" : "outlined"} onClick={handleClick} sx={{ margin: 0.5 }} />
        <Chip label={"編集した小説"} variant={novelType === 1 ? "filled" : "outlined"} onClick={handleClick} sx={{ margin: 0.5 }} />
        <Chip label={"いいねした小説"} variant={novelType === 2 ? "filled" : "outlined"} onClick={handleClick} sx={{ margin: 0.5 }} />
        <Chip label={"コメントした小説"} variant={novelType === 3 ? "filled" : "outlined"} onClick={handleClick} sx={{ margin: 0.5 }} />
    </Paper>
                </Grid>
                <Grid item xs={12} md={8} style={{}}>
                    {profile.loading ?
                    <CircularProgress />
                    :
                    <ProfileNovels user_pk={pk} novelType={novelType} />
                    }
                </Grid>
            </Grid>
            <Toaster/>
        </Box>
    )
}