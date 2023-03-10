import React, { useEffect, useState } from 'react'
import "../datatable.scss"
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { pembayaranColoums } from '../../../helper/table/pembayaran/datatablesource';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from '@mui/material';
import { PaymentModal } from './PaymentModal';
import { AppContext } from '../../../store';
import { useContext } from 'react';

function CustomToolbar() {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date().toLocaleDateString('id-ID', options);
    return (
        <GridToolbarContainer>
            <GridToolbarExport printOptions={{ disableToolbarButton: true }}
                csvOptions={{
                    fields: [
                        'no',
                        'nisn',
                        'name',
                        'kelas',
                        'tahun',
                        'tgl_bayar',
                        'jumlah_bayar',
                        'nama_petugas',
                        'status'
                    ],
                    fileName: `DataPembayaran-${date}` // Set CSV file name
                }} />
        </GridToolbarContainer>
    );
}

export const DatatablePembayaran = () => {
    const [state, dispatch] = useContext(AppContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        getPembayaran();
    }, [searchQuery]);

    const navigate = useNavigate()

    const getPembayaran = async () => {
        try {
            const response = await axios.get('http://localhost:5000/pembayaranJoin',
                {
                    headers: {
                        Authorization: `Bearer ${state.user_token}`
                    },
                });
            setData(response.data.filter((response) =>
                (response.petugas && response.petugas.nama_petugas.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (response.siswa && response.siswa.nisn.includes(searchQuery.toLowerCase())) ||
                (response.siswa && response.siswa.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (response.siswa && response.siswa.kelas && response.siswa.kelas.kelas.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (response.spp && response.spp.tahun.toString().includes(searchQuery.toLowerCase())) ||
                response.jumlah_bayar.toString().includes(searchQuery.toLowerCase())
            )
            );
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            toast.error("Failed to get payment.", {
                toastId: 'failed1',
            });
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 18);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleView = (id) => {
        setSelectedPayment(id);
        setIsModalOpen(true);
    }


    const handleDelete = async (id) => {
        // Show SweetAlert confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:5000/pembayaran/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${state.user_token}`
                            },
                        });
                    toast.success(response.data.message);
                    setTimeout(() => {
                        getPembayaran();
                    }, 1000);
                } catch (error) {
                    toast.error(error.response.data.message || "Failed to delete pembayaran.");
                }
            }
        });
    };


    const actionColoumn = [{
        field: "action",
        headerName: "Action",
        width: 140,
        renderCell: (params) => {
            return (
                <div className="cellAction">
                    <div onClick={() => handleView(params.id)} className="viewButton">View</div>
                    <div onClick={() => handleDelete(params.id)} className="deleteButton">Delete</div>
                </div>
            );
        },
    }]

    return (
        <div className='datatable' >
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                rows={3}
                autoComplete='off'
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <ToastContainer />
            <div className="datatableTitle">
                Add New Payment
                <Link to="/pembayaran/new" className='link'>
                    Add New
                </Link>
            </div>
            {isLoading && (
                <div className='loader-wrapper'>
                    <div className='loader'></div>
                </div>
            )}
            <DataGrid
                rows={data}
                columns={pembayaranColoums.concat(actionColoumn)}
                getRowId={(row) => row.id_pembayaran}
                pageSize={9}
                rowsPerPageOptions={[9]}
                autoHeight
                width={900}
                localeText={{
                    noRowsLabel: 'Data Tidak Tersedia'
                }}
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
            {isModalOpen && (<PaymentModal
                id={selectedPayment}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />)}
        </div >
    )
}
