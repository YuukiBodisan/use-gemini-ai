import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";
import { LANGUAGES } from "../data/languages";

type DictaphoneProps = {
	onTranscript: (text: string) => void;
	language?: string;
};

export const Dictaphone = ({ onTranscript }: DictaphoneProps) => {
	const [language, setLanguage] = useState("eu-US");

	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

	useEffect(() => {
		if (transcript && !listening) {
			onTranscript(transcript);
			resetTranscript();
		}
	}, [transcript, listening, onTranscript, resetTranscript]);

	if (!browserSupportsSpeechRecognition) {
		alert(`The browser does not support voice input.`);
		return null;
	}

	return (
		<div className='voice-block'>
			<select value={language} onChange={(e) => setLanguage(e.target.value)} className='lang-select'>
				{LANGUAGES.map((lang) => (
					<option key={lang.code} value={lang.code}>
						{lang.label}
					</option>
				))}
			</select>
			<button onClick={() => SpeechRecognition.startListening({ language })} className='mic-btn'>
				<FaMicrophone size={20} color='white' />
			</button>
		</div>
	);
};
