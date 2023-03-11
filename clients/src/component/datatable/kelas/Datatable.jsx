import React, { useContext, useEffect, useState } from 'react'
import "../datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { kelasColoums } from '../../../helper/table/kelas/datatablesource';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';

export const DatatableKelas = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getKelas();
    }, []);

    const navigate = useNavigate()

    const getKelas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/kelas',
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            setData(response.data);

        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
            toast.error("Failed to get Kelas.", {
                toastId: 'failed1',
            });
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 18);
        }
    };

    const handleDelete = async (id) => {
        console.log(id);
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
                    const response = await axios.delete(`http://localhost:5000/kelas/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${Cookies.get("accessToken")}`
                            },
                        });
                    toast.success(response.data.message);
                    setTimeout(() => {
                        getKelas();
                    }, 1000);
                } catch (error) {
                    toast.error(error.response.data.message || "Failed to delete Kelas.");
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
                    <Link to={"/kelas/" + params.id} style={{ textDecoration: "none" }}>
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
                <div className="datatableTitle">
                    Add New Kelas
                    <Link to="/kelas/new" className='link'>
                        Add New
                    </Link>
                </div>
                <DataGrid
                    rows={data}
                    columns={kelasColoums.concat(actionColoumn)}
                    getRowId={(row) => row.id_kelas}
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
