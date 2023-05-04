import React, { useState } from "react";
import { Modal, Input } from "antd";
import {postRequest} from "../../constants";

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

    const { isModalVisible, setIsModalVisible, handleUpdateList } = props;

    const handleModalHide = () => {
        setIsModalVisible(false);
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

    const handleCreateContact = async () => {
        if (contactDetails.contactName) {
            setLoading(true);
            postRequest('/add_contact', {
                "userName": contactDetails.contactName
            })
                .then(
                    response => {
                        response.json().then(res => {
                            if (response.ok) {
                                setLoading(false);
                                setIsModalVisible(false);
                                setContactDetails(initialContactState)
                                console.log(res)
                            } else {
                                setError(res.message);
                                setLoading(false);
                                // console.log(res.message);
                            }
                        })
                    }).then(handleUpdateList)
        }
        else {
            setError("All input fields must be filled");
        }
    };
    // function addContact () {
    //     handleModalShow();
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
                {/*<select id={"search"} name="search" className={"box"}></select>*/}
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
