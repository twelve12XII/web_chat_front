import React, {useState} from "react";
import {Modal, Input, Button} from "antd";
import {postRequest} from "../../constants";
import {ArrowLeftOutlined} from "@ant-design/icons";

interface Contacts {
    contactName: string;
}

interface Props {
    contacts: Contacts[];
    isModalVisible: boolean;
    setIsModalVisible: any;
    toFetchContacts: boolean;
    setToFetchContacts: any;
}

const initialContactState = {
    contactName: "",
};

export default function CreateContact(props: Props) {
    const [contactDetails, setContactDetails] = useState(initialContactState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalVisibleSelect, setIsModalVisibleSelect] = useState(false);
    const {usersArray = [], isModalVisible, setIsModalVisible, handleUpdateList} = props;

    const handleModalHide = () => {
        setIsModalVisible(false);
        setIsModalVisibleSelect(false);
        setLoading(false);
        setContactDetails(initialContactState);
        setError("");
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setError("");
        setContactDetails((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };
    function requestAddContact(name: any){
        setLoading(true);
        postRequest('/add_contact', {
            "userName": name
        })
            .then(
                response => {
                    response.json().then(res => {
                        if (response.ok) {
                            handleModalHide()
                            console.log(res)
                        } else {
                            setError(res.message);
                            setLoading(false);
                            // console.log(res.message);
                        }
                    })
                }).then(handleUpdateList)
    }
    const handleCreateContact = async () => {
        var e = document.getElementById("search");
        if (contactDetails.contactName) {
            requestAddContact(contactDetails.contactName)
        } else if(e.options[e.selectedIndex].text) {
            requestAddContact(e.options[e.selectedIndex].text)
        } else {
            setError("All input fields must be filled");
        }
    };
    const addContact = () => {
        setIsModalVisibleSelect(true);
        setIsModalVisible(false);
        setTimeout(() => {
            const selectBox = document.getElementById("search").options;
            for (let i = selectBox.length; i !== -1; i--) {
                selectBox.remove(i);
            }
            var options = [];
            for (let i = 0; i < usersArray.length; i++) {
                options.push({
                    "text": usersArray[i].contactName,
                    "value": `${i}`,
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
            <Modal
                title="Add a new contact"
                open={isModalVisible}
                onCancel={handleModalHide}
                onOk={handleCreateContact}
                okText="Add Contact"
                confirmLoading={loading}
            >
                <Button onClick={addContact}>Select from all users</Button>
                <Input
                    type="text"
                    placeholder="What's the user name?"
                    name="contactName"
                    value={contactDetails.contactName}
                    onChange={(e) => handleOnChange(e)}
                />
                {error.length > 1 && (
                    <div style={{color: "red", fontSize: "0.75rem"}}>{error}</div>
                )}
            </Modal>
            <Modal
                title="Add a new contact"
                open={isModalVisibleSelect}
                onCancel={handleModalHide}
                onOk={handleCreateContact}
                okText="Add Contact"
                confirmLoading={loading}
                >
                <select id={"search"} name="search" className={"box"}></select>
                {error.length > 1 && (
                    <div style={{color: "red", fontSize: "0.75rem"}}>{error}</div>
                )}
            </Modal>
        </>
    );
}
