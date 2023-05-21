

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useRouter } from 'next/router'
import { GET_NOVEL_BY_PK_QUERY } from "../../lib/graphql/query/novelsQuery"
import { GET_USERS_ONE_BY_PK_QUERY } from "../../lib/graphql/query/usersQuery"
import { GET_USERS_FAVORITES_ONE } from "../../lib/graphql/query/usersFavoritesQuery"
import { INSERT_USERS_FAVORITES_ONE_MUTATION, DELETE_USERS_FAVORITES_ONE_MUTATION } from "../../lib/graphql/mutation/usersFavoritesMutation"
import { INSERT_COMMENT_ONE_MUTATION, DELETE_COMMENT_ONE_MUTATION, UPDATE_COMMENT_ONE_MUTATION } from "../../lib/graphql/mutation/commentsMutation"
import CircularProgress from '@mui/material/CircularProgress';
import client from '../../lib/graphql/apolloClient';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery, useMutation } from "@apollo/client"
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../../lib/ironSession/config";

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

function StrToDate(props) {
    const date = props.date;
    const arr = date.split('T')
    return (
        <>
        {arr[0]}
        </>
    )
}

export default function Novel({user}) {
const router = useRouter()
const { pk } = router.query

const {data , loading, refetch} = useQuery(
  GET_NOVEL_BY_PK_QUERY, 
  { variables: { pk },
  onError: (error) => {
    toast.error("データの取得に失敗しました。");
    console.error(error)
  },
  onCompleted: (data) => {
    console.log(data)
  }
},
  );



const novel = data === undefined ? {} : data?.novels_by_pk;

const usersFavoritesQuery = user === undefined ? false : useQuery(
  GET_USERS_FAVORITES_ONE, 
  {
    variables: {user_pk: user.pk, novel_pk: pk},
    onError: (error) => {
      toast.error("データの取得に失敗しました。");
      console.error(error)
    },
    onCompleted: (data) => {
      console.log(data)
    }
  })


  const favoritePk = usersFavoritesQuery.loading || usersFavoritesQuery.data?.users_favorite.length === 0 ? 0 : usersFavoritesQuery.data?.users_favorite[0].pk;

  const [editMode, setEditMode] = React.useState(-1)
  const [commentEditValue, setCommentEditValue] = React.useState(user === undefined ? false : { "title": "", "comment": "", "user_pk": user.pk, "novel_pk": pk, "user_id": user.id })

  const [insert_comments_one, { data: commentData }] = useMutation(INSERT_COMMENT_ONE_MUTATION);

  const onClickCreateComment = (e) => {
    insert_comments_one({
      variables: commentEditValue,
      onError: (error) => {
          toast.error("コメントに失敗しました。");
          console.error(error);
      },
      onCompleted: () => {
          toast.success("コメントしました。");
          refetch();
      }
  })
  }

  const [delete_comments_by_pk, { data: deletedCommentData }] = useMutation(DELETE_COMMENT_ONE_MUTATION);

  const handleDeleteClick = (pk) => {
  delete_comments_by_pk({
    variables: { pk },
    onError: (error) => {
        toast.error("データの更新に失敗しました。");
        console.error(error);
    },
    onCompleted: () => {
        toast.success("削除しました。");
        refetch();
    }
})
  }

  const handleEditClick = (pk, title, comment) => {
    setEditMode(pk)
    setCommentEditValue({...commentEditValue, "title": title, "comment": comment })
  }

  const [update_comments_by_pk, { data: updatedCommentData }] = useMutation(UPDATE_COMMENT_ONE_MUTATION);

  const onClickUpdateComment = (pk) => {
    console.log(commentEditValue)
    update_comments_by_pk({
      variables: {pk: pk, user_id: commentEditValue.user_id, user_pk: commentEditValue.user_pk, title: commentEditValue.title, comment:commentEditValue.comment, novel_pk: commentEditValue.novel_pk },
      onError: (error) => {
          toast.error("コメントに失敗しました。");
          console.error(error);
      },
      onCompleted: () => {
          toast.success("コメントしました。");
          refetch();
      }
  })
  }

  const handleEditCancelClick = (pk) => {
    setEditMode(-1)
  }

  const [insert_users_favorite_one, { data: usersFavoriteData }] = useMutation(INSERT_USERS_FAVORITES_ONE_MUTATION);

  const handleFavoriteClick = (e) => {
    insert_users_favorite_one({
    variables: {user_pk: user.pk, novel_pk: pk, user_id: user.id},
    onError: (error) => {
        toast.error("データの更新に失敗しました。");
        console.error(error);
    },
    onCompleted: () => {
        toast.success("いいねしました。");
        usersFavoritesQuery.refetch();
    }
})
  }

  const [delete_users_favorite_by_pk, { data: deletedUsersFavoriteData }] = useMutation(DELETE_USERS_FAVORITES_ONE_MUTATION);

  const handleDeleteFavoriteClick = (pk) => {
    delete_users_favorite_by_pk({
    variables: { pk: favoritePk },
    onError: (error) => {
        toast.error("データの更新に失敗しました。");
        console.error(error);
    },
    onCompleted: () => {
        toast.success("いいね削除しました。");
        usersFavoritesQuery.refetch();
    }
  })
  }


  return (
    <>
      <Paper>
        {
            loading ?
            <CircularProgress />
            :
            <>
            <Grid sx={{ margin: 3, fontWeight: "bold", padding: 3 }}>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" component="div">
              <StrToDate date={novel["created_at"]} />
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            投稿者: <Link href={`/profile/${novel["user"]["pk"]}/`}>{novel["user"]["username"]}</Link>
          </Grid>
          <Typography variant="h5" component="div">
            {novel.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div">
              <>
                <Chip label={novel["category"]["name"]} variant="outlined" sx={{ margin: 0.5 }} />
              </>
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}  component="div">
            {novel["content"]}
          </Typography>
        </Grid>
        <Grid>
          <Typography sx={{ fontSize: 14, padding: 4, margin: 3 }} color="text.secondary" gutterBottom  component="div">
          </Typography>
        </Grid>
        <Grid>
          <Typography sx={{ fontSize: 14, padding: 4, margin: 3 }} color="text.secondary" gutterBottom>
            {user &&
            <>
              {
                usersFavoritesQuery.loading ? 
                <CircularProgress />
                :
                <>
                {
                usersFavoritesQuery.data.users_favorite.length ?
                  <IconButton edge="end" aria-label="comments"><FavoriteBorderIcon onClick={(e) => handleDeleteFavoriteClick(e)} sx={{ color: "pink" }} /></IconButton>
                  :
                  <IconButton edge="end" aria-label="comments"><FavoriteBorderIcon onClick={(e) => handleFavoriteClick(e)} /></IconButton>
                }
              </>
              }
            </>
            }
          </Typography>
        </Grid>
        </>
        }
        <Divider />
        <Grid>
          {
            loading ? 
            <CircularProgress />
            :
            <>
            { user !== undefined &&
              <>
            <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
                    {data.novels_by_pk.novels_comments.map((value, index) => (
                      <>
                        {editMode !== value["pk"] ?
                          <ListItem alignItems="flex-start" secondaryAction={
                            user &&
                            <>
                              {value["user_pk"] === user.pk &&
                                <>
                                  <IconButton edge="end" aria-label="comments">
                                    <ModeEditIcon onClick={(e) => handleEditClick(value["pk"], value["title"], value["comment"])} />
                                  </IconButton>
                                  <IconButton edge="end" aria-label="comments">
                                    <DeleteIcon onClick={(e) => handleDeleteClick(value["pk"])} />
                                  </IconButton>
                                </>
                              }
                            </>
        
                          }>
                            <ListItemText
                              primary={value["title"]}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {value["user_pk"]} -
                                  </Typography>
                                  {value["comment"]}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          :
                          <FormControl fullWidth>
                            <TextField
                              id="outlined-multiline-flexible"
                              label="タイトル"
                              sx={{ margin: 3 }}
                              defaultValue={commentEditValue["title"]}
                              onChange={(e) => setCommentEditValue({ ...commentEditValue, "title": e.target.value })}
                            />
                            <TextField
                              id="outlined-multiline-static"
                              label="内容"
                              multiline
                              rows={4}
                              defaultValue={commentEditValue["comment"]}
                              sx={{ margin: 3 }}
                              onChange={(e) => setCommentEditValue({ ...commentEditValue, "comment": e.target.value })}
                            />
                            <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3 }} onClick={(e) => onClickUpdateComment(value["pk"])}>
                              Send
                            </Button>
                            <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3 }} onClick={(e) => handleEditCancelClick(e)}>
                              Cancel
                            </Button>
                          </FormControl>
        
                        }
                        <Divider variant="inset" component="li" />
                      </>
                    ))}
                  </List>
                  <FormControl fullWidth>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="タイトル"
                    sx={{ margin: 3 }}
                    defaultValue={commentEditValue["title"]}
                    onChange={(e) => setCommentEditValue({ ...commentEditValue, "title": e.target.value })}
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="内容"
                    multiline
                    rows={4}
                    defaultValue={commentEditValue["content"]}
                    sx={{ margin: 3 }}
                    onChange={(e) => setCommentEditValue({ ...commentEditValue, "comment": e.target.value })}
                  />
                  <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3 }} onClick={(e) => onClickCreateComment(e)}>
                    Send
                  </Button>
                </FormControl>
                </>
            }
            </>
          }
                </Grid>
      </Paper>
      <Toaster />
    </>
  )
}