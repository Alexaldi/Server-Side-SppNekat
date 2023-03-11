import "../table.scss";
import React, { useState, useEffect } from 'react';
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
import Cookies from "js-cookie";

export const ListKelas = ({ id }) => {
    const [siswa, setSiswa] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSiswaByClass(id)
    }, [id]);

    const navigate = useNavigate()

    const getSiswaByClass = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/usersClass/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                }
            );
            setSiswa(response.data);
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
                    {siswa.length === 0 ? (
                        <Typography variant="h5" color="textSecondary" style={{ fontSize: "16px" }} align="center">
                            Kelas Belum memiliki Siswa.
                        </Typography>
                    ) : (
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">No</TableCell>
                                    <TableCell className="tableCell">Nisn</TableCell>
                                    <TableCell className="tableCell">Nama Siswa</TableCell>
                                    <TableCell className="tableCell">No Telepon</TableCell>
                                    <TableCell className="tableCell">Email</TableCell>
                                    <TableCell className="tableCell">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {siswa.map((row, index) => (
                                    <TableRow key={row.id_siswa}>
                                        <TableCell className="tableCell">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.nisn}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.name}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.no_telp}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            {row.email}
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            <Link to={"/users/" + row.id_siswa} style={{ textDecoration: "none" }}>
                                                <div className="viewButton">View</div>
                                            </Link>
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


