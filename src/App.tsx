import { ChatContextProvider } from "./context/AIChatContext";
import { ChatWindow } from "./components/ChatWindow";
import "./app.scss";

function App() {
	return (
		<ChatContextProvider>
			<ChatWindow />
		</ChatContextProvider>
	);
}

export default App;
