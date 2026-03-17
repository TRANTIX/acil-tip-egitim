-- Herkes ücretsiz yayınlanmış videoları görebilir (auth gerekmez)
CREATE POLICY "Herkes ucretsiz videolari gorebilir" ON public.videos
  FOR SELECT USING (status = 'published' AND is_premium = false);
