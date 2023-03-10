import "../table.scss";
import React, { useState, useEffect, useContext } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { AppContext } from "../../../store";
import { useNavigate } from "react-router";


export const ListSiswa = ({ id }) => {
    const [pembayaran, setPembayaran] = useState([]);
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useContext(AppContext);
    useEffect(() => {
        getSiswaById(id)
    }, [id]);

    const navigate = useNavigate()

    const getSiswaById = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/pembayaranI/${id}?limit=10&orderBy=desc`, {
                headers: {
                    Authorization: `Bearer ${state.user_token}`
                },
            }
            );
            setPembayaran(response.data);
            setLoading(false);
        } catch (error) {
            if (error.response) {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/login');
                }
            }
            toast.error(error.response.data.message || "Failed to get data.", {
                toastId: 'failed2'
            });
            setLoading(false);
        }
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };


    return (
        <>
            {loading ? (
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            ) : (
                <TableContainer component={Paper} className="table">
                    {pembayaran.length === 0 ? (
                        <Typography variant="h5" color="textSecondary" style={{ fontSize: "16px" }} align="center">
                            Siswa belum pernah melakukan pembayaran.
                        </Typography>
                    ) : (
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">NISN</TableCell>
                                    <TableCell className="tableCell">Nama</TableCell>
                                    <TableCell className="tableCell">Kelas</TableCell>
                                    <TableCell className="tableCell">Tanggal Pembayaran</TableCell>
                                    <TableCell className="tableCell">Tahun Dibayar</TableCell>
                                    <TableCell className="tableCell">Nominal</TableCell>
                                    <TableCell className="tableCell">Nama Petugas</TableCell>
                                    <TableCell className="tableCell">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pembayaran.map((row) => (
                                    <TableRow key={row.id_pembayaran}>
                                        <TableCell className="tableCell">
                                            {row.siswa?.nisn}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.siswa?.name}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.siswa?.kelas?.angkatan} {row.siswa?.kelas?.kelas}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {formatDate(row.tgl_bayar)}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.spp?.tahun}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.jumlah_bayar.toLocaleString('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                            })}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.petugas.nama_petugas}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            <span className={`status ${row.status === true ? 'Lunas' : 'Belum-Lunas'}`}>{row.status === true ? 'Lunas' : 'Belum Lunas'}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            )}
        </>
    );
};


