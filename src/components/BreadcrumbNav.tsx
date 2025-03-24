
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
  /**
   * The base URL to use for absolute URLs in the structured data
   * @default 'https://freshcheck.app'
   */
  baseUrl?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  items, 
  className,
  baseUrl = 'https://freshcheck.app' 
}) => {
  if (!items || items.length === 0) return null;

  // Generate the JSON-LD schema for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.href ? `${baseUrl}${item.href}` : undefined
    })).filter(item => item.item !== undefined)
  };

  return (
    <>
      {/* Structured data for breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Visual breadcrumb component */}
      <nav aria-label="Breadcrumb" className={className}>
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.current ? (
                    <BreadcrumbPage aria-current="page">{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={item.href || '/'}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                
                {index < items.length - 1 && (
                  <BreadcrumbSeparator aria-hidden="true">
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </>
  );
};

export default BreadcrumbNav;
