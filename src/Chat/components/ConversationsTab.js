import './ConversationTab.scss'
import CreateConversation from "./CreateConversation";
import ConversationCard from "./ConversationCard";
import {Button} from "antd";
import type {ConversationInterface} from "../interfaces/interfaces";
import {useState} from "react";

interface Props {
    conversations: ConversationInterface[];
    handleSelectChat: (chat?: any) => void;
}

export default function ConversationsTab(props: Props) {
    const [creatingGroup, setCreatingGroup] = useState(false);
    const { conversations, handleSelectChat } = props;
    const handleShowCreateConversation = () => {
        setCreatingGroup(!creatingGroup);
    };
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
                <Button onClick={handleShowCreateConversation}>New conversation</Button>
            </div>
            <CreateConversation
                creatingGroup={creatingGroup}
                handleShowCreateConversation={handleShowCreateConversation}
                handleSelectChat={handleSelectChat}
            />
        </>
    );
}