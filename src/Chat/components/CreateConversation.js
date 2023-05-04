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
        updateUserChatList,
        usersArray = [],
        creatingGroup,
        handleShowCreateConversation,
        setCreatingGroup,
    } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [groupName, setGroupName] = useState('');
    const handleModalHide = () => {
        setIsModalVisible(false);
    };

    const handleModalShow = () => {
        setIsModalVisible(true);
    };
    let classname = "create-conversation";
    if (!creatingGroup) classname += " hide";
    else classname.replace("hide", "");
    const handleGroupOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(event.target.value);
    };
    const fetchGroupData = () => {
        var e = document.getElementById("search");
        postRequest('/create_chat_with_contact', {
            "userName": e.options[e.selectedIndex].text,
            "chatName": groupName
        }, true)
            .then(
                response => {
                    if (response.ok) {
                        response.json().then(res => {
                            console.log(res)
                            handleModalHide();
                            updateUserChatList()
                            setCreatingGroup(false)
                        })
                    } else {
                        console.log("exception" + response.status);
                    }
                })
    }
    function createChat () {
        handleModalShow();
        setTimeout(() => {  const selectBox = document.getElementById("search").options;
            for(let i = selectBox.length; i !== -1; i--){
                selectBox.remove(i);
            }
            console.log(selectBox.length)
            var options = [];
            for (let i = 0; i < usersArray.length; i++){
                options.push({
                    "text"     : usersArray[i].contactName,
                    "value"    : `${i}`,
                })
            }
            options.forEach(option =>
                selectBox.add(
                    new Option(option.text, option.value, option.selected)
                )
            );
            }, 10);
    }


    return (
        <>
            <div className={classname}>
                <header>
                    <div>
                        <Button
                            onClick={handleShowCreateConversation}
                            icon={<ArrowLeftOutlined style={{fontSize: "18px"}}/>}
                            size="large"
                            type="text"
                        />
                        <Button onClick={createChat}>Create chat</Button>
                    </div>
                </header>
                <Modal title="New chat"
                       open={isModalVisible}
                       onCancel={handleModalHide}
                       onOk={fetchGroupData}
                       okText="Create chat"
                >
                    <select id={"search"} name="search" className={"box"}></select>
                    <Input
                        type="text"
                        placeholder="What's the chat's name?"
                        onChange={handleGroupOnChange}
                        style={{marginBottom: 6}}
                    />
                </Modal>
            </div>
        </>
    );
}