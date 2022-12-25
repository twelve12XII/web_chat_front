import { Button, Tabs, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import './MenuContent.scss'
import ConversationsTab from './ConversationsTab'
import {useState} from "react";

interface Props {
    currentUserId: any;
    user: any;
    conversations: any;
    handleSelectChat: (chat: any) => void;
}

export default function MenuContent(props: Props) {
    const {
        currentUserId,
        user,
        conversations,
        handleSelectChat,
    } = props;

    const [loading, setLoading] = useState(false);

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => window.location.assign('http://localhost:3000/')}>
                Sign out
            </Menu.Item>
        </Menu>
    );
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
            <header>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button
                        onClick={() => console.log(user)}
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
                {user}
              </span>
                </div>

                {/*<Dropdown.Button*/}
                {/*    // menu={menu}*/}
                {/*    // icon={<MoreOutlined style={{ fontSize: "1.65rem" }} />}*/}
                {/*/>*/}
            </header>
            <div className="tabs-container">
                Chats
                {/*<Tabs defaultActiveKey="1" centered>*/}
                {/*    <Tabs.TabPane tab="Conversations" key="1">*/}
                        <ConversationsTab
                            currentUserId={currentUserId}
                            conversations={conversations}
                            handleSelectChat={handleSelectChat}
                        />
                    {/*</Tabs.TabPane>*/}
                    {/*<Tabs.TabPane tab="Contacts" key="2">fhuewhfu*/}
                    {/*    <ContactsTab*/}
                    {/*        user={user}*/}
                    {/*        contacts={contacts}*/}
                    {/*        setToFetchContacts={setToFetchContacts}*/}
                    {/*        toFetchContacts={toFetchContacts}*/}
                    {/*        handleRemoveContact={handleRemoveContact}*/}
                    {/*        handleAddContact={handleAddContact}*/}
                    {/*        handleUpdateContact={handleUpdateContact}*/}
                    {/*    />*/}
                    {/*</Tabs.TabPane>*/}
                {/*</Tabs>*/}
            </div>
        </div>
    )}
            </>);
}