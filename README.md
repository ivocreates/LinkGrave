# 🪦 LinkGrave - Dead Link Checker# 🪦 LinkGrave - Dead Link Checker



> **Where Dead Links Go to Rest** 💀> **Where Dead Links Go to Rest** 💀



A spooky Halloween-themed React web application that scans websites for broken links and haunts them with style! Complete with hidden Easter eggs, jump scares, and interactive animations.A spooky Halloween-themed web application that scans websites for broken links and haunts them with style! 



![LinkGrave](https://img.shields.io/badge/Halloween-Theme-orange?style=for-the-badge)![LinkGrave](https://img.shields.io/badge/Halloween-Theme-orange?style=for-the-badge)

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge)

![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=for-the-badge)

![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF0055?style=for-the-badge)

## 🎃 Features

## 🎃 What is LinkGrave?

- **Spooky Interface**: Halloween-themed design with glitch effects, fog animations, and eerie color scheme

LinkGrave is an interactive dead link checker that combines functionality with entertainment. It crawls websites to find broken links (404s, 500s, etc.) while providing a thrilling Halloween experience complete with:- **Link Crawling**: Scans websites and finds all links (internal and external)

- **Dead Link Detection**: Identifies broken links with HTTP status codes

- 🎭 Spooky animations and visual effects- **Deep Scan Mode**: Recursively crawls internal pages for comprehensive checking

- 👻 Floating ghosts and fog effects- **Real-time Progress**: Live progress bar and spooky status messages

- 💀 Random jump scares- **Detailed Reports**: View dead and living links with full details

- 🕷️ Hidden Easter eggs and secrets- **Export Functionality**: Download scan results as JSON

- 🎮 Konami code surprise- **Responsive Design**: Works perfectly on desktop and mobile devices

- 🖱️ Interactive cursor trail effects

## 🎨 Color Theme

## ✨ Features

The app uses a custom spooky color palette:

### Core Functionality- **Orange**: `#FF6500` - Primary accent

- **Link Crawling**: Scans websites and extracts all links (internal and external)- **Dark Blue**: `#1E3E62` - Secondary

- **Dead Link Detection**: Identifies broken links with HTTP status codes- **Darker Blue**: `#0B192C` - Background

- **Deep Scan Mode**: Recursively crawls multiple pages for comprehensive checking- **Black**: `#000000` - Deep shadows

- **Smart Filtering**: Option to include or exclude external links

- **Real-time Progress**: Live progress bar with spooky status messages## 🚀 Quick Start

- **Detailed Reports**: View dead and living links with full details

- **Export Functionality**: Download scan results as JSON### Local Development



### Spooky Features1. **Clone or download this project**

- **Glitch Effects**: Title with cyberpunk-style glitch animation   ```bash

- **Fog Layers**: Multiple animated fog layers drifting across screen   cd LinkGrave

- **Floating Entities**: Random ghosts, bats, and spiders floating up   ```

- **Jump Scares**: Random scary pop-ups during and after scanning

- **Blood Drips**: Animated blood drip from title2. **Open in browser**

- **Cursor Trail**: Spooky emojis follow your cursor   - Simply open `index.html` in your web browser

- **Pulsing Effects**: Glowing and pulsing text effects   - Or use a local server:

- **Smooth Animations**: Framer Motion powered transitions     ```bash

     # Python

### Hidden Surprises 🎁     python -m http.server 8000

- **Konami Code**: Enter ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️ B A to unlock a secret graveyard     

- **Spider Clicks**: Click the spider emoji in footer 6 times for a surprise     # Node.js

- **Title Click**: Click on the main title for Easter egg counter     npx serve

- **Random Events**: Unexpected jump scares at random intervals     ```



## 🎨 Color Theme3. **Start haunting!**

   - Enter a website URL

Custom Halloween-inspired color palette:   - Choose your scan options

- **Burning Orange**: `#FF6500` - Primary accent, glowing effects   - Watch the spirits find dead links

- **Dark Blue**: `#1E3E62` - Secondary accent

- **Midnight Blue**: `#0B192C` - Background layers### Deploy to Netlify

- **Pure Black**: `#000000` - Deep shadows

#### Option 1: Drag & Drop (Easiest)

## 🛠️ Built With

1. Go to [Netlify](https://www.netlify.com/)

- **React 18.2** - UI library2. Sign in or create an account

- **Vite 5.0** - Build tool and dev server3. Click "Add new site" → "Deploy manually"

- **Framer Motion 10.16** - Animation library4. Drag the entire `LinkGrave` folder into the upload area

- **Vanilla CSS** - Custom styling with advanced animations5. Done! Your site is live 🎉

- **Google Fonts** - Creepster, Nosifer, Rubik fonts

#### Option 2: Netlify CLI

## 🚀 Getting Started

```bash

### Prerequisites# Install Netlify CLI

- Node.js 16+ installednpm install -g netlify-cli

- npm or yarn package manager

# Login to Netlify

### Installationnetlify login



1. **Clone the repository**# Deploy

   ```bashcd LinkGrave

   git clone https://github.com/ivocreates/LinkGrave.gitnetlify deploy --prod

   cd LinkGrave```

   ```

#### Option 3: Git Deploy

2. **Install dependencies**

   ```bash1. Push this folder to GitHub

   npm install2. Go to Netlify → "Add new site" → "Import from Git"

   ```3. Connect your repository

4. Deploy settings:

3. **Start development server**   - Build command: (leave empty)

   ```bash   - Publish directory: `/`

   npm run dev5. Click "Deploy site"

   ```

## 📖 How to Use

4. **Open in browser**

   - Navigate to `http://localhost:5173`1. **Enter URL**: Type or paste any website URL

   - Start haunting websites!2. **Configure Options**:

   - ✅ **Deep Haunt**: Scans multiple pages recursively

### Building for Production   - ✅ **Check external links**: Includes links to other domains

3. **Summon the Crawler**: Click the button and watch the magic happen

```bash4. **View Results**: See all dead links with details:

# Create optimized production build   - HTTP status codes

npm run build   - Error messages

   - Where the link was found

# Preview production build locally5. **Export Report**: Download results as JSON for further analysis

npm run preview

```## 🛠️ Technical Details



The build output will be in the `dist` folder, ready for deployment.### Stack

- **Frontend**: Pure HTML, CSS, JavaScript (ES6+)

## 📖 How to Use- **No frameworks**: Lightweight and fast

- **CORS Proxy**: Uses `allorigins.win` to bypass CORS restrictions

1. **Enter URL**: Type or paste any website URL (e.g., `example.com` or `https://example.com`)- **Deployment**: Static files ready for Netlify

2. **Configure Options**:

   - 🕳️ **Deep Haunt**: Scans multiple pages recursively (up to 5 pages)### How It Works

   - 🌐 **Check external links**: Includes links to other domains

3. **Summon the Crawler**: Click the button and watch the spooky animation1. **Link Extraction**: Fetches HTML content and parses all `<a>` tags

4. **View Results**:2. **URL Normalization**: Converts relative URLs to absolute URLs

   - Summary cards showing alive/dead/total links3. **Link Checking**: Tests each link via HTTP requests

   - Detailed list of dead links with status codes4. **Status Detection**: Identifies 404s, 500s, and connection failures

   - Click on dead links to see more details5. **Result Display**: Shows dead links with spooky animations

   - Toggle to view all living links

5. **Export Report**: Download complete scan results as JSON### Limitations

6. **New Scan**: Click "New Scan" to haunt another website

- **CORS**: Some websites may block requests (we respect their boundaries 👻)

### Easter Eggs Guide- **Rate Limiting**: Large sites may take time to scan

- **JavaScript Links**: Dynamic content may not be fully crawled

- **Konami Code**: Use arrow keys to enter: ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️ then press B and A keys- **Deep Scan**: Limited to 3 levels deep and 20 pages max for performance

- **Spider Secret**: Click the 🕷️ emoji in the footer 6 times

- **Title Mystery**: Click the main "LinkGrave" title## 🎭 Spooky Features

- **Jump Scares**: Just wait... they'll find you 👻

- **Glitch Effect**: Title has a cool glitch animation

## 🧪 How It Works- **Fog Animation**: Atmospheric fog drifts across the screen

- **Ghost Floating**: Animated ghost during scanning

### Architecture- **Random Messages**: Different spooky messages each scan

- **Shake Animation**: Dead links shake when appearing

```- **Dark Theme**: Easy on the eyes, hard on broken links

LinkGrave/

├── src/## 🏆 Hackathon Ready

│   ├── components/         # React components

│   │   ├── Header.jsx     # Main title with glitch effectPerfect for Hacktoberfest because it's:

│   │   ├── Scanner.jsx    # URL input and scanning UI- ✅ **Creative & Original**: Unique Halloween twist on a useful tool

│   │   ├── Results.jsx    # Results display and export- ✅ **Functional**: Actually works and solves a real problem

│   │   ├── FloatingGhosts.jsx    # Background floating entities- ✅ **Polished**: Professional design and animations

│   │   ├── JumpScare.jsx         # Random scare popup- ✅ **Halloween-themed**: Spooky from head to toe

│   │   ├── SecretGraveyard.jsx   # Konami code Easter egg- ✅ **Demo-ready**: Deploy in seconds, impress judges immediately

│   │   └── CursorTrail.jsx       # Mouse trail effect

│   ├── utils/## 📁 Project Structure

│   │   └── linkChecker.js # Link scanning logic

│   ├── App.jsx            # Main app component```

│   ├── App.css            # Global stylesLinkGrave/

│   ├── main.jsx           # React entry point├── index.html          # Main HTML file

│   └── index.css          # Base styles├── styles.css          # All styles and animations

├── index.html             # HTML entry point├── script.js           # Core functionality

├── vite.config.js         # Vite configuration└── README.md           # This file

└── package.json           # Dependencies```

```

## 🎃 Credits

### Link Checking Process

- **Built with**: Dark magic and JavaScript ✨

1. **Fetch Page**: Uses CORS proxy (allorigins.win) to fetch HTML- **Fonts**: Google Fonts (Creepster, Roboto Mono)

2. **Parse HTML**: DOMParser extracts all `<a>` tags- **Icons**: Emoji (💀🪦👻🕷️⚰️)

3. **Normalize URLs**: Converts relative URLs to absolute

4. **Filter Links**: Applies internal/external filtering## 📝 License

5. **Deep Scan**: Optionally crawls linked pages (limited to 5)

6. **Batch Check**: Tests links in batches of 5 to avoid overloadFree to use for Hacktoberfest and beyond! Have fun and haunt responsibly 👻

7. **Status Detection**: Identifies HTTP errors (404, 500, etc.)

8. **Display Results**: Shows dead and living links with animations---



### Technical Highlights**Made with 💀 for Hacktoberfest 2024**



- **Async/Await**: Modern promise handling for clean code*Remember: Every broken link is a lost soul waiting to be found...*

- **Batch Processing**: Prevents browser overload
- **Error Handling**: Graceful failures and user feedback
- **State Management**: React hooks (useState, useEffect, useRef)
- **Animation Library**: Framer Motion for smooth transitions
- **Responsive Design**: Mobile-friendly layout
- **Performance**: Optimized rendering and lazy loading

## 🔧 Configuration

### CORS Proxy
The app uses `allorigins.win` as a CORS proxy. If needed, you can change it in `src/utils/linkChecker.js`:

```javascript
const response = await fetch(
  `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
);
```

### Scan Limits
Adjust in `src/utils/linkChecker.js`:
- `batchSize`: Number of links checked simultaneously (default: 5)
- `deepScan` limit: Max internal pages to crawl (default: 5)

## ⚠️ Limitations

- **CORS**: Some websites block cross-origin requests (we respect boundaries 👻)
- **Rate Limiting**: Large sites take time to scan
- **Dynamic Content**: JavaScript-rendered links may not be detected
- **Deep Scan**: Limited to prevent infinite loops and overload
- **Proxy Dependency**: Relies on external CORS proxy service

## 🎭 Credits

- **Developer**: Built with React and dark magic ✨
- **Fonts**: Google Fonts (Creepster, Nosifer, Rubik)
- **Icons**: Unicode Emoji
- **Animations**: Framer Motion library
- **Inspiration**: Classic Halloween horror and retro gaming

## 📝 License

Free to use for personal and educational purposes. Have fun and haunt responsibly! 👻

## 🤝 Contributing

This is a hackathon project, but contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share your Easter egg ideas

---

**Made with 💀 for Hacktoberfest 2025**

*Remember: Every broken link is a lost soul waiting to be found...*

**Try the Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️ B A**
