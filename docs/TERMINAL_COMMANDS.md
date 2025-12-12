# Terminal Commands Documentation

## Current Commands (23 total)

### ℹ️ Info Commands
| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Display info about Aditya Sahu |
| `neofetch` | System info in neofetch style |
| `skills` | List tech stack and skills |
| `projects` | Featured projects list |
| `contact` | Contact information |
| `social` | Social media links |
| `whoami` | Display current user |
| `date` | Show current date and time |

### 🎨 Customization
| Command | Description |
|---------|-------------|
| `color <hex>` | Change accent color (e.g., `color #ff6b6b`) |
| `reset` | Restore default accent color (#00ff99) |
| `theme` | Toggle light/dark mode |

### 🧭 Navigation
| Command | Description |
|---------|-------------|
| `goto <section>` | Scroll to section (home/work/contact) |
| `ls` | List available sections |
| `open <link>` | Open github/linkedin/twitter/email |

### ⚙️ System
| Command | Description |
|---------|-------------|
| `reload` | Reload the page |
| `exit` | Redirect to Google |
| `clear` | Clear terminal output |
| `loading` | Toggle loading screen (on/off) |

### 🎮 Fun / Easter Eggs
| Command | Description |
|---------|-------------|
| `kitty` | Display ASCII cat |
| `sudo` | Easter egg - "nice try" message |
| `matrix` | Matrix movie reference |
| `devtools` | DevTools detection easter egg |
| `tour` | Start guided tour with Oneko cat |

---

## Potential Commands to Add

### 📊 Stats & Info
- `github` - Fetch live GitHub stats
- `wakatime` - Show coding stats from WakaTime
- `uptime` - Show how long the site has been open
- `weather` - Display current weather (requires location)

### 🎨 Customization
- `font <name>` - Change terminal font
- `prompt <style>` - Change prompt style
- `particle <on/off>` - Toggle particle effects
- `animation <on/off>` - Toggle all animations

### 🎮 Games & Fun
- `snake` - Play snake game in terminal
- `2048` - Play 2048 in terminal
- `quiz` - Tech trivia quiz
- `fortune` - Random programming quotes
- `cowsay <text>` - ASCII cow with message
- `cmatrix` - Matrix rain animation
- `sl` - Steam locomotive animation

### 🧭 Navigation & Actions
- `download resume` - Download resume PDF
- `hire` - Jump to contact with pre-filled message
- `qr` - Generate QR code to current page
- `share` - Share portfolio to social media

### 🔧 Developer
- `inspect` - Show page performance metrics
- `debug` - Toggle debug mode
- `changelog` - Show recent updates
- `version` - Display site version

### 💬 Communication
- `discord` - Show Discord invite link
- `email <subject>` - Open email compose
- `feedback` - Submit anonymous feedback
- `report bug` - Report a bug

### 🎵 Media
- `play` - Play background music
- `pause` - Pause music
- `spotify` - Show current Spotify track

---

## Implementation Notes

To add a new command, edit `components/Terminal.tsx`:

1. Add command to `COMMANDS` array (for autocomplete)
2. Add handler in `handleCommand` function
3. Update help command output
4. Update this documentation

Example:
```tsx
// In COMMANDS array
const COMMANDS = [..., "newcommand"];

// In handleCommand function
if (command === "newcommand") {
  return [
    { type: "output", color: "green", text: "Output text" },
  ];
}
```
