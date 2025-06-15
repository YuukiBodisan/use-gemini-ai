import { type FC } from "react";
import type { MessagePart } from "../types/types";
import ReactMarkdown from "react-markdown";

type MessageProps = {
	message: MessagePart;
};

export const Message: FC<MessageProps> = ({ message }) => {
	const isUser = message.role === "user";

	return (
		<div
			className={`chat-message ${isUser ? "user-message" : "ai-message"}`}
			style={{ textAlign: isUser ? "right" : "left", marginBottom: "1rem" }}
		>
			<span style={{ fontWeight: "bold", fontSize: "28px" }}>{isUser ? "You" : "Gemini"}</span>

			<ReactMarkdown>{message.parts[0].text}</ReactMarkdown>
		</div>
	);
};
