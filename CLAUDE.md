# AcilEM - Acil Tıp Asistan Eğitim Platformu

## Proje
Türkiye acil tıp asistanları için ücretsiz eğitim platformu.
5 ana modül: AI Simülasyon, Hesaplayıcılar, Eğitim İçerikleri, Quiz, Prosedürler.
3 ek modül: Nöbet Debrief, Gamification, Telegram Bot.

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS (koyu/açık tema) + next-themes
- Supabase (PostgreSQL + Auth + Storage)
- Claude API / @anthropic-ai/sdk (AI simülasyon)
- Vercel hosting

## Kritik Kurallar (HER ZAMAN UYGULA)
- Tüm UI Türkçe. Türkçe karakter desteği eksiksiz (ç,ğ,ı,ö,ş,ü).
- Mobile-first responsive tasarım. 3 breakpoint: <768 mobil, 768-1024 tablet, >1024 masaüstü.
- Her korumalı sayfada tıbbi disclaimer göster.
- API anahtarları SADECE env variable (.env.local) — ASLA frontend koda yazma.
- Supabase RLS (Row Level Security) her tabloda aktif.
- Auth kontrolü: açık erişim (hesaplayıcılar, algoritmalar) vs korumalı (diğer tüm modüller).
- Hata mesajları Türkçe ve kullanıcı dostu.
- Loading state her async işlemde gösterilmeli.
- Her component TypeScript ile tip tanımlı.
- Kullanıcılar arası ranking/sıralama tablosu YOK.

## Komutlar
- npm run dev — Geliştirme sunucusu
- npm run build — Production build
- npm run lint — Kod kontrolü

## Detaylı Dokümantasyon (İHTİYAÇ OLUNCA OKU)
- @docs/rules-medical.md — Tıbbi içerik kuralları
- @docs/rules-technical.md — Teknik kurallar
- @docs/progress.md — Yapılacaklar listesi (GÜNCEL TUT!)
- @docs/architecture.md — Teknik mimari (henüz oluşturulmadı)
- @docs/database-schema.md — Tüm tablo şemaları (henüz oluşturulmadı)
- @docs/module-calculators.md — Hesaplayıcı detayları (henüz oluşturulmadı)
- @docs/module-quiz.md — Quiz detayları (henüz oluşturulmadı)
- @docs/module-content.md — Eğitim içerikleri detayları (henüz oluşturulmadı)
- @docs/module-simulation.md — AI simülasyon detayları (henüz oluşturulmadı)
- @docs/module-procedures.md — Prosedür kılavuzları (henüz oluşturulmadı)
- @docs/module-debrief.md — Nöbet sonu debrief (henüz oluşturulmadı)
- @docs/module-gamification.md — Gamification (henüz oluşturulmadı)
- @docs/module-bot.md — Telegram bot (henüz oluşturulmadı)

## Oturum Yönetimi
- HER oturum başında docs/progress.md'yi oku, nerede kaldığını hatırla.
- HER oturum sonunda yaptığın işleri progress.md'de [ ] → [x] olarak işaretle.
- 1 oturumda 1-2 görev. Daha fazlası bağlamı bozar.
- Görev bittiğinde git commit yap.
