content_md = """# Ahlusunna Content Schema — Types & Mock Data

## TypeScript Types (Exact)

Place all types in `src/types/index.ts`:

```typescript
// src/types/index.ts

export type Language = 'sw' | 'ar' | 'en';

export type ContentType = 'text' | 'video' | 'audio';

export type LevelId = 'awali' | 'kati' | 'endelea';

export type SubjectId = 'quran' | 'hadith' | 'fiqhi' | 'tawhidi' | 'sira';

export type UserRole = 'public' | 'learner' | 'admin';

export type AudioType = 'lecture' | 'recitation';

export interface MultilingualText {
  sw: string;
  ar: string;
  en: string;
}

export interface MultilingualContent {
  sw: object; // Tiptap JSON document
  ar: object;
  en: object;
}

export interface Level {
  id: LevelId;
  name: MultilingualText;
  description: MultilingualText;
  order: number;
  isPublic: boolean;
}

export interface Subject {
  id: SubjectId;
  name: MultilingualText;
  slug: string;
  description: MultilingualText;
  icon: string; // SVG component identifier
  levelId: LevelId;
  order: number;
}

export interface Lesson {
  id: string;
  title: MultilingualText;
  slug: string;
  subjectId: SubjectId;
  levelId: LevelId;
  order: number;
  content: MultilingualContent;
  videoUrl?: string;
  audioSrc?: string;
  audioType?: AudioType;
  duration: string; // Format: "MM:SS" or "HH:MM:SS"
  thumbnail?: string;
  createdAt: string; // ISO date: "YYYY-MM-DD"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  levelAccess: LevelId[];
  progress: string[]; // Array of completed lesson slugs
}

export interface AudioTrack {
  id: string;
  title: string;
  subject: string;
  src: string;
  type: AudioType;
  duration: number; // Seconds
}
```

## Mock Data — Levels

Place in `src/data/seed.ts`:

```typescript
export const levels: Level[] = [
  {
    id: 'awali',
    name: {
      sw: 'Hatua ya Awali',
      ar: 'المستوى المبتدئ',
      en: 'Beginner Level',
    },
    description: {
      sw: 'Mafunzo ya kwanza kwa wanaoanza kujifunza Uislamu. Hapa utapata misingi ya dini ya Kisilamu.',
      ar: 'الدروس الأولى لمن يبدأ في تعلم الإسلام. هنا ستجد أساسيات الدين الإسلامي.',
      en: 'First lessons for those beginning to learn Islam. Here you will find the fundamentals of the Islamic faith.',
    },
    order: 1,
    isPublic: true,
  },
  {
    id: 'kati',
    name: {
      sw: 'Hatua ya Kati',
      ar: 'المستوى المتوسط',
      en: 'Intermediate Level',
    },
    description: {
      sw: 'Mafunzo ya kina zaidi kwa wale ambao tayari wana uelewa wa misingi ya Uislamu.',
      ar: 'دروس أعمق لمن لديهم بالفعل فهم لأساسيات الإسلام.',
      en: 'More in-depth lessons for those who already have an understanding of Islamic fundamentals.',
    },
    order: 2,
    isPublic: false,
  },
  {
    id: 'endelea',
    name: {
      sw: 'Kuendelea',
      ar: 'المستوى المتقدم',
      en: 'Advanced Level',
    },
    description: {
      sw: 'Mafunzo ya juu kwa wanafunzi waliokomaa katika taaluma za Kiislamu.',
      ar: 'دروس متقدمة للطلاب المتمرسين في العلوم الإسلامية.',
      en: 'Advanced lessons for students well-versed in Islamic sciences.',
    },
    order: 3,
    isPublic: false,
  },
];
```

## Mock Data — Subjects (Beginner Level)

```typescript
export const subjects: Subject[] = [
  {
    id: 'quran',
    name: {
      sw: "Qur'an",
      ar: 'القرآن الكريم',
      en: 'The Quran',
    },
    slug: 'quran',
    description: {
      sw: 'Kitabu kitakatifu cha Uislamu kilicho teremshwa kwa Mtume Muhammad (SAW).',
      ar: 'الكتاب المقدس في الإسلام الذي أُنزل على النبي محمد ﷺ.',
      en: 'The holy book of Islam revealed to Prophet Muhammad (PBUH).',
    },
    icon: 'book-open',
    levelId: 'awali',
    order: 1,
  },
  {
    id: 'hadith',
    name: {
      sw: 'Hadith',
      ar: 'الحديث الشريف',
      en: 'Hadith',
    },
    slug: 'hadith',
    description: {
      sw: 'Maneno na matendo ya Mtume Muhammad (SAW) yanayotumika kama miongozo ya maisha.',
      ar: 'أقوال وأفعال النبي محمد ﷺ المستخدمة كإرشاد للحياة.',
      en: 'The words and actions of Prophet Muhammad (PBUH) used as life guidance.',
    },
    icon: 'scroll',
    levelId: 'awali',
    order: 2,
  },
  {
    id: 'fiqhi',
    name: {
      sw: 'Fiqhi',
      ar: 'الفقه الإسلامي',
      en: 'Islamic Jurisprudence',
    },
    slug: 'fiqhi',
    description: {
      sw: 'Sheria na kanuni za Uislamu zinazosimamia maisha ya kila siku ya Muislamu.',
      ar: 'القوانين والأحكام الإسلامية التي تنظم الحياة اليومية للمسلم.',
      en: 'The laws and rules of Islam governing the daily life of a Muslim.',
    },
    icon: 'mosque',
    levelId: 'awali',
    order: 3,
  },
  {
    id: 'tawhidi',
    name: {
      sw: 'Tawhidi',
      ar: 'التوحيد',
      en: 'Islamic Monotheism',
    },
    slug: 'tawhidi',
    description: {
      sw: 'Imani katika Mungu mmoja na uhusiano wake na viumbe vyake.',
      ar: 'الإيمان بالإله الواحد وعلاقته بخلقه.',
      en: 'Belief in one God and His relationship with His creation.',
    },
    icon: 'star',
    levelId: 'awali',
    order: 4,
  },
  {
    id: 'sira',
    name: {
      sw: 'Sira',
      ar: 'السيرة النبوية',
      en: "Prophet's Biography",
    },
    slug: 'sira',
    description: {
      sw: 'Hadithi ya maisha ya Mtume Muhammad (SAW) kutoka kuzaliwa hadi kufa kwake.',
      ar: 'قصة حياة النبي محمد ﷺ من مولده إلى وفاته.',
      en: 'The story of Prophet Muhammad\'s life from birth to death.',
    },
    icon: 'person-standing',
    levelId: 'awali',
    order: 5,
  },
];
```

## Mock Data — Lessons (15 Total, 3 Per Subject)

### Qur'an Lessons

```typescript
export const lessons: Lesson[] = [
  {
    id: 'quran-1',
    title: {
      sw: 'Utangulizi wa Qur\'an',
      ar: 'مقدمة في القرآن الكريم',
      en: 'Introduction to the Quran',
    },
    slug: 'introduction-to-quran',
    subjectId: 'quran',
    levelId: 'awali',
    order: 1,
    content: {
      sw: {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Utangulizi wa Qur\'an' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Qur\'an ni kitabu kitakatifu cha Uislamu kilicho teremshwa kwa Mtume Muhammad (SAW) kupitia malaika Jibril (AS) kwa muda wa miaka ishirini na tatu.' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Qur\'an kina sura 114 na aya 6,236. Kila sura ina jina lake mwenyewe na maudhui yake maalum.' }],
          },
          {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: 'Sura ya Kwanza: Al-Fatiha' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Sura ya Al-Fatiha ni sura ya kwanza katika Qur\'an na inaitwa piga "Ummul-Kitab" (Mama wa Kitabu). Ina aya saba pekee na ni sura muhimu zaidi kwani Muslamu anaisoma katika kila rakaa ya sala.' }],
          },
          {
            type: 'blockquote',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' }],
              },
            ],
          },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'مقدمة في القرآن الكريم' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'القرآن الكريم هو الكتاب المقدس في الإسلام الذي أُنزل على النبي محمد ﷺ بواسطة جبريل عليه السلام على مدى ثلاثة وعشرين عامًا.' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'يتكون القرآن من 114 سورة و 6,236 آية. كل سورة لها اسمها الخاص وموضوعها المميز.' }],
          },
          {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: 'سورة الفاتحة' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'سورة الفاتحة هي السورة الأولى في القرآن وتُسمى أيضًا "أم الكتاب". تتكون من سبع آيات فقط وهي السورة الأكثر أهمية لأن المسلم يقرأها في كل ركعة من الصلاة.' }],
          },
        ],
      },
      en: {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2 },
            content: [{ type: 'text', text: 'Introduction to the Quran' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'The Quran is the holy book of Islam revealed to Prophet Muhammad (PBUH) through the angel Gabriel (AS) over a period of twenty-three years.' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'The Quran contains 114 surahs and 6,236 verses. Each surah has its own name and distinct subject matter.' }],
          },
          {
            type: 'heading',
            attrs: { level: 3 },
            content: [{ type: 'text', text: 'The First Surah: Al-Fatiha' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Surah Al-Fatiha is the first surah in the Quran and is also called "Ummul-Kitab" (Mother of the Book). It contains only seven verses and is the most important surah as a Muslim recites it in every rak\'ah of prayer.' }],
          },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    audioType: 'lecture',
    duration: '15:00',
    thumbnail: '/thumbnails/quran-intro.jpg',
    createdAt: '2024-01-15',
  },
  {
    id: 'quran-2',
    title: {
      sw: 'Makosa ya Tafsiri ya Qur\'an',
      ar: 'أحكام تجويد القرآن',
      en: 'Quranic Recitation Rules',
    },
    slug: 'quranic-recitation-rules',
    subjectId: 'quran',
    levelId: 'awali',
    order: 2,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Makosa ya Tafsiri ya Qur\'an' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Kusoma Qur\'an kwa ufanisi kunahitaji kuzingatia kanuni za tajwid. Tajwid ni sayansi ya kusoma Qur\'an kwa maumbile yake sahihi.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'أحكام تجويد القرآن' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'قراءة القرآن بإتقان تتطلب اتباع قواعد التجويد. التجويد هو علم قراءة القرآن بشكله الصحيح.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Quranic Recitation Rules' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Reading the Quran proficiently requires following the rules of tajwid. Tajwid is the science of reading the Quran in its proper form.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    audioType: 'recitation',
    duration: '22:30',
    thumbnail: '/thumbnails/tajwid.jpg',
    createdAt: '2024-01-20',
  },
  {
    id: 'quran-3',
    title: {
      sw: 'Maana ya Sura Al-Ikhlas',
      ar: 'معاني سورة الإخلاص',
      en: 'Meaning of Surah Al-Ikhlas',
    },
    slug: 'meaning-of-surah-ikhlas',
    subjectId: 'quran',
    levelId: 'awali',
    order: 3,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Maana ya Sura Al-Ikhlas' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Sura Al-Ikhlas ni sura fupi yenye aya nne tu, lakini ina umuhimu mkubwa katika Uislamu. Inasimamia imani ya Muislamu katika Mungu mmoja.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'معاني سورة الإخلاص' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'سورة الإخلاص هي سورة قصيرة تتكون من أربع آيات فقط، لكنها ذات أهمية كبيرة في الإسلام. تؤكد إيمان المسلم بالإله الواحد.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Meaning of Surah Al-Ikhlas' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Surah Al-Ikhlas is a short surah of only four verses, but it holds great importance in Islam. It affirms the Muslim belief in one God.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    audioType: 'lecture',
    duration: '18:45',
    thumbnail: '/thumbnails/ikhlas.jpg',
    createdAt: '2024-01-25',
  },
```

### Hadith Lessons

```typescript
  {
    id: 'hadith-1',
    title: {
      sw: 'Utangulizi wa Hadith',
      ar: 'مقدمة في الحديث',
      en: 'Introduction to Hadith',
    },
    slug: 'introduction-to-hadith',
    subjectId: 'hadith',
    levelId: 'awali',
    order: 1,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Utangulizi wa Hadith' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Hadith ni taarifa zinazohusu maneno, matendo, au ridha ya Mtume Muhammad (SAW). Hadith ni chanzo cha pili cha sheria ya Kiislamu baada ya Qur\'an.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'مقدمة في الحديث' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'الحديث هو الخبر المتعلق بأقوال أو أفعال أو موافقات النبي محمد ﷺ. الحديث هو المصدر الثاني للشريعة الإسلامية بعد القرآن.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Introduction to Hadith' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Hadith refers to reports concerning the words, actions, or approval of Prophet Muhammad (PBUH). Hadith is the second source of Islamic law after the Quran.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    audioType: 'lecture',
    duration: '20:00',
    thumbnail: '/thumbnails/hadith-intro.jpg',
    createdAt: '2024-02-01',
  },
  {
    id: 'hadith-2',
    title: {
      sw: 'Hadith 40 za Nawawi',
      ar: 'الأربعون النووية',
      en: 'The 40 Hadith of Nawawi',
    },
    slug: 'forty-hadith-of-nawawi',
    subjectId: 'hadith',
    levelId: 'awali',
    order: 2,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Hadith 40 za Nawawi' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Imam Nawawi aliichagua hadith 40 muhimu zaidi katika Uislamu. Hadith hizi zinafunza misingi ya imani, ibada, na maadili.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'الأربعون النووية' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'اختار الإمام النووي أربعين حديثًا هي الأكثر أهمية في الإسلام. هذه الأحاديث تعلم أساسيات الإيمان والعبادة والأخلاق.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'The 40 Hadith of Nawawi' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Imam Nawawi selected the 40 most important hadith in Islam. These hadith teach the fundamentals of faith, worship, and morality.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    audioType: 'lecture',
    duration: '25:00',
    thumbnail: '/thumbnails/nawawi.jpg',
    createdAt: '2024-02-05',
  },
  {
    id: 'hadith-3',
    title: {
      sw: 'Hadith za Maadili',
      ar: 'أحاديث الأخلاق',
      en: 'Hadith on Morality',
    },
    slug: 'hadith-on-morality',
    subjectId: 'hadith',
    levelId: 'awali',
    order: 3,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Hadith za Maadili' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Mtume Muhammad (SAW) alitufundisha maadili mema katika kila sekta ya maisha. Hadith hizi zinatuonyesha jinsi ya kuwa Muislamu mwema.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'أحاديث الأخلاق' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'علمنا النبي محمد ﷺ الأخلاق الحميدة في كل مجال من مجالات الحياة. هذه الأحاديث تُرينا كيف نكون مسلمًا صالحًا.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Hadith on Morality' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Prophet Muhammad (PBUH) taught us good morals in every aspect of life. These hadith show us how to be a righteous Muslim.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    audioType: 'lecture',
    duration: '19:15',
    thumbnail: '/thumbnails/morality.jpg',
    createdAt: '2024-02-10',
  },
```

### Fiqhi Lessons

```typescript
  {
    id: 'fiqhi-1',
    title: {
      sw: 'Mafunzo ya Tahara',
      ar: 'أحكام الطهارة',
      en: 'Rules of Purification',
    },
    slug: 'rules-of-purification',
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 1,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Mafunzo ya Tahara' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Tahara (usafi) ni misingi wa ibada katika Uislamu. Bila usafi, sala zetu hazikubaliwi.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'أحكام الطهارة' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'الطهارة هي أساس العبادة في الإسلام. بدون طهارة، لا تقبل صلاتنا.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Rules of Purification' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Purification (tahara) is the foundation of worship in Islam. Without purification, our prayers are not accepted.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    audioType: 'lecture',
    duration: '21:30',
    thumbnail: '/thumbnails/tahara.jpg',
    createdAt: '2024-02-15',
  },
  {
    id: 'fiqhi-2',
    title: {
      sw: 'Mafunzo ya Sala',
      ar: 'أحكام الصلاة',
      en: 'Rules of Prayer',
    },
    slug: 'rules-of-prayer',
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 2,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Mafunzo ya Sala' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Sala ni nguzo ya Uislamu. Ni faradhi kwa kila Muislamu mwenye akili timamu na umri wa kufika.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'أحكام الصلاة' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'الصلاة هي ركن الإسلام. هي فرض على كل مسلم بالغ عاقل.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Rules of Prayer' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Prayer is the pillar of Islam. It is obligatory for every Muslim of sound mind who has reached puberty.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    audioType: 'lecture',
    duration: '28:00',
    thumbnail: '/thumbnails/sala.jpg',
    createdAt: '2024-02-20',
  },
  {
    id: 'fiqhi-3',
    title: {
      sw: 'Mafunzo ya Saumu',
      ar: 'أحكام الصيام',
      en: 'Rules of Fasting',
    },
    slug: 'rules-of-fasting',
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 3,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Mafunzo ya Saumu' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Saumu ya mwezi wa Ramadhani ni faradhi kwa kila Muislamu mwenye akili timamu na umri wa kufika.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'أحكام الصيام' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'صيام شهر رمضان فرض على كل مسلم بالغ عاقل.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Rules of Fasting' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Fasting during the month of Ramadan is obligatory for every Muslim of sound mind who has reached puberty.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    audioType: 'lecture',
    duration: '24:00',
    thumbnail: '/thumbnails/saumu.jpg',
    createdAt: '2024-02-25',
  },
```

### Tawhidi Lessons

```typescript
  {
    id: 'tawhidi-1',
    title: {
      sw: 'Maana ya Tawhidi',
      ar: 'معنى التوحيد',
      en: 'Meaning of Tawhid',
    },
    slug: 'meaning-of-tawhid',
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 1,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Maana ya Tawhidi' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Tawhidi ni imani katika Mungu mmoja pekee. Ni misingi ya Uislamu na jambo la kwanza ambalo Mtume (SAW) aliliita watu.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'معنى التوحيد' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'التوحيد هو الإيمان بالإله الواحد الأحد. هو أساس الإسلام وأول ما دعا إليه النبي ﷺ.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Meaning of Tawhid' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Tawhid is the belief in one God alone. It is the foundation of Islam and the first thing the Prophet (PBUH) called people to.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    audioType: 'lecture',
    duration: '17:00',
    thumbnail: '/thumbnails/tawhid-intro.jpg',
    createdAt: '2024-03-01',
  },
  {
    id: 'tawhidi-2',
    title: {
      sw: 'Aina za Tawhidi',
      ar: 'أنواع التوحيد',
      en: 'Types of Tawhid',
    },
    slug: 'types-of-tawhid',
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 2,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Aina za Tawhidi' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Tawhidi imegawanywa katika aina tatu: Tawhidi Rububiyyah (Uumbaji), Tawhidi Uluhiyyah (Ibada), na Tawhidi Asma wa Sifa (Majina na Sifa).' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'أنواع التوحيد' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'ينقسم التوحيد إلى ثلاثة أنواع: توحيد الربوبية (الخلق)، وتوحيد الألوهية (العبادة)، وتوحيد الأسماء والصفات.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Types of Tawhid' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Tawhid is divided into three types: Tawhid Rububiyyah (Lordship/Creation), Tawhid Uluhiyyah (Worship), and Tawhid Asma wa Sifa (Names and Attributes).' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    audioType: 'lecture',
    duration: '23:30',
    thumbnail: '/thumbnails/tawhid-types.jpg',
    createdAt: '2024-03-05',
  },
  {
    id: 'tawhidi-3',
    title: {
      sw: 'Shirk na Jinsi ya Kuepuka',
      ar: 'الشرك وكيفية تجنبه',
      en: 'Shirk and How to Avoid It',
    },
    slug: 'shirk-and-how-to-avoid',
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 3,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Shirk na Jinsi ya Kuepuka' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Shirk ni kuunganisha washirika na Mungu katika ibada au sifa zake. Ni dhambi kubwa zaidi katika Uislamu.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'الشرك وكيفية تجنبه' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'الشرك هو إشراك غير الله في العبادة أو صفاته. هو أكبر ذنب في الإسلام.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Shirk and How to Avoid It' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Shirk is associating partners with God in worship or His attributes. It is the greatest sin in Islam.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    audioType: 'lecture',
    duration: '26:00',
    thumbnail: '/thumbnails/shirk.jpg',
    createdAt: '2024-03-10',
  },
```

### Sira Lessons

```typescript
  {
    id: 'sira-1',
    title: {
      sw: 'Kuzaliwa kwa Mtume (SAW)',
      ar: 'مولد النبي ﷺ',
      en: 'Birth of the Prophet (PBUH)',
    },
    slug: 'birth-of-the-prophet',
    subjectId: 'sira',
    levelId: 'awali',
    order: 1,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Kuzaliwa kwa Mtume (SAW)' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Mtume Muhammad (SAW) alizaliwa katika mji wa Makkah mnamo mwaka 571 BK (Kabla ya Kristo). Jina lake la kwanza lilikuwa Muhammad, na jina la pili lilikuwa Ahmad.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'مولد النبي ﷺ' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'وُلد النبي محمد ﷺ في مدينة مكة المكرمة عام 571 م. اسمه الأول محمد، واسمه الثاني أحمد.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Birth of the Prophet (PBUH)' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Prophet Muhammad (PBUH) was born in the city of Makkah in the year 571 CE. His first name was Muhammad, and his second name was Ahmad.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    audioType: 'lecture',
    duration: '16:30',
    thumbnail: '/thumbnails/birth.jpg',
    createdAt: '2024-03-15',
  },
  {
    id: 'sira-2',
    title: {
      sw: 'Utoaji wa Ujumbe wa Uislamu',
      ar: 'بعثة النبي ﷺ',
      en: 'The Prophetic Mission',
    },
    slug: 'the-prophetic-mission',
    subjectId: 'sira',
    levelId: 'awali',
    order: 2,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Utoaji wa Ujumbe wa Uislamu' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Mtume Muhammad (SAW) alianza kupokea ujumbe wa Uislamu akiwa na umri wa miaka arobaini. Ujumbe wa kwanza ulikuwa "Iqra" (Soma) kutoka Sura Al-Alaq.' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'بعثة النبي ﷺ' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'بدأ النبي محمد ﷺ في تلقي الرسالة الإسلامية وهو في الأربعين من عمره. الرسالة الأولى كانت "اقرأ" من سورة العلق.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'The Prophetic Mission' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Prophet Muhammad (PBUH) began receiving the message of Islam at the age of forty. The first message was "Iqra" (Read) from Surah Al-Alaq.' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    audioType: 'lecture',
    duration: '27:00',
    thumbnail: '/thumbnails/mission.jpg',
    createdAt: '2024-03-20',
  },
  {
    id: 'sira-3',
    title: {
      sw: 'Hijra ya Madina',
      ar: 'الهجرة إلى المدينة',
      en: 'The Hijra to Madinah',
    },
    slug: 'hijra-to-madinah',
    subjectId: 'sira',
    levelId: 'awali',
    order: 3,
    content: {
      sw: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Hijra ya Madina' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'Hijra ni uhamiaji wa Mtume Muhammad (SAW) kutoka Makkah kwenda Madina (Yathrib) mnamo mwaka 622 BK. Tukio hili ndilo lilioanza kalenda ya Kiislamu (Hijri).' }] },
        ],
      },
      ar: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'الهجرة إلى المدينة' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'الهجرة هي هجرة النبي محمد ﷺ من مكة إلى المدينة (يثرب) عام 622 م. هذا الحدث هو بداية التقويم الهجري.' }] },
        ],
      },
      en: {
        type: 'doc',
        content: [
          { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'The Hijra to Madinah' }] },
          { type: 'paragraph', content: [{ type: 'text', text: 'The Hijra is the migration of Prophet Muhammad (PBUH) from Makkah to Madinah (Yathrib) in the year 622 CE. This event marks the beginning of the Islamic calendar (Hijri).' }] },
        ],
      },
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    audioType: 'lecture',
    duration: '25:30',
    thumbnail: '/thumbnails/hijra.jpg',
    createdAt: '2024-03-25',
  },
];
```

## Mock Data — Hardcoded Users

```typescript
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Msimamizi',
    email: 'admin@ahlusunna.info',
    role: 'admin',
    levelAccess: ['awali', 'kati', 'endelea'],
    progress: [],
  },
  {
    id: 'learner-1',
    name: 'Mwanafunzi',
    email: 'mwanafunzi@ahlusunna.info',
    role: 'learner',
    levelAccess: ['awali', 'kati'],
    progress: ['introduction-to-quran', 'introduction-to-hadith'],
  },
  {
    id: 'learner-2',
    name: 'Mwanajumuia',
    email: 'mwanajumuia@ahlusunna.info',
    role: 'learner',
    levelAccess: ['awali', 'kati', 'endelea'],
    progress: ['introduction-to-quran', 'introduction-to-hadith', 'rules-of-purification'],
  },
];

export const mockCredentials: Record<string, string> = {
  'admin@ahlusunna.info': 'admin123',
  'mwanafunzi@ahlusunna.info': 'user123',
  'mwanajumuia@ahlusunna.info': 'user123',
};
```

## Helper Functions

```typescript
// src/data/seed.ts — export these functions

export const getLessonsBySubject = (subjectId: SubjectId): Lesson[] => {
  return lessons.filter(l => l.subjectId === subjectId).sort((a, b) => a.order - b.order);
};

export const getLessonsByLevel = (levelId: LevelId): Lesson[] => {
  return lessons.filter(l => l.levelId === levelId).sort((a, b) => a.order - b.order);
};

export const getLessonBySlug = (slug: string): Lesson | undefined => {
  return lessons.find(l => l.slug === slug);
};

export const getSubjectById = (id: SubjectId): Subject | undefined => {
  return subjects.find(s => s.id === id);
};

export const getSubjectBySlug = (slug: string): Subject | undefined => {
  return subjects.find(s => s.slug === slug);
};

export const canAccessLevel = (user: User | null, levelId: LevelId): boolean => {
  if (levelId === 'awali') return true;
  if (!user) return false;
  return user.levelAccess.includes(levelId);
};

export const canAccessLesson = (user: User | null, lesson: Lesson): boolean => {
  return canAccessLevel(user, lesson.levelId);
};

export const getProgressPercentage = (user: User | null, subjectId?: SubjectId): number => {
  if (!user) return 0;
  const relevantLessons = subjectId
    ? lessons.filter(l => l.subjectId === subjectId)
    : lessons;
  if (relevantLessons.length === 0) return 0;
  const completed = relevantLessons.filter(l => user.progress.includes(l.slug)).length;
  return Math.round((completed / relevantLessons.length) * 100);
};

export const isLessonCompleted = (user: User | null, slug: string): boolean => {
  if (!user) return false;
  return user.progress.includes(slug);
};

export const getLevelById = (id: LevelId): Level | undefined => {
  return levels.find(l => l.id === id);
};
```

## Content Gating Logic

```typescript
// Route guard function for lesson pages

export const checkLessonAccess = (
  lesson: Lesson,
  user: User | null
): { allowed: boolean; redirectTo?: string; reason?: string } => {
  if (lesson.levelId === 'awali') {
    return { allowed: true };
  }
  
  if (!user) {
    return { 
      allowed: false, 
      redirectTo: '/login',
      reason: 'login_required'
    };
  }
  
  if (!user.levelAccess.includes(lesson.levelId)) {
    return { 
      allowed: false, 
      redirectTo: '/subjects',
      reason: 'level_not_unlocked'
    };
  }
  
  return { allowed: true };
};
```

## i18n Translation Files

### public/locales/sw.json (Swahili UI)

```json
{
  "navigation": {
    "home": "Nyumbani",
    "subjects": "Masomo",
    "about": "Kuhusu",
    "contact": "Wasiliana",
    "login": "Ingia",
    "register": "Sajili",
    "logout": "Toka",
    "dashboard": "Msimamizi",
    "progress": "Maendeleo"
  },
  "home": {
    "hero_title": "Jifunze Uislamu kwa Mpangilio",
    "hero_subtitle": "Ahlusunwa ni jukwaa la kujifunza dini ya Kisilamu kwa hatua. Anza na mafunzo ya awali ya Qur'an, Hadith, Fiqhi, Tawhidi, na Sira.",
    "cta_start": "Anza Sasa",
    "cta_learn_more": "Soma Zaidi",
    "levels_title": "Viwango vya Kujifunza"
  },
  "subjects": {
    "title": "Masomo Yote",
    "beginner_title": "Hatua ya Awali",
    "beginner_description": "Mafunzo ya kwanza kwa wanaoanza",
    "lessons_count": "masomo {{count}}",
    "progress": "Maendeleo"
  },
  "lesson": {
    "written_tab": "Maandishi",
    "video_tab": "Video",
    "audio_tab": "Sauti",
    "listen_now": "Sikiliza Sasa",
    "now_playing": "Inacheza",
    "mark_complete": "Weka kama imekamilika",
    "completed": "Imekamilika",
    "not_available": "Hakuna"
  },
  "auth": {
    "login_title": "Ingia",
    "register_title": "Sajili Akaunti",
    "email_label": "Barua pepe",
    "password_label": "Nenosiri",
    "name_label": "Jina",
    "confirm_password_label": "Thibitisha nenosiri",
    "remember_me": "Nikumbuke",
    "submit_login": "Ingia",
    "submit_register": "Sajili",
    "no_account": "Huna akaunti?",
    "has_account": "Tayari una akaunti?",
    "error_invalid_credentials": "Barua pepe au nenosiri si sahihi",
    "error_email_exists": "Barua pepe tayari imesajiliwa",
    "error_password_match": "Nenosiri hazilingani",
    "error_password_length": "Nenosiri lazima iwe na herufi 6 au zaidi"
  },
  "levels": {
    "beginner": "Hatua ya Awali",
    "intermediate": "Hatua ya Kati",
    "advanced": "Kuendelea",
    "locked": "Ingia kujiunga",
    "login_to_access": "Ingia kujiunga"
  },
  "common": {
    "loading": "Inapakia...",
    "error": "Kuna hitilafu",
    "retry": "Jaribu tena",
    "close": "Funga",
    "save": "Hifadhi",
    "cancel": "Ghairi",
    "edit": "Hariri",
    "delete": "Futa",
    "search": "Tafuta",
    "no_results": "Hakuna matokeo"
  }
}
```

### public/locales/ar.json (Arabic UI)

```json
{
  "navigation": {
    "home": "الرئيسية",
    "subjects": "الدروس",
    "about": "عن المنصة",
    "contact": "تواصل معنا",
    "login": "تسجيل الدخول",
    "register": "إنشاء حساب",
    "logout": "خروج",
    "dashboard": "لوحة التحكم",
    "progress": "التقدم"
  },
  "home": {
    "hero_title": "تعلم الإسلام بشكل منهجي",
    "hero_subtitle": "أهل السنة منصة لتعلم الإسلام على مراحل. ابدأ بدروس المبتدئين في القرآن والحديث والفقه والتوحيد والسيرة.",
    "cta_start": "ابدأ الآن",
    "cta_learn_more": "اقرأ المزيد",
    "levels_title": "مستويات التعلم"
  },
  "subjects": {
    "title": "جميع الدروس",
    "beginner_title": "المستوى المبتدئ",
    "beginner_description": "الدروس الأولى للمبتدئين",
    "lessons_count": "{{count}} دروس",
    "progress": "التقدم"
  },
  "lesson": {
    "written_tab": "المحتوى المكتوب",
    "video_tab": "فيديو",
    "audio_tab": "صوت",
    "listen_now": "استمع الآن",
    "now_playing": "قيد التشغيل",
    "mark_complete": "وضع علامة اكتمال",
    "completed": "مكتمل",
    "not_available": "غير متوفر"
  },
  "auth": {
    "login_title": "تسجيل الدخول",
    "register_title": "إنشاء حساب جديد",
    "email_label": "البريد الإلكتروني",
    "password_label": "كلمة المرور",
    "name_label": "الاسم",
    "confirm_password_label": "تأكيد كلمة المرور",
    "remember_me": "تذكرني",
    "submit_login": "دخول",
    "submit_register": "إنشاء حساب",
    "no_account": "ليس لديك حساب؟",
    "has_account": "لديك حساب بالفعل؟",
    "error_invalid_credentials": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    "error_email_exists": "البريد الإلكتروني مسجل بالفعل",
    "error_password_match": "كلمتا المرور غير متطابقتين",
    "error_password_length": "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
  },
  "levels": {
    "beginner": "المستوى المبتدئ",
    "intermediate": "المستوى المتوسط",
    "advanced": "المستوى المتقدم",
    "locked": "مقفل",
    "login_to_access": "سجل الدخول للوصول"
  },
  "common": {
    "loading": "جاري التحميل...",
    "error": "حدث خطأ",
    "retry": "إعادة المحاولة",
    "close": "إغلاق",
    "save": "حفظ",
    "cancel": "إلغاء",
    "edit": "تعديل",
    "delete": "حذف",
    "search": "بحث",
    "no_results": "لا توجد نتائج"
  }
}
```

### public/locales/en.json (English UI)

```json
{
  "navigation": {
    "home": "Home",
    "subjects": "Subjects",
    "about": "About",
    "contact": "Contact",
    "login": "Login",
    "register": "Register",
    "logout": "Logout",
    "dashboard": "Dashboard",
    "progress": "Progress"
  },
  "home": {
    "hero_title": "Learn Islam Systematically",
    "hero_subtitle": "Ahlusunna is a platform for learning Islam in stages. Start with beginner lessons in Quran, Hadith, Fiqh, Tawhid, and Sira.",
    "cta_start": "Start Now",
    "cta_learn_more": "Learn More",
    "levels_title": "Learning Levels"
  },
  "subjects": {
    "title": "All Subjects",
    "beginner_title": "Beginner Level",
    "beginner_description": "First lessons for beginners",
    "lessons_count": "{{count}} lessons",
    "progress": "Progress"
  },
  "lesson": {
    "written_tab": "Written",
    "video_tab": "Video",
    "audio_tab": "Audio",
    "listen_now": "Listen Now",
    "now_playing": "Now Playing",
    "mark_complete": "Mark as Complete",
    "completed": "Completed",
    "not_available": "Not Available"
  },
  "auth": {
    "login_title": "Login",
    "register_title": "Create Account",
    "email_label": "Email",
    "password_label": "Password",
    "name_label": "Name",
    "confirm_password_label": "Confirm Password",
    "remember_me": "Remember me",
    "submit_login": "Login",
    "submit_register": "Register",
    "no_account": "Don't have an account?",
    "has_account": "Already have an account?",
    "error_invalid_credentials": "Invalid email or password",
    "error_email_exists": "Email already registered",
    "error_password_match": "Passwords do not match",
    "error_password_length": "Password must be at least 6 characters"
  },
  "levels": {
    "beginner": "Beginner",
    "intermediate": "Intermediate",
    "advanced": "Advanced",
    "locked": "Locked",
    "login_to_access": "Login to access"
  },
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "retry": "Retry",
    "close": "Close",
    "save": "Save",
    "cancel": "Cancel",
    "edit": "Edit",
    "delete": "Delete",
    "search": "Search",
    "no_results": "No results found"
  }
}
```

## Future API Replacement Guide

When connecting to Django backend:

1. Create `src/lib/api.ts` with fetch wrappers
2. Replace `seed.ts` exports with API calls using SWR or React Query
3. Keep TypeScript types — they map directly to Django serializers
4. Auth: Replace localStorage JWT with http-only cookies set by Django
5. Content: Tiptap JSON format stays identical between frontend and backend
6. Images: Replace placeholder thumbnails with Cloudinary/AWS S3 URLs
7. Audio: Replace placeholder MP3s with actual lecture files
"""

with open("output/ahlusunna-content-schema.md", "w", encoding="utf-8") as f:
    f.write(content_md)

print("Rewritten: output/ahlusunna-content-schema.md")