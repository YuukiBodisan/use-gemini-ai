import { useContext } from "react";
import { ChatContext } from "../context/AIChatContext";
import { IoTrashSharp } from "react-icons/io5";
import { useTheme } from "../hooks/useTheme";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

export const Header = () => {
	const { state, clearChatHistory } = useContext(ChatContext);
	const { theme, toggleTheme } = useTheme();

	return (
		<div className='header'>
			<h1 className='header-title'>Gemini ChatAI</h1>
			<div className='header-block-utils'>
				<button className='change-theme-btn' onClick={toggleTheme}>
					{theme === "dark" ? <FaSun size={25} color='white' /> : <FaMoon size={25} />}
				</button>
				<button
					onClick={() => clearChatHistory && clearChatHistory()}
					disabled={state.loading}
					className='clear-chat-btn'
				>
					<IoTrashSharp size={35} color='white' />
				</button>
			</div>
		</div>
	);
};
