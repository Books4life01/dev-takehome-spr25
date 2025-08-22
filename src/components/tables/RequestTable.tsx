'use client'
import React, { useEffect, useState } from 'react'
import Pagination from '../molecules/Pagination'
import { ItemRequest } from '@/app/models/request';
import RequestRowEntry from '../molecules/RequestRowEntry';
import './RequestTable.css'
import StatusTabs from '../atoms/StatusTabs';
import { PAGINATION_PAGE_SIZE } from '@/lib/constants/config';
import { Checkbox } from '@mui/material';
import { useRouter } from 'next/navigation';
import Dropdown from '../atoms/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const RequestTable = (props:{batchUpdates:boolean}) => {

  const [tableState,setTableState] = useState<string>("all");
  const [page,setPage] = useState<number>(1);
  const [requests,setRequestList] = useState<ItemRequest[]>([]);
    const [pageCount,setPageCount] = useState<number>(0);

    const [idsSelected,setIdsSelected] = useState<Set<string>>(new Set());
      const [batchSendState,setBatchSendState] = useState<string>("none");


      const router = useRouter()
  // let filteredRequests=props.requests.filter((request)=>tableState=="all" ||request.status==tableState);

function changeTableState(state:string){
  setPage(1);
  setTableState(state);
}

  function refetchData(){

      const statusString = tableState!="all"?"&status="+tableState:"";
            fetch("/api/request?"+  "status="+tableState).then(data=>data.json()).then(reqs=>{console.log(reqs);setPageCount(reqs.length)}).then(()=>{
              fetch("/api/request?page=" +page+ statusString + "").then(data=>data.json()).then(reqs=>setRequestList(reqs)).then((()=>{

              }))

            })
  }

  function handleRequestSelected(id:string,value:boolean){
    setIdsSelected((prev)=>{
            const newSet = new Set(prev);

      if(value){
      newSet.add(id)
      }
      else{
          newSet.delete(id);
      }
      return newSet;
    })

   
  }
  function sendBatchUpdate(state:string){
    setBatchSendState(state)

    if(state=="none"){

    }
    else if(state=="delete"){
      fetch("/api/request",{
          method:"DELETE",
          body:JSON.stringify([...idsSelected])
        }).then(()=>{
          //set global status back to default
          router.refresh();
          refetchData();
        })
      
      }
      else{
        fetch("/api/request",{
                method:"PATCH",
                body:JSON.stringify([...idsSelected].map((idSelected=>({id:idSelected,status:state}))))
              }).then(()=>{
                //set global status back to default
                router.refresh();
                refetchData();
              })
      }
    }
  
  useEffect(()=>{
    refetchData();

  },[page,tableState])



  return (
    <div className="flex flex-col w-full">
      <div className="topBar"><h3>Item Requests</h3><div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><div style={{marginRight:"5px"}}>Mark As <Dropdown status={batchSendState} setStatus={sendBatchUpdate} /></div><FontAwesomeIcon onClick={()=>sendBatchUpdate("delete")} icon={faTrash} /></div></div>
        <div className="statusTabs construction"><StatusTabs tableState={tableState} setTableState={changeTableState}/></div>
        <div className="tableHeaders">{props.batchUpdates?(<Checkbox indeterminate={idsSelected.size>0} ></Checkbox>):(<></>)}<div>Name</div><div className="itemRequestedHeader">ItemRequested</div><div>Created</div><div>Updated</div><div>Status</div></div>
        <div className='Requests construction'>
          {requests.map(request=><RequestRowEntry key={request.id}  request={request} refetchData={refetchData} batchUpdates={props.batchUpdates} isSelectedUpdate={handleRequestSelected}/>)}

        </div>
        <div className="tableFooter construction">
          
          <Pagination pageNumber={page} pageSize={PAGINATION_PAGE_SIZE} totalRecords={pageCount} onPageChange={setPage}/>
        </div>
    </div>
  )
}

export default RequestTable
