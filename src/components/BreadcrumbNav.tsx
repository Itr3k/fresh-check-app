
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

  // Generate the JSON-LD schema for breadcrumbs with improved structure
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

      {/* Visual breadcrumb component with enhanced accessibility */}
      <nav aria-label="Breadcrumb navigation" className={className} itemScope itemType="https://schema.org/BreadcrumbList">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                  <meta itemProp="position" content={`${index + 1}`} />
                  
                  {item.current ? (
                    <BreadcrumbPage aria-current="page" itemProp="name">{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={item.href || '/'} itemProp="item">
                        <span itemProp="name">{item.label}</span>
                      </Link>
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
