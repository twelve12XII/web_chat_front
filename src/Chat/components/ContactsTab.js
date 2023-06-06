import React, { useState, useEffect } from "react";
import CreateContact from "./CreateContact";
import ContactCard from "./ContactCard";
import EditContact from "./EditContact";
import { ContactInterface } from "../interfaces/interfaces";
import { Button } from "antd";
import "./ContactsTab.scss";
import {postRequest} from "../../constants";

interface Props {
    contacts: ContactInterface[];
    toFetchContacts: boolean;
    setToFetchContacts: any;
    // handleRemoveContact: (contactId: string) => void;
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
        handleUpdateList,
        // handleUpdateContact,
    } = props;

    const [allUsers, setAllUsers] = useState([]);
    const usersList = () => {
        setIsModalVisible(true);
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
    }
    // function addContact () {
    //     setIsModalVisible(true);
    //     setTimeout(() => {  const selectBox = document.getElementById("search").options;
    //         for(let i = selectBox.length; i !== -1; i--){
    //             selectBox.remove(i);
    //         }
    //         console.log(selectBox.length)
    //         var options = [];
    //         for (let i = 0; i < usersArray.length; i++){
    //             options.push({
    //                 "text"     : usersArray[i].contactName,
    //                 "value"    : `${i}`,
    //             })
    //         }
    //         options.forEach(option =>
    //             selectBox.add(
    //                 new Option(option.text, option.value, option.selected)
    //             )
    //         );
    //     }, 10);
    // }
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
                            handleEditingContact={handleEditingContact}
                            handleUpdateList={handleUpdateList}
                        />
                    );
                })}
            </div>
            <Button onClick={usersList}>New contact</Button>
            <CreateContact
                usersArray = {allUsers}
                handleUpdateList={handleUpdateList}
                contacts={contacts}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                toFetchContacts={toFetchContacts}
                setToFetchContacts={setToFetchContacts}
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
