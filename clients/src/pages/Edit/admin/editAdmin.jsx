import "../edit.scss";
import { Sidebar } from "../../../component/sidebar/Sidebar";
import { Navbar } from "../../../component/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const EditAdmin = () => {
    const [username, setUsername] = useState('');
    const [namaPetugas, setNamaPetugas] = useState('');
    const [level, setLevel] = useState('petugas');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const { adminId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getAdmin(adminId);
    }, [adminId]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/admin/${adminId}`, {
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
                title: 'Admin Berhasil di ubah!',
                timer: 1500,
                showConfirmButton: false,
                willClose: () => {
                    setTimeout(() => {
                        navigate(`/admin/${adminId}`);
                    }, 200);
                }
            });

        } catch (error) {
            if (error.response) {
                const massage = error.response.data.msg
                toast.error(massage, {
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }

    }

    const getAdmin = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            console.log(response.data);
            setUsername(response.data.username)
            setNamaPetugas(response.data.nama_petugas)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            if (error.response) {
                toast.error("Data siswa error", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <ToastContainer />
                <div className="top">
                    <h1>Edit Admin</h1>
                </div>
                <div className="bottom">
                    <form onSubmit={handleAdd}>
                        <div className="form-row">
                            <div className="form-group col">
                                <TextField
                                    id="username"
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <div className="form-group col">
                                <TextField
                                    id="namaPetugas"
                                    label="Nama Petugas"
                                    value={namaPetugas}
                                    onChange={(e) => setNamaPetugas(e.target.value)}
                                    fullWidth
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


export default EditAdmin;
