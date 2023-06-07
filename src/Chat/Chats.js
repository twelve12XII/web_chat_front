import React, {useEffect, useState} from 'react'
import './Chats.scss'
import MenuContent from './components/MenuContent'
import ChatRoom from "./interfaces/ChatRoom";
import {getRequest, postRequest} from "../constants";

// interface Props {
//     name: any;
//     userId: any
// }


function Chats() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [conversations, setConversations] = useState();
    const [contacts, setContacts] = useState();
    let [interval, setInterval1]= useState(undefined)
    const handleSelectChat = (chat: any) => {
        if(chat !== null) {
            setSelectedChat(chat);
            getMessages(chat);
            clearInterval(interval)
            setInterval1(setInterval(() => getMessages(chat), 5000))
        }
        else {
            setSelectedChat(null);
            clearInterval(interval);
            setInterval1(undefined);
        }
    };

    function updateUserList() {
        postRequest('/user_data').then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        setConversations(res.userChats)
                        setContacts(res.userContacts)
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
        updateUserList()
    }, [])

    const handleUpdateList = async () => {
        updateUserList();
    }

    const [messages, setMessages] = useState([['senderName', 'TestName'], ['messageText', 'ee'], ['sendingTime', '2022-12-18T13:02:11.171478']]);

    // const handleUpdateContact = async (
    //     contactName: string
    // ) => {
    //     return await updateContactName(contactName)
    //         .then((res: any) => {
    //             setContacts(res);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // };

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
                        handleUpdateList={handleUpdateList}
                        updateUserList={updateUserList}
                        conversations={conversations}
                        contacts={contacts}
                        handleSelectChat={handleSelectChat}
                        // handleUpdateContact={handleUpdateContact}
                    />
                </div>
                <div className="app-container__content">
                    {selectedChat ? (
                        <>
                            <ChatRoom
                                setSelectedChat={setSelectedChat}
                                messages={messages}
                                selectedChat={selectedChat}
                                contacts={contacts}
                                handleUpdateList={handleUpdateList}
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