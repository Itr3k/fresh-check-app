
import React from 'react';
import IngredientArticleLayout from '@/components/ingredients/IngredientArticleLayout';

const NaturalFlavorsArticle: React.FC = () => {
  return (
    <IngredientArticleLayout
      slug="natural-flavors"
      title="Natural Flavors: What the Label Doesn't Tell You"
      metaDescription="Discover what 'natural flavors' on food labels really means, how these ingredients are made, potential concerns, and why they aren't always as natural as they sound."
      keywords="natural flavors, food labels, food additives, food ingredients, flavor enhancers, food industry"
      datePublished="2024-05-17"
      dateModified="2024-05-17"
      heroImage="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
      heroImageAlt="Assortment of spices and flavor ingredients used in food production"
      introduction={
        <>
          <p>
            When you see "natural flavors" on a food label, it sounds reassuringly simple and wholesome. 
            However, this common ingredient — found in everything from sparkling water to breakfast cereal — 
            is more complex and potentially problematic than most consumers realize.
          </p>
          <p>
            This article will explore what natural flavors actually are, how they're created, the regulatory 
            definitions that govern them, potential health concerns, and how they compare to artificial flavors.
          </p>
        </>
      }
      sections={[
        {
          id: "what-are-natural-flavors",
          title: "What Are Natural Flavors?",
          content: (
            <p>Detailed section on what constitutes natural flavors coming soon...</p>
          )
        },
        {
          id: "regulations",
          title: "How Natural Flavors Are Regulated",
          content: (
            <p>Information about FDA and international regulations coming soon...</p>
          )
        },
        {
          id: "health-concerns",
          title: "Potential Health Concerns",
          content: (
            <p>Analysis of potential allergens and other health considerations coming soon...</p>
          )
        },
        {
          id: "comparison",
          title: "Natural vs. Artificial Flavors",
          content: (
            <p>Comparison between natural and artificial flavors coming soon...</p>
          )
        }
      ]}
      conclusion={
        <p>Comprehensive conclusion about natural flavors coming soon...</p>
      }
      sources={[
        {
          name: "FDA - Code of Federal Regulations Title 21",
          url: "https://www.fda.gov/food"
        },
        {
          name: "CSPI Chemical Cuisine",
          url: "https://www.cspinet.org/eating-healthy/chemical-cuisine"
        }
      ]}
      relatedIngredients={[
        { name: "BHA (Butylated Hydroxyanisole)", slug: "bha-butylated-hydroxyanisole" },
        { name: "Red 40 Food Coloring", slug: "red-40-food-coloring" },
        { name: "Aspartame", slug: "aspartame" }
      ]}
    />
  );
};

export default NaturalFlavorsArticle;
