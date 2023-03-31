import React, { useState } from "react";
import { Modal, Input } from "antd";

interface Props {
    contactName: string;
    isVisible: boolean;
    handleEditingContact: any;
    // handleUpdateContact: any;
}

export default function EditContact(props: Props) {
    const [newContactName, setNewContactName] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        isVisible,
        handleEditingContact,
        contactName,
        // handleUpdateContact,
    } = props;

    // const handleUpdateContactSubmit = () => {
    //     setLoading(true);
    //     handleUpdateContact(newContactName)
    //         .then((res: any) => {
    //             setLoading(false);
    //             handleEditingContact();
    //         })
    //         .catch((err: any) => {
    //             console.log(err);
    //             setLoading(false);
    //         });
    // };

    return (
        <>
            <Modal
                title="Edit contact name"
                open={isVisible}
                onCancel={handleEditingContact}
                onOk={(e) => {
                    // handleUpdateContactSubmit();
                }}
                okButtonProps={{ disabled: newContactName.length < 1 }}
                confirmLoading={loading}
                okText="Update"
            >
                <Input
                    type="text"
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder={contactName}
                />
            </Modal>
        </>
    );
}
