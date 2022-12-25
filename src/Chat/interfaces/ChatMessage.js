import {useEffect, useState} from "react";
import "./ChatMessage.scss"

interface Props {
    text: string;
    createdBy: string;
    createdAt?: any;
    // contacts?: any;
    // user: any;
    // userId: any;
    // senderId: any
}

export default function ChatMessage(props: Props) {
    const [senderName, setSenderName] = useState("");
    const { senderId, text, createdBy, createdAt, user, userId } = props;

    useEffect(() => {
        // const contact = contacts.find((elem: any) => elem.uid === createdBy);

        // if (contact) {
        //     setSenderName(contact.contactName);
        // } else if (createdBy !== userId) {
            setSenderName(createdBy);
        // } else {
        //     setSenderName(user.displayName);
        // }
    }, );

    return (
        <>
            {createdAt && (
                <div className="message">
                    <div className="message__content">
                        <div className="message__content__sender">{senderName}</div>
                        <div className="message__content__text">{text}</div>
                        <p className="message__content__at">
                            {createdAt && toDateTime(createdAt.seconds)}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

function toDateTime(secs: number) {
    const t = new Date(0); // Epoch
    t.setUTCSeconds(secs);
    const hours = t.getHours();
    const minutes = t.getMinutes();

    return (
        <span>
      {hours > 9 ? hours : <>0{hours}</>}:
            {minutes > 9 ? minutes : <>0{minutes}</>}
    </span>
    );
}