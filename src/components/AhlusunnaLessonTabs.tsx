import { useState } from 'react'
import {
  BookMarked,
  BookOpen,
  ChevronRight,
  Clock3,
  FileText,
  Headphones,
  Landmark,
  Mic2,
  Play,
  ScrollText,
  ShieldCheck,
  Video,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type LessonTab = 'written' | 'video' | 'audio'

type Subject = {
  id: string
  name: string
  description: string
  icon: LucideIcon
  stats: {
    lessons: number
    videos: number
    audios: number
  }
  lessons: {
    written: {
      title: string
      arabic: string
      explanation: string
      readingTime: string
    }
    video: {
      title: string
      description: string
      duration: string
    }
    audio: {
      title: string
      description: string
      duration: string
      progress: number
    }
  }
}

const subjects: Subject[] = [
  {
    id: 'quran',
    name: "Qur'an",
    description: 'Kusoma, kuhifadhi, na kuelewa ujumbe wa Qur’an hatua kwa hatua.',
    icon: BookOpen,
    stats: { lessons: 12, videos: 6, audios: 8 },
    lessons: {
      written: {
        title: "Utangulizi wa Somo la Qur'an",
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        explanation:
          'Katika somo hili, utajifunza adabu za kusoma Qur’an, umuhimu wa kuanza kwa jina la Mwenyezi Mungu, na namna ya kujenga ratiba rahisi ya kujifunza kila siku.',
        readingTime: 'Dakika 7 za kusoma',
      },
      video: {
        title: "Namna ya Kuanza Kusoma Qur'an",
        description:
          'Mwongozo wa awali wa kusoma kwa utulivu, kusikiliza matamshi sahihi, na kurejea aya fupi kwa mpangilio.',
        duration: 'Dakika 18',
      },
      audio: {
        title: 'Usomaji wa Aya Fupi kwa Mwanzoni',
        description:
          'Sikiliza mfano wa usomaji taratibu unaosaidia kuzoea makhraj na ladha ya kusoma Qur’an kwa heshima.',
        duration: 'Dakika 12',
        progress: 42,
      },
    },
  },
  {
    id: 'hadith',
    name: 'Hadith',
    description: 'Kujifunza maneno na mafundisho ya Mtume ﷺ kwa lugha rahisi.',
    icon: ScrollText,
    stats: { lessons: 10, videos: 5, audios: 7 },
    lessons: {
      written: {
        title: 'Utangulizi wa Hadith',
        arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
        explanation:
          'Somo hili linaeleza maana ya hadith, nafasi yake katika Uislamu, na kwa nini nia njema ni msingi wa ibada na mwenendo wa Muislamu.',
        readingTime: 'Dakika 6 za kusoma',
      },
      video: {
        title: 'Hadith ni Nini?',
        description:
          'Utangulizi mfupi kuhusu chanzo cha hadith, namna zinavyotumika, na umuhimu wa kuzichukua kutoka kwa wanazuoni wa kuaminika.',
        duration: 'Dakika 16',
      },
      audio: {
        title: 'Hadith ya Nia na Maelezo Yake',
        description:
          'Muhadhara mfupi unaofafanua namna nia inavyobadilisha thamani ya matendo ya kila siku.',
        duration: 'Dakika 14',
        progress: 58,
      },
    },
  },
  {
    id: 'fiqhi',
    name: 'Fiqhi',
    description: 'Misingi ya ibada, twahara, swala, na mwenendo wa kila siku.',
    icon: Landmark,
    stats: { lessons: 14, videos: 7, audios: 9 },
    lessons: {
      written: {
        title: 'Utangulizi wa Fiqhi ya Mwanzoni',
        arabic: 'الطُّهُورُ شَطْرُ الإِيمَانِ',
        explanation:
          'Utajifunza maana ya fiqhi, umuhimu wa kujua hukumu za msingi, na namna elimu ya twahara inavyomsaidia Muislamu kutekeleza ibada kwa usahihi.',
        readingTime: 'Dakika 8 za kusoma',
      },
      video: {
        title: 'Misingi ya Twahara',
        description:
          'Somo la kuona linalopitia usafi, udhu, na makosa ya kawaida ambayo mwanafunzi wa awali anapaswa kuyaepuka.',
        duration: 'Dakika 22',
      },
      audio: {
        title: 'Maswali ya Kuanza katika Fiqhi',
        description:
          'Majibu ya maswali ya msingi kuhusu twahara, swala, na maandalizi ya ibada kwa mtu anayeanza kujifunza.',
        duration: 'Dakika 19',
        progress: 36,
      },
    },
  },
  {
    id: 'tawhidi',
    name: 'Tawhidi',
    description: 'Kuelewa kumpwekesha Mwenyezi Mungu katika imani na ibada.',
    icon: ShieldCheck,
    stats: { lessons: 11, videos: 6, audios: 8 },
    lessons: {
      written: {
        title: 'Maana ya Tawhidi',
        arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
        explanation:
          'Somo hili linafafanua msingi wa kumpwekesha Mwenyezi Mungu, maana ya ibada, na umuhimu wa kujenga imani sahihi kabla ya kuingia katika masomo mengine.',
        readingTime: 'Dakika 9 za kusoma',
      },
      video: {
        title: 'Tawhidi kwa Lugha Rahisi',
        description:
          'Maelezo ya msingi kuhusu kumpwekesha Mwenyezi Mungu katika rububiyyah, uluhiyyah, na majina na sifa zake.',
        duration: 'Dakika 20',
      },
      audio: {
        title: 'Kalima ya Tawhidi',
        description:
          'Sikiliza ufafanuzi wa kalima ya tawhidi na namna inavyomwongoza Muislamu katika ibada na tabia.',
        duration: 'Dakika 17',
        progress: 64,
      },
    },
  },
  {
    id: 'sira',
    name: 'Sira',
    description: 'Historia ya maisha ya Mtume ﷺ na masomo ya kuiga mwenendo wake.',
    icon: BookMarked,
    stats: { lessons: 9, videos: 5, audios: 6 },
    lessons: {
      written: {
        title: 'Utangulizi wa Sira ya Mtume ﷺ',
        arabic: 'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',
        explanation:
          'Utajifunza kwa nini maisha ya Mtume ﷺ ni mwongozo wa vitendo, na namna ya kusoma matukio ya sira kwa adabu, elimu, na mazingatio.',
        readingTime: 'Dakika 7 za kusoma',
      },
      video: {
        title: 'Kwa Nini Tujifunze Sira?',
        description:
          'Somo la kuanza linaloonyesha faida za kujua maisha ya Mtume ﷺ katika imani, ibada, familia, na tabia.',
        duration: 'Dakika 15',
      },
      audio: {
        title: 'Masomo ya Mwanzo kutoka Sira',
        description:
          'Muhadhara wa sauti unaopitia mafunzo ya subira, ukweli, na uaminifu kutoka maisha ya Mtume ﷺ.',
        duration: 'Dakika 13',
        progress: 48,
      },
    },
  },
]

const lessonTabs: Array<{
  id: LessonTab
  label: string
  icon: LucideIcon
}> = [
  { id: 'written', label: 'Maandishi', icon: FileText },
  { id: 'video', label: 'Video', icon: Video },
  { id: 'audio', label: 'Sauti', icon: Headphones },
]

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function AhlusunnaLessonTabs() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0].id)
  const [activeTab, setActiveTab] = useState<LessonTab>('written')

  const selectedSubject =
    subjects.find((subject) => subject.id === selectedSubjectId) ?? subjects[0]

  function handleSubjectChange(subjectId: string) {
    setSelectedSubjectId(subjectId)
    setActiveTab('written')
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF7F0] text-[#1C1C1C]">
      <section className="relative isolate border-b border-[#1B4332]/10 px-5 py-12 sm:px-8 lg:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(201,168,76,0.18),transparent_24rem),radial-gradient(circle_at_88%_10%,rgba(27,67,50,0.10),transparent_28rem)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-[linear-gradient(135deg,rgba(27,67,50,0.06)_25%,transparent_25%,transparent_50%,rgba(27,67,50,0.06)_50%,rgba(27,67,50,0.06)_75%,transparent_75%,transparent)] bg-[length:28px_28px] opacity-50" />

        <div className="mx-auto grid max-w-7xl min-w-0 gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="min-w-0 max-w-4xl">
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <img
                src="/Ahlusunna-logo.png"
                alt="Ahlusunna"
                className="h-16 w-16 rounded-xl border border-[#C9A84C]/40 bg-white object-contain p-2 shadow-sm sm:h-20 sm:w-20"
              />
              <div>
                <p className="text-lg font-semibold tracking-wide text-[#1B4332]">
                  ahlusunna.info
                </p>
                <p
                  className="text-2xl leading-none text-[#C9A84C] sm:text-3xl"
                  dir="rtl"
                >
                  العِلْمُ النَّافِعُ
                </p>
              </div>
            </div>

            <span className="inline-flex items-center border border-[#C9A84C]/60 bg-white px-5 py-3 text-base font-bold text-[#1B4332] shadow-sm">
              Hatua ya Awali
            </span>
            <h1 className="mt-7 text-5xl font-black leading-[1.02] tracking-normal text-[#1B4332] sm:text-6xl lg:text-7xl">
              Ahlusunna
            </h1>
            <p className="mt-5 text-2xl font-bold leading-tight text-[#1C1C1C] sm:text-4xl">
              Masomo ya Hatua ya Awali
            </p>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[#1C1C1C]/78 sm:text-2xl sm:leading-10">
              Jifunze Qur’an, Hadith, Fiqhi, Tawhidi, na Sira kwa mpangilio
              rahisi kupitia maandishi, video, na sauti zilizotayarishwa kwa
              mwanafunzi anayeanza.
            </p>
          </div>

          <div className="min-w-0 border-l-4 border-[#C9A84C] bg-white/70 p-6 shadow-sm backdrop-blur">
            <p className="text-lg font-bold text-[#1B4332]">Njia ya kujifunza</p>
            <p className="mt-3 text-lg leading-8 text-[#1C1C1C]/75">
              Chagua somo, badili aina ya maudhui, kisha endelea kwa utaratibu.
              Kila sehemu imeandaliwa ili isomeke vizuri kwenye simu na kompyuta.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl min-w-0 px-5 py-10 sm:px-8 lg:py-14">
        <SubjectSelector
          subjectList={subjects}
          selectedSubjectId={selectedSubject.id}
          onSelectSubject={handleSubjectChange}
        />

        <section className="mt-12 min-w-0 overflow-hidden border border-[#1B4332]/14 bg-white shadow-[0_24px_80px_rgba(27,67,50,0.10)]">
          <div className="border-b border-[#1B4332]/10 bg-[#1B4332] px-6 py-8 text-white sm:px-10 lg:px-12">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0 max-w-3xl">
                <span className="inline-flex border border-[#C9A84C]/70 bg-[#C9A84C]/14 px-4 py-2 text-base font-bold text-[#F5E9BE]">
                  Hatua ya Awali
                </span>
                <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                  {selectedSubject.name}
                </h2>
                <p className="mt-4 text-xl leading-9 text-white/82">
                  {selectedSubject.description}
                </p>
              </div>

              <dl className="grid min-w-0 grid-cols-3 gap-3 sm:min-w-[420px]">
                <StatPill label="Masomo" value={selectedSubject.stats.lessons} />
                <StatPill label="Video" value={selectedSubject.stats.videos} />
                <StatPill label="Sauti" value={selectedSubject.stats.audios} />
              </dl>
            </div>
          </div>

          <div className="bg-[#FAF7F0]/70 px-5 py-5 sm:px-8 lg:px-10">
            <div
              className="grid min-w-0 gap-3 sm:grid-cols-3"
              role="tablist"
              aria-label="Aina za masomo"
            >
              {lessonTabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>

          <div
            id={`lesson-panel-${activeTab}`}
            role="tabpanel"
            className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            {activeTab === 'written' && (
              <WrittenLesson lesson={selectedSubject.lessons.written} />
            )}
            {activeTab === 'video' && (
              <VideoLesson lesson={selectedSubject.lessons.video} />
            )}
            {activeTab === 'audio' && (
              <AudioLesson lesson={selectedSubject.lessons.audio} />
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

function SubjectSelector({
  subjectList,
  selectedSubjectId,
  onSelectSubject,
}: {
  subjectList: Subject[]
  selectedSubjectId: string
  onSelectSubject: (subjectId: string) => void
}) {
  return (
    <section aria-labelledby="subject-selector-title" className="min-w-0">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="subject-selector-title"
            className="text-3xl font-black text-[#1B4332] sm:text-4xl"
          >
            Chagua somo
          </h2>
          <p className="mt-3 text-lg leading-8 text-[#1C1C1C]/70">
            Anza na somo moja, kisha fuata maudhui yake kwa maandishi, video, au
            sauti.
          </p>
        </div>
      </div>

      <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {subjectList.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            isActive={selectedSubjectId === subject.id}
            onClick={() => onSelectSubject(subject.id)}
          />
        ))}
      </div>
    </section>
  )
}

function SubjectCard({
  subject,
  isActive,
  onClick,
}: {
  subject: Subject
  isActive: boolean
  onClick: () => void
}) {
  const Icon = subject.icon

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cx(
        'group min-h-64 min-w-0 border p-6 text-left transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A84C]/45',
        isActive
          ? 'border-[#C9A84C] bg-[#1B4332] text-white shadow-[0_18px_48px_rgba(27,67,50,0.20)]'
          : 'border-[#1B4332]/12 bg-white text-[#1C1C1C] shadow-sm hover:-translate-y-1 hover:border-[#C9A84C]/70 hover:shadow-[0_18px_48px_rgba(27,67,50,0.10)]',
      )}
    >
      <span
        className={cx(
          'flex h-16 w-16 items-center justify-center border transition duration-200',
          isActive
            ? 'border-[#C9A84C]/80 bg-[#C9A84C]/18 text-[#F5E9BE]'
            : 'border-[#C9A84C]/45 bg-[#FAF7F0] text-[#1B4332] group-hover:bg-[#C9A84C]/12',
        )}
      >
        <Icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.8} />
      </span>
      <span className="mt-7 block text-2xl font-black leading-tight">
        {subject.name}
      </span>
      <span
        className={cx(
          'mt-4 block text-lg leading-7',
          isActive ? 'text-white/78' : 'text-[#1C1C1C]/66',
        )}
      >
        {subject.description}
      </span>
      <span
        className={cx(
          'mt-7 inline-flex items-center gap-2 text-base font-bold',
          isActive ? 'text-[#F5E9BE]' : 'text-[#1B4332]',
        )}
      >
        Fungua somo
        <ChevronRight
          aria-hidden="true"
          className="h-5 w-5 transition group-hover:translate-x-1"
        />
      </span>
    </button>
  )
}

function TabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: (typeof lessonTabs)[number]
  isActive: boolean
  onClick: () => void
}) {
  const Icon = tab.icon

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`lesson-panel-${tab.id}`}
      onClick={onClick}
      className={cx(
        'flex min-h-20 min-w-0 items-center justify-center gap-3 border px-5 py-4 text-xl font-black transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A84C]/40',
        isActive
          ? 'border-[#1B4332] bg-[#1B4332] text-white shadow-[0_14px_34px_rgba(27,67,50,0.18)]'
          : 'border-[#1B4332]/12 bg-white text-[#1B4332] hover:border-[#C9A84C]/70 hover:bg-white/80',
      )}
    >
      <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
      {tab.label}
    </button>
  )
}

function WrittenLesson({
  lesson,
}: {
  lesson: Subject['lessons']['written']
}) {
  return (
    <article className="grid min-w-0 gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
      <div className="min-w-0">
        <div className="mb-6 inline-flex items-center gap-3 border border-[#C9A84C]/50 bg-[#FAF7F0] px-4 py-3 text-base font-bold text-[#1B4332]">
          <Clock3 aria-hidden="true" className="h-5 w-5" />
          {lesson.readingTime}
        </div>
        <h3 className="text-4xl font-black leading-tight text-[#1B4332] sm:text-5xl">
          {lesson.title}
        </h3>
        <div
          dir="rtl"
          className="mt-8 border-y border-[#C9A84C]/45 bg-[#FAF7F0] px-5 py-8 text-center font-serif text-4xl leading-relaxed text-[#1B4332] sm:px-8 sm:text-5xl"
        >
          {lesson.arabic}
        </div>
        <p className="mt-8 max-w-4xl text-xl leading-9 text-[#1C1C1C]/78 sm:text-2xl sm:leading-10">
          {lesson.explanation}
        </p>
        <button
          type="button"
          className="mt-9 inline-flex min-h-14 items-center gap-3 bg-[#1B4332] px-7 py-4 text-lg font-black text-white transition duration-200 hover:bg-[#143427] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A84C]/45"
        >
          Soma zaidi
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <aside className="min-w-0 border border-[#1B4332]/12 bg-[#FAF7F0] p-6">
        <p className="text-lg font-black text-[#1B4332]">Mpangilio wa kusoma</p>
        <ol className="mt-5 space-y-4 text-lg leading-8 text-[#1C1C1C]/72">
          <li className="border-l-4 border-[#C9A84C] pl-4">Soma kwa utulivu.</li>
          <li className="border-l-4 border-[#C9A84C] pl-4">
            Rudia maneno muhimu.
          </li>
          <li className="border-l-4 border-[#C9A84C] pl-4">
            Andika swali moja kabla ya kuendelea.
          </li>
        </ol>
      </aside>
    </article>
  )
}

function VideoLesson({ lesson }: { lesson: Subject['lessons']['video'] }) {
  return (
    <article className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:items-center">
      <div className="relative aspect-video overflow-hidden border border-[#1B4332]/18 bg-[#10261D]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.24),transparent_18rem),linear-gradient(135deg,rgba(250,247,240,0.08)_25%,transparent_25%,transparent_50%,rgba(250,247,240,0.08)_50%,rgba(250,247,240,0.08)_75%,transparent_75%,transparent)] bg-[length:auto,34px_34px]" />
        <div className="absolute inset-5 border border-[#C9A84C]/35" />
        <button
          type="button"
          aria-label="Cheza video ya somo"
          className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#C9A84C]/80 bg-[#FAF7F0] text-[#1B4332] shadow-[0_20px_60px_rgba(0,0,0,0.24)] transition duration-200 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A84C]/50 sm:h-28 sm:w-28"
        >
          <Play aria-hidden="true" className="ml-1 h-11 w-11 fill-current" />
        </button>
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 bg-black/28 px-4 py-3 text-white backdrop-blur">
          <span className="text-base font-bold">Video ya mafunzo</span>
          <span className="text-base font-bold text-[#F5E9BE]">
            {lesson.duration}
          </span>
        </div>
      </div>

      <div className="min-w-0">
        <span className="inline-flex items-center gap-3 border border-[#C9A84C]/50 bg-[#FAF7F0] px-4 py-3 text-base font-bold text-[#1B4332]">
          <Video aria-hidden="true" className="h-5 w-5" />
          {lesson.duration}
        </span>
        <h3 className="mt-6 text-4xl font-black leading-tight text-[#1B4332] sm:text-5xl">
          {lesson.title}
        </h3>
        <p className="mt-6 text-xl leading-9 text-[#1C1C1C]/75 sm:text-2xl sm:leading-10">
          {lesson.description}
        </p>
        <button
          type="button"
          className="mt-9 inline-flex min-h-14 items-center gap-3 bg-[#1B4332] px-7 py-4 text-lg font-black text-white transition duration-200 hover:bg-[#143427] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A84C]/45"
        >
          Tazama somo
          <Play aria-hidden="true" className="h-5 w-5 fill-current" />
        </button>
      </div>
    </article>
  )
}

function AudioLesson({ lesson }: { lesson: Subject['lessons']['audio'] }) {
  return (
    <article className="grid min-w-0 gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-center">
      <div className="min-w-0 border border-[#1B4332]/14 bg-[#FAF7F0] p-7">
        <div className="mx-auto flex h-32 w-32 items-center justify-center border border-[#C9A84C]/70 bg-white text-[#1B4332] shadow-sm">
          <Headphones aria-hidden="true" className="h-16 w-16" strokeWidth={1.6} />
        </div>
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: 26 }).map((_, index) => (
            <span
              key={index}
              className={cx(
                'w-1 bg-[#1B4332]',
                index % 5 === 0
                  ? 'h-12'
                  : index % 3 === 0
                    ? 'h-9'
                    : index % 2 === 0
                      ? 'h-7'
                      : 'h-5',
                index > 16 && 'opacity-30',
              )}
            />
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <span className="inline-flex items-center gap-3 border border-[#C9A84C]/50 bg-[#FAF7F0] px-4 py-3 text-base font-bold text-[#1B4332]">
          <Mic2 aria-hidden="true" className="h-5 w-5" />
          {lesson.duration}
        </span>
        <h3 className="mt-6 text-4xl font-black leading-tight text-[#1B4332] sm:text-5xl">
          {lesson.title}
        </h3>
        <p className="mt-6 max-w-4xl text-xl leading-9 text-[#1C1C1C]/75 sm:text-2xl sm:leading-10">
          {lesson.description}
        </p>

        <div className="mt-8 border border-[#1B4332]/12 bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-4 text-base font-bold text-[#1C1C1C]/70">
            <span>00:00</span>
            <span>{lesson.duration}</span>
          </div>
          <div
            className="h-4 overflow-hidden bg-[#FAF7F0]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={lesson.progress}
            aria-label="Maendeleo ya sauti"
          >
            <div
              className="h-full bg-[#C9A84C]"
              style={{ width: `${lesson.progress}%` }}
            />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#1B4332] px-7 py-4 text-lg font-black text-white transition duration-200 hover:bg-[#143427] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A84C]/45"
            >
              Sikiliza sasa
              <Headphones aria-hidden="true" className="h-5 w-5" />
            </button>
            <p className="text-base font-semibold text-[#1C1C1C]/60">
              Kielelezo tu, faili halisi ya sauti itaongezwa baadaye.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-white/14 bg-white/8 px-4 py-4 text-center">
      <dt className="text-sm font-bold uppercase tracking-wider text-[#F5E9BE]">
        {label}
      </dt>
      <dd className="mt-1 text-3xl font-black text-white">{value}</dd>
    </div>
  )
}
