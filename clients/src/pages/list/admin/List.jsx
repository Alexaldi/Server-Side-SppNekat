import React from 'react'
import "../list.scss"
import { Sidebar } from "../../../component/sidebar/Sidebar"
import { Navbar } from "../../../component/navbar/Navbar"
import { DatatableAdmin } from '../../../component/datatable/petugas/Datatable'
function listAdmin() {
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableAdmin />
            </div>
        </div>
    )
}

export default listAdmin
