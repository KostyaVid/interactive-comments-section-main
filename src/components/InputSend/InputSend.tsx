import React, { ChangeEvent, useState } from 'react'
import { Avatar } from '../Avatar'
import { Button } from '../Button';
import { IPost, IUser } from '../Post/Post'
import s from './InputSend.module.css'

export interface IInputSend{
   user:IUser|undefined;
   onClick:(post:IPost)=>void;
}

const InputSend = ({user, onClick}:IInputSend) => {
  const [inputText,setInputText] = useState('');
  function addPost(){
    if(inputText!==''){
      let newPost:IPost;

      if(user){
        newPost = {
          id: 0,
          content: inputText,
          createdAt: 'Today',
          score: 0,
          replies:[],
          user:user
        }
        onClick(newPost);
        setInputText('');
      }else{
        throw new Error("Have not posts or posts are not loading.");
        
      }
    }
  }
  return (
    <div className={s.input}>
      <div className={s.marginTop}></div>
      <div className={s.content}>
         <Avatar imgUrl={user?.image.png} width = {40}/>
         <textarea className={s.textarea}
            placeholder='Add a comment...'
            maxLength={255}
            onChange = {(e:ChangeEvent<HTMLTextAreaElement>)=>{
              setInputText(e.currentTarget.value);
            }}
            value = {inputText}/>
         <Button color='hsl(238, 40%, 52%)' onClick={addPost}>SEND</Button>
      </div>
      <div className={s.marginBottom}></div>
    </div>
  )
}

export default InputSend