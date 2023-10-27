import React from 'react'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import { Link } from 'react-router-dom'
export default function Navigation() {
    return (
        <div>
            <AppBar style={{backgroundColor: 'pink', color: 'black'}}>
            <Toolbar>
                <Typography variant="h4" style={{  }}>
                QuizzWeb
                </Typography>
                <Button style={{ fontSize: '14px', marginLeft: '40px' }} color="inherit" component={Link} to="/">Home</Button>
                <Button style={{ fontSize: '14px', marginLeft: '40px' }} color="inherit" component={Link} to="/quiz">Quizz</Button>
                <Button style={{ fontSize: '14px', marginLeft: '40px' }} color="inherit" component={Link} to="/about">About</Button>
                <Button style={{ fontSize: '14px', marginLeft: '40px' }} color="inherit" component={Link} to="/contact">Contact</Button>
                
                
            </Toolbar>
            
        </AppBar>
        </div>
    )
}
