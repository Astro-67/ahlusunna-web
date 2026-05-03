import { Link, createFileRoute } from '@tanstack/react-router'
import { BookOpen, ShieldCheck, Zap } from 'lucide-react'

import { useLanguage } from '#/hooks/useLanguage'
import type { Language } from '#/types'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const pageCopy: Record<Language, any> = {
  sw: {
    breadcrumbHome: 'Nyumbani',
    breadcrumbAbout: 'Kuhusu Sisi',
    eyebrow: 'Ujumbe Wetu',
    title: 'Kufundisha Uislamu kwa Mpangilio na Uelewa',
    subtitle: 'Ahlusunna ni jukwaa la kujifunza Uislamu kwa hatua — kutoka maarifa ya msingi hadi ufahamu wa kina, kupitia masomo yaliyoandaliwa kwa makini na masheikh wenye mafunzo.',
    storyTitle: 'Hadithi Yetu',
    storyP1: 'Ahlusunna ilianzishwa Zanzibar mwaka 2025 kwa lengo moja kuu: kuwapa Waislamu wa Tanzania na ulimwengu njia rahisi, salama, na yenye mpangilio wa kujifunza Uislamu kupitia Kiswahili.',
    storyP2: 'Tumeona kuwa wengi wanataka kujifunza dini yao, lakini wanakosa mwalimu wa kuaminika au mtaala wa hatua kwa hatua. Mtandao umejaa habari, lakini si zote zenye msingi sahihi. Ahlusunna inajaza pengo hili.',
    storyQuote: '"Anayetafuta njia ya elimu, Allah atamrahisishia njia ya Pepo." — Mtume Muhammad ﷺ',
    valuesTitle: 'Maadili Yetu',
    value1Title: 'Msingi Sahihi',
    value1Desc: 'Masomo yote yamepitiwa na masheikh waliosomea Madina au Azhar.',
    value2Title: 'Mpangilio',
    value2Desc: 'Hatua tatu zilizopangwa wazi — kutoka mwanzo hadi ufahamu wa kina.',
    value3Title: 'Bure Milele',
    value3Desc: 'Hatua ya Awali ni bure kabisa. Hakuna malipo, hakuna matangazo.',
    teamTitle: 'Timu Yetu',
    teamDesc: 'Tumebahatika kuwa na timu ya masheikh na walimu wa kujitolea kutoka Tanzania, Kenya, na Saudi Arabia.',
    teamRoleFounder: 'Mwanzilishi',
    teamRoleHead: 'Mwalimu Mkuu',
    teamRoleEditor: 'Mhariri',
    teamRoleEngineer: 'Mhandisi',
    operationsTitle: 'Tunaendaje?',
    operationsDesc: 'Tunajiendesha kwa michango ya watu wa kheri (waqf) na kazi za kujitolea. Hatutangazi bidhaa, hatuuzi data za watumiaji, na hatutoshei kazi zetu kwa ada. Lengo letu pekee ni radhi ya Allah ﷻ.',
    statEyebrow: 'Kwa Nambari',
    stat1: 'wanafunzi wameanza\nsafari yao',
    stat2: 'masomo yaliyochapishwa\nkatika lugha ya Kiswahili',
    stat3: 'masheikh na walimu\nwenye mafunzo',
    stat4: 'bure — sasa na milele,\nkwa Hatua ya Awali',
    ctaText: 'Anza safari yako leo. Hakuna akaunti inayohitajika kwa Hatua ya Awali.',
    ctaBtn: 'Anza Kujifunza →',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbAbout: 'About Us',
    eyebrow: 'Our Mission',
    title: 'Teaching Islam with Structure and Understanding',
    subtitle: 'Ahlusunna is a platform to learn Islam step-by-step — from basic knowledge to deep understanding, through lessons carefully prepared by trained scholars.',
    storyTitle: 'Our Story',
    storyP1: 'Ahlusunna was founded in Zanzibar in 2025 with one main goal: to provide Muslims in Tanzania and the world with an easy, safe, and structured way to learn Islam.',
    storyP2: 'We noticed that many want to learn their religion but lack a reliable teacher or a step-by-step curriculum. The internet is full of information, but not all of it has a sound foundation. Ahlusunna fills this gap.',
    storyQuote: '"Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise." — Prophet Muhammad ﷺ',
    valuesTitle: 'Our Values',
    value1Title: 'Sound Foundation',
    value1Desc: 'All lessons are reviewed by scholars who studied in Madinah or Al-Azhar.',
    value2Title: 'Structure',
    value2Desc: 'Three clearly structured levels — from beginner to advanced understanding.',
    value3Title: 'Free Forever',
    value3Desc: 'The Beginner level is completely free. No payments, no ads.',
    teamTitle: 'Our Team',
    teamDesc: 'We are blessed to have a team of volunteer scholars and teachers from Tanzania, Kenya, and Saudi Arabia.',
    teamRoleFounder: 'Founder',
    teamRoleHead: 'Head Teacher',
    teamRoleEditor: 'Editor',
    teamRoleEngineer: 'Engineer',
    operationsTitle: 'How We Run',
    operationsDesc: 'We operate through charitable donations (waqf) and volunteer work. We do not advertise products, we do not sell user data, and we do not charge fees for our work. Our only goal is the pleasure of Allah ﷻ.',
    statEyebrow: 'By the Numbers',
    stat1: 'students have started\ntheir journey',
    stat2: 'lessons published\nin Swahili and English',
    stat3: 'trained scholars\nand teachers',
    stat4: 'free — now and forever,\nfor the Beginner Level',
    ctaText: 'Start your journey today. No account required for the Beginner Level.',
    ctaBtn: 'Start Learning →',
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbAbout: 'معلومات عنا',
    eyebrow: 'مهمتنا',
    title: 'تعليم الإسلام بمنهجية وفهم',
    subtitle: 'أهل السنة هي منصة لتعلم الإسلام خطوة بخطوة — من المعرفة الأساسية إلى الفهم العميق، من خلال دروس أعدها بعناية علماء متدربون.',
    storyTitle: 'قصتنا',
    storyP1: 'تأسست أهل السنة في زنجبار عام ٢٠٢٥ بهدف رئيسي واحد: تزويد المسلمين في تنزانيا والعالم بطريقة سهلة وآمنة ومنهجية لتعلم الإسلام.',
    storyP2: 'لاحظنا أن الكثيرين يريدون تعلم دينهم لكنهم يفتقرون إلى معلم موثوق أو منهج خطوة بخطوة. الإنترنت مليء بالمعلومات، ولكن ليست كلها مبنية على أساس سليم. أهل السنة تسد هذا الفراغ.',
    storyQuote: '"مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ" — النبي محمد ﷺ',
    valuesTitle: 'قيمنا',
    value1Title: 'أساس سليم',
    value1Desc: 'تتم مراجعة جميع الدروس من قبل علماء درسوا في المدينة المنورة أو الأزهر.',
    value2Title: 'المنهجية',
    value2Desc: 'ثلاثة مستويات واضحة التنظيم — من المبتدئ إلى الفهم المتقدم.',
    value3Title: 'مجاني دائماً',
    value3Desc: 'المستوى المبتدئ مجاني تمامًا. لا مدفوعات، لا إعلانات.',
    teamTitle: 'فريقنا',
    teamDesc: 'لقد أنعم الله علينا بفريق من العلماء والمعلمين المتطوعين من تنزانيا وكينيا والمملكة العربية السعودية.',
    teamRoleFounder: 'المؤسس',
    teamRoleHead: 'المعلم الرئيسي',
    teamRoleEditor: 'محرر',
    teamRoleEngineer: 'مهندس',
    operationsTitle: 'كيف نعمل؟',
    operationsDesc: 'نحن نعمل من خلال التبرعات الخيرية (الوقف) والعمل التطوعي. لا نعلن عن منتجات، ولا نبيع بيانات المستخدمين، ولا نفرض رسومًا على عملنا. هدفنا الوحيد هو مرضاة الله ﷻ.',
    statEyebrow: 'بالأرقام',
    stat1: 'طالباً بدأوا\nرحلتهم',
    stat2: 'دروساً منشورة\nباللغات المختلفة',
    stat3: 'علماء ومعلمين\nمتدربين',
    stat4: 'مجاني — الآن ودائماً،\nللمستوى المبتدئ',
    ctaText: 'ابدأ رحلتك اليوم. لا يتطلب حساب للمستوى المبتدئ.',
    ctaBtn: 'ابدأ التعلم ←',
  }
}

function AboutPage() {
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]

  const isRtl = currentLang === 'ar'

  return (
    <div className="bg-background flex flex-col min-h-[calc(100vh-64px)]" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-8 lg:px-12 lg:py-10">
        {/* Geometric Background */}
        <div className="absolute inset-y-0 right-0 w-100 opacity-[0.06] pointer-events-none hidden md:block">
          <svg viewBox="0 0 400 500" fill="none" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
            <defs>
              <pattern id="geoA" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="20" y="20" width="40" height="40" stroke="#C9A84C" strokeWidth="0.8" fill="none" transform="rotate(45 40 40)" />
                <circle cx="40" cy="40" r="3" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
                <line x1="0" y1="40" x2="20" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="60" y1="40" x2="80" y2="40" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="0" x2="40" y2="20" stroke="#C9A84C" strokeWidth="0.4" />
                <line x1="40" y1="60" x2="40" y2="80" stroke="#C9A84C" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="400" height="500" fill="url(#geoA)" />
          </svg>
        </div>

        <div className="container-main relative z-10">
          <div className="mb-6 flex items-center gap-1.5 text-xs text-[#FAF7F0]/55 font-medium">
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-[#FAF7F0]/90">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {isRtl ? <path d="M21 9l-9-7-9 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/> : <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>}
              </svg>
              {copy.breadcrumbHome}
            </Link>
            <span className="text-[10px] text-[#FAF7F0]/25">{isRtl ? '‹' : '›'}</span>
            <span className="text-[#FAF7F0]/85 font-semibold">{copy.breadcrumbAbout}</span>
          </div>

          <div className="mb-3 text-[11px] font-bold uppercase tracking-widest text-accent">
            {copy.eyebrow}
          </div>
          <h1 className="mb-3 text-[28px] lg:text-[36px] font-bold leading-[1.15] tracking-[-0.02em] text-[#FAF7F0]">
            {copy.title}
          </h1>
          <p className="max-w-150 text-[14px] lg:text-[15px] leading-[1.65] text-[#FAF7F0]/65">
            {copy.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-main px-6 py-12 lg:px-12 lg:py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* Left Column - Prose */}
          <div className="text-[15px] leading-[1.85] text-foreground">
            <h2 className="text-[22px] font-bold tracking-[-0.01em] mt-0 mb-3.5">{copy.storyTitle}</h2>
            <p className="mb-4.5">
              {copy.storyP1}
            </p>
            <p className="mb-4.5">
              {copy.storyP2}
            </p>

            <blockquote className={cn(
              "my-6 bg-[#1B4332]/4 border-accent px-5 py-4 text-[15px] italic text-muted-foreground",
              isRtl ? "border-r-4" : "border-l-4"
            )}>
              {copy.storyQuote}
            </blockquote>

            <h2 className="text-[22px] font-bold tracking-[-0.01em] mt-8 mb-3.5 pt-3.5 border-t border-border">{copy.valuesTitle}</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border">
              <div className="bg-surface p-7 px-6">
                <div className="mb-3.5 flex size-11 items-center justify-center bg-[#1B4332]/5">
                  <ShieldCheck className="size-5 text-primary" strokeWidth={1.6} />
                </div>
                <div className="mb-1.5 text-[15px] font-bold">{copy.value1Title}</div>
                <div className="text-[13px] leading-[1.65] text-muted-foreground">
                  {copy.value1Desc}
                </div>
              </div>
              <div className="bg-surface p-7 px-6">
                <div className="mb-3.5 flex size-11 items-center justify-center bg-[#1B4332]/5">
                  <BookOpen className="size-5 text-primary" strokeWidth={1.6} />
                </div>
                <div className="mb-1.5 text-[15px] font-bold">{copy.value2Title}</div>
                <div className="text-[13px] leading-[1.65] text-muted-foreground">
                  {copy.value2Desc}
                </div>
              </div>
              <div className="bg-surface p-7 px-6">
                <div className="mb-3.5 flex size-11 items-center justify-center bg-[#1B4332]/5">
                  <Zap className="size-5 text-primary" strokeWidth={1.6} />
                </div>
                <div className="mb-1.5 text-[15px] font-bold">{copy.value3Title}</div>
                <div className="text-[13px] leading-[1.65] text-muted-foreground">
                  {copy.value3Desc}
                </div>
              </div>
            </div>

            <h2 className="text-[22px] font-bold tracking-[-0.01em] mt-8 mb-3.5 pt-3.5 border-t border-border">{copy.teamTitle}</h2>
            <p className="mb-4.5">
              {copy.teamDesc}
            </p>
            
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
              {[
                { init: 'SH', name: 'Sh. Hamad', role: copy.teamRoleFounder },
                { init: 'SK', name: 'Sh. Khalid', role: copy.teamRoleHead },
                { init: 'FA', name: 'Fatma A.', role: copy.teamRoleEditor },
                { init: 'YM', name: 'Yusuf M.', role: copy.teamRoleEngineer },
              ].map((member, i) => (
                <div key={i} className="bg-surface p-6 text-center">
                  <div className="mx-auto mb-3.5 flex size-16 items-center justify-center rounded-full border-2 border-accent bg-[#1B4332]/10 text-[18px] font-bold text-primary">
                    {member.init}
                  </div>
                  <div className="text-[14px] font-bold">{member.name}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-accent">
                    {member.role}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-[22px] font-bold tracking-[-0.01em] mt-8 mb-3.5 pt-3.5 border-t border-border">{copy.operationsTitle}</h2>
            <p className="mb-4.5">
              {copy.operationsDesc}
            </p>
          </div>

          {/* Right Column - Side */}
          <aside>
            <div className="bg-surface border border-border p-7">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {copy.statEyebrow}
              </h3>
              
              {[
                { num: '2,400+', label: copy.stat1 },
                { num: '53', label: copy.stat2 },
                { num: '12', label: copy.stat3 },
                { num: '100%', label: copy.stat4 },
              ].map((stat, i) => (
                <div key={i} className="flex items-baseline gap-3 border-b border-border py-3.5 last:border-none">
                  <span className="min-w-15 text-[26px] font-bold tracking-[-0.02em] text-primary">
                    {stat.num}
                  </span>
                  <span className="text-[13px] leading-[1.45] text-muted-foreground whitespace-pre-line">
                    {stat.label}
                  </span>
                </div>
              ))}

              <div className="mt-5 bg-primary p-4.5">
                <p className="mb-3 text-[13px] leading-[1.55] text-[#FAF7F0]/70">
                  {copy.ctaText}
                </p>
                <Link 
                  to="/subjects" 
                  className="flex w-full items-center justify-center bg-accent px-4 py-2.75 text-[13px] font-semibold text-foreground transition-opacity hover:opacity-90"
                >
                  {copy.ctaBtn}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
