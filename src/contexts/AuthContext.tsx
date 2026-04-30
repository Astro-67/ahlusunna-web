import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
  
} from 'react'
import type {ReactNode} from 'react';

import { lessons, mockCredentials, mockUsers } from '#/data/seed'
import type { LevelId, User } from '#/types'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProgress: (lessonSlug: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'ahlusunna_auth'
const USERS_KEY = 'ahlusunna_users'
const CREDS_KEY = 'ahlusunna_creds'

const parseJson = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

const readStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const stored = parseJson<{ user?: User } | null>(localStorage.getItem(STORAGE_KEY), null)
  return stored?.user ?? null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser())

  const getAllUsers = useCallback((): User[] => {
    const storedUsers = parseJson<User[] | null>(localStorage.getItem(USERS_KEY), null)
    if (!storedUsers) return [...mockUsers]
    const missingMockUsers = mockUsers.filter(
      (mockUser) => !storedUsers.some((storedUser) => storedUser.email === mockUser.email),
    )
    return [...missingMockUsers, ...storedUsers]
  }, [])

  const saveUsers = useCallback((users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }, [])

  const saveSession = useCallback((nextUser: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser }))
  }, [])

  const checkAndUnlockLevels = useCallback((currentUser: User): User => {
    const intermediateLessons = lessons.filter((lesson) => lesson.levelId === 'kati')
    const completedIntermediate = intermediateLessons.filter((lesson) =>
      currentUser.progress.includes(lesson.slug),
    ).length

    const allIntermediateDone = completedIntermediate === intermediateLessons.length
    const hasAdvanced = currentUser.levelAccess.includes('endelea')

    if (allIntermediateDone && !hasAdvanced && intermediateLessons.length > 0) {
      return {
        ...currentUser,
        levelAccess: [...currentUser.levelAccess, 'endelea'],
      }
    }

    return currentUser
  }, [])

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      await new Promise((resolve) => setTimeout(resolve, 350))

      const normalizedEmail = email.trim().toLowerCase()
      const users = getAllUsers()
      const foundUser = users.find((candidate) => candidate.email === normalizedEmail)
      const storedCredentials = parseJson<Record<string, string>>(
        localStorage.getItem(CREDS_KEY),
        {},
      )
      const expectedPassword = mockCredentials[normalizedEmail] ?? storedCredentials[normalizedEmail]

      if (!foundUser || expectedPassword !== password) {
        return { success: false, error: 'auth.error_invalid_credentials' }
      }

      setUser(foundUser)
      saveSession(foundUser)
      return { success: true }
    },
    [getAllUsers, saveSession],
  )

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      await new Promise((resolve) => setTimeout(resolve, 350))

      const normalizedEmail = email.trim().toLowerCase()
      const users = getAllUsers()
      if (users.some((candidate) => candidate.email === normalizedEmail)) {
        return { success: false, error: 'auth.error_email_exists' }
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: normalizedEmail,
        role: 'learner',
        levelAccess: ['awali', 'kati'] satisfies LevelId[],
        progress: [],
      }

      const updatedUsers = [...users, newUser]
      const credentials = parseJson<Record<string, string>>(localStorage.getItem(CREDS_KEY), {})
      credentials[normalizedEmail] = password

      saveUsers(updatedUsers)
      localStorage.setItem(CREDS_KEY, JSON.stringify(credentials))
      setUser(newUser)
      saveSession(newUser)

      return { success: true }
    },
    [getAllUsers, saveSession, saveUsers],
  )

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const updateProgress = useCallback(
    (lessonSlug: string) => {
      if (!user) return

      let updated: User

      if (user.progress.includes(lessonSlug)) {
        updated = {
          ...user,
          progress: user.progress.filter((progressSlug) => progressSlug !== lessonSlug),
        }
      } else {
        updated = {
          ...user,
          progress: [...user.progress, lessonSlug],
        }
      }

      updated = checkAndUnlockLevels(updated)

      setUser(updated)
      saveSession(updated)

      const users = getAllUsers()
      const updatedUsers = users.map((storedUser) => (storedUser.id === user.id ? updated : storedUser))
      saveUsers(updatedUsers)
    },
    [checkAndUnlockLevels, getAllUsers, saveSession, saveUsers, user],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      isLoading: false,
      login,
      register,
      logout,
      updateProgress,
    }),
    [login, logout, register, updateProgress, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
