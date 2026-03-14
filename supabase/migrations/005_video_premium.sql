-- AcilEM — Video Premium/Ücretsiz Ayrımı
-- is_premium: true → Unlisted YouTube (sadece platform embed), false → Public YouTube (herkes erişir)

-- 1. is_premium kolonu ekle (varsayılan false = ücretsiz)
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;

-- 2. Mevcut RLS policy'lerini güncelle

-- Ücretsiz videolar: herkes görebilir (anonim dahil)
DROP POLICY IF EXISTS "Herkes ücretsiz videoları görebilir" ON public.videos;
CREATE POLICY "Herkes ücretsiz videoları görebilir" ON public.videos
  FOR SELECT USING (
    status = 'published' AND is_premium = false
  );

-- Premium videolar: sadece onaylı kullanıcılar görebilir
DROP POLICY IF EXISTS "Onaylı kullanıcılar videoları görebilir" ON public.videos;
CREATE POLICY "Onaylı kullanıcılar premium videoları görebilir" ON public.videos
  FOR SELECT USING (
    status = 'published' AND is_premium = true AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'approved')
  );

-- Admin/editör ekleme ve güncelleme policy'leri değişmez (zaten mevcut)
