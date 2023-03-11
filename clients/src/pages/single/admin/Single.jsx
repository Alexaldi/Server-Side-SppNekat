import React, { useEffect, useState } from 'react'
import "../single.scss"
import { Sidebar } from "../../../component/sidebar/Sidebar"
import { Navbar } from "../../../component/navbar/Navbar"
import { ListAdmin } from '../../../component/table/admin/TableSingle'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

export const SingleAdmin = () => {
    const { adminId } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAdminById(adminId)
    }, [adminId]);

    const navigate = useNavigate()

    const getAdminById = async (adminId) => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/${adminId}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
        }
    };

    return (
        <div className='single'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        {isLoading && (
                            <div className='loader-wrapper'>
                                <div className='loader'></div>
                            </div>
                        )}
                        <Link to={`/admin/edit/${adminId}`} className="editButton">Edit</Link>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{data.nama_petugas}</h1>

                                <div className="detailItem">
                                    <div className="itemKey">Username:</div>
                                    <span className="itemValue">{data.username}</span>
                                </div>
                                <div className="detailItem">
                                    <div className="itemKey">Role:</div>
                                    <span className="itemValue">{data.level}</span>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="right">
                        <h1 className="title">Histori Pembayaran</h1>
                        <ListAdmin id={adminId} />
                    </div>
                </div>
            </div>
        </div>
    )
}


