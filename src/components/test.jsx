import React, { useState } from 'react';

// 评论数据
const initialComments = [
  {
    id: 1,
    author: 'User1',
    content: 'This is the first comment',
    replies: [],
  },
  {
    id: 2,
    author: 'User2',
    content: 'This is the second comment',
    replies: [
      {
        id: 3,
        author: 'User1',
        content: 'Reply to the second comment',
      },
    ],
  },
];

function Comment({ comment, onReply }) {
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    if (replyContent.trim() !== '') {
      const newReply = {
        id: Date.now(),
        author: 'User',
        content: replyContent,
      };

      comment.replies.push(newReply);

      setReplyContent('');

      onReply();
    }
  };

  return (
    <div>
      <p>
        {comment.author}: {comment.content}
      </p>
      <button onClick={onReply}>Reply</button>
      {comment.replies.map(reply => (
        <div key={reply.id} className="reply">
          <p>
            {reply.author}: {reply.content}
          </p>
        </div>
      ))}
      <div className="reply-input">
        <input
          type="text"
          placeholder="Write a reply..."
          value={replyContent}
          onChange={e => setReplyContent(e.target.value)}
        />
        <button onClick={handleReply}>Submit</button>
      </div>
    </div>
  );
}

function CommentList() {
  const [comments, setComments] = useState(initialComments);

  const handleReplyUpdate = () => {
    setComments([...comments]);
  };

  return (
    <div>
      <h1>Comments</h1>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={handleReplyUpdate}
        />
      ))}
    </div>
  );
}

export default CommentList;
