components_md = """# Ahlusunna Components — Full Specifications

## How to Read This File

Each component has:
- **Purpose**: What it does and where it appears
- **Props**: Exact TypeScript interface with types, optionality, defaults
- **State**: All useState declarations with initial values
- **Dependencies**: Imports needed (React hooks, contexts, other components, libraries)
- **JSX Structure**: Exact DOM hierarchy with Tailwind classes
- **Behavior**: Event handlers, side effects, conditional rendering rules
- **Edge Cases**: Loading, error, empty, and boundary states

## Layout Components

### Navbar

**Purpose:** Fixed top navigation bar. Shows on all pages. Contains logo, navigation links, language toggle, and auth state.

**Props:** None (reads from contexts)

**Dependencies:**
- `useAuth` from `@/hooks/useAuth`
- `useLanguage` from `@/hooks/useLanguage`
- `Link` from `@tanstack/react-router`
- `Menu`, `X`, `Globe`, `User`, `LogOut`, `ChevronDown` from `lucide-react`

**State:**
```typescript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [userMenuOpen, setUserMenuOpen] = useState(false);
```

**JSX Structure:**

```tsx
<nav className="fixed top-0 left-0 right-0 h-14 lg:h-16 bg-[#1B4332] border-b border-[#C9A84C]/20 z-40">
  <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
    
    {/* Logo */}
    <Link to="/" className="flex items-center gap-2 text-[#FAF7F0]">
      {/* SVG Masjid silhouette, 32x32 */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        {/* Simple green dome + 2 minarets silhouette */}
        <path d="M16 4C12 8 8 12 8 18V28H24V18C24 12 20 8 16 4Z" fill="#C9A84C"/>
        <rect x="4" y="14" width="3" height="14" fill="#C9A84C"/>
        <rect x="25" y="14" width="3" height="14" fill="#C9A84C"/>
      </svg>
      <span className="text-lg font-bold tracking-tight">Ahlusunna</span>
    </Link>
    
    {/* Desktop Navigation */}
    <div className="hidden lg:flex items-center gap-6">
      <Link to="/subjects" className="text-sm text-[#FAF7F0]/80 hover:text-[#FAF7F0] transition-colors">
        Masomo
      </Link>
      <Link to="/about" className="text-sm text-[#FAF7F0]/80 hover:text-[#FAF7F0] transition-colors">
        Kuhusu
      </Link>
      <Link to="/contact" className="text-sm text-[#FAF7F0]/80 hover:text-[#FAF7F0] transition-colors">
        Wasiliana
      </Link>
    </div>
    
    {/* Right Section: Language + Auth */}
    <div className="flex items-center gap-3">
      
      {/* Language Toggle */}
      <div className="hidden sm:flex items-center bg-[#1B4332]/50 border border-[#C9A84C]/30">
        {['sw', 'ar', 'en'].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`px-2 py-1 text-xs font-medium transition-colors ${
              currentLang === lang
                ? 'bg-[#C9A84C] text-[#1C1C1C]'
                : 'text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
            }`}
          >
            {lang === 'sw' ? 'SW' : lang === 'ar' ? 'AR' : 'EN'}
          </button>
        ))}
      </div>
      
      {/* Auth State */}
      {isAuthenticated ? (
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 text-[#FAF7F0]"
          >
            <div className="w-8 h-8 bg-[#C9A84C] text-[#1C1C1C] flex items-center justify-center text-sm font-bold">
              {user.name.charAt(0)}
            </div>
            <ChevronDown size={16} />
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E5E0D8] shadow-elevated">
              <div className="py-1">
                {isAdmin && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-[#1C1C1C] hover:bg-[#FAF7F0]">
                    Msimamizi
                  </Link>
                )}
                <Link to="/progress" className="block px-4 py-2 text-sm text-[#1C1C1C] hover:bg-[#FAF7F0]">
                  Maendeleo
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-[#9B2335] hover:bg-[#FAF7F0]"
                >
                  Toka
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="hidden sm:flex items-center h-9 px-4 bg-[#C9A84C] text-[#1C1C1C] text-sm font-medium hover:bg-[#B8973A] transition-colors"
        >
          Ingia
        </Link>
      )}
      
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden text-[#FAF7F0]"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>
  
  {/* Mobile Menu Overlay */}
  {mobileMenuOpen && (
    <div className="fixed inset-0 top-14 bg-[#1B4332]/95 z-50 lg:hidden">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <Link to="/subjects" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-[#FAF7F0]">
          Masomo
        </Link>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-[#FAF7F0]">
          Kuhusu
        </Link>
        <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-[#FAF7F0]">
          Wasiliana
        </Link>
        {!isAuthenticated && (
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mt-4 h-12 px-8 bg-[#C9A84C] text-[#1C1C1C] text-lg font-medium flex items-center">
            Ingia
          </Link>
        )}
        {/* Mobile language toggle */}
        <div className="flex items-center mt-4 bg-[#1B4332]/50 border border-[#C9A84C]/30">
          {['sw', 'ar', 'en'].map((lang) => (
            <button
              key={lang}
              onClick={() => { changeLanguage(lang); }}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentLang === lang
                  ? 'bg-[#C9A84C] text-[#1C1C1C]'
                  : 'text-[#FAF7F0]/70'
              }`}
            >
              {lang === 'sw' ? 'Kiswahili' : lang === 'ar' ? 'العربية' : 'English'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}
</nav>
```

**Behavior:**
- Mobile menu closes when route changes
- User menu closes when clicking outside (useEffect with document click listener)
- Language toggle immediately switches i18n language and RTL mode
- Navbar height adds padding to body: `pt-14 lg:pt-16`

**Edge Cases:**
- Unauthenticated mobile: shows login CTA in menu
- Admin user: shows "Msimamizi" link in dropdown
- Arabic mode: logo text stays left, nav items reverse order, language toggle stays right

---

### Footer

**Purpose:** Site footer on all pages. Mission statement, links, copyright.

**Props:** None

**Dependencies:** `Link` from `@tanstack/react-router`

**JSX Structure:**

```tsx
<footer className="bg-[#1B4332] text-[#FAF7F0]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Column 1: Brand */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C12 8 8 12 8 18V28H24V18C24 12 20 8 16 4Z" fill="#C9A84C"/>
            <rect x="4" y="14" width="3" height="14" fill="#C9A84C"/>
            <rect x="25" y="14" width="3" height="14" fill="#C9A84C"/>
          </svg>
          <span className="text-lg font-bold">Ahlusunna</span>
        </div>
        <p className="text-sm text-[#FAF7F0]/70 leading-relaxed">
          Jifunze Uislamu kwa mpangilio na kwa lugha unayoielewa. Mafunzo ya Qur'an, Hadith, Fiqhi, Tawhidi, na Sira.
        </p>
      </div>
      
      {/* Column 2: Links */}
      <div>
        <h3 className="text-sm font-semibold mb-4 text-[#C9A84C]">Masomo</h3>
        <ul className="space-y-2">
          <li><Link to="/subjects" className="text-sm text-[#FAF7F0]/70 hover:text-[#FAF7F0] transition-colors">Masomo Yote</Link></li>
          <li><Link to="/about" className="text-sm text-[#FAF7F0]/70 hover:text-[#FAF7F0] transition-colors">Kuhusu</Link></li>
          <li><Link to="/contact" className="text-sm text-[#FAF7F0]/70 hover:text-[#FAF7F0] transition-colors">Wasiliana</Link></li>
        </ul>
      </div>
      
      {/* Column 3: Contact */}
      <div>
        <h3 className="text-sm font-semibold mb-4 text-[#C9A84C]">Wasiliana</h3>
        <p className="text-sm text-[#FAF7F0]/70">info@ahlusunna.info</p>
        <p className="text-sm text-[#FAF7F0]/70 mt-1">Zanzibar, Tanzania</p>
      </div>
    </div>
    
    {/* Bottom bar */}
    <div className="mt-12 pt-6 border-t border-[#FAF7F0]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-xs text-[#FAF7F0]/50">
        © 2024 Ahlusunna. Haki zote zimehifadhiwa.
      </p>
      <div className="flex items-center gap-4">
        <span className="text-xs text-[#FAF7F0]/50">Tafuta:</span>
        {/* Social icons placeholder */}
      </div>
    </div>
  </div>
</footer>
```

---

### MasjidPattern

**Purpose:** Decorative SVG background pattern. Used on hero, admin headers, empty states.

**Props:**
```typescript
interface MasjidPatternProps {
  opacity?: number; // default: 0.05
  color?: string;   // default: '#C9A84C'
  className?: string;
}
```

**JSX Structure:**

```tsx
<svg
  className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
  style={{ opacity }}
>
  <defs>
    <pattern id="geometric-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      {/* 8-point star simplified */}
      <path
        d="M20 0L23 17L40 20L23 23L20 40L17 23L0 20L17 17Z"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
      />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
</svg>
```

**Usage:**
```tsx
<section className="relative bg-[#1B4332] overflow-hidden">
  <MasjidPattern opacity={0.05} />
  <div className="relative z-10">{/* content */}</div>
</section>
```

---

## Home Page Components

### HeroSection

**Purpose:** Home page hero. Full-width, 60vh min height. Platform introduction with CTA.

**Props:** None

**Dependencies:** `Link` from `@tanstack/react-router`, `MasjidPattern`

**JSX Structure:**

```tsx
<section className="relative min-h-[60vh] max-h-[80vh] bg-[#1B4332] flex items-center justify-center overflow-hidden">
  <MasjidPattern opacity={0.08} color="#C9A84C" />
  
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
    <h1 className="text-[32px] lg:text-[48px] font-bold text-[#FAF7F0] leading-[1.2] tracking-tight mb-6">
      Jifunze Uislamu kwa Mpangilio
    </h1>
    <p className="text-base lg:text-lg text-[#FAF7F0]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
      Ahlusunwa ni jukwaa la kujifunza dini ya Kisilamu kwa hatua. Anza na mafunzo ya awali ya Qur'an, Hadith, Fiqhi, Tawhidi, na Sira.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        to="/subjects"
        className="h-12 px-8 bg-[#C9A84C] text-[#1C1C1C] text-base font-medium hover:bg-[#B8973A] transition-colors flex items-center justify-center"
      >
        Anza Sasa
      </Link>
      <Link
        to="/about"
        className="h-12 px-8 border-2 border-[#FAF7F0] text-[#FAF7F0] text-base font-medium hover:bg-[#FAF7F0]/10 transition-colors flex items-center justify-center"
      >
        Soma Zaidi
      </Link>
    </div>
  </div>
</section>
```

---

### LevelCard

**Purpose:** Displays a learning level on home page. Shows lock overlay for locked levels.

**Props:**
```typescript
interface LevelCardProps {
  level: {
    id: string;
    name: string;
    description: string;
    order: number;
    isPublic: boolean;
  };
  isLocked: boolean;
  onClick?: () => void;
}
```

**Dependencies:** `Lock` from `lucide-react`

**JSX Structure:**

```tsx
<div 
  onClick={!isLocked ? onClick : undefined}
  className={`relative bg-white border p-6 transition-all duration-200 ${
    isLocked 
      ? 'border-[#E5E0D8] cursor-default' 
      : 'border-l-4 border-l-[#C9A84C] border-[#E5E0D8] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:border-[#C9A84C]'
  }`}
>
  {/* Level number badge */}
  <div className={`w-10 h-10 flex items-center justify-center text-sm font-bold mb-4 ${
    isLocked 
      ? 'bg-[#1B4332]/10 text-[#6B7280]' 
      : 'bg-[#1B4332] text-[#FAF7F0]'
  }`}>
    {level.order}
  </div>
  
  <h3 className="text-[20px] lg:text-[22px] font-semibold text-[#1C1C1C] mb-2">
    {level.name}
  </h3>
  <p className="text-sm text-[#6B7280] leading-relaxed">
    {level.description}
  </p>
  
  {/* Lock overlay */}
  {isLocked && (
    <div className="absolute inset-0 bg-[#1B4332]/80 flex flex-col items-center justify-center">
      <Lock size={32} className="text-[#C9A84C] mb-3" />
      <p className="text-sm text-[#FAF7F0] mb-3">Ingia kujiunga</p>
      <Link
        to="/login"
        className="h-9 px-4 bg-[#C9A84C] text-[#1C1C1C] text-sm font-medium hover:bg-[#B8973A] transition-colors flex items-center"
      >
        Ingia
      </Link>
    </div>
  )}
</div>
```

**Behavior:**
- Locked: no click handler, overlay visible
- Unlocked: click navigates to level's subject list
- Hover only on unlocked cards

---

## Subject & Lesson Components

### SubjectCard

**Purpose:** Displays a subject in grid. Large icon, title, description, lesson count.

**Props:**
```typescript
interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: React.ReactNode;
    lessonCount: number;
  };
  progress?: number; // 0-100
  onClick: () => void;
}
```

**JSX Structure:**

```tsx
<div
  onClick={onClick}
  className="bg-white border border-[#E5E0D8] p-6 min-h-[200px] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:border-[#C9A84C] transition-all duration-200 flex flex-col"
>
  <div className="text-[#C9A84C] mb-4 transition-transform duration-200 group-hover:scale-110">
    {subject.icon}
  </div>
  
  <h3 className="text-[20px] lg:text-[22px] font-semibold text-[#1C1C1C] mb-2">
    {subject.name}
  </h3>
  
  <p className="text-sm text-[#6B7280] leading-relaxed flex-1">
    {subject.description}
  </p>
  
  <div className="mt-4 flex items-center justify-between">
    <span className="text-xs text-[#6B7280] bg-[#FAF7F0] px-2 py-1">
      {subject.lessonCount} masomo
    </span>
    {progress !== undefined && progress > 0 && (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-[#E5E0D8]">
          <div 
            className="h-full bg-[#C9A84C]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-[#6B7280]">{progress}%</span>
      </div>
    )}
  </div>
</div>
```

**Subject Icons (Exact SVG):**

Qur'an (book-open):
```tsx
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
</svg>
```

Hadith (scroll):
```tsx
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v14a2 2 0 0 0 2 2z"/>
</svg>
```

Fiqhi (mosque):
```tsx
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  <path d="M18 21V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v13"/>
  <path d="M2 21h20"/>
  <path d="M5 21V7l7-4 7 4v14"/>
  <path d="M12 11v10"/>
</svg>
```

Tawhidi (8-point star):
```tsx
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z"/>
</svg>
```

Sira (person-standing):
```tsx
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  <circle cx="12" cy="5" r="2"/>
  <path d="M10 10h4"/>
  <path d="M10 22v-8l-2-4h8l-2 4v8"/>
</svg>
```

---

### LessonCard

**Purpose:** Displays a lesson in list/grid. Thumbnail, title, duration, content type indicators.

**Props:**
```typescript
interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    slug: string;
    duration: string;
    hasText: boolean;
    hasVideo: boolean;
    hasAudio: boolean;
    thumbnail?: string;
  };
  completed?: boolean;
  onClick: () => void;
}
```

**Dependencies:** `FileText`, `Play`, `Headphones`, `CheckCircle` from `lucide-react`

**JSX Structure:**

```tsx
<div
  onClick={onClick}
  className="bg-white border border-[#E5E0D8] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200"
>
  {/* Thumbnail */}
  <div className="aspect-video bg-[#1B4332]/10 relative">
    {lesson.thumbnail ? (
      <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-[#C9A84C]">
        <FileText size={32} />
      </div>
    )}
    {completed && (
      <div className="absolute top-2 right-2 w-6 h-6 bg-[#2D6A4F] text-white flex items-center justify-center">
        <CheckCircle size={16} />
      </div>
    )}
  </div>
  
  <div className="p-4">
    <h3 className="text-base font-semibold text-[#1C1C1C] mb-2 line-clamp-2">
      {lesson.title}
    </h3>
    
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#6B7280]">{lesson.duration}</span>
      <div className="flex items-center gap-2">
        {lesson.hasText && <FileText size={14} className="text-[#6B7280]" />}
        {lesson.hasVideo && <Play size={14} className="text-[#6B7280]" />}
        {lesson.hasAudio && <Headphones size={14} className="text-[#6B7280]" />}
      </div>
    </div>
  </div>
</div>
```

---

### LockOverlay

**Purpose:** Semi-transparent overlay with lock icon and CTA for locked content.

**Props:**
```typescript
interface LockOverlayProps {
  message?: string; // default: "Ingia kujiunga"
  ctaText?: string; // default: "Ingia"
  ctaHref?: string; // default: "/login"
}
```

**Dependencies:** `Lock` from `lucide-react`, `Link` from `@tanstack/react-router`

**JSX Structure:**

```tsx
<div className="absolute inset-0 bg-[#1B4332]/80 flex flex-col items-center justify-center z-10">
  <Lock size={32} className="text-[#C9A84C] mb-3" />
  <p className="text-sm text-[#FAF7F0] mb-3">{message}</p>
  <Link
    to={ctaHref}
    className="h-9 px-4 bg-[#C9A84C] text-[#1C1C1C] text-sm font-medium hover:bg-[#B8973A] transition-colors flex items-center"
  >
    {ctaText}
  </Link>
</div>
```

---

## Lesson Page Components

### LessonHeader

**Purpose:** Lesson page header. Breadcrumb, title, subject/level badges, completion toggle.

**Props:**
```typescript
interface LessonHeaderProps {
  lesson: {
    title: string;
    slug: string;
    subjectId: string;
    levelId: string;
  };
  subjectName: string;
  completed: boolean;
  onToggleComplete: () => void;
}
```

**Dependencies:** `CheckCircle`, `Circle` from `lucide-react`, `Link` from `@tanstack/react-router`

**JSX Structure:**

```tsx
<div className="bg-[#1B4332] text-[#FAF7F0]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
    {/* Breadcrumb */}
    <nav className="flex items-center gap-2 text-sm text-[#FAF7F0]/70 mb-4">
      <Link to="/subjects" className="hover:text-[#FAF7F0] transition-colors">Masomo</Link>
      <span>/</span>
      <Link to={`/subjects?subject=${lesson.subjectId}`} className="hover:text-[#FAF7F0] transition-colors">{subjectName}</Link>
      <span>/</span>
      <span className="text-[#FAF7F0]">{lesson.title}</span>
    </nav>
    
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
      <div>
        <h1 className="text-[28px] lg:text-[36px] font-bold leading-[1.3] mb-4">
          {lesson.title}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#C9A84C] text-[#1C1C1C] px-2 py-1 font-medium">
            {subjectName}
          </span>
          <span className="text-xs bg-[#FAF7F0]/20 text-[#FAF7F0] px-2 py-1">
            {lesson.levelId === 'awali' ? 'Awali' : lesson.levelId === 'kati' ? 'Kati' : 'Endelea'}
          </span>
        </div>
      </div>
      
      <button
        onClick={onToggleComplete}
        className={`flex items-center gap-2 h-10 px-4 text-sm font-medium transition-colors ${
          completed
            ? 'bg-[#2D6A4F] text-white'
            : 'bg-[#FAF7F0]/10 text-[#FAF7F0] hover:bg-[#FAF7F0]/20'
        }`}
      >
        {completed ? <CheckCircle size={18} /> : <Circle size={18} />}
        {completed ? 'Imekamilika' : 'Weka kama imekamilika'}
      </button>
    </div>
  </div>
</div>
```

---

### ContentTabs

**Purpose:** Tab navigation for lesson content types: Written, Video, Audio.

**Props:**
```typescript
interface ContentTabsProps {
  activeTab: 'text' | 'video' | 'audio';
  onTabChange: (tab: 'text' | 'video' | 'audio') => void;
  hasText: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
}
```

**JSX Structure:**

```tsx
<div className="bg-white border-b border-[#E5E0D8]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex">
      {[
        { id: 'text' as const, label: 'Maandishi', available: hasText },
        { id: 'video' as const, label: 'Video', available: hasVideo },
        { id: 'audio' as const, label: 'Sauti', available: hasAudio },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => tab.available && onTabChange(tab.id)}
          disabled={!tab.available}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-b-2 border-[#C9A84C] text-[#1C1C1C]'
              : tab.available
              ? 'border-b-2 border-transparent text-[#6B7280] hover:text-[#1C1C1C]'
              : 'border-b-2 border-transparent text-[#6B7280]/50 cursor-not-allowed'
          }`}
        >
          {tab.label}
          {!tab.available && ' (Hakuna)'}
        </button>
      ))}
    </div>
  </div>
</div>
```

---

### WrittenContent

**Purpose:** Renders Tiptap JSON content. Handles RTL for Arabic, Quranic verse styling.

**Props:**
```typescript
interface WrittenContentProps {
  content: object; // Tiptap JSON
  language: 'sw' | 'ar' | 'en';
}
```

**Dependencies:** `@tiptap/react` `EditorContent`, `StarterKit`

**JSX Structure:**

```tsx
<div 
  className={`max-w-3xl mx-auto py-8 lg:py-12 ${
    language === 'ar' ? 'font-arabic text-right' : 'font-sans text-left'
  }`}
  dir={language === 'ar' ? 'rtl' : 'ltr'}
>
  <EditorContent 
    editor={editor} 
    className="prose prose-lg max-w-none"
  />
</div>
```

**Editor Configuration:**
```typescript
const editor = useEditor({
  extensions: [StarterKit],
  content: content,
  editable: false, // Read-only
});
```

**Content Styling (in index.css):**
```css
.ProseMirror h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1C1C1C;
  margin-top: 32px;
  margin-bottom: 16px;
}
.ProseMirror h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1C1C1C;
  margin-top: 24px;
  margin-bottom: 12px;
}
.ProseMirror p {
  font-size: 16px;
  line-height: 1.6;
  color: #1C1C1C;
  margin-bottom: 16px;
}
.ProseMirror blockquote {
  border-left: 4px solid #C9A84C;
  padding-left: 16px;
  margin: 24px 0;
  font-family: 'Amiri', serif;
  font-style: italic;
  font-size: 18px;
  color: #C9A84C;
  text-align: center;
}
html[dir="rtl"] .ProseMirror blockquote {
  border-left: none;
  border-right: 4px solid #C9A84C;
  padding-left: 0;
  padding-right: 16px;
}
```

---

### VideoEmbed

**Purpose:** Embeds YouTube/Vimeo video in lesson.

**Props:**
```typescript
interface VideoEmbedProps {
  videoUrl: string; // Must be embed URL: https://www.youtube.com/embed/VIDEO_ID
}
```

**JSX Structure:**

```tsx
<div className="max-w-4xl mx-auto py-8">
  <div className="aspect-video bg-[#1C1C1C]">
    <iframe
      src={videoUrl}
      title="Video lesson"
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>
```

---

### AudioTrigger

**Purpose:** Button that loads audio into persistent player.

**Props:**
```typescript
interface AudioTriggerProps {
  track: {
    id: string;
    title: string;
    src: string;
    type: 'lecture' | 'recitation';
  };
  isPlaying: boolean; // true if this track is current and playing
  onPlay: () => void;
}
```

**Dependencies:** `Play`, `Pause` from `lucide-react`

**JSX Structure:**

```tsx
<button
  onClick={onPlay}
  className={`flex items-center gap-3 h-12 px-6 transition-colors ${
    isPlaying
      ? 'bg-[#1B4332] text-[#FAF7F0]'
      : 'bg-[#C9A84C] text-[#1C1C1C] hover:bg-[#B8973A]'
  }`}
>
  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
  <span className="text-sm font-medium">
    {isPlaying ? 'Inacheza' : 'Sikiliza Sasa'}
  </span>
</button>
```

---

## Audio Components

### PersistentAudioPlayer

**Purpose:** Fixed bottom audio player. Survives route changes. Handles lectures and recitations.

**Props:** None (reads from AudioPlayerContext)

**Dependencies:**
- `useAudioPlayer` from `@/hooks/useAudioPlayer`
- `Play`, `Pause`, `SkipBack`, `SkipForward`, `Volume2`, `VolumeX`, `ChevronUp`, `ChevronDown`, `X` from `lucide-react`

**State (in context):**
```typescript
interface AudioPlayerState {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isExpanded: boolean; // mobile only
  isVisible: boolean;
}
```

**Desktop JSX:**

```tsx
{currentTrack && (
  <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t-2 border-[#C9A84C] shadow-[0_8px_24px_rgba(0,0,0,0.15)] z-40">
    <div className="max-w-7xl mx-auto px-4 h-full flex items-center gap-4">
      
      {/* Track Info */}
      <div className="flex items-center gap-3 w-48">
        <div className="w-10 h-10 bg-[#1B4332] text-[#FAF7F0] flex items-center justify-center">
          {currentTrack.type === 'recitation' ? '📖' : '🎙️'}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-[#1C1C1C] truncate">{currentTrack.title}</p>
          <p className="text-xs text-[#6B7280] truncate">{currentTrack.subject}</p>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="flex items-center gap-3">
          <button className="text-[#6B7280] hover:text-[#1C1C1C] transition-colors">
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 bg-[#1B4332] text-[#FAF7F0] flex items-center justify-center hover:bg-[#143828] transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="text-[#6B7280] hover:text-[#1C1C1C] transition-colors">
            <SkipForward size={20} />
          </button>
        </div>
        
        {/* Progress */}
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-[#6B7280] w-10 text-right">{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-[#E5E0D8] cursor-pointer"
            onClick={seek}
          >
            <div 
              className="h-full bg-[#C9A84C] rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-xs text-[#6B7280] w-10">{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Right Controls */}
      <div className="flex items-center gap-3 w-48 justify-end">
        {/* Speed */}
        <button
          onClick={cycleSpeed}
          className="text-xs text-[#6B7280] hover:text-[#1C1C1C] transition-colors"
        >
          {playbackRate}x
        </button>
        
        {/* Volume */}
        <button onClick={toggleMute} className="text-[#6B7280] hover:text-[#1C1C1C]">
          {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        {/* Close */}
        <button onClick={closePlayer} className="text-[#6B7280] hover:text-[#9B2335]">
          <X size={20} />
        </button>
      </div>
    </div>
    
    {/* Hidden audio element */}
    <audio
      ref={audioRef}
      src={currentTrack.src}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
    />
  </div>
)}
```

**Mobile JSX (Mini + Expanded):**

```tsx
{/* Mini player */}
{!isExpanded && (
  <div 
    onClick={() => setIsExpanded(true)}
    className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t-2 border-[#C9A84C] z-40 flex items-center px-4 gap-3"
  >
    <button
      onClick={(e) => { e.stopPropagation(); togglePlay(); }}
      className="w-8 h-8 bg-[#1B4332] text-[#FAF7F0] flex items-center justify-center"
    >
      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
    </button>
    <div className="flex-1 overflow-hidden">
      <p className="text-sm font-medium text-[#1C1C1C] truncate">{currentTrack.title}</p>
    </div>
    <ChevronUp size={20} className="text-[#6B7280]" />
  </div>
)}

{/* Expanded player */}
{isExpanded && (
  <div className="fixed bottom-0 left-0 right-0 h-[200px] bg-white border-t-2 border-[#C9A84C] z-40 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#1B4332] text-[#FAF7F0] flex items-center justify-center">
            {currentTrack.type === 'recitation' ? '📖' : '🎙️'}
          </div>
          <div>
            <p className="text-sm font-medium">{currentTrack.title}</p>
            <p className="text-xs text-[#6B7280]">{currentTrack.subject}</p>
          </div>
        </div>
        <button onClick={() => setIsExpanded(false)}>
          <ChevronDown size={20} className="text-[#6B7280]" />
        </button>
      </div>
      
      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-[#6B7280]">{formatTime(currentTime)}</span>
        <div className="flex-1 h-2 bg-[#E5E0D8]" onClick={seek}>
          <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: `${(currentTime/duration)*100}%` }} />
        </div>
        <span className="text-xs text-[#6B7280]">{formatTime(duration)}</span>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button onClick={prevTrack}><SkipBack size={24} /></button>
        <button onClick={togglePlay} className="w-14 h-14 bg-[#1B4332] text-[#FAF7F0] flex items-center justify-center">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={nextTrack}><SkipForward size={24} /></button>
      </div>
    </div>
  </div>
)}
```

**Helper Functions:**
```typescript
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
```

---

## Shared Components

### LanguageToggle

**Purpose:** Segmented control for language switching. Updates i18n and RTL.

**Props:** None (reads from LanguageContext)

**JSX Structure:**

```tsx
<div className="inline-flex bg-[#FAF7F0] border border-[#E5E0D8]">
  {(['sw', 'ar', 'en'] as const).map((lang) => (
    <button
      key={lang}
      onClick={() => changeLanguage(lang)}
      className={`px-3 py-2 text-sm font-medium transition-colors ${
        currentLang === lang
          ? 'bg-[#1B4332] text-[#FAF7F0]'
          : 'text-[#6B7280] hover:text-[#1C1C1C]'
      }`}
    >
      {lang === 'sw' ? 'SW' : lang === 'ar' ? 'AR' : 'EN'}
    </button>
  ))}
</div>
```

**Behavior:**
- `changeLanguage('ar')` sets `document.documentElement.dir = 'rtl'` and `lang = 'ar'`
- `changeLanguage('sw')` or `changeLanguage('en')` sets `dir = 'ltr'` and `lang = 'sw'` or `'en'`
- i18next `changeLanguage()` called with selected language

---

### ProgressBar

**Purpose:** Visual progress indicator. Three sizes.

**Props:**
```typescript
interface ProgressBarProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg'; // default: 'md'
  showLabel?: boolean; // default: true
}
```

**JSX Structure:**

```tsx
<div className="flex items-center gap-2">
  <div 
    className={`bg-[#E5E0D8] flex-1 ${
      size === 'sm' ? 'h-2' : size === 'md' ? 'h-3' : 'h-4'
    }`}
  >
    <div 
      className="h-full bg-[#C9A84C]"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    />
  </div>
  {showLabel && (
    <span className={`text-[#6B7280] ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      {Math.round(progress)}%
    </span>
  )}
</div>
```

---

### CompletionCheckmark

**Purpose:** Indicates lesson completion.

**Props:**
```typescript
interface CompletionCheckmarkProps {
  completed: boolean;
  size?: number; // default: 20
}
```

**Dependencies:** `CheckCircle` from `lucide-react`

**JSX Structure:**

```tsx
<CheckCircle 
  size={size} 
  className={completed ? 'text-[#2D6A4F]' : 'text-[#E5E0D8]'} 
/>
```

---

### Breadcrumb

**Purpose:** Navigation breadcrumb.

**Props:**
```typescript
interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}
```

**Dependencies:** `Link` from `@tanstack/react-router`, `ChevronRight` from `lucide-react`

**JSX Structure:**

```tsx
<nav className="flex items-center gap-2 text-sm">
  {items.map((item, index) => (
    <span key={index} className="flex items-center gap-2">
      {index > 0 && <ChevronRight size={14} className="text-[#6B7280]" />}
      {item.href ? (
        <Link to={item.href} className="text-[#C9A84C] hover:underline">
          {item.label}
        </Link>
      ) : (
        <span className="text-[#6B7280]">{item.label}</span>
      )}
    </span>
  ))}
</nav>
```

---

### EmptyState

**Purpose:** Displayed when no content available.

**Props:**
```typescript
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**JSX Structure:**

```tsx
<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
  <div className="text-[#6B7280] mb-4">{icon}</div>
  <h3 className="text-[20px] font-semibold text-[#1C1C1C] mb-2">{title}</h3>
  <p className="text-sm text-[#6B7280] max-w-md mb-6">{description}</p>
  {action && (
    <button
      onClick={action.onClick}
      className="h-12 px-6 bg-[#C9A84C] text-[#1C1C1C] text-sm font-medium hover:bg-[#B8973A] transition-colors"
    >
      {action.label}
    </button>
  )}
</div>
```

---

### LoadingSpinner

**Purpose:** Loading indicator.

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: number; // default: 24
  color?: string; // default: '#C9A84C'
}
```

**JSX Structure:**

```tsx
<div 
  className="animate-spin rounded-full border-2 border-current border-t-transparent"
  style={{ 
    width: size, 
    height: size, 
    color: color 
  }}
/>
```

**Note:** `rounded-full` is an exception allowed for circular spinner animation.

---

## Auth Components

### LoginForm

**Purpose:** User login form.

**Props:**
```typescript
interface LoginFormProps {
  onSuccess: () => void;
  redirectTo?: string;
}
```

**Dependencies:** `useAuth`, `useNavigate`, `useSearch`, `Eye`, `EyeOff` from `lucide-react`

**State:**
```typescript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [rememberMe, setRememberMe] = useState(false);
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

**JSX Structure:**

```tsx
<div className="w-full max-w-md bg-white border border-[#E5E0D8] p-8">
  <h1 className="text-[24px] lg:text-[28px] font-bold text-[#1C1C1C] mb-6">Ingia</h1>
  
  {error && (
    <div className="bg-[#9B2335]/10 border border-[#9B2335] text-[#9B2335] p-3 mb-4 text-sm">
      {error}
    </div>
  )}
  
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Barua pepe</label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full h-12 px-3 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none transition-colors"
        placeholder="jina@mfano.com"
        required
      />
    </div>
    
    <div className="relative">
      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Nenosiri</label>
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full h-12 px-3 pr-10 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none transition-colors"
        placeholder="••••••••"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-8 text-[#6B7280] hover:text-[#1C1C1C]"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
    
    <div className="flex items-center">
      <input
        type="checkbox"
        id="remember"
        checked={rememberMe}
        onChange={e => setRememberMe(e.target.checked)}
        className="w-4 h-4 border border-[#E5E0D8] accent-[#1B4332]"
      />
      <label htmlFor="remember" className="ml-2 text-sm text-[#6B7280]">Nikumbuke</label>
    </div>
    
    <button
      type="submit"
      disabled={isLoading}
      className="w-full h-12 bg-[#1B4332] text-[#FAF7F0] font-medium hover:bg-[#143828] disabled:opacity-50 transition-colors"
    >
      {isLoading ? 'Inaingia...' : 'Ingia'}
    </button>
  </form>
  
  <p className="mt-4 text-center text-sm text-[#6B7280]">
    Huna akaunti?{' '}
    <Link to="/register" className="text-[#C9A84C] hover:underline">Sajili</Link>
  </p>
  
  {/* Demo accounts */}
  <div className="mt-6 p-4 bg-[#FAF7F0] border border-[#E5E0D8]">
    <p className="text-xs text-[#6B7280] font-medium mb-2">Akaunti za majaribio:</p>
    <div className="space-y-1 text-xs text-[#6B7280]">
      <p>admin@ahlusunna.info / admin123</p>
      <p>mwanafunzi@ahlusunna.info / user123</p>
      <p>mwanajumuia@ahlusunna.info / user123</p>
    </div>
  </div>
</div>
```

---

### RegisterForm

**Purpose:** User registration form.

**Props:**
```typescript
interface RegisterFormProps {
  onSuccess: () => void;
}
```

**State:**
```typescript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

**Validation Rules:**
- Name: required, min 2 characters
- Email: required, valid email format
- Password: required, min 6 characters
- Confirm password: must match password

**JSX Structure:** Same layout as LoginForm with additional name field and confirm password field. Submit button label: "Sajili". Footer text: "Tayari una akaunti? Ingia"

---

## References

For data types and mock content, see `ahlusunna-content-schema.md`.
For auth implementation, see `ahlusunna-auth.md`.
For admin components, see `ahlusunna-admin.md`.
For visual tokens, see `ahlusunna-design-system.md`.
"""