import React from 'react'
import s from './Button.module.css'

interface IButton{
   color:string;
   children:React.ReactNode;
   onClick:()=>void;
}

const Button = ({color, onClick ,children}:IButton) => {
  return (
    <button style={{backgroundColor:`${color}`}} className={s.button} onClick={onClick}>{children}</button>
  )
}

export default Button