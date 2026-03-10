-- ==========================================
-- AcilEM — Veritabanı Şeması (Migration 001)
-- ==========================================

-- Profiles tablosu (auth.users'ı genişletir)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT,
  residency_year INTEGER CHECK (residency_year BETWEEN 1 AND 4),
  role TEXT DEFAULT 'resident' CHECK (role IN ('admin', 'editor', 'resident')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Profil otomatik oluşturma trigger'ı
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, institution, residency_year)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Kullanıcı'),
    NEW.email,
    NEW.raw_user_meta_data->>'institution',
    NULLIF(NEW.raw_user_meta_data->>'residency_year', '')::INTEGER
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Quiz tabloları
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  question_text TEXT NOT NULL,
  question_image TEXT,
  options JSONB NOT NULL,
  explanation TEXT NOT NULL,
  source TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  topic TEXT,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  time_spent INTEGER,
  question_ids UUID[],
  answers JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI Simülasyon tabloları
CREATE TABLE IF NOT EXISTS public.scenarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 3),
  patient_info JSONB NOT NULL,
  system_prompt TEXT NOT NULL,
  initial_vitals JSONB NOT NULL,
  lab_results JSONB,
  imaging_results JSONB,
  ideal_actions JSONB,
  tags TEXT[],
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.simulation_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  scenario_id UUID REFERENCES public.scenarios(id) NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]',
  actions_taken JSONB DEFAULT '[]',
  score INTEGER,
  feedback TEXT,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Eğitim içerikleri
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('konu_anlatimi', 'kilavuz_ozeti', 'vaka_tartismasi', 'pearl', 'makale_ozeti')),
  category TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  body TEXT NOT NULL,
  key_points JSONB,
  reading_time INTEGER,
  tags TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  author_id UUID REFERENCES public.profiles(id),
  reviewer_id UUID REFERENCES public.profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.podcasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  audio_url TEXT NOT NULL,
  duration INTEGER NOT NULL,
  episode_number INTEGER,
  format TEXT CHECK (format IN ('konu_anlatimi', 'vaka_tartismasi', 'soylesi', 'kilavuz', 'gunun_sorusu')),
  tags TEXT[],
  status TEXT DEFAULT 'draft',
  author_id UUID REFERENCES public.profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  video_url TEXT NOT NULL,
  duration INTEGER,
  video_type TEXT CHECK (video_type IN ('prosedur', 'ders', 'ekg_yorum', 'usg', 'vaka_sunum', 'kisa_ipucu')),
  tags TEXT[],
  status TEXT DEFAULT 'draft',
  author_id UUID REFERENCES public.profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.atlas_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  atlas_type TEXT NOT NULL CHECK (atlas_type IN ('ekg', 'rontgen', 'bt', 'usg', 'klinik_foto')),
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  annotated_url TEXT,
  normal_url TEXT,
  diagnosis TEXT NOT NULL,
  description TEXT NOT NULL,
  key_findings JSONB,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  clinical_context TEXT,
  differential TEXT[],
  tags TEXT[],
  status TEXT DEFAULT 'draft',
  author_id UUID REFERENCES public.profiles(id),
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Prosedürler
CREATE TABLE IF NOT EXISTS public.procedures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  indications TEXT,
  contraindications TEXT,
  equipment JSONB,
  steps JSONB NOT NULL,
  tips TEXT,
  complications TEXT,
  video_url TEXT,
  references TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.algorithms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  flowchart_data JSONB NOT NULL,
  description TEXT,
  references TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Debrief
CREATE TABLE IF NOT EXISTS public.debriefs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  shift_date DATE NOT NULL,
  shift_location TEXT CHECK (shift_location IN ('acil_servis', 'yogun_bakim', 'travma', 'diger')),
  shift_duration INTEGER,
  overall_learning TEXT,
  what_would_change TEXT,
  mentor_question TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.debrief_cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  debrief_id UUID REFERENCES public.debriefs(id) ON DELETE CASCADE NOT NULL,
  diagnosis TEXT NOT NULL,
  actions_taken TEXT,
  had_difficulty BOOLEAN DEFAULT false,
  difficulty_area TEXT CHECK (difficulty_area IN ('tani', 'tedavi', 'prosedur', 'iletisim')),
  new_learning TEXT,
  emotion TEXT CHECK (emotion IN ('confident', 'normal', 'anxious', 'overwhelmed')),
  ai_recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.experience_map (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  case_count INTEGER DEFAULT 0,
  last_seen DATE,
  confidence_level TEXT DEFAULT 'beginner' CHECK (confidence_level IN ('beginner', 'developing', 'competent', 'proficient')),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, category, subcategory)
);

-- Gamification
CREATE TABLE IF NOT EXISTS public.user_gamification (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) UNIQUE NOT NULL,
  xp_total INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active DATE,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  badge_code TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, badge_code)
);

CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  activity_type TEXT NOT NULL,
  content_id UUID,
  xp_earned INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- İçerik ilerleme
CREATE TABLE IF NOT EXISTS public.content_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  last_position INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

CREATE TABLE IF NOT EXISTS public.content_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

-- Telegram Bot
CREATE TABLE IF NOT EXISTS public.bot_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  platform TEXT DEFAULT 'telegram' CHECK (platform IN ('telegram', 'whatsapp')),
  chat_id TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  preferences JSONB DEFAULT '{"daily_pearl": true, "daily_quiz": true, "new_content": true}',
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atlas_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.algorithms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debriefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debrief_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_subscribers ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Kullanıcılar kendi profilini görebilir" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Adminler tüm profilleri görebilir" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Adminler profil güncelleyebilir" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Kullanıcılar kendi profilini güncelleyebilir" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Kullanıcılar profil oluşturabilir" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Questions — onaylı kullanıcılar görebilir
CREATE POLICY "Onaylı kullanıcılar soruları görebilir" ON public.questions
  FOR SELECT USING (
    status = 'published' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'approved')
  );

CREATE POLICY "Admin/editör soru ekleyebilir" ON public.questions
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "Admin/editör soru güncelleyebilir" ON public.questions
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Quiz results — kendi sonuçları
CREATE POLICY "Kullanıcılar kendi quiz sonuçlarını görebilir" ON public.quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar quiz sonucu ekleyebilir" ON public.quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Scenarios — onaylı kullanıcılar görebilir
CREATE POLICY "Onaylı kullanıcılar senaryoları görebilir" ON public.scenarios
  FOR SELECT USING (
    status = 'published' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'approved')
  );

-- Simulation sessions
CREATE POLICY "Kullanıcılar kendi simülasyon oturumlarını görebilir" ON public.simulation_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar simülasyon oturumu oluşturabilir" ON public.simulation_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi simülasyon oturumlarını güncelleyebilir" ON public.simulation_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Articles — yayınlanmış olanları onaylı kullanıcılar görebilir
CREATE POLICY "Onaylı kullanıcılar makaleleri görebilir" ON public.articles
  FOR SELECT USING (
    status = 'published' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'approved')
  );

-- User gamification
CREATE POLICY "Kullanıcılar kendi gamification verilerini görebilir" ON public.user_gamification
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar gamification verisi oluşturabilir" ON public.user_gamification
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi gamification verilerini güncelleyebilir" ON public.user_gamification
  FOR UPDATE USING (auth.uid() = user_id);

-- Debriefs
CREATE POLICY "Kullanıcılar kendi debrief'lerini görebilir" ON public.debriefs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar debrief oluşturabilir" ON public.debriefs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Debrief cases
CREATE POLICY "Kullanıcılar kendi debrief vakalarını görebilir" ON public.debrief_cases
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.debriefs WHERE id = debrief_id AND user_id = auth.uid())
  );

CREATE POLICY "Kullanıcılar debrief vakası oluşturabilir" ON public.debrief_cases
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.debriefs WHERE id = debrief_id AND user_id = auth.uid())
  );

-- Activity log
CREATE POLICY "Kullanıcılar kendi aktivitelerini görebilir" ON public.activity_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar aktivite ekleyebilir" ON public.activity_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Content progress
CREATE POLICY "Kullanıcılar kendi ilerlemelerini görebilir" ON public.content_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar ilerleme ekleyebilir" ON public.content_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi ilerlemelerini güncelleyebilir" ON public.content_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Procedures ve Algorithms — onaylı kullanıcılar
CREATE POLICY "Onaylı kullanıcılar prosedürleri görebilir" ON public.procedures
  FOR SELECT USING (
    status = 'published' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'approved')
  );

CREATE POLICY "Onaylı kullanıcılar algoritmaları görebilir" ON public.algorithms
  FOR SELECT USING (
    status = 'published' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'approved')
  );

-- Gamification: yeni kullanıcı için otomatik kayıt
CREATE OR REPLACE FUNCTION public.handle_new_profile_gamification()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_gamification (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_profile_created_gamification
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_profile_gamification();
