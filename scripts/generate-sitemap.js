const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://heetviradiya.codes';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Import projects data (you might need to adjust this path)
const projectsPath = path.join(__dirname, '../src/data/projects.ts');

// Static pages configuration
const staticPages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: '/projects',
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/#about',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/#skills',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/#experience',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/#contact',
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    url: '/cv.pdf',
    changefreq: 'yearly',
    priority: '0.5'
  }
];

// Function to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Function to extract project IDs from projects.ts file
const getProjectIds = () => {
  try {
    const projectsContent = fs.readFileSync(projectsPath, 'utf8');
    const projectMatches = projectsContent.match(/id:\s*['"`]([^'"`]+)['"`]/g);
    
    if (projectMatches) {
      return projectMatches.map(match => {
        const id = match.match(/id:\s*['"`]([^'"`]+)['"`]/)[1];
        return id;
      });
    }
    
    return [];
  } catch (error) {
    console.warn('Could not read projects file:', error.message);
    return [];
  }
};

// Generate sitemap XML
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  const projectIds = getProjectIds();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `  
  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add project pages
  projectIds.forEach(projectId => {
    sitemap += `  
  <url>
    <loc>${DOMAIN}/projects/${projectId}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += `
  
</urlset>`;

  return sitemap;
};

// Write sitemap to file
const writeSitemap = () => {
  try {
    const sitemapContent = generateSitemap();
    fs.writeFileSync(OUTPUT_PATH, sitemapContent, 'utf8');
    console.log('✅ Sitemap generated successfully at:', OUTPUT_PATH);
    console.log('📊 Total URLs:', staticPages.length + getProjectIds().length);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
};

// Run the script
if (require.main === module) {
  writeSitemap();
}

module.exports = { generateSitemap, writeSitemap };