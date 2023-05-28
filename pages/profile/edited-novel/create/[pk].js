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

function calculateMatchRate(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = [];

  if (len1 === 0) return len2;
  if (len2 === 0) return len1;

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = (str1[i - 1] !== str2[j - 1]) ? 1 : 0;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLength = Math.max(len1, len2);
  const matchRate = ((maxLength - distance) / maxLength) * 100;

  return 100 - matchRate;
}

// 例として "kitten" と "sitting" の一致率を計算する
const str1 = "kitten";
const str2 = "sitting";
const matchRate = calculateMatchRate(str1, str2);

console.log(`一致率: ${matchRate.toFixed(2)}%`);


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

  const [novelValues, setNovelValues] = React.useState(
    {
      "user_pk": user.pk, 
      "content": novelsQuery.loading ? "": novelsQuery.data?.novels_by_pk.content, 
      "title": "", "category_pk": novelsQuery.loading ? 1 : novelsQuery.data?.novels_by_pk.category_pk, 
      "user_id": user.id, 
      "editor_comment": "", 
      "original_pk": pk,
      "edited_percent": 0.0,
    }
    );

  const onClickCreateNovel = (e) => {
    const edited_percent = calculateMatchRate(novelsQuery.data?.novels_by_pk.content, novelValues.content)
    console.log(edited_percent)
    novelValues.edited_percent = edited_percent;
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