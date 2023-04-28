import {Button, Menu, Tabs} from "antd";
import { Form, FormGroup, Dropdown } from "react-bootstrap";
import './MenuContent.scss'
import ConversationsTab from './ConversationsTab'
import {useState} from "react";
import {getUsername} from "../../Auth";
import {useNavigate} from "react-router-dom";
import ContactsTab from "./ContactsTab";
import {MoreOutlined} from "@ant-design/icons";
import Icon from "antd/es/icon";
import {getRequest, postRequest} from "../../constants";

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
        handleUpdateList,
        errorMessage,
        // handleDeleteAccount,
        // handleRemoveContact,
        handleAddContact,
        // handleRemoveChat,
        // handleUpdateContact,
    } = props;

    const [loading, setLoading] = useState(false);
    const [toFetchContacts, setToFetchContacts] = useState(false);
    const items = [
        { label: 'Conversations', key: '1', children:
                <ConversationsTab
                updateUserList={updateUserList}
                conversations={conversations}
                // handleRemoveChat={handleRemoveChat}
                handleSelectChat={handleSelectChat}
                /> }, // remember to pass the key prop
        { label: 'Contacts', key: '2', children:
                <ContactsTab
                contacts={contacts}
                errorMessage={errorMessage}
                handleUpdateList={handleUpdateList}
                setToFetchContacts={setToFetchContacts}
                toFetchContacts={toFetchContacts}
                // handleRemoveContact={handleRemoveContact}
                handleAddContact={handleAddContact}
                // handleUpdateContact={handleUpdateContact}
                /> },
    ];

    let navigate = useNavigate();
    // const menu = (
    //     <Menu>
    //         <Menu.Item>
    //             <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    //             {/*key="1" onClick={() => navigate('/')}>*/}
    //             Sign out
    //         </Menu.Item>
    //     </Menu>
    // );
    function deleteAccount(){
        postRequest('/delete_account')
        navigate('/');
    }
    return(
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
                <div className={"key"} style={{ display: "flex", alignItems: "center" }}>
                    <Button
                        // onClick={}
                        shape="circle"
                        style={{
                            height: "40px",
                            width: "40px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                    </Button>
                    <span style={{ marginLeft: "12px", fontWeight: 500 }}>
                {getUsername()}
              </span>
                </div>
                <Form>
                    <FormGroup controlId="selection">

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Menu
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item key="1" onClick={() => navigate('/')}>Logout</Dropdown.Item>
                                <Dropdown.Item key="2" onClick={() => deleteAccount()}>Delete account</Dropdown.Item>
                                {/*<Dropdown.Item>xyz</Dropdown.Item>*/}
                            </Dropdown.Menu>
                        </Dropdown>
                    </FormGroup>
                </Form>
            </header>
            <div className="tabs-container">
                {/*Chats*/}
                <Tabs items={items} />;
            </div>
        </div>
    )}
            </>);
}