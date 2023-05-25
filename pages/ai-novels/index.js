import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TopBar from '../../components/topBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import NovelGridList from "../../components/novels/novelList"
import { useQuery } from "@apollo/client"
import { GET_CATEGORIES_QUERY } from "../../lib/graphql/query/categoriesQuery"
import { GET_NOVELS_QUERY, GET_AI_NOVEL_BY_SEARCH } from "../../lib/graphql/query/novelsQuery"
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router'
// import { getServerSideProps } from '../../lib/getServerSideProps'
import { auth } from '../../lib/firebase/config'
import toast, { Toaster } from 'react-hot-toast'
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



function Category() {
    const categoriesQuery = useQuery(GET_CATEGORIES_QUERY);

    const [searchParams, setSearchParams] = React.useState({order_by: {created_at: "asc"}, content: "", category: "全て", offset: 0, limit: 10, user_id: "HXeMh86h6qfIDqLnXEaigHTF3O23"})

    const novelsQuery = useQuery(GET_AI_NOVEL_BY_SEARCH(searchParams.content, searchParams.category), {
        variables: searchParams,
        onError: (error) => {
            toast.error("データの取得に失敗しました。");
            console.error(error)
        },
    });



    const categories = categoriesQuery.data === undefined ? [] : categoriesQuery.data.categories;
    const novels = novelsQuery.data === undefined ? [] : novelsQuery.data.novels;

    const handleClick = (e) => {
        const text = e.target.innerText;
        setSearchParams(prevState => ({ ...prevState, category: text }));
    }

    const handleOrderValue = (e) => {
        const value = e.target.value;
        if (value === "created_at") {
            setSearchParams(prevState => ({ ...prevState, order_by: {created_at: "asc"} }));
        } else if (value === "favorite") {
            setSearchParams(prevState => ({ ...prevState, order_by: {novels_users_favorites_aggregate: {count: "desc"}} }));
        } else if (value === "read_later") {
            setSearchParams(prevState => ({ ...prevState, order_by: {read_later: "asc"} }));
        } else {
            setSearchParams(prevState => ({ ...prevState, order_by: {created_at: "asc"} }));
        }
    }

    const handleChangeString = (e) => {
        const value = e.target.value;
        setSearchParams(prevState => ({ ...prevState, content: value }));
    }

    const handleNovelsClick = (e) => {
        novelsQuery.fetchMore({
            variables: {
              offset: novelsQuery.data.novels.length, // 現在のアイテム数から新しいオフセットを計算する
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                novels: [...prev.novels, ...fetchMoreResult.novels],
              };
            },
            onError: (error) => {
                toast.error("データの取得に失敗しました。");
                console.error(error)
            },
          });
    }

    return (
        <Box>
            <TopBar name={"AI小説"} />
            <Box>
                <Box>
                    {
                        categoriesQuery.loading ? 
                        <CircularProgress />
                        :
                        <>
                        <Chip label={"全て"} variant={searchParams.category ===  "全て" ? "filled" : "outlined"} onClick={handleClick} sx={{ margin: 0.5 }} />
                        {categories.map((value, index) => (
                            <>
                                <Chip label={value["name"]} variant={value["name"] === searchParams.category ? "filled" : "outlined"} onClick={handleClick} sx={{ margin: 0.5 }} />
                            </>
                        ))}
                        </>

                    }
                </Box>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">表示順</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="created_at"
                        onChange={handleOrderValue}
                    >
                        <FormControlLabel value="created_at" control={<Radio />} label="最新" />
                        <FormControlLabel value="favorite" control={<Radio />} label="お気に入り" />
                        <FormControlLabel value="read_later" control={<Radio />} label="あとで読む" />
                    </RadioGroup>
                </FormControl>
                    <Paper
                        component="form"
                        sx={{ margin: 2, p: '2px 4px', display: 'flex', alignItems: 'center', }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="検索..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={handleChangeString}
                        />
                    </Paper>
            </Box>
            {
                novelsQuery.loading ?
                <CircularProgress />
                :
                <NovelGridList novels={novels} />
            }
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12} sx={{ textAlign: "center", margin: 5 }}>
                    <Button variant="outlined" color="inherit" style={{ backgroudColor: "black" }} size="large" onClick={handleNovelsClick}>
                        {
                novelsQuery.loading ?
                <CircularProgress />
                :
                <>さらに読み込む</>
            }
                    </Button>
                </Grid>
            </Box>
            <Toaster/>
        </Box>
    )
        }







export default Category;