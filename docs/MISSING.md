# 🚧 Missing Features Checklist

A prioritized list of missing features to implement one at a time.

---

## 🔴 HIGH PRIORITY (Must Have)

### 1. [x] Real Project Content ✅ COMPLETED
**Status:** ✅ Done (Dec 11, 2024)  
**Time Estimate:** 30-60 min  
**Description:** ~~Replace placeholder "Lorem ipsum" text with real project descriptions, actual screenshots, and working links.~~

**Projects Added:**
- 🎬 **NeonFlix** - Netflix-inspired streaming platform
- 🐕 **Dog Lab** - AI dog breed identifier (99% accuracy, 120+ breeds)
- 🔐 **SecureShare** - Encrypted file sharing with auto-expiration
- 📦 **ReactBits Installer** - NPM CLI package
- 🎮 **NeetCode RPG** - PyPI gamified coding tool
- 📱 **Devotional App** - Flutter mobile app

**Files Updated:**
- `lib/data.tsx` - Updated projects array with real content

> ⚠️ **Note:** You need to add project screenshots to `/public/assets/work/`:
> - `neonflix.png`, `doglab.png`, `secureshare.png`, `reactbits.png`, `neetcode.png`, `devotional.png`

---

### 2. [x] Interactive Terminal Component ✅ COMPLETED
**Status:** ✅ Done (Dec 11, 2024)  
**Time Estimate:** 2-3 hours  
**Description:** ~~Add a functional terminal component that accepts commands like Keshav's portfolio.~~

**Commands Implemented:**
| Command | Output |
|---------|--------|
| `help` | List available commands |
| `about` | About me info |
| `skills` | Display tech stack |
| `contact` | Show contact info |
| `neofetch` | System info (dev style) |
| `projects` | List projects |
| `clear` | Clear terminal |
| `social` | Social media links |
| `kitty` | ASCII cat art |

**Files Created:**
- `components/Terminal.tsx` - Interactive terminal with tilt effect

**Files Updated:**
- `components/sections/Hero.tsx` - Replaced Photo with Terminal

> **Note:** `Photo.tsx` preserved for Dedicated About Section

---

### 3. [ ] GitHub Contribution Calendar
**Status:** ❌ Not Started  
**Time Estimate:** 30 min  
**Description:** Add GitHub contribution graph to show coding activity.

**Package:** `react-github-calendar`

**Implementation:**
```bash
pnpm add react-github-calendar
```

**Component Location:** 
- Add to About section or create new `components/GitHubCalendar.tsx`

**Reference:** `testing/me-main/src/components/ui/Git.jsx`

---

### 4. [x] Oneko Cat (Mouse Following) ✅ COMPLETED
**Status:** ✅ Done (Dec 11, 2024)  
**Time Estimate:** 1 hour  
**Description:** ~~Add the cute cat that follows the mouse cursor around the screen.~~

**Features Implemented:**
- Cat sprite that follows cursor with smooth animation
- Idle animations (sleeping, scratching)
- Wall interaction animations
- Respects `prefers-reduced-motion` accessibility setting

**Files Created:**
- `components/Oneko.tsx` - Main component

**Files Updated:**
- `app/layout.tsx` - Added global Oneko component

---

### 5. [ ] Dedicated About Section
**Status:** ❌ Not Started  
**Time Estimate:** 1-2 hours  
**Description:** Create a proper About section with personal quote, personality, and more details.

**Content to Add:**
- Personal philosophy/quote
- OS/Editor/Theme (developer identity)
- Current learning focus
- More personality traits

**Reference:** `testing/me-main/src/pages/About.jsx`

---

## 🟠 MEDIUM PRIORITY (Should Have)

### 6. [ ] Discord Live Status
**Status:** ❌ Not Started  
**Time Estimate:** 1-2 hours  
**Description:** Show real-time Discord presence using Lanyard API.

**API:** `https://api.lanyard.rest/v1/users/YOUR_DISCORD_ID`

**Setup Required:**
1. Join Lanyard Discord server
2. Get your Discord user ID
3. Create status component

**New Files:**
- `components/DiscordStatus.tsx`

**Reference:** `testing/me-main/src/components/Activity.jsx`

---

### 7. [ ] Now Playing (Spotify/Last.fm)
**Status:** ❌ Not Started  
**Time Estimate:** 1-2 hours  
**Description:** Show currently playing music via Last.fm API.

**Setup Required:**
1. Create Last.fm account
2. Get API key
3. Connect Spotify to Last.fm

**New Files:**
- `components/NowPlaying.tsx`

**Reference:** `testing/me-main/src/components/NowPlaying.jsx`

---

### 8. [ ] Latest GitHub Commit Widget
**Status:** ❌ Not Started  
**Time Estimate:** 30-45 min  
**Description:** Display your latest GitHub commit.

**API:** `https://api.github.com/users/addynoven/events`

**New Files:**
- `components/LatestCommit.tsx`

---

### 9. [ ] Activity Dashboard (Bento Grid)
**Status:** ❌ Not Started  
**Time Estimate:** 2-3 hours  
**Description:** Create a bento-style grid showing:
- Discord status
- Now playing
- Local time (IST)
- Current activity
- Latest commit
- Oneko toggle

**Reference:** `testing/me-main/src/components/Activity.jsx`

---

### 10. [ ] NPX Identity Package
**Status:** ❌ Not Started  
**Time Estimate:** 1 hour  
**Description:** Create `npx who-aditya` or `npx neonstain` package.

**Creates a CLI business card when run.**

---

## 🟢 LOW PRIORITY (Nice to Have)

### 11. [ ] ASCII Art Easter Eggs
**Status:** ❌ Not Started  
**Description:** Add fun ASCII art in terminal (like kitty command).

---

### 12. [ ] Project Status Badges
**Status:** ❌ Not Started  
**Description:** Add "In Progress", "Completed", "Live" badges to projects.

---

### 13. [ ] PWA Manifest
**Status:** ❌ Not Started  
**Description:** Make the portfolio installable as a PWA.

---

### 14. [ ] Structured Data (JSON-LD)
**Status:** ❌ Not Started  
**Description:** Add Person schema for better SEO.

---

## 📋 Implementation Order

We'll fix these one at a time in this order:

| # | Feature | Priority | Est. Time |
|---|---------|----------|-----------|
| 1 | Real Project Content | 🔴 HIGH | 30-60 min |
| 2 | Oneko Cat (Mouse Following) | 🔴 HIGH | 1 hour |
| 3 | Interactive Terminal | 🔴 HIGH | 2-3 hours |
| 4 | GitHub Contribution Calendar | 🔴 HIGH | 30 min |
| 5 | Dedicated About Section | 🔴 HIGH | 1-2 hours |
| 6 | Discord Live Status | 🟠 MEDIUM | 1-2 hours |
| 7 | Latest Commit Widget | 🟠 MEDIUM | 30-45 min |
| 8 | Now Playing | 🟠 MEDIUM | 1-2 hours |
| 9 | Activity Dashboard | 🟠 MEDIUM | 2-3 hours |
| 10 | NPX Package | 🟠 MEDIUM | 1 hour |

---

## ✅ Completed

*(Move items here as they're completed)*

| Feature | Date Completed | Notes |
|---------|---------------|-------|
| - | - | - |

---

## 📝 Notes

- Update this file as we complete each feature
- Mark items with `[x]` when done
- Add any blockers or issues encountered

---

*Last Updated: December 11, 2024*
