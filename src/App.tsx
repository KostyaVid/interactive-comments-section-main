import React, { useEffect, useState } from 'react';
import './App.css';
import { InputReply } from './components/InputReply';
import { InputSend } from './components/InputSend';
import { Post } from './components/Post';
import { IPost, IUser } from './components/Post/Post';


interface IPosts{
  currentUser: IUser;
  comments:Array<IPost>;
}

function App() {

  const [posts, setPosts] = useState<IPosts|undefined>(undefined);
  const [idReply, setIdReply] = useState<number|null>(null);

  
  useEffect(()=>{
    const localString = localStorage.getItem('posts');
    if((localString!==null)&&(localString!=='undefined')){
      setPosts(JSON.parse(localString));    
    }else{
      fetch('/data.json').then(res=>res.json()).then(data=>{
        localStorage.setItem('posts',JSON.stringify(posts));    
        setPosts(data);      
      }).catch(err=>console.log(err))
    }    
  },[]);


  useEffect(()=>{
    window.scrollBy({
      top:document.body.clientHeight,
      behavior: 'smooth'
    })
  }, [posts]);


  function addPost(post:IPost){
    let newPosts:IPosts|undefined = undefined;
    if(posts){
      newPosts = {...posts};

      let maxId = newPosts.comments.reduce((prev, curr)=>{
        let max = prev;
        if(curr.replies.length>0){
          max = curr.replies.reduce((prevRep, currRep)=>{
            if(prevRep<currRep.id) return currRep.id;
            return prevRep;
          },max);
        }
        if(max<curr.id) max = curr.id;
        return max;
      } ,0);
      
      post.id = maxId+1;
      
      newPosts.comments.push(post);
      localStorage.setItem('posts', JSON.stringify(newPosts));
      setPosts(newPosts);
    }else{
      throw new Error("Have not posts or posts are not loading.");
    }
  }

  function replyPost(idReply: number, username: string, content:string){
    if(posts){
      let newPost:IPost = {
        id:0,
        content:content,
        createdAt:"Today",
        score:0,
        user:posts?.currentUser,
        replies:[],
        replyingTo:username
      }
      let newPosts:IPosts|undefined = undefined;

      newPosts = {...posts};
  
      let maxId = newPosts.comments.reduce((prev, curr)=>{
        let max = prev;
        if(curr.replies.length>0){
          max = curr.replies.reduce((prevRep, currRep)=>{
            if(prevRep<currRep.id) return currRep.id;
            return prevRep;
          },max);
        }
        if(max<curr.id) max = curr.id;
        return max;
      } ,0);

      newPosts.comments.forEach((elem)=>{
        if(elem.id === idReply) elem.replies.push(newPost);
        if(elem.replies.length>0){
          elem.replies.forEach((elemRep)=>{
            if(elemRep.id === idReply) elem.replies.push(newPost);
          });
        }
      });
        
      newPost.id = maxId+1;

      localStorage.setItem('posts', JSON.stringify(newPosts));
      setPosts(newPosts);
    }
    setIdReply(null);
  }


  function updatePost(content:string, id:number){
    let newPosts:IPosts|undefined = undefined;
    if(posts){
      newPosts = {...posts};
      posts.comments.forEach((elem, index)=>{
        if(elem.id === id) (newPosts as IPosts).comments[index].content = content;
        if(elem.replies){
          elem.replies.forEach((elemRep,indexRep)=>{
            if(elemRep.id === id) (newPosts as IPosts).comments[index].replies[indexRep].content = content;           
          })
        }
      })
      localStorage.setItem('posts', JSON.stringify(newPosts));
      setPosts(newPosts);
  }
  }


  function deletePost(id:number){
    let newPosts:IPosts|undefined = undefined;
    if(posts){
      newPosts = {...posts};
      posts.comments.forEach((elem, index)=>{
        if(elem.id === id) (newPosts as IPosts).comments.splice(index,1);
        if(elem.replies){
          elem.replies.forEach((elemRep,indexRep)=>{
            if(elemRep.id === id) (newPosts as IPosts).comments[index].replies.splice(indexRep,1);           
          })
        }
      })
      localStorage.setItem('posts', JSON.stringify(newPosts));
      setPosts(newPosts);
  }
}


  return (
    <div className="App">

      {posts?.comments.map((post)=>{
        return <div key={post.id}>
          <Post post= {post} updatePost={updatePost} currentUserName = {posts.currentUser.username} deletePost={deletePost} replyPost={setIdReply}/>
        {(idReply === post.id)?<InputReply user={posts?.currentUser} onClick={replyPost} idReply={post.id} usernameReply={post.user.username}/>:''}
          {post.replies?
          <div className='replies'>

            <div className="blockLine">
              <div className="blockLine__line"></div>
            </div>
            <div className='replies__content'>
              {post.replies.map((reply)=>{
                return (
                <div key={reply.id.toString() + 'r'}>
                  <Post post= {reply} updatePost={updatePost} currentUserName = {posts.currentUser.username} deletePost={deletePost} replyPost={setIdReply}/>
                  {(idReply === reply.id)?<InputReply user={posts?.currentUser} onClick={replyPost} idReply={reply.id}  usernameReply={reply.user.username}/>:''}
                </div>
              )})}
            </div>
          </div>:''}        
        </div>
      })}
      {!idReply? <InputSend user={posts?.currentUser} onClick={addPost}/>:''}
      <footer></footer>
    </div>
  );
}

export default App;
