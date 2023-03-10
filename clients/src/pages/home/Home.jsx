import React, { useState } from 'react'
import "./home.scss"
import { Sidebar } from '../../component/sidebar/Sidebar'
import { Navbar } from '../../component/navbar/Navbar'
import { Widget } from '../../component/widget/Widget'
import { List } from '../../component/table/home/Table'

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false);
    }, 100);

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                {isLoading ? (
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                    </div>
                ) :
                    (
                        <div className='load'>
                            <div className="widget">
                                <Widget type="siswa" />
                                <Widget type="kelas" />
                                <Widget type="pembayar" />
                                <Widget type="pembayaran" />
                            </div>
                            <div className="listContainer">
                                <div className="listTitle">History Pembayaran SPP</div>
                                <List />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home
