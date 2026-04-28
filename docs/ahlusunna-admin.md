admin_md = """# Ahlusunna Admin Panel — Full Specifications

## Purpose

This file specifies the complete admin panel for Ahlusunna content management. All code in English. UI text in Swahili via i18n. Covers: admin layout, dashboard, content manager, Tiptap editor, content form, and mobile admin menu.

## Admin Route Structure

| Route | File | Access |
|-------|------|--------|
| `/admin` | `(admin)/admin.index.tsx` | admin only |
| `/admin/content` | `(admin)/admin.content.tsx` | admin only |

Both wrapped in `(admin)/_layout.tsx` with role guard (see ahlusunna-auth.md).

## AdminLayout Component

**File:** `src/routes/(admin)/_layout.tsx`

**Purpose:** Admin layout with fixed sidebar, sticky header, and main content area.

**State:**
```typescript
const [sidebarOpen, setSidebarOpen] = useState(false); // mobile only
```

**JSX Structure:**

```tsx
<div className="min-h-screen bg-[#FAF7F0] flex">
  {/* Sidebar — desktop fixed, mobile overlay */}
  <aside className={`fixed left-0 top-0 h-full w-60 bg-[#1B4332] text-[#FAF7F0] flex flex-col z-50 transition-transform duration-200 lg:translate-x-0 ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  }`}>
    {/* Logo */}
    <div className="h-16 flex items-center px-4 border-b border-[#C9A84C]/20">
      <span className="font-bold text-lg">Ahlusunna</span>
      <span className="ml-2 text-xs bg-[#C9A84C] text-[#1C1C1C] px-2 py-0.5">Admin</span>
    </div>

    {/* Navigation */}
    <nav className="flex-1 py-4">
      <Link
        to="/admin"
        className="flex items-center px-4 py-3 text-[#FAF7F0]/80 hover:text-[#FAF7F0] hover:bg-[#143828] data-[status=active]:bg-[#143828] data-[status=active]:border-l-2 data-[status=active]:border-[#C9A84C] transition-colors"
      >
        <LayoutDashboard size={20} className="mr-3" />
        <span className="text-sm">Dashboard</span>
      </Link>
      <Link
        to="/admin/content"
        className="flex items-center px-4 py-3 text-[#FAF7F0]/80 hover:text-[#FAF7F0] hover:bg-[#143828] data-[status=active]:bg-[#143828] data-[status=active]:border-l-2 data-[status=active]:border-[#C9A84C] transition-colors"
      >
        <BookOpen size={20} className="mr-3" />
        <span className="text-sm">Maudhui</span>
      </Link>
    </nav>

    {/* Logout */}
    <div className="p-4 border-t border-[#C9A84C]/20">
      <button
        onClick={logout}
        className="flex items-center w-full px-4 py-3 text-[#FAF7F0]/80 hover:text-[#FAF7F0] hover:bg-[#143828] transition-colors"
      >
        <LogOut size={20} className="mr-3" />
        <span className="text-sm">Toka</span>
      </button>
    </div>
  </aside>

  {/* Main Content */}
  <main className="flex-1 lg:ml-60">
    {/* Header */}
    <header className="sticky top-0 h-16 bg-white border-b border-[#E5E0D8] flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-[#1C1C1C]"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-[20px] lg:text-[22px] font-semibold text-[#1C1C1C]">Msimamizi wa Maudhui</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#6B7280]">{user?.email}</span>
        <div className="w-8 h-8 bg-[#1B4332] text-[#FAF7F0] flex items-center justify-center text-sm font-bold">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </header>

    {/* Page Content */}
    <div className="p-6">
      <Outlet />
    </div>
  </main>

  {/* Mobile overlay backdrop */}
  {sidebarOpen && (
    <div
      className="fixed inset-0 bg-[#1C1C1C]/50 z-40 lg:hidden"
      onClick={() => setSidebarOpen(false)}
    />
  )}
</div>
```

**Dependencies:** `useAuth`, `Link` from `@tanstack/react-router`, `LayoutDashboard`, `BookOpen`, `LogOut`, `Menu` from `lucide-react`

---

## Dashboard Page

**File:** `src/routes/(admin)/admin.index.tsx`

**Route:** `/admin`

**Purpose:** Admin dashboard with stats overview and recent content list.

**Stats Data:**
```typescript
const stats = [
  { label: 'Jumla ya Masomo', value: lessons.length, icon: BookOpen, color: 'bg-[#1B4332]' },
  { label: 'Jumla ya Masomo', value: subjects.length, icon: FileText, color: 'bg-[#C9A84C]' },
  { label: 'Watumiaji', value: 3, icon: Users, color: 'bg-[#2D6A4F]' },
  { label: 'Maudhui Mapya', value: 2, icon: TrendingUp, color: 'bg-[#D4A373]' },
];
```

**JSX Structure:**

```tsx
<div>
  <h2 className="text-[24px] lg:text-[28px] font-bold text-[#1C1C1C] mb-6">Dashboard</h2>

  {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {stats.map(stat => (
      <div
        key={stat.label}
        className="bg-white border border-[#E5E0D8] p-6 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${stat.color} text-[#FAF7F0] flex items-center justify-center`}>
            <stat.icon size={24} />
          </div>
          <span className="text-[24px] lg:text-[28px] font-bold text-[#1C1C1C]">{stat.value}</span>
        </div>
        <p className="text-sm text-[#6B7280]">{stat.label}</p>
      </div>
    ))}
  </div>

  {/* Recent Content */}
  <div className="bg-white border border-[#E5E0D8]">
    <div className="p-4 border-b border-[#E5E0D8]">
      <h3 className="text-[20px] lg:text-[22px] font-semibold text-[#1C1C1C]">Maudhui ya Hivi Karibuni</h3>
    </div>
    <div className="divide-y divide-[#E5E0D8]">
      {lessons.slice(0, 5).map(lesson => (
        <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-[#FAF7F0] transition-colors">
          <div>
            <p className="font-medium text-[#1C1C1C]">{lesson.title.sw}</p>
            <p className="text-xs text-[#6B7280]">{lesson.subjectId} • {lesson.createdAt}</p>
          </div>
          <span className="text-xs bg-[#1B4332]/10 text-[#1B4332] px-2 py-1">
            {lesson.levelId}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>
```

---

## Content Manager Page

**File:** `src/routes/(admin)/admin.content.tsx`

**Route:** `/admin/content`

**Purpose:** CRUD interface for lessons. Search, filter by subject, edit, delete.

**State:**
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [selectedSubject, setSelectedSubject] = useState<string>('all');
const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
const [isFormOpen, setIsFormOpen] = useState(false);
```

**Filter Logic:**
```typescript
const filteredLessons = lessons.filter(lesson => {
  const matchesSearch = 
    lesson.title.sw.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.title.ar.includes(searchQuery) ||
    lesson.title.en.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesSubject = selectedSubject === 'all' || lesson.subjectId === selectedSubject;
  return matchesSearch && matchesSubject;
});
```

**JSX Structure:**

```tsx
<div>
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-[24px] lg:text-[28px] font-bold text-[#1C1C1C]">Msimamizi wa Maudhui</h2>
    <button
      onClick={() => { setEditingLesson(null); setIsFormOpen(true); }}
      className="flex items-center h-12 px-6 bg-[#C9A84C] text-[#1C1C1C] font-medium hover:bg-[#B8973A] transition-colors"
    >
      <Plus size={20} className="mr-2" />
      Ongeza Maudhui
    </button>
  </div>

  {/* Filters */}
  <div className="flex gap-4 mb-6">
    <div className="flex-1 relative">
      <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Tafuta maudhui..."
        className="w-full h-12 pl-10 pr-4 bg-white border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none"
      />
    </div>
    <select
      value={selectedSubject}
      onChange={e => setSelectedSubject(e.target.value)}
      className="h-12 px-4 bg-white border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none"
    >
      <option value="all">Masomo Yote</option>
      {subjects.map(s => (
        <option key={s.id} value={s.id}>{s.name.sw}</option>
      ))}
    </select>
  </div>

  {/* Content Table */}
  <div className="bg-white border border-[#E5E0D8]">
    <table className="w-full">
      <thead>
        <tr className="bg-[#FAF7F0] border-b border-[#E5E0D8]">
          <th className="text-left p-4 text-sm font-medium text-[#6B7280]">Kichwa</th>
          <th className="text-left p-4 text-sm font-medium text-[#6B7280]">Somo</th>
          <th className="text-left p-4 text-sm font-medium text-[#6B7280]">Kiwango</th>
          <th className="text-left p-4 text-sm font-medium text-[#6B7280]">Aina</th>
          <th className="text-right p-4 text-sm font-medium text-[#6B7280]">Vitendo</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#E5E0D8]">
        {filteredLessons.map(lesson => {
          const subject = subjects.find(s => s.id === lesson.subjectId);
          const contentTypes = [
            lesson.content && 'Maandishi',
            lesson.videoUrl && 'Video',
            lesson.audioSrc && 'Sauti',
          ].filter(Boolean).join(', ');

          return (
            <tr key={lesson.id} className="hover:bg-[#FAF7F0] transition-colors">
              <td className="p-4">
                <p className="font-medium text-[#1C1C1C]">{lesson.title.sw}</p>
                <p className="text-xs text-[#6B7280]">{lesson.slug}</p>
              </td>
              <td className="p-4 text-sm">{subject?.name.sw}</td>
              <td className="p-4">
                <span className="text-xs bg-[#1B4332]/10 text-[#1B4332] px-2 py-1">
                  {lesson.levelId}
                </span>
              </td>
              <td className="p-4 text-sm text-[#6B7280]">{contentTypes}</td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={() => { setEditingLesson(lesson); setIsFormOpen(true); }}
                    className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#C9A84C] transition-colors"
                    aria-label="Hariri"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(lesson.id)}
                    className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#9B2335] transition-colors"
                    aria-label="Futa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    {filteredLessons.length === 0 && (
      <div className="p-8 text-center">
        <p className="text-[#6B7280]">Hakuna maudhui yaliyopatikana</p>
      </div>
    )}
  </div>

  {/* Content Form Modal */}
  {isFormOpen && (
    <div className="fixed inset-0 bg-[#1C1C1C]/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <ContentForm
          initialData={editingLesson || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </div>
    </div>
  )}
</div>
```

**Delete Handler:**
```typescript
const handleDelete = (lessonId: string) => {
  if (confirm('Una uhakika unataka kufuta somo hili?')) {
    // Remove from lessons array
    const updated = lessons.filter(l => l.id !== lessonId);
    // Update state (in real app, call API)
    console.log('Deleted lesson:', lessonId);
  }
};
```

---

## ContentEditor Component

**File:** `src/components/admin/ContentEditor.tsx`

**Purpose:** Tiptap rich text editor for creating/editing lesson content in Swahili, Arabic, and English.

**Props:**
```typescript
interface ContentEditorProps {
  initialContent?: object; // Tiptap JSON
  onChange: (content: object) => void;
  language: 'sw' | 'ar' | 'en';
}
```

**Dependencies:**
- `useEditor`, `EditorContent` from `@tiptap/react`
- `StarterKit` from `@tiptap/starter-kit`
- `TextAlign` from `@tiptap/extension-text-align`
- `Bold`, `Italic`, `Heading1`, `Heading2`, `Quote`, `List`, `ListOrdered`, `AlignLeft`, `AlignRight`, `Undo`, `Redo` from `lucide-react`

**State:**
```typescript
const editor = useEditor({
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: language === 'ar' ? ['right', 'center', 'left'] : ['left', 'center', 'right'],
      defaultAlignment: language === 'ar' ? 'right' : 'left',
    }),
  ],
  content: initialContent || {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
  },
  onUpdate: ({ editor }) => {
    onChange(editor.getJSON());
  },
});
```

**Toolbar Buttons:**
```typescript
const toolbarButtons = [
  { icon: Bold, action: () => editor?.chain().focus().toggleBold().run(), isActive: editor?.isActive('bold') },
  { icon: Italic, action: () => editor?.chain().focus().toggleItalic().run(), isActive: editor?.isActive('italic') },
  { icon: Heading1, action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor?.isActive('heading', { level: 2 }) },
  { icon: Heading2, action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor?.isActive('heading', { level: 3 }) },
  { icon: Quote, action: () => editor?.chain().focus().toggleBlockquote().run(), isActive: editor?.isActive('blockquote') },
  { icon: List, action: () => editor?.chain().focus().toggleBulletList().run(), isActive: editor?.isActive('bulletList') },
  { icon: ListOrdered, action: () => editor?.chain().focus().toggleOrderedList().run(), isActive: editor?.isActive('orderedList') },
  { icon: AlignLeft, action: () => editor?.chain().focus().setTextAlign('left').run(), isActive: editor?.isActive({ textAlign: 'left' }) },
  { icon: AlignRight, action: () => editor?.chain().focus().setTextAlign('right').run(), isActive: editor?.isActive({ textAlign: 'right' }) },
  { icon: Undo, action: () => editor?.chain().focus().undo().run() },
  { icon: Redo, action: () => editor?.chain().focus().redo().run() },
];
```

**JSX Structure:**

```tsx
<div className="border border-[#E5E0D8] bg-white">
  {/* Toolbar */}
  <div className="flex items-center gap-1 p-2 bg-[#FAF7F0] border-b border-[#E5E0D8] flex-wrap">
    {toolbarButtons.map((button, index) => (
      <button
        key={index}
        onClick={button.action}
        className={`w-8 h-8 flex items-center justify-center transition-colors ${
          button.isActive
            ? 'bg-[#1B4332] text-[#FAF7F0]'
            : 'text-[#6B7280] hover:text-[#1C1C1C] hover:bg-[#FAF7F0]'
        }`}
      >
        <button.icon size={16} />
      </button>
    ))}
  </div>

  {/* Editor Area */}
  <div
    className={`p-4 min-h-[400px] ${
      language === 'ar' ? 'font-arabic text-right' : 'font-sans text-left'
    }`}
    dir={language === 'ar' ? 'rtl' : 'ltr'}
  >
    <EditorContent editor={editor} />
  </div>
</div>
```

**Note:** Editor is editable (not read-only) in admin context.

---

## ContentForm Component

**File:** `src/components/admin/ContentForm.tsx`

**Purpose:** Form for creating/editing lessons. Multilingual fields, subject/level selection, media URLs.

**Props:**
```typescript
interface ContentFormProps {
  initialData?: Lesson;
  onSubmit: (data: Partial<Lesson>) => void;
  onCancel: () => void;
}
```

**State:**
```typescript
const [title, setTitle] = useState({
  sw: initialData?.title.sw || '',
  ar: initialData?.title.ar || '',
  en: initialData?.title.en || '',
});
const [slug, setSlug] = useState(initialData?.slug || '');
const [subjectId, setSubjectId] = useState<SubjectId>(initialData?.subjectId || 'quran');
const [levelId, setLevelId] = useState<LevelId>(initialData?.levelId || 'awali');
const [content, setContent] = useState({
  sw: initialData?.content.sw || { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
  ar: initialData?.content.ar || { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
  en: initialData?.content.en || { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
});
const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');
const [audioSrc, setAudioSrc] = useState(initialData?.audioSrc || '');
const [duration, setDuration] = useState(initialData?.duration || '');
const [activeTab, setActiveTab] = useState<'sw' | 'ar' | 'en'>('sw');
```

**JSX Structure:**

```tsx
<form onSubmit={handleSubmit} className="space-y-6 p-6">
  {/* Title inputs */}
  <div>
    <div className="flex border-b border-[#E5E0D8] mb-4">
      {(['sw', 'ar', 'en'] as const).map(lang => (
        <button
          key={lang}
          type="button"
          onClick={() => setActiveTab(lang)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === lang
              ? 'bg-[#1B4332] text-[#FAF7F0]'
              : 'bg-white text-[#6B7280] hover:text-[#1C1C1C]'
          }`}
        >
          {lang === 'sw' ? 'Kiswahili' : lang === 'ar' ? 'العربية' : 'English'}
        </button>
      ))}
    </div>
    
    <input
      type="text"
      value={title[activeTab]}
      onChange={e => setTitle({ ...title, [activeTab]: e.target.value })}
      className={`w-full h-12 px-3 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none ${
        activeTab === 'ar' ? 'font-arabic text-right' : ''
      }`}
      dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
      placeholder={activeTab === 'sw' ? 'Kichwa cha somo' : activeTab === 'ar' ? 'عنوان الدرس' : 'Lesson title'}
      required
    />
  </div>

  {/* Slug */}
  <div>
    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Slug (URL)</label>
    <input
      type="text"
      value={slug}
      onChange={e => setSlug(e.target.value)}
      className="w-full h-12 px-3 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none"
      placeholder="jina-la-somo"
      required
    />
  </div>

  {/* Subject & Level */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Somo</label>
      <select
        value={subjectId}
        onChange={e => setSubjectId(e.target.value as SubjectId)}
        className="w-full h-12 px-3 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none"
      >
        {subjects.map(s => (
          <option key={s.id} value={s.id}>{s.name.sw}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Kiwango</label>
      <select
        value={levelId}
        onChange={e => setLevelId(e.target.value as LevelId)}
        className="w-full h-12 px-3 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none"
      >
        {levels.map(l => (
          <option key={l.id} value={l.id}>{l.name.sw}</option>
        ))}
      </select>
    </div>
  </div>

  {/* Rich Text Editor */}
  <div>
    <label className="block text-sm font-medium text-[#1C1C1C] mb-2">Maudhui</label>
    <ContentEditor
      initialContent={content[activeTab]}
      onChange={newContent => setContent({ ...content, [activeTab]: newContent })}
      language={activeTab}
    />
  </div>

  {/* Media URLs */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Video URL</label>
      <input
        type="url"
        value={videoUrl}
        onChange={e => setVideoUrl(e.target.value)}
        className="w-full h-12 px-3 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none"
        placeholder="https://youtube.com/embed/..."
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Audio URL</label>
      <input
        type="url"
        value={audioSrc}
        onChange={e => setAudioSrc(e.target.value)}
        className="w-full h-12 px-3 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none"
        placeholder="https://..."
      />
    </div>
  </div>

  {/* Duration */}
  <div>
    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Muda (HH:MM)</label>
    <input
      type="text"
      value={duration}
      onChange={e => setDuration(e.target.value)}
      className="w-full h-12 px-3 bg-[#FAF7F0] border border-[#E5E0D8] text-[#1C1C1C] focus:border-[#C9A84C] focus:outline-none"
      placeholder="15:00"
    />
  </div>

  {/* Submit */}
  <div className="flex gap-4">
    <button
      type="submit"
      className="h-12 px-8 bg-[#1B4332] text-[#FAF7F0] font-medium hover:bg-[#143828] transition-colors"
    >
      Hifadhi
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="h-12 px-8 bg-white border border-[#E5E0D8] text-[#1C1C1C] font-medium hover:bg-[#FAF7F0] transition-colors"
    >
      Ghairi
    </button>
  </div>
</form>
```

**Submit Handler:**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit({
    title,
    slug,
    subjectId,
    levelId,
    content,
    videoUrl: videoUrl || undefined,
    audioSrc: audioSrc || undefined,
    duration,
  });
};
```

---

## Future Admin Features (Not in Phase 1)

These are documented for future implementation but NOT built in Phase 1:

1. **User Management** (`/admin/users`)
   - Table of all users
   - Role assignment
   - Level access management
   - User deletion

2. **Quiz Builder**
   - Create quizzes for lessons
   - Multiple choice, true/false, fill-in-blank
   - Quiz assignment to lessons

3. **Certificate Designer**
   - Certificate templates
   - Completion criteria
   - PDF generation

4. **Analytics Dashboard**
   - User engagement charts
   - Lesson completion rates
   - Subject popularity
   - Time spent per lesson

5. **Bulk Import/Export**
   - CSV import for lessons
   - JSON export for backup
   - Media batch upload

6. **Comment Moderation**
   - Review user comments
   - Approve/reject
   - Report management

7. **Notification System**
   - Announcement creation
   - Push notification setup
   - Email notification templates

## Media Upload Placeholder

Phase 1 uses URL inputs only for media. Future phases will add:

```typescript
// Future: FileUpload component
interface FileUploadProps {
  accept: string; // "image/*", "audio/*"
  maxSize: number; // bytes
  onUpload: (url: string) => void;
}
```

Integration with:
- Cloudinary for images
- AWS S3 for audio files
- Max file size: 50MB audio, 5MB images
- File type validation: MP3, WAV for audio; JPG, PNG, WebP for images
"""