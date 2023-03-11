import React, { useEffect, useState } from 'react'
import "../datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { petugasColoums } from '../../../helper/table/petugas/datatablesource';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from '@mui/material';
import Cookies from 'js-cookie';

export const DatatableAdmin = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        getAdmin();
    }, [searchQuery]);

    const navigate = useNavigate()

    const getAdmin = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin',
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            setData(response.data.filter((item) =>
                item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.nama_petugas.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            toast.error("Failed to get Admin.", {
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
                    const response = await axios.delete(`http://localhost:5000/admin/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${Cookies.get("accessToken")}`
                            },
                        });
                    toast.success(response.data.message);
                    setTimeout(() => {
                        getAdmin();
                    }, 1000);
                } catch (error) {
                    toast.error(error.response.data.message || "Failed to delete Admin.");
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
                    <Link to={"/admin/" + params.id} style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                    </Link>
                    <div onClick={() => handleDelete(params.id)} className="deleteButton">Delete</div>
                </div>
            );
        },
    }]

    return (
        <div className='datatable' >

            <ToastContainer />
            {isLoading && (
                <div className='loader-wrapper'>
                    <div className='loader'></div>
                </div>
            )}
            <Box width={500} autoHeight>
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
                <div className="datatableTitle">
                    Add New Petugas
                    <Link to="/admin/new" className='link'>
                        Add New
                    </Link>
                </div>
                <DataGrid
                    rows={data}
                    columns={petugasColoums.concat(actionColoumn)}
                    getRowId={(row) => row.id_petugas}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    autoHeight
                    autowidth
                    localeText={{
                        noRowsLabel: 'Data Tidak Tersedia'
                    }}
                />
            </Box>
        </div >
    )
}
