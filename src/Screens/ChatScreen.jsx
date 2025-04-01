import React from 'react'
import ContactList from '../Components/SideBar'
import Chat from '../Components/Chat'


const ChatScreen = () => {
  return (
    <div className='chatScreen'>
        <div>
            <ContactList />
        </div>
        <div className='conversationScreen'>
            <Chat />
        </div>
    </div>
  )
}

export default ChatScreen