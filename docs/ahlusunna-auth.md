auth_md = """# Ahlusunna Authentication — Full Specifications

## Purpose

This file specifies the complete authentication system for Ahlusunna. All code in English. UI text in Swahili via i18n. Covers: AuthContext, login form, register form, route guards, mock JWT, demo accounts, and future Django integration.

## AuthContext — Full Specification

**File:** `src/contexts/AuthContext.tsx`

**Purpose:** React Context providing authentication state and methods to entire app.

**State Interface:**
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}
```

**Context Value Interface:**
```typescript
interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProgress: (lessonSlug: string) => void;
}
```

**Implementation:**

```typescript
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User } from '@/types';
import { mockUsers, mockCredentials } from '@/data/seed';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProgress: (lessonSlug: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'ahlusunna_auth';
const USERS_KEY = 'ahlusunna_users';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getAllUsers = useCallback((): User[] => {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [...mockUsers];
  }, []);

  const saveUsers = useCallback((users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, []);

  const saveSession = useCallback((userData: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: userData }));
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getAllUsers();
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      // Check mock credentials
      const mockUser = mockUsers.find(u => u.email === email);
      if (mockUser && mockCredentials[email] === password) {
        setUser(mockUser);
        saveSession(mockUser);
        return { success: true };
      }
      return { success: false, error: 'Barua pepe au nenosiri si sahihi' };
    }

    // Check registered user password (stored in a separate credentials store)
    const creds = JSON.parse(localStorage.getItem('ahlusunna_creds') || '{}');
    if (creds[email] !== password) {
      return { success: false, error: 'Barua pepe au nenosiri si sahihi' };
    }

    setUser(foundUser);
    saveSession(foundUser);
    return { success: true };
  }, [getAllUsers, saveSession]);

  const register = useCallback(async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getAllUsers();
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Barua pepe tayari imesajiliwa' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'learner',
      levelAccess: ['awali', 'kati'],
      progress: [],
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    // Save credentials
    const creds = JSON.parse(localStorage.getItem('ahlusunna_creds') || '{}');
    creds[email] = password;
    localStorage.setItem('ahlusunna_creds', JSON.stringify(creds));

    setUser(newUser);
    saveSession(newUser);
    return { success: true };
  }, [getAllUsers, saveUsers, saveSession]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProgress = useCallback((lessonSlug: string) => {
    if (!user) return;
    
    if (user.progress.includes(lessonSlug)) {
      // Remove (toggle off)
      const updated = {
        ...user,
        progress: user.progress.filter(p => p !== lessonSlug),
      };
      setUser(updated);
      saveSession(updated);
      
      // Update in users list too
      const users = getAllUsers();
      const updatedUsers = users.map(u => u.id === user.id ? updated : u);
      saveUsers(updatedUsers);
    } else {
      // Add (toggle on)
      const updated = {
        ...user,
        progress: [...user.progress, lessonSlug],
      };
      setUser(updated);
      saveSession(updated);
      
      const users = getAllUsers();
      const updatedUsers = users.map(u => u.id === user.id ? updated : u);
      saveUsers(updatedUsers);
    }
  }, [user, getAllUsers, saveUsers, saveSession]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isLoading,
    login,
    register,
    logout,
    updateProgress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## useAuth Hook

**File:** `src/hooks/useAuth.ts`

```typescript
export { useAuth } from '@/contexts/AuthContext';
```

## Login Page Route

**File:** `src/routes/login.tsx`

**Route:** `/login`

**beforeLoad:** Redirect to `/` if already authenticated.

**JSX Structure:**

```tsx
import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: ({ context }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const search = useSearch({ from: '/login' });
  const redirectTo = (search as any).redirect || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate({ to: redirectTo });
    } else {
      setError(result.error || 'Kuna hitilafu. Jaribu tena.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-[#E5E0D8] p-8">
        <h1 className="text-[24px] lg:text-[28px] font-bold text-[#1C1C1C] mb-6">Ingia</h1>
        
        {error && (
          <div className="bg-[#9B2335]/10 border border-[#9B2335] text-[#9B2335] p-3 mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1C1C1C] mb-1">
              Barua pepe
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-12 px-3 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none transition-colors"
              placeholder="jina@mfano.com"
              required
              autoComplete="email"
            />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-[#1C1C1C] mb-1">
              Nenosiri
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-12 px-3 pr-10 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none transition-colors"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-[#6B7280] hover:text-[#1C1C1C]"
              aria-label={showPassword ? 'Ficha nenosiri' : 'Onyesha nenosiri'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="w-4 h-4 border border-[#E5E0D8] accent-[#1B4332]"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-[#6B7280]">
              Nikumbuke
            </label>
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
          <Link to="/register" className="text-[#C9A84C] hover:underline">
            Sajili
          </Link>
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
    </div>
  );
}
```

## Register Page Route

**File:** `src/routes/register.tsx`

**Route:** `/register`

**beforeLoad:** Redirect to `/` if already authenticated.

**Validation Rules:**
- Name: required, minimum 2 characters
- Email: required, valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Password: required, minimum 6 characters
- Confirm password: must match password exactly

**Error Messages (Swahili):**
- Name empty: "Jina linahitajika"
- Name too short: "Jina lazima liwe na herufi 2 au zaidi"
- Email empty: "Barua pepe inahitajika"
- Email invalid: "Barua pepe si sahihi"
- Password empty: "Nenosiri inahitajika"
- Password too short: "Nenosiri lazima iwe na herufi 6 au zaidi"
- Passwords don't match: "Nenosiri hazilingani"

**JSX Structure:** Same layout as LoginPage with:
- Title: "Sajili Akaunti"
- Additional fields: name, confirm password
- Submit button: "Sajili"
- Footer: "Tayari una akaunti? Ingia" with link to `/login`
- No demo accounts section

## Protected Learner Layout

**File:** `src/routes/(learner)/_layout.tsx`

**Purpose:** Layout wrapper for all learner-only routes. Checks authentication before loading.

```tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute('/(learner)/_layout')({
  component: LearnerLayout,
  beforeLoad: ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: window.location.pathname },
      });
    }
  },
});

function LearnerLayout() {
  return <Outlet />;
}
```

**Child Routes:**
- `subjects.intermediate.tsx` → `/subjects/intermediate`
- `subjects.advanced.tsx` → `/subjects/advanced`
- `progress.tsx` → `/progress`

## Admin Layout

**File:** `src/routes/(admin)/_layout.tsx`

**Purpose:** Layout wrapper for admin-only routes. Checks authentication AND admin role.

```tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(admin)/_layout')({
  component: AdminLayout,
  beforeLoad: ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
    if (!context.auth?.isAdmin) {
      throw redirect({ to: '/' });
    }
  },
});

function AdminLayout() {
  return <Outlet />;
}
```

**Child Routes:**
- `admin.index.tsx` → `/admin`
- `admin.content.tsx` → `/admin/content`

## Root Route Context Integration

**File:** `src/routes/__root.tsx`

The root route must provide auth context to child routes for `beforeLoad` guards:

```tsx
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { AuthContextValue } from '@/contexts/AuthContext';

interface RouterContext {
  auth: AuthContextValue;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const auth = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-14 lg:pt-16">
        <Outlet context={{ auth }} />
      </main>
      <PersistentAudioPlayer />
      <Footer />
    </div>
  );
}
```

## Route Guard Matrix

| Route | Guard Type | Redirect Target | Condition |
|-------|-----------|-----------------|-----------|
| `/` | None | — | Always public |
| `/subjects` | None | — | Always public |
| `/lesson/:slug` | Conditional | `/login?redirect=/lesson/:slug` | If lesson.levelId !== 'awali' and !isAuthenticated |
| `/about` | None | — | Always public |
| `/contact` | None | — | Always public |
| `/login` | Reverse | `/` | If isAuthenticated |
| `/register` | Reverse | `/` | If isAuthenticated |
| `/subjects/intermediate` | Auth | `/login?redirect=/subjects/intermediate` | If !isAuthenticated |
| `/subjects/advanced` | Auth | `/login?redirect=/subjects/advanced` | If !isAuthenticated |
| `/progress` | Auth | `/login?redirect=/progress` | If !isAuthenticated |
| `/admin` | Role | `/` | If !isAdmin |
| `/admin/content` | Role | `/` | If !isAdmin |

## Demo Accounts (Hardcoded)

| Email | Password | Role | Name | Level Access | Progress |
|-------|----------|------|------|-------------|----------|
| admin@ahlusunna.info | admin123 | admin | Msimamizi | awali, kati, endelea | [] |
| mwanafunzi@ahlusunna.info | user123 | learner | Mwanafunzi | awali, kati | introduction-to-quran, introduction-to-hadith |
| mwanajumuia@ahlusunna.info | user123 | learner | Mwanajumuia | awali, kati, endelea | introduction-to-quran, introduction-to-hadith, rules-of-purification |

## New User Registration Defaults

When a new user registers:
- Role: `learner`
- Level access: `['awali', 'kati']`
- Progress: `[]`
- Name: from registration form
- Email: from registration form
- ID: `user-${Date.now()}`

## Logout Behavior

1. Clear `user` state to `null`
2. Remove `ahlusunna_auth` from localStorage
3. Navigate to `/`
4. Audio player continues playing if it was active (not tied to auth)

## Progress Persistence

User progress (completed lesson slugs) stored in:
- localStorage key: `ahlusunna_auth` (within user object)
- localStorage key: `ahlusunna_users` (full users array)
- Updates on every completion toggle
- Survives page refresh
- Lost on browser data clear

## Future Django Integration

When replacing mock auth with Django backend:

1. **API Endpoints:**
   - `POST /api/auth/login/` — returns JWT access + refresh tokens
   - `POST /api/auth/register/` — creates user, returns tokens
   - `POST /api/auth/logout/` — blacklists refresh token
   - `GET /api/auth/me/` — returns current user
   - `POST /api/progress/` — updates lesson completion

2. **Token Storage:**
   - Access token: http-only cookie (set by Django)
   - Refresh token: http-only cookie
   - No localStorage for tokens

3. **AuthContext Changes:**
   - Replace localStorage with cookie-based session
   - Add token refresh logic
   - Add `isLoading` state during token validation on mount

4. **Route Guards:**
   - Same `beforeLoad` pattern
   - Check cookie presence instead of localStorage

5. **Registration:**
   - Same form, POSTs to Django endpoint
   - Django sends verification email (future feature)
"""
