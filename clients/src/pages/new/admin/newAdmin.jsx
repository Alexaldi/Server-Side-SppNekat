import "../new.scss";
import { Sidebar } from "../../../component/sidebar/Sidebar";
import { Navbar } from "../../../component/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const NewAdmin = () => {
    const [username, setUsername] = useState('');
    const [namaPetugas, setNamaPetugas] = useState('');
    const [level, setLevel] = useState('petugas');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const navigate = useNavigate()

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/admin`, {
                username,
                nama_petugas: namaPetugas,
                level,
                password,
                confPassword
            },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            Swal.fire({
                icon: 'success',
                title: 'Admin Berhasil di tambahkan!',
                timer: 1500,
                showConfirmButton: false,
                willClose: () => {
                    setTimeout(() => {
                        navigate(`/admin`);
                    }, 200);
                },
            });

        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            if (error.response) {
                const msg = error.response.data.msg;
                toast.error(msg, {
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        }

    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Tambah Admin</h1>
                </div>
                <div className="bottom">
                    <ToastContainer />
                    <form onSubmit={handleAdd}>
                        <div className="form-row">
                            <div className="form-group col">
                                <TextField
                                    id="username"
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="form-group col">
                                <TextField
                                    id="namaPetugas"
                                    label="Nama Petugas"
                                    value={namaPetugas}
                                    onChange={(e) => setNamaPetugas(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="form-group col">
                                <TextField
                                    id="conf_password"
                                    label="Konfirmasi Password"
                                    type="password"
                                    value={confPassword}
                                    onChange={(e) => setConfPassword(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </div>
                        </div>
                        <div className="button-container">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewAdmin;
