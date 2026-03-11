-- AcilEM — İlk 50 Quiz Sorusu Seed Data
-- Kullanım: Supabase SQL editörüne yapıştırın
-- Konular: kardiyoloji, travma, nöroloji, resüsitasyon, toksikoloji, enfeksiyon, pediatri, pulmoner, genel
-- Zorluk: 1 (kolay) – 4 (zor)

INSERT INTO public.questions (topic, difficulty, question_text, options, explanation, source, status)
VALUES

-- =====================================================
-- KARDİYOLOJİ (10 soru)
-- =====================================================

-- Q1
(
  'kardiyoloji', 2,
  '55 yaşında erkek hasta göğüs ağrısı ile başvuruyor. EKG''de DII, DIII ve aVF''de ST elevasyonu saptanıyor. Bu bulgu hangi koroner arterin tıkanıklığını düşündürür?',
  '[{"text": "Sol ön inen arter (LAD)", "is_correct": false}, {"text": "Sağ koroner arter (RCA)", "is_correct": true}, {"text": "Sol sirkumfleks arter (LCx)", "is_correct": false}, {"text": "Sol ana koroner arter (LMCA)", "is_correct": false}]',
  'DII, DIII ve aVF derivasyonlarında ST elevasyonu inferior MI''yı gösterir. İnferior duvarın kanlanması yaklaşık %85 oranında sağ koroner arter (RCA) tarafından sağlanır. Kalan %15''te sol sirkumfleks arter sorumludur.',
  'Braunwald''s Heart Disease, 12th Ed.',
  'published'
),

-- Q2
(
  'kardiyoloji', 1,
  'Akut STEMI''de kapı-balon süresi hedefi nedir?',
  '[{"text": "30 dakika", "is_correct": false}, {"text": "60 dakika", "is_correct": false}, {"text": "90 dakika", "is_correct": true}, {"text": "120 dakika", "is_correct": false}]',
  'ACC/AHA kılavuzlarına göre primer perkütan koroner girişim (PKG) yapılacak hastalarda kapı-balon süresi 90 dakikanın altında olmalıdır. Fibrinolitik tedavi verilecekse kapı-iğne süresi 30 dakika olmalıdır.',
  'AHA/ACC STEMI Kılavuzu 2013',
  'published'
),

-- Q3
(
  'kardiyoloji', 3,
  'Geniş QRS kompleksli taşikardi ile başvuran hastada hangisi ventriküler taşikardiyi supraventriküler taşikardiden ayırmada EN güçlü kriterdir?',
  '[{"text": "QRS süresi >140 ms", "is_correct": false}, {"text": "AV disosiyasyon varlığı", "is_correct": true}, {"text": "Hız >150/dk", "is_correct": false}, {"text": "Sol aks deviasyonu", "is_correct": false}]',
  'AV disosiyasyon (P dalgaları ve QRS komplekslerinin bağımsız çalışması) ventriküler taşikardinin en spesifik bulgusudur. Capture ve füzyon atımları da VT lehine değerli bulgulardır. Brugada algoritması veya Vereckei kriterleri ayrımda kullanılabilir.',
  'Brugada P, et al. Circulation 1991',
  'published'
),

-- Q4
(
  'kardiyoloji', 2,
  'Atriyal fibrilasyonda CHA₂DS₂-VASc skoru hesaplanırken aşağıdakilerden hangisi 2 puan değerindedir?',
  '[{"text": "Hipertansiyon", "is_correct": false}, {"text": "Diyabet", "is_correct": false}, {"text": "Yaş ≥75", "is_correct": true}, {"text": "Kadın cinsiyet", "is_correct": false}]',
  'CHA₂DS₂-VASc skorunda 2 puan verilen parametreler: yaş ≥75 ve geçirilmiş inme/TİA/tromboembolidir. Diğer tüm parametreler (KKY, HT, DM, vasküler hastalık, yaş 65-74, kadın cinsiyet) 1''er puan değerindedir.',
  'ESC AF Kılavuzu 2020',
  'published'
),

-- Q5
(
  'kardiyoloji', 3,
  'Akut perikardit tanısı için aşağıdaki kriterlerden en az kaçının varlığı gerekir?',
  '[{"text": "1", "is_correct": false}, {"text": "2", "is_correct": true}, {"text": "3", "is_correct": false}, {"text": "4", "is_correct": false}]',
  'Akut perikardit tanısı için 4 kriterden en az 2''sinin varlığı gerekir: (1) perikarditik göğüs ağrısı, (2) perikardiyal sürtünme sesi, (3) yaygın ST elevasyonu veya PR çökmesi, (4) yeni veya artan perikardiyal efüzyon. En sık neden viral/idiyopatiktir.',
  'ESC Perikardiyal Hastalıklar Kılavuzu 2015',
  'published'
),

-- Q6
(
  'kardiyoloji', 1,
  'Unstabil angina pektoris ile NSTEMI arasındaki temel fark nedir?',
  '[{"text": "EKG bulguları", "is_correct": false}, {"text": "Troponin yüksekliği", "is_correct": true}, {"text": "Göğüs ağrısının şiddeti", "is_correct": false}, {"text": "Risk faktörleri", "is_correct": false}]',
  'Unstabil angina ve NSTEMI klinik olarak benzer prezentasyon gösterir. Temel fark kardiyak biyobelirteçlerdir (troponin). NSTEMI''de troponin yüksekliği miyokard nekrozunu gösterirken, unstabil anginada troponin normaldir.',
  'Tintinalli''s Emergency Medicine, 9th Ed.',
  'published'
),

-- Q7
(
  'kardiyoloji', 2,
  'Akut dekompanse kalp yetmezliğinde ilk basamak tedavide hangisi tercih edilir?',
  '[{"text": "Dobutamin", "is_correct": false}, {"text": "IV furosemid", "is_correct": true}, {"text": "Digoksin", "is_correct": false}, {"text": "Metoprolol", "is_correct": false}]',
  'Akut dekompanse kalp yetmezliğinde sıvı yükü olan hastalarda ilk basamak tedavi IV loop diüretiktir (furosemid). Hipotansiyonu olmayan hastalarda nitrogliserin de eklenebilir. İnotrop ajanlar (dobutamin) ancak düşük kardiyak output durumunda ve hipotansiyon varlığında tercih edilir.',
  'ESC Akut ve Kronik Kalp Yetmezliği Kılavuzu 2021',
  'published'
),

-- Q8
(
  'kardiyoloji', 4,
  'Wellens sendromu EKG''sinde tipik olarak hangi derivasyonlarda hangi değişiklik görülür?',
  '[{"text": "V1-V3''te ST elevasyonu", "is_correct": false}, {"text": "V2-V3''te derin simetrik T inversiyonu veya bifazik T dalgası", "is_correct": true}, {"text": "DII, DIII, aVF''de Q dalgası", "is_correct": false}, {"text": "V5-V6''da R kaybı", "is_correct": false}]',
  'Wellens sendromu LAD''ın kritik proksimal darlığını gösteren EKG paternidir. Tip A (%25): V2-V3''te bifazik T dalgası. Tip B (%75): V2-V3''te derin simetrik T inversiyonu. Ağrısız dönemde görülür. Stres testi kontrendikedir, erken anjiyografi gerekir.',
  'de Zwaan C, et al. Am Heart J 1982',
  'published'
),

-- Q9
(
  'kardiyoloji', 2,
  'Aort diseksiyonunda Stanford Tip A sınıflaması ne anlama gelir?',
  '[{"text": "Sadece çıkan aortayı tutar", "is_correct": false}, {"text": "Çıkan aortayı tutan tüm diseksiyonlar", "is_correct": true}, {"text": "Sadece inen aortayı tutar", "is_correct": false}, {"text": "Abdominal aortayı tutar", "is_correct": false}]',
  'Stanford sınıflamasında Tip A: çıkan aortayı tutan tüm diseksiyonlar (inen aortaya uzanabilir). Tip B: sadece inen aortayı tutan diseksiyonlar. Tip A acil cerrahi gerektirirken, Tip B genellikle medikal tedavi ile yönetilir.',
  'Tintinalli''s Emergency Medicine, 9th Ed.',
  'published'
),

-- Q10
(
  'kardiyoloji', 3,
  'Kardiyak tamponad''da Beck triadı hangi bulgulardan oluşur?',
  '[{"text": "Hipotansiyon, taşikardi, dispne", "is_correct": false}, {"text": "Hipotansiyon, boyun venöz dolgunluğu, kalp seslerinin derinden gelmesi", "is_correct": true}, {"text": "Göğüs ağrısı, dispne, senkop", "is_correct": false}, {"text": "Hipotansiyon, bradikardi, düzensiz solunum", "is_correct": false}]',
  'Beck triadı kardiyak tamponadın klasik bulgularıdır: (1) hipotansiyon, (2) juguler venöz distansiyon (boyun venöz dolgunluğu), (3) kalp seslerinin derinden gelmesi (muffled heart sounds). Pulsus paradoksus (>10 mmHg) da önemli bir bulgudur.',
  'Roberts & Hedges'' Clinical Procedures in Emergency Medicine, 7th Ed.',
  'published'
),

-- =====================================================
-- TRAVMA (8 soru)
-- =====================================================

-- Q11
(
  'travma', 1,
  'Travma hastasının değerlendirmesinde ABCDE yaklaşımında "B" neyi ifade eder?',
  '[{"text": "Blood (Kanama)", "is_correct": false}, {"text": "Breathing (Solunum)", "is_correct": true}, {"text": "Brain (Beyin)", "is_correct": false}, {"text": "Bones (Kemikler)", "is_correct": false}]',
  'ATLS''ye göre primer bakı ABCDE: A-Airway (Havayolu), B-Breathing (Solunum), C-Circulation (Dolaşım), D-Disability (Nörolojik durum), E-Exposure (Tam vücut muayenesi). Sıralama hayati öneme göre yapılmıştır.',
  'ATLS 10th Edition',
  'published'
),

-- Q12
(
  'travma', 2,
  'Tansiyon pnömotoraksta acil tedavi nedir?',
  '[{"text": "Göğüs tüpü takılması", "is_correct": false}, {"text": "İğne dekompresyon (2. interkostal aralık, midklaviküler hat)", "is_correct": true}, {"text": "Endotrakeal entübasyon", "is_correct": false}, {"text": "IV sıvı resüsitasyonu", "is_correct": false}]',
  'Tansiyon pnömotoraks klinik tanıdır ve acil iğne dekompresyon gerektirir. Klasik yer: 2. interkostal aralık, midklaviküler hattan veya 4-5. interkostal aralık, ön aksiller hattan yapılır. Ardından göğüs tüpü (tüp torakostomi) takılmalıdır.',
  'ATLS 10th Edition',
  'published'
),

-- Q13
(
  'travma', 3,
  'Hemorajik şokta Sınıf III kanama kaybı tahmini ne kadardır?',
  '[{"text": "<%15 (750 mL)", "is_correct": false}, {"text": "%15-30 (750-1500 mL)", "is_correct": false}, {"text": "%30-40 (1500-2000 mL)", "is_correct": true}, {"text": ">%40 (>2000 mL)", "is_correct": false}]',
  'ATLS hemorajik şok sınıflaması: Sınıf I: <%15 kayıp. Sınıf II: %15-30 kayıp (taşikardi başlar). Sınıf III: %30-40 kayıp (hipotansiyon, taşikardi, konfüzyon). Sınıf IV: >%40 kayıp (hayatı tehdit eder). Sınıf III''te kristaloid + kan transfüzyonu gerekir.',
  'ATLS 10th Edition',
  'published'
),

-- Q14
(
  'travma', 2,
  'Künt karın travmasında en sık yaralanan solid organ hangisidir?',
  '[{"text": "Karaciğer", "is_correct": false}, {"text": "Dalak", "is_correct": true}, {"text": "Böbrek", "is_correct": false}, {"text": "Pankreas", "is_correct": false}]',
  'Künt karın travmasında en sık yaralanan solid organ dalaktır (%40-55). İkinci sıklıkta karaciğer gelir. Penetran travmada ise en sık karaciğer yaralanır. Dalak yaralanması sol üst kadran ağrısı ve Kehr belirtisi (sol omuz ağrısı) ile prezente olabilir.',
  'Tintinalli''s Emergency Medicine, 9th Ed.',
  'published'
),

-- Q15
(
  'travma', 3,
  'Epidural hematom tipik olarak hangi arter yaralanmasıyla oluşur?',
  '[{"text": "Anterior serebral arter", "is_correct": false}, {"text": "Posterior serebral arter", "is_correct": false}, {"text": "Orta meningeal arter", "is_correct": true}, {"text": "Vertebral arter", "is_correct": false}]',
  'Epidural hematom genellikle temporal kemik kırığına bağlı orta meningeal arter yaralanmasıyla oluşur. BT''de bikonveks (lens şekilli) hiperdens lezyon görülür. Klasik prezentasyon: travma → kısa bilinç kaybı → lusid interval → hızlı deteriorasyon. Acil cerrahi gerektirir.',
  'Tintinalli''s Emergency Medicine, 9th Ed.',
  'published'
),

-- Q16
(
  'travma', 1,
  'FAST ultrasonografisinde bakılan bölgeler arasında hangisi YER ALMAZ?',
  '[{"text": "Morrison poşu (hepatorenal)", "is_correct": false}, {"text": "Splenorenal alan", "is_correct": false}, {"text": "Pelvik (Douglas/rektovezikal)", "is_correct": false}, {"text": "Retroperitoneal alan", "is_correct": true}]',
  'FAST (Focused Assessment with Sonography for Trauma) 4 bölgeye bakar: (1) Sağ üst kadran (Morrison poşu), (2) Sol üst kadran (splenorenal), (3) Pelvik (suprapubik), (4) Subksifoid (perikard). FAST retroperitoneal kanamayı gösteremez; bu sınırlaması bilinmelidir.',
  'Ma OJ, Mateer JR. J Ultrasound Med 1997',
  'published'
),

-- Q17
(
  'travma', 2,
  'Servikal omurga yaralanması şüphesinde NEXUS kriterlerine göre hangisi görüntüleme endikasyonudur?',
  '[{"text": "Hasta 30 yaşından küçükse", "is_correct": false}, {"text": "Posterior orta hat servikal hassasiyet varsa", "is_correct": true}, {"text": "Mekanizma düşük enerjili ise", "is_correct": false}, {"text": "Hasta ambulansla geldiyse", "is_correct": false}]',
  'NEXUS düşük riskli kriterleri: (1) posterior orta hat hassasiyeti yok, (2) fokal nörolojik defisit yok, (3) normal bilinç düzeyi, (4) intoksikasyon yok, (5) dikkat dağıtıcı yaralanma yok. 5 kriterin tamamı karşılanırsa görüntüleme gerekmez. Herhangi birinin varlığı görüntüleme endikasyonudur.',
  'Hoffman JR, et al. NEJM 2000',
  'published'
),

-- Q18
(
  'travma', 4,
  'Masif transfüzyon protokolünde eritrosit süspansiyonu : taze donmuş plazma : trombosit oranı ne olmalıdır?',
  '[{"text": "3:1:1", "is_correct": false}, {"text": "2:1:1", "is_correct": false}, {"text": "1:1:1", "is_correct": true}, {"text": "1:2:1", "is_correct": false}]',
  'PROPPR çalışmasına göre masif transfüzyon protokolünde 1:1:1 oranı (ES:TDP:trombosit) önerilmektedir. Bu oran tam kana en yakın bileşimi sağlar ve koagülopatiyi önler. Traneksamik asit (TXA) de ilk 3 saat içinde verilmelidir (CRASH-2).',
  'Holcomb JB, et al. JAMA 2015 (PROPPR)',
  'published'
),

-- =====================================================
-- NÖROLOJİ (6 soru)
-- =====================================================

-- Q19
(
  'nöroloji', 1,
  'Akut iskemik inmede IV tPA (alteplaz) uygulaması için zaman penceresi nedir?',
  '[{"text": "İlk 2 saat", "is_correct": false}, {"text": "İlk 4.5 saat", "is_correct": true}, {"text": "İlk 6 saat", "is_correct": false}, {"text": "İlk 12 saat", "is_correct": false}]',
  'IV alteplaz (tPA) akut iskemik inmede semptom başlangıcından itibaren ilk 4.5 saat içinde uygulanabilir. 0.9 mg/kg dozunda (maks. 90 mg), %10''u bolus, kalanı 60 dakikada infüzyon şeklinde verilir. Mekanik trombektomi uygun hastalarda 24 saate kadar yapılabilir.',
  'AHA/ASA İnme Kılavuzu 2019',
  'published'
),

-- Q20
(
  'nöroloji', 2,
  'Status epileptikus tedavisinde ilk basamak ilaç hangisidir?',
  '[{"text": "Fenitoin", "is_correct": false}, {"text": "Valproat", "is_correct": false}, {"text": "Benzodiazepin (diazepam veya midazolam)", "is_correct": true}, {"text": "Levetirasetam", "is_correct": false}]',
  'Status epileptikus tedavisinde ilk basamak benzodiazepinlerdir: IV lorazepam (0.1 mg/kg), IV diazepam (0.15 mg/kg) veya IM midazolam (10 mg). Benzodiazepinle kontrol sağlanamazsa ikinci basamak: IV fenitoin/fosfenitoin, valproat veya levetirasetam.',
  'Neurocritical Care Society SE Kılavuzu 2012',
  'published'
),

-- Q21
(
  'nöroloji', 3,
  'Subaraknoid kanama şüphesinde BT negatif ise bir sonraki adım nedir?',
  '[{"text": "MRI", "is_correct": false}, {"text": "Lumbar ponksiyon", "is_correct": true}, {"text": "BT anjiyografi", "is_correct": false}, {"text": "Gözlem ve taburcu", "is_correct": false}]',
  'SAK şüphesinde BT sensitivitesi ilk 6 saatte %98-100, 24 saatte %93, 5. günde %50''ye düşer. BT negatifse ve klinik şüphe devam ediyorsa lumbar ponksiyon yapılmalıdır. LP''de ksantokromi ve/veya eritrosit artışı (son tüpte azalmayan) SAK''ı destekler.',
  'Perry JJ, et al. BMJ 2011',
  'published'
),

-- Q22
(
  'nöroloji', 2,
  'Glasgow Koma Skalası''nda en düşük toplam puan kaçtır?',
  '[{"text": "0", "is_correct": false}, {"text": "1", "is_correct": false}, {"text": "3", "is_correct": true}, {"text": "5", "is_correct": false}]',
  'GKS üç bileşenden oluşur: Göz açma (1-4), sözel yanıt (1-5), motor yanıt (1-6). Her bileşende minimum puan 1''dir, dolayısıyla toplam minimum puan 3''tür. GKS ≤8 koma olarak kabul edilir ve havayolu koruması (entübasyon) değerlendirilmelidir.',
  'Teasdale G, Jennett B. Lancet 1974',
  'published'
),

-- Q23
(
  'nöroloji', 3,
  'Akut iskemik inmede mekanik trombektomi için hangi damar oklüzyonu endikasyon oluşturur?',
  '[{"text": "Posterior serebral arter", "is_correct": false}, {"text": "Anterior serebral arter", "is_correct": false}, {"text": "Büyük damar oklüzyonu (ICA veya MCA M1)", "is_correct": true}, {"text": "Tüm serebral arterler", "is_correct": false}]',
  'Mekanik trombektomi endikasyonu: internal karotid arter (ICA) veya orta serebral arter M1 segmenti oklüzyonu, NIHSS ≥6, ASPECTS ≥6, semptom başlangıcından itibaren 6 saate kadar (seçilmiş hastalarda DAWN/DEFUSE-3 ile 24 saate kadar). 5 büyük RCT (MR CLEAN, ESCAPE, EXTEND-IA, SWIFT PRIME, REVASCAT) ile kanıtlanmıştır.',
  'AHA/ASA İnme Kılavuzu 2019',
  'published'
),

-- Q24
(
  'nöroloji', 1,
  'Hangisi artmış kafa içi basıncının (KİBAS) klasik bulgusu olan Cushing triadının bileşeni DEĞİLDİR?',
  '[{"text": "Hipertansiyon", "is_correct": false}, {"text": "Bradikardi", "is_correct": false}, {"text": "Düzensiz solunum", "is_correct": false}, {"text": "Taşikardi", "is_correct": true}]',
  'Cushing triadı artmış KİBAS''ın geç ve ciddi bulgusudur: (1) hipertansiyon (sistolik), (2) bradikardi, (3) düzensiz solunum (Cheyne-Stokes gibi). Bu triad herniasyon öncesi bulgu olup acil müdahale gerektirir. Taşikardi bu triadın parçası değildir.',
  'Tintinalli''s Emergency Medicine, 9th Ed.',
  'published'
),

-- =====================================================
-- RESÜSİTASYON (6 soru)
-- =====================================================

-- Q25
(
  'resüsitasyon', 1,
  'Erişkin KPR''de göğüs kompresyonu hızı dakikada kaç olmalıdır?',
  '[{"text": "60-80/dk", "is_correct": false}, {"text": "80-100/dk", "is_correct": false}, {"text": "100-120/dk", "is_correct": true}, {"text": "120-140/dk", "is_correct": false}]',
  'AHA 2020 kılavuzuna göre yüksek kaliteli KPR: kompresyon hızı 100-120/dk, derinlik 5-6 cm, tam göğüs geri dönüşü sağlanmalı, kompresyon kesintileri minimalize edilmeli (<10 sn). Kompresyon/ventilasyon oranı ileri havayolu yoksa 30:2, varsa sürekli kompresyon + 10 soluk/dk.',
  'AHA BLS/ACLS Kılavuzu 2020',
  'published'
),

-- Q26
(
  'resüsitasyon', 2,
  'Şoklanabilir ritimler hangileridir?',
  '[{"text": "Asistoli ve nabızsız elektriksel aktivite", "is_correct": false}, {"text": "Ventriküler fibrilasyon ve nabızsız ventriküler taşikardi", "is_correct": true}, {"text": "Atriyal fibrilasyon ve sinüs taşikardisi", "is_correct": false}, {"text": "Supraventriküler taşikardi ve atriyal flutter", "is_correct": false}]',
  'Kardiyak arrest ritimlerinden şoklanabilir olanlar: ventriküler fibrilasyon (VF) ve nabızsız ventriküler taşikardi (nVT). Şoklanamaz ritimler: asistoli ve nabızsız elektriksel aktivite (NEA/PEA). VF/nVT''de erken defibrilasyon sağkalımı artıran en önemli faktördür.',
  'AHA ACLS Kılavuzu 2020',
  'published'
),

-- Q27
(
  'resüsitasyon', 2,
  'Kardiyak arrestte adrenalin (epinefrin) dozu ve uygulama sıklığı nedir?',
  '[{"text": "0.5 mg, her 5 dakikada", "is_correct": false}, {"text": "1 mg, her 3-5 dakikada", "is_correct": true}, {"text": "2 mg, her 5 dakikada", "is_correct": false}, {"text": "1 mg, her 10 dakikada", "is_correct": false}]',
  'Kardiyak arrestte epinefrin 1 mg IV/IO her 3-5 dakikada uygulanır. Şoklanamaz ritimlerde (asistoli/NEA) mümkün olan en kısa sürede, şoklanabilir ritimlerde (VF/nVT) 2. şoktan sonra verilmeye başlanır. Amiodaron VF/nVT''de 3. şoktan sonra 300 mg IV bolus.',
  'AHA ACLS Kılavuzu 2020',
  'published'
),

-- Q28
(
  'resüsitasyon', 3,
  'Nabızsız elektriksel aktivitenin (NEA/PEA) geri dönüşümlü nedenleri arasında hangisi "H''ler ve T''ler" sınıflamasında YER ALMAZ?',
  '[{"text": "Hipovolemi", "is_correct": false}, {"text": "Tromboz (koroner)", "is_correct": false}, {"text": "Hipoglisemi", "is_correct": true}, {"text": "Tansiyon pnömotoraks", "is_correct": false}]',
  'NEA/PEA''nın geri dönüşümlü nedenleri — H''ler: Hipovolemi, Hipoksi, Hidrojen iyonu (asidoz), Hipo/hiperkalemi, Hipotermi. T''ler: Tansiyon pnömotoraks, Tamponad (kardiyak), Toksinler, Tromboz (koroner ve pulmoner). Hipoglisemi bu listede yer almaz, ancak bilinç değişikliğine neden olabilir.',
  'AHA ACLS Kılavuzu 2020',
  'published'
),

-- Q29
(
  'resüsitasyon', 2,
  'Post-kardiyak arrest bakımında hedef vücut sıcaklığı yönetimi (TTM) için önerilen sıcaklık aralığı nedir?',
  '[{"text": "30-32°C", "is_correct": false}, {"text": "32-36°C", "is_correct": true}, {"text": "36-37°C", "is_correct": false}, {"text": "37-38°C", "is_correct": false}]',
  'TTM2 çalışması ve AHA 2020 güncellemesine göre spontan dolaşım dönen ancak bilinci açılmayan hastalarda hedef sıcaklık 32-36°C arasında en az 24 saat sürdürülmelidir. Ateş (>37.7°C) önlenmesi kritik öneme sahiptir.',
  'AHA Post-Cardiac Arrest Care 2020',
  'published'
),

-- Q30
(
  'resüsitasyon', 4,
  'Erişkinde rapid sequence intubation (RSI) sırasında preoksijenasyon amacıyla hedeflenen minimum süre nedir?',
  '[{"text": "1 dakika", "is_correct": false}, {"text": "3 dakika", "is_correct": true}, {"text": "5 dakika", "is_correct": false}, {"text": "10 dakika", "is_correct": false}]',
  'RSI öncesi preoksijenasyon: yüksek akım O₂ ile en az 3 dakika tidal volüm solunum veya 8 vital kapasite soluk (daha hızlı ancak kooperasyon gerektirir). Amaç fonksiyonel rezidüel kapasitedeki nitrojeni oksijenle değiştirmektir. Obez ve gebe hastalarda desatürasyon daha hızlı olur.',
  'Walls RM. Manual of Emergency Airway Management, 5th Ed.',
  'published'
),

-- =====================================================
-- TOKSİKOLOJİ (5 soru)
-- =====================================================

-- Q31
(
  'toksikoloji', 2,
  'Parasetamol (asetaminofen) zehirlenmesinde spesifik antidot hangisidir?',
  '[{"text": "Nalokson", "is_correct": false}, {"text": "Flumazenil", "is_correct": false}, {"text": "N-asetilsistein (NAC)", "is_correct": true}, {"text": "Aktif kömür", "is_correct": false}]',
  'Parasetamol zehirlenmesinde antidot N-asetilsistein (NAC)''dir. NAC glutatyon öncüsü olarak toksik metabolit NAPQI''yi nötralize eder. IV protokol: 150 mg/kg yükleme (60 dk), 50 mg/kg (4 saat), 100 mg/kg (16 saat). İlk 8 saatte başlanırsa etkinliği en yüksektir.',
  'Rumack BH, et al. Pediatrics 1975',
  'published'
),

-- Q32
(
  'toksikoloji', 3,
  'Trisiklik antidepresan (TCA) zehirlenmesinde EKG''de en önemli bulgu hangisidir?',
  '[{"text": "ST elevasyonu", "is_correct": false}, {"text": "QRS genişlemesi >100 ms", "is_correct": true}, {"text": "QT uzaması", "is_correct": false}, {"text": "P dalga yokluğu", "is_correct": false}]',
  'TCA zehirlenmesinde sodyum kanal blokajına bağlı QRS genişlemesi en önemli kardiyotoksisite göstergesidir. QRS >100 ms nöbet riskini, QRS >160 ms ventriküler aritmi riskini artırır. Tedavi: IV sodyum bikarbonat (1-2 mEq/kg bolus), hedef pH 7.50-7.55.',
  'Liebelt EL. J Toxicol Clin Toxicol 1995',
  'published'
),

-- Q33
(
  'toksikoloji', 1,
  'Opioid zehirlenmesinde antidot hangisidir?',
  '[{"text": "Atropin", "is_correct": false}, {"text": "Nalokson", "is_correct": true}, {"text": "Pralidoksim", "is_correct": false}, {"text": "Kalsiyum glukonat", "is_correct": false}]',
  'Opioid zehirlenmesinde antidot naloksondur. Mu-opioid reseptör antagonistidir. Doz: 0.04-0.4 mg IV, gerekirse 2-3 dakikada tekrarlanır (maks. 10 mg). Yarı ömrü kısadır (30-90 dk), uzun etkili opioidlerde infüzyon veya tekrarlı doz gerekebilir.',
  'AHA Toksikolojik Aciller Kılavuzu 2020',
  'published'
),

-- Q34
(
  'toksikoloji', 3,
  'Organofosfat zehirlenmesinde görülen muskarinik belirti ve bulguları hangi kısaltma ile özetlenir?',
  '[{"text": "MUDDLES", "is_correct": false}, {"text": "SLUDGE/BBB", "is_correct": true}, {"text": "FAST", "is_correct": false}, {"text": "OPQRST", "is_correct": false}]',
  'SLUDGE: Salivation (salivasyon), Lacrimation (lakrimasyon), Urination (üriner inkontinans), Defecation (defekasyon), GI cramps (GI kramplar), Emesis (kusma). BBB: Bronchorrhea, Bronchospasm, Bradycardia. Tedavi: atropin (muskarinik antagonist) + pralidoksim (kolinesteraz reaktivatör).',
  'Eddleston M, et al. Lancet 2008',
  'published'
),

-- Q35
(
  'toksikoloji', 2,
  'Metanol zehirlenmesinde hangi antidot kullanılır?',
  '[{"text": "N-asetilsistein", "is_correct": false}, {"text": "Fomepizol veya etanol", "is_correct": true}, {"text": "Nalokson", "is_correct": false}, {"text": "Desferoksamin", "is_correct": false}]',
  'Metanol ve etilen glikol zehirlenmesinde alkol dehidrogenaz inhibitörleri kullanılır: fomepizol (tercih edilen) veya IV etanol. Toksik metabolitlerin (formik asit/okzalik asit) oluşumunu engeller. Ağır vakalarda hemodiyaliz endikasyonu vardır.',
  'Brent J, et al. NEJM 2001',
  'published'
),

-- =====================================================
-- ENFEKSİYON (5 soru)
-- =====================================================

-- Q36
(
  'enfeksiyon', 2,
  'Sepsis-3 tanımına göre qSOFA kriterlerinden hangisi dahil DEĞİLDİR?',
  '[{"text": "Sistolik kan basıncı ≤100 mmHg", "is_correct": false}, {"text": "Solunum hızı ≥22/dk", "is_correct": false}, {"text": "Ateş ≥38°C", "is_correct": true}, {"text": "Bilinç değişikliği (GKS <15)", "is_correct": false}]',
  'qSOFA (quick SOFA) 3 kriterden oluşur: (1) sistolik KB ≤100 mmHg, (2) solunum hızı ≥22/dk, (3) bilinç değişikliği (GKS <15). 2 veya daha fazla kriter pozitifliği kötü prognoz göstergesidir. Ateş qSOFA''nın bileşeni değildir.',
  'Singer M, et al. JAMA 2016 (Sepsis-3)',
  'published'
),

-- Q37
(
  'enfeksiyon', 2,
  'Sepsiste Surviving Sepsis Campaign''e göre ilk 1 saat içinde yapılması gereken en önemli müdahaleler hangileridir?',
  '[{"text": "Kan kültürü + geniş spektrumlu antibiyotik + 30 mL/kg kristaloid", "is_correct": true}, {"text": "Sadece antibiyotik başla", "is_correct": false}, {"text": "Önce görüntüleme sonra tedavi", "is_correct": false}, {"text": "Vazopresör başla + entübasyon", "is_correct": false}]',
  'Surviving Sepsis Campaign 1 saatlik demeti: (1) laktat ölç, (2) antibiyotik öncesi kan kültürü al, (3) geniş spektrumlu antibiyotik başla, (4) hipotansiyon veya laktat ≥4 mmol/L ise 30 mL/kg kristaloid başla, (5) sıvıya rağmen hipotansiyon devam ederse vazopresör (norepinefrin).',
  'Surviving Sepsis Campaign 2021',
  'published'
),

-- Q38
(
  'enfeksiyon', 1,
  'Menenjit şüphesinde acil serviste yapılması gereken ilk müdahale nedir?',
  '[{"text": "BT çekip LP yapmak", "is_correct": false}, {"text": "Kan kültürü alıp ampirik antibiyotik başlamak", "is_correct": true}, {"text": "LP yapmak ve sonucu beklemek", "is_correct": false}, {"text": "Nöroloji konsültasyonu istemek", "is_correct": false}]',
  'Bakteriyel menenjit şüphesinde antibiyotik gecikmesi mortaliteyi artırır. Kan kültürü alınıp hemen ampirik antibiyotik (seftriakson ± vankomisin ± deksametazon) başlanmalıdır. LP için BT endikasyonu varsa (immünsüpresyon, papil ödem, fokal nörolojik defisit) antibiyotik LP''yi beklememelidir.',
  'Van de Beek D, et al. NEJM 2006',
  'published'
),

-- Q39
(
  'enfeksiyon', 3,
  'Nekrotizan fasiit için LRINEC skoru hesaplanırken hangi parametre dahil DEĞİLDİR?',
  '[{"text": "CRP", "is_correct": false}, {"text": "Lökosit sayısı", "is_correct": false}, {"text": "Prokalsitonin", "is_correct": true}, {"text": "Hemoglobin", "is_correct": false}]',
  'LRINEC (Laboratory Risk Indicator for Necrotizing Fasciitis) skoru 6 parametreden oluşur: CRP, lökosit sayısı, hemoglobin, sodyum, kreatinin ve glukoz. Skor ≥6: nekrotizan fasiit şüphesi yüksek. Prokalsitonin bu skorun bileşeni değildir. Kesin tanı cerrahi eksplorasyonla konur.',
  'Wong CH, et al. Crit Care Med 2004',
  'published'
),

-- Q40
(
  'enfeksiyon', 2,
  'Toplum kökenli pnömonide acil servisten taburculuk kararı için hangi skorlama sistemi kullanılır?',
  '[{"text": "APACHE II", "is_correct": false}, {"text": "CURB-65", "is_correct": true}, {"text": "SOFA", "is_correct": false}, {"text": "HEART", "is_correct": false}]',
  'CURB-65 skoru toplum kökenli pnömonide ağırlık değerlendirmesi için kullanılır: Confusion (konfüzyon), Urea >7 mmol/L, Respiratory rate ≥30/dk, Blood pressure (sistolik <90 veya diyastolik ≤60), yaş ≥65. 0-1 puan: ayaktan tedavi, 2: kısa hastane yatışı, 3-5: yoğun bakım düşünülmeli.',
  'Lim WS, et al. Thorax 2003',
  'published'
),

-- =====================================================
-- PEDİATRİ (5 soru)
-- =====================================================

-- Q41
(
  'pediatri', 1,
  'Çocuklarda dehidratasyon değerlendirmesinde hangi bulgu AĞIR dehidratasyonu gösterir?',
  '[{"text": "Hafif susuzluk hissi", "is_correct": false}, {"text": "Çökük göz, turgor kaybı, letarji", "is_correct": true}, {"text": "Normal vital bulgular", "is_correct": false}, {"text": "Sadece azalmış idrar çıkışı", "is_correct": false}]',
  'Ağır dehidratasyon (>%9 kayıp) bulguları: çökük göz, çok azalmış cilt turgoru, soğuk-nemli ekstremiteler, letarji veya bilinç değişikliği, kapiller dolum >3 sn, taşikardi, hipotansiyon. Tedavi: 20 mL/kg SF bolus, gerekirse tekrarlanır.',
  'WHO Dehidratasyon Sınıflaması',
  'published'
),

-- Q42
(
  'pediatri', 2,
  'PECARN kafa travması kuralına göre 2 yaş altı çocukta BT endikasyonu olan bulgu hangisidir?',
  '[{"text": "Küçük skalp hematomu", "is_correct": false}, {"text": "GKS <15 veya palpabl kafatası kırığı", "is_correct": true}, {"text": "1 kez kusma", "is_correct": false}, {"text": "60 cm''den düşme", "is_correct": false}]',
  'PECARN <2 yaş yüksek risk: GKS <15, değişmiş mental durum, palpabl kafatası kırığı → BT endikasyonu. Orta risk: oksipital/parietal/temporal hematom, LOC ≥5 sn, şiddetli mekanizma, anormal davranış (ebeveyn ifadesi) → gözlem veya BT. Yüksek risk yoksa ciddi yaralanma riski <%0.02.',
  'Kuppermann N, et al. Lancet 2009 (PECARN)',
  'published'
),

-- Q43
(
  'pediatri', 3,
  'Pediatrik resüsitasyonda defibrilasyon dozu (ilk şok) kaç J/kg''dır?',
  '[{"text": "1 J/kg", "is_correct": false}, {"text": "2 J/kg", "is_correct": true}, {"text": "4 J/kg", "is_correct": false}, {"text": "10 J/kg", "is_correct": false}]',
  'Pediatrik VF/nVT''de defibrilasyon dozları: İlk şok 2 J/kg, 2. şok 4 J/kg, sonraki şoklar 4-10 J/kg (maks. 10 J/kg veya erişkin dozu). Pediyatrik paddler 10 kg altında, erişkin paddler 10 kg üstünde kullanılır.',
  'AHA PALS Kılavuzu 2020',
  'published'
),

-- Q44
(
  'pediatri', 2,
  'Çocuklarda febril konvülziyonun tipik yaş aralığı nedir?',
  '[{"text": "0-6 ay", "is_correct": false}, {"text": "6 ay - 5 yaş", "is_correct": true}, {"text": "5-10 yaş", "is_correct": false}, {"text": "10-15 yaş", "is_correct": false}]',
  'Basit febril konvülziyon 6 ay ile 5 yaş arasında, ateşle tetiklenen, jeneralize tonik-klonik, <15 dakika süren ve 24 saatte tekrarlamayan nöbetlerdir. Çocukların %2-5''inde görülür. Prognoz iyidir, epilepsi riski genel popülasyondan çok az yüksektir.',
  'AAP Febril Nöbet Kılavuzu 2011',
  'published'
),

-- Q45
(
  'pediatri', 2,
  'Çocuklarda anafılaksi tedavisinde adrenalin (epinefrin) dozu ve uygulama yolu nedir?',
  '[{"text": "0.01 mg/kg IV", "is_correct": false}, {"text": "0.01 mg/kg IM (1:1000), maks. 0.5 mg", "is_correct": true}, {"text": "0.1 mg/kg IM", "is_correct": false}, {"text": "0.5 mg SC", "is_correct": false}]',
  'Anafılakside ilk tedavi IM adrenalindir: 0.01 mg/kg (1:1000 solüsyon), maks. 0.5 mg, uyluk anterolateraline uygulanır. Gerekirse 5-15 dakikada tekrarlanabilir. IV adrenalin sadece şoka yanıt vermeyen veya kardiyak arrest durumunda kullanılır.',
  'WAO/EAACI Anafılaksi Kılavuzu 2020',
  'published'
),

-- =====================================================
-- PULMONER (3 soru)
-- =====================================================

-- Q46
(
  'pulmoner', 2,
  'Wells skoruna göre pulmoner emboli olasılığı "yüksek" kabul edilen puan aralığı hangisidir?',
  '[{"text": "0-1 puan", "is_correct": false}, {"text": "2-4 puan", "is_correct": false}, {"text": "5-6 puan", "is_correct": false}, {"text": ">6 puan", "is_correct": true}]',
  'Wells PE skoru: düşük olasılık 0-1, orta olasılık 2-6, yüksek olasılık >6. Alternatif ikili sınıflama: PE olası değil ≤4, PE olası >4. Düşük olasılıkta D-dimer negatifse PE ekarte edilebilir; yüksek olasılıkta direkt BT pulmoner anjiyografi yapılmalıdır.',
  'Wells PS, et al. Thromb Haemost 2000',
  'published'
),

-- Q47
(
  'pulmoner', 3,
  'Ağır astım atağında (status asthmaticus) ilk tedavide hangisi YOKTUR?',
  '[{"text": "Nebül salbutamol", "is_correct": false}, {"text": "IV magnezyum sülfat", "is_correct": false}, {"text": "Sistemik kortikosteroid", "is_correct": false}, {"text": "Profilaktik antibiyotik", "is_correct": true}]',
  'Ağır astım atağı tedavisi: (1) oksijen (SpO₂ >%93), (2) nebül beta-2 agonist (salbutamol) sürekli veya sık aralıklarla, (3) ipratropium bromür, (4) sistemik kortikosteroid (IV metilprednizolon veya PO prednizolon), (5) IV MgSO₄ (2 g, 20 dk). Rutin antibiyotik endikasyonu yoktur.',
  'GINA 2023 & BTS/SIGN Astım Kılavuzu',
  'published'
),

-- Q48
(
  'pulmoner', 2,
  'Spontan pnömotoraksta hangi durumda göğüs tüpü takılması gerekir?',
  '[{"text": "Tüm pnömotorakslarda", "is_correct": false}, {"text": "Büyük pnömotoraks (>%50 veya semptomatik)", "is_correct": true}, {"text": "Sadece bilateral pnömotorakslarda", "is_correct": false}, {"text": "Sadece rekürren pnömotorakslarda", "is_correct": false}]',
  'Primer spontan pnömotoraksta küçük (<2 cm apikal mesafe) ve asemptomatik ise gözlem yeterlidir. Büyük (≥2 cm), semptomatik, bilateral veya tansiyon pnömotoraksında tüp torakostomi gerekir. İğne aspirasyon da ilk basamak olarak bazı kılavuzlarda önerilmektedir.',
  'BTS Pnömotoraks Kılavuzu 2010',
  'published'
),

-- =====================================================
-- GENEL (2 soru)
-- =====================================================

-- Q49
(
  'genel', 1,
  'Hiperkalemide EKG''de görülen ilk bulgu hangisidir?',
  '[{"text": "QRS genişlemesi", "is_correct": false}, {"text": "Sivri T dalgaları", "is_correct": true}, {"text": "P dalga kaybı", "is_correct": false}, {"text": "Sinüzoidal dalga", "is_correct": false}]',
  'Hiperkalemide EKG değişiklikleri potasyum düzeyine göre sıralanır: (1) K⁺ 5.5-6.5: sivri, dar, simetrik T dalgaları, (2) K⁺ 6.5-7.5: PR uzaması, P dalga amplitüdü azalması, QRS genişlemesi, (3) K⁺ >7.5: P dalga kaybı, sinüzoidal dalga, VF riski. İlk tedavi: IV kalsiyum glukonat (kardiyoprotektif).',
  'Tintinalli''s Emergency Medicine, 9th Ed.',
  'published'
),

-- Q50
(
  'genel', 2,
  'Anafilakside adrenalin uygulamasından sonra yanıt alınamazsa bir sonraki adım nedir?',
  '[{"text": "Oral antihistaminik ver", "is_correct": false}, {"text": "Adrenalin dozunu 5-15 dk''da tekrarla + IV sıvı resüsitasyonu", "is_correct": true}, {"text": "Sadece steroid ver ve bekle", "is_correct": false}, {"text": "CPR başla", "is_correct": false}]',
  'Anafilakside IM adrenaline yanıt yoksa: (1) 5-15 dakikada IM adrenalin tekrarla, (2) IV sıvı resüsitasyonu (20 mL/kg kristaloid bolus), (3) refrakter vakalarda IV adrenalin infüzyonu (0.1-1 mcg/kg/dk), (4) glukagon (beta-bloker kullanan hastalar), (5) vazopresör desteği düşün.',
  'WAO/EAACI Anafılaksi Kılavuzu 2020',
  'published'
);
