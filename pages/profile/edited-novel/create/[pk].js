import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TopBar from '../../../../components/topBar';
import { getServerSideProps } from '../../../../lib/getServerSideProps';
import { GET_CATEGORIES_QUERY } from "../../../../lib/graphql/query/categoriesQuery";
import { INSERT_NOVELS_ONE_MUTATION } from "../../../../lib/graphql/mutation/novelsMutation";
import { useRouter } from 'next/router';
import { useQuery, useMutation } from "@apollo/client";
import client from '../../../../lib/graphql/apolloClient';
import toast, { Toaster } from 'react-hot-toast';
import Grid from '@mui/material/Grid';
import { GET_NOVEL_BY_PK_QUERY } from "../../../../lib/graphql/query/novelsQuery"
import { INSERT_EDITED_NOVELS_ONE_MUTATION } from "../../../../lib/graphql/mutation/editedNovelsMutation"

export { getServerSideProps };


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CreateNovel({user}) {
  const router = useRouter();
  const { pk } = router.query
  const novelsQuery = useQuery(
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
  const [insert_edited_novels_one, { data }] = useMutation(INSERT_EDITED_NOVELS_ONE_MUTATION);

  const [novelValues, setNovelValues] = React.useState({"user_pk": user.pk, "content": novelsQuery.loading ? "": novelsQuery.data?.novels_by_pk.content, "title": "", "category_pk": novelsQuery.loading ? 1 : novelsQuery.data?.novels_by_pk.category_pk, "user_id": user.id, "editor_comment": "", original_pk: pk});

  const onClickCreateNovel = async (e) => {
    insert_edited_novels_one({
        variables: novelValues,
        onError: (error) => {
            toast.error("小説の編集に失敗しました。");
            console.error(error);
        },
        onCompleted: () => {
            toast.success("小説を編集しました。");
            router.replace('/profile');
        }
    })
  }



  return (
    <Box>
      <TopBar name={"編集者投稿"} />
      <Paper>
        <FormControl fullWidth>
        <TextField
            id="outlined-multiline-static"
            label="文章"
            multiline
            rows={10}
            sx={{ margin: 3 }}
            name="content"
            defaultValue={novelsQuery.data?.novels_by_pk.content}
            onChange={(e) => setNovelValues({ ...novelValues, "content": e.target.value })}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="タイトル"
            sx={{ margin: 3 }}
            name="title"
            onChange={(e) => setNovelValues({ ...novelValues, "title": e.target.value })}
          />
          <TextField
            id="outlined-multiline-static"
            label="編集者のコメント"
            multiline
            rows={4}
            sx={{ margin: 3 }}
            name="editor_comment"
            onChange={(e) => setNovelValues({ ...novelValues, "editor_comment": e.target.value })}
          />
          <Grid sx={{textAlign: "center"}}>
          <Button variant="contained"  sx={{ margin: 3, width: '25%', height: "25%" }} onClick={(e) => onClickCreateNovel(e)}>
            投稿
          </Button>
          </Grid>
        </FormControl>
      </Paper>
      <Toaster/>
    </Box>


  )
}