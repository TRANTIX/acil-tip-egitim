# Teknik İçerik Kuralları

## Veritabanı Tabloları ve Alanları

İçerik oluşturulurken hedef tablolar ve zorunlu alanlar:

| Tablo | Açık Erişim | İçerik Türü |
|-------|-------------|-------------|
| `articles` | Hayır | Yazılı içerikler |
| `questions` | Hayır | Quiz soruları |
| `scenarios` | Hayır | AI simülasyon senaryoları |
| `procedures` | Hayır | Prosedür kılavuzları |
| `algorithms` | Evet | Akış diyagramları |
| `calculators` | Evet | JSON dosya (DB değil) |

## Seed Data Formatı (SQL)

### Genel Kurallar
- SQL dosyaları `data/seed/` altına konur.
- Dosya başında açıklama yorumu olmalı:
  ```sql
  -- AcilEM — [İçerik Açıklaması] Seed Data
  -- Kullanım: Supabase SQL editörüne yapıştırın
  ```
- Her kayıt arasında yorum ile numara ve kısa açıklama:
  ```sql
  -- 1. Kategori - Başlık
  ```
- String içinde tek tırnak: `''` ile escape edilmeli.
- Array alanları: `ARRAY['tag1', 'tag2']` formatı.
- JSON alanları: `'{"key": "value"}'` formatı (tek tırnakla sarılmış JSON).
- Tarih alanları: `now()`, `now() - interval '3 days'` gibi relative kullanılabilir.
- `status`: Seed data'da genellikle `'published'`.

### Tablo Bazlı SQL Formatları

#### articles
```sql
INSERT INTO public.articles (title, slug, content_type, category, difficulty, body, key_points, reading_time, tags, status, published_at)
VALUES (
  'Başlık',
  'slug-formati',
  'konu_anlatimi',
  'kardiyoloji',
  2,
  '## Markdown body...',
  '["Anahtar nokta 1", "Anahtar nokta 2"]',
  8,
  ARRAY['tag1', 'tag2'],
  'published',
  now()
);
```

#### questions
```sql
INSERT INTO public.questions (topic, difficulty, question_text, options, explanation, source, status)
VALUES (
  'kardiyoloji',
  2,
  'Soru metni?',
  '[{"text": "Seçenek A", "is_correct": false}, {"text": "Seçenek B", "is_correct": true}, {"text": "Seçenek C", "is_correct": false}, {"text": "Seçenek D", "is_correct": false}]',
  'Açıklama metni. Kaynak: ...',
  'Kaynak Adı',
  'published'
);
```

#### scenarios
```sql
INSERT INTO public.scenarios (title, category, difficulty, patient_info, system_prompt, initial_vitals, lab_results, imaging_results, ideal_actions, tags, status)
VALUES (
  'Başlık — Tanı',
  'kategori',
  2,
  '{"age": 55, "gender": "erkek", "chief_complaint": "...", "history": "..."}',
  'System prompt detaylı metin...',
  '{"hr": 100, "bp": "120/80", "rr": 18, "spo2": 98, "temp": 36.8, "gcs": 15}',
  '{"lab_adi": "değer"}',
  '{"goruntuleme_adi": "bulgu"}',
  '[{"step": 1, "action": "Eylem", "reasoning": "Gerekçe", "critical": true}]',
  ARRAY['tag1', 'tag2'],
  'published'
);
```

#### procedures
```sql
INSERT INTO public.procedures (title, category, indications, contraindications, equipment, steps, tips, complications, video_url, source_references, status)
VALUES (
  'Prosedür Adı',
  'havayolu',
  'Endikasyon satırları (newline ile ayrılmış)',
  'Kontrendikasyon satırları',
  '[{"name": "Malzeme"}, {"name": "Opsiyonel", "optional": true}]',
  '[{"order": 1, "title": "Adım", "description": "Detay", "warning": null}]',
  'Pratik ipuçları metin',
  'Komplikasyon satırları',
  NULL,
  'Kaynak referanslar',
  'published'
);
```

#### algorithms
```sql
INSERT INTO public.algorithms (title, category, flowchart_data, description, source_references, status)
VALUES (
  'Algoritma Adı',
  'kategori',
  '{"mermaid": "graph TD\n    A[Başlangıç] --> B{Karar}\n    B -->|Evet| C[Eylem]\n    B -->|Hayır| D[Alternatif]"}',
  'Açıklama metni',
  'Kaynak',
  'published'
);
```

## Hesaplayıcı JSON Dosyaları

- Dosya konumu: `data/calculators/[id].json`
- `id`: Kısa, tire ile ayrılmış (ör. `wells-pe`, `curb65`, `cha2ds2vasc`)
- `calculate` alanı: `"sum"` (tüm mevcut hesaplayıcılar toplam bazlı)
- `interpretation` dizisi: `min` ve `max` değerleri tüm olası skorları kapsamalı, boşluk olmamalı
- Her JSON dosyası geçerli (valid) JSON olmalı

## Kategori ve Etiket Standartları

### Kategoriler (Sabit Liste)
```
kardiyoloji, travma, noroloji, resüsitasyon, toksikoloji,
enfeksiyon, pediatri, pulmoner, genel
```
- Yeni kategori eklemek için önce UI'daki filtre bileşenlerini güncellemek gerekir.
- Türkçe karakter kullanılmaz: `nöroloji` → `noroloji`

### Etiketler (Tags)
- Küçük harf, Türkçe karakter kullanılabilir.
- 3-6 etiket arası.
- Genel + spesifik karışım: `['sepsis', 'septik şok', 'enfeksiyon', 'qsofa']`
- Kısaltmalar büyük harf olabilir etiketlerde: `'ekg'`, `'kpr'`, `'acls'`

### Zorluk Seviyeleri
| Değer | Seviye | Hedef Kitle |
|-------|--------|-------------|
| 1 | Kolay | Asistan 1. yıl, temel konular |
| 2 | Orta | Asistan 2-3. yıl, klinik entegrasyon |
| 3 | Zor | Asistan 4-5. yıl, ileri konular |
| 4 | İleri | Uzman düzeyi, nadir durumlar |

## Slug Kuralları
- Küçük harf.
- Boşluklar tire (`-`) ile değiştirilir.
- Türkçe karakterler dönüştürülür: `ç→c`, `ğ→g`, `ı→i`, `ö→o`, `ş→s`, `ü→u`
- Özel karakterler kaldırılır.
- Örnekler: `stemi-yonetimi`, `eriskin-kardiyak-arrest`, `parasetamol-zehirlenmesi`

## Markdown Yazım Kuralları (İçerik body'si)

### Desteklenen Formatlar
- Başlıklar: `##` (H2) ile başla, `###` (H3) alt bölümler
- Tablolar: GFM tablo formatı
- Listeler: `-` veya `1.` (numaralı)
- Kalın: `**önemli**`
- Uyarı vurgusu: Kalın metin yeterli, özel uyarı bileşeni yok

### Yapısal Kurallar
- H1 (`#`) kullanılmaz (sayfa başlığı otomatik eklenir).
- Tablolar 5 sütunu geçmemeli (mobil uyumluluk).
- Kod blokları kullanılmaz (tıbbi içerik, yazılım değil).
- Görsel referansları: Doğrudan URL veya placeholder `[Görsel: açıklama]`
- Uzun içerikler bölümlere ayrılmalı (her bölüm 3-5 paragraf).

## İçerik Durumları (Status)

```
draft → review → published → archived
```

| Durum | Açıklama |
|-------|----------|
| `draft` | Taslak, sadece oluşturan kişi görür |
| `review` | İnceleme bekliyor, editör görebilir |
| `published` | Yayında, tüm kullanıcılar görür |
| `archived` | Arşivlenmiş, güncelliğini yitirmiş |

- Seed data her zaman `published` olarak eklenir.
- Admin panelinden eklenen içerikler `draft` olarak başlar.

## Toplu İçerik Ekleme Kontrol Listesi

Yeni içerik batch'i eklerken:

- [ ] SQL syntax doğru mu? (tek tırnak escape, JSON formatı)
- [ ] Tüm zorunlu alanlar dolu mu?
- [ ] Kategoriler sabit listeden mi seçilmiş?
- [ ] Zorluk seviyeleri 1-4 arasında mı?
- [ ] Slug'lar unique ve kurallara uygun mu?
- [ ] Tıbbi bilgiler güncel kılavuzlara dayalı mı?
- [ ] Kaynak referansları var mı?
- [ ] Tags array formatı doğru mu?
- [ ] JSON alanları geçerli JSON mu?
- [ ] Supabase SQL editöründe test edildi mi?
