import React from 'react'
import "../list.scss"
import { Sidebar } from "../../../component/sidebar/Sidebar"
import { Navbar } from "../../../component/navbar/Navbar"
import { DatatableKelas } from '../../../component/datatable/kelas/Datatable'
function listKelas() {
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableKelas />
            </div>
        </div>
    )
}

export default listKelas
