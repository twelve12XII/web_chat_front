import {Button, Input, Modal} from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import "./ContactCard.scss";
import {postRequest} from "../../constants";
import {useState} from "react";

interface Props {
    contact: any;
    onClick?: () => void;
    handleEditingContact?: any;
}

export default function ContactCard(props: Props) {
    const { contact, onClick, handleEditingContact, handleUpdateList } = props;
    const[contactName, setContactName] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModalHide = () => {
        setIsModalVisible(false);
    };

    const handleModalShow = (name: string) => {
        console.log(name);
        setContactName(name);
        setIsModalVisible(true);
    };
    const handleDeleteContact = () => {
        postRequest("/delete_contact", {
            "contactName": contactName
        }).then(
            handleUpdateList
        )
    }

    return (
        <>
            <div className="contact-card" onClick={onClick}>
                <div className="contact-card__image">
                    <div
                        style={{
                            // backgroundImage: `url('${contact.photoURL}')`,
                            backgroundSize: "cover",
                        }}
                    >
                        {contact.photoURL ? null : contact.contactName[0]}
                    </div>
                </div>
                <div className="contact-card__name">
                    <span style={{ marginRight: "auto" }}>{contact.contactName}</span>
                    <Button
                        type="text"
                        shape="circle"
                        icon={<EditOutlined style={{ color: "#555" }} />}
                        onClick={() =>
                            handleEditingContact(contact.contactName, contact.uid)
                        }
                    />
                    <Button
                        type="text"
                        shape="circle"
                        icon={<CloseOutlined style={{ color: "#555" }} />}
                        onClick={() => handleModalShow(contact.contactName)}
                    />
                    <Modal
                        title="Contact will be deleted"
                        open={isModalVisible}
                        onCancel={handleModalHide}
                        onOk={handleDeleteContact}
                        okText="Delete contact"
                    >
                    </Modal>
                </div>
            </div>
        </>
    );
}
