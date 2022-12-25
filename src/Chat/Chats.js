import React, {useState, useEffect} from 'react'
import Login from '../Login'
import './Chats.scss'
import MenuContent from './components/MenuContent'
import {useLocation} from "react-router-dom";
import ChatRoom from "./interfaces/ChatRoom";
import {Button} from "antd";

// interface Props {
//     name: any;
//     userId: any
// }

function Chats() {
    const {state} = useLocation();
    const {
        name,
        userId
    } = state;
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
    const handleSelectChat = (chat: any) => {
        getMessages();
        setSelectedChat(chat);
    };
    useEffect( () => {
            fetch('http://25.62.253.8:12975/user_chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    // 'Authorization': 'Basic QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBOlBBU1NXT1JE'
                },
                body: JSON.stringify({
                    "userId": userId
                })
            }).then(
                response => {
                    if(response.ok){
                        response.json().then(res => {
                            setConversations(res)
                            console.log(res)
                        })
                    }
                    else {
                        console.log("exception" + response.status);
                    }
                })
                .catch(function(error) {                        // catch
                console.log('Request failed', error);
            })
        }
    , []);
    const [messages, setMessages] = useState([['senderName', 'TestName'],['messageText', 'ee'], ['sendingTime', '2022-12-18T13:02:11.171478']]);
    function getMessages(){
        fetch('http://25.62.253.8:12975/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                // 'Authorization': 'Basic QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBOlBBU1NXT1JE'
            },
            body: JSON.stringify({
                "chatId": selectedChat.chatId
            })
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
                            currentUserId={userId}
                            user={name}
                            conversations={conversations}
                            handleSelectChat={handleSelectChat}
                        />
                    </div>
                    <div className="app-container__content">
                        {selectedChat ?(
                            <>
                                <ChatRoom
                                    messages={messages}
                                    userName={name}
                                    selectedChat={selectedChat}
                                    openChat={openChat}
                                    // contacts={contacts}
                                    handleSelectChat={handleSelectChat}
                                    userId={userId}
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