export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://attanavaid.com';
  
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Atta Navaid",
    "jobTitle": "Full-stack Developer",
    "description": "Full-stack Developer, Designer, and Creator. Specializing in React, TypeScript, and Next.js. Building scalable, production-ready applications.",
    "url": baseUrl,
    "image": `${baseUrl}/logo512.png`,
    "email": "attanavaid@gmail.com",
    "sameAs": [
      "https://github.com/attanavaid",
      "https://linkedin.com/in/attanavaid",
      "https://www.youtube.com/@attanavaid"
    ],
    "knowsAbout": [
      "React",
      "TypeScript",
      "Next.js",
      "Full-stack Development",
      "Web Development",
      "Software Engineering"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Atta Navaid Portfolio",
    "url": baseUrl,
    "author": {
      "@type": "Person",
      "name": "Atta Navaid"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

