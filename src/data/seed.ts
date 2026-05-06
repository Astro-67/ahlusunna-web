import type {
  Lesson,
  Level,
  LevelId,
  MultilingualContent,
  Subject,
  SubjectId,
  TiptapDocument,
  User, Course, Module, Media 
} from '#/types'

const doc = (heading: string, body: string, quote?: string): TiptapDocument => ({
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: heading }],
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: body }],
    },
    ...(quote
      ? [
          {
            type: 'blockquote',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: quote }],
              },
            ],
          },
        ]
      : []),
  ],
})

const content = (
  swHeading: string,
  swBody: string,
  arHeading: string,
  arBody: string,
  enHeading: string,
  enBody: string,
  quote?: string,
): MultilingualContent => ({
  sw: doc(swHeading, swBody, quote),
  ar: doc(arHeading, arBody),
  en: doc(enHeading, enBody),
})

export const levels: Level[] = [
  {
    id: 'awali',
    slug: 'awali',
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
    status: 'active',
  },
  {
    id: 'kati',
    slug: 'kati',
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
    status: 'active',
  },
  {
    id: 'endelea',
    slug: 'endelea',
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
    status: 'active',
  },
]

export const subjects: Subject[] = [
  {
    id: 'quran',
    name: { sw: "Qur'an", ar: 'القرآن الكريم', en: 'The Quran' },
    slug: 'quran',
    description: {
      sw: 'Kitabu kitakatifu cha Uislamu kilicho teremshwa kwa Mtume Muhammad (SAW).',
      ar: 'الكتاب المقدس في الإسلام الذي أُنزل على النبي محمد ﷺ.',
      en: 'The holy book of Islam revealed to Prophet Muhammad (PBUH).',
    },
    icon: 'book-open',
    levelId: 'awali',
    order: 1,
    status: 'active',
  },
  {
    id: 'hadith',
    name: { sw: 'Hadith', ar: 'الحديث الشريف', en: 'Hadith' },
    slug: 'hadith',
    description: {
      sw: 'Maneno na matendo ya Mtume Muhammad (SAW) yanayotumika kama miongozo ya maisha.',
      ar: 'أقوال وأفعال النبي محمد ﷺ المستخدمة كإرشاد للحياة.',
      en: 'The words and actions of Prophet Muhammad (PBUH) used as life guidance.',
    },
    icon: 'scroll',
    levelId: 'awali',
    order: 2,
    status: 'active',
  },
  {
    id: 'fiqhi',
    name: { sw: 'Fiqhi', ar: 'الفقه الإسلامي', en: 'Islamic Jurisprudence' },
    slug: 'fiqhi',
    description: {
      sw: 'Sheria na kanuni za Uislamu zinazosimamia maisha ya kila siku ya Muislamu.',
      ar: 'القوانين والأحكام الإسلامية التي تنظم الحياة اليومية للمسلم.',
      en: 'The laws and rules of Islam governing the daily life of a Muslim.',
    },
    icon: 'mosque',
    levelId: 'awali',
    order: 3,
    status: 'active',
  },
  {
    id: 'tawhidi',
    name: { sw: 'Tawhidi', ar: 'التوحيد', en: 'Islamic Monotheism' },
    slug: 'tawhidi',
    description: {
      sw: 'Imani katika Mungu mmoja na uhusiano wake na viumbe vyake.',
      ar: 'الإيمان بالإله الواحد وعلاقته بخلقه.',
      en: 'Belief in one God and His relationship with His creation.',
    },
    icon: 'star',
    levelId: 'awali',
    order: 4,
    status: 'active',
  },
  {
    id: 'sira',
    name: { sw: 'Sira', ar: 'السيرة النبوية', en: "Prophet's Biography" },
    slug: 'sira',
    description: {
      sw: 'Hadithi ya maisha ya Mtume Muhammad (SAW) kutoka kuzaliwa hadi kufa kwake.',
      ar: 'قصة حياة النبي محمد ﷺ من مولده إلى وفاته.',
      en: "The story of Prophet Muhammad's life from birth to death.",
    },
    icon: 'person-standing',
    levelId: 'awali',
    order: 5,
    status: 'active',
  },
]

export const lessons: Lesson[] = [
  {
    id: 'quran-1',
    title: {
      sw: "Utangulizi wa Qur'an",
      ar: 'مقدمة في القرآن الكريم',
      en: 'Introduction to the Quran',
    },
    slug: 'introduction-to-quran',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-awali',
    order: 1,
    content: content(
      "Utangulizi wa Qur'an",
      "Qur'an ni kitabu kitakatifu cha Uislamu kilicho teremshwa kwa Mtume Muhammad (SAW) kupitia malaika Jibril (AS) kwa muda wa miaka ishirini na tatu. Kina sura 114 na aya 6,236.",
      'مقدمة في القرآن الكريم',
      'القرآن الكريم هو الكتاب المقدس في الإسلام الذي أُنزل على النبي محمد ﷺ بواسطة جبريل عليه السلام على مدى ثلاثة وعشرين عامًا.',
      'Introduction to the Quran',
      'The Quran is the holy book of Islam revealed to Prophet Muhammad (PBUH) through the angel Gabriel (AS) over a period of twenty-three years.',
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '15:00',
    thumbnail: '/thumbnails/quran-intro.jpg',
    status: 'published',
    tags: ['quran', 'introduction', 'tajwid'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: 'quran-2',
    title: {
      sw: "Makosa ya Tafsiri ya Qur'an",
      ar: 'أحكام تجويد القرآن',
      en: 'Quranic Recitation Rules',
    },
    slug: 'quranic-recitation-rules',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-awali',
    order: 2,
    content: content(
      "Makosa ya Tafsiri ya Qur'an",
      "Kusoma Qur'an kwa ufanisi kunahitaji kuzingatia kanuni za tajwid. Tajwid ni sayansi ya kusoma Qur'an kwa maumbile yake sahihi.",
      'أحكام تجويد القرآن',
      'قراءة القرآن بإتقان تتطلب اتباع قواعد التجويد. التجويد هو علم قراءة القرآن بشكله الصحيح.',
      'Quranic Recitation Rules',
      'Reading the Quran proficiently requires following the rules of tajwid. Tajwid is the science of reading the Quran in its proper form.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'recitation',
    duration: '22:30',
    thumbnail: '/thumbnails/tajwid.jpg',
    status: 'published',
    tags: ['quran', 'tajwid', 'recitation'],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
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
    courseId: 'quran-awali',
    order: 3,
    content: content(
      'Maana ya Sura Al-Ikhlas',
      'Sura Al-Ikhlas ni sura fupi yenye aya nne tu, lakini ina umuhimu mkubwa katika Uislamu. Inasimamia imani ya Muislamu katika Mungu mmoja.',
      'معاني سورة الإخلاص',
      'سورة الإخلاص هي سورة قصيرة تتكون من أربع آيات فقط، لكنها ذات أهمية كبيرة في الإسلام. تؤكد إيمان المسلم بالإله الواحد.',
      'Meaning of Surah Al-Ikhlas',
      'Surah Al-Ikhlas is a short surah of only four verses, but it holds great importance in Islam. It affirms the Muslim belief in one God.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '18:45',
    thumbnail: '/thumbnails/ikhlas.jpg',
    status: 'published',
    tags: ['quran', 'surah', 'ikhlas', 'tawhid'],
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25',
  },
  {
    id: 'hadith-1',
    title: { sw: 'Utangulizi wa Hadith', ar: 'مقدمة في الحديث', en: 'Introduction to Hadith' },
    slug: 'introduction-to-hadith',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-awali',
    order: 1,
    content: content(
      'Utangulizi wa Hadith',
      "Hadith ni taarifa zinazohusu maneno, matendo, au ridha ya Mtume Muhammad (SAW). Hadith ni chanzo cha pili cha sheria ya Kiislamu baada ya Qur'an.",
      'مقدمة في الحديث',
      'الحديث هو الخبر المتعلق بأقوال أو أفعال أو موافقات النبي محمد ﷺ. الحديث هو المصدر الثاني للشريعة الإسلامية بعد القرآن.',
      'Introduction to Hadith',
      'Hadith refers to reports concerning the words, actions, or approval of Prophet Muhammad (PBUH). Hadith is the second source of Islamic law after the Quran.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '20:00',
    thumbnail: '/thumbnails/hadith-intro.jpg',
    status: 'published',
    tags: ['hadith', 'introduction'],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01',
  },
  {
    id: 'hadith-2',
    title: { sw: 'Hadith 40 za Nawawi', ar: 'الأربعون النووية', en: 'The 40 Hadith of Nawawi' },
    slug: 'forty-hadith-of-nawawi',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-awali',
    order: 2,
    content: content(
      'Hadith 40 za Nawawi',
      'Imam Nawawi aliichagua hadith 40 muhimu zaidi katika Uislamu. Hadith hizi zinafunza misingi ya imani, ibada, na maadili.',
      'الأربعون النووية',
      'اختار الإمام النووي أربعين حديثًا هي الأكثر أهمية في الإسلام. هذه الأحاديث تعلم أساسيات الإيمان والعبادة والأخلاق.',
      'The 40 Hadith of Nawawi',
      'Imam Nawawi selected the 40 most important hadith in Islam. These hadith teach the fundamentals of faith, worship, and morality.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '25:00',
    thumbnail: '/thumbnails/nawawi.jpg',
    status: 'published',
    tags: ['hadith', 'nawawi', '40-hadith'],
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05',
  },
  {
    id: 'hadith-3',
    title: { sw: 'Hadith za Maadili', ar: 'أحاديث الأخلاق', en: 'Hadith on Morality' },
    slug: 'hadith-on-morality',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-awali',
    order: 3,
    content: content(
      'Hadith za Maadili',
      'Mtume Muhammad (SAW) alitufundisha maadili mema katika kila sekta ya maisha. Hadith hizi zinatuonyesha jinsi ya kuwa Muislamu mwema.',
      'أحاديث الأخلاق',
      'علمنا النبي محمد ﷺ الأخلاق الحميدة في كل مجال من مجالات الحياة. هذه الأحاديث تُرينا كيف نكون مسلمًا صالحًا.',
      'Hadith on Morality',
      'Prophet Muhammad (PBUH) taught us good morals in every aspect of life. These hadith show us how to be a righteous Muslim.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '19:15',
    thumbnail: '/thumbnails/morality.jpg',
    status: 'published',
    tags: ['hadith', 'morality', 'ethics'],
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10',
  },
  {
    id: 'fiqhi-1',
    title: { sw: 'Mafunzo ya Tahara', ar: 'أحكام الطهارة', en: 'Rules of Purification' },
    slug: 'rules-of-purification',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-awali',
    order: 1,
    content: content(
      'Mafunzo ya Tahara',
      'Tahara ni msingi wa ibada katika Uislamu. Bila usafi, sala zetu hazikubaliwi.',
      'أحكام الطهارة',
      'الطهارة هي أساس العبادة في الإسلام. بدون طهارة، لا تقبل صلاتنا.',
      'Rules of Purification',
      'Purification is the foundation of worship in Islam. Without purification, our prayers are not accepted.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '21:30',
    thumbnail: '/thumbnails/tahara.jpg',
    status: 'published',
    tags: ['fiqh', 'tahara', 'purification'],
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
  },
  {
    id: 'fiqhi-2',
    title: { sw: 'Mafunzo ya Sala', ar: 'أحكام الصلاة', en: 'Rules of Prayer' },
    slug: 'rules-of-prayer',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-awali',
    order: 2,
    content: content(
      'Mafunzo ya Sala',
      'Sala ni nguzo ya Uislamu. Ni faradhi kwa kila Muislamu mwenye akili timamu na umri wa kufika.',
      'أحكام الصلاة',
      'الصلاة هي ركن الإسلام. هي فرض على كل مسلم بالغ عاقل.',
      'Rules of Prayer',
      'Prayer is the pillar of Islam. It is obligatory for every Muslim of sound mind who has reached puberty.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '28:00',
    thumbnail: '/thumbnails/sala.jpg',
    status: 'published',
    tags: ['fiqh', 'salah', 'prayer'],
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
  },
  {
    id: 'fiqhi-3',
    title: { sw: 'Mafunzo ya Saumu', ar: 'أحكام الصيام', en: 'Rules of Fasting' },
    slug: 'rules-of-fasting',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-awali',
    order: 3,
    content: content(
      'Mafunzo ya Saumu',
      'Saumu ya mwezi wa Ramadhani ni faradhi kwa kila Muislamu mwenye akili timamu na umri wa kufika.',
      'أحكام الصيام',
      'صيام شهر رمضان فرض على كل مسلم بالغ عاقل.',
      'Rules of Fasting',
      'Fasting during the month of Ramadan is obligatory for every Muslim of sound mind who has reached puberty.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '24:00',
    thumbnail: '/thumbnails/saumu.jpg',
    status: 'published',
    tags: ['fiqh', 'sawm', 'fasting', 'ramadan'],
    createdAt: '2024-02-25',
    updatedAt: '2024-02-25',
  },
  {
    id: 'tawhidi-1',
    title: { sw: 'Maana ya Tawhidi', ar: 'معنى التوحيد', en: 'Meaning of Tawhid' },
    slug: 'meaning-of-tawhid',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-awali',
    order: 1,
    content: content(
      'Maana ya Tawhidi',
      'Tawhidi ni imani katika Mungu mmoja pekee. Ni msingi wa Uislamu na jambo la kwanza ambalo Mtume (SAW) aliliita watu.',
      'معنى التوحيد',
      'التوحيد هو الإيمان بالإله الواحد الأحد. هو أساس الإسلام وأول ما دعا إليه النبي ﷺ.',
      'Meaning of Tawhid',
      'Tawhid is the belief in one God alone. It is the foundation of Islam and the first thing the Prophet (PBUH) called people to.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '17:00',
    thumbnail: '/thumbnails/tawhid-intro.jpg',
    status: 'published',
    tags: ['tawhid', 'aqeedah', 'monotheism'],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: 'tawhidi-2',
    title: { sw: 'Aina za Tawhidi', ar: 'أنواع التوحيد', en: 'Types of Tawhid' },
    slug: 'types-of-tawhid',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-awali',
    order: 2,
    content: content(
      'Aina za Tawhidi',
      'Tawhidi imegawanywa katika aina tatu: Tawhidi Rububiyyah, Tawhidi Uluhiyyah, na Tawhidi Asma wa Sifa.',
      'أنواع التوحيد',
      'ينقسم التوحيد إلى ثلاثة أنواع: توحيد الربوبية، وتوحيد الألوهية، وتوحيد الأسماء والصفات.',
      'Types of Tawhid',
      'Tawhid is divided into three types: Tawhid Rububiyyah, Tawhid Uluhiyyah, and Tawhid Asma wa Sifa.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '23:30',
    thumbnail: '/thumbnails/tawhid-types.jpg',
    status: 'published',
    tags: ['tawhid', 'aqeedah', 'types'],
    createdAt: '2024-03-05',
    updatedAt: '2024-03-05',
  },
  {
    id: 'tawhidi-3',
    title: { sw: 'Shirk na Jinsi ya Kuepuka', ar: 'الشرك وكيفية تجنبه', en: 'Shirk and How to Avoid It' },
    slug: 'shirk-and-how-to-avoid',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-awali',
    order: 3,
    content: content(
      'Shirk na Jinsi ya Kuepuka',
      'Shirk ni kuunganisha washirika na Mungu katika ibada au sifa zake. Ni dhambi kubwa zaidi katika Uislamu.',
      'الشرك وكيفية تجنبه',
      'الشرك هو إشراك غير الله في العبادة أو صفاته. هو أكبر ذنب في الإسلام.',
      'Shirk and How to Avoid It',
      'Shirk is associating partners with God in worship or His attributes. It is the greatest sin in Islam.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '26:00',
    thumbnail: '/thumbnails/shirk.jpg',
    status: 'published',
    tags: ['tawhid', 'shirk', 'polytheism'],
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
  },
  {
    id: 'sira-1',
    title: { sw: 'Kuzaliwa kwa Mtume (SAW)', ar: 'مولد النبي ﷺ', en: 'Birth of the Prophet (PBUH)' },
    slug: 'birth-of-the-prophet',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-awali',
    order: 1,
    content: content(
      'Kuzaliwa kwa Mtume (SAW)',
      'Mtume Muhammad (SAW) alizaliwa katika mji wa Makkah mnamo mwaka 571 BK. Jina lake la kwanza lilikuwa Muhammad, na jina la pili lilikuwa Ahmad.',
      'مولد النبي ﷺ',
      'وُلد النبي محمد ﷺ في مدينة مكة المكرمة عام 571 م. اسمه الأول محمد، واسمه الثاني أحمد.',
      'Birth of the Prophet (PBUH)',
      'Prophet Muhammad (PBUH) was born in the city of Makkah in the year 571 CE. His first name was Muhammad, and his second name was Ahmad.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '16:30',
    thumbnail: '/thumbnails/birth.jpg',
    status: 'published',
    tags: ['sirah', 'seerat', 'birth'],
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
  },
  {
    id: 'sira-2',
    title: { sw: 'Utoaji wa Ujumbe wa Uislamu', ar: 'بعثة النبي ﷺ', en: 'The Prophetic Mission' },
    slug: 'the-prophetic-mission',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-awali',
    order: 2,
    content: content(
      'Utoaji wa Ujumbe wa Uislamu',
      'Mtume Muhammad (SAW) alianza kupokea ujumbe wa Uislamu akiwa na umri wa miaka arobaini. Ujumbe wa kwanza ulikuwa "Iqra" kutoka Sura Al-Alaq.',
      'بعثة النبي ﷺ',
      'بدأ النبي محمد ﷺ في تلقي الرسالة الإسلامية وهو في الأربعين من عمره. الرسالة الأولى كانت "اقرأ" من سورة العلق.',
      'The Prophetic Mission',
      'Prophet Muhammad (PBUH) began receiving the message of Islam at the age of forty. The first message was "Iqra" from Surah Al-Alaq.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '27:00',
    thumbnail: '/thumbnails/mission.jpg',
    status: 'published',
    tags: ['sirah', 'seerat', 'prophetic-mission'],
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
  },
  {
    id: 'sira-3',
    title: { sw: 'Hijra ya Madina', ar: 'الهجرة إلى المدينة', en: 'The Hijra to Madinah' },
    slug: 'hijra-to-madinah',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-awali',
    order: 3,
    content: content(
      'Hijra ya Madina',
      'Hijra ni uhamiaji wa Mtume Muhammad (SAW) kutoka Makkah kwenda Madina mnamo mwaka 622 BK. Tukio hili ndilo lilioanza kalenda ya Kiislamu.',
      'الهجرة إلى المدينة',
      'الهجرة هي هجرة النبي محمد ﷺ من مكة إلى المدينة عام 622 م. هذا الحدث هو بداية التقويم الهجري.',
      'The Hijra to Madinah',
      'The Hijra is the migration of Prophet Muhammad (PBUH) from Makkah to Madinah in the year 622 CE. This event marks the beginning of the Islamic calendar.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '25:30',
    thumbnail: '/thumbnails/hijra.jpg',
    status: 'published',
    tags: ['sirah', 'seerat', 'hijra'],
    createdAt: '2024-03-25',
    updatedAt: '2024-03-25',
  },
  {
    id: 'quran-kati-1',
    title: {
      sw: "Misingi ya Tafsiri ya Qur'an",
      ar: 'أساسيات تفسير القرآن',
      en: 'Foundations of Quranic Tafsir',
    },
    slug: 'foundations-of-quranic-tafsir',
    subjectId: 'quran',
    levelId: 'kati',
    courseId: 'quran-kati',
    order: 1,
    content: content(
      "Misingi ya Tafsiri ya Qur'an",
      "Tafsiri ya Qur'an inahitaji kujua sababu za kushuka aya, lugha ya Kiarabu, na maelezo ya wanazuoni wa mwanzo.",
      'أساسيات تفسير القرآن',
      'تفسير القرآن يحتاج إلى معرفة أسباب النزول واللغة العربية وشرح العلماء الأوائل.',
      'Foundations of Quranic Tafsir',
      'Quranic tafsir requires knowledge of revelation context, Arabic language, and the explanations preserved from early scholars.',
    ),
    duration: '18:00',
    status: 'published',
    tags: ['quran', 'tafsir', 'intermediate'],
    createdAt: '2024-04-01',
    updatedAt: '2024-04-01',
  },
  {
    id: 'hadith-kati-1',
    title: {
      sw: 'Kutambua Hadith Sahihi',
      ar: 'معرفة الحديث الصحيح',
      en: 'Recognizing Authentic Hadith',
    },
    slug: 'recognizing-authentic-hadith',
    subjectId: 'hadith',
    levelId: 'kati',
    courseId: 'hadith-kati',
    order: 2,
    content: content(
      'Kutambua Hadith Sahihi',
      'Mwanafunzi huangalia mnyororo wa wapokezi, uaminifu wao, na kulingana kwa matini na misingi ya dini.',
      'معرفة الحديث الصحيح',
      'ينظر الطالب في سلسلة الرواة وعدالتهم وضبطهم وموافقة المتن لأصول الدين.',
      'Recognizing Authentic Hadith',
      'A student studies the chain of narration, narrator reliability, and the text in light of established principles.',
    ),
    duration: '20:00',
    status: 'published',
    tags: ['hadith', 'uthuluth', 'intermediate'],
    createdAt: '2024-04-05',
    updatedAt: '2024-04-05',
  },
  {
    id: 'fiqhi-kati-1',
    title: {
      sw: 'Masuala ya Ibada ya Kila Siku',
      ar: 'مسائل العبادة اليومية',
      en: 'Daily Worship Rulings',
    },
    slug: 'daily-worship-rulings',
    subjectId: 'fiqhi',
    levelId: 'kati',
    courseId: 'fiqhi-kati',
    order: 3,
    content: content(
      'Masuala ya Ibada ya Kila Siku',
      'Masuala ya ibada huhitaji kuelewa dalili, hali ya muumini, na namna ya kuuliza wanazuoni pale jambo linapokuwa gumu.',
      'مسائل العبادة اليومية',
      'مسائل العبادة تحتاج إلى فهم الدليل وحال المسلم وكيفية سؤال أهل العلم عند الاشتباه.',
      'Daily Worship Rulings',
      'Daily worship rulings require understanding evidence, personal circumstances, and when to ask qualified scholars.',
    ),
    duration: '22:00',
    status: 'published',
    tags: ['fiqh', 'ibadah', 'intermediate'],
    createdAt: '2024-04-10',
    updatedAt: '2024-04-10',
  },
]

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sh. Hamad',
    email: 'admin@ahlusunna.info',
    role: 'admin',
    progress: [],
    levelAccess: ['awali', 'kati', 'endelea'],
    createdAt: '2025-01-01'
  },
  {
    id: 'user-2',
    name: 'Sh. Khalid',
    email: 'moderator@ahlusunna.info',
    role: 'moderator',
    progress: [],
    levelAccess: ['awali', 'kati', 'endelea'],
    createdAt: '2025-02-15'
  },
  {
    id: 'user-3',
    name: 'Asha Juma',
    email: 'mwanafunzi@ahlusunna.info',
    role: 'learner',
    progress: ['maana-ya-fatiha'],
    levelAccess: ['awali'],
    createdAt: '2026-03-10'
  }
]

export const mockCredentials: Record<string, string> = {
  'admin@ahlusunna.info': 'admin123',
  'moderator@ahlusunna.info': 'mod123',
  'mwanafunzi@ahlusunna.info': 'user123',
}


export const getLessonsBySubject = (subjectId: SubjectId): Lesson[] =>
  lessons.filter((lesson) => lesson.subjectId === subjectId).sort((a, b) => a.order - b.order)

export const getLessonsByLevel = (levelId: LevelId): Lesson[] =>
  lessons.filter((lesson) => lesson.levelId === levelId).sort((a, b) => a.order - b.order)

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read'
  createdAt: string
}

export const mockContacts: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Asha Juma',
    email: 'asha@example.com',
    subject: 'Swali la kidini',
    message: 'Nina swali kuhusu hukumu ya...',
    status: 'new',
    createdAt: '2026-05-01',
  },
  {
    id: 'msg-2',
    name: 'Kassim',
    email: 'kassim@test.com',
    subject: 'Kosa katika somo',
    message: 'Kwenye somo la Tajweed dakika ya pili kuna kosa...',
    status: 'read',
    createdAt: '2026-04-28',
  }
];

export const getLessonBySlug = (slug: string): Lesson | undefined =>
  lessons.find((lesson) => lesson.slug === slug)

export const getSubjectById = (id: SubjectId): Subject | undefined =>
  subjects.find((subject) => subject.id === id)

export const getSubjectBySlug = (slug: string): Subject | undefined =>
  subjects.find((subject) => subject.slug === slug)

export const canAccessLevel = (user: User | null, levelId: LevelId): boolean => {
  if (levelId === 'awali') return true
  if (!user) return false
  return user.levelAccess.includes(levelId)
}

export const canAccessLesson = (user: User | null, lesson: Lesson): boolean =>
  canAccessLevel(user, lesson.levelId)

export const getProgressPercentage = (user: User | null, subjectId?: SubjectId): number => {
  if (!user) return 0
  const relevantLessons = subjectId
    ? lessons.filter((lesson) => lesson.subjectId === subjectId)
    : lessons
  if (relevantLessons.length === 0) return 0
  const completed = relevantLessons.filter((lesson) => user.progress.includes(lesson.slug)).length
  return Math.round((completed / relevantLessons.length) * 100)
}

export const isLessonCompleted = (user: User | null, slug: string): boolean =>
  Boolean(user?.progress.includes(slug))

export const getLevelById = (id: LevelId): Level | undefined => levels.find((level) => level.id === id)

export const checkLessonAccess = (
  lesson: Lesson,
  user: User | null,
): { allowed: boolean; redirectTo?: string; reason?: string } => {
  if (lesson.levelId === 'awali') return { allowed: true }
  if (!user) return { allowed: false, redirectTo: '/login', reason: 'login_required' }
  if (!user.levelAccess.includes(lesson.levelId)) {
    return { allowed: false, redirectTo: '/subjects', reason: 'level_not_unlocked' }
  }
  return { allowed: true }
}

// ============================================
// Additional mock data (merged from mockData.ts)
// ============================================


export const courses: Course[] = [
  {
    id: 'quran-intro',
    slug: 'introduction-to-quran',
    title: { sw: "Utangulizi wa Qur'an", ar: 'مقدمة في القرآن الكريم', en: 'Introduction to the Quran' },
    description: {
      sw: 'Kursi ya msingi inayohusu misingi ya masomo ya Qur\'an.',
      ar: 'دورة أساسية تغطي أساسيات دراسة القرآن.',
      en: 'A foundational course covering the basics of Quranic study.',
    },
    subjectId: 'quran',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/quran-intro.jpg',
    status: 'active',
  },
  {
    id: 'quran-tajweed',
    slug: 'quranic-tajweed',
    title: { sw: 'Makosa ya Tajwid', ar: 'أحكام التجويد', en: 'Quranic Tajweed' },
    description: {
      sw: 'Master kanuni sahihi za kusoma Qur\'an.',
      ar: 'أتقن القواعد الصحيحة لتلاوة القرآن.',
      en: 'Master the rules of proper Quranic recitation.',
    },
    subjectId: 'quran',
    levelId: 'awali',
    order: 2,
    thumbnail: '/thumbnails/tajweed.jpg',
    status: 'active',
  },
  {
    id: 'hadith-intro',
    slug: 'introduction-to-hadith',
    title: { sw: 'Utangulizi wa Hadith', ar: 'مقدمة في الحديث', en: 'Introduction to Hadith' },
    description: {
      sw: 'Jifunze misingi ya sayansi za Hadith.',
      ar: 'تعلم أساسيات علوم الحديث.',
      en: 'Learn the basics of Hadith sciences.',
    },
    subjectId: 'hadith',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/hadith-intro.jpg',
    status: 'active',
  },
  {
    id: 'fiqh-purification',
    slug: 'rules-of-purification',
    title: { sw: 'Sheria za Tahara', ar: 'أحكام الطهارة', en: 'Rules of Purification' },
    description: {
      sw: 'Jifunze kanuni muhimu za wudu na ghusl.',
      ar: 'تعلم القواعد الأساسية للوضوء والغسل.',
      en: 'Learn the essential rules of wudu and ghusl.',
    },
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/tahara.jpg',
    status: 'active',
  },
  {
    id: 'tawhid-meaning',
    slug: 'meaning-of-tawhid',
    title: { sw: 'Maana ya Tawhid', ar: 'معنى التوحيد', en: 'Meaning of Tawhid' },
    description: {
      sw: 'Elewa dhana ya msingi ya tauhid.',
      ar: 'افهم المفهوم الأساسي للتوحيد.',
      en: 'Understand the fundamental concept of Tawhid.',
    },
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/tawhid-intro.jpg',
    status: 'active',
  },
  {
    id: 'sirah-birth',
    slug: 'birth-of-prophet',
    title: { sw: 'Kuzaliwa kwa Mtume', ar: 'مولد النبي', en: 'Birth of the Prophet' },
    description: {
      sw: 'Jifunze kuzaliwa kwake baraka cha Mtume.',
      ar: 'ادرس الميلاد المبارك للنبي.',
      en: 'Study the blessed birth of the Prophet.',
    },
    subjectId: 'sira',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/birth.jpg',
    status: 'active',
  },
]

export const modules: Module[] = [
  {
    id: 'quran-intro-m1',
    slug: 'what-is-quran',
    title: { sw: "Qur'an Ni Nini?", ar: 'ما هو القرآن؟', en: 'What is the Quran?' },
    description: {
      sw: 'Utangulizi wa uelewa wa Qur\'an Mtakatifu.',
      ar: 'مقدمة في فهم القرآن الكريم.',
      en: 'Introduction to understanding the Holy Quran.',
    },
    courseId: 'quran-intro',
    order: 1,
    status: 'active',
  },
  {
    id: 'quran-intro-m2',
    slug: 'revelation-of-quran',
    title: { sw: 'Uvio wa Qur\'an', ar: 'نزول القرآن', en: 'Revelation of the Quran' },
    description: {
      sw: 'Jinsi Qur\'an ilivyoteremshwa.',
      ar: 'كيف نزل القرآن.',
      en: 'How the Quran was revealed.',
    },
    courseId: 'quran-intro',
    order: 2,
    status: 'active',
  },
  {
    id: 'hadith-intro-m1',
    slug: 'what-is-hadith',
    title: { sw: 'Hadith Ni Nini?', ar: 'ما هو الحديث؟', en: 'What is Hadith?' },
    description: {
      sw: 'Utangulizi wa sayansi ya Hadith.',
      ar: 'مقدمة في علم الحديث.',
      en: 'Introduction to the science of Hadith.',
    },
    courseId: 'hadith-intro',
    order: 1,
    status: 'active',
  },
]

export const media: Media[] = [
  {
    id: 'media-1',
    type: 'image',
    url: '/images/quran-pattern.jpg',
    thumbnail: '/thumbnails/quran-pattern-thumb.jpg',
    title: { sw: 'Mfano wa Qur\'an', ar: 'نمط قرآني', en: 'Quranic Pattern' },
    description: {
      sw: 'Mfano wa kijiometria ya Kiislamu.',
      ar: 'نمط هندسي إسلامي.',
      en: 'Decorative Islamic geometric pattern.',
    },
    mimeType: 'image/jpeg',
    size: 245000,
  },
]

export const getAdminStats = () => ({
  totalLessons: lessons.length,
  totalCourses: courses.length,
  totalSubjects: subjects.length,
  totalUsers: mockUsers.length,
  publishedLessons: lessons.filter((l) => l.status === 'published').length,
  draftLessons: lessons.filter((l) => l.status === 'draft').length,
  recentLessons: lessons.slice(0, 5),
})

// ============================================
// Tags
// ============================================

export type TagType = 'subject' | 'topic' | 'difficulty'

export interface Tag {
  id: string
  slug: string
  name: { sw: string; ar: string; en: string }
  type: TagType
}

export const tags: Tag[] = [
  { id: 'quran', slug: 'quran', name: { sw: "Qur'an", ar: 'القرآن', en: "Qur'an" }, type: 'subject' },
  { id: 'hadith', slug: 'hadith', name: { sw: 'Hadith', ar: 'الحديث', en: 'Hadith' }, type: 'subject' },
  { id: 'fiqh', slug: 'fiqh', name: { sw: 'Fiqhi', ar: 'الفقه', en: 'Fiqh' }, type: 'subject' },
  { id: 'tawhid', slug: 'tawhid', name: { sw: 'Tawhidi', ar: 'التوحيد', en: 'Tawhid' }, type: 'subject' },
  { id: 'sirah', slug: 'sirah', name: { sw: 'Sira', ar: 'السيرة', en: 'Sirah' }, type: 'subject' },
  { id: 'basics', slug: 'basics', name: { sw: 'Misingi', ar: 'الأساسيات', en: 'Basics' }, type: 'topic' },
  { id: 'foundations', slug: 'foundations', name: { sw: 'Msingi', ar: 'الأسس', en: 'Foundations' }, type: 'topic' },
  { id: 'tajweed', slug: 'tajweed', name: { sw: 'Tajwid', ar: 'التجويد', en: 'Tajweed' }, type: 'topic' },
  { id: 'prayer', slug: 'prayer', name: { sw: 'Sala', ar: 'الصلاة', en: 'Prayer' }, type: 'topic' },
  { id: 'monotheism', slug: 'monotheism', name: { sw: 'Tauhid', ar: 'التوحيد', en: 'Monotheism' }, type: 'topic' },
  { id: 'beginner', slug: 'beginner', name: { sw: 'Awali', ar: 'مبتدئ', en: 'Beginner' }, type: 'difficulty' },
  { id: 'intermediate', slug: 'intermediate', name: { sw: 'Kati', ar: 'متوسط', en: 'Intermediate' }, type: 'difficulty' },
  { id: 'advanced', slug: 'advanced', name: { sw: 'JuU', ar: 'متقدم', en: 'Advanced' }, type: 'difficulty' },
]
