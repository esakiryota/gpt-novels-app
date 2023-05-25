import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/ironSession/config";
import toast, { Toaster } from 'react-hot-toast'

const drawerWidth = 240;

const sidebar_list = [
    ['TOP', '/'],
    ['投稿小説', "/novels/"],
    ['AI小説', "/ai-novels/"],
]

const default_list = [
    ['お問い合わせ', "/contact"],
    ["始め方", "/start"],
    ["利用規約", "/terms"],
]

const sns_list = [
    ['Twitter', ""],
    ["facebook", ""],
]

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Footer() {

    return (
        <>
          <Divider />
          <Box sx={{marginTop: 5, marginLeft: 10, marginBottom: 5}}>
          <Box sx={{fontWeight: "bold", fontSize: 24}}>
            <img src="/logo.png" />
            <Grid container spacing={2}>
                  <Grid item xs={4}>
                  <Box sx={{fontWeight: "bold", fontSize: 18}}>ガイド</Box>
                  {
                default_list.map((value, index) => (
                    <Box><Button color="inherit"><Link href={value[1]} style={{ textDecoration: 'none', color: "black" }}>{value[0]}</Link></Button></Box>
                ))
            }
                  </Grid>
                  <Grid item xs={4}>
                  <Box sx={{fontWeight: "bold", fontSize: 18}}>コンテンツ</Box>
                  {
            sidebar_list.map((value, index) => (
                    <Box><Button color="inherit"><Link href={value[1]} style={{ textDecoration: 'none', color: "black" }}>{value[0]}</Link></Button></Box>
                ))
            }
                  </Grid>
                  <Grid item xs={4}>
                  <Box sx={{fontWeight: "bold", fontSize: 18}}>SNS</Box>
                  {
                sns_list.map((value, index) => (
                    <Box><Button color="inherit"><Link href={value[1]} style={{ textDecoration: 'none', color: "black" }}>{value[0]}</Link></Button></Box>
                ))
            }
                  </Grid>
            </Grid>
          </Box>
          </Box>
        </>
    )
}


function PositionedMenu({auth}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const unauth_list = [
        ['ログイン', '/signin'],
        ['アカウント作成', '/signup'],
    ]

    const auth_list = [
        ['プロフィール', '/profile'],
        ['小説投稿', '/profile/novel/create/'],
        // ['あとで見る小説', '/profile/read-later'],
        // ['お気に入り小説', '/profile/favorite'],
        ['ログアウト', '/signout'],
    ]

    const menu = (
        <>
            {auth ? 
            auth_list.map((value, index) => (
                            <Link href={value[1]} style={{ textDecoration: 'none', color: "black" }}><MenuItem onClick={handleClose}>{value[0]}</MenuItem></Link>
                        ))
            :
            unauth_list.map((value, index) => (
                <Link href={value[1]} style={{ textDecoration: 'none', color: "black" }}><MenuItem onClick={handleClose}>{value[0]}</MenuItem></Link>
            ))
            }
            {
                <>
                    {default_list.map((value, index) => (
                        <Link href={value[1]} style={{ textDecoration: 'none', color: "black" }}><MenuItem onClick={handleClose}>{value[0]}</MenuItem></Link>
                    ))
                    }
                </>
            }
        </>
    );



    return (
        <>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar
                    sx={{ bgcolor: "grey" }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                >
                    <PersonIcon />
                </Avatar>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {
                    menu
                }

            </Menu>
        </>
    );
}


function Root({ children, user, auth }) {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            return router.replace(`/novels/`);
        }
    }

    const drawer = (
        <>
            <Toolbar>
                <Grid>
                    <Search sx={{}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="小説を検索"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyDown={handleKeyDown}
                        />
                    </Search>
                </Grid>

            </Toolbar>

            <Divider />
            <List>
                {sidebar_list.map((value, index) => (
                    <Link href={value[1]} style={{ textDecoration: 'none', color: "black" }}>
                        <ListItem key={value[0]} disablePadding>

                            <ListItemButton selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={value[0]} />

                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </>
    );

    const container = typeof window !== "undefined" ? () => window.document.body : undefined;

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    return (
        <Box sx={{}}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `100%` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'white',
                    color: 'black'
                }}
            >
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                </Menu>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                    <img src="/logo.png" style={{height: 40}}/>
                    </Typography>
                    <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="小説を検索"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyDown={handleKeyDown}
                        />
                    </Search>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {sidebar_list.map((value, index) => (
                            <Button color="inherit"><Link href={value[1]} style={{ textDecoration: 'none', color: "black" }}>{value[0]}</Link></Button>
                        ))}
                    </Box>
                    <PositionedMenu auth={auth}/>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
            >
                <Toolbar />
                <Box style={{ margin: 30 }}>
                    {children}
                </Box>
            </Box>
            <Box>
            <Footer />
            </Box>
        </Box>
    );
}

// export const getServerSideProps = withIronSessionSsr(
//     async function getServerSideProps({ req }) {
//       const user = req.session.user;
  
//       return {
//         props: {
//           user: user,
//         },
//       };
//     },
//     ironOptions
//   );

export default Root;