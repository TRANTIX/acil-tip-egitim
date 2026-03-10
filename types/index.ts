export type UserRole = "admin" | "editor" | "resident";
export type UserStatus = "pending" | "approved" | "rejected";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  institution?: string;
  residency_year?: number;
  role: UserRole;
  status: UserStatus;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export type ContentStatus = "draft" | "review" | "published" | "archived";
export type ContentType = "article" | "podcast" | "video" | "atlas";
export type ActivityType =
  | "quiz"
  | "article"
  | "podcast"
  | "video"
  | "simulation"
  | "debrief"
  | "calculator"
  | "atlas";

export interface Article {
  id: string;
  title: string;
  slug: string;
  content_type: "konu_anlatimi" | "kilavuz_ozeti" | "vaka_tartismasi" | "pearl" | "makale_ozeti";
  category: string;
  difficulty: number;
  body: string;
  key_points?: string[];
  reading_time?: number;
  tags?: string[];
  status: ContentStatus;
  author_id?: string;
  reviewer_id?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Podcast {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficulty?: number;
  audio_url: string;
  duration: number;
  episode_number?: number;
  format?: "konu_anlatimi" | "vaka_tartismasi" | "soylesi" | "kilavuz" | "gunun_sorusu";
  tags?: string[];
  status: ContentStatus;
  author_id?: string;
  published_at?: string;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficulty?: number;
  video_url: string;
  duration?: number;
  video_type?: "prosedur" | "ders" | "ekg_yorum" | "usg" | "vaka_sunum" | "kisa_ipucu";
  tags?: string[];
  status: ContentStatus;
  author_id?: string;
  published_at?: string;
  created_at: string;
}

export interface AtlasImage {
  id: string;
  title: string;
  atlas_type: "ekg" | "rontgen" | "bt" | "usg" | "klinik_foto";
  category: string;
  image_url: string;
  annotated_url?: string;
  normal_url?: string;
  diagnosis: string;
  description: string;
  key_findings?: string[];
  difficulty?: number;
  clinical_context?: string;
  differential?: string[];
  tags?: string[];
  status: ContentStatus;
  author_id?: string;
  source?: string;
  created_at: string;
}

export interface ContentProgress {
  id: string;
  user_id: string;
  content_type: string;
  content_id: string;
  progress: number;
  completed: boolean;
  last_position: number;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  topic: string;
  difficulty: number;
  question_text: string;
  question_image?: string;
  options: { text: string; is_correct: boolean }[];
  explanation: string;
  source?: string;
  status: ContentStatus;
  created_by?: string;
  created_at: string;
}

export interface QuizResult {
  id: string;
  user_id: string;
  topic?: string;
  total_questions: number;
  correct_answers: number;
  time_spent?: number;
  question_ids?: string[];
  answers?: { question_id: string; selected_option: number; is_correct: boolean }[];
  created_at: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  difficulty: number;
  patient_info: {
    age: number;
    gender: string;
    chief_complaint: string;
    history?: string;
  };
  system_prompt: string;
  initial_vitals: {
    hr: number;
    bp: string;
    rr: number;
    spo2: number;
    temp: number;
    gcs: number;
  };
  lab_results?: Record<string, unknown>;
  imaging_results?: Record<string, unknown>;
  ideal_actions?: { step: number; action: string; reasoning: string; critical: boolean }[];
  tags?: string[];
  status: ContentStatus;
  created_at: string;
}

export interface SimulationSession {
  id: string;
  user_id: string;
  scenario_id: string;
  messages: { role: string; content: string; timestamp: string }[];
  actions_taken: unknown[];
  score?: number;
  feedback?: string;
  completed: boolean;
  completed_at?: string;
  created_at: string;
}

export interface UserGamification {
  id: string;
  user_id: string;
  xp_total: number;
  level: number;
  current_streak: number;
  longest_streak: number;
  last_active?: string;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_code: string;
  earned_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: ActivityType;
  content_id?: string;
  xp_earned: number;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Debrief {
  id: string;
  user_id: string;
  shift_date: string;
  shift_location: "acil_servis" | "yogun_bakim" | "travma" | "diger";
  shift_duration?: number;
  overall_learning?: string;
  what_would_change?: string;
  mentor_question?: string;
  created_at: string;
}

export interface DebriefCase {
  id: string;
  debrief_id: string;
  diagnosis: string;
  actions_taken?: string;
  had_difficulty: boolean;
  difficulty_area?: "tani" | "tedavi" | "prosedur" | "iletisim";
  new_learning?: string;
  emotion?: "confident" | "normal" | "anxious" | "overwhelmed";
  ai_recommendations?: unknown;
  created_at: string;
}
