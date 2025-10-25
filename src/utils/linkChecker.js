// Link checking utility with progress callback
export async function scanWebsite(url, options = {}, onProgress = null) {
  const { deepScan = false, checkExternal = true } = options;
  
  try {
    // Extract links with progress updates
    if (onProgress) onProgress({ stage: 'extracting', message: 'Crawling the website...', progress: 0 });
    
    const links = await extractLinks(url, deepScan, checkExternal, onProgress);
    
    if (onProgress) {
      onProgress({ 
        stage: 'checking', 
        message: 'Checking links for the dead...', 
        progress: 0,
        total: links.length 
      });
    }
    
    // Check links with progress updates
    const results = await checkLinks(links, onProgress);
    
    return {
      url,
      total: results.length,
      deadLinks: results.filter(r => r.isDead),
      healthyLinks: results.filter(r => !r.isDead),
      pagesScanned: new Set(results.map(r => r.foundOn)).size
    };
  } catch (error) {
    console.error('Scan error:', error);
    throw error;
  }
}

async function extractLinks(url, deepScan, checkExternal, onProgress = null) {
  const scannedPages = new Set();
  const allLinks = new Map(); // Use Map to track link details
  const pagesToScan = [url];
  const maxPages = deepScan ? 20 : 1; // Scan up to 20 pages if deep scan
  
  let pagesScanned = 0;
  
  while (pagesToScan.length > 0 && pagesScanned < maxPages) {
    const currentUrl = pagesToScan.shift();
    
    if (scannedPages.has(currentUrl)) continue;
    scannedPages.add(currentUrl);
    pagesScanned++;
    
    if (onProgress) {
      onProgress({
        stage: 'extracting',
        message: `Scanning page ${pagesScanned}/${maxPages}...`,
        progress: (pagesScanned / maxPages) * 100,
        currentPage: currentUrl
      });
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(currentUrl)}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      
      const data = await response.json();
      const html = data.contents;
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const baseUrl = new URL(url);
      const currentPageUrl = new URL(currentUrl);
      
      const anchors = doc.querySelectorAll('a[href]');
      
      anchors.forEach(anchor => {
        try {
          let href = anchor.getAttribute('href');
          
          if (!href || 
              href.startsWith('#') || 
              href.startsWith('javascript:') || 
              href.startsWith('mailto:') || 
              href.startsWith('tel:')) {
            return;
          }
          
          const absoluteUrl = new URL(href, currentUrl).href;
          const linkUrl = new URL(absoluteUrl);
          
          const isExternal = linkUrl.hostname !== baseUrl.hostname;
          
          if (!checkExternal && isExternal) return;
          
          if (!allLinks.has(absoluteUrl)) {
            allLinks.set(absoluteUrl, {
              url: absoluteUrl,
              foundOn: currentUrl,
              isExternal
            });
            
            // Add internal pages to scan queue
            if (!isExternal && deepScan && !scannedPages.has(absoluteUrl)) {
              // Only add HTML pages (skip images, PDFs, etc.)
              if (!absoluteUrl.match(/\.(jpg|jpeg|png|gif|pdf|zip|mp4|mp3|css|js)$/i)) {
                pagesToScan.push(absoluteUrl);
              }
            }
          }
        } catch (e) {
          // Invalid URL, skip
        }
      });
      
      // Small delay between page scans to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.warn(`Failed to scan ${currentUrl}:`, error.message);
      // Continue with other pages
    }
  }
  
  return Array.from(allLinks.values());
}

async function checkLinks(links, onProgress = null) {
  const results = [];
  const batchSize = 15; // Check 15 links at a time
  const total = links.length;
  
  for (let i = 0; i < links.length; i += batchSize) {
    const batch = links.slice(i, i + batchSize);
    
    const batchResults = await Promise.all(
      batch.map(async (link) => {
        const status = await checkLink(link.url);
        
        const result = {
          ...link,
          isDead: status.isDead,
          statusCode: status.statusCode,
          error: status.error
        };
        
        // Report progress for each link checked
        if (onProgress) {
          onProgress({
            stage: 'checking',
            message: status.isDead ? `💀 Dead link found!` : `✅ Link verified`,
            progress: ((i + batch.indexOf(link) + 1) / total) * 100,
            checked: i + batch.indexOf(link) + 1,
            total: total,
            currentLink: link.url,
            result: result
          });
        }
        
        return result;
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
      setTimeout(() => reject(new Error('Timeout')), 4000); // 4 second timeout
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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        
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
        statusCode: 408,
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
