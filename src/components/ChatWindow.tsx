import { useContext, useState } from "react";
import { ChatContext } from "../context/AIChatContext";
import { MessageList } from "./MessageList";
import { Header } from "./Header";
import TextareaAutosize from "react-textarea-autosize";
import { HiArrowNarrowUp } from "react-icons/hi";
import { Dictaphone } from "./VoiceSpeechRecognite";
import { AILogoSpinner } from "./AILogoSpinner";

export const ChatWindow = () => {
	const { state, sendMessage } = useContext(ChatContext);
	const [input, setInput] = useState("");

	const handleSend = async () => {
		if (!input.trim()) {
			alert("Please enter your message!");
			return;
		}
		if (!sendMessage) return;

		try {
			setInput("");
			await sendMessage(input);
		} catch (err) {
			throw new Error(`Failed to send message: ${err}`);
		}
	};

	return (
		<div className='chat-window'>
			<Header />

			{state.conversation.length === 0 ? (
				<div className='first-render-message'>
					<h2 className='first-render-message-title'>Welcome to Gemini AI!</h2>
					<p className='first-render-message-text'>How can I help you?...</p>
					<p>
						<AILogoSpinner size={64} color='white' />
					</p>
				</div>
			) : (
				<MessageList />
			)}

			<div className='chat-input-inner'>
				<div className='chat-input-block'>
					<TextareaAutosize
						minRows={1}
						maxRows={10}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								handleSend();
							}
						}}
						rows={1}
						className='chat-input'
						placeholder='Type your message...'
					/>
					<div className='chat-input-btn-block'>
						<Dictaphone onTranscript={(text) => setInput((prev) => prev + text)} />
						<button
							onClick={handleSend}
							disabled={state.loading}
							className={`submit-btn ${!input.trim() ? "disable-submit-btn" : "hover-submit-btn"}`}
						>
							<HiArrowNarrowUp size={20} color='white' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
