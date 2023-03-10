import React, { useContext, useEffect, useState } from 'react'
import "../single.scss"
import { Sidebar } from "../../../component/sidebar/Sidebar"
import { Navbar } from "../../../component/navbar/Navbar"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { ListSiswa } from '../../../component/table/siswa/TableSingle'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../store'

export const SingleSiswa = () => {
    const { userId } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [state, dispatch] = useContext(AppContext);

    const navigate = useNavigate()

    useEffect(() => {
        getSiswaById(userId)
    }, [userId]);

    const getSiswaById = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/usersa/${userId}`, {
                headers: {
                    Authorization: `Bearer ${state.user_token}`
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
                        <Link to={`/users/edit/${userId}`} className="editButton">Edit</Link>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{data.name}</h1>

                                <div className="detailItem">
                                    <div className="itemKey">Nisn:</div>
                                    <span className="itemValue">{data.nisn}</span>
                                </div>
                                <div className="detailItem">
                                    <div className="itemKey">Kelas:</div>
                                    <span className="itemValue">{data.kelas?.angkatan} {data.kelas?.kelas}</span>
                                </div>
                                <div className="detailItem">
                                    <div className="itemKey">Alamat:</div>
                                    <span className="itemValue">{data.alamat}</span>
                                </div>
                                <div className="detailItem">
                                    <div className="itemKey">No Telepon:</div>
                                    <span className="itemValue">{data.no_telp}</span>
                                </div>
                                <div className="detailItem">
                                    <div className="itemKey">Email:</div>
                                    <span className="itemValue">{data.email}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="right">
                        <h1 className="title">Histori Pembayaran</h1>
                        <ListSiswa id={userId} />
                    </div>
                </div>
            </div>
        </div>
    )
}


