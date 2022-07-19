import React from 'react'
import s from './Edit.module.css'

interface IEdit{
   onClick:()=>void;
 }

const Edit = ({onClick}:IEdit) => {
  return (
   <button className={s.edit} onClick={onClick}>
      <img src='./images/icon-edit.svg' alt='Edit' width='14' height='14'/>
      Edit
   </button>
  )
}

export default Edit