export const FALLBACK_ITEMS = [
  {
    id: 1,
    subject: 'Coffee mug',
    category: 'non-living',
    complexity: 'simple',
    drawWhat: 'The whole mug, three-quarter view',
    simplificationNote: '',
    referenceType: 'diagram',
    diagramSvg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="#1e1b4b"/>
      <ellipse cx="140" cy="90" rx="60" ry="18" stroke="#c4b5fd" stroke-width="1.5" fill="none"/>
      <line x1="80" y1="90" x2="80" y2="200" stroke="#c4b5fd" stroke-width="1.5"/>
      <line x1="200" y1="90" x2="200" y2="200" stroke="#c4b5fd" stroke-width="1.5"/>
      <ellipse cx="140" cy="200" rx="60" ry="18" stroke="#c4b5fd" stroke-width="1.5" fill="none"/>
      <path d="M200 120 Q230 120 230 150 Q230 180 200 180" stroke="#c4b5fd" stroke-width="1.5" fill="none"/>
      <line x1="140" y1="72" x2="140" y2="218" stroke="#6d28d9" stroke-width="1" stroke-dasharray="4 3"/>
      <text x="150" y="50" fill="#a78bfa" font-size="11" font-family="sans-serif">rim ellipse</text>
      <text x="208" y="155" fill="#a78bfa" font-size="11" font-family="sans-serif">handle</text>
      <text x="60" y="260" fill="#a78bfa" font-size="11" font-family="sans-serif">cylinder body</text>
    </svg>`,
    imageUrl: '',
    searchLink: 'https://unsplash.com/s/photos/coffee-mug',
    constructionTips: [
      'Block in the body as a cylinder — two vertical lines + top/bottom ellipses',
      'The rim ellipse gets flatter the closer it is to eye level',
      'The handle is a D-shape; attach at 1/3 and 2/3 of the body height',
      'Add a subtle shadow ellipse under the base',
    ],
  },
  {
    id: 2,
    subject: 'Human hand',
    category: 'living',
    complexity: 'moderate',
    drawWhat: 'Just the hand, back view, fingers slightly spread',
    simplificationNote: 'Narrowed from full figure — a hand is a complete study on its own',
    referenceType: 'link',
    diagramSvg: '',
    imageUrl: '',
    searchLink: 'https://unsplash.com/s/photos/hand',
    constructionTips: [
      'Start with a wedge/rectangle for the palm — it has real thickness',
      'Fingers are three cylinder segments each; knuckles widen them slightly',
      'The thumb shoots out at roughly 45° from the heel of the palm',
      'Check proportions: middle finger tip to wrist ≈ palm height × 2',
    ],
  },
  {
    id: 3,
    subject: 'Glass bottle',
    category: 'non-living',
    complexity: 'simple',
    drawWhat: 'A simple glass bottle, front view',
    simplificationNote: '',
    referenceType: 'diagram',
    diagramSvg: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="#1e1b4b"/>
      <line x1="150" y1="30" x2="150" y2="270" stroke="#6d28d9" stroke-width="1" stroke-dasharray="4 3"/>
      <rect x="115" y="180" width="70" height="90" rx="10" stroke="#c4b5fd" stroke-width="1.5" fill="none"/>
      <path d="M115 180 Q115 130 130 100 L130 60 L170 60 L170 100 Q185 130 185 180" stroke="#c4b5fd" stroke-width="1.5" fill="none"/>
      <rect x="130" y="40" width="40" height="22" rx="4" stroke="#c4b5fd" stroke-width="1.5" fill="none"/>
      <text x="195" y="230" fill="#a78bfa" font-size="11" font-family="sans-serif">body cylinder</text>
      <text x="195" y="135" fill="#a78bfa" font-size="11" font-family="sans-serif">shoulder taper</text>
      <text x="175" y="55" fill="#a78bfa" font-size="11" font-family="sans-serif">neck</text>
    </svg>`,
    imageUrl: '',
    searchLink: 'https://unsplash.com/s/photos/glass-bottle',
    constructionTips: [
      'Center line first — symmetry is critical for bottles',
      'Block in three zones: neck, shoulder taper, body cylinder',
      'The shoulder curve flows smoothly — avoid sharp kinks',
      'Use ellipses for the base and any visible rim',
    ],
  },
  {
    id: 4,
    subject: 'Cat ear and head',
    category: 'living',
    complexity: 'moderate',
    drawWhat: "Cat's head and ears only, front view",
    simplificationNote: 'Narrowed from full cat — head construction is rich enough',
    referenceType: 'link',
    diagramSvg: '',
    imageUrl: '',
    searchLink: 'https://unsplash.com/s/photos/cat-face',
    constructionTips: [
      'Start with a circle for the cranium; flatten the bottom third for the face',
      'Eyes sit on the horizontal center line, about one eye-width apart',
      'Triangular ears grow from the top of the circle at roughly 45° each',
      'The muzzle is a smaller circle sitting below the center, with the nose at its top',
    ],
  },
];
