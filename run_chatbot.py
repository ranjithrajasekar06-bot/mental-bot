import json
import random
import nltk
from nltk.stem import WordNetLemmatizer
import string
import os
import re
import time
import colorama
from colorama import Fore, Style

# Initialize colorama
colorama.init()

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')

# Initialize lemmatizer
lemmatizer = WordNetLemmatizer()

# Get the absolute path to the dataset
script_dir = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(script_dir, 'Dataset', 'mentalhealth.json')

# Load the mental health dataset
with open(dataset_path, 'r') as file:
    intents = json.load(file)['intents']

# Add emotional support intents
emotional_support_intents = [
    {
        "tag": "feeling_sad",
        "patterns": ["I feel sad", "I'm feeling down", "I am depressed", "feeling blue", "I feel hopeless", "I'm not happy", "I'm unhappy", "I'm feeling low"],
        "responses": [
            "I'm sorry to hear you're feeling sad. Remember that it's okay to feel this way sometimes, and your feelings are valid.",
            "It sounds like you're going through a difficult time. Would you like to talk more about what's making you feel this way?",
            "I hear that you're feeling down. Sometimes sharing your feelings can help. Is there someone you trust who you could talk to?",
            "When we feel sad, it can be helpful to practice self-care. Could you do something kind for yourself today?"
        ]
    },
    {
        "tag": "feeling_anxious",
        "patterns": ["I'm anxious", "I feel nervous", "I'm worried", "I have anxiety", "I'm stressed", "I'm panicking", "I can't stop worrying", "I'm overthinking"],
        "responses": [
            "I understand anxiety can be overwhelming. Try taking a few deep breaths - breathe in for 4 counts, hold for 2, and exhale for 6.",
            "Anxiety is a natural response, but it can be difficult to manage. Would it help to talk about what's causing your anxiety?",
            "When you're feeling anxious, grounding exercises can help. Try naming 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
            "It's okay to feel anxious. Remember that this feeling will pass, and you have gotten through difficult moments before."
        ]
    },
    {
        "tag": "feeling_angry",
        "patterns": ["I'm angry", "I feel mad", "I'm frustrated", "I'm irritated", "I'm furious", "I'm annoyed", "I'm upset", "I'm enraged"],
        "responses": [
            "It's natural to feel angry sometimes. Taking a moment to pause before reacting can be helpful.",
            "I understand you're feeling frustrated. Would it help to talk about what triggered these feelings?",
            "When we're angry, our bodies can feel tense. Try relaxing your shoulders and taking a few deep breaths.",
            "Your feelings are valid. Sometimes writing down why you're angry can help process these emotions."
        ]
    },
    {
        "tag": "feeling_lonely",
        "patterns": ["I'm lonely", "I feel alone", "I have no friends", "nobody understands me", "I'm isolated", "I have no one to talk to", "I feel disconnected"],
        "responses": [
            "Feeling lonely can be really difficult. Remember that many people feel this way sometimes, even when surrounded by others.",
            "I'm here to listen. Would you like to talk more about why you're feeling lonely?",
            "Connecting with others, even in small ways, can help with loneliness. Is there someone you could reach out to today?",
            "You're not alone in feeling lonely. Many people are looking for connection too. Would joining a group or community with similar interests help?"
        ]
    },
    {
        "tag": "need_help",
        "patterns": ["I need help", "help me", "I don't know what to do", "I'm lost", "I need guidance", "I need advice", "I need support"],
        "responses": [
            "I'm here to support you. Can you tell me more about what you need help with?",
            "You're taking a positive step by asking for help. Let's think about this together.",
            "It takes courage to ask for help. Would you like to talk about some specific strategies that might help your situation?",
            "I'm listening and I care about helping you. Let's break down what you're facing into smaller, more manageable parts."
        ]
    },
    {
        "tag": "feeling_better",
        "patterns": ["I feel better", "that helps", "I'm feeling good", "I'm okay now", "that made me feel better", "thanks for listening", "that was helpful"],
        "responses": [
            "I'm glad to hear you're feeling better. Remember that your well-being is important.",
            "That's wonderful to hear. Remember that you have the strength to work through difficult feelings.",
            "I'm happy I could help in some way. Remember that you deserve support and care.",
            "That's great! Remember that it's okay to have ups and downs, and to ask for help when you need it."
        ]
    },
    {
        "tag": "gratitude",
        "patterns": ["thank you", "thanks", "I appreciate it", "that's helpful", "you're helpful", "I'm grateful"],
        "responses": [
            "You're welcome! I'm here to support you whenever you need to talk.",
            "I'm glad I could help. Remember that you're not alone in this journey.",
            "It's my pleasure to be here for you. Your mental health matters.",
            "Anytime! Taking care of your mental health is important, and I'm here to help with that."
        ]
    },
    {
        "tag": "greeting",
        "patterns": ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "what's up"],
        "responses": [
            "Hello! How are you feeling today?",
            "Hi there! I'm here to support you. How can I help?",
            "Hello! How are you doing? I'm here to listen and help.",
            "Hi! How are you feeling? I'm here to chat about mental health and provide support."
        ]
    },
    {
        "tag": "how_are_you",
        "patterns": ["how are you", "how are you doing", "how are you feeling", "are you okay", "are you well"],
        "responses": [
            "Thanks for asking! I'm here and ready to support you. How are you feeling today?",
            "I'm here and focused on helping you. What's on your mind today?",
            "I'm doing well and I'm here to listen and support you. How are you feeling?",
            "I appreciate your concern! I'm here to help you with whatever you need. How are you doing?"
        ]
    }
]

# Add emotional support intents to the existing intents
intents.extend(emotional_support_intents)

# Process user input
def preprocess_text(text):
    # Tokenize and lemmatize
    tokens = nltk.word_tokenize(text.lower())
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in string.punctuation]
    return tokens

# Find matching intent
def get_response(user_input, user_name, conversation_history):
    processed_input = preprocess_text(user_input)
    
    # Check for emotional keywords first
    emotional_keywords = {
        "sad": "feeling_sad",
        "depressed": "feeling_sad",
        "unhappy": "feeling_sad",
        "down": "feeling_sad",
        "anxious": "feeling_anxious",
        "nervous": "feeling_anxious",
        "worried": "feeling_anxious",
        "stress": "feeling_anxious",
        "angry": "feeling_angry",
        "mad": "feeling_angry",
        "frustrated": "feeling_angry",
        "lonely": "feeling_lonely",
        "alone": "feeling_lonely",
        "isolated": "feeling_lonely"
    }
    
    # Check if any emotional keywords are in the input
    for word in processed_input:
        if word in emotional_keywords:
            # Find the matching emotional intent
            emotion_tag = emotional_keywords[word]
            for intent in intents:
                if intent["tag"] == emotion_tag:
                    response = random.choice(intent["responses"])
                    # Add personalization
                    if user_name:
                        response = response.replace("you're", f"{user_name}, you're")
                        if not any(name in response for name in [user_name, "you"]):
                            response = f"{user_name}, {response[0].lower() + response[1:]}"
                    return response
    
    # Find the best matching intent
    best_match = None
    highest_score = 0
    
    for intent in intents:
        score = 0
        for pattern in intent['patterns']:
            pattern_tokens = preprocess_text(pattern)
            # Count matching words
            for word in processed_input:
                if word in pattern_tokens:
                    score += 1
        
        # Normalize score by pattern length
        if len(processed_input) > 0:
            score = score / len(processed_input)
            
        if score > highest_score:
            highest_score = score
            best_match = intent
    
    # Return a random response from the matched intent
    if best_match and highest_score > 0.2:  # Threshold to avoid false matches
        response = random.choice(best_match['responses'])
        
        # Add personalization if user_name is provided
        if user_name and random.random() < 0.3:  # 30% chance to personalize
            if not any(name in response for name in [user_name, "you"]):
                response = f"{user_name}, {response[0].lower() + response[1:]}"
        
        # Add follow-up questions based on the intent
        if best_match['tag'] in ["definition", "affects_whom", "what_causes"] and random.random() < 0.5:
            follow_ups = [
                "Would you like to know more about this topic?",
                "Is there anything specific about this that concerns you?",
                "How does this information make you feel?",
                "Do you have any other questions about this?"
            ]
            response += " " + random.choice(follow_ups)
            
        return response
    else:
        # Check if it might be a personal sharing
        personal_sharing_patterns = ["i feel", "i am", "i'm", "i've been", "i have been"]
        for pattern in personal_sharing_patterns:
            if pattern in user_input.lower():
                empathetic_responses = [
                    f"Thank you for sharing that with me{', ' + user_name if user_name else ''}. I'm here to listen.",
                    f"I appreciate you opening up{' to me, ' + user_name if user_name else ''}. Would you like to talk more about it?",
                    f"That sounds challenging{', ' + user_name if user_name else ''}. How long have you been feeling this way?",
                    f"I'm here for you{', ' + user_name if user_name else ''}. Would it help to talk more about what you're experiencing?"
                ]
                return random.choice(empathetic_responses)
                
        return f"I'm sorry{', ' + user_name if user_name else ''}, I don't quite understand. Could you rephrase your question about mental health?"

# Typing effect for more natural conversation
def print_with_typing_effect(text, delay=0.03):
    for char in text:
        print(char, end='', flush=True)
        time.sleep(delay)
    print()

# Main chat loop
def chat():
    print(Fore.CYAN + Style.BRIGHT + "=" * 60 + Style.RESET_ALL)
    print(Fore.GREEN + Style.BRIGHT + "Welcome to the Mental Health Support Chatbot" + Style.RESET_ALL)
    print(Fore.CYAN + "I'm here to provide information and emotional support." + Style.RESET_ALL)
    print(Fore.CYAN + "You can share how you're feeling, ask questions about mental health," + Style.RESET_ALL)
    print(Fore.CYAN + "or just chat if you need someone to talk to." + Style.RESET_ALL)
    print(Fore.YELLOW + "Type 'quit' to exit" + Style.RESET_ALL)
    print(Fore.CYAN + Style.BRIGHT + "=" * 60 + Style.RESET_ALL)
    
    # Get user's name for personalization
    print(Fore.CYAN + "To make our conversation more personal, may I know your name?" + Style.RESET_ALL)
    user_name = input(Fore.GREEN + "Your name (or press Enter to skip): " + Style.RESET_ALL).strip()
    
    if user_name:
        print_with_typing_effect(Fore.CYAN + f"Nice to meet you, {user_name}! How are you feeling today?" + Style.RESET_ALL)
    else:
        print_with_typing_effect(Fore.CYAN + "How are you feeling today?" + Style.RESET_ALL)
    
    conversation_history = []
    
    while True:
        user_input = input(Fore.GREEN + "You: " + Style.RESET_ALL)
        conversation_history.append(("user", user_input))
        
        if user_input.lower() in ['quit', 'exit', 'bye']:
            farewell = f"Take care of yourself{', ' + user_name if user_name else ''}! Remember that seeking support is a sign of strength, not weakness."
            print_with_typing_effect(Fore.CYAN + "Chatbot: " + farewell + Style.RESET_ALL)
            break
        
        response = get_response(user_input, user_name, conversation_history)
        conversation_history.append(("bot", response))
        
        # Print with typing effect for more natural conversation
        print_with_typing_effect(Fore.CYAN + "Chatbot: " + response + Style.RESET_ALL, delay=0.02)

if __name__ == "__main__":
    chat()