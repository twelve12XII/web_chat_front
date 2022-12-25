import './CreateConversation.scss'
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {Button, Input, Modal} from "antd";
import {useState} from "react";
import Login from "../../Login";
import {url} from "../../constants";
interface Props {
    currentUserId: any;
    creatingGroup: boolean;
    handleShowCreateConversation: () => void;
    handleSelectChat: (chat?: any) => void;
}
export default function CreateConversation(props: Props) {
    const {
        currentUserId,
        handleSelectChat,
        creatingGroup,
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
        fetch(url + '/create_chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                // 'Authorization': 'Basic QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBOlBBU1NXT1JE'
            },
            body: JSON.stringify({
                "idOfRequested": addUserId,
                "idOfCreator": currentUserId,
                "chatName": groupName
            })
        }).then(
            response => {
                if(response.ok){
                    response.json().then(res => {
                        setChatId(res.id)
                        console.log(res)
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