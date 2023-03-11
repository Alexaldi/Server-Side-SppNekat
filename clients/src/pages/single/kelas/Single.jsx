import React, { useEffect, useState } from 'react'
import "../single.scss"
import { Sidebar } from "../../../component/sidebar/Sidebar"
import { Navbar } from "../../../component/navbar/Navbar"
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ListKelas } from '../../../component/table/kelas/TableSingle'
import Cookies from 'js-cookie'

export const SingleKelas = () => {
    const { kelasId } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        getKelasById(kelasId)
    }, [kelasId]);

    const getKelasById = async (kelasId) => {
        try {
            const response = await axios.get(`http://localhost:5000/kelas/${kelasId}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    },
                });
            setData(response.data);
            setIsLoading(false)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
        }
    };
    console.log(data);
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
                        <Link to={`/kelas/edit/${kelasId}`} className="editButton">Edit</Link>
                        <h1 className="title">Kelas</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{data.angkatan} {data.kelas}</h1>
                            </div>

                        </div>
                    </div>
                    <div className="right">
                        <h1 className="title">Daftar Siswa</h1>
                        <ListKelas id={kelasId} />
                    </div>
                </div>
            </div>
        </div>
    )
}


