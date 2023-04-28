import {Button, Input, Menu, Modal} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {MoreOutlined} from "@ant-design/icons";
import "./ChatRoom.scss"
import ChatMessage from "./ChatMessage";
import {postRequest} from "../../constants";
import {Dropdown, Form, FormGroup} from "react-bootstrap";
import updateUserList from '../Chats'

interface Props {
    selectedChat: any;
    // contacts: any;
    messages: any;
    handleSelectChat: (chat: any) => void;
    updateMessages: () => void;
}

export default function ChatRoom(props: Props) {
    const [messageText, setMessageText] = useState("");
    const {handleUpdateList, selectedChat, handleSelectChat, /*contacts,*/ messages} = props;
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleDeleteChat, setIsModalVisibleDeleteChat] = useState(false);
    const dummy = useRef(null);
    const [addUserName, setAddUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleModalHide = (key:string) => {
        setErrorMessage("");
        switch (key) {
            case "1": setIsModalVisibleDeleteChat(false);
            break;
            case "2": setIsModalVisible(false);
            break;
            default: setIsModalVisibleDeleteChat(false);
                setIsModalVisible(false);
                break;
        }
    };

    const handleModalShow = (key:string) => {
        setErrorMessage('')
        switch (key) {
            case "1": setIsModalVisibleDeleteChat(true);
            break;
            case "2": setIsModalVisible(true);
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

    function removeChat () {
        // let chat = selectedChat
        postRequest("/delete_chat", {
            "chatId": selectedChat.chatId
        }).then(
            response => {
                response.json().then(res => {
                    if (response.ok) {
                        console.log(res)
                    }else {
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
        postRequest("/add_contact_to_chat", {
            "name": addUserName,
            "chatId": selectedChat.chatId
        }).then(
            handleUpdateList
        )
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

    const createMessage = async (text) => {
        await fetchMessage(text)
    }

    // const menu = (
    //     // <Form>
    //     //     <FormGroup controlId="selection">
    //     //
    //     //         <Dropdown>
    //     //             <Dropdown.Toggle variant="success" id="dropdown-basic">
    //     //                 Menu
    //     //             </Dropdown.Toggle>
    //     //
    //     //             <Dropdown.Menu>
    //     //                 <Dropdown.Item key="1" onClick={() => removeChat()}>Delete chat</Dropdown.Item>
    //     //                 {/*<Dropdown.Item key="2" onClick={() => deleteAccount()}>Delete account</Dropdown.Item>*/}
    //     //                 {/*<Dropdown.Item>xyz</Dropdown.Item>*/}
    //     //             </Dropdown.Menu>
    //     //         </Dropdown>
    //     //     </FormGroup>
    //     // </Form>
    //     // <Menu>
    //     //     <Menu.Item
    //     //         key="1"
    //     //         onClick={() => {
    //     //             // handleChangeNameDialog();
    //     //         }}
    //     //     >
    //     //         Edit group name
    //     //     </Menu.Item>
    //     //     <Menu.Item
    //     //         key="4"
    //     //         onClick={() => {
    //     //             // deleteGroup(selectedChat.id);
    //     //             handleSelectChat(null);
    //     //         }}
    //     //     >
    //     //         Exit group
    //     //     </Menu.Item>
    //     // </Menu>
    // );

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
                        <Form>
                            <FormGroup controlId="selection">

                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-toggle">
                                        Menu
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item key="1" onClick={() => handleModalShow("1")}>Delete chat</Dropdown.Item>
                                        <Dropdown.Item key="2" onClick={() => handleModalShow("2")}>Add new user</Dropdown.Item>
                                        {/*<Dropdown.Item>xyz</Dropdown.Item>*/}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </FormGroup>
                        </Form>
                        <Modal
                            title="Add contact to the chat"
                            open={isModalVisible}
                            onCancel={handleModalHide}
                            onOk={handleGroupOnChange}
                            okText="Add contact"
                        >
                            <Input
                                type="text"
                                placeholder="What's the user name?"
                                onChange={(event) => setAddUserName(event.target.value)}
                                style={{ marginBottom: 6 }}
                            />
                        </Modal>
                        <Modal
                            title="Delete this chat?"
                            open={isModalVisibleDeleteChat}
                            onCancel={handleModalHide}
                            onOk={removeChat}
                            okText="Delete chat"
                        >
                            {errorMessage !== '' && (
                                <div style={{ color: "red", fontSize: "0.75rem" }}>{errorMessage}</div>
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