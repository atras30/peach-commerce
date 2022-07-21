import React from 'react'
import { useEffect } from 'react'

export default function UserReply({comment}) {
  useEffect(function() {
    // console.log(comment)
  },[])
  
  return (
    <div className='d-flex gap-4 mb-2 shadow-sm p-3 user-reply rounded'>
      <div>
        <div><i className="bi bi-person-circle"></i></div>
        <div>{comment.user.username}</div>
        <div className='text-muted'>1 minggu yang lalu</div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: comment.comment.split("\n").map(sentence => `<div style="min-height: 1em">${sentence}</div>`).join("") }}></div>
    </div>
  )
}
