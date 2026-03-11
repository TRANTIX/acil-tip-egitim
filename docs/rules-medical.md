# Tıbbi İçerik Kuralları

## Genel Prensipler
- Tüm içerik **acil tıp asistanları** hedef kitlesidir (TUS sonrası, asistanlık eğitimi döneminde).
- Eğitim amaçlıdır — kesinlikle klinik karar desteği aracı değildir.
- Her sayfada tıbbi disclaimer bulunmalıdır:
  > "Bu içerik eğitim amaçlıdır. Klinik kararlar hasta değerlendirmesi, güncel kılavuzlar ve klinik deneyim ile verilmelidir."

## Kaynak ve Kanıt Standartları

### Kabul Edilen Kaynaklar
- Uluslararası kılavuzlar: AHA, ERC, ATLS, ACLS, PALS, Surviving Sepsis Campaign, AHA/ASA İnme Kılavuzu, GINA, BTS, ESC, ACC
- Başvuru kitapları: Tintinalli's Emergency Medicine, Roberts & Hedges, Rosen's Emergency Medicine, Braunwald's Heart Disease, Walls' Manual of Emergency Airway Management
- Peer-reviewed makaleler: NEJM, Lancet, JAMA, BMJ, Circulation, Annals of Emergency Medicine, Academic Emergency Medicine
- Türkiye güncel kılavuzları: TÜSAD, TKD, Türk Nöroloji Derneği (varsa)

### Kaynak Gösterimi
- Her içerikte `source` veya `source_references` alanı doldurulmalıdır.
- Format: `Yazar Soyadı İlk Harf, et al. Dergi Adı Yıl` veya `Kılavuz Adı Yıl`
- Quiz sorularında açıklama sonunda kaynak belirtilmelidir.
- Hesaplayıcılarda orijinal makale referansı verilmelidir.

### Güncellik
- İçerik en fazla **5 yıllık** kılavuzlara dayanmalıdır (tercihen son 3 yıl).
- Güncellenen kılavuz varsa (örn. AHA 2020 → 2025) içerik revize edilmelidir.
- Tartışmalı konularda birden fazla kılavuz görüşü sunulmalıdır.

## İçerik Türlerine Göre Kurallar

### Yazılı İçerikler (Articles)

#### Zorunlu Alanlar
| Alan | Açıklama |
|------|----------|
| `title` | Türkçe, açık ve tanımlayıcı |
| `slug` | Küçük harf, tire ile ayrılmış, Türkçe karaktersiz (ö→o, ü→u, ş→s, ç→c, ğ→g, ı→i) |
| `content_type` | `konu_anlatimi`, `kilavuz_ozeti`, `vaka_tartismasi`, `pearl`, `makale_ozeti` |
| `category` | Tek kelime, küçük harf: `kardiyoloji`, `travma`, `noroloji`, `resüsitasyon`, `toksikoloji`, `enfeksiyon`, `pediatri`, `pulmoner`, `genel` |
| `difficulty` | 1 (kolay/asistan 1), 2 (orta/asistan 2-3), 3 (zor/asistan 4-5), 4 (ileri/uzman) |
| `body` | Markdown formatında (aşağıya bak) |
| `key_points` | 3-5 madde, string array |
| `reading_time` | Dakika cinsinden tahmini okuma süresi |
| `tags` | 3-6 etiket, küçük harf, ilgili anahtar kelimeler |
| `status` | `draft` → `review` → `published` |

#### İçerik Yapısı (Markdown)
```markdown
## Tanım / Giriş
(Hastalık/konunun kısa tanımı, epidemiyoloji)

## Tanı / Değerlendirme
(Klinik bulgular, tanı kriterleri, skorlama)

## Tedavi / Yönetim
(Basamaklı tedavi yaklaşımı, ilaç dozları)

## Komplikasyonlar / Özel Durumlar
(Opsiyonel, gerekiyorsa)

## Özet
(2-3 cümle ana mesaj)
```

#### content_type'a Göre Kurallar
- **konu_anlatimi**: Sistematik, ders formatı. Tablo ve listeler yoğun kullanılmalı.
- **kilavuz_ozeti**: Spesifik bir kılavuzun (ör. AHA 2020 ACLS) Türkçe özeti. Kılavuz adı ve yılı belirtilmeli.
- **vaka_tartismasi**: Senaryo + soru + tartışma formatı. Vital bulgular, fizik muayene, lab ve tedavi adımları dahil.
- **pearl**: Kısa (4-8 dk okuma), pratik, klinik ipucu. Tek bir konuya odaklı.
- **makale_ozeti**: Belirli bir araştırma makalesinin Türkçe özeti. PICO formatı tercih edilir.

### Quiz Soruları (Questions)

#### Zorunlu Alanlar
| Alan | Açıklama |
|------|----------|
| `topic` | Kategori ile aynı: `kardiyoloji`, `travma`, `noroloji` vb. |
| `difficulty` | 1-4 (aynı skala) |
| `question_text` | Klinik senaryo bazlı tercih edilir. Kök soru net olmalı. |
| `options` | Tam 4 seçenek, `{text, is_correct}` formatında. Tek doğru cevap. |
| `explanation` | Neden doğru cevap doğru + neden diğerleri yanlış. Kaynak belirtilmeli. |
| `source` | Kaynak kitap/kılavuz/makale |

#### Soru Yazım Kuralları
- Klinik senaryo bazlı sorular tercih edilir (yaş, cinsiyet, şikayet, bulgu).
- "Aşağıdakilerden hangisi" formatı kabul edilir ama vaka bazlı daha öğreticidir.
- Negatif kök ("hangisi YOKTUR", "hangisi DEĞİLDİR") büyük harfle vurgulanmalı.
- Seçenekler aynı uzunlukta ve paralel yapıda olmalı (tümü isim veya tümü cümle).
- "Hepsi" ve "hiçbiri" seçeneklerinden kaçınılmalı.
- Açıklama en az 2-3 cümle olmalı, sadece doğru cevabı değil diğer seçenekleri de neden yanlış olduğunu açıklamalı.
- Her 10 sorudan en az 2'si zorluk 1 (kolay), en az 2'si zorluk 3-4 (zor) olmalı.

### AI Simülasyon Senaryoları (Scenarios)

#### Zorunlu Alanlar
| Alan | Açıklama |
|------|----------|
| `title` | Şikayet bazlı başlık: "Ana Şikayet — Tanı" |
| `category` | Aynı kategori sistemi |
| `difficulty` | 1 (kolay, tek tanı), 2 (orta, diferansiyel gerektirir), 3 (zor, çoklu sorun) |
| `patient_info` | `{age, gender, chief_complaint, history}` — gerçekçi ve detaylı |
| `system_prompt` | Claude'a verilen talimat: tanı, beklenen bulgular, tedavi yanıtları |
| `initial_vitals` | `{hr, bp, rr, spo2, temp, gcs}` — tanıya uygun |
| `ideal_actions` | 4-6 adım, `{step, action, reasoning, critical}` |

#### Senaryo Yazım Kuralları
- Hasta bilgisi gerçekçi olmalı (yaş-hastalık uyumu, hikaye tutarlılığı).
- System prompt: AI'ın her duruma nasıl yanıt vereceğini detaylı tanımlamalı.
- Yanlış tedaviye kötüleşme, doğru tedaviye düzelme yanıtı tanımlanmalı.
- Vital bulgular başlangıçta tanıya uygun olmalı.
- `ideal_actions` içinde en az 3 adım `critical: true` olmalı.
- Lab/görüntüleme sonuçları tanıyla tutarlı ve gerçekçi değerlerde olmalı.

### Prosedürler (Procedures)

#### Zorunlu Alanlar
| Alan | Açıklama |
|------|----------|
| `title` | Prosedür adı, Türkçe |
| `category` | `havayolu`, `solunum`, `dolaşım`, `noroloji`, `travma`, `diger` |
| `indications` | Satır satır, her satır bir endikasyon |
| `contraindications` | Satır satır, "Relatif:" ile relative kontrendikasyonlar işaretlenir |
| `equipment` | `{name, optional?}` array |
| `steps` | `{order, title, description, warning?}` array, sıralı |
| `tips` | Pratik ipuçları, deneyim bazlı |
| `complications` | Satır satır |

#### Prosedür Yazım Kuralları
- Adımlar kronolojik sırada olmalı.
- Her adımda "ne yapılacak" açıkça tanımlanmalı.
- Kritik uyarılar `warning` alanına yazılmalı (hayati tehlike, yaygın hata).
- Ekipman listesi tam olmalı, opsiyonel malzemeler `optional: true` ile işaretlenmeli.
- Prosedür 6-10 adım arasında olmalı (çok kısa veya çok uzun olmamalı).

### Algoritmalar (Algorithms)

#### Zorunlu Alanlar
| Alan | Açıklama |
|------|----------|
| `title` | Algoritma adı |
| `category` | Aynı kategori sistemi |
| `flowchart_data.mermaid` | Mermaid.js flowchart syntax |
| `description` | Algoritmanın Türkçe açıklaması |
| `source_references` | Kaynak kılavuz |

#### Mermaid Flowchart Kuralları
- `graph TD` (top-down) kullanılmalı.
- Karar noktaları `{}` (eşkenar dörtgen) ile.
- Eylemler `[]` (dikdörtgen) ile.
- Türkçe karakterler kullanılabilir.
- Koşul etiketleri `-->|koşul|` formatında.
- Maksimum 15-20 node (okunabilirlik için).

### Hesaplayıcılar (Calculators)

#### JSON Yapısı
```json
{
  "id": "slug-formati",
  "name": "Tam Türkçe Ad",
  "shortName": "Kısaltma",
  "category": "kategori",
  "description": "Tek cümle açıklama",
  "fields": [
    {
      "id": "alan_adi",
      "label": "Türkçe Etiket",
      "type": "select",
      "options": [
        { "value": 0, "label": "Seçenek (0)" }
      ]
    }
  ],
  "calculate": "sum",
  "minScore": 0,
  "maxScore": 10,
  "interpretation": [
    { "min": 0, "max": 3, "label": "Düşük Risk", "color": "green", "description": "Açıklama" }
  ],
  "clinicalNote": "Klinik not",
  "source": "Orijinal makale referansı",
  "disclaimer": "Bu hesaplayıcı eğitim amaçlıdır..."
}
```

#### Hesaplayıcı Kuralları
- Orijinal skorlama sistemiyle birebir uyumlu olmalı.
- Her seçenekte puan değeri parantez içinde gösterilmeli.
- `interpretation` renk kodları: `green` (düşük risk), `yellow` (orta), `red` (yüksek risk).
- `clinicalNote`: En kritik klinik uyarı (tek cümle).
- `disclaimer` her hesaplayıcıda olmalı.

### Atlas Görselleri (AtlasImage)

#### Zorunlu Alanlar
| Alan | Açıklama |
|------|----------|
| `title` | Tanımlayıcı başlık |
| `atlas_type` | `ekg`, `rontgen`, `bt`, `usg`, `klinik_foto` |
| `category` | Aynı kategori sistemi |
| `image_url` | Orijinal görsel URL |
| `diagnosis` | Tanı |
| `description` | Detaylı bulgular açıklaması |
| `key_findings` | String array, her biri bir bulgu |

#### Görsel Kuralları
- Görseller telif hakları açısından uygun olmalı (CC lisanslı, kendi üretim, izinli).
- Hasta bilgileri anonimize edilmiş olmalı (DICOM metadata temizlenmiş).
- EKG'ler okunabilir çözünürlükte (en az 1200px genişlik).
- `annotated_url`: İşaretli/oklu versiyon (opsiyonel ama tercih edilen).
- `normal_url`: Karşılaştırma için normal örnek (opsiyonel).

## İlaç Bilgisi Kuralları
- Dozlar güncel kılavuzlara göre verilmeli.
- Birim: mg/kg, mg, mL, Ünite — tutarlı kullanım.
- Pediatrik ve erişkin dozları ayrı belirtilmeli.
- Kontrendikasyonlar ve önemli yan etkiler vurgulanmalı.
- Jenerik isim kullanılmalı (ticari isim opsiyonel olarak eklenebilir).

## Dil ve Terminoloji

### Türkçe Kullanımı
- Tüm UI ve içerik Türkçe olmalı.
- Tıbbi terimler: Türkçe karşılığı varsa önce Türkçe, parantez içinde orijinal (ör. "Kalp durması (kardiyak arrest)").
- Kısaltmalar ilk kullanımda açılmalı: "KPR (kardiyopulmoner resüsitasyon)".
- Uluslararası kabul görmüş kısaltmalar korunabilir: STEMI, ACLS, GKS, NIHSS.

### Tutarlılık
- Aynı kavram için her yerde aynı terim kullanılmalı.
- Kategori isimleri: `kardiyoloji`, `travma`, `noroloji` (ö→o), `resüsitasyon`, `toksikoloji`, `enfeksiyon`, `pediatri`, `pulmoner`, `genel`
- Zorluk seviyeleri: 1-4 (tüm içerik türlerinde aynı skala)

## Hasta Güvenliği
- "Bu tedaviyi uygulayın" yerine "Bu tedavi önerilmektedir" gibi önerici dil kullanılmalı.
- Hayati tehlikeli durumlar kalın (bold) ile vurgulanmalı.
- Kontrendikasyonlar açıkça belirtilmeli.
- Pediatrik dozlar ile erişkin dozlar karıştırılmamalı.
- Off-label kullanımlar belirtilmeli.
