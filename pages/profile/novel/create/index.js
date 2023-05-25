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
  const categoriesQuery = useQuery(GET_CATEGORIES_QUERY);
  const [category_pk, setCategoryPk] = React.useState(categoriesQuery.data?.categories[0].pk);
  const theme = useTheme();
  const router = useRouter();
  const [insert_novels_one, { data }] = useMutation(INSERT_NOVELS_ONE_MUTATION);

  const [novelValues, setNovelValues] = React.useState({ "title": "", "user_pk": user.pk, "content": "", "category_pk": category_pk, "user_id": user.id });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryPk(value);
  };

  const onClickCreateNovel = async (e) => {
    novelValues.category_pk = category_pk;
    insert_novels_one({
        variables: novelValues,
        onError: (error) => {
            toast.error("データの作成に失敗しました。");
            console.error(error);
        },
        onCompleted: () => {
            toast.success("小説を作成しました。");
            router.replace('/profile');
        }
    })
  }



  return (
    <Box>
      <TopBar name={"小説投稿"} />
      <Paper>
        <FormControl fullWidth>
          <TextField
            id="outlined-multiline-flexible"
            label="タイトル"
            sx={{ margin: 3 }}
            name="title"
            onChange={(e) => setNovelValues({ ...novelValues, "title": e.target.value })}
          />
          {/* <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={selected_categories}
            onChange={handleChange}
            sx={{ margin: 3 }}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          > */}
            <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category_pk}
    label="Category"
    onChange={handleChange}
    sx={{ margin: 3 }}
  >

    {/* <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem> */}
  {/* </Select> */}
            {categoriesQuery.data?.categories.map((value) => (
              <MenuItem
                key={value.pk}
                value={value.pk}
                // style={getStyles(value["name"], selected_categories, theme)}
              >
                {value.name}
              </MenuItem>
            ))}
          </Select>
          {/* </FormControl> */}
          {/* </div> */}
          <TextField
            id="outlined-multiline-static"
            label="文章"
            multiline
            rows={4}
            sx={{ margin: 3 }}
            name="content"
            onChange={(e) => setNovelValues({ ...novelValues, "content": e.target.value })}
          />
          <Button variant="contained" endIcon={<SendIcon />} sx={{ margin: 3, width: '25%', height: "25%" }} onClick={(e) => onClickCreateNovel(e)}>
            投稿
          </Button>
        </FormControl>
      </Paper>
      <Toaster/>
    </Box>


  )
}