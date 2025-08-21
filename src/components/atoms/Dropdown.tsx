'use client'
import React, { useState } from 'react'
import './Dropdown.css'
import { DownArrowIcon } from '../icons/DownArrowIcon'
const ArrowButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <div
    className="w-6 h-6 p-1 bg-gray-fill-light rounded border border-gray-stroke justify-center items-center inline-flex"
    onClick={onClick}
  >
    {children}
  </div>
);
const Dropdown = (props:{status:string,setStatus:(status:string)=>void}) => {

  const [dropdownActive, setDropdownActive] = useState<boolean>();

   
  return (
    




    <div className="statusSelector">
      <div className={"selected "+(dropdownActive?"highlighted":"")}>
          <div className={"statusPillbox "+props.status}>{props.status.toUpperCase()}</div>
          <div className="arrowHolder"><ArrowButton onClick={()=>{
            setDropdownActive(!dropdownActive)

          }}><DownArrowIcon></DownArrowIcon></ArrowButton></div>
      </div>
        <div className={"hiddenContainer"+(dropdownActive?"":" hidden")}> {(['pending','approved','completed','rejected'].map((status=>(
        <div key={status} className="optionContainer">
          <div className={"statusPillbox "+status}><button onClick={()=>{
          setDropdownActive(false);
            props.setStatus(status);}
          }> {status.toUpperCase()}</button></div>

        </div>
      ))))}</div>
     
      



    </div>
  )
}

export default Dropdown
