const seenTitles = new Set<string>();

export function validateSeo(
  options: {
    title?: string;
    description?: string;
    canonical?: string;
  },
  strict?: boolean
) {
  if (process.env.NODE_ENV === "production") return;

  const { title, description, canonical } = options;
  const errors: string[] = [];

  if (!title) {
    warn("Missing <title> tag");
  }

  if (description && description.length > 160) {
    warn(
      `Meta description too long (${description.length} chars). Recommended ≤ 160.`
    );
  }

  if (!canonical) {
    warn("Missing canonical URL");
  }

  if (title) {
    if (seenTitles.has(title)) {
      warn(`Duplicate title detected: "${title}"`);
    } else {
      seenTitles.add(title);
    }
  }

  if (errors.length) {
    if (strict) {
      throw new Error(`[react-smart-seo]\n${errors.join("\n")}`);
    } else {
      errors.forEach(warn);
    }
  }
}

function warn(message: string) {
  console.warn(`⚠️ [react-smart-seo] ${message}`);
}
