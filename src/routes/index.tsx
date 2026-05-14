import { createFileRoute, redirect } from '@tanstack/react-router'
import { BookOpen, CheckCircle2, Languages, ListChecks } from 'lucide-react'

import { HeroSection } from '#/components/home/HeroSection'
import { useLanguage } from '#/hooks/useLanguage'
import type { Language } from '#/types'

export const Route = createFileRoute('/')({ 
  component: HomePage,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated && context.auth.user) {
      if (context.auth.user.role === 'admin') {
        throw redirect({ to: '/dashboard/admin' })
      } else if (context.auth.user.role === 'moderator') {
        throw redirect({ to: '/dashboard/moderator' })
      } else if (context.auth.user.role === 'author') {
        throw redirect({ to: '/dashboard/author' })
      } else if (context.auth.user.role === 'student') {
        throw redirect({ to: '/subjects' })
      }
    }
  }
})

const pageCopy: Record<
  Language,
  {
    aboutLabel: string
    aboutTitle: string
    aboutBody: string
    points: Array<{ title: string; body: string }>
    lessonsLabel: string
    lessonsTitle: string
    lessonsBody: string
    subjects: string[]
  }
> = {
  en: {
    aboutLabel: 'About the system',
    aboutTitle: 'Ahlusunna keeps Islamic learning simple, ordered, and accessible.',
    aboutBody:
      'The platform gives Swahili-speaking Muslims a clear path to study the core subjects of the religion without guessing where to begin.',
    points: [
      {
        title: 'Start with the foundation',
        body: 'Beginner lessons are open to everyone and arranged by subject.',
      },
      {
        title: 'Continue by level',
        body: 'Intermediate and Advanced levels are prepared for students who are ready to go deeper.',
      },
      {
        title: 'Learn in three languages',
        body: 'Use Swahili first, then switch to English or Arabic whenever needed.',
      },
    ],
    lessonsLabel: 'Lessons',
    lessonsTitle: "One path for Qur'an, Hadith, Fiqh, Tawhid, and Sirah.",
    lessonsBody:
      'Each subject is presented as organised lessons so a learner can move from basic understanding to stronger practice step by step.',
    subjects: ["Qur'an", 'Hadith', 'Fiqh', 'Tawhid', 'Sirah'],
  },
  sw: {
    aboutLabel: 'Kuhusu mfumo',
    aboutTitle: 'Ahlusunna inarahisisha kujifunza Uislamu kwa mpangilio.',
    aboutBody:
      'Mfumo huu unampa Muislamu anayezungumza Kiswahili njia iliyo wazi ya kujifunza masomo ya msingi ya dini bila kuchanganyikiwa pa kuanzia.',
    points: [
      {
        title: 'Anza na msingi',
        body: 'Masomo ya hatua ya awali yanapatikana kwa kila mtu na yamepangwa kwa kila somo.',
      },
      {
        title: 'Endelea kwa hatua',
        body: 'Hatua ya kati na ya juu zimeandaliwa kwa mwanafunzi aliye tayari kujifunza Uislamu kwa kina zaidi.',
      },
      {
        title: 'Jifunze kwa lugha tatu',
        body: 'Tumia Kiswahili kwanza, kisha badili kwenda Kiingereza au Kiarabu unapohitaji.',
      },
    ],
    lessonsLabel: 'Masomo',
    lessonsTitle: "Mfumo uliopangiliwa wa kujifunza Qur'an, Hadith, Fiqhi, Tawhidi, na Sira.",
    lessonsBody:
      'Kila somo limeandaliwa kwa mpangilio wa hatua kwa hatua, ili mwanafunzi ajenge msingi mzuri na kuendelea kuelewa Uislamu kwa kina zaidi.',
    subjects: ["Qur'an", 'Hadith', 'Fiqhi', 'Tawhidi', 'Sira'],
  },
  ar: {
    aboutLabel: 'عن النظام',
    aboutTitle: 'أهل السنة يجعل التعلم الإسلامي بسيطًا ومنظمًا ومتاحًا.',
    aboutBody:
      'تمنح المنصة المسلمين الناطقين بالسواحيلية مسارًا واضحًا لدراسة أهم علوم الدين دون حيرة في نقطة البداية.',
    points: [
      {
        title: 'ابدأ بالأساس',
        body: 'دروس المبتدئين مفتوحة للجميع ومنظمة حسب المادة.',
      },
      {
        title: 'تابع حسب المستوى',
        body: 'المستوى المتوسط والمتقدم معدان للطلاب المستعدين للتعمق.',
      },
      {
        title: 'تعلم بثلاث لغات',
        body: 'استخدم السواحيلية أولًا، ثم انتقل إلى الإنجليزية أو العربية عند الحاجة.',
      },
    ],
    lessonsLabel: 'الدروس',
    lessonsTitle: 'مسار واحد للقرآن والحديث والفقه والتوحيد والسيرة.',
    lessonsBody:
      'كل مادة تقدم على شكل دروس منظمة حتى ينتقل المتعلم من الفهم الأساسي إلى ممارسة أقوى خطوة بعد خطوة.',
    subjects: ['القرآن', 'الحديث', 'الفقه', 'التوحيد', 'السيرة'],
  },
}

const pointIcons = [BookOpen, ListChecks, Languages]

function SystemIntro() {
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]

  return (
    <section id="about" className="bg-background py-16 lg:py-24">
      <div className="container-main">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,1fr)] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold text-accent">{copy.aboutLabel}</p>
            <h2 className="max-w-3xl font-decorative text-[32px] font-bold leading-tight text-foreground md:text-[44px]">
              {copy.aboutTitle}
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-lg leading-8 text-muted-foreground">{copy.aboutBody}</p>
            <div className="grid gap-5">
              {copy.points.map((point, index) => {
                const Icon = pointIcons[index]

                return (
                  <div
                    key={point.title}
                    className="grid grid-cols-[44px_1fr] gap-4 border-t border-border pt-5 first:border-t-0 first:pt-0"
                  >
                    <span className="flex size-11 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-decorative text-xl font-bold text-foreground">
                        {point.title}
                      </h3>
                      <p className="mt-1 leading-7 text-muted-foreground">{point.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LessonsOverview() {
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]

  return (
    <section id="lessons" className="bg-white py-16 lg:py-24">
      <div className="container-main">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-semibold text-accent">{copy.lessonsLabel}</p>
            <h2 className="max-w-4xl font-decorative text-[32px] font-bold leading-tight text-foreground md:text-[46px]">
              {copy.lessonsTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {copy.lessonsBody}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {copy.subjects.map((subject) => (
              <div
                key={subject}
                className="flex items-center gap-3 border border-border bg-background px-4 py-3 text-base font-medium text-foreground"
              >
                <CheckCircle2 aria-hidden="true" className="size-5 text-accent" />
                {subject}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <SystemIntro />
      <LessonsOverview />
    </>
  )
}
