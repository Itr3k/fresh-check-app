
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import IngredientCard from '@/components/ingredients/IngredientCard';
import AdUnit from '@/components/AdUnit';
import { ingredientArticles } from '@/data/ingredientData';

const IngredientsPage: React.FC = () => {
  // Create breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Food Ingredients', current: true }
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Food Ingredients Guide | FreshCheck</title>
        <meta name="description" content="Learn about common food ingredients, additives, preservatives, and their safety profiles. Get the facts on controversial food ingredients and find safer alternatives." />
        <meta name="keywords" content="food ingredients, food additives, preservatives, food coloring, artificial sweeteners, natural alternatives, food safety" />
        <link rel="canonical" href="https://freshcheck.app/ingredients" />
      </Helmet>

      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <BreadcrumbNav items={breadcrumbItems} className="mb-6" />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Food Ingredients Guide</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Learn about common food ingredients, additives, and their potential health impacts.
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <p>
              Many processed foods contain additives and preservatives that may have health implications. 
              Our food ingredients guide helps you understand what's in your food, potential concerns, 
              and healthier alternatives to look for.
            </p>
          </div>

          <AdUnit
            slotId="ingredients-top-ad"
            format="leaderboard"
            mobileFormat="large_mobile"
            lazyLoad={true}
            responsive={true}
          />

          {/* Food Additives Articles */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Food Additives & Preservatives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredientArticles
                .filter(article => article.category === 'preservative' || article.category === 'additive')
                .map(article => (
                  <IngredientCard
                    key={article.slug}
                    title={article.title}
                    slug={article.slug}
                    description={article.description}
                    category={article.category}
                    safetyLevel={article.safetyLevel}
                    dateUpdated={article.dateModified}
                    imageUrl={article.imageUrl}
                    imageAlt={article.imageAlt}
                  />
                ))}
            </div>
          </section>

          <AdUnit
            slotId="ingredients-middle-ad"
            format="rectangle"
            lazyLoad={true}
            responsive={true}
          />

          {/* Food Colors Articles */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Food Colors & Dyes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredientArticles
                .filter(article => article.category === 'color')
                .map(article => (
                  <IngredientCard
                    key={article.slug}
                    title={article.title}
                    slug={article.slug}
                    description={article.description}
                    category={article.category}
                    safetyLevel={article.safetyLevel}
                    dateUpdated={article.dateModified}
                    imageUrl={article.imageUrl}
                    imageAlt={article.imageAlt}
                  />
                ))}
            </div>
          </section>

          {/* Sweeteners Articles */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Sweeteners & Flavor Enhancers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredientArticles
                .filter(article => article.category === 'sweetener' || article.category === 'flavor')
                .map(article => (
                  <IngredientCard
                    key={article.slug}
                    title={article.title}
                    slug={article.slug}
                    description={article.description}
                    category={article.category}
                    safetyLevel={article.safetyLevel}
                    dateUpdated={article.dateModified}
                    imageUrl={article.imageUrl}
                    imageAlt={article.imageAlt}
                  />
                ))}
            </div>
          </section>

          <AdUnit
            slotId="ingredients-bottom-ad"
            format="leaderboard"
            mobileFormat="large_mobile"
            lazyLoad={true}
            responsive={true}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default IngredientsPage;
