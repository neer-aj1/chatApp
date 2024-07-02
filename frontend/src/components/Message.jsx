import React from 'react'

const Message = ({message}) => {
  return (
    <div className='bg-blue-500 p-1 w-fit rounded-t-xl rounded-br-xl'>
      <p>{message.message}</p>
    </div>
  )
}

export default Message