import "../edit.scss";
import { Sidebar } from "../../../component/sidebar/Sidebar";
import { Navbar } from "../../../component/navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"
import Swal from "sweetalert2";
import { AppContext } from "../../../store";

const RupiahFormat = ({ value }) => {
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return formatter.format(value);
};

const EditSpp = () => {
    const [state, dispatch] = useContext(AppContext);
    const [nominal, setNominal] = useState('');
    const [formattedNominal, setFormattedNominal] = useState("");
    const [tahun, setTahun] = useState('');
    const { sppId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getSpp(sppId);
    }, [sppId]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/spp/${sppId}`, {
                nominal,
                tahun
            },
                {
                    headers: {
                        Authorization: `Bearer ${state.user_token}`
                    },
                });
            Swal.fire({
                icon: 'success',
                title: 'Spp Berhasil di ubah!',
                timer: 1500,
                showConfirmButton: false,
                willClose: () => {
                    setTimeout(() => {
                        navigate(`/spp/${sppId}`);
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

    const handleNominalChange = (event) => {
        const rawValue = event.target.value.replace(/\D/g, "");
        const formattedValue = RupiahFormat({ value: rawValue });
        setNominal(rawValue);
        setFormattedNominal(formattedValue);
    };

    const getSpp = async (sppId) => {
        try {
            const response = await axios.get(`http://localhost:5000/spp/${sppId}`,
                {
                    headers: {
                        Authorization: `Bearer ${state.user_token}`
                    },
                });
            setNominal(response.data.nominal);
            setFormattedNominal(RupiahFormat({ value: response.data.nominal }));
            setTahun(response.data.tahun)
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

    console.log(tahun)

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <ToastContainer />
                <div className="top">
                    <h1>Edit Spp</h1>
                </div>
                <div className="bottom">
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
                                <TextField
                                    id="tahun"
                                    label="Tahun"
                                    value={tahun}
                                    fullWidth
                                    autoComplete="off"
                                    InputProps={{
                                        readOnly: true,
                                    }}
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


export default EditSpp;
