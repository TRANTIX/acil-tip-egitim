-- AcilEM — İlk 5 AI Simülasyon Senaryosu Seed Data
-- Kullanım: Supabase SQL editörüne yapıştırın

INSERT INTO public.scenarios (title, category, difficulty, patient_info, system_prompt, initial_vitals, lab_results, imaging_results, ideal_actions, tags, status)
VALUES

-- 1. STEMI — Kolay
(
  'Akut Göğüs Ağrısı — STEMI',
  'kardiyoloji',
  1,
  '{"age": 58, "gender": "erkek", "chief_complaint": "Göğüs ağrısı, 2 saattir devam eden baskı tarzında retrosternal ağrı", "history": "HT, DM tip 2, sigara 30 paket-yıl. Aspirin kullanmıyor. Ağrı sol kola yayılıyor, terleme ve bulantı eşlik ediyor."}',
  'Bu bir STEMI (ST elevasyonlu miyokard infarktüsü) senaryosudur. Hasta inferior STEMI ile prezente olmaktadır.

EKG bulguları: DII, DIII, aVF''de belirgin ST elevasyonu (3-4 mm), V1-V3''te resiprokal ST depresyonu.

Lab sonuçları istenirse:
- Troponin I: 2.4 ng/mL (yüksek, normal <0.04)
- CK-MB: 45 U/L (yüksek)
- CBC, BMP normal
- INR: 1.0

Tedavi verilince: Aspirin + P2Y12 + heparin + PKG aktivasyonu beklenir.
Doğru tedavi başlandığında vital bulgular düzelmeye başlar.',
  '{"hr": 95, "bp": "145/90", "rr": 20, "spo2": 96, "temp": 36.8, "gcs": 15}',
  '{"troponin_i": "2.4 ng/mL (yüksek)", "ck_mb": "45 U/L (yüksek)", "cbc": "normal", "bmp": "normal", "inr": "1.0", "glukoz": "186 mg/dL"}',
  '{"ekg": "DII, DIII, aVF: ST elevasyonu 3-4 mm. V1-V3: resiprokal ST depresyonu. Sinüs ritmi.", "pa_grafi": "Kardiyomegali yok, pulmoner ödem yok."}',
  '[{"step": 1, "action": "Monitör + IV erişim + O2", "reasoning": "Tüm AKS hastalarında ilk adım", "critical": true}, {"step": 2, "action": "12 derivasyonlu EKG", "reasoning": "STEMI tanısı için kritik", "critical": true}, {"step": 3, "action": "Aspirin 300 mg PO", "reasoning": "AKS''de mortaliteyi azaltır", "critical": true}, {"step": 4, "action": "Klopidogrel/tikagrelor + Heparin", "reasoning": "Antiplatelet + antikoagülan tedavi", "critical": true}, {"step": 5, "action": "Kateter lab aktivasyonu (PKG)", "reasoning": "STEMI''de primer PKG ilk tercih", "critical": true}]',
  ARRAY['AKS', 'STEMI', 'kardiyoloji', 'EKG'],
  'published'
),

-- 2. Sepsis — Orta
(
  'Ateş ve Bilinç Değişikliği — Sepsis',
  'enfeksiyon',
  2,
  '{"age": 72, "gender": "kadın", "chief_complaint": "3 gündür ateş, son 6 saatte bilinç bulanıklığı", "history": "DM tip 2, KBY evre 3, idrar yolu enfeksiyonu öyküsü. Son 1 haftadır dizüri ve sık idrara çıkma şikayeti var."}',
  'Bu bir ürosepsis senaryosudur. Hasta ağır sepsis / septik şok tablosuna ilerlemektedir.

Fizik muayene: Ateşli, takipneik, konfüze (GKS 13: E3V4M6). Suprapubik hassasiyet. Kostovertebral açı hassasiyeti sağda pozitif. Ekstremiteler sıcak.

Lab sonuçları istenirse:
- Lökosit: 22.000/mm³ (yüksek)
- Laktat: 4.2 mmol/L (yüksek, >4 ciddi)
- CRP: 245 mg/L, Prokalsitonin: 8.5 ng/mL
- Kreatinin: 2.4 mg/dL (bazal 1.4)
- İdrar analizi: Lökositüri, nitrit +, bakteri +++

Tedavi başlanmazsa vital bulgular kötüleşir (KB düşer, laktat artar).
Antibiyotik + sıvı başlandığında stabilizasyon beklenir.',
  '{"hr": 115, "bp": "88/52", "rr": 26, "spo2": 93, "temp": 39.2, "gcs": 13}',
  '{"lokosit": "22.000/mm³", "hemoglobin": "10.2 g/dL", "trombosit": "128.000", "laktat": "4.2 mmol/L", "crp": "245 mg/L", "prokalsitonin": "8.5 ng/mL", "kreatinin": "2.4 mg/dL", "bun": "48 mg/dL", "glukoz": "220 mg/dL", "idrar": "Lökositüri +++, nitrit +, bakteri +++"}',
  '{"pa_grafi": "Normal akciğer alanları, plevral efüzyon yok.", "batın_usg": "Sağ böbrekte grade 2 hidronefroz, mesane duvarı kalınlaşmış."}',
  '[{"step": 1, "action": "IV erişim + SF 30 mL/kg bolus başla", "reasoning": "Sepsis''te sıvı resüsitasyonu 1. saat hedefi", "critical": true}, {"step": 2, "action": "Kan kültürü + idrar kültürü al", "reasoning": "Antibiyotik öncesi kültür alınmalı", "critical": true}, {"step": 3, "action": "Geniş spektrum antibiyotik IV", "reasoning": "1 saat içinde ampirik antibiyotik başlanmalı", "critical": true}, {"step": 4, "action": "Laktat ölçümü", "reasoning": "Sepsis ağırlık değerlendirmesi", "critical": true}, {"step": 5, "action": "Norepinefrin düşün (sıvıya yanıt yoksa)", "reasoning": "MAP >65 mmHg hedefi", "critical": false}]',
  ARRAY['sepsis', 'enfeksiyon', 'ürosepsis', 'şok'],
  'published'
),

-- 3. Kafa Travması — Orta
(
  'Trafik Kazası — Kafa Travması',
  'travma',
  2,
  '{"age": 34, "gender": "erkek", "chief_complaint": "Araç içi trafik kazası, emniyet kemeri yok, başını ön camlamaya çarpmış", "history": "Bilinen hastalığı yok. Olay yerinde kısa süreli bilinç kaybı (1-2 dk) olmuş. Şu an konfüze."}',
  'Bu bir kafa travması + subdural hematom senaryosudur.

Primer bakı (ABCDE):
- A: Havayolu açık, konuşuyor ama konfüze
- B: Bilateral solunum sesleri eşit, RR 18
- C: Taşikardik, periferik nabızlar alınıyor
- D: GKS 12 (E3V4M5), sol pupil 4 mm reaktif, sağ pupil 3 mm reaktif
- E: Frontal bölgede 5 cm laserasyon, şişlik. Diğer travma bulgusu yok.

BT istenirse: Sol frontoparietal akut subdural hematom (8 mm), hafif orta hat kayması (3 mm).
Servikal BT: Normal.

Tedavi başlanmazsa GKS düşer, pupil dilate olur.
Nöroşirürji konsültasyonu ve anti-ödem tedavi beklenir.',
  '{"hr": 105, "bp": "155/95", "rr": 18, "spo2": 97, "temp": 36.6, "gcs": 12}',
  '{"cbc": "Hb 13.2, Plt 210.000, Lökosit 12.000", "bmp": "Normal", "inr": "1.1", "laktat": "1.8 mmol/L", "etanol": "Negatif"}',
  '{"bt_beyin": "Sol frontoparietal akut subdural hematom (8 mm kalınlık), 3 mm sola orta hat kayması, bazal sisternler açık.", "bt_servikal": "Kırık veya dislokasyon yok.", "pa_grafi": "Pnömotoraks yok, mediasten normal."}',
  '[{"step": 1, "action": "ABCDE yaklaşımı ile primer bakı", "reasoning": "Travma hastasında sistematik değerlendirme", "critical": true}, {"step": 2, "action": "Servikal immobilizasyon", "reasoning": "Bilinç kaybı + kafa travması = servikal yaralanma ekarte edilene kadar", "critical": true}, {"step": 3, "action": "Acil beyin BT", "reasoning": "GKS <15 + bilinç kaybı → BT endikasyonu", "critical": true}, {"step": 4, "action": "Nöroşirürji konsültasyonu", "reasoning": "Subdural hematom + orta hat kayması → cerrahi değerlendirme", "critical": true}, {"step": 5, "action": "Yatak başı yükselt 30° + anti-ödem", "reasoning": "KİBAS yönetimi", "critical": false}]',
  ARRAY['travma', 'kafa travması', 'subdural hematom', 'ATLS'],
  'published'
),

-- 4. Pediatrik Anafilaksi — Orta
(
  'Çocukta Ani Solunum Sıkıntısı — Anafilaksi',
  'pediatri',
  2,
  '{"age": 6, "gender": "kız", "chief_complaint": "Fıstık yedikten 15 dakika sonra başlayan nefes darlığı, yaygın ürtiker", "history": "Bilinen fıstık alerjisi yok. Daha önce benzer atak olmamış. Okul kantininde fıstıklı kurabiye yemiş."}',
  'Bu bir pediatrik anafilaksi senaryosudur.

Fizik muayene:
- Genel: Huzursuz, ağlamaklı, yaygın ürtiker ve anjiyoödem (dudaklar şiş)
- Solunum: Bilateral wheezing, inspiratuar stridor başlangıcı, interkostal çekilmeler
- Kardiyovasküler: Taşikardik, kapiller dolum 3 sn
- Cilt: Yaygın eritematöz ürtikeryal plaklar, göz çevresi ödem

IM adrenalin verilmezse: Stridor artar, SpO₂ düşer, bilinç bozulur.
IM adrenalin verilince: Wheezing azalır, ürtiker solmaya başlar, vital bulgular düzelir.

Doz: 0.01 mg/kg (yaklaşık 0.15-0.2 mg) IM uyluk anterolateral.',
  '{"hr": 145, "bp": "80/50", "rr": 34, "spo2": 90, "temp": 36.5, "gcs": 14}',
  NULL,
  NULL,
  '[{"step": 1, "action": "IM Adrenalin 0.01 mg/kg uyluk anterolateral", "reasoning": "Anafilakside birinci ve en önemli tedavi", "critical": true}, {"step": 2, "action": "Yüksek akım O2 + pozisyon", "reasoning": "Hipoksi düzeltilmeli, bacaklar yukarı", "critical": true}, {"step": 3, "action": "IV erişim + SF 20 mL/kg bolus", "reasoning": "Hipotansiyon tedavisi", "critical": true}, {"step": 4, "action": "Salbutamol nebül (bronkospazm için)", "reasoning": "Wheezing devam ederse ek tedavi", "critical": false}, {"step": 5, "action": "IV metilprednizolon + antihistaminik", "reasoning": "Bifazik reaksiyon önlemi", "critical": false}]',
  ARRAY['pediatri', 'anafilaksi', 'alerji', 'adrenalin'],
  'published'
),

-- 5. Pulmoner Emboli — Zor
(
  'Ani Başlayan Dispne — Masif Pulmoner Emboli',
  'pulmoner',
  3,
  '{"age": 45, "gender": "kadın", "chief_complaint": "Ani başlayan ciddi nefes darlığı ve göğüs ağrısı", "history": "10 gün önce diz protez ameliyatı olmuş. Son 3 gündür DVT profilaksisi almamış (ilaçları bitmiş). Oral kontraseptif kullanıyor."}',
  'Bu bir masif/submasif pulmoner emboli senaryosudur. Hasta hemodinamik olarak unstabildir.

Fizik muayene:
- Genel: Akut sıkıntılı, takipneik, syanotik
- Solunum: Takipne, bilateral solunum sesleri azalmış (sağda daha belirgin)
- Kardiyovasküler: Taşikardik, juguler venöz dolgunluk, S1Q3T3 patern (oskültasyonda)
- Ekstremite: Sağ bacakta ödem, ısı artışı (DVT bulgusu)

EKG: Sinüs taşikardisi, sağ ventrikül strain (S1Q3T3, V1-V4 T inversiyonu)
Lab: D-dimer >5000, troponin hafif yüksek (sağ ventrikül strain), BNP yüksek.
BT anjio: Bilateral ana pulmoner arterlerde masif trombüs.

Tedavisiz: Hızla hemodinamik kollaps.
Heparin + trombolizis düşünülmeli (masif PE + hemodinamik instabilite).',
  '{"hr": 130, "bp": "78/50", "rr": 32, "spo2": 85, "temp": 36.4, "gcs": 14}',
  '{"d_dimer": ">5000 ng/mL (çok yüksek)", "troponin_i": "0.18 ng/mL (hafif yüksek)", "bnp": "680 pg/mL (yüksek)", "cbc": "Hb 12.8, Plt 245.000", "inr": "1.0", "kreatinin": "0.9 mg/dL", "laktat": "3.8 mmol/L", "kan_gazi": "pH 7.48, pCO2 28, pO2 55, HCO3 22 (respiratuar alkaloz + hipoksemi)"}',
  '{"ekg": "Sinüs taşikardisi 130/dk, S1Q3T3 paterni, V1-V4 T inversiyonu, sağ aks deviasyonu", "bt_anjio": "Bilateral ana pulmoner arterlerde masif trombüs. Sağ ventrikül dilate (RV/LV >1). Sağ bacak derin ven sisteminde DVT.", "pa_grafi": "Sağ hiler genişleme, Westermark bulgusu (sağ alt lobda oligemi)."}',
  '[{"step": 1, "action": "Yüksek akım O2 + IV erişim", "reasoning": "Ciddi hipoksemi ve hipotansiyon", "critical": true}, {"step": 2, "action": "IV SF bolus (dikkatli, 500 mL)", "reasoning": "Sağ ventrikül yetmezliğinde agresif sıvıdan kaçın", "critical": true}, {"step": 3, "action": "BT pulmoner anjiyografi", "reasoning": "Masif PE tanısı için altın standart", "critical": true}, {"step": 4, "action": "IV heparin bolus + infüzyon", "reasoning": "PE''de antikoagülasyon birinci basamak", "critical": true}, {"step": 5, "action": "Trombolitik tedavi değerlendir (alteplaz)", "reasoning": "Masif PE + hemodinamik instabilite = trombolizis endikasyonu", "critical": true}]',
  ARRAY['pulmoner emboli', 'DVT', 'trombolitik', 'şok'],
  'published'
);
