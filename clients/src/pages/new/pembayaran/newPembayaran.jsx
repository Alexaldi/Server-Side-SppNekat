import "../new.scss";
import { Sidebar } from "../../../component/sidebar/Sidebar";
import { Navbar } from "../../../component/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
    const [id_siswa, setId_siswa] = useState('');
    const [id_spp, setId_spp] = useState('');
    const [bayar, setBayar] = useState('');
    const [formattedNominal, setFormattedNominal] = useState("");
    const [classroom, setClassroom] = useState([]);
    const [students, setStudents] = useState([]);
    const [spp, setSpp] = useState([]);
    const [keterangan, setKeterangan] = useState('');
    const [status, setStatus] = useState(false);
    const [valueKelas, setValueKelas] = useState('');
    const [sisa, setSisa] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        getSpp()
    }, []);

    useEffect(() => {
        getSiswa()
        if (id_siswa) {
            classromm();;
        }
    }, [id_siswa]);

    useEffect(() => {
        handleStatus()
    }, [id_spp, id_siswa, status, bayar, sisa]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await handleStatus();
            const tgl_bayar = moment().format('YYYY-MM-DD');;
            await axios.post(`http://localhost:5000/pembayaranA`, {
                id_petugas: state.petugas_data["id_petugas"],
                tgl_bayar,
                id_siswa,
                keterangan,
                id_spp,
                bayar,
                kelas: classroom,
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

    const classromm = async () => {
        try {
            const siswa = await axios.get(`http://localhost:5000/usersa/${id_siswa}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                })

            const classroom = await axios.get(`http://localhost:5000/kelas/${siswa.data.id_kelas}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                })
            const data = `${classroom.data.angkatan} ${classroom.data.kelas}`
            setClassroom(classroom.data.id_kelas)
            setValueKelas(data)
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

    const getSiswa = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/usersa`,
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
        const sisa = response.data.nominal - Sum
        if (sisa === 0) {
            setSisa('Lunas')
        } else if (sisa > 0) {
            setSisa(sisa.toLocaleString('id-ID', {
                minimumFractionDigits: 0,
            }))
        }
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
                                    <Autocomplete
                                        id="siswa"
                                        options={students || []}
                                        getOptionLabel={(option) => option.nisn + " - " + option.name}
                                        value={students.find((option) => option.id_siswa === id_siswa) || null}
                                        onChange={(e, newValue) => {
                                            setId_siswa(newValue ? newValue.id_siswa : "");
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Siswa" variant="outlined" />
                                        )}
                                    />
                                </FormControl>
                            </div>
                            <div className="form-group col">
                                <TextField
                                    id="kelas"
                                    label="Kelas"
                                    value={valueKelas}
                                    fullWidth
                                    disabled
                                />
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
                                    id="sisa"
                                    label="Sisa Bayar"
                                    value={sisa || ''}
                                    fullWidth
                                    required
                                    type="text"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="form-row">
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
                            <div className="form-group col">
                                <TextField
                                    id="total"
                                    label="Keterangan"
                                    value={keterangan}
                                    onChange={(e) => setKeterangan(e.target.value)}
                                    fullWidth
                                    required
                                    type="text"
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


export default NewPembayaran;
