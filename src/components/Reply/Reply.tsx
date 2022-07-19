import React from 'react'
import s from './Reply.module.css'

interface IReply{
  onClick:()=>void;
}

const Reply = ({onClick}:IReply) => {
  return (
    <button className={s.reply} onClick={onClick}>
      <img src='./images/icon-reply.svg' alt='Reply'  width='14' height='13'/>
      Reply
    </button>
  )
}

export default Reply