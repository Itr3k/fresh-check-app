
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface IngredientCardProps {
  title: string;
  slug: string;
  description: string;
  category?: string;
  safetyLevel?: 'safe' | 'caution' | 'avoid';
  dateUpdated: string;
  imageUrl?: string;
  imageAlt?: string;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  title,
  slug,
  description,
  category,
  safetyLevel,
  dateUpdated,
  imageUrl,
  imageAlt,
}) => {
  // Safety level colors
  const safetyColors = {
    safe: "bg-green-100 text-green-800 hover:bg-green-200",
    caution: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    avoid: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
            loading="lazy"
            width={400}
            height={200}
          />
          {safetyLevel && (
            <div className="absolute top-2 right-2">
              <Badge className={safetyColors[safetyLevel]}>
                {safetyLevel === 'safe' ? 'Generally Safe' : 
                 safetyLevel === 'caution' ? 'Use with Caution' : 'Best to Avoid'}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <CardHeader className={imageUrl ? 'pt-4' : 'pt-6'}>
        {category && (
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            {category}
          </div>
        )}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(dateUpdated).toLocaleDateString()}
        </p>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <Link 
          to={`/ingredients/${slug}`}
          className="text-sm font-medium text-primary flex items-center hover:underline"
        >
          Read more <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default IngredientCard;
