import { Message, Intent, EmotionalContext } from '../types/chat';
import { mentalHealthIntents } from '../data/intents';
import { v4 as uuidv4 } from 'uuid';

class ChatbotService {
  private intents: Intent[] = mentalHealthIntents;
  private conversationHistory: Message[] = [];
  private emotionalContext: EmotionalContext = { intensity: 0 };

  // Enhanced text preprocessing
  private preprocessText(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0);
  }

  // Detect emotional keywords and intensity
  private analyzeEmotion(text: string): { emotion?: string; intensity: number } {
    const emotionKeywords = {
      sad: ['sad', 'depressed', 'down', 'blue', 'hopeless', 'unhappy', 'miserable', 'devastated'],
      anxious: ['anxious', 'nervous', 'worried', 'stressed', 'panic', 'overwhelmed', 'scared', 'terrified'],
      angry: ['angry', 'mad', 'frustrated', 'irritated', 'furious', 'annoyed', 'pissed', 'enraged'],
      lonely: ['lonely', 'alone', 'isolated', 'disconnected', 'abandoned', 'empty'],
      hopeful: ['better', 'good', 'happy', 'hopeful', 'optimistic', 'positive', 'grateful'],
      crisis: ['suicide', 'kill myself', 'hurt myself', 'end it all', 'can\'t go on', 'want to die']
    };

    const words = this.preprocessText(text);
    let detectedEmotion: string | undefined;
    let maxIntensity = 0;

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      const matches = keywords.filter(keyword => 
        words.some(word => word.includes(keyword) || keyword.includes(word))
      );
      
      if (matches.length > 0) {
        const intensity = matches.length / keywords.length;
        if (intensity > maxIntensity) {
          maxIntensity = intensity;
          detectedEmotion = emotion;
        }
      }
    }

    return { emotion: detectedEmotion, intensity: maxIntensity };
  }

  // Enhanced intent matching with context awareness
  private findBestIntent(userInput: string): Intent | null {
    const processedInput = this.preprocessText(userInput);
    const { emotion } = this.analyzeEmotion(userInput);
    
    let bestMatch: Intent | null = null;
    let highestScore = 0;

    for (const intent of this.intents) {
      let score = 0;
      
      // Check pattern matching
      for (const pattern of intent.patterns) {
        const patternWords = this.preprocessText(pattern);
        const matchingWords = processedInput.filter(word => 
          patternWords.some(pWord => pWord.includes(word) || word.includes(pWord))
        );
        
        if (matchingWords.length > 0) {
          score += matchingWords.length / Math.max(processedInput.length, patternWords.length);
        }
      }

      // Boost score for emotional context matching
      if (emotion && intent.tag.includes(emotion)) {
        score += 0.5;
      }

      // Prioritize crisis intents
      if (intent.supportType === 'crisis' && emotion === 'crisis') {
        score += 1.0;
      }

      if (score > highestScore && score > 0.2) {
        highestScore = score;
        bestMatch = intent;
      }
    }

    return bestMatch;
  }

  // Generate personalized response
  private generateResponse(intent: Intent, userInput: string, userName?: string): string {
    const { emotion, intensity } = this.analyzeEmotion(userInput);
    let response = intent.responses[Math.floor(Math.random() * intent.responses.length)];

    // Personalize with user name
    if (userName && Math.random() < 0.3) {
      if (!response.toLowerCase().includes(userName.toLowerCase())) {
        response = `${userName}, ${response.charAt(0).toLowerCase() + response.slice(1)}`;
      }
    }

    // Add follow-up questions based on context
    if (intent.followUpQuestions && Math.random() < 0.4) {
      const followUp = intent.followUpQuestions[Math.floor(Math.random() * intent.followUpQuestions.length)];
      response += ` ${followUp}`;
    }

    // Update emotional context
    if (emotion) {
      this.emotionalContext = { currentEmotion: emotion, intensity };
    }

    return response;
  }

  // Handle crisis situations
  private handleCrisis(): string {
    const crisisResponses = [
      "🚨 I'm very concerned about you. Please reach out for immediate help:\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911\n\nYour life has value and there are people who want to help you right now.",
      "🚨 You don't have to face this alone. Please contact:\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Or go to your nearest emergency room\n\nThere are people trained to help you through this crisis.",
      "🚨 I hear that you're in tremendous pain. Please reach out immediately:\n• Call 988 (Suicide Prevention Lifeline)\n• Text HOME to 741741 (Crisis Text Line)\n• Call 911 or go to the ER\n\nYou matter, and help is available right now."
    ];
    
    return crisisResponses[Math.floor(Math.random() * crisisResponses.length)];
  }

  // Main chat processing method
  public processMessage(userInput: string, userName?: string): Message {
    const { emotion } = this.analyzeEmotion(userInput);
    
    // Handle crisis situations immediately
    if (emotion === 'crisis') {
      return {
        id: uuidv4(),
        content: this.handleCrisis(),
        sender: 'bot',
        timestamp: new Date(),
        emotion: 'crisis',
        supportType: 'crisis'
      };
    }

    const intent = this.findBestIntent(userInput);
    let response: string;

    if (intent) {
      response = this.generateResponse(intent, userInput, userName);
    } else {
      // Handle unmatched input with empathy
      const empathicResponses = [
        `I want to understand what you're going through${userName ? `, ${userName}` : ''}. Could you tell me more about how you're feeling?`,
        `Thank you for sharing that with me${userName ? `, ${userName}` : ''}. I'm here to listen and support you.`,
        `I hear that something is on your mind${userName ? `, ${userName}` : ''}. Would you like to talk more about what you're experiencing?`,
        `I'm here for you${userName ? `, ${userName}` : ''}. Sometimes it helps just to have someone listen. What's going on?`
      ];
      response = empathicResponses[Math.floor(Math.random() * empathicResponses.length)];
    }

    const botMessage: Message = {
      id: uuidv4(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
      emotion,
      supportType: intent?.supportType || 'emotional'
    };

    this.conversationHistory.push(botMessage);
    return botMessage;
  }

  // Get conversation insights
  public getConversationInsights(): {
    dominantEmotion?: string;
    supportTypesUsed: string[];
    conversationLength: number;
  } {
    const emotions = this.conversationHistory
      .map(msg => msg.emotion)
      .filter(Boolean);
    
    const supportTypes = this.conversationHistory
      .map(msg => msg.supportType)
      .filter(Boolean);

    const emotionCounts = emotions.reduce((acc, emotion) => {
      acc[emotion!] = (acc[emotion!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dominantEmotion = Object.keys(emotionCounts).reduce((a, b) => 
      emotionCounts[a] > emotionCounts[b] ? a : b, undefined
    );

    return {
      dominantEmotion,
      supportTypesUsed: [...new Set(supportTypes)] as string[],
      conversationLength: this.conversationHistory.length
    };
  }

  // Clear conversation history
  public clearHistory(): void {
    this.conversationHistory = [];
    this.emotionalContext = { intensity: 0 };
  }
}

export const chatbotService = new ChatbotService();