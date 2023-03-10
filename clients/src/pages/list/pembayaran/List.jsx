import React from 'react'
import "../list.scss"
import { Sidebar } from "../../../component/sidebar/Sidebar"
import { Navbar } from "../../../component/navbar/Navbar"
import { DatatablePembayaran } from '../../../component/datatable/pembayaran/Datatable'
function listPembayaran() {
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatablePembayaran />
            </div>
        </div>
    )
}

export default listPembayaran
