import React from 'react'

const Chats = ({chat}) => {
  return (
    <div className='border min-w-72 border-white rounded-xl flex items-center gap-3 p-2'>
        <img className='w-14 rounded-full h-14' src={chat.profilePic} />
        <p className='flex-1'>{chat.name}</p>
    </div>
  )
}

export default Chats