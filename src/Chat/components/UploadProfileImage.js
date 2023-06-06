import React, {useState} from "react";
// import { storage } from "../../firebase";
// import { updateProfileImage } from "../../firebase/users";
import {Modal, Input, Button} from "antd";
import {postRequest, postRequestWithFile} from "../../constants";

interface Props {
    isVisible: boolean;
    handleChangeProfileImage: any;
    handleUpdateProfileImage: any;
}

export default function UploadProfileImage(props: Props) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        isVisible,
        handleChangeProfileImage,
        handleUpdateProfileImage,
    } = props;

    function handleChange(e: any) {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    function handleUpload() {
        setLoading(true);
        postRequestWithFile("/avatars/upload", file, true).then(
            response => {
                if (response.ok) {
                    response.json().then(res => {
                        setFile(null);
                        setLoading(false);
                        setPreview(null);
                        // updateProfileImage(`/images/${uniqueName}`);
                        handleChangeProfileImage();
                        console.log(res)
                        // handleUpdateProfileImage(url);
                    })
                } else {
                    console.log("exception" + response.status);
                }
            })
    }

    return (
        <>
            <Modal
                title="Upload a new profile image"
                open={isVisible}
                onCancel={handleChangeProfileImage}
                onOk={(e) => handleUpload()}
                okButtonProps={{disabled: !file}}
                confirmLoading={loading}
                okText="Update"
            >
                <Button
                    // onClick={iconMenu}
                    // shape="square"
                    style={{
                        height: "auto",
                        width: "auto",
                        // backgroundImage: `url(${profileImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}>
                    Delete profile image
                </Button>
                <Input
                    type="file"
                    onChange={handleChange}
                    style={{marginBottom: 16}}
                />
                <img
                    src={preview}
                    alt=""
                    style={{width: "256px", margin: "0 auto"}}
                />
            </Modal>
        </>
    );
}
