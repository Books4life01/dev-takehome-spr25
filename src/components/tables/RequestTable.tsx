'use client'
import React, { useEffect, useState } from 'react'
import Pagination from '../molecules/Pagination'
import { ItemRequest } from '@/app/models/request';
import RequestRowEntry from '../molecules/RequestRowEntry';
import './RequestTable.css'
import StatusTabs from '../atoms/StatusTabs';
import { PAGINATION_PAGE_SIZE } from '@/lib/constants/config';

const RequestTable = (/**props:{requests:ItemRequest[]}**/) => {

  const [tableState,setTableState] = useState<string>("all");
  const [page,setPage] = useState<number>(1);
  const [requests,setRequestList] = useState<ItemRequest[]>([]);
    const [pageCount,setPageCount] = useState<number>(0);

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
  
  useEffect(()=>{
    refetchData();

  },[page,tableState])



  return (
    <div className="flex flex-col w-full">
        <div className="statusTabs construction"><StatusTabs tableState={tableState} setTableState={changeTableState}/></div>
        <div className="tableHeaders"><div>Name</div><div className="itemRequestedHeader">ItemRequested</div><div>Created</div><div>Updated</div><div>Status</div></div>
        <div className='Requests construction'>
          {requests.map(request=><RequestRowEntry key={request.id}  request={request} refetchData={refetchData}/>)}

        </div>
        <div className="tableFooter construction">
          
          <Pagination pageNumber={page} pageSize={PAGINATION_PAGE_SIZE} totalRecords={pageCount} onPageChange={setPage}/>
        </div>
    </div>
  )
}

export default RequestTable
