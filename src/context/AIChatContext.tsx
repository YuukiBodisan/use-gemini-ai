import { createContext, useReducer, type FC, type PropsWithChildren, type Dispatch, useEffect } from "react";
import { ChatActionTypes, type ChatAction, type ChatState, type MessagePart } from "../types/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";

const API_KEY = "AIzaSyCzGZKLx0eG0JI2PMdpW2RbvXPF2_5BnnU";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

type ChatContextType = {
	state: ChatState;
	dispatch?: Dispatch<ChatAction>;
	sendMessage?: (text: string) => Promise<void>;
	clearChatHistory?: () => void;
};

const defaultState: ChatState = {
	conversation: [],
	loading: false,
};

export const ChatContext = createContext<ChatContextType>({ state: defaultState });

const reducer = (state: ChatState, action: ChatAction) => {
	switch (action.type) {
		case ChatActionTypes.sendUserMessage:
			return {
				...state,
				conversation: [...state.conversation, action.payload as MessagePart],
			};

		case ChatActionTypes.receiveAIMessage:
			return {
				...state,
				conversation: [...state.conversation, action.payload as MessagePart],
			};

		case ChatActionTypes.removeLastMessage:
			return {
				...state,
				conversation: state.conversation.slice(0, -1),
			};

		case ChatActionTypes.setLoading:
			return {
				...state,
				loading: action.payload as boolean,
			};

		case ChatActionTypes.clearConversation:
			return {
				...state,
				conversation: [],
			};

		default:
			return state;
	}
};

export const ChatContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [storedConversation, setStoredConversation, clearStoredConversation] = useLocalStorage<MessagePart[]>(
		"chat_history",
		true
	);

	const [state, dispatch] = useReducer(reducer, {
		...defaultState,
		conversation: storedConversation || [],
	});

	useEffect(() => {
		setStoredConversation(state.conversation);
	}, [setStoredConversation, state.conversation]);

	const sendMessage = async (text: string) => {
		const userPart: MessagePart = { parts: [{ text }], role: "user" };
		dispatch({ type: ChatActionTypes.sendUserMessage, payload: userPart });
		dispatch({ type: ChatActionTypes.setLoading, payload: true });

		try {
			const response = await axios.post(API_URL, {
				contents: [...state.conversation, userPart],
			});

			console.log(response, "response");

			const aiPart: MessagePart = response.data.candidates[0].content;

			console.log(aiPart, "data we need");

			dispatch({ type: ChatActionTypes.receiveAIMessage, payload: aiPart });
		} catch (err) {
			dispatch({ type: ChatActionTypes.removeLastMessage, payload: null });
			throw new Error(`Error while communicating with AI, ${err}`);
		} finally {
			dispatch({ type: ChatActionTypes.setLoading, payload: false });
		}
	};

	const clearChatHistory = () => {
		dispatch({ type: ChatActionTypes.clearConversation, payload: null });
		clearStoredConversation();
	};

	return (
		<ChatContext.Provider value={{ state, dispatch, sendMessage, clearChatHistory }}>{children}</ChatContext.Provider>
	);
};
