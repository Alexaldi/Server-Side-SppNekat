import "../new.scss";
import { Sidebar } from "../../../component/sidebar/Sidebar";
import { Navbar } from "../../../component/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const NewSiswa = () => {
    const [nisn, setNisn] = useState('');
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [alamat, setAlamat] = useState('');
    const [telp, setTelp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [classroom, setClassroom] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        classromm();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/usersa`, {
                nisn,
                nama,
                id_kelas: kelas,
                alamat,
                no_telp: telp,
                email,
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
                title: 'Siswa Berhasil di tambahkan!',
                timer: 1500,
                showConfirmButton: false,
                willClose: () => {
                    setTimeout(() => {
                        navigate(`/users`);
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

    console.log({
        nisn, nama, kelas, alamat, telp, email, password, confPassword
    });

    const classromm = async () => {
        try {
            const classroom = await axios.get('http://localhost:5000/kelas',
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    }
                })
            setClassroom(classroom.data)

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
                <div className="top">
                    <h1>Tambah Siswa</h1>
                </div>
                <div className="bottom">
                    <ToastContainer />
                    <form onSubmit={handleAdd}>
                        <div className="form-row">
                            <div className="form-group col">
                                <TextField
                                    id="nisn"
                                    label="Nisn"
                                    value={nisn}
                                    onChange={(e) => setNisn(e.target.value)}
                                    fullWidth
                                    type="number"
                                    required
                                />
                            </div>
                            <div className="form-group col">
                                <TextField
                                    id="nama"
                                    label="Nama Siswa"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <FormControl fullWidth>
                                    <InputLabel id="kelasInputLabel">Kelas</InputLabel>
                                    <Select
                                        labelId="kelasInputLabel"
                                        id="kelas"
                                        value={kelas || ''}
                                        label="Age"
                                        onChange={(e) => setKelas(e.target.value)}
                                        required
                                    >
                                        {classroom.map((kls) => (
                                            <MenuItem key={kls.id_kelas} value={kls.id_kelas}>
                                                {kls.angkatan + " " + kls.kelas}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="form-group col">
                                <TextField
                                    id="alamat"
                                    label="Alamat"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <TextField
                                    id="no_telp"
                                    label="No Handphone"
                                    value={telp}
                                    onChange={(e) => setTelp(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="form-group col">
                                <TextField
                                    id="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    required
                                    type="email"
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


export default NewSiswa;
