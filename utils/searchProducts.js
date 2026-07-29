function getRelevanceScore(item, term) {
  const lowerTerm = term.toLowerCase();
  let score = 0;

  const name = (item.name || '').toLowerCase();
  const category = (item.category || '').toLowerCase();
  const description = (item.description || '').toLowerCase();
  const fullDescription = (item.fullDescription || '').toLowerCase();
  const details = item.details || {};
  const hairType = (details.hairType || '').toLowerCase();
  const hairTexture = (details.hairTexture || '').toLowerCase();
  const wigType = (details.wigType || '').toLowerCase();
  const tags = (Array.isArray(item.tags) ? item.tags : []).map(t => (t || '').toLowerCase()).join(' ');
  const keywords = (item.keywords || '').toLowerCase();

  if (name === lowerTerm) score += 100;
  else if (name.startsWith(lowerTerm)) score += 80;
  else if (name.includes(lowerTerm)) score += 60;

  if (category.includes(lowerTerm)) score += 40;
  if (description.includes(lowerTerm)) score += 20;
  if (fullDescription.includes(lowerTerm)) score += 15;
  if (hairType.includes(lowerTerm)) score += 25;
  if (hairTexture.includes(lowerTerm)) score += 25;
  if (wigType.includes(lowerTerm)) score += 25;
  if (tags.includes(lowerTerm)) score += 30;
  if (keywords.includes(lowerTerm)) score += 30;

  return score;
}

function getBundleRelevanceScore(item, term) {
  const lowerTerm = term.toLowerCase();
  let score = 0;

  const title = (item.title || '').toLowerCase();
  const description = (item.description || '').toLowerCase();
  const includes = (Array.isArray(item.includes) ? item.includes : []).join(' ').toLowerCase();

  if (title === lowerTerm) score += 100;
  else if (title.startsWith(lowerTerm)) score += 80;
  else if (title.includes(lowerTerm)) score += 60;

  if (includes.includes(lowerTerm)) score += 40;
  if (description.includes(lowerTerm)) score += 20;

  return score;
}

export function searchProducts(products, bundles, term) {
  const trimmed = (term || '').trim();
  if (!trimmed) return { products: [], bundles: [] };

  const lowerTerm = trimmed.toLowerCase();

  const matchedProducts = (products || [])
    .map(p => ({
      ...p,
      _score: getRelevanceScore(p, lowerTerm),
      _type: 'product'
    }))
    .filter(p => p._score > 0)
    .sort((a, b) => b._score - a._score);

  const matchedBundles = (bundles || [])
    .map(b => ({
      ...b,
      _score: getBundleRelevanceScore(b, lowerTerm),
      _type: 'bundle'
    }))
    .filter(b => b._score > 0)
    .sort((a, b) => b._score - a._score);

  return { products: matchedProducts, bundles: matchedBundles };
}

export function getHighlightedSegments(text, term) {
  if (!text || !term) return [{ text: text || '', highlight: false }];

  const lowerText = text.toLowerCase();
  const lowerTerm = term.toLowerCase();
  const index = lowerText.indexOf(lowerTerm);

  if (index === -1) return [{ text, highlight: false }];

  const segments = [];
  if (index > 0) {
    segments.push({ text: text.slice(0, index), highlight: false });
  }
  segments.push({ text: text.slice(index, index + term.length), highlight: true });
  if (index + term.length < text.length) {
    segments.push({ text: text.slice(index + term.length), highlight: false });
  }
  return segments;
}
