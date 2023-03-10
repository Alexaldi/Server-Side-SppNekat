import React from 'react'
import "../list.scss"
import { Sidebar } from "../../../component/sidebar/Sidebar"
import { Navbar } from "../../../component/navbar/Navbar"
import { DatatableSpp } from '../../../component/datatable/spp/Datatable'
function listSpp() {
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableSpp />
            </div>
        </div>
    )
}

export default listSpp
