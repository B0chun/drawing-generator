export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { categoryMix = 'both', count = 4, minutes = 3 } = req.body || {};

  const categoryInstruction =
    categoryMix === 'living'
      ? 'All subjects must be living things (animals, plants, people, body parts, insects, etc.).'
      : categoryMix === 'non-living'
      ? 'All subjects must be non-living objects (tools, vehicles, furniture, architecture, food items, etc.).'
      : 'Mix living and non-living subjects for variety (aim for roughly half and half).';

  const prompt = `You are a drawing-practice session generator. Generate ${count} varied drawing subjects for a timed practice session (${minutes} minutes per subject).

${categoryInstruction}

Rules:
- Vary the subjects widely — no two should be from the same sub-category.
- Self-assess complexity: if a subject is too complex to draw meaningfully in ${minutes} minutes (whole horse, full face, entire car), narrow it to one part (just the eye, just the wheel arch, just the hoof). Record this in drawWhat and simplificationNote.
- For referenceType: use "diagram" for simple geometric/man-made objects where a primitive SVG construction breakdown is genuinely useful. Use "image" or "link" for organic/complex subjects. When in doubt, prefer "link" over a misleading diagram.
- If referenceType is "diagram": provide a clean inline SVG (viewBox 0 0 300 300) showing the subject broken into primitive forms (spheres, cylinders, boxes, ellipses) with construction lines. Use stroke="#c4b5fd" fill="none" for outlines, stroke="#6d28d9" stroke-dasharray="4 3" for guide lines, and white text labels. Dark background: rect fill="#1e1b4b". Keep it instructive, not decorative.
- If referenceType is "image": provide a stable embeddable image URL (or leave empty if unsure).
- Always include a searchLink (unsplash or google images search URL for the subject).
- constructionTips: 3-4 short, actionable tips for building the form from primitives.

Return ONLY valid JSON, no prose, no markdown fences. Schema:
{
  "items": [
    {
      "id": 1,
      "subject": "Coffee mug",
      "category": "non-living",
      "complexity": "simple",
      "drawWhat": "The whole mug, three-quarter view",
      "simplificationNote": "",
      "referenceType": "diagram",
      "diagramSvg": "<svg viewBox='0 0 300 300'>...</svg>",
      "imageUrl": "",
      "searchLink": "https://unsplash.com/s/photos/coffee-mug",
      "constructionTips": [
        "Block in the body as a cylinder",
        "Find the ellipse of the rim, flatter near eye level",
        "Attach the handle as a flattened D-shape"
      ]
    }
  ]
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: 'Upstream API error', detail: err });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';

    // Strip markdown fences if model adds them
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return res.status(502).json({ error: 'JSON parse failed', raw: text.slice(0, 500) });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
