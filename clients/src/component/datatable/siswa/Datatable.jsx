import React, { useEffect, useState } from 'react'
import "../datatable.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { userColoums } from '../../../helper/table/siswa/datatablesource';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from '@mui/material';
import Cookies from 'js-cookie';

export const DatatableSiswa = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getSiswa();
    }, [searchQuery]);

    const navigate = useNavigate()

    const getSiswa = async () => {
        try {
            const response = await axios.get('http://localhost:5000/usersa', {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`
                },
            });
            setData(response.data.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.nisn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.kelas && item.kelas.kelas.toLowerCase().includes(searchQuery.toLowerCase()))
            ));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            toast.error("Failed to get users.", {
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
                    const response = await axios.delete(`http://localhost:5000/usersa/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${Cookies.get("accessToken")}`
                            },
                        });
                    toast.success(response.data.message);
                    setTimeout(() => {
                        getSiswa();
                    }, 1000);
                } catch (error) {
                    toast.error(error.response.data.message || "Failed to delete user.");
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
                    <Link to={"/users/" + params.id} style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                    </Link>
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
                Add New Siswa
                <Link to="/users/new" className='link'>
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
                columns={userColoums.concat(actionColoumn)}
                getRowId={(row) => row.id_siswa}
                pageSize={9}
                rowsPerPageOptions={[9]}
                autoHeight
                width={900}
                localeText={{
                    noRowsLabel: 'Data Tidak Tersedia'
                }}
                slots={{ toolbar: GridToolbar }}

            />
        </div >
    )
}
