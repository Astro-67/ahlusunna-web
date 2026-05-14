import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '#/components/layout/DashboardLayout'
import { UserCheck, MessageSquare } from 'lucide-react'
import { mockUsers as seedUsers, mockContacts } from '#/data/seed'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { UserRole } from '#/types'

export const Route = createFileRoute('/dashboard/admin/')({
  component: AdminDashboardPage,
})

function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      <AdminDashboardContent />
    </DashboardLayout>
  )
}

function AdminDashboardContent() {
  const { t } = useTranslation()
  const [users, setUsers] = useState(seedUsers)
  const [contacts, setContacts] = useState(mockContacts)
  const [roleFilter, setRoleFilter] = useState<string>('all')

  const handleRoleFilter = (role: string) => setRoleFilter(role)
  const filteredUsers = roleFilter === 'all' ? users : users.filter(u => u.role === roleFilter)

  const availableRoles: UserRole[] = ['student', 'author', 'moderator', 'admin']

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, role: newRole }
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
    let className = "inline-flex items-center font-sans text-[10px] font-bold px-1.75 py-0.5 border tracking-[0.02em] uppercase"

    if (type === 'user') {
      if (status === 'admin') className += " bg-[#1B4332] border-[#1B4332] text-[#FAF7F0]"
      else if (status === 'student') className += " bg-[#FAF7F0] border-[#E5E0D8] text-[#1C1C1C]"
      else className += " bg-[#C9A84C]/10 border-[#C9A84C]/40 text-[#8a6f1f]"
    } else {
      if (status === 'new') className += " bg-[#C9A84C]/20 border-[#C9A84C] text-[#8a6f1f]"
      else if (status === 'read') className += " bg-[#1B4332]/10 border-[#1B4332]/20 text-[#1B4332]"
      else className += " bg-[#FAF7F0] border-[#E5E0D8] text-[#6B7280]"
    }

    const labelMap: Record<string, string> = {
      admin: t('admin.role_admin'),
      student: t('admin.role_learner'),
      author: t('admin.role_author'),
      moderator: t('admin.role_moderator'),
      new: t('admin.new_messages'),
      read: t('admin.is_read')
    }

    return <span className={className}>{labelMap[status] || status}</span>
  }

  return (
    <div className="mb-8">
      <h1 className="text-[24px] font-bold tracking-[-0.01em] text-[#1C1C1C]">{t('admin.dashboard_title')}</h1>
      <div className="mt-1 text-[13px] text-[#6B7280]">{t('admin.dashboard_desc')}</div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start mt-8">
        {/* Users Table Panel */}
        <div className="bg-white border border-[#E5E0D8]">
          <div className="px-6 py-5 border-b border-[#E5E0D8] flex items-center justify-between">
            <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-[#1C1C1C] flex items-center gap-2">
              <UserCheck size={16} className="text-[#1B4332]" /> {t('admin.users_label')}
            </h3>
            <div className="flex gap-2">
              {['all', 'admin', 'moderator', 'author', 'student'].map(role => (
                <button
                  key={role}
                  onClick={() => handleRoleFilter(role)}
                  className={`text-[11px] font-bold uppercase tracking-[0.04em] px-3 py-1 border transition-colors ${roleFilter === role ? 'bg-[#1B4332] border-[#1B4332] text-white' : 'bg-[#FAF7F0] border-[#E5E0D8] text-[#6B7280] hover:border-[#1B4332]'}`}
                >
                  {role === 'all' ? 'All' : role}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#FDFCF8] border-b border-[#E5E0D8]">
                  <th className="p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#6B7280] border-[#E5E0D8] border-r text-start">Name / Email</th>
                  <th className="p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#6B7280] border-[#E5E0D8] border-r text-start">Role</th>
                  <th className="p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#6B7280] text-end">{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className="border-b border-[#E5E0D8] last:border-b-0 hover:bg-[#FDFCF8]">
                    <td className="p-[12px_18px] border-[#E5E0D8] border-r">
                      <div className="font-semibold text-[13px] text-[#1C1C1C]">{u.name}</div>
                      <div className="text-[11px] text-[#6B7280] mt-0.5">{u.email}</div>
                    </td>
                    <td className="p-[12px_18px] border-[#E5E0D8] border-r">
                      <StatusPill status={u.role} type="user" />
                    </td>
                    <td className="p-[12px_18px] text-end">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                        className="text-[11px] font-semibold bg-transparent border border-[#E5E0D8] px-2 py-1 text-[#1B4332] hover:border-[#1B4332] cursor-pointer"
                      >
                        {availableRoles.map(role => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contacts Table Panel */}
        <div className="bg-white border border-[#E5E0D8]">
          <div className="px-6 py-5 border-b border-[#E5E0D8] flex items-center justify-between bg-[#1B4332] text-white">
            <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] flex items-center gap-2">
              <MessageSquare size={16} className="text-[#C9A84C]" /> {t('admin.contacts_label')}
            </h3>
            <span className="bg-[#C9A84C] text-[#1C1C1C] text-[10px] font-bold px-2 py-0.5">
              {contacts.filter(c => c.status === 'new').length} {t('admin.new_messages')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1B4332]/5 border-b border-[#E5E0D8]">
                  <th className="p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#6B7280] border-[#E5E0D8] border-r text-start">Subject</th>
                  <th className="p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#6B7280] border-[#E5E0D8] border-r text-start">Status</th>
                  <th className="p-[10px_18px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#6B7280] text-end">{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c.id} className="border-b border-[#E5E0D8] last:border-b-0 hover:bg-[#FDFCF8]">
                    <td className="p-[12px_18px] border-[#E5E0D8] border-r">
                      <div className="font-semibold text-[13px] text-[#1C1C1C]">{c.subject}</div>
                      <div className="text-[11px] text-[#6B7280] mt-0.5">{c.name} · {c.email}</div>
                    </td>
                    <td className="p-[12px_18px] border-[#E5E0D8] border-r">
                      <StatusPill status={c.status} type="contact" />
                    </td>
                    <td className="p-[12px_18px] text-end">
                      {c.status === 'new' ? (
                        <button
                          onClick={() => handleMarkContact(c.id)}
                          className="text-[11px] font-semibold text-[#1B4332] border border-[#1B4332] px-2 py-1 hover:bg-[#1B4332] hover:text-white transition-colors"
                        >
                          {t('admin.read_btn')}
                        </button>
                      ) : (
                        <span className="text-[11px] text-[#6B7280] italic">{t('admin.is_read')}</span>
                      )}
                    </td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-[13px] text-[#6B7280]">
                      Hakuna maombi mapya.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}