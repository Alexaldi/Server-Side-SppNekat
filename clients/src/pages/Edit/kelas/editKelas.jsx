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

const EditKelas = () => {
    const [angkatan, setAngkatan] = useState('');
    const [kelas, setKelas] = useState('');
    const { kelasId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getKelas(kelasId);
    }, [kelasId]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/kelas/${kelasId}`, {
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
                title: 'Admin Berhasil di ubah!',
                timer: 1500,
                showConfirmButton: false,
                willClose: () => {
                    setTimeout(() => {
                        navigate(`/kelas/${kelasId}`);
                    }, 200);
                }
            });

        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
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

    const getKelas = async (kelasId) => {
        try {
            const response = await axios.get(`http://localhost:5000/kelas/${kelasId}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            console.log(response.data);
            setAngkatan(response.data.angkatan)
            setKelas(response.data.kelas)
        } catch (error) {
            if (error.response) {
                toast.error("Data Kelas error", {
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
                    <h1>Edit Kelas</h1>
                </div>
                <div className="bottom">
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


export default EditKelas;
