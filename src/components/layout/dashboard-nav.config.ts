import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderOpen,
  User,
  ListChecks,
  Eye,
  Users,
  MessageSquare,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export type Role = 'author' | 'moderator' | 'admin'

export interface DashboardNavItem {
  to: string
  icon: LucideIcon
  labelKey: string
  variant?: 'default' | 'accent'
}

export interface DashboardRoleConfig {
  roleLabelKey: string
  items: DashboardNavItem[]
}

export const dashboardNavConfig: Record<Role, DashboardRoleConfig> = {
  author: {
    roleLabelKey: 'dashboard.role.author',
    items: [
      { to: '/dashboard/author', icon: LayoutDashboard, labelKey: 'dashboard.nav.home' },
      { to: '/dashboard/author/lessons', icon: FileText, labelKey: 'dashboard.nav.my_lessons' },
      { to: '/dashboard/author/lessons/new', icon: PlusCircle, labelKey: 'dashboard.nav.new_lesson', variant: 'accent' },
      { to: '/dashboard/author/media', icon: FolderOpen, labelKey: 'dashboard.nav.media' },
      { to: '/dashboard/author/profile', icon: User, labelKey: 'dashboard.nav.profile' },
    ],
  },
  moderator: {
    roleLabelKey: 'dashboard.role.moderator',
    items: [
      { to: '/dashboard/moderator', icon: LayoutDashboard, labelKey: 'dashboard.nav.home' },
      { to: '/dashboard/moderator/queue', icon: ListChecks, labelKey: 'dashboard.nav.review_queue', variant: 'accent' },
      { to: '/dashboard/moderator/lessons', icon: Eye, labelKey: 'dashboard.nav.all_lessons' },
      { to: '/dashboard/moderator/profile', icon: User, labelKey: 'dashboard.nav.profile' },
    ],
  },
  admin: {
    roleLabelKey: 'dashboard.role.admin',
    items: [
      { to: '/dashboard/admin', icon: LayoutDashboard, labelKey: 'dashboard.nav.home' },
      { to: '/dashboard/admin/users', icon: Users, labelKey: 'dashboard.nav.users' },
      { to: '/dashboard/admin/contact', icon: MessageSquare, labelKey: 'dashboard.nav.contact' },
      { to: '/dashboard/admin/content', icon: Eye, labelKey: 'dashboard.nav.content_oversight' },
      { to: '/dashboard/admin/settings', icon: Settings, labelKey: 'dashboard.nav.settings' },
    ],
  },
}