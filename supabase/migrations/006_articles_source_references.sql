-- articles tablosuna source_references sütunu ekle (GI Aciller içerik serisi için gerekli)
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS source_references TEXT;
