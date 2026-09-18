import React, { useEffect } from 'react';
import alifCharacterImg from '../assets/images/alif_character_pure_transparent_1780383675414.png';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = React.memo(({
  title,
  description,
  keywords = "Alif, Alif Portfolio, Web Designer, Creative Developer, Frontend Developer, React Developer, Tailwind CSS Expert, UI/UX Designer, AstroJS",
  image = alifCharacterImg,
  url = window.location.href,
  type = "website"
}) => {
  useEffect(() => {
    // 1. Update webpage title
    document.title = title;

    // Helper to safely update or insert meta tags in <head>
    const setMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
      if (!contentValue) return;
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 2. Set primary search engine tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', 'Alif');
    setMetaTag('name', 'robots', 'index, follow');

    // 3. Open Graph social presentation protocol tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Alif Developer Portfolio');

    // 4. Twitter Cards integration
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 5. Inject Structured Schema.org markup (AstroJS signature item for Rich Snippet verification)
    let schemaScript = document.getElementById('seo-ld-json') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-ld-json';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    
    const structuredJSON = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Alif",
      "alternateName": "alifop2400",
      "description": description,
      "url": window.location.origin,
      "image": window.location.origin + image,
      "knowsAbout": [
        "Web Design",
        "Frontend Development",
        "AstroJS",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Interactive Animations",
        "Game Dashboard UI"
      ],
      "jobTitle": "Creative Frontend Developer and Designer",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance Web Creator"
      },
      "hasPortfolio": {
        "@type": "CreativeWorkPortfolio",
        "name": "Alif's Interactive Universe",
        "url": window.location.origin
      }
    };
    
    schemaScript.textContent = JSON.stringify(structuredJSON);

  }, [title, description, keywords, image, url, type]);

  return null;
});

SEO.displayName = 'SEO';
