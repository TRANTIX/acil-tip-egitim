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
- [ ] Gamification entegrasyonu (XP)
- [ ] İlk 50 soru (seed data)

## Faz 5: Prosedür Kılavuzları
- [ ] procedures + algorithms tabloları
- [ ] Prosedür sayfası şablonu + checklist
- [ ] Flowchart render (mermaid.js)
- [ ] İlk 5 prosedür + 3 algoritma

## Faz 6: AI Vaka Simülasyonları
- [ ] Claude API entegrasyonu (streaming)
- [ ] scenarios + simulation_sessions tabloları
- [ ] Chat arayüzü + vital bulgu paneli
- [ ] Aksiyon butonları
- [ ] Performans değerlendirme + geri bildirim
- [ ] Rate limiting (günlük 5 simülasyon/kullanıcı)
- [ ] İlk 5 senaryo

## Faz 7: Nöbet Sonu Debrief
- [ ] debriefs + debrief_cases + experience_map tabloları
- [ ] Debrief formu (dinamik vaka ekleme)
- [ ] AI analiz ve öneri sistemi
- [ ] Deneyim haritası görselleştirmesi
- [ ] PDF export

## Faz 8: Gamification
- [ ] user_gamification + user_badges + activity_log tabloları
- [ ] Streak hesaplama
- [ ] XP ve seviye sistemi
- [ ] Rozet kontrol ve atama
- [ ] Profil sayfası + dashboard widget

## Faz 9: AI Eğitmen
- [ ] Kullanıcı performans verisi aggregation
- [ ] Claude API kişiselleştirilmiş analiz
- [ ] Dashboard widget + haftalık plan

## Faz 10: Telegram Bot
- [ ] bot_subscribers tablosu
- [ ] Telegraf.js kurulumu
- [ ] Komutlar: /pearl, /soru, /streak, /yardim
- [ ] Günlük otomatik gönderim (cron)

## Faz 11: Optimizasyon ve PWA
- [ ] PWA: offline hesaplayıcılar ve kılavuzlar
- [ ] Push notification
- [ ] Lighthouse skoru >90
- [ ] Accessibility kontrolü
