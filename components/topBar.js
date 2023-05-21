import Box from '@mui/material/Box';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function TopBar(props) {
    return (
        <Box>
            <Paper elevation={3} sx={{padding: 2, marginBottom: 2}} >
                <Grid style={{ display:'flex', justifyContent:'center', padding: 3}}>
                    <Grid style={{fontWeight: "bold"}}>
                        {props.name}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}