-- ==========================================
-- Push Notification Subscriptions
-- ==========================================

CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi push aboneliklerini görebilir" ON public.push_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar push aboneliği oluşturabilir" ON public.push_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi push aboneliklerini silebilir" ON public.push_subscriptions
  FOR DELETE USING (auth.uid() = user_id);
