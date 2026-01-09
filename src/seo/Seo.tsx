import React from "react";
import { useSeoConfig } from "./SeoProvider";
import type { SeoProps } from "../types";
import { validateSeo } from "./validator";

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  index = true,
  follow = true,
  schema,
  strict = false,
}) => {
  const config = useSeoConfig();

  const resolvedTitle = title
    ? config.titleTemplate
      ? config.titleTemplate.replace("%s", title)
      : title
    : config.defaultTitle;

  const resolvedDescription = description ?? config.defaultDescription;

  const robots = `${index ? "index" : "noindex"},${
    follow ? "follow" : "nofollow"
  }`;

  // Canonical URL resolution
  const autoCanonical =
    typeof window !== "undefined" ? window.location.pathname : undefined;

  const resolvedCanonical = canonical ?? autoCanonical;

  // Open Graph Type resolution
  const siteUrl = config.siteUrl;
  const fullUrl =
    resolvedCanonical && config.siteUrl
      ? resolvedCanonical.startsWith("http")
        ? resolvedCanonical
        : config.siteUrl + resolvedCanonical
      : resolvedCanonical;

  const ogType = schema?.type === "Article" ? "article" : "website";

  // Validate SEO props
  validateSeo(
    {
      title: resolvedTitle,
      description: resolvedDescription,
      canonical: fullUrl,
    },
    strict
  );

  return (
    <>
      {resolvedTitle && <title>{resolvedTitle}</title>}

      {resolvedDescription && (
        <meta name="description" content={resolvedDescription} />
      )}

      {fullUrl && <link rel="canonical" href={fullUrl} />}

      <meta name="robots" content={robots} />

      {/* ---------- Open Graph ---------- */}
      {resolvedTitle && <meta property="og:title" content={resolvedTitle} />}
      {resolvedDescription && (
        <meta property="og:description" content={resolvedDescription} />
      )}
      {fullUrl && <meta property="og:url" content={fullUrl} />}
      {config.siteName && (
        <meta property="og:site_name" content={config.siteName} />
      )}
      <meta property="og:type" content={ogType} />

      {/* ---------- Twitter ---------- */}
      <meta name="twitter:card" content="summary_large_image" />
      {config.twitterHandle && (
        <meta name="twitter:site" content={config.twitterHandle} />
      )}
      {resolvedTitle && <meta name="twitter:title" content={resolvedTitle} />}
      {resolvedDescription && (
        <meta name="twitter:description" content={resolvedDescription} />
      )}

      {/* ---------- Structured Data ---------- */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(schema)),
          }}
        />
      )}
    </>
  );
};

/* ================================
   Helpers
================================ */

function buildJsonLd(schema: any) {
  switch (schema.type) {
    case "WebSite":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: schema.name,
        url: schema.url,
      };

    case "Article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: schema.headline,
        datePublished: schema.datePublished,
        author: {
          "@type": "Person",
          name: schema.author,
        },
      };

    case "Breadcrumb":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: schema.items.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

    default:
      return null;
  }
}
