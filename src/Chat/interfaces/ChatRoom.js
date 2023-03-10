import {Button, Input, Menu, Modal} from "antd";
import {useEffect, useRef, useState} from "react";
import {MoreOutlined} from "@ant-design/icons";
import "./ChatRoom.scss"
import ChatMessage from "./ChatMessage";
import {postRequest} from "../../constants";

interface Props {
    selectedChat: any;
    // contacts: any;
    messages: any;
    handleSelectChat: (chat: any) => void;
    updateMessages: () => void;
}

export default function ChatRoom(props: Props) {
    const [messageText, setMessageText] = useState("");
    const {selectedChat, handleSelectChat, /*contacts,*/ messages} = props;
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(false);

    const dummy = useRef(null);

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

    const menu = (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => {
                    // handleChangeNameDialog();
                }}
            >
                Edit group name
            </Menu.Item>
            <Menu.Item
                key="4"
                onClick={() => {
                    // deleteGroup(selectedChat.id);
                    handleSelectChat(null);
                }}
            >
                Exit group
            </Menu.Item>
        </Menu>
    );

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
                        <Button
                            menu={menu}
                            icon={<MoreOutlined style={{fontSize: "1.65rem"}}/>}
                        />
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