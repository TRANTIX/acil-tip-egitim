# AcilEM — İlerleme Takibi

## Faz 1: Temel Altyapı
- [x] Next.js 16 projesi oluştur (TypeScript, App Router)
- [x] Bağımlılıklar: Supabase, Anthropic, lucide-react, framer-motion, next-themes
- [x] CLAUDE.md ve docs/ klasörü oluştur
- [x] Tailwind CSS + koyu/açık tema (CSS variables)
- [x] .env.local.example şablonu
- [x] Supabase client (browser, server, admin) — lib/supabase/
- [x] TypeScript tip tanımları — types/index.ts
- [x] Auth proxy (proxy.ts — Next.js 16'da middleware → proxy)
- [x] Root layout (tema, font, metadata, viewport)
- [x] ThemeProvider (next-themes)
- [x] Layout bileşenleri: Navbar, Footer
- [x] (public) ve (protected) route group layout'ları
- [x] Landing page (açık erişim) — app/page.tsx
- [x] Giriş sayfası (/giris) + Suspense wrapper
- [x] Kayıt sayfası (/kayit)
- [x] Beklemede sayfası (/beklemede)
- [x] Dashboard (korumalı, iskelet) — /dashboard
- [x] Admin paneli: bekleyen kayıtlar, onay/red — /admin
- [x] API route: auth callback — /api/auth/callback
- [x] Supabase SQL migration — supabase/migrations/001_initial_schema.sql
- [x] PWA manifest — public/manifest.json
- [ ] Vercel'e deploy (kullanıcı yapacak)
- [ ] public/icons/ klasörüne PWA ikonları ekle (kullanıcı yapacak)

**NOT (Next.js 16):** middleware.ts → proxy.ts, fonksiyon adı `proxy` olmalı

## Faz 2: Klinik Hesaplayıcılar ✅
- [x] Hesaplayıcı JSON şema yapısı — data/calculators/
- [x] types/calculator.ts + lib/calculators.ts
- [x] Dinamik hesaplayıcı render component — components/calculators/calculator-widget.tsx
- [x] GKS, HEART, Wells PE, CURB-65, qSOFA
- [x] CHA₂DS₂-VASc, PECARN, Ped.GKS, NIHSS, Centor
- [x] Hesaplayıcı listesi sayfası + arama/filtreleme — /hesaplayicilar
- [x] SEO meta tags — generateMetadata ile her /hesaplayicilar/[id]
- [x] Statik pre-rendering (generateStaticParams) — 10 sayfa SSG
- [x] İlgili hesaplayıcılar bölümü
- [x] Build başarılı (21 sayfa)

## Faz 3: Eğitim İçerik Altyapısı (devam ediyor)
- [x] articles API route (GET+POST) — /api/articles
- [x] articles/[id] API route (GET+PATCH) — /api/articles/[id]
- [x] react-markdown + remark-gfm yüklendi
- [x] MarkdownRenderer bileşeni — components/content/markdown-renderer.tsx
- [x] İçerikler ana sayfası — /icerikler
- [x] Yazılı içerikler listesi sayfası başlandı — /icerikler/yazilar
- [x] ArticleListClient (list-client.tsx) — arama, kategori, tür, zorluk filtreleri
- [x] Yazılı içerik detay sayfası — /icerikler/yazilar/[slug] + SEO metadata
- [x] AudioPlayer bileşeni — components/content/audio-player.tsx
- [x] Podcast listesi + detay sayfası — /icerikler/podcastler + /icerikler/podcastler/[id]
- [x] Podcasts API route (GET+POST+PATCH) — /api/podcasts + /api/podcasts/[id]
- [x] VideoEmbed bileşeni — components/content/video-embed.tsx (YouTube + native video)
- [x] Video listesi + detay sayfası — /icerikler/videolar + /icerikler/videolar/[id]
- [x] Videos API route (GET+POST+PATCH) — /api/videos + /api/videos/[id]
- [x] Podcast ve Video TypeScript tipleri — types/index.ts
- [x] Build başarılı (28 sayfa)
- [x] AtlasViewer bileşeni — components/content/atlas-viewer.tsx (zoom, orijinal/işaretli/normal toggle, bulgular paneli)
- [x] Atlas listesi + detay sayfası — /icerikler/atlas + /icerikler/atlas/[id]
- [x] Atlas API route (GET+POST+PATCH) — /api/atlas + /api/atlas/[id]
- [x] AtlasImage ve ContentProgress TypeScript tipleri — types/index.ts
- [x] useContentProgress hook — hooks/use-content-progress.ts (upsert, markCompleted)
- [x] Build başarılı (30 sayfa)
- [x] content_ratings sistemi — useContentRating hook + ContentRatingWidget bileşeni
- [x] İlk 10 yazılı içerik (seed data) — data/seed/articles.sql
- [x] Admin: içerik ekleme formları — /admin/icerik (makale, podcast, video, atlas tab'lı form)
- [x] Admin: soru ekleme formu — /admin/soru (dinamik seçenek, doğru cevap seçimi)
- [x] Build başarılı (34 sayfa)

## Faz 4: Quiz/Sınav Sistemi
- [x] questions + quiz_results tabloları (migration'da zaten mevcut)
- [x] Questions API route (GET+POST+PATCH) — /api/questions + /api/questions/[id]
- [x] Quiz Results API route (GET+POST) — /api/quiz-results
- [x] Admin: soru ekleme formu — /admin/soru
- [x] Pratik modu — /quiz (soru kartı, anlık açıklama, ilerleme çubuğu)
- [x] Sınav modu (zamanlı) — 90sn/soru countdown, süre dolunca otomatik geçiş
- [x] Sonuç ekranı + açıklamalar — skor özeti, soru detayları (expandable), doğru/yanlış gösterimi
- [x] Gamification entegrasyonu (XP) — quiz bitişinde /api/gamification/activity çağrısı, sonuç ekranında XP/streak/rozet gösterimi
- [x] İlk 50 soru (seed data) — data/seed/questions.sql (10 konuda dağılım)

## Faz 5: Prosedür Kılavuzları ✅
- [x] procedures + algorithms tabloları (migration'da zaten mevcut)
- [x] Procedure + Algorithm TypeScript tipleri — types/index.ts
- [x] Procedures API route (GET+POST+PATCH) — /api/procedures + /api/procedures/[id]
- [x] Algorithms API route (GET+POST+PATCH) — /api/algorithms + /api/algorithms/[id]
- [x] Prosedür listesi sayfası — /prosedurler (tab'lı: prosedürler + algoritmalar, arama, kategori filtresi)
- [x] Prosedür detay sayfası + checklist — /prosedurler/[id] (adım adım checklist, ilerleme çubuğu, ekipman, endikasyon/kontrendikasyon, ipuçları, komplikasyonlar)
- [x] Flowchart render (mermaid.js) — components/content/mermaid-chart.tsx (dark theme, async import)
- [x] Algoritma detay sayfası — /prosedurler/algoritma/[id] (mermaid flowchart + açıklama)
- [x] İlk 5 prosedür + 3 algoritma seed data — data/seed/procedures.sql
- [x] Build başarılı (38 sayfa)

## Faz 6: AI Vaka Simülasyonları ✅
- [x] Claude API entegrasyonu (streaming) — SSE stream, @anthropic-ai/sdk
- [x] scenarios + simulation_sessions tabloları (migration'da zaten mevcut)
- [x] Scenarios API route (GET) — /api/scenarios + /api/scenarios/[id]
- [x] Simulations API route (GET+POST+PATCH) — /api/simulations + /api/simulations/[id]
- [x] Streaming chat endpoint — /api/simulations/[id]/chat (Claude sonnet, SSE)
- [x] Senaryo listesi sayfası — /simulasyon (kategori, zorluk filtresi, kart grid)
- [x] Chat arayüzü + vital bulgu paneli — /simulasyon/[id] (sidebar vitals + mobil vitals bar)
- [x] Aksiyon butonları — 8 hızlı aksiyon (fizik muayene, IV, monitör, EKG, lab, görüntüleme, O₂, SF)
- [x] Vital bulgu güncelleme — AI yanıtından [VITALS:...] parse, anormal değer kırmızı uyarı
- [x] Rate limiting (günlük 5 simülasyon/kullanıcı) — POST /api/simulations'da kontrol
- [x] İlk 5 senaryo seed data — data/seed/scenarios.sql (STEMI, sepsis, kafa travması, ped.anafilaksi, masif PE)
- [x] Performans değerlendirme + geri bildirim — /api/simulations/[id]/evaluate (Claude ile ideal_actions karşılaştırması, puan, güçlü yönler, gelişim alanları, atlanmış kritik adımlar, ipucu + gamification XP)
- [x] Build başarılı (40 sayfa)

## Faz 7: Nöbet Sonu Debrief ✅
- [x] debriefs + debrief_cases + experience_map tabloları (migration'da zaten mevcut)
- [x] ExperienceMap TypeScript tipi — types/index.ts
- [x] Debriefs API route (GET+POST) — /api/debriefs (vaka ekleme + deneyim haritası upsert)
- [x] Debriefs detail API route (GET+PATCH) — /api/debriefs/[id]
- [x] AI analiz endpoint — /api/debriefs/[id]/analyze (Claude sonnet, JSON analiz)
- [x] Experience Map API route (GET+POST) — /api/experience-map (upsert mantığı)
- [x] Debrief listesi + yeni debrief formu — /debrief (dinamik vaka ekleme/çıkarma, duygu + zorluk alanı)
- [x] Debrief detay sayfası + AI analiz — /debrief/[id] (vaka detayları, genel değerlendirme, AI analiz butonu)
- [x] AI analiz: özet, güçlü yönler, gelişim alanları, çalışma konuları, mentör yanıtı, motivasyon
- [x] Deneyim haritası görselleştirmesi — /debrief/deneyim-haritasi (kategori filtresi, güven seviyeleri, istatistikler)
- [x] Build başarılı (43 sayfa)
- [x] PDF export — debrief detay sayfasında "PDF İndir" butonu (window.print + print CSS, navbar/footer gizleme, A4 format)

## Faz 8: Gamification ✅
- [x] user_gamification + user_badges + activity_log tabloları (migration'da zaten mevcut)
- [x] Gamification kütüphanesi — lib/gamification/index.ts (XP tablosu, seviye hesaplama, streak, rozet tanımları)
- [x] Gamification API (GET) — /api/gamification + Activity API (POST) — /api/gamification/activity
- [x] Streak hesaplama — ardışık gün takibi, streak kırılma kontrolü
- [x] XP ve seviye sistemi — 8 aktivite türü, kademeli seviye formülü, seviye isimleri
- [x] 15 rozet tanımı + otomatik rozet kontrolü ve atama
- [x] Profil sayfası — /profil (XP ilerleme, seviye, streak, rozetler grid, aktivite geçmişi)
- [x] Dashboard güncellendi — XP ilerleme çubuğu, seviye başlığı, son rozetler + son aktiviteler
- [x] Build başarılı (44 sayfa)

## Faz 9: AI Eğitmen ✅
- [x] Kullanıcı performans verisi aggregation — quiz sonuçları, aktivite dağılımı, deneyim haritası, debriefler
- [x] Claude API kişiselleştirilmiş analiz — /api/ai-mentor (güçlü yönler, odak alanları, haftalık plan, ipucu, motivasyon)
- [x] Dashboard widget — ai-mentor-widget.tsx (butonla tetiklenen, haftalık 7 günlük plan, güçlü yönler, odak alanları)
- [x] Build başarılı (44 sayfa)

## Faz 10: Telegram Bot ✅
- [x] bot_subscribers tablosu (migration'da zaten mevcut)
- [x] BotSubscriber TypeScript tipi — types/index.ts
- [x] Telegram Bot API helper kütüphanesi — lib/telegram/index.ts (sendMessage, setWebhook, parseCommand, escapeHtml)
- [x] Webhook API route — /api/telegram/webhook (token doğrulama, komut işleme)
- [x] Komutlar: /start (abone kaydı), /pearl, /soru, /streak, /ayarlar, /yardim
- [x] /ayarlar komutu — bildirim tercihleri toggle (pearl, soru, içerik), abonelik iptali
- [x] Günlük otomatik gönderim — /api/telegram/cron (deterministik pearl + quiz seçimi, flood korumalı)
- [x] Vercel cron config — vercel.json (her gün 05:00 UTC / 08:00 TR)
- [x] Webhook setup endpoint — /api/telegram/setup (tek seferlik webhook kaydı/silme)
- [x] Build başarılı

## Faz 11: Optimizasyon ve PWA
- [x] PWA: Service Worker — offline hesaplayıcılar (10 sayfa precache, network-first strategy, offline fallback)
- [x] SW kayıt bileşeni — components/ui/sw-register.tsx (sadece production'da aktif)
- [x] Print CSS — globals.css (@media print, break-inside:avoid, A4 format, renk koruması)
- [x] Push notification — web-push (VAPID), SW push/notificationclick handler, /api/push/subscribe + /api/push/send, dashboard toggle bileşeni, push_subscriptions migration
- [x] Lighthouse optimizasyonu — next.config (image avif/webp, compress, poweredByHeader:false), img lazy loading/decoding async
- [x] Accessibility kontrolü — skip nav link, aria-expanded/label (navbar, video, quiz, button), focus-visible, prefers-reduced-motion, nav aria-label, aria-busy
- [x] Build başarılı (54 sayfa)
