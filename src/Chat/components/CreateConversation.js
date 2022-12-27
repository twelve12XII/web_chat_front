import './CreateConversation.scss'
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {Button, Input, Modal} from "antd";
import {useState} from "react";
import {postRequest} from "../../constants";

interface Props {
    creatingGroup: boolean;
    setCreatingGroup: boolean => void;
    updateUserChatList: () => void;
    handleShowCreateConversation: () => void;
    handleSelectChat: (chat?: any) => void;
}
export default function CreateConversation(props: Props) {
    const {
        currentUserId,
        handleSelectChat,
        creatingGroup,
        updateUserChatList,
        setCreatingGroup,
        handleShowCreateConversation,
    } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addUserId, setAddUserId] = useState('');
    const [groupName, setGroupName] = useState('');
    const [chatId, setChatId] = useState('');
    const handleModalHide = () => {
        setIsModalVisible(false);
    };

    const handleModalShow = () => {
        setIsModalVisible(true);
    };
    let classname = "create-conversation";
    if (!creatingGroup) classname += " hide";
    else classname.replace("hide", "");
    const handleUserAddOnChange = (event) => {
        setAddUserId(event.target.value);
    };
    const handleGroupOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value);
    };
    const fetchGroupData = () => {
        postRequest('/create_chat', {
            "idOfRequested": addUserId,
            "chatName": groupName
        }, true)
        .then(
            response => {
                if(response.ok){
                    response.json().then(res => {
                        setChatId(res.id)
                        console.log(res)
                        setIsModalVisible(false)
                        updateUserChatList()
                        setCreatingGroup(false)
                    })
                }
                else {
                    console.log("exception" + response.status);
                }
            })
    };
    return (
        <>
            <div className={classname}>
                <header>
                    <div>
                        <Button
                            onClick={handleShowCreateConversation}
                            icon={<ArrowLeftOutlined style={{ fontSize: "18px" }} />}
                            size="large"
                            type="text"
                        />
                        <div>Add conversation participants</div>
                    </div>
                </header>
                    <div className="create-group-section">
                        <div>
                            <Input
                                type="text"
                                placeholder="What's the user's id you want to add?"
                                onChange={handleUserAddOnChange}
                                style={{ marginBottom: 6 }}
                            />
                        </div>
                        {addUserId !== '' && (
                            <Button
                                shape="circle"
                                size="large"
                                style={{ height: 48, width: 48 }}
                                icon={<ArrowRightOutlined />}
                                onClick={() => handleModalShow()}
                            ></Button>
                        )}
                    </div>
            </div>
            <Modal
                title="New group"
                open={isModalVisible}
                onCancel={handleModalHide}
                onOk={fetchGroupData}
                okText="Create Conversation"
            >
                <Input
                    type="text"
                    placeholder="What's the group's name?"
                    onChange={handleGroupOnChange}
                    style={{ marginBottom: 6 }}
                />
            </Modal>
        </>
    );
}