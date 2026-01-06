/* =========================================
   CholOut Advanced Dashboard - DATA.JS
   Complete Dataset: 300+ Variables
   FIXED VERSION - All Data Properly Merged
   ========================================= */

const masterData = [
    // =============================================
    // HEALTH CATEGORY
    // =============================================
    
    // --- HEALTH: ADMINISTRATIVE ---
    { id: 1, cat: 'Health', sub: 'Admin', name: 'Case Number (ptno)', desc: 'Unique Patient ID', source: 'Hospital Record', res: 'Individual', codes: null },
    { id: 2, cat: 'Health', sub: 'Admin', name: 'Visit Date (Day)', desc: 'Date of visit (Day)', source: 'Hospital Record', res: 'Date', codes: null },
    { id: 3, cat: 'Health', sub: 'Admin', name: 'Visit Date (Month)', desc: 'Date of visit (Month)', source: 'Hospital Record', res: 'Date', codes: null },
    { id: 4, cat: 'Health', sub: 'Admin', name: 'Visit Date (Year)', desc: 'Date of visit (Year)', source: 'Hospital Record', res: 'Date', codes: null },
    { id: 89, cat: 'Health', sub: 'Admin', name: 'Case ID (cid)', desc: 'Case ID', source: 'Hospital Record', res: 'Individual', codes: null },
    { id: 267, cat: 'Health', sub: 'Admin', name: 'Respondent ID (rid)', desc: 'Respondent ID', source: 'Hospital Record', res: 'Individual', codes: null },
    { id: 298, cat: 'Health', sub: 'Admin', name: 'Date', desc: 'Date of record', source: 'Hospital Record', res: 'Date', codes: null },

    // --- HEALTH: CLINICAL SYMPTOMS ---
    { id: 26, cat: 'Health', sub: 'Clinical', name: 'Temperature', desc: 'Body Temperature', source: 'Measurement', res: 'Numeric', codes: { "1": "36.7-37.7°C", "2": "37.8-38.8°C", "3": "38.9°C+" } },
    { id: 27, cat: 'Health', sub: 'Clinical', name: 'Diarrhoea Duration', desc: 'Duration of diarrhoea before arrival', source: 'Interview', res: 'Categorical', codes: { "1": "<1 day", "2": "1-3 days", "3": "4-6 days", "4": "7-9 days", "5": "10-12 days", "6": "12-14 days", "7": "15+ days" } },
    { id: 28, cat: 'Health', sub: 'Clinical', name: 'Stool Character', desc: 'Character of stool', source: 'Observation', res: 'Categorical', codes: { "1": "Watery", "2": "Non-watery" } },
    { id: 29, cat: 'Health', sub: 'Clinical', name: 'Stool Contents', desc: 'Stool contents', source: 'Observation', res: 'Categorical', codes: { "0": "Usual", "1": "Mucus", "2": "Blood", "3": "Mucus+Blood" } },
    { id: 30, cat: 'Health', sub: 'Clinical', name: 'Stool Frequency', desc: 'Number of stools in 24 hours', source: 'Interview', res: 'Categorical', codes: { "1": "3-5", "2": "6-10", "3": "11-15", "4": "15-20", "5": ">20" } },
    { id: 31, cat: 'Health', sub: 'Clinical', name: 'Abdominal Pain', desc: 'Abdominal pain', source: 'Interview', res: 'Categorical', codes: { "1": "No", "2": "Yes" } },
    { id: 32, cat: 'Health', sub: 'Clinical', name: 'Vomiting', desc: 'Vomiting in last 24 hours', source: 'Interview', res: 'Categorical', codes: { "0": "No", "1": "<10 times", "2": "10+ times" } },
    { id: 33, cat: 'Health', sub: 'Clinical', name: 'Cough with Diarrhoea', desc: 'History of cough with diarrhoea (in days)', source: 'Interview', res: 'Categorical', codes: { "1": "1-7", "2": "8-14", "3": "15-20", "4": ">20 days" } },
    { id: 34, cat: 'Health', sub: 'Clinical', name: 'Measles History', desc: 'History of Measles', source: 'Interview', res: 'Categorical', codes: { "1": "Measles in past 3 months", "2": "Measles >3-6 months", "3": "Present night blindness", "4": "Past night blindness", "5": "Measles + Night blindness" } },
    { id: 35, cat: 'Health', sub: 'Clinical', name: 'Convulsion', desc: 'Convulsion', source: 'Physician', res: 'Categorical', codes: null },
    { id: 36, cat: 'Health', sub: 'Clinical', name: 'Convulsion History', desc: 'History of Convulsion', source: 'Interview', res: 'Categorical', codes: { "1": "Within 12 hours", "2": "Within 13-24 hours", "3": ">24 hours" } },
    { id: 37, cat: 'Health', sub: 'Clinical', name: 'Other Disease', desc: 'Other disease (specify)', source: 'Interview', res: 'Text', codes: null },
    { id: 41, cat: 'Health', sub: 'Clinical', name: 'Thirst', desc: 'Thirst level', source: 'Physician', res: 'Categorical', codes: { "0": "Normal", "1": "Mild", "2": "Moderate", "3": "Severe" } },
    { id: 42, cat: 'Health', sub: 'Clinical', name: 'General Condition', desc: 'General condition assessment', source: 'Physician', res: 'Categorical', codes: { "0": "Normal", "1": "Restless", "2": "Lethargic but irritable", "3": "Drowsy/cold sweating", "4": "Coma" } },
    { id: 43, cat: 'Health', sub: 'Clinical', name: 'Radial Pulse', desc: 'Radial pulse character', source: 'Physician', res: 'Categorical', codes: { "0": "Normal", "1": "Rapid & weak", "2": "Rapid & feeble", "3": "Not palpable" } },
    { id: 44, cat: 'Health', sub: 'Clinical', name: 'Respiration', desc: 'Respiration assessment', source: 'Physician', res: 'Categorical', codes: { "0": "Normal", "1": "Faster than normal", "2": "Deep & Rapid" } },
    { id: 45, cat: 'Health', sub: 'Clinical', name: 'Dehydration Status', desc: 'Clinical assessment of dehydration', source: 'Physician', res: 'Categorical', codes: { "0": "No dehydration", "5": "Some", "3": "Severe" } },
    { id: 47, cat: 'Health', sub: 'Clinical', name: 'Otitis Media', desc: 'Ear - Otitis media', source: 'Physician', res: 'Categorical', codes: { "0": "Absent", "1": "Present" } },
    { id: 48, cat: 'Health', sub: 'Clinical', name: 'Sore Mouth', desc: 'Sore mouth examination', source: 'Physician', res: 'Categorical', codes: { "0": "None", "1": "Angular stomatitis", "2": "Glossitis", "3": "Pharyngitis", "4": "Tonsillitis" } },
    { id: 49, cat: 'Health', sub: 'Clinical', name: 'Lungs', desc: 'Lungs examination', source: 'Physician', res: 'Categorical', codes: { "0": "Clear", "1": "Rhonchi", "2": "Crepitation", "3": "Both" } },
    { id: 50, cat: 'Health', sub: 'Clinical', name: 'Abdomen', desc: 'Abdomen examination', source: 'Physician', res: 'Categorical', codes: { "0": "Normal sounds", "1": "Distended sounds present", "2": "Distended sluggish", "3": "Distended absent", "4": "Distension with tenderness" } },
    { id: 51, cat: 'Health', sub: 'Clinical', name: 'Liver and Spleen', desc: 'Liver and spleen examination', source: 'Physician', res: 'Categorical', codes: { "0": "Not palpable", "1": "Liver enlarged", "2": "Spleen enlarged", "3": "Both enlarged" } },
    { id: 52, cat: 'Health', sub: 'Clinical', name: 'Rectum Prolapse', desc: 'Rectum prolapse', source: 'Physician', res: 'Categorical', codes: { "0": "None", "1": "Yes" } },
    { id: 53, cat: 'Health', sub: 'Clinical', name: 'Extremities', desc: 'Extremities examination (Oedema)', source: 'Physician', res: 'Categorical', codes: { "0": "Oedema absent", "1": "Oedema present" } },

    // --- HEALTH: VITAMIN & NUTRITIONAL DEFICIENCY ---
    { id: 25, cat: 'Health', sub: 'Nutrition', name: 'Vitamin A Capsule', desc: 'Used Vitamin-A capsule', source: 'Interview', res: 'Categorical', codes: { "1": "Within 3 months", "2": "4-5 months", "3": "6-12 months", "4": ">12 months" } },
    { id: 46, cat: 'Health', sub: 'Nutrition', name: 'Vitamin A Deficiency', desc: 'Vitamin A deficiency signs', source: 'Physician', res: 'Categorical', codes: { "0": "Normal", "1": "Conj Xerosis", "2": "Bitot spot", "3": "Corneal ulcer", "4": "Keratomalacia", "5": "1+2", "6": "3+4", "7": "Corneal scar" } },

    // --- HEALTH: DIAGNOSIS & OUTCOME ---
    { id: 54, cat: 'Health', sub: 'Diagnosis', name: 'Diagnosis', desc: 'Diagnosis classification', source: 'Physician', res: 'Categorical', codes: { "1": "Uncomplicated diarrhoea", "2": "Complicated Diarrhoea" } },
    { id: 55, cat: 'Health', sub: 'Disposition', name: 'Disposition', desc: 'Patient disposition', source: 'Hospital Record', res: 'Categorical', codes: { "1": "Discharge from desk", "2": "ORP", "3": "TC", "4": "TC to Ward", "5": "Ward", "6": "Study ward", "7": "Referred", "8": "Death on arrival" } },
    { id: 56, cat: 'Health', sub: 'Duration', name: 'Stay Duration (Days)', desc: 'Duration of stay (Days)', source: 'Hospital Record', res: 'Numeric', codes: null },
    { id: 57, cat: 'Health', sub: 'Duration', name: 'Stay Duration (Hours)', desc: 'Duration of stay (Hours)', source: 'Hospital Record', res: 'Numeric', codes: null },
    { id: 58, cat: 'Health', sub: 'Outcome', name: 'Outcome', desc: 'Patient outcome', source: 'Hospital Record', res: 'Categorical', codes: { "1": "Cured", "2": "Illness continuing", "3": "Died", "4": "Absconded", "5": "Others" } },

    // --- HEALTH: TREATMENT & REHYDRATION ---
    { id: 10, cat: 'Health', sub: 'Treatment', name: 'Replacement Fluid (Pre)', desc: 'Use of Replacement Fluid before arrival', source: 'Interview', res: 'Categorical', codes: { "1": "ORS Packet", "2": "Home made ORS", "3": "Barley", "4": "Rice/Gruel soup", "5": "IV fluid", "6": "1/2+4", "7": "1/2+5", "8": "3/4+5" } },
    { id: 11, cat: 'Health', sub: 'Treatment', name: 'Chemotherapy (Pre)', desc: 'Chemotherapy before arrival', source: 'Interview', res: 'Categorical', codes: { "1": "Penicillin", "2": "Tetracycline", "3": "Ampicillin", "4": "Chloramphenicol", "5": "Furazolidone", "6": "Gentamicin", "7": "Septrin", "8": "Kanamycin", "9": "Nalidixic", "10": "Metronidazole", "11": "Amp+Furox", "12": "Sept+Metro", "13": "Furox+Nali", "14": "Selexid", "98": "Other" } },
    { id: 12, cat: 'Health', sub: 'Treatment', name: 'Other Chemotherapy', desc: 'Other chemotherapy before arrival', source: 'Interview', res: 'Text', codes: null },
    { id: 59, cat: 'Health', sub: 'Treatment', name: 'Rehydration Method', desc: 'Rehydration method used', source: 'Hospital Record', res: 'Categorical', codes: { "0": "None", "1": "ORS", "2": "IV only", "3": "ORS to IV", "4": "IV to ORS", "5": "Others" } },
    { id: 60, cat: 'Health', sub: 'Treatment', name: 'Number of Medicines', desc: 'Number of medicine given', source: 'Hospital Record', res: 'Categorical', codes: { "0": "No medicine", "1": "One medicine", "2": "Two medicine" } },

    // --- HEALTH: MEDICATIONS ---
    { id: 61, cat: 'Health', sub: 'Medication', name: 'Tetracycline', desc: 'Medicine (Tetracycline)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 62, cat: 'Health', sub: 'Medication', name: 'Ampicillin', desc: 'Medicine (Ampicillin)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 63, cat: 'Health', sub: 'Medication', name: 'Septrin', desc: 'Medicine (Septrin)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 64, cat: 'Health', sub: 'Medication', name: 'Furazolidone', desc: 'Medicine (Furazolidone)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 65, cat: 'Health', sub: 'Medication', name: 'Penicillin', desc: 'Medicine (Penicillin/Crystapen)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 66, cat: 'Health', sub: 'Medication', name: 'Metronidazole', desc: 'Medicine (Metronidazole)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 67, cat: 'Health', sub: 'Medication', name: 'Gentamicin', desc: 'Medicine (Gentamicin)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 68, cat: 'Health', sub: 'Medication', name: 'Nalidixic Acid', desc: 'Medicine (Nalidixic acid)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 69, cat: 'Health', sub: 'Medication', name: 'Chloramphenicol', desc: 'Medicine (Chloramphenicol)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 70, cat: 'Health', sub: 'Medication', name: 'Other Medicines', desc: 'Medicine (Others)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 75, cat: 'Health', sub: 'Medication', name: 'Azithromycin', desc: 'Azithromycin given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 76, cat: 'Health', sub: 'Medication', name: 'Amikacin', desc: 'Amikacin given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 77, cat: 'Health', sub: 'Medication', name: 'Carbenicillin', desc: 'Carbenicillin given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 78, cat: 'Health', sub: 'Medication', name: 'Ciprofloxacin', desc: 'Ciprofloxacin given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 79, cat: 'Health', sub: 'Medication', name: 'Ceftriaxone', desc: 'Ceftriaxone given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 80, cat: 'Health', sub: 'Medication', name: 'Ceftazidime', desc: 'Ceftazidime given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 81, cat: 'Health', sub: 'Medication', name: 'Erythromycin', desc: 'Erythromycin given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 82, cat: 'Health', sub: 'Medication', name: 'Flucloxacillin', desc: 'Flucloxacillin given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 83, cat: 'Health', sub: 'Medication', name: 'Imipenem', desc: 'Imipenem given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 84, cat: 'Health', sub: 'Medication', name: 'Nitrofurantoin', desc: 'Nitrofurantoin given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 85, cat: 'Health', sub: 'Medication', name: 'Tobramycin', desc: 'Tobramycin given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 86, cat: 'Health', sub: 'Medication', name: 'Selexid', desc: 'Selexid given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 87, cat: 'Health', sub: 'Medication', name: 'Doxycycline', desc: 'Doxycycline given', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },
    { id: 88, cat: 'Health', sub: 'Medication', name: 'Magnesium Sulphate', desc: 'Magnesium Sulphate (MgSO4)', source: 'Hospital Record', res: 'Yes/No', codes: { "0": "No", "1": "Yes" } },

    // --- HEALTH: ANTHROPOMETRY ---
    { id: 71, cat: 'Health', sub: 'Anthropometry', name: 'Weight on Admission', desc: 'Weight on admission (kg)', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 72, cat: 'Health', sub: 'Anthropometry', name: 'Weight on Discharge', desc: 'Weight on discharge (kg)', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 73, cat: 'Health', sub: 'Anthropometry', name: 'Height', desc: 'Height in cm', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 74, cat: 'Health', sub: 'Anthropometry', name: 'MUAC', desc: 'Arm circumference', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 173, cat: 'Health', sub: 'Anthropometry', name: 'Admission Weight (adwt)', desc: 'Admission weight in kg (2 decimal)', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 174, cat: 'Health', sub: 'Anthropometry', name: 'Discharge Weight (diwt)', desc: 'Discharge weight in kg (2 decimal)', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 175, cat: 'Health', sub: 'Anthropometry', name: 'Admission Height', desc: 'Admission height in cm', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 176, cat: 'Health', sub: 'Anthropometry', name: 'Discharge Height', desc: 'Discharge height in cm', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 177, cat: 'Health', sub: 'Anthropometry', name: 'MUAC (cm)', desc: 'MUAC in cm', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 178, cat: 'Health', sub: 'Anthropometry', name: 'Tibial Length', desc: 'Tibial length', source: 'Measurement', res: 'Numeric', codes: null },
    { id: 287, cat: 'Health', sub: 'Anthropometry', name: 'WHZ Score', desc: 'Weight for height (z_score)', source: 'Calculated', res: 'Numeric', codes: null },
    { id: 288, cat: 'Health', sub: 'Anthropometry', name: 'HAZ Score', desc: 'Height for age (z_score)', source: 'Calculated', res: 'Numeric', codes: null },
    { id: 289, cat: 'Health', sub: 'Anthropometry', name: 'WAZ Score', desc: 'Weight for age (z_score)', source: 'Calculated', res: 'Numeric', codes: null },
    { id: 290, cat: 'Health', sub: 'Anthropometry', name: 'BAZ Score', desc: 'BMI for age (z_score)', source: 'Calculated', res: 'Numeric', codes: null },

    // --- HEALTH: PATHOGENS ---
    { id: 194, cat: 'Health', sub: 'Pathogen', name: '1st Isolated Pathogen', desc: 'First isolated pathogen', source: 'Lab Culture', res: 'Categorical', codes: null },
    { id: 195, cat: 'Health', sub: 'Pathogen', name: '2nd Isolated Pathogen', desc: 'Second isolated pathogen', source: 'Lab Culture', res: 'Categorical', codes: null },
    { id: 196, cat: 'Health', sub: 'Pathogen', name: '3rd Isolated Pathogen', desc: 'Third isolated pathogen', source: 'Lab Culture', res: 'Categorical', codes: null },
    { id: 292, cat: 'Health', sub: 'Pathogen', name: 'Rotavirus', desc: 'Rotavirus detection', source: 'Lab ELISA', res: 'Positive/Negative', codes: null },
    { id: 293, cat: 'Health', sub: 'Pathogen', name: 'Vibrio Cholera O1', desc: 'Vibrio Cholera (O1) detection', source: 'Lab Culture', res: 'Positive/Negative', codes: null },
    { id: 294, cat: 'Health', sub: 'Pathogen', name: 'Shigella', desc: 'Shigella detection', source: 'Lab Culture', res: 'Positive/Negative', codes: null },
    { id: 295, cat: 'Health', sub: 'Pathogen', name: 'Salmonella', desc: 'Salmonella detection', source: 'Lab Culture', res: 'Positive/Negative', codes: null },
    { id: 296, cat: 'Health', sub: 'Pathogen', name: 'Campylobacter', desc: 'Campylobacter detection', source: 'Lab Culture', res: 'Positive/Negative', codes: null },
    { id: 297, cat: 'Health', sub: 'Pathogen', name: 'Aeromonas', desc: 'Aeromonas detection', source: 'Lab Culture', res: 'Positive/Negative', codes: null },
    { id: 181, cat: 'Health', sub: 'Pathogen', name: 'Stool Specimen', desc: 'Stool specimen collected', source: 'Lab', res: 'Categorical', codes: { "1": "Yes", "2": "No", "3": "R/S" } },

    // --- HEALTH: ANTIBIOTIC SENSITIVITY (Pathogen 1) ---
    { id: 197, cat: 'Health', sub: 'Sensitivity', name: 'Colistin (P1)', desc: 'Colistin sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 198, cat: 'Health', sub: 'Sensitivity', name: 'Amoxicillin', desc: 'Amoxicillin sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 199, cat: 'Health', sub: 'Sensitivity', name: 'Amoxiclav', desc: 'Amoxiclav sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 200, cat: 'Health', sub: 'Sensitivity', name: 'Amoxycillin+Clavulanic', desc: 'Amoxycillin+Clavulanic sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 201, cat: 'Health', sub: 'Sensitivity', name: 'Tetracycline (P1)', desc: 'Tetracycline sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 202, cat: 'Health', sub: 'Sensitivity', name: 'Ampicillin (P1)', desc: 'Ampicillin sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 203, cat: 'Health', sub: 'Sensitivity', name: 'Aztreonam', desc: 'Aztreonam sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 204, cat: 'Health', sub: 'Sensitivity', name: 'Chloramphenicol (P1)', desc: 'Chloramphenicol sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 205, cat: 'Health', sub: 'Sensitivity', name: 'Gentamicin (P1)', desc: 'Gentamicin sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 206, cat: 'Health', sub: 'Sensitivity', name: 'Ceftazidime (P1)', desc: 'Ceftazidime sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 207, cat: 'Health', sub: 'Sensitivity', name: 'Cefepime (P1)', desc: 'Cefepime sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 208, cat: 'Health', sub: 'Sensitivity', name: 'Cefoperazone', desc: 'Cefoperazone sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 209, cat: 'Health', sub: 'Sensitivity', name: 'Trimethoprim-Sulpha (P1)', desc: 'Trimethoprim sulphamethoxazole for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 210, cat: 'Health', sub: 'Sensitivity', name: 'Doxycycline (P1)', desc: 'Doxycycline sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 211, cat: 'Health', sub: 'Sensitivity', name: 'Nalidixic Acid (P1)', desc: 'Nalidixic acid sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 212, cat: 'Health', sub: 'Sensitivity', name: 'Levofloxacin (P1)', desc: 'Levofloxacin sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 213, cat: 'Health', sub: 'Sensitivity', name: 'Meropenem (P1)', desc: 'Meropenem sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 214, cat: 'Health', sub: 'Sensitivity', name: 'Mecillinam (P1)', desc: 'Mecillinam sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 215, cat: 'Health', sub: 'Sensitivity', name: 'Ertapenem (P1)', desc: 'Ertapenem sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 216, cat: 'Health', sub: 'Sensitivity', name: 'Furazolidone (P1)', desc: 'Furazolidone sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 217, cat: 'Health', sub: 'Sensitivity', name: 'Penicillin (P1)', desc: 'Penicillin sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 218, cat: 'Health', sub: 'Sensitivity', name: 'Selexid (P1)', desc: 'Selexid sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 219, cat: 'Health', sub: 'Sensitivity', name: 'Tigecycline (P1)', desc: 'Tigecycline sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 220, cat: 'Health', sub: 'Sensitivity', name: 'Ticarcillin (P1)', desc: 'Ticarcillin sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 221, cat: 'Health', sub: 'Sensitivity', name: 'Erythromycin (P1)', desc: 'Erythromycin sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 222, cat: 'Health', sub: 'Sensitivity', name: 'Piperacillin (P1)', desc: 'Piperacillin sensitivity', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 223, cat: 'Health', sub: 'Sensitivity', name: 'Ciprofloxacin (P1)', desc: 'Ciprofloxacin sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 224, cat: 'Health', sub: 'Sensitivity', name: 'Imipenem (P1)', desc: 'Imipenem sensitivity for pathogen', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 225, cat: 'Health', sub: 'Sensitivity', name: 'Ceftriaxone (P1)', desc: 'Ceftriaxone sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 226, cat: 'Health', sub: 'Sensitivity', name: 'Tobramycin (P1)', desc: 'Tobramycin sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 227, cat: 'Health', sub: 'Sensitivity', name: 'Other (P1)', desc: 'Other sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 272, cat: 'Health', sub: 'Sensitivity', name: 'Azithromycin (P1)', desc: 'Azithromycin sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 273, cat: 'Health', sub: 'Sensitivity', name: 'Cefixime (P1)', desc: 'Cefixime sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },
    { id: 274, cat: 'Health', sub: 'Sensitivity', name: 'Cephradine (P1)', desc: 'Cephradine sensitivity for pathogen 1', source: 'Lab', res: 'Sensitivity', codes: null },

    // --- HEALTH: DIARRHOEA HISTORY ---
    { id: 179, cat: 'Health', sub: 'History', name: 'Diarrhoea Duration (Days)', desc: 'Duration of diarrhea prior to admission (days)', source: 'Interview', res: 'Numeric', codes: null },
    { id: 180, cat: 'Health', sub: 'History', name: 'Diarrhoea Duration (Hours)', desc: 'Duration of diarrhea prior to admission (hours)', source: 'Interview', res: 'Numeric', codes: null },
    { id: 186, cat: 'Health', sub: 'History', name: 'Diarrhoea Onset Day', desc: 'Onset of diarrhoea (day)', source: 'Interview', res: 'Date', codes: null },
    { id: 187, cat: 'Health', sub: 'History', name: 'Diarrhoea Onset Month', desc: 'Onset of diarrhoea (month)', source: 'Interview', res: 'Date', codes: null },
    { id: 188, cat: 'Health', sub: 'History', name: 'Diarrhoea Onset Year', desc: 'Onset of diarrhoea (year)', source: 'Interview', res: 'Date', codes: null },
    { id: 189, cat: 'Health', sub: 'History', name: 'Diarrhoea Onset Hour', desc: 'Onset of diarrhoea (hour)', source: 'Interview', res: 'Time', codes: null },
    { id: 190, cat: 'Health', sub: 'History', name: 'Diarrhoea Onset Minute', desc: 'Onset of diarrhoea (minute)', source: 'Interview', res: 'Time', codes: null },

    // --- HEALTH: PREGNANCY & DIABETES ---
    { id: 183, cat: 'Health', sub: 'Maternal', name: 'Pregnancy Status', desc: 'Currently pregnant or not', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No", "9": "NA" } },
    { id: 184, cat: 'Health', sub: 'Maternal', name: 'Pregnancy Duration', desc: 'Duration of pregnancy (weeks)', source: 'Interview', res: 'Numeric', codes: { "99": "NA" } },
    { id: 185, cat: 'Health', sub: 'Comorbidity', name: 'Diabetes', desc: 'Diabetes status', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No" } },

    // =============================================
    // DEMOGRAPHIC CATEGORY
    // =============================================

    // --- DEMOGRAPHIC: PERSONAL ---
    { id: 5, cat: 'Demographic', sub: 'Personal', name: 'Age (Years)', desc: 'Patient age in years', source: 'Interview', res: 'Years', codes: null },
    { id: 6, cat: 'Demographic', sub: 'Personal', name: 'Age (Months)', desc: 'Patient age in months', source: 'Interview', res: 'Months', codes: null },
    { id: 7, cat: 'Demographic', sub: 'Personal', name: 'Age (Days)', desc: 'Patient age in days', source: 'Interview', res: 'Days', codes: null },
    { id: 291, cat: 'Demographic', sub: 'Personal', name: 'Age in Months', desc: 'Age (in Month)', source: 'Calculated', res: 'Months', codes: null },
    { id: 8, cat: 'Demographic', sub: 'Personal', name: 'Sex', desc: 'Gender of patient', source: 'Interview', res: 'Categorical', codes: { "1": "Male", "2": "Female" } },
    { id: 9, cat: 'Demographic', sub: 'Personal', name: 'Religion', desc: 'Religion of patient', source: 'Interview', res: 'Categorical', codes: { "1": "Muslim", "2": "Hindu", "3": "Christian", "4": "Buddhist", "5": "Others" } },

    // --- DEMOGRAPHIC: FAMILY ---
    { id: 13, cat: 'Demographic', sub: 'Family', name: 'Family Members Eating', desc: 'How many persons eat from the same cooking pot?', source: 'Interview', res: 'Numeric', codes: null },
    { id: 15, cat: 'Demographic', sub: 'Family', name: 'Children Under 5', desc: 'How many children <5 years of age in your family?', source: 'Interview', res: 'Numeric', codes: null },
    { id: 16, cat: 'Demographic', sub: 'Family', name: 'Diarrhoea in Family (7 days)', desc: 'How many members of your family had diarrhoea in past 7 days?', source: 'Interview', res: 'Numeric', codes: null },
    { id: 17, cat: 'Demographic', sub: 'Family', name: 'Deaths from Diarrhoea (5 yrs)', desc: 'Number of deaths in last 5 years from diarrhoea', source: 'Interview', res: 'Numeric', codes: null },
    { id: 93, cat: 'Demographic', sub: 'Family', name: 'Birth Order', desc: 'Birth order of the child (<5 years)', source: 'Interview', res: 'Numeric', codes: null },
    { id: 101, cat: 'Demographic', sub: 'Family', name: 'Father Age', desc: "Father's age (If respondent ≤15 years)", source: 'Interview', res: 'Numeric', codes: null },
    { id: 102, cat: 'Demographic', sub: 'Family', name: 'Mother Age', desc: "Mother's age (If respondent ≤15 years)", source: 'Interview', res: 'Numeric', codes: null },
    { id: 182, cat: 'Demographic', sub: 'Family', name: 'School Going Children', desc: 'Number of school going children in the family', source: 'Interview', res: 'Numeric', codes: null },

    // --- DEMOGRAPHIC: EDUCATION ---
    { id: 19, cat: 'Demographic', sub: 'Education', name: 'Father Education', desc: "Education of patient's father", source: 'Interview', res: 'Categorical', codes: { "1": "Maktab", "2": "1-3 yrs", "3": "4-5 yrs", "4": "6-10 yrs", "5": "10-12 yrs", "6": ">12 yrs" } },
    { id: 20, cat: 'Demographic', sub: 'Education', name: 'Mother Education', desc: "Education of patient's mother", source: 'Interview', res: 'Categorical', codes: { "1": "Maktab", "2": "1-3 yrs", "3": "4-5 yrs", "4": "6-10 yrs", "5": "10-12 yrs", "6": ">12 yrs" } },
    { id: 21, cat: 'Demographic', sub: 'Education', name: 'Patient Education', desc: 'Self education for patients (>15 years of age)', source: 'Interview', res: 'Categorical', codes: { "1": "Maktab", "2": "1-3 yrs", "3": "4-5 yrs", "4": "6-10 yrs", "5": "10-12 yrs", "6": ">12 yrs" } },
    { id: 142, cat: 'Demographic', sub: 'Education', name: 'Father Schooling Years', desc: 'Years of schooling of father (read upto)', source: 'Interview', res: 'Numeric', codes: null },
    { id: 143, cat: 'Demographic', sub: 'Education', name: 'Mother Schooling Years', desc: 'Years of schooling of mother (read upto)', source: 'Interview', res: 'Numeric', codes: null },

    // --- DEMOGRAPHIC: NUTRITION ---
    { id: 18, cat: 'Demographic', sub: 'Nutrition', name: 'Feeding Practice', desc: 'Feeding (upto 3 years of age) practice', source: 'Interview', res: 'Categorical', codes: { "1": "BM", "2": "BM+CM/PM", "3": "BM+Rice/Ata Powder", "4": "CM/PM", "5": "Rice/Ata gruel/powder", "6": "3+4", "7": "4+5", "8": "Family food" } },
    { id: 110, cat: 'Demographic', sub: 'Nutrition', name: 'Currently Breastfed', desc: 'Is the child breastfed now (<5 years)', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No", "9": "NA" } },
    { id: 111, cat: 'Demographic', sub: 'Nutrition', name: 'Breastfeeding Frequency', desc: 'Frequency of breastfeeding from 6 AM to 6 PM', source: 'Interview', res: 'Numeric', codes: null },
    { id: 112, cat: 'Demographic', sub: 'Nutrition', name: 'Predominantly Breastfed Duration', desc: 'How long did you predominantly breastfeed the child (months)', source: 'Interview', res: 'Numeric', codes: { "88": "Adopted child", "99": "NA" } },
    { id: 113, cat: 'Demographic', sub: 'Nutrition', name: 'Age Stopped Breastfeeding', desc: 'At what age did you stop breastfeeding (totally) your child (months)', source: 'Interview', res: 'Numeric', codes: { "88": "Adopted child", "99": "NA" } },

    // --- DEMOGRAPHIC: OCCUPATION & INCOME ---
    { id: 114, cat: 'Demographic', sub: 'Occupation', name: 'Father Occupation', desc: 'Primary occupation of father', source: 'Interview', res: 'Categorical', codes: { "1": "Farmer", "2": "Day labor", "3": "Share cropper", "4": "Rickshaw puller", "5": "Driver", "6": "Mill worker", "7": "Skilled worker", "8": "Office non executive", "9": "Office executive", "10": "Petty business", "11": "Big business", "12": "Overseas employment", "13": "Boatman", "14": "Fisherman", "15": "Unemployed", "16": "Absent", "17": "Dead", "18": "Beggar", "19": "Street vendor", "20": "Other" } },
    { id: 115, cat: 'Demographic', sub: 'Occupation', name: 'Mother Employment', desc: 'Any gainful employment of mother', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No", "9": "NA" } },
    { id: 116, cat: 'Demographic', sub: 'Income', name: 'Father Income', desc: 'Income of father (Last month) in Taka', source: 'Interview', res: 'Numeric', codes: null },
    { id: 117, cat: 'Demographic', sub: 'Income', name: 'Mother Income', desc: 'Income of mother (Last month) in Taka', source: 'Interview', res: 'Numeric', codes: null },

    // --- DEMOGRAPHIC: HOUSING ---
    { id: 103, cat: 'Demographic', sub: 'Housing', name: 'Floor Type', desc: 'Floor structure', source: 'Observation', res: 'Categorical', codes: { "1": "Cemented", "2": "Non-cemented" } },
    { id: 104, cat: 'Demographic', sub: 'Housing', name: 'Wall Type', desc: 'Wall structure', source: 'Observation', res: 'Categorical', codes: { "1": "Brick", "2": "Bamboo fence", "3": "Ordinary tin", "4": "Corrugated tin", "5": "Straw", "6": "Polythene", "7": "Mixed", "8": "Mud", "9": "Other" } },
    { id: 105, cat: 'Demographic', sub: 'Housing', name: 'Roof Type', desc: 'Roof structure', source: 'Observation', res: 'Categorical', codes: { "1": "Concrete/pucca", "2": "Bamboo fence", "3": "Ordinary tin", "4": "Corrugated tin", "5": "Straw", "6": "Polythene", "7": "Mixed", "8": "Mud", "9": "Other" } },
    { id: 144, cat: 'Demographic', sub: 'Housing', name: 'Number of Rooms', desc: 'Numbers of rooms in their family', source: 'Interview', res: 'Numeric', codes: null },
    { id: 145, cat: 'Demographic', sub: 'Housing', name: 'Number of Beds', desc: 'Number of beds in the family', source: 'Interview', res: 'Numeric', codes: null },
    { id: 153, cat: 'Demographic', sub: 'Housing', name: 'Cooks in Bedroom', desc: 'Cooks in the bedroom', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No" } },
    { id: 154, cat: 'Demographic', sub: 'Housing', name: 'Night Lighting', desc: 'Use of light at night', source: 'Observation', res: 'Categorical', codes: { "1": "Electrical", "2": "Ordinary Kerosene lamp", "3": "Hurricane", "4": "2+3", "5": "None" } },

    // --- DEMOGRAPHIC: LOCATION ---
    { id: 38, cat: 'Demographic', sub: 'Location', name: 'Duration in Dhaka', desc: 'Since how long do you live in Dhaka city', source: 'Interview', res: 'Categorical', codes: { "1": "<1 Yr", "2": "1-2 Yrs", "3": "3-5 Yrs", "4": ">5 Yrs", "5": "Seasonal" } },
    { id: 39, cat: 'Demographic', sub: 'Location', name: 'Present Location (Thana)', desc: 'Present location (thana)', source: 'Interview', res: 'Categorical', codes: { "1": "Basti", "2": "Common housing area", "3": "Residential area", "4": "Village area", "5": "Others" } },
    { id: 40, cat: 'Demographic', sub: 'Location', name: 'Present Location (Area)', desc: 'Present location (area)', source: 'Interview', res: 'Text', codes: null },
    { id: 90, cat: 'Demographic', sub: 'Location', name: 'Distance Covered', desc: 'Total distance covered (miles)', source: 'Interview', res: 'Numeric', codes: null },
    { id: 91, cat: 'Demographic', sub: 'Location', name: 'Travel Time (Hours)', desc: 'Total time taken to reach (Hour)', source: 'Interview', res: 'Numeric', codes: null },
    { id: 92, cat: 'Demographic', sub: 'Location', name: 'Travel Time (Minutes)', desc: 'Total time taken to reach (Minutes)', source: 'Interview', res: 'Numeric', codes: null },
    { id: 14, cat: 'Demographic', sub: 'Food', name: 'Meal Before Onset', desc: 'How many hours before onset of diarrhoea meal was taken?', source: 'Interview', res: 'Numeric', codes: null },

    // --- DEMOGRAPHIC: WASH ---
    { id: 22, cat: 'Demographic', sub: 'WASH', name: 'Drinking Water Source', desc: 'Source of drinking water', source: 'Interview', res: 'Categorical', codes: { "1": "Tap", "2": "Tube Well", "3": "Pond/River/Ditch", "4": "1+2", "5": "1+3", "6": "2+3", "7": "1+2+3" } },
    { id: 23, cat: 'Demographic', sub: 'WASH', name: 'Bathing Water Source', desc: 'Source of water for washing/bathing', source: 'Interview', res: 'Categorical', codes: { "1": "Tap", "2": "Tube Well", "3": "Pond/River/Ditch", "4": "1+2", "5": "1+3", "6": "2+3", "7": "1+2+3" } },
    { id: 24, cat: 'Demographic', sub: 'WASH', name: 'Defecation Place', desc: 'Place of defecation', source: 'Interview', res: 'Categorical', codes: { "1": "Sanitary", "2": "Semi-sanitary", "3": "Service", "4": "Dughole (with ring)", "5": "Open pit", "6": "Hanging", "7": "No fixed place" } },
    { id: 132, cat: 'Demographic', sub: 'WASH', name: 'Drinking Water Distance', desc: 'Distance of drinking water source from kitchen', source: 'Interview', res: 'Numeric', codes: null },
    { id: 133, cat: 'Demographic', sub: 'WASH', name: 'Drinking Water Users', desc: 'Number of family user of drinking water source', source: 'Interview', res: 'Numeric', codes: null },
    { id: 134, cat: 'Demographic', sub: 'WASH', name: 'Drinking Water Frequency', desc: 'Frequency of collection from drinking water source', source: 'Interview', res: 'Numeric', codes: null },
    { id: 141, cat: 'Demographic', sub: 'WASH', name: 'Water Treatment', desc: 'Any treatment of the drinking water', source: 'Interview', res: 'Categorical', codes: { "0": "None", "1": "Boiling", "2": "Alum/tablet", "3": "Sieving", "4": "Use filter", "5": "Other" } },
    { id: 164, cat: 'Demographic', sub: 'WASH', name: 'Garbage Disposal', desc: 'Disposal of garbage', source: 'Interview', res: 'Categorical', codes: { "1": "Courtyard", "2": "Outside the house" } },

    // --- DEMOGRAPHIC: ASSETS ---
    { id: 146, cat: 'Demographic', sub: 'Assets', name: 'Fan Ownership', desc: 'Family owns fan', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No" } },
    { id: 147, cat: 'Demographic', sub: 'Assets', name: 'Radio Ownership', desc: 'Family owns radio', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No" } },
    { id: 148, cat: 'Demographic', sub: 'Assets', name: 'TV Ownership', desc: 'Family owns TV', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No" } },
    { id: 149, cat: 'Demographic', sub: 'Assets', name: 'Almirah Ownership', desc: 'Family owns almirah', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No" } },
    { id: 152, cat: 'Demographic', sub: 'Assets', name: 'Gas Cooking', desc: 'Family uses gas for cooking', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No" } },

    // --- DEMOGRAPHIC: IMMUNIZATION ---
    { id: 106, cat: 'Demographic', sub: 'Immunization', name: 'BCG Immunization', desc: 'Immunization (BCG)', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No", "3": "Don't Know", "9": "NA" } },
    { id: 107, cat: 'Demographic', sub: 'Immunization', name: 'DPT Immunization', desc: 'Immunization (DPT)', source: 'Interview', res: 'Categorical', codes: { "1": "1st dose", "2": "1st+2nd dose", "3": "1st+3rd dose", "4": "Not given", "5": "Don't know" } },
    { id: 108, cat: 'Demographic', sub: 'Immunization', name: 'Polio Immunization', desc: 'Immunization (Polio)', source: 'Interview', res: 'Categorical', codes: { "1": "1st dose", "2": "1st+2nd dose", "3": "1st+3rd dose", "4": "Not given", "5": "Don't know" } },
    { id: 109, cat: 'Demographic', sub: 'Immunization', name: 'Measles Immunization', desc: 'Immunization (Measles)', source: 'Interview', res: 'Categorical', codes: { "1": "Yes", "2": "No", "3": "Don't Know", "9": "NA" } },

    // =============================================
    // CLIMATIC CATEGORY
    // =============================================
    
    { id: 299, cat: 'Climatic', sub: 'Station', name: 'Weather Station', desc: 'Weather Station identifier', source: 'Weather Station', res: 'Categorical', codes: null },
    { id: 300, cat: 'Climatic', sub: 'Temperature', name: 'Average Temperature', desc: 'Daily Average Temperature (Celsius)', source: 'Weather Station', res: 'Daily', codes: null },
    { id: 301, cat: 'Climatic', sub: 'Temperature', name: 'Maximum Temperature', desc: 'Daily Maximum Temperature (Celsius)', source: 'Weather Station', res: 'Daily', codes: null },
    { id: 302, cat: 'Climatic', sub: 'Temperature', name: 'Minimum Temperature', desc: 'Daily Minimum Temperature (Celsius)', source: 'Weather Station', res: 'Daily', codes: null },
    { id: 303, cat: 'Climatic', sub: 'Atmosphere', name: 'Average Dewpoint', desc: 'Daily average dewpoint temperature (Celsius)', source: 'Weather Station', res: 'Daily', codes: null },
    { id: 304, cat: 'Climatic', sub: 'Atmosphere', name: 'Average Humidity', desc: 'Daily average Relative Humidity (%)', source: 'Weather Station', res: 'Daily', codes: null },
    { id: 305, cat: 'Climatic', sub: 'Precipitation', name: 'Total Rainfall', desc: 'Daily total rainfall (mm)', source: 'Weather Station', res: 'Daily', codes: null },
    { id: 306, cat: 'Climatic', sub: 'Atmosphere', name: 'Sunshine Hours', desc: 'Sunshine hour', source: 'Weather Station', res: 'Daily', codes: null },
    { id: 307, cat: 'Climatic', sub: 'Atmosphere', name: 'Average Cloud Coverage', desc: 'Daily average cloud coverage (Okta)', source: 'Weather Station', res: 'Daily', codes: null },
    { id: 308, cat: 'Climatic', sub: 'Temperature', name: 'ERA5 Temperature', desc: 'ERA5 Reanalysis 2m Temperature', source: 'ERA5 Reanalysis', res: 'Hourly/Daily', codes: null },
    { id: 309, cat: 'Climatic', sub: 'Temperature', name: 'ERA5 Max Temperature', desc: 'ERA5 Reanalysis Maximum 2m Temperature', source: 'ERA5 Reanalysis', res: 'Daily', codes: null },
    { id: 310, cat: 'Climatic', sub: 'Temperature', name: 'ERA5 Min Temperature', desc: 'ERA5 Reanalysis Minimum 2m Temperature', source: 'ERA5 Reanalysis', res: 'Daily', codes: null },
    { id: 311, cat: 'Climatic', sub: 'Precipitation', name: 'TRMM Rainfall', desc: 'TRMM Satellite Precipitation', source: 'TRMM 3B42', res: '3-hourly', codes: null },
    { id: 312, cat: 'Climatic', sub: 'Precipitation', name: 'GPM Rainfall', desc: 'GPM IMERG Precipitation', source: 'GPM IMERG', res: '30-min/Daily', codes: null },
    { id: 313, cat: 'Climatic', sub: 'Precipitation', name: 'CHIRPS Rainfall', desc: 'CHIRPS Precipitation Estimates', source: 'CHIRPS', res: 'Daily/Pentad', codes: null },
    { id: 314, cat: 'Climatic', sub: 'Atmosphere', name: 'ERA5 Humidity', desc: 'ERA5 Relative Humidity', source: 'ERA5 Reanalysis', res: 'Hourly/Daily', codes: null },
    { id: 315, cat: 'Climatic', sub: 'Atmosphere', name: 'ERA5 Dewpoint', desc: 'ERA5 2m Dewpoint Temperature', source: 'ERA5 Reanalysis', res: 'Hourly/Daily', codes: null },
    { id: 316, cat: 'Climatic', sub: 'Atmosphere', name: 'ERA5 Wind Speed', desc: 'ERA5 10m Wind Speed', source: 'ERA5 Reanalysis', res: 'Hourly/Daily', codes: null },
    { id: 317, cat: 'Climatic', sub: 'Atmosphere', name: 'ERA5 Surface Pressure', desc: 'ERA5 Surface Pressure', source: 'ERA5 Reanalysis', res: 'Hourly/Daily', codes: null },
    { id: 318, cat: 'Climatic', sub: 'Radiation', name: 'Solar Radiation', desc: 'Downward Solar Radiation', source: 'ERA5/CERES', res: 'Daily', codes: null },
    { id: 319, cat: 'Climatic', sub: 'Radiation', name: 'UV Index', desc: 'Ultraviolet Index', source: 'OMI/TROPOMI', res: 'Daily', codes: null },
    { id: 320, cat: 'Climatic', sub: 'Atmosphere', name: 'Evapotranspiration', desc: 'Potential Evapotranspiration', source: 'ERA5/MODIS', res: 'Daily', codes: null },

    // =============================================
    // ENVIRONMENTAL CATEGORY (Satellite/Remote Sensing)
    // =============================================

    // --- ENVIRONMENTAL: HYDROLOGICAL ---
    { id: 400, cat: 'Environmental', sub: 'Hydrological', name: 'River Discharge', desc: 'River discharge/flow anomalies', source: 'GRACE/GloFAS', res: 'Monthly', codes: null },
    { id: 401, cat: 'Environmental', sub: 'Hydrological', name: 'Flood Extent', desc: 'Flood inundation mapping', source: 'Sentinel-1 SAR', res: '6-12 Days', codes: null },
    { id: 402, cat: 'Environmental', sub: 'Hydrological', name: 'Groundwater Storage', desc: 'Groundwater storage anomaly', source: 'GRACE/GRACE-FO', res: 'Monthly', codes: null },
    { id: 403, cat: 'Environmental', sub: 'Hydrological', name: 'Water Levels', desc: 'Surface water altimetry height', source: 'SWOT/Jason-3', res: '10 Days', codes: null },
    { id: 404, cat: 'Environmental', sub: 'Hydrological', name: 'Surface Water Extent', desc: 'Surface water body extent', source: 'Landsat/Sentinel-2', res: '5-16 Days', codes: null },
    { id: 405, cat: 'Environmental', sub: 'Hydrological', name: 'Runoff', desc: 'Surface runoff estimation', source: 'GLDAS/ERA5', res: 'Daily', codes: null },
    { id: 406, cat: 'Environmental', sub: 'Hydrological', name: 'Wetland Extent', desc: 'Wetland area mapping', source: 'Sentinel-1/2', res: 'Monthly', codes: null },
    { id: 407, cat: 'Environmental', sub: 'Hydrological', name: 'Water Quality Index', desc: 'Composite water quality index', source: 'Sentinel-2/Landsat', res: '5-16 Days', codes: null },

    // --- ENVIRONMENTAL: PHYSICOCHEMICAL ---
    { id: 410, cat: 'Environmental', sub: 'Physicochemical', name: 'Chlorophyll-a', desc: 'Phytoplankton/algal biomass indicator', source: 'MODIS/Sentinel-3', res: 'Daily', codes: null },
    { id: 411, cat: 'Environmental', sub: 'Physicochemical', name: 'Sea Surface Temperature', desc: 'SST - Sea/Lake Surface Temperature', source: 'MODIS/VIIRS', res: 'Daily', codes: null },
    { id: 412, cat: 'Environmental', sub: 'Physicochemical', name: 'Sea Surface Salinity', desc: 'SSS - Surface Salinity', source: 'SMOS/Aquarius', res: '3 Days', codes: null },
    { id: 413, cat: 'Environmental', sub: 'Physicochemical', name: 'Turbidity', desc: 'Water turbidity/suspended solids', source: 'Sentinel-2', res: '5 Days', codes: null },
    { id: 414, cat: 'Environmental', sub: 'Physicochemical', name: 'CDOM', desc: 'Colored Dissolved Organic Matter', source: 'Sentinel-3/MODIS', res: 'Daily', codes: null },
    { id: 415, cat: 'Environmental', sub: 'Physicochemical', name: 'Total Suspended Matter', desc: 'TSM concentration', source: 'Sentinel-2/3', res: '5 Days', codes: null },
    { id: 416, cat: 'Environmental', sub: 'Physicochemical', name: 'Secchi Disk Depth', desc: 'Water transparency indicator', source: 'Sentinel-3/MODIS', res: 'Daily', codes: null },
    { id: 417, cat: 'Environmental', sub: 'Physicochemical', name: 'Photosynthetically Active Radiation', desc: 'PAR in water column', source: 'MODIS', res: 'Daily', codes: null },
    { id: 418, cat: 'Environmental', sub: 'Physicochemical', name: 'Lake Water Temperature', desc: 'Inland water body temperature', source: 'Landsat/MODIS', res: '8-16 Days', codes: null },

    // --- ENVIRONMENTAL: TERRESTRIAL ---
    { id: 420, cat: 'Environmental', sub: 'Terrestrial', name: 'NDVI', desc: 'Normalized Difference Vegetation Index', source: 'Sentinel-2/Landsat/MODIS', res: '5-16 Days', codes: null },
    { id: 421, cat: 'Environmental', sub: 'Terrestrial', name: 'EVI', desc: 'Enhanced Vegetation Index', source: 'MODIS', res: '16 Days', codes: null },
    { id: 422, cat: 'Environmental', sub: 'Terrestrial', name: 'Soil Moisture', desc: 'Surface soil moisture content', source: 'SMAP (L-band)', res: '2-3 Days', codes: null },
    { id: 423, cat: 'Environmental', sub: 'Terrestrial', name: 'Land Surface Temperature', desc: 'LST - Daytime/Nighttime', source: 'Landsat 8/MODIS', res: '8-16 Days', codes: null },
    { id: 424, cat: 'Environmental', sub: 'Terrestrial', name: 'Land Cover', desc: 'Land Use/Land Cover classification', source: 'MODIS MCD12Q1', res: 'Yearly', codes: null },
    { id: 425, cat: 'Environmental', sub: 'Terrestrial', name: 'NDWI', desc: 'Normalized Difference Water Index', source: 'Sentinel-2/Landsat', res: '5-16 Days', codes: null },
    { id: 426, cat: 'Environmental', sub: 'Terrestrial', name: 'NDBI', desc: 'Normalized Difference Built-up Index', source: 'Sentinel-2/Landsat', res: '5-16 Days', codes: null },
    { id: 427, cat: 'Environmental', sub: 'Terrestrial', name: 'Albedo', desc: 'Surface albedo/reflectance', source: 'MODIS', res: '8 Days', codes: null },
    { id: 428, cat: 'Environmental', sub: 'Terrestrial', name: 'LAI', desc: 'Leaf Area Index', source: 'MODIS', res: '8 Days', codes: null },
    { id: 429, cat: 'Environmental', sub: 'Terrestrial', name: 'FPAR', desc: 'Fraction of Photosynthetically Active Radiation', source: 'MODIS', res: '8 Days', codes: null },
    { id: 430, cat: 'Environmental', sub: 'Terrestrial', name: 'GPP', desc: 'Gross Primary Productivity', source: 'MODIS', res: '8 Days', codes: null },
    { id: 431, cat: 'Environmental', sub: 'Terrestrial', name: 'NPP', desc: 'Net Primary Productivity', source: 'MODIS', res: 'Yearly', codes: null },
    { id: 432, cat: 'Environmental', sub: 'Terrestrial', name: 'Urban Heat Island', desc: 'Urban thermal anomaly', source: 'Landsat/MODIS', res: '8-16 Days', codes: null },
    { id: 433, cat: 'Environmental', sub: 'Terrestrial', name: 'Impervious Surface', desc: 'Impervious surface percentage', source: 'Landsat', res: 'Yearly', codes: null },

    // --- ENVIRONMENTAL: ATMOSPHERIC ---
    { id: 440, cat: 'Environmental', sub: 'Atmospheric', name: 'NO2 Column', desc: 'Tropospheric NO2 column density', source: 'Sentinel-5P TROPOMI', res: 'Daily', codes: null },
    { id: 441, cat: 'Environmental', sub: 'Atmospheric', name: 'SO2 Column', desc: 'SO2 column density', source: 'Sentinel-5P TROPOMI', res: 'Daily', codes: null },
    { id: 442, cat: 'Environmental', sub: 'Atmospheric', name: 'CO Column', desc: 'Carbon monoxide column', source: 'Sentinel-5P TROPOMI', res: 'Daily', codes: null },
    { id: 443, cat: 'Environmental', sub: 'Atmospheric', name: 'O3 Column', desc: 'Total ozone column', source: 'Sentinel-5P TROPOMI', res: 'Daily', codes: null },
    { id: 444, cat: 'Environmental', sub: 'Atmospheric', name: 'Aerosol Optical Depth', desc: 'AOD - Particulate matter indicator', source: 'MODIS/VIIRS', res: 'Daily', codes: null },
    { id: 445, cat: 'Environmental', sub: 'Atmospheric', name: 'PM2.5 Estimates', desc: 'Fine particulate matter concentration', source: 'MODIS AOD derived', res: 'Daily', codes: null },
    { id: 446, cat: 'Environmental', sub: 'Atmospheric', name: 'PM10 Estimates', desc: 'Coarse particulate matter concentration', source: 'MODIS AOD derived', res: 'Daily', codes: null },
    { id: 447, cat: 'Environmental', sub: 'Atmospheric', name: 'CH4 Column', desc: 'Methane column concentration', source: 'Sentinel-5P TROPOMI', res: 'Daily', codes: null },
    { id: 448, cat: 'Environmental', sub: 'Atmospheric', name: 'HCHO Column', desc: 'Formaldehyde column', source: 'Sentinel-5P TROPOMI', res: 'Daily', codes: null },
    { id: 449, cat: 'Environmental', sub: 'Atmospheric', name: 'Absorbing Aerosol Index', desc: 'UV Absorbing Aerosol Index', source: 'Sentinel-5P TROPOMI', res: 'Daily', codes: null },

    // --- ENVIRONMENTAL: NIGHTTIME LIGHTS ---
    { id: 450, cat: 'Environmental', sub: 'Socioeconomic', name: 'Nighttime Lights', desc: 'Nighttime light radiance', source: 'VIIRS DNB', res: 'Monthly', codes: null },
    { id: 451, cat: 'Environmental', sub: 'Socioeconomic', name: 'Light Pollution', desc: 'Artificial light at night intensity', source: 'VIIRS DNB', res: 'Monthly', codes: null },
    { id: 452, cat: 'Environmental', sub: 'Socioeconomic', name: 'Urban Expansion', desc: 'Urban growth detection', source: 'VIIRS/Landsat', res: 'Yearly', codes: null },

    // --- ENVIRONMENTAL: POPULATION ---
    { id: 455, cat: 'Environmental', sub: 'Population', name: 'Population Density', desc: 'Gridded population density', source: 'WorldPop/GPW', res: 'Yearly', codes: null },
    { id: 456, cat: 'Environmental', sub: 'Population', name: 'Settlement Mapping', desc: 'Human settlement extent', source: 'GHSL', res: 'Multi-year', codes: null },
    { id: 457, cat: 'Environmental', sub: 'Infrastructure', name: 'Road Network Density', desc: 'Road network per area', source: 'OpenStreetMap', res: 'Continuous', codes: null },
    { id: 458, cat: 'Environmental', sub: 'Infrastructure', name: 'Distance to Health Facility', desc: 'Accessibility to healthcare', source: 'OSM/GRID3', res: 'Continuous', codes: null },
    { id: 459, cat: 'Environmental', sub: 'Infrastructure', name: 'Distance to Water Body', desc: 'Proximity to surface water', source: 'Derived', res: 'Continuous', codes: null },

    // --- ENVIRONMENTAL: TERRAIN ---
    { id: 460, cat: 'Environmental', sub: 'Terrain', name: 'Elevation', desc: 'Digital Elevation Model', source: 'SRTM/ASTER', res: '30m', codes: null },
    { id: 461, cat: 'Environmental', sub: 'Terrain', name: 'Slope', desc: 'Terrain slope', source: 'SRTM derived', res: '30m', codes: null },
    { id: 462, cat: 'Environmental', sub: 'Terrain', name: 'Aspect', desc: 'Terrain aspect/orientation', source: 'SRTM derived', res: '30m', codes: null },
    { id: 463, cat: 'Environmental', sub: 'Terrain', name: 'TWI', desc: 'Topographic Wetness Index', source: 'SRTM derived', res: '30m', codes: null },
    { id: 464, cat: 'Environmental', sub: 'Terrain', name: 'Flow Accumulation', desc: 'Hydrological flow accumulation', source: 'SRTM derived', res: '30m', codes: null },
    { id: 465, cat: 'Environmental', sub: 'Terrain', name: 'Flood Prone Areas', desc: 'Flood susceptibility mapping', source: 'Derived/Historical', res: '30m', codes: null },

    // --- ENVIRONMENTAL: COASTAL ---
    { id: 470, cat: 'Environmental', sub: 'Coastal', name: 'Sea Level Anomaly', desc: 'Sea surface height anomaly', source: 'Altimetry', res: '10 Days', codes: null },
    { id: 471, cat: 'Environmental', sub: 'Coastal', name: 'Wave Height', desc: 'Significant wave height', source: 'Altimetry/ERA5', res: 'Daily', codes: null },
    { id: 472, cat: 'Environmental', sub: 'Coastal', name: 'Tidal Range', desc: 'Tidal amplitude', source: 'Model/Gauge', res: 'Hourly', codes: null },
    { id: 473, cat: 'Environmental', sub: 'Coastal', name: 'Coastal Erosion', desc: 'Shoreline change rate', source: 'Landsat time series', res: 'Yearly', codes: null },
    { id: 474, cat: 'Environmental', sub: 'Coastal', name: 'Mangrove Extent', desc: 'Mangrove forest mapping', source: 'Sentinel-2/Landsat', res: 'Yearly', codes: null },

    // --- ENVIRONMENTAL: CLIMATE INDICES ---
    { id: 480, cat: 'Environmental', sub: 'Climate Index', name: 'ENSO Index', desc: 'El Niño Southern Oscillation Index', source: 'NOAA', res: 'Monthly', codes: null },
    { id: 481, cat: 'Environmental', sub: 'Climate Index', name: 'IOD Index', desc: 'Indian Ocean Dipole Index', source: 'NOAA/BOM', res: 'Monthly', codes: null },
    { id: 482, cat: 'Environmental', sub: 'Climate Index', name: 'Monsoon Index', desc: 'South Asian Monsoon Index', source: 'IMD/NOAA', res: 'Monthly', codes: null },
    { id: 483, cat: 'Environmental', sub: 'Climate Index', name: 'SPI', desc: 'Standardized Precipitation Index', source: 'Derived', res: 'Monthly', codes: null },
    { id: 484, cat: 'Environmental', sub: 'Climate Index', name: 'SPEI', desc: 'Standardized Precipitation-Evapotranspiration Index', source: 'Derived', res: 'Monthly', codes: null },
    { id: 485, cat: 'Environmental', sub: 'Climate Index', name: 'Drought Index', desc: 'Combined drought indicator', source: 'Multiple', res: 'Weekly/Monthly', codes: null },

    // --- ENVIRONMENTAL: DISEASE ECOLOGY ---
    { id: 490, cat: 'Environmental', sub: 'Ecology', name: 'Vibrio Suitability Index', desc: 'Environmental suitability for Vibrio cholerae', source: 'Derived/Model', res: 'Weekly', codes: null },
    { id: 491, cat: 'Environmental', sub: 'Ecology', name: 'Plankton Bloom', desc: 'Phytoplankton bloom detection', source: 'Sentinel-3/MODIS', res: 'Daily', codes: null },
    { id: 492, cat: 'Environmental', sub: 'Ecology', name: 'Algal Bloom Risk', desc: 'Harmful algal bloom risk', source: 'Derived', res: 'Weekly', codes: null },
    { id: 493, cat: 'Environmental', sub: 'Ecology', name: 'Fecal Contamination Risk', desc: 'Modeled contamination risk', source: 'Derived', res: 'Event-based', codes: null },
    { id: 494, cat: 'Environmental', sub: 'Ecology', name: 'Mosquito Habitat Suitability', desc: 'Vector breeding suitability', source: 'Derived', res: 'Weekly', codes: null }
];

// Sort data by ID for consistency
masterData.sort((a, b) => a.id - b.id);

// Log data loaded confirmation
console.log('CholOut Data Module Loaded Successfully');
console.log('Total Variables:', masterData.length);
console.log('Categories:', [...new Set(masterData.map(d => d.cat))]);