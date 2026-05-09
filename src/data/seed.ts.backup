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

// ============================================
// Helpers
// ============================================

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
  ar: doc(arHeading, arBody, quote),
  en: doc(enHeading, enBody, quote),
})

// ============================================
// Levels
// ============================================

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

// ============================================
// Subjects (6 core subjects)
// ============================================

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
  {
    id: 'adhkar',
    name: { sw: 'Adhkar', ar: 'الأذكار والأدعية', en: 'Daily Remembrances' },
    slug: 'adhkar',
    description: {
      sw: 'Dhikri na dua za kila siku zinazothibitishwa kutoka kwa Mtume (SAW).',
      ar: 'الأذكار والأدعية اليومية الثابتة عن النبي ﷺ.',
      en: 'Daily remembrances and authentic supplications from the Prophet (PBUH).',
    },
    icon: 'heart-handshake',
    levelId: 'awali',
    order: 6,
    status: 'active',
  },
]

// ============================================
// Courses (= Topics)
// One course per topic, grouped by subject.
// ============================================

export const courses: Course[] = [
  // -------- QUR'AN topics --------
  {
    id: 'quran-utangulizi',
    slug: 'utangulizi-wa-quran',
    title: { sw: "Utangulizi wa Qur'an", ar: 'مقدمة في القرآن', en: "Introduction to the Qur'an" },
    description: {
      sw: "Misingi ya Qur'an, namna ilivyoteremshwa, na muundo wake.",
      ar: 'أساسيات القرآن، كيفية نزوله، وبنيته.',
      en: "Foundations of the Qur'an, its revelation, and structure.",
    },
    subjectId: 'quran',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/quran-intro.jpg',
    status: 'active',
  },
  {
    id: 'quran-tajwid',
    slug: 'kanuni-za-tajwid',
    title: { sw: 'Kanuni za Tajwid', ar: 'أحكام التجويد', en: 'Rules of Tajwid' },
    description: {
      sw: "Jinsi ya kusoma Qur'an kwa usahihi.",
      ar: 'كيفية تلاوة القرآن بشكل صحيح.',
      en: "How to recite the Qur'an correctly.",
    },
    subjectId: 'quran',
    levelId: 'awali',
    order: 2,
    thumbnail: '/thumbnails/tajwid.jpg',
    status: 'active',
  },

  // -------- HADITH topics --------
  {
    id: 'hadith-utangulizi',
    slug: 'utangulizi-wa-hadith',
    title: { sw: 'Utangulizi wa Hadith', ar: 'مقدمة في الحديث', en: 'Introduction to Hadith' },
    description: {
      sw: 'Maana ya Hadith, aina zake, na umuhimu wake.',
      ar: 'معنى الحديث، أنواعه، وأهميته.',
      en: 'The meaning of Hadith, its types, and its importance.',
    },
    subjectId: 'hadith',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/hadith-intro.jpg',
    status: 'active',
  },
  {
    id: 'hadith-misingi',
    slug: 'misingi-ya-hadith',
    title: { sw: 'Misingi ya Hadith', ar: 'أصول الحديث', en: 'Foundations of Hadith' },
    description: {
      sw: 'Hadith muhimu zinazothibitisha imani na maadili.',
      ar: 'أحاديث أساسية تؤسس الإيمان والأخلاق.',
      en: 'Foundational hadith that establish faith and ethics.',
    },
    subjectId: 'hadith',
    levelId: 'awali',
    order: 2,
    thumbnail: '/thumbnails/hadith-foundations.jpg',
    status: 'active',
  },

  // -------- FIQHI topics --------
  {
    id: 'fiqhi-twahara',
    slug: 'twahara',
    title: { sw: 'Twahara', ar: 'الطهارة', en: 'Purification' },
    description: {
      sw: 'Misingi ya usafi katika Uislamu.',
      ar: 'أحكام الطهارة في الإسلام.',
      en: 'The foundations of Islamic purification.',
    },
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/twahara.jpg',
    status: 'active',
  },
  {
    id: 'fiqhi-swala',
    slug: 'swala',
    title: { sw: 'Swala', ar: 'الصلاة', en: 'Prayer' },
    description: {
      sw: 'Nguzo ya pili ya Uislamu — jinsi ya kuswali.',
      ar: 'الركن الثاني من أركان الإسلام — أحكام الصلاة.',
      en: 'The second pillar of Islam — how to perform prayer.',
    },
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 2,
    thumbnail: '/thumbnails/swala.jpg',
    status: 'active',
  },
  {
    id: 'fiqhi-saumu',
    slug: 'saumu',
    title: { sw: 'Saumu', ar: 'الصيام', en: 'Fasting' },
    description: {
      sw: 'Nguzo ya nne ya Uislamu — hukumu za Saumu.',
      ar: 'الركن الرابع من أركان الإسلام — أحكام الصيام.',
      en: 'The fourth pillar of Islam — the rules of fasting.',
    },
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 3,
    thumbnail: '/thumbnails/saumu.jpg',
    status: 'active',
  },

  // -------- TAWHIDI topics --------
  {
    id: 'tawhidi-misingi',
    slug: 'misingi-ya-tawhidi',
    title: { sw: 'Misingi ya Tawhidi', ar: 'أصول التوحيد', en: 'Foundations of Tawhid' },
    description: {
      sw: 'Maana ya Tawhidi na umuhimu wake.',
      ar: 'معنى التوحيد وأهميته.',
      en: 'The meaning and importance of Tawhid.',
    },
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/tawhid-intro.jpg',
    status: 'active',
  },
  {
    id: 'tawhidi-aina',
    slug: 'aina-za-tawhidi',
    title: { sw: 'Aina za Tawhidi', ar: 'أنواع التوحيد', en: 'Types of Tawhid' },
    description: {
      sw: 'Aina tatu kuu za Tawhidi.',
      ar: 'الأنواع الثلاثة الرئيسية للتوحيد.',
      en: 'The three main categories of Tawhid.',
    },
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 2,
    thumbnail: '/thumbnails/tawhid-types.jpg',
    status: 'active',
  },

  // -------- SIRA topics --------
  {
    id: 'sira-makkah',
    slug: 'kipindi-cha-makkah',
    title: { sw: 'Kipindi cha Makkah', ar: 'العهد المكي', en: 'The Makkan Period' },
    description: {
      sw: 'Maisha ya Mtume (SAW) Makkah kabla ya hijra.',
      ar: 'حياة النبي ﷺ في مكة قبل الهجرة.',
      en: 'The life of the Prophet (PBUH) in Makkah before the migration.',
    },
    subjectId: 'sira',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/makkah.jpg',
    status: 'active',
  },
  {
    id: 'sira-madinah',
    slug: 'kipindi-cha-madinah',
    title: { sw: 'Kipindi cha Madinah', ar: 'العهد المدني', en: 'The Madinan Period' },
    description: {
      sw: 'Maisha ya Mtume (SAW) Madinah na ujenzi wa jamii ya Kiislamu.',
      ar: 'حياة النبي ﷺ في المدينة وبناء المجتمع المسلم.',
      en: 'The life of the Prophet (PBUH) in Madinah and the building of the Muslim community.',
    },
    subjectId: 'sira',
    levelId: 'awali',
    order: 2,
    thumbnail: '/thumbnails/madinah.jpg',
    status: 'active',
  },

  // -------- ADHKAR topics --------
  {
    id: 'adhkar-asubuhi-jioni',
    slug: 'adhkar-za-asubuhi-na-jioni',
    title: { sw: 'Adhkar za Asubuhi na Jioni', ar: 'أذكار الصباح والمساء', en: 'Morning and Evening Adhkar' },
    description: {
      sw: 'Dhikri za kuzisoma kila asubuhi na jioni.',
      ar: 'الأذكار التي تُقرأ كل صباح ومساء.',
      en: 'Remembrances to be recited every morning and evening.',
    },
    subjectId: 'adhkar',
    levelId: 'awali',
    order: 1,
    thumbnail: '/thumbnails/adhkar-morning.jpg',
    status: 'active',
  },
  {
    id: 'adhkar-shughuli',
    slug: 'adhkar-za-shughuli-za-kila-siku',
    title: { sw: 'Adhkar za Shughuli za Kila Siku', ar: 'أذكار الأنشطة اليومية', en: 'Adhkar for Daily Activities' },
    description: {
      sw: 'Dua za shughuli za kila siku — kula, kulala, kuamka, na zaidi.',
      ar: 'أدعية الأنشطة اليومية — الأكل، النوم، الاستيقاظ وغيرها.',
      en: 'Supplications for daily activities — eating, sleeping, waking up, and more.',
    },
    subjectId: 'adhkar',
    levelId: 'awali',
    order: 2,
    thumbnail: '/thumbnails/adhkar-daily.jpg',
    status: 'active',
  },
]

// ============================================
// Modules (= Subtopics)
// Each module belongs to a course (topic).
// ============================================

export const modules: Module[] = [
  // -------- Qur'an: Utangulizi --------
  {
    id: 'm-quran-utangulizi-quran',
    slug: 'quran-ni-nini',
    title: { sw: "Qur'an Ni Nini?", ar: 'ما هو القرآن؟', en: "What is the Qur'an?" },
    description: {
      sw: "Maana ya Qur'an na umuhimu wake.",
      ar: 'معنى القرآن وأهميته.',
      en: "The meaning of the Qur'an and its importance.",
    },
    courseId: 'quran-utangulizi',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-quran-utangulizi-uvio',
    slug: 'uvio-wa-quran',
    title: { sw: "Uvio wa Qur'an", ar: 'نزول القرآن', en: "Revelation of the Qur'an" },
    description: {
      sw: "Jinsi Qur'an ilivyoteremshwa kwa Mtume (SAW).",
      ar: 'كيف نزل القرآن على النبي ﷺ.',
      en: "How the Qur'an was revealed to the Prophet (PBUH).",
    },
    courseId: 'quran-utangulizi',
    order: 2,
    status: 'active',
  },

  // -------- Qur'an: Tajwid --------
  {
    id: 'm-quran-tajwid-misingi',
    slug: 'misingi-ya-tajwid',
    title: { sw: 'Misingi ya Tajwid', ar: 'أساسيات التجويد', en: 'Tajwid Fundamentals' },
    description: {
      sw: 'Kanuni za msingi za kusoma kwa usahihi.',
      ar: 'القواعد الأساسية للتلاوة الصحيحة.',
      en: 'The basic rules of correct recitation.',
    },
    courseId: 'quran-tajwid',
    order: 1,
    status: 'active',
  },

  // -------- Hadith: Utangulizi --------
  {
    id: 'm-hadith-utangulizi-maana',
    slug: 'maana-ya-hadith',
    title: { sw: 'Maana ya Hadith', ar: 'معنى الحديث', en: 'The Meaning of Hadith' },
    description: {
      sw: 'Hadith ni nini na umuhimu wake katika Uislamu.',
      ar: 'ما هو الحديث وأهميته في الإسلام.',
      en: 'What hadith is and its importance in Islam.',
    },
    courseId: 'hadith-utangulizi',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-hadith-utangulizi-aina',
    slug: 'aina-za-hadith',
    title: { sw: 'Aina za Hadith', ar: 'أنواع الحديث', en: 'Types of Hadith' },
    description: {
      sw: 'Hadith Sahih, Hasan, Dhaif na nyinginezo.',
      ar: 'الحديث الصحيح والحسن والضعيف وغيرها.',
      en: 'Sahih, Hasan, Da\'if hadith and others.',
    },
    courseId: 'hadith-utangulizi',
    order: 2,
    status: 'active',
  },

  // -------- Hadith: Misingi --------
  {
    id: 'm-hadith-misingi-imani',
    slug: 'hadith-za-imani',
    title: { sw: 'Hadith za Imani', ar: 'أحاديث الإيمان', en: 'Hadith on Faith' },
    description: {
      sw: 'Hadith zinazoelezea misingi ya imani.',
      ar: 'الأحاديث التي توضح أركان الإيمان.',
      en: 'Hadith that explain the pillars of faith.',
    },
    courseId: 'hadith-misingi',
    order: 1,
    status: 'active',
  },

  // -------- Fiqhi: Twahara --------
  {
    id: 'm-fiqhi-twahara-najisi',
    slug: 'aina-za-najisi',
    title: { sw: 'Aina za Najisi', ar: 'أنواع النجاسات', en: 'Types of Impurity' },
    description: {
      sw: 'Aina za najisi na jinsi ya kuzitakasa.',
      ar: 'أنواع النجاسات وكيفية تطهيرها.',
      en: 'The types of impurity and how to purify them.',
    },
    courseId: 'fiqhi-twahara',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-fiqhi-twahara-wudhu',
    slug: 'wudhu',
    title: { sw: 'Wudhu', ar: 'الوضوء', en: 'Ablution' },
    description: {
      sw: 'Jinsi ya kufanya wudhu sahihi na mambo yanayouvunja.',
      ar: 'كيفية الوضوء الصحيح ونواقضه.',
      en: 'How to perform correct ablution and what invalidates it.',
    },
    courseId: 'fiqhi-twahara',
    order: 2,
    status: 'active',
  },

  // -------- Fiqhi: Swala --------
  {
    id: 'm-fiqhi-swala-wakati',
    slug: 'wakati-wa-swala',
    title: { sw: 'Wakati wa Swala', ar: 'أوقات الصلاة', en: 'Prayer Times' },
    description: {
      sw: 'Swala tano za faradhi na nyakati zake.',
      ar: 'الصلوات الخمس المفروضة وأوقاتها.',
      en: 'The five obligatory prayers and their times.',
    },
    courseId: 'fiqhi-swala',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-fiqhi-swala-nguzo',
    slug: 'nguzo-za-swala',
    title: { sw: 'Nguzo za Swala', ar: 'أركان الصلاة', en: 'Pillars of Prayer' },
    description: {
      sw: 'Mambo muhimu ambayo Swala haifai bila yake.',
      ar: 'الأعمال التي لا تصح الصلاة إلا بها.',
      en: 'The essential acts without which prayer is invalid.',
    },
    courseId: 'fiqhi-swala',
    order: 2,
    status: 'active',
  },

  // -------- Fiqhi: Saumu --------
  {
    id: 'm-fiqhi-saumu-masharti',
    slug: 'masharti-ya-saumu',
    title: { sw: 'Masharti ya Saumu', ar: 'شروط الصيام', en: 'Conditions of Fasting' },
    description: {
      sw: 'Masharti ya Saumu kuwa sahihi na mambo yanayoivunja.',
      ar: 'شروط صحة الصيام ومفطراته.',
      en: 'Conditions for a valid fast and what breaks it.',
    },
    courseId: 'fiqhi-saumu',
    order: 1,
    status: 'active',
  },

  // -------- Tawhidi: Misingi --------
  {
    id: 'm-tawhidi-misingi-maana',
    slug: 'maana-ya-tawhidi',
    title: { sw: 'Maana ya Tawhidi', ar: 'معنى التوحيد', en: 'Meaning of Tawhid' },
    description: {
      sw: 'Tawhidi ni nini na umuhimu wake.',
      ar: 'ما هو التوحيد وأهميته.',
      en: 'What Tawhid is and its importance.',
    },
    courseId: 'tawhidi-misingi',
    order: 1,
    status: 'active',
  },

  // -------- Tawhidi: Aina --------
  {
    id: 'm-tawhidi-aina-rububiyyah',
    slug: 'tawhid-rububiyyah',
    title: { sw: 'Tawhid ar-Rububiyyah', ar: 'توحيد الربوبية', en: 'Tawhid of Lordship' },
    description: {
      sw: 'Imani kwamba Allah ni Mola pekee.',
      ar: 'الإيمان بأن الله هو الرب الواحد.',
      en: 'The belief that Allah alone is the Lord.',
    },
    courseId: 'tawhidi-aina',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-tawhidi-aina-uluhiyyah',
    slug: 'tawhid-uluhiyyah',
    title: { sw: 'Tawhid al-Uluhiyyah', ar: 'توحيد الألوهية', en: 'Tawhid of Worship' },
    description: {
      sw: 'Kumuabudu Allah pekee bila kumshirikisha.',
      ar: 'إفراد الله بالعبادة وحده دون شريك.',
      en: 'Worshipping Allah alone without associating partners with Him.',
    },
    courseId: 'tawhidi-aina',
    order: 2,
    status: 'active',
  },

  // -------- Sira: Makkah --------
  {
    id: 'm-sira-makkah-kuzaliwa',
    slug: 'kuzaliwa-kwa-mtume',
    title: { sw: 'Kuzaliwa kwa Mtume (SAW)', ar: 'مولد النبي ﷺ', en: 'Birth of the Prophet (PBUH)' },
    description: {
      sw: 'Kuzaliwa kwa Mtume na maisha yake ya utotoni.',
      ar: 'مولد النبي ﷺ وحياته في الطفولة.',
      en: 'The birth of the Prophet and his childhood.',
    },
    courseId: 'sira-makkah',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-sira-makkah-bi-tha',
    slug: 'bi-tha-na-da-wa',
    title: { sw: 'Bi\'tha na Da\'wa', ar: 'البعثة والدعوة', en: 'The Mission and Call' },
    description: {
      sw: 'Mwanzo wa unabii na kueneza Uislamu Makkah.',
      ar: 'بداية النبوة ودعوة الإسلام في مكة.',
      en: 'The beginning of prophethood and the call to Islam in Makkah.',
    },
    courseId: 'sira-makkah',
    order: 2,
    status: 'active',
  },

  // -------- Sira: Madinah --------
  {
    id: 'm-sira-madinah-hijra',
    slug: 'hijra',
    title: { sw: 'Hijra', ar: 'الهجرة', en: 'The Hijra' },
    description: {
      sw: 'Uhamiaji wa Mtume kutoka Makkah kwenda Madinah.',
      ar: 'هجرة النبي من مكة إلى المدينة.',
      en: "The Prophet's migration from Makkah to Madinah.",
    },
    courseId: 'sira-madinah',
    order: 1,
    status: 'active',
  },

  // -------- Adhkar: Asubuhi & Jioni --------
  {
    id: 'm-adhkar-asubuhi',
    slug: 'adhkar-za-asubuhi',
    title: { sw: 'Adhkar za Asubuhi', ar: 'أذكار الصباح', en: 'Morning Adhkar' },
    description: {
      sw: 'Dhikri za kusoma asubuhi baada ya Swala ya Alfajiri.',
      ar: 'الأذكار التي تُقرأ بعد صلاة الفجر.',
      en: 'Remembrances to recite in the morning after Fajr prayer.',
    },
    courseId: 'adhkar-asubuhi-jioni',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-adhkar-jioni',
    slug: 'adhkar-za-jioni',
    title: { sw: 'Adhkar za Jioni', ar: 'أذكار المساء', en: 'Evening Adhkar' },
    description: {
      sw: 'Dhikri za kusoma jioni baada ya Swala ya Alasiri.',
      ar: 'الأذكار التي تُقرأ بعد صلاة العصر.',
      en: 'Remembrances to recite in the evening after Asr prayer.',
    },
    courseId: 'adhkar-asubuhi-jioni',
    order: 2,
    status: 'active',
  },

  // -------- Adhkar: Daily activities --------
  {
    id: 'm-adhkar-shughuli-kula',
    slug: 'dua-za-kula-na-kunywa',
    title: { sw: 'Dua za Kula na Kunywa', ar: 'أدعية الأكل والشرب', en: 'Supplications for Eating and Drinking' },
    description: {
      sw: 'Dua za kuanza na kumaliza chakula.',
      ar: 'أدعية بدء الطعام وانتهائه.',
      en: 'Supplications for beginning and finishing meals.',
    },
    courseId: 'adhkar-shughuli',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-adhkar-shughuli-kulala',
    slug: 'dua-za-kulala-na-kuamka',
    title: { sw: 'Dua za Kulala na Kuamka', ar: 'أدعية النوم والاستيقاظ', en: 'Supplications for Sleeping and Waking' },
    description: {
      sw: 'Dua za kabla ya kulala na baada ya kuamka.',
      ar: 'أدعية ما قبل النوم وبعد الاستيقاظ.',
      en: 'Supplications for before sleeping and after waking.',
    },
    courseId: 'adhkar-shughuli',
    order: 2,
    status: 'active',
  },
]

// ============================================
// Lessons
// Each lesson belongs to a course (topic).
// `courseId` links to the topic; the module
// link is implied by `slug` matching the module.
// ============================================

export const lessons: Lesson[] = [
  // ============================================
  // QUR'AN
  // ============================================
  {
    id: 'l-quran-utangulizi-1',
    title: {
      sw: "Qur'an Ni Nini?",
      ar: 'ما هو القرآن؟',
      en: "What is the Qur'an?",
    },
    slug: 'quran-ni-nini',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-utangulizi',
    order: 1,
    content: content(
      "Qur'an Ni Nini?",
      "Qur'an ni neno la Allah lililoteremshwa kwa Mtume Muhammad (SAW) kupitia malaika Jibril (AS). Kina sura 114 na aya zaidi ya 6,000. Ni mwongozo kamili kwa wanadamu wote.",
      'ما هو القرآن؟',
      'القرآن هو كلام الله المنزّل على النبي محمد ﷺ بواسطة جبريل عليه السلام. يحتوي على ١١٤ سورة وأكثر من ٦٠٠٠ آية. وهو هداية كاملة للبشرية.',
      "What is the Qur'an?",
      "The Qur'an is the word of Allah revealed to Prophet Muhammad (PBUH) through the angel Jibril (AS). It contains 114 chapters (suras) and over 6,000 verses. It is a complete guidance for all humanity.",
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '12:00',
    thumbnail: '/thumbnails/quran-intro.jpg',
    status: 'published',
    tags: ['quran', 'introduction', 'basics'],
    createdAt: '2026-01-15',
    updatedAt: '2026-01-15',
  },
  {
    id: 'l-quran-utangulizi-2',
    title: {
      sw: "Uvio wa Qur'an",
      ar: 'نزول القرآن',
      en: "Revelation of the Qur'an",
    },
    slug: 'uvio-wa-quran',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-utangulizi',
    order: 2,
    content: content(
      "Uvio wa Qur'an",
      "Qur'an iliteremshwa kwa muda wa miaka 23 — miaka 13 mjini Makkah na miaka 10 mjini Madinah. Ilianza kuteremshwa katika usiku wa Laylat al-Qadr katika mwezi wa Ramadhan.",
      'نزول القرآن',
      'نزل القرآن خلال ٢٣ سنة — ١٣ سنة في مكة و١٠ سنوات في المدينة. وكان أول نزوله في ليلة القدر في شهر رمضان.',
      "Revelation of the Qur'an",
      "The Qur'an was revealed over 23 years — 13 in Makkah and 10 in Madinah. Its revelation began on the Night of Decree (Laylat al-Qadr) in the month of Ramadan.",
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '15:30',
    thumbnail: '/thumbnails/quran-revelation.jpg',
    status: 'published',
    tags: ['quran', 'revelation', 'history'],
    createdAt: '2026-01-18',
    updatedAt: '2026-01-18',
  },
  {
    id: 'l-quran-tajwid-1',
    title: {
      sw: 'Misingi ya Tajwid',
      ar: 'أساسيات التجويد',
      en: 'Tajwid Fundamentals',
    },
    slug: 'misingi-ya-tajwid',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-tajwid',
    order: 1,
    content: content(
      'Misingi ya Tajwid',
      "Tajwid ni sayansi ya kusoma Qur'an kwa usahihi. Inajumuisha kutamka herufi kutoka mahali pake (makharij), kuzingatia sifa zake (sifaat), na kufuata kanuni za madd na ghunna.",
      'أساسيات التجويد',
      'التجويد هو علم تلاوة القرآن بشكل صحيح. يشمل إخراج الحروف من مخارجها، ومراعاة صفاتها، وتطبيق أحكام المد والغنة.',
      'Tajwid Fundamentals',
      "Tajwid is the science of reciting the Qur'an correctly. It includes pronouncing letters from their proper points of articulation (makharij), observing their characteristics (sifaat), and applying the rules of elongation (madd) and nasalization (ghunna).",
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'recitation',
    duration: '20:00',
    thumbnail: '/thumbnails/tajwid.jpg',
    status: 'published',
    tags: ['quran', 'tajwid', 'recitation'],
    createdAt: '2026-01-22',
    updatedAt: '2026-01-22',
  },

  // ============================================
  // HADITH
  // ============================================
  {
    id: 'l-hadith-utangulizi-1',
    title: {
      sw: 'Maana ya Hadith',
      ar: 'معنى الحديث',
      en: 'The Meaning of Hadith',
    },
    slug: 'maana-ya-hadith',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-utangulizi',
    order: 1,
    content: content(
      'Maana ya Hadith',
      "Hadith ni maneno, matendo, au ridha ya Mtume Muhammad (SAW). Ni chanzo cha pili cha sheria ya Kiislamu baada ya Qur'an. Hadith zinatusaidia kuelewa namna ya kutekeleza mafundisho ya Qur'an katika maisha yetu ya kila siku.",
      'معنى الحديث',
      'الحديث هو قول النبي محمد ﷺ أو فعله أو تقريره. وهو المصدر الثاني للشريعة الإسلامية بعد القرآن. الأحاديث تساعدنا على فهم كيفية تطبيق تعاليم القرآن في حياتنا اليومية.',
      'The Meaning of Hadith',
      "Hadith refers to the words, actions, or tacit approvals of Prophet Muhammad (PBUH). It is the second source of Islamic law after the Qur'an. Hadith help us understand how to apply the teachings of the Qur'an in our daily lives.",
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '14:00',
    thumbnail: '/thumbnails/hadith-intro.jpg',
    status: 'published',
    tags: ['hadith', 'introduction'],
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
  },
  {
    id: 'l-hadith-utangulizi-2',
    title: {
      sw: 'Aina za Hadith',
      ar: 'أنواع الحديث',
      en: 'Types of Hadith',
    },
    slug: 'aina-za-hadith',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-utangulizi',
    order: 2,
    content: content(
      'Aina za Hadith',
      "Hadith zimegawanywa katika aina nyingi kulingana na uhalali wake: (1) Sahih — hadith iliyo halali kabisa, (2) Hasan — nzuri lakini si bora kuliko Sahih, (3) Da'if — dhaifu, (4) Mawdu' — bandia. Wanazuoni wa hadith huangalia mlolongo wa wapokezi (sanad) na maandiko (matn).",
      'أنواع الحديث',
      'الحديث ينقسم إلى أنواع حسب صحته: (١) صحيح، (٢) حسن، (٣) ضعيف، (٤) موضوع. علماء الحديث يتفحصون سلسلة الرواة (السند) والمتن.',
      'Types of Hadith',
      "Hadith are classified into several types based on authenticity: (1) Sahih — fully authentic, (2) Hasan — good but slightly below Sahih, (3) Da'if — weak, (4) Mawdu' — fabricated. Hadith scholars examine the chain of narrators (sanad) and the text (matn).",
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '18:00',
    thumbnail: '/thumbnails/hadith-types.jpg',
    status: 'published',
    tags: ['hadith', 'classification', 'sahih'],
    createdAt: '2026-02-05',
    updatedAt: '2026-02-05',
  },
  {
    id: 'l-hadith-misingi-1',
    title: {
      sw: 'Hadith za Imani',
      ar: 'أحاديث الإيمان',
      en: 'Hadith on Faith',
    },
    slug: 'hadith-za-imani',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-misingi',
    order: 1,
    content: content(
      'Hadith za Imani',
      "Hadith maarufu ya Jibril inaeleza misingi ya imani: kumwamini Allah, malaika wake, vitabu vyake, mitume wake, Siku ya Mwisho, na Qadar (mema na mabaya). Hadith hii ni muhimu sana katika kuelewa Uislamu.",
      'أحاديث الإيمان',
      'حديث جبريل المشهور يبيّن أركان الإيمان: الإيمان بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، والقدر خيره وشره. هذا الحديث أساسي لفهم الإسلام.',
      'Hadith on Faith',
      "The famous Hadith of Jibril outlines the pillars of faith: belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree (qadar) — both its good and bad. This hadith is fundamental to understanding Islam.",
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '22:00',
    thumbnail: '/thumbnails/hadith-iman.jpg',
    status: 'published',
    tags: ['hadith', 'iman', 'pillars'],
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },

  // ============================================
  // FIQHI
  // ============================================
  {
    id: 'l-fiqhi-twahara-najisi',
    title: {
      sw: 'Aina za Najisi',
      ar: 'أنواع النجاسات',
      en: 'Types of Impurity',
    },
    slug: 'aina-za-najisi',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-twahara',
    order: 1,
    content: content(
      'Aina za Najisi',
      "Katika Uislamu, najisi ni uchafu wa kimwili unaozuia mtu kufanya ibada kama Swala. Aina kuu tatu: (1) Najisi Mughalladha — nzito, kama mate ya mbwa na nguruwe, husafishwa kwa kunawa mara saba moja kwa udongo. (2) Najisi Mutawassita — wastani, kama mkojo na damu. (3) Najisi Mukhaffafa — nyepesi, kama mkojo wa mtoto mchanga wa kiume asiyekula chakula.",
      'أنواع النجاسات',
      'النجاسة في الإسلام هي كل عين حكم الشرع بنجاستها وتمنع صحة الصلاة. أنواعها الثلاثة: (١) المغلَّظة — كولوغ الكلب والخنزير، تُطهَّر بالغسل سبع مرات إحداها بالتراب. (٢) المتوسطة — كالبول والدم. (٣) المخففة — كبول الغلام الرضيع الذي لم يأكل الطعام.',
      'Types of Impurity',
      "In Islam, impurity (najasah) is physical filth that prevents worship such as prayer. The three types are: (1) Heavy (Mughalladha) — saliva of dogs and pigs, purified by washing seven times, once with soil. (2) Medium (Mutawassita) — urine, blood, feces; purified with water. (3) Light (Mukhaffafa) — urine of a male infant who hasn't eaten solid food; purified by sprinkling water.",
      'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '16:00',
    thumbnail: '/thumbnails/najisi.jpg',
    status: 'published',
    tags: ['fiqh', 'twahara', 'najasah'],
    createdAt: '2026-02-15',
    updatedAt: '2026-02-15',
  },
  {
    id: 'l-fiqhi-twahara-wudhu',
    title: {
      sw: 'Wudhu',
      ar: 'الوضوء',
      en: 'Ablution (Wudhu)',
    },
    slug: 'wudhu',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-twahara',
    order: 2,
    content: content(
      'Wudhu',
      "Wudhu ni ibada ya kujisafisha kwa maji kabla ya Swala. Nguzo zake sita: (1) Nia, (2) Kuosha uso, (3) Kuosha mikono hadi viwiko, (4) Kupangusa kichwa, (5) Kuosha miguu hadi vifundo, (6) Mpangilio (Tartib). Mambo yanayovunja wudhu: kutoka chochote njia za mbele au nyuma, kulala usingizi mzito, na kupoteza fahamu.",
      'الوضوء',
      'الوضوء هو التطهر بالماء قبل الصلاة. فرائضه ستة: (١) النية، (٢) غسل الوجه، (٣) غسل اليدين مع المرفقين، (٤) مسح الرأس، (٥) غسل الرجلين مع الكعبين، (٦) الترتيب. ونواقضه: الخارج من السبيلين، والنوم العميق، وزوال العقل.',
      'Ablution (Wudhu)',
      'Wudhu is ritual purification with water before prayer. Its six obligatory acts: (1) Intention, (2) Washing the face, (3) Washing the arms to the elbows, (4) Wiping the head, (5) Washing the feet to the ankles, (6) Order (Tartib). Wudhu is invalidated by anything exiting the front or back passage, deep sleep, or loss of consciousness.',
      'لَا تُقْبَلُ صَلَاةٌ بِغَيْرِ طُهُورٍ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '18:00',
    thumbnail: '/thumbnails/wudhu.jpg',
    status: 'published',
    tags: ['fiqh', 'twahara', 'wudhu'],
    createdAt: '2026-02-18',
    updatedAt: '2026-02-18',
  },
  {
    id: 'l-fiqhi-swala-wakati',
    title: {
      sw: 'Swala Tano na Nyakati Zake',
      ar: 'الصلوات الخمس وأوقاتها',
      en: 'The Five Prayers and Their Times',
    },
    slug: 'wakati-wa-swala',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-swala',
    order: 1,
    content: content(
      'Swala Tano na Nyakati Zake',
      "Swala tano za faradhi: (1) Alfajiri (Fajr) — kutoka mapambazuko hadi jua kuchomoza, rakaa 2. (2) Adhuhuri (Dhuhr) — jua linapopita angani, rakaa 4. (3) Alasiri (Asr) — baada ya Dhuhr hadi jua kuwa la njano, rakaa 4. (4) Magharibi (Maghrib) — jua linapotua, rakaa 3. (5) Isha — usiku wa kweli unapoingia, rakaa 4.",
      'الصلوات الخمس وأوقاتها',
      'الصلوات الخمس المفروضة: (١) الفجر — من طلوع الفجر إلى طلوع الشمس، ركعتان. (٢) الظهر — عند زوال الشمس، أربع ركعات. (٣) العصر — بعد الظهر إلى اصفرار الشمس، أربع ركعات. (٤) المغرب — عند غروب الشمس، ثلاث ركعات. (٥) العشاء — عند دخول الليل، أربع ركعات.',
      'The Five Prayers and Their Times',
      'The five obligatory prayers: (1) Fajr — from true dawn until sunrise, 2 rakaat. (2) Dhuhr — when the sun passes its zenith, 4 rakaat. (3) Asr — after Dhuhr until sunset, 4 rakaat. (4) Maghrib — at sunset, 3 rakaat. (5) Isha — when night fully enters, 4 rakaat.',
      'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '20:00',
    thumbnail: '/thumbnails/swala-times.jpg',
    status: 'published',
    tags: ['fiqh', 'swala', 'prayer-times'],
    createdAt: '2026-02-22',
    updatedAt: '2026-02-22',
  },
  {
    id: 'l-fiqhi-swala-nguzo',
    title: {
      sw: 'Nguzo Kumi za Swala',
      ar: 'أركان الصلاة العشرة',
      en: 'The Ten Pillars of Prayer',
    },
    slug: 'nguzo-za-swala',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-swala',
    order: 2,
    content: content(
      'Nguzo Kumi za Swala',
      "Nguzo za Swala: (1) Kusimama, (2) Takbiratul Ihram, (3) Kusoma Al-Fatiha, (4) Rukuu, (5) Kusimama baada ya Rukuu, (6) Sujudi mara mbili, (7) Kukaa kati ya sijda mbili, (8) Tashahhud ya Mwisho, (9) Salamu za Kumaliza, (10) Utulivu (Tuma'ninah). Ikiwa nguzo moja itaachwa, Swala lazima irudiwe.",
      'أركان الصلاة العشرة',
      'أركان الصلاة: (١) القيام، (٢) تكبيرة الإحرام، (٣) قراءة الفاتحة، (٤) الركوع، (٥) الاعتدال من الركوع، (٦) السجود مرتين، (٧) الجلسة بين السجدتين، (٨) التشهد الأخير، (٩) التسليم، (١٠) الطمأنينة. فإن ترك ركن وجبت إعادة الصلاة.',
      'The Ten Pillars of Prayer',
      "The pillars of prayer: (1) Standing, (2) Opening Takbir, (3) Reciting Al-Fatiha, (4) Ruku, (5) Rising from Ruku, (6) Two prostrations, (7) Sitting between sujud, (8) Final Tashahhud, (9) Closing Salaam, (10) Calmness (Tuma'ninah). If any pillar is omitted, the prayer must be repeated.",
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '24:00',
    thumbnail: '/thumbnails/swala-pillars.jpg',
    status: 'published',
    tags: ['fiqh', 'swala', 'pillars'],
    createdAt: '2026-02-25',
    updatedAt: '2026-02-25',
  },
  {
    id: 'l-fiqhi-saumu-masharti',
    title: {
      sw: 'Masharti ya Saumu na Mambo Yanayoivunja',
      ar: 'شروط الصيام ومفطراته',
      en: 'Conditions of Fasting and What Breaks It',
    },
    slug: 'masharti-ya-saumu',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-saumu',
    order: 1,
    content: content(
      'Masharti ya Saumu na Mambo Yanayoivunja',
      "Masharti ya Saumu: (1) Uislamu, (2) Akili, (3) Ubalehe, (4) Nia kabla ya alfajiri, (5) Kutokuwa na udhuru kama ugonjwa au safari. Mambo yanayoivunja: kula au kunywa kwa makusudi, kujamiiana wakati wa mchana, kutapika kwa makusudi, na hedhi au nifasi.",
      'شروط الصيام ومفطراته',
      'شروط الصيام: (١) الإسلام، (٢) العقل، (٣) البلوغ، (٤) النية قبل الفجر، (٥) الخلو من الأعذار كالمرض والسفر. ومفطراته: الأكل والشرب عمداً، والجماع في النهار، والاستقاءة عمداً، والحيض والنفاس.',
      'Conditions of Fasting and What Breaks It',
      'Conditions for a valid fast: (1) Islam, (2) Sanity, (3) Puberty, (4) Intention before dawn, (5) Absence of exemptions such as illness or travel. What breaks the fast: deliberately eating or drinking, sexual intercourse during daylight, deliberate vomiting, and menstruation or post-natal bleeding.',
      'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '17:00',
    thumbnail: '/thumbnails/saumu.jpg',
    status: 'published',
    tags: ['fiqh', 'saumu', 'ramadan'],
    createdAt: '2026-02-28',
    updatedAt: '2026-02-28',
  },

  // ============================================
  // TAWHIDI
  // ============================================
  {
    id: 'l-tawhidi-misingi-1',
    title: {
      sw: 'Maana ya Tawhidi',
      ar: 'معنى التوحيد',
      en: 'Meaning of Tawhid',
    },
    slug: 'maana-ya-tawhidi',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-misingi',
    order: 1,
    content: content(
      'Maana ya Tawhidi',
      "Tawhidi ni imani katika Mungu mmoja peke yake — Allah. Ni msingi wa Uislamu na ujumbe wa kwanza wa kila mtume. Bila Tawhidi, hakuna ibada inayokubaliwa. Tawhidi inamaanisha kumwamini Allah peke yake katika uola wake, jina lake, na ibada.",
      'معنى التوحيد',
      'التوحيد هو الإيمان بالإله الواحد الأحد — الله. وهو أساس الإسلام ورسالة كل نبي. بدون التوحيد لا تُقبل عبادة. والتوحيد هو إفراد الله بالربوبية والأسماء والصفات والعبادة.',
      'Meaning of Tawhid',
      'Tawhid is the belief in one God alone — Allah. It is the foundation of Islam and the first message of every prophet. Without Tawhid, no worship is accepted. Tawhid means singling out Allah alone in His Lordship, His names and attributes, and in worship.',
      'قُلْ هُوَ اللَّهُ أَحَدٌ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '16:00',
    thumbnail: '/thumbnails/tawhid-intro.jpg',
    status: 'published',
    tags: ['tawhid', 'aqeedah', 'monotheism'],
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
  },
  {
    id: 'l-tawhidi-aina-rububiyyah',
    title: {
      sw: 'Tawhid ar-Rububiyyah',
      ar: 'توحيد الربوبية',
      en: 'Tawhid of Lordship',
    },
    slug: 'tawhid-rububiyyah',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-aina',
    order: 1,
    content: content(
      'Tawhid ar-Rububiyyah',
      "Tawhid ar-Rububiyyah ni kumwamini Allah kuwa ni Mola peke yake anayeumba, anayemiliki, na anayepanga mambo yote. Hata washirikina wa Makkah waliamini hii, lakini hawakumwabudu Allah peke yake.",
      'توحيد الربوبية',
      'توحيد الربوبية هو الإيمان بأن الله هو الرب الواحد الذي خلق ويملك ويدبّر كل شيء. حتى مشركو مكة كانوا يؤمنون بهذا، لكنهم لم يفردوا الله بالعبادة.',
      'Tawhid of Lordship',
      'Tawhid ar-Rububiyyah is the belief that Allah alone is the Lord who creates, owns, and governs everything. Even the polytheists of Makkah believed in this, but they did not worship Allah alone.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '15:00',
    thumbnail: '/thumbnails/rububiyyah.jpg',
    status: 'published',
    tags: ['tawhid', 'rububiyyah'],
    createdAt: '2026-03-04',
    updatedAt: '2026-03-04',
  },
  {
    id: 'l-tawhidi-aina-uluhiyyah',
    title: {
      sw: 'Tawhid al-Uluhiyyah',
      ar: 'توحيد الألوهية',
      en: 'Tawhid of Worship',
    },
    slug: 'tawhid-uluhiyyah',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-aina',
    order: 2,
    content: content(
      'Tawhid al-Uluhiyyah',
      "Tawhid al-Uluhiyyah ni kumuabudu Allah peke yake — bila kumshirikisha na chochote au mtu yeyote. Hii ndiyo aina ya Tawhidi ambayo mitume waliuita watu kuingia. Ni dhana kuu ya kalimat Shahada: 'La ilaha illa Allah'.",
      'توحيد الألوهية',
      'توحيد الألوهية هو إفراد الله بالعبادة وحده دون شريك. وهذا هو نوع التوحيد الذي دعا إليه الرسل. وهو معنى كلمة التوحيد: "لا إله إلا الله".',
      'Tawhid of Worship',
      "Tawhid al-Uluhiyyah is worshipping Allah alone — associating no partner with Him. This is the type of Tawhid that the prophets called people to. It is the core meaning of the Shahada: 'There is no deity worthy of worship except Allah'.",
      'لَا إِلَٰهَ إِلَّا اللَّهُ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '17:00',
    thumbnail: '/thumbnails/uluhiyyah.jpg',
    status: 'published',
    tags: ['tawhid', 'uluhiyyah', 'shahada'],
    createdAt: '2026-03-07',
    updatedAt: '2026-03-07',
  },

  // ============================================
  // SIRA
  // ============================================
  {
    id: 'l-sira-makkah-kuzaliwa',
    title: {
      sw: 'Kuzaliwa kwa Mtume (SAW)',
      ar: 'مولد النبي ﷺ',
      en: 'Birth of the Prophet (PBUH)',
    },
    slug: 'kuzaliwa-kwa-mtume',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-makkah',
    order: 1,
    content: content(
      'Kuzaliwa kwa Mtume (SAW)',
      "Mtume Muhammad (SAW) alizaliwa Makkah mnamo mwaka 571 BK katika kabila la Quraysh. Baba yake Abdullah alikufa kabla ya kuzaliwa kwake, na mama yake Aamina alikufa akiwa na umri wa miaka sita. Alilelewa na babu yake Abdul-Muttalib, kisha mjomba wake Abu Talib.",
      'مولد النبي ﷺ',
      'وُلد النبي محمد ﷺ في مكة عام ٥٧١ م في قبيلة قريش. توفي والده عبد الله قبل ولادته، وتوفيت أمه آمنة وعمره ست سنوات. كفله جده عبد المطلب، ثم عمه أبو طالب.',
      'Birth of the Prophet (PBUH)',
      'Prophet Muhammad (PBUH) was born in Makkah in the year 571 CE into the Quraysh tribe. His father Abdullah died before his birth, and his mother Amina died when he was six years old. He was raised by his grandfather Abdul-Muttalib, then his uncle Abu Talib.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '18:00',
    thumbnail: '/thumbnails/birth.jpg',
    status: 'published',
    tags: ['sirah', 'birth', 'makkah'],
    createdAt: '2026-03-10',
    updatedAt: '2026-03-10',
  },
  {
    id: 'l-sira-makkah-bi-tha',
    title: {
      sw: "Bi'tha na Mwanzo wa Da'wa",
      ar: 'البعثة وبداية الدعوة',
      en: 'The Mission and the Beginning of the Call',
    },
    slug: 'bi-tha-na-da-wa',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-makkah',
    order: 2,
    content: content(
      "Bi'tha na Mwanzo wa Da'wa",
      "Mtume (SAW) alipokea wahyi wa kwanza akiwa na umri wa miaka 40 katika pango la Hira'. Ujumbe wa kwanza ulikuwa 'Iqra' kutoka Sura Al-Alaq. Aliuita watu kwa siri kwa miaka mitatu kabla ya kueleza ujumbe waziwazi.",
      'البعثة وبداية الدعوة',
      'تلقى النبي ﷺ الوحي الأول وعمره ٤٠ سنة في غار حراء. كانت أول كلمة "اقرأ" من سورة العلق. ودعا الناس سراً لمدة ثلاث سنوات قبل الجهر بالدعوة.',
      'The Mission and the Beginning of the Call',
      "The Prophet (PBUH) received the first revelation at the age of 40 in the cave of Hira'. The first word was 'Iqra' (Read) from Surah Al-Alaq. He called people secretly for three years before announcing the message publicly.",
      'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '20:00',
    thumbnail: '/thumbnails/bitha.jpg',
    status: 'published',
    tags: ['sirah', 'revelation', 'dawah'],
    createdAt: '2026-03-13',
    updatedAt: '2026-03-13',
  },
  {
    id: 'l-sira-madinah-hijra',
    title: {
      sw: 'Hijra ya Mtume (SAW)',
      ar: 'هجرة النبي ﷺ',
      en: 'The Hijra of the Prophet (PBUH)',
    },
    slug: 'hijra',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-madinah',
    order: 1,
    content: content(
      'Hijra ya Mtume (SAW)',
      "Mwaka 622 BK, Mtume (SAW) alihama kutoka Makkah kwenda Madinah baada ya miaka 13 ya mateso. Alisafiri akiwa na Abu Bakr (RA), wakijificha katika pango la Thawr kwa siku tatu. Hijra ndiyo mwanzo wa kalenda ya Kiislamu.",
      'هجرة النبي ﷺ',
      'في عام ٦٢٢ م هاجر النبي ﷺ من مكة إلى المدينة بعد ١٣ سنة من الاضطهاد. سافر مع أبي بكر رضي الله عنه واختبأ في غار ثور ثلاثة أيام. وبدأ بهذا التقويم الهجري.',
      'The Hijra of the Prophet (PBUH)',
      'In the year 622 CE, the Prophet (PBUH) migrated from Makkah to Madinah after 13 years of persecution. He travelled with Abu Bakr (RA), hiding in the cave of Thawr for three days. The Hijra marks the beginning of the Islamic calendar.',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'lecture',
    duration: '22:00',
    thumbnail: '/thumbnails/hijra.jpg',
    status: 'published',
    tags: ['sirah', 'hijra', 'madinah'],
    createdAt: '2026-03-16',
    updatedAt: '2026-03-16',
  },

  // ============================================
  // ADHKAR
  // ============================================
  {
    id: 'l-adhkar-asubuhi',
    title: {
      sw: 'Adhkar za Asubuhi',
      ar: 'أذكار الصباح',
      en: 'Morning Adhkar',
    },
    slug: 'adhkar-za-asubuhi',
    subjectId: 'adhkar',
    levelId: 'awali',
    courseId: 'adhkar-asubuhi-jioni',
    order: 1,
    content: content(
      'Adhkar za Asubuhi',
      "Baada ya Swala ya Alfajiri, Muislamu hupendekezwa kusoma adhkar za asubuhi: Ayatul Kursi, Sura Al-Ikhlas mara tatu, Sura Al-Falaq mara tatu, na Sura An-Nas mara tatu. Pia ni vyema kusema 'Subhanallah, Alhamdulillah, Allahu Akbar' mara 33 kila moja.",
      'أذكار الصباح',
      'بعد صلاة الفجر، يُستحب للمسلم قراءة أذكار الصباح: آية الكرسي، وسورة الإخلاص ثلاث مرات، وسورة الفلق ثلاث مرات، وسورة الناس ثلاث مرات. ويُستحب أيضاً قول "سبحان الله، الحمد لله، الله أكبر" ٣٣ مرة لكل واحدة.',
      'Morning Adhkar',
      "After Fajr prayer, a Muslim is encouraged to recite the morning remembrances: Ayat al-Kursi, Surah Al-Ikhlas three times, Surah Al-Falaq three times, and Surah An-Nas three times. It is also recommended to say 'SubhanAllah, Alhamdulillah, Allahu Akbar' 33 times each.",
      'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'recitation',
    duration: '12:00',
    thumbnail: '/thumbnails/adhkar-morning.jpg',
    status: 'published',
    tags: ['adhkar', 'morning', 'daily'],
    createdAt: '2026-03-20',
    updatedAt: '2026-03-20',
  },
  {
    id: 'l-adhkar-jioni',
    title: {
      sw: 'Adhkar za Jioni',
      ar: 'أذكار المساء',
      en: 'Evening Adhkar',
    },
    slug: 'adhkar-za-jioni',
    subjectId: 'adhkar',
    levelId: 'awali',
    courseId: 'adhkar-asubuhi-jioni',
    order: 2,
    content: content(
      'Adhkar za Jioni',
      "Baada ya Swala ya Alasiri, Muislamu husoma adhkar za jioni — kufanana na za asubuhi lakini kwa wakati wa jioni. Hizi ni kinga dhidi ya shari za usiku na zinaleta amani moyoni.",
      'أذكار المساء',
      'بعد صلاة العصر، يقرأ المسلم أذكار المساء — مشابهة لأذكار الصباح لكن في وقت المساء. وهي حماية من شرور الليل وتجلب السكينة للقلب.',
      'Evening Adhkar',
      'After Asr prayer, a Muslim recites the evening remembrances — similar to the morning ones but for the evening. They are protection from the harms of the night and bring peace to the heart.',
      'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'recitation',
    duration: '11:00',
    thumbnail: '/thumbnails/adhkar-evening.jpg',
    status: 'published',
    tags: ['adhkar', 'evening', 'daily'],
    createdAt: '2026-03-22',
    updatedAt: '2026-03-22',
  },
  {
    id: 'l-adhkar-shughuli-kula',
    title: {
      sw: 'Dua za Kula na Kunywa',
      ar: 'أدعية الأكل والشرب',
      en: 'Supplications for Eating and Drinking',
    },
    slug: 'dua-za-kula-na-kunywa',
    subjectId: 'adhkar',
    levelId: 'awali',
    courseId: 'adhkar-shughuli',
    order: 1,
    content: content(
      'Dua za Kula na Kunywa',
      "Kabla ya kula: 'Bismillah' (Kwa jina la Allah). Ukisahau mwanzoni: 'Bismillahi awwalahu wa aakhirahu'. Baada ya kula: 'Alhamdu lillahi alladhi at'amani hadha wa razaqani min ghayri hawlin minni wa la quwwah'.",
      'أدعية الأكل والشرب',
      'قبل الأكل: "بسم الله". وإن نسي: "بسم الله أوله وآخره". وبعد الأكل: "الحمد لله الذي أطعمني هذا ورزقنيه من غير حول مني ولا قوة".',
      'Supplications for Eating and Drinking',
      "Before eating: 'Bismillah' (In the name of Allah). If forgotten at the start: 'Bismillahi awwalahu wa aakhirahu'. After eating: 'All praise is for Allah who fed me this and provided for me without any strength or power on my part'.",
      'بِسْمِ اللَّهِ',
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'recitation',
    duration: '8:00',
    thumbnail: '/thumbnails/dua-eating.jpg',
    status: 'published',
    tags: ['adhkar', 'eating', 'daily'],
    createdAt: '2026-03-25',
    updatedAt: '2026-03-25',
  },
  {
    id: 'l-adhkar-shughuli-kulala',
    title: {
      sw: 'Dua za Kulala na Kuamka',
      ar: 'أدعية النوم والاستيقاظ',
      en: 'Supplications for Sleeping and Waking',
    },
    slug: 'dua-za-kulala-na-kuamka',
    subjectId: 'adhkar',
    levelId: 'awali',
    courseId: 'adhkar-shughuli',
    order: 2,
    content: content(
      'Dua za Kulala na Kuamka',
      "Kabla ya kulala: 'Bismika Allahumma amutu wa ahya' (Kwa jina lako, ee Allah, nafa na naishi). Pia inashauriwa kusoma Ayatul Kursi na sura tatu za mwisho. Baada ya kuamka: 'Alhamdu lillahi alladhi ahyaana ba'da maa amaatana wa ilayhi an-nushur'.",
      'أدعية النوم والاستيقاظ',
      'قبل النوم: "باسمك اللهم أموت وأحيا". ويُستحب أيضاً قراءة آية الكرسي والمعوذات. عند الاستيقاظ: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور".',
      'Supplications for Sleeping and Waking',
      "Before sleeping: 'In Your name, O Allah, I die and I live'. It is also recommended to recite Ayat al-Kursi and the last three suras. Upon waking: 'All praise is for Allah who gave us life after death, and to Him is the resurrection'.",
    ),
    videoUrl: 'https://www.youtube.com/embed/ZYaZ6Odbx_Y',
    audioSrc: 'https://server8.mp3quran.net/afs/001.mp3',
    audioType: 'recitation',
    duration: '9:00',
    thumbnail: '/thumbnails/dua-sleep.jpg',
    status: 'published',
    tags: ['adhkar', 'sleep', 'daily'],
    createdAt: '2026-03-28',
    updatedAt: '2026-03-28',
  },
]

// ============================================
// Mock Users
// ============================================

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
    progress: ['aina-za-najisi', 'wudhu'],
    levelAccess: ['awali'],
    createdAt: '2026-03-10'
  }
]

export const mockCredentials: Record<string, string> = {
  'admin@ahlusunna.info': 'admin123',
  'moderator@ahlusunna.info': 'mod123',
  'mwanafunzi@ahlusunna.info': 'user123',
}

// ============================================
// Contact Messages
// ============================================

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
    message: 'Nina swali kuhusu hukumu ya wudhu...',
    status: 'new',
    createdAt: '2026-05-01',
  },
  {
    id: 'msg-2',
    name: 'Kassim',
    email: 'kassim@test.com',
    subject: 'Kosa katika somo',
    message: 'Kwenye somo la Tajwid dakika ya pili kuna kosa...',
    status: 'read',
    createdAt: '2026-04-28',
  }
]

// ============================================
// Media
// ============================================

export const media: Media[] = [
  {
    id: 'media-1',
    type: 'image',
    url: '/images/quran-pattern.jpg',
    thumbnail: '/thumbnails/quran-pattern-thumb.jpg',
    title: { sw: "Mfano wa Qur'an", ar: 'نمط قرآني', en: 'Quranic Pattern' },
    description: {
      sw: 'Mfano wa kijiometria ya Kiislamu.',
      ar: 'نمط هندسي إسلامي.',
      en: 'Decorative Islamic geometric pattern.',
    },
    mimeType: 'image/jpeg',
    size: 245000,
  },
]

// ============================================
// Admin Stats
// ============================================

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
  { id: 'adhkar', slug: 'adhkar', name: { sw: 'Adhkar', ar: 'الأذكار', en: 'Adhkar' }, type: 'subject' },
  { id: 'basics', slug: 'basics', name: { sw: 'Misingi', ar: 'الأساسيات', en: 'Basics' }, type: 'topic' },
  { id: 'foundations', slug: 'foundations', name: { sw: 'Msingi', ar: 'الأسس', en: 'Foundations' }, type: 'topic' },
  { id: 'tajwid', slug: 'tajwid', name: { sw: 'Tajwid', ar: 'التجويد', en: 'Tajwid' }, type: 'topic' },
  { id: 'twahara', slug: 'twahara', name: { sw: 'Twahara', ar: 'الطهارة', en: 'Purification' }, type: 'topic' },
  { id: 'swala', slug: 'swala', name: { sw: 'Swala', ar: 'الصلاة', en: 'Prayer' }, type: 'topic' },
  { id: 'saumu', slug: 'saumu', name: { sw: 'Saumu', ar: 'الصيام', en: 'Fasting' }, type: 'topic' },
  { id: 'monotheism', slug: 'monotheism', name: { sw: 'Tauhid', ar: 'التوحيد', en: 'Monotheism' }, type: 'topic' },
  { id: 'daily', slug: 'daily', name: { sw: 'Kila Siku', ar: 'يومية', en: 'Daily' }, type: 'topic' },
  { id: 'beginner', slug: 'beginner', name: { sw: 'Awali', ar: 'مبتدئ', en: 'Beginner' }, type: 'difficulty' },
  { id: 'intermediate', slug: 'intermediate', name: { sw: 'Kati', ar: 'متوسط', en: 'Intermediate' }, type: 'difficulty' },
  { id: 'advanced', slug: 'advanced', name: { sw: 'Juu', ar: 'متقدم', en: 'Advanced' }, type: 'difficulty' },
]

// ============================================
// Helper functions
// ============================================

export const getLessonBySlug = (slug: string): Lesson | undefined =>
  lessons.find((lesson) => lesson.slug === slug)

export const getSubjectById = (id: SubjectId): Subject | undefined =>
  subjects.find((subject) => subject.id === id)

export const getSubjectBySlug = (slug: string): Subject | undefined =>
  subjects.find((subject) => subject.slug === slug)

export const getLessonsBySubject = (subjectId: SubjectId): Lesson[] =>
  lessons.filter((lesson) => lesson.subjectId === subjectId).sort((a, b) => a.order - b.order)

export const getLessonsByLevel = (levelId: LevelId): Lesson[] =>
  lessons.filter((lesson) => lesson.levelId === levelId).sort((a, b) => a.order - b.order)

export const getLessonsByCourse = (courseId: string): Lesson[] =>
  lessons.filter((lesson) => lesson.courseId === courseId).sort((a, b) => a.order - b.order)

export const getCoursesBySubject = (subjectId: SubjectId): Course[] =>
  courses.filter((course) => course.subjectId === subjectId).sort((a, b) => a.order - b.order)

export const getModulesByCourse = (courseId: string): Module[] =>
  modules.filter((module) => module.courseId === courseId).sort((a, b) => a.order - b.order)

export const getLevelById = (id: LevelId): Level | undefined =>
  levels.find((level) => level.id === id)

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
