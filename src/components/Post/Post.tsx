import React, { useState } from 'react'
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Delete } from '../Delete';
import { Edit } from '../Edit';
import { Likes } from '../Likes';
import { Reply } from '../Reply';
import s from './Post.module.css'

export interface IImage{
  png:string;
  webp:string;
}
export interface IUser{
  image:IImage;
  username:string;
}

export interface IPost{
  id:number;
  content:string;
  createdAt:string;
  score:number;
  replyingTo?:string;
  user:IUser;
  replies:Array<IPost>;
}

interface IPostWithProps{
  post:IPost;
  currentUserName: string;
  deletePost:(id:number)=>void;
  updatePost:(content:string, id:number)=>void;
  replyPost:(rep:number|null)=>void;
}

const Post = ({post, currentUserName, deletePost, updatePost, replyPost}:IPostWithProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputText,setInputText] = useState(post.content);

  function clickEdit(){
    setIsEdit(true);
  }

  function update(){
    setIsEdit(false);
    updatePost(inputText,post.id);
  }

  function deleteThisPost(){
    deletePost(post.id);
  }

  function clickReply(){
    replyPost(post.id);
  }

  let isCurrentUser = false;
  if(currentUserName === post.user.username) isCurrentUser = true;

  return (
    <div className={s.post}>
      <div className={s.likes}><Likes count={post.score} clickLike = {()=>{}} clickDislike = {()=>{}}/></div>
      <div className={s.title}>
        <Avatar imgUrl={post.user.image.png}/>
        <div className={s.userName}>{post.user.username}</div>
        {isCurrentUser?<div className={s.you}>you</div>:''}
        <div className={s.createdAt}>{post.createdAt}</div>
      </div>

      <div className={s.active}>
      {isCurrentUser?
      isEdit?
      <Button color='hsl(238, 40%, 52%)' onClick={update}>UPDATE</Button>
      :
        <>
          <Delete onClick={deleteThisPost} />
          <Edit onClick={clickEdit} />
        </>:
      <Reply onClick={clickReply}/>}
      </div>
      {isEdit?
        <textarea className={s.textarea}
        placeholder='Add a comment...'
        maxLength={255}
        onChange = {(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
          setInputText(e.currentTarget.value);
        }}
        value = {inputText}/>
        :
        <p className={s.content}>
          {post.replyingTo?<span>@{post.replyingTo} </span>:''}
          {post.content}
        </p>
      }

    </div>
  )
}

export default Post