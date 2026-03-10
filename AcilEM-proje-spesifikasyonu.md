# AcilEM — Proje Spesifikasyonu (Claude Code Yapım Dokümanı)

> Bu dosya Claude Code'a verilecek ana spesifikasyon dosyasıdır.
> Bu dosyayı okuyan AI, projeyi sıfırdan inşa edebilmelidir.
> Dosya yapısı: CLAUDE.md → docs/ klasörü → progress.md şeklinde parçalanacaktır.

---

## PROJE TANIMI

**Ad:** AcilEM
**Amaç:** Türkiye genelindeki acil tıp asistanları için ücretsiz, AI destekli dijital eğitim platformu.
**Erişim Modeli:** Açık erişim katmanı (hesaplayıcılar herkese açık) + korumalı katman (admin onaylı üyelik).
**Dağıtım:** Web uygulaması (PWA desteği ile mobil uyumlu).

---

## TEKNOLOJİ YIĞINI

```
Framework:     Next.js 14+ (App Router, TypeScript)
Stil:          Tailwind CSS (koyu/açık tema)
Veritabanı:    Supabase (PostgreSQL)
Auth:          Supabase Auth (email + admin onayı)
Depolama:      Supabase Storage (resimler, ses dosyaları)
AI Motor:      Claude API (Anthropic) — vaka simülasyonu ve AI eğitmen
Video:         YouTube/Vimeo embed (Supabase'de barındırma yok)
Hosting:       Vercel
Bot:           Telegram Bot API (Telegraf.js)
```

---

## DOSYA YAPISI

Projeyi oluştururken bu yapıyı kullan:

```
acil-tip-egitim/
├── CLAUDE.md                            ← Ana hafıza dosyası (<200 satır)
├── docs/
│   ├── architecture.md                  ← Bu dosyadaki teknik mimari
│   ├── database-schema.md               ← Tüm SQL tabloları
│   ├── rules-medical.md                 ← Tıbbi içerik kuralları
│   ├── rules-technical.md               ← Teknik kurallar
│   ├── rules-ai-simulation.md           ← AI simülasyon kuralları
│   ├── module-calculators.md            ← Hesaplayıcı detayları
│   ├── module-quiz.md                   ← Quiz detayları
│   ├── module-content.md                ← Eğitim içerikleri detayları
│   ├── module-simulation.md             ← AI simülasyon detayları
│   ├── module-procedures.md             ← Prosedür kılavuzları
│   ├── module-debrief.md                ← Nöbet sonu debrief
│   ├── module-gamification.md           ← Gamification
│   ├── module-bot.md                    ← Telegram bot
│   └── progress.md                      ← Checkbox'lı ilerleme takibi
├── src/
│   ├── app/
│   │   ├── layout.tsx                   ← Root layout (tema, font, metadata)
│   │   ├── page.tsx                     ← Landing page (açık erişim)
│   │   ├── (public)/                    ← Açık erişim route grubu
│   │   │   ├── hesaplayicilar/          ← Klinik hesaplayıcılar
│   │   │   ├── algoritmalar/            ← Temel algoritmalar
│   │   │   ├── hakkinda/                ← Platform tanıtımı
│   │   │   └── giris/                   ← Giriş sayfası
│   │   │   └── kayit/                   ← Kayıt sayfası
│   │   └── (protected)/                 ← Auth gerektiren route grubu
│   │       ├── dashboard/               ← Ana panel
│   │       ├── simulasyon/              ← AI vaka simülasyonları
│   │       ├── icerikler/               ← Eğitim içerikleri (yazılı, ses, video, atlas)
│   │       ├── quiz/                    ← Quiz/sınav sistemi
│   │       ├── prosedurler/             ← Prosedür kılavuzları
│   │       ├── debrief/                 ← Nöbet sonu debrief
│   │       ├── profil/                  ← Kullanıcı profili ve ilerleme
│   │       └── admin/                   ← Admin paneli
│   ├── components/
│   │   ├── layout/                      ← Navbar, Sidebar, Footer
│   │   ├── ui/                          ← Button, Card, Modal, Input vb.
│   │   ├── calculators/                 ← Hesaplayıcı bileşenleri
│   │   ├── quiz/                        ← Quiz bileşenleri
│   │   ├── simulation/                  ← Simülasyon bileşenleri
│   │   ├── content/                     ← İçerik bileşenleri (AudioPlayer, VideoEmbed, AtlasViewer)
│   │   ├── debrief/                     ← Debrief bileşenleri
│   │   └── gamification/                ← Rozet, streak, XP bileşenleri
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                ← Supabase browser client
│   │   │   ├── server.ts                ← Supabase server client
│   │   │   └── admin.ts                 ← Supabase admin client
│   │   ├── claude.ts                    ← Claude API wrapper
│   │   ├── utils.ts                     ← Yardımcı fonksiyonlar
│   │   └── constants.ts                 ← Sabitler (kategoriler, skorlar vb.)
│   ├── data/
│   │   ├── calculators/                 ← Hesaplayıcı JSON tanımları
│   │   ├── scenarios/                   ← Senaryo JSON tanımları
│   │   └── seed/                        ← Veritabanı başlangıç verileri
│   ├── hooks/                           ← Custom React hooks
│   ├── types/                           ← TypeScript tip tanımları
│   └── middleware.ts                     ← Auth middleware (açık/korumalı routing)
├── public/
│   ├── icons/                           ← PWA ikonları
│   └── manifest.json                    ← PWA manifest
├── supabase/
│   └── migrations/                      ← Veritabanı migration dosyaları
├── .env.local                           ← Environment variables (GIT'E EKLEME)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ERİŞİM KATMANLARI

### Açık Erişim (Auth gerektirmez)
- Landing page (platform tanıtımı)
- Tüm klinik hesaplayıcılar
- Temel algoritmalar (ACLS, ATLS, Anafilaksi)
- Kayıt ve giriş sayfaları
- Hakkında sayfası

### Korumalı Erişim (Kayıt + Admin Onayı)
- Dashboard
- AI vaka simülasyonları
- Tüm eğitim içerikleri (yazılı, podcast, video, atlas)
- Quiz/sınav sistemi
- Prosedür kılavuzları (detaylı)
- Nöbet sonu debrief
- AI Eğitmen
- Gamification (rozet, streak, seviye)
- Profil ve ilerleme takibi

### Admin Paneli
- Kullanıcı onayı/reddi
- İçerik yönetimi (CRUD)
- Soru ekleme/düzenleme
- Senaryo yönetimi
- İstatistikler dashboard'u
- Editör atama

---

## KULLANICI ROLLERİ

| Rol | Yetki |
|-----|-------|
| admin | Her şey: kullanıcı onayı, içerik CRUD, istatistik, editör atama |
| editor | İçerik ekleme/düzenleme (taslak oluşturur, admin onaylar) |
| resident | Tüm eğitim modüllerini kullanma, quiz, simülasyon, debrief |

---

## VERİTABANI ŞEMASI

Aşağıdaki tüm tabloları Supabase'de oluştur. HER tabloda RLS (Row Level Security) aktif olmalı.

```sql
-- ==========================================
-- KULLANICI YÖNETİMİ
-- ==========================================

CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
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

-- ==========================================
-- KLİNİK HESAPLAYICILAR (statik, JSON tabanlı — tabloya gerek yok)
-- Hesaplayıcılar src/data/calculators/ içinde JSON olarak tanımlanır.
-- ==========================================

-- ==========================================
-- QUİZ SİSTEMİ
-- ==========================================

CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  question_text TEXT NOT NULL,
  question_image TEXT,
  options JSONB NOT NULL, -- [{text: string, is_correct: boolean}]
  explanation TEXT NOT NULL,
  source TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  topic TEXT,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  time_spent INTEGER, -- saniye
  question_ids UUID[], -- çözülen soru ID'leri
  answers JSONB, -- [{question_id, selected_option, is_correct}]
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- AI VAKA SİMÜLASYONLARI
-- ==========================================

CREATE TABLE scenarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 3),
  patient_info JSONB NOT NULL, -- {age, gender, chief_complaint, history...}
  system_prompt TEXT NOT NULL, -- Claude API'ye gönderilen tam prompt
  initial_vitals JSONB NOT NULL, -- {hr, bp, rr, spo2, temp, gcs}
  lab_results JSONB, -- {cbc, bmp, troponin, ekg_desc...}
  imaging_results JSONB, -- {xray_desc, ct_desc...}
  ideal_actions JSONB, -- [{step, action, reasoning, critical: bool}]
  tags TEXT[],
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE simulation_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  scenario_id UUID REFERENCES scenarios(id) NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]', -- [{role, content, timestamp}]
  actions_taken JSONB DEFAULT '[]', -- kullanıcının aldığı aksiyonlar
  score INTEGER,
  feedback TEXT,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- EĞİTİM İÇERİKLERİ
-- ==========================================

CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('konu_anlatimi', 'kilavuz_ozeti', 'vaka_tartismasi', 'pearl', 'makale_ozeti')),
  category TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  body TEXT NOT NULL, -- Markdown
  key_points JSONB, -- ["nokta 1", "nokta 2"]
  reading_time INTEGER, -- dakika
  tags TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
  author_id UUID REFERENCES profiles(id),
  reviewer_id UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE podcasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  audio_url TEXT NOT NULL, -- Supabase Storage URL
  duration INTEGER NOT NULL, -- saniye
  episode_number INTEGER,
  format TEXT CHECK (format IN ('konu_anlatimi', 'vaka_tartismasi', 'soylesi', 'kilavuz', 'gunun_sorusu')),
  tags TEXT[],
  status TEXT DEFAULT 'draft',
  author_id UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  video_url TEXT NOT NULL, -- YouTube/Vimeo embed URL
  duration INTEGER, -- saniye
  video_type TEXT CHECK (video_type IN ('prosedur', 'ders', 'ekg_yorum', 'usg', 'vaka_sunum', 'kisa_ipucu')),
  tags TEXT[],
  status TEXT DEFAULT 'draft',
  author_id UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE atlas_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  atlas_type TEXT NOT NULL CHECK (atlas_type IN ('ekg', 'rontgen', 'bt', 'usg', 'klinik_foto')),
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  annotated_url TEXT, -- işaretlenmiş versiyon
  normal_url TEXT, -- normal karşılaştırma
  diagnosis TEXT NOT NULL,
  description TEXT NOT NULL,
  key_findings JSONB, -- ["bulgu 1", "bulgu 2"]
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 4),
  clinical_context TEXT,
  differential TEXT[], -- ayırıcı tanılar
  tags TEXT[],
  status TEXT DEFAULT 'draft',
  author_id UUID REFERENCES profiles(id),
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- PROSEDÜR KILAVUZLARI
-- ==========================================

CREATE TABLE procedures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  indications TEXT,
  contraindications TEXT,
  equipment JSONB, -- ["malzeme 1", "malzeme 2"]
  steps JSONB NOT NULL, -- [{order, text, image_url?, tip?}]
  tips TEXT,
  complications TEXT,
  video_url TEXT,
  references TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE algorithms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  flowchart_data JSONB NOT NULL, -- mermaid veya custom flowchart JSON
  description TEXT,
  references TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- NÖBET SONU DEBRİEF
-- ==========================================

CREATE TABLE debriefs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  shift_date DATE NOT NULL,
  shift_location TEXT CHECK (shift_location IN ('acil_servis', 'yogun_bakim', 'travma', 'diger')),
  shift_duration INTEGER, -- saat
  overall_learning TEXT,
  what_would_change TEXT,
  mentor_question TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE debrief_cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  debrief_id UUID REFERENCES debriefs(id) ON DELETE CASCADE NOT NULL,
  diagnosis TEXT NOT NULL,
  actions_taken TEXT,
  had_difficulty BOOLEAN DEFAULT false,
  difficulty_area TEXT CHECK (difficulty_area IN ('tani', 'tedavi', 'prosedur', 'iletisim', null)),
  new_learning TEXT,
  emotion TEXT CHECK (emotion IN ('confident', 'normal', 'anxious', 'overwhelmed')),
  ai_recommendations JSONB, -- AI'nın önerdiği içerikler
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE experience_map (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  case_count INTEGER DEFAULT 0,
  last_seen DATE,
  confidence_level TEXT DEFAULT 'beginner' CHECK (confidence_level IN ('beginner', 'developing', 'competent', 'proficient')),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, category, subcategory)
);

-- ==========================================
-- GAMİFİCATİON
-- ==========================================

CREATE TABLE user_gamification (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) UNIQUE NOT NULL,
  xp_total INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active DATE,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  badge_code TEXT NOT NULL, -- 'first_step', 'quiz_master' vb.
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, badge_code)
);

CREATE TABLE activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  activity_type TEXT NOT NULL, -- 'quiz', 'article', 'podcast', 'video', 'simulation', 'debrief', 'calculator', 'atlas'
  content_id UUID,
  xp_earned INTEGER DEFAULT 0,
  metadata JSONB, -- ek bilgi (quiz skoru, simülasyon puanı vb.)
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- İÇERİK İLERLEME TAKİBİ
-- ==========================================

CREATE TABLE content_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  content_type TEXT NOT NULL, -- 'article', 'podcast', 'video', 'atlas'
  content_id UUID NOT NULL,
  progress INTEGER DEFAULT 0, -- 0-100
  completed BOOLEAN DEFAULT false,
  last_position INTEGER DEFAULT 0, -- ses/video için saniye
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

CREATE TABLE content_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

-- ==========================================
-- TELEGRAM BOT
-- ==========================================

CREATE TABLE bot_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  platform TEXT DEFAULT 'telegram' CHECK (platform IN ('telegram', 'whatsapp')),
  chat_id TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  preferences JSONB DEFAULT '{"daily_pearl": true, "daily_quiz": true, "new_content": true}',
  subscribed_at TIMESTAMPTZ DEFAULT now()
);
```

---

## MODÜL SPESİFİKASYONLARI

### MODÜL 1: KLİNİK HESAPLAYICILAR

**Erişim:** Açık (auth gerektirmez)
**Konum:** `src/app/(public)/hesaplayicilar/`

Hesaplayıcılar JSON config dosyasından dinamik olarak render edilir. Yeni hesaplayıcı eklemek için JSON dosyası oluşturmak yeterli olmalı.

**JSON Yapısı (src/data/calculators/gks.json örneği):**
```json
{
  "id": "gks",
  "name": "Glasgow Koma Skoru (GKS)",
  "shortName": "GKS",
  "category": "noroloji",
  "description": "Bilinç düzeyini değerlendirmek için kullanılan standart skor.",
  "fields": [
    {
      "id": "eye",
      "label": "Göz Açma",
      "type": "select",
      "options": [
        {"value": 4, "label": "Spontan (4)"},
        {"value": 3, "label": "Sesli uyaranla (3)"},
        {"value": 2, "label": "Ağrılı uyaranla (2)"},
        {"value": 1, "label": "Yok (1)"}
      ]
    },
    {
      "id": "verbal",
      "label": "Sözel Yanıt",
      "type": "select",
      "options": [
        {"value": 5, "label": "Oryante (5)"},
        {"value": 4, "label": "Konfüze (4)"},
        {"value": 3, "label": "Uygunsuz kelimeler (3)"},
        {"value": 2, "label": "Anlamsız sesler (2)"},
        {"value": 1, "label": "Yok (1)"}
      ]
    },
    {
      "id": "motor",
      "label": "Motor Yanıt",
      "type": "select",
      "options": [
        {"value": 6, "label": "Emirlere uyar (6)"},
        {"value": 5, "label": "Ağrıyı lokalize eder (5)"},
        {"value": 4, "label": "Fleksiyon (çekme) (4)"},
        {"value": 3, "label": "Anormal fleksiyon (3)"},
        {"value": 2, "label": "Ekstansiyon (2)"},
        {"value": 1, "label": "Yok (1)"}
      ]
    }
  ],
  "calculate": "sum",
  "interpretation": [
    {"min": 13, "max": 15, "label": "Hafif", "color": "green", "description": "Hafif beyin hasarı"},
    {"min": 9, "max": 12, "label": "Orta", "color": "yellow", "description": "Orta beyin hasarı"},
    {"min": 3, "max": 8, "label": "Ağır", "color": "red", "description": "Ağır beyin hasarı, entübasyon düşün"}
  ],
  "source": "Teasdale G, Jennett B. Assessment of coma and impaired consciousness. Lancet 1974.",
  "disclaimer": "Bu hesaplayıcı eğitim amaçlıdır. Klinik kararlar hasta değerlendirmesi ile verilmelidir."
}
```

**İlk oluşturulacak hesaplayıcılar (öncelik sırasıyla):**
1. Glasgow Koma Skoru (GKS)
2. HEART Skoru
3. Wells Kriterleri (PE)
4. CURB-65
5. qSOFA
6. CHA₂DS₂-VASc
7. PECARN
8. Pediatrik GKS
9. NIHSS
10. Centor Skoru

**Her hesaplayıcı sayfası şunları içermeli:**
- Giriş formu (hasta parametreleri)
- Anında hesaplama (form değişince)
- Skor göstergesi (renkli: yeşil/sarı/kırmızı)
- Yorum ve klinik öneri
- Kaynak referansı
- Tıbbi disclaimer
- Paylaşma butonu (link kopyala)
- SEO optimizasyonu (her hesaplayıcı ayrı URL: /hesaplayicilar/gks)

---

### MODÜL 2: QUİZ/SINAV SİSTEMİ

**Erişim:** Korumalı
**Konum:** `src/app/(protected)/quiz/`

**Modlar:**
- **Pratik Modu:** Rastgele sorular, anında geri bildirim, süre sınırı yok
- **Sınav Modu:** Belirli sayıda soru, zamanlı, sonunda toplu değerlendirme
- **Konu Bazlı:** Belirli kategoriden sorular

**Soru ekleme (Admin):**
- Zengin metin editörü ile soru metni
- Resim yükleme (EKG, röntgen vb.)
- 5 şık, doğru cevap işaretleme
- Açıklama metni (doğru cevap neden doğru, diğerleri neden yanlış)
- Konu, zorluk seviyesi, kaynak

**Quiz çözme arayüzü:**
- Soru metni ve varsa resim
- Şıklar (tıklanabilir)
- Pratik modda: anında doğru/yanlış göster + açıklama
- Sınav modunda: sonraki soruya geç, sonunda hepsini göster
- İlerleme çubuğu (3/20 soru)
- Zamanlayıcı (sınav modunda)

**Sonuç ekranı:**
- Doğru/yanlış oranı
- Konu bazlı performans
- XP kazanımı
- "Zayıf konularda pratik yap" önerisi

---

### MODÜL 3: EĞİTİM İÇERİKLERİ

**Erişim:** Korumalı
**Konum:** `src/app/(protected)/icerikler/`

4 alt bölüm: Yazılı, Podcast, Video, Görsel Atlas

**Ortak özellikler:**
- Kategori ve zorluk seviyesine göre filtreleme
- Arama (başlık, etiket)
- Okundu/izlendi/dinlendi işareti (ilerleme takibi)
- 5 yıldız değerlendirme
- Paylaşma (platform içi link)

**Yazılı içerikler:**
- Markdown render (code highlighting, tablolar, uyarı kutuları)
- Tahmini okuma süresi
- Anahtar noktalar kutusu (vurgulu)
- İlgili quiz ve simülasyon bağlantıları

**Podcast/Ses:**
- Gömülü ses oynatıcı: play/pause, seek bar, hız ayarı (1x, 1.5x, 2x), ses seviyesi
- Kaldığı yerden devam etme (last_position kaydı)
- Bölüm listesi

**Video:**
- YouTube/Vimeo embed (iframe)
- Kaldığı yerden devam etme
- Video altında not alanı

**Görsel Atlas:**
- Resim görüntüleyici: zoom (scroll/pinch), pan
- "Normal vs Anormal" karşılaştırma modu (yan yana)
- İşaretlenmiş versiyon göster/gizle toggle
- Filtre: atlas türü (EKG, röntgen, BT, USG), tanı, zorluk

**İçerik Yönetimi (Admin/Editör):**
- İçerik ekleme formu (her tür için ayrı)
- Zengin metin editörü (yazılı içerik için)
- Dosya yükleme (resim, ses)
- Durum yönetimi: Taslak → İnceleme → Yayında → Arşiv
- Editör iş akışı: editör taslak oluşturur → admin onaylar → yayınlanır

---

### MODÜL 4: AI VAKA SİMÜLASYONLARI

**Erişim:** Korumalı
**Konum:** `src/app/(protected)/simulasyon/`

**Arayüz Düzeni (Desktop):**
```
┌──────────────────────────────┬────────────────────────┐
│                              │  HASTA BİLGİLERİ       │
│     CHAT ALANI               │  ┌──────────────────┐  │
│     (Hasta-Hekim diyaloğu)   │  │ Vital Bulgular   │  │
│                              │  │ KTA: 110/dk      │  │
│                              │  │ TA: 90/60        │  │
│  [Asistan mesaj yazar]       │  │ SpO2: 94%        │  │
│                              │  │ Ateş: 38.5°C     │  │
│                              │  └──────────────────┘  │
│                              │  ┌──────────────────┐  │
│                              │  │ Aksiyonlar       │  │
│                              │  │ [Tetkik İste]    │  │
│                              │  │ [FM Yap]         │  │
│                              │  │ [Tedavi Başla]   │  │
│                              │  │ [Konsültasyon]   │  │
│                              │  │ [Tanı Koy]       │  │
│                              │  └──────────────────┘  │
└──────────────────────────────┴────────────────────────┘
```

**Mobilde:** Tab yapısı (Chat | Vital | Aksiyon)

**Akış:**
1. Kullanıcı senaryo seçer (kategori, zorluk)
2. Hasta bilgisi gösterilir (yaş, cinsiyet, başvuru şikayeti)
3. Chat alanında AI hasta ile diyalog başlar
4. Kullanıcı anamnez alır (serbest metin veya önerilen sorular)
5. Butonlarla FM, tetkik, tedavi isteyebilir → sonuçlar panel'de gösterilir
6. Tedaviye göre vitaller değişir (AI yönetir)
7. Kullanıcı tanı koyar → simülasyon biter
8. Performans değerlendirmesi + geri bildirim ekranı

**Claude API Kullanımı:**
- System prompt: senaryo JSON'ından oluşturulan detaylı hasta tanımı
- Streaming response: gerçek zamanlı yazma efekti
- Rate limit: kullanıcı başına günlük 5 simülasyon (ayarlanabilir)

**Simülasyon sonuç ekranı:**
- Yapılan doğru adımlar ✅
- Kaçırılan kritik eylemler ❌
- İdeal yaklaşım yolu
- Puan (0-100)
- XP kazanımı
- İlgili konu anlatımına link

---

### MODÜL 5: PROSEDÜR KILAVUZLARI

**Erişim:** Korumalı (temel algoritmalar açık erişimde de olabilir)
**Konum:** `src/app/(protected)/prosedurler/`

**Her prosedür sayfası:**
- Endikasyonlar ve kontrendikasyonlar
- Malzeme checklist'i (tıklanabilir onay kutuları)
- Adım adım prosedür (numaralı, resimli)
- İpuçları ve sık yapılan hatalar (uyarı kutuları)
- Komplikasyonlar ve yönetimi
- İlgili video linki
- PDF indirme opsiyonu

**Algoritmalar:**
- Flowchart görselleştirme (mermaid.js veya custom SVG)
- Interaktif: adıma tıkla → detay göster
- Yazdırılabilir versiyon

---

### MODÜL 6: NÖBET SONU DEBRİEF

**Erişim:** Korumalı
**Konum:** `src/app/(protected)/debrief/`

**Debrief Formu:**
- Tarih (otomatik bugün), nöbet yeri (dropdown), süre
- Vaka ekleme (dinamik form — "+" butonu ile birden fazla vaka)
  - Her vaka: tanı, ne yaptım, zorluk var mı, nerede zorlandım, yeni öğrendiğim, duygu durumu
- Genel değerlendirme: bugün ne öğrendim, neyi farklı yapardım, mentora sorum

**AI Analizi (form kaydedildikten sonra):**
- Claude API'ye debrief verisini gönder
- AI ilgili eğitim içerikleri önerir
- Deneyim haritasını günceller
- Zayıf alanları tespit eder

**Deneyim Haritası:**
- Görsel grid/heatmap: her TUKMOS kategorisi için renk kodu
  - Yeşil: çok deneyim, güvenli
  - Sarı: az deneyim
  - Kırmızı: hiç deneyim yok veya çok zorlanıyor
- Tıklanabilir: kategoriye tıkla → detay ve öneriler

**Geçmiş debrief'ler:**
- Tarih sıralı liste
- Filtreleme (tarih aralığı, tanı)
- PDF dışa aktarma (portfolyo için)

---

### MODÜL 7: GAMİFİCATİON

**Her yerde entegre — ayrı sayfa: Profil sayfasında görünür**

**Streak sistemi:**
- Her gün en az 1 aktivite = streak devam eder
- Aktiviteler: quiz çöz, içerik oku/izle/dinle, simülasyon yap, debrief kaydet
- Dashboard'da streak sayacı göster (🔥 7 gün)
- Streak kırılınca sıfırlanır, en uzun streak kaydedilir

**XP sistemi:**
- Quiz sorusu çöz: 2 XP (doğru: +3 bonus)
- İçerik oku/izle/dinle: 5 XP
- Simülasyon tamamla: 15 XP
- Debrief kaydet: 10 XP
- Günlük streak: 5 XP bonus

**Seviyeler:**
- Seviye 1: Stajyer (0-100 XP)
- Seviye 2: Acemi (100-300 XP)
- Seviye 3: Gelişen (300-600 XP)
- Seviye 4: Yetkin (600-1000 XP)
- Seviye 5: Uzman Adayı (1000-1500 XP)
- Seviye 6: Usta (1500+ XP)

**Rozetler (badge_code → koşul):**
- first_step → İlk quiz tamamla
- avid_reader → 10 yazılı içerik oku
- podcast_listener → 10 podcast dinle
- video_learner → 10 video izle
- quiz_master → 100 quiz sorusu çöz
- sim_hero → 10 simülasyon tamamla
- debrief_ninja → 20 debrief kaydet
- week_warrior → 7 gün streak
- month_warrior → 30 gün streak
- atlas_explorer → 50 atlas görseli incele
- full_gear → Tüm modülleri en az 1 kez kullan

**Kural: Asistanlar arası sıralama tablosu YOK. Tamamen bireysel gelişim odaklı.**

---

### MODÜL 8: AI EĞİTMEN

**Erişim:** Korumalı
**Konum:** Dashboard widget'ı + `/profil` sayfası

Kullanıcının tüm aktivitesini analiz ederek kişiselleştirilmiş öğrenme planı önerir.

**Dashboard'da gösterilecekler:**
- Haftalık öğrenme özeti
- Zayıf alan tespiti + öneriler
- Bu hafta için öğrenme planı
- Motivasyon mesajı

**Teknik:** Claude API'ye kullanıcının performans verilerini (JSON) gönder → kişiselleştirilmiş yanıt al. Haftalık cron job veya kullanıcı dashboard'a geldiğinde tetiklenir.

---

### MODÜL 9: TELEGRAM BOT

**Ayrı servis veya Next.js API route olarak**

**Günlük otomatik gönderimler:**
- 08:00 — Günün Pearl'ü (articles tablosundan rastgele pearl)
- 13:00 — Günün Sorusu (questions tablosundan rastgele soru)

**Etkileşimli komutlar:**
- /pearl — Rastgele pearl
- /soru — Rastgele quiz sorusu
- /streak — Streak durumu
- /yardim — Komut listesi

---

## KRİTİK KURALLAR

Bu kurallar CLAUDE.md'ye ve her oturuma yansıtılmalıdır.

### Tıbbi İçerik Kuralları
- Her içerik kaynak göstermeli (kılavuz adı, yıl, kanıt düzeyi)
- İçerik en az 2 kişi tarafından kontrol edilmeli (yazar ≠ onaylayan)
- İlaç dozları çift kontrol edilmeli, birden fazla kaynakla doğrulanmalı
- Her sayfada tıbbi disclaimer: "Bu platform eğitim amaçlıdır. Klinik kararlar güncel kılavuzlar ve uzman gözetiminde verilmelidir."
- Güncelliğini yitirmiş içerik "arşiv" olarak işaretlenmeli
- AI asla kesin tanı koymamalı veya tedavi reçetelememeli
- Deneysel tedaviler "deneysel" olarak etiketlenmeli
- Reklam veya ticari ürün tanıtımı yapılmamalı

### Görsel/Medya Kuralları
- Tüm hasta görselleri anonimleştirilmeli (isim, TC, tarih kırpılmalı)
- Gerçek hasta görselleri için yazılı onam (KVKK uyumlu)
- Telif hakkı olan görseller izinsiz kullanılmamalı
- Rahatsız edici ve eğitim değeri olmayan görseller eklenmemeli

### AI Simülasyon Kuralları
- Her simülasyonda başta ve sonda disclaimer
- AI gerçek hasta verisi kullanmamalı — tüm senaryolar kurgusal
- Token limiti: kullanıcı başına günlük 5 simülasyon
- AI halüsinasyonlarını engellemek için senaryo JSON'u detaylı olmalı
- Simülasyon diyalogları gizli tutulmalı

### Teknik Kurallar
- Mobile-first responsive tasarım
- Tüm UI Türkçe, Türkçe karakter desteği eksiksiz
- API anahtarları SADECE env variable (.env.local) — ASLA frontend koda yazma
- Her tabloda Supabase RLS aktif
- Her async işlemde loading state
- Hata mesajları Türkçe ve kullanıcı dostu
- Sayfalar <3 saniyede yüklenmeli, görseller lazy-load
- Git versiyonlama, her özellik ayrı commit
- SSL/HTTPS zorunlu (Vercel varsayılan)

### Kullanıcı Kuralları
- Bireysel performans verileri gizli — kurum yöneticileriyle paylaşılmaz
- Kullanıcılar arası ranking/sıralama tablosu YOK
- Kullanıcı verileri 3. taraflarla paylaşılmaz
- KVKK uyumlu gizlilik politikası gerekli
- Push bildirimler günde max 1

---

## HAFIZA YÖNETİMİ STRATEJİSİ (KRİTİK!)

Claude Code'un ~200K token'lık bağlam penceresi var. Uzun oturumlarda bağlamı kaybeder, önceki kararları unutur, tutarsız kod üretir. Bu proje çok modüllü ve çok kurallı olduğu için, aşağıdaki strateji MUTLAKA uygulanmalıdır.

---

### 1. Dosya Yapısı ile Hafıza Dağıtımı

CLAUDE.md'yi küçük tut (<200 satır), detayları docs/ klasörüne taşı. Claude Code her oturumda CLAUDE.md'yi otomatik okur — büyük olursa bağlamı yer.

```
acil-tip-egitim/
├── CLAUDE.md                          ← Ana hafıza (<200 satır, HER oturumda yüklenir)
├── docs/
│   ├── architecture.md                ← Teknik mimari detayları
│   ├── database-schema.md             ← Veritabanı şeması (SQL)
│   ├── rules-medical.md               ← Tıbbi içerik kuralları
│   ├── rules-technical.md             ← Teknik geliştirme kuralları
│   ├── rules-content.md               ← İçerik üretim kuralları
│   ├── rules-ai-simulation.md         ← AI simülasyon kuralları
│   ├── module-calculators.md          ← Hesaplayıcı modülü detayları
│   ├── module-quiz.md                 ← Quiz modülü detayları
│   ├── module-content.md              ← Eğitim içerikleri detayları
│   ├── module-simulation.md           ← AI simülasyon detayları
│   ├── module-procedures.md           ← Prosedür kılavuzları detayları
│   ├── module-debrief.md              ← Nöbet sonu debrief detayları
│   ├── module-gamification.md         ← Gamification detayları
│   ├── module-bot.md                  ← Telegram bot detayları
│   ├── progress.md                    ← [ ] Checkbox'lı ilerleme takibi
│   └── session-notes/
│       ├── session-2026-03-15.md      ← Oturum notları
│       └── ...
├── src/
│   ├── app/
│   │   ├── CLAUDE.md                  ← "App Router kullan. (public) ve (protected) route grupları var."
│   │   ├── (public)/
│   │   │   └── CLAUDE.md              ← "Bu sayfalar AUTH GEREKTİRMEZ. SSG kullan. SEO optimize et."
│   │   └── (protected)/
│   │       └── CLAUDE.md              ← "Bu sayfalar AUTH ZORUNLU. Middleware kontrol eder. SSR kullan."
│   ├── components/
│   │   └── CLAUDE.md                  ← "Reusable component'ler. Tailwind kullan. Props ile TypeScript tip tanımla. Her component tek sorumluluk."
│   └── lib/
│       └── CLAUDE.md                  ← "Supabase client'lar burada. API key'ler SADECE server-side. Claude API wrapper burada."
└── .claude/
    └── rules/                         ← Glob pattern ile otomatik tetiklenen kurallar
        ├── turkish-ui.md              ← "Tüm UI metinleri Türkçe olmalı. Türkçe karakter desteği (ç,ğ,ı,ö,ş,ü) eksiksiz."
        ├── medical-disclaimer.md      ← "Her korumalı sayfanın altında disclaimer banner göster."
        ├── mobile-first.md            ← "Mobile-first tasarım. 3 breakpoint: mobil <768, tablet 768-1024, masaüstü >1024."
        └── api-security.md            ← "API key'ler .env.local'da. NEXT_PUBLIC_ prefix'i olmayan key'ler ASLA frontend'e sızmaz."
```

**Neden bu yapı?**
- `CLAUDE.md` (kök): Her oturumda otomatik yüklenir → kısa ve öz tut
- `docs/` dosyaları: Sadece ihtiyaç olduğunda `@docs/dosya.md` ile çağrılır → bağlamı doldurmaz
- Alt klasör `CLAUDE.md`'leri: O klasördeki dosyalar açıldığında otomatik yüklenir → bağlama uygun kurallar
- `.claude/rules/`: Dosya tipine göre otomatik tetiklenir
- Kardeş klasörlerin CLAUDE.md'leri birbirini ETKİLEMEZ (src/app/ açıkken src/components/ yüklenmez)

---

### 2. Ana CLAUDE.md İçeriği (Bu Dosyayı Oluştur — <200 Satır)

```markdown
# AcilEM - Acil Tıp Asistan Eğitim Platformu

## Proje
Türkiye acil tıp asistanları için ücretsiz eğitim platformu.
5 ana modül: AI Simülasyon, Hesaplayıcılar, Eğitim İçerikleri, Quiz, Prosedürler.
3 ek modül: Nöbet Debrief, Gamification, Telegram Bot.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (koyu/açık tema)
- Supabase (PostgreSQL + Auth + Storage)
- Claude API (AI simülasyon)
- Vercel hosting

## Kritik Kurallar (HER ZAMAN UYGULA)
- Tüm UI Türkçe. Türkçe karakter desteği eksiksiz.
- Mobile-first responsive tasarım.
- Her korumalı sayfada tıbbi disclaimer göster.
- API anahtarları SADECE env variable (.env.local) — ASLA frontend koda yazma.
- Supabase RLS (Row Level Security) her tabloda aktif.
- Auth kontrolü: açık erişim (hesaplayıcılar, algoritmalar) vs korumalı (diğer tüm modüller).
- Hata mesajları Türkçe ve kullanıcı dostu.
- Loading state her async işlemde gösterilmeli.
- Her component TypeScript ile tip tanımlı.

## Komutlar
- npm run dev — Geliştirme sunucusu
- npm run build — Production build
- npm run lint — Kod kontrolü

## Detaylı Dokümantasyon (İHTİYAÇ OLUNCA OKU)
- @docs/architecture.md — Teknik mimari
- @docs/database-schema.md — Tüm tablo şemaları
- @docs/rules-medical.md — Tıbbi içerik kuralları
- @docs/rules-technical.md — Teknik kurallar
- @docs/module-calculators.md — Hesaplayıcı detayları
- @docs/module-quiz.md — Quiz detayları
- @docs/module-content.md — Eğitim içerikleri detayları
- @docs/module-simulation.md — AI simülasyon detayları
- @docs/module-procedures.md — Prosedür kılavuzları
- @docs/module-debrief.md — Nöbet sonu debrief
- @docs/module-gamification.md — Gamification
- @docs/module-bot.md — Telegram bot
- @docs/progress.md — Yapılacaklar listesi (GÜNCEL TUT!)

## Oturum Yönetimi
- HER oturum başında docs/progress.md'yi oku, nerede kaldığını hatırla.
- HER oturum sonunda yaptığın işleri progress.md'de [ ] → [x] olarak işaretle.
- Büyük görev tamamlandığında docs/session-notes/ altına kısa özet kaydet.
- 1 oturumda 1-2 görev. Daha fazlası bağlamı bozar.
- Görev bittiğinde git commit yap, sonra /clear ile temiz başla.
```

**Bu dosya ~60 satır. 200 satır sınırının çok altında. Asla gereksiz detay EKLEME.**

---

### 3. Oturum Yönetimi — "Commit & Clear" Döngüsü

Claude Code ile çalışırken bu döngüyü TAKİP ET:

```
┌─────────────────────────────────────────────────────────────┐
│  OTURUM BAŞLANGIÇ                                           │
│  1. Claude Code'u başlat: claude                            │
│  2. "progress.md'yi oku, nerede kaldık?" de                 │
│  3. Claude mevcut durumu özetler                            │
│  4. Bugünkü hedefi belirle (1-2 görev MAX)                  │
│  5. İlgili docs/ dosyasını çağır: @docs/module-xxx.md       │
├─────────────────────────────────────────────────────────────┤
│  ÇALIŞMA (30-45 dk bloklarda)                               │
│  6. Tek bir göreve odaklan                                  │
│  7. Düzenli olarak /cost ile token kullanımını kontrol et   │
│  8. %50-60'a yaklaşınca → bir sonraki adıma geç            │
├─────────────────────────────────────────────────────────────┤
│  ARA KAYIT                                                  │
│  9. Git commit: "feat: GKS hesaplayıcısı tamamlandı"        │
│  10. progress.md'de ilgili checkbox'ı [x] işaretle          │
│  11. /cost kontrol:                                         │
│      → %70 ALTINDAYSA → devam et                            │
│      → %70-80 ARASIYSA → /compact yap, sonra devam          │
│      → %80+ İSE → aşağıdaki "temiz geçiş"i yap            │
├─────────────────────────────────────────────────────────────┤
│  TEMİZ GEÇİŞ (Context dolduğunda VEYA görev bittiğinde)    │
│  12. Claude'a de: "Yaptıklarımızı progress.md'ye kaydet"    │
│  13. Git commit yap                                         │
│  14. /clear ile bağlamı temizle                              │
│  15. Yeni oturuma başla: "progress.md'yi oku, devam edelim" │
└─────────────────────────────────────────────────────────────┘
```

**ALTIN KURAL: Bir oturumda 1-2 görevden fazlasını yapma.**
Hesaplayıcı modülünü bitir → commit → clear → quiz modülüne geç.

---

### 4. /compact vs /clear — Karar Tablosu

```
/compact
├── Ne yapar: Konuşma geçmişini özetler, ~%60-70 token kazandırır
├── Ne zaman: AYNI görev üzerinde çalışıyorsun AMA bağlam doluyor
├── Avantaj: Görev bağlamı korunur (özetlenmiş halde)
├── Dezavantaj: Özet orijinal kadar kaliteli DEĞİL, ~1 dk sürer
├── Kayıp: Ara detaylar kaybolabilir
└── KULLAN: %70-80 dolulukta, görev ORTASINDAYKEN

/clear
├── Ne yapar: TÜM konuşma geçmişini siler, bağlam sıfırlanır
├── Ne zaman: Görev TAMAMLANDI, yeni göreve geçiyorsun
├── Avantaj: Temiz başlangıç, maksimum bağlam alanı
├── Dezavantaj: Tüm konuşma geçmişi kaybolur
├── Kayıp: Her şey — ama progress.md ve git ile korunmuş oluyor
└── KULLAN: Görev bittiğinde, commit yaptıktan sonra

ASLA YAPMA:
├── ❌ %90'a kadar bekleme — kod kalitesi %70'ten sonra DÜŞER
├── ❌ Compact sonrası tekrar compact — kalite ÇOK düşer, bilgi kaybı artar
├── ❌ Clear yapmadan farklı modüle geçme — çakışan bağlamlar kötü kod üretir
├── ❌ Progress kaydetmeden clear — ilerleme kaybolur, tekrar yaparsın
└── ❌ Auto-compact'ı bekleme — %95'te tetiklenir, çok geç
```

---

### 5. Modül Bazlı Bağlam Yükleme (Lazy Loading)

Farklı modüller üzerinde çalışırken SADECE ilgili dokümanı çağır. Hepsini birden yükleme.

```
Hesaplayıcı üzerinde çalışıyorsanız:
→ "@docs/module-calculators.md dosyasını oku ve Wells hesaplayıcısını yap"

Quiz üzerinde çalışıyorsanız:
→ "@docs/module-quiz.md ve @docs/rules-medical.md dosyalarını oku, quiz modülüne başla"

AI Simülasyon üzerinde çalışıyorsanız:
→ "@docs/module-simulation.md ve @docs/rules-ai-simulation.md dosyalarını oku"

Veritabanı değişikliği yapıyorsanız:
→ "@docs/database-schema.md dosyasını oku, yeni tablo ekleyeceğiz"

Tıbbi içerik kuralı gerektiren bir iş yapıyorsanız:
→ "@docs/rules-medical.md dosyasını oku"
```

**Neden lazy loading?**
- CLAUDE.md'den sadece temel kurallar yüklenir (~60 satır, ~500 token)
- Çalıştığın modülün detayları talep edildiğinde yüklenir
- DİĞER modüllerin detayları bağlamı DOLDURMAZ
- Claude her oturumda sadece ihtiyacı olan bilgiyi okur
- 8 modülün hepsini aynı anda yüklemek ~10K+ token yer — gereksiz

---

### 6. Oturum Başlangıç Şablonu (Her Oturumda Kopyala-Yapıştır)

**Genel şablon:**
```
progress.md dosyasını oku.
Nerede kaldığımızı özetle.
Bugün [GÖREV ADI] üzerinde çalışacağız.
İlgili dokümanları yükle: @docs/[ilgili-dosya].md
Başlamadan önce planını anlat.
```

**Modül bazlı örnekler:**

Hesaplayıcı oturumu:
```
progress.md dosyasını oku. Nerede kaldık özetle.
Bugün HEART skoru hesaplayıcısını yapacağız.
@docs/module-calculators.md dosyasını oku.
Başlamadan önce planını anlat.
```

Quiz oturumu:
```
progress.md dosyasını oku. Nerede kaldık özetle.
Bugün quiz çözme arayüzünü yapacağız.
@docs/module-quiz.md ve @docs/database-schema.md dosyalarını oku.
Başlamadan önce planını anlat.
```

AI Simülasyon oturumu:
```
progress.md dosyasını oku. Nerede kaldık özetle.
Bugün Claude API entegrasyonu ve chat arayüzünü yapacağız.
@docs/module-simulation.md ve @docs/rules-ai-simulation.md dosyalarını oku.
Başlamadan önce planını anlat.
```

Debrief oturumu:
```
progress.md dosyasını oku. Nerede kaldık özetle.
Bugün nöbet sonu debrief formunu yapacağız.
@docs/module-debrief.md ve @docs/database-schema.md dosyalarını oku.
Başlamadan önce planını anlat.
```

---

### 7. Session Notes — Karmaşık Kararların Kaydı

Önemli mimari kararlar veya beklenmeyen çözümler olduğunda, oturum sonunda Claude'a şunu söyle:

```
"Bu oturumda aldığımız önemli kararları docs/session-notes/session-YYYY-MM-DD.md dosyasına kaydet."
```

Böylece gelecek oturumlarda "neden böyle yaptık?" sorusuna cevap bulunabilir.

---

### 8. "ultrathink" Kullanımı

Zor görevlerde (AI simülasyon mimarisi, karmaşık veritabanı sorguları, gamification mantığı) Claude'a daha derin düşünme tetiklemek için mesajın başına `ultrathink` ekle:

```
ultrathink
Bu simülasyon modülünde Claude API streaming response'u Next.js App Router
ile nasıl entegre ederiz? Edge runtime mı yoksa Node.js runtime mı kullanmalıyız?
Tüm seçenekleri değerlendir ve en iyisini öner.
```

Bu, Claude'un extended thinking modunu tetikler ve daha kaliteli çözümler üretir.

---

### 9. Kritik Hafıza Kuralları Özet Tablosu

| # | Kural | Neden? |
|---|-------|--------|
| 1 | CLAUDE.md < 200 satır | Her oturumda yüklenir, büyükse bağlamı yer |
| 2 | 1 oturum = 1-2 görev | Daha fazlası kaliteyi düşürür |
| 3 | Her görev sonrası git commit | Git = kalıcı hafıza, Claude unutsa bile kod korunur |
| 4 | progress.md güncel tut | Oturumlar arası hafıza — her oturum başında okutulur |
| 5 | %70'te karar ver | Compact mı clear mı? %90'a kadar bekleme |
| 6 | Modül değişimi = /clear | Hesaplayıcı bağlamı + quiz bağlamı = kötü kod |
| 7 | docs/ ile lazy loading | İhtiyaç olunca yükle, hepsini birden değil |
| 8 | Session notes kaydet | Mimari kararlar unutulmasın |
| 9 | Alt klasör CLAUDE.md'leri kullan | Bağlama uygun kurallar otomatik yüklensin |
| 10 | ultrathink kullan | Zor görevlerde daha derin düşünme tetikle |
| 11 | Compact sonrası compact YAPMA | Bilgi kaybı katlanarak artar |
| 12 | Auto-compact'ı BEKLEME | %95'te tetiklenir — çok geç, kalite çoktan düşmüş |

---

## GELİŞTİRME FAZLARI (progress.md şablonu)

```markdown
# AcilEM — İlerleme Takibi

## Faz 1: Temel Altyapı (Hafta 1-2)
- [ ] Next.js 14 projesi oluştur (TypeScript, App Router)
- [ ] Tailwind CSS + koyu/açık tema
- [ ] Supabase bağlantısı (client, server, admin)
- [ ] Auth sistemi (kayıt, giriş, çıkış)
- [ ] Profiles tablosu + admin onay mekanizması
- [ ] Middleware (açık vs korumalı routing)
- [ ] Layout (navbar, sidebar, footer)
- [ ] Landing page (açık erişim)
- [ ] Admin paneli: bekleyen kayıtlar listesi, onay/red
- [ ] Vercel'e deploy
- [ ] PWA manifest + ikonlar

## Faz 2: Klinik Hesaplayıcılar (Hafta 3-4)
- [ ] Hesaplayıcı JSON şema yapısı
- [ ] Dinamik hesaplayıcı render component'i
- [ ] İlk 5: GKS, HEART, Wells, CURB-65, qSOFA
- [ ] Sonraki 5: CHA₂DS₂-VASc, PECARN, Ped.GKS, NIHSS, Centor
- [ ] Hesaplayıcı listesi sayfası + arama/filtreleme
- [ ] SEO meta tags her hesaplayıcı için
- [ ] Responsive tasarım testi

## Faz 3: Eğitim İçerik Altyapısı (Hafta 5-7)
- [ ] articles tablosu + CRUD API routes
- [ ] podcasts tablosu + CRUD API routes
- [ ] videos tablosu + CRUD API routes
- [ ] atlas_images tablosu + CRUD API routes
- [ ] Admin: içerik ekleme formları (her tür için)
- [ ] Editör iş akışı (taslak → inceleme → yayın)
- [ ] Markdown render component
- [ ] Audio player component
- [ ] Video embed component
- [ ] Atlas görüntüleyici (zoom, karşılaştırma)
- [ ] İçerik listesi + filtreleme/arama
- [ ] content_progress takibi
- [ ] content_ratings sistemi
- [ ] İlk 10 yazılı içerik + 5 atlas görseli (seed data)

## Faz 4: Quiz/Sınav Sistemi (Hafta 8-10)
- [ ] questions tablosu + CRUD
- [ ] quiz_results tablosu
- [ ] Admin: soru ekleme formu (resim yükleme dahil)
- [ ] Quiz çözme arayüzü (pratik modu)
- [ ] Sınav modu (zamanlı)
- [ ] Sonuç ekranı + açıklamalar
- [ ] İlerleme takibi (konu bazlı performans)
- [ ] Gamification entegrasyonu (XP)
- [ ] İlk 50 soru (seed data)

## Faz 5: Prosedür Kılavuzları (Hafta 11-12)
- [ ] procedures tablosu + CRUD
- [ ] algorithms tablosu + CRUD
- [ ] Prosedür sayfası şablonu
- [ ] Checklist component'i
- [ ] Flowchart render (mermaid.js)
- [ ] İlk 5 prosedür + 3 algoritma (seed data)

## Faz 6: AI Vaka Simülasyonları (Hafta 13-16)
- [ ] Claude API entegrasyonu (streaming)
- [ ] scenarios tablosu + JSON yapısı
- [ ] simulation_sessions tablosu
- [ ] Chat arayüzü
- [ ] Vital bulgu paneli (dinamik güncelleme)
- [ ] Aksiyon butonları (FM, tetkik, tedavi, tanı)
- [ ] Performans değerlendirme + geri bildirim
- [ ] Rate limiting (günlük 5 simülasyon/kullanıcı)
- [ ] İlk 5 senaryo (seed data)

## Faz 7: Nöbet Sonu Debrief (Hafta 17-18)
- [ ] debriefs + debrief_cases tabloları
- [ ] experience_map tablosu
- [ ] Debrief formu (dinamik vaka ekleme)
- [ ] AI analiz ve öneri sistemi
- [ ] Deneyim haritası görselleştirmesi
- [ ] Geçmiş debrief'ler listesi
- [ ] PDF export

## Faz 8: Gamification (Faz 4 ile paralel başlar, sürekli genişler)
- [ ] user_gamification tablosu
- [ ] user_badges tablosu
- [ ] activity_log tablosu
- [ ] Streak hesaplama mantığı
- [ ] XP hesaplama ve seviye sistemi
- [ ] Rozet kontrol ve atama
- [ ] Profil sayfası: rozet vitrini, streak, seviye, grafik
- [ ] Dashboard widget: streak + XP + seviye

## Faz 9: AI Eğitmen (Hafta 19-20)
- [ ] Kullanıcı performans verisi toplama (aggregation)
- [ ] Claude API ile kişiselleştirilmiş analiz
- [ ] Dashboard widget: haftalık özet + öneri
- [ ] Haftalık öğrenme planı gösterimi

## Faz 10: Telegram Bot (Hafta 20-21)
- [ ] bot_subscribers tablosu
- [ ] Telegram bot kurulumu (Telegraf.js)
- [ ] /pearl, /soru, /streak, /yardim komutları
- [ ] Günlük otomatik pearl + soru gönderimi (cron)
- [ ] Platform kullanıcısı ile bot eşleştirme

## Faz 11: Optimizasyon ve PWA (Hafta 22)
- [ ] PWA: offline hesaplayıcılar ve kılavuzlar
- [ ] Push notification altyapısı
- [ ] Performans optimizasyonu (lighthouse skoru >90)
- [ ] Accessibility kontrolü
- [ ] Son kullanıcı testi ve bug düzeltme
```

---

## TASARIM PRENSİPLERİ

- **Renk paleti:** Tıbbi mavi (#1E40AF) ana renk, başarı yeşili (#059669), uyarı sarı (#D97706), tehlike kırmızı (#DC2626)
- **Koyu tema:** Varsayılan koyu arka plan (#0F172A), açık temaya geçiş toggle
- **Font:** Geist veya IBM Plex Sans (Türkçe karakter desteği iyi)
- **Kartlar:** Rounded-xl, subtle shadow, hover efekti
- **Boşluklar:** Generous padding, mobilde daha sıkı
- **İkonlar:** Lucide React
- **Animasyonlar:** Framer Motion — sayfa geçişleri, kart girişleri, skor gösterimi
- **Responsive:** 3 breakpoint — mobil (<768), tablet (768-1024), masaüstü (>1024)
- **Disclaimer banner:** Her korumalı sayfanın altında küçük, sabit disclaimer notu

---

## ENVIRONMENT VARIABLES (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Claude API
ANTHROPIC_API_KEY=your_claude_api_key

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# App
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

**ASLA frontend'e SUPABASE_SERVICE_ROLE_KEY veya ANTHROPIC_API_KEY koyma. Bunlar sadece API routes'ta (server-side) kullanılmalı.**

---

*Bu dokümanı Claude Code'a verdiğinde, Faz 1'den başlayarak tüm projeyi adım adım inşa edebilir. Her faz tamamlandığında progress.md'yi güncelle ve bir sonraki faza geç.*
