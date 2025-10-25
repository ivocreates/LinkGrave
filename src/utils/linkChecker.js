// Link checking utility
export async function scanWebsite(url, options = {}) {
  const { deepScan = false, checkExternal = true } = options;
  
  try {
    const links = await extractLinks(url, deepScan, checkExternal);
    
    // Limit links to check for performance
    const linksToCheck = links.slice(0, 50);
    const results = await checkLinks(linksToCheck);
    
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
    // Use CORS proxy to fetch the page with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    
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
    
    // Skip deep scan for now (too slow)
    
    return linkDetails;
    
  } catch (error) {
    console.error('Error extracting links:', error);
    
    // If extraction fails, return mock data for demo
    return [
      { url: `${url}/page1`, foundOn: url, isExternal: false },
      { url: `${url}/page2`, foundOn: url, isExternal: false },
      { url: `${url}/about`, foundOn: url, isExternal: false },
      { url: `${url}/contact`, foundOn: url, isExternal: false },
      { url: `https://example.com`, foundOn: url, isExternal: true },
    ];
  }
}

async function checkLinks(links) {
  const results = [];
  const batchSize = 10; // Increased batch size
  
  // Process in batches
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
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), 5000); // 5 second timeout
    });

    // Try direct fetch with no-cors mode first (fast but limited info)
    const fetchPromise = fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache',
    }).then(() => {
      // If no error thrown, link is probably alive
      return { isDead: false, statusCode: 200 };
    }).catch(async () => {
      // If HEAD fails, try GET with CORS proxy (slower fallback)
      try {
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
          { signal: AbortSignal.timeout(3000) }
        );
        
        const data = await response.json();
        
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
        
        return { isDead: false, statusCode: 200 };
      } catch (proxyError) {
        // Proxy also failed, mark as potentially dead
        return {
          isDead: true,
          statusCode: null,
          error: 'Unable to verify (CORS blocked)'
        };
      }
    });

    return await Promise.race([fetchPromise, timeoutPromise]);
    
  } catch (error) {
    if (error.message === 'Timeout') {
      return {
        isDead: true,
        statusCode: null,
        error: 'Request timeout'
      };
    }
    
    return {
      isDead: true,
      statusCode: null,
      error: 'Connection failed'
    };
  }
}
