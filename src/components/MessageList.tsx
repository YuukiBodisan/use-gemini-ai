import { useContext } from "react";
import { Message } from "./Message";
import { ChatContext } from "../context/AIChatContext";
import { Loader } from "./Loader";

export const MessageList = () => {
	const { state } = useContext(ChatContext);
	const { conversation, loading } = state;

	return (
		<div id='chat-content' className='chat-content'>
			{conversation.map((msg, idx) => (
				<Message key={idx} message={msg} />
			))}
			{loading && <Loader />}
		</div>
	);
};
