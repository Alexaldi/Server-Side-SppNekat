import "../new.scss";
import { Sidebar } from "../../../component/sidebar/Sidebar";
import { Navbar } from "../../../component/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"
import Swal from "sweetalert2";
import { AppContext } from "../../../store";
import moment from 'moment';
import Cookies from "js-cookie";

const RupiahFormat = ({ value }) => {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return formatter.format(value);
};

const NewPembayaran = () => {
    const [state, dispatch] = useContext(AppContext);
    const [petugasId, setPetugasId] = useState(null);
    const [id_siswa, setId_siswa] = useState('');
    const [id_spp, setId_spp] = useState('');
    const [kelas, setKelas] = useState('');
    const [bayar, setBayar] = useState('');
    const [formattedNominal, setFormattedNominal] = useState("");
    const [classroom, setClassroom] = useState([]);
    const [students, setStudents] = useState([]);
    const [spp, setSpp] = useState([]);
    const [keterangan, setKeterangan] = useState('');
    const [status, setStatus] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        getSpp()
    }, []);

    useEffect(() => {
        classromm();
        petugasName()
    }, []);
    useEffect(() => {
        handleStatus()
    }, [id_spp, status, bayar]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await handleStatus();
            const tgl_bayar = moment().format('YYYY-MM-DD');;
            console.log(tgl_bayar);
            await axios.post(`http://localhost:5000/pembayaranA`, {
                id_petugas: petugasId,
                tgl_bayar,
                id_siswa,
                id_spp,
                bayar,
                kelas,
                status
            },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            Swal.fire({
                icon: 'success',
                title: 'Pembayaran Berhasil di tambahkan!',
                timer: 1500,
                showConfirmButton: false,
                willClose: () => {
                    setTimeout(() => {
                        navigate(`/pembayaran`);
                    }, 200);
                },
            });

        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else {
                const message = error.message || 'Terjadi kesalahan saat melakukan pembayaran';
                toast.error(message, {
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }

    }

    const petugasName = async () => {
        const Id = state.petugas_data["nama_petugas"]
        const response = await axios.get(`http://localhost:5000/adminU/${Id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`
            },
        })
        setPetugasId(response.data.id_petugas)
    }

    const classromm = async () => {
        try {
            const classroom = await axios.get('http://localhost:5000/kelas',
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
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

    const handleClassroomChange = async (e) => {
        setKelas(e.target.value);
        try {
            const response = await axios.get(`http://localhost:5000/usersClass/${e.target.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getSpp = async () => {
        try {
            const spp = await axios.get('http://localhost:5000/spp',
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                })

            setSpp(spp.data)

        } catch (error) {

            if (error.response) {
                toast.error("Data Spp error", {
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

    const handleNominalChange = (event) => {
        const rawValue = event.target.value.replace(/\D/g, "");
        const formattedValue = RupiahFormat({ value: rawValue });
        setBayar(rawValue);
        setFormattedNominal(formattedValue);
    };

    const handleStatus = async () => {
        const response = await axios.get(`http://localhost:5000/spp/${id_spp}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`
                },
            })

        const historyPembayaran = await axios.get(`http://localhost:5000/pembayaranS?id_spp=${id_spp}&id_siswa=${id_siswa}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`
                },
            })
        const Sum = historyPembayaran.data
        const Jumlah = parseInt(bayar) + Sum
        if (Jumlah === response.data.nominal) {
            setStatus(true);
        } else if (Jumlah > response.data.nominal) {
            const sisa = response.data.nominal - Sum;
            const message = `Anda membayar lebih untuk Tahun ${response.data.tahun}. Tagihan Anda ${sisa === 0 ? 'Sudah Lunas' : `Sisa ${RupiahFormat({ value: sisa })}`}`;
            setStatus(false);
            throw new Error(message);
        } else {
            setStatus(false);
        }
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Tambah Pembayaran</h1>
                </div>
                <div className="bottom">
                    <ToastContainer />
                    <form onSubmit={handleAdd}>
                        <div className="form-row">
                            <div className="form-group col">
                                <FormControl fullWidth>
                                    <InputLabel id="kelasInputLabel">Kelas</InputLabel>
                                    <Select
                                        labelId="kelasInputLabel"
                                        id="kelas"
                                        value={kelas || ''}
                                        label="Kelas"
                                        onChange={handleClassroomChange}
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
                                <FormControl fullWidth>
                                    <InputLabel id="siswaInputLabel">Siswa</InputLabel>
                                    <Select
                                        labelId="siswaInputLabel"
                                        id="siswa"
                                        value={id_siswa || ''}
                                        label="Age"
                                        onChange={(e) => setId_siswa(e.target.value)}
                                        required
                                        helperText="Pilih Kelas Terlebih Dahulu"
                                    >
                                        {
                                            students && students[0] !== null ? students.map((siswa) => (
                                                <MenuItem key={siswa.id_siswa || ''} value={siswa.id_siswa || ''}>
                                                    {siswa.nisn || ''} - {siswa.name || ''}
                                                </MenuItem>
                                            )) : <MenuItem value={''}>No Siswa Found</MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <FormControl fullWidth>
                                    <InputLabel id="tahunInputLabel">Tahun Bayar</InputLabel>
                                    <Select
                                        labelId="tahunInputLabel"
                                        id="tahun"
                                        value={id_spp || ''}
                                        label="Age"
                                        onChange={(e) => setId_spp(e.target.value)}
                                        required
                                    >
                                        {spp.map((spp) => (
                                            <MenuItem key={spp.id_spp || ''} value={spp.id_spp || ''}>
                                                {spp.tahun || ''} - {RupiahFormat({ value: spp.nominal }) || ''}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="form-group col">
                                <TextField
                                    id="total"
                                    label="Total Bayar"
                                    value={formattedNominal}
                                    onChange={handleNominalChange}
                                    fullWidth
                                    required
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <TextField
                                    id="keterangan"
                                    label="Keterangan"
                                    value={keterangan}
                                    onChange={(e) => setKeterangan(e.target.value)}
                                    fullWidth
                                    required
                                    helperText="Keterangan Bulan bayar"
                                    type="text"
                                />
                            </div>
                            <div className="form-group col">
                                <Box fullWidth></Box>
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


export default NewPembayaran;
