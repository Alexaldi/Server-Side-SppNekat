import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { AppContext } from "../../store/index"
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
const theme = createTheme();

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        if (state.user_token) {
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [state]);

    const handleSuccess = ({ accessToken }) => {
        dispatch({ type: "SET_TOKEN", payload: accessToken })
        Cookies.set("accessToken", accessToken)
        const rawPetugas = jwtDecode(accessToken)
        const petugas = btoa(JSON.stringify(rawPetugas));
        Cookies.set("Petugas", petugas)
        dispatch({ type: "SET_PETUGAS", payload: rawPetugas })
        Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            timer: 1000,
            showConfirmButton: false,
            willClose: () => {
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            },
        });
    };

    const Auth = async (e) => {
        e.preventDefault()

        return axios.post('http://localhost:5000/loginAdmin', {
            username,
            password
        }
        ).then((resp) => {
            handleSuccess(resp.data);
        }).catch((error) => {
            if (error.response) {
                const errorMsg = error.response.data.msg;
                toast.error(errorMsg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        })
    }

    return (
        <div className="modal">
            <div className="login-form">
                <ThemeProvider theme={theme}>
                    <ToastContainer />
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" className="MuiTypography-h1">
                                Log in
                            </Typography>
                            <Box component="form" onSubmit={Auth} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="text"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete='off'
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default Login