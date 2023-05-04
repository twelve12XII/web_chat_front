import './ConversationTab.scss'
import CreateConversation from "./CreateConversation";
import ConversationCard from "./ConversationCard";
import {Button} from "antd";
import type {ConversationInterface} from "../interfaces/interfaces";
import {useState} from "react";
import {postRequest} from "../../constants";

interface Props {
    conversations: ConversationInterface[];
    handleSelectChat: (chat?: any) => void;
    updateUserList: () => void;
}

export default function ConversationsTab(props: Props) {
    const [creatingGroup, setCreatingGroup] = useState(false);
    const {conversations, handleSelectChat, updateUserList} = props;
    const handleShowCreateConversation = () => {
        setCreatingGroup(!creatingGroup);
    };
    const [allUsers, setAllUsers] = useState([]);
    const usersList = () => {
        postRequest('/search').then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        setAllUsers(res.allUsers)
                    })
                } else {
                    console.log("exception" + response.status);
                }
            });
        handleShowCreateConversation();
    }
    return (
        <>
            <div className="conversations-tab">
                <div className="conversations-list">
                    {conversations?.map((conv, index) => {
                        return (
                            <ConversationCard
                                key={index}
                                conversationName={conv.chatName}
                                conversationId={conv.chatId}
                                onClick={() => handleSelectChat(conv)}
                            />
                        );
                    })}
                </div>
                <Button onClick={usersList}>New conversation</Button>
            </div>
            <CreateConversation
                usersArray={allUsers}
                updateUserChatList={updateUserList}
                creatingGroup={creatingGroup}
                setCreatingGroup={setCreatingGroup}
                handleShowCreateConversation={handleShowCreateConversation}
                handleSelectChat={handleSelectChat}
            />
        </>
    );
}