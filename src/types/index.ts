/* ================================
   Global SEO Configuration
================================ */

export interface SeoConfig {
  siteName?: string;
  siteUrl?: string;
  titleTemplate?: string; // "%s | Brand"
  defaultTitle?: string;
  defaultDescription?: string;
  twitterHandle?: string;
}

/* ================================
   Structured Data (MVP)
================================ */

export type SeoSchema =
  | {
      type: "WebSite";
      name: string;
      url: string;
    }
  | {
      type: "Article";
      headline: string;
      datePublished: string;
      author: string;
    }
  | {
      type: "Breadcrumb";
      items: Array<{
        name: string;
        url: string;
      }>;
    };

/* ================================
   Seo Component Props
================================ */

export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;

  index?: boolean; // true = index, false = noindex
  follow?: boolean; // true = follow, false = nofollow

  schema?: SeoSchema;
  /* --- New (Batch 4) --- */
  ogType?: "website" | "article";

  /* --- New --- */
  strict?: boolean;
}
