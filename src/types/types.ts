export type Role = "user" | "model";

export type MessagePart = {
	parts: { text: string }[];
	role: Role;
};

export type ChatState = {
	conversation: MessagePart[];
	loading: boolean;
};

export type ChatAction<T = unknown> = {
	type: string;
	payload: T;
};

// @ts-expect-error Dev-only impact
export const enum ChatActionTypes {
	sendUserMessage = "SEND_USER_MESSAGE",
	receiveAIMessage = "RECEIVE_AI_MESSAGE",
	setLoading = "SET_LOADING",
	removeLastMessage = "REMOVE_LAST_MESSAGE",
	clearConversation = "CLEAN_CHAT_HISTORY",
}
