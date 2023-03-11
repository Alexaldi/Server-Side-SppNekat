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


const NewKelas = () => {
    const [angkatan, setAngkatan] = useState('');
    const [kelas, setKelas] = useState('');
    const navigate = useNavigate()

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/kelas`, {
                angkatan,
                kelas
            },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            Swal.fire({
                icon: 'success',
                title: 'Kelas Berhasil di tambahkan!',
                timer: 1500,
                showConfirmButton: false,
                willClose: () => {
                    setTimeout(() => {
                        navigate(`/kelas`);
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
                    <h1>Tambah Kelas</h1>
                </div>
                <div className="bottom">
                    <ToastContainer />
                    <form onSubmit={handleAdd}>
                        <div className="form-row">
                            <div className="form-group col">
                                <TextField
                                    id="angkatan"
                                    label="Angkatan"
                                    value={angkatan}
                                    onChange={(e) => setAngkatan(e.target.value)}
                                    fullWidth
                                    type="number"
                                    inputProps={{ min: 10, max: 13 }}
                                    list="angkatan"
                                    autoComplete="off"
                                    helperText="Kelas 10 sampai 13"
                                    required
                                />
                            </div>
                            <div className="form-group col">
                                <TextField
                                    id="kelas"
                                    label="Kelas"
                                    value={kelas}
                                    onChange={(e) => setKelas(e.target.value)}
                                    fullWidth
                                    autoComplete="off"
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

export default NewKelas;
