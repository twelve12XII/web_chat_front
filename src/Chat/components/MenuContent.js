import {Button, Modal, Tabs} from "antd";
import {Dropdown} from "react-bootstrap";
import './MenuContent.scss'
import ConversationsTab from './ConversationsTab'
import {useState} from "react";
import {getUsername, setAuthHeader} from "../../Auth";
import {useNavigate} from "react-router-dom";
import ContactsTab from "./ContactsTab";
import "../interfaces/DropDownButton.scss"
import "../interfaces/image.scss"
import {postRequest} from "../../constants";
import UploadProfileImage from "./UploadProfileImage";

interface Props {
    conversations: any;
    handleSelectChat: (chat: any) => void;
    updateUserList: () => void;
}

export default function MenuContent(props: Props) {
    const {
        conversations,
        handleSelectChat,
        updateUserList,
        contacts,
        handleUpdateList
    } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModalHide = () => {
        setIsModalVisible(false);
    };

    const handleModalShow = () => {
        setIsModalVisible(true);
    };
    const [loading, setLoading] = useState(false);
    const [changingProfileImage, setChangingProfileImage] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [toFetchContacts, setToFetchContacts] = useState(false);
    const items = [
        {
            label: 'Conversations', key: '1', children:
                <ConversationsTab
                    updateUserList={updateUserList}
                    contacts={contacts}
                    conversations={conversations}
                    handleSelectChat={handleSelectChat}
                />
        }, // remember to pass the key prop
        {
            label: 'Contacts', key: '2', children:
                <ContactsTab
                    contacts={contacts}
                    handleUpdateList={handleUpdateList}
                    setToFetchContacts={setToFetchContacts}
                    toFetchContacts={toFetchContacts}
                    // handleUpdateContact={handleUpdateContact}
                />
        },
    ];

    let navigate = useNavigate();

    function deleteAccount() {
        postRequest('/delete_account').then(navigate("/"));
    }
    const handleChangeProfileImage = () => {
        setChangingProfileImage(!changingProfileImage);
    };
    const handleUpdateProfileImage = (updatedImage: string) => {
        setProfileImage(updatedImage);
    };

    // const handleRemoveProfileImage = () => {
    //     setProfileImage(null);
    //     removeProfileImage();
    // };

    return (
        <>
            {loading ? (
                <Button
                    loading
                    shape="circle"
                    style={{
                        position: "absolute",
                        left: "45%",
                        top: "20%",
                    }}
                />
            ) : (
                <div className="app-container__menu__content">
                    <header className={"header"}>
                        <div className={"key"} style={{display: "flex", alignItems: "center"}}>
                            <Button
                                // onClick={iconMenu}
                                shape="circle"
                                style={{
                                    height: "40px",
                                    width: "40px",
                                    backgroundImage: `url(${profileImage})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                            </Button>
                            <span style={{marginLeft: "12px", fontWeight: 500}}>
                {getUsername()}
              </span>
                        </div>
                        <Dropdown className="dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropbtn">
                                Menu
                            </Dropdown.Toggle>
                            <Dropdown.Menu id="myDropdown" className="dropdown-content">
                                <Dropdown.Item key="1" onClick={() => {navigate('/'); window.location.reload()} }>Logout</Dropdown.Item>
                                <Dropdown.Item key="2" onClick={() => handleModalShow()}>Delete
                                    account</Dropdown.Item>
                                {/*<Dropdown.Item key="3" onClick={handleChangeProfileImage}>Change profile image</Dropdown.Item>*/}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Modal
                            title="Your account will be deleted"
                            open={isModalVisible}
                            onCancel={handleModalHide}
                            onOk={deleteAccount}
                            okText="Delete account"
                        >
                        </Modal>
                    </header>
                    <div className="tabs-container">
                        {/*Chats*/}
                        <Tabs items={items}/>;
                    </div>
                </div>
            )}
            <UploadProfileImage
                isVisible={changingProfileImage}
                handleChangeProfileImage={handleChangeProfileImage}
                handleUpdateProfileImage={handleUpdateProfileImage}
            />
        </>);
}