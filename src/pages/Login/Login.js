import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import { BiTask } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import GoogleIcon from './../../components/GoogleIcon/GoogleIcon';
import axiosInstance from './../../utils/axiosApi';
import { login } from './../../utils/loadData';

import styles from './Login.module.css'

export default function Login(props) {
    const { setLoggedIn, setProgress } = props;
    const [user, setUser] = useState({ 'username': '', 'password': '' })
    const navigate = useNavigate()

    // check if user is logged in
    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'true') {
            navigate('/home')
        }
    }, [])

    // set title
    useEffect(() => {
        document.title = 'Retask | Login'
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        if (user.username.length === 0 || user.password.length === 0) {
            return;
        }
        login(user, setLoggedIn, setProgress);
        navigate('/home')
    }

    return <>
        <Box
            sx={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'absolute',
                width: '100%',
                zIndex: '1000',
                ['@media (max-width: 600px)']: {
                    top: '50%',
                    left: '55%',
                }
            }}
        >
            <Card
                sx={{
                    padding: '1rem',
                    width: '100%',
                    maxWidth: '500px',
                    margin: '0 auto',
                    borderRadius: '5px'
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" noWrap component="div" className={styles.logo} sx={{ flexGrow: 1 }}>
                        <div className={styles.logoContainer}>
                            <BiTask className={styles.logoIcon} />
                            <span className={styles.logoText}>Retask</span>
                        </div>
                    </Typography>
                    <h1>Welcome Back! Login</h1>
                    <FormControl style={{
                        width: '90%'
                    }}>
                        <Button variant="outlined" style={{ textTransform: 'none' }}> <GoogleIcon />  Continue with Google </Button>
                        <Divider style={{ margin: '20px' }}>
                            <span>Or</span>
                        </Divider>
                        <TextField label="Username" variant="outlined" style={{
                            marginBottom: '20px'
                        }} value={user.username} onChange={(e) => setUser({ ...user, ['username']: e.target.value })} />
                        <TextField label="Password" variant="outlined" type="password" style={{
                            marginBottom: '20px'
                        }} value={user.password} onChange={(e) => setUser({ ...user, ['password']: e.target.value })} />
                        <Button variant="contained" color="primary" style={{
                            height: '50px',
                        }} type="submit" onClick={handleLogin}> Login </Button>
                    </FormControl>
                </CardContent>
            </Card>
        </Box>
    </>
}
