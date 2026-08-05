import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'caseStudy';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  // Case study specific
  projectData?: {
    name: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    demoUrl?: string;
    dateCreated: string;
    author: string;
  };
}

const siteConfig = {
  name: 'Anurudh Singh Rajawat',
  title: 'Anurudh Singh Rajawat — Full-Stack Developer & UI/UX Designer',
  description:
    '3rd-year CSE student at Parul University. Building product-minded web, Android, and desktop apps. UI/UX taste meets engineering rigor across React, Node, Java, Kotlin, and Electron.',
  url: 'https://anurudh.dev',
  image: '/og-image.png',
  twitterHandle: '@anurudh_raj',
  githubHandle: 'Anurudrr',
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  noIndex = false,
  noFollow = false,
  projectData,
}) => {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageImage = image || siteConfig.image;
  const pageImageUrl = pageImage.startsWith('http') ? pageImage : `${siteConfig.url}${pageImage}`;
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const pageType = type;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type':
      pageType === 'article'
        ? 'BlogPosting'
        : pageType === 'caseStudy'
          ? 'SoftwareApplication'
          : 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    image: pageImage,
    description: pageDescription,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [
        `https://github.com/${siteConfig.githubHandle}`,
        `https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/`,
        `https://www.linkedin.com/in/anurudh-singh-251067307/`,
      ],
    },
    ...(pageType === 'article' && {
      headline: title,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      articleSection: section,
      keywords: tags?.join(', '),
      publisher: {
        '@type': 'Person',
        name: siteConfig.name,
      },
    }),
    ...(pageType === 'caseStudy' &&
      projectData && {
        '@type': 'SoftwareApplication',
        name: projectData.name,
        description: projectData.description,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        creator: {
          '@type': 'Person',
          name: projectData.author,
        },
        dateCreated: projectData.dateCreated,
        programmingLanguage: projectData.technologies,
        codeRepository: projectData.githubUrl,
        url: projectData.demoUrl,
      }),
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="theme-color" content="#141310" />

      {noIndex && <meta name="robots" content="noindex" />}
      {noFollow && <meta name="robots" content="nofollow" />}
      {!noIndex && !noFollow && <meta name="robots" content="index, follow" />}

      <link rel="canonical" href={pageUrl} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={siteConfig.name}
        href={`${siteConfig.url}/rss.xml`}
      />

      <meta property="og:type" content={pageType === 'caseStudy' ? 'article' : pageType} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteConfig.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImageUrl} />

      {pageType === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SEO;
