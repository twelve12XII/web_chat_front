import React, {useEffect, useState} from 'react'
import './Chats.scss'
import MenuContent from './components/MenuContent'
import ChatRoom from "./interfaces/ChatRoom";
import {postRequest} from "../constants";
// import {updateContactName} from "./interfaces/users";

// interface Props {
//     name: any;
//     userId: any
// }


function Chats() {
    const [selectedChat, setSelectedChat] = useState('Something went wrong');
    const [openChat, setOpenChat] = useState(false);
    const [conversations, setConversations] = useState();
    const [contacts, setContacts] = useState();
    const [erMessage, setErMessage] = useState('')
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
    const handleAddContact = async (contactName: string) => {
        postRequest('/add_contact', {
            "userName": contactName
        })
            .then(
            response => {
                    response.json().then(res => {
                        if (response.ok) {
                            console.log(res)
                        }else {
                            setErMessage(res.message);
                            // console.log(res.message);
                        }
                    })
            }).then(async (res) => {
            await postRequest('/user_data').then(
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
                .catch((err) => console.error(err));
        })
            .catch(function (error) {                        // catch
                console.log('Request failed', error);
            })
    };

    const [messages, setMessages] = useState([['senderName', 'TestName'], ['messageText', 'ee'], ['sendingTime', '2022-12-18T13:02:11.171478']]);

    const handleRemoveContact = (contactId: string) => {
        postRequest('/user_data').then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
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
    };

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
                        errorMessage={erMessage}
                        updateUserList={updateUserList}
                        conversations={conversations}
                        contacts={contacts}
                        handleSelectChat={handleSelectChat}
                        handleRemoveContact={handleRemoveContact}
                        handleAddContact={handleAddContact}
                        // handleUpdateContact={handleUpdateContact}
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