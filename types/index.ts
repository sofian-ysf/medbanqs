export interface QuestionImage {
  url: string;
  caption?: string;
  position?: 'before-question' | 'after-question' | 'in-options';
  alt: string;
  source?: string;
  license?: string;
}

export interface Question {
  id: string;
  category: string;
  conditions: string;
  correctAnswer: string;
  explanation: string;
  fileName: string;
  guideline: string;
  options: string[];
  presentation: string;
  question: string;
  images?: QuestionImage[];
}

export interface UserProgress {
  userId: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  categoryProgress: {
    [category: string]: {
      total: number;
      correct: number;
      wrong: number;
      lastAttempted?: Date;
    };
  };
  questionsAttempted: {
    [questionId: string]: {
      attemptedAt: Date;
      isCorrect: boolean;
      selectedAnswer: string;
    };
  };
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  lastLogin?: Date;
  // Stripe subscription fields
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'incomplete_expired';
  subscriptionEndDate?: Date;
  subscriptionPlan?: 'monthly_3' | 'monthly_6' | 'monthly_12';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  duration: number; // in months
  price: number; // in pence
  stripePriceId: string;
  features: string[];
}

export const QUESTION_CATEGORIES = [
  "Obstetrics and Gynaecology",
  "ENT",
  "Musculoskeletal",
  "Perioperative Medicine and Anaesthesia",
  "Acute & Emergency",
  "All Areas of Clinical Practice",
  "Cancer",
  "Cardiovascular",
  "Child Health",
  "Clinical Haematology",
  "Endocrine & Metabolic",
  "Gastrointestinal Including Liver",
  "General Practice and Primary Healthcare",
  "Infection",
  "Medicine of Older Adult",
  "Mental Health",
  "Neuroscience",
  "Ophthalmology",
  "Palliative & End of Life Care",
  "Renal & Urology",
  "Respiratory",
  "Sexual Health",
  "Surgery"
] as const;

export type QuestionCategory = typeof QUESTION_CATEGORIES[number];