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
        <div className="login-container">
            <ToastContainer />
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0px 3px 6px #00000029',
                    maxWidth: '400px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}
            >
                <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: 'black' }}>
                    Selamat Datang Admin!
                </Typography>
                <Typography component="p" variant="subtitle1" sx={{ textAlign: 'center', color: 'black', marginTop: '20px' }}>
                    Lakukan Login Terlebih Dahulu
                </Typography>
                <Box component="form" onSubmit={Auth} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
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
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#2F80ED' }}
                    >
                        Log In
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default Login
