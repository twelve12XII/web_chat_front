import React, { useState, useEffect } from "react";
import CreateContact from "./CreateContact";
import ContactCard from "./ContactCard";
import EditContact from "./EditContact";
import { ContactInterface } from "../interfaces/interfaces";
import { Button } from "antd";
import "./ContactsTab.scss";

interface Props {
    contacts: ContactInterface[];
    toFetchContacts: boolean;
    setToFetchContacts: any;
    // handleRemoveContact: (contactId: string) => void;
    handleAddContact: (uid: string, contactName: string) => void;
    // handleUpdateContact: any;
}

export default function ContactsTab(props: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingContact, setEditingContact] = useState(false);
    const [selectedContactName, setSelectedContactName] = useState("");

    const {
        contacts = [],
        toFetchContacts,
        setToFetchContacts,
        // handleRemoveContact,
        handleAddContact,
        handleUpdateList,
        errorMessage,
        // handleUpdateContact,
    } = props;

    const handleEditingContact = (contactName: string) => {
        setEditingContact(!editingContact);
        setSelectedContactName(contactName);
    };

    return (
        <div className="contacts-tab">
            {contacts?.length === 0 && (
                <div className="contacts-tab__welcome-card">
                    <div>
                        To start a conversation with a friend, add a contact
                        using your friends account name.
                    </div>
                </div>
            )}
            <div className="contact-list">
                {contacts?.map((contact, index) => {
                    return (
                        <ContactCard
                            key={index}
                            contact={contact}
                            // handleRemoveContact={handleRemoveContact}
                            handleEditingContact={handleEditingContact}
                        />
                    );
                })}
            </div>
            <Button onClick={() => setIsModalVisible(true)}>New contact</Button>
            <CreateContact
                handleUpdateList={handleUpdateList}
                contacts={contacts}
                errorMessage={errorMessage}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                toFetchContacts={toFetchContacts}
                setToFetchContacts={setToFetchContacts}
                handleAddContact={handleAddContact}
            />
            <EditContact
                contactName={selectedContactName}
                isVisible={editingContact}
                handleEditingContact={handleEditingContact}
                // handleUpdateContact={handleUpdateContact}
            />
        </div>
    );
}
