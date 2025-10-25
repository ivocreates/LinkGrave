// LinkGrave - Dead Link Checker
// Global state
let isScanning = false;
let scannedLinks = new Set();
let deadLinks = [];
let healthyLinks = [];
let currentUrl = '';

// DOM Elements
const urlInput = document.getElementById('urlInput');
const scanBtn = document.getElementById('scanBtn');
const deepScanCheckbox = document.getElementById('deepScan');
const externalLinksCheckbox = document.getElementById('externalLinks');
const statusSection = document.getElementById('statusSection');
const resultsSection = document.getElementById('resultsSection');
const statusText = document.getElementById('statusText');
const progressFill = document.getElementById('progressFill');
const linksChecked = document.getElementById('linksChecked');
const aliveCount = document.getElementById('aliveCount');
const deadCount = document.getElementById('deadCount');
const totalCount = document.getElementById('totalCount');
const deadLinksContainer = document.getElementById('deadLinksContainer');
const healthyLinksContainer = document.getElementById('healthyLinksContainer');
const healthyLinksList = document.getElementById('healthyLinksList');
const toggleHealthyBtn = document.getElementById('toggleHealthyBtn');
const exportBtn = document.getElementById('exportBtn');

// Spooky messages
const spookyMessages = [
    "Awakening the spirits... 👻",
    "Crawling through the shadows... 🕷️",
    "Summoning the dead links... 💀",
    "Haunting your website... 🦇",
    "Digging through the graveyard... ⚰️",
    "Conjuring the broken souls... 🔮",
    "Searching the dark corners... 🌙",
    "Communicating with the void... 🕳️"
];

const deadMessages = [
    "This page... is no more. 💀",
    "Gone to the great beyond. ⚰️",
    "Resting in pieces. 🪦",
    "The spirits have claimed this one. 👻",
    "Lost in the void forever. 🕳️",
    "Deceased and departed. 💀",
    "Six feet under. ⚰️",
    "Eternally broken. 🦴"
];

// Event Listeners
scanBtn.addEventListener('click', startScan);
toggleHealthyBtn.addEventListener('click', toggleHealthyLinks);
exportBtn.addEventListener('click', exportReport);

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isScanning) {
        startScan();
    }
});

// Main scan function
async function startScan() {
    const url = urlInput.value.trim();
    
    if (!url) {
        showError("Enter a URL to haunt... 👻");
        return;
    }
    
    // Validate and normalize URL
    currentUrl = normalizeUrl(url);
    if (!currentUrl) {
        showError("Invalid URL! The spirits are confused... 🤔");
        return;
    }
    
    // Reset state
    isScanning = true;
    scannedLinks.clear();
    deadLinks = [];
    healthyLinks = [];
    
    // Update UI
    scanBtn.disabled = true;
    resultsSection.classList.add('hidden');
    statusSection.classList.remove('hidden');
    updateProgress(0);
    linksChecked.textContent = '0';
    
    try {
        statusText.textContent = "Awakening the spirits... 👻";
        
        // Get all links from the page
        const links = await extractLinks(currentUrl);
        
        if (links.length === 0) {
            showError("No links found... The page is empty as a tomb. 🪦");
            return;
        }
        
        // Scan links
        await scanLinks(links);
        
        // Show results
        displayResults();
        
    } catch (error) {
        console.error('Scan error:', error);
        showError("The spirits refused to cooperate... Try again. 👻");
    } finally {
        isScanning = false;
        scanBtn.disabled = false;
        statusSection.classList.add('hidden');
    }
}

// Normalize URL
function normalizeUrl(url) {
    try {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        const urlObj = new URL(url);
        return urlObj.href;
    } catch (e) {
        return null;
    }
}

// Extract links from a page
async function extractLinks(url) {
    try {
        statusText.textContent = "Summoning links from the page... 🕷️";
        
        // Fetch the HTML content
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        const html = data.contents;
        
        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract all links
        const anchorTags = doc.querySelectorAll('a[href]');
        const links = [];
        const baseUrl = new URL(url);
        
        anchorTags.forEach(anchor => {
            try {
                let href = anchor.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                    return;
                }
                
                // Convert relative URLs to absolute
                const absoluteUrl = new URL(href, url).href;
                const linkUrl = new URL(absoluteUrl);
                
                // Check if external link
                const isExternal = linkUrl.hostname !== baseUrl.hostname;
                
                // Filter based on settings
                if (!externalLinksCheckbox.checked && isExternal) {
                    return;
                }
                
                // Avoid duplicates
                if (!scannedLinks.has(absoluteUrl)) {
                    links.push({
                        url: absoluteUrl,
                        foundOn: url,
                        isExternal: isExternal
                    });
                    scannedLinks.add(absoluteUrl);
                }
            } catch (e) {
                // Invalid URL, skip
            }
        });
        
        // If deep scan is enabled, recursively scan internal pages
        if (deepScanCheckbox.checked) {
            const internalLinks = links.filter(link => !link.isExternal);
            const maxDepth = 3; // Limit depth to avoid infinite loops
            const maxPages = 20; // Limit total pages to scan
            
            if (internalLinks.length > 0 && internalLinks.length < maxPages) {
                for (const link of internalLinks.slice(0, 5)) { // Scan up to 5 internal pages
                    try {
                        const subLinks = await extractLinks(link.url);
                        links.push(...subLinks);
                    } catch (e) {
                        // Failed to scan sub-page
                    }
                }
            }
        }
        
        return links;
        
    } catch (error) {
        console.error('Error extracting links:', error);
        throw new Error('Failed to extract links from the page');
    }
}

// Scan all links
async function scanLinks(links) {
    const total = links.length;
    let checked = 0;
    
    statusText.textContent = "Checking each link for signs of life... 💀";
    
    // Process links in batches to avoid overwhelming the browser
    const batchSize = 5;
    for (let i = 0; i < links.length; i += batchSize) {
        const batch = links.slice(i, i + batchSize);
        
        await Promise.all(batch.map(async (link) => {
            const status = await checkLink(link.url);
            
            if (status.dead) {
                deadLinks.push({
                    url: link.url,
                    foundOn: link.foundOn,
                    statusCode: status.statusCode,
                    error: status.error,
                    isExternal: link.isExternal
                });
            } else {
                healthyLinks.push({
                    url: link.url,
                    statusCode: status.statusCode
                });
            }
            
            checked++;
            linksChecked.textContent = checked;
            updateProgress((checked / total) * 100);
            
            // Update spooky message periodically
            if (checked % 5 === 0) {
                const randomMessage = spookyMessages[Math.floor(Math.random() * spookyMessages.length)];
                statusText.textContent = randomMessage;
            }
        }));
    }
}

// Check individual link
async function checkLink(url) {
    try {
        // Use allorigins API to bypass CORS
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
            method: 'GET'
        });
        
        const data = await response.json();
        
        // Check if the request was successful
        if (data.status && data.status.http_code) {
            const statusCode = data.status.http_code;
            if (statusCode >= 400) {
                return {
                    dead: true,
                    statusCode: statusCode,
                    error: `HTTP ${statusCode}`
                };
            }
        }
        
        return {
            dead: false,
            statusCode: 200
        };
        
    } catch (error) {
        // If CORS or network error, mark as potentially dead
        return {
            dead: true,
            statusCode: null,
            error: 'Connection failed (CORS/Network)'
        };
    }
}

// Display results
function displayResults() {
    statusSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    // Update summary
    aliveCount.textContent = healthyLinks.length;
    deadCount.textContent = deadLinks.length;
    totalCount.textContent = healthyLinks.length + deadLinks.length;
    
    // Display dead links
    deadLinksContainer.innerHTML = '';
    
    if (deadLinks.length === 0) {
        deadLinksContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.7);">
                <div style="font-size: 3rem; margin-bottom: 20px;">✨</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 10px;">All Clear!</h3>
                <p>No dead links found. Your website is haunted by living links only! 👻</p>
            </div>
        `;
    } else {
        deadLinks.forEach((link, index) => {
            const deadMessage = deadMessages[Math.floor(Math.random() * deadMessages.length)];
            const linkElement = createDeadLinkElement(link, deadMessage, index);
            deadLinksContainer.appendChild(linkElement);
        });
    }
    
    // Display healthy links
    healthyLinksList.innerHTML = '';
    healthyLinks.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'healthy-link-item';
        linkElement.textContent = `✅ ${link.url}`;
        healthyLinksList.appendChild(linkElement);
    });
    
    // Show/hide healthy links section
    if (healthyLinks.length > 0) {
        healthyLinksContainer.classList.remove('hidden');
    } else {
        healthyLinksContainer.classList.add('hidden');
    }
}

// Create dead link element
function createDeadLinkElement(link, message, index) {
    const div = document.createElement('div');
    div.className = 'dead-link-item';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <div class="dead-link-header">
            <span class="dead-icon">💀</span>
            <span class="dead-message">${message}</span>
        </div>
        <div class="dead-link-url">${link.url}</div>
        <div class="dead-link-details">
            <div class="detail-item">
                <span class="detail-label">Status:</span>
                <span>${link.statusCode || 'Unknown'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Type:</span>
                <span>${link.isExternal ? 'External' : 'Internal'}</span>
            </div>
            ${link.error ? `
                <div class="detail-item">
                    <span class="detail-label">Error:</span>
                    <span>${link.error}</span>
                </div>
            ` : ''}
        </div>
        <div class="found-on">
            Found on: <a href="${link.foundOn}" target="_blank">${link.foundOn}</a>
        </div>
    `;
    
    return div;
}

// Toggle healthy links visibility
function toggleHealthyLinks() {
    healthyLinksList.classList.toggle('hidden');
    const isVisible = !healthyLinksList.classList.contains('hidden');
    toggleHealthyBtn.innerHTML = `
        ${isVisible ? 'Hide' : 'Show'} Living Links <span>👁️</span>
    `;
}

// Export report
function exportReport() {
    const report = {
        website: currentUrl,
        scannedAt: new Date().toISOString(),
        summary: {
            total: healthyLinks.length + deadLinks.length,
            alive: healthyLinks.length,
            dead: deadLinks.length
        },
        deadLinks: deadLinks,
        healthyLinks: healthyLinks
    };
    
    // Convert to JSON
    const jsonStr = JSON.stringify(report, null, 2);
    
    // Create download link
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkgrave-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show feedback
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = '<span>Exported! 📋</span><span>✅</span>';
    setTimeout(() => {
        exportBtn.innerHTML = originalText;
    }, 2000);
}

// Update progress bar
function updateProgress(percentage) {
    progressFill.style.width = `${percentage}%`;
}

// Show error message
function showError(message) {
    statusSection.classList.remove('hidden');
    statusText.textContent = message;
    statusText.style.color = '#FF6500';
    
    setTimeout(() => {
        statusSection.classList.add('hidden');
        statusText.style.color = '';
    }, 3000);
}

// Add some spooky console messages
console.log('%c🪦 LinkGrave 🪦', 'font-size: 24px; font-weight: bold; color: #FF6500;');
console.log('%cWhere Dead Links Go to Rest', 'font-size: 14px; color: #1E3E62;');
console.log('%c💀 Built for Hacktoberfest 2024', 'font-size: 12px; color: #0B192C;');
