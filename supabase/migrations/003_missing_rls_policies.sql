-- ==========================================
-- Eksik RLS Politikaları (7 tablo)
-- Mevcut politikaları silip yeniden oluşturur
-- ==========================================

-- Podcasts — yayınlanmış olanları onaylı kullanıcılar görebilir
DROP POLICY IF EXISTS "Onaylı kullanıcılar podcastleri görebilir" ON public.podcasts;
CREATE POLICY "Onaylı kullanıcılar podcastleri görebilir" ON public.podcasts
  FOR SELECT USING (
    status = 'published' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'approved')
  );

DROP POLICY IF EXISTS "Admin/editör podcast ekleyebilir" ON public.podcasts;
CREATE POLICY "Admin/editör podcast ekleyebilir" ON public.podcasts
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

DROP POLICY IF EXISTS "Admin/editör podcast güncelleyebilir" ON public.podcasts;
CREATE POLICY "Admin/editör podcast güncelleyebilir" ON public.podcasts
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Videos — yayınlanmış olanları onaylı kullanıcılar görebilir
DROP POLICY IF EXISTS "Onaylı kullanıcılar videoları görebilir" ON public.videos;
CREATE POLICY "Onaylı kullanıcılar videoları görebilir" ON public.videos
  FOR SELECT USING (
    status = 'published' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'approved')
  );

DROP POLICY IF EXISTS "Admin/editör video ekleyebilir" ON public.videos;
CREATE POLICY "Admin/editör video ekleyebilir" ON public.videos
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

DROP POLICY IF EXISTS "Admin/editör video güncelleyebilir" ON public.videos;
CREATE POLICY "Admin/editör video güncelleyebilir" ON public.videos
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Atlas images — yayınlanmış olanları onaylı kullanıcılar görebilir
DROP POLICY IF EXISTS "Onaylı kullanıcılar atlas görsellerini görebilir" ON public.atlas_images;
CREATE POLICY "Onaylı kullanıcılar atlas görsellerini görebilir" ON public.atlas_images
  FOR SELECT USING (
    status = 'published' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND status = 'approved')
  );

DROP POLICY IF EXISTS "Admin/editör atlas görseli ekleyebilir" ON public.atlas_images;
CREATE POLICY "Admin/editör atlas görseli ekleyebilir" ON public.atlas_images
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

DROP POLICY IF EXISTS "Admin/editör atlas görseli güncelleyebilir" ON public.atlas_images;
CREATE POLICY "Admin/editör atlas görseli güncelleyebilir" ON public.atlas_images
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- User badges — kullanıcılar kendi rozetlerini görebilir
DROP POLICY IF EXISTS "Kullanıcılar kendi rozetlerini görebilir" ON public.user_badges;
CREATE POLICY "Kullanıcılar kendi rozetlerini görebilir" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Sistem rozet ekleyebilir" ON public.user_badges;
CREATE POLICY "Sistem rozet ekleyebilir" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Content ratings — kullanıcılar kendi değerlendirmelerini yönetebilir
DROP POLICY IF EXISTS "Kullanıcılar kendi değerlendirmelerini görebilir" ON public.content_ratings;
CREATE POLICY "Kullanıcılar kendi değerlendirmelerini görebilir" ON public.content_ratings
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Kullanıcılar değerlendirme ekleyebilir" ON public.content_ratings;
CREATE POLICY "Kullanıcılar değerlendirme ekleyebilir" ON public.content_ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Kullanıcılar kendi değerlendirmelerini güncelleyebilir" ON public.content_ratings;
CREATE POLICY "Kullanıcılar kendi değerlendirmelerini güncelleyebilir" ON public.content_ratings
  FOR UPDATE USING (auth.uid() = user_id);

-- Bot subscribers — sadece admin erişebilir (service_role ile kullanılır)
DROP POLICY IF EXISTS "Adminler bot abonelerini görebilir" ON public.bot_subscribers;
CREATE POLICY "Adminler bot abonelerini görebilir" ON public.bot_subscribers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Push subscriptions — kullanıcılar kendi aboneliklerini yönetebilir
DROP POLICY IF EXISTS "Kullanıcılar kendi push aboneliklerini görebilir" ON public.push_subscriptions;
CREATE POLICY "Kullanıcılar kendi push aboneliklerini görebilir" ON public.push_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Kullanıcılar push aboneliği oluşturabilir" ON public.push_subscriptions;
CREATE POLICY "Kullanıcılar push aboneliği oluşturabilir" ON public.push_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Kullanıcılar kendi push aboneliklerini güncelleyebilir" ON public.push_subscriptions;
CREATE POLICY "Kullanıcılar kendi push aboneliklerini güncelleyebilir" ON public.push_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Kullanıcılar kendi push aboneliklerini silebilir" ON public.push_subscriptions;
CREATE POLICY "Kullanıcılar kendi push aboneliklerini silebilir" ON public.push_subscriptions
  FOR DELETE USING (auth.uid() = user_id);
