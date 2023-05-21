import Box from '@mui/material/Box';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TopBar from '../../components/topbar';


function Start() {
    return (
        <Box>
            <TopBar name="始め方" />
            <Box>
                <Box style={{fontSize: 24, fontWeight: "bold", marginBottom: 5}}>ユーザー登録をしていない場合</Box>
                <Box style={{fontSize: 18}}>1. AI小説をクリック</Box>
                <Box style={{fontSize: 18}}>2. 小説のジャンル、作品名、、お気に入り数の多い順などでAI小説を見つける</Box>
                <Box style={{fontSize: 18, marginBottom: 10}}>3. コメントやお気に入り、あとで読む機能などを使いたい場合はアカウント作成をクリックしてメールアドレスとパスワードを入力し、アカウントを作成する、</Box>
                <Box style={{fontSize: 24, fontWeight: "bold",  marginBottom: 5}}>ユーザー登録をしている場合</Box>
                <Box style={{fontSize: 18}}>1. AI小説をクリック</Box>
                <Box style={{fontSize: 18}}>2. 小説のジャンル、作品名、お気に入り数の多い順などでAI小説を見つける。</Box>
                <Box style={{fontSize: 18}}>3. 気に入った小説やあとで読みたい小説などがあればハートアイコン、スターアイコンをクリックする</Box>
                <Box style={{fontSize: 18}}>4. コメントをして感想も書けます。</Box>
                <Box style={{fontSize: 18}}>5. ChatGPTなどのAIを用いて自分で小説を投稿することもできます。</Box>
            </Box>
        </Box>
    )
}

export default Start;