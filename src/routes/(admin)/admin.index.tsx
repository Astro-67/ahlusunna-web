import { createFileRoute, redirect } from '@tanstack/react-router'
import { CheckCircle, ShieldCheck, Mail, ShieldAlert, ArrowRight, UserCog, UserCheck, MessageSquare } from 'lucide-react'

import { AdminLayout } from '#/components/admin/AdminLayout'
import { mockUsers as seedUsers, mockContacts } from '#/data/seed'
import { useState } from 'react'
import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/(admin)/admin/')({
  component: AdminDashboardPage,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
    if (!context.auth.isAdmin) {
      throw redirect({ to: '/' })
    }
  },
})

function AdminDashboardPage() {
  const { t, currentLang } = useLanguage()
  const [users, setUsers] = useState(seedUsers)
  const [contacts, setContacts] = useState(mockContacts)
  const [roleFilter, setRoleFilter] = useState<string>('all')

  const isRtl = currentLang === 'ar'

  const handleRoleFilter = (role: string) => setRoleFilter(role)

  const filteredUsers = roleFilter === 'all' ? users : users.filter(u => u.role === roleFilter)

  const handleToggleUserRole = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, role: u.role === 'admin' ? 'learner' : 'admin' }
      }
      return u
    }))
  }

  const handleMarkContact = (contactId: string) => {
    setContacts(contacts.map(c => {
      if (c.id === contactId) {
        return { ...c, status: 'read' }
      }
      return c
    }))
  }

  const StatusPill = ({ status, type }: { status: string, type: 'user' | 'contact' }) => {
    let className = "inline-flex items-center font-sans text-[10px] font-bold px-[7px] py-[2px] border tracking-[0.02em] uppercase"
    
    if (type === 'user') {
      if (status === 'admin') className += " bg-[#1B4332] border-[#1B4332] text-[#FAF7F0]"
      else if (status === 'learner') className += " bg-background border-border text-foreground"
      else className += " bg-accent/10 border-accent/40 text-[#8a6f1f]"
    } else {
      if (status === 'new') className += " bg-accent/20 border-accent text-[#8a6f1f]"
      else if (status === 'read') className += " bg-[#1B4332]/10 border-[#1B4332]/20 text-[#1B4332]"
      else className += " bg-background border-border text-muted-foreground"
    }

    const labelMap: Record<string, string> = {
      admin: t('admin.role_admin'),
      learner: t('admin.role_learner'),
      moderator: t('admin.role_moderator'),
      new: t('admin.new_messages'),
      read: t('admin.is_read')
    }

    return <span className={className}>{labelMap[status] || status}</span>
  }

  return (
    <AdminLayout>
      <div className="mb-8 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
        <h1 className="text-[24px] font-bold tracking-[-0.01em] text-foreground">{t('admin.dashboard_title')}</h1>
        <div className="mt-1 text-[13px] text-muted-foreground">{t('admin.dashboard_desc')}</div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start" dir={isRtl ? 'rtl' : 'ltr'}>
        
        {/* Users Table Panel */}
        <div className="bg-white border border-border">
          <div className="px-6 py-5 border-b border-border flex items-center justify-between">
            <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-foreground flex items-center gap-2">
              <UserCheck size={16} className="text-primary" /> {t('admin.users_label')}
            </h3>
            <div className="flex gap-2">
               {['all', 'admin', 'learner'].map(role => (
                 <button 
                   key={role}
                   onClick={() => handleRoleFilter(role)}
                   className={`text-[11px] font-bold uppercase tracking-[0.04em] px-3 py-1 border transition-colors ${roleFilter === role ? 'bg-primary border-primary text-white' : 'bg-background border-border text-muted-foreground hover:border-primary'}`}
                 >
                   {role === 'all' ? 'All' : role}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#FDFCF8] border-b border-border">
                  <th className={cn("p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-border", isRtl ? "border-l" : "border-r")}>Jina / Barua Pepe</th>
                  <th className={cn("p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-border", isRtl ? "border-l text-right" : "border-r text-left")}>Nafasi</th>
                  <th className={cn("p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-muted-foreground", isRtl ? "text-left" : "text-right")}>{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className="border-b border-border last:border-b-0 hover:bg-[#FDFCF8]">
                    <td className={cn("p-[12px_18px] border-border", isRtl ? "border-l" : "border-r")}>
                      <div className="font-semibold text-[13px] text-foreground">{u.name}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{u.email}</div>
                    </td>
                    <td className={cn("p-[12px_18px] border-border", isRtl ? "border-l" : "border-r")}>
                      <StatusPill status={u.role} type="user" />
                    </td>
                    <td className={cn("p-[12px_18px]", isRtl ? "text-left" : "text-right")}>
                      <button 
                        onClick={() => handleToggleUserRole(u.id)}
                        className="text-[11px] font-semibold text-primary hover:underline"
                      >
                        {u.role === 'admin' ? t('admin.demote') : t('admin.make_admin')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contacts Table Panel */}
        <div className="bg-white border border-border">
          <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-primary text-white">
            <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] flex items-center gap-2">
              <MessageSquare size={16} className="text-accent" /> {t('admin.contacts_label')}
            </h3>
            <span className="bg-accent text-foreground text-[10px] font-bold px-2 py-0.5">
              {contacts.filter(c => c.status === 'new').length} {t('admin.new_messages')}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#143828]/5 border-b border-border">
                  <th className={cn("p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-border", isRtl ? "border-l" : "border-r")}>Ujumbe</th>
                  <th className={cn("p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-muted-foreground border-border", isRtl ? "border-l text-right" : "border-r text-left")}>Hali</th>
                  <th className={cn("p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-muted-foreground", isRtl ? "text-left" : "text-right")}>{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c.id} className="border-b border-border last:border-b-0 hover:bg-[#FDFCF8]">
                    <td className={cn("p-[12px_18px] border-border", isRtl ? "border-l" : "border-r")}>
                      <div className="font-semibold text-[13px] text-foreground">{c.subject}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{c.name} · {c.email}</div>
                    </td>
                    <td className={cn("p-[12px_18px] border-border", isRtl ? "border-l" : "border-r")}>
                       <StatusPill status={c.status} type="contact" />
                    </td>
                    <td className={cn("p-[12px_18px]", isRtl ? "text-left" : "text-right")}>
                      {c.status === 'new' ? (
                        <button 
                          onClick={() => handleMarkContact(c.id)}
                          className="text-[11px] font-semibold text-primary border border-primary px-2 py-1 hover:bg-primary hover:text-white transition-colors"
                        >
                          {t('admin.read_btn')}
                        </button>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">{t('admin.is_read')}</span>
                      )}
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                   <tr>
                     <td colSpan={3} className="p-8 text-center text-[13px] text-muted-foreground">
                        Hakuna maombi mapya.
                     </td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
