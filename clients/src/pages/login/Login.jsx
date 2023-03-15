import React, { useContext, useEffect, useState } from 'react';
import './login.scss';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AppContext } from "../../store/index"

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
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
        if (!username.trim() || !password.trim()) {
            toast.error(!username.trim() && !password.trim() ? "Lakukan Login Terlebih Dahulu" : !username.trim() ? "Masukan Username" : "Masukan Password", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

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
        <>
            {/* <div class="ocean">
                <div class="wave"></div>
                <div class="wave"></div>
            </div> */}
            <div className="login-container">
                <ToastContainer />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: '40px',
                        borderRadius: '10px',
                        boxShadow: '0px 3px 6px #00000029',
                        maxWidth: '400px',
                        width: '100%',
                        position: 'relative',
                        zIndex: 1,
                        border: '1px solid #E5E5E5',
                        '@media screen and (max-width: 768px)': {
                            padding: '20px',
                        },
                        '@media screen and (max-width: 480px)': {
                            maxWidth: '300px',
                        }
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            color: 'black',
                            fontSize: '36px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                        }}
                    >
                        Selamat Datang Admin!
                    </Typography>
                    <Typography
                        component="p"
                        variant="subtitle1"
                        sx={{
                            textAlign: 'center',
                            color: 'black',
                            fontSize: '18px',
                            marginBottom: '20px',
                        }}
                    >
                        Lakukan Login Terlebih Dahulu
                    </Typography>
                    <Box component="form" onSubmit={Auth} noValidate sx={{ mt: 4 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            sx={{
                                borderRadius: '0',
                                backgroundColor: 'transparent',
                                borderBottom: '1px solid #2F80ED',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'transparent',
                                    },
                                },
                            }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            sx={{
                                borderRadius: '0',
                                backgroundColor: 'transparent',
                                borderBottom: '1px solid #2F80ED',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'transparent',
                                    },
                                },
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 4,
                                mb: 2,
                                borderRadius: '30px',
                                backgroundColor: '#2F80ED',
                                boxShadow: '0px 10px 20px rgba(47, 128, 237, 0.5)',
                                color: 'white',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    backgroundColor: '#2F80ED',
                                    opacity: '0.8',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0px 15px 30px rgba(47, 128, 237, 0.7)',
                                },
                            }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default Login
