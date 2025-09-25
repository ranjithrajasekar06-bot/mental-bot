export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  emotion?: string;
  supportType?: 'informational' | 'emotional' | 'crisis';
}

export interface UserProfile {
  name?: string;
  preferredName?: string;
  conversationHistory: Message[];
  emotionalState?: string;
  lastActive: Date;
}

export interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
  context: string[];
  supportType?: 'informational' | 'emotional' | 'crisis';
  followUpQuestions?: string[];
}

export interface EmotionalContext {
  currentEmotion?: string;
  intensity: number;
  triggers?: string[];
  copingStrategies?: string[];
}