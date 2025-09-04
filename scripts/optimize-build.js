#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Post-build optimization script
function optimizeBuild() {
  const distPath = path.join(__dirname, '../dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('Build directory not found. Run npm run build first.');
    return;
  }

  console.log('🚀 Starting post-build optimizations...');

  // Add cache headers to index.html
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Add resource hints for better performance
    const resourceHints = `
    <!-- Additional Performance Optimizations -->
    <link rel="preconnect" href="https://vitals.vercel-analytics.com" crossorigin>
    <link rel="dns-prefetch" href="//vitals.vercel-analytics.com">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no">
    `;
    
    indexContent = indexContent.replace('</head>', `${resourceHints}</head>`);
    fs.writeFileSync(indexPath, indexContent);
    console.log('✅ Enhanced index.html with performance optimizations');
  }

  // Create .htaccess for Apache servers
  const htaccessContent = `
# Performance optimizations
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options nosniff
  Header always set X-Frame-Options DENY
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`;

  fs.writeFileSync(path.join(distPath, '.htaccess'), htaccessContent);
  console.log('✅ Created .htaccess for server optimizations');

  console.log('🎉 Build optimization complete!');
}

optimizeBuild();