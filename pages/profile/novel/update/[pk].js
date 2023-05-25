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
import { useRouter } from 'next/router';
import { useQuery, useMutation } from "@apollo/client"
import { GET_NOVEL_BY_PK_QUERY } from "../../../../lib/graphql/query/novelsQuery"
import { GET_CATEGORIES_QUERY } from "../../../../lib/graphql/query/categoriesQuery"
import { UPDATE_NOVELS_ONE_MUTATION } from "../../../../lib/graphql/mutation/novelsMutation"
import client from '../../../../lib/graphql/apolloClient';
import { getServerSideProps } from '../../../../lib/getServerSideProps';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast'

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






export default function UpdateNovel({user}) {
  const categoriesQuery = useQuery(GET_CATEGORIES_QUERY, {fetchPolicy: 'network-only'});
  const router = useRouter();
  const { pk } = router.query
  const novelsQuery = useQuery(GET_NOVEL_BY_PK_QUERY, { variables: { pk } });
  const novel = novelsQuery.data?.novels_by_pk;
  const [category_pk, setCategoryPk] = React.useState(novelsQuery.loading ? 1: novel?.category_pk);
  const theme = useTheme();

  const [novelValues, setNovelValues] = React.useState({ "pk": parseInt(pk || 0), "content": novelsQuery.loading ? "": novelsQuery.data?.novels_by_pk.content, "title": novelsQuery.loading ? "": novelsQuery.data?.novels_by_pk.title,  "category_pk": category_pk});

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryPk(value);
  };

  const [update_novels_by_pk, { data: usersRelationshipsData, loading: updataLoading }] = useMutation(UPDATE_NOVELS_ONE_MUTATION);

  const onClickCreateNovel = async (e) => {
    update_novels_by_pk(
      {
        variables: novelValues,
        onError: (error) => {
          toast.error("データの更新に失敗しました。");
          console.error(error);
      },
       onCompleted: () => {
        router.replace('/profile');
       }
      });
  }



  return (
    <Box>
      <TopBar name="小説編集" />
      {
        novelsQuery.loading ? 
        <CircularProgress/>
        :
        <Paper>
        <FormControl fullWidth>
          <TextField
            id="outlined-multiline-flexible"
            label="タイトル"
            sx={{ margin: 3 }}
            name="title"
            onChange={(e) => setNovelValues({...novelValues, "title" : e.target.value})}
            defaultValue={novel?.title} />
              <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={novel?.category_pk}
    label="Category"
    onChange={handleChange}
    sx={{ margin: 3 }}
  >
            {categoriesQuery.data?.categories.map((value) => (
              <MenuItem
                key={value.pk}
                value={value.pk}
              >
                {value.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="outlined-multiline-static"
            label="文章"
            multiline
            rows={4}
            sx={{ margin: 3 }}
            name="content"
            onChange={(e) => setNovelValues({...novelValues,"content" : e.target.value})}
            defaultValue={novel?.content}
          />
          <Button variant="contained" sx={{ margin: "auto", marginBottom: "10px", width: "20%", position: 'relative' }} onClick={(e) => onClickCreateNovel(e)}>
            {
              updataLoading ?
              <CircularProgress sx={{
                height: '100%'
              }}/>
              :
              "投稿"
            }
            
          </Button>
        </FormControl>
      </Paper>
      }
      <Toaster/>
    </Box>

  )
}