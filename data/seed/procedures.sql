-- AcilEM — İlk 5 Prosedür + 3 Algoritma Seed Data
-- Kullanım: Supabase SQL editörüne yapıştırın

-- =====================================================
-- PROSEDÜRLER (5 adet)
-- =====================================================

INSERT INTO public.procedures (title, category, indications, contraindications, equipment, steps, tips, complications, video_url, source_references, status)
VALUES

-- 1. Endotrakeal Entübasyon
(
  'Endotrakeal Entübasyon',
  'havayolu',
  'Havayolu koruma gereksinimi (GKS ≤8)
Solunum yetmezliği (hipoksi, hiperkapni)
Uzun süreli mekanik ventilasyon gereksinimi
Havayolu korumasını sağlayamama',
  'Relatif: Masif fasiyal travma (cerrahi havayolu düşün)
Relatif: Servikal kırık şüphesi (inline stabilizasyon ile yapılabilir)
Üst havayolu tam obstrüksiyonu (cerrahi havayolu gerekebilir)',
  '[{"name": "Laringoskop (Macintosh veya Miller blade)"}, {"name": "Endotrakeal tüp (erkek 7.5-8.0, kadın 7.0-7.5)"}, {"name": "Stile"}, {"name": "10 mL enjektör (cuff şişirmek için)"}, {"name": "ETCO₂ dedektörü"}, {"name": "BVM (bag-valve-mask)"}, {"name": "Aspiratör"}, {"name": "Tüp tespit malzemesi"}, {"name": "Bougie", "optional": true}, {"name": "Video laringoskop", "optional": true}]',
  '[{"order": 1, "title": "Hazırlık ve ekipman kontrolü", "description": "Tüm ekipmanı hazırlayın. Laringoskop ışığını, cuff balonunu ve aspiratörü kontrol edin. Monitoring bağlayın (SpO₂, EKG, KB).", "warning": null}, {"order": 2, "title": "Preoksijenasyon", "description": "Yüksek akım O₂ ile en az 3 dakika preoksijenasyon yapın. %100 O₂ ile BVM veya yüksek akım nazal kanül kullanın. Hedef: SpO₂ ≥%95.", "warning": "Obez ve gebe hastalarda desatürasyon çok hızlı gelişir. 20° baş yukarı pozisyon verin."}, {"order": 3, "title": "RSI ilaçları", "description": "İndüksiyon: Ketamin 1-2 mg/kg IV veya Etomidat 0.3 mg/kg IV. Paralizi: Süksinilkolin 1.5 mg/kg IV veya Roküronyum 1.2 mg/kg IV.", "warning": "Hiperkalemide süksinilkolin kontrendikedir! Roküronyum tercih edin."}, {"order": 4, "title": "Pozisyonlama", "description": "Sniffing pozisyonu: baş hafif ekstansiyonda, boyun hafif fleksiyonda. Obez hastalarda ramped pozisyon (kulak ile sternum çentiği aynı hizada).", "warning": null}, {"order": 5, "title": "Laringoskopi", "description": "Sol elle laringoskopu tutun. Blade''i sağ ağız komisüründen sokup dili sola itin. Macintosh blade vallekülaya, Miller blade epiglotun altına yerleştirin. Yukarı ve öne doğru kaldırın (bileği bükmeyin).", "warning": null}, {"order": 6, "title": "Tüp yerleştirme", "description": "Vokal kordları görüntüleyin (Cormack-Lehane derecelemesi). Tüpü kordlar arasından geçirin. Cuff''ı dudak seviyesinden geçene kadar ilerletin (erkek 23 cm, kadın 21 cm).", "warning": "30 saniyeden uzun süren girişimlerden kaçının. Başarısız girişimde BVM ile oksijenasyon yapın."}, {"order": 7, "title": "Cuff şişirme ve doğrulama", "description": "Cuff''ı 10 mL hava ile şişirin. 5 nokta oskültasyon yapın (epigastrik, sol alt, sol üst, sağ alt, sağ üst). ETCO₂ ile doğrulayın (altın standart).", "warning": "ETCO₂ ile doğrulama yapılmadan tüp pozisyonunu kesinleştirmeyin!"}, {"order": 8, "title": "Tespit ve post-entübasyon", "description": "Tüpü tespit edin. Akciğer grafisi isteyin (tüp ucu karinadan 3-5 cm yukarıda olmalı). Mekanik ventilatör ayarlarını yapın. Sedasyon başlayın."}]',
  'Bougie kullanımı Cormack-Lehane grade III-IV''te başarı oranını artırır.
Sürekli apneik oksijenasyon (15 L/dk nazal kanül) desatürasyonu geciktirir.
BURP manevrası (backward, upward, rightward pressure) görüntüyü iyileştirebilir.
İlk denemede başarısız → farklı blade boyutu, bougie veya video laringoskop deneyin.',
  'Özofageal entübasyon → tanınmazsa fatal!
Sağ ana bronş entübasyonu
Diş hasarı
Vokal kord yaralanması
Aspirasyon
Hemodinamik instabilite (ilaç etkisi)',
  NULL,
  'Walls RM. Manual of Emergency Airway Management, 5th Ed.
ATLS 10th Edition
Higgs A, et al. Br J Anaesth 2018 (DAS Guidelines)',
  'published'
),

-- 2. Tüp Torakostomi (Göğüs Tüpü)
(
  'Tüp Torakostomi (Göğüs Tüpü Takılması)',
  'solunum',
  'Pnömotoraks (iğne dekompresyon sonrası dahil)
Hemotoraks
Plevral efüzyon (masif, semptomatik)
Ampiyem drenajı',
  'Relatif: Koagülopati (düzeltilmeli)
Relatif: Diafragma hernisi (BT ile doğrula)
Daha önce plörodez yapılmış taraf (yapışıklıklar)',
  '[{"name": "Göğüs tüpü (erişkin: 28-32 Fr, hemotoraks: 32-36 Fr)"}, {"name": "Bistüri (No. 10 veya 20)"}, {"name": "Kelly klemp (büyük)"}, {"name": "Steril eldiven ve örtü"}, {"name": "Lokal anestezik (lidokain %1)"}, {"name": "İpek sütür (0 veya 1)"}, {"name": "Su altı drenaj sistemi"}, {"name": "Steril pansuman malzemesi"}]',
  '[{"order": 1, "title": "Pozisyonlama ve hazırlık", "description": "Hastayı supin veya hafif lateral dekübitus pozisyonunda yatırın. Kolunu başının üzerine kaldırın. Güvenli üçgen bölgesini belirleyin: 4-5. interkostal aralık, ön aksiller hat, latissimus dorsi''nin önü.", "warning": null}, {"order": 2, "title": "Sterilizasyon ve lokal anestezi", "description": "Geniş alan sterilize edin. Steril örtü sergileyin. Cilt, ciltaltı, interkostal kaslar ve parietal plevraya kadar lidokain ile lokal anestezi uygulayın. Aspirasyonla plevral sıvı/hava doğrulayın.", "warning": null}, {"order": 3, "title": "Cilt insizyonu", "description": "3-4 cm transvers cilt insizyonu yapın. İnsizyon bir alt kot seviyesinde olmalı (tüp yukarı yönlendirilecek).", "warning": null}, {"order": 4, "title": "Künt diseksiyon", "description": "Kelly klemp ile ciltaltı ve interkostal kasları künt diseksiyon ile geçin. Kotun üst kenarından ilerleyin (nörovasküler demet kotun alt kenarındadır).", "warning": "Kotun alt kenarından girmeyin! İnterkostal arter, ven ve sinir hasarı riski."}, {"order": 5, "title": "Plevral boşluğa giriş", "description": "Kelly klemp ile parietal plevraya girin. Pop hissi alınır. Klemp açarak deliği genişletin. Parmakla plevral boşluğa girin, yapışıklık ve organları kontrol edin.", "warning": "Parmak kontrolü kritiktir! Yapışıklık veya organ palpasyonunda ilerlemeden durun."}, {"order": 6, "title": "Tüp yerleştirme", "description": "Göğüs tüpünü Kelly klemp yardımıyla veya parmak rehberliğinde plevral boşluğa yerleştirin. Pnömotoraks: apikal ve anterior yönde. Hemotoraks: posterior ve bazale yönlendirin. Tüm drenaj deliklerinin göğüs içinde olduğundan emin olun.", "warning": null}, {"order": 7, "title": "Bağlama ve drenaj sistemi", "description": "Tüpü cilde sütürle sabitleyin. Su altı drenaj sistemine bağlayın. Drenajı ve hava kaçağını gözlemleyin. Steril pansuman yapın.", "warning": null}, {"order": 8, "title": "Kontrol ve doğrulama", "description": "PA akciğer grafisi çekin. Tüp pozisyonunu ve akciğer ekspansiyonunu değerlendirin. Drenaj miktarını kaydedin.", "warning": "İlk 1500 mL üzerinde anlık hemotoraks drenajı veya devam eden >200 mL/saat: torakotomi endikasyonu!"}]',
  'İnsizyon yerine parmak kontrolü yapıp yapışıklık yoksa ilerleyin.
Büyük hemotoraks şüphesinde tüpü klempe almayı düşünmeyin, sürekli drenaj izleyin.
Kaçış olan tüpte hava kaçağı devam ediyorsa pozisyon kontrolü yapın.
Ağrı kontrolü: interkostal sinir bloğu veya IV analjezi.',
  'İnterkostal arter/ven yaralanması
Akciğer parankimi yaralanması
Diafragma yaralanması
Subkutan amfizem
Tüpün kink yapması veya tıkanması
Reekspansiyon pulmoner ödem (nadir)',
  NULL,
  'Roberts & Hedges'' Clinical Procedures in Emergency Medicine, 7th Ed.
ATLS 10th Edition',
  'published'
),

-- 3. Santral Venöz Kateterizasyon (İnternal Juguler Ven)
(
  'Santral Venöz Kateterizasyon — İnternal Juguler Ven (USG Eşliğinde)',
  'dolaşım',
  'Geniş çaplı sıvı resüsitasyonu
Vazopresör / inotrop infüzyonu
Periferik damar yolu sağlanamıyor
Santral venöz basınç (SVB) monitörizasyonu
Hemodiyaliz kateteri
Transvenöz pacemaker',
  'Girişim tarafında enfeksiyon
Ciddi düzeltilmemiş koagülopati
Kontralateral pnömotoraks (bilateral SVK riski)
Relatif: İpsilateral karotis hastalığı',
  '[{"name": "Santral venöz kateter seti (triple-lumen)"}, {"name": "USG cihazı ve lineer prob"}, {"name": "Steril prob kılıfı ve jel"}, {"name": "Steril eldiven, önlük, bone, maske"}, {"name": "Geniş steril örtü"}, {"name": "Lokal anestezik (lidokain %1)"}, {"name": "Seldinger set (iğne, guidewire, dilatör)"}, {"name": "SF ile yıkanmış kateter lümenleri"}, {"name": "Sütür malzemesi ve steril pansuman"}]',
  '[{"order": 1, "title": "Hazırlık ve pozisyon", "description": "Trendelenburg pozisyonu (15-20°) verin. Başı karşı tarafa hafifçe çevirin. Tam bariyer önlemleri alın (bone, maske, steril önlük, eldiven, geniş örtü).", "warning": null}, {"order": 2, "title": "USG ile ven lokalizasyonu", "description": "Lineer prob ile kısa aks görüntülemede IJV''yi lokalize edin. IJV: karotis arterinin lateral ve anteriorunda, kompresibıl, Valsalva ile genişler. Karotis: pulsatil, kompresibıl değil.", "warning": "USG kullanmadan kör girişim yapmayın! USG eşliğinde komplikasyon oranı belirgin düşüktür."}, {"order": 3, "title": "Sterilizasyon", "description": "Geniş alan klorheksidin ile sterilize edin (en az 30 saniye kurumaya bırakın). Steril örtüler sergileyin. USG probuna steril kılıf takın.", "warning": null}, {"order": 4, "title": "Lokal anestezi", "description": "Giriş noktasına lidokain ile lokal anestezi uygulayın. Cilt, ciltaltı ve derin dokuya infiltre edin.", "warning": null}, {"order": 5, "title": "Ven ponksiyonu", "description": "USG eşliğinde 18G introducer iğneyi 45° açıyla ilerletin. Gerçek zamanlı (in-plane veya out-of-plane) iğne ucunu takip edin. Venöz kan aspirasyonu doğrulayın (koyu, pulsatil olmayan).", "warning": "Parlak kırmızı, pulsatil kan gelirse arteriyel ponksiyondur! İğneyi çekin ve 10 dk bası uygulayın."}, {"order": 6, "title": "Seldinger tekniği", "description": "Enjektörü çıkarın, guidewire''ı J-ucu ile ilerletin (dirençsiz ilerlemelidir). İğneyi çıkarın. Wire üzerinden cilt insizyonu yapın. Dilatörü wire üzerinden ilerletip çıkarın. Kateteri wire üzerinden yerleştirin.", "warning": "Guidewire''ı asla gözden kaybetmeyin! EKG''de aritmi görürseniz wire''ı geri çekin."}, {"order": 7, "title": "Doğrulama ve tespit", "description": "Tüm lümenlerden kan aspire edin ve SF ile flush yapın. Kateteri cilde sütürle sabitleyin. Steril pansuman yapın. Akciğer grafisi ile pozisyon ve pnömotoraks kontrolü yapın.", "warning": null}]',
  'Dinamik USG rehberliği başarı oranını %100''e yaklaştırır ve komplikasyonları minimalize eder.
İnfraklaviküler subklaviyen ven: enfeksiyon riski en düşük (uzun süreli kullanımda tercih).
Femoral ven: acil durumlarda en kolay erişim, ancak enfeksiyon riski yüksek.
Kateter ucu SVC-RA bileşkesinde olmalıdır (PA grafide T4-T5 seviyesi).',
  'Pnömotoraks
Karotis arter ponksiyonu / hematom
Hava embolisi
Aritmi (guidewire ile)
Kateter enfeksiyonu
Tromboz',
  NULL,
  'Roberts & Hedges'' Clinical Procedures in Emergency Medicine, 7th Ed.
McGee DC, Gould MK. NEJM 2003',
  'published'
),

-- 4. Lomber Ponksiyon
(
  'Lomber Ponksiyon (LP)',
  'nöroloji',
  'Menenjit / ensefalit şüphesi
Subaraknoid kanama şüphesi (BT negatif)
Psödotümör serebri (idiyopatik intrakranyal hipertansiyon)
Nörolojik hastalık tanısı (MS, GBS vb.)',
  'Artmış intrakranyal basınç (yer kaplayan lezyon → herniasyon riski!)
LP bölgesinde enfeksiyon
Ciddi koagülopati (INR >1.5, trombosit <50.000)
Spinal epidural apse şüphesi',
  '[{"name": "Spinal iğne (20-22 G, erişkin)"}, {"name": "Manometre (BOS basıncı ölçümü)"}, {"name": "Steril eldiven ve örtü"}, {"name": "Lokal anestezik (lidokain %1)"}, {"name": "BOS toplama tüpleri (4 adet, numaralı)"}, {"name": "Antiseptik solüsyon (klorheksidin)"}, {"name": "Steril pansuman"}]',
  '[{"order": 1, "title": "Kontrendikasyon kontrolü", "description": "LP öncesi BT endikasyonlarını değerlendirin: immünsüpresyon, papil ödem, fokal nörolojik defisit, yeni nöbet, bilinç bozukluğu. Varsa önce BT çekin.", "warning": "Kitle etkisi olan hastada LP herniasyona neden olabilir!"}, {"order": 2, "title": "Pozisyonlama", "description": "Lateral dekübitus (fetal pozisyon): dizler göğüse, çene göğüse çekilmiş. Alternatif: Oturur pozisyon (obez hastalarda tercih). İliak krestler arası çizgi L4 spinöz çıkıntıyı gösterir.", "warning": null}, {"order": 3, "title": "Sterilizasyon ve anestezi", "description": "L3-L4 veya L4-L5 aralığını palpe edin. Geniş alan sterilize edin. Steril örtü sergileyin. Lokal anestezik ile cilt ve ciltaltı anestezisi yapın.", "warning": null}, {"order": 4, "title": "İğne yerleştirme", "description": "Spinal iğneyi orta hattan, hafif sefalik açıyla (umbilikus yönüne) ilerletin. Sürekli stile yerinde olmalıdır. Ligamentum flavum ve dura geçişinde ''pop'' hissi alınır.", "warning": null}, {"order": 5, "title": "Stile çekme ve BOS akışı", "description": "Stileyi yavaşça çekin. BOS damla damla akmalıdır. Akış yoksa: 90° döndürün, birkaç mm ilerletin veya geri çekin.", "warning": "Kanlı BOS geliyorsa: travmatik tap mı SAK mı? 4 tüpe ardışık toplama + ksantokromi değerlendirmesi yapın."}, {"order": 6, "title": "BOS basıncı ölçümü", "description": "Manometreyi bağlayın. Hastanın bacaklarını hafifçe açtırın (güvenilir ölçüm için). Normal açılış basıncı: 6-20 cmH₂O.", "warning": null}, {"order": 7, "title": "BOS toplama", "description": "4 numaralı tüpe sırayla toplayın: Tüp 1: hücre sayımı, Tüp 2: biyokimya (protein, glukoz), Tüp 3: kültür/gram boyama, Tüp 4: hücre sayımı (SAK ayrımı için). Her tüpe 1-2 mL.", "warning": null}, {"order": 8, "title": "Sonlandırma", "description": "Stileyi geri yerleştirin ve iğneyi çekin. Steril pansuman yapın. Hasta 1 saat düz yatabilir (kanıt zayıf ama geleneksel). Post-LP baş ağrısı konusunda bilgilendirin.", "warning": null}]',
  'Atraumatic (pencil-point) iğne kullanımı post-LP baş ağrısı riskini azaltır.
USG ile interspinöz aralık lokalizasyonu başarı oranını artırır (obez hastalar).
Menenjit şüphesinde LP antibiyotik gecikmesine neden olmamalı → önce kan kültürü + antibiyotik, sonra LP.
BOS glukoz/serum glukoz oranı: normal >0.6, bakteriyel menenjitte <0.4.',
  'Post-LP baş ağrısı (%10-30, atraumatic iğne ile daha az)
Sırt ağrısı
Epidural veya subdural hematom (nadir)
Serebral herniasyon (kontrendikasyon atlanırsa)
Enfeksiyon (çok nadir)',
  NULL,
  'Roberts & Hedges'' Clinical Procedures in Emergency Medicine, 7th Ed.
Ellenby MS, et al. NEJM 2006',
  'published'
),

-- 5. İntraosseöz (IO) Erişim
(
  'İntraosseöz (IO) Vasküler Erişim',
  'dolaşım',
  'Acil damar yolu gereksinimine rağmen periferik IV erişim sağlanamadığı durumlar
Kardiyak arrest
Ciddi şok (damar yolu zor)
Yanık hastası
Pediatrik aciller',
  'IO giriş bölgesinde kırık
IO giriş bölgesinde enfeksiyon
Aynı ekstremitede daha proksimalde kırık
Osteoporoz / osteogenezis imperfekta (relatif)',
  '[{"name": "IO iğne veya drill cihazı (EZ-IO tercih edilen)"}, {"name": "Antiseptik solüsyon"}, {"name": "10 mL SF dolu enjektör"}, {"name": "IV set ve sıvılar"}, {"name": "Steril eldiven"}, {"name": "Lidokain %2 (uyanık hasta için)", "optional": true}]',
  '[{"order": 1, "title": "Giriş bölgesi seçimi", "description": "Proksimal tibia (en sık): tuberositas tibia''nın 1-2 cm medial ve 1 cm distalı. Alternatif: Proksimal humerus (erişkinde tercih), distal tibia (iç malleolün 2 cm proksimali), distal femur (pediatri).", "warning": null}, {"order": 2, "title": "Sterilizasyon", "description": "Giriş bölgesini antiseptik ile sterilize edin. Uyanık hastada lokal anestezi (lidokain) uygulayın.", "warning": null}, {"order": 3, "title": "IO iğne yerleştirme", "description": "EZ-IO drill: iğneyi kemik yüzeyine dik yerleştirin. Drill ile siyah çizgiye kadar ilerletin. Manuel IO: döndürme hareketi ile kemik korteksini geçin. ''Pop'' hissi ve direnç kaybı = medüller boşlukta.", "warning": "İğneyi sallamayın, korteksi kırmamaya dikkat edin."}, {"order": 4, "title": "Doğrulama", "description": "İç stileyi çıkarın. 10 mL SF ile aspirasyon yapın (kemik iliği geliyorsa doğrulanır, gelmese de flush ile devam edin). 10 mL SF ile flush yapın — sızıntı olmamalı.", "warning": "Flush sırasında ciltaltı şişme: iğne doğru yerde değil. Çıkarıp farklı bölgeden deneyin."}, {"order": 5, "title": "İnfüzyon başlatma", "description": "IV seti bağlayın. Basınçlı infüzyon gerekebilir (yerçekimi ile akış yavaştır). Uyanık hastada infüzyon öncesi 40 mg lidokain IO bolus verin (ağrı azaltır). Tüm IV ilaçlar ve sıvılar IO yoldan verilebilir.", "warning": null}, {"order": 6, "title": "Geçici kullanım", "description": "IO erişim geçicidir. Mümkün olan en kısa sürede (24 saat içinde) IV erişime geçin. IO iğneyi çıkarırken döndürerek çekin.", "warning": "IO erişimi 24 saatten fazla bırakmayın — osteomiyelit riski artar."}]',
  'IO yol ile tüm ACLS ilaçları verilebilir.
Akış hızı: basınçlı infüzyon ile 125 mL/dk (proksimal humerusta daha yüksek).
Pediatride proksimal tibia en güvenilir bölgedir.
IO başarı oranı %90+ ve yerleştirme süresi <60 saniyedir.
Lab tetkikleri IO aspirasyondan çalışılabilir (venöz kan gazı, laktat gibi).',
  'Ekstravazasyon
Kompartman sendromu (çok nadir)
Osteomiyelit (uzun süreli kullanımda)
Kırık (yanlış teknik)
Cilt nekrozu',
  NULL,
  'ATLS 10th Edition
AHA ACLS/PALS Kılavuzu 2020
Petitpas F, et al. Crit Care 2016',
  'published'
);


-- =====================================================
-- ALGORİTMALAR (3 adet)
-- =====================================================

INSERT INTO public.algorithms (title, category, flowchart_data, description, source_references, status)
VALUES

-- 1. Kardiyak Arrest Algoritması (ACLS)
(
  'Kardiyak Arrest Yönetimi (ACLS)',
  'resüsitasyon',
  '{"mermaid": "graph TD\n    A[Kardiyak Arrest Tespit] --> B{Ritim Analizi}\n    B -->|Şoklanabilir| C[VF / Nabızsız VT]\n    B -->|Şoklanamaz| D[Asistoli / NEA]\n    C --> E[Defibrilasyon 200J bifazik]\n    E --> F[KPR 2 dakika]\n    F --> G{Ritim Kontrolü}\n    G -->|Şoklanabilir| H[2. Şok + Epinefrin 1mg IV]\n    G -->|Şoklanamaz| D\n    H --> I[KPR 2 dakika]\n    I --> J{Ritim Kontrolü}\n    J -->|Şoklanabilir| K[3. Şok + Amiodaron 300mg]\n    J -->|Şoklanamaz| D\n    K --> L[KPR 2 dakika devam]\n    D --> M[KPR başla + Epinefrin 1mg hemen]\n    M --> N[KPR 2 dakika]\n    N --> O{Ritim Kontrolü}\n    O -->|Şoklanabilir| C\n    O -->|Şoklanamaz| P[Geri dönüşümlü nedenleri ara]\n    P --> Q[H: Hipovolemi, Hipoksi, H+, Hipo/Hiperkalemi, Hipotermi]\n    P --> R[T: Tansiyon pnömo, Tamponad, Toksin, Tromboz]\n    L --> S{ROSC?}\n    S -->|Evet| T[Post-Arrest Bakım]\n    S -->|Hayır| F"}',
  'AHA 2020 ACLS kardiyak arrest algoritması. Şoklanabilir (VF/nVT) ve şoklanamaz (asistoli/NEA) ritimlerin yönetimi. Yüksek kaliteli KPR (100-120/dk, 5-6 cm), erken defibrilasyon ve geri dönüşümlü nedenlerin araştırılması temel prensiplerdir.',
  'AHA ACLS Kılavuzu 2020
Panchal AR, et al. Circulation 2020',
  'published'
),

-- 2. Anafilaksi Yönetimi
(
  'Anafilaksi Yönetimi Algoritması',
  'genel',
  '{"mermaid": "graph TD\n    A[Anafilaksi Şüphesi] --> B{Tanı Kriterleri}\n    B -->|2+ sistem tutulumu| C[Anafilaksi Tanısı]\n    B -->|Tek sistem| D[Değerlendir: Allerji mi?]\n    C --> E[IM Adrenalin 0.01 mg/kg\\nMaks 0.5 mg\\nUyluk anterolateral]\n    E --> F[Pozisyon: Supin + bacaklar yukarı]\n    F --> G[Yüksek akım O2 + IV erişim]\n    G --> H[IV SF 20 mL/kg bolus]\n    H --> I{Yanıt var mı?}\n    I -->|Evet| J[Gözlem 4-6 saat]\n    I -->|Hayır 5-15 dk| K[IM Adrenalin Tekrar]\n    K --> L{Yanıt var mı?}\n    L -->|Evet| J\n    L -->|Hayır| M[IV Adrenalin İnfüzyonu\\n0.1-1 mcg/kg/dk]\n    M --> N[Yoğun Bakım]\n    J --> O[Antihistaminik + Steroid\\nBifazik reaksiyon riski bildirimi]\n    O --> P[Adrenalin oto-enjektör reçetesi\\nAlerji polikliniğine yönlendir]"}',
  'Anafilaksi yönetim algoritması. IM adrenalin ilk ve en önemli tedavidir. İki veya daha fazla organ sisteminin tutulumu tanı koydurur. Bifazik reaksiyon %20 oranında görülebilir, bu nedenle en az 4-6 saat gözlem önerilir.',
  'WAO/EAACI Anafılaksi Kılavuzu 2020
Simons FER, et al. JACI 2011',
  'published'
),

-- 3. Akut İnme Algoritması
(
  'Akut İskemik İnme Yönetimi Algoritması',
  'nöroloji',
  '{"mermaid": "graph TD\n    A[Akut Nörolojik Defisit] --> B[ABC + Vital Bulgular]\n    B --> C[Kan şekeri kontrolü]\n    C --> D{Hipoglisemi?}\n    D -->|Evet| E[IV Dekstroz → Düzelme?]\n    D -->|Hayır| F[Acil BT: Kanama var mı?]\n    E -->|Düzeldi| Z[İnme değil]\n    E -->|Düzelmedi| F\n    F --> G{BT Sonucu}\n    G -->|Kanama var| H[Hemorajik İnme\\nNöroşirürji konsültasyonu\\nKB kontrolü]\n    G -->|Kanama yok| I[İskemik İnme Şüphesi]\n    I --> J[NIHSS Skorla]\n    J --> K{Semptom başlangıcı\\n≤4.5 saat?}\n    K -->|Evet| L{tPA Kontrendikasyonu?}\n    L -->|Yok| M[IV tPA 0.9 mg/kg\\nMaks 90 mg]\n    L -->|Var| N{LVO şüphesi?\\nNIHSS ≥6}\n    K -->|Hayır veya belirsiz| N\n    N -->|Evet| O[BT Anjiyografi]\n    O --> P{LVO doğrulandı?}\n    P -->|Evet ≤24 saat| Q[Mekanik Trombektomi]\n    P -->|Hayır| R[Medikal Tedavi\\nAntiagregan + Statin]\n    N -->|Hayır| R\n    M --> S{LVO şüphesi?}\n    S -->|Evet| O\n    S -->|Hayır| R"}',
  'Akut iskemik inme acil yönetim algoritması. IV tPA ilk 4.5 saatte, mekanik trombektomi büyük damar oklüzyonunda 24 saate kadar uygulanabilir. Kapı-iğne süresi <60 dk, kapı-kasık süresi <90 dk hedeflenmelidir.',
  'AHA/ASA İnme Kılavuzu 2019
Powers WJ, et al. Stroke 2019',
  'published'
);
