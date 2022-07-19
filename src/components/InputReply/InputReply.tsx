import {useState} from 'react'
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { IUser } from '../Post/Post';
import s from './InputReply.module.css'


interface IInputReply{
   user:IUser,
   idReply:number,
   usernameReply: string
   onClick:(idReply: number, username: string, content:string)=>void
}

const InputReply = ({user, idReply, usernameReply, onClick}:IInputReply) => {

   function clickReplyPost(){
      onClick(idReply, usernameReply, inputText);
      setInputText('');
    }

   const [inputText,setInputText] = useState('');
 
   return (
     <div className={s.input}>
       <div className={s.marginTop}></div>
       <div className={s.content}>
          <Avatar imgUrl={user?.image.png} width = {40}/>
          <textarea className={s.textarea}
             placeholder='Add a reply...'
             maxLength={255}
             onChange = {(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
               setInputText(e.currentTarget.value);
             }}
             value = {inputText}/>
          <Button color='hsl(238, 40%, 52%)' onClick={clickReplyPost}>REPLY</Button>
       </div>
       <div className={s.marginBottom}></div>
     </div>
   )
}

export default InputReply