import "./widget.scss";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../store/index"

export const Widget = ({ type }) => {
    const [siswa, setSiswa] = useState('loading...');
    const [kelas, setKelas] = useState('loading...');
    const [pembayar, setPembayar] = useState('loading...');
    const [totalBayar, setTotalBayar] = useState('loading...');
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        axios.get('http://localhost:5000/usersa', {
            headers: {
                Authorization: `Bearer ${state.user_token}`
            }
        })
            .then(res => {
                setSiswa(res.data.length);
            })
            .catch(err => {
                console.log(err);
            })
    }, [state.user_token]);

    useEffect(() => {
        axios.get('http://localhost:5000/kelas', {
            headers: {
                Authorization: `Bearer ${state.user_token}`
            }
        })
            .then(res => {
                setKelas(res.data.length);
            })
            .catch(err => {
                console.log(err);
            })
    }, [state.user_token]);

    useEffect(() => {
        axios.get('http://localhost:5000/pembayaran', {
            headers: {
                Authorization: `Bearer ${state.user_token}`
            }
        })
            .then(res => {
                setPembayar(res.data.length);
                const total = res.data.reduce((acc, curr) => acc + curr.jumlah_bayar, 0);
                setTotalBayar(total);
            })
            .catch(err => {
                console.log(err);
            })
    }, [state.user_token]);

    let data;

    switch (type) {
        case "siswa":

            data = {
                title: "SISWA",
                isMoney: false,
                link: "See all Siswa",
                redirect: "http://localhost:3000/users",
                amount: siswa,
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "kelas":
            data = {
                title: "KELAS",
                isMoney: false,
                link: "View all Kelas",
                redirect: "http://localhost:3000/kelas",
                amount: kelas,
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "pembayaran":
            data = {
                title: "PEMBAYARAN",
                isMoney: true,
                link: "View net Payment",
                redirect: "",
                amount: totalBayar.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }),
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon"
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),
            };
            break;
        case "pembayar":
            data = {
                title: "PEMBAYAR",
                isMoney: false,
                link: "See details",
                redirect: "",
                amount: pembayar,
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="uniqe-widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.amount}
                </span>
                <span className="link"><span>JUMLAH {data.title}</span></span>
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div >
    );
};

