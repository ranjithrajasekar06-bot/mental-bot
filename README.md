# Advanced Mental Health Support Chatbot

A modern, web-based mental health support chatbot built with React, TypeScript, and advanced AI conversation capabilities. This application provides emotional support, mental health information, and crisis resources through an intuitive chat interface.

## Features

### 🧠 Advanced AI Capabilities
- **Emotional Intelligence**: Detects and responds to emotional states (sadness, anxiety, anger, loneliness)
- **Context Awareness**: Maintains conversation context for more meaningful interactions
- **Crisis Detection**: Automatically identifies crisis situations and provides immediate resources
- **Personalized Responses**: Adapts responses based on user's emotional state and conversation history

### 💬 Modern Chat Interface
- **Real-time Messaging**: Smooth, responsive chat experience with typing indicators
- **Message Categories**: Visual indicators for different types of support (emotional, informational, crisis)
- **Personalization**: Optional name collection for personalized interactions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎨 Beautiful UI/UX
- **Gradient Design**: Modern gradient backgrounds and smooth animations
- **Accessibility**: Full keyboard navigation and screen reader support
- **Micro-interactions**: Smooth animations and hover effects
- **Professional Styling**: Clean, medical-grade interface design

### 🔒 Safety & Privacy
- **Crisis Resources**: Immediate access to suicide prevention and crisis hotlines
- **Safe Space Messaging**: Clear indicators that conversations are confidential
- **Professional Boundaries**: Appropriate responses that encourage professional help when needed

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gradients
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for timestamp formatting
- **Build Tool**: Vite for fast development and building

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mental-health-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   └── ChatInterface.tsx      # Main chat component
├── data/
│   └── intents.ts            # Mental health conversation intents
├── services/
│   └── chatbotService.ts     # AI conversation logic
├── types/
│   └── chat.ts               # TypeScript type definitions
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles with Tailwind
```

## Key Features Explained

### Emotional Intelligence
The chatbot uses advanced pattern matching and keyword analysis to:
- Detect emotional states from user input
- Provide appropriate emotional support responses
- Escalate to crisis resources when needed
- Maintain emotional context throughout conversations

### Support Categories
- **Emotional Support**: Empathetic responses for feelings and emotions
- **Informational**: Facts and guidance about mental health
- **Crisis Support**: Immediate resources and professional help referrals

### Conversation Flow
1. Welcome message with optional name collection
2. Emotional state detection and appropriate response
3. Context-aware follow-up questions
4. Crisis intervention when necessary
5. Conversation insights and history tracking

## Crisis Resources Integrated

- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

## Customization

### Adding New Intents
Edit `src/data/intents.ts` to add new conversation patterns:

```typescript
{
  tag: "new_intent",
  patterns: ["user input patterns"],
  responses: ["bot responses"],
  supportType: "emotional" | "informational" | "crisis",
  followUpQuestions: ["optional follow-up questions"]
}
```

### Styling Customization
- Modify `tailwind.config.js` for theme changes
- Update gradient colors in component files
- Customize animations in `src/App.css`

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
The built files in the `dist` folder can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original Python chatbot research and development
- Mental health professionals who provided guidance on appropriate responses
- Open source community for the excellent libraries and tools

## Important Notes

⚠️ **This chatbot is for support and information only. It is not a replacement for professional mental health care. If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.**

## Support

For questions, issues, or contributions, please open an issue on GitHub or contact the development team.