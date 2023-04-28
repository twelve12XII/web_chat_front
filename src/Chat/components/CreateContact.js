import React, { useState } from "react";
import { Modal, Input } from "antd";

interface Contacts {
    contactName: string;
}

interface Props {
    contacts: Contacts[];
    isModalVisible: boolean;
    setIsModalVisible: any;
    toFetchContacts: boolean;
    setToFetchContacts: any;
    handleAddContact: any;
}

const initialContactState = {
    contactName: "",
};

export default function CreateContact(props: Props) {
    const [contactDetails, setContactDetails] = useState(initialContactState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { errorMessage, isModalVisible, setIsModalVisible, handleAddContact } = props;

    const handleModalHide = () => {
        setIsModalVisible(false);
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

    const handleCreateContact = async () => {
        if (contactDetails.contactName) {
            setLoading(true);
            handleAddContact(contactDetails.contactName)
                .then((res: any) => {
                    if(errorMessage === 'Something went wrong') {
                        setLoading(false);
                        setIsModalVisible(false);
                        setContactDetails(initialContactState)
                    }
                    else {
                        setError(errorMessage);
                        setLoading(false);
                    }
                })
                .catch((err: any) => {
                    setLoading(false);
                });
        } else {
            setError("All input fields must be filled");
        }
    };

    return (
        <>
            <Modal
                title="Add a new contact"
                open={isModalVisible}
                onCancel={handleModalHide}
                onOk={() => handleCreateContact()}
                okText="Add Contact"
                confirmLoading={loading}
            >
                Enter contact's name:
                <Input
                    type="text"
                    name="contactName"
                    value={contactDetails.contactName}
                    onChange={(e) => handleOnChange(e)}
                />
                {error.length > 1 && (
                    <div style={{ color: "red", fontSize: "0.75rem" }}>{error}</div>
                )}
            </Modal>
        </>
    );
}
