'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  subject: string;
  stem: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  clinicalPearl: string;
  keyLearningPoint: string;
  guidelineReference?: string;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: "Cardiology",
    stem: "A 62-year-old man presents with crushing central chest pain radiating to his left arm for the past 45 minutes. His ECG shows ST-elevation in leads V1-V4. He has no contraindications to treatment. What is the most appropriate immediate management?",
    options: [
      "Administer aspirin 300mg, ticagrelor 180mg, and arrange primary PCI",
      "Administer aspirin 300mg and commence thrombolysis",
      "Perform CT coronary angiogram to confirm diagnosis",
      "Start IV heparin infusion and monitor in CCU"
    ],
    correctAnswer: 0,
    explanation: "This patient is presenting with an anterior STEMI (ST-elevation in V1-V4 indicates LAD territory involvement). NICE guidelines recommend primary percutaneous coronary intervention (PCI) as the preferred reperfusion strategy for STEMI if it can be delivered within 120 minutes of the time when fibrinolysis could have been given. Dual antiplatelet therapy with aspirin (300mg loading dose) and a P2Y12 inhibitor (ticagrelor 180mg or prasugrel 60mg) should be administered as soon as possible.\n\nThrombolysis is only considered if primary PCI cannot be delivered within 120 minutes. CT coronary angiography is not appropriate in acute STEMI as it delays definitive treatment. While anticoagulation is important, it is not the priority intervention.",
    clinicalPearl: "Time is muscle! Every 30-minute delay in reperfusion increases mortality by approximately 7.5%. The door-to-balloon time target is <90 minutes.",
    keyLearningPoint: "Primary PCI is superior to thrombolysis for STEMI and should be the default reperfusion strategy in the UK. Always give dual antiplatelet therapy (aspirin + P2Y12 inhibitor) before transfer to the catheter lab.",
    guidelineReference: "NICE NG185: Acute coronary syndromes"
  },
  {
    id: 2,
    subject: "Respiratory",
    stem: "A 45-year-old woman with a 20 pack-year smoking history presents with a 3-month history of progressive breathlessness and productive cough. Spirometry shows FEV1/FVC ratio of 0.62 and FEV1 of 65% predicted. She has had two exacerbations requiring antibiotics in the past year. What is the most appropriate initial inhaled therapy?",
    options: [
      "LABA + LAMA combination inhaler",
      "SABA alone as required",
      "ICS + LABA combination inhaler",
      "LAMA alone"
    ],
    correctAnswer: 0,
    explanation: "This patient has COPD (FEV1/FVC <0.7, significant smoking history, chronic symptoms) with moderate airflow obstruction (FEV1 65% = GOLD grade 2). She has features suggesting higher risk: 2 moderate exacerbations in the past year.\n\nAccording to NICE guidelines (2019), for patients with COPD who have exacerbations or persistent breathlessness despite using a SABA, the recommended initial maintenance therapy is a LABA + LAMA combination. ICS-containing regimens are reserved for patients with features suggesting asthma-COPD overlap or those with frequent exacerbations despite LABA + LAMA therapy.\n\nSABA alone is insufficient for someone with this symptom burden. LAMA alone would be reasonable but LABA + LAMA provides superior bronchodilation and exacerbation reduction.",
    clinicalPearl: "The 'eosinophil count' is now key in COPD management. Blood eosinophils ≥300 cells/μL suggest potential benefit from ICS. Below 100 cells/μL, ICS are unlikely to help and may increase pneumonia risk.",
    keyLearningPoint: "NICE recommends LABA + LAMA as first-line maintenance for COPD with exacerbations. ICS should only be added if eosinophils are elevated (≥300) or asthmatic features are present.",
    guidelineReference: "NICE NG115: Chronic obstructive pulmonary disease"
  },
  {
    id: 3,
    subject: "Gastroenterology",
    stem: "A 58-year-old man presents with a 6-week history of progressive dysphagia, initially to solids and now to liquids. He has lost 8kg in weight. He has a 30 pack-year smoking history and drinks 28 units of alcohol weekly. What is the most appropriate next investigation?",
    options: [
      "Urgent 2-week wait upper GI endoscopy",
      "Barium swallow",
      "CT chest, abdomen and pelvis",
      "Outpatient upper GI endoscopy within 6 weeks"
    ],
    correctAnswer: 0,
    explanation: "This patient has multiple red flags for oesophageal malignancy: progressive dysphagia (solids then liquids suggests mechanical obstruction), significant weight loss, and major risk factors (smoking and alcohol). NICE recommends urgent direct access upper GI endoscopy (within 2 weeks) for patients with dysphagia.\n\nBarium swallow may show a lesion but does not allow tissue diagnosis. CT staging would be appropriate after histological diagnosis is confirmed. Routine outpatient endoscopy is inappropriate given the urgency of the presentation.\n\nThe pattern of dysphagia is important: progressive dysphagia to solids then liquids suggests a mechanical obstruction (stricture/cancer). Dysphagia to liquids more than solids suggests a motility disorder.",
    clinicalPearl: "Dysphagia is ALWAYS a red flag symptom requiring urgent investigation. Never attribute dysphagia to anxiety or globus without excluding organic pathology first.",
    keyLearningPoint: "NICE recommends urgent 2-week wait endoscopy for ANY patient presenting with dysphagia. The combination of dysphagia + weight loss has a high positive predictive value for upper GI malignancy.",
    guidelineReference: "NICE NG12: Suspected cancer recognition and referral"
  },
  {
    id: 4,
    subject: "Neurology",
    stem: "A 72-year-old right-handed woman is brought to the Emergency Department by her daughter. She woke up 90 minutes ago with right-sided weakness and difficulty speaking. On examination, she has a dense right hemiplegia and global aphasia. Her NIHSS score is 18. CT head shows no haemorrhage. Her blood pressure is 185/95 mmHg. What is the most appropriate immediate management?",
    options: [
      "IV alteplase followed by consideration for mechanical thrombectomy",
      "Aspirin 300mg and admit to stroke unit",
      "Lower blood pressure to <140/90 before considering thrombolysis",
      "MRI brain to confirm infarct location before treatment"
    ],
    correctAnswer: 0,
    explanation: "This patient is presenting with a severe acute ischaemic stroke (NIHSS 18 indicates major stroke) within the thrombolysis window (<4.5 hours from symptom onset). CT has excluded haemorrhage. According to NICE and RCP guidelines, IV alteplase (0.9mg/kg, max 90mg) should be administered as soon as possible.\n\nGiven the severity (NIHSS ≥6) and likely large vessel occlusion, she should also be considered for mechanical thrombectomy, which can be performed up to 24 hours in selected patients and has revolutionised outcomes in severe stroke.\n\nBlood pressure up to 185/110 is acceptable before thrombolysis - aggressive lowering can worsen cerebral perfusion. MRI would delay treatment unnecessarily; CT is sufficient to exclude haemorrhage. Aspirin alone would be inadequate for a thrombolysis-eligible patient.",
    clinicalPearl: "The number needed to treat (NNT) with thrombolysis to achieve one additional good outcome is approximately 10 when given within 3 hours. Every 15-minute delay reduces the probability of a good outcome by approximately 4%.",
    keyLearningPoint: "Time is brain! Thrombolysis should be given ASAP within 4.5 hours of stroke onset. Consider thrombectomy for large vessel occlusion (NIHSS ≥6, proximal occlusion) - it has an NNT of approximately 2.5.",
    guidelineReference: "NICE NG128: Stroke and TIA"
  },
  {
    id: 5,
    subject: "Endocrinology",
    stem: "A 52-year-old woman with type 2 diabetes has an HbA1c of 64 mmol/mol (8.0%) despite maximum tolerated metformin (1g BD). Her eGFR is 65 mL/min/1.73m², BMI is 34 kg/m², and she has established cardiovascular disease (previous MI 2 years ago). What is the most appropriate additional therapy?",
    options: [
      "Add an SGLT2 inhibitor (e.g., empagliflozin)",
      "Add a sulfonylurea (e.g., gliclazide)",
      "Add a DPP-4 inhibitor (e.g., sitagliptin)",
      "Add basal insulin (e.g., insulin glargine)"
    ],
    correctAnswer: 0,
    explanation: "This patient has type 2 diabetes with established cardiovascular disease and obesity. NICE guidelines now recommend that SGLT2 inhibitors (empagliflozin, dapagliflozin, canagliflozin) should be offered as first-line add-on therapy to metformin in patients with established atherosclerotic cardiovascular disease.\n\nSGLT2 inhibitors have demonstrated significant cardiovascular benefits in major trials (EMPA-REG, CANVAS, DECLARE-TIMI 58), reducing cardiovascular death, heart failure hospitalisation, and renal progression. They also promote weight loss (typically 2-3kg), which is beneficial given her BMI of 34.\n\nSulfonylureas increase hypoglycaemia risk and cause weight gain. DPP-4 inhibitors are weight-neutral but lack the cardiovascular protection of SGLT2i. Insulin would cause weight gain and doesn't offer CV protection.",
    clinicalPearl: "SGLT2 inhibitors should be temporarily stopped during acute illness ('sick day rules') to prevent euglycaemic diabetic ketoacidosis. Patients should also be warned about genital mycotic infections.",
    keyLearningPoint: "NICE now recommends SGLT2 inhibitors as first-line add-on to metformin in T2DM with established CVD or high CV risk. They provide triple benefits: glucose lowering, CV protection, and renal protection.",
    guidelineReference: "NICE NG28: Type 2 diabetes in adults"
  },
  {
    id: 6,
    subject: "Psychiatry",
    stem: "A 28-year-old woman presents with a 2-week history of persistently low mood, anhedonia, poor concentration, and disturbed sleep. She mentions passive thoughts of death but denies active suicidal ideation or plans. She has no past psychiatric history. What is the most appropriate initial management?",
    options: [
      "Offer a course of low-intensity psychological intervention (e.g., guided self-help, CBT)",
      "Start sertraline 50mg daily",
      "Refer for urgent psychiatric assessment",
      "Prescribe zopiclone for sleep and review in 2 weeks"
    ],
    correctAnswer: 0,
    explanation: "This patient meets criteria for a depressive episode (≥2 weeks of low mood, anhedonia, plus associated symptoms). The severity appears mild-to-moderate: she has passive death thoughts but no active suicidal ideation, plans, or intent, and is still engaging with healthcare.\n\nNICE guidelines recommend a stepped-care approach. For mild-to-moderate depression, first-line treatment should be low-intensity psychological interventions such as guided self-help based on CBT principles, computerised CBT, or structured group physical activity programmes.\n\nAntidepressants are not recommended as first-line for mild-to-moderate depression (only for moderate-to-severe, or if psychological therapy hasn't helped). Urgent psychiatric referral is not indicated without active suicidal intent or psychotic features. Hypnotics don't treat the underlying depression.",
    clinicalPearl: "Always ask about suicidal thoughts in a graduated way: passive death wishes → active suicidal ideation → plans → intent → means. This patient has passive thoughts only, which is concerning but doesn't require immediate crisis intervention.",
    keyLearningPoint: "NICE recommends psychological interventions as first-line for mild-to-moderate depression. Antidepressants should be reserved for moderate-to-severe depression, or when psychological therapy hasn't worked.",
    guidelineReference: "NICE NG222: Depression in adults"
  },
  {
    id: 7,
    subject: "Renal",
    stem: "A 68-year-old man with type 2 diabetes and hypertension has a routine blood test showing eGFR 42 mL/min/1.73m² and urine ACR 35 mg/mmol. He is currently taking amlodipine 10mg OD. His blood pressure is 145/88 mmHg. What is the most appropriate change to his management?",
    options: [
      "Start ramipril and titrate to maximum tolerated dose",
      "Add doxazosin to improve blood pressure control",
      "No change needed - continue current management",
      "Start furosemide to protect the kidneys"
    ],
    correctAnswer: 0,
    explanation: "This patient has CKD stage 3b (eGFR 30-44) with significantly elevated albuminuria (ACR 35 mg/mmol = A3 category, severely increased). He also has diabetes and suboptimal blood pressure control.\n\nNICE recommends ACE inhibitors (or ARBs if intolerant) for ALL patients with diabetes AND CKD with ACR ≥3 mg/mmol, regardless of blood pressure. The renoprotective effects of ACE inhibitors extend beyond blood pressure lowering - they reduce intraglomerular pressure and proteinuria, slowing CKD progression.\n\nAdditionally, his BP of 145/88 exceeds the target of <130/80 mmHg recommended for patients with diabetes and CKD with significant proteinuria. The ACE inhibitor will help achieve this target.\n\nDoxazosin doesn't offer renoprotection. Continuing without change ignores guideline-recommended therapy. Loop diuretics don't slow CKD progression.",
    clinicalPearl: "When starting ACE inhibitors in CKD, accept up to a 25% rise in creatinine or 30% fall in eGFR. This reflects reduced hyperfiltration and is renoprotective long-term. Only stop if the rise exceeds this threshold.",
    keyLearningPoint: "ACE inhibitors are indicated for ALL diabetic patients with ACR ≥3 mg/mmol, regardless of blood pressure. They slow CKD progression through haemodynamic and non-haemodynamic mechanisms.",
    guidelineReference: "NICE NG203: Chronic kidney disease"
  },
  {
    id: 8,
    subject: "Rheumatology",
    stem: "A 45-year-old woman presents with a 4-month history of symmetrical pain and swelling affecting her MCPs, PIPs, and wrists bilaterally. Morning stiffness lasts approximately 2 hours daily. Blood tests show CRP 45 mg/L and positive anti-CCP antibodies. X-rays show periarticular osteopenia but no erosions. What is the most appropriate initial treatment?",
    options: [
      "Methotrexate with folic acid supplementation",
      "Ibuprofen and physiotherapy",
      "Prednisolone monotherapy",
      "Hydroxychloroquine"
    ],
    correctAnswer: 0,
    explanation: "This patient has a typical presentation of rheumatoid arthritis: symmetrical small joint synovitis, prolonged morning stiffness (>1 hour), elevated inflammatory markers, and positive anti-CCP antibodies (which are highly specific for RA and predict erosive disease).\n\nNICE recommends starting disease-modifying anti-rheumatic drugs (DMARDs) as soon as possible after diagnosis - ideally within 3 months of symptom onset. Methotrexate is the first-line DMARD of choice, typically started at 7.5-10mg weekly with folic acid 5mg weekly (not on the methotrexate day) to reduce side effects.\n\nNSAIDs alone don't modify disease progression. Prednisolone may be used as short-term bridging therapy but not as monotherapy due to long-term risks. Hydroxychloroquine is less effective than methotrexate as monotherapy for RA.",
    clinicalPearl: "Anti-CCP antibodies are more specific than rheumatoid factor for RA (specificity ~95% vs ~80%) and their presence predicts more aggressive, erosive disease requiring prompt DMARD therapy.",
    keyLearningPoint: "Early DMARD therapy (within 3 months) improves long-term outcomes in RA. Methotrexate is first-line. The goal is 'treat-to-target' - aiming for remission or low disease activity within 6 months.",
    guidelineReference: "NICE NG100: Rheumatoid arthritis"
  },
  {
    id: 9,
    subject: "Obstetrics",
    stem: "A 32-year-old primigravida at 34 weeks' gestation presents with a blood pressure of 165/110 mmHg, 3+ proteinuria, and a severe frontal headache. Her platelet count is 85 × 10⁹/L and ALT is 250 U/L. CTG shows a normal fetal heart rate pattern. What is the most appropriate immediate management?",
    options: [
      "IV magnesium sulfate and labetalol, then plan delivery",
      "Oral nifedipine and outpatient monitoring",
      "Immediate caesarean section without stabilisation",
      "IV hydralazine and admit for observation"
    ],
    correctAnswer: 0,
    explanation: "This patient has severe pre-eclampsia with features of impending eclampsia (severe hypertension, proteinuria, severe headache) and HELLP syndrome (Haemolysis, Elevated Liver enzymes, Low Platelets - her platelets are 85 and ALT is elevated).\n\nNICE recommends IV magnesium sulfate for women with severe pre-eclampsia who have features suggesting imminent eclampsia (severe headache, visual disturbance, epigastric pain, hyperreflexia, papilloedema). The loading dose is 4g IV over 5-15 minutes, followed by 1g/hour infusion.\n\nBlood pressure should be controlled urgently with IV labetalol (or hydralazine if contraindicated) to prevent hypertensive complications. Once stabilised, delivery should be planned - this is the only definitive treatment for pre-eclampsia.\n\nImmediate section without stabilisation risks maternal stroke. Outpatient management is inappropriate for severe disease. Observation alone without magnesium risks seizures.",
    clinicalPearl: "Magnesium sulfate reduces eclampsia risk by approximately 50%. Monitor for magnesium toxicity: loss of patellar reflexes (first sign), respiratory depression. The antidote is calcium gluconate 1g IV.",
    keyLearningPoint: "Severe pre-eclampsia with headache/visual symptoms needs IV magnesium sulfate (seizure prophylaxis), BP control (prevent stroke), and delivery planning. Delivery is the only cure.",
    guidelineReference: "NICE NG133: Hypertension in pregnancy"
  },
  {
    id: 10,
    subject: "Paediatrics",
    stem: "A 3-year-old boy presents with a 2-day history of barking cough, inspiratory stridor, and hoarse voice. He is alert, playing with toys, and has mild subcostal recession. His oxygen saturations are 96% on air. What is the most appropriate management?",
    options: [
      "Single dose of oral dexamethasone and discharge with safety-netting advice",
      "Nebulised adrenaline and admit for observation",
      "Oral amoxicillin and outpatient follow-up",
      "Chest X-ray to exclude epiglottitis"
    ],
    correctAnswer: 0,
    explanation: "This child has mild croup (laryngotracheobronchitis) - characterised by the classic triad of barking cough, stridor, and hoarse voice, typically following a viral prodrome. Severity assessment shows mild disease: stridor only at rest/when agitated, mild chest wall recession, alert and interactive, normal oxygen saturations.\n\nFor mild-to-moderate croup, NICE recommends a single dose of oral dexamethasone (0.15mg/kg, typically 150mcg/kg). This reduces the severity and duration of symptoms and decreases the need for subsequent medical visits. The child can be discharged with appropriate safety-netting advice.\n\nNebulised adrenaline is reserved for severe croup with significant respiratory distress. Antibiotics are not indicated as croup is viral (usually parainfluenza). X-ray is unnecessary and would show the classic 'steeple sign' but doesn't change management for typical presentations.",
    clinicalPearl: "Croup typically affects children aged 6 months to 3 years and is worse at night. The 'steeple sign' on X-ray (subglottic narrowing) is classic but X-rays are rarely needed if the clinical picture is clear.",
    keyLearningPoint: "A single dose of oral corticosteroid (dexamethasone 150mcg/kg) is recommended for ALL children with croup, regardless of severity. Even mild cases benefit from reduced symptom duration.",
    guidelineReference: "NICE NG51: Croup"
  },
  {
    id: 11,
    subject: "Dermatology",
    stem: "A 35-year-old man presents with a well-demarcated, erythematous plaque with silvery scales on his elbows and knees. The plaques affect approximately 5% of his body surface area and he is significantly distressed about the cosmetic appearance. He has tried emollients and mild topical steroids with limited benefit. What is the most appropriate next step?",
    options: [
      "Potent topical corticosteroid combined with vitamin D analogue",
      "Oral methotrexate",
      "Referral for phototherapy",
      "Continue current treatment for longer"
    ],
    correctAnswer: 0,
    explanation: "This patient has chronic plaque psoriasis with moderate disease severity (5% BSA). The description of well-demarcated erythematous plaques with silvery scale in a typical distribution (extensor surfaces) is classic for psoriasis.\n\nNICE recommends a stepwise approach to psoriasis management. For localised plaque psoriasis that hasn't responded to mild topical steroids, the next step is a potent topical corticosteroid used in combination with a vitamin D analogue (such as calcipotriol/betamethasone dipropionate combination). This combination is more effective than either agent alone.\n\nSystemic therapy (methotrexate) is reserved for extensive disease (>10% BSA) or disease causing significant functional impairment. Phototherapy is considered when topical therapy has failed. Continuing ineffective treatment is inappropriate.",
    clinicalPearl: "Apply vitamin D analogues in the morning and corticosteroids at night, or use a combination product. Warn patients that vitamin D analogues can cause perilesional irritation initially.",
    keyLearningPoint: "For plaque psoriasis, first-line is potent corticosteroid + vitamin D analogue. Systemic therapy (methotrexate, ciclosporin) is reserved for extensive (>10% BSA), resistant, or high-impact disease.",
    guidelineReference: "NICE NG153: Psoriasis"
  },
  {
    id: 12,
    subject: "Infectious Diseases",
    stem: "A 28-year-old man presents with a 5-day history of fever, dry cough, and malaise. He works as a hotel air conditioning maintenance engineer. Examination reveals bibasal crackles. Blood tests show Na⁺ 128 mmol/L, lymphopenia, and CRP 180 mg/L. Chest X-ray shows bilateral lower zone consolidation. What is the most likely causative organism?",
    options: [
      "Legionella pneumophila",
      "Streptococcus pneumoniae",
      "Mycoplasma pneumoniae",
      "Staphylococcus aureus"
    ],
    correctAnswer: 0,
    explanation: "The clinical picture strongly suggests Legionnaires' disease (Legionella pneumophila). Key clues include: occupational exposure to air conditioning systems (Legionella thrives in warm water systems, cooling towers, and air conditioning units), the constellation of hyponatraemia (Na⁺ 128) + lymphopenia + high inflammatory markers, dry cough progressing to pneumonia, and gastrointestinal/neurological symptoms often accompany this infection.\n\nLegionella characteristically causes hyponatraemia (due to SIADH) more frequently than other pneumonia pathogens - this is a classic exam pearl. The lymphopenia and disproportionately high CRP are also typical.\n\nStreptococcus pneumoniae is the commonest cause of CAP but doesn't typically cause hyponatraemia. Mycoplasma affects younger patients and causes milder disease. Staphylococcus aureus pneumonia usually follows influenza or occurs in IV drug users.",
    clinicalPearl: "The triad of pneumonia + hyponatraemia + deranged LFTs should make you think of Legionella. Urinary Legionella antigen test is rapid and sensitive for L. pneumophila serogroup 1 (causes ~80% of cases).",
    keyLearningPoint: "Legionella clues: water source exposure, hyponatraemia (SIADH), lymphopenia, deranged LFTs, diarrhoea, confusion. Test with urinary Legionella antigen. Treat with fluoroquinolone or macrolide.",
    guidelineReference: "NICE NG138: Pneumonia (community-acquired)"
  },
  {
    id: 13,
    subject: "Haematology",
    stem: "A 70-year-old woman presents with fatigue and recurrent infections over 6 months. Blood tests reveal: Hb 95 g/L, WCC 85 × 10⁹/L, platelets 110 × 10⁹/L. Blood film shows mature lymphocytosis with smear cells. Flow cytometry confirms CD5+, CD19+, CD23+ lymphocytes. What is the most appropriate initial management?",
    options: [
      "Watch and wait with regular monitoring",
      "Immediate chemotherapy with FCR regimen",
      "Urgent bone marrow transplant referral",
      "Start prednisolone 1mg/kg"
    ],
    correctAnswer: 0,
    explanation: "This patient has chronic lymphocytic leukaemia (CLL) - confirmed by mature lymphocytosis with smear cells (ruptured fragile lymphocytes) on film and the characteristic immunophenotype (CD5+, CD19+, CD23+).\n\nAlthough she has a high lymphocyte count, her disease is relatively early stage: she has mild anaemia (Hb 95 g/L) and thrombocytopenia, but these are not severe. Importantly, CLL is often indolent and early treatment does NOT improve survival compared to watch-and-wait.\n\nNICE and BSH guidelines recommend treatment only when there are clear indications: symptomatic disease, progressive marrow failure (Hb <100, platelets <100), massive/progressive lymphadenopathy, or doubling time <6 months. Otherwise, regular monitoring is appropriate.\n\nStarting chemotherapy too early exposes patients to unnecessary toxicity without survival benefit. BMT is for younger patients with high-risk/relapsed disease. Steroids alone are not standard CLL therapy.",
    clinicalPearl: "Smear cells (smudge cells) on blood film are characteristic of CLL - they result from fragile lymphocytes rupturing during slide preparation. Their presence is so typical that it's almost diagnostic.",
    keyLearningPoint: "CLL is often managed with 'watch and wait' - early treatment doesn't improve survival. Treat only for: symptomatic disease, progressive marrow failure, massive adenopathy, or rapid doubling time.",
    guidelineReference: "BSH Guidelines: CLL"
  },
  {
    id: 14,
    subject: "Emergency Medicine",
    stem: "A 25-year-old man is brought to the Emergency Department after being found unresponsive. His GCS is 7 (E2V2M3). His pupils are pinpoint bilaterally. Respiratory rate is 6/min with shallow breathing. Track marks are visible on both arms. What is the most appropriate immediate action?",
    options: [
      "Administer naloxone IV/IM and support airway",
      "Perform CT head to exclude intracranial pathology",
      "Intubate and ventilate immediately",
      "Administer flumazenil IV"
    ],
    correctAnswer: 0,
    explanation: "This patient is presenting with the classic opioid toxidrome: reduced consciousness (GCS 7), pinpoint pupils (miosis), respiratory depression (RR 6), and evidence of IV drug use (track marks). This is a life-threatening emergency.\n\nNaloxone is a competitive opioid antagonist that rapidly reverses opioid effects. It should be administered immediately via IV, IM, or intranasal routes. The initial dose is typically 400mcg IV, repeated every 2-3 minutes as needed. Simultaneously, basic airway manoeuvres and assisted ventilation with bag-valve-mask should be provided.\n\nCT head would delay life-saving treatment and the clinical picture clearly points to opioid toxicity. Intubation may become necessary if naloxone is ineffective, but naloxone often works rapidly and avoids the risks of intubation. Flumazenil (benzodiazepine antagonist) is not indicated and could precipitate seizures.",
    clinicalPearl: "Naloxone has a shorter half-life (30-90 minutes) than most opioids. Patients who respond may re-sedate as naloxone wears off - observe for at least 2 hours after last dose, longer for long-acting opioids like methadone.",
    keyLearningPoint: "The opioid toxidrome: pinpoint pupils + respiratory depression + reduced consciousness. Treat immediately with naloxone. Remember naloxone's short half-life means re-sedation can occur.",
    guidelineReference: "RCEM: Opioid toxicity guidelines"
  },
  {
    id: 15,
    subject: "Ethics & Law",
    stem: "A 78-year-old woman with advanced dementia is admitted with aspiration pneumonia. She lacks capacity to make treatment decisions. Her daughter insists on full active treatment including ITU admission if needed. However, her documented Lasting Power of Attorney (LPA) for health and welfare, held by her son, states she would not want life-prolonging treatment. What is the most appropriate course of action?",
    options: [
      "Follow the LPA holder's decision as it reflects the patient's wishes",
      "Treat according to the daughter's wishes as she is present",
      "Escalate to full treatment as this is the safest legal option",
      "Withhold all treatment as the prognosis is poor"
    ],
    correctAnswer: 0,
    explanation: "When a patient lacks capacity, decision-making follows a clear hierarchy under the Mental Capacity Act 2005. If a valid and applicable Lasting Power of Attorney (LPA) for health and welfare exists, the attorney has legal authority to make decisions on the patient's behalf, including decisions about life-sustaining treatment (if the LPA specifically grants this authority).\n\nThe LPA holder (the son) must make decisions in the patient's best interests, considering her previously expressed wishes. The documented preference against life-prolonging treatment should guide management. The daughter's views should be considered as part of the best interests assessment, but she does not have legal decision-making authority if an LPA exists.\n\nTreating against the LPA's decision could constitute assault. Withholding all treatment is not appropriate - comfort care and symptom management should continue.",
    clinicalPearl: "An LPA for health and welfare only comes into effect when the patient loses capacity. Check if it specifically includes authority for life-sustaining treatment decisions - not all LPAs grant this power.",
    keyLearningPoint: "Decision-making hierarchy when patient lacks capacity: (1) Valid advance decision, (2) LPA for health and welfare, (3) Court-appointed deputy, (4) Best interests decision by clinical team (consulting family/carers).",
    guidelineReference: "Mental Capacity Act 2005; GMC: Treatment and care towards end of life"
  }
];

export default function TryFreePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const question = SAMPLE_QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = ((answeredQuestions.size) / SAMPLE_QUESTIONS.length) * 100;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    if (!answeredQuestions.has(currentQuestion)) {
      setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion]));
      if (selectedAnswer === question.correctAnswer) {
        setCorrectAnswers(prev => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestion(index);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm sm:text-base font-medium">
              Unlock 5,000+ questions with detailed explanations
            </span>
          </div>
          <Link
            href="/pricing"
            className="bg-white text-emerald-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-emerald-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/medbanqs-logo.png" alt="MedBanqs" className="h-8 w-8 rounded-lg" />
              <span className="font-semibold text-gray-900">MedBanqs</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{correctAnswers}/{answeredQuestions.size}</span>
                <span>correct</span>
              </div>
              <Link
                href="/pricing"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Upgrade
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Question Navigator - Sidebar on desktop, horizontal on mobile */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-3 gap-2">
                {SAMPLE_QUESTIONS.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionSelect(index)}
                    className={`w-full aspect-square rounded-lg text-sm font-medium transition-all ${
                      currentQuestion === index
                        ? 'bg-emerald-600 text-white'
                        : answeredQuestions.has(index)
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{answeredQuestions.size}/15</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Subject legend */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Current subject:</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  {question.subject}
                </span>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Question Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      Question {currentQuestion + 1} of 15
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {question.subject}
                    </span>
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6">
                <p className="text-gray-900 text-lg leading-relaxed mb-6">
                  {question.stem}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const letter = String.fromCharCode(65 + index);
                    let optionStyle = 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50';

                    if (showExplanation) {
                      if (index === question.correctAnswer) {
                        optionStyle = 'border-emerald-500 bg-emerald-50';
                      } else if (index === selectedAnswer && index !== question.correctAnswer) {
                        optionStyle = 'border-red-500 bg-red-50';
                      } else {
                        optionStyle = 'border-gray-200 opacity-60';
                      }
                    } else if (selectedAnswer === index) {
                      optionStyle = 'border-emerald-500 bg-emerald-50';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            showExplanation && index === question.correctAnswer
                              ? 'bg-emerald-600 text-white'
                              : showExplanation && index === selectedAnswer && index !== question.correctAnswer
                              ? 'bg-red-600 text-white'
                              : selectedAnswer === index
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {letter}
                          </span>
                          <span className="text-gray-700 pt-1">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Submit Button */}
                {!showExplanation && (
                  <div className="mt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={selectedAnswer === null}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        selectedAnswer !== null
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Submit Answer
                    </button>
                  </div>
                )}

                {/* Explanation Section */}
                {showExplanation && (
                  <div className="mt-8 space-y-6">
                    {/* Result Banner */}
                    <div className={`p-4 rounded-xl ${isCorrect ? 'bg-emerald-100 border border-emerald-200' : 'bg-red-100 border border-red-200'}`}>
                      <div className="flex items-center gap-3">
                        {isCorrect ? (
                          <>
                            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-emerald-800">Correct!</p>
                              <p className="text-sm text-emerald-700">Well done - you selected the right answer.</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-red-800">Incorrect</p>
                              <p className="text-sm text-red-700">The correct answer was {String.fromCharCode(65 + question.correctAnswer)}.</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Detailed Explanation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="font-semibold text-blue-900">Explanation</h4>
                      </div>
                      <p className="text-blue-800 leading-relaxed whitespace-pre-line">{question.explanation}</p>
                    </div>

                    {/* Clinical Pearl */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <h4 className="font-semibold text-amber-900">Clinical Pearl</h4>
                      </div>
                      <p className="text-amber-800 leading-relaxed">{question.clinicalPearl}</p>
                    </div>

                    {/* Key Learning Point */}
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="font-semibold text-purple-900">Key Learning Point</h4>
                      </div>
                      <p className="text-purple-800 leading-relaxed">{question.keyLearningPoint}</p>
                    </div>

                    {/* Guideline Reference */}
                    {question.guidelineReference && (
                      <div className="bg-gray-100 border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Guideline: </span>
                            {question.guidelineReference}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CTA Box */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
                      <h4 className="font-bold text-lg mb-2">Want more questions like this?</h4>
                      <p className="text-emerald-100 mb-4">
                        Access 5,000+ expertly crafted questions with detailed explanations, clinical pearls, and guideline references.
                      </p>
                      <Link
                        href="/pricing"
                        className="inline-block bg-white text-emerald-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                      >
                        Get Full Access
                      </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4">
                      <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          currentQuestion === 0
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>

                      {currentQuestion < SAMPLE_QUESTIONS.length - 1 ? (
                        <button
                          onClick={handleNext}
                          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                        >
                          Next Question
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ) : (
                        <Link
                          href="/pricing"
                          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                        >
                          Get Full Access
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Get Started Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Link
          href="/pricing"
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 transition-all hover:scale-105 font-semibold"
        >
          <span>Get Started - Full Access</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Bottom padding for floating button */}
      <div className="h-24" />
    </div>
  );
}
