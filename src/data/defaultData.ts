import { WebsiteSettings, ConditionService, BlogPost, Testimonial, DoctorVideo, MediaItem, LungHotspot } from '../types';
import doctorKritarthClinicHero from '../assets/images/doctor_kritarth_clinic_hero.webp';

export const initialSettings: WebsiteSettings = {
  doctorName: "Dr. Kritarth",
  doctorDesignation: "Consultant – Pulmonary Medicine",
  qualifications: "MBBS | MD (Medicine) | DM Pulmonary & Critical Care Medicine",
  fellowships: "DM Pulmonary & Critical Care Medicine, PGIMER Chandigarh",
  primaryHospital: "Livasa Hospital Mohali",
  heroBadge: "PULMONOLOGY • RESPIRATORY • SLEEP MEDICINE",
  heroHeadline: "Breathe Better. Sleep Better. Live Better.",
  heroSubtitle: "Specialized clinical care for complex lung diseases, respiratory infections, sleep-related breathing disorders, and advanced interventional pulmonology.",
  heroDoctorImage: doctorKritarthClinicHero,
  heroImageUrl: doctorKritarthClinicHero,
  heroImageUrlDesktop: doctorKritarthClinicHero,
  heroImageUrlMobile: doctorKritarthClinicHero,
  heroImagePositionDesktop: "72% 30%",
  heroImagePositionMobile: "50% 18%",
  heroDesktopPositionX: 72,
  heroDesktopPositionY: 30,
  heroDesktopZoom: 100,
  heroMobilePositionX: 50,
  heroMobilePositionY: 18,
  heroMobileZoom: 100,
  heroImageFit: "cover",
  heroDisplayMode: "cover",
  heroOverlayStrength: 65,
  heroOverlayDirection: "left-to-right",
  heroImageAlt: "Dr. Kritarth – Consultant Pulmonologist & Sleep Specialist",
  aboutDoctorImage: doctorKritarthClinicHero,
  lungsVisualImage: "/src/assets/images/translucent_3d_lungs_1789018628489.jpg",
  clinicSuiteImage: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
  phonePrimary: "+91 7986148502",
  phoneEmergency: "+91 172 5000000",
  whatsappNumber: "+917986148502",
  email: "drkritarth.pulmo@gmail.com",
  addresses: [
    {
      id: "livasa-mohali",
      hospital: "Livasa Hospital, Sector 71, Mohali",
      address: "Sector 71, Mohali",
      timing: "10:00 AM – 04:00 PM",
      days: "Monday – Saturday",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.12!2d76.732!3d30.704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzE0LjQiTiA3NsKwNDMnNTUuMiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
      mapDirectUrl: "https://maps.google.com/?q=Livasa+Hospital+Mohali"
    },
    {
      id: "dhillon-medical-center",
      hospital: "Dhillon Medical Center, Phase 7, Mohali",
      address: "Phase 7, Mohali",
      timing: "By Prior Appointment",
      days: "Monday – Saturday",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3419.0!2d76.11!3d31.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA3JzEyLjAiTiA3NsKwMDYnMzYuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
      mapDirectUrl: "https://maps.google.com/?q=Dhillon+Medical+Center"
    }
  ],
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com"
  },
  analytics: {
    gaMeasurementId: "G-EXAMPLE999",
    gscVerification: "",
    metaPixelId: ""
  },
  medicalDisclaimer: "Information on this website is for educational purposes only and does not constitute formal medical diagnosis or replace personalized consultation with a qualified medical professional. Always seek the advice of your physician for any medical concern.",
  emergencyNotice: "If you are experiencing severe breathlessness, bluish lips, coughing heavy blood, or acute chest pain, please visit your nearest hospital Emergency Department immediately.",
  seoDefaults: {
    title: "Dr. Kritarth – Pulmonologist & Sleep Specialist in Mohali | Livasa Hospital",
    description: "Consultant Pulmonologist Dr. Kritarth (DM Pulmonology, PGIMER). Comprehensive care for asthma, COPD, ILD, sleep apnea, bronchoscopy and critical care.",
    keywords: "Pulmonologist in Mohali, Lung specialist Mohali, Chest doctor Chandigarh, Asthma specialist, COPD treatment, Sleep apnea test, EBUS Bronchoscopy Mohali"
  }
};

export const symptomList = [
  {
    id: "cough",
    title: "Persistent Cough",
    description: "Cough lasting over 3 to 8 weeks, with or without sputum production.",
    targetSlug: "pulmonary-infections",
    iconName: "Stethoscope"
  },
  {
    id: "sob",
    title: "Shortness of Breath",
    description: "Difficulty breathing during ordinary exertion or while resting at night.",
    targetSlug: "asthma",
    iconName: "Wind"
  },
  {
    id: "wheezing",
    title: "Wheezing & Whistling",
    description: "High-pitched musical sound during expiration caused by airway narrowing.",
    targetSlug: "copd",
    iconName: "Activity"
  },
  {
    id: "congestion",
    title: "Chest Congestion",
    description: "Feeling of tightness, heavy phlegm, or fullness in the chest cavity.",
    targetSlug: "bronchiectasis",
    iconName: "ShieldAlert"
  },
  {
    id: "snoring",
    title: "Loud Snoring",
    description: "Noisy nighttime breathing with audible gasps or witnessed breathing pauses.",
    targetSlug: "sleep-apnea",
    iconName: "Moon"
  },
  {
    id: "sleepiness",
    title: "Daytime Sleepiness",
    description: "Excessive fatigue, unrefreshing morning sleep, and daytime drowsiness.",
    targetSlug: "sleep-apnea",
    iconName: "Coffee"
  },
  {
    id: "infections",
    title: "Frequent Lung Infections",
    description: "Recurrent bouts of bronchitis, pneumonia, or long-standing fever with sputum.",
    targetSlug: "bronchiectasis",
    iconName: "Thermometer"
  },
  {
    id: "hemoptysis",
    title: "Blood in Sputum",
    description: "Streaks of blood or coughing up red tinged sputum (requires urgent evaluation).",
    targetSlug: "tuberculosis",
    iconName: "AlertTriangle"
  }
];

export const lungHotspotsData: LungHotspot[] = [
  {
    id: "airways",
    name: "Airways (Trachea & Main Bronchi)",
    badge: "Conduit Zone",
    anatomicalPosition: "Upper Central Thorax",
    description: "Problems affecting the central airways may cause audible wheezing, persistent breathlessness, or chronic coughing. Narrowing or hyper-responsiveness leads to airflow limitation.",
    conditionsAssociated: ["Asthma", "Tracheal Stenosis", "Foreign Body Obstruction", "Bronchial Hyper-reactivity"],
    investigations: ["Spirometry / PFT", "Flexible Bronchoscopy", "High-Resolution CT (HRCT)"],
    x: 50,
    y: 28
  },
  {
    id: "bronchi",
    name: "Bronchial Tree & Subsegmental Branches",
    badge: "Airway Branches",
    anatomicalPosition: "Mid-zone Bilateral Lungs",
    description: "The bronchial network divides repeatedly to deliver oxygenated air deep into lung tissue. Chronic inflammation and mucus pooling can damage bronchial walls permanently.",
    conditionsAssociated: ["COPD / Chronic Bronchitis", "Bronchiectasis", "Acute Bronchitis", "Airway Infections"],
    investigations: ["Sputum Microbiology", "Impulse Oscillometry", "Bronchial Wash / BAL"],
    x: 38,
    y: 44
  },
  {
    id: "alveoli",
    name: "Alveoli (Microscopic Air Sacs)",
    badge: "Gas Exchange Unit",
    anatomicalPosition: "Peripheral Parenchyma",
    description: "Over 300 million tiny elastic sacs where oxygen passes into the bloodstream and carbon dioxide is expelled. Destruction or fluid filling compromises blood oxygen levels.",
    conditionsAssociated: ["Emphysema", "Pneumonia", "Acute Respiratory Distress (ARDS)", "Pulmonary Edema"],
    investigations: ["DLCO (Diffusion Capacity)", "Arterial Blood Gas (ABG)", "Chest Computed Tomography"],
    x: 65,
    y: 52
  },
  {
    id: "tissue",
    name: "Lung Parenchyma & Interstitium",
    badge: "Structural Scaffold",
    anatomicalPosition: "Interlobular Septa & Tissue",
    description: "The delicate connective tissue supporting blood vessels and alveoli. Inflammation and progressive scarring (fibrosis) make the lungs stiff, reducing breathing capacity.",
    conditionsAssociated: ["Idiopathic Pulmonary Fibrosis", "Hypersensitivity Pneumonitis", "Sarcoidosis", "Autoimmune ILDs"],
    investigations: ["HRCT Thorax (Inspiratory & Expiratory)", "Cryobiopsy", "Transbronchial Lung Biopsy"],
    x: 32,
    y: 62
  },
  {
    id: "pleura",
    name: "Pleural Membranes & Cavity",
    badge: "Protective Envelope",
    anatomicalPosition: "Outer Lung Lining",
    description: "A double-layered lubricating membrane enclosing the lungs. Fluid accumulation (pleural effusion), air leaks (pneumothorax), or infections cause sharp chest pain on deep breathing.",
    conditionsAssociated: ["Pleural Effusion", "Empyema", "Pneumothorax", "Pleurisy", "Pleural Thickening"],
    investigations: ["Thoracic Ultrasound", "Diagnostic Pleural Tap", "Medical Thoracoscopy"],
    x: 74,
    y: 68
  }
];

export const initialServices: ConditionService[] = [
  {
    id: "asthma",
    title: "Asthma & Airway Allergies",
    slug: "asthma",
    category: "condition",
    iconName: "Wind",
    featuredImage: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
    shortDescription: "Personalized management plans for allergic and non-allergic bronchial asthma, severe refractory asthma, and exercise-induced airway constriction.",
    detailedOverview: "Asthma is a chronic inflammatory disorder of the airways characterized by variable and recurring symptoms, airflow obstruction, bronchial hyper-responsiveness, and underlying inflammation. With systematic medical assessment and personalized inhaler optimization, the majority of patients can attain symptom-free daily living and normal physical activities.",
    commonSymptoms: [
      "Frequent episodes of breathlessness, especially at night or early morning",
      "Musical wheezing whistling sound when breathing out",
      "Dry, hacking, or productive cough worsening after cold air or exercise",
      "Chest tightness and sensation of restricted air entry"
    ],
    possibleCauses: [
      "Environmental allergens (pollen, house dust mites, animal dander, mold)",
      "Seasonal weather transitions and sudden drops in ambient temperature",
      "Air pollution, smoke, vehicle exhaust, and occupational fumes",
      "Viral respiratory tract infections triggering airway hyper-reactivity",
      "Genetic predisposition and family history of atopy"
    ],
    whenToConsult: [
      "You require rescue reliever inhalers more than twice a week",
      "Waking up at night coughing or breathless",
      "Your physical exercise or daily walking is restricted by breathlessness",
      "Previous asthma attacks requiring steroid tablets or emergency care"
    ],
    diagnosisApproach: [
      "Comprehensive clinical history and allergen identification",
      "Spirometry with bronchodilator reversibility testing",
      "Fractional exhaled Nitric Oxide (FeNO) assessment for eosinophilic inflammation",
      "Peak Expiratory Flow (PEF) diurnal variability monitoring"
    ],
    treatmentApproach: [
      "Phenotype-guided maintenance controller inhalers (ICS / LABA / LAMA)",
      "Inhaler technique education and spacer optimization",
      "Biologic therapies (anti-IgE, anti-IL5) for refractory severe asthma",
      "Asthma Action Plan for early recognition of flare-ups"
    ],
    faqs: [
      {
        question: "Are inhalers habit-forming?",
        answer: "No. Inhalers deliver microscopic microgram doses directly to the bronchial tubes where needed, avoiding systemic drug distribution and ensuring safety for long-term control."
      },
      {
        question: "Can an asthmatic person participate in competitive sports?",
        answer: "Yes. With proper preventative controller therapy, individuals with asthma participate and excel across sports disciplines."
      }
    ],
    metaTitle: "Asthma Specialist in Mohali | Dr. Kritarth Pulmonology Clinic",
    metaDescription: "Evidence-based asthma management in Mohali. Spirometry, inhaler technique optimization, and biological therapies for severe asthma.",
    order: 1,
    isFeatured: true,
    hidden: false
  },
  {
    id: "copd",
    title: "COPD & Chronic Bronchitis",
    slug: "copd",
    category: "condition",
    iconName: "Activity",
    featuredImage: "/src/assets/images/translucent_3d_lungs_1789018628489.jpg",
    shortDescription: "Structured diagnostic evaluation, pulmonary rehabilitation guidance, and triple-therapy management for Chronic Obstructive Pulmonary Disease.",
    detailedOverview: "Chronic Obstructive Pulmonary Disease (COPD) is a progressive lung condition characterized by persistent respiratory symptoms and airflow limitation due to airway and alveolar abnormalities. It primarily encompasses chronic bronchitis and emphysema, frequently linked to long-term exposure to noxious gases or biomass smoke.",
    commonSymptoms: [
      "Progressive breathlessness initially on exertion, later even at rest",
      "Chronic daily cough producing sputum or phlegm",
      "Frequent chest infections requiring antibiotics",
      "Lack of stamina, unexplained weight loss, and morning lethargy"
    ],
    possibleCauses: [
      "Tobacco smoking (cigarettes, bidis, hookah)",
      "Indoor air pollution from biomass fuel, chulha smoke, or crop burning",
      "Occupational dust, silica, and chemical vapors",
      "Alpha-1 antitrypsin deficiency in younger non-smokers"
    ],
    whenToConsult: [
      "Cough with sputum lasting months over consecutive years",
      "Increasing difficulty climbing stairs or walking uphill",
      "Repeated hospitalizations for sudden breathing exacerbations"
    ],
    diagnosisApproach: [
      "Post-bronchodilator Spirometry (confirming FEV1/FVC < 0.70)",
      "Chest HRCT to differentiate emphysema patterns",
      "6-Minute Walk Test (6MWT) with continuous pulse oximetry",
      "Arterial Blood Gas (ABG) for hypercapnia assessment"
    ],
    treatmentApproach: [
      "Smoking cessation support and biomass smoke mitigation",
      "Long-acting dual bronchodilators (LABA/LAMA) and triple therapy",
      "Pulmonary rehabilitation and diaphragmatic breathing exercises",
      "Long-Term Oxygen Therapy (LTOT) and non-invasive ventilation (BiPAP) when indicated"
    ],
    faqs: [
      {
        question: "Can COPD be reversed?",
        answer: "While damaged alveolar architecture cannot be rebuilt, optimal therapy significantly improves breathing comfort, halts accelerated lung decline, and prevents dangerous flare-ups."
      }
    ],
    metaTitle: "COPD Treatment in Mohali | Dr. Kritarth Pulmonologist",
    metaDescription: "Specialist medical care for COPD, emphysema, and chronic bronchitis in Mohali and Chandigarh. PFT testing and rehabilitation guidance.",
    order: 2,
    isFeatured: true,
    hidden: false
  },
  {
    id: "ild",
    title: "Interstitial Lung Disease (ILD)",
    slug: "interstitial-lung-disease",
    category: "condition",
    iconName: "Layers",
    featuredImage: "/src/assets/images/translucent_3d_lungs_1789018628489.jpg",
    shortDescription: "Accurate diagnosis and antifibrotic therapies for pulmonary fibrosis, hypersensitivity pneumonitis, sarcoidosis, and autoimmune lung involvement.",
    detailedOverview: "Interstitial Lung Diseases (ILD) comprise a broad group of over 200 conditions that cause progressive inflammation and scarring (fibrosis) of the interstitium—the delicate tissue surrounding your lungs' air sacs. Early expert evaluation is vital to distinguish treatable inflammatory ILDs from progressive fibrosing disorders.",
    commonSymptoms: [
      "Dry, non-productive persistent cough resistant to usual cough syrups",
      "Gradual but progressive breathlessness during exertion",
      "Velcro-like crackles audible over lower lung fields on doctor examination",
      "Clubbing (widening/rounding of fingertips and nails)"
    ],
    possibleCauses: [
      "Idiopathic Pulmonary Fibrosis (IPF)",
      "Connective tissue disorders (Rheumatoid arthritis, Scleroderma, Sjögren's)",
      "Hypersensitivity Pneumonitis (exposure to pigeons, parakeets, humidifiers, molds)",
      "Occupational dusts (silica, asbestos, coal dust)"
    ],
    whenToConsult: [
      "Unexplained breathlessness in individuals over 50 years of age",
      "Abnormal reticular or ground-glass opacities seen on a routine chest X-ray",
      "Drop in oxygen saturation (SpO2 below 92%) upon walking"
    ],
    diagnosisApproach: [
      "Dedicated High-Resolution Computed Tomography (HRCT) with prone and expiratory scans",
      "Complete Pulmonary Function Test with Diffusion Capacity (DLCO)",
      "Comprehensive autoimmune serology workup",
      "Cryobiopsy or Bronchoalveolar Lavage (BAL) via interventional bronchoscopy"
    ],
    treatmentApproach: [
      "Antifibrotic medications (Nintedanib, Pirfenidone) to slow progression",
      "Targeted immunosuppressive agents for autoimmune and inflammatory ILD",
      "Antigen avoidance protocols (eliminating bird feather/mold exposure)",
      "Supplemental ambulatory oxygen therapy and pulmonary rehab"
    ],
    faqs: [
      {
        question: "Is ILD the same as lung cancer?",
        answer: "No. ILD is an inflammatory and fibrotic condition of the lung scaffold, not a malignant tumor, though it requires specialized ongoing pulmonology monitoring."
      }
    ],
    metaTitle: "Interstitial Lung Disease (ILD) Specialist Mohali | Dr. Kritarth",
    metaDescription: "Expert diagnosis and advanced care for Pulmonary Fibrosis, Hypersensitivity Pneumonitis and ILDs at Livasa Hospital Mohali.",
    order: 3,
    isFeatured: true,
    hidden: false
  },
  {
    id: "bronchiectasis",
    title: "Bronchiectasis & Phlegm Clearance",
    slug: "bronchiectasis",
    category: "condition",
    iconName: "ShieldAlert",
    featuredImage: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
    shortDescription: "Specialized sputum clearance protocols, targeted antimicrobial therapy, and long-term airway preservation for dilated bronchial airways.",
    detailedOverview: "Bronchiectasis is a chronic condition where the bronchi become abnormally widened, scarred, and unable to clear mucus naturally. This creates a cycle of mucus pooling, bacterial colonization, recurrent infections, and progressive airway destruction.",
    commonSymptoms: [
      "Daily production of large volumes of thick, discolored phlegm",
      "Episodes of blood in the sputum (hemoptysis)",
      "Frequent chest infections requiring repeated antibiotic courses",
      "Chronic chest fatigue, halitosis, and weight loss"
    ],
    possibleCauses: [
      "Past severe lung infections (childhood measles, severe pneumonia, tuberculosis)",
      "Immunoglobulin deficiencies and impaired immune responses",
      "Allergic Bronchopulmonary Aspergillosis (ABPA)",
      "Ciliary dyskinesia syndromes"
    ],
    whenToConsult: [
      "You cough up sputum every single day for months",
      "You observe streaks of fresh red blood when clearing your throat",
      "Chest infections keep recurring every few months"
    ],
    diagnosisApproach: [
      "HRCT Thorax (signet ring sign, bronchial dilation, bronchial wall thickening)",
      "Sputum culture for Pseudomonas aeruginosa and atypical mycobacteria",
      "Total serum IgE and Aspergillus-specific testing",
      "Immune profile evaluation"
    ],
    treatmentApproach: [
      "Airway clearance techniques (Oscillating PEP devices, postural drainage)",
      "Nebulized hypertonic saline and mucolytics",
      "Targeted oral or inhaled antibiotics for bacterial eradication",
      "Bronchial artery embolization (BAE) for significant hemoptysis"
    ],
    faqs: [
      {
        question: "Can physiotherapy help with bronchiectasis?",
        answer: "Yes, daily chest physiotherapy and active cycle of breathing techniques are the cornerstone of keeping the airways clear and preventing infection."
      }
    ],
    metaTitle: "Bronchiectasis Treatment in Mohali | Dr. Kritarth",
    metaDescription: "Specialized care for bronchiectasis, recurrent phlegm, and airway clearance in Mohali and Tricity.",
    order: 4,
    isFeatured: true,
    hidden: false
  },
  {
    id: "pulmonary-infections",
    title: "Pulmonary Infections & Pneumonia",
    slug: "pulmonary-infections",
    category: "condition",
    iconName: "Thermometer",
    featuredImage: "/src/assets/images/translucent_3d_lungs_1789018628489.jpg",
    shortDescription: "Accurate microbiological identification and inpatient/outpatient management of community-acquired pneumonia, fungal infections, and post-viral complications.",
    detailedOverview: "Respiratory infections range from self-limiting acute bronchitis to severe bacterial or fungal pneumonia that can compromise gas exchange. Prompt microbiological identification prevents antibiotic misuse and reduces risk of pleural effusion or sepsis.",
    commonSymptoms: [
      "High fever with chills and shivering",
      "Chest pain that sharpens when inhaling deeply or coughing",
      "Green, yellow, or rust-colored sputum",
      "Rapid, shallow breathing and mental confusion in elderly patients"
    ],
    possibleCauses: [
      "Bacterial pathogens (Streptococcus pneumoniae, Klebsiella, Legionella)",
      "Viral pathogens (Influenza, RSV, COVID-19, Adenovirus)",
      "Atypical bacteria (Mycoplasma pneumoniae)",
      "Fungal infections (Aspergillus, Mucor in immunocompromised individuals)"
    ],
    whenToConsult: [
      "Fever with cough that fails to improve after 3 days of standard medicines",
      "Difficulty catching your breath while resting",
      "Bluish tint on lips or fingers indicating falling oxygen levels"
    ],
    diagnosisApproach: [
      "Chest Radiograph or Low-Dose CT Thorax",
      "Blood cultures, complete blood counts, and inflammatory biomarkers (CRP/Procalcitonin)",
      "Sputum Gram stain and molecular PCR panels",
      "Bronchoscopy with protected brush specimen for non-resolving pneumonia"
    ],
    treatmentApproach: [
      "Pathogen-directed antibiotic or antiviral regimens",
      "Oxygen supplementation and close vital monitoring",
      "Intravenous fluids and electrolyte stabilization",
      "Follow-up imaging to ensure complete clearance of consolidation"
    ],
    faqs: [
      {
        question: "Is pneumonia contagious?",
        answer: "The microbes causing respiratory infections can spread via airborne droplets, though an individual's immunity, age, and baseline lung health determine if pneumonia develops."
      }
    ],
    metaTitle: "Pneumonia & Lung Infections Mohali | Dr. Kritarth",
    metaDescription: "Comprehensive diagnosis and treatment for complex lung infections, pneumonia, and post-viral lung complications in Mohali.",
    order: 5,
    isFeatured: true,
    hidden: false
  },
  {
    id: "tuberculosis",
    title: "Tuberculosis & Drug-Resistant TB",
    slug: "tuberculosis",
    category: "condition",
    iconName: "AlertTriangle",
    featuredImage: "/src/assets/images/translucent_3d_lungs_1789018628489.jpg",
    shortDescription: "Evidence-based management of pulmonary tuberculosis, extrapulmonary TB, and complex drug-resistant (MDR/XDR-TB) regimens with therapeutic monitoring.",
    detailedOverview: "Tuberculosis (TB) is a bacterial infection caused by Mycobacterium tuberculosis, primarily affecting the lungs. In India, timely diagnosis through modern molecular platforms (CBNAAT/GeneXpert) allows cure while preventing transmission and drug resistance.",
    commonSymptoms: [
      "Cough lasting longer than two weeks",
      "Low-grade fever, typically rising during evenings",
      "Profuse night sweats drenching sleepwear",
      "Unintended significant weight loss and loss of appetite",
      "Blood in cough (hemoptysis)"
    ],
    possibleCauses: [
      "Inhalation of Mycobacterium tuberculosis airborne droplets",
      "Reactivation of latent TB infection during periods of lowered immunity",
      "Close contact with an untreated active pulmonary TB patient",
      "Comorbidities such as diabetes mellitus, chronic kidney disease, or immunosuppressive medications"
    ],
    whenToConsult: [
      "Any cough exceeding 2-3 weeks in duration with unexplained fever",
      "Unexplained weight loss with persistent tiredness",
      "Coughing up fresh blood"
    ],
    diagnosisApproach: [
      "CBNAAT / Truenat (GeneXpert) rapid molecular testing for TB DNA & Rifampicin resistance",
      "Acid-Fast Bacilli (AFB) smear and MGIT liquid culture",
      "High-Resolution CT Thorax for cavitary and nodular patterns",
      "Bronchoscopy with BAL if patient is sputum-negative"
    ],
    treatmentApproach: [
      "Standard weight-adjusted four-drug regimen (HRZE) for drug-susceptible TB",
      "Line Probe Assay (LPA) guided newer oral regimens (Bedaquiline based) for MDR-TB",
      "Monthly liver function and visual acuity monitoring during therapy",
      "Nutritional guidance and therapeutic compliance tracking"
    ],
    faqs: [
      {
        question: "Can TB be completely cured?",
        answer: "Yes, when treated with the correct regimen taken strictly as prescribed for the complete duration, tuberculosis is curable in the vast majority of cases."
      }
    ],
    metaTitle: "Tuberculosis (TB) Specialist Mohali | Dr. Kritarth Pulmonologist",
    metaDescription: "Accurate CBNAAT diagnosis and complete treatment for pulmonary TB and drug-resistant tuberculosis in Mohali.",
    order: 6,
    isFeatured: true,
    hidden: false
  },
  {
    id: "pleural-disease",
    title: "Pleural Diseases & Thoracentesis",
    slug: "pleural-disease",
    category: "condition",
    iconName: "Shield",
    featuredImage: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
    shortDescription: "Ultrasound-guided diagnostic and therapeutic thoracentesis, chest tube insertion, and medical thoracoscopy for pleural fluid and air leaks.",
    detailedOverview: "The pleural space is the thin area between the chest wall and the lungs. Accumulation of fluid (pleural effusion), infected pus (empyema), or trapped air (pneumothorax) compresses the lung, leading to sharp breathing pain and severe dyspnea.",
    commonSymptoms: [
      "Sharp, stabbing chest pain worsened by deep breathing or coughing (pleuritic pain)",
      "Rapidly worsening shortness of breath",
      "Inability to lie flat comfortably on the affected side",
      "Fever when associated with pleural infection or empyema"
    ],
    possibleCauses: [
      "Infections: Parapneumonic effusion, tubercular pleural effusion, empyema",
      "Cardiac, renal, or hepatic failure causing transudative fluid buildup",
      "Malignancy (metastatic adenocarcinoma, mesothelioma)",
      "Rupture of lung blebs causing spontaneous pneumothorax"
    ],
    whenToConsult: [
      "Sudden sharp chest pain accompanied by breathlessness",
      "Chest X-ray shows blunting of costophrenic angles or a white-out hemithorax",
      "Persistent fluid accumulation despite initial drainage"
    ],
    diagnosisApproach: [
      "Bedside Thoracic Ultrasound (identifying septations, fluid pockets, and safe puncture sites)",
      "Diagnostic Pleural Fluid Tap: Biochemical (Protein, LDH, Glucose, ADA), Cytology, and Cultures",
      "Contrast-Enhanced CT Thorax for pleural thickening or nodularity",
      "Rigid / Semi-rigid Medical Thoracoscopy for direct visualization and pleural biopsy"
    ],
    treatmentApproach: [
      "Ultrasound-guided therapeutic aspiration of pleural fluid",
      "Small-bore pigtail catheter or intercostal chest tube insertion",
      "Intrapleural fibrinolytic therapy for loculated empyema",
      "Chemical pleurodesis to prevent recurrent malignant pleural fluid accumulation"
    ],
    faqs: [
      {
        question: "Is fluid removal painful?",
        answer: "The procedure is performed under local anesthesia after ultrasound mapping. Most patients experience immediate relief of breathing restriction with minimal discomfort."
      }
    ],
    metaTitle: "Pleural Effusion & Thoracentesis in Mohali | Dr. Kritarth",
    metaDescription: "Expert ultrasound-guided pleural tap, chest drain insertion, and medical thoracoscopy at Livasa Hospital Mohali.",
    order: 7,
    isFeatured: true,
    hidden: false
  },
  {
    id: "sleep-apnea",
    title: "Sleep Medicine & Sleep Apnea",
    slug: "sleep-apnea",
    category: "sleep",
    iconName: "Moon",
    featuredImage: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
    shortDescription: "Level 1 In-Lab Polysomnography, Home Sleep Apnea Testing (HSAT), and CPAP/BiPAP precision titration for restorative, healthy sleep.",
    detailedOverview: "Obstructive Sleep Apnea (OSA) is a sleep-related breathing disorder where the upper airway repeatedly collapses during sleep, resulting in oxygen drops and micro-arousals. If left untreated, OSA significantly increases the risk of high blood pressure, stroke, heart failure, and vehicular accidents.",
    commonSymptoms: [
      "Loud, habitual snoring that disturbs bed partners",
      "Witnessed pauses in breathing followed by sudden gasps or chokes during sleep",
      "Waking up with a dry mouth, morning headache, or grogginess",
      "Excessive daytime sleepiness (falling asleep during meetings, reading, or driving)",
      "Difficulty concentrating, irritability, and frequent nighttime urination (nocturia)"
    ],
    possibleCauses: [
      "Excess weight and increased neck circumference narrowing the upper airway",
      "Anatomical factors: Enlarged tonsils, elongated uvula, retrognathia",
      "Relaxation of throat muscles during deep REM sleep",
      "Alcohol consumption or sedative medications before bedtime"
    ],
    whenToConsult: [
      "Your bed partner notices you stop breathing while asleep",
      "You score high on daytime sleepiness scales (Epworth Sleepiness Scale)",
      "Uncontrolled hypertension despite taking multiple blood pressure medications",
      "You never feel refreshed despite 8 hours in bed"
    ],
    diagnosisApproach: [
      "Level 1 Comprehensive In-Lab Polysomnography (monitoring EEG, EOG, EMG, ECG, Airflow, Chest Effort, SpO2)",
      "Level 3 Home Sleep Apnea Testing (HSAT) for select clinical candidates",
      "Apnea-Hypopnea Index (AHI) and Oxygen Desaturation Index (ODI) calculation",
      "Upper airway assessment by pulmonologist"
    ],
    treatmentApproach: [
      "Continuous Positive Airway Pressure (CPAP / Auto-CPAP) therapy",
      "Proper mask fitting and compliance counseling",
      "Weight reduction, lifestyle modification, and positional therapy",
      "Dental mandibular advancement splints for mild to moderate anatomical cases"
    ],
    faqs: [
      {
        question: "Does snoring always mean I have sleep apnea?",
        answer: "Not all snorers have sleep apnea, but heavy snoring with daytime fatigue, choking arousals, or high blood pressure is a strong indicator requiring a diagnostic sleep study."
      },
      {
        question: "Is CPAP comfortable to sleep with?",
        answer: "Modern CPAP devices are whisper-quiet and use heated humidification with ultra-light silicone masks. Most patients adapt quickly once they feel daytime vitality return."
      }
    ],
    metaTitle: "Sleep Apnea Test & Treatment in Mohali | Dr. Kritarth",
    metaDescription: "Polysomnography sleep study, snoring evaluation, and CPAP therapy by Dr. Kritarth, Sleep Specialist at Livasa Hospital Mohali.",
    order: 8,
    isFeatured: true,
    hidden: false
  },
  {
    id: "bronchoscopy",
    title: "Flexible & Rigid Bronchoscopy",
    slug: "bronchoscopy",
    category: "interventional",
    iconName: "Stethoscope",
    featuredImage: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
    shortDescription: "Advanced direct airway visualization, transbronchial lung biopsy, therapeutic mucus plug clearance, and foreign body removal.",
    detailedOverview: "Bronchoscopy is a minimally invasive endoscopic procedure allowing direct visualization of the tracheobronchial tree using a flexible fiberoptic scope equipped with a high-definition digital camera. It provides definitive diagnostic tissue sampling and life-saving therapeutic interventions.",
    commonSymptoms: [
      "Investigating non-resolving lung shadows on CT scans",
      "Investigating unexplained coughing of blood (hemoptysis)",
      "Suspected foreign body aspiration in adults and adolescents",
      "Evaluating persistent unresolved atelectasis or collapsed lung lobe"
    ],
    possibleCauses: [
      "Suspicious lung nodules or endobronchial lesions",
      "Chronic unexplained cough resistant to medical therapy",
      "Suspected fungal, mycobacterial, or opportunistic lung infections in immunocompromised individuals"
    ],
    whenToConsult: [
      "When imaging indicates an abnormal mass or opacity requiring tissue biopsy",
      "Recurrent focal infections in the same lung segment",
      "Post-radiation or post-surgical airway narrowing"
    ],
    diagnosisApproach: [
      "Detailed pre-procedure cardiac and coagulation screening",
      "High-Definition video bronchoscopy under conscious sedation",
      "Bronchoalveolar Lavage (BAL) for microbiological and cytological examination",
      "Endobronchial biopsy and transbronchial needle aspiration (TBNA)"
    ],
    treatmentApproach: [
      "Therapeutic clearance of tenacious mucus plugs in intensive care patients",
      "Balloon dilatation for benign tracheobronchial strictures",
      "Airway foreign body extraction using grasping forceps and baskets",
      "Topical hemostatic application for endobronchial bleeding control"
    ],
    faqs: [
      {
        question: "Is bronchoscopy performed under general anesthesia?",
        answer: "Most diagnostic flexible bronchoscopies are performed safely under local throat spray with gentle conscious sedation. Patients remain calm and comfortable throughout the 15-20 minute procedure."
      }
    ],
    metaTitle: "Bronchoscopy Specialist in Mohali | Dr. Kritarth",
    metaDescription: "Advanced diagnostic and therapeutic bronchoscopy by DM Pulmonologist Dr. Kritarth at Livasa Hospital Mohali.",
    order: 9,
    isFeatured: true,
    hidden: false
  },
  {
    id: "ebus",
    title: "Endobronchial Ultrasound (EBUS-TBNA)",
    slug: "ebus",
    category: "interventional",
    iconName: "Search",
    featuredImage: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
    shortDescription: "Minimally invasive ultrasound-guided biopsy of mediastinal and hilar lymph nodes without requiring surgical incisions.",
    detailedOverview: "Endobronchial Ultrasound (EBUS) is a sophisticated interventional pulmonology technique combining flexible bronchoscopy with miniature high-frequency ultrasound. It enables direct real-time visualization through the airway wall to safely biopsy deep mediastinal and hilar lymph nodes, replacing open surgical mediastinoscopy.",
    commonSymptoms: [
      "Enlarged mediastinal or hilar lymph nodes discovered on CT or PET scan",
      "Suspected sarcoidosis or tubercular mediastinal lymphadenopathy",
      "Accurate staging of lung cancers (N1 to N3 nodal mapping)",
      "Unexplained mediastinal mass requiring histological confirmation"
    ],
    possibleCauses: [
      "Granulomatous disorders (Tuberculosis, Sarcoidosis)",
      "Thoracic malignancies requiring precise genetic biomarker analysis (EGFR, ALK, PD-L1)",
      "Lymphoma and metastatic lesions"
    ],
    whenToConsult: [
      "CT or PET scan reports indicate lymphadenopathy in stations 2R, 2L, 4R, 4L, 7, 10, or 11",
      "To avoid invasive chest surgery for tissue diagnosis",
      "When molecular typing is required for personalized cancer therapies"
    ],
    diagnosisApproach: [
      "Dedicated contrast-enhanced CT / PET-CT review",
      "Linear probe EBUS with real-time Doppler to prevent vascular puncture",
      "Transbronchial Needle Aspiration (TBNA) with 21G/22G specialized needles",
      "Rapid On-Site Cytological Evaluation (ROSE) to ensure diagnostic adequacy"
    ],
    treatmentApproach: [
      "High diagnostic yield (above 90-95%) with minimal procedural risk",
      "Immediate sample allocation for GeneXpert, histopathology, and next-generation sequencing",
      "Same-day daycare discharge in majority of patients"
    ],
    faqs: [
      {
        question: "How does EBUS compare to open surgery?",
        answer: "EBUS is performed through the natural airway with no external incisions, minimal recovery time, and significantly reduced risk compared to conventional surgical mediastinoscopy."
      }
    ],
    metaTitle: "EBUS Bronchoscopy in Mohali | Dr. Kritarth",
    metaDescription: "State-of-the-art EBUS-TBNA in Mohali for accurate mediastinal lymph node diagnosis and lung cancer staging.",
    order: 10,
    isFeatured: true,
    hidden: false
  },
  {
    id: "thoracoscopy",
    title: "Medical Thoracoscopy (Pleuroscopy)",
    slug: "thoracoscopy",
    category: "interventional",
    iconName: "Eye",
    featuredImage: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
    shortDescription: "Direct inspection of the pleural cavity under local anesthesia for undiagnosed pleural effusions and targeted biopsy.",
    detailedOverview: "Medical Thoracoscopy (also known as Pleuroscopy) is an interventional technique carried out by pulmonologists in an endoscopy suite under local anesthesia with conscious sedation. Through a single small entry port, the entire pleural space can be visualized, fluid drained, and biopsies obtained from abnormal parietal pleural surfaces.",
    commonSymptoms: [
      "Undiagnosed exudative pleural effusion after non-conclusive pleural fluid tap",
      "Suspected malignant pleural disease or mesothelioma",
      "Recurrent pleural fluid accumulation requiring definitive pleurodesis",
      "Early stage empyema requiring mechanical debridement"
    ],
    possibleCauses: [
      "Tubercular pleurisy with negative fluid microbiology",
      "Metastatic malignancies involving the pleural lining",
      "Chronic inflammatory pleural disorders"
    ],
    whenToConsult: [
      "Repeated pleural taps have failed to identify the cause of lung fluid",
      "Fluid keeps coming back rapidly after each aspiration",
      "CT shows nodular or irregular pleural thickening"
    ],
    diagnosisApproach: [
      "High-resolution thoracic ultrasound assessment of the pleural space",
      "Single-port semi-rigid or rigid pleuroscope insertion",
      "Direct targeted forceps biopsy of suspicious pleural nodules under direct vision",
      "Complete fluid drainage under continuous visualization"
    ],
    treatmentApproach: [
      "Direct vision talc poudrage (chemical pleurodesis) to prevent fluid recurrence",
      "Breakdown of early fibrinous adhesions",
      "Temporary intercostal drain placement for 24-48 hours",
      "Fast track recovery with minimal discomfort"
    ],
    faqs: [
      {
        question: "Is medical thoracoscopy different from VATS surgery?",
        answer: "Yes. Medical thoracoscopy is performed by an interventional pulmonologist using a single small puncture under local anesthesia with conscious sedation, avoiding endotracheal intubation and general anesthesia."
      }
    ],
    metaTitle: "Medical Thoracoscopy Mohali | Dr. Kritarth",
    metaDescription: "Advanced single-port Medical Thoracoscopy (Pleuroscopy) for undiagnosed pleural effusion and pleurodesis in Mohali.",
    order: 11,
    isFeatured: false,
    hidden: false
  }
];

export const initialBlogs: BlogPost[] = [
  {
    id: "asthma-inhaler-guide",
    title: "Are Inhalers Addictive? Common Myths and Scientific Facts About Asthma Therapy",
    slug: "are-inhalers-addictive-myths-and-facts",
    category: "Asthma",
    summary: "Why inhaled medications are safer than oral tablets, how they act directly on the bronchial airways, and why stopping inhalers abruptly triggers severe asthma attacks.",
    content: `
## The Reality About Inhaler Therapy

One of the most frequent questions asked in a pulmonology clinic is: *"Doctor, will taking an inhaler become a lifelong habit or addiction?"*

The short, scientific answer is: **No, inhalers are not addictive.** 

Unlike habit-forming neurological medications, inhalers contain bronchodilators and microgram doses of inhaled corticosteroids (ICS) that treat localized inflammation in your lung's airways. They have no chemical properties that cause psychological or physical dependence.

### Why Inhaled Medicine is Superior to Tablets

When you swallow a medicine in tablet or syrup form:
1. It enters the digestive system.
2. It absorbs into the bloodstream.
3. It travels through the liver, heart, kidneys, and brain.
4. Only a tiny fraction ultimately reaches the lungs.

To deliver an effective dose to the lungs via tablets, you often need **milligrams (mg)** of medication. In contrast, an inhaler delivers **micrograms (mcg)**—often 1/20th to 1/50th of the dose—directly to the target bronchial walls where inflammation exists. This direct targeted delivery minimizes whole-body side effects while maximizing relief.

### The Problem with Stopping Inhalers Abruptly

When patients feel better, they often stop their controller inhalers without doctor consultation. Weeks later, when exposed to dust, viral infection, or cold weather, the untreated underlying airway inflammation flares up into a severe asthma attack. This is not addiction withdrawal—it is simply the uncontrolled underlying chronic condition asserting itself.

### Key Takeaways
- Controller inhalers keep the airway calm and open.
- Using a spacer device significantly improves drug deposition into the lungs.
- Always review your inhaler technique at least once every 6 months with your pulmonologist.
    `,
    featuredImage: "/src/assets/images/asthma_inhaler_1789205198268.jpg",
    date: "August 24, 2026",
    author: "Dr. Kritarth",
    tags: ["Asthma", "Inhalers", "Patient Education", "Pulmonology"],
    status: "published",
    readTime: "4 min read"
  },
  {
    id: "smog-air-pollution-north-india",
    title: "Air Pollution & Winter Smog in Punjab: Protecting Vulnerable Lungs",
    slug: "air-pollution-winter-smog-punjab-protecting-lungs",
    category: "Air Pollution",
    summary: "Practical, medical guidance on surviving hazardous PM2.5 levels, choosing the right masks, and adjusting respiratory controller doses before winter smog begins.",
    content: `
## Understanding Particulate Matter (PM2.5)

Every winter across Punjab, Chandigarh, Mohali, and the wider Indo-Gangetic plain, a combination of weather inversion, vehicular exhaust, and seasonal agricultural burning leads to spikes in AQI (Air Quality Index) surpassing 350-450.

Fine particulate matter smaller than 2.5 microns (PM2.5) is dangerous because it bypasses the normal filtration barriers of your nose and trachea, traveling deep into the terminal alveoli and entering the systemic circulation.

### Who is at Highest Risk?
- Individuals with pre-existing **Asthma** and **COPD**
- Elderly citizens with reduced cardiopulmonary reserve
- Young children whose lung alveoli are still developing
- Post-TB patients with fibrotic or bronchiectatic lung architecture

### Clinical Precautions Recommended by Pulmonologists

1. **Morning Exercise Timing**: Avoid outdoor running or brisk walking in early morning fog, when thermal inversion traps toxic particulates near ground level. Shift physical activity to afternoons or indoor spaces.
2. **Effective Masking**: Cloth masks and surgical 3-ply masks do not filter PM2.5 particulates. If stepping outside during severe AQI, use certified **N95 or FFP2 respirators** ensuring an airtight seal against the nose and jaw.
3. **Pre-Winter Pulmonology Review**: Patients with asthma or COPD should visit their pulmonologist in October or November to step up baseline controller anti-inflammatory doses before severe smog spikes.
4. **Indoor Air Management**: Keep windows closed during peak haze hours. Clean air conditioning filters and consider HEPA air purifiers in bedrooms of vulnerable patients.
    `,
    featuredImage: "/src/assets/images/air_pollution_lung_1789205210529.jpg",
    date: "September 02, 2026",
    author: "Dr. Kritarth",
    tags: ["Air Pollution", "PM2.5", "Mohali", "COPD", "Asthma"],
    status: "published",
    readTime: "5 min read"
  },
  {
    id: "sleep-apnea-silent-strain",
    title: "Is Heavy Snoring Just an Annoyance or a Silent Danger? Understanding Sleep Apnea",
    slug: "is-heavy-snoring-silent-danger-sleep-apnea",
    category: "Sleep Health",
    summary: "How intermittent nighttime airway collapse stresses the heart, drives resistant hypertension, and why a Polysomnography sleep study is the gold standard.",
    content: `
## More Than Just Loud Sleep

In many households, heavy snoring is dismissed as a humorous quirk or a simple sign of deep sleep. In reality, irregular snoring accompanied by snorts, gasping, or visible pauses in breathing is often a sign of **Obstructive Sleep Apnea (OSA)**.

### What Happens During an Apnea Episode?

When you fall into deep sleep, the muscles of your tongue and soft palate relax. In individuals with anatomical narrowing or excess soft tissue:
1. The airway collapses shut completely.
2. Air cannot enter the lungs, despite the chest and diaphragm working hard to breathe.
3. Blood oxygen levels drop dramatically (hypoxemia).
4. The brain experiences a survival panic surge, releasing adrenaline to wake you just enough to reopen the airway with a loud snort.
5. This cycle can repeat 30, 50, or even 80 times per hour of sleep.

### The Cardiovascular Toll

Because the heart and blood vessels are subjected to recurrent nocturnal hypoxia and surges of adrenaline every night, untreated sleep apnea is one of the leading causes of:
- **Resistant Hypertension** (blood pressure not responding to 3 or more medications)
- Cardiac arrhythmias including Atrial Fibrillation
- Increased risk of nocturnal stroke and ischemic heart disease
- Severe daytime drowsiness leading to road accidents

### Diagnosis and CPAP Treatment

A painless overnight diagnostic sleep test (**Polysomnography**) measures your brain waves, airflow, chest movement, and oxygen levels throughout the night. If moderate to severe apnea is confirmed, **Continuous Positive Airway Pressure (CPAP)** acts as an invisible pneumatic splint, keeping your airway open and restoring restful sleep from the very first night.
    `,
    featuredImage: "/src/assets/images/sleep_apnea_monitoring_1789205226727.jpg",
    date: "September 06, 2026",
    author: "Dr. Kritarth",
    tags: ["Sleep Medicine", "Snoring", "Sleep Apnea", "Hypertension"],
    status: "published",
    readTime: "5 min read"
  },
  {
    id: "bronchoscopy-patient-guide",
    title: "What Happens During a Bronchoscopy? A Reassuring Patient Walkthrough",
    slug: "what-happens-during-bronchoscopy-patient-guide",
    category: "Bronchoscopy",
    summary: "A step-by-step breakdown of how modern flexible bronchoscopy is performed comfortably with local anesthesia and gentle conscious sedation.",
    content: `
## Demystifying Airway Endoscopy

Being advised to undergo a "bronchoscopy" can sound intimidating to patients. Knowing what to expect before, during, and after the procedure helps alleviate anxiety.

### Preparation Before the Procedure
- Fasting for at least 4 to 6 hours before the examination.
- Routine blood checks (complete blood count, kidney function, and coagulation profile) to ensure safe margins.
- Pre-procedure discussion about regular medications (especially blood thinners).

### During the Procedure
1. You will be seated comfortably or positioned on an examination bed in the endoscopy suite.
2. A local anesthetic spray (Lidocaine) is administered to numb the back of the throat and mouth. This prevents gagging.
3. A light conscious sedation is provided through an intravenous cannula, making you feel drowsy and relaxed.
4. The doctor gently introduces the ultra-thin flexible video bronchoscope through the mouth or nostril.
5. You can breathe easily throughout the procedure around the bronchoscope.
6. The pulmonologist examines the bronchial walls, collects wash samples (BAL), or performs guided biopsies.
7. The entire active inspection typically takes just 15 to 20 minutes.

### Recovery
You will rest in the daycare observation bay for 1 to 2 hours until the throat numbness wears off. Most patients go home the same day and resume light meals within a couple of hours.
    `,
    featuredImage: "/src/assets/images/bronchoscopy_procedure_1789205239614.jpg",
    date: "September 08, 2026",
    author: "Dr. Kritarth",
    tags: ["Bronchoscopy", "Interventional Pulmonology", "Procedures"],
    status: "published",
    readTime: "4 min read"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    patientInitials: "R. K. S.",
    conditionTreated: "Severe Bronchial Asthma",
    reviewText: "I had suffered from chronic night cough and breathlessness for over four years. Dr. Kritarth accurately identified my allergy triggers and adjusted my inhaler combination. Within two weeks, I was sleeping uninterrupted without coughing. Very patient listener who explains everything clearly.",
    rating: 5,
    date: "August 2026",
    location: "Mohali, Punjab",
    isFeatured: true,
    isPlaceholder: true
  },
  {
    id: "test-2",
    patientInitials: "G. S. B.",
    conditionTreated: "Obstructive Sleep Apnea",
    reviewText: "My snoring was severe and I used to feel exhausted even after 9 hours in bed. Dr. Kritarth conducted a sleep study and recommended a CPAP titration. My daytime focus has completely returned and my morning headaches are gone. Excellent doctor for sleep disorders.",
    rating: 5,
    date: "July 2026",
    location: "Chandigarh",
    isFeatured: true,
    isPlaceholder: true
  },
  {
    id: "test-3",
    patientInitials: "M. P.",
    conditionTreated: "Non-Resolving Pneumonia / Bronchoscopy",
    reviewText: "Underwent bronchoscopy under Dr. Kritarth's care at Livasa Hospital. I was very anxious before the test, but the doctor and nursing staff made me feel completely comfortable. The procedure was smooth and the diagnosis was confirmed promptly.",
    rating: 5,
    date: "August 2026",
    location: "Panchkula",
    isFeatured: true,
    isPlaceholder: true
  }
];

export const initialVideos: DoctorVideo[] = [
  {
    id: "vid-1",
    title: "How to Use a Dry Powder Inhaler (DPI) Correctly",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
    category: "Inhaler Technique",
    duration: "4:15"
  },
  {
    id: "vid-2",
    title: "Recognizing Early Warning Signs of Asthma Attack in Children & Adults",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/src/assets/images/translucent_3d_lungs_1789018628489.jpg",
    category: "Asthma Alert",
    duration: "5:30"
  },
  {
    id: "vid-3",
    title: "Why Heavy Snoring Shouldn't Be Ignored: Sleep Apnea Explained",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: doctorKritarthClinicHero,
    category: "Sleep Disorders",
    duration: "6:10"
  }
];

export const initialMedia: MediaItem[] = [
  {
    id: "media-1",
    filename: "doctor_kritarth_clinic_hero.webp",
    url: doctorKritarthClinicHero,
    category: "Doctor Photos",
    altText: "Dr. Kritarth – Consultant Pulmonologist & Sleep Specialist Livasa Hospital Mohali",
    caption: "Dr. Kritarth, MBBS, MD, DM Pulmonary & Critical Care Medicine (PGIMER Chandigarh)",
    uploadedAt: "2026-09-09",
    fileSize: "420 KB",
    focalPoint: { x: 50, y: 35 }
  },
  {
    id: "media-2",
    filename: "translucent_3d_lungs.jpg",
    url: "/src/assets/images/translucent_3d_lungs_1789018628489.jpg",
    category: "Hero Images",
    altText: "Medical 3D Translucent Lung Anatomy Visualization",
    caption: "Detailed anatomical rendering of the bronchial tree and alveolar oxygenation",
    uploadedAt: "2026-09-09",
    fileSize: "510 KB",
    focalPoint: { x: 50, y: 50 }
  },
  {
    id: "media-3",
    filename: "livasa_hospital_suite.jpg",
    url: "/src/assets/images/livasa_hospital_suite_1789018639103.jpg",
    category: "Hospital",
    altText: "Pulmonary Outpatient Suite and Respiratory Workstation at Livasa Hospital",
    caption: "Modern respiratory consultation facility at Livasa Hospital Mohali",
    uploadedAt: "2026-09-09",
    fileSize: "580 KB",
    focalPoint: { x: 50, y: 50 }
  }
];
