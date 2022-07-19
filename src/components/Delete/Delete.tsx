import React from 'react'
import s from './Delete.module.css'

interface IDelete{
   onClick:()=>void;
 }

const Delete = ({onClick}:IDelete) => {
  return (
   <button className={s.delete} onClick={onClick}>
      <img src='./images/icon-delete.svg' alt='Delete'  width='12' height='14'/>
      Delete
   </button>
  )
}

export default Delete