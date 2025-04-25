# 🧠 AI Character Chat App (Frontend)

A fun, interactive chat interface built with **React** and **Vite**, allowing users to:

- Talk to AI-powered characters like Tony Stark or Cleopatra
- Choose different AI models (GPT-3.5, GPT-4, Claude, etc.) via OpenRouter
- Listen to responses with voice output (TTS)
- See which models are free
- Save chat history locally

---

## 🚀 Features

- 🧙‍♂️ **Chat with AI Characters** – Select from a growing list of fictional or historical personas
- 🧠 **Model Selector** – Choose from GPT, Claude, Mistral, and more through OpenRouter
- 🟢 **Free Model Flags** – Instantly see which models cost $0
- 🖼️ **Model Logos** – Logos next to model names for a cleaner UX
- 🔊 **TTS Output** – Read AI replies aloud with voice selection
- 💾 **Chat History** – Automatically stored in `localStorage` for persistent sessions

---

## 🧱 Tech Stack

- **React + Vite** – For a lightning-fast frontend
- **OpenRouter API** – To connect to various LLMs
- **Web Speech API** – For text-to-speech support
- **TailwindCSS** – Clean and modern UI
- **LocalStorage** – To persist chat history

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── ChatWindow.jsx        # Chat interface and layout
│   ├── ModelSelector.jsx     # Dropdown for choosing LLM
│   ├── VoiceSelector.jsx     # Dropdown for TTS voices
│   ├── MessageBubble.jsx     # Styles user and AI messages
├── lib/
│   └── openai.js             # Handles fetch requests to OpenRouter API
├── utils/
│   └── localStorage.js       # Save/load chat history
├── App.jsx                   # Main component
└── main.jsx                  # App entry point
```

---

## 🔧 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-character-chat.git
cd ai-character-chat
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_key_here
```

> ✅ You can use many models for free — no credit card needed for OpenRouter.

### 4. Run the app

```bash
npm run dev
```

---

## 💡 Ideas for Future Features

- 🔐 User login + backend storage
- 🎭 Custom character creator
- 📤 Share or export conversations
- 🎨 Light/Dark themes
- 🧩 Plugin or tool integrations (memory, file access, etc.)

---

## 🙌 Credits

- [OpenRouter.ai](https://openrouter.ai/)
- [OpenAI](https://openai.com/)
- [Claude by Anthropic](https://www.anthropic.com/)
- [Vite](https://vitejs.dev/)

---

## 📜 License

MIT — free to use, adapt, and remix.
