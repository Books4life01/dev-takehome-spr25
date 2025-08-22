'use client'
import { ItemRequest } from '@/app/models/request'
import React from 'react'
import './RequestRowEntry.css'
import Dropdown from '../atoms/Dropdown'
import {useRouter} from 'next/navigation'
import Checkbox from '@mui/material/Checkbox'


const RequestRowEntry = (props:{request:ItemRequest,refetchData:()=>void,batchUpdates:boolean,isSelectedUpdate:(s:string,b:boolean)=>void}) => {
    const router = useRouter();

      function handleStatusChange(newStatus:string){
        fetch("/api/request",{
          method:"PATCH",
          body:JSON.stringify({
            id:props.request.id,
            status:newStatus
          })
        }).then(()=>{
          router.refresh()
          props.refetchData()
        })

      }
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.isSelectedUpdate(props.request.id,event.target.checked);
  };
  return (
    <div className="requestRowContainer">
      {props.batchUpdates?(<Checkbox onChange={handleChange}/>):(<></>)}
      <div className="name">{props.request.requestorName}</div>
      <div className="itemRequested">{props.request.itemRequested}</div>
     <div className="createdDate">{new Date(props.request.createdDate).toLocaleDateString()}</div>
        <div className="updatedDate">{new Date(props.request.lastEditedDate).toLocaleDateString()}</div>
        <div className="status"><Dropdown status={props.request.status} setStatus={handleStatusChange}></Dropdown></div>


    </div>
  )
}

export default RequestRowEntry
