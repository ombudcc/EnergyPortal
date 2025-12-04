import { MasterData, FuelOption, TextContent, MethodologyContent } from '../types';

export const COLORS = {
  primary: '#0ea5e9',   // Sky 500
  secondary: '#64748b', // Slate 500
  accent: '#f59e0b',    // Amber 500
  success: '#10b981',   // Emerald 500
  purple: '#8b5cf6',    // Violet 500
  chart: ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#f43f5e', '#82ca9d']
};

export const masterData: MasterData = {
  industry: {
    total: 1717368, year: 2024,
    subSectors: [ { name: 'Metal Dışı Mineral Ürünler', value: 28.8, code: 'NACE 23', nameEN: 'Non-metallic Mineral Products' }, { name: 'Ana Metal Sanayi', value: 22.7, code: 'NACE 24', nameEN: 'Basic Metal Industry' }, { name: 'Gıda Ürünleri', value: 10.9, code: 'NACE 10', nameEN: 'Food Products' }, { name: 'Tekstil Ürünleri', value: 7.4, code: 'NACE 13', nameEN: 'Textile Products' }, { name: 'Kimyasallar', value: 6.2, code: 'NACE 20', nameEN: 'Chemicals' }, { name: 'İnşaat', value: 4.8, code: 'NACE F', nameEN: 'Construction' }, { name: 'Diğer', value: 19.3, code: 'Diğer', nameEN: 'Other' }, ],
    fuelMix: [ { name: 'Elektrik', value: 485163, nameEN: 'Electricity' }, { name: 'Doğal Gaz', value: 405299, nameEN: 'Natural Gas' }, { name: 'Katı Fosil Yakıtlar', value: 388125, nameEN: 'Solid Fossil Fuels' }, { name: 'Petrol Ürünleri', value: 240432, nameEN: 'Petroleum Products' }, { name: 'Diğer', value: 198349, nameEN: 'Other' } ],
    focusSector: {
      name: 'Metal Dışı Mineral Ürünler',
      nameEN: 'Non-metallic Mineral Products',
      fuelMix: [
        { name: 'Petrol Ürünleri', value: 32.7, nameEN: 'Petroleum Products' },
        { name: 'Katı Fosil Yakıtlar', value: 27.5, nameEN: 'Solid Fossil Fuels' },
        { name: 'Doğal Gaz', value: 18.2, nameEN: 'Natural Gas' },
        { name: 'Elektrik', value: 12.7, nameEN: 'Electricity' },
        { name: 'Diğer', value: 8.9, nameEN: 'Other' }
      ]
    }
  },
  services: {
    total: 501104, year: 2024,
    subSectors: [ { name: 'Toptan ve Perakende Ticaret', value: 28.9, code: 'NACE G', nameEN: 'Wholesale and Retail Trade' }, { name: 'Kamu Yönetimi ve Savunma', value: 22.0, code: 'NACE O', nameEN: 'Public Administration and Defence' }, { name: 'Konaklama ve Yiyecek', value: 15.0, code: 'NACE I', nameEN: 'Accommodation and Food' }, { name: 'Su Temini ve Atık Yön.', value: 10.1, code: 'NACE E', nameEN: 'Water Supply and Waste Mgt.' }, { name: 'Eğitim', value: 5.2, code: 'NACE P', nameEN: 'Education' }, { name: 'Diğer', value: 18.8, code: 'Diğer', nameEN: 'Other' } ],
    fuelMix: [ { name: 'Elektrik', value: 286867, nameEN: 'Electricity' }, { name: 'Doğal Gaz', value: 169373, nameEN: 'Natural Gas' }, { name: 'Petrol Ürünleri', value: 23552, nameEN: 'Petroleum Products' }, { name: 'Yenilenebilir/Diğer', value: 21312, nameEN: 'Renewable/Other' } ],
    dataCenters: { value: 645, unit: 'GWh' }
  },
  transport: {
    total: 1355090, year: 2023, roadTotal: 1069246, aviationTotal: 263683, railTotal: 9905,
    roadFuels: [ { name: 'Motorin (Dizel)', value: 69.4, nameEN: 'Diesel' }, { name: 'LPG', value: 15.8, nameEN: 'LPG' }, { name: 'Benzin', value: 14.6, nameEN: 'Gasoline' }, { name: 'Diğer', value: 0.3, code: 'Diğer', nameEN: 'Other' } ],
    roadVehicles: [ { name: 'Otomobil', value: 46.0, nameEN: 'Passenger Car' }, { name: 'Kamyon', value: 23.4, nameEN: 'Truck' }, { name: 'Kamyonet', value: 19.3, nameEN: 'Small Truck' }, { name: 'Otobüs', value: 6.1, nameEN: 'Bus' }, { name: 'Minibüs', value: 3.6, nameEN: 'Minibus' }, { name: 'Motosiklet', value: 1.6, nameEN: 'Motorcycle' } ],
    fuelMix: [ { name: 'Petrol Ürünleri', value: 1177889, nameEN: 'Petroleum Products' }, { name: 'LPG', value: 168941, nameEN: 'LPG' }, { name: 'Elektrik', value: 5052, nameEN: 'Electricity' }, { name: 'Diğer', value: 3208, nameEN: 'Other' } ],
    aviationSplit: [
      { name: 'Uluslararası', value: 83.1, nameEN: 'International' },
      { name: 'Yurtiçi', value: 16.9, nameEN: 'Domestic' }
    ],
    railSplit: [
      { name: 'Elektrik', value: 51.0, nameEN: 'Electricity' },
      { name: 'Dizel', value: 49.0, nameEN: 'Diesel' }
    ]
  },
  household: {
    total: 1287738, year: 2022,
    uses: [ { name: 'Alan Isıtma', value: 65.3, nameEN: 'Space Heating' }, { name: 'Aydınlatma & El. Aletleri', value: 14.1, nameEN: 'Lighting & Appliances' }, { name: 'Su Isıtma', value: 11.9, nameEN: 'Water Heating' }, { name: 'Pişirme', value: 7.7, nameEN: 'Cooking' }, { name: 'Alan Soğutma/Diğer', value: 1.0, nameEN: 'Space Cooling/Other' } ],
    fuels: [ { name: 'Doğal Gaz', value: 48.3, nameEN: 'Natural Gas' }, { name: 'Elektrik', value: 17.1, nameEN: 'Electricity' }, { name: 'Kömür', value: 14.3, nameEN: 'Coal' }, { name: 'Katı Biyokütle', value: 11.5, nameEN: 'Solid Biomass' }, { name: 'Diğer', value: 8.8, nameEN: 'Other' } ],
    fuelMix: [ { name: 'Doğal Gaz', value: 622000, nameEN: 'Natural Gas' }, { name: 'Elektrik', value: 220203, nameEN: 'Electricity' }, { name: 'Kömür', value: 184149, nameEN: 'Coal' }, { name: 'Katı Biyokütle', value: 148089, nameEN: 'Solid Biomass' }, { name: 'Diğer', value: 113297, nameEN: 'Other' } ],
    heatingFuels: [
       { name: 'Doğal Gaz', value: 56.4, nameEN: 'Natural Gas' },
       { name: 'Kömür', value: 21.6, nameEN: 'Coal' },
       { name: 'Katı Biyokütle', value: 16.9, nameEN: 'Solid Biomass' },
       { name: 'Diğer', value: 5.1, nameEN: 'Other' }
    ]
  },
  pefa: {
    year: 2023,
    finalUseBySector: [ // Petajoule (PJ)
      { name: 'Hanehalkı', value: 1772, nameEN: 'Households', fill: COLORS.success },
      { name: 'Sanayi', value: 1758, nameEN: 'Manufacturing', fill: COLORS.primary },
      { name: 'Hizmet ve Kamu', value: 1275, nameEN: 'Trade, services and public sector', fill: COLORS.purple },
      { name: 'Tarım ve Orman', value: 233, nameEN: 'Agriculture, forestry and fishing', fill: COLORS.accent },
      { name: 'İnşaat', value: 176, nameEN: 'Construction', fill: COLORS.secondary },
    ],
    finalUseByFuel: [ // Petajoule (PJ)
      { name: 'Petrol Ürünleri', value: 2261, nameEN: 'Petroleum products', share: 40.9, fill: COLORS.accent },
      { name: 'Elektrik', value: 1227, nameEN: 'Electricity', share: 22.2, fill: COLORS.primary },
      { name: 'Doğal Gaz', value: 1209, nameEN: 'Natural gas', share: 21.9, fill: COLORS.success },
      { name: 'Kömür Ürünleri', value: 464, nameEN: 'Coal products', share: 8.4, fill: COLORS.secondary },
      { name: 'Isı', value: 282, nameEN: 'Heat', share: 5.1, fill: COLORS.purple },
      { name: 'Diğer Ürünler', value: 88, nameEN: 'Other products', share: 1.6, fill: '#f43f5e' },
    ]
  }
};

export const allFuels: FuelOption[] = [
  { tr: 'Tümü', en: 'All' },
  { tr: 'Elektrik', en: 'Electricity' },
  { tr: 'Doğal Gaz', en: 'Natural Gas' },
  { tr: 'Petrol Ürünleri', en: 'Petroleum Products' },
  { tr: 'LPG', en: 'LPG' },
  { tr: 'Katı Fosil Yakıtlar', en: 'Solid Fossil Fuels' },
  { tr: 'Kömür', en: 'Coal' },
  { tr: 'Katı Biyokütle', en: 'Solid Biomass' },
  { tr: 'Yenilenebilir/Diğer', en: 'Renewable/Other' },
  { tr: 'Diğer', en: 'Other' }
];

export const uniqueFuels = [...new Map(allFuels.map(item => [item['tr'], item])).values()];

export const methodologyDetails: MethodologyContent = {
  TR: {
    introduction: "Bu çalışma, Sanayi, Hizmet ve Ulaştırma sektörlerinde faaliyet gösteren girişimlerin enerji kaynaklarını kullanım yapılarını belirlemeyi, nihai enerji tüketimi hakkında detaylı veri elde etmeyi amaçlamaktadır. Elde edilen veriler, tüketilen enerji kaynaklarının türlerini analiz etmek, ulusal enerji istatistiklerinin uluslararası sınıflandırmalarla uyumunu sağlamak ve enerji politikalarına dayanak oluşturmak için kullanılır. Çalışma, Avrupa Birliği enerji istatistikleri düzenlemeleriyle uyumlu veri üretmeyi hedefler.",
    fuelDefinitions: [
      { term: "Elektrik", definition: "Güneş, rüzgar gibi yenilenebilir kaynaklardan veya petrol, kömür gibi yenilenemeyen kaynaklardan elde edilen, en yaygın kullanılan ikincil enerji türüdür." },
      { term: "Doğal Gaz", definition: "%95 metan ve etan, propan, bütan gibi hidrokarbonlardan oluşan, havadan hafif ve renksiz bir yakıttır." },
      { term: "LNG (Sıvılaştırılmış Doğal Gaz)", definition: "Çoğunlukla metandan oluşan ve atmosfer basıncında soğutularak sıvı hale getirilmiş doğal gazdır." },
      { term: "CNG (Sıkıştırılmış Doğal Gaz)", definition: "Düşük hidrokarbon emisyonlu motorlu araçlar için alternatif yakıt olarak da kullanılan sıkıştırılmış doğal gazdır." },
      { term: "Taşkömürü", definition: "Yüksek karbonlaşma derecesine ve yüksek ısıl değere sahip kömür türüdür." },
      { term: "Antrasit", definition: "Kömürler arasında en yüksek karbon içeriğine (%86-97) ve enerji değerine sahip olan, sert, parlak ve siyah renkli kömür türüdür." },
      { term: "Linyit", definition: "Taşkömüründen daha düşük karbonlaşma derecesine ve daha düşük ısıl değere sahip kömürdür." },
      { term: "Asfaltit", definition: "Yüksek karbon ve düşük uçucu madde içeriğine sahip, sert ve parlak yapılı bir kömür türüdür." },
      { term: "Petrol Ürünleri", definition: "Rafinerilerde ham petrolün işlenmesiyle elde edilen dizel, benzin, fuel-oil, LPG gibi çeşitli yan ürünlerdir." },
      { term: "Biyokütle (Odun, Talaş vb.)", definition: "Doğal ve yenilenebilir karbon içeriğine sahip biyokütle yakıtlarıdır. Isıtma sistemlerinde ve endüstriyel fırınlarda tercih edilir." },
      { term: "Motorini", definition: "Ham petrolün damıtılmasıyla elde edilen ve yüksek kaynama noktasına sahip rafineri ürünüdür." },
      { term: "Benzin", definition: "35°C ile 200°C arasında damıtılan ve içten yanmalı motorlarda kullanılan hafif hidrokarbon karışımıdır." },
      { term: "LPG", definition: "Propan, bütan veya bunların karışımından oluşan sıvılaştırılmış gazdır." }
    ],
    vehicleDefinitions: [
      { term: "Motorlu Taşıt", definition: "İnsan, hayvan ve yük taşımak için kullanılan araçlardır. Makine gücüyle yürütülenlere motorlu taşıt denir." },
      { term: "Otomobil", definition: "Sürücü dahil en fazla dokuz oturma yeri olan ve yolcu taşımak için imal edilmiş motorlu taşıttır." },
      { term: "Otobüs", definition: "Sürücü dahil dokuzdan fazla oturma yeri olan, yolcu taşımak için imal edilmiş motorlu taşıttır." },
      { term: "Kamyon", definition: "Yük taşımak için imal edilmiş, azami yüklü ağırlığı 3500 kg'dan fazla olan motorlu taşıttır." },
      { term: "Kamyonet", definition: "Yük taşımak için imal edilmiş, azami yüklü ağırlığı 3500 kg'ı geçmeyen motorlu taşıttır." },
      { term: "Yüksek Hızlı Tren", definition: "Hızı saatte 200 kilometreyi aşabilen hatlarda çalışan trenlerdir." }
    ],
    otherDefinitions: [
      { term: "Nihai Enerji Tüketimi", definition: "Sektörlerin birincil faaliyetlerini sürdürmek için tükettiği yakıt miktarlarını içerir. Dönüşüm ve enerji dışı amaçlı kullanımlar hariçtir." },
      { term: "Isıl Değer (Calorific Value)", definition: "Bir yakıtın enerji değerini karşılaştırmak için laboratuvarda belirlenen özelliktir. Katı/sıvı yakıtlar için kcal/kg, gazlar için kcal/m3 olarak ifade edilir." },
      { term: "Joule", definition: "Uluslararası Birimler Sistemi'nde enerji, iş veya ısı birimidir. 1 TJ (Terajoule) = 1 trilyon (10^12) joule'dür." }
    ],
    sectoralScope: {
      industry: [
        { sector: "Madencilik ve Taşocakçılığı", codes: ["B (07-09)"] },
        { sector: "İmalat", codes: ["C (10-32)"], description: "Gıda, Tekstil, Kimya, Ana Metal vb." },
        { sector: "İnşaat", codes: ["F"] }
      ],
      services: [
        { sector: "Toptan ve Perakende Ticaret", codes: ["G (45-47)"] },
        { sector: "Konaklama ve Yiyecek", codes: ["I (55-56)"] },
        { sector: "Ulaştırma ve Depolama", codes: ["H (52-53)"] },
        { sector: "Bilgi ve İletişim", codes: ["J"] },
        { sector: "Finans ve Sigorta", codes: ["K"] },
        { sector: "Eğitim", codes: ["P"] },
        { sector: "İnsan Sağlığı", codes: ["Q"] }
      ],
      transport: "Karayolu ve demiryolu taşımacılığı kapsanırken, deniz ve hava taşımacılığı (anket bazlı veride) kapsam dışı bırakılmıştır. İdari kayıtlardan elde edilen verilerle tamamlanmaktadır."
    },
    dataCollection: {
      methods: "Veri toplama yöntemleri Bilgisayar Destekli Web Görüşmesi (CAWI) ve Bilgisayar Destekli Telefon Görüşmesi (CATI)'dir.",
      frequency: "Çalışma yıllık olarak gerçekleştirilir.",
      calculationRules: "Veriler, temsili örneklem üzerinden ağırlıklandırma yapılarak veya tam sayım yöntemiyle genelleştirilir."
    }
  },
  EN: {
    introduction: "This study aims to determine the overall consumption structure of energy sources used by enterprises primarily engaged in the Industrial, Services, and Transport sectors, and to obtain detailed data on final energy consumption. The data is used to analyze energy types, harmonize national statistics with international classifications, and support energy policy making. It aims to compile data compatible with EU regulations.",
    fuelDefinitions: [
      { term: "Electricity", definition: "A secondary type of energy obtained from renewable (solar, wind) or non-renewable (oil, coal) sources. It is the most widely used energy type." },
      { term: "Natural Gas", definition: "A lighter-than-air, colourless fuel consisting of 95% methane and hydrocarbons like ethane, propane, and butane." },
      { term: "LNG (Liquefied Natural Gas)", definition: "Natural gas consisting mostly of methane, cooled to a liquid state at atmospheric pressure." },
      { term: "CNG (Compressed Natural Gas)", definition: "Compressed natural gas used as an alternative fuel for vehicles with low hydrocarbon emissions." },
      { term: "Hard Coal", definition: "Coal with a high degree of carbonization and high calorific value." },
      { term: "Anthracite", definition: "A hard, shiny, black coal with the highest carbon content (86-97%) and energy value among coals." },
      { term: "Lignite", definition: "Coal with a lower degree of carbonization and calorific value than hard coal." },
      { term: "Asphaltite", definition: "A type of coal with high carbon and low volatile matter content, shiny structure, and high energy value." },
      { term: "Petroleum Products", definition: "By-products from crude oil processing, including diesel, gasoline, fuel-oil, LPG, etc." },
      { term: "Biomass (Wood, etc.)", definition: "Natural and renewable carbon content fuels like wood and sawdust, preferred in heating systems." },
      { term: "Diesel Oil", definition: "Refinery product from crude oil distillation with a high boiling point." },
      { term: "Motor Gasoline", definition: "Light hydrocarbon distilled between 35°C and 200°C, used in combustion engines." },
      { term: "LPG", definition: "Liquefied gas consisting of propane, butane, or mixtures thereof." }
    ],
    vehicleDefinitions: [
      { term: "Motor Vehicle", definition: "Vehicles used to transport people/goods powered by machines." },
      { term: "Passenger Car", definition: "Motor vehicle for transporting passengers with no more than nine seats." },
      { term: "Bus", definition: "Motor vehicle for passengers with more than nine seats." },
      { term: "Truck", definition: "Motor vehicle for goods exceeding 3500 kg laden weight." },
      { term: "Small Truck", definition: "Motor vehicle for goods not exceeding 3500 kg." },
      { term: "High-speed Train", definition: "Trains running on lines where speed exceeds 200 km/h." }
    ],
    otherDefinitions: [
      { term: "Final Energy Consumption", definition: "Fuel consumed by sectors to support primary activities, excluding conversion and non-energy uses." },
      { term: "Calorific Value", definition: "Property determined in the laboratory to compare energy values (kcal/kg or kcal/m3)." },
      { term: "Joule", definition: "Unit of energy in the International System. 1 TJ = 1 trillion joules." }
    ],
    sectoralScope: {
      industry: [
        { sector: "Mining and Quarrying", codes: ["B (07-09)"] },
        { sector: "Manufacturing", codes: ["C (10-32)"], description: "Food, Textile, Chemical, Basic Metals, etc." },
        { sector: "Construction", codes: ["F"] }
      ],
      services: [
        { sector: "Wholesale and Retail Trade", codes: ["G (45-47)"] },
        { sector: "Accommodation and Food", codes: ["I (55-56)"] },
        { sector: "Transportation and Storage", codes: ["H (52-53)"] },
        { sector: "Information and Communication", codes: ["J"] },
        { sector: "Financial and Insurance", codes: ["K"] },
        { sector: "Education", codes: ["P"] },
        { sector: "Human Health", codes: ["Q"] }
      ],
      transport: "Road and rail transport are covered in the survey scope. Maritime and air transport are supplemented via administrative records."
    },
    dataCollection: {
      methods: "Data collection methods are Computer-Assisted Web Interviewing (CAWI) and Computer-Assisted Telephone Interviewing (CATI).",
      frequency: "The study is conducted annually.",
      calculationRules: "Data is expanded using weighting factors from census and sampling methods."
    }
  }
};

export const texts: { TR: TextContent; EN: TextContent } = {
  TR: {
    portalTitle: 'Enerji Portalı',
    portalSubtitle: 'Resmi Verilere Dayalı Analiz Platformu',
    navDashboard: 'Genel Bakış',
    navIndustry: 'Sanayi',
    navServices: 'Hizmet',
    navTransport: 'Ulaştırma',
    navHousehold: 'Hanehalkı',
    navEnergyAccounts: 'Enerji Hesapları',
    navMethodology: 'Metodoloji',
    footerText: '© 2025 Enerji İstatistikleri Portalı. Tüm hakları saklıdır.',
    footerSource: 'Veriler TÜİK (Türkiye İstatistik Kurumu) resmi bültenlerinden alınmıştır.',
    unitTJ: 'TJ',
    unitPay: 'Pay (%)',
    filterLabel: 'Enerji Türüne Göre Filtrele:',
    filterAll: 'Tümü',
    detailClick: 'Detaylar için tıkla',
    titleOverview: (fuel: string) => `Türkiye Enerji Görünümü (${fuel})`,
    titleSector: (name: string) => `${name} Sektörü Analizi`,
    titleEnergyAccounts: 'Enerji Hesapları (PEFA) Analizi',
    titleMethodology: 'Teknik Açıklamalar',
    subtitleDashboard: 'Tüm ana sektörlerin nihai enerji tüketim özetleri.',
    subtitleSector: 'Sektöre ait detaylı veri tabloları ve dağılım grafikleri.',
    subtitleEnergyAccounts: 'Enerji Akışları ve Ekonomik Faaliyetlere Göre Dağılım.',
    cardIndustry: 'Sanayi Tüketimi',
    cardHousehold: 'Hanehalkı Tüketimi',
    cardTransport: 'Toplam Ulaştırma',
    cardServices: 'Hizmet Sektörü',
    chartSectorConsumption: 'Sektörel Tüketim (TJ)',
    chartSectorShares: 'Sektörel Paylar (%)',
    chartTooltipConsumption: 'Tüketim (Terajul)',
    tableSummary: (fuel: string) => `Sektörel Özet Tablosu (${fuel})`,
    tableColSector: 'Sektör',
    tableColConsumption: 'Tüketim (TJ)',
    tableColShare: 'Genel Pay (%)',
    tableColNace: 'NACE Kodu',
    tableColSubsector: 'Alt Sektör Adı',
    tableColActivity: 'Faaliyet Alanı',
    tableColFuelSource: 'Enerji Kaynağı',
    tableColFuelConsumption: 'Tüketim (TJ)',
    tableColFuelShare: 'Pay (%)',
    tableColVehicleType: 'Araç Tipi',
    tableColPurpose: 'Amaç',
    tableColFuelType: 'Enerji Türü',
    tableCount: (count: number) => `${count} Kayıt`,
    sourceCardTitle: 'Veri Kaynağı',
    sourceCardDate: 'Son Güncelleme: Kas 2025',
    exportButton: 'Veriyi CSV Olarak İndir',
    methTitle: 'Metodoloji ve Tanımlar',
    methSourceTitle: 'Veri Kaynakları ve Orijinal Bültenler',
    methSourceP: 'Bu portalda sunulan veriler, Türkiye İstatistik Kurumu (TÜİK) tarafından yayınlanan resmi bültenlerden derlenmiştir. Detaylı veri setlerine ve orijinal bültenlere aşağıdaki bağlantılardan ulaşabilirsiniz:',
    methSourceSanayi: 'Sanayi İstatistikleri',
    methSourceHizmet: 'Hizmet İstatistikleri',
    methSourceUlastirma: 'Ulaştırma İstatistikleri',
    methSourceHanehalki: 'Hanehalkı İstatistikleri',
    methSourcePefa: 'Enerji Hesapları (PEFA)',
    methNoteTitle: 'Kısıtlar ve Notlar',
    methNote1Title: 'Yıl Farklılıkları:',
    methNote1: 'Tüm sektörler için aynı referans yılına ait veri bulunmamaktadır. Karşılaştırmalı grafiklerde bu durum dikkate alınmalıdır.',
    methNote2Title: 'Yuvarlama:',
    methNote2: 'Toplam değerler, alt kalemlerin yuvarlanmasından dolayı küçük farklar gösterebilir.',
    methNote3Title: 'Gizlilik:',
    methNote3: 'TÜİK, veri gizliliği nedeniyle bazı alt kırılımları "Diğer" başlığı altında toplayabilir.',
    dataYear: 'Veri Yılı',
    totalLabel: 'Toplam',
    roadDetails: 'Karayolu Detayları (%)',
    usagePurposes: 'Kullanım Amaçları (%)',
    fuelPreferences: 'Yakıt Tercihleri (Mutlak TJ)',
    aviation: 'Havacılık',
    road: 'Karayolu',
    rail: 'Demiryolu',
    allTransportFuels: 'Tüm Ulaştırma Yakıtları',
    pefaTotalUse: 'Toplam Nihai Kullanım',
    pefaTopFuel: 'En çok tüketilen enerji türü',
    pefaTopSector: 'En çok tüketen sektör',
    pefaTitle1: 'Nihai Enerji Kullanımı - Ekonomik Faaliyetler',
    pefaTable1: 'Ekonomik Faaliyetlere Göre Tüketim',
    pefaTable2: 'Nihai Kullanımda Enerji Türü Payları',
    pefaUsageTooltip: 'Kullanım',
    dataCentersTitle: 'Veri Merkezleri',
    dataCentersSub: 'Elektrik Tüketimi (2024)',
    heatingFuelMixTitle: 'Alan Isıtmada Yakıt Dağılımı',
    aviationSplitTitle: 'Havacılık Tüketim Dağılımı',
    railSplitTitle: 'Demiryolu Yakıt Dağılımı',
    industryFocusTitle: 'Sektör Odağı: ',
    industryFocusSub: 'Yakıt Karışımı (En Yoğun Tüketim Grubu)',
    domestic: 'Yurtiçi',
    international: 'Uluslararası',
    diesel: 'Dizel',
    methTabGeneral: 'Genel Bilgi',
    methTabDefinitions: 'Tanımlar',
    methTabScope: 'Kapsam',
    methTabCollection: 'Veri Toplama',
    methDefFuels: 'Enerji Kaynakları',
    methDefVehicles: 'Araç Tanımları',
    methDefOther: 'Diğer Kavramlar'
  },
  EN: {
    portalTitle: 'Energy Portal',
    portalSubtitle: 'Official Data-Driven Analysis Platform',
    navDashboard: 'Dashboard',
    navIndustry: 'Industry',
    navServices: 'Services',
    navTransport: 'Transport',
    navHousehold: 'Household',
    navEnergyAccounts: 'Energy Accounts',
    navMethodology: 'Methodology',
    footerText: '© 2025 Energy Statistics Portal. All rights reserved.',
    footerSource: 'Data compiled from official bulletins of TÜİK (Turkish Statistical Institute).',
    unitTJ: 'TJ',
    unitPay: 'Share (%)',
    filterLabel: 'Filter by Fuel Type:',
    filterAll: 'All',
    detailClick: 'Click for details',
    titleOverview: (fuel: string) => `Turkey Energy Overview (${fuel})`,
    titleSector: (name: string) => `${name} Sector Analysis`,
    titleEnergyAccounts: 'Energy Accounts (PEFA) Analysis',
    titleMethodology: 'Technical Explanations',
    subtitleDashboard: 'Final energy consumption summaries for all major sectors.',
    subtitleSector: 'Detailed data tables and distribution charts for the sector.',
    subtitleEnergyAccounts: 'Energy Flows and Distribution by Economic Activities.',
    cardIndustry: 'Industry Consumption',
    cardHousehold: 'Household Consumption',
    cardTransport: 'Total Transport',
    cardServices: 'Services Sector',
    chartSectorConsumption: 'Sectoral Consumption (TJ)',
    chartSectorShares: 'Sectoral Shares (%)',
    chartTooltipConsumption: 'Consumption (Terajoule)',
    tableSummary: (fuel: string) => `Sectoral Summary Table (${fuel})`,
    tableColSector: 'Sector',
    tableColConsumption: 'Consumption (TJ)',
    tableColShare: 'Overall Share (%)',
    tableColNace: 'NACE Code',
    tableColSubsector: 'Sub-Sector Name',
    tableColActivity: 'Activity Field',
    tableColFuelSource: 'Energy Source',
    tableColFuelConsumption: 'Consumption (TJ)',
    tableColFuelShare: 'Share (%)',
    tableColVehicleType: 'Vehicle Type',
    tableColPurpose: 'Purpose',
    tableColFuelType: 'Fuel Type',
    tableCount: (count: number) => `${count} Records`,
    sourceCardTitle: 'Data Source',
    sourceCardDate: 'Last Update: Nov 2025',
    exportButton: 'Export to CSV',
    methTitle: 'Methodology and Definitions',
    methSourceTitle: 'Data Sources and Original Bulletins',
    methSourceP: 'The data presented in this portal is compiled from official bulletins published by the Turkish Statistical Institute (TÜİK). Detailed data sets and original bulletins can be accessed via the links below:',
    methSourceSanayi: 'Industry Statistics',
    methSourceHizmet: 'Services Statistics',
    methSourceUlastirma: 'Transport Statistics',
    methSourceHanehalki: 'Household Statistics',
    methSourcePefa: 'Energy Accounts (PEFA)',
    methNoteTitle: 'Constraints and Notes',
    methNote1Title: 'Year Differences:',
    methNote1: 'Data for all sectors are not available for the same reference year. This must be considered in comparative charts.',
    methNote2Title: 'Rounding:',
    methNote2: 'Total values may show minor differences due to the rounding of sub-items.',
    methNote3Title: 'Confidentiality:',
    methNote3: 'TÜİK may group some sub-categories under the "Other" heading due to data confidentiality.',
    dataYear: 'Data Year',
    totalLabel: 'Total',
    roadDetails: 'Road Details (%)',
    usagePurposes: 'Usage Purposes (%)',
    fuelPreferences: 'Fuel Preferences (Absolute TJ)',
    aviation: 'Aviation',
    road: 'Road',
    rail: 'Rail',
    allTransportFuels: 'All Transport Fuels',
    pefaTotalUse: 'Total Final Use',
    pefaTopFuel: 'Most consumed fuel',
    pefaTopSector: 'Top consuming sector',
    pefaTitle1: 'Final Energy Use - Economic Activities',
    pefaTable1: 'Consumption by Economic Activities',
    pefaTable2: 'Fuel Shares in Final Use',
    pefaUsageTooltip: 'Usage',
    dataCentersTitle: 'Data Centers',
    dataCentersSub: 'Electricity Consumption (2024)',
    heatingFuelMixTitle: 'Space Heating Fuel Mix',
    aviationSplitTitle: 'Aviation Consumption Split',
    railSplitTitle: 'Rail Fuel Mix',
    industryFocusTitle: 'Sector Focus: ',
    industryFocusSub: 'Fuel Mix (Most Intensive Group)',
    domestic: 'Domestic',
    international: 'International',
    diesel: 'Diesel',
    methTabGeneral: 'General Info',
    methTabDefinitions: 'Definitions',
    methTabScope: 'Scope',
    methTabCollection: 'Data Collection',
    methDefFuels: 'Fuel Definitions',
    methDefVehicles: 'Vehicle Definitions',
    methDefOther: 'Other Concepts'
  }
};

export const SECTOR_MAP: Record<string, string> = {
  'Sanayi': 'industry', 'Sanayi (2024)': 'industry', 'Industry': 'industry', 'Industry (2024)': 'industry',
  'Hizmet': 'services', 'Hizmet (2024)': 'services', 'Services': 'services', 'Services (2024)': 'services',
  'Ulaştırma': 'transport', 'Ulaştırma (2023)': 'transport', 'Transport': 'transport', 'Transport (2023)': 'transport',
  'Hanehalkı': 'household', 'Hanehalkı (2022)': 'household', 'Household': 'household', 'Household (2022)': 'household'
};