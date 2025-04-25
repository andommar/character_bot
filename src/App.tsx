import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchAIResponse } from "./lib/openai"; // or relative path
import { Card, CardContent } from "@/components/ui/card";
import { availableModels } from "./data/models";
import { characters } from "./data/characters";

function App() {
  const [selectedModel, setSelectedModel] = useState(availableModels[0].value);
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [messages, setMessages] = useState([]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [input, setInput] = useState("");
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    // Fetch available voices when the component mounts
    const availableVoices = speechSynthesis.getVoices();
    setVoices(availableVoices);

    // Set the first available voice by default (optional)
    if (availableVoices.length > 0) {
      setSelectedVoice(availableVoices[0]);
    }

    // Event listener to handle dynamically added voices (in case they load after the initial call)
    const handleVoicesChanged = () => {
      setVoices(speechSynthesis.getVoices());
    };

    speechSynthesis.onvoiceschanged = handleVoicesChanged;

    return () => {
      speechSynthesis.onvoiceschanged = null; // Cleanup listener when component unmounts
    };
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  const speakText = (text: string) => {
    if (!selectedVoice) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "you", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const aiResponse = await fetchAIResponse([...messages, userMessage], selectedCharacter.prompt, selectedModel);

    const aiMessage = { sender: "ai", text: aiResponse };
    setMessages((prev) => [...prev, aiMessage]);

    speakText(aiMessage.text);
  };

  const clearChatHistory = () => {
    localStorage.removeItem("chatHistory");
    setMessages([]); // Clear the messages state
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <select
        className="w-full p-2 rounded border"
        onChange={(e) => {
          const char = characters.find((c) => c.name === e.target.value);
          setSelectedCharacter(char);
          setMessages([]);
        }}
      >
        {characters.map((char) => (
          <option key={char.name}>{char.name}</option>
        ))}
      </select>
      <select
        className="w-full p-2 rounded border"
        onChange={(e) => setSelectedModel(e.target.value)}
        value={selectedModel}
      >
        {availableModels.map((model) => (
          <option key={model.value} value={model.value}>
            {model.logo} {model.name} {model.isFree ? "🟢 Free" : "💰 Paid"}
          </option>
        ))}
      </select>

      {/* Voice selection dropdown */}
      <select
        className="w-full p-2 rounded border"
        onChange={(e) => {
          const voice = voices.find((v) => v.name === e.target.value);
          setSelectedVoice(voice || voices[0]); // Default to first voice if none found
        }}
        value={selectedVoice?.name}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>

      <Card className="h-[500px] overflow-y-scroll p-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}>
            <div
              className={`rounded-xl px-4 py-2 ${
                msg.sender === "you" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </Card>

      <div className="flex gap-2">
        <Input
          placeholder={`Talk to ${selectedCharacter.name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
      {/* Clear chat history button */}
      <Button className="mt-4" onClick={clearChatHistory}>
        Clear Chat History
      </Button>
    </div>
  );
}

export default App;
