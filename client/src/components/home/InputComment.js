import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from 'redux/actions/commentAction';

const InputComment = ({ children, post, onReply, setOnReply }) => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!content.trim()) {
           if(setOnReply) return setOnReply(false);
            return;
        }
        setContent('');

        const newComment = {
            content, 
            likes: [],
            user: auth.user,
            createAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }
        console.log(newComment);
        dispatch(createComment({post, newComment, auth}))
        if(setOnReply) return setOnReply(false);
    }
    return (
        <form className="card-footer comment_input" onSubmit={handleSubmit}>
            {children}
            <input type="text" placeholder="Add your comments..."
            value={content} onChange={e => setContent(e.target.value)} />
            <button type='submit' className='postBtn'>
                Post
            </button>
        </form>
    )
}

export default InputComment;
