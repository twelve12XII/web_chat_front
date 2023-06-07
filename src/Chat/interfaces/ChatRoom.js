import {Button, Input, Menu, Modal} from "antd";
import React, {useEffect, useRef, useState} from "react";
import "./ChatRoom.scss"
import ChatMessage from "./ChatMessage";
import {postRequest} from "../../constants";
import {Dropdown, Form, FormGroup} from "react-bootstrap";
import "./DropDownButton.scss"

interface Props {
    selectedChat: any;
    // contacts: any;
    messages: any;
    handleSelectChat: (chat: any) => void;
    updateMessages: () => void;
}

export default function ChatRoom(props: Props){
    const [messageText, setMessageText] = useState("");
    const {handleUpdateList, selectedChat, handleSelectChat, messages, contacts} = props;
    // const [groupName, setGroupName] = useState("");
    // const [loading, setLoading] = useState(false);
    const [chatCreator, setChatCreator] = useState("");
    const [members, setMembers] = useState([]);
    const [numMembers, setNumMembers] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isChatInfoVisible, setChatInfoVisible] = useState(false);
    const [isModalVisibleDeleteChat, setIsModalVisibleDeleteChat] = useState(false);
    const dummy = useRef(null);
    const [addUserName, setAddUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleModalHide = (key: string) => {
        setErrorMessage("");
        switch (key) {
            case "1":
                setIsModalVisibleDeleteChat(false);
                break;
            case "2":
                setIsModalVisible(false);
                break;
            default:
                setIsModalVisibleDeleteChat(false);
                setIsModalVisible(false);
                setChatInfoVisible(false);
                break;
        }
    };

    const handleModalShow = (key: string) => {
        setErrorMessage('')
        switch (key) {
            case "1":
                setIsModalVisibleDeleteChat(true);
                break;
            case "2":
                setTimeout(() => {  const selectBox = document.getElementById("members").options;
                    for(let i = selectBox.length; i !== -1; i--){
                        selectBox.remove(i);
                    }
                    var options = [];
                    for (let i = 0; i < contacts.length; i++){
                        options.push({
                            "text"     : contacts[i].contactName,
                            "value"    : `${i}`,
                        })
                    }
                    console.log(options)
                    options.forEach(option =>
                        selectBox.add(
                            new Option(option.text, option.value, option.selected)
                        )
                    );
                }, 10);
                setIsModalVisible(true);
                break;
            case "4":
                handleChatInfo();
                setChatInfoVisible(true);
                break;
        }
    };

    useEffect(() => {
        if (dummy.current) {
            dummy.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);


    const handleMessageOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        setMessageText(event.target.value);
    };

    useEffect(() => {
        // setInterval(function(){
        //     props.updateMessages();
        // }, 1000);
    })


    const handleCreateMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (messageText) {
            createMessage(messageText).then(() =>
                props.updateMessages());
            setMessageText("");
            dummy.current.scrollIntoView({behavior: "smooth"});
        }
    };

    function removeChat() {
        // let chat = selectedChat
        postRequest("/delete_chat", {
            "chatId": selectedChat.chatId
        }).then(
            response => {
                response.json().then(res => {
                    if (response.ok) {
                        handleSelectChat(null)
                        handleModalHide()
                    } else {
                        setErrorMessage(res.message);
                        console.log(res.message);
                    }
                })
            }
        ).then(
            handleUpdateList
        )
    }

    const handleGroupOnChange = () => {
        let e = document.getElementById("members");
        postRequest("/add_contact_to_chat", {
            "name": e.options[e.selectedIndex].text,
            "chatId": selectedChat.chatId
        }, true).then(
            response => {
                if (response.ok) {
                    createMessage("I added " + e.options[e.selectedIndex].text + " to the chat.").then(() =>
                        props.updateMessages());
                    setMessageText("");
                    dummy.current.scrollIntoView({behavior: "smooth"});
                    handleModalHide();
                    handleUpdateList();
                } else {
                    console.log("exception" + response.status);
                }
            })
    };

    const handleChatInfo = () => {
        postRequest("/chat_info", {
            "chatId": selectedChat.chatId
        }, true).then(
            response => {
                response.json().then(res => {
                    setChatCreator(res.creator);
                    setMembers(res.members);
                    setNumMembers(res.numberOfMembers);
                })
            })
    };

    async function fetchMessage(message) {
        await postRequest('/send', {
                "chatId": selectedChat.chatId,
                "textOfMessage": message
            }, true
        ).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        console.log(res)
                    })
                } else {
                    console.log("exception" + response.status);
                }
            })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (messageText) {
            createMessage(messageText).then(() =>
                props.updateMessages());
            setMessageText("");
            dummy.current.scrollIntoView({behavior: "smooth"});
        }
    }

    const createMessage = async (text) => {
        await fetchMessage(text)
    }

    return (
        <>
            <div className="chat-container">
                <div className="chat-container__background">
                    <header>
                        <div
                            className="image"
                            style={{
                                // backgroundImage: `url('${selectedChat.photoURL}')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                        </div>
                        <span>{selectedChat.chatName}</span>
                        <Dropdown className="dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-toggle" className="dropbtn">
                                Chat menu
                            </Dropdown.Toggle>
                            <Dropdown.Menu id="myDropdown" className="dropdown-content">
                                <Dropdown.Item key="2" onClick={() => handleModalShow("2")}>Add new user</Dropdown.Item>
                                {/*<Dropdown.Item key="3" onClick={() => console.log('icon')}>Change chat*/}
                                    {/*icon</Dropdown.Item>*/}
                                <Dropdown.Item key="4" onClick={() => handleModalShow("4")}>Chat Info</Dropdown.Item>
                                <Dropdown.Item key="1" onClick={() => handleModalShow("1")}>Delete chat</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Modal
                            id="chat-info"
                            title="Chat Info"
                            open={isChatInfoVisible}
                            onCancel={handleModalHide}
                            onOk={handleModalHide}
                            // okText="Delete chat"
                        >
                            <b>Creator:</b> {chatCreator} <br/>
                            <b>Members:</b> {members?.map((member, index) => {
                                return <div>{member}</div>
                        })}
                            <b>Number of members:</b> {numMembers}
                        </Modal>
                        <Modal
                            title="Add contact to the chat"
                            open={isModalVisible}
                            onCancel={handleModalHide}
                            onOk={handleGroupOnChange}
                            okText="Add contact"
                        >
                            <select id={"members"} name="members" className={"box"}></select>
                        </Modal>
                        <Modal
                            title="Delete this chat?"
                            open={isModalVisibleDeleteChat}
                            onCancel={handleModalHide}
                            onOk={removeChat}
                            okText="Delete chat"
                        >
                            {errorMessage !== '' && (
                                <div style={{color: "red", fontSize: "0.75rem"}}>{errorMessage}</div>
                            )}
                        </Modal>
                    </header>
                    <main>
                        <div>
                            {messages?.map((msg: any, index) => {
                                return (
                                    <ChatMessage
                                        key={index}
                                        text={msg.messageText}
                                        createdBy={msg.senderName}
                                        createdAt={msg.sendingTime}
                                        // contacts={contacts}
                                        // user={userName}
                                        // userId={userId}
                                    />
                                );
                            })}
                            <div ref={dummy}/>
                        </div>
                    </main>
                    <footer>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="text"
                                value={messageText}
                                placeholder="Type a message"
                                onChange={handleMessageOnChange}
                                onPressEnter={handleKeyDown}
                            />
                            <Button onClick={handleCreateMessage}>Send message</Button>
                        </form>
                    </footer>
                </div>
            </div>
            <Modal
                title="New Conversation Subject"
                // open={editGroupName}
                // onCancel={handleChangeNameDialog}
                // onOk={handleGroupNameChange}
                okText="Change Subject"
                // confirmLoading={loading}
            >
                <Input
                    type="text"
                    placeholder={selectedChat.chatName}
                    style={{marginBottom: 6}}
                    // onChange={handleGroupNameInputOnChange}
                />
            </Modal>

        </>
    );
}