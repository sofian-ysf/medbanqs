import { QuestionImage } from './questionGenerator';

// Dermatology condition to image mapping
export const DERMATOLOGY_IMAGE_MAP: Record<string, QuestionImage> = {
  'psoriasis': {
    url: '/images/dermatology/psoriasis.jpg',
    alt: 'Psoriasis - well-demarcated erythematous plaques with silvery scales',
    caption: 'Well-demarcated erythematous plaques with silvery scales',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'eczema': {
    url: '/images/dermatology/eczema.jpg',
    alt: 'Atopic eczema - erythematous, pruritic patches in flexural areas',
    caption: 'Erythematous, pruritic patches typically in flexural areas',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'melanoma': {
    url: '/images/dermatology/melanoma.jpg',
    alt: 'Melanoma - asymmetric pigmented lesion with irregular borders',
    caption: 'Asymmetric pigmented lesion with irregular borders (ABCDE criteria)',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'basal cell carcinoma': {
    url: '/images/dermatology/bcc.jpg',
    alt: 'Basal cell carcinoma - pearly nodule with telangiectasia',
    caption: 'Pearly nodule with telangiectasia and rolled edges',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'squamous cell carcinoma': {
    url: '/images/dermatology/scc.jpg',
    alt: 'Squamous cell carcinoma - hyperkeratotic nodule or ulcer',
    caption: 'Hyperkeratotic nodule or ulcerated lesion on sun-exposed area',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'acne vulgaris': {
    url: '/images/dermatology/acne.jpg',
    alt: 'Acne vulgaris - comedones, papules, and pustules',
    caption: 'Mixed comedones, papules, and pustules',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'rosacea': {
    url: '/images/dermatology/rosacea.jpg',
    alt: 'Rosacea - facial erythema with papules and pustules',
    caption: 'Central facial erythema with papules and pustules',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'seborrhoeic dermatitis': {
    url: '/images/dermatology/seb_derm.jpg',
    alt: 'Seborrhoeic dermatitis - greasy scales on erythematous base',
    caption: 'Greasy yellow scales on erythematous base',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'impetigo': {
    url: '/images/dermatology/impetigo.jpg',
    alt: 'Impetigo - honey-crusted lesions',
    caption: 'Characteristic honey-crusted lesions',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'cellulitis': {
    url: '/images/dermatology/cellulitis.jpg',
    alt: 'Cellulitis - erythematous, warm, tender skin',
    caption: 'Erythematous, warm, tender area with advancing margin',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'herpes zoster': {
    url: '/images/dermatology/shingles.jpg',
    alt: 'Herpes zoster - vesicular rash in dermatomal distribution',
    caption: 'Vesicular rash following dermatomal distribution',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'herpes simplex': {
    url: '/images/dermatology/herpes_simplex.jpg',
    alt: 'Herpes simplex - grouped vesicles on erythematous base',
    caption: 'Grouped vesicles on erythematous base',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'tinea corporis': {
    url: '/images/dermatology/ringworm.jpg',
    alt: 'Tinea corporis - annular lesion with raised border',
    caption: 'Annular lesion with raised, scaly border',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'scabies': {
    url: '/images/dermatology/scabies.jpg',
    alt: 'Scabies - burrows and papules in web spaces',
    caption: 'Linear burrows and papules, especially in finger web spaces',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'urticaria': {
    url: '/images/dermatology/urticaria.jpg',
    alt: 'Urticaria - raised, pruritic wheals',
    caption: 'Raised, pruritic wheals with central pallor',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'vitiligo': {
    url: '/images/dermatology/vitiligo.jpg',
    alt: 'Vitiligo - depigmented patches',
    caption: 'Well-demarcated depigmented patches',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'lichen planus': {
    url: '/images/dermatology/lichen_planus.jpg',
    alt: 'Lichen planus - purple polygonal papules',
    caption: 'Purple, polygonal, pruritic papules with Wickham striae',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'pityriasis rosea': {
    url: '/images/dermatology/pityriasis_rosea.jpg',
    alt: 'Pityriasis rosea - herald patch and Christmas tree pattern',
    caption: 'Herald patch followed by Christmas tree pattern distribution',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'meningococcal rash': {
    url: '/images/dermatology/meningococcal.jpg',
    alt: 'Meningococcal rash - non-blanching purpuric rash',
    caption: 'Non-blanching purpuric rash (glass test positive)',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  },
  'stevens-johnson syndrome': {
    url: '/images/dermatology/sjs.jpg',
    alt: 'Stevens-Johnson syndrome - target lesions and mucosal involvement',
    caption: 'Target lesions with mucosal involvement',
    position: 'before-question',
    source: 'Clinical Image Database',
    license: 'Educational Use'
  }
};

// Other specialties image mapping
export const RADIOLOGY_IMAGE_MAP: Record<string, QuestionImage> = {
  'pneumonia': {
    url: '/images/radiology/pneumonia_cxr.jpg',
    alt: 'Chest X-ray showing right lower lobe consolidation',
    caption: 'Right lower lobe consolidation consistent with pneumonia',
    position: 'before-question',
    source: 'Radiology Database',
    license: 'Educational Use'
  },
  'pneumothorax': {
    url: '/images/radiology/pneumothorax_cxr.jpg',
    alt: 'Chest X-ray showing left-sided pneumothorax',
    caption: 'Visible pleural line with absent lung markings peripherally',
    position: 'before-question',
    source: 'Radiology Database',
    license: 'Educational Use'
  },
  'pulmonary edema': {
    url: '/images/radiology/pulmonary_edema_cxr.jpg',
    alt: 'Chest X-ray showing pulmonary edema',
    caption: 'Bilateral perihilar infiltrates (bat-wing pattern)',
    position: 'before-question',
    source: 'Radiology Database',
    license: 'Educational Use'
  },
  'subdural hematoma': {
    url: '/images/radiology/subdural_ct.jpg',
    alt: 'CT head showing acute subdural hematoma',
    caption: 'Crescent-shaped hyperdense collection with midline shift',
    position: 'before-question',
    source: 'Radiology Database',
    license: 'Educational Use'
  },
  'ischemic stroke': {
    url: '/images/radiology/stroke_ct.jpg',
    alt: 'CT head showing middle cerebral artery territory infarct',
    caption: 'Loss of grey-white differentiation in MCA territory',
    position: 'before-question',
    source: 'Radiology Database',
    license: 'Educational Use'
  }
};

// ECG image mapping
export const ECG_IMAGE_MAP: Record<string, QuestionImage> = {
  'stemi': {
    url: '/images/ecg/stemi.jpg',
    alt: 'ECG showing ST elevation myocardial infarction',
    caption: 'ST elevation in leads II, III, aVF (inferior STEMI)',
    position: 'before-question',
    source: 'ECG Database',
    license: 'Educational Use'
  },
  'atrial fibrillation': {
    url: '/images/ecg/afib.jpg',
    alt: 'ECG showing atrial fibrillation',
    caption: 'Irregularly irregular rhythm with absent P waves',
    position: 'before-question',
    source: 'ECG Database',
    license: 'Educational Use'
  },
  'complete heart block': {
    url: '/images/ecg/chb.jpg',
    alt: 'ECG showing complete heart block',
    caption: 'AV dissociation with independent P waves and QRS complexes',
    position: 'before-question',
    source: 'ECG Database',
    license: 'Educational Use'
  },
  'ventricular tachycardia': {
    url: '/images/ecg/vt.jpg',
    alt: 'ECG showing ventricular tachycardia',
    caption: 'Wide complex tachycardia at 180 bpm',
    position: 'before-question',
    source: 'ECG Database',
    license: 'Educational Use'
  }
};

// Function to get relevant images for a question based on conditions
export function getImagesForQuestion(
  conditions: string,
  category: string,
  question: string
): QuestionImage[] {
  const images: QuestionImage[] = [];
  const conditionLower = conditions.toLowerCase();
  const questionLower = question.toLowerCase();
  
  // Check dermatology conditions
  for (const [condition, image] of Object.entries(DERMATOLOGY_IMAGE_MAP)) {
    if (conditionLower.includes(condition) || questionLower.includes(condition)) {
      images.push(image);
      break; // Usually one image per question is enough
    }
  }
  
  // Check radiology images
  if (images.length === 0 && (questionLower.includes('x-ray') || questionLower.includes('ct') || questionLower.includes('imaging'))) {
    for (const [condition, image] of Object.entries(RADIOLOGY_IMAGE_MAP)) {
      if (conditionLower.includes(condition) || questionLower.includes(condition)) {
        images.push(image);
        break;
      }
    }
  }
  
  // Check ECG images
  if (images.length === 0 && questionLower.includes('ecg')) {
    for (const [condition, image] of Object.entries(ECG_IMAGE_MAP)) {
      if (conditionLower.includes(condition) || questionLower.includes(condition)) {
        images.push(image);
        break;
      }
    }
  }
  
  return images;
}

// Function to validate image URLs
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Failed to validate image URL: ${url}`, error);
    return false;
  }
}

// Image optimization settings for different use cases
export const IMAGE_OPTIMIZATION = {
  thumbnail: {
    width: 200,
    height: 200,
    quality: 85
  },
  questionDisplay: {
    width: 600,
    height: 400,
    quality: 90
  },
  fullView: {
    width: 1200,
    height: 800,
    quality: 95
  }
};

// Helper to generate CDN URL with optimization params (if using Cloudinary)
export function getOptimizedImageUrl(
  baseUrl: string,
  optimization: keyof typeof IMAGE_OPTIMIZATION
): string {
  const settings = IMAGE_OPTIMIZATION[optimization];
  
  // If using Cloudinary, append transformation params
  if (baseUrl.includes('cloudinary.com')) {
    const transformations = `w_${settings.width},h_${settings.height},q_${settings.quality},c_limit`;
    return baseUrl.replace('/upload/', `/upload/${transformations}/`);
  }
  
  // For local images, return as is (handle optimization on server)
  return baseUrl;
}

// Keywords to identify visual questions
export const VISUAL_QUESTION_KEYWORDS = [
  'rash',
  'lesion',
  'skin',
  'appearance',
  'looks like',
  'photograph shows',
  'image shows',
  'x-ray shows',
  'ecg shows',
  'ct shows',
  'mri shows',
  'dermoscopy',
  'clinical photograph',
  'examination reveals'
];

// Function to determine if a question would benefit from an image
export function shouldIncludeImage(question: string, category: string): boolean {
  const questionLower = question.toLowerCase();
  
  // Always include for certain categories
  if (category.toLowerCase().includes('dermatology') || 
      category.toLowerCase().includes('ophthalmology')) {
    return true;
  }
  
  // Check for visual keywords
  return VISUAL_QUESTION_KEYWORDS.some(keyword => 
    questionLower.includes(keyword)
  );
}

// Export types for use in other modules
export type { QuestionImage } from './questionGenerator';