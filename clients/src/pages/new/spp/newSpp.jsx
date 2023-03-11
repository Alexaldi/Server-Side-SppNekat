import "../new.scss";
import { Sidebar } from "../../../component/sidebar/Sidebar";
import { Navbar } from "../../../component/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const RupiahFormat = ({ value }) => {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return formatter.format(value);
};

const NewSpp = () => {
    const [nominal, setNominal] = useState('');
    const [formattedNominal, setFormattedNominal] = useState("");
    const [tahun, setTahun] = useState('');
    const [tahunOptions, setTahunOptions] = useState([]);
    const navigate = useNavigate()

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/spp`, {
                nominal,
                tahun
            },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            Swal.fire({
                icon: 'success',
                title: 'Spp Berhasil di tambahkan!',
                timer: 1500,
                showConfirmButton: false,
                willClose: () => {
                    setTimeout(() => {
                        navigate(`/spp`);
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

    const generateTahunOptions = () => {
        const currentYear = new Date().getFullYear();
        const maxYear = currentYear + 3;
        const options = [];

        for (let year = currentYear; year <= maxYear; year++) {
            options.push(year);
        }

        return options;
    };

    const handleTahunChange = (event) => {
        setTahun(event.target.value);
    };

    const handleOpen = () => {
        setTahunOptions(generateTahunOptions());
    };

    const handleNominalChange = (event) => {
        const rawValue = event.target.value.replace(/\D/g, "");
        const formattedValue = RupiahFormat({ value: rawValue });
        setNominal(rawValue);
        setFormattedNominal(formattedValue);
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Tambah Spp</h1>
                </div>
                <div className="bottom">
                    <ToastContainer />
                    <form onSubmit={handleAdd}>
                        <div className="form-row">
                            <div className="form-group col">
                                <TextField
                                    id="nominal"
                                    label="Nominal"
                                    value={formattedNominal}
                                    onChange={handleNominalChange}
                                    fullWidth
                                    type="text"
                                    autoComplete="off"
                                    required
                                    helperText="Masukan Angka"
                                />
                            </div>
                            <div className="form-group col">
                                <FormControl fullWidth>
                                    <InputLabel id="tahunLabel">Tahun</InputLabel>
                                    <Select
                                        labelId="tahunLabel"
                                        id="tahun"
                                        value={tahun}
                                        label="tahun"
                                        onChange={handleTahunChange}
                                        onOpen={handleOpen}
                                        fullWidth
                                        autoComplete="off"
                                        required
                                    >
                                        {tahunOptions.map((year) => (
                                            <MenuItem key={year} value={year}>
                                                {year}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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

export default NewSpp;
