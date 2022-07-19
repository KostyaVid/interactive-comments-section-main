import React from 'react'
import s from './Avatar.module.css'

interface IAvatar{
  imgUrl:string|undefined;
  width?:number;
}

const Avatar = ({imgUrl, width = 30}:IAvatar) => {
  return (
    <div style = {{width:`${width}px`, height:`${width}px`}}>
      {imgUrl?<img src = {imgUrl} alt='Avatar'  className={s.imgAvatar}/>
      :<div className={s.noImage}></div>}
    </div>
  )
}

export default Avatar