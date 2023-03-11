import React, { useEffect, useState } from 'react'
import "../single.scss"
import { Sidebar } from "../../../component/sidebar/Sidebar"
import { Navbar } from "../../../component/navbar/Navbar"
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ListSpp } from '../../../component/table/spp/TableSingle'
import Cookies from 'js-cookie'

export const SingleSpp = () => {
    const { sppId } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        getKelasById(sppId)
    }, [sppId]);

    const getKelasById = async (sppId) => {
        try {
            const response = await axios.get(`http://localhost:5000/spp/${sppId}`,
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
                        <Link to={`/spp/edit/${sppId}`} className="editButton">Edit</Link>
                        <h1 className="title">Detail Spp</h1>
                        <div className="item">
                            <div className="details">
                                <div className="detailItem">
                                    <div className="itemKey">Nominal Spp: </div>
                                    <span className="itemValue">{data.nominal?.toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0,
                                    })}</span>
                                </div>
                                <div className="detailItem">
                                    <div className="itemKey">Tahun Spp:</div>
                                    <span className="itemValue">{data.tahun}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <h1 className="title">History Pembayaran Spp</h1>
                        <ListSpp id={sppId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

