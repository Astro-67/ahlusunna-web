import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import {
  BookOpen,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react'


import { useLanguage } from '#/hooks/useLanguage'
import { cn } from '#/lib/utils'

const footerContent = {
  en: {
    tagline: 'Structured Islamic Learning for Every Muslim',
    description:
      "Ahlusunna is a structured Islamic learning platform that helps Muslims study Qur'an, Hadith, Fiqh, Tawhid, and Sirah through clear lessons, audio, and video — from foundational knowledge to deeper understanding.",
    start: 'Start Learning',
    quickLinks: 'Explore',
    learning: 'Learning Areas',
    contactTitle: 'Contact',
    home: 'Home',
    subjects: 'Subjects',
    about: 'About',
    contact: 'Contact',
    quran: "Qur'an",
    hadith: 'Hadith',
    fiqhi: 'Fiqh',
    tawhidi: 'Tawhid',
    sira: 'Sirah',
    email: 'info@ahlusunna.info',
    location: 'Zanzibar, Tanzania',
    whatsapp: 'WhatsApp Support',
    quote: 'Seeking knowledge is a path to goodness.',
    rights: 'All rights reserved.',
    builtFor: 'Built for the Ummah',
  },
  sw: {
    tagline: 'Jifunze Uislamu kwa Mpangilio na Uelewa',
    description:
      "Ahlusunna ni jukwaa la kujifunza Uislamu kwa mpangilio, linalowasaidia Waislamu kusoma Qur'an, Hadith, Fiqhi, Tawhidi, na Sira kupitia masomo yaliyo wazi, sauti, na video — kuanzia maarifa ya msingi hadi ufahamu wa kina zaidi.",
    start: 'Anza Kujifunza',
    quickLinks: 'Kurasa Muhimu',
    learning: 'Masomo',
    contactTitle: 'Mawasiliano',
    home: 'Nyumbani',
    subjects: 'Masomo',
    about: 'Kuhusu',
    contact: 'Wasiliana',
    quran: "Qur'an",
    hadith: 'Hadith',
    fiqhi: 'Fiqhi',
    tawhidi: 'Tawhidi',
    sira: 'Sira',
    email: 'info@ahlusunna.info',
    location: 'Zanzibar, Tanzania',
    whatsapp: 'Msaada wa WhatsApp',
    quote: 'Kutafuta elimu ni njia ya kheri.',
    rights: 'Haki zote zimehifadhiwa.',
    builtFor: 'Imejengwa kwa ajili ya Ummah',
  },
  ar: {
    tagline: 'تعلم إسلامي منظم لكل مسلم',
    description:
      'أهل السنة هي منصة تعليمية إسلامية منظمة تساعد المسلمين على دراسة القرآن والحديث والفقه والتوحيد والسيرة من خلال دروس واضحة وصوت وفيديو — من المعرفة الأساسية إلى الفهم الأعمق.',
    start: 'ابدأ التعلم',
    quickLinks: 'روابط مهمة',
    learning: 'المواد',
    contactTitle: 'التواصل',
    home: 'الرئيسية',
    subjects: 'المواد',
    about: 'عن المنصة',
    contact: 'اتصل بنا',
    quran: 'القرآن',
    hadith: 'الحديث',
    fiqhi: 'الفقه',
    tawhidi: 'التوحيد',
    sira: 'السيرة',
    email: 'info@ahlusunna.info',
    location: 'زنجبار، تنزانيا',
    whatsapp: 'دعم واتساب',
    quote: 'طلب العلم طريق إلى الخير.',
    rights: 'جميع الحقوق محفوظة.',
    builtFor: 'بُنيت لخدمة الأمة',
  },
} as const

function FooterPattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={cn('pointer-events-none text-accent/10', className)}
      aria-hidden="true"
    >
      <path
        d="M80 8L132 38V98L80 152L28 98V38L80 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M80 32L112 50V88L80 122L48 88V50L80 32Z"
        stroke="currentColor"
      />
      <path
        d="M80 55L96 65V84L80 101L64 84V65L80 55Z"
        stroke="currentColor"
      />
      <circle cx="80" cy="78" r="7" stroke="currentColor" />
    </svg>
  )
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
      {children}
    </h3>
  )
}

function FooterLink({
  to,
  children,
}: {
  to: string
  children: ReactNode
}) {
  return (
    <li>
      <a
        href={to}
        className="group inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors duration-200 hover:text-accent"
      >
        <span className="h-px w-4 bg-primary-foreground/25 transition-all duration-200 group-hover:w-6 group-hover:bg-accent" />
        {children}
      </a>
    </li>
  )
}

function ContactItem({
  icon,
  children,
  href,
}: {
  icon: ReactNode
  children: ReactNode
  href?: string
}) {
  const className =
    'flex items-center gap-3 text-sm text-primary-foreground/70 transition-colors duration-200 hover:text-accent'

  if (href) {
    return (
      <a href={href} className={className}>
        <span className="flex size-9 items-center justify-center rounded-lg border border-accent/20 bg-white/5 text-accent">
          {icon}
        </span>
        <span>{children}</span>
      </a>
    )
  }

  return (
    <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
      <span className="flex size-9 items-center justify-center rounded-lg border border-accent/20 bg-white/5 text-accent">
        {icon}
      </span>
      <span>{children}</span>
    </div>
  )
}

export function Footer() {
  const { currentLang } = useLanguage()
  const content = footerContent[currentLang]
  const isArabic = currentLang === 'ar'

  const quickLinks = [
    { label: content.home, to: '/' },
    { label: content.subjects, to: '#' },
    { label: content.about, to: '#' },
    { label: content.contact, to: '#' },
  ]

  const subjectLinks = [
    content.quran,
    content.hadith,
    content.fiqhi,
    content.tawhidi,
    content.sira,
  ]

  return (
    <footer
      className="relative overflow-hidden border-t border-accent/20 bg-primary text-primary-foreground"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <FooterPattern className="absolute -right-16 top-10 size-72" />
      <FooterPattern className="absolute -bottom-24 -left-16 size-80 rotate-180" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.16),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

      <div className="container-main relative z-10">
        {/* Top CTA */}
        <div className="grid gap-6 border-b border-white/10 py-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div>
            <h2 className="max-w-2xl font-decorative text-2xl font-semibold leading-snug text-white md:text-3xl">
              {content.tagline}
            </h2>
          </div>

          <div className="flex lg:justify-end">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/90"
            >
              {content.start}
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="mb-6 inline-flex rounded-2xl border border-accent/25 bg-white/10 backdrop-blur-sm">
              <img
                src="/Ahlusunna-logo.png"
                alt="Ahlusunna"
                className="h-20 w-auto object-contain lg:h-24"
              />
            </div>

            <p className="max-w-md text-sm leading-7 text-primary-foreground/70">
              {content.description}
            </p>

            <blockquote className="mt-6 max-w-md rounded-2xl border border-accent/20 bg-white/[0.04] p-5">
              <p className="font-arabic text-xl leading-relaxed text-white/90">
                {content.quote}
              </p>
            </blockquote>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <FooterHeading>{content.quickLinks}</FooterHeading>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <FooterLink key={link.to} to={link.to}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div className="lg:col-span-2">
            <FooterHeading>{content.learning}</FooterHeading>
            <ul className="space-y-3">
              {subjectLinks.map((subject) => (
                <li key={subject}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors duration-200 hover:text-accent"
                  >
                    <BookOpen className="size-4 text-accent/80" />
                    {subject}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading>{content.contactTitle}</FooterHeading>

            <div className="space-y-3">
              <ContactItem href="mailto:info@ahlusunna.info" icon={<Mail className="size-4" />}>
                {content.email}
              </ContactItem>

              <ContactItem icon={<MapPin className="size-4" />}>
                {content.location}
              </ContactItem>

              <ContactItem
                href="https://wa.me/255777810700"
                icon={<MessageCircle className="size-4" />}
              >
                {content.whatsapp}
              </ContactItem>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Ahlusunna. {content.rights}
          </p>

          <p className="inline-flex items-center gap-1.5">
            {content.builtFor}
            <Heart className="size-3.5 text-accent" />
          </p>
        </div>
      </div>
    </footer>
  )
}
