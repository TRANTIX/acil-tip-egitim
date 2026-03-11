-- ==========================================
-- Güvenlik Düzeltmeleri
-- ==========================================

-- =====================
-- 1. KRITIK: profiles UPDATE — yetki yükseltme koruması
-- Kullanıcılar role ve status alanlarını değiştiremez
-- =====================
DROP POLICY IF EXISTS "Kullanıcılar kendi profilini güncelleyebilir" ON public.profiles;
CREATE POLICY "Kullanıcılar kendi profilini güncelleyebilir" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    role = (SELECT role FROM public.profiles WHERE id = auth.uid()) AND
    status = (SELECT status FROM public.profiles WHERE id = auth.uid())
  );

-- =====================
-- 2. KRITIK: experience_map — sıfır policy düzeltmesi
-- =====================
DROP POLICY IF EXISTS "Kullanıcılar kendi deneyim haritasını görebilir" ON public.experience_map;
CREATE POLICY "Kullanıcılar kendi deneyim haritasını görebilir" ON public.experience_map
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Kullanıcılar deneyim haritası oluşturabilir" ON public.experience_map;
CREATE POLICY "Kullanıcılar deneyim haritası oluşturabilir" ON public.experience_map
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Kullanıcılar kendi deneyim haritasını güncelleyebilir" ON public.experience_map;
CREATE POLICY "Kullanıcılar kendi deneyim haritasını güncelleyebilir" ON public.experience_map
  FOR UPDATE USING (auth.uid() = user_id);

-- =====================
-- 3. articles — eksik admin INSERT/UPDATE policies
-- =====================
DROP POLICY IF EXISTS "Admin/editör makale ekleyebilir" ON public.articles;
CREATE POLICY "Admin/editör makale ekleyebilir" ON public.articles
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

DROP POLICY IF EXISTS "Admin/editör makale güncelleyebilir" ON public.articles;
CREATE POLICY "Admin/editör makale güncelleyebilir" ON public.articles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- =====================
-- 4. procedures — eksik admin INSERT/UPDATE policies
-- =====================
DROP POLICY IF EXISTS "Admin/editör prosedür ekleyebilir" ON public.procedures;
CREATE POLICY "Admin/editör prosedür ekleyebilir" ON public.procedures
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

DROP POLICY IF EXISTS "Admin/editör prosedür güncelleyebilir" ON public.procedures;
CREATE POLICY "Admin/editör prosedür güncelleyebilir" ON public.procedures
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- =====================
-- 5. algorithms — eksik admin INSERT/UPDATE policies
-- =====================
DROP POLICY IF EXISTS "Admin/editör algoritma ekleyebilir" ON public.algorithms;
CREATE POLICY "Admin/editör algoritma ekleyebilir" ON public.algorithms
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

DROP POLICY IF EXISTS "Admin/editör algoritma güncelleyebilir" ON public.algorithms;
CREATE POLICY "Admin/editör algoritma güncelleyebilir" ON public.algorithms
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- =====================
-- 6. scenarios — eksik admin INSERT/UPDATE policies
-- =====================
DROP POLICY IF EXISTS "Admin senaryo ekleyebilir" ON public.scenarios;
CREATE POLICY "Admin senaryo ekleyebilir" ON public.scenarios
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admin senaryo güncelleyebilir" ON public.scenarios;
CREATE POLICY "Admin senaryo güncelleyebilir" ON public.scenarios
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =====================
-- 7. user_badges — INSERT kısıtlama (sadece service_role ile eklenmeli)
-- Mevcut policy çok geniş, kullanıcılar kendine rozet verebiliyor
-- Kaldırıp sadece admin/service_role bırakıyoruz
-- =====================
DROP POLICY IF EXISTS "Sistem rozet ekleyebilir" ON public.user_badges;
-- Not: Badge ekleme artık sadece service_role (admin client) ile yapılacak
-- API route zaten server-side'da admin client kullanıyor

-- =====================
-- 8. debriefs — eksik UPDATE policy
-- =====================
DROP POLICY IF EXISTS "Kullanıcılar kendi debrief'lerini güncelleyebilir" ON public.debriefs;
CREATE POLICY "Kullanıcılar kendi debrief'lerini güncelleyebilir" ON public.debriefs
  FOR UPDATE USING (auth.uid() = user_id);
