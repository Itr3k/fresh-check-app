
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft, FileDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import PdfExportButton from '@/components/PdfExportButton';
import AdUnit from '@/components/AdUnit';
import { cn } from '@/lib/utils';

export interface IngredientArticleProps {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription: string;
  introduction: React.ReactNode;
  sections: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  conclusion: React.ReactNode;
  sources: {
    name: string;
    url: string;
  }[];
  relatedIngredients?: {
    name: string;
    slug: string;
  }[];
  keywords?: string;
  datePublished: string;
  dateModified: string;
  heroImage?: string;
  heroImageAlt?: string;
  children?: React.ReactNode;
}

const IngredientArticleLayout: React.FC<IngredientArticleProps> = ({
  slug,
  title,
  metaTitle,
  metaDescription,
  introduction,
  sections,
  conclusion,
  sources,
  relatedIngredients,
  keywords = '',
  datePublished,
  dateModified,
  heroImage,
  heroImageAlt,
  children
}) => {
  // Format metadata
  const finalMetaTitle = metaTitle || `${title} | Food Ingredients Guide | FreshCheck`;
  
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Food Ingredients', href: '/ingredients' },
    { label: title, current: true }
  ];
  
  // Create schema.org structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': title,
    'description': metaDescription,
    'author': {
      '@type': 'Organization',
      'name': 'FreshCheck',
      'url': 'https://freshcheck.app'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'FreshCheck',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://freshcheck.app/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://freshcheck.app/ingredients/${slug}`
    },
    'datePublished': datePublished,
    'dateModified': dateModified,
    'image': heroImage ? heroImage : undefined
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{finalMetaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`food ingredients, ${keywords}`} />
        <link rel="canonical" href={`https://freshcheck.app/ingredients/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>
      
      <article className="container px-4 py-6 mx-auto max-w-4xl">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/ingredients" className="inline-block">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Back to Ingredients
              </Button>
            </Link>
            
            <PdfExportButton 
              contentId="ingredient-article-content" 
              fileName={`${slug}.pdf`}
            />
          </div>
          
          <BreadcrumbNav items={breadcrumbItems} className="mb-4" />
          
          <div>
            <div className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
              Food Ingredients
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Last updated: {new Date(dateModified).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          {heroImage && (
            <div className="mt-6 rounded-lg overflow-hidden">
              <img 
                src={heroImage} 
                alt={heroImageAlt || title} 
                className="w-full h-auto object-cover"
                loading="eager"
                fetchPriority="high"
                width={800} 
                height={400}
              />
            </div>
          )}
        </header>

        <div id="ingredient-article-content" className="article-content">
          {/* Introduction */}
          <div className="prose prose-slate max-w-none">
            {introduction}
          </div>
          
          {/* First Ad Unit after introduction */}
          <AdUnit
            slotId="ingredient-intro-ad"
            format="rectangle"
            lazyLoad={true}
            responsive={true}
            contentBefore={<div className="border-t border-b py-2 mt-8 mb-2 text-center text-xs text-muted-foreground">ADVERTISEMENT</div>}
            contentAfter={null}
          />
          
          {/* Article Sections */}
          {sections.map((section, index) => (
            <React.Fragment key={section.id}>
              <section className="mt-8" id={section.id}>
                <h2 className="text-2xl font-bold tracking-tight mb-4">{section.title}</h2>
                <div className="prose prose-slate max-w-none">
                  {section.content}
                </div>
              </section>
              
              {/* Insert middle ad after second section */}
              {index === 1 && (
                <AdUnit
                  slotId="ingredient-middle-ad"
                  format="rectangle"
                  lazyLoad={true}
                  responsive={true}
                  contentBefore={<div className="border-t border-b py-2 mt-8 mb-2 text-center text-xs text-muted-foreground">ADVERTISEMENT</div>}
                  contentAfter={null}
                />
              )}
            </React.Fragment>
          ))}
          
          {/* Conclusion with ad before it */}
          <AdUnit
            slotId="ingredient-conclusion-ad"
            format="rectangle"
            lazyLoad={true}
            responsive={true}
            contentBefore={<div className="border-t border-b py-2 mt-8 mb-2 text-center text-xs text-muted-foreground">ADVERTISEMENT</div>}
            contentAfter={null}
          />
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Conclusion</h2>
            <div className="prose prose-slate max-w-none">
              {conclusion}
            </div>
          </section>
          
          {/* Sources */}
          <section className="mt-8 pt-4 border-t">
            <h3 className="text-xl font-bold tracking-tight mb-4">Sources</h3>
            <div className="prose prose-slate max-w-none">
              <ul className="space-y-2">
                {sources.map((source, index) => (
                  <li key={index} className="flex items-start">
                    <ExternalLink className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          
          {/* Additional content */}
          {children}
        </div>

        {/* Related Ingredients */}
        {relatedIngredients && relatedIngredients.length > 0 && (
          <aside className="mt-12 pt-6 border-t">
            <h2 className="text-lg font-medium mb-4">Related Ingredients</h2>
            <nav aria-label="Related ingredient articles">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {relatedIngredients.map((ingredient) => (
                  <Link 
                    key={ingredient.slug} 
                    to={`/ingredients/${ingredient.slug}`} 
                    className="p-3 rounded-md border border-border hover:bg-muted/50 transition-colors flex items-center"
                  >
                    <span className="text-sm font-medium">{ingredient.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        )}
      </article>
    </PageTransition>
  );
};

export default IngredientArticleLayout;
