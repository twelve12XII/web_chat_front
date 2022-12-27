import React, {useEffect, useState} from 'react'
import './Chats.scss'
import MenuContent from './components/MenuContent'
import ChatRoom from "./interfaces/ChatRoom";
import {postRequest} from "../constants";

// interface Props {
//     name: any;
//     userId: any
// }


function Chats() {
    const [selectedChat, setSelectedChat] = useState('');
    const [openChat, setOpenChat] = useState(false);
    const [conversations, setConversations] = useState();
    const handleShowOpenChat = () => {
        setOpenChat(!openChat);
    };
    // useEffect(() => {
    //     if (selectedChat) {
    //         const updatedSelectedChat = conversations?.find(
    //             (elem: any) => elem.chatId === selectedChat.chatId
    //         );
    //         if (updatedSelectedChat) {
    //             setSelectedChat(updatedSelectedChat);
    //         }
    //     }
    // }, [conversations]);
    let [interval, setInterval1]= useState(undefined)
    const handleSelectChat = (chat: any) => {
        setSelectedChat(chat);
        getMessages(chat);
        clearInterval(interval)
        setInterval1(setInterval(() => getMessages(chat), 5000))
    };

    function updateUserChatList() {
        postRequest('/user_chats').then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        setConversations(res)
                        console.log(res)
                    })
                } else {
                    console.log("exception" + response.status);
                }
            })
            .catch(function (error) {                        // catch
                console.log('Request failed', error);
            })
    }
    useEffect(() => {
        updateUserChatList()
    }, [])

    const [messages, setMessages] = useState([['senderName', 'TestName'], ['messageText', 'ee'], ['sendingTime', '2022-12-18T13:02:11.171478']]);

    function getMessages(chat: any = null) {
        if (chat == null)
            chat = selectedChat
        postRequest('/messages', {
            'chatId': chat.chatId
        }).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        setMessages(res)
                        console.log(res)
                    })
                } else {
                    console.log("exception" + response.status);
                }
            })
    }

    return (
        <div className="wrapper">
            <div className="app-container">
                <div className="app-container__menu">
                    <MenuContent
                        updateUserChatList={updateUserChatList}
                        conversations={conversations}
                        handleSelectChat={handleSelectChat}
                    />
                </div>
                <div className="app-container__content">
                    {selectedChat ? (
                        <>
                            <ChatRoom
                                messages={messages}
                                selectedChat={selectedChat}
                                openChat={openChat}
                                // contacts={contacts}
                                handleSelectChat={handleSelectChat}
                                updateMessages={getMessages}
                            />
                        </>
                    ) : (
                        <div
                            style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                padding: "32px 20% 32px 32px",
                                alignItems: "center",
                                fontSize: "1rem",
                                fontWeight: 500,
                            }}
                        >
                            Pick an existing chat or create a new one.
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Chats;