-- AcilEM — İlk 10 Yazılı İçerik Seed Data
-- Kullanım: Supabase SQL editörüne yapıştırın

INSERT INTO public.articles (title, slug, content_type, category, difficulty, body, key_points, reading_time, tags, status, published_at)
VALUES

-- 1. Kardiyoloji - STEMI
(
  'ST Elevasyonlu Miyokard İnfarktüsü (STEMI) Yönetimi',
  'stemi-yonetimi',
  'konu_anlatimi',
  'kardiyoloji',
  2,
  '## Tanım

ST elevasyonlu miyokard infarktüsü (STEMI), koroner arterin tam tıkanması sonucu miyokard dokusunun nekroze olduğu akut koroner sendromdur. Acil serviste hızlı tanı ve tedavi mortaliteyi doğrudan etkiler.

## Tanı Kriterleri

### EKG Bulguları
- **Yeni ST elevasyonu**: En az 2 ardışık derivasyonda
  - V2-V3: Erkeklerde ≥2 mm, kadınlarda ≥1.5 mm
  - Diğer derivasyonlar: ≥1 mm
- **Yeni sol dal bloğu** (LBBB): STEMI eşdeğeri kabul edilir
- **Posterior MI**: V1-V3''te ST depresyonu + V7-V9''da ST elevasyonu

### Biyobelirteçler
- **Troponin I/T**: 3-6 saatte yükselir, 12-24 saatte pik yapar
- Tedavi kararı troponin sonucu beklenmeden verilmelidir

## Acil Tedavi Protokolü

### İlk 10 Dakika
1. **Monitörizasyon**: Kardiyak monitör, pulse oksimetri
2. **IV erişim**: En az 2 geniş damar yolu
3. **12 derivasyonlu EKG**: İlk temas ≤10 dakika
4. **Aspirin 300 mg** çiğnetilir
5. **Oksijen**: SpO2 <90% ise

### Reperfüzyon Stratejisi
- **Primer PKG** (tercih): Kapı-balon süresi ≤90 dakika
- **Fibrinolitik**: PKG yapılamıyorsa, kapı-iğne süresi ≤30 dakika

### Adjuvan Tedavi
- **Heparin**: UFH veya enoksaparin
- **P2Y12 inhibitörü**: Klopidogrel, tikagrelor veya prasugrel
- **Nitrat**: Ağrı kontrolü (sağ ventrikül MI''da kontrendike)
- **Morfin**: Nitrata yanıtsız ağrıda
- **Beta-bloker**: Hemodinamik stabil hastalarda

## Komplikasyonlar
- Kardiyojenik şok
- Ventriküler fibrilasyon/taşikardi
- Mekanik komplikasyonlar (serbest duvar rüptürü, VSD, papiller kas rüptürü)
- Perikardit

## Özet
STEMI yönetiminde **zaman kritiktir**. Erken tanı, hızlı reperfüzyon ve uygun adjuvan tedavi mortaliteyi azaltır.',
  '["İlk 10 dakikada 12 derivasyon EKG çekilmelidir", "Aspirin 300 mg hemen çiğnetilir", "Primer PKG tercih edilen reperfüzyon yöntemidir", "Kapı-balon süresi ≤90 dakika hedeflenmelidir"]',
  8,
  ARRAY['stemi', 'aks', 'kardiyoloji', 'ekg', 'reperfüzyon'],
  'published',
  now() - interval '9 days'
),

-- 2. Resüsitasyon - Kardiyak Arrest
(
  'Erişkin Kardiyak Arrest Algoritması',
  'eriskin-kardiyak-arrest',
  'kilavuz_ozeti',
  'resüsitasyon',
  1,
  '## Genel Bakış

Kardiyak arrest, kalbin mekanik aktivitesinin durması ve dolaşımın sonlanmasıdır. Erken tanıma, kaliteli KPR ve erken defibrilasyon sağkalımı doğrudan etkiler.

## Şoklanabilir Ritimler

### Ventriküler Fibrilasyon (VF) / Nabızsız Ventriküler Taşikardi (nVT)
1. **KPR başla** + defibrilatör hazırla
2. **Defibrilasyon**: Bifazik 120-200J, monofazik 360J
3. Hemen KPR''a devam (2 dakika)
4. **Adrenalin 1 mg IV**: 2. şoktan sonra, her 3-5 dakikada
5. **Amiodaron 300 mg IV**: 3. şoktan sonra, ardından 150 mg

### Şoklanamaz Ritimler

### Asistoli / Nabızsız Elektriksel Aktivite (NEA)
1. **KPR başla** hemen
2. **Adrenalin 1 mg IV**: Hemen, her 3-5 dakikada tekrarla
3. **Geri dönüşümlü nedenleri düşün**: 5H-5T

## 5H ve 5T

| 5H | 5T |
|---|---|
| Hipoksi | Tansiyon pnömotoraks |
| Hipovolemi | Tamponad (kardiyak) |
| Hipo/hiperkalemi | Toksinler |
| Hipotermi | Tromboz (pulmoner) |
| Hidrojen iyonu (asidoz) | Tromboz (koroner) |

## Kaliteli KPR
- **Hız**: 100-120/dk
- **Derinlik**: 5-6 cm
- **Tam göğüs geri dönüşü** sağlanmalı
- **Kesintiler minimumda** tutulmalı (<10 sn)
- **Ventilasyon**: 30:2 (havayolu yoksa), sürekli KPR + 10/dk (ileri havayolunda)

## ROSC Sonrası
- Hedefli ısı yönetimi (32-36°C)
- 12 derivasyon EKG
- Hemodinamik stabilizasyon
- Nörolojik değerlendirme',
  '["Kaliteli KPR: 100-120/dk, 5-6 cm derinlik", "VF/nVT''de erken defibrilasyon hayat kurtarır", "Adrenalin her 3-5 dakikada 1 mg IV tekrarlanır", "5H-5T geri dönüşümlü nedenler her zaman düşünülmelidir"]',
  7,
  ARRAY['kpr', 'kardiyak arrest', 'acls', 'defibrilasyon', 'resüsitasyon'],
  'published',
  now() - interval '8 days'
),

-- 3. Travma - Primer Bakı
(
  'Travma Hastasında Primer Bakı (ABCDE)',
  'travma-primer-baki-abcde',
  'konu_anlatimi',
  'travma',
  1,
  '## Giriş

Travma hastasının sistematik değerlendirmesi, hayatı tehdit eden durumların hızlı tanınması ve müdahale edilmesi için kritiktir. ATLS (Advanced Trauma Life Support) yaklaşımı primer ve sekonder bakı olmak üzere iki aşamadan oluşur.

## A — Airway (Havayolu) + Servikal Stabilizasyon

### Değerlendirme
- Hasta konuşabiliyor mu?
- Stridor, horlama, gurgling var mı?
- Yabancı cisim, kan, sekresyon?

### Müdahale
- Çene itme manevrası (jaw thrust) — servikal yaralanma şüphesinde
- Orofaringeal/nazofaringeal airway
- Endotrakeal entübasyon veya cerrahi havayolu (gerekirse)
- **Servikal collar** her zaman uygulanmalı

## B — Breathing (Solunum)

### Değerlendirme
- Solunum sayısı, derinliği, paterni
- Göğüs hareketleri simetrik mi?
- Oskültasyon: her iki hemitoraks
- Perküsyon

### Acil Müdahale Gerektiren Durumlar
- **Tansiyon pnömotoraks**: İğne dekompresyon → tüp torakostomi
- **Açık pnömotoraks**: 3 taraflı kapatma
- **Masif hemotoraks**: Tüp torakostomi + sıvı resüsitasyonu
- **Yelken göğüs**: Ağrı kontrolü + pozitif basınçlı ventilasyon

## C — Circulation (Dolaşım)

### Değerlendirme
- Nabız (hız, ritim, dolgunluk)
- Tansiyon arteryel
- Kapiller dolum zamanı
- Dış kanama kontrolü

### Şok Sınıflaması
| Sınıf | Kan Kaybı | Nabız | TA |
|---|---|---|---|
| I | <750 ml (<15%) | <100 | Normal |
| II | 750-1500 ml (15-30%) | 100-120 | Normal |
| III | 1500-2000 ml (30-40%) | 120-140 | Düşük |
| IV | >2000 ml (>40%) | >140 | Çok düşük |

### Müdahale
- 2 geniş IV erişim (≥18G)
- Kristaloid başla, masif transfüzyon protokolü değerlendir
- Direkt bası ile kanama kontrolü
- Pelvik bağlayıcı (pelvis kırığı şüphesinde)

## D — Disability (Nörolojik)

- GKS (Glaskow Koma Skalası)
- Pupil boyutu ve reaktivitesi
- Lateralize edici bulgular
- Kan şekeri kontrolü

## E — Exposure (Maruz Bırakma)

- Tüm giysileri çıkar
- Baş-parmak ucu muayene
- Hipotermi önleme (ısıtılmış sıvılar, battaniye)
- Log-roll ile sırt muayenesi',
  '["ABCDE sistematik yaklaşımı takip edilmelidir", "Servikal stabilizasyon havayolu yönetimi ile eş zamanlı sağlanır", "Tansiyon pnömotoraks klinik tanıdır — iğne dekompresyon yapılır", "Hipotermi önleme kritiktir"]',
  10,
  ARRAY['travma', 'atls', 'abcde', 'primer bakı', 'şok'],
  'published',
  now() - interval '7 days'
),

-- 4. Noroloji - İnme
(
  'Akut İskemik İnme: Tanı ve Tedavi',
  'akut-iskemik-inme',
  'konu_anlatimi',
  'noroloji',
  2,
  '## Tanım

Akut iskemik inme, serebral arterin tıkanması sonucu beyin dokusunun iskemiye uğraması ve nörolojik defisit gelişmesidir. "Zaman beyindir" — her dakika yaklaşık 1.9 milyon nöron kaybedilir.

## Tanıma ve Değerlendirme

### Acil Triaj
- **FAST taraması**: Face (yüz düşüklüğü), Arm (kol düşmesi), Speech (konuşma bozukluğu), Time (zaman)
- **Semptom başlangıç zamanı**: Trombolitik kararı için kritik
- **Son normal görülme zamanı**: Wake-up stroke''ta önemli

### NIHSS (National Institutes of Health Stroke Scale)
- Bilinç düzeyi, bakış, görme alanı, yüz felci
- Motor güç (kol/bacak), ataksi, duyusal
- Dil, dizartri, ihmal (neglect)
- **Skor**: 0-42 (yüksek = ağır defisit)

## Acil Görüntüleme

### BT (Bilgisayarlı Tomografi)
- **Non-kontrast BT**: Kanama dışlama (≤25 dakika)
- Erken iskemik bulgular: sulkus silinmesi, insular ribbon sign, hiperdens MCA
- **ASPECTS skoru**: >7 ise trombolitik uygun

### BT Anjiografi
- Büyük damar oklüzyonu tespiti (LVO)
- Trombektomi kararı için gerekli

## Tedavi

### IV Trombolitik (Alteplaz)
- **Endikasyon**: Semptom başlangıcı ≤4.5 saat
- **Doz**: 0.9 mg/kg (maksimum 90 mg), %10 bolus, %90 infüzyon (60 dk)
- **Kapı-iğne süresi**: ≤60 dakika hedef

### Mekanik Trombektomi
- **Endikasyon**: Büyük damar oklüzyonu (ICA, M1, baziler)
- **Zaman penceresi**: ≤24 saat (görüntüleme eşliğinde seçilmiş hastalarda)
- **Kapı-kasık süresi**: ≤90 dakika hedef

### Genel Yönetim
- **Tansiyon**: Trombolitik öncesi <185/110, sonrası <180/105
- **Kan şekeri**: 140-180 mg/dL hedef
- **Ateş**: >38°C ise antipiretik
- **Yutma değerlendirmesi**: Oral alım öncesi mutlaka

## Kontrendikasyonlar (IV tPA)
- Aktif kanama
- Son 3 ayda intrakranial cerrahi/travma
- İntrakranial neoplazm
- Trombosit <100.000
- INR >1.7
- aPTT yüksek',
  '["FAST taraması ile hızlı tanıma sağlanmalıdır", "Non-kontrast BT ilk 25 dakikada çekilmelidir", "IV alteplaz 4.5 saat içinde uygulanabilir", "Büyük damar oklüzyonunda mekanik trombektomi değerlendirilmelidir"]',
  9,
  ARRAY['inme', 'iskemik inme', 'trombolitik', 'alteplaz', 'nihss'],
  'published',
  now() - interval '6 days'
),

-- 5. Enfeksiyon - Sepsis
(
  'Sepsis ve Septik Şok Yönetimi',
  'sepsis-septik-sok',
  'konu_anlatimi',
  'enfeksiyon',
  2,
  '## Tanım

Sepsis, enfeksiyona karşı düzensiz konak yanıtının neden olduğu hayatı tehdit eden organ disfonksiyonudur (Sepsis-3). Septik şok, yeterli sıvı resüsitasyonuna rağmen vazopressör gerektiren hipotansiyon + laktat >2 mmol/L durumudur.

## Tanı

### qSOFA (Hızlı Tarama)
- Sistolik TA ≤100 mmHg
- Solunum sayısı ≥22/dk
- Mental durum değişikliği (GKS <15)
- ≥2 kriter: Sepsis şüphesi → SOFA hesapla

### SOFA Skoru
- Solunum (PaO2/FiO2)
- Koagülasyon (trombosit)
- Karaciğer (bilirubin)
- Kardiyovasküler (MAP, vazopressör)
- Nörolojik (GKS)
- Renal (kreatinin, idrar çıkışı)
- **≥2 puan artışı**: Organ disfonksiyonu = Sepsis

## Surviving Sepsis — Saat 1 Paketi

### İlk 1 Saat İçinde
1. **Laktat ölçümü** — >2 mmol/L ise 6 saat içinde tekrarla
2. **Kan kültürü** (2 set) — antibiyotik öncesi
3. **Geniş spektrumlu antibiyotik** — tanıdan itibaren 1 saat içinde
4. **Kristaloid 30 mL/kg** — hipotansiyon veya laktat ≥4 ise
5. **Vazopressör** — sıvıya rağmen MAP <65 mmHg ise

### Antibiyotik Seçimi
- **Toplum kaynaklı**: Piperasilin-tazobaktam veya seftriakson + metronidazol
- **Hastane kaynaklı**: Meropenem veya piperasilin-tazobaktam ± vankomisin
- **Odak belirsiz**: Geniş spektrumlu + MRSA kapsamı değerlendir

### Vazopressör Seçimi
1. **Noradrenalin** (1. tercih): MAP ≥65 mmHg hedef
2. **Vazopressin**: Noradrenaline ek olarak
3. **Adrenalin**: Kardiyak disfonksiyon varsa

## Kaynak Kontrolü
- Apse drenajı
- İnfekte kateter çıkarılması
- Nekrotik doku debridmanı
- Perforasyon tamiri

## İzlem
- Saatlik vital bulgular
- Saatlik idrar takibi (≥0.5 mL/kg/sa hedef)
- Seri laktat ölçümü
- Organ fonksiyon testleri (6-12 saatte)',
  '["qSOFA ile hızlı tarama yapılmalıdır", "Saat 1 paketine hemen başlanmalıdır", "Kan kültürü antibiyotikten ÖNCE alınmalıdır", "Noradrenalin ilk tercih vazopressördür"]',
  8,
  ARRAY['sepsis', 'septik şok', 'enfeksiyon', 'surviving sepsis', 'qsofa'],
  'published',
  now() - interval '5 days'
),

-- 6. Pulmoner - Pulmoner Emboli
(
  'Pulmoner Emboli: Risk Değerlendirmesi ve Tedavi',
  'pulmoner-emboli',
  'konu_anlatimi',
  'pulmoner',
  2,
  '## Tanım

Pulmoner emboli (PE), pulmoner arter veya dallarının trombüs ile tıkanmasıdır. DVT kaynaklı trombüsler en sık nedendir. Tanınmadığında mortalite %30''a ulaşabilir.

## Risk Değerlendirmesi

### Wells Skoru
| Kriter | Puan |
|---|---|
| DVT klinik bulguları | 3 |
| PE en olası tanı | 3 |
| Kalp hızı >100 | 1.5 |
| Son 4 haftada immobilizasyon/cerrahi | 1.5 |
| Geçirilmiş DVT/PE | 1.5 |
| Hemoptizi | 1 |
| Aktif kanser | 1 |

- **≤4**: Düşük-orta olasılık → D-dimer
- **>4**: Yüksek olasılık → BT anjiografi

### PERC Kuralı (Düşük Klinik Şüphe)
Tüm kriterler negatif ise PE güvenle dışlanabilir:
- Yaş <50, nabız <100, SpO2 ≥95%
- Hemoptizi yok, östrojen kullanımı yok
- Geçirilmiş DVT/PE yok, unilateral bacak şişliği yok
- Son 4 haftada cerrahi/travma yok

## Tanı

### D-dimer
- Negatif prediktif değeri yüksek
- Yaşa göre ayarlanmış eşik: Yaş × 10 µg/L (50 yaş üstü)

### BT Pulmoner Anjiografi (BTPA)
- **Altın standart** tanı yöntemi
- Santral ve segmental PE''yi gösterir
- RV/LV oranı >0.9: Sağ ventrikül yüklenmesi

## Tedavi

### Masif PE (Hemodinamik Instabil)
- **Sistemik trombolitik**: Alteplaz 100 mg / 2 saat
- **Cerrahi embolektomi**: Trombolitik kontrendike ise
- **Kateter yönelimli tedavi**: Hibrit yaklaşım

### Submasif PE (RV Disfonksiyonu, Stabil)
- **Antikoagülasyon** başla
- Yakın monitörizasyon
- Trombolitik: Kötüleşme halinde değerlendir

### Düşük Riskli PE
- **Antikoagülasyon**: Heparin → DOAC (rivaroksaban, apiksaban)
- Ayaktan tedavi değerlendirilebilir (sPESI=0)

### Antikoagülasyon Süresi
- Provoke PE: 3 ay
- Unprovoke PE: En az 3 ay, uzun dönem değerlendir
- Kanser ilişkili: DOAC veya DMAH süresiz',
  '["Wells skoru ile klinik olasılık değerlendirilmelidir", "PERC negatif ise düşük şüphede PE dışlanabilir", "Masif PE''de sistemik trombolitik düşünülmelidir", "Antikoagülasyon süresi PE tipine göre belirlenir"]',
  9,
  ARRAY['pulmoner emboli', 'dvt', 'wells', 'trombolitik', 'antikoagülasyon'],
  'published',
  now() - interval '4 days'
),

-- 7. Toksikoloji - Parasetamol Zehirlenmesi
(
  'Parasetamol (Asetaminofen) Zehirlenmesi',
  'parasetamol-zehirlenmesi',
  'konu_anlatimi',
  'toksikoloji',
  2,
  '## Epidemiyoloji

Parasetamol, dünya genelinde en sık ilaç zehirlenmesi nedenidir. Toksik doz >150 mg/kg (erişkin) veya >200 mg/kg (çocuk) olarak kabul edilir. Tedavi edilmezse fulminan karaciğer yetmezliğine yol açabilir.

## Patofizyoloji

Normal dozda parasetamolün %90''ı sülfat ve glukuronid konjugasyonu ile metabolize edilir. Toksik dozda bu yollar doygunluğa ulaşır ve CYP2E1 ile toksik metabolit **NAPQI** oluşur. Glutatyon depoları tükenince NAPQI hepatosit nekrozuna yol açar.

## Klinik Evreler

| Evre | Süre | Bulgular |
|---|---|---|
| 1 | 0-24 saat | Bulantı, kusma, iştahsızlık (veya asemptomatik) |
| 2 | 24-72 saat | Sağ üst kadran ağrısı, transaminaz yükselmesi |
| 3 | 72-96 saat | Pik hepatotoksisite, koagülopati, ensefalopati |
| 4 | 4-14 gün | İyileşme veya ölüm |

## Değerlendirme

### Laboratuvar
- **Parasetamol düzeyi**: 4. saatten sonra (akut alım)
- Transaminazlar (AST, ALT)
- INR, bilirubin, kreatinin
- Laktat, kan gazı
- Kan şekeri

### Rumack-Matthew Nomogramı
- 4. saat parasetamol düzeyi ile değerlendirilir
- **Tedavi hattı**: 150 µg/mL (4. saat) — 37.5 µg/mL (12. saat)
- Hattın üstü: NAC endikasyonu var

## Tedavi

### Gastrointestinal Dekontaminasyon
- **Aktif kömür**: Alımdan sonra ≤2 saat içinde, 1 g/kg (maks 50 g)
- 2 saatten sonra faydası sınırlı

### N-Asetilsistein (NAC)
Antidot — glutatyon öncüsü olarak NAPQI''yı nötralize eder.

#### IV Protokol (21 saat)
1. **Yükleme**: 150 mg/kg, 200 mL %5 dekstroz içinde, 1 saatte
2. **2. infüzyon**: 50 mg/kg, 500 mL içinde, 4 saatte
3. **3. infüzyon**: 100 mg/kg, 1000 mL içinde, 16 saatte

#### NAC Endikasyonları
- Nomogram tedavi hattı üstü
- Alım zamanı bilinmiyor + parasetamol düzeyi >10 µg/mL
- ALT yüksek + parasetamol alım öyküsü
- Fulminan karaciğer yetmezliği bulguları

### Karaciğer Transplantasyonu
King''s College Kriterleri karşılanırsa transplant değerlendirilir:
- pH <7.3 (resüsitasyon sonrası)
- VEYA: INR >6.5 + Kreatinin >3.4 mg/dL + Evre III/IV ensefalopati',
  '["Toksik doz erişkinde >150 mg/kg''dır", "4. saat parasetamol düzeyi nomogram ile değerlendirilir", "NAC 8 saat içinde başlanırsa hepatotoksisite büyük oranda önlenir", "Aktif kömür alımdan sonra ilk 2 saat içinde etkilidir"]',
  8,
  ARRAY['parasetamol', 'asetaminofen', 'zehirlenme', 'nac', 'toksikoloji'],
  'published',
  now() - interval '3 days'
),

-- 8. Pediatri - Pediatrik Sıvı Tedavisi
(
  'Pediatrik Dehidratasyon ve Sıvı Tedavisi',
  'pediatrik-dehidratasyon-sivi-tedavisi',
  'konu_anlatimi',
  'pediatri',
  2,
  '## Giriş

Dehidratasyon, çocuk acil servislerinde en sık karşılaşılan durumlardan biridir. Gastroenterit en sık nedendir. Dehidratasyon derecesinin doğru değerlendirilmesi, uygun sıvı tedavisi planının temelini oluşturur.

## Dehidratasyon Değerlendirmesi

### Klinik Bulgular

| Bulgu | Hafif (3-5%) | Orta (6-9%) | Ağır (≥10%) |
|---|---|---|---|
| Genel durum | İyi, huzursuz | Huzursuz, irritabl | Letarjik, bilinç bulanık |
| Gözyaşı | Var | Azalmış | Yok |
| Mukoza | Nemli | Kuru | Çok kuru |
| Turgor | Normal | Azalmış | Çadır belirtisi |
| Fontanel | Normal | Çökük | Belirgin çökük |
| Kapiller dolum | <2 sn | 2-3 sn | >3 sn |
| Kalp hızı | Normal | Artmış | Belirgin artmış |
| İdrar | Hafif azalmış | Oligüri | Anüri |

## Tedavi Yaklaşımı

### Hafif-Orta Dehidratasyon: Oral Rehidratasyon
- **ORS (Oral Rehidratasyon Solüsyonu)**: Tercih edilen yol
- **Doz**: 50-100 mL/kg, 4 saat içinde (küçük yudumlarda)
- **Kusma**: 5-10 dakika bekle, küçük hacimlerle tekrar dene
- Başarısız ise → IV veya nazogastrik sıvı

### Ağır Dehidratasyon: IV Sıvı
#### Bolus
- **SF %0.9 veya Ringer Laktat**: 20 mL/kg, 20-60 dakikada
- Gerekirse 2-3 kez tekrarla (toplam 60 mL/kg''a kadar)
- Her bolustan sonra yeniden değerlendir

#### İdame + Açık Replasman
- **İdame hesabı (Holliday-Segar)**:
  - İlk 10 kg: 100 mL/kg/gün
  - 10-20 kg: +50 mL/kg/gün
  - >20 kg: +20 mL/kg/gün
- **Açık replasman**: Tahmin edilen kayıp hacmi, 24-48 saatte yerine konur
- **Sıvı tipi**: %5 dekstroz + SF %0.9 (veya %0.45 NaCl)

### Elektrolit Düzeltme
- **Hiponatremi**: Na <130: Yavaş düzeltme (<10 mEq/L/gün)
- **Hipernatremi**: Na >150: Yavaş düzeltme (<12 mEq/L/gün), serbest su açığı hesapla
- **Hipokalemi**: K replasman (IV: maks 0.5 mEq/kg/sa)

## Red Bayrakları
- Letarji, bilinç değişikliği
- Kapiller dolum >3 saniye
- Taşikardi + hipotansiyon
- 8 saatten uzun süre idrar yapamama
- Kanlı ishal
- Bilious (safralı) kusma
- Ateş + toksik görünüm',
  '["Dehidratasyon derecesi klinik bulgularla değerlendirilir", "ORS hafif-orta dehidratasyonda ilk tercih tedavidir", "IV bolus: SF %0.9 veya RL, 20 mL/kg", "Holliday-Segar formülü ile idame sıvı hesaplanır"]',
  9,
  ARRAY['pediatri', 'dehidratasyon', 'sıvı tedavisi', 'ors', 'elektrolit'],
  'published',
  now() - interval '2 days'
),

-- 9. Vaka Tartışması - Anfilaksi
(
  'Vaka: 28 Yaşında Kadın — Arı Sokması Sonrası Şok',
  'vaka-anfilaksi-ari-sokmasi',
  'vaka_tartismasi',
  'genel',
  1,
  '## Başvuru

28 yaşında kadın hasta, piknik alanında arı sokmasından 15 dakika sonra acil servise getirildi.

### Şikayet
- Yaygın kaşıntı ve kızarıklık
- Nefes darlığı
- Baş dönmesi

### Vital Bulgular
- TA: 75/40 mmHg
- Nabız: 130/dk
- SpO2: %89
- Solunum: 28/dk

### Fizik Muayene
- Yaygın ürtiker ve anjiyoödem
- Dudak ve dilde şişlik
- İnspiratuvar stridor
- Wheezing bilateral
- Bilinç konfüze

## Soru: Bu hastada ilk müdahaleniz ne olmalıdır?

---

## Tanı: Anfilaksi + Anfilaktik Şok

### Anfilaksi Tanı Kriterleri (≥1 yeterli)
1. Deri/mukoza tutulumu + solunum güçlüğü VEYA hipotansiyon
2. Bilinen alerjen maruziyeti + ≥2 organ tutulumu
3. Bilinen alerjen + hipotansiyon

Bu hastada 3 kriter de karşılanıyor: ürtiker + stridor + hipotansiyon.

## Tedavi Yaklaşımı

### 1. Adrenalin (İlk ve En Önemli İlaç)
- **Doz**: 0.3-0.5 mg IM (1:1000), uyluk anterolateraline
- 5-15 dakikada yanıt yoksa tekrarla
- **IM adrenalin GECİKTİRİLMEMELİDİR**

### 2. Havayolu
- Yüksek akım O2 (15 L/dk, maske ile)
- Entübasyon hazırlığı (hızlı ilerleme riski)
- Cerrahi havayolu hazırlığı

### 3. Sıvı Resüsitasyonu
- SF %0.9: 20 mL/kg bolus
- Gerekirse tekrarla (kapiller kaçak nedeniyle agresif sıvı)

### 4. Adjuvan İlaçlar
- **Salbutamol nebülizasyon**: Bronkospazm için
- **Difenhidramin** (H1 bloker): 25-50 mg IV
- **Ranitidin** (H2 bloker): 50 mg IV
- **Metilprednizolon**: 1-2 mg/kg IV (bifazik reaksiyon önlemi)

### 5. Dirençli Şokta
- Adrenalin infüzyonu: 0.1-1 µg/kg/dk
- Glukagon: Beta-bloker kullanan hastalarda

## Vaka Sonucu

Hastaya hemen IM adrenalin 0.5 mg uygulandı. 2 L SF bolus verildi. 5 dakikada TA: 95/60, nabız: 110, SpO2: %94''e yükseldi. Adrenalin 10 dakika sonra tekrarlandı. Nebülizasyon, antihistaminik ve steroid eklendi. 1 saat sonra TA: 120/75, nabız: 85, SpO2: %99. 24 saat gözlem sonrası adrenalin oto-enjektör reçetesiyle taburcu edildi.

## Anahtar Dersler
- Anfilakside **adrenalin ilk ve en önemli ilaçtır**
- IM yol tercih edilir, subkutan verilmemelidir
- Bifazik reaksiyon riski nedeniyle en az 6-24 saat gözlem
- Taburculukta adrenalin oto-enjektör + alerji konsültasyonu',
  '["Anfilakside adrenalin GECİKTİRİLMEMELİDİR — IM 0.3-0.5 mg", "IM uyluk anterolateraline uygulanır, subkutan DEĞİL", "Agresif sıvı resüsitasyonu kapiller kaçak nedeniyle gereklidir", "Taburculukta adrenalin oto-enjektör reçete edilmelidir"]',
  7,
  ARRAY['anfilaksi', 'adrenalin', 'alerji', 'şok', 'vaka'],
  'published',
  now() - interval '1 day'
),

-- 10. Pearl - EKG
(
  'Pearl: Hiperkalemi EKG Bulguları — Kaçırma!',
  'pearl-hiperkalemi-ekg',
  'pearl',
  'kardiyoloji',
  1,
  '## Neden Önemli?

Hiperkalemi, acil serviste en tehlikeli elektrolit bozukluklarından biridir. EKG değişiklikleri K+ düzeyi ile doğrudan korelasyon göstermeyebilir — **herhangi bir EKG değişikliği acil tedavi endikasyonudur**.

## EKG Bulguları (K+ Yükseldikçe)

### K+ 5.5-6.5 mEq/L
- **Sivri T dalgaları** (tall, peaked T waves)
  - Dar tabanlı, simetrik, yüksek
  - En erken ve en sık bulgu
  - En belirgin: V2-V4 derivasyonları

### K+ 6.5-7.5 mEq/L
- **PR uzaması** (1. derece AV blok)
- **P dalgası amplitüd azalması**
- QRS genişlemesi başlar

### K+ 7.5-8.0 mEq/L
- **P dalgası kaybolur**
- **QRS belirgin genişleme**
- Sinüzoidal patern (sine wave) başlar

### K+ >8.0 mEq/L
- **Sine wave paterni** (genişlemiş QRS + T dalgası birleşimi)
- VF / asistoli riski çok yüksek
- **Acil müdahale gerektirir**

## Tedavi Sıralaması

### 1. Kardiyak Membran Stabilizasyonu
- **Kalsiyum glukonat %10**: 10-20 mL IV, 2-3 dakikada
- EKG değişikliği 1-3 dakikada düzelir
- K+ düzeyini DEĞİŞTİRMEZ — sadece kardiyotoksisiteye karşı korur

### 2. K+ Hücre İçine Kaydırma
- **İnsülin 10 Ü + %50 Dekstroz 50 mL** IV
- **Salbutamol 10-20 mg** nebülizasyon
- **NaHCO3**: Asidoz varsa

### 3. K+ Vücuttan Uzaklaştırma
- **Furosemid**: Renal fonksiyon yeterliyse
- **Patiromer / Sodyum zirkonyum**: Oral K+ bağlayıcı
- **Hemodiyaliz**: Refrakter veya renal yetmezlik

## Pratik İpuçları
- Sivri T dalgasını gördüğünde K+ düşün
- Geniş QRS + bradikardi = hiperkalemi olabilir
- Diyaliz hastalarında rutin EKG kontrolü yap
- EKG değişikliği varsa tedaviyi lab sonucu beklemeden başla',
  '["Sivri T dalgası hiperkaleminin en erken EKG bulgusudur", "Kalsiyum glukonat ilk verilir — kardiyoprotektiftir", "İnsülin + dekstroz K+''u hücre içine kaydırır", "EKG değişikliği varsa lab sonucu beklenmez"]',
  4,
  ARRAY['hiperkalemi', 'ekg', 'elektrolit', 'pearl', 'kalsiyum'],
  'published',
  now()
);
