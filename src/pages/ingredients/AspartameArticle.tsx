
import React from 'react';
import IngredientArticleLayout from '@/components/ingredients/IngredientArticleLayout';

const AspartameArticle: React.FC = () => {
  return (
    <IngredientArticleLayout
      slug="aspartame"
      title="Aspartame in Diet Drinks: Safe or Risky?"
      metaDescription="Examine the science behind aspartame, one of the most studied and controversial artificial sweeteners used in diet sodas and low-calorie products."
      keywords="aspartame, artificial sweeteners, diet soda, sugar-free, sweeteners, diet drinks, health effects"
      datePublished="2024-05-17"
      dateModified="2024-05-17"
      heroImage="https://images.unsplash.com/photo-1500673922987-e212871fec22"
      heroImageAlt="Diet soda cans and bottles containing aspartame sweetener"
      introduction={
        <>
          <p>
            Aspartame is one of the most widely used artificial sweeteners in the world, found in thousands 
            of sugar-free products including diet sodas, yogurts, chewing gum, and even medications. 
            Since its approval by the FDA in 1981, it has also been one of the most controversial food additives, 
            with ongoing debates about its safety.
          </p>
          <p>
            This article examines the facts about aspartame: what it is, how it's metabolized in the body, 
            the scientific evidence regarding safety concerns, and what regulatory agencies worldwide say about it.
          </p>
        </>
      }
      sections={[
        {
          id: "what-is-aspartame",
          title: "What Is Aspartame?",
          content: (
            <p>Details about aspartame's chemical composition and properties coming soon...</p>
          )
        },
        {
          id: "health-concerns",
          title: "Health Concerns and Scientific Evidence",
          content: (
            <p>Analysis of research into aspartame's effects on health coming soon...</p>
          )
        },
        {
          id: "regulatory-status",
          title: "Regulatory Status Around the World",
          content: (
            <p>Information about how different countries regulate aspartame coming soon...</p>
          )
        },
        {
          id: "alternatives",
          title: "Alternatives to Aspartame",
          content: (
            <p>Overview of natural and artificial sweetener alternatives coming soon...</p>
          )
        }
      ]}
      conclusion={
        <p>Balanced conclusions about aspartame coming soon...</p>
      }
      sources={[
        {
          name: "FDA - Aspartame and Other Sweeteners in Food",
          url: "https://www.fda.gov/food"
        },
        {
          name: "EFSA - Aspartame",
          url: "https://www.efsa.europa.eu"
        }
      ]}
      relatedIngredients={[
        { name: "BHA (Butylated Hydroxyanisole)", slug: "bha-butylated-hydroxyanisole" },
        { name: "Red 40 Food Coloring", slug: "red-40-food-coloring" },
        { name: "Natural Flavors", slug: "natural-flavors" }
      ]}
    />
  );
};

export default AspartameArticle;
