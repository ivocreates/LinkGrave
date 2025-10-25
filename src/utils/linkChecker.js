// Link checking utility
export async function scanWebsite(url, options = {}) {
  const { deepScan = false, checkExternal = true } = options;
  
  try {
    const links = await extractLinks(url, deepScan, checkExternal);
    const results = await checkLinks(links);
    
    return {
      url,
      total: results.length,
      deadLinks: results.filter(r => r.isDead),
      healthyLinks: results.filter(r => !r.isDead)
    };
  } catch (error) {
    console.error('Scan error:', error);
    throw error;
  }
}

async function extractLinks(url, deepScan, checkExternal) {
  try {
    // Use CORS proxy to fetch the page
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    const html = data.contents;
    
    // Parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const baseUrl = new URL(url);
    const links = new Set();
    const linkDetails = [];
    
    // Extract all anchor tags
    const anchors = doc.querySelectorAll('a[href]');
    
    anchors.forEach(anchor => {
      try {
        let href = anchor.getAttribute('href');
        
        // Skip invalid hrefs
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('javascript:') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:')) {
          return;
        }
        
        // Convert to absolute URL
        const absoluteUrl = new URL(href, url).href;
        const linkUrl = new URL(absoluteUrl);
        
        // Check if external
        const isExternal = linkUrl.hostname !== baseUrl.hostname;
        
        // Filter based on options
        if (!checkExternal && isExternal) {
          return;
        }
        
        // Avoid duplicates
        if (!links.has(absoluteUrl)) {
          links.add(absoluteUrl);
          linkDetails.push({
            url: absoluteUrl,
            foundOn: url,
            isExternal
          });
        }
      } catch (e) {
        // Invalid URL, skip
      }
    });
    
    // Deep scan (limited to prevent overload)
    if (deepScan && linkDetails.length > 0) {
      const internalLinks = linkDetails.filter(link => !link.isExternal).slice(0, 5);
      
      for (const link of internalLinks) {
        try {
          const subLinks = await extractLinks(link.url, false, checkExternal);
          linkDetails.push(...subLinks.filter(sl => !links.has(sl.url)));
          subLinks.forEach(sl => links.add(sl.url));
        } catch (e) {
          // Continue on error
        }
      }
    }
    
    return linkDetails;
    
  } catch (error) {
    console.error('Error extracting links:', error);
    throw new Error('Failed to extract links from the website');
  }
}

async function checkLinks(links) {
  const results = [];
  const batchSize = 5;
  
  // Process in batches to avoid overwhelming the browser
  for (let i = 0; i < links.length; i += batchSize) {
    const batch = links.slice(i, i + batchSize);
    
    const batchResults = await Promise.all(
      batch.map(async (link) => {
        const status = await checkLink(link.url);
        return {
          ...link,
          isDead: status.isDead,
          statusCode: status.statusCode,
          error: status.error
        };
      })
    );
    
    results.push(...batchResults);
  }
  
  return results;
}

async function checkLink(url) {
  try {
    // Use CORS proxy to check the link
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
      { method: 'GET' }
    );
    
    const data = await response.json();
    
    // Check if the request was successful
    if (data.status && data.status.http_code) {
      const statusCode = data.status.http_code;
      
      if (statusCode >= 400) {
        return {
          isDead: true,
          statusCode,
          error: `HTTP ${statusCode}`
        };
      }
    }
    
    return {
      isDead: false,
      statusCode: 200
    };
    
  } catch (error) {
    // If we can't reach the link, mark as dead
    return {
      isDead: true,
      statusCode: null,
      error: 'Connection failed (CORS/Network)'
    };
  }
}
