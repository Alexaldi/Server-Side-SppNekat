import React, { useContext } from 'react'
import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SchoolIcon from '@mui/icons-material/School'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../store';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export const Sidebar = React.memo(() => {
    const [state, dispatch] = useContext(AppContext);

    const level = state.petugas_data["level"]
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await Swal.fire({
                title: 'Are you sure?',
                text: 'You will be logged out',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, log out'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`http://localhost:5000/logoutAdmin?accessToken=${state.user_token}`);
                    Cookies.remove('accessToken');
                    Cookies.remove('Petugas');
                    dispatch({ type: "SET_TOKEN", payload: null });
                    dispatch({ type: "SET_PETUGAS", payload: {} });
                    setTimeout(() => {
                        navigate('/login');
                    }, 200);
                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='sidebar'>

            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="logo-container">
                        <SchoolIcon className='logo-icon' />
                        <span className='logo-text'>SPP CEURI</span>
                    </div>
                </Link>
            </div>

            <hr />

            {level && level === 'admin' ? (
                <div className="center">
                    <ul>
                        <p className="title">MAIN</p>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <li>
                                <DashboardIcon className='icon' />
                                <span>Dashboard</span>
                            </li>
                        </Link>
                        <p className="title">PAYMENT</p>
                        <Link to="/pembayaran" style={{ textDecoration: "none" }}>
                            <li>
                                <AccountBalanceWalletIcon className='icon' />
                                <span>Pembayaran</span>
                            </li>
                        </Link>
                        <Link to="/spp" style={{ textDecoration: "none" }}>
                            <li>
                                <CreditCardIcon className='icon' />
                                <span>Spp</span>
                            </li>
                        </Link>
                        <p className="title">LIST</p>
                        <Link to="/kelas" style={{ textDecoration: "none" }}>
                            <li>
                                <AddBusinessIcon className='icon' />
                                <span>Kelas</span>
                            </li>
                        </Link>
                        <p className="title">USER</p>
                        <Link to="/admin" style={{ textDecoration: "none" }}>
                            <li>
                                <SupervisorAccountIcon className='icon' />
                                <span>Admin</span>
                            </li>
                        </Link>
                        <Link to="/users" style={{ textDecoration: "none" }}>
                            <li>
                                <PersonOutlineIcon className='icon' />
                                <span>Siswa</span>
                            </li>
                        </Link>
                        <li onClick={handleLogout}>
                            <LogoutIcon className='icon' />
                            <span>logout</span>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="center">
                    <ul>
                        <p className="title">PAYMENT</p>
                        <Link to="/pembayaran" style={{ textDecoration: "none" }}>
                            <li>
                                <AccountBalanceWalletIcon className='icon' />
                                <span>Pembayaran</span>
                            </li>
                        </Link>
                        <li onClick={handleLogout}>
                            <LogoutIcon className='icon' />
                            <span>logout</span>
                        </li>
                    </ul>
                </div>
            )
            }
        </div>
    )
})
