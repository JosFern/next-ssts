import Container from '@mui/material/Container'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../../styles/Home.module.css'
import Link from 'next/link';


export default function DashboardLayout({children}) {
    return (
        <div style={{
            background: '#f4faec',
            minHeight: '100vh'
        }}>
                <AppBar className={styles.appbar} position="static"  >
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Link href='/login'>
                        <Button color="inherit">Login</Button>
                    </Link>
                    </Toolbar>
                </AppBar>
            <Container>
                {children}
            </Container>
        </div>
    )
}