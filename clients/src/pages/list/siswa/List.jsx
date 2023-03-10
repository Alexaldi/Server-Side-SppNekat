import React from 'react'
import "./list.scss"
import { Sidebar } from "../../../component/sidebar/Sidebar"
import { Navbar } from "../../../component/navbar/Navbar"
import { DatatableSiswa } from '../../../component/datatable/siswa/Datatable'
function listSiswa() {
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableSiswa />
            </div>
        </div>
    )
}

export default listSiswa
