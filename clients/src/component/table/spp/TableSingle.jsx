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
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../store";


export const ListSpp = ({ id }) => {
    const [state, dispatch] = useContext(AppContext);
    const [spp, setSpp] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getpembayaranByspp(id)
    }, [id]);
    const navigate = useNavigate()
    const getpembayaranByspp = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/pembayaranSpp/${id}?limit=10&orderBy=desc`,
                {
                    headers: {
                        Authorization: `Bearer ${state.user_token}`
                    },
                }
            );
            setSpp(response.data);
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

    return (
        <>
            {loading ? (
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            ) : (
                <TableContainer component={Paper} className="table">
                    {spp.length === 0 ? (
                        <Typography variant="h5" color="textSecondary" style={{ fontSize: "16px" }} align="center">
                            Pembayaran Kosong
                        </Typography>
                    ) : (
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">No</TableCell>
                                    <TableCell className="tableCell">Petugas</TableCell>
                                    <TableCell className="tableCell">Nisn</TableCell>
                                    <TableCell className="tableCell">Nama Siswa</TableCell>
                                    <TableCell className="tableCell">Tanggal Bayar</TableCell>
                                    <TableCell className="tableCell">Jumlah Bayar</TableCell>
                                    <TableCell className="tableCell">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {spp.map((row, index) => (
                                    <TableRow key={row.id_siswa}>
                                        <TableCell className="tableCell">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.petugas?.nama_petugas}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.siswa?.nisn}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.siswa?.name}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.tgl_bayar}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.jumlah_bayar.toLocaleString('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                            })}
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


