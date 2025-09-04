import { useEffect } from 'react';
import { generatePersonStructuredData, generateWebsiteStructuredData, generateProjectStructuredData } from '@/utils/seo';

interface StructuredDataProps {
  type: 'person' | 'website' | 'project';
  data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  useEffect(() => {
    let structuredData;
    const scriptId = `structured-data-${type}`;

    // Remove existing structured data of this type
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Generate structured data based on type
    switch (type) {
      case 'person':
        structuredData = generatePersonStructuredData();
        break;
      case 'website':
        structuredData = generateWebsiteStructuredData();
        break;
      case 'project':
        if (data) {
          structuredData = generateProjectStructuredData(data);
        }
        break;
      default:
        return;
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, [type, data]);

  return null;
};

export default StructuredData;