import './ConversationCard.scss'
interface Props {
    conversationName: string;
    conversationId: string;
    onClick?: () => void;
}
export default function ConversationCard(props: Props){
    const {
        conversationName,
        conversationId,
        onClick,
    } = props;
    return (
        <div className="conversation-card" onClick={onClick}>
            <div className="conversation-card__image">
                <div
                    style={{
                        backgroundSize: "cover",
                    }}
                >
                </div>
            </div>
            <div className="conversation-card__name">{conversationName}</div>
        </div>
    );
}