# 🪦 LinkGrave - Dead Link Checker

> **Where Dead Links Go to Rest** 💀

A spooky Halloween-themed web application that scans websites for broken links and haunts them with style! 

![LinkGrave](https://img.shields.io/badge/Halloween-Theme-orange?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge)
![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=for-the-badge)

## 🎃 Features

- **Spooky Interface**: Halloween-themed design with glitch effects, fog animations, and eerie color scheme
- **Link Crawling**: Scans websites and finds all links (internal and external)
- **Dead Link Detection**: Identifies broken links with HTTP status codes
- **Deep Scan Mode**: Recursively crawls internal pages for comprehensive checking
- **Real-time Progress**: Live progress bar and spooky status messages
- **Detailed Reports**: View dead and living links with full details
- **Export Functionality**: Download scan results as JSON
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🎨 Color Theme

The app uses a custom spooky color palette:
- **Orange**: `#FF6500` - Primary accent
- **Dark Blue**: `#1E3E62` - Secondary
- **Darker Blue**: `#0B192C` - Background
- **Black**: `#000000` - Deep shadows

## 🚀 Quick Start

### Local Development

1. **Clone or download this project**
   ```bash
   cd LinkGrave
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python
     python -m http.server 8000
     
     # Node.js
     npx serve
     ```

3. **Start haunting!**
   - Enter a website URL
   - Choose your scan options
   - Watch the spirits find dead links

### Deploy to Netlify

#### Option 1: Drag & Drop (Easiest)

1. Go to [Netlify](https://www.netlify.com/)
2. Sign in or create an account
3. Click "Add new site" → "Deploy manually"
4. Drag the entire `LinkGrave` folder into the upload area
5. Done! Your site is live 🎉

#### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd LinkGrave
netlify deploy --prod
```

#### Option 3: Git Deploy

1. Push this folder to GitHub
2. Go to Netlify → "Add new site" → "Import from Git"
3. Connect your repository
4. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy site"

## 📖 How to Use

1. **Enter URL**: Type or paste any website URL
2. **Configure Options**:
   - ✅ **Deep Haunt**: Scans multiple pages recursively
   - ✅ **Check external links**: Includes links to other domains
3. **Summon the Crawler**: Click the button and watch the magic happen
4. **View Results**: See all dead links with details:
   - HTTP status codes
   - Error messages
   - Where the link was found
5. **Export Report**: Download results as JSON for further analysis

## 🛠️ Technical Details

### Stack
- **Frontend**: Pure HTML, CSS, JavaScript (ES6+)
- **No frameworks**: Lightweight and fast
- **CORS Proxy**: Uses `allorigins.win` to bypass CORS restrictions
- **Deployment**: Static files ready for Netlify

### How It Works

1. **Link Extraction**: Fetches HTML content and parses all `<a>` tags
2. **URL Normalization**: Converts relative URLs to absolute URLs
3. **Link Checking**: Tests each link via HTTP requests
4. **Status Detection**: Identifies 404s, 500s, and connection failures
5. **Result Display**: Shows dead links with spooky animations

### Limitations

- **CORS**: Some websites may block requests (we respect their boundaries 👻)
- **Rate Limiting**: Large sites may take time to scan
- **JavaScript Links**: Dynamic content may not be fully crawled
- **Deep Scan**: Limited to 3 levels deep and 20 pages max for performance

## 🎭 Spooky Features

- **Glitch Effect**: Title has a cool glitch animation
- **Fog Animation**: Atmospheric fog drifts across the screen
- **Ghost Floating**: Animated ghost during scanning
- **Random Messages**: Different spooky messages each scan
- **Shake Animation**: Dead links shake when appearing
- **Dark Theme**: Easy on the eyes, hard on broken links

## 🏆 Hackathon Ready

Perfect for Hacktoberfest because it's:
- ✅ **Creative & Original**: Unique Halloween twist on a useful tool
- ✅ **Functional**: Actually works and solves a real problem
- ✅ **Polished**: Professional design and animations
- ✅ **Halloween-themed**: Spooky from head to toe
- ✅ **Demo-ready**: Deploy in seconds, impress judges immediately

## 📁 Project Structure

```
LinkGrave/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Core functionality
└── README.md           # This file
```

## 🎃 Credits

- **Built with**: Dark magic and JavaScript ✨
- **Fonts**: Google Fonts (Creepster, Roboto Mono)
- **Icons**: Emoji (💀🪦👻🕷️⚰️)

## 📝 License

Free to use for Hacktoberfest and beyond! Have fun and haunt responsibly 👻

---

**Made with 💀 for Hacktoberfest 2024**

*Remember: Every broken link is a lost soul waiting to be found...*
