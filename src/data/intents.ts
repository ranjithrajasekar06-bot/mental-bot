import { Intent } from '../types/chat';

export const mentalHealthIntents: Intent[] = [
  {
    tag: "definition",
    patterns: ["What does it mean to have a mental illness?", "What is mental health illness", "Describe mental health illness", "define mental illness", "what is mental health"],
    responses: [
      "Mental illnesses are health conditions that disrupt a person's thoughts, emotions, relationships, and daily functioning. They're medical conditions just like diabetes or heart disease.",
      "Mental health conditions affect how we think, feel, and behave. They can range from mild to severe and can impact daily life, but they are treatable.",
      "A mental illness is a condition that affects a person's thinking, feeling, behavior, or mood. These conditions deeply impact day-to-day living and may also affect the ability to relate to others."
    ],
    context: [""],
    supportType: "informational",
    followUpQuestions: [
      "Would you like to know about specific types of mental health conditions?",
      "Are you concerned about mental health for yourself or someone you know?",
      "What aspects of mental health would you like to understand better?"
    ]
  },
  {
    tag: "affects_whom",
    patterns: ["Who does mental illness affect?", "Who is affected by mental illness", "who gets mental illness", "mental illness statistics"],
    responses: [
      "Mental illness affects people of all ages, races, religions, and income levels. It's estimated that 1 in 5 adults experience mental illness in a given year.",
      "Mental health conditions don't discriminate - they can affect anyone regardless of age, gender, race, or background. You're not alone if you're struggling.",
      "Mental illness is incredibly common. Millions of people worldwide live with mental health conditions, and many lead fulfilling, productive lives with proper support."
    ],
    context: [""],
    supportType: "informational"
  },
  {
    tag: "what_causes",
    patterns: ["What causes mental illness?", "What leads to mental illness?", "how does one get mentally ill?", "causes of mental health issues"],
    responses: [
      "Mental illness can result from a combination of factors including genetics, brain chemistry, trauma, and life experiences. It's rarely caused by just one thing.",
      "The causes are complex and can include biological factors (genes, brain chemistry), psychological factors (trauma, stress), and environmental factors (family history, life circumstances).",
      "Mental health conditions often develop from multiple factors working together - there's usually no single cause, and it's never anyone's fault."
    ],
    context: [""],
    supportType: "informational"
  },
  {
    tag: "recover",
    patterns: ["Can people with mental illness recover?", "Is it possible to recover from mental illness", "can you get better", "recovery from mental illness"],
    responses: [
      "Yes! Recovery is absolutely possible. With proper treatment, support, and self-care, many people with mental illness live full, meaningful lives.",
      "Recovery looks different for everyone, but with the right combination of treatment, medication (if needed), therapy, and support, people can and do recover.",
      "Mental health recovery is a journey, not a destination. Many people learn to manage their conditions effectively and go on to achieve their goals and dreams."
    ],
    context: [""],
    supportType: "emotional",
    followUpQuestions: [
      "What does recovery mean to you?",
      "Are you currently seeking treatment or support?",
      "Would you like to know about different types of treatment options?"
    ]
  },
  {
    tag: "crisis_help",
    patterns: ["I want to hurt myself", "I'm thinking about suicide", "I want to die", "I can't go on", "I'm going to kill myself", "suicide", "self harm", "end it all"],
    responses: [
      "I'm very concerned about you. Please reach out for immediate help: National Suicide Prevention Lifeline: 988 or text HOME to 741741. You matter and there are people who want to help.",
      "Your life has value and meaning. Please contact emergency services (911) or the Crisis Text Line (text HOME to 741741) right now. You don't have to face this alone.",
      "I hear that you're in tremendous pain right now. Please reach out for immediate support: Call 988 or go to your nearest emergency room. There are people trained to help you through this."
    ],
    context: [""],
    supportType: "crisis"
  },
  {
    tag: "feeling_sad",
    patterns: ["I feel sad", "I'm feeling down", "I am depressed", "feeling blue", "I feel hopeless", "I'm not happy", "I'm unhappy", "I'm feeling low", "I'm sad"],
    responses: [
      "I hear that you're feeling sad, and I want you to know that your feelings are completely valid. Sadness is a natural human emotion, even when it feels overwhelming.",
      "It sounds like you're going through a difficult time right now. Sometimes when we're sad, it can feel like it will never end, but feelings do change and pass.",
      "I'm sorry you're experiencing sadness. Would it help to talk about what might be contributing to these feelings? Sometimes sharing can lighten the load.",
      "Sadness can be so heavy to carry. Remember that it's okay to feel this way, and it's also okay to ask for support when you need it."
    ],
    context: [""],
    supportType: "emotional",
    followUpQuestions: [
      "How long have you been feeling this way?",
      "Is there anything specific that triggered these feelings?",
      "What usually helps you when you're feeling sad?",
      "Do you have someone you trust that you can talk to?"
    ]
  },
  {
    tag: "feeling_anxious",
    patterns: ["I'm anxious", "I feel nervous", "I'm worried", "I have anxiety", "I'm stressed", "I'm panicking", "I can't stop worrying", "I'm overthinking", "anxiety attack"],
    responses: [
      "I understand that anxiety can feel overwhelming. Let's try a quick grounding technique: Take a deep breath in for 4 counts, hold for 4, then exhale for 6. You're safe right now.",
      "Anxiety is your body's way of trying to protect you, but sometimes it can feel out of control. What you're experiencing is real and valid, and there are ways to manage it.",
      "When anxiety hits, it can feel like everything is urgent and dangerous. Try the 5-4-3-2-1 technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
      "I hear that you're feeling anxious. Remember that anxiety, while uncomfortable, is temporary. You've gotten through anxious moments before, and you can get through this one too."
    ],
    context: [""],
    supportType: "emotional",
    followUpQuestions: [
      "What tends to trigger your anxiety?",
      "Have you tried any coping strategies that help?",
      "Are you experiencing physical symptoms along with the anxiety?",
      "Would you like to learn some breathing exercises?"
    ]
  },
  {
    tag: "feeling_angry",
    patterns: ["I'm angry", "I feel mad", "I'm frustrated", "I'm irritated", "I'm furious", "I'm annoyed", "I'm upset", "I'm enraged", "I'm pissed"],
    responses: [
      "I can hear the frustration in your words. Anger is a valid emotion that often signals that something important to you has been threatened or violated.",
      "It sounds like you're really angry right now. Before we talk more, take a moment to breathe deeply and relax your shoulders. Your feelings matter.",
      "Anger can be intense and sometimes overwhelming. It's okay to feel this way. What's important is how we handle these feelings in healthy ways.",
      "I understand you're feeling angry. Sometimes anger is our way of protecting ourselves when we feel hurt or threatened. What's behind this anger for you?"
    ],
    context: [""],
    supportType: "emotional",
    followUpQuestions: [
      "What happened that made you feel this way?",
      "How do you usually handle anger?",
      "Are you feeling angry at a specific person or situation?",
      "Would it help to talk through what's making you angry?"
    ]
  },
  {
    tag: "feeling_lonely",
    patterns: ["I'm lonely", "I feel alone", "I have no friends", "nobody understands me", "I'm isolated", "I have no one to talk to", "I feel disconnected", "I'm all alone"],
    responses: [
      "Loneliness is one of the most painful human experiences, and I want you to know that what you're feeling is real and valid. You're not alone in feeling lonely.",
      "I hear that you're feeling isolated and disconnected. Even when we're surrounded by people, we can still feel profoundly alone. Your feelings make complete sense.",
      "Feeling lonely doesn't mean there's something wrong with you. It's a signal that you need connection, which is a basic human need. I'm here with you right now.",
      "Loneliness can make us feel like we're the only ones who feel this way, but many people struggle with feeling disconnected. You deserve meaningful connections."
    ],
    context: [""],
    supportType: "emotional",
    followUpQuestions: [
      "When did you start feeling this way?",
      "What does connection mean to you?",
      "Are there any activities or places where you feel less lonely?",
      "Would you be interested in exploring ways to build connections?"
    ]
  },
  {
    tag: "need_help",
    patterns: ["I need help", "help me", "I don't know what to do", "I'm lost", "I need guidance", "I need advice", "I need support", "can you help me"],
    responses: [
      "I'm here to support you, and I'm glad you reached out. It takes courage to ask for help. What's going on that you'd like support with?",
      "Asking for help is actually a sign of strength, not weakness. I'm here to listen and support you however I can. What's on your mind?",
      "I want to help you. Sometimes when we're struggling, it can be hard to know where to start. Let's take this one step at a time together.",
      "You've taken an important step by reaching out. I'm here to listen and support you. What would be most helpful for you right now?"
    ],
    context: [""],
    supportType: "emotional",
    followUpQuestions: [
      "What specific area would you like help with?",
      "How are you feeling right now?",
      "What's been the most challenging part of your situation?",
      "What kind of support would feel most helpful to you?"
    ]
  },
  {
    tag: "coping_strategies",
    patterns: ["how to cope", "coping strategies", "how to deal with stress", "stress management", "how to feel better", "self care", "what can I do"],
    responses: [
      "There are many healthy coping strategies you can try: deep breathing, mindfulness, physical exercise, journaling, talking to someone you trust, or engaging in activities you enjoy.",
      "Self-care isn't selfish - it's necessary. Some effective strategies include: maintaining a routine, getting enough sleep, eating well, staying connected with others, and practicing relaxation techniques.",
      "Coping strategies work differently for different people. Some find relief in creative activities, others in physical movement, and some in quiet reflection or meditation. What resonates with you?",
      "Building a toolkit of coping strategies can be really helpful. This might include breathing exercises, grounding techniques, physical activity, creative expression, or reaching out to supportive people."
    ],
    context: [""],
    supportType: "informational",
    followUpQuestions: [
      "What coping strategies have you tried before?",
      "What activities usually make you feel better?",
      "Are you interested in learning specific techniques?",
      "What feels most manageable for you to try right now?"
    ]
  },
  {
    tag: "therapy_help",
    patterns: ["should I see a therapist", "do I need therapy", "finding a therapist", "therapy help", "counseling", "professional help"],
    responses: [
      "Therapy can be incredibly helpful for many people. A therapist can provide professional support, teach coping skills, and help you work through challenges in a safe, confidential space.",
      "If you're considering therapy, that's often a good sign that it might be helpful. Therapists are trained to help people navigate difficult emotions and life challenges.",
      "Therapy isn't just for crisis situations - many people find it helpful for personal growth, learning better coping skills, or working through life transitions.",
      "Finding the right therapist is important. Look for someone who specializes in areas relevant to your concerns and with whom you feel comfortable and understood."
    ],
    context: [""],
    supportType: "informational",
    followUpQuestions: [
      "What's making you consider therapy?",
      "Have you ever worked with a therapist before?",
      "What concerns do you have about starting therapy?",
      "Would you like help thinking about what to look for in a therapist?"
    ]
  },
  {
    tag: "feeling_better",
    patterns: ["I feel better", "that helps", "I'm feeling good", "I'm okay now", "that made me feel better", "thanks for listening", "that was helpful", "feeling better"],
    responses: [
      "I'm so glad to hear you're feeling better! Remember that healing isn't always linear - it's okay to have ups and downs. You're doing great by taking care of yourself.",
      "That's wonderful to hear! You have the strength and resilience to work through difficult feelings. Remember to be patient and kind with yourself.",
      "I'm happy that you're feeling better. Remember that you deserve to feel good, and it's okay to celebrate these moments of feeling better.",
      "It's great that you're feeling better! Remember that you have tools and strength within you to handle whatever comes your way."
    ],
    context: [""],
    supportType: "emotional"
  },
  {
    tag: "gratitude",
    patterns: ["thank you", "thanks", "I appreciate it", "that's helpful", "you're helpful", "I'm grateful", "thanks for helping"],
    responses: [
      "You're so welcome! I'm honored to be part of your support system. Remember that you're worth caring for and supporting.",
      "I'm glad I could help in some way. Your mental health and wellbeing matter, and I'm here whenever you need support.",
      "It's my pleasure to support you. Taking care of your mental health is one of the most important things you can do for yourself.",
      "You don't need to thank me - supporting you is what I'm here for. Remember that you deserve care and compassion, especially from yourself."
    ],
    context: [""],
    supportType: "emotional"
  },
  {
    tag: "greeting",
    patterns: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "what's up", "greetings"],
    responses: [
      "Hello! I'm here to provide mental health support and a listening ear. How are you feeling today?",
      "Hi there! I'm glad you're here. I'm here to support you with whatever you're going through. What's on your mind?",
      "Hello! Welcome to this safe space. I'm here to listen and support you. How can I help you today?",
      "Hi! I'm here to provide emotional support and mental health resources. How are you doing today?"
    ],
    context: [""],
    supportType: "emotional"
  },
  {
    tag: "how_are_you",
    patterns: ["how are you", "how are you doing", "how are you feeling", "are you okay", "are you well"],
    responses: [
      "Thank you for asking! I'm here and ready to support you. More importantly, how are you feeling today? I'm here to listen.",
      "I appreciate your kindness! I'm doing well and I'm focused on being here for you. What's going on in your world today?",
      "That's very thoughtful of you to ask! I'm here and ready to help. How are you taking care of yourself today?",
      "Thank you for caring! I'm here and present with you. I'd love to hear how you're doing - what's on your heart today?"
    ],
    context: [""],
    supportType: "emotional"
  }
];