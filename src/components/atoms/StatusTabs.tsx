'use client'
import React from 'react'
import './StatusTabs.css'

const StatusTabs = (props:{tableState:string,setTableState:(t:string)=>void}) => {

  return (
    <div className="statusTabsContainer">

        {['all','pending','approved','completed','rejected'].map((status)=>(
                  <div key={status}className={status==props.tableState?"active":""}><button onClick={()=>props.setTableState(status)}>{status.toUpperCase()}</button></div>

        ))}
     
    </div>
  )
}

export default StatusTabs
