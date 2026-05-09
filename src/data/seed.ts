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
// Helpers — original (kept for compatibility)
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
// Helpers — rich content builder
// Produces TiptapDocument with multiple sections:
// h2/h3 headings, paragraphs, lists, blockquotes.
// Output shape is identical to TiptapDocument so
// the Lesson schema remains unchanged.
// ============================================

type DocSection =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'quote'; text: string; cite?: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }

const buildDoc = (sections: DocSection[]): TiptapDocument => ({
  type: 'doc',
  content: sections.map((s) => {
    if (s.kind === 'h2' || s.kind === 'h3') {
      return {
        type: 'heading',
        attrs: { level: s.kind === 'h2' ? 2 : 3 },
        content: [{ type: 'text', text: s.text }],
      }
    }
    if (s.kind === 'p') {
      return {
        type: 'paragraph',
        content: [{ type: 'text', text: s.text }],
      }
    }
    if (s.kind === 'quote') {
      const inner: TiptapDocument['content'] = [
        { type: 'paragraph', content: [{ type: 'text', text: s.text }] },
      ]
      if (s.cite) {
        inner.push({
          type: 'paragraph',
          content: [{ type: 'text', text: '— ' + s.cite }],
        })
      }
      return { type: 'blockquote', content: inner }
    }
    // bullet or ordered list
    return {
      type: s.kind === 'ol' ? 'orderedList' : 'bulletList',
      content: s.items.map((item) => ({
        type: 'listItem',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: item }] },
        ],
      })),
    }
  }),
})

const richContent = (
  sw: DocSection[],
  ar: DocSection[],
  en: DocSection[],
): MultilingualContent => ({
  sw: buildDoc(sw),
  ar: buildDoc(ar),
  en: buildDoc(en),
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
      sw: 'Mafunzo ya kwanza kwa wanaoanza kujifunza Uislamu. Hapa utapata misingi ya dini ya Kiislamu.',
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
// Subjects (6)
// ============================================

export const subjects: Subject[] = [
  {
    id: 'quran',
    name: { sw: "Qur'an", ar: 'القرآن الكريم', en: 'The Qur\'an' },
    slug: 'quran',
    description: {
      sw: "Kitabu cha Allah kilichoteremshwa kwa Mtume Muhammad ﷺ — chanzo cha kwanza cha mafundisho ya Kiislamu.",
      ar: 'كتاب الله المنزَّل على النبي محمد ﷺ — المصدر الأول للتشريع الإسلامي.',
      en: "The Book of Allah revealed to Prophet Muhammad ﷺ — the primary source of Islamic teaching.",
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
      sw: 'Maneno, matendo, na ridhaa ya Mtume Muhammad ﷺ — chanzo cha pili cha sheria ya Kiislamu.',
      ar: 'أقوال النبي ﷺ وأفعاله وتقريراته — المصدر الثاني للتشريع الإسلامي.',
      en: 'The sayings, actions, and tacit approvals of Prophet Muhammad ﷺ — the second source of Islamic law.',
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
      sw: 'Hukumu za kisheria zinazosimamia ibada na muamala ya Mwislamu katika maisha ya kila siku.',
      ar: 'الأحكام الشرعية التي تنظم عبادات المسلم ومعاملاته في حياته اليومية.',
      en: 'The legal rulings governing a Muslim\'s acts of worship and dealings in daily life.',
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
      sw: 'Imani ya kumpwekesha Allah katika uola wake, ibada yake, na majina na sifa zake.',
      ar: 'إفراد الله تعالى في ربوبيته وألوهيته وأسمائه وصفاته.',
      en: 'Affirming the oneness of Allah in His Lordship, in worship, and in His names and attributes.',
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
      sw: 'Maisha ya Mtume Muhammad ﷺ kuanzia kuzaliwa hadi kufariki kwake — mfano kamili kwa wanadamu.',
      ar: 'حياة النبي محمد ﷺ من المولد إلى الوفاة — القدوة الكاملة للبشرية.',
      en: "The life of Prophet Muhammad ﷺ from birth to passing — the perfect example for humanity.",
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
      sw: 'Dhikri na dua zilizothibitishwa kutoka kwa Mtume ﷺ kwa nyakati na hali za kila siku.',
      ar: 'الأذكار والأدعية الثابتة عن النبي ﷺ في أوقات وأحوال اليوم.',
      en: 'Authentic remembrances and supplications from the Prophet ﷺ for various daily times and situations.',
    },
    icon: 'heart-handshake',
    levelId: 'awali',
    order: 6,
    status: 'active',
  },
]

// ============================================
// Courses (= Topics)
// ============================================

export const courses: Course[] = [
  // -------- QUR'AN --------
  {
    id: 'quran-utangulizi',
    slug: 'utangulizi-wa-quran',
    title: { sw: "Utangulizi wa Qur'an", ar: 'مقدمة في علوم القرآن', en: "Introduction to the Qur'an" },
    description: {
      sw: "Misingi ya Qur'an: maana, ushushaji, na kuhifadhiwa kwake.",
      ar: 'أساسيات القرآن الكريم: تعريفه، نزوله، وحفظه.',
      en: "Foundations of the Qur'an: definition, revelation, and preservation.",
    },
    subjectId: 'quran',
    levelId: 'awali',
    order: 1,
    status: 'active',
  },
  {
    id: 'quran-tajwid',
    slug: 'kanuni-za-tajwid',
    title: { sw: 'Kanuni za Tajwid', ar: 'أحكام التجويد', en: 'Rules of Tajwid' },
    description: {
      sw: "Sayansi ya kusoma Qur'an kwa usahihi wa matamshi na sifa za herufi.",
      ar: 'علم تلاوة القرآن وفق مخارج الحروف وصفاتها.',
      en: "The science of reciting the Qur'an with correct pronunciation and letter qualities.",
    },
    subjectId: 'quran',
    levelId: 'awali',
    order: 2,
    status: 'active',
  },

  // -------- HADITH --------
  {
    id: 'hadith-utangulizi',
    slug: 'utangulizi-wa-hadith',
    title: { sw: 'Utangulizi wa Sayansi ya Hadith', ar: 'مقدمة في علوم الحديث', en: 'Introduction to Hadith Sciences' },
    description: {
      sw: 'Maana ya Hadith, vipengele vyake, na vipimo vya uhalali.',
      ar: 'معنى الحديث، أقسامه، ومعايير صحته.',
      en: 'The meaning of Hadith, its components, and the criteria of authenticity.',
    },
    subjectId: 'hadith',
    levelId: 'awali',
    order: 1,
    status: 'active',
  },
  {
    id: 'hadith-misingi',
    slug: 'hadith-za-misingi',
    title: { sw: 'Hadith za Misingi', ar: 'الأحاديث الجامعة', en: 'Foundational Hadith' },
    description: {
      sw: 'Hadith muhimu zinazoelezea misingi ya imani na amali.',
      ar: 'أحاديث جامعة لأصول الإيمان والعمل.',
      en: 'Pivotal hadith that frame the foundations of faith and action.',
    },
    subjectId: 'hadith',
    levelId: 'awali',
    order: 2,
    status: 'active',
  },

  // -------- FIQHI --------
  {
    id: 'fiqhi-twahara',
    slug: 'twahara',
    title: { sw: 'Twahara', ar: 'الطهارة', en: 'Purification' },
    description: {
      sw: 'Hukumu za usafi wa kimwili na wa kiibada — najisi, wudhu, na ghusl.',
      ar: 'أحكام الطهارة الحسية والشرعية — النجاسات والوضوء والغسل.',
      en: 'Rulings of physical and ritual purity — impurities, ablution, and full ritual bath.',
    },
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 1,
    status: 'active',
  },
  {
    id: 'fiqhi-swala',
    slug: 'swala',
    title: { sw: 'Swala', ar: 'الصلاة', en: 'Prayer' },
    description: {
      sw: 'Nguzo ya pili ya Uislamu — nyakati, nguzo, na namna ya kuswali.',
      ar: 'الركن الثاني من الإسلام — الأوقات، والأركان، وكيفية الصلاة.',
      en: 'The second pillar of Islam — times, pillars, and the manner of prayer.',
    },
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 2,
    status: 'active',
  },
  {
    id: 'fiqhi-saumu',
    slug: 'saumu',
    title: { sw: 'Saumu', ar: 'الصيام', en: 'Fasting' },
    description: {
      sw: 'Saumu ya Ramadhani — masharti, hukumu, na hekima zake.',
      ar: 'صيام رمضان — شروطه، أحكامه، وحكمه.',
      en: 'The fast of Ramadan — its conditions, rulings, and wisdom.',
    },
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 3,
    status: 'active',
  },
  {
    id: 'fiqhi-zaka',
    slug: 'zaka',
    title: { sw: 'Zaka', ar: 'الزكاة', en: 'Zakat (Obligatory Charity)' },
    description: {
      sw: 'Nguzo ya tatu ya Uislamu — kusafisha mali na kusaidia wahitaji.',
      ar: 'الركن الثالث من الإسلام — تطهير المال ومواساة المحتاجين.',
      en: 'The third pillar of Islam — purifying wealth and supporting the needy.',
    },
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 4,
    status: 'active',
  },

  // -------- TAWHIDI --------
  {
    id: 'tawhidi-misingi',
    slug: 'misingi-ya-tawhidi',
    title: { sw: 'Misingi ya Tawhidi', ar: 'أصول التوحيد', en: 'Foundations of Tawhid' },
    description: {
      sw: 'Maana ya Tawhidi na umuhimu wake katika dini.',
      ar: 'معنى التوحيد ومكانته في الدين.',
      en: 'The meaning of Tawhid and its place in the religion.',
    },
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 1,
    status: 'active',
  },
  {
    id: 'tawhidi-aina',
    slug: 'aina-za-tawhidi',
    title: { sw: 'Aina Tatu za Tawhidi', ar: 'أقسام التوحيد الثلاثة', en: 'The Three Categories of Tawhid' },
    description: {
      sw: 'Tawhid ar-Rububiyyah, al-Uluhiyyah, na al-Asma wa as-Sifat.',
      ar: 'توحيد الربوبية، والألوهية، والأسماء والصفات.',
      en: 'Tawhid of Lordship, of Worship, and of Names and Attributes.',
    },
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 2,
    status: 'active',
  },
  {
    id: 'tawhidi-shirk',
    slug: 'shirk',
    title: { sw: 'Shirk na Kuepukana Nayo', ar: 'الشرك والوقاية منه', en: 'Shirk and Its Avoidance' },
    description: {
      sw: 'Aina za Shirk, hatari yake, na njia za kujikinga.',
      ar: 'أنواع الشرك، خطره، وطرق الوقاية منه.',
      en: 'Types of shirk, its gravity, and means of protection.',
    },
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 3,
    status: 'active',
  },

  // -------- SIRA --------
  {
    id: 'sira-makkah',
    slug: 'kipindi-cha-makkah',
    title: { sw: 'Kipindi cha Makkah', ar: 'العهد المكي', en: 'The Makkan Period' },
    description: {
      sw: 'Maisha ya Mtume ﷺ Makkah kabla ya Hijra — miaka kumi na tatu.',
      ar: 'حياة النبي ﷺ في مكة قبل الهجرة — ثلاث عشرة سنة.',
      en: 'The life of the Prophet ﷺ in Makkah before the Hijra — thirteen years.',
    },
    subjectId: 'sira',
    levelId: 'awali',
    order: 1,
    status: 'active',
  },
  {
    id: 'sira-madinah',
    slug: 'kipindi-cha-madinah',
    title: { sw: 'Kipindi cha Madinah', ar: 'العهد المدني', en: 'The Madinan Period' },
    description: {
      sw: 'Hijra na ujenzi wa jamii ya kwanza ya Kiislamu — miaka kumi.',
      ar: 'الهجرة وبناء الدولة الإسلامية الأولى — عشر سنوات.',
      en: 'The Hijra and the building of the first Muslim community — ten years.',
    },
    subjectId: 'sira',
    levelId: 'awali',
    order: 2,
    status: 'active',
  },

  // -------- ADHKAR --------
  {
    id: 'adhkar-asubuhi-jioni',
    slug: 'adhkar-za-asubuhi-na-jioni',
    title: { sw: 'Adhkar za Asubuhi na Jioni', ar: 'أذكار الصباح والمساء', en: 'Morning and Evening Adhkar' },
    description: {
      sw: 'Dhikri zinazothibitishwa kusomwa baada ya Alfajiri na Alasiri.',
      ar: 'الأذكار الثابتة بعد الفجر وبعد العصر.',
      en: 'Authentic remembrances established for after Fajr and after Asr.',
    },
    subjectId: 'adhkar',
    levelId: 'awali',
    order: 1,
    status: 'active',
  },
  {
    id: 'adhkar-shughuli',
    slug: 'adhkar-za-shughuli-za-kila-siku',
    title: { sw: 'Adhkar za Shughuli za Kila Siku', ar: 'أذكار الأنشطة اليومية', en: 'Adhkar for Daily Activities' },
    description: {
      sw: 'Dua za kula, kulala, kuamka, kusafiri, kuingia na kutoka msikitini.',
      ar: 'أدعية الأكل، النوم، الاستيقاظ، السفر، ودخول وخروج المسجد.',
      en: 'Supplications for eating, sleeping, waking, travelling, and entering and leaving the mosque.',
    },
    subjectId: 'adhkar',
    levelId: 'awali',
    order: 2,
    status: 'active',
  },
]

// ============================================
// Modules (= Subtopics)
// ============================================

export const modules: Module[] = [
  // -------- Qur'an: Utangulizi --------
  {
    id: 'm-quran-utangulizi-quran',
    slug: 'quran-ni-nini',
    title: { sw: "Qur'an Ni Nini?", ar: 'ما هو القرآن؟', en: "What is the Qur'an?" },
    description: {
      sw: "Maana, sifa, na umuhimu wa Qur'an Tukufu.",
      ar: 'معنى القرآن وصفاته ومكانته.',
      en: "The meaning, qualities, and importance of the Qur'an.",
    },
    courseId: 'quran-utangulizi',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-quran-utangulizi-uvio',
    slug: 'uvio-wa-quran',
    title: { sw: "Uvio wa Qur'an", ar: 'نزول القرآن', en: "The Revelation of the Qur'an" },
    description: {
      sw: "Namna na hatua za kushushwa kwa Qur'an.",
      ar: 'كيفية نزول القرآن ومراحله.',
      en: "The manner and stages of revelation.",
    },
    courseId: 'quran-utangulizi',
    order: 2,
    status: 'active',
  },
  {
    id: 'm-quran-utangulizi-ukusanyaji',
    slug: 'ukusanyaji-wa-quran',
    title: { sw: "Ukusanyaji na Hifadhi ya Qur'an", ar: 'جمع القرآن وحفظه', en: "Compilation and Preservation" },
    description: {
      sw: "Jinsi Qur'an ilivyokusanywa na kuhifadhiwa hadi leo.",
      ar: 'كيف جُمع القرآن وحُفظ إلى يومنا هذا.',
      en: "How the Qur'an was compiled and preserved to this day.",
    },
    courseId: 'quran-utangulizi',
    order: 3,
    status: 'active',
  },

  // -------- Qur'an: Tajwid --------
  {
    id: 'm-quran-tajwid-misingi',
    slug: 'misingi-ya-tajwid',
    title: { sw: 'Misingi ya Tajwid', ar: 'مبادئ التجويد', en: 'Fundamentals of Tajwid' },
    description: {
      sw: 'Hukumu ya Tajwid na umuhimu wa kusoma kwa usahihi.',
      ar: 'حكم التجويد وأهمية الإتقان في التلاوة.',
      en: 'The ruling on Tajwid and the importance of accurate recitation.',
    },
    courseId: 'quran-tajwid',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-quran-tajwid-makharij',
    slug: 'mahali-pa-kutoa-herufi',
    title: { sw: 'Mahali pa Kutoa Herufi (Makharij)', ar: 'مخارج الحروف', en: 'Articulation Points (Makharij)' },
    description: {
      sw: 'Sehemu kuu tano ambazo herufi za Kiarabu hutoka.',
      ar: 'المواضع الخمسة الرئيسية لخروج حروف العربية.',
      en: 'The five main areas from which Arabic letters originate.',
    },
    courseId: 'quran-tajwid',
    order: 2,
    status: 'active',
  },

  // -------- Hadith: Utangulizi --------
  {
    id: 'm-hadith-utangulizi-maana',
    slug: 'maana-ya-hadith',
    title: { sw: 'Maana na Vipengele vya Hadith', ar: 'تعريف الحديث وأركانه', en: 'Definition and Components of Hadith' },
    description: {
      sw: 'Hadith ni nini, sanad na matn, na nafasi yake katika dini.',
      ar: 'تعريف الحديث، السند والمتن، ومنزلته في الدين.',
      en: 'What hadith is, the sanad and matn, and its place in the religion.',
    },
    courseId: 'hadith-utangulizi',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-hadith-utangulizi-aina',
    slug: 'aina-za-hadith',
    title: { sw: 'Aina za Hadith Kwa Uhalali', ar: 'أقسام الحديث من حيث الصحة', en: 'Types of Hadith by Authenticity' },
    description: {
      sw: 'Sahih, Hasan, Daif, na Mawdu — vipimo vya kila aina.',
      ar: 'الصحيح والحسن والضعيف والموضوع ومعايير كل نوع.',
      en: 'Sahih, Hasan, Da\'if, and Mawdu — the criteria of each grade.',
    },
    courseId: 'hadith-utangulizi',
    order: 2,
    status: 'active',
  },
  {
    id: 'm-hadith-utangulizi-vitabu',
    slug: 'vitabu-vya-hadith',
    title: { sw: 'Vitabu Sita Vikuu vya Hadith', ar: 'الكتب الستة في الحديث', en: 'The Six Major Hadith Collections' },
    description: {
      sw: 'Sahih al-Bukhari, Muslim, na Sunan nne.',
      ar: 'صحيح البخاري ومسلم والسنن الأربع.',
      en: 'Sahih al-Bukhari, Muslim, and the four Sunan.',
    },
    courseId: 'hadith-utangulizi',
    order: 3,
    status: 'active',
  },

  // -------- Hadith: Misingi --------
  {
    id: 'm-hadith-misingi-imani',
    slug: 'hadith-ya-imani',
    title: { sw: 'Hadith ya Jibril (Misingi ya Imani)', ar: 'حديث جبريل (أركان الإيمان)', en: 'The Hadith of Jibril (Pillars of Faith)' },
    description: {
      sw: 'Hadith inayoeleza Islam, Iman, na Ihsan.',
      ar: 'الحديث الذي يُبيّن الإسلام والإيمان والإحسان.',
      en: 'The hadith explaining Islam, Iman, and Ihsan.',
    },
    courseId: 'hadith-misingi',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-hadith-misingi-niyya',
    slug: 'hadith-ya-niyya',
    title: { sw: 'Hadith ya Nia', ar: 'حديث النية', en: 'The Hadith of Intention' },
    description: {
      sw: '"Hakika matendo ni kwa nia" — kanuni kuu ya Sharia.',
      ar: '"إنما الأعمال بالنيات" — قاعدة كبرى في الشريعة.',
      en: '"Actions are but by intentions" — a foundational principle.',
    },
    courseId: 'hadith-misingi',
    order: 2,
    status: 'active',
  },

  // -------- Fiqhi: Twahara --------
  {
    id: 'm-fiqhi-twahara-najisi',
    slug: 'aina-za-najisi',
    title: { sw: 'Aina za Najisi', ar: 'أنواع النجاسات', en: 'Types of Impurity' },
    description: {
      sw: 'Najisi nzito, wastani, na nyepesi — na jinsi ya kuzitakasa.',
      ar: 'النجاسة المغلظة والمتوسطة والمخففة وكيفية تطهيرها.',
      en: 'Heavy, medium, and light impurity — and how to purify each.',
    },
    courseId: 'fiqhi-twahara',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-fiqhi-twahara-wudhu',
    slug: 'wudhu',
    title: { sw: 'Wudhu', ar: 'الوضوء', en: 'Wudhu (Ablution)' },
    description: {
      sw: 'Nguzo, sunna, na vitu vinavyovunja wudhu.',
      ar: 'فرائض الوضوء، سننه، ونواقضه.',
      en: 'Obligations, sunnahs, and nullifiers of wudhu.',
    },
    courseId: 'fiqhi-twahara',
    order: 2,
    status: 'active',
  },
  {
    id: 'm-fiqhi-twahara-ghusl',
    slug: 'ghusl',
    title: { sw: 'Ghusl (Kuoga kwa Janaba)', ar: 'الغسل', en: 'Ghusl (Full Ritual Bath)' },
    description: {
      sw: 'Vinavyolazimisha ghusl na namna sahihi ya kuifanya.',
      ar: 'موجبات الغسل وصفته الصحيحة.',
      en: 'What necessitates ghusl and how to perform it correctly.',
    },
    courseId: 'fiqhi-twahara',
    order: 3,
    status: 'active',
  },

  // -------- Fiqhi: Swala --------
  {
    id: 'm-fiqhi-swala-wakati',
    slug: 'wakati-wa-swala',
    title: { sw: 'Nyakati za Swala Tano', ar: 'أوقات الصلوات الخمس', en: 'Times of the Five Prayers' },
    description: {
      sw: 'Mwanzo na mwisho wa kila wakati — Fajr hadi Isha.',
      ar: 'بداية ونهاية كل وقت — من الفجر إلى العشاء.',
      en: 'Beginning and end of each time — from Fajr to Isha.',
    },
    courseId: 'fiqhi-swala',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-fiqhi-swala-nguzo',
    slug: 'nguzo-na-masharti',
    title: { sw: 'Nguzo na Masharti ya Swala', ar: 'أركان الصلاة وشروطها', en: 'Pillars and Conditions of Prayer' },
    description: {
      sw: 'Vipi Swala inakuwa sahihi: nguzo, masharti, na wajibati.',
      ar: 'ما يجب لصحة الصلاة: الأركان، الشروط، والواجبات.',
      en: 'What makes a prayer valid: pillars, conditions, and obligations.',
    },
    courseId: 'fiqhi-swala',
    order: 2,
    status: 'active',
  },
  {
    id: 'm-fiqhi-swala-namna',
    slug: 'namna-ya-kuswali',
    title: { sw: 'Namna ya Kuswali — Hatua kwa Hatua', ar: 'صفة الصلاة خطوة بخطوة', en: 'How to Pray — Step by Step' },
    description: {
      sw: 'Kutoka takbir ya kwanza hadi salamu ya mwisho.',
      ar: 'من تكبيرة الإحرام إلى التسليم.',
      en: 'From the opening Takbir to the closing Salaam.',
    },
    courseId: 'fiqhi-swala',
    order: 3,
    status: 'active',
  },

  // -------- Fiqhi: Saumu --------
  {
    id: 'm-fiqhi-saumu-masharti',
    slug: 'masharti-ya-saumu',
    title: { sw: 'Masharti na Hukumu za Saumu', ar: 'شروط الصيام وأحكامه', en: 'Conditions and Rulings of Fasting' },
    description: {
      sw: 'Nani anatakiwa kufunga, na nani amesamehewa.',
      ar: 'من يجب عليه الصيام ومن يُعفى منه.',
      en: 'Who is obligated to fast, and who is exempted.',
    },
    courseId: 'fiqhi-saumu',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-fiqhi-saumu-mufattirat',
    slug: 'mambo-yanayoivunja-saumu',
    title: { sw: 'Mambo Yanayoivunja Saumu', ar: 'مفطرات الصيام', en: 'What Breaks the Fast' },
    description: {
      sw: 'Mufattirat za waziwazi na zile za hila.',
      ar: 'المفطرات الظاهرة والمختلف فيها.',
      en: 'Clear nullifiers of the fast and contested matters.',
    },
    courseId: 'fiqhi-saumu',
    order: 2,
    status: 'active',
  },

  // -------- Fiqhi: Zaka --------
  {
    id: 'm-fiqhi-zaka-misingi',
    slug: 'misingi-ya-zaka',
    title: { sw: 'Misingi ya Zaka', ar: 'أصول الزكاة', en: 'Foundations of Zakat' },
    description: {
      sw: 'Maana, hukumu, na hekima ya Zaka.',
      ar: 'معنى الزكاة وحكمها وحكمتها.',
      en: 'Meaning, ruling, and wisdom of Zakat.',
    },
    courseId: 'fiqhi-zaka',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-fiqhi-zaka-mali',
    slug: 'mali-zinazolazimu-zaka',
    title: { sw: 'Mali Zinazolazimu Zaka', ar: 'الأموال التي تجب فيها الزكاة', en: 'Wealth on Which Zakat is Due' },
    description: {
      sw: 'Dhahabu, fedha, biashara, mifugo, na mazao.',
      ar: 'الذهب والفضة وعروض التجارة والأنعام والزروع.',
      en: 'Gold, silver, business stock, livestock, and crops.',
    },
    courseId: 'fiqhi-zaka',
    order: 2,
    status: 'active',
  },

  // -------- Tawhidi: Misingi --------
  {
    id: 'm-tawhidi-misingi-maana',
    slug: 'maana-ya-tawhidi',
    title: { sw: 'Maana ya Tawhidi', ar: 'معنى التوحيد', en: 'Meaning of Tawhid' },
    description: {
      sw: 'Tawhidi katika lugha na katika sheria.',
      ar: 'التوحيد في اللغة وفي الشرع.',
      en: 'Tawhid in language and in Islamic law.',
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
      sw: 'Kumpwekesha Allah katika kuumba, kumiliki, na kuendesha mambo.',
      ar: 'إفراد الله بالخلق والملك والتدبير.',
      en: 'Affirming Allah alone as Creator, Owner, and Sustainer.',
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
      sw: 'Kumuabudu Allah pekee — kiini cha ujumbe wa kila Mtume.',
      ar: 'إفراد الله بالعبادة — لب رسالة كل نبي.',
      en: 'Worshipping Allah alone — the core of every prophet\'s message.',
    },
    courseId: 'tawhidi-aina',
    order: 2,
    status: 'active',
  },
  {
    id: 'm-tawhidi-aina-asma',
    slug: 'tawhid-asma-wa-sifat',
    title: { sw: 'Tawhid al-Asma wa as-Sifat', ar: 'توحيد الأسماء والصفات', en: 'Tawhid of Names and Attributes' },
    description: {
      sw: 'Kuamini majina na sifa za Allah kama zilivyo.',
      ar: 'الإيمان بأسماء الله وصفاته كما جاءت.',
      en: 'Affirming Allah\'s names and attributes as they have come.',
    },
    courseId: 'tawhidi-aina',
    order: 3,
    status: 'active',
  },

  // -------- Tawhidi: Shirk --------
  {
    id: 'm-tawhidi-shirk-aina',
    slug: 'aina-za-shirk',
    title: { sw: 'Aina za Shirk', ar: 'أنواع الشرك', en: 'Types of Shirk' },
    description: {
      sw: 'Shirk Akbar na Shirk Asghar — tofauti na athari zake.',
      ar: 'الشرك الأكبر والشرك الأصغر — الفرق والآثار.',
      en: 'Major shirk and minor shirk — differences and consequences.',
    },
    courseId: 'tawhidi-shirk',
    order: 1,
    status: 'active',
  },

  // -------- Sira: Makkah --------
  {
    id: 'm-sira-makkah-kuzaliwa',
    slug: 'kuzaliwa-na-utoto',
    title: { sw: 'Kuzaliwa na Utoto wa Mtume ﷺ', ar: 'مولد النبي ﷺ ونشأته', en: 'Birth and Childhood of the Prophet ﷺ' },
    description: {
      sw: 'Familia, kuzaliwa, na malezi yake hadi ujana.',
      ar: 'النسب، الولادة، والنشأة حتى الشباب.',
      en: 'Lineage, birth, and upbringing until young adulthood.',
    },
    courseId: 'sira-makkah',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-sira-makkah-bi-tha',
    slug: 'mwanzo-wa-unabii',
    title: { sw: 'Mwanzo wa Unabii', ar: 'بداية البعثة', en: 'The Beginning of Prophethood' },
    description: {
      sw: 'Wahyi wa kwanza katika pango la Hira na miaka ya kwanza ya Da\'wa.',
      ar: 'الوحي الأول في غار حراء والسنوات الأولى من الدعوة.',
      en: 'The first revelation in the cave of Hira and the early years of Da\'wa.',
    },
    courseId: 'sira-makkah',
    order: 2,
    status: 'active',
  },
  {
    id: 'm-sira-makkah-mateso',
    slug: 'mateso-na-subira',
    title: { sw: 'Mateso na Subira ya Waislamu wa Kwanza', ar: 'الاضطهاد وصبر الصحابة الأوائل', en: 'Persecution and Patience of the Early Muslims' },
    description: {
      sw: 'Mateso ya Quraysh, Hijra ya Habasha, na mwaka wa huzuni.',
      ar: 'اضطهاد قريش، الهجرة إلى الحبشة، وعام الحزن.',
      en: 'Quraysh persecution, the migration to Abyssinia, and the Year of Sorrow.',
    },
    courseId: 'sira-makkah',
    order: 3,
    status: 'active',
  },

  // -------- Sira: Madinah --------
  {
    id: 'm-sira-madinah-hijra',
    slug: 'hijra',
    title: { sw: 'Hijra ya Mtume ﷺ', ar: 'هجرة النبي ﷺ', en: 'The Hijra of the Prophet ﷺ' },
    description: {
      sw: 'Safari kutoka Makkah kwenda Madinah na maana yake.',
      ar: 'الرحلة من مكة إلى المدينة ودلالاتها.',
      en: 'The journey from Makkah to Madinah and its significance.',
    },
    courseId: 'sira-madinah',
    order: 1,
    status: 'active',
  },
  {
    id: 'm-sira-madinah-jamii',
    slug: 'kujenga-jamii-ya-kiislamu',
    title: { sw: 'Kujenga Jamii ya Kiislamu Madinah', ar: 'بناء المجتمع المسلم في المدينة', en: 'Building the Muslim Community in Madinah' },
    description: {
      sw: 'Kujenga msikiti, undugu wa Muhajir na Ansar, na mkataba wa Madinah.',
      ar: 'بناء المسجد، المؤاخاة بين المهاجرين والأنصار، ووثيقة المدينة.',
      en: 'The mosque, the brotherhood of Muhajirun and Ansar, and the Constitution of Madinah.',
    },
    courseId: 'sira-madinah',
    order: 2,
    status: 'active',
  },

  // -------- Adhkar: Asubuhi & Jioni --------
  {
    id: 'm-adhkar-asubuhi',
    slug: 'adhkar-za-asubuhi',
    title: { sw: 'Adhkar za Asubuhi', ar: 'أذكار الصباح', en: 'Morning Adhkar' },
    description: {
      sw: 'Dhikri za baada ya Alfajiri hadi jua kupanda.',
      ar: 'أذكار ما بعد الفجر إلى ارتفاع الشمس.',
      en: 'Remembrances after Fajr until sunrise.',
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
      sw: 'Dhikri za baada ya Alasiri hadi giza.',
      ar: 'أذكار ما بعد العصر إلى المغرب.',
      en: 'Remembrances after Asr until nightfall.',
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
      sw: 'Mwanzo na mwisho wa chakula, na sunna za jedwali.',
      ar: 'بدء الطعام وختمه وآداب المائدة.',
      en: 'Beginning, ending, and etiquettes of meals.',
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
      sw: 'Kabla ya kulala na pale unapoamka.',
      ar: 'قبل النوم وعند الاستيقاظ.',
      en: 'Before sleep and upon waking.',
    },
    courseId: 'adhkar-shughuli',
    order: 2,
    status: 'active',
  },
  {
    id: 'm-adhkar-shughuli-msikiti',
    slug: 'dua-za-kuingia-na-kutoka-msikitini',
    title: { sw: 'Dua za Kuingia na Kutoka Msikitini', ar: 'أدعية دخول المسجد والخروج منه', en: 'Supplications for Entering and Leaving the Mosque' },
    description: {
      sw: 'Adabu za nyumba ya Allah.',
      ar: 'آداب بيت الله.',
      en: 'Etiquettes of the house of Allah.',
    },
    courseId: 'adhkar-shughuli',
    order: 3,
    status: 'active',
  },
  {
    id: 'm-adhkar-shughuli-safari',
    slug: 'dua-za-safari',
    title: { sw: 'Dua za Safari na Usafiri', ar: 'أدعية السفر والركوب', en: 'Supplications for Travel and Riding' },
    description: {
      sw: 'Kuanza safari, kupanda gari, na kurudi salama.',
      ar: 'بدء السفر، ركوب الدابة، والعودة بسلام.',
      en: 'Setting out, mounting a vehicle, and returning safely.',
    },
    courseId: 'adhkar-shughuli',
    order: 4,
    status: 'active',
  },
]

// ============================================
// Lessons — comprehensive, authentic content
// ============================================

export const lessons: Lesson[] = [
  // ============================================
  // QUR'AN — Utangulizi
  // ============================================
  {
    id: 'l-quran-utangulizi-1',
    title: {
      sw: "Qur'an Ni Nini? — Maana, Sifa na Utukufu Wake",
      ar: 'تعريف القرآن الكريم وصفاته ومكانته',
      en: "What is the Qur'an? Definition, Qualities, and Status",
    },
    slug: 'quran-ni-nini',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-utangulizi',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: "Maana ya Qur'an" },
        { kind: 'p', text: "Qur'an ni neno la Allah lililoteremshwa kwa Mtume Muhammad ﷺ kwa lugha ya Kiarabu, kupitia malaika Jibril عليه السلام, lililohifadhiwa katika misahafu, lililopokewa kutoka kwa Mtume kwa njia ya tawaatur (wapokezi wengi wasioweza kushirikiana katika uongo), na linaloabudiwa Allah kwa kulisoma. Maana hii inajumuisha mambo matano muhimu yanayotofautisha Qur'an na maandiko mengineyo: chanzo chake (Allah), mlinzi wake (Jibril), aliyeshushiwa (Muhammad ﷺ), namna ya kuhifadhiwa (kuandikwa na kukaririwa), na njia ya kufika kwetu (tawaatur)." },
        { kind: 'p', text: "Allah amejielezea Qur'an kuwa ni mwongozo, uponyaji, na rehema kwa wenye kuamini. Si kitabu cha historia tu, wala si kitabu cha sheria tu, bali ni miongozo kamili kwa maisha yote ya mwanadamu — kuanzia uhusiano wake na Mola, hadi muamala wake na watu, hadi maadili yake binafsi." },
        { kind: 'quote', text: 'هُوَ هُدًى وَشِفَاءٌ', cite: 'Fussilat 41:44' },
        { kind: 'h3', text: "Sifa Maalumu za Qur'an" },
        { kind: 'p', text: "Qur'an ina sifa nyingi zinazoiweka katika nafasi ya pekee miongoni mwa vitabu vyote vya kidini. Sifa hizi ni dalili za asili yake ya kimungu na uthibitisho wa hifadhi yake." },
        { kind: 'ul', items: [
          "Lugha yake ya kimaajabu — Waarabu wa wakati huo, walikuwa mafundi wa lugha, walishindwa kabisa kuleta mfano wake hata sura moja, ingawa Allah aliwaita kufanya hivyo.",
          "Kuhifadhiwa kwake kikamilifu — Allah mwenyewe ameahidi kuihifadhi: 'Hakika Sisi tumeiteremsha hii Qur'an, na hakika Sisi tutaihifadhi' (Al-Hijr 15:9).",
          "Kufaa kwake kwa kila zama — sheria zake zinatumika kwa watu wa kila wakati na mahali, na hekima zake hazichuji kwa kupita kwa muda.",
          "Kuthibitishwa kwa elimu ya kisasa — habari zake za kale za viumbe na ulimwengu zinaendelea kuthibitishwa na ugunduzi wa kisayansi.",
          "Athari yake kwa nyoyo — wasomaji na hata wasikilizaji wenye kuelewa Kiarabu hupata mguso wa pekee wanaposikia maneno yake."
        ] },
        { kind: 'h3', text: "Muundo wa Qur'an" },
        { kind: 'p', text: "Qur'an ina sura 114 — sura zikubwa kama Al-Baqarah ambayo ni juzuu zaidi ya mbili na sura ndogo kama Al-Kawthar yenye aya tatu tu. Jumla ya aya ni zaidi ya 6,200. Imegawanywa katika juzuu thelathini ili kurahisisha kuhifadhi na kusoma. Sura zimegawanywa kuwa Makki (zilizoteremshwa Makkah) na Madani (zilizoteremshwa Madinah), kila kundi lina sifa zake za kipekee — Makkiya zinasisitiza Tawhidi na Akhera, Madaniya zinatoa miongozo ya kijamii na kisheria." },
      ],
      [
        { kind: 'h2', text: 'تعريف القرآن الكريم' },
        { kind: 'p', text: 'القرآن الكريم هو كلام الله تعالى المُنزَّل على نبيه محمد ﷺ بلسان عربي مبين، عن طريق جبريل عليه السلام، المكتوب في المصاحف، المنقول إلينا بالتواتر، المتعبَّد بتلاوته. ويتضمن هذا التعريف خمس قيود تميّز القرآن عن غيره: مصدره (الله)، والوسيط (جبريل)، والمتلقي (محمد ﷺ)، وطريقة حفظه (الكتابة والاستظهار)، ووسيلة وصوله إلينا (التواتر).' },
        { kind: 'p', text: 'وصف الله القرآن بأنه هدى وشفاء ورحمة للمؤمنين. فليس كتاب تاريخ فحسب، ولا كتاب أحكام فحسب، بل هو منهج حياة شامل — يربط بين العبد وربه، وينظم تعاملاته مع الناس، ويهذّب أخلاقه.' },
        { kind: 'quote', text: 'هُوَ هُدًى وَشِفَاءٌ', cite: 'فصلت ٤١:٤٤' },
        { kind: 'h3', text: 'خصائص القرآن' },
        { kind: 'p', text: 'للقرآن خصائص متعددة تجعله في مرتبة فريدة بين سائر الكتب الدينية، وهي شواهد على مصدره الإلهي ودلائل على حفظه.' },
        { kind: 'ul', items: [
          'إعجازه البياني — تحدّى الله العرب — وهم أهل البلاغة — أن يأتوا بمثله أو بسورة منه فعجزوا.',
          'حفظه التام — تكفّل الله بحفظه: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ" (الحجر ٩).',
          'صلاحيته لكل زمان ومكان — أحكامه تناسب البشر في كل عصر، وحكمه لا تبلى بمرور الزمان.',
          'موافقته للعلم الحديث — كثير من إخباره عن الكون والإنسان أكدها العلم الحديث.',
          'تأثيره في القلوب — تالوه ومستمعوه ممن يفهم العربية يجدون في كلامه أثراً خاصاً.'
        ] },
        { kind: 'h3', text: 'بنية القرآن' },
        { kind: 'p', text: 'يشتمل القرآن على ١١٤ سورة — منها الطويلة كالبقرة التي تزيد على جزأين، ومنها القصيرة كالكوثر التي ثلاث آيات. ومجموع آياته يزيد على ٦٢٠٠ آية. وقُسِّم إلى ثلاثين جزءاً تيسيراً للحفظ والقراءة. وتُقسم السور إلى مكية (نزلت قبل الهجرة) ومدنية (نزلت بعد الهجرة)، ولكل قسم سمات — فالمكية تركّز على التوحيد والآخرة، والمدنية تتناول التشريعات الاجتماعية والأحكام.' },
      ],
      [
        { kind: 'h2', text: "The Definition of the Qur'an" },
        { kind: 'p', text: "The Qur'an is the speech of Allah revealed to Prophet Muhammad ﷺ in clear Arabic, transmitted through the angel Jibril (Gabriel) عليه السلام, recorded in the masahif (written codices), conveyed to us by mass transmission (tawatur — narration by such large numbers in every generation that collusion in falsehood is impossible), and the recitation of which is itself an act of worship. This definition contains five elements that distinguish the Qur'an from every other text: its source (Allah), its intermediary (Jibril), its recipient (Muhammad ﷺ), the manner of its preservation (writing and memorisation), and the method of its transmission (tawatur)." },
        { kind: 'p', text: "Allah describes the Qur'an as guidance, healing, and mercy for the believers. It is not merely a book of history, nor only a book of laws, but a comprehensive guide to all of human life — from a person's relationship with the Creator, to his dealings with other people, to his personal character." },
        { kind: 'quote', text: 'هُوَ هُدًى وَشِفَاءٌ — "It is guidance and healing."', cite: 'Fussilat 41:44' },
        { kind: 'h3', text: "Distinctive Qualities" },
        { kind: 'p', text: "The Qur'an has many qualities that place it in a unique position among all sacred texts. These qualities serve as evidence of its divine origin and proof of its preservation." },
        { kind: 'ul', items: [
          "Its linguistic miracle — the Arabs of that era, masters of language, were entirely unable to produce its like even in a single sura, despite Allah's repeated challenge.",
          "Its complete preservation — Allah Himself promised to guard it: 'Indeed, We have sent down the Reminder, and indeed We will preserve it' (Al-Hijr 15:9).",
          "Its enduring relevance — its laws apply to people of every age and place, and its wisdom does not fade with time.",
          "Its concordance with modern knowledge — many of its statements about creation and the human being have been confirmed by modern scientific discovery.",
          "Its impact on hearts — readers and listeners who understand Arabic experience a distinctive moral and spiritual effect from its words."
        ] },
        { kind: 'h3', text: "Structure of the Qur'an" },
        { kind: 'p', text: "The Qur'an comprises 114 suras (chapters) — long ones such as Al-Baqarah which spans more than two juz', and short ones such as Al-Kawthar with only three verses. The total number of verses (ayat) exceeds 6,200. The text is divided into thirty parts (juz') to facilitate memorisation and recitation. Suras are classified as Makki (revealed before the Hijra) or Madani (revealed afterwards); each group has distinct features — Makki suras emphasise monotheism and the hereafter, while Madani suras address social legislation and detailed rulings." },
      ],
    ),
    duration: '18:00',
    status: 'published',
    tags: ['quran', 'introduction', 'basics'],
    createdAt: '2026-01-15',
    updatedAt: '2026-01-15',
  },

  {
    id: 'l-quran-utangulizi-2',
    title: {
      sw: "Uvio wa Qur'an — Hatua na Hekima",
      ar: 'نزول القرآن — مراحله وحكمته',
      en: "The Revelation of the Qur'an — Stages and Wisdom",
    },
    slug: 'uvio-wa-quran',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-utangulizi',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: "Hatua za Kuteremshwa kwa Qur'an" },
        { kind: 'p', text: "Wanachuoni wamebainisha kuwa Qur'an ilipita katika hatua mbili kuu kabla ya kufika kwa Mtume Muhammad ﷺ. Awali, iliandikwa katika Lawh al-Mahfudh (Ubao Uliohifadhiwa) — kumbukumbu ya elimu ya Allah ambayo huja zaidi ya kuumbwa kwa ulimwengu. Kisha, kwa amri ya Allah, iliteremshwa kwa jumla katika Bayt al-Izzah katika mbingu ya dunia katika usiku wa Laylat al-Qadr. Kutoka huko, Jibril عليه السلام alikuwa akimletea Mtume kipande baada ya kipande kwa muda wa miaka ishirini na tatu." },
        { kind: 'quote', text: 'إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ', cite: "Al-Qadr 97:1" },
        { kind: 'h3', text: "Miaka Ishirini na Mitatu ya Wahyi" },
        { kind: 'p', text: "Miaka kumi na mitatu ya kwanza ilikuwa ni Makkah, ambapo aya zilizoteremshwa zilikuwa zikishughulikia hasa imani ya Mungu mmoja, ufufuo, akhera, na hadithi za mitume waliotangulia. Miaka kumi iliyobaki ilikuwa ni Madinah baada ya Hijra, ambapo aya nyingi zilihusu sheria za kijamii — ndoa, miamala, urithi, jihadi, na mfumo wa serikali ya Kiislamu. Kwa kawaida aya zilikuwa zikiteremshwa kuhusiana na matukio mahususi yaliyokuwa yakitokea, jambo linaloitwa 'asbab an-nuzul' (sababu za kuteremshwa)." },
        { kind: 'h3', text: "Hekima za Kuteremshwa kwa Hatua" },
        { kind: 'p', text: "Allah angeweza kuiteremsha Qur'an kwa mara moja kama vile vitabu vingine vilivyoteremshwa kwa mitume kabla. Lakini hekima ya Allah ilikuwa ni kuiteremsha kidogo kidogo kwa sababu zifuatazo:" },
        { kind: 'ol', items: [
          "Kuimarisha moyo wa Mtume ﷺ na kumfariji wakati wa shida na mateso, kwani kila wahyi mpya ulikuwa kama ujumbe wa kibinafsi kutoka kwa Mola wake.",
          "Kurahisisha kuhifadhi na kuelewa kwa maswahaba — wangepokea aya chache, kuzielewa, kuzitumia, kisha kupokea zaidi.",
          "Kujibu maswali na kutatua matatizo yaliyokuwa yakijitokeza katika jamii ya kwanza ya Kiislamu — sheria zikitoka pale zilipohitajika.",
          "Kuonyesha hatua kwa hatua jinsi ya kubadilisha jamii, kwani mabadiliko yote ya ghafla yangewashinda watu (kama vile ulevi ulivyoharamishwa kwa hatua tatu).",
          "Kudhihirisha muujiza wa Qur'an, kwani aya zilizoshuka katika hali tofauti zinabaki na umoja wa lugha, mtindo, na ujumbe."
        ] },
      ],
      [
        { kind: 'h2', text: 'مراحل نزول القرآن' },
        { kind: 'p', text: 'بيّن العلماء أن القرآن مرّ بمرحلتين رئيسيتين قبل وصوله إلى النبي محمد ﷺ. فأولاً كُتب في اللوح المحفوظ — وهو سجل علم الله السابق لخلق الكون. ثم بأمر الله نُزِّل جملة واحدة إلى بيت العزة في السماء الدنيا في ليلة القدر. ومن هناك كان جبريل عليه السلام ينزل به على النبي ﷺ مفرَّقاً على مدى ثلاث وعشرين سنة.' },
        { kind: 'quote', text: 'إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ', cite: 'القدر ٩٧:١' },
        { kind: 'h3', text: 'ثلاث وعشرون سنة من الوحي' },
        { kind: 'p', text: 'كانت السنوات الثلاث عشرة الأولى في مكة، وفيها نزلت آيات تتناول التوحيد والبعث والآخرة وقصص الأنبياء السابقين. والسنوات العشر الباقية كانت في المدينة بعد الهجرة، ونزلت فيها آيات التشريع الاجتماعي — النكاح والمعاملات والمواريث والجهاد ونظام الدولة الإسلامية. وكانت الآيات تنزل غالباً متعلقة بأحداث معينة، وهو ما يُسمى "أسباب النزول".' },
        { kind: 'h3', text: 'حكم نزوله مفرَّقاً' },
        { kind: 'p', text: 'كان بإمكان الله أن يُنزل القرآن جملة واحدة كما أُنزلت كتب سابقة، لكن حكمته اقتضت تنزيله مفرَّقاً للأسباب التالية:' },
        { kind: 'ol', items: [
          'تثبيت قلب النبي ﷺ ومواساته في أوقات الشدة، فكل وحي جديد كان كرسالة شخصية من ربه.',
          'تيسير الحفظ والفهم على الصحابة — يتلقون آيات قليلة، يفهمونها ويطبقونها ثم يتلقون المزيد.',
          'الإجابة على الأسئلة وحلّ المشكلات في المجتمع المسلم الناشئ — فالأحكام تنزل عند الحاجة.',
          'التدرّج في التشريع، إذ التغيير المفاجئ يثقل على الناس (كتدرّج تحريم الخمر على ثلاث مراحل).',
          'إظهار إعجاز القرآن، فالآيات النازلة في أحوال متباينة احتفظت بوحدة الأسلوب واللغة والرسالة.'
        ] },
      ],
      [
        { kind: 'h2', text: "Stages of the Revelation" },
        { kind: 'p', text: "Scholars have identified two principal stages through which the Qur'an passed before reaching Prophet Muhammad ﷺ. First, it existed in the Lawh al-Mahfudh (Preserved Tablet) — the record of Allah's foreknowledge that precedes the creation of the universe. Then, by Allah's command, it was sent down in its entirety to Bayt al-Izzah in the lowest heaven on Laylat al-Qadr (the Night of Decree). From there, Jibril عليه السلام conveyed it to the Prophet piece by piece over a span of twenty-three years." },
        { kind: 'quote', text: '"Indeed, We sent it down on the Night of Decree."', cite: "Al-Qadr 97:1" },
        { kind: 'h3', text: "Twenty-Three Years of Revelation" },
        { kind: 'p', text: "The first thirteen years took place in Makkah, where the verses revealed dealt mainly with the oneness of God, resurrection, the hereafter, and the stories of earlier prophets. The remaining ten years were in Madinah after the Hijra, where many verses concerned social legislation — marriage, transactions, inheritance, jihad, and the structure of the Islamic state. Verses were typically revealed in connection with specific events occurring at the time, a phenomenon known as 'asbab al-nuzul' (occasions of revelation)." },
        { kind: 'h3', text: "Wisdoms of Gradual Revelation" },
        { kind: 'p', text: "Allah could have revealed the Qur'an at once, as some earlier scriptures were revealed. But His wisdom required that it descend gradually, for several reasons:" },
        { kind: 'ol', items: [
          "Strengthening the Prophet's heart ﷺ and consoling him in times of hardship and persecution — every new revelation arrived as a personal message from his Lord.",
          "Making memorisation and understanding easier for the Companions — they would receive a few verses, internalise them, apply them, and then receive more.",
          "Answering questions and resolving issues that arose within the new Muslim community — rulings were revealed precisely as they were needed.",
          "Achieving gradual social transformation, for sudden change overwhelms people (as the prohibition of intoxicants was revealed in three progressive stages).",
          "Demonstrating the Qur'an's inimitability, for verses revealed in vastly different circumstances retained complete unity of style, language, and message."
        ] },
      ],
    ),
    duration: '20:00',
    status: 'published',
    tags: ['quran', 'revelation', 'history', 'asbab'],
    createdAt: '2026-01-18',
    updatedAt: '2026-01-18',
  },

  {
    id: 'l-quran-utangulizi-3',
    title: {
      sw: "Ukusanyaji na Hifadhi ya Qur'an",
      ar: 'جمع القرآن وحفظه عبر العصور',
      en: "The Compilation and Preservation of the Qur'an",
    },
    slug: 'ukusanyaji-wa-quran',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-utangulizi',
    order: 3,
    content: richContent(
      [
        { kind: 'h2', text: "Hifadhi Wakati wa Mtume ﷺ" },
        { kind: 'p', text: "Wakati wa uhai wa Mtume Muhammad ﷺ, Qur'an ilihifadhiwa kwa njia mbili kuu: kuhifadhiwa katika nyoyo za maswahaba na kuandikwa kwenye vifaa mbalimbali. Mtume ﷺ alikuwa na waandishi wa wahyi, kama vile Zayd ibn Thabit, Ubayy ibn Ka'b, Mu'adh ibn Jabal, Ali ibn Abi Talib, na wengineo. Kila wahyi mpya ulipoteremshwa, Mtume aliwaita kuandika kwenye majani ya mitende, vipande vya ngozi, mawe meupe, na mifupa ya wanyama." },
        { kind: 'p', text: "Pamoja na kuandika, kukariri kulikuwa ni njia ya msingi ya kuhifadhi. Mamia ya maswahaba walihifadhi Qur'an nzima au sehemu kubwa za kichwani. Mtume mwenyewe ﷺ alikariri Qur'an na Jibril mara moja kila Ramadhan, na mara mbili katika Ramadhan ya mwaka aliokufa." },
        { kind: 'h3', text: "Ukusanyaji wa Abu Bakr رضي الله عنه" },
        { kind: 'p', text: "Baada ya vita vya Yamamah katika ukhalifa wa Abu Bakr as-Siddiq رضي الله عنه, maswahaba wengi walioikariri Qur'an waliuawa shahidi. Umar ibn al-Khattab رضي الله عنه alimshauri Abu Bakr kuikusanya Qur'an katika mahali pamoja akihofu kwamba kifo cha mahufaaz wengi zaidi kingeweza kupoteza sehemu yake. Abu Bakr alimteua Zayd ibn Thabit kuongoza kazi hii. Zayd alikuwa makini sana — hakukubali aya yoyote isipokuwa kama ilithibitishwa kutoka kwa wapokezi wawili wa kuaminika kabisa. Kazi ilikamilika na nakala iliyokusanywa ikahifadhiwa na Abu Bakr, kisha Umar, kisha binti yake Hafsa." },
        { kind: 'h3', text: "Misahafu ya Uthman رضي الله عنه" },
        { kind: 'p', text: "Karibu miaka ishirini baadaye, katika ukhalifa wa Uthman ibn Affan رضي الله عنه, Uislamu ulienea katika nchi nyingi na watu wa kabila tofauti walikuwa wanasoma Qur'an kwa lahaja tofauti. Hili lilianza kuleta utata. Uthman aliamua kuandika nakala rasmi ambazo zingetumwa katika miji mikuu ya Kiislamu. Akamtumia tena Zayd ibn Thabit kuongoza tume iliyolinganisha kile kilichoandikwa wakati wa Abu Bakr. Tume hiyo ilitoa nakala kadhaa ambazo zilisambazwa kwenda Makkah, Damascus, Basra, Kufa, na Madinah. Misahafu yote ya leo duniani inafuata maandiko hayo ya Uthman." },
        { kind: 'h3', text: "Mfumo wa Hifadhi Hadi Leo" },
        { kind: 'p', text: "Tangu wakati huo, mfumo wa kuhifadhi Qur'an umekuwa na vipengele viwili vinavyofanya kazi pamoja: maandiko (mistari ya kitabu) na ushishi (kuhifadhi kichwani). Kwa karne kumi na nne, mamilioni ya watu wamekariri Qur'an nzima neno kwa neno. Hata leo, watoto wadogo katika nchi mbalimbali wanahifadhi maelfu ya aya kwa lugha ya Kiarabu, hata kama si lugha yao ya kawaida. Hii ndiyo ahadi ya Allah ya kuihifadhi Qur'an inavyotekelezwa." },
        { kind: 'quote', text: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ', cite: "Al-Hijr 15:9" },
      ],
      [
        { kind: 'h2', text: 'حفظ القرآن في عهد النبي ﷺ' },
        { kind: 'p', text: 'في عهد النبي محمد ﷺ حُفظ القرآن بطريقتين رئيسيتين: حفظه في صدور الصحابة، وكتابته على وسائل متعددة. وكان للنبي ﷺ كتّاب وحي معروفون منهم زيد بن ثابت وأبيّ بن كعب ومعاذ بن جبل وعلي بن أبي طالب وغيرهم رضي الله عنهم. وكلما نزل وحي جديد دعا النبي كتّابه ليكتبوه على عسب النخل ورقاع الجلد والعظام واللخاف.' },
        { kind: 'p', text: 'وإلى جانب الكتابة، كان الحفظ هو الوسيلة الأساسية. حفظ مئات الصحابة القرآن كاملاً أو أجزاء كبيرة منه. وكان النبي ﷺ نفسه يعارض القرآن مع جبريل في كل رمضان مرة واحدة، فلما كان العام الذي توفي فيه عارضه به مرتين.' },
        { kind: 'h3', text: 'جمع أبي بكر رضي الله عنه' },
        { kind: 'p', text: 'بعد معركة اليمامة في خلافة أبي بكر الصديق رضي الله عنه استشهد كثير من حفظة القرآن. فأشار عمر بن الخطاب رضي الله عنه على أبي بكر بجمع القرآن في مصحف واحد خشية أن يضيع بموت مزيد من الحفاظ. وكلّف أبو بكر زيد بن ثابت بقيادة هذه المهمة. وكان زيد شديد الدقة — لا يقبل آية إلا إذا ثبتت بشاهدين عدلَين. وأكمل المهمة، فحُفظت النسخة المجموعة عند أبي بكر ثم عمر ثم ابنته حفصة.' },
        { kind: 'h3', text: 'مصاحف عثمان رضي الله عنه' },
        { kind: 'p', text: 'بعد عشرين سنة تقريباً في خلافة عثمان بن عفان رضي الله عنه، انتشر الإسلام في بلاد كثيرة وصار الناس من قبائل متعددة يقرأون القرآن بلهجات مختلفة، مما بدأ يثير الخلاف. فقرر عثمان كتابة نسخة رسمية تُرسَل إلى عواصم البلاد الإسلامية. وكلّف زيد بن ثابت مرة أخرى بقيادة لجنة قارنت بما كُتب في عهد أبي بكر. وأعدّت اللجنة عدة نسخ أُرسلت إلى مكة ودمشق والبصرة والكوفة والمدينة. وكل المصاحف اليوم في العالم تتبع رسم عثمان.' },
        { kind: 'h3', text: 'منظومة الحفظ إلى اليوم' },
        { kind: 'p', text: 'منذ ذلك الحين قام نظام حفظ القرآن على ركيزتين متكاملتين: المكتوب والمحفوظ في الصدور. ولأربعة عشر قرناً حفظ ملايين المسلمين القرآن كله كلمة كلمة. وحتى اليوم يحفظ صغار في بلاد متعددة آلاف الآيات بالعربية وإن لم تكن لغتهم الأم. وهذا تحقيق لوعد الله بحفظ كتابه.' },
        { kind: 'quote', text: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ', cite: 'الحجر ١٥:٩' },
      ],
      [
        { kind: 'h2', text: "Preservation in the Prophet's Lifetime ﷺ" },
        { kind: 'p', text: "During the lifetime of Prophet Muhammad ﷺ, the Qur'an was preserved through two complementary means: memorisation in the hearts of the Companions, and recording on various writing materials. The Prophet ﷺ had designated scribes for revelation, including Zayd ibn Thabit, Ubayy ibn Ka'b, Mu'adh ibn Jabal, Ali ibn Abi Talib, and others. Whenever new revelation came, the Prophet would summon them to write it down on palm leaves, parchment, white stones, animal bones, and pieces of leather." },
        { kind: 'p', text: "Alongside writing, oral memorisation was the primary mode of preservation. Hundreds of Companions memorised the entire Qur'an or substantial portions of it by heart. The Prophet ﷺ himself reviewed the entire Qur'an with Jibril once every Ramadan, and twice during the Ramadan of the year in which he passed away." },
        { kind: 'h3', text: "The Compilation under Abu Bakr رضي الله عنه" },
        { kind: 'p', text: "Following the Battle of Yamamah during the caliphate of Abu Bakr as-Siddiq رضي الله عنه, many of the memorisers of the Qur'an were martyred. Umar ibn al-Khattab رضي الله عنه advised Abu Bakr to compile the Qur'an into a single bound volume, fearing that the death of more memorisers might cause portions to be lost. Abu Bakr commissioned Zayd ibn Thabit to lead this task. Zayd was rigorous in the extreme — he would not accept a verse unless confirmed by at least two reliable witnesses. The compilation was completed and the resulting copy was kept by Abu Bakr, then by Umar, then by his daughter Hafsa." },
        { kind: 'h3', text: "The Uthmanic Codices رضي الله عنه" },
        { kind: 'p', text: "About twenty years later, during the caliphate of Uthman ibn Affan رضي الله عنه, Islam had spread to many lands and people of different tribal backgrounds were reciting the Qur'an in varying dialects, which began causing disputes. Uthman decided to produce official codices to be dispatched to the major Muslim cities. He again commissioned Zayd ibn Thabit to lead a committee that cross-checked their work against what had been compiled under Abu Bakr. The committee produced several copies that were sent to Makkah, Damascus, Basra, Kufa, and Madinah. Every mushaf in the world today follows the Uthmanic text." },
        { kind: 'h3', text: "The System of Preservation Until Today" },
        { kind: 'p', text: "Since that time the system of preservation has rested on two complementary pillars: the written text and oral mass-memorisation. For fourteen centuries, millions of Muslims have memorised the entire Qur'an word for word. Even today, young children in many countries memorise thousands of verses in classical Arabic, even when it is not their native tongue. This is the fulfilment of Allah's promise to preserve His Book." },
        { kind: 'quote', text: '"Indeed, We have sent down the Reminder, and indeed We will preserve it."', cite: "Al-Hijr 15:9" },
      ],
    ),
    duration: '22:00',
    status: 'published',
    tags: ['quran', 'compilation', 'preservation', 'history'],
    createdAt: '2026-01-22',
    updatedAt: '2026-01-22',
  },

  // ============================================
  // QUR'AN — Tajwid
  // ============================================
  {
    id: 'l-quran-tajwid-1',
    title: {
      sw: 'Misingi ya Tajwid — Maana, Hukumu na Umuhimu',
      ar: 'مبادئ التجويد — تعريفه وحكمه وأهميته',
      en: 'Fundamentals of Tajwid — Definition, Ruling and Importance',
    },
    slug: 'misingi-ya-tajwid',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-tajwid',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Tajwid' },
        { kind: 'p', text: "Neno 'Tajwid' linatokana na neno la Kiarabu 'jawwada' linalomaanisha 'kufanya jambo kwa ubora.' Katika sheria, Tajwid ni elimu ya kusoma Qur'an kwa namna ambayo kila herufi inatamkwa kutoka mahali pake (makharij), kwa sifa zake (sifaat), bila kuongeza wala kupunguza chochote. Ni elimu inayohifadhi matamshi ya Qur'an kama yalivyopokelewa kutoka kwa Mtume ﷺ kupitia mlolongo wa wapokezi (sanad) wa kuaminika." },
        { kind: 'h3', text: 'Hukumu ya Tajwid' },
        { kind: 'p', text: "Wanavyuoni wamekubaliana kwamba kusoma Qur'an kwa Tajwid kuna sehemu mbili: kusoma kiasi cha kuepuka makosa makubwa yanayobadilisha maana — hii ni faradhi 'ayni (wajibu kwa kila mtu binafsi); na kuhifadhi sheria zote za Tajwid kwa undani — hii ni faradhi kifaya (wajibu wa pamoja, ukifanywa na baadhi unaondoa wajibu kwa wengine). Kusoma kwa hovyo namna ambayo inabadilisha maana ya aya ni haramu." },
        { kind: 'quote', text: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا', cite: "Al-Muzzammil 73:4" },
        { kind: 'p', text: "Allah ameamuru katika aya hii kuisoma Qur'an kwa 'tartil' — yaani kwa makini, polepole, kila herufi ikitoka mahali pake. Ali ibn Abi Talib رضي الله عنه alipoulizwa kuhusu maana ya tartil, alisema: 'Ni kuipa kila herufi haki yake na sifa yake.'" },
        { kind: 'h3', text: 'Umuhimu wa Tajwid' },
        { kind: 'p', text: "Kosa la matamshi linaweza kubadilisha maana ya aya kabisa. Kwa mfano, herufi 'ح' (ha) na 'ه' (ha laini) ni karibu sana kwa sikio la Mwingereza, lakini kuchanganya inaweza kubadilisha 'rahim' (mwenye huruma) kuwa neno tofauti kabisa. Vivyo hivyo, herufi 'ع' na 'أ', au 'ض' na 'د'. Tajwid hulinda Qur'an kutokana na mabadiliko hayo na inahakikisha kwamba kila Mwislamu, popote pale duniani, anasoma maneno yale yale ambayo Mtume ﷺ aliyatamka." },
        { kind: 'h3', text: 'Hatua za Kujifunza' },
        { kind: 'ol', items: [
          'Kuanza kwa kujifunza kwa mwalimu mtaalamu kwa njia ya talaqqi (mafunzo ya kichwa-kwa-kichwa).',
          'Kufahamu makharij — sehemu ambazo herufi za Kiarabu hutoka — kwa mazoezi ya vitendo.',
          'Kuelewa sifaat — sifa za herufi kama vile uzito, wepesi, sauti ya pua, na kadhalika.',
          'Kujifunza kanuni za noon na meem na tanween (idgham, ikhfa, iqlab, izhar).',
          'Kujifunza madd — kanuni za kunyoosha vokali — na hukumu zake mbalimbali.',
          "Kufanya mazoezi ya mara kwa mara kwa kusoma Qur'an na mwalimu wako kila siku."
        ] },
      ],
      [
        { kind: 'h2', text: 'تعريف التجويد' },
        { kind: 'p', text: 'كلمة "تجويد" مشتقة من فعل "جوّد" بمعنى أحسن وأتقن. وفي الاصطلاح: التجويد هو علم تلاوة القرآن بإخراج كل حرف من مخرجه مع إعطائه حقه ومستحقه من الصفات، بلا زيادة ولا نقصان. فهو علم يحفظ نطق القرآن كما تلقاه النبي ﷺ بسند متصل عن جبريل عن رب العزة.' },
        { kind: 'h3', text: 'حكم التجويد' },
        { kind: 'p', text: 'اتفق العلماء أن للتجويد جانبين: العمل بقدر يجتنب به اللحن الجلي الذي يُغيّر المعنى — وهذا فرض عين على كل قارئ؛ وحفظ تفاصيل أحكام التجويد علماً — وهذا فرض كفاية. واللحن الجلي الذي يُغيّر المعنى محرّم.' },
        { kind: 'quote', text: 'وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا', cite: 'المزمل ٧٣:٤' },
        { kind: 'p', text: 'أمر الله بترتيل القرآن — أي قراءته بتمهّل وتؤدة وإخراج كل حرف من مخرجه. وسُئل علي بن أبي طالب رضي الله عنه عن الترتيل فقال: "تجويد الحروف ومعرفة الوقوف."' },
        { kind: 'h3', text: 'أهمية التجويد' },
        { kind: 'p', text: 'الخطأ في النطق قد يُغيّر معنى الآية كلياً. مثلاً حرف "ح" و"ه" متقاربان لمن لا يفرّق بينهما، لكن الخلط بينهما قد يُحوّل "رحيم" إلى كلمة مختلفة تماماً. وكذلك حرفا "ع" و"أ"، و"ض" و"د". فالتجويد يحفظ القرآن من هذه التغييرات ويضمن أن كل مسلم في أي بقعة من العالم يقرأ بنفس الكلمات التي تلفّظ بها النبي ﷺ.' },
        { kind: 'h3', text: 'مراحل التعلم' },
        { kind: 'ol', items: [
          'البدء بالتعلّم على يد شيخ متقن بطريقة التلقي والمشافهة.',
          'إتقان مخارج الحروف بالتمرين العملي.',
          'فهم صفات الحروف من جهر وهمس وإطباق وغيرها.',
          'تعلّم أحكام النون الساكنة والتنوين والميم الساكنة (إدغام وإخفاء وإقلاب وإظهار).',
          'تعلّم أحكام المدّ بأنواعه.',
          'المداومة على القراءة على الشيخ يومياً.'
        ] },
      ],
      [
        { kind: 'h2', text: 'The Meaning of Tajwid' },
        { kind: 'p', text: "The word 'Tajwid' derives from the Arabic verb 'jawwada,' meaning 'to do something with excellence.' Technically, Tajwid is the science of reciting the Qur'an in a manner where every letter is pronounced from its proper articulation point (makhraj), with all its essential qualities (sifaat), neither adding nor omitting anything. It is the discipline that preserves the pronunciation of the Qur'an exactly as it was received from the Prophet ﷺ through an unbroken chain of trustworthy transmitters." },
        { kind: 'h3', text: 'The Ruling on Tajwid' },
        { kind: 'p', text: "Scholars have agreed that Tajwid has two aspects: applying it to the degree of avoiding gross mispronunciation that distorts meaning — this is a personal obligation (fard 'ayn) on every reciter; and mastering the detailed science of Tajwid — this is a communal obligation (fard kifayah) which, when fulfilled by some, lifts the duty from others. Reciting in a manner that distorts the meaning of a verse is forbidden." },
        { kind: 'quote', text: '"And recite the Qur\'an with measured recitation."', cite: "Al-Muzzammil 73:4" },
        { kind: 'p', text: "Allah commands in this verse to recite the Qur'an with 'tartil' — meaning carefully and unhurriedly, with each letter pronounced from its proper place. When Ali ibn Abi Talib رضي الله عنه was asked about the meaning of tartil, he said: 'It is to give every letter its rights and its qualities.'" },
        { kind: 'h3', text: 'The Importance of Tajwid' },
        { kind: 'p', text: "An error in pronunciation can completely change the meaning of a verse. For example, the letters 'ح' (ha) and 'ه' (soft ha) are very close to an English ear, yet confusing them can transform 'rahim' (the Merciful) into an unrelated word. The same is true of 'ع' and 'أ', or 'ض' and 'د'. Tajwid protects the Qur'an from such distortions and ensures that every Muslim, anywhere in the world, recites the very same words the Prophet ﷺ pronounced." },
        { kind: 'h3', text: 'Stages of Learning' },
        { kind: 'ol', items: [
          'Begin by studying with a qualified teacher through talaqqi — direct, face-to-face transmission.',
          'Master the makharij — the points of articulation of Arabic letters — through practical exercise.',
          'Understand the sifaat — the inherent qualities of letters such as heaviness, lightness, nasal sound, and others.',
          'Learn the rules of noon sakinah, tanween, and meem sakinah (idgham, ikhfa, iqlab, izhar).',
          'Study the laws of madd — the elongation of vowels — and their various rulings.',
          'Maintain consistent daily practice by reciting before your teacher.'
        ] },
      ],
    ),
    duration: '20:00',
    status: 'published',
    tags: ['quran', 'tajwid', 'recitation'],
    createdAt: '2026-01-25',
    updatedAt: '2026-01-25',
  },

  {
    id: 'l-quran-tajwid-2',
    title: {
      sw: 'Mahali pa Kutoa Herufi (Makharij)',
      ar: 'مخارج الحروف العربية',
      en: 'Articulation Points of the Arabic Letters (Makharij)',
    },
    slug: 'mahali-pa-kutoa-herufi',
    subjectId: 'quran',
    levelId: 'awali',
    courseId: 'quran-tajwid',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Sehemu Tano Kuu za Makharij' },
        { kind: 'p', text: "Wanavyuoni wa Tajwid wamegawanya makharij katika sehemu kuu tano za mwili: tundu la mdomo na koo (al-jawf), koo (al-halq), ulimi (al-lisan), midomo (ash-shafataan), na pua (al-khaishum). Kila herufi ya Kiarabu hutoka mahali maalum ndani ya sehemu hizi." },
        { kind: 'h3', text: '1. Al-Jawf — Tundu la Hewa' },
        { kind: 'p', text: 'Hapa hutoka herufi za madd (kunyoosha): alif tulivu inayofuata fat-ha, waw tulivu inayofuata damma, na ya tulivu inayofuata kasra. Hutoka kwa hewa inayopita kupitia tundu lote la mdomo bila kizuizi.' },
        { kind: 'h3', text: '2. Al-Halq — Koo' },
        { kind: 'p', text: 'Koo lina sehemu tatu, na kila sehemu ina herufi mbili:' },
        { kind: 'ul', items: [
          'Sehemu ya chini (karibu na kifua): ء (hamza) na ه (ha)',
          'Sehemu ya kati: ع (ayn) na ح (haa)',
          'Sehemu ya juu (karibu na mdomo): غ (ghayn) na خ (kha)'
        ] },
        { kind: 'h3', text: '3. Al-Lisan — Ulimi' },
        { kind: 'p', text: "Ulimi ndio chombo kikubwa zaidi cha kutoa herufi, kikitoa zaidi ya nusu ya herufi za Kiarabu. Sehemu zake ni nyingi: msingi wa ulimi unatoa ق na ك; katikati ya ulimi inatoa ج, ش, na ي; pembeni za ulimi (zinazogonga meno makubwa) inatoa ض; ncha ya ulimi (pamoja na paa la mdomo) inatoa ل, ن, na ر; ncha ya ulimi pamoja na meno ya juu inatoa ت, د, na ط; na ncha ya ulimi pamoja na meno ya chini inatoa س, ز, na ص; mwishowe ulimi pamoja na vidole vya juu vya meno inatoa ث, ذ, na ظ." },
        { kind: 'h3', text: '4. Ash-Shafataan — Midomo' },
        { kind: 'p', text: 'Midomo hutoa herufi nne: ف (kwa kugusa midomo ya chini na vidole vya meno ya juu), na ب, م, na و (kwa kugusa midomo yote miwili). Tofauti ni kwamba ب na م midomo huungana kabisa, lakini و midomo huungana kidogo huku ikitoa hewa.' },
        { kind: 'h3', text: '5. Al-Khaishum — Pua' },
        { kind: 'p', text: 'Hapa hutoka sauti ya ghunna (sauti ya pua) inayopatikana katika herufi ن na م. Ghunna ni sifa ya pua inayoendelea kwa muda fulani, na inakuwa wazi zaidi katika hali maalum kama vile idgham na ikhfa.' },
        { kind: 'h3', text: 'Mazoezi ya Vitendo' },
        { kind: 'p', text: 'Njia bora ya kuelewa makharij ni kufanya mazoezi ya vitendo na mwalimu, ambaye anaweza kukurekebisha pale unapokosea. Funga macho yako, sikia herufi ikitamkwa, kisha jaribu kuiga huku ukijihisi mwenyewe sehemu ya mwili wako inayofanya kazi. Kufanya hivyo kwa muda mrefu kunajenga ufahamu wa kutoa herufi sahihi kiasili.' },
      ],
      [
        { kind: 'h2', text: 'المخارج الخمسة الرئيسية' },
        { kind: 'p', text: 'قسّم علماء التجويد المخارج إلى خمسة مواضع رئيسية في الجهاز النطقي: الجوف، والحلق، واللسان، والشفتان، والخيشوم. ولكل حرف من حروف العربية مخرج معيّن داخل هذه المواضع.' },
        { kind: 'h3', text: '١. الجوف' },
        { kind: 'p', text: 'منه تخرج حروف المدّ الثلاثة: الألف الساكنة المفتوح ما قبلها، والواو الساكنة المضموم ما قبلها، والياء الساكنة المكسور ما قبلها. وتخرج بمرور الهواء عبر تجويف الفم والحلق دون عائق.' },
        { kind: 'h3', text: '٢. الحلق' },
        { kind: 'p', text: 'الحلق ثلاثة أقسام، ولكل قسم حرفان:' },
        { kind: 'ul', items: [
          'أقصى الحلق (مما يلي الصدر): الهمزة والهاء',
          'وسط الحلق: العين والحاء',
          'أدنى الحلق (مما يلي الفم): الغين والخاء'
        ] },
        { kind: 'h3', text: '٣. اللسان' },
        { kind: 'p', text: 'اللسان أكبر أعضاء النطق إذ يخرج منه أكثر من نصف حروف العربية. ومخارجه متعددة: أقصى اللسان (مع ما يحاذيه من الحنك) يخرج القاف والكاف؛ ووسطه يخرج الجيم والشين والياء؛ وحافته يخرج الضاد؛ وطرفه مع الحنك يخرج اللام والنون والراء؛ وطرفه مع الأسنان العليا يخرج التاء والدال والطاء؛ وطرفه مع الثنايا السفلى يخرج السين والزاي والصاد؛ وأخيراً طرفه مع أطراف الثنايا العليا يخرج الثاء والذال والظاء.' },
        { kind: 'h3', text: '٤. الشفتان' },
        { kind: 'p', text: 'تخرج منهما أربعة حروف: الفاء (ببطن الشفة السفلى مع أطراف الثنايا العليا)، والباء والميم والواو (بانطباق الشفتين)، مع الفرق أن الباء والميم تنطبق فيهما الشفتان كلياً، أما الواو فتنطبقان فيها مع تركها مفتوحة قليلاً.' },
        { kind: 'h3', text: '٥. الخيشوم' },
        { kind: 'p', text: 'منه تخرج الغنّة المصاحبة لحرفي النون والميم. والغنّة صفة أنفية تستمر زمناً، وتظهر بوضوح في حالات معينة كالإدغام والإخفاء.' },
        { kind: 'h3', text: 'التطبيق العملي' },
        { kind: 'p', text: 'أفضل طريقة لإتقان المخارج هي التدريب العملي مع شيخ يصحّح الأخطاء. أغلق عينيك واستمع إلى الحرف ينطق، ثم حاول محاكاته مع الإحساس بالعضو الذي يعمل في فمك. التكرار يبني الإحساس الطبيعي بالنطق الصحيح.' },
      ],
      [
        { kind: 'h2', text: 'The Five Main Articulation Areas' },
        { kind: 'p', text: 'Scholars of Tajwid have divided the makharij into five main areas of the vocal apparatus: the empty space of the mouth and throat (al-jawf), the throat (al-halq), the tongue (al-lisan), the lips (ash-shafataan), and the nasal cavity (al-khaishum). Every Arabic letter originates from a specific point within these areas.' },
        { kind: 'h3', text: '1. Al-Jawf — The Empty Space' },
        { kind: 'p', text: 'From here come the three letters of madd (elongation): a quiescent alif preceded by fatha, a quiescent waw preceded by damma, and a quiescent ya preceded by kasra. They emerge as air passes through the entire cavity of the mouth and throat without obstruction.' },
        { kind: 'h3', text: '2. Al-Halq — The Throat' },
        { kind: 'p', text: 'The throat contains three sections, each producing two letters:' },
        { kind: 'ul', items: [
          'The deepest part (closest to the chest): ء (hamza) and ه (ha)',
          'The middle part: ع (ayn) and ح (haa)',
          'The upper part (closest to the mouth): غ (ghayn) and خ (kha)'
        ] },
        { kind: 'h3', text: '3. Al-Lisan — The Tongue' },
        { kind: 'p', text: "The tongue is the largest organ of articulation, producing more than half the Arabic letters. Its various points include: the back of the tongue (against the soft palate) producing ق and ك; the middle producing ج, ش, and ي; the side edges (against the molars) producing ض; the tip (against the front palate) producing ل, ن, and ر; the tip (against the upper incisors) producing ت, د, and ط; the tip (against the lower incisors) producing س, ز, and ص; and finally the tip with the edges of the upper incisors producing ث, ذ, and ظ." },
        { kind: 'h3', text: '4. Ash-Shafataan — The Lips' },
        { kind: 'p', text: 'The lips produce four letters: ف (the inner lower lip touching the upper incisors), and ب, م, and و (with both lips meeting). The distinction is that for ب and م the lips fully close, whereas for و they round but remain slightly open.' },
        { kind: 'h3', text: '5. Al-Khaishum — The Nasal Cavity' },
        { kind: 'p', text: 'From here issues the ghunna (nasal sound) accompanying the letters ن and م. Ghunna is a nasal quality that persists for a duration, and it becomes especially pronounced in specific cases such as idgham and ikhfa.' },
        { kind: 'h3', text: 'Practical Training' },
        { kind: 'p', text: 'The best way to master makharij is through practical exercise with a teacher who can correct errors. Close your eyes, listen to the letter being pronounced, then try to imitate it while feeling which part of your mouth is engaged. Sustained practice builds an intuitive sense of correct articulation.' },
      ],
    ),
    duration: '24:00',
    status: 'published',
    tags: ['quran', 'tajwid', 'makharij'],
    createdAt: '2026-01-28',
    updatedAt: '2026-01-28',
  },

  // ============================================
  // HADITH — Utangulizi
  // ============================================
  {
    id: 'l-hadith-utangulizi-1',
    title: {
      sw: 'Maana ya Hadith na Vipengele Vyake',
      ar: 'تعريف الحديث وأركانه',
      en: 'The Definition and Components of Hadith',
    },
    slug: 'maana-ya-hadith',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-utangulizi',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Hadith Ni Nini?' },
        { kind: 'p', text: "Hadith katika maana ya kisheria ni kila kilichohusishwa na Mtume Muhammad ﷺ — yawe ni maneno aliyoyasema, matendo aliyoyatenda, kitu alichokiidhinisha kimya kimya kilipotokea mbele yake, au sifa yake ya kimwili na ya kimaadili. Hadith ni chanzo cha pili cha sheria ya Kiislamu baada ya Qur'an, na inafanya kazi ya kueleza na kufafanua kile Qur'an inachokisema kwa ufupi." },
        { kind: 'p', text: "Allah ameamuru waumini kumtii Mtume ﷺ pamoja na kumtii Yeye mwenyewe. Hili linaonyesha kwamba ujumbe wa Mtume si maoni yake binafsi bali ni wahyi mwingine kutoka kwa Allah." },
        { kind: 'quote', text: 'وَمَا يَنْطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ', cite: "An-Najm 53:3-4" },
        { kind: 'h3', text: 'Tofauti kati ya Hadith na Sunna' },
        { kind: 'p', text: "Watu wengi huchanganya maneno haya mawili. Hadith ni taarifa au maandiko yanayoeleza kile Mtume alichofanya au kusema. Sunna, upande mwingine, ni njia ya maisha aliyoifuata Mtume — yaani matendo yenyewe, mfano wake. Hadith ni chombo cha kupokea Sunna; Sunna ni yale yaliyo ndani ya Hadith. Kwa mfano, Mtume akiwa na desturi ya kufunga kila Jumatatu na Alhamisi — Sunna ni desturi yenyewe; Hadith ni mwanafunzi anayetuambia kwamba alikuwa na desturi hiyo." },
        { kind: 'h3', text: 'Vipengele Viwili vya Hadith — Sanad na Matn' },
        { kind: 'p', text: 'Hadith yoyote ina sehemu mbili kuu zinazochunguzwa kwa makini na wanavyuoni:' },
        { kind: 'ol', items: [
          'Sanad — mlolongo wa wapokezi unaounganisha mwanachuoni wa kitabu hadi kwa Mtume ﷺ. Mfano: "Imam al-Bukhari amesimulia kutoka kwa Abdullah ibn Yusuf, kutoka kwa Malik, kutoka kwa Nafi, kutoka kwa Abdullah ibn Umar, kwamba Mtume ﷺ alisema..." Mlolongo huu una thamani kubwa kwa sababu uhalali wa hadith unategemea uaminifu wa kila mmoja katika hao wapokezi.',
          'Matn — yaani maandiko yenyewe — yale maneno yaliyosemwa au matendo yaliyofanywa. Hii ndiyo sehemu watu wengi hukumbuka, ingawa wanavyuoni huichunguza vivyo hivyo kwa uchanganuzi.'
        ] },
        { kind: 'h3', text: 'Mtaalam wa Hadith' },
        { kind: 'p', text: "Mwenye kuhifadhi maelfu ya hadith pamoja na sanad zake huitwa 'Hafidh' (mhifadhi); akihifadhi 100,000 huitwa 'Hujja' (hoja); akihifadhi 300,000 huitwa 'Hakim' au 'Amir al-Mu'minin fi'l-Hadith' (Kiongozi wa waumini katika hadith). Wanachuoni kama Imam al-Bukhari na Imam Muslim wa karne ya tatu walifikia daraja hii, jambo lililowawezesha kuandika vitabu sahihi zaidi vya hadith baada ya Qur'an." },
      ],
      [
        { kind: 'h2', text: 'تعريف الحديث' },
        { kind: 'p', text: 'الحديث في الاصطلاح الشرعي هو ما أُضيف إلى النبي محمد ﷺ من قول أو فعل أو تقرير أو صفة خَلْقية أو خُلُقية. والحديث هو المصدر الثاني للتشريع الإسلامي بعد القرآن، ووظيفته بيان وتفصيل ما أجمله القرآن.' },
        { kind: 'p', text: 'أمر الله المؤمنين بطاعة النبي ﷺ مع طاعته سبحانه، مما يدل على أن قول النبي ليس رأياً شخصياً بل وحي من عند الله.' },
        { kind: 'quote', text: 'وَمَا يَنْطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ', cite: 'النجم ٥٣:٣-٤' },
        { kind: 'h3', text: 'الفرق بين الحديث والسنة' },
        { kind: 'p', text: 'كثيراً ما يُخلط بين المصطلحين. الحديث هو الرواية أو النص الذي ينقل ما قاله النبي أو فعله. والسنة هي الطريق الذي سلكه النبي ﷺ في حياته — أي الفعل نفسه والقدوة. فالحديث وعاء السنة، والسنة محتوى الحديث. مثلاً، كان النبي يصوم يومي الاثنين والخميس — السنة هي العمل ذاته، والحديث هو الصحابي الذي يخبرنا بهذه السنة.' },
        { kind: 'h3', text: 'ركنا الحديث — السند والمتن' },
        { kind: 'p', text: 'لكل حديث ركنان رئيسيان يفحصهما العلماء بدقة:' },
        { kind: 'ol', items: [
          'السند — وهو سلسلة الرواة التي تربط مصنف الكتاب بالنبي ﷺ. مثاله: "حدثنا عبد الله بن يوسف عن مالك عن نافع عن عبد الله بن عمر أن النبي ﷺ قال..." وهذه السلسلة عظيمة الأهمية لأن صحة الحديث متوقفة على عدالة كل راوٍ فيها.',
          'المتن — وهو نص الحديث ذاته، ما قيل أو فُعل. وهو الجزء الذي يحفظه الناس عادة، وإن كان العلماء يفحصونه بدقة كذلك.'
        ] },
        { kind: 'h3', text: 'مراتب علماء الحديث' },
        { kind: 'p', text: 'من حفظ آلاف الأحاديث بأسانيدها يُسمى "حافظاً"؛ ومن حفظ مئة ألف يُسمى "حُجّة"؛ ومن حفظ ثلاث مئة ألف يُسمى "حاكماً" أو "أمير المؤمنين في الحديث". وقد بلغ هذه المرتبة علماء كالبخاري ومسلم في القرن الثالث، مما أهّلهم لتأليف أصحّ كتب الحديث بعد القرآن.' },
      ],
      [
        { kind: 'h2', text: 'What is a Hadith?' },
        { kind: 'p', text: "A hadith, in technical Islamic usage, is anything attributed to Prophet Muhammad ﷺ — whether words he said, actions he performed, something he tacitly approved when it occurred in his presence, or descriptions of his physical and moral qualities. Hadith is the second source of Islamic law after the Qur'an, and its function is to explain and elaborate what the Qur'an states briefly." },
        { kind: 'p', text: "Allah commanded the believers to obey the Prophet ﷺ alongside obeying Him, indicating that the Prophet's message is not personal opinion but a further form of revelation from Allah." },
        { kind: 'quote', text: '"Nor does he speak from desire. It is nothing but revelation revealed to him."', cite: "An-Najm 53:3-4" },
        { kind: 'h3', text: 'The Difference between Hadith and Sunnah' },
        { kind: 'p', text: "Many people conflate these two terms. A hadith is a report or text that conveys what the Prophet did or said. The Sunnah, by contrast, is the way of life the Prophet followed — the actions themselves, his living example. Hadith is the vessel through which the Sunnah is transmitted; the Sunnah is the content within the hadith. For instance, the Prophet ﷺ habitually fasted on Mondays and Thursdays — the Sunnah is the practice itself; the hadith is the Companion who informs us of this practice." },
        { kind: 'h3', text: 'The Two Components — Sanad and Matn' },
        { kind: 'p', text: 'Every hadith has two principal components that scholars examine with great care:' },
        { kind: 'ol', items: [
          'Sanad — the chain of transmitters linking the author of a hadith collection back to the Prophet ﷺ. For example: "Imam al-Bukhari narrated to us from Abdullah ibn Yusuf, from Malik, from Nafi, from Abdullah ibn Umar, that the Prophet ﷺ said..." This chain is of supreme importance because the authenticity of a hadith depends entirely on the integrity and reliability of every transmitter in it.',
          'Matn — the actual text of the report — the words spoken or actions described. This is the part most people remember, although scholars examine it with equal rigour.'
        ] },
        { kind: 'h3', text: 'Ranks of Hadith Scholars' },
        { kind: 'p', text: "One who memorises thousands of hadith with their chains is called a 'Hafidh' (preserver); one who memorises 100,000 is called 'Hujja' (proof); one who memorises 300,000 is called 'Hakim' or 'Amir al-Mu'minin fi'l-Hadith' (Commander of the Faithful in Hadith). Scholars such as Imam al-Bukhari and Imam Muslim of the third Islamic century reached this rank, which qualified them to compile the most authentic books of hadith after the Qur'an." },
      ],
    ),
    duration: '20:00',
    status: 'published',
    tags: ['hadith', 'introduction', 'sanad', 'matn'],
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
  },

  {
    id: 'l-hadith-utangulizi-2',
    title: {
      sw: 'Aina za Hadith Kwa Uhalali — Sahih, Hasan, Daif, Mawdu',
      ar: 'أقسام الحديث من حيث القبول والرد',
      en: 'Categories of Hadith by Authenticity',
    },
    slug: 'aina-za-hadith',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-utangulizi',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Mfumo wa Uchunguzi wa Wapokezi' },
        { kind: 'p', text: "Mfumo wa hadith ulioendelezwa na wanavyuoni wa Kiislamu ni mojawapo ya mifumo ya kihistoria iliyo makini zaidi duniani. Wanavyuoni walitengeneza taaluma kubwa inayoitwa 'ilm ar-rijal' (sayansi ya wapokezi), ambapo kila mpokezi alichunguzwa kuhusu uadilifu wake (uaminifu na uchaji wa Mungu) na hifadhi yake (uwezo wa kukumbuka usio na makosa). Vitabu vingi sana viliandikwa vyenye historia ya maelfu ya wapokezi — mwaka aliozaliwa, mwalimu wake, wanafunzi wake, kosa lolote alilowahi kufanya, na wanavyuoni walivyomtaja." },
        { kind: 'h3', text: 'Hadith Sahih' },
        { kind: 'p', text: 'Hadith Sahih ni ile inayotimiza masharti yote matano ya uhalali:' },
        { kind: 'ul', items: [
          'Sanad imeunganishwa bila mapengo — kila mpokezi amepokea kutoka kwa mwanafunzi wake moja kwa moja',
          'Wapokezi wote ni waadilifu — wanyofu wa kidini na maadili',
          'Wapokezi wote ni wahifadhi makini — wenye kumbukumbu thabiti',
          'Hakuna shudhudh — kile kilichopokelewa na mpokezi mmoja hakipingani na wapokezi wengine wenye uaminifu zaidi',
          "Hakuna 'illah — kasoro iliyofichikana kwa mtaalam wa hadith"
        ] },
        { kind: 'p', text: "Hadith zilizo katika Sahih al-Bukhari na Sahih Muslim zote zinakidhi masharti haya, na ndiyo maana vinaitwa vitabu vya hadith sahihi zaidi baada ya Qur'an." },
        { kind: 'h3', text: 'Hadith Hasan' },
        { kind: 'p', text: 'Hadith Hasan ni karibu sahihi lakini moja kati ya wapokezi ana hifadhi kidogo dhaifu kuliko mtaalam aliyependekezwa kwa Sahih. Hadith Hasan ni hoja ya kisheria na zinatumika kama dalili katika fiqh — hazikataliwi kwa udhaifu mdogo. Imam at-Tirmidhi alikuwa wa kwanza kueneza matumizi ya neno hili katika sehemu yake ya hadith.' },
        { kind: 'h3', text: 'Hadith Daif' },
        { kind: 'p', text: "Hadith Daif ni ile inayokosa kipengele kimoja au zaidi cha masharti ya Sahih. Mfano: mpokezi mmoja anaweza kuwa na hifadhi mbaya, au sanad inaweza kukatika, au mpokezi anaweza kuwa hakukutana na yule anayemshtaka kupokea kutoka kwake. Hadith Daif kwa ujumla hazitumiki kuthibitisha hukumu mpya za sheria, ingawa baadhi ya wanavyuoni wanaruhusu kutumia kwa fadhila za matendo ('amal as-salih) chini ya masharti maalum." },
        { kind: 'h3', text: 'Hadith Mawdu — Iliyobandikwa' },
        { kind: 'p', text: "Hadith Mawdu ni hadith bandia, iliyotungwa na mtu na kuhusishwa na Mtume ﷺ kinyume na ukweli. Hii ni dhambi kubwa sana, kwani Mtume ﷺ alisema: 'Atakayesema uongo kwangu kwa makusudi, ajiandalie kiti chake motoni' (Bukhari). Wanavyuoni wamepambana na uongo huu kwa karne nyingi, wakitenganisha hadith bandia na zile za kweli kupitia uchunguzi wa kina wa wapokezi na maandiko." },
        { kind: 'h3', text: 'Hekima ya Mfumo Huu' },
        { kind: 'p', text: 'Mfumo wa hadith unaonyesha umakini wa Uislamu kwa ukweli wa kihistoria. Si kila simulizi inayohusishwa na Mtume inakubaliwa kiotomatiki — lazima ipitishwe kupitia mfumo mkali wa uchunguzi. Hii ni mojawapo ya sababu Uislamu umeweza kuhifadhi mafundisho yake kwa zaidi ya karne kumi na nne bila mabadiliko ya msingi.' },
      ],
      [
        { kind: 'h2', text: 'منظومة فحص الرواة' },
        { kind: 'p', text: 'منظومة الحديث التي طوّرها علماء الإسلام من أدقّ المنظومات التاريخية في العالم. وقد أنشأ العلماء علماً ضخماً يُسمى "علم الرجال" — يفحص فيه كل راوٍ من جهة عدالته (التقوى والصدق) وضبطه (دقة الحفظ). ودوّنت كتب ضخمة في تراجم آلاف الرواة — سنة الميلاد، الشيوخ، التلاميذ، الأخطاء التي وقعت منه، وأقوال العلماء فيه.' },
        { kind: 'h3', text: 'الحديث الصحيح' },
        { kind: 'p', text: 'الحديث الصحيح هو ما توفّرت فيه الشروط الخمسة:' },
        { kind: 'ul', items: [
          'اتصال السند — كل راوٍ تلقّى عمن فوقه مباشرة',
          'عدالة الرواة — صلاحهم في الدين والأخلاق',
          'ضبط الرواة — دقة حفظهم',
          'انتفاء الشذوذ — ألا يخالف ما رواه الراوي من هو أوثق منه',
          'انتفاء العلة — أن يخلو من علّة خفية'
        ] },
        { kind: 'p', text: 'وأحاديث صحيح البخاري ومسلم تستوفي هذه الشروط، ولذلك سُمّيا أصحّ كتابي حديث بعد كتاب الله.' },
        { kind: 'h3', text: 'الحديث الحسن' },
        { kind: 'p', text: 'الحديث الحسن قريب من الصحيح، إلا أن أحد رواته خفّ ضبطه قليلاً. والحديث الحسن حجة شرعية يُحتج به في الفقه ولا يُردّ لخفّة الضبط. والإمام الترمذي أول من شاع عنه استعمال هذا المصطلح في الجامع الصحيح.' },
        { kind: 'h3', text: 'الحديث الضعيف' },
        { kind: 'p', text: 'الحديث الضعيف هو الذي اختلّ فيه شرط أو أكثر من شروط الصحيح. كأن يكون أحد الرواة سيّء الحفظ، أو يكون السند منقطعاً، أو يكون الراوي لم يلقَ من روى عنه. والضعيف لا يُحتج به في إثبات أحكام شرعية في الجملة، وإن أجاز بعض العلماء العمل به في فضائل الأعمال بشروط.' },
        { kind: 'h3', text: 'الحديث الموضوع' },
        { kind: 'p', text: 'الحديث الموضوع هو المختلق المكذوب على النبي ﷺ. وهذا من أعظم الكبائر، فقد قال النبي ﷺ: "من كذب علي متعمداً فليتبوّأ مقعده من النار" (البخاري). وقد كافح العلماء هذا الكذب قروناً وميّزوا الموضوع من الصحيح بفحص الرواة والمتون.' },
        { kind: 'h3', text: 'حكمة هذا النظام' },
        { kind: 'p', text: 'منظومة الحديث تُظهر عناية الإسلام بالحقيقة التاريخية. لا تُقبل كل رواية تُنسب إلى النبي تلقائياً — بل تمر بمنظومة فحص دقيقة. وهذا أحد الأسباب التي حفظت تعاليم الإسلام أربعة عشر قرناً دون تغيير جوهري.' },
      ],
      [
        { kind: 'h2', text: 'The System of Examining Transmitters' },
        { kind: 'p', text: "The hadith system developed by Muslim scholars is one of the most rigorous historical methodologies ever devised. Scholars built an entire science called 'ilm ar-rijal' (the science of narrators), in which every transmitter was examined for both 'adalah (uprightness in religion and character) and dabt (precision of memory). Vast biographical works documented thousands of transmitters — their year of birth, their teachers, their students, any mistake they ever made, and the verdicts of scholars upon them." },
        { kind: 'h3', text: 'Sahih (Authentic) Hadith' },
        { kind: 'p', text: 'A Sahih hadith fulfils all five conditions of authenticity:' },
        { kind: 'ul', items: [
          'Continuous chain — every transmitter received directly from the one above him',
          'Uprightness of all transmitters — moral and religious integrity',
          'Precision of all transmitters — reliable memory',
          'Absence of shudhudh — no contradiction with what more reliable narrators reported',
          "Absence of 'illah — no hidden defect detectable to expert scholars"
        ] },
        { kind: 'p', text: "The hadith found in Sahih al-Bukhari and Sahih Muslim all meet these conditions, which is why these two collections are called the most authentic books of hadith after the Qur'an." },
        { kind: 'h3', text: 'Hasan (Sound) Hadith' },
        { kind: 'p', text: 'A Hasan hadith is close to Sahih, but one of its transmitters has slightly weaker memory than the standard required for Sahih. A Hasan hadith remains religiously authoritative — it is used as evidence in fiqh and is not rejected for the slight weakness in memory. Imam at-Tirmidhi was the first to popularise this terminology in his Jami collection.' },
        { kind: 'h3', text: "Da'if (Weak) Hadith" },
        { kind: 'p', text: "A Da'if hadith is one missing one or more of the conditions for Sahih. For example: one of its transmitters may have poor memory, the chain may be broken, or a transmitter may not have actually met the person from whom he claims to narrate. Weak hadith are generally not used to establish new legal rulings, although some scholars permit their use for encouraging virtuous deeds (fada'il al-a'mal) under specific conditions." },
        { kind: 'h3', text: 'Mawdu (Fabricated) Hadith' },
        { kind: 'p', text: "A Mawdu hadith is a fabrication invented and falsely attributed to the Prophet ﷺ. This is among the gravest sins, for the Prophet ﷺ said: 'Whoever lies upon me deliberately, let him take his seat in the Fire' (Bukhari). Scholars have fought against such fabrications for centuries, distinguishing forged hadith from genuine ones through careful examination of both transmitters and texts." },
        { kind: 'h3', text: 'The Wisdom of This System' },
        { kind: 'p', text: 'The hadith system reflects Islam\'s deep concern for historical truth. Not every report attributed to the Prophet is automatically accepted — each must pass through a rigorous methodology. This is one of the principal reasons Islam has been able to preserve its core teachings for over fourteen centuries without fundamental change.' },
      ],
    ),
    duration: '24:00',
    status: 'published',
    tags: ['hadith', 'sahih', 'classification', 'rijal'],
    createdAt: '2026-02-04',
    updatedAt: '2026-02-04',
  },

  {
    id: 'l-hadith-utangulizi-3',
    title: {
      sw: 'Vitabu Sita Vikuu vya Hadith (Kutub as-Sittah)',
      ar: 'الكتب الستة في الحديث',
      en: 'The Six Major Hadith Collections',
    },
    slug: 'vitabu-vya-hadith',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-utangulizi',
    order: 3,
    content: richContent(
      [
        { kind: 'h2', text: 'Vitabu Sita vya Hadith' },
        { kind: 'p', text: "Wanavyuoni wa Kisunni wameviita 'Kutub as-Sittah' (Vitabu Sita) vitabu sita vinavyokubalika kuwa vyenye kuegemewa zaidi katika kuhifadhi hadith za Mtume ﷺ. Vitabu hivi viliandikwa na waandishi wa karne ya tatu ya Hijri (karne ya tisa BK), ambayo ilikuwa enzi ya dhahabu ya elimu ya hadith." },
        { kind: 'h3', text: '1. Sahih al-Bukhari' },
        { kind: 'p', text: 'Imam Muhammad ibn Ismail al-Bukhari (194–256 H) alikusanya kitabu hiki baada ya safari za miaka 16, akipita katika nchi nyingi za Kiislamu kutafuta na kuchunguza hadith. Kati ya zaidi ya hadith 600,000 alizosikia, alichagua takribani 7,000 tu zilizotimiza masharti yake makali zaidi. Kitabu chake ndicho kinachochukuliwa kuwa kitabu chenye hadith sahihi zaidi baada ya Qur\'an. Imepangwa kwa mada (kama wudhu, swala, biashara), na kila bab ina kichwa kinachoonyesha hukumu ya kifiqhi anayoithibitisha.' },
        { kind: 'h3', text: '2. Sahih Muslim' },
        { kind: 'p', text: 'Imam Muslim ibn al-Hajjaj an-Nisaburi (206–261 H) alikuwa mwanafunzi wa al-Bukhari na rafiki yake. Kitabu chake kinasifiwa kwa upangaji wake mzuri — anakusanya hadith zote zinazohusu mada moja katika sehemu moja, akionyesha matoleo tofauti ya sanad, jambo linalorahisisha utafiti. Hadith zake za sahihi takribani ni 7,500. Wanavyuoni wengi wanasema kuwa Sahih Muslim ni wa pili baada ya Bukhari kwa uhalali, ingawa wengine wanasifu Muslim kwa upangaji bora.' },
        { kind: 'h3', text: '3. Sunan Abi Dawud' },
        { kind: 'p', text: "Imam Abu Dawud Sulayman as-Sijistani (202–275 H) alichagua kuandika kitabu kinachojikita zaidi katika hadith za hukumu (ahadith al-ahkam) — yaani hadith zinazoanzisha sheria za kidini. Hadith zake za 5,274 zimepangwa kwa mada za fiqh, na ni rejeleo kuu kwa wafiqhi. Tofauti na Bukhari na Muslim, alijumuisha pia hadith Hasan na baadhi ya zile dhaifu, akizibainisha." },
        { kind: 'h3', text: '4. Jami at-Tirmidhi' },
        { kind: 'p', text: "Imam Muhammad ibn Isa at-Tirmidhi (209–279 H) alikuwa mwanafunzi wa al-Bukhari. Kitabu chake ni cha pekee kwa sababu kila hadith anaitolea hukumu — Sahih, Hasan, Daif, au Gharib — na anaeleza tofauti za maoni ya wanavyuoni juu yake. Hii inafanya kitabu chake kuwa rasilimali ya thamani kwa wanafunzi wa fiqh." },
        { kind: 'h3', text: '5. Sunan an-Nasai' },
        { kind: 'p', text: 'Imam Ahmad ibn Shu\'ayb an-Nasai (215–303 H) alikuwa na umakini mkubwa katika kuchagua hadith. Kitabu chake "as-Sunan as-Sughra" (Sunan Ndogo) inajumuisha hadith zilizo na masharti makali zaidi kuliko kitabu chake kikubwa. Wanavyuoni wengi wanasema kitabu hiki kinakaribia Bukhari na Muslim kwa uhalali baada ya wao wawili.' },
        { kind: 'h3', text: '6. Sunan Ibn Majah' },
        { kind: 'p', text: 'Imam Muhammad ibn Yazid Ibn Majah (209–273 H) alikusanya hadith 4,000, baadhi yao zikiwa katika vitabu vingine vitano lakini nyingine zikiwa za pekee kwake. Kitabu chake kilikusanya hadith ambazo wengine hawakuzitia — jambo linalokifanya kuwa rasilimali muhimu — ingawa kati ya hadith hizo za pekee kuna baadhi ambazo wanavyuoni wanasema ni dhaifu.' },
        { kind: 'h3', text: 'Vitabu Vingine Muhimu' },
        { kind: 'p', text: 'Pamoja na vitabu sita, kuna kazi nyingine za thamani kubwa kama Muwatta\' Imam Malik, Musnad Imam Ahmad, Mustadrak al-Hakim, na Sahih Ibn Hibban. Mwanafunzi anayetaka kuelewa hadith vizuri inampasa kufahamu kwamba kuna mtandao mkubwa wa vitabu vya hadith, na kila kimoja kina mchango wake wa kipekee.' },
      ],
      [
        { kind: 'h2', text: 'الكتب الستة' },
        { kind: 'p', text: 'الكتب الستة هي ستة كتب اعتمدها أهل السنة كأوثق ما حُفظت فيه أحاديث النبي ﷺ. أُلّفت هذه الكتب في القرن الثالث الهجري الذي كان عصر ذهبية لعلم الحديث.' },
        { kind: 'h3', text: '١. صحيح البخاري' },
        { kind: 'p', text: 'الإمام محمد بن إسماعيل البخاري (١٩٤–٢٥٦ هـ) جمع كتابه بعد رحلات استمرت ست عشرة سنة، طاف فيها بلاد الإسلام يطلب الحديث ويفحصه. ومن بين أكثر من ٦٠٠ ألف حديث سمعه اختار نحو ٧ آلاف فقط استوفت أعلى شروطه. وكتابه هو أصحّ الكتب بعد كتاب الله. وهو مرتب على الأبواب الفقهية، وكل باب له ترجمة تدل على الحكم الفقهي الذي يثبته.' },
        { kind: 'h3', text: '٢. صحيح مسلم' },
        { kind: 'p', text: 'الإمام مسلم بن الحجاج النيسابوري (٢٠٦–٢٦١ هـ) كان تلميذ البخاري وصديقه. وكتابه يتميز بحسن ترتيبه — يجمع كل أحاديث الموضوع الواحد في موضع واحد مع طرق مختلفة من الأسانيد، وهذا يُيسّر البحث. وأحاديثه الصحيحة نحو ٧٥٠٠. واتفق الجمهور على أن صحيح مسلم في المرتبة الثانية بعد البخاري في الصحة، وإن قدّمه بعضهم في الترتيب.' },
        { kind: 'h3', text: '٣. سنن أبي داود' },
        { kind: 'p', text: 'الإمام أبو داود سليمان السجستاني (٢٠٢–٢٧٥ هـ) عُني بكتابه بأحاديث الأحكام — أي الأحاديث التي تُؤسس عليها الأحكام الشرعية. وأحاديثه نحو ٥٢٧٤ مرتبة على أبواب الفقه، وهو مرجع رئيسي للفقهاء. وبخلاف البخاري ومسلم أدخل الحسن وبعض الضعيف مع البيان.' },
        { kind: 'h3', text: '٤. جامع الترمذي' },
        { kind: 'p', text: 'الإمام محمد بن عيسى الترمذي (٢٠٩–٢٧٩ هـ) كان تلميذ البخاري. وكتابه فريد لأنه يحكم على كل حديث — صحيح أو حسن أو ضعيف أو غريب — ويذكر اختلاف العلماء فيه، مما جعل كتابه مورداً نفيساً لطلاب الفقه.' },
        { kind: 'h3', text: '٥. سنن النسائي' },
        { kind: 'p', text: 'الإمام أحمد بن شعيب النسائي (٢١٥–٣٠٣ هـ) اشتهر بدقة الانتقاء. وكتابه "السنن الصغرى" المعروف بالمجتبى يحتوي أحاديث بشروط أشدّ من سننه الكبرى. واعتبر كثير من العلماء أنه يلي الصحيحين في الصحة بعد البخاري ومسلم.' },
        { kind: 'h3', text: '٦. سنن ابن ماجه' },
        { kind: 'p', text: 'الإمام محمد بن يزيد ابن ماجه (٢٠٩–٢٧٣ هـ) جمع نحو ٤٠٠٠ حديث، بعضها في الكتب الخمسة الأخرى وبعضها انفرد به. وكتابه ضمّ ما لم يضمّه غيره — وهذا قيمة عظيمة — وإن كان بين زوائده بعض الضعيف.' },
        { kind: 'h3', text: 'كتب أخرى مهمة' },
        { kind: 'p', text: 'إلى جانب الستة هناك كتب جليلة كموطأ مالك ومسند أحمد ومستدرك الحاكم وصحيح ابن حبان. وعلى طالب الحديث أن يدرك أن منظومة كتب الحديث واسعة، ولكل كتاب إسهامه الفريد.' },
      ],
      [
        { kind: 'h2', text: 'The Six Books' },
        { kind: 'p', text: "The 'Kutub as-Sittah' (Six Books) are six collections recognised by Sunni scholars as the most reliable repositories of Prophetic hadith ﷺ. They were compiled by authors of the third Islamic century (ninth century CE), the golden age of hadith scholarship." },
        { kind: 'h3', text: '1. Sahih al-Bukhari' },
        { kind: 'p', text: "Imam Muhammad ibn Ismail al-Bukhari (194–256 AH) compiled his work after sixteen years of travel through the Muslim world, seeking and verifying hadith. From over 600,000 reports he heard, he selected approximately 7,000 that met his most stringent criteria. His collection is regarded as the most authentic book after the Qur'an. It is arranged by topic (purification, prayer, transactions, etc.), and each chapter title (tarjamah) indicates the legal ruling the chapter establishes." },
        { kind: 'h3', text: '2. Sahih Muslim' },
        { kind: 'p', text: "Imam Muslim ibn al-Hajjaj an-Nisaburi (206–261 AH) was a student and companion of al-Bukhari. His collection is praised for its excellent arrangement — he gathers all hadith on a topic in one place with varying chains, greatly facilitating study. His authentic hadith number around 7,500. The majority view places Sahih Muslim second after Bukhari in authenticity, though some prefer Muslim's organisation." },
        { kind: 'h3', text: '3. Sunan Abi Dawud' },
        { kind: 'p', text: "Imam Abu Dawud Sulayman as-Sijistani (202–275 AH) chose to focus his work on hadith of legal rulings (ahadith al-ahkam) — those used to derive religious law. His 5,274 hadith are arranged by the topics of fiqh, and his work is a primary reference for jurists. Unlike Bukhari and Muslim, he included Hasan and some weak hadith, often noting their status." },
        { kind: 'h3', text: '4. Jami at-Tirmidhi' },
        { kind: 'p', text: "Imam Muhammad ibn Isa at-Tirmidhi (209–279 AH) was a student of al-Bukhari. His collection is unique because he grades nearly every hadith — Sahih, Hasan, Da'if, or Gharib — and notes the differing opinions of scholars on its meaning. This makes his work a treasure for students of fiqh." },
        { kind: 'h3', text: '5. Sunan an-Nasai' },
        { kind: 'p', text: "Imam Ahmad ibn Shu'ayb an-Nasai (215–303 AH) was renowned for his rigour in selection. His 'as-Sunan as-Sughra' (the Lesser Sunan), known as al-Mujtaba, contains hadith that meet stricter criteria than his larger Sunan. Many scholars consider this work to follow the two Sahihs in authenticity." },
        { kind: 'h3', text: '6. Sunan Ibn Majah' },
        { kind: 'p', text: 'Imam Muhammad ibn Yazid Ibn Majah (209–273 AH) compiled approximately 4,000 hadith, some shared with the other five collections and some unique to his work. His unique additions made his collection valuable, though some scholars note that among them are weak hadith.' },
        { kind: 'h3', text: 'Other Important Works' },
        { kind: 'p', text: "Beyond the Six Books are other works of immense value, such as the Muwatta' of Imam Malik, the Musnad of Imam Ahmad, the Mustadrak of al-Hakim, and Sahih Ibn Hibban. A serious student of hadith should understand that the network of hadith literature is vast, and each work has its own distinct contribution." },
      ],
    ),
    duration: '26:00',
    status: 'published',
    tags: ['hadith', 'bukhari', 'muslim', 'collections'],
    createdAt: '2026-02-07',
    updatedAt: '2026-02-07',
  },

  // ============================================
  // HADITH — Misingi
  // ============================================
  {
    id: 'l-hadith-misingi-imani',
    title: {
      sw: 'Hadith ya Jibril — Misingi ya Islam, Iman na Ihsan',
      ar: 'حديث جبريل — أركان الإسلام والإيمان والإحسان',
      en: 'The Hadith of Jibril — The Foundations of Islam, Iman and Ihsan',
    },
    slug: 'hadith-ya-imani',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-misingi',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Hadith ya Jibril' },
        { kind: 'p', text: "Umar ibn al-Khattab رضي الله عنه anasimulia: 'Tulipokuwa tumekaa karibu na Mtume ﷺ siku moja, akaingia kwetu mtu mwenye nguo nyeupe sana, mwenye nywele nyeusi sana. Hapakuwa juu yake alama ya safari, na hakuna mtu wetu aliyemfahamu. Akakaa karibu na Mtume ﷺ, akagusa magoti yake na magoti yake, akaweka mikono yake juu ya mapaja yake, akasema: Ee Muhammad, niambie kuhusu Islam.'" },
        { kind: 'p', text: "Hadith hii imeripotiwa katika Sahih Muslim na ni mojawapo ya hadith muhimu zaidi katika Uislamu. Inajumuisha misingi yote mitatu ya dini katika mahojiano mafupi kati ya Mtume na malaika Jibril aliyejibadilisha kuwa mtu." },
        { kind: 'h3', text: 'Maana ya Islam — Nguzo Tano' },
        { kind: 'p', text: "Mtume ﷺ alijibu: 'Islam ni kushuhudia kuwa hakuna mola apasaye kuabudiwa ila Allah, na kwamba Muhammad ni Mtume wa Allah; na kusimamisha Swala; na kutoa Zaka; na kufunga Ramadhani; na kuhiji Bait al-Haram kama uwezekano upo.'" },
        { kind: 'p', text: 'Hizi ni nguzo tano za Uislamu — yale mambo ya nje ambayo Muislamu anayatekeleza:' },
        { kind: 'ol', items: [
          'Shahada — kushuhudia upweke wa Allah na utume wa Muhammad ﷺ',
          'Swala — kuabudu Allah kwa swala tano kila siku',
          'Zaka — kutoa sehemu maalumu ya mali kwa wahitaji',
          'Saumu — kufunga mwezi wa Ramadhani',
          'Hajj — kuhiji Makkah angalau mara moja maishani kama uwezekano upo'
        ] },
        { kind: 'h3', text: 'Maana ya Iman — Nguzo Sita' },
        { kind: 'p', text: "Akaendelea kuuliza: 'Niambie kuhusu Iman.' Mtume ﷺ akajibu: 'Ni kumwamini Allah, na malaika wake, na vitabu vyake, na mitume wake, na Siku ya Mwisho, na kumwamini qadar mema yake na mabaya yake.'" },
        { kind: 'ol', items: [
          'Kumwamini Allah — kuwa ni mmoja katika dhati yake, sifa zake, na ibada',
          'Kuwaamini malaika — viumbe wa nuru wanaomtumikia Allah',
          'Kuviamini vitabu — Tawrat, Zabur, Injil, Qur\'an na vitabu vingine vya mwanzo',
          'Kuwaamini mitume — kutoka kwa Adam hadi Muhammad ﷺ',
          'Kuiamini Siku ya Mwisho — ufufuo, hesabu, pepo na motoni',
          'Kuamini qadar — kwamba Allah amejua kila kitu kabla na vyote vinatokea kwa mapenzi yake'
        ] },
        { kind: 'h3', text: 'Maana ya Ihsan' },
        { kind: 'p', text: "Akauliza: 'Niambie kuhusu Ihsan.' Mtume ﷺ akajibu: 'Ni kumwabudu Allah kana kwamba unamuona; ikiwa humwoni, basi yeye anakuona.' Ihsan ni daraja ya juu zaidi ya dini — yaani kuabudu kwa moyo wote, kwa makini kamili, ukijua kwamba Allah anakuangalia kila wakati. Hii ni daraja ambayo wanavyuoni wanaiita maqam al-mushahadah au maqam al-ihsan." },
        { kind: 'h3', text: 'Hekima ya Hadith' },
        { kind: 'p', text: 'Mwishoni mwa hadith, Mtume ﷺ alimwambia Umar: "Je, unajua mwulizaji alikuwa nani? Alikuwa Jibril, amekuja kuwafundisheni dini yenu." Hii ni hadith inayokusanya msingi wa dini katika sehemu tatu: matendo ya nje (Islam), itikadi ya ndani (Iman), na ubora wa kiroho (Ihsan). Mwislamu kamili ni yule anayechanganya viwango vyote vitatu maishani mwake.' },
      ],
      [
        { kind: 'h2', text: 'حديث جبريل' },
        { kind: 'p', text: 'يروي عمر بن الخطاب رضي الله عنه قال: "بينما نحن جلوس عند رسول الله ﷺ ذات يوم إذ طلع علينا رجل شديد بياض الثياب شديد سواد الشعر، لا يُرى عليه أثر السفر ولا يعرفه منا أحد، حتى جلس إلى النبي ﷺ فأسند ركبتيه إلى ركبتيه ووضع كفّيه على فخذيه وقال: يا محمد، أخبرني عن الإسلام."' },
        { kind: 'p', text: 'هذا الحديث رواه مسلم وهو من أعظم أحاديث الإسلام. ضمّ أركان الدين الثلاثة في حوار بين النبي وجبريل عليه السلام الذي تمثّل رجلاً.' },
        { kind: 'h3', text: 'الإسلام — أركانه الخمسة' },
        { kind: 'p', text: 'قال النبي ﷺ: "الإسلام أن تشهد أن لا إله إلا الله وأن محمداً رسول الله، وتقيم الصلاة، وتؤتي الزكاة، وتصوم رمضان، وتحج البيت إن استطعت إليه سبيلاً."' },
        { kind: 'p', text: 'فهذه أركان الإسلام الخمسة — الأعمال الظاهرة التي يقوم بها المسلم:' },
        { kind: 'ol', items: [
          'الشهادتان — توحيد الله ورسالة محمد ﷺ',
          'إقامة الصلاة — الصلوات الخمس',
          'إيتاء الزكاة — إخراج جزء معيّن من المال للفقراء',
          'صيام رمضان',
          'حج بيت الله الحرام لمن استطاع'
        ] },
        { kind: 'h3', text: 'الإيمان — أركانه الستة' },
        { kind: 'p', text: 'ثم قال: "أخبرني عن الإيمان." قال ﷺ: "أن تؤمن بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، وتؤمن بالقدر خيره وشرّه."' },
        { kind: 'ol', items: [
          'الإيمان بالله — في ذاته وأسمائه وصفاته وعبادته',
          'الإيمان بالملائكة — خلق نوراني يعبد الله',
          'الإيمان بالكتب — التوراة والزبور والإنجيل والقرآن',
          'الإيمان بالرسل — من آدم إلى محمد ﷺ',
          'الإيمان باليوم الآخر — البعث والحساب والجنة والنار',
          'الإيمان بالقدر — أن الله علم كل شيء وأن كل شيء بمشيئته'
        ] },
        { kind: 'h3', text: 'الإحسان' },
        { kind: 'p', text: 'ثم قال: "أخبرني عن الإحسان." قال ﷺ: "أن تعبد الله كأنك تراه، فإن لم تكن تراه فإنه يراك." والإحسان أعلى مقامات الدين — أن تعبد الله بقلب حاضر وخشوع تامّ، تعلم أن الله يراك في كل حال. وهذا ما يسميه العلماء مقام المشاهدة أو مقام الإحسان.' },
        { kind: 'h3', text: 'حكمة الحديث' },
        { kind: 'p', text: 'في آخر الحديث قال النبي ﷺ لعمر: "أتدري من السائل؟ إنه جبريل أتاكم يعلّمكم دينكم." فهذا الحديث جامع لأصول الدين الثلاثة: الأعمال الظاهرة (الإسلام)، والاعتقاد الباطن (الإيمان)، والكمال الروحي (الإحسان). والمسلم الكامل من جمع هذه المراتب الثلاث.' },
      ],
      [
        { kind: 'h2', text: 'The Hadith of Jibril' },
        { kind: 'p', text: "Umar ibn al-Khattab رضي الله عنه narrated: 'While we were sitting with the Messenger of Allah ﷺ one day, there appeared before us a man whose clothes were exceedingly white, whose hair was exceedingly black; no signs of travel were upon him, and none of us recognised him. He sat down before the Prophet ﷺ, his knees touching his knees, his hands placed on his thighs, and said: O Muhammad, inform me about Islam.'" },
        { kind: 'p', text: "This hadith is reported in Sahih Muslim and is among the most significant hadith in Islam. It encompasses all three foundations of the religion in a single dialogue between the Prophet and Jibril عليه السلام, who appeared in the form of a man." },
        { kind: 'h3', text: 'Islam — The Five Pillars' },
        { kind: 'p', text: "The Prophet ﷺ replied: 'Islam is to testify that there is no deity worthy of worship except Allah and that Muhammad is the Messenger of Allah; to establish the prayer; to give zakat; to fast Ramadan; and to make pilgrimage to the House if you are able to find a way.'" },
        { kind: 'p', text: 'These are the five pillars of Islam — the outward acts a Muslim performs:' },
        { kind: 'ol', items: [
          'Shahada — testifying to the oneness of Allah and the messengership of Muhammad ﷺ',
          'Salah — worshipping Allah through the five daily prayers',
          'Zakat — giving a specified portion of wealth to those in need',
          'Sawm — fasting the month of Ramadan',
          'Hajj — pilgrimage to Makkah at least once in life if able'
        ] },
        { kind: 'h3', text: 'Iman — The Six Pillars' },
        { kind: 'p', text: "He then asked: 'Inform me about Iman.' The Prophet ﷺ replied: 'It is to believe in Allah, His angels, His books, His messengers, the Last Day, and to believe in divine decree, both its good and its ill.'" },
        { kind: 'ol', items: [
          'Belief in Allah — in His oneness in essence, attributes, and worship',
          'Belief in the angels — luminous beings who serve Allah',
          'Belief in the revealed books — the Tawrat, Zabur, Injil, Qur\'an, and earlier scriptures',
          'Belief in the messengers — from Adam to Muhammad ﷺ',
          'Belief in the Last Day — resurrection, reckoning, paradise, and hellfire',
          'Belief in divine decree — that Allah has knowledge of all things and that all happens by His will'
        ] },
        { kind: 'h3', text: 'Ihsan' },
        { kind: 'p', text: "He then asked: 'Inform me about Ihsan.' The Prophet ﷺ replied: 'It is to worship Allah as though you see Him, and though you do not see Him, He surely sees you.' Ihsan is the highest station of the religion — to worship with full presence of heart, complete attentiveness, knowing that Allah observes you at all times. Scholars call this the station of mushahadah or the station of ihsan." },
        { kind: 'h3', text: 'The Wisdom of the Hadith' },
        { kind: 'p', text: 'At the end of the hadith, the Prophet ﷺ told Umar: "Do you know who the questioner was? It was Jibril, who came to teach you your religion." This single hadith gathers the foundations of the religion in three layers: outward action (Islam), inward belief (Iman), and spiritual excellence (Ihsan). The complete Muslim is one who unites all three levels in his life.' },
      ],
    ),
    duration: '24:00',
    status: 'published',
    tags: ['hadith', 'iman', 'islam', 'ihsan', 'jibril'],
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },

  {
    id: 'l-hadith-misingi-niyya',
    title: {
      sw: "Hadith ya Nia — 'Hakika Matendo ni Kwa Nia'",
      ar: 'حديث النية — "إنما الأعمال بالنيات"',
      en: 'The Hadith of Intention — "Actions are but by Intentions"',
    },
    slug: 'hadith-ya-niyya',
    subjectId: 'hadith',
    levelId: 'awali',
    courseId: 'hadith-misingi',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Hadith' },
        { kind: 'p', text: "Umar ibn al-Khattab رضي الله عنه alisikia Mtume ﷺ akisema: 'Hakika matendo ni kwa nia, na kila mtu atapata kile alichonuia. Yule ambaye hijra yake ilikuwa kwa ajili ya Allah na Mtume wake, basi hijra yake ni kwa Allah na Mtume wake. Na yule ambaye hijra yake ilikuwa kwa ajili ya dunia ataipata, au kwa ajili ya mwanamke amuoe, basi hijra yake ni kwa kile alichohama kwa ajili yake.' Hadith hii imepokelewa na al-Bukhari na Muslim." },
        { kind: 'p', text: "Hadith hii ni mojawapo ya hadith muhimu zaidi katika dini, kiasi kwamba Imam ash-Shafi'i alisema: 'Hadith hii ni theluthi moja ya elimu yote.' Imam Ahmad alisema: 'Mwislamu hapaswi kuanza chochote bila kuanza kwa hadith ya Umar.' Imam al-Bukhari ameanza kitabu chake kwa hadith hii." },
        { kind: 'h3', text: 'Nafasi ya Nia katika Uislamu' },
        { kind: 'p', text: 'Nia ni msingi wa kila tendo la kidini. Tendo lolote — hata likiwa kubwa kiasi gani — likiwa bila nia sahihi, halifaidishi mtu mbele ya Allah. Mtu anaweza kufunga, kuswali, kutoa sadaka, hata kuhiji, lakini kama nia yake ilikuwa ni sifa ya watu, au kupata umaarufu, au kuonyesha utajiri, hatapata thawabu yoyote kutoka kwa Allah. Allah anaangalia kile kilicho ndani ya nyoyo, si kile kinachoonekana nje tu.' },
        { kind: 'h3', text: 'Aina za Nia' },
        { kind: 'p', text: 'Wanavyuoni wamebainisha kuwa nia ina vipengele viwili:' },
        { kind: 'ol', items: [
          'Nia ya kutofautisha matendo — kama vile kutofautisha kati ya wudhu wa kawaida na ghusl, au kati ya swala ya faradhi na sunna',
          'Nia ya ikhlasi — kufanya tendo kwa ajili ya Allah pekee, bila kushirikisha sifa za watu au manufaa ya kidunia'
        ] },
        { kind: 'h3', text: 'Mahali pa Nia' },
        { kind: 'p', text: "Wanavyuoni wamekubaliana kwamba mahali pa nia ni moyoni, si ulimini. Kutamka nia kwa ulimi siyo lazima — kwa kweli, baadhi ya wanavyuoni wameikataza kwa kuwa Mtume ﷺ na maswahaba wake hawakuwa wakitamka nia kwa ulimi. Mtu akijiwekea nia moyoni 'Sasa ninakwenda kuswali Adhuhuri,' hii inatosha." },
        { kind: 'h3', text: 'Hekima na Mafundisho' },
        { kind: 'p', text: 'Hadith hii inafundisha kwamba thawabu ya tendo lolote inategemea sana sababu iliyokufanya ulifanye. Tendo dogo lenye nia safi linaweza kuwa na thamani kubwa zaidi kuliko tendo kubwa lenye nia mbaya. Mtu anayetoa shilingi kwa ikhlasi anaweza kupata thawabu kuliko anayetoa milioni kwa kujionyesha. Mfanyakazi wa kawaida anayejitahidi kazini kwa ajili ya kumtegemea familia yake na kuwapa watoto wake malezi mema, anaweza kupata thawabu kama ya mwabudu wa daima — kama nia yake ni nzuri.' },
        { kind: 'p', text: 'Mtu anaweza pia kubadilisha mazoea ya kawaida kuwa ibada kwa kuweka nia. Kula na kunywa, kulala, hata kuwafurahisha familia — vinakuwa ibada kama nia ni kuimarisha mwili kwa ajili ya kumuabudu Allah, au kufanya familia ifurahi kama anavyoamuru Mtume ﷺ.' },
      ],
      [
        { kind: 'h2', text: 'متن الحديث' },
        { kind: 'p', text: 'سمع عمر بن الخطاب رضي الله عنه النبي ﷺ يقول: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى. فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه." متفق عليه.' },
        { kind: 'p', text: 'هذا الحديث من أعظم أحاديث الدين حتى قال الإمام الشافعي: "هذا الحديث ثلث العلم." وقال الإمام أحمد: "ينبغي أن لا يبدأ المسلم بشيء إلا بحديث عمر." وقد افتتح الإمام البخاري كتابه به.' },
        { kind: 'h3', text: 'مكانة النية في الإسلام' },
        { kind: 'p', text: 'النية أساس كل عبادة. والعمل مهما عظم إن خلا من النية الصالحة لا ينفع صاحبه عند الله. فقد يصوم الإنسان ويصلي ويتصدق ويحج، ولكن إن كانت نيته رياء الناس أو شهرة أو إظهار الغنى لم ينل عند الله شيئاً. فالله ينظر إلى ما في القلوب لا إلى ما يبدو ظاهراً.' },
        { kind: 'h3', text: 'أنواع النية' },
        { kind: 'p', text: 'بيّن العلماء أن النية لها مقصدان:' },
        { kind: 'ol', items: [
          'تمييز العبادات بعضها عن بعض — كالتمييز بين الوضوء والغسل، أو بين الفرض والنفل',
          'الإخلاص — أن يكون العمل لله وحده، دون رياء أو طلب نفع دنيوي'
        ] },
        { kind: 'h3', text: 'محل النية' },
        { kind: 'p', text: 'اتفق العلماء على أن محل النية القلب لا اللسان. والتلفظ بها ليس بواجب — بل كرهه بعض العلماء لأن النبي ﷺ وأصحابه لم يتلفظوا بها. فمن نوى بقلبه "أصلي الظهر" كفاه ذلك.' },
        { kind: 'h3', text: 'الحكمة والدروس' },
        { kind: 'p', text: 'يعلّم هذا الحديث أن ثواب أي عمل متوقف على دوافعه. وقد يكون العمل الصغير الخالص أعظم أجراً من الكبير المشوب بنية فاسدة. والذي يتصدق بدرهم خالصاً لله أعظم أجراً ممن يتصدق بألوف رياءً. والعامل الذي يجتهد في عمله ليُنفق على أهله وأولاده يُؤجر كأجر العابد المتفرّغ — إن صحّت نيته.' },
        { kind: 'p', text: 'ويستطيع المرء أن يحوّل العادات إلى عبادات بالنية. فالأكل والشرب والنوم وحتى ملاطفة الأهل تصبح عبادة إذا نوى بها التقوّي على عبادة الله أو إدخال السرور على الأهل كما أمر النبي ﷺ.' },
      ],
      [
        { kind: 'h2', text: 'The Text of the Hadith' },
        { kind: 'p', text: "Umar ibn al-Khattab رضي الله عنه heard the Prophet ﷺ say: 'Actions are but by intentions, and every person shall have only that which he intended. So whoever's migration was for Allah and His Messenger, his migration is for Allah and His Messenger. And whoever's migration was for some worldly gain or to marry a woman, his migration is for that for which he migrated.' Reported by both al-Bukhari and Muslim." },
        { kind: 'p', text: "This hadith is among the most important in the entire religion. Imam ash-Shafi'i said: 'This hadith is one third of all knowledge.' Imam Ahmad said: 'A Muslim should not begin anything without beginning with the hadith of Umar.' Imam al-Bukhari placed this hadith at the very opening of his Sahih." },
        { kind: 'h3', text: 'The Place of Intention in Islam' },
        { kind: 'p', text: "Intention (niyyah) is the foundation of every act of worship. No matter how great a deed is, without sincere intention it brings no benefit to the doer before Allah. A person may fast, pray, give charity, and even perform Hajj, but if his motive was to be praised by people, to gain fame, or to display wealth, he attains nothing from Allah. Allah examines what lies within the heart, not merely what appears outwardly." },
        { kind: 'h3', text: 'Two Aspects of Intention' },
        { kind: 'p', text: 'Scholars have noted that intention serves two purposes:' },
        { kind: 'ol', items: [
          'Distinguishing acts of worship — such as differentiating wudhu from ghusl, or an obligatory prayer from a voluntary one',
          'Sincerity (ikhlas) — performing the deed for Allah alone, without showing off or seeking worldly benefit'
        ] },
        { kind: 'h3', text: 'The Place of Intention' },
        { kind: 'p', text: "Scholars are agreed that the place of intention is the heart, not the tongue. Verbalising intention is not required — indeed, some scholars discouraged it because the Prophet ﷺ and his Companions did not verbalise their intentions. If one mentally resolves 'I am about to pray Dhuhr,' that suffices." },
        { kind: 'h3', text: 'Wisdom and Lessons' },
        { kind: 'p', text: 'This hadith teaches that the reward for any deed depends fundamentally on the motive behind it. A small deed performed sincerely can carry far greater value than a large deed marred by impure intention. Someone who gives a single coin in pure sincerity may earn more reward than one who gives thousands to be seen. An ordinary worker who labours diligently to support his family and raise his children well can attain a reward like that of a devoted worshipper — when his intention is good.' },
        { kind: 'p', text: 'A person can also transform ordinary habits into acts of worship through intention. Eating, drinking, sleeping, even bringing joy to one\'s family — all become acts of worship when intended as means to strengthen oneself for the worship of Allah, or to fulfil what the Prophet ﷺ taught about kindness to one\'s household.' },
      ],
    ),
    duration: '20:00',
    status: 'published',
    tags: ['hadith', 'niyyah', 'sincerity', 'foundations'],
    createdAt: '2026-02-13',
    updatedAt: '2026-02-13',
  },

  // ============================================
  // FIQHI — Twahara
  // ============================================
  {
    id: 'l-fiqhi-twahara-najisi',
    title: {
      sw: 'Aina za Najisi na Jinsi ya Kuzitakasa',
      ar: 'أنواع النجاسات وكيفية تطهيرها',
      en: 'Types of Impurity and How to Purify Them',
    },
    slug: 'aina-za-najisi',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-twahara',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Najisi na Twahara' },
        { kind: 'p', text: 'Najisi katika sheria ni kila kitu kichafu kinachozuia uhalali wa swala mpaka kitakaswe. Twahara, kinyume chake, ni hali ya usafi wa kimwili na wa kiibada inayomruhusu Mwislamu kuabudu. Allah anasifu wenye usafi katika Qur\'an, na Mtume ﷺ amesema: "Twahara ni nusu ya imani" (Muslim).' },
        { kind: 'quote', text: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ', cite: "Al-Baqarah 2:222" },
        { kind: 'h3', text: 'Aina Tatu za Najisi' },
        { kind: 'p', text: 'Wanavyuoni wa fiqh, hasa madhab ya Shafi\'i ambayo imesambaa Tanzania na Afrika ya Mashariki, wamegawa najisi katika makundi matatu kulingana na uzito wake na njia ya kuitakasa.' },
        { kind: 'h3', text: '1. Najisi Mughalladhah (Nzito)' },
        { kind: 'p', text: 'Hii ni najisi nzito zaidi, inajumuisha mate na uchafu wa mbwa na nguruwe. Inahitaji kunawa mara saba, mojawapo iwe kwa udongo (au kitu sawa kama sabuni au mchanga). Mtume ﷺ alisema: "Utakaso wa chombo chenu ikiwa mbwa amelambamo ni kunawa mara saba, ya kwanza ikiwa kwa udongo" (Bukhari na Muslim). Sehemu yenye najisi inapaswa kunawa hadi rangi, harufu, na ladha vyake vyote viondoke.' },
        { kind: 'h3', text: '2. Najisi Mukhaffafah (Nyepesi)' },
        { kind: 'p', text: 'Hii ni mkojo wa mtoto mchanga wa kiume ambaye bado hajaanza kula chakula kingine isipokuwa maziwa ya mama. Inatoshiwa kuinyunyizia maji bila kuhitaji kunawa kwa nguvu. Hadith ya Umm Qays bint Mihsan inathibitisha kwamba Mtume ﷺ alimletwa mtoto akamkojolea, akamwomba maji na kunyunyizia tu bila kunawa (Bukhari).' },
        { kind: 'h3', text: '3. Najisi Mutawassitah (Wastani)' },
        { kind: 'p', text: 'Hii ni najisi nyingine zote — mkojo wa watu wazima, choo, damu inayotoka, manii (kwa baadhi ya wanavyuoni), maiti ya wanyama wasioliwa, mvinyo, na mfano wa hivyo. Aina hii imegawanywa zaidi katika sehemu mbili:' },
        { kind: 'ul', items: [
          'Najisi Hukmiyyah — najisi ambayo athari yake (rangi, harufu, ladha) imepotea — inatoshiwa kupita maji juu yake mara moja',
          'Najisi Ainiyyah — najisi ambayo bado ina athari za rangi, harufu au ladha — inahitaji kunawa kwa nguvu hadi athari zote ziondoke'
        ] },
        { kind: 'h3', text: 'Mambo Yanayoondoa Najisi' },
        { kind: 'ol', items: [
          'Maji safi yenye uwezo wa kutakasa (Tahur)',
          'Udongo kwa hali maalumu kama vile chombo kililochomulambwa na mbwa',
          'Kupita kwa muda mrefu kunaweza kufanya damu kavu inaodhihirika kuondolewa kirahisi zaidi',
          'Mabadiliko ya asili kama mvinyo unaobadilika kuwa siki bila kuingiliwa — inakuwa twahara',
          'Kuoga kwa wanyama walio na ngozi ngumu, kama ngamia akinywa katika beseni — sehemu inayotoka mate yake si najisi'
        ] },
        { kind: 'h3', text: 'Tofauti za Maoni ya Wanavyuoni' },
        { kind: 'p', text: 'Wanavyuoni wa madhab tofauti hutofautiana kuhusu baadhi ya mambo. Kwa mfano, mbwa na nguruwe — Shafi\'i na Hanbali wanasema vyote viwili ni najisi mughalladhah; lakini Maliki anasema mbwa siyo najisi (mwili wake), bali mate yake tu yanahitaji kunawa mara saba. Mwanafunzi anapaswa kufuata madhab moja anayoifuata na kuelewa dalili zake, badala ya kuchanganya maoni bila msingi.' },
      ],
      [
        { kind: 'h2', text: 'تعريف النجاسة والطهارة' },
        { kind: 'p', text: 'النجاسة في الشرع كل عين قذرة تمنع صحة الصلاة حتى تُزال. والطهارة ضدها — وهي حال نظافة حسية وشرعية تبيح للمسلم العبادة. وقد أثنى الله على المتطهرين، وقال النبي ﷺ: "الطهور شطر الإيمان" (مسلم).' },
        { kind: 'quote', text: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ', cite: 'البقرة ٢:٢٢٢' },
        { kind: 'h3', text: 'أقسام النجاسة الثلاثة' },
        { kind: 'p', text: 'قسّم الفقهاء، ولا سيما المذهب الشافعي المنتشر في تنزانيا وشرق أفريقيا، النجاسة إلى ثلاثة أقسام بحسب شدّتها وطريقة تطهيرها.' },
        { kind: 'h3', text: '١. النجاسة المغلّظة' },
        { kind: 'p', text: 'وهي أشدّ النجاسات، وتشمل لعاب الكلب والخنزير ونجاستهما. ويُطهّر منها بسبع غسلات إحداها بالتراب أو ما يقوم مقامه كالصابون. قال النبي ﷺ: "طهور إناء أحدكم إذا ولغ فيه الكلب أن يغسله سبع مرات أولاهن بالتراب" (متفق عليه). ويُغسل الموضع حتى تذهب صفات النجاسة من لون وريح وطعم.' },
        { kind: 'h3', text: '٢. النجاسة المخفّفة' },
        { kind: 'p', text: 'وهي بول الصبي الذكر الذي لم يطعم الطعام رغبة. ويكفي فيها الرشّ بالماء دون الفرك. وثبت في حديث أم قيس بنت محصن أن النبي ﷺ أُتي بصبي فبال عليه فدعا بماء ونضحه (البخاري).' },
        { kind: 'h3', text: '٣. النجاسة المتوسطة' },
        { kind: 'p', text: 'وهي سائر النجاسات — كبول الكبار والغائط والدم المسفوح والمني عند بعض العلماء وميتة ما لا يؤكل لحمه والخمر. وتنقسم إلى:' },
        { kind: 'ul', items: [
          'حكمية — لم يبق لها أثر من لون أو ريح أو طعم — يكفي إجراء الماء عليها مرة',
          'عينية — لها أثر باقٍ — لا بد من الفرك حتى تذهب آثارها كلها'
        ] },
        { kind: 'h3', text: 'مزيلات النجاسة' },
        { kind: 'ol', items: [
          'الماء الطهور',
          'التراب في حالات خاصة',
          'الاستحالة — كانقلاب الخمر خلاً بنفسه فيصير طاهراً',
          'مرور الزمن قد ييسّر إزالة بعض النجاسات الجافة'
        ] },
        { kind: 'h3', text: 'اختلاف العلماء' },
        { kind: 'p', text: 'يختلف الفقهاء في بعض المسائل. فالكلب والخنزير عند الشافعية والحنابلة كلاهما نجس مغلظ، وعند المالكية الكلب طاهر العين وإنما لعابه يحتاج للسبع غسلات. وعلى الطالب أن يلتزم بمذهب يفهم أدلته بدلاً من التلفيق بلا أساس.' },
      ],
      [
        { kind: 'h2', text: 'Defining Impurity and Purification' },
        { kind: 'p', text: "In Islamic law, najasah (impurity) refers to any defilement that prevents a prayer from being valid until it is removed. Taharah (purification) is its opposite — a state of physical and ritual cleanliness that permits a Muslim to worship. Allah praises those who purify themselves in the Qur'an, and the Prophet ﷺ said: 'Purity is half of faith' (Muslim)." },
        { kind: 'quote', text: '"Indeed, Allah loves those who turn to Him in repentance and those who purify themselves."', cite: "Al-Baqarah 2:222" },
        { kind: 'h3', text: 'The Three Categories of Impurity' },
        { kind: 'p', text: "Scholars of fiqh — particularly the Shafi'i school which predominates in Tanzania and East Africa — classify impurity into three categories based on severity and method of purification." },
        { kind: 'h3', text: '1. Heavy Impurity (Mughalladhah)' },
        { kind: 'p', text: "This is the most severe category, including the saliva and bodily impurity of dogs and pigs. It requires washing seven times, one of which must be with soil (or a soil-substitute such as soap). The Prophet ﷺ said: 'The purification of one of your vessels, when a dog has licked from it, is to wash it seven times, the first of them with soil' (Bukhari and Muslim). The affected area must be washed until any colour, smell, and taste of the impurity is removed." },
        { kind: 'h3', text: '2. Light Impurity (Mukhaffafah)' },
        { kind: 'p', text: 'This is the urine of a male infant who has not yet begun consuming food other than his mother\'s milk. Sprinkling water over the affected area suffices, without scrubbing. The hadith of Umm Qays bint Mihsan establishes that the Prophet ﷺ was once brought a child who urinated on him; he called for water and merely sprinkled it over the area without washing (Bukhari).' },
        { kind: 'h3', text: '3. Medium Impurity (Mutawassitah)' },
        { kind: 'p', text: 'This includes all other forms of najasah — adult urine, faeces, flowing blood, semen (according to some scholars), the carcass of non-edible animals, wine, and similar. This category is further subdivided:' },
        { kind: 'ul', items: [
          'Hukmiyyah — impurity whose traces (colour, smell, taste) have already disappeared — passing water over it once suffices',
          'Ainiyyah — impurity that still has traces of colour, smell, or taste — requires scrubbing until all traces are removed'
        ] },
        { kind: 'h3', text: 'Means of Removing Impurity' },
        { kind: 'ol', items: [
          'Pure, purifying water (Tahur)',
          'Soil for specific cases such as a vessel licked by a dog',
          'Natural transformation — wine that turns to vinegar by itself becomes pure',
          'Passage of time may aid in removing dried impurities more easily'
        ] },
        { kind: 'h3', text: 'Differences Among Scholars' },
        { kind: 'p', text: "Scholars of the various madhabs differ on certain matters. Concerning dogs and pigs: the Shafi'i and Hanbali schools hold both to be heavily impure; the Maliki school holds that the dog itself is pure but its saliva alone requires the seven washings. A student should follow a single madhab he understands the evidence of, rather than mixing opinions without grounding." },
      ],
    ),
    duration: '22:00',
    status: 'published',
    tags: ['fiqh', 'twahara', 'najasah', 'purification'],
    createdAt: '2026-02-15',
    updatedAt: '2026-02-15',
  },

  {
    id: 'l-fiqhi-twahara-wudhu',
    title: {
      sw: 'Wudhu — Nguzo, Sunna na Vinavyouvunja',
      ar: 'الوضوء — فرائضه وسننه ونواقضه',
      en: 'Wudhu — Its Obligations, Sunnahs, and Nullifiers',
    },
    slug: 'wudhu',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-twahara',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Wudhu na Hukumu Yake' },
        { kind: 'p', text: 'Wudhu ni utakaso maalumu wa sehemu fulani za mwili kwa maji, ulioainishwa katika Qur\'an na Sunna kabla ya swala. Allah amesema:' },
        { kind: 'quote', text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ', cite: "Al-Maidah 5:6" },
        { kind: 'p', text: 'Wudhu ni sharti la swala — bila wudhu, swala haikubaliwi. Mtume ﷺ amesema: "Hakuna swala bila twahara" (Muslim). Wudhu pia unahitajika kwa kushika Mus-haf (Qur\'an iliyoandikwa), kuzunguka Ka\'bah (twaaf), na ibada nyingine fulani.' },
        { kind: 'h3', text: 'Nguzo za Wudhu (Faradhi)' },
        { kind: 'p', text: 'Madhab ya Shafi\'i imeorodhesha nguzo sita za wudhu, ambazo ni lazima zifuatwe ili wudhu uwe sahihi:' },
        { kind: 'ol', items: [
          'Nia — kuweka nia moyoni ya kufanya wudhu kwa ajili ya kuondoa hadath (hali isiyo ya twahara)',
          'Kuosha uso — kutoka mwanzo wa nywele hadi chini ya kidevu kwa urefu, na kutoka sikio hadi sikio kwa upana',
          'Kuosha mikono pamoja na viwiko — viwiko ni sehemu ya kuoshwa, si mpaka tu',
          'Kupangusa kichwa — kupangusa angalau sehemu ndogo ya kichwa kwa maji',
          'Kuosha miguu pamoja na vifundo (kahabu) — vifundo ni sehemu ya kuoshwa',
          'Mpangilio (Tartib) — kufanya kwa mfumo huo huo ulioainishwa, bila kuruka'
        ] },
        { kind: 'h3', text: 'Sunna za Wudhu' },
        { kind: 'p', text: 'Pamoja na nguzo, kuna sunna nyingi zinazopaswa kufuatwa kwa thawabu zaidi:' },
        { kind: 'ul', items: [
          'Kuanza kwa Bismillah',
          'Kunawa mikono mara tatu kabla ya kuanza',
          'Kupiga mswaki au kutumia kitu cha kusafisha mdomo',
          'Kuosha uso, mikono, na miguu mara tatu badala ya mara moja',
          'Kupangusa masikio — ndani na nje',
          'Kuanza upande wa kulia kabla wa kushoto kwa mikono na miguu',
          'Kupiga mswaki kabla ya wudhu',
          'Kusoma dua baada ya wudhu: "Ash-hadu an la ilaha illa-Llah, wahdahu la sharika lahu, wa ash-hadu anna Muhammadan abduhu wa rasuluh"'
        ] },
        { kind: 'h3', text: 'Vinavyouvunja Wudhu' },
        { kind: 'p', text: 'Mambo yafuatayo huubatilisha wudhu na yanahitaji ufanyike upya:' },
        { kind: 'ol', items: [
          'Kutoka kwa chochote katika njia mbili — mkojo, choo, riahi (gesi), na mfano',
          'Kupoteza akili — kwa usingizi mzito, kuzimia, ulevi, au wazimu',
          'Kugusa sehemu za siri za mtu mwingine au mwenyewe kwa mkono bila kizuizi (kulingana na madhab ya Shafi\'i)',
          'Kugusa mwanamke asiye mahram bila kizuizi (kwa Shafi\'i; madhab nyingine zinatofautiana)',
          'Kutoka kwa damu nyingi mwilini (kwa madhab ya Hanafi); ingawa kwa Shafi\'i hii haina kuvunja wudhu'
        ] },
        { kind: 'h3', text: 'Hekima ya Wudhu' },
        { kind: 'p', text: 'Wudhu si tu kuosha mwili — ni utakaso wa kiroho na kimwili. Mtume ﷺ amesema kwamba kila tone la maji wakati wa wudhu hubeba dhambi za sehemu hiyo ya mwili. Akapaaza uso, dhambi za kuangalia kwa haramu zinaondolewa; akiosha mikono, dhambi za kushika kwa haramu; akipangusa kichwa, dhambi za kufikiri vibaya; akiosha miguu, dhambi za kutembea kwenda mahali pasipopendeza Allah. Hivyo wudhu ni dawa ya kiroho kabla ya kuabudu.' },
      ],
      [
        { kind: 'h2', text: 'تعريف الوضوء وحكمه' },
        { kind: 'p', text: 'الوضوء هو طهارة مخصوصة بأعضاء معينة بالماء، وردت في الكتاب والسنة قبل الصلاة. قال الله تعالى:' },
        { kind: 'quote', text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ', cite: 'المائدة ٥:٦' },
        { kind: 'p', text: 'والوضوء شرط لصحة الصلاة، قال النبي ﷺ: "لا صلاة بغير طهور" (مسلم). ويُشترط أيضاً لمسّ المصحف والطواف بالكعبة وعبادات أخرى.' },
        { kind: 'h3', text: 'فرائض الوضوء' },
        { kind: 'p', text: 'ذكر الشافعية ستة فرائض للوضوء لا يصحّ بدونها:' },
        { kind: 'ol', items: [
          'النية — أن ينوي بقلبه رفع الحدث أو استباحة الصلاة',
          'غسل الوجه — من منابت الشعر إلى أسفل الذقن طولاً، ومن الأذن إلى الأذن عرضاً',
          'غسل اليدين مع المرفقين — المرفقان داخلان في الغسل',
          'مسح بعض الرأس بالماء',
          'غسل الرجلين مع الكعبين — الكعبان داخلان',
          'الترتيب — على النحو المذكور دون قطع'
        ] },
        { kind: 'h3', text: 'سنن الوضوء' },
        { kind: 'p', text: 'إلى جانب الفرائض هناك سنن تُحصّل بها زيادة الأجر:' },
        { kind: 'ul', items: [
          'التسمية في الابتداء',
          'غسل الكفين ثلاثاً قبل البدء',
          'المضمضة والاستنشاق',
          'تثليث الغسل في الوجه واليدين والرجلين',
          'مسح الأذنين ظاهراً وباطناً',
          'البدء بالميامن',
          'السواك قبل الوضوء',
          'الدعاء بعد الوضوء: "أشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمداً عبده ورسوله"'
        ] },
        { kind: 'h3', text: 'نواقض الوضوء' },
        { kind: 'p', text: 'الأمور التالية تنقض الوضوء وتوجب إعادته:' },
        { kind: 'ol', items: [
          'الخارج من السبيلين — البول والغائط والريح ونحوها',
          'زوال العقل — بنوم عميق أو إغماء أو سكر أو جنون',
          'مس الفرج بباطن الكف بلا حائل (عند الشافعية)',
          'لمس المرأة الأجنبية بلا حائل (عند الشافعية، ويختلف الآخرون)',
          'خروج الدم الكثير (عند الحنفية)، ولا ينقض عند الشافعية'
        ] },
        { kind: 'h3', text: 'حكمة الوضوء' },
        { kind: 'p', text: 'الوضوء ليس مجرّد غسل بدن — بل طهارة قلبية وحسّية معاً. أخبر النبي ﷺ أن قطرات الماء تحمل ذنوب أعضاء الجسد. فإذا غسل وجهه ذهبت ذنوب نظره الحرام، وإذا غسل يديه ذنوب لمسه الحرام، وإذا مسح رأسه ذنوب فكره الفاسد، وإذا غسل رجليه ذنوب مشيه إلى ما لا يرضي الله. فالوضوء دواء روحي قبل العبادة.' },
      ],
      [
        { kind: 'h2', text: 'Defining Wudhu and Its Ruling' },
        { kind: 'p', text: "Wudhu is a specific form of purification involving designated parts of the body using water, prescribed by both the Qur'an and Sunnah before prayer. Allah says:" },
        { kind: 'quote', text: '"O you who believe! When you rise for prayer, wash your faces and your arms to the elbows, and wipe your heads, and your feet to the ankles."', cite: "Al-Maidah 5:6" },
        { kind: 'p', text: "Wudhu is a precondition of valid prayer — without it, prayer is not accepted. The Prophet ﷺ said: 'There is no prayer without purification' (Muslim). Wudhu is also required for touching the Mus-haf (the written Qur'an), performing tawaf around the Ka'bah, and certain other acts of worship." },
        { kind: 'h3', text: 'The Obligations (Faraidh) of Wudhu' },
        { kind: 'p', text: "The Shafi'i school identifies six obligations without which wudhu is not valid:" },
        { kind: 'ol', items: [
          'Niyyah (Intention) — to inwardly resolve to perform wudhu to remove ritual impurity',
          'Washing the face — from the hairline to the chin lengthwise, and from ear to ear in width',
          'Washing the arms including the elbows — the elbows themselves must be washed, not merely up to them',
          'Wiping at least a portion of the head with wet hand',
          'Washing the feet including the ankles — the ankles themselves must be washed',
          'Tartib (Order) — performing the acts in the prescribed sequence, without disruption'
        ] },
        { kind: 'h3', text: 'The Sunnahs of Wudhu' },
        { kind: 'p', text: 'Beyond the obligations are many recommended practices that earn additional reward:' },
        { kind: 'ul', items: [
          'Beginning with Bismillah',
          'Washing the hands three times before starting',
          'Rinsing the mouth and nose',
          'Washing the face, arms, and feet three times rather than once',
          'Wiping the ears — both inside and outside',
          'Beginning with the right side before the left for arms and feet',
          'Using siwak (toothstick) before wudhu',
          'Reciting the supplication after wudhu: "I bear witness that there is no deity except Allah, alone with no partner, and I bear witness that Muhammad is His servant and messenger."'
        ] },
        { kind: 'h3', text: 'Nullifiers of Wudhu' },
        { kind: 'p', text: 'The following invalidate wudhu and require it to be renewed:' },
        { kind: 'ol', items: [
          'Anything exiting the front or back passages — urine, faeces, gas, and the like',
          'Loss of consciousness — through deep sleep, fainting, intoxication, or insanity',
          "Touching one's own private parts or another's with the inner hand without barrier (Shafi'i school)",
          "Skin contact with a marriageable adult of the opposite gender without barrier (Shafi'i view; other schools differ)",
          "Heavy bleeding from the body (Hanafi school); does not nullify according to Shafi'is"
        ] },
        { kind: 'h3', text: 'The Wisdom of Wudhu' },
        { kind: 'p', text: "Wudhu is not merely physical washing — it is simultaneously a physical and spiritual purification. The Prophet ﷺ taught that as the water drips from each limb, the sins committed by that limb are washed away. As one washes the face, sins of forbidden glances depart; as one washes the hands, sins of forbidden contact; as one wipes the head, the sins of corrupt thoughts; as one washes the feet, the sins of walking towards what does not please Allah. Wudhu is thus a spiritual remedy preceding worship." },
      ],
    ),
    duration: '24:00',
    status: 'published',
    tags: ['fiqh', 'twahara', 'wudhu'],
    createdAt: '2026-02-18',
    updatedAt: '2026-02-18',
  },

  {
    id: 'l-fiqhi-twahara-ghusl',
    title: {
      sw: 'Ghusl — Kuoga kwa Janaba',
      ar: 'الغسل من الجنابة',
      en: 'Ghusl — The Full Ritual Bath',
    },
    slug: 'ghusl',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-twahara',
    order: 3,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana na Hukumu ya Ghusl' },
        { kind: 'p', text: 'Ghusl ni kuoga kwa namna maalumu inayofunika mwili wote kwa maji safi, kwa nia ya kuondoa hali ya hadath kubwa (kama janaba). Tofauti na wudhu, ghusl ni utakaso wa mwili mzima, na inahitajika baada ya hali fulani.' },
        { kind: 'h3', text: 'Vinavyolazimisha Ghusl' },
        { kind: 'p', text: 'Mambo yafuatayo yanamlazimu mtu kuoga ghusl kabla ya kuabudu:' },
        { kind: 'ol', items: [
          'Kutoka kwa manii (mbegu) kwa shahawa — usingizini au mchana',
          'Kuingiliana ndoa, hata kama hakuna manii iliyotoka',
          'Mwisho wa hedhi kwa mwanamke',
          'Mwisho wa nifasi (damu inayotoka baada ya kuzaa)',
          'Kufa kwa Mwislamu — wenye kufa wanaoshwa kabla ya kuzikwa',
          'Mtu kasilamu — mwanavyuoni wengi wamependekeza kuoga baada ya kuingia katika Uislamu'
        ] },
        { kind: 'h3', text: 'Nguzo za Ghusl' },
        { kind: 'p', text: 'Ghusl ina nguzo mbili kuu kulingana na madhab ya Shafi\'i:' },
        { kind: 'ol', items: [
          'Nia — kuweka nia moyoni ya kuondoa hali ya janaba au hadath kubwa',
          'Kufikisha maji kwenye sehemu zote za nje za mwili — kichwa, nywele, masikio, kati ya vidole, sehemu zilizofichikana — bila kuacha hata mahali pamoja kavu'
        ] },
        { kind: 'h3', text: 'Namna Kamili ya Mtume ﷺ' },
        { kind: 'p', text: 'Aisha رضي الله عنها alielezea namna Mtume ﷺ alivyokuwa akioga: "Mtume ﷺ alianza kwa kunawa mikono yake, kisha kunyooshea sehemu yake ya siri kwa mkono wa kushoto, kisha kufanya wudhu kamili kama wa swala, kisha kuingiza vidole vyake katika maji na kupita kwenye mizizi ya nywele zake, kisha kumwaga maji juu ya kichwa chake mara tatu, kisha kumwaga maji kwa mwili wake mzima" (Bukhari na Muslim).' },
        { kind: 'p', text: 'Hatua za vitendo:' },
        { kind: 'ol', items: [
          'Kuanza kwa Bismillah na nia',
          'Kunawa mikono mara tatu',
          'Kuosha sehemu za siri na uchafu wowote',
          'Kufanya wudhu kamili kama unavyofanyia swala',
          'Kumwaga maji juu ya kichwa mara tatu, kuhakikisha maji yanafika kwenye mizizi ya nywele',
          'Kumwaga maji upande wa kulia wa mwili, kisha kushoto',
          'Kuhakikisha kwamba maji yamefika sehemu zote za mwili — kati ya vidole vya miguu, masikio, na sehemu zilizofichikana'
        ] },
        { kind: 'h3', text: 'Mambo Muhimu ya Kufahamu' },
        { kind: 'ul', items: [
          'Mwanamke akioga ghusl kwa hedhi haitakiwi kufungua nywele zake zilizosukwa, kama hakuna ushahidi kwamba maji hayaipiti — Mtume ﷺ aliruhusu Umm Salama akiwa na nywele zilizosukwa',
          'Mtu anayeoga ghusl kwa namna sahihi anaweza kuswali bila kufanya wudhu mwingine, kwani ghusl inaondoa hadath kubwa pamoja na hadath ndogo',
          'Akiingia ndani ya bwawa la maji ya kutosha au mto na kuzama kabisa kwa nia, ghusl inakubaliwa hata bila kupitisha mikono kwa mwili'
        ] },
        { kind: 'h3', text: 'Ghusl Zinazopendekezwa (Sunna)' },
        { kind: 'p', text: 'Pamoja na ghusl za faradhi, kuna pia ghusl zinazopendekezwa:' },
        { kind: 'ul', items: [
          'Ghusl ya Ijumaa kabla ya swala ya Ijumaa',
          'Ghusl kabla ya Ihram kwa Hajj na Umrah',
          'Ghusl kabla ya kuingia Makkah',
          'Ghusl kabla ya swala za Idd',
          'Ghusl baada ya kumwosha maiti',
          'Ghusl kwa anayepoteza fahamu kisha kupata akili'
        ] },
      ],
      [
        { kind: 'h2', text: 'تعريف الغسل وحكمه' },
        { kind: 'p', text: 'الغسل هو إفاضة الماء على البدن كله بنية رفع الحدث الأكبر كالجنابة. وهو طهارة شاملة لجميع الجسد بخلاف الوضوء، ويلزم في حالات معينة.' },
        { kind: 'h3', text: 'موجبات الغسل' },
        { kind: 'p', text: 'يجب الغسل بأمور منها:' },
        { kind: 'ol', items: [
          'خروج المني بشهوة — في النوم أو اليقظة',
          'الجماع وإن لم يحصل إنزال',
          'انقطاع دم الحيض',
          'انقطاع دم النفاس',
          'موت المسلم — يُغسَّل قبل دفنه',
          'إسلام الكافر عند جمهور العلماء استحباباً'
        ] },
        { kind: 'h3', text: 'فرائض الغسل' },
        { kind: 'p', text: 'فرضا الغسل عند الشافعية:' },
        { kind: 'ol', items: [
          'النية — رفع الجنابة أو الحدث الأكبر',
          'تعميم الماء على جميع البدن — الرأس والشعر والأذنين وما بين الأصابع والمواضع المخفية، بحيث لا يبقى موضع جاف'
        ] },
        { kind: 'h3', text: 'صفة غسل النبي ﷺ' },
        { kind: 'p', text: 'وصفت عائشة رضي الله عنها غسل النبي ﷺ: "كان النبي ﷺ يبدأ بغسل يديه، ثم يغسل فرجه، ثم يتوضأ كوضوئه للصلاة، ثم يدخل أصابعه في الماء فيخلّل بها أصول شعره، ثم يصبّ على رأسه ثلاث غرفات بيديه، ثم يفيض الماء على جلده كله" (متفق عليه).' },
        { kind: 'p', text: 'الخطوات العملية:' },
        { kind: 'ol', items: [
          'البدء بالتسمية والنية',
          'غسل اليدين ثلاثاً',
          'غسل الفرج وإزالة كل أذى',
          'الوضوء كاملاً كوضوء الصلاة',
          'إفاضة الماء على الرأس ثلاثاً مع التخليل',
          'إفاضة الماء على الجانب الأيمن ثم الأيسر',
          'التأكد من وصول الماء إلى جميع البدن'
        ] },
        { kind: 'h3', text: 'مسائل مهمة' },
        { kind: 'ul', items: [
          'لا يجب على المرأة نقض ضفائرها لغسل الحيض إذا تحقّقت من وصول الماء، لحديث أم سلمة',
          'من اغتسل غسلاً صحيحاً جاز له أن يصلي دون وضوء آخر، فالغسل يرفع الحدثين',
          'من نزل في ماء كثير ناوياً صحّ غسله ولو لم يدلك بدنه'
        ] },
        { kind: 'h3', text: 'الأغسال المستحبة' },
        { kind: 'ul', items: [
          'غسل الجمعة',
          'غسل الإحرام للحج والعمرة',
          'غسل دخول مكة',
          'غسل العيدين',
          'الغسل بعد تغسيل الميت',
          'الغسل بعد الإفاقة من الإغماء'
        ] },
      ],
      [
        { kind: 'h2', text: 'Defining Ghusl and Its Ruling' },
        { kind: 'p', text: 'Ghusl is a specific form of bathing in which water is made to flow over the entire body with the intention of removing major ritual impurity (hadath akbar) such as that from janabah. Unlike wudhu, ghusl is a purification of the whole body and is required in certain situations.' },
        { kind: 'h3', text: 'What Necessitates Ghusl' },
        { kind: 'p', text: 'The following make ghusl obligatory before worship:' },
        { kind: 'ol', items: [
          'Emission of semen with sexual desire — whether asleep or awake',
          'Sexual intercourse, even if no emission occurs',
          'The end of menstruation for a woman',
          'The end of post-natal bleeding (nifas)',
          'Death of a Muslim — the deceased is washed before burial',
          'Conversion to Islam — most scholars regard this as recommended'
        ] },
        { kind: 'h3', text: 'The Obligations of Ghusl' },
        { kind: 'p', text: "The Shafi'i school identifies two essential obligations:" },
        { kind: 'ol', items: [
          'Niyyah (Intention) — inwardly resolving to remove the major ritual impurity',
          'Causing water to reach every external part of the body — head, hair roots, ears, between the fingers, and any concealed surfaces — leaving no spot dry'
        ] },
        { kind: 'h3', text: "The Prophet's Manner ﷺ" },
        { kind: 'p', text: "Aisha رضي الله عنها described the Prophet's ghusl ﷺ: 'The Prophet ﷺ would begin by washing his hands, then he would wash his private parts, then perform a complete wudhu as for prayer, then run his fingers through his hair until he reached the roots, then pour water three times over his head, then pour water over his entire body' (Bukhari and Muslim)." },
        { kind: 'p', text: 'The practical steps are:' },
        { kind: 'ol', items: [
          'Begin with Bismillah and the intention',
          'Wash the hands three times',
          'Wash the private parts and remove any impurity',
          'Perform a complete wudhu as for prayer',
          'Pour water over the head three times, ensuring it reaches the roots of the hair',
          'Pour water over the right side of the body, then the left',
          'Ensure water reaches all parts of the body — between the toes, the ears, and concealed areas'
        ] },
        { kind: 'h3', text: 'Important Points' },
        { kind: 'ul', items: [
          "A woman performing ghusl after menstruation does not need to undo her braided hair if she is confident the water reaches her scalp — the Prophet ﷺ permitted Umm Salama with her braided hair",
          'One who performs ghusl correctly may pray without performing wudhu separately, as ghusl removes both the major and minor ritual impurities',
          'Immersing oneself in a large body of water with the intention of ghusl suffices, even without rubbing the body'
        ] },
        { kind: 'h3', text: 'Recommended (Sunnah) Ghusls' },
        { kind: 'p', text: 'Beyond obligatory ghusls there are recommended ones:' },
        { kind: 'ul', items: [
          'Ghusl on Friday before Jumu\'ah prayer',
          'Ghusl before entering Ihram for Hajj and Umrah',
          'Ghusl before entering Makkah',
          'Ghusl before the Eid prayers',
          'Ghusl after washing a deceased person',
          'Ghusl after recovering consciousness from a faint'
        ] },
      ],
    ),
    duration: '22:00',
    status: 'published',
    tags: ['fiqh', 'twahara', 'ghusl', 'janabah'],
    createdAt: '2026-02-21',
    updatedAt: '2026-02-21',
  },

  // ============================================
  // FIQHI — Swala
  // ============================================
  {
    id: 'l-fiqhi-swala-wakati',
    title: {
      sw: 'Nyakati za Swala Tano',
      ar: 'أوقات الصلوات الخمس',
      en: 'The Times of the Five Daily Prayers',
    },
    slug: 'wakati-wa-swala',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-swala',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Wajibu wa Kuswali kwa Wakati' },
        { kind: 'p', text: 'Allah ameamuru kuswali katika nyakati maalumu, na hili ni wajibu wa kwanza katika ibada ya swala. Aya inayoelezea zaidi ni:' },
        { kind: 'quote', text: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا', cite: "An-Nisa 4:103" },
        { kind: 'p', text: 'Maana yake: "Hakika swala ni faradhi kwa waumini iliyowekewa nyakati maalumu." Kuiswali nje ya wakati wake bila udhuru ni dhambi kubwa, na lazima irudiwe (qadha) mara tu mtu anapogundua kosa lake.' },
        { kind: 'h3', text: '1. Swala ya Alfajiri (Fajr)' },
        { kind: 'p', text: 'Wakati wake huanzia mapambazuko ya kweli (al-fajr as-sadiq) — ile mwanga wa kwanza unaopanuka katika upeo wa macho — na huishia jua linapochomoza. Ni rakaa mbili. Ni vyema kuiswali mapema mwanzoni mwa wakati wake. Mtume ﷺ alikuwa akiiswali wakati ulikuwa giza na akamaliza watu wakiweza kuonana lakini bado giza.' },
        { kind: 'h3', text: '2. Swala ya Adhuhuri (Dhuhr)' },
        { kind: 'p', text: 'Wakati wake huanzia jua linapopita katikati ya mbingu (zawal) — yaani kuanza kuelekea magharibi baada ya kufika juu kabisa. Huishia kivuli cha kitu kinapokuwa sawa na kitu chenyewe pamoja na kivuli cha asubuhi. Ni rakaa nne. Wakati wa joto kali, Mtume ﷺ alipendelea kuichelewesha kidogo (al-ibrad) ili joto liwe limepungua.' },
        { kind: 'h3', text: '3. Swala ya Alasiri (Asr)' },
        { kind: 'p', text: 'Wakati wake huanzia mwisho wa wakati wa Adhuhuri (kivuli kuwa sawa na kitu) na huishia jua linapokuwa la njano kabla ya kutua. Ni rakaa nne. Mtume ﷺ alipendekeza kuiswali wakati jua bado ni nyeupe na kali.' },
        { kind: 'h3', text: '4. Swala ya Magharibi (Maghrib)' },
        { kind: 'p', text: 'Wakati wake huanzia jua linapotua kabisa na huishia kuondoka kwa rangi nyekundu kutoka magharibi. Ni rakaa tatu. Hii ndiyo swala iliyo na wakati mfupi zaidi, na inapendekezwa kuiswali mara tu jua linapotua.' },
        { kind: 'h3', text: '5. Swala ya Isha' },
        { kind: 'p', text: 'Wakati wake huanzia kuondoka kwa rangi nyekundu kutoka magharibi (mwisho wa wakati wa Maghrib) na huishia katikati ya usiku. Ni rakaa nne. Mtume ﷺ alipendekeza kuichelewesha kidogo lakini si kuipita usiku wa kati.' },
        { kind: 'h3', text: 'Wakati Walikatazwa Kuswali' },
        { kind: 'p', text: 'Mtume ﷺ alikataza kuswali katika nyakati tatu maalumu (kwa swala za hiari):' },
        { kind: 'ol', items: [
          'Wakati jua linapochomoza hadi liinuke kiasi cha mkuki',
          'Wakati jua linapokuwa katikati ya mbingu kabla ya kuelekea magharibi',
          'Wakati jua linapoanza kutua hadi litue kabisa'
        ] },
        { kind: 'p', text: 'Sababu ya kukatazwa ni kwamba washirikina walikuwa wakiabudu jua nyakati hizo, na Mtume alitaka Waislamu kujitofautisha nao. Hata hivyo, swala za faradhi ambazo mtu amezikosa zinaweza kufanywa katika nyakati hizo bila tatizo.' },
        { kind: 'h3', text: 'Hekima ya Mgawanyo wa Nyakati' },
        { kind: 'p', text: 'Allah amegawa swala kwa nyakati tofauti za siku ili kumwacha mtu apate ukumbusho wa Mola wake katika kila sehemu ya siku — asubuhi alipoamka, mchana alipopumzika kazi, alasiri kabla ya kumaliza kazi, jioni anapokuja nyumbani, na usiku kabla ya kulala. Hivyo dini inakuwa ni mfumo wa maisha, si jambo la kufikiri lipo siku za Ijumaa tu.' },
      ],
      [
        { kind: 'h2', text: 'وجوب الصلاة في وقتها' },
        { kind: 'p', text: 'أمر الله بإقامة الصلاة في أوقات محددة، وذلك أول واجبات الصلاة. قال تعالى:' },
        { kind: 'quote', text: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا', cite: 'النساء ٤:١٠٣' },
        { kind: 'p', text: 'وأداؤها خارج وقتها بلا عذر من الكبائر، ويلزم قضاؤها فور تذكّرها.' },
        { kind: 'h3', text: '١. صلاة الفجر' },
        { kind: 'p', text: 'يبدأ وقتها بطلوع الفجر الصادق — وهو البياض المعترض في الأفق — وينتهي بطلوع الشمس. وهي ركعتان. والأفضل تعجيلها أول وقتها، وكان النبي ﷺ يصليها بغلس فينصرف الناس وما يعرف بعضهم بعضاً.' },
        { kind: 'h3', text: '٢. صلاة الظهر' },
        { kind: 'p', text: 'يبدأ وقتها بزوال الشمس عن وسط السماء، وينتهي بمصير ظلّ الشيء مثله مع ظلّ الزوال. وهي أربع ركعات. وفي شدة الحرّ يستحب الإبراد بها.' },
        { kind: 'h3', text: '٣. صلاة العصر' },
        { kind: 'p', text: 'يبدأ وقتها بانتهاء وقت الظهر وينتهي باصفرار الشمس. وهي أربع ركعات، ويستحب أداؤها والشمس بيضاء نقية.' },
        { kind: 'h3', text: '٤. صلاة المغرب' },
        { kind: 'p', text: 'يبدأ وقتها بغروب الشمس وينتهي بمغيب الشفق الأحمر. وهي ثلاث ركعات. وهي أقصر الأوقات، ويُستحب التعجيل بها.' },
        { kind: 'h3', text: '٥. صلاة العشاء' },
        { kind: 'p', text: 'يبدأ وقتها بمغيب الشفق وينتهي بنصف الليل. وهي أربع ركعات. ويستحب تأخيرها قليلاً ولا يُؤخّر إلى نصف الليل.' },
        { kind: 'h3', text: 'الأوقات المنهي عن الصلاة فيها' },
        { kind: 'p', text: 'نهى النبي ﷺ عن الصلاة في ثلاثة أوقات للتنفّل:' },
        { kind: 'ol', items: [
          'عند طلوع الشمس حتى ترتفع قيد رمح',
          'عند استواء الشمس في كبد السماء حتى تزول',
          'عند ميل الشمس للغروب حتى تغرب'
        ] },
        { kind: 'p', text: 'سبب النهي مخالفة المشركين الذين كانوا يعبدون الشمس في تلك الأوقات. أما الفرائض الفائتة فتُقضى في أيّ وقت.' },
        { kind: 'h3', text: 'حكمة توزيع الأوقات' },
        { kind: 'p', text: 'وزّع الله الصلوات على أوقات اليوم لتكون ذكراً للعبد في كل مرحلة — صباحاً عند الاستيقاظ، وظهراً وقت الراحة، وعصراً قبل انتهاء العمل، ومغرباً عند العودة، وعشاءً قبل النوم. فيكون الدين منهج حياة لا مجرد جمعة.' },
      ],
      [
        { kind: 'h2', text: 'The Obligation of Prayer in Its Time' },
        { kind: 'p', text: "Allah commands prayer at specific times, and this is the first obligation of the act of prayer itself. The most explicit verse is:" },
        { kind: 'quote', text: '"Indeed, prayer is a prescribed duty upon the believers at appointed times."', cite: "An-Nisa 4:103" },
        { kind: 'p', text: 'Performing prayer outside its proper time without an excuse is a major sin, and it must be made up (qadha) as soon as one realises the omission.' },
        { kind: 'h3', text: '1. Fajr (Dawn Prayer)' },
        { kind: 'p', text: "Its time begins with the true dawn (al-fajr as-sadiq) — the first widening light along the horizon — and ends at sunrise. It is two rakaat. It is best performed early in its time. The Prophet ﷺ would pray it while it was still dark, and people would disperse able to make out one another but not yet in full light." },
        { kind: 'h3', text: '2. Dhuhr (Midday Prayer)' },
        { kind: 'p', text: "Its time begins when the sun has passed its zenith (zawal) — beginning to descend westward after reaching its highest point — and ends when the shadow of any object equals the object itself plus the shadow at zawal. It is four rakaat. In intense heat, the Prophet ﷺ recommended slightly delaying it (al-ibrad) so that the heat had abated." },
        { kind: 'h3', text: '3. Asr (Late Afternoon Prayer)' },
        { kind: 'p', text: 'Its time begins when the time of Dhuhr ends (the shadow equals the object) and continues until the sun turns yellow before setting. It is four rakaat. The Prophet ﷺ recommended praying it while the sun was still bright and white.' },
        { kind: 'h3', text: '4. Maghrib (Sunset Prayer)' },
        { kind: 'p', text: 'Its time begins immediately after the sun has fully set and ends with the disappearance of the red afterglow from the western horizon. It is three rakaat. This is the shortest prayer window, and it is recommended to pray it as soon as the sun has set.' },
        { kind: 'h3', text: '5. Isha (Night Prayer)' },
        { kind: 'p', text: 'Its time begins with the disappearance of the red afterglow (the end of Maghrib time) and continues until midnight. It is four rakaat. The Prophet ﷺ recommended a slight delay but not past midnight.' },
        { kind: 'h3', text: 'Times When Voluntary Prayer is Forbidden' },
        { kind: 'p', text: 'The Prophet ﷺ forbade voluntary prayer at three specific times:' },
        { kind: 'ol', items: [
          'When the sun is rising, until it has risen approximately a spear\'s length',
          'When the sun is at its zenith, until it has begun descending',
          'When the sun begins setting, until it has fully set'
        ] },
        { kind: 'p', text: 'The reason for the prohibition is that polytheists used to worship the sun at these moments, and the Prophet wanted Muslims to distinguish themselves. However, missed obligatory prayers may be made up at any of these times.' },
        { kind: 'h3', text: 'The Wisdom of the Distribution' },
        { kind: 'p', text: 'Allah distributed the prayers throughout the day so that a believer is reminded of his Lord in every phase of life — in the morning when he wakes, at midday during his rest from work, in the late afternoon before finishing his tasks, in the evening on returning home, and at night before sleep. Thus the religion becomes a complete way of life, not something confined to Friday.' },
      ],
    ),
    duration: '22:00',
    status: 'published',
    tags: ['fiqh', 'swala', 'prayer-times'],
    createdAt: '2026-02-24',
    updatedAt: '2026-02-24',
  },

  {
    id: 'l-fiqhi-swala-nguzo',
    title: {
      sw: 'Nguzo, Masharti, na Wajibati ya Swala',
      ar: 'أركان الصلاة وشروطها وواجباتها',
      en: 'Pillars, Conditions, and Obligations of Prayer',
    },
    slug: 'nguzo-na-masharti',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-swala',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Tofauti kati ya Sharti, Nguzo, na Wajibu' },
        { kind: 'p', text: 'Wanavyuoni wa fiqh wamebainisha tofauti muhimu kati ya istilahi tatu zinazohusu uhalali wa swala:' },
        { kind: 'ul', items: [
          'Sharti (Shart) — kitu kinachohitajika kabla ya swala kuanza, na kikiendelea katika swala. Mfano: kuwa na wudhu, kufunika auriya. Kikitokea kasoro katika sharti, swala inabatilika',
          'Nguzo (Rukn) — sehemu ya swala yenyewe, kama kusoma Al-Fatiha au kuruku. Nguzo zikiachwa kwa makusudi, swala inabatilika; zikiachwa kwa kusahau, swala inarekebishwa kwa sijdat as-sahw',
          'Wajibu — kitu kinachopaswa kufanywa katika swala lakini kuachwa kwake hakubatilishi swala. Inarekebishwa kwa sijdat as-sahw'
        ] },
        { kind: 'h3', text: 'Masharti ya Swala' },
        { kind: 'p', text: 'Yafuatayo lazima yatimizwe ili swala iwe sahihi:' },
        { kind: 'ol', items: [
          'Uislamu — swala ya kafiri haikubaliwi',
          'Akili timamu — mwendawazimu hapaswi kuswali',
          'Kufikia umri wa kuelewa — kwa kawaida miaka saba ndio anaanza kufundishwa, na akifika miaka kumi inakuwa lazima',
          'Kuondoa hadath — kuwa na wudhu (kwa hadath ndogo) au ghusl (kwa hadath kubwa)',
          'Kuondoa najisi mwilini, mavazini, na mahali pa kuswali',
          'Kufunika auriya — sehemu zinazopaswa kufunikwa za mwili (kwa mwanaume kati ya kitovu na magoti, kwa mwanamke yote isipokuwa uso na mikono)',
          'Kuingia wakati wa swala',
          'Kuelekea Qibla — kuelekea Ka\'bah Makkah',
          'Nia — kunuia kuswali swala maalumu (Adhuhuri, Asr, n.k.)'
        ] },
        { kind: 'h3', text: 'Nguzo za Swala (Kulingana na Madhab ya Shafi\'i)' },
        { kind: 'p', text: 'Madhab ya Shafi\'i imeorodhesha nguzo kumi na nne za swala:' },
        { kind: 'ol', items: [
          'Kusimama (kwa anayeweza)',
          'Takbirat al-Ihram — kusema "Allahu Akbar" kuanza',
          'Kusoma Al-Fatiha katika kila rakaa',
          'Kuruku — kuinama hadi mikono ifike kwenye magoti',
          'Kunyooka kabisa baada ya rukuu (i\'tidal)',
          'Sijudi mara mbili kwa kila rakaa',
          'Kukaa kati ya sijudi mbili',
          'Kukaa kwa Tashahhud ya mwisho',
          'Kusoma Tashahhud ya mwisho',
          'Kumswalia Mtume ﷺ baada ya Tashahhud ya mwisho',
          'Salamu mbili za kumaliza',
          'Tuma\'ninah — utulivu katika kila kitendo',
          'Tartib — kufanya nguzo kwa mfumo sahihi',
          'Nia ya kumaliza pamoja na salamu'
        ] },
        { kind: 'h3', text: 'Hekima ya Tuma\'ninah' },
        { kind: 'p', text: 'Mtume ﷺ alimuona mtu akiswali haraka haraka, akamwambia: "Rudi ukaswali kwani hujaswali." Mtu alirudi mara tatu, na kila wakati Mtume akamwambia hivyohivyo. Mwishowe Mtume akamfundisha kuswali kwa tuma\'ninah — yaani kwa utulivu, akipa kila kitendo wakati wake. Hii inaonyesha kwamba kuruku haraka, kusijudi haraka, kukaa haraka — huifanya swala isiwe sahihi. Tuma\'ninah ni roho ya swala.' },
        { kind: 'h3', text: 'Mambo Yanayoivunja Swala' },
        { kind: 'ul', items: [
          'Kuongea kwa makusudi',
          'Kucheka kwa sauti',
          'Kula au kunywa kwa makusudi',
          'Kufanya tendo kubwa lisilokuwa la swala',
          'Kupoteza nia ya swala',
          'Kugeuka kabisa upande wa Qibla',
          'Kuvunja wudhu',
          'Kufunua auriya kwa kiasi kikubwa',
          'Kuwa najisi imeanguka mwilini'
        ] },
      ],
      [
        { kind: 'h2', text: 'الفرق بين الشرط والركن والواجب' },
        { kind: 'p', text: 'فرّق الفقهاء بين ثلاثة مصطلحات تتعلق بصحة الصلاة:' },
        { kind: 'ul', items: [
          'الشرط — ما يلزم تحقيقه قبل الصلاة ويستمر فيها، كالطهارة وستر العورة. وفقده يبطل الصلاة',
          'الركن — جزء من الصلاة ذاتها، كقراءة الفاتحة والركوع. وتركه عمداً يبطلها، وسهواً يجبر بسجود السهو',
          'الواجب — ما يجب فعله في الصلاة لكن تركه لا يبطلها، ويُجبر بسجود السهو'
        ] },
        { kind: 'h3', text: 'شروط الصلاة' },
        { kind: 'ol', items: [
          'الإسلام',
          'العقل',
          'بلوغ سن التمييز — ويبدأ التعليم في السابعة ويُلزَم بها في العاشرة',
          'الطهارة من الحدثين',
          'إزالة النجاسة من البدن والثوب والمكان',
          'ستر العورة — للرجل من السرة إلى الركبة، وللمرأة كل البدن إلا الوجه والكفين',
          'دخول الوقت',
          'استقبال القبلة',
          'النية'
        ] },
        { kind: 'h3', text: 'أركان الصلاة عند الشافعية' },
        { kind: 'p', text: 'ذكر الشافعية أربعة عشر ركناً:' },
        { kind: 'ol', items: [
          'القيام للقادر',
          'تكبيرة الإحرام',
          'قراءة الفاتحة في كل ركعة',
          'الركوع',
          'الاعتدال من الركوع',
          'السجدتان في كل ركعة',
          'الجلوس بين السجدتين',
          'الجلوس للتشهد الأخير',
          'قراءة التشهد الأخير',
          'الصلاة على النبي ﷺ',
          'التسليمتان',
          'الطمأنينة في الأركان',
          'الترتيب',
          'النية للخروج بالسلام'
        ] },
        { kind: 'h3', text: 'حكمة الطمأنينة' },
        { kind: 'p', text: 'رأى النبي ﷺ رجلاً يصلي بسرعة فقال له: "ارجع فصلِّ فإنك لم تصلِّ" ثلاث مرات. ثم علّمه الصلاة بطمأنينة. هذا يدل على أن السرعة المخلّة في الركوع والسجود تُبطل صحة الصلاة. والطمأنينة روح الصلاة.' },
        { kind: 'h3', text: 'مبطلات الصلاة' },
        { kind: 'ul', items: [
          'الكلام عمداً',
          'الضحك بصوت',
          'الأكل والشرب عمداً',
          'العمل الكثير من غير جنس الصلاة',
          'فقد النية',
          'الانحراف عن القبلة',
          'انتقاض الوضوء',
          'انكشاف العورة الكثيرة',
          'وقوع نجاسة على البدن'
        ] },
      ],
      [
        { kind: 'h2', text: 'The Distinction Between Conditions, Pillars, and Obligations' },
        { kind: 'p', text: 'Scholars of fiqh distinguish three terms that relate to the validity of prayer:' },
        { kind: 'ul', items: [
          "Shart (Condition) — something required before the prayer begins and which must continue throughout, such as having wudhu and covering the 'awrah. If broken, the prayer is invalidated",
          'Rukn (Pillar) — an actual part of the prayer itself, such as reciting Al-Fatiha or performing ruku. Omitted deliberately, the prayer is invalid; omitted forgetfully, it is repaired by sujud as-sahw',
          'Wajib (Obligation) — something that must be done in prayer but whose omission does not invalidate it. Repaired by sujud as-sahw'
        ] },
        { kind: 'h3', text: 'Conditions of Prayer' },
        { kind: 'ol', items: [
          'Islam — the prayer of a non-Muslim is not accepted',
          'Sound mind — the insane are not obligated',
          'Reaching the age of discernment — typically taught at age seven and made obligatory at ten',
          'Removal of ritual impurity — having wudhu (for minor) or ghusl (for major)',
          'Removal of physical impurity from the body, clothes, and place of prayer',
          "Covering the 'awrah — for a man between the navel and knees, for a woman the entire body except the face and hands",
          'The time of the prayer having entered',
          "Facing the Qibla — facing the Ka'bah in Makkah",
          'Niyyah — intending the specific prayer being performed'
        ] },
        { kind: 'h3', text: "Pillars of Prayer (Shafi'i School)" },
        { kind: 'p', text: "The Shafi'i school identifies fourteen pillars:" },
        { kind: 'ol', items: [
          'Standing for one who is able',
          'Takbirat al-Ihram — saying "Allahu Akbar" to begin',
          'Reciting Al-Fatiha in every rakaat',
          'Ruku (bowing) until the hands reach the knees',
          "Standing erect after ruku (i'tidal)",
          'Two prostrations (sujud) in every rakaat',
          'Sitting between the two sujud',
          'Sitting for the final Tashahhud',
          'Reciting the final Tashahhud',
          'Sending blessings on the Prophet ﷺ after the final Tashahhud',
          'The two closing salaams',
          "Tuma'ninah — calmness and stillness in each act",
          'Tartib (order) — performing the pillars in their proper sequence',
          'The intention to end the prayer with the salaam'
        ] },
        { kind: 'h3', text: "The Wisdom of Tuma'ninah" },
        { kind: 'p', text: "The Prophet ﷺ once saw a man praying hastily and told him: 'Return and pray, for you have not prayed.' This happened three times. Finally, the Prophet taught him to pray with tuma'ninah — calm composure, giving each act its proper time. This shows that hurried bowing, hurried prostration, and hurried sitting render a prayer invalid. Tuma'ninah is the very soul of prayer." },
        { kind: 'h3', text: 'What Invalidates Prayer' },
        { kind: 'ul', items: [
          'Speaking deliberately',
          'Audible laughter',
          'Eating or drinking deliberately',
          'A substantial movement unrelated to prayer',
          'Loss of intention',
          'Turning fully away from the Qibla',
          'Wudhu being broken',
          "Significant exposure of the 'awrah",
          'Impurity falling on the body'
        ] },
      ],
    ),
    duration: '24:00',
    status: 'published',
    tags: ['fiqh', 'swala', 'pillars', 'conditions'],
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
  },

  {
    id: 'l-fiqhi-swala-namna',
    title: {
      sw: 'Namna ya Kuswali — Hatua kwa Hatua',
      ar: 'صفة الصلاة خطوة بخطوة',
      en: 'How to Pray — A Step-by-Step Guide',
    },
    slug: 'namna-ya-kuswali',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-swala',
    order: 3,
    content: richContent(
      [
        { kind: 'h2', text: 'Maandalizi Kabla ya Swala' },
        { kind: 'p', text: 'Kabla ya kuanza swala, hakikisha mambo yafuatayo:' },
        { kind: 'ol', items: [
          'Wudhu kamili',
          'Mwili, nguo, na mahali pa kuswali ni vifu',
          'Auriya imefunikwa',
          'Wakati umeingia',
          'Unaelekea Qibla',
          'Una nia ya swala maalumu moyoni'
        ] },
        { kind: 'h3', text: '1. Takbirat al-Ihram' },
        { kind: 'p', text: 'Inua mikono yako kwa kiwango cha mabega au masikio, vidole vimekunjwa kidogo, viganja vinaelekea Qibla, kisha sema "Allahu Akbar." Hapa ndipo unapoingia katika swala — kabla ya hii, bado uko nje ya swala; baada ya hii, uko ndani ya hekalu la mazungumzo na Mola wako.' },
        { kind: 'h3', text: '2. Du\'a al-Istiftah na Al-Fatiha' },
        { kind: 'p', text: 'Weka mkono wa kulia juu ya mkono wa kushoto kwenye kifua au tumbo (kuna tofauti za madhab). Soma du\'a ya kuanza, kisha A\'udhu, kisha Al-Fatiha. Du\'a ya kuanza maarufu ni:' },
        { kind: 'quote', text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ' },
        { kind: 'p', text: 'Maana yake: "Utukufu wako, ee Mwenyezi Mungu, na sifa zako, na limetukuka jina lako, na imeshinda azma yako, na hakuna mola apasaye kuabudiwa ila wewe." Kisha sema "A\'udhu billahi minash-shaytan ir-rajim" na "Bismillahi r-Rahmani r-Rahim", kisha soma Al-Fatiha kwa makini.' },
        { kind: 'h3', text: '3. Kusoma Sura Mengine' },
        { kind: 'p', text: 'Baada ya Al-Fatiha katika rakaa mbili za mwanzo, soma sura nyingine yoyote au sehemu ya Qur\'an. Sura zinazopendekezwa kwa wanaoanza ni sura fupi za mwisho wa Qur\'an: Al-Ikhlas, Al-Falaq, An-Nas, Al-Kawthar, Al-Asr, na zinginezo.' },
        { kind: 'h3', text: '4. Ruku' },
        { kind: 'p', text: 'Sema "Allahu Akbar" na uinamie hadi mkono ufike kwenye magoti. Mgongo uwe sawa kabisa kama meza, kichwa kisiwe juu wala chini ya mgongo. Sema mara tatu: "Subhana Rabbiyal-Adheem" (Utukufu wa Mola wangu Mtukufu). Tuma\'ninah hapa ni muhimu sana.' },
        { kind: 'h3', text: '5. I\'tidal — Kunyooka' },
        { kind: 'p', text: 'Inuka kutoka rukuu ukisema "Sami\'a-Llahu liman hamidah" (Allah amesikia mwenye kumsifu), kisha ukinyooka kabisa, sema "Rabbana wa laka-l-hamd" (Mola wetu, na sifa zote ni zako). Simama wima na utulie kabisa.' },
        { kind: 'h3', text: '6. Sijudi ya Kwanza' },
        { kind: 'p', text: 'Sema "Allahu Akbar" na ushuke kwenda sijudi. Sehemu saba za mwili lazima ziguse ardhi: paji la uso pamoja na pua, viganja vya mikono miwili, magoti mawili, na vidole vya miguu. Sema mara tatu: "Subhana Rabbiyal-A\'la" (Utukufu wa Mola wangu Aliye Juu). Sijudi ndio nafasi ya karibu zaidi mtu na Mola wake — Mtume ﷺ alisema: "Mwabudu yu karibu sana na Mola wake akiwa katika sijudi, basi ongeza dua hapo" (Muslim).' },
        { kind: 'h3', text: '7. Kukaa Kati ya Sijudi' },
        { kind: 'p', text: 'Inuka kutoka sijudi ukisema "Allahu Akbar," kisha ukae kwa muda mfupi ukisoma: "Rabbi-ghfir li" (Mola wangu, nisamehe). Tuma\'ninah hapa pia.' },
        { kind: 'h3', text: '8. Sijudi ya Pili' },
        { kind: 'p', text: 'Rudia sijudi mara nyingine kama ulivyofanya ya kwanza. Hii inakamilisha rakaa moja. Inuka kwenda rakaa ya pili.' },
        { kind: 'h3', text: '9. Tashahhud na Salamu za Mwisho' },
        { kind: 'p', text: 'Baada ya rakaa zote, kaa kwa Tashahhud ya mwisho. Soma:' },
        { kind: 'quote', text: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ' },
        { kind: 'p', text: 'Kisha mswalia Mtume ﷺ kwa swala ya Ibrahimiyya: "Allahumma swalli ala Muhammad..." Mwishoni, geuza uso wako kulia ukisema "Assalamu alaykum wa rahmatullah," kisha kushoto kwa neno hilo hilo. Hapa swala imekamilika.' },
        { kind: 'h3', text: 'Sehemu ya Mwanamke' },
        { kind: 'p', text: 'Mwanamke anaswali kama mwanaume kwa nguzo zote, lakini kuna tofauti ndogo kwa Shafi\'i: anajikusanya zaidi katika sijudi (mikono karibu na ubavu), na sehemu zake za mwili zinapaswa kufunikwa kabisa isipokuwa uso na mikono.' },
      ],
      [
        { kind: 'h2', text: 'الاستعداد قبل الصلاة' },
        { kind: 'p', text: 'قبل بدء الصلاة تأكّد مما يلي:' },
        { kind: 'ol', items: [
          'الوضوء كاملاً',
          'طهارة البدن والثوب والمكان',
          'ستر العورة',
          'دخول الوقت',
          'استقبال القبلة',
          'استحضار النية في القلب'
        ] },
        { kind: 'h3', text: '١. تكبيرة الإحرام' },
        { kind: 'p', text: 'ارفع يديك إلى حذو منكبيك أو أذنيك مفتوحتي الأصابع متجهتين للقبلة، ثم قل "الله أكبر". هذا أول دخول الصلاة — قبلها أنت خارجها، وبعدها أنت في محراب المناجاة.' },
        { kind: 'h3', text: '٢. دعاء الاستفتاح والفاتحة' },
        { kind: 'p', text: 'ضع يدك اليمنى على اليسرى على الصدر أو تحت السرة (يختلف الفقهاء). اقرأ دعاء الاستفتاح ثم الاستعاذة ثم الفاتحة. ومن أدعية الاستفتاح:' },
        { kind: 'quote', text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ' },
        { kind: 'p', text: 'ثم قل "أعوذ بالله من الشيطان الرجيم" و"بسم الله الرحمن الرحيم"، ثم اقرأ الفاتحة بتدبر.' },
        { kind: 'h3', text: '٣. قراءة سورة بعد الفاتحة' },
        { kind: 'p', text: 'بعد الفاتحة في الركعتين الأوليين اقرأ سورة أو ما تيسر. ومن السور الموصى بها للمبتدئ السور القصار في آخر القرآن: الإخلاص، الفلق، الناس، الكوثر، العصر.' },
        { kind: 'h3', text: '٤. الركوع' },
        { kind: 'p', text: 'قل "الله أكبر" واركع حتى تستوي يداك على ركبتيك. والظهر مستوٍ كاللوح، والرأس لا أعلى من الظهر ولا أدنى. وقل ثلاثاً: "سبحان ربي العظيم". والطمأنينة هنا ركن.' },
        { kind: 'h3', text: '٥. الاعتدال' },
        { kind: 'p', text: 'ارفع من الركوع قائلاً "سمع الله لمن حمده"، ثم وأنت قائم قل "ربنا ولك الحمد". قف منتصباً مطمئناً.' },
        { kind: 'h3', text: '٦. السجود الأول' },
        { kind: 'p', text: 'قل "الله أكبر" واسجد. تلامس الأرض سبعة أعضاء: الجبهة مع الأنف، والكفان، والركبتان، وأطراف القدمين. وقل ثلاثاً: "سبحان ربي الأعلى". والسجود أقرب موضع للعبد من ربه، قال النبي ﷺ: "أقرب ما يكون العبد من ربه وهو ساجد، فأكثروا الدعاء" (مسلم).' },
        { kind: 'h3', text: '٧. الجلوس بين السجدتين' },
        { kind: 'p', text: 'ارفع من السجود قائلاً "الله أكبر"، ثم اجلس برهة قائلاً: "ربِّ اغفر لي". والطمأنينة هنا أيضاً.' },
        { kind: 'h3', text: '٨. السجود الثاني' },
        { kind: 'p', text: 'كرر السجود كالأول. وبهذا تنتهي الركعة. قم للركعة الثانية.' },
        { kind: 'h3', text: '٩. التشهد والتسليم' },
        { kind: 'p', text: 'بعد آخر ركعة اجلس للتشهد الأخير واقرأ:' },
        { kind: 'quote', text: 'التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ' },
        { kind: 'p', text: 'ثم صلِّ على النبي ﷺ بالصلاة الإبراهيمية: "اللهم صلِّ على محمد...". ثم سلّم يميناً قائلاً "السلام عليكم ورحمة الله" ثم يساراً مثله.' },
        { kind: 'h3', text: 'صلاة المرأة' },
        { kind: 'p', text: 'تصلي المرأة كالرجل في الأركان، إلا أنها تتجمّع أكثر في السجود (ضمّ الكفين إلى الجنبين)، وعورتها كل البدن إلا الوجه والكفين.' },
      ],
      [
        { kind: 'h2', text: 'Preparation Before Prayer' },
        { kind: 'p', text: 'Before beginning your prayer, ensure the following:' },
        { kind: 'ol', items: [
          'You have valid wudhu',
          'Your body, clothing, and place of prayer are pure',
          "Your 'awrah is properly covered",
          'The prayer time has entered',
          'You are facing the Qibla',
          'You have made the intention for the specific prayer in your heart'
        ] },
        { kind: 'h3', text: '1. Takbirat al-Ihram' },
        { kind: 'p', text: 'Raise your hands to the level of your shoulders or ears, with fingers slightly spread, palms facing the Qibla, and say "Allahu Akbar." This is your entry into the prayer — before this you stood outside; with this word you have entered the sanctuary of intimate dialogue with your Lord.' },
        { kind: 'h3', text: "2. Opening Du'a and Al-Fatiha" },
        { kind: 'p', text: "Place your right hand over your left hand on your chest or below the navel (a permissible difference between schools). Recite the opening supplication, then the ta'awwudh, then Al-Fatiha. A widely-reported opening supplication is:" },
        { kind: 'quote', text: '"Glory be to You, O Allah, and praise. Blessed is Your name, and exalted is Your majesty, and there is no deity except You."' },
        { kind: 'p', text: 'Then say "I seek refuge in Allah from the rejected Shaytan" and "In the name of Allah, the Most Compassionate, the Most Merciful." Then recite Al-Fatiha attentively.' },
        { kind: 'h3', text: '3. Reciting an Additional Sura' },
        { kind: 'p', text: "After Al-Fatiha in the first two rakaat, recite another sura or portion of the Qur'an. Suras recommended for beginners include the short ones at the end of the Qur'an: Al-Ikhlas, Al-Falaq, An-Nas, Al-Kawthar, Al-Asr, and others." },
        { kind: 'h3', text: '4. Ruku (Bowing)' },
        { kind: 'p', text: 'Say "Allahu Akbar" and bow forward until your hands rest on your knees. Your back should be flat like a board — head neither above nor below the line of the back. Say three times: "Subhana Rabbiyal-Adheem" (Glory be to my Lord, the Magnificent). Tuma\'ninah here is essential.' },
        { kind: 'h3', text: "5. I'tidal — Standing Erect Again" },
        { kind: 'p', text: 'Rise from ruku saying "Sami\'a-Llahu liman hamidah" (Allah hears the one who praises Him), then once standing erect, say "Rabbana wa laka-l-hamd" (Our Lord, all praise belongs to You). Stand fully and remain still.' },
        { kind: 'h3', text: '6. The First Sujud' },
        { kind: 'p', text: 'Say "Allahu Akbar" and descend into prostration. Seven parts of the body must touch the ground: the forehead together with the nose, both palms, both knees, and the toes of both feet. Say three times: "Subhana Rabbiyal-A\'la" (Glory be to my Lord, the Most High). Sujud is the closest a servant comes to his Lord — the Prophet ﷺ said: "The closest a servant is to his Lord is when he is in sujud, so increase your supplication therein" (Muslim).' },
        { kind: 'h3', text: '7. Sitting Between the Two Sujud' },
        { kind: 'p', text: 'Rise from sujud saying "Allahu Akbar" and sit briefly, saying: "Rabbi-ghfir li" (My Lord, forgive me). Tuma\'ninah here as well.' },
        { kind: 'h3', text: '8. The Second Sujud' },
        { kind: 'p', text: 'Repeat sujud as you did the first. This completes one rakaat. Stand up for the next rakaat.' },
        { kind: 'h3', text: '9. Tashahhud and the Closing Salaams' },
        { kind: 'p', text: 'After all rakaat are completed, sit for the final Tashahhud and recite:' },
        { kind: 'quote', text: '"All greetings, prayers, and good things belong to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity except Allah, and I bear witness that Muhammad is His servant and messenger."' },
        { kind: 'p', text: 'Then send blessings upon the Prophet ﷺ with the Ibrahimi prayer: "O Allah, send blessings upon Muhammad..." Then turn your face to the right and say "Assalamu alaykum wa rahmatullah," and to the left with the same words. Your prayer is now complete.' },
        { kind: 'h3', text: "A Woman's Prayer" },
        { kind: 'p', text: "A woman prays exactly as a man in all the pillars, with minor differences in the Shafi'i school: she draws herself together more in sujud (arms close to her sides), and her 'awrah covers her entire body except her face and hands." },
      ],
    ),
    duration: '28:00',
    status: 'published',
    tags: ['fiqh', 'swala', 'how-to-pray'],
    createdAt: '2026-03-02',
    updatedAt: '2026-03-02',
  },

  // ============================================
  // FIQHI — Saumu
  // ============================================
  {
    id: 'l-fiqhi-saumu-masharti',
    title: {
      sw: 'Masharti na Hukumu za Saumu ya Ramadhani',
      ar: 'شروط صيام رمضان وأحكامه',
      en: 'Conditions and Rulings of the Ramadan Fast',
    },
    slug: 'masharti-ya-saumu',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-saumu',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Wajibu wa Saumu' },
        { kind: 'p', text: 'Saumu ya mwezi wa Ramadhani ilifanywa kuwa faradhi katika mwaka wa pili wa Hijra. Allah amesema:' },
        { kind: 'quote', text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ', cite: 'Al-Baqarah 2:183' },
        { kind: 'p', text: 'Aya inathibitisha mambo matatu: kuwa Saumu ni faradhi kwa Waumini, ilikuwa pia faradhi kwa watu wa mataifa yaliyotangulia, na lengo lake kuu ni taqwa — uchaji wa Allah. Saumu si tu kuachilia chakula na maji; ni mafunzo ya nafsi, kujizuia na matamanio, na kupanua wigo wa moyo.' },
        { kind: 'h3', text: 'Maana ya Saumu' },
        { kind: 'p', text: 'Saumu kisheria ni kujizuia na chakula, kinywaji, na mambo mengineyo yanayoivunja, kuanzia mapambazuko ya kweli (alfajiri) hadi jua linapotua, kwa nia ya kumtii Allah.' },
        { kind: 'h3', text: 'Masharti ya Wajibu' },
        { kind: 'p', text: 'Saumu inawajibika kwa mtu anayetimiza masharti yafuatayo:' },
        { kind: 'ol', items: [
          'Uislamu — kafiri hawajibiki',
          'Akili timamu — mwendawazimu hawajibiki hadi atakapopona',
          'Kufikia umri wa balehe — mtoto hawajibiki ingawa anapaswa kufundishwa',
          'Uwezo wa kufunga — mtu mzee sana au mgonjwa wa kudumu hawajibiki, badala yake hutoa fidya'
        ] },
        { kind: 'h3', text: 'Masharti ya Saumu Iwe Sahihi' },
        { kind: 'ol', items: [
          'Nia — kuweka nia moyoni kabla ya alfajiri kila usiku katika Ramadhani',
          'Kujizuia na vinavyoivunja kuanzia alfajiri hadi machweo',
          'Kuwa hauna hedhi (kwa wanawake) au nifasi'
        ] },
        { kind: 'h3', text: 'Wenye Kusamehewa Kufunga' },
        { kind: 'p', text: 'Allah amewasamehe baadhi ya watu kufunga, ingawa wengi wao wanatakiwa kufanya qadha (kufunga siku zile baadaye) au kutoa fidya:' },
        { kind: 'ul', items: [
          'Mgonjwa anayedhuru kwa kufunga — atafanya qadha akipona',
          'Msafiri anayesafiri umbali wa zaidi ya kilomita 80 — anaweza kuachilia, atafunga baadaye',
          'Mwanamke mwenye hedhi au nifasi — atalazimika kufanya qadha',
          'Mwanamke mjamzito au anayenyonyesha akihofia kwa nafsi yake au mtoto — atafunga baadaye, na kulingana na maoni baadhi anaweza kutoa fidya pia',
          'Mzee anayeshindwa kabisa kufunga — atatoa fidya tu (kulisha maskini kwa kila siku) bila qadha',
          'Mgonjwa wa kudumu asiyeweza kupona — atatoa fidya tu'
        ] },
        { kind: 'h3', text: 'Hekima ya Saumu' },
        { kind: 'p', text: 'Saumu ina hekima nyingi, baadhi yao zikiwa:' },
        { kind: 'ol', items: [
          'Kujenga taqwa — kupandisha kiwango cha kumcha Allah na kujizuia na yaliyo haramu',
          'Kufundisha subira na uvumilivu — yanayoshindana na matamanio ya nafsi',
          'Kuhisi maumivu ya wahitaji — mtu anayeruka mlo mmoja anaelewa zaidi shida ya wenye njaa daima',
          'Kupumzisha mfumo wa mwili — sayansi imeonyesha faida za kiafya za kufunga',
          'Kuongeza thawabu — kila tendo jema katika Ramadhani huzidishwa, na milango ya pepo hufunguliwa',
          'Kuondoa dhambi — Mtume ﷺ alisema: "Atakayefunga Ramadhani kwa imani na matarajio ya thawabu, atasamehewa dhambi zake za nyuma" (Bukhari na Muslim)'
        ] },
      ],
      [
        { kind: 'h2', text: 'وجوب الصيام' },
        { kind: 'p', text: 'فُرض صيام رمضان في السنة الثانية من الهجرة. قال الله تعالى:' },
        { kind: 'quote', text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ', cite: 'البقرة ٢:١٨٣' },
        { kind: 'p', text: 'تثبت الآية ثلاث حقائق: أن الصيام فرض على المؤمنين، وأنه كان فريضة على الأمم السابقة، وأن غايته العظمى التقوى. والصيام ليس مجرد ترك الطعام والشراب — بل تربية للنفس وكبح للشهوات وتوسيع لآفاق القلب.' },
        { kind: 'h3', text: 'تعريف الصيام' },
        { kind: 'p', text: 'الصيام شرعاً: الإمساك عن المفطرات من طلوع الفجر الصادق إلى غروب الشمس بنية امتثال أمر الله.' },
        { kind: 'h3', text: 'شروط الوجوب' },
        { kind: 'ol', items: [
          'الإسلام',
          'العقل',
          'البلوغ — والصبي يُؤمر بالصيام للتمرين',
          'القدرة على الصيام'
        ] },
        { kind: 'h3', text: 'شروط الصحة' },
        { kind: 'ol', items: [
          'النية كل ليلة قبل الفجر في رمضان',
          'الإمساك عن المفطرات من الفجر إلى المغرب',
          'الخلو من الحيض والنفاس'
        ] },
        { kind: 'h3', text: 'المعفوّون عن الصيام' },
        { kind: 'ul', items: [
          'المريض الذي يضرّه الصوم — يقضي إذا برئ',
          'المسافر مسافة قصر — يقضي بعد ذلك',
          'الحائض والنفساء — يلزمهما القضاء',
          'الحامل والمرضع إذا خافتا على نفسهما أو الولد',
          'الشيخ الكبير العاجز — يفدي ولا قضاء عليه',
          'المريض الذي لا يُرجى برؤه — يفدي'
        ] },
        { kind: 'h3', text: 'حكمة الصيام' },
        { kind: 'ol', items: [
          'تحقيق التقوى',
          'تربية الصبر',
          'الإحساس بمعاناة المحتاجين',
          'إراحة الجسد — وقد أثبت العلم فوائد الصيام الصحية',
          'مضاعفة الأجر — إذ تُضاعف الحسنات في رمضان وتُفتح أبواب الجنة',
          'تكفير الذنوب — قال النبي ﷺ: "من صام رمضان إيماناً واحتساباً غُفر له ما تقدّم من ذنبه" (متفق عليه)'
        ] },
      ],
      [
        { kind: 'h2', text: 'The Obligation of Fasting' },
        { kind: 'p', text: 'Fasting the month of Ramadan was made obligatory in the second year after the Hijra. Allah says:' },
        { kind: 'quote', text: '"O you who believe! Fasting has been prescribed for you as it was prescribed for those before you, that you may attain taqwa."', cite: 'Al-Baqarah 2:183' },
        { kind: 'p', text: 'The verse establishes three facts: that fasting is obligatory upon believers, that it was likewise obligatory upon previous nations, and that its supreme purpose is taqwa — God-consciousness. Fasting is not merely abstention from food and drink; it is a discipline of the soul, a curbing of desires, and an expansion of the heart.' },
        { kind: 'h3', text: 'The Definition of Fasting' },
        { kind: 'p', text: "In Islamic law, fasting is the deliberate abstention from food, drink, and other things that break the fast — from true dawn until sunset — with the intention of obeying Allah's command." },
        { kind: 'h3', text: 'Conditions for Obligation' },
        { kind: 'ol', items: [
          'Islam — non-Muslims are not held to it',
          'Sound mind — those who have lost their reason are not obligated until they recover',
          'Reaching puberty — though children should be trained',
          'Physical capacity — the very elderly or chronically ill are exempted, and instead pay fidya'
        ] },
        { kind: 'h3', text: 'Conditions of Validity' },
        { kind: 'ol', items: [
          'Niyyah — making the intention each night before dawn during Ramadan',
          'Abstaining from all that breaks the fast from dawn until sunset',
          'Being free from menstruation or post-natal bleeding (for women)'
        ] },
        { kind: 'h3', text: 'Those Exempt from Fasting' },
        { kind: 'p', text: 'Allah has exempted certain people from fasting, though most are required to make up the days later (qadha) or pay compensation (fidya):' },
        { kind: 'ul', items: [
          'A sick person whom fasting would harm — must make up the days when recovered',
          "A traveller covering more than the legal distance (about 80 km) — may break the fast and make up days later",
          'A menstruating woman or one in post-natal bleeding — must make up the missed days',
          'A pregnant or nursing woman who fears for herself or her child — makes up the days, and according to some scholars also pays fidya',
          'An elderly person unable to fast — pays only fidya (feeding a poor person for each missed day) without qadha',
          'A chronically ill person with no hope of recovery — pays only fidya'
        ] },
        { kind: 'h3', text: 'The Wisdom of Fasting' },
        { kind: 'ol', items: [
          'Cultivating taqwa — raising God-consciousness and self-restraint from forbidden things',
          'Training patience and perseverance against the cravings of the soul',
          'Feeling the suffering of the needy — one who skips even a single meal better understands constant hunger',
          "Resting the body's systems — modern science has confirmed the health benefits of intermittent abstention",
          'Multiplying reward — every good deed in Ramadan is amplified, and the gates of Paradise are opened',
          'Erasing past sins — the Prophet ﷺ said: "Whoever fasts Ramadan with faith and seeking reward, his previous sins will be forgiven" (Bukhari and Muslim)'
        ] },
      ],
    ),
    duration: '20:00',
    status: 'published',
    tags: ['fiqh', 'saumu', 'ramadan'],
    createdAt: '2026-03-05',
    updatedAt: '2026-03-05',
  },

  {
    id: 'l-fiqhi-saumu-mufattirat',
    title: {
      sw: 'Mambo Yanayoivunja Saumu',
      ar: 'مفطرات الصيام',
      en: 'What Breaks the Fast',
    },
    slug: 'mambo-yanayoivunja-saumu',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-saumu',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Vinavyoivunja Saumu' },
        { kind: 'p', text: 'Wanavyuoni wamekubaliana juu ya mambo kadhaa yanayoivunja saumu. Mambo haya yamegawanyika katika sehemu mbili: yale yanayohitaji kufanya qadha tu, na yale yanayohitaji qadha pamoja na kafara (fidia kubwa).' },
        { kind: 'h3', text: 'Vinavyohitaji Qadha Tu' },
        { kind: 'ol', items: [
          'Kula au kunywa kwa makusudi — kitu chochote kinachoingia tumboni kupitia kinywa',
          'Kupiga mate yenye damu au makohozi yaliyotoka kifuani — kwa baadhi ya wanavyuoni',
          'Kuingiza dawa kupitia pua hadi ikafika tumboni',
          'Kutapika kwa makusudi — Mtume ﷺ alisema: "Atakayetapika kwa kuvuta tapika, hana qadha; lakini atakayetapika kwa makusudi, lazima afanye qadha" (Sunan)',
          'Hedhi au nifasi (kwa wanawake) — wanazi mbatika kufunga na kufanya qadha baadaye',
          'Kupoteza akili wakati wa mchana wa Ramadhani'
        ] },
        { kind: 'h3', text: 'Vinavyohitaji Qadha na Kafara' },
        { kind: 'p', text: 'Kufanya tendo la ndoa katika mchana wa Ramadhani kwa makusudi ni kipekee — inahitaji qadha pamoja na kafara nzito. Kafara yake ni:' },
        { kind: 'ol', items: [
          'Kumkomboa mtumwa — hii haitumiki tena leo, kwani utumwa umemalizika',
          'Kufunga miezi miwili mfululizo bila kupumzika',
          'Kulisha maskini sitini'
        ] },
        { kind: 'p', text: 'Hatua hizi hufanywa kwa mfumo huu — yaani ikiwa hujui kumkomboa mtumwa, unahamia kufunga; ikiwa huwezi kufunga miezi miwili, unahamia kulisha maskini.' },
        { kind: 'h3', text: 'Visizovunja Saumu' },
        { kind: 'p', text: 'Mambo yafuatayo yamethibitishwa kwa Sunna kuwa hayavunji saumu, na ni muhimu kuyajua ili kuepuka wasiwasi wa bure:' },
        { kind: 'ul', items: [
          'Kumeza mate yako mwenyewe',
          'Kuoga au kuogelea, hata kama mtu amezama kwa muda — bora asiviunge maji kupitia pua au kinywa',
          'Kupanga mswaki mdomoni au kupiga mate ya kawaida',
          'Kupaka manukato',
          'Kutoka damu kwa hiari yako (kama mlinzi wa damu kwa madhumuni ya kiafya)',
          'Kusahau na kula au kunywa — Mtume ﷺ alisema: "Atakayesahau akala au akanywa, basi aendelee na saumu yake, kwa kuwa Allah ndiye aliyemlisha na akamtorosha" (Bukhari)',
          'Kutapika bila ya kujikutapika',
          'Kuingiza maji kwa wudhu kwa kawaida',
          'Kumbusu mke ikiwa una uwezo wa kujizuia — Mtume ﷺ alikuwa akimbusu mke wake akiwa amefunga (Bukhari)'
        ] },
        { kind: 'h3', text: 'Mambo Mengine ya Kuepuka' },
        { kind: 'p', text: 'Pamoja na kuepuka vinavyovunja saumu, Mwislamu anapaswa kuepuka mambo yanayopunguza thawabu ya saumu, hata kama hayaivunji:' },
        { kind: 'ul', items: [
          'Kusengenya na kusema uwongo — Mtume ﷺ alisema: "Asiyeacha maneno ya uwongo na vitendo vya uwongo, Allah hahitaji aiweke chakula chake na kinywaji chake" (Bukhari)',
          'Kutangulia kati ya watu kwa hasira na ugomvi',
          'Kuangalia haramu — kama vile picha za upunguzaji nguo',
          'Kupoteza wakati katika michezo na vitendo vya kipuuzi',
          'Kula chakula kingi sana baada ya iftari — kinashinda lengo la saumu'
        ] },
      ],
      [
        { kind: 'h2', text: 'مفطرات الصيام' },
        { kind: 'p', text: 'اتفق الفقهاء على مفطرات معينة. وتنقسم إلى ما يوجب القضاء فقط، وما يوجب القضاء والكفارة معاً.' },
        { kind: 'h3', text: 'ما يوجب القضاء فقط' },
        { kind: 'ol', items: [
          'الأكل والشرب عمداً — كل ما يصل إلى الجوف عن طريق الفم',
          'تعمد ابتلاع البلغم النازل من الصدر عند بعض العلماء',
          'إيصال الدواء عبر الأنف إلى الجوف',
          'تعمد القيء — قال النبي ﷺ: "من ذرعه القيء فلا قضاء عليه، ومن استقاء عمداً فعليه القضاء" (السنن)',
          'الحيض والنفاس — تُمسكان عن الصوم وتقضيان',
          'زوال العقل في نهار رمضان'
        ] },
        { kind: 'h3', text: 'ما يوجب القضاء والكفارة' },
        { kind: 'p', text: 'الجماع نهاراً في رمضان عمداً — يوجب القضاء وكفارة مغلظة:' },
        { kind: 'ol', items: [
          'عتق رقبة',
          'فإن لم يجد فصيام شهرين متتابعين',
          'فإن لم يستطع فإطعام ستين مسكيناً'
        ] },
        { kind: 'p', text: 'وهذه الخصال على الترتيب — لا ينتقل إلى التالية إلا بعجزه عن السابقة.' },
        { kind: 'h3', text: 'ما لا يفطّر' },
        { kind: 'p', text: 'مما ثبت بالسنة عدم تفطيره:' },
        { kind: 'ul', items: [
          'بلع الريق',
          'الاغتسال أو السباحة، وإن غاص الإنسان زمناً',
          'استعمال السواك',
          'الطيب',
          'سحب الدم لحاجة طبية',
          'الأكل والشرب نسياناً — قال ﷺ: "من نسي وهو صائم فأكل أو شرب فليتم صومه فإنما أطعمه الله وسقاه" (البخاري)',
          'القيء غير العمد',
          'دخول ماء الوضوء إلى الفم بلا تعمد',
          'تقبيل الزوجة لمن يملك إربه — كان النبي ﷺ يقبّل وهو صائم (البخاري)'
        ] },
        { kind: 'h3', text: 'أمور ينبغي اجتنابها' },
        { kind: 'p', text: 'مع المفطرات هناك ما ينقص أجر الصوم وإن لم يبطله:' },
        { kind: 'ul', items: [
          'الغيبة والكذب — قال ﷺ: "من لم يدع قول الزور والعمل به فليس لله حاجة في أن يدع طعامه وشرابه" (البخاري)',
          'الخصام والشحناء',
          'النظر المحرم',
          'إضاعة الوقت في اللغو',
          'الإفراط في الأكل بعد الإفطار'
        ] },
      ],
      [
        { kind: 'h2', text: 'What Invalidates the Fast' },
        { kind: 'p', text: 'Scholars are agreed on a number of things that break the fast. These fall into two categories: those requiring only qadha (making up the day), and those requiring both qadha and kaffarah (a major expiation).' },
        { kind: 'h3', text: 'Things Requiring Qadha Only' },
        { kind: 'ol', items: [
          'Eating or drinking deliberately — anything that reaches the stomach through the mouth',
          'Deliberately swallowing phlegm from the chest, according to some scholars',
          'Introducing medicine through the nose into the stomach',
          'Deliberately inducing vomiting — the Prophet ﷺ said: "Whoever vomits involuntarily owes no qadha; but whoever induces vomiting deliberately must make up the day" (Sunan)',
          'Menstruation or post-natal bleeding — women must stop fasting and make up the days later',
          'Loss of consciousness during the daytime of Ramadan'
        ] },
        { kind: 'h3', text: 'Things Requiring Both Qadha and Kaffarah' },
        { kind: 'p', text: 'Sexual intercourse during the daytime of Ramadan deliberately — this requires both qadha and a major expiation. The kaffarah is:' },
        { kind: 'ol', items: [
          'Freeing a slave — no longer applicable today',
          'If unable, fasting two consecutive months without break',
          'If unable, feeding sixty needy people'
        ] },
        { kind: 'p', text: 'These options are sequential — one moves to the next only if unable to fulfil the previous.' },
        { kind: 'h3', text: 'Things That Do NOT Break the Fast' },
        { kind: 'p', text: 'The following are established by Sunnah as not breaking the fast, and it is important to know them to avoid baseless anxiety:' },
        { kind: 'ul', items: [
          'Swallowing one\'s own saliva',
          'Bathing or swimming, even if one is submerged for a time — though it is better not to allow water through the nose or mouth',
          'Using the siwak or rinsing the mouth normally',
          'Applying perfume or fragrance',
          'Having blood drawn for legitimate medical purposes',
          'Eating or drinking out of forgetfulness — the Prophet ﷺ said: "Whoever forgets and eats or drinks while fasting, let him complete his fast, for it was Allah who fed him and gave him drink" (Bukhari)',
          'Vomiting involuntarily',
          'Water from wudhu accidentally entering the throat',
          'Kissing one\'s spouse if able to control oneself — the Prophet ﷺ used to kiss his wives while fasting (Bukhari)'
        ] },
        { kind: 'h3', text: 'Things to Avoid Generally' },
        { kind: 'p', text: 'Beyond what breaks the fast, a Muslim should avoid things that diminish its reward, even if they do not invalidate it:' },
        { kind: 'ul', items: [
          'Backbiting and lying — the Prophet ﷺ said: "Whoever does not abandon false speech and acting upon it, Allah has no need that he should abandon his food and drink" (Bukhari)',
          'Quarrelling and angry disputes',
          'Looking at forbidden images',
          'Wasting time in idle pursuits',
          'Overindulging in food after iftar — defeating the very purpose of the fast'
        ] },
      ],
    ),
    duration: '18:00',
    status: 'published',
    tags: ['fiqh', 'saumu', 'mufattirat'],
    createdAt: '2026-03-08',
    updatedAt: '2026-03-08',
  },

  // ============================================
  // FIQHI — Zaka
  // ============================================
  {
    id: 'l-fiqhi-zaka-misingi',
    title: {
      sw: 'Misingi ya Zaka — Maana, Hukumu na Hekima',
      ar: 'أصول الزكاة — تعريفها وحكمها وحكمتها',
      en: 'Foundations of Zakat — Meaning, Ruling, and Wisdom',
    },
    slug: 'misingi-ya-zaka',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-zaka',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Zaka' },
        { kind: 'p', text: 'Neno "Zaka" lina maana mbili katika lugha ya Kiarabu: kuongezeka na kutakaswa. Maana zote mbili zinatumika katika dhana ya kidini — Zaka inaongeza baraka katika mali iliyobaki na kuitakasa kwa kuondoa haki ya wahitaji ndani yake. Kisheria, Zaka ni sehemu maalumu ya mali ambayo Mwislamu wa kiwango fulani cha utajiri analazimika kuitoa kwa makundi maalumu ya watu.' },
        { kind: 'h3', text: 'Hukumu ya Zaka' },
        { kind: 'p', text: 'Zaka ni nguzo ya tatu ya Uislamu. Kwa hadith ya Jibril, ni mojawapo ya nguzo tano. Allah amelinganisha Zaka na Swala katika sehemu nyingi za Qur\'an:' },
        { kind: 'quote', text: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ', cite: 'Al-Baqarah 2:43' },
        { kind: 'p', text: 'Aya hii imejitokeza katika Qur\'an zaidi ya mara ishirini, ikionyesha ulinganifu wa Zaka na Swala. Kuipuuza Zaka ni dhambi kubwa, na kuipuuza kwa makusudi kunaweza kufikia kufuru ikiwa mtu anakana ulazima wake.' },
        { kind: 'h3', text: 'Masharti ya Wajibu wa Zaka' },
        { kind: 'p', text: 'Zaka inawajibika kwa mtu anayetimiza masharti yafuatayo:' },
        { kind: 'ol', items: [
          'Uislamu — kafiri hatozwi Zaka',
          'Uhuru — mtumwa hatozwi Zaka, lakini katika ulimwengu wa leo hili halitumiki',
          'Kumiliki nisab — kiwango cha chini cha mali kinachofanya Zaka iwe lazima',
          'Mali kuwepo kwa muda wa mwaka mzima wa Hijra (haul) — isipokuwa mazao na madini ambayo Zaka yake hutolewa wakati wa mavuno',
          'Mali kuwa ya kuongezeka — kweli au ya uwezekano (kama vile fedha ambayo inaweza kutumika au kuwekezwa)'
        ] },
        { kind: 'h3', text: 'Hekima ya Zaka' },
        { kind: 'p', text: 'Zaka ina hekima nyingi za kibinafsi na za kijamii:' },
        { kind: 'ol', items: [
          'Kutakasa nafsi kutokana na unyumba na ubahili — pesa ina nguvu kubwa juu ya nafsi, na Zaka ni dawa yake',
          'Kutakasa mali — Mtume ﷺ amesema: "Zaka huitakasa mali"',
          'Kuonyesha shukrani kwa Allah aliyetoa rizki — kushiriki sehemu yake na wahitaji ni shukrani ya kweli',
          'Kupunguza utengano wa kijamii kati ya matajiri na maskini',
          'Kujenga upendo na umoja — anayepokea Zaka anampenda anayempa, na anayetoa anajifunza huruma',
          'Kuongeza baraka katika mali iliyobaki — Allah amesema kwamba sadaka haipunguzi mali',
          'Kuepuka adhabu ya akhera — Mtume ﷺ alionya wenye kuwakuza dhahabu na fedha bila kutoa Zaka kwamba siku ya kiyama vitakuwa vifaa vya kuwachoma'
        ] },
        { kind: 'h3', text: 'Wapokeaji wa Zaka' },
        { kind: 'p', text: 'Allah ametaja katika Qur\'an makundi nane ya watu wanaostahili Zaka:' },
        { kind: 'quote', text: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ', cite: 'At-Tawbah 9:60' },
        { kind: 'ol', items: [
          'Mafukara (Fuqara) — wale wenye umaskini mkubwa',
          'Maskini — wale wenye ujenzi mdogo wa maisha',
          'Wafanyakazi wa kukusanya Zaka',
          'Walioita kuingia katika Uislamu (Mu\'allafat al-Qulub)',
          'Watumwa wanaotaka kujikomboa (haitumiki sasa)',
          'Walio katika madeni mazito (Gharimun)',
          'Katika njia ya Allah (Fi Sabil-Allah) — kazi za kidini, jihadi',
          'Msafiri aliyepatwa na shida njiani (Ibn as-Sabil)'
        ] },
      ],
      [
        { kind: 'h2', text: 'تعريف الزكاة' },
        { kind: 'p', text: 'كلمة "زكاة" في اللغة لها معنيان: النماء والطهارة. وكلاهما متحقق في الزكاة الشرعية — فهي تنمي البركة في المال الباقي وتطهّره بإخراج حق الفقراء منه. وشرعاً: الزكاة قدر مخصوص من المال يجب على المسلم في حدّ معيّن من الغنى دفعه لأصناف مخصوصة.' },
        { kind: 'h3', text: 'حكم الزكاة' },
        { kind: 'p', text: 'الزكاة الركن الثالث من أركان الإسلام بحديث جبريل. وقرنها الله بالصلاة في كتابه:' },
        { kind: 'quote', text: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ', cite: 'البقرة ٢:٤٣' },
        { kind: 'p', text: 'وردت هذه القرينة في القرآن أكثر من عشرين مرة، مما يدل على عظيم منزلتها. ومن جحد وجوبها كفر، ومن منعها بخلاً ارتكب كبيرة من الكبائر.' },
        { kind: 'h3', text: 'شروط وجوب الزكاة' },
        { kind: 'ol', items: [
          'الإسلام',
          'الحرية',
          'ملك النصاب — وهو القدر الذي تجب فيه الزكاة',
          'حولان الحول — مرور سنة هجرية، إلا في الزروع والمعادن',
          'كون المال نامياً حقيقة أو حكماً'
        ] },
        { kind: 'h3', text: 'حكم الزكاة' },
        { kind: 'ol', items: [
          'تطهير النفس من الشحّ والبخل',
          'تطهير المال — قال ﷺ: "إن الزكاة تطهر المال"',
          'شكر الله على نعمة الرزق',
          'تقليل الفجوة الاجتماعية',
          'إشاعة المحبة والوحدة',
          'زيادة البركة في المال الباقي',
          'النجاة من عذاب الآخرة — أنذر النبي ﷺ مانعي الزكاة بأن أموالهم تكون حممة عليهم يوم القيامة'
        ] },
        { kind: 'h3', text: 'مصارف الزكاة' },
        { kind: 'p', text: 'ذكر الله ثمانية أصناف:' },
        { kind: 'quote', text: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ', cite: 'التوبة ٩:٦٠' },
        { kind: 'ol', items: [
          'الفقراء',
          'المساكين',
          'العاملون عليها',
          'المؤلفة قلوبهم',
          'في الرقاب',
          'الغارمون',
          'في سبيل الله',
          'ابن السبيل'
        ] },
      ],
      [
        { kind: 'h2', text: 'The Meaning of Zakat' },
        { kind: 'p', text: 'The word "Zakat" in Arabic carries two meanings: increase and purification. Both apply in Islamic law — Zakat increases the blessing in what remains and purifies it by removing the right of the poor that lay within. Legally, Zakat is a specific portion of wealth that a Muslim of a certain level of means is obliged to pay to specified categories of people.' },
        { kind: 'h3', text: 'The Ruling on Zakat' },
        { kind: 'p', text: 'Zakat is the third pillar of Islam according to the Hadith of Jibril. Allah pairs Zakat with Salah in many verses:' },
        { kind: 'quote', text: '"And establish prayer and give Zakat."', cite: 'Al-Baqarah 2:43' },
        { kind: 'p', text: "This pairing appears more than twenty times in the Qur'an, indicating how closely the two stand. Denying its obligation amounts to disbelief; withholding it through stinginess is a major sin." },
        { kind: 'h3', text: 'Conditions for Obligation' },
        { kind: 'ol', items: [
          'Islam — non-Muslims do not pay Zakat',
          'Freedom — slaves did not pay Zakat (no longer applicable)',
          'Owning the nisab — the minimum threshold of wealth',
          'A complete lunar (Hijri) year having passed (haul) — except for crops and minerals which are due at harvest',
          'The wealth being capable of growth — actually or potentially'
        ] },
        { kind: 'h3', text: 'The Wisdom of Zakat' },
        { kind: 'ol', items: [
          'Purifying the soul from miserliness and greed — wealth has great power over the soul, and Zakat is its remedy',
          'Purifying the wealth itself — the Prophet ﷺ said: "Indeed, Zakat purifies wealth"',
          'Showing gratitude to Allah for sustenance — sharing a portion is true thanks',
          'Reducing social inequality between rich and poor',
          'Building love and unity — recipients love those who give, givers learn compassion',
          'Increasing blessing in the remaining wealth — Allah has stated that charity does not diminish wealth',
          'Avoiding punishment in the hereafter — the Prophet ﷺ warned that hoarders of gold and silver who do not pay Zakat will find their treasures used to burn them on the Day of Resurrection'
        ] },
        { kind: 'h3', text: 'The Recipients of Zakat' },
        { kind: 'p', text: 'Allah named eight categories in the Qur\'an:' },
        { kind: 'quote', text: '"Charities are only for the poor, the destitute, those employed to collect them, those whose hearts are reconciled, the freeing of captives, those in debt, in the way of Allah, and the wayfarer."', cite: 'At-Tawbah 9:60' },
        { kind: 'ol', items: [
          'Fuqara — the poor',
          'Masakin — the destitute',
          'Workers who administer Zakat',
          'Those whose hearts are to be reconciled to Islam',
          'Those seeking to free themselves from slavery (no longer applicable)',
          'Those burdened with debt (Gharimun)',
          'In the way of Allah — religious causes',
          'The stranded traveller (Ibn as-Sabil)'
        ] },
      ],
    ),
    duration: '22:00',
    status: 'published',
    tags: ['fiqh', 'zaka', 'pillar'],
    createdAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },

  {
    id: 'l-fiqhi-zaka-mali',
    title: {
      sw: 'Mali Zinazolazimu Zaka na Viwango Vyake',
      ar: 'الأموال التي تجب فيها الزكاة ومقاديرها',
      en: 'Wealth Subject to Zakat and Its Rates',
    },
    slug: 'mali-zinazolazimu-zaka',
    subjectId: 'fiqhi',
    levelId: 'awali',
    courseId: 'fiqhi-zaka',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Aina za Mali Zinazolazimu Zaka' },
        { kind: 'p', text: 'Wanavyuoni wamebainisha aina kuu nne za mali ambazo Zaka hulazimika juu yake. Kila aina ina nisab (kiwango cha chini), haul (muda), na kiasi maalumu cha Zaka.' },
        { kind: 'h3', text: '1. Dhahabu na Fedha (na Pesa za Kawaida)' },
        { kind: 'p', text: 'Nisab ya dhahabu ni gramu 87.48 (au dinar 20 kwa kipimo cha kale). Nisab ya fedha ni gramu 612.36 (au dirham 200). Pesa za karatasi za leo zinapimwa kwa kulinganisha na thamani ya dhahabu (au mara nyingi fedha, kwani thamani yake ni ya chini zaidi). Kiasi cha Zaka ni 2.5% (rubu ya kumi).' },
        { kind: 'p', text: 'Mfano wa kihesabu: Mtu mwenye akiba ya pesa zinazofikia thamani ya gramu 612 za fedha au zaidi, na zikiwa zimekaa kwa mwaka mmoja wa Hijra, atatoa 2.5% ya jumla yake. Mtu mwenye TZS 5,000,000 atatoa TZS 125,000 kama Zaka kila mwaka.' },
        { kind: 'h3', text: '2. Mali ya Biashara' },
        { kind: 'p', text: 'Bidhaa zilizonunuliwa kwa nia ya kuziuza zinaitwa mali ya biashara. Zinatozwa Zaka kwa thamani yake ya soko mwisho wa mwaka, kwa kiasi cha 2.5%. Hii inajumuisha bidhaa za maduka, mali isiyohamishika iliyonunuliwa kwa biashara, na hisa za makampuni zilizonunuliwa kwa kuuza.' },
        { kind: 'p', text: 'Mali isiyohamishika iliyokusudiwa kuwa makazi binafsi au matumizi ya familia haitozwi Zaka. Kile kinachotozwa ni mali iliyokusudiwa kibiashara.' },
        { kind: 'h3', text: '3. Mifugo' },
        { kind: 'p', text: 'Wanyama waliopangwa katika kategoria hii ni ngamia, ng\'ombe (pamoja na nyati), na kondoo na mbuzi. Masharti yake ni:' },
        { kind: 'ul', items: [
          'Wamekamilisha mwaka mzima wa kuwa milki ya mtu',
          'Wanachunga maeneo ya kawaida — yaani wanakula nyasi za bure, si kama wamefugwa nyumbani kwa chakula maalum',
          'Wamefikia nisab'
        ] },
        { kind: 'p', text: 'Nisab na kiasi:' },
        { kind: 'ul', items: [
          'Ngamia: nisab ni 5; kati ya 5–9 unalipa kondoo mmoja, na kuongezeka',
          'Ng\'ombe: nisab ni 30; kati ya 30–39 unalipa kifaranga (tabi\') wa mwaka mmoja, na kuongezeka',
          'Kondoo na mbuzi: nisab ni 40; kati ya 40–120 unalipa mmoja, na kuongezeka'
        ] },
        { kind: 'h3', text: '4. Mazao ya Kilimo na Matunda' },
        { kind: 'p', text: 'Zaka ya mazao hutolewa wakati wa mavuno, si baada ya mwaka. Allah anasema: "Na lipa haki yake siku ya kuvuna" (Al-An\'am 6:141). Nisab ya mazao ni wasaq tano, ambazo zinakaribia kilo 612.36 za nafaka kavu (kama mchele, mahindi, ngano).' },
        { kind: 'p', text: 'Kiasi cha Zaka:' },
        { kind: 'ul', items: [
          'Kama shamba limepatakana maji ya bure — mvua au mito — Zaka ni 10% (ushur)',
          'Kama limetumikishwa kwa juhudi ya mwanadamu (kumwagilia kwa pampu, kununua maji) — Zaka ni 5%',
          'Kama nusu ni ya bure na nusu kwa juhudi — Zaka ni 7.5%'
        ] },
        { kind: 'h3', text: 'Zakat al-Fitr' },
        { kind: 'p', text: 'Pamoja na Zaka ya mali, kuna Zakat al-Fitr ambayo inalazimika kwa kila Mwislamu mwishoni mwa Ramadhani. Inalipwa kabla ya swala ya Idd al-Fitr. Kiasi chake ni sa\' moja (takribani kilo 2.5–3) ya chakula cha kawaida cha eneo — mchele, ngano, nafaka, au mfano. Hii inalipwa kwa niaba ya kila mtu wa nyumbani — mwanaume, mwanamke, watoto, na watumwa kwa zamani.' },
        { kind: 'h3', text: 'Hesabu ya Zaka — Maelekezo ya Vitendo' },
        { kind: 'ol', items: [
          'Andika tarehe maalumu kila mwaka kuhesabu Zaka — mara nyingi tarehe ya Hijra ya kuanza kuwa tajiri',
          'Hesabu pesa ulizonazo (akiba, hesabu za benki, fedha za nyumbani)',
          'Ongeza thamani ya bidhaa za biashara, hisa za biashara',
          'Ondoa madeni unayodaiwa kulipa karibuni',
          'Linganisha na nisab — kama umefikia, lipa 2.5% ya jumla',
          'Tafuta wapokeaji halali kati ya makundi nane'
        ] },
      ],
      [
        { kind: 'h2', text: 'الأموال الزكوية' },
        { kind: 'p', text: 'بيّن الفقهاء أربعة أنواع رئيسية تجب فيها الزكاة، ولكلٍّ نصاب وحول وقدر معيّن.' },
        { kind: 'h3', text: '١. الذهب والفضة والنقود' },
        { kind: 'p', text: 'نصاب الذهب ٨٧.٤٨ غراماً (٢٠ ديناراً)، ونصاب الفضة ٦١٢.٣٦ غراماً (٢٠٠ درهم). والنقود الورقية تُقاس بالذهب أو الفضة (والأحوط للفقراء قياسها بالفضة لانخفاض ثمنها). والمقدار: ٢.٥٪ (ربع العشر).' },
        { kind: 'p', text: 'مثال: من يملك مالاً يساوي ٦١٢ غراماً من الفضة فأكثر مرّ عليه حول هجري يخرج ٢.٥٪. فإن كانت لديه ٥ ملايين شلن تنزاني فعليه ١٢٥ ألفاً سنوياً.' },
        { kind: 'h3', text: '٢. عروض التجارة' },
        { kind: 'p', text: 'البضائع التي اشتُريت بنية البيع تُسمى عروض التجارة. تُقوَّم بسعر السوق آخر الحول وتُخرج زكاتها ٢.٥٪. ويشمل ذلك بضائع المحال والعقارات المعدّة للبيع وأسهم الشركات المعدّة للتداول. أما العقارات للسكن أو الاستعمال الشخصي فلا زكاة فيها.' },
        { kind: 'h3', text: '٣. بهيمة الأنعام' },
        { kind: 'p', text: 'هي الإبل والبقر (ومنها الجاموس) والغنم. شروطها:' },
        { kind: 'ul', items: [
          'مرور الحول',
          'كونها سائمة — ترعى المباح أكثر السنة',
          'بلوغ النصاب'
        ] },
        { kind: 'p', text: 'أنصبتها:' },
        { kind: 'ul', items: [
          'الإبل: نصابها ٥، فيها شاة',
          'البقر: نصابها ٣٠، فيها تبيع',
          'الغنم: نصابها ٤٠، فيها شاة'
        ] },
        { kind: 'h3', text: '٤. الزروع والثمار' },
        { kind: 'p', text: 'تُخرج زكاة الزرع وقت الحصاد. قال تعالى: "وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ" (الأنعام ٦:١٤١). نصابها خمسة أوسق ≈ ٦١٢ كيلوغراماً من الحب الجاف.' },
        { kind: 'ul', items: [
          'إن سُقي بماء مجاني (مطر، نهر) — الزكاة ١٠٪',
          'إن سُقي بمؤونة — الزكاة ٥٪',
          'بالنصف والنصف — ٧.٥٪'
        ] },
        { kind: 'h3', text: 'زكاة الفطر' },
        { kind: 'p', text: 'إلى جانب زكاة المال هناك زكاة الفطر، وتجب على كل مسلم في آخر رمضان وتُدفع قبل صلاة العيد. مقدارها صاع (نحو ٢.٥–٣ كغ) من غالب قوت أهل البلد. تُدفع عن كل فرد في البيت.' },
        { kind: 'h3', text: 'حساب الزكاة عملياً' },
        { kind: 'ol', items: [
          'حدّد تاريخاً ثابتاً سنوياً — غالباً تاريخ بلوغ النصاب أول مرة',
          'احسب جميع نقودك',
          'أضف قيمة عروض التجارة',
          'اخصم الديون المستحقة قريباً',
          'قارن بالنصاب — إن بلغ أخرج ٢.٥٪',
          'أوصل الزكاة لأحد الأصناف الثمانية'
        ] },
      ],
      [
        { kind: 'h2', text: 'Categories of Wealth Subject to Zakat' },
        { kind: 'p', text: 'Scholars have identified four main categories of wealth on which Zakat is due. Each has its own nisab (minimum threshold), haul (holding period), and specific rate.' },
        { kind: 'h3', text: '1. Gold, Silver, and Currency' },
        { kind: 'p', text: 'The nisab for gold is 87.48 grams (or 20 dinars by the classical measure). The nisab for silver is 612.36 grams (or 200 dirhams). Modern paper currencies are measured against the value of gold (or often silver, since its threshold is lower and more favourable to recipients). The rate is 2.5% (one-fortieth).' },
        { kind: 'p', text: 'Calculation example: A person whose savings reach the value of 612 grams of silver, held for one full lunar year, pays 2.5% of the total. Someone with TZS 5,000,000 pays TZS 125,000 as Zakat each year.' },
        { kind: 'h3', text: '2. Trade Goods' },
        { kind: 'p', text: 'Goods purchased with the intention of resale are called trade goods. They are evaluated at market value at the end of the year and Zakat is paid at 2.5%. This includes shop inventory, real estate purchased for sale, and shares of companies bought for trading. Real estate intended for personal residence or family use is not subject to Zakat — only that intended for commercial purposes.' },
        { kind: 'h3', text: '3. Livestock' },
        { kind: 'p', text: "The animals included are camels, cattle (including buffalo), and sheep and goats. The conditions:" },
        { kind: 'ul', items: [
          'A complete lunar year of ownership',
          'They are free-grazing — eating natural pasture for most of the year, not farm-fed',
          'They reach the nisab'
        ] },
        { kind: 'p', text: 'Thresholds and amounts:' },
        { kind: 'ul', items: [
          'Camels: nisab is 5; for 5–9 you pay one sheep, scaling up',
          "Cattle: nisab is 30; for 30–39 you pay a one-year-old calf (tabi'), scaling up",
          'Sheep and goats: nisab is 40; for 40–120 you pay one, scaling up'
        ] },
        { kind: 'h3', text: '4. Crops and Fruits' },
        { kind: 'p', text: 'Zakat on crops is paid at harvest, not after a year. Allah says: "And give its due on the day of its harvest" (Al-An\'am 6:141). The nisab is five wasaq, approximately 612 kg of dry grain (such as rice, maize, or wheat).' },
        { kind: 'p', text: 'The rate:' },
        { kind: 'ul', items: [
          'If the field is watered freely — by rain or rivers — the rate is 10%',
          'If watered by human effort (pumps, purchased water) — the rate is 5%',
          'If half free and half by effort — the rate is 7.5%'
        ] },
        { kind: 'h3', text: 'Zakat al-Fitr' },
        { kind: 'p', text: "Beyond the Zakat of wealth, there is Zakat al-Fitr, obligatory on every Muslim at the end of Ramadan, paid before the Eid al-Fitr prayer. The amount is one sa' (approximately 2.5–3 kg) of the staple food of the region — rice, wheat, grain, or similar. It is paid on behalf of every member of the household." },
        { kind: 'h3', text: 'Practical Calculation' },
        { kind: 'ol', items: [
          'Set a fixed date each year for calculating Zakat — often the lunar date when one first reached the nisab',
          'Calculate all cash holdings (savings, bank accounts, household money)',
          'Add the value of trade goods and tradeable shares',
          'Subtract immediate debts you owe',
          'Compare against the nisab — if reached, pay 2.5% of the total',
          'Find legitimate recipients among the eight categories'
        ] },
      ],
    ),
    duration: '24:00',
    status: 'published',
    tags: ['fiqh', 'zaka', 'wealth'],
    createdAt: '2026-03-14',
    updatedAt: '2026-03-14',
  },

  // ============================================
  // TAWHIDI — Misingi
  // ============================================
  {
    id: 'l-tawhidi-misingi-maana',
    title: {
      sw: 'Maana ya Tawhidi na Nafasi Yake katika Dini',
      ar: 'معنى التوحيد ومنزلته في الدين',
      en: 'The Meaning of Tawhid and Its Place in the Religion',
    },
    slug: 'maana-ya-tawhidi',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-misingi',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Tawhidi' },
        { kind: 'p', text: 'Neno "Tawhidi" linatokana na neno la Kiarabu "wahhada" linalomaanisha kufanya kitu kuwa kimoja. Katika sheria, Tawhidi ni kumpwekesha Allah katika yale yote yanayohusu uola wake, ibada zake, na sifa zake. Ni kumkubali kuwa hakuna mola apasaye kuabudiwa ila yeye, hakuna mwenye kuumba ila yeye, na hakuna mfano wake katika sifa zake za ukamilifu.' },
        { kind: 'p', text: 'Tawhidi ni msingi wa Uislamu na kiini cha Shahada — "La ilaha illa Allah." Bila Tawhidi sahihi, hakuna ibada inayokubaliwa, kwani Allah amesema:' },
        { kind: 'quote', text: 'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ', cite: 'Al-Bayyinah 98:5' },
        { kind: 'p', text: 'Maana yake: "Hawakuamriwa ila wamuabudu Allah pekee, wakimsafishia dini yake."' },
        { kind: 'h3', text: 'Tawhidi — Ujumbe wa Kila Mtume' },
        { kind: 'p', text: 'Mitume wote — kuanzia Adam hadi Muhammad ﷺ — walitumwa na ujumbe huu mmoja. Allah amesema:' },
        { kind: 'quote', text: 'وَلَقَدْ بَعَثْنَا فِي كُلِّ أُمَّةٍ رَسُولًا أَنِ اعْبُدُوا اللَّهَ وَاجْتَنِبُوا الطَّاغُوتَ', cite: 'An-Nahl 16:36' },
        { kind: 'p', text: '"Na hakika tumetuma katika kila umma mtume akisema: muabuduni Allah na jiepusheni na taghut." Kila mtume — Nuh, Ibrahim, Musa, Isa, Muhammad ﷺ — alianza na ujumbe huu huu wa Tawhidi. Tofauti za sheria za matendo (kufunga, kuswali, hukumu za kijamii) zilibadilika kati ya mataifa, lakini msingi wa imani — Tawhidi — ulibakia mmoja.' },
        { kind: 'h3', text: 'Umuhimu wa Tawhidi' },
        { kind: 'p', text: 'Umuhimu wa Tawhidi unaonekana katika mambo kadhaa:' },
        { kind: 'ol', items: [
          'Ni sharti la kwanza la kuingia katika Uislamu — Shahada huitamka kabla ya kitu kingine chochote',
          'Ni jambo la kwanza alililoanza kueneza Mtume ﷺ Makkah kwa miaka kumi na tatu kabla ya kufanya nguzo nyingine',
          'Ni sharti la matendo kukubaliwa — bila Tawhidi, swala, saumu, na hata kuhiji haviifaidishi mtu',
          'Ni sababu ya kuingia peponi na kuokolewa motoni — Mtume ﷺ alisema: "Atakayekufa akijua kuwa hakuna mola ila Allah, ataingia peponi" (Muslim)',
          'Ni nguvu ya nafsi — mwenye Tawhidi sahihi hahofii ila Allah, hatarajii ila kutoka kwake'
        ] },
        { kind: 'h3', text: 'Hadith ya Mu\'adh' },
        { kind: 'p', text: 'Mtume ﷺ alipomtuma Mu\'adh ibn Jabal kwenda Yemen, alimwambia: "Utakuta watu wa kitabu. Jambo la kwanza la kuwaita ni kushuhudia kuwa hakuna mola ila Allah na Muhammad ni Mtume wa Allah. Wakikukubali katika hilo, basi waambie Allah amewafanya faradhi swala tano kila siku" (Bukhari na Muslim).' },
        { kind: 'p', text: 'Hadith hii inafundisha mfumo wa kufundisha dini: anza na Tawhidi, kisha matendo. Ujumbe wa Tawhidi haupasi kuchanganywa na mambo ya pembeni — ndiyo tunda lenyewe.' },
      ],
      [
        { kind: 'h2', text: 'تعريف التوحيد' },
        { kind: 'p', text: 'كلمة "التوحيد" مشتقة من "وحّد" بمعنى جعله واحداً. وفي الشرع: التوحيد إفراد الله بما يستحقه من الربوبية والألوهية والأسماء والصفات. هو الإقرار بأنه لا معبود بحق إلا هو، ولا خالق سواه، ولا مثيل له في كماله.' },
        { kind: 'p', text: 'التوحيد أساس الإسلام ولبّ الشهادة "لا إله إلا الله". وبدون توحيد صحيح لا تُقبل عبادة، قال تعالى:' },
        { kind: 'quote', text: 'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ', cite: 'البينة ٩٨:٥' },
        { kind: 'h3', text: 'التوحيد — رسالة كل نبي' },
        { kind: 'p', text: 'كل الأنبياء — من آدم إلى محمد ﷺ — أُرسلوا بهذه الرسالة الواحدة. قال تعالى:' },
        { kind: 'quote', text: 'وَلَقَدْ بَعَثْنَا فِي كُلِّ أُمَّةٍ رَسُولًا أَنِ اعْبُدُوا اللَّهَ وَاجْتَنِبُوا الطَّاغُوتَ', cite: 'النحل ١٦:٣٦' },
        { kind: 'p', text: 'كل نبي — نوح، إبراهيم، موسى، عيسى، محمد ﷺ — بدأ بهذه الرسالة. واختلفت تشريعات الأعمال (الصيام، الصلاة، الأحكام الاجتماعية) بين الأمم، لكن أصل الإيمان — التوحيد — بقي واحداً.' },
        { kind: 'h3', text: 'أهمية التوحيد' },
        { kind: 'ol', items: [
          'الشرط الأول للدخول في الإسلام',
          'أول ما دعا إليه النبي ﷺ في مكة ثلاث عشرة سنة',
          'شرط قبول العمل',
          'سبب دخول الجنة والنجاة من النار — قال ﷺ: "من مات يعلم أنه لا إله إلا الله دخل الجنة" (مسلم)',
          'قوة للنفس — صاحب التوحيد لا يخاف إلا الله ولا يرجو إلا منه'
        ] },
        { kind: 'h3', text: 'حديث معاذ' },
        { kind: 'p', text: 'لما بعث النبي ﷺ معاذاً إلى اليمن قال: "إنك تأتي قوماً من أهل الكتاب، فليكن أول ما تدعوهم إليه شهادة أن لا إله إلا الله وأن محمداً رسول الله. فإن هم أطاعوك لذلك فأخبرهم أن الله افترض عليهم خمس صلوات في كل يوم وليلة" (متفق عليه).' },
        { kind: 'p', text: 'يُعلّم الحديث منهج الدعوة: التوحيد ثم الأعمال. ولا يُخلط التوحيد بفروع — هو الأصل.' },
      ],
      [
        { kind: 'h2', text: 'The Meaning of Tawhid' },
        { kind: 'p', text: "The word 'Tawhid' derives from the Arabic verb 'wahhada,' meaning to make something one. In Islamic law, Tawhid is the affirmation of Allah's oneness in all that pertains to Him — His Lordship, His worship, and His attributes. It is the recognition that there is no deity worthy of worship except Him, no creator besides Him, and nothing comparable to Him in His perfect attributes." },
        { kind: 'p', text: 'Tawhid is the foundation of Islam and the very heart of the Shahada — "La ilaha illa Allah." Without sound Tawhid, no act of worship is accepted, for Allah says:' },
        { kind: 'quote', text: '"They were not commanded except to worship Allah, devoting religion sincerely to Him."', cite: 'Al-Bayyinah 98:5' },
        { kind: 'h3', text: 'Tawhid — The Message of Every Prophet' },
        { kind: 'p', text: 'Every prophet — from Adam to Muhammad ﷺ — was sent with this single message. Allah says:' },
        { kind: 'quote', text: '"And We certainly sent into every nation a messenger, [saying]: Worship Allah and avoid taghut."', cite: 'An-Nahl 16:36' },
        { kind: 'p', text: 'Each prophet — Nuh, Ibrahim, Musa, Isa, Muhammad ﷺ — began with this same message of Tawhid. The legal regulations of conduct (fasting, prayer, social rulings) varied between nations, but the foundation of belief — Tawhid — remained one.' },
        { kind: 'h3', text: 'The Importance of Tawhid' },
        { kind: 'p', text: 'The importance of Tawhid is evident in many ways:' },
        { kind: 'ol', items: [
          'It is the first requirement of entry into Islam — the Shahada is uttered before anything else',
          'It was the first matter the Prophet ﷺ called people to in Makkah, for thirteen years before establishing other pillars',
          'It is the precondition for the acceptance of any act — without Tawhid, prayer, fasting, even Hajj benefit a person nothing',
          'It is the cause of entering Paradise and being saved from Hellfire — the Prophet ﷺ said: "Whoever dies knowing that there is no deity but Allah will enter Paradise" (Muslim)',
          'It is a strength for the soul — one with sound Tawhid fears none but Allah and hopes from none but Him'
        ] },
        { kind: 'h3', text: "The Hadith of Mu'adh" },
        { kind: 'p', text: "When the Prophet ﷺ sent Mu'adh ibn Jabal to Yemen, he said to him: 'You are going to a people of the Book. Let the first thing you call them to be the testimony that there is no deity except Allah and that Muhammad is the Messenger of Allah. If they accept this from you, then inform them that Allah has obligated five prayers upon them every day and night' (Bukhari and Muslim)." },
        { kind: 'p', text: 'This hadith teaches the methodology of teaching the religion: Tawhid first, then practice. The message of Tawhid is not to be diluted with peripheral matters — it is the very essence.' },
      ],
    ),
    duration: '20:00',
    status: 'published',
    tags: ['tawhid', 'aqeedah', 'foundations'],
    createdAt: '2026-03-17',
    updatedAt: '2026-03-17',
  },

  // ============================================
  // TAWHIDI — Aina
  // ============================================
  {
    id: 'l-tawhidi-aina-rububiyyah',
    title: {
      sw: 'Tawhid ar-Rububiyyah — Kumpwekesha Allah katika Uola',
      ar: 'توحيد الربوبية',
      en: 'Tawhid of Lordship (ar-Rububiyyah)',
    },
    slug: 'tawhid-rububiyyah',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-aina',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Tawhid ar-Rububiyyah' },
        { kind: 'p', text: 'Tawhid ar-Rububiyyah ni kumkubali Allah kuwa ni mola pekee anayeumba, kumiliki, na kuendesha mambo yote katika ulimwengu. Hakuna mwingine anayeshiriki naye katika mambo haya — hakuna mwenye kuumba ila yeye, hakuna mwenye kutoa rizki ila yeye, na hakuna mwenye kuendesha falaki ila yeye.' },
        { kind: 'quote', text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', cite: 'Al-Fatihah 1:2' },
        { kind: 'p', text: 'Aya hii ya Al-Fatihah inaanza kwa kumsifu Allah kwa Tawhid ar-Rububiyyah — yeye ni Mola wa walimwengu wote, ndiye anayeendesha kila kitu.' },
        { kind: 'h3', text: 'Mambo Yanayoingia katika Tawhid ar-Rububiyyah' },
        { kind: 'ol', items: [
          'Khalq — kuumba: Allah pekee ndiye anayeumba viumbe vyote bila msaada',
          'Mulk — kumiliki: Allah anamiliki ulimwengu wote, viumbe vyake vyote ni vyake',
          'Tadbir — kuendesha mambo: Allah anaendesha kila tukio, hakuna kinachotokea bila idhini yake',
          'Rizq — kutoa rizki: Allah pekee ndiye anayetoa chakula, kinywaji, na nyenzo za maisha kwa viumbe vyake',
          'Ihya wa Imata — kuhuisha na kutoa kifo: Allah anatoa uhai na kifo kwa kila kiumbe',
          'Naf wa Dharr — kunufaisha na kudhuru: Allah pekee ndiye mwenye uwezo wa kweli wa kunufaisha au kudhuru'
        ] },
        { kind: 'h3', text: 'Asili ya Imani Hii' },
        { kind: 'p', text: 'Tawhid ar-Rububiyyah ni jambo lililowekwa katika fitra ya kila mwanadamu. Hata washirikina wa Makkah — wale waliokuwa wakiabudu masanamu — walikuwa wanakiri kuwa Allah ndiye Mola anayeumba na kutoa rizki. Allah anasema:' },
        { kind: 'quote', text: 'وَلَئِنْ سَأَلْتَهُمْ مَنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ لَيَقُولُنَّ اللَّهُ', cite: 'Luqman 31:25' },
        { kind: 'p', text: '"Na ukiwauliza, Ni nani aliyeumba mbingu na ardhi? Bila shaka watasema: Allah." Aya hii inaonyesha kwamba hata mushrikuun walikiri Tawhid ar-Rububiyyah. Kosa lao halikuwa katika hili, bali katika Tawhid al-Uluhiyyah — kwamba hata wakimkubali Allah kuwa Mola, walimuabudu pamoja na masanamu.' },
        { kind: 'h3', text: 'Hekima ya Tawhid ar-Rububiyyah' },
        { kind: 'p', text: 'Kuamini kwamba Allah pekee ndiye anayeendesha mambo kuna athari kubwa katika maisha ya Mwislamu:' },
        { kind: 'ul', items: [
          'Tawakkul — kumtegemea Allah katika mambo yote',
          'Subira — kuvumilia mitihani kwa kujua kwamba zinaitokana na Allah',
          'Shukrani — kushukuru kwa kila neema, kwa kuelewa kwamba imekuja kutoka kwake',
          'Kuondoka kwa hofu ya viumbe — kwani hawana uwezo isipokuwa kile alichoidhinisha Allah',
          'Tafakuri — kuangalia ulimwengu na kumwona Allah kupitia ishara zake'
        ] },
        { kind: 'h3', text: 'Kwa Nini Tawhid ar-Rububiyyah Hautoshi Pekee?' },
        { kind: 'p', text: 'Mtu anaweza kuamini kwamba Allah ndiye Mola pekee — kweli — lakini bado akamwabudu mwingine. Hii ndiyo ilikuwa shida ya washirikina wa Makkah: walikuwa wanakubali Allah ni Mola lakini walikuwa wakiitumia masanamu kama "wapatanishi." Ndiyo maana Tawhid ar-Rububiyyah pekee haitoshi — lazima iambatane na Tawhid al-Uluhiyyah, kwamba sio tu unakubali Allah kama Mola, bali pia unaabudu yeye pekee.' },
      ],
      [
        { kind: 'h2', text: 'تعريف توحيد الربوبية' },
        { kind: 'p', text: 'توحيد الربوبية إفراد الله بأفعاله — كالخلق والملك والتدبير. فهو وحده الخالق والمالك والمدبّر، لا شريك له في ذلك.' },
        { kind: 'quote', text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', cite: 'الفاتحة ١:٢' },
        { kind: 'h3', text: 'ما يدخل في توحيد الربوبية' },
        { kind: 'ol', items: [
          'الخلق',
          'الملك',
          'التدبير',
          'الرزق',
          'الإحياء والإماتة',
          'النفع والضر'
        ] },
        { kind: 'h3', text: 'فطرية هذا الإيمان' },
        { kind: 'p', text: 'توحيد الربوبية مغروس في فطرة كل إنسان. حتى مشركو مكة — عبدة الأصنام — كانوا يقرّون بأن الله هو الخالق الرازق. قال تعالى:' },
        { kind: 'quote', text: 'وَلَئِنْ سَأَلْتَهُمْ مَنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ لَيَقُولُنَّ اللَّهُ', cite: 'لقمان ٣١:٢٥' },
        { kind: 'p', text: 'فلم يكن خطأ المشركين في توحيد الربوبية، بل في توحيد الألوهية — فقد أقرّوا أن الله ربّ، لكنهم عبدوا غيره.' },
        { kind: 'h3', text: 'ثمرات توحيد الربوبية' },
        { kind: 'ul', items: [
          'التوكل على الله',
          'الصبر على البلاء',
          'الشكر على النعم',
          'التحرّر من خوف المخلوقين',
          'التفكر في آيات الكون'
        ] },
        { kind: 'h3', text: 'لماذا لا يكفي توحيد الربوبية وحده؟' },
        { kind: 'p', text: 'قد يقرّ المرء بأن الله ربّ — حقيقة — ثم يعبد غيره. وهذه كانت مشكلة مشركي مكة: أقرّوا بالربوبية واتخذوا الأصنام شفعاء. فلا يكفي توحيد الربوبية وحده — بل لا بد من توحيد الألوهية معه.' },
      ],
      [
        { kind: 'h2', text: 'The Meaning of Tawhid ar-Rububiyyah' },
        { kind: 'p', text: "Tawhid ar-Rububiyyah is the affirmation that Allah alone is the Lord who creates, owns, and governs all things in the universe. None shares with Him in any of this — there is none who creates besides Him, none who provides besides Him, and none who directs the cosmos besides Him." },
        { kind: 'quote', text: '"All praise is for Allah, Lord of the worlds."', cite: 'Al-Fatihah 1:2' },
        { kind: 'p', text: 'This opening verse of Al-Fatihah begins by praising Allah for Tawhid ar-Rububiyyah — He is the Lord of all worlds, the One who governs everything.' },
        { kind: 'h3', text: 'What Falls Under Tawhid ar-Rububiyyah' },
        { kind: 'ol', items: [
          'Khalq — Creation: Allah alone creates all beings without assistance',
          'Mulk — Ownership: Allah owns the entire universe; all creatures belong to Him',
          'Tadbir — Governance: Allah directs every event; nothing happens without His permission',
          'Rizq — Provision: Allah alone provides food, drink, and the means of life',
          'Ihya wa Imata — Giving life and death: Allah gives life and takes it from every creature',
          "Naf' wa Darr — Benefit and harm: Allah alone has true power to benefit or harm"
        ] },
        { kind: 'h3', text: 'The Innate Nature of This Belief' },
        { kind: 'p', text: "Tawhid ar-Rububiyyah is something placed within the innate disposition (fitrah) of every human being. Even the polytheists of Makkah — those who worshipped idols — acknowledged that Allah was the Lord who created and provided. Allah says:" },
        { kind: 'quote', text: '"And if you ask them, Who created the heavens and the earth?, they will surely say: Allah."', cite: 'Luqman 31:25' },
        { kind: 'p', text: "This verse shows that even the mushrikun acknowledged Tawhid ar-Rububiyyah. Their error was not here, but in Tawhid al-Uluhiyyah — though they accepted Allah as Lord, they worshipped idols alongside Him." },
        { kind: 'h3', text: 'The Fruits of Tawhid ar-Rububiyyah' },
        { kind: 'p', text: "Believing that Allah alone governs all affairs has profound effects on a Muslim's life:" },
        { kind: 'ul', items: [
          'Tawakkul — relying on Allah in all matters',
          'Patience — enduring trials knowing they come from Allah',
          'Gratitude — thanking Him for every blessing, knowing it came from Him',
          'Freedom from fear of creatures — for they have no power except what Allah permits',
          'Reflection — observing the universe and seeing Allah through His signs'
        ] },
        { kind: 'h3', text: 'Why Tawhid ar-Rububiyyah Alone is Insufficient' },
        { kind: 'p', text: 'A person may believe Allah alone is Lord — truly — yet still worship others. This was precisely the problem of the polytheists of Makkah: they accepted Allah as Lord but used idols as so-called "intercessors." This is why Tawhid ar-Rububiyyah alone does not suffice — it must be coupled with Tawhid al-Uluhiyyah, that one not only acknowledges Allah as Lord but also worships Him alone.' },
      ],
    ),
    duration: '20:00',
    status: 'published',
    tags: ['tawhid', 'rububiyyah', 'aqeedah'],
    createdAt: '2026-03-20',
    updatedAt: '2026-03-20',
  },

  {
    id: 'l-tawhidi-aina-uluhiyyah',
    title: {
      sw: 'Tawhid al-Uluhiyyah — Kumuabudu Allah Pekee',
      ar: 'توحيد الألوهية',
      en: 'Tawhid of Worship (al-Uluhiyyah)',
    },
    slug: 'tawhid-uluhiyyah',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-aina',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Tawhid al-Uluhiyyah' },
        { kind: 'p', text: 'Tawhid al-Uluhiyyah ni kumuabudu Allah pekee bila kumshirikisha na chochote au mtu yeyote. Inaitwa pia "Tawhid al-Ibadah" (Tawhidi wa Ibada). Hii ni aina ya Tawhidi ambayo iliwafanya washirikina wa Makkah kupingana na Mtume ﷺ — walikuwa wakikubali kwamba Allah ni Mola lakini walikuwa wakimuabudu pamoja na masanamu.' },
        { kind: 'p', text: 'Maana ya neno "ilah" katika Shahada "La ilaha illa Allah" si "mola anayeumba" — hilo ni neno "rabb." Ilah ni kile kinachoabudiwa, kinachopokea sala na hofu na matumaini ya kiroho. Ndiyo maana neno la kwanza ni la kukana — "hakuna kinachostahili kuabudiwa" — na la pili ni la kuthibitisha — "ila Allah pekee."' },
        { kind: 'quote', text: 'وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ لَا إِلَٰهَ إِلَّا هُوَ الرَّحْمَٰنُ الرَّحِيمُ', cite: 'Al-Baqarah 2:163' },
        { kind: 'h3', text: 'Aina za Ibada Zinazomstahiki Allah Pekee' },
        { kind: 'p', text: 'Ibada inajumuisha kila kitu Allah anachoipenda na kuipenda — sio swala tu, bali pia hofu, mapenzi, matumaini, dua, kuapa, kuchinja, na zaidi. Yote yanapaswa kuwa kwa Allah pekee:' },
        { kind: 'ol', items: [
          'Du\'a — kuomba msaada — kwa Allah pekee. Ni shirk kumuomba msaada mtu aliyekufa au mtumishi mwingine wa Allah katika mambo asiyoweza',
          'Hofu (Khawf) — hofu ya kiroho ya mwisho ni kwa Allah pekee, ingawa hofu ya kawaida ya watu inakubaliwa',
          'Mapenzi (Mahabbah) — mapenzi ya kiroho ya juu ni kwa Allah pekee, lakini mapenzi ya kawaida ya watu yanakubaliwa',
          'Matumaini (Raja\') — matumaini ya rehema na pepo ni kwa Allah pekee',
          'Tawakkul — kumtegemea Allah pekee katika mambo ya msingi',
          'Kuapa — kuapa kwa jina la Allah pekee, si kwa wengine',
          'Kuchinja na nadhri — kuchinja na kutoa nadhri ni ibada za Allah pekee'
        ] },
        { kind: 'h3', text: 'Mambo Yanayopinga Tawhid al-Uluhiyyah' },
        { kind: 'p', text: 'Mambo yafuatayo yanapingana na Tawhid al-Uluhiyyah na yanaweza kuingia katika shirk:' },
        { kind: 'ul', items: [
          'Kuomba msaada wa kiroho kutoka kwa marehemu — kwa kuamini kwamba wanaweza kusaidia',
          'Kuabudu makaburi — kufanya tawaaf, kuomba dua, au kutoa sadaka karibu na kaburi',
          'Sihiri — kutumia uchawi au taruwiza za kishirikina',
          'Kupiga ramli au kutafuta utabiri kutoka kwa wapiga ramli',
          'Kuamini kwamba kuna mtu — hata Mtume ﷺ — ambaye anaweza kusamehe dhambi au kutoa pepo',
          'Kuvaa hirizi za kishirikina kwa kuamini zinakinga',
          'Kuapa kwa jina la mtu mwingine kwa kuhusu mambo ya kidini'
        ] },
        { kind: 'h3', text: 'Tawhid al-Uluhiyyah ni Kiini cha Da\'wah ya Mitume' },
        { kind: 'p', text: 'Mitume wote hawakutumwa kwa kuwafundisha kuwa kuna Mola anayeumba — watu walijua hilo. Walitumwa kwa kuwafundisha kumwabudu Mola huyo pekee. Allah amesema kuhusu Nuh (AS):' },
        { kind: 'quote', text: 'يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُمْ مِنْ إِلَٰهٍ غَيْرُهُ', cite: 'Al-A\'raf 7:59' },
        { kind: 'p', text: '"Ee watu wangu, muabuduni Allah; hamna mola mwingine ila yeye." Maneno haya yamerudiwa karibu kwa kila mtume katika Qur\'an, ikionyesha kwamba Tawhid al-Uluhiyyah ni kiini cha ujumbe wao wote.' },
      ],
      [
        { kind: 'h2', text: 'تعريف توحيد الألوهية' },
        { kind: 'p', text: 'توحيد الألوهية إفراد الله بالعبادة وحده دون شريك. ويُسمى أيضاً توحيد العبادة. وهو النوع الذي خاصم النبي ﷺ مشركي مكة فيه — فقد كانوا يُقرّون بربوبية الله ولكن يعبدون معه الأصنام.' },
        { kind: 'p', text: 'معنى "إله" في الشهادة "لا إله إلا الله" ليس "الرب الخالق" — تلك كلمة "ربّ". الإله هو المعبود، الذي تتوجه إليه القلوب بالخوف والرجاء والدعاء. ولذلك بدأت الشهادة بالنفي ثم الإثبات.' },
        { kind: 'quote', text: 'وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ ۖ لَا إِلَٰهَ إِلَّا هُوَ الرَّحْمَٰنُ الرَّحِيمُ', cite: 'البقرة ٢:١٦٣' },
        { kind: 'h3', text: 'أنواع العبادة المفردة لله' },
        { kind: 'ol', items: [
          'الدعاء',
          'الخوف الديني',
          'المحبة الإلهية',
          'الرجاء',
          'التوكل',
          'الحلف بالله',
          'الذبح والنذر'
        ] },
        { kind: 'h3', text: 'ما ينافي توحيد الألوهية' },
        { kind: 'ul', items: [
          'دعاء الأموات',
          'عبادة القبور — الطواف بها أو الدعاء عندها',
          'السحر',
          'الكهانة والعرافة',
          'اعتقاد أن غير الله يغفر الذنوب أو يدخل الجنة',
          'لبس التمائم الشركية',
          'الحلف بغير الله في أمر ديني'
        ] },
        { kind: 'h3', text: 'لبّ دعوة الأنبياء' },
        { kind: 'p', text: 'لم يُرسل الأنبياء ليُعلّموا الناس أن لله ربّاً — قد علموا ذلك. وإنما أُرسلوا ليُعلّموهم عبادة هذا الرب وحده. قال تعالى عن نوح:' },
        { kind: 'quote', text: 'يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُمْ مِنْ إِلَٰهٍ غَيْرُهُ', cite: 'الأعراف ٧:٥٩' },
        { kind: 'p', text: 'وكُرّرت هذه العبارة عن كل نبي تقريباً، مما يدل على أن توحيد الألوهية لبّ دعوتهم.' },
      ],
      [
        { kind: 'h2', text: 'The Meaning of Tawhid al-Uluhiyyah' },
        { kind: 'p', text: 'Tawhid al-Uluhiyyah is the worship of Allah alone, without associating any partner with Him. It is also called Tawhid al-Ibadah (Tawhid of Worship). This is the dimension of Tawhid over which the polytheists of Makkah opposed the Prophet ﷺ — they accepted that Allah was Lord but worshipped idols alongside Him.' },
        { kind: 'p', text: 'The word "ilah" in the testimony "La ilaha illa Allah" does not mean "the Lord who creates" — that is the word "rabb." Ilah refers to the One who is worshipped, to whom hearts turn in fear, hope, and supplication. This is why the testimony begins with negation — "there is no deity worthy of worship" — and then affirmation — "except Allah alone."' },
        { kind: 'quote', text: '"And your god is one God; there is no deity except Him, the Most Merciful, the Most Compassionate."', cite: 'Al-Baqarah 2:163' },
        { kind: 'h3', text: 'Forms of Worship Belonging Only to Allah' },
        { kind: 'p', text: "Worship encompasses everything Allah loves and is pleased with — not only prayer, but also fear, love, hope, supplication, oaths, sacrifice, and more. All must be directed to Allah alone:" },
        { kind: 'ol', items: [
          "Du'a — calling for help — to Allah alone. It is shirk to call upon a deceased person or any other servant of Allah for things only Allah can grant",
          'Khawf — religious fear — directed to Allah alone, though ordinary fear of human dangers is permitted',
          'Mahabbah — supreme spiritual love — for Allah alone, while ordinary human love is permitted',
          "Raja' — hope of mercy and Paradise — from Allah alone",
          'Tawakkul — relying on Allah alone in essential matters',
          "Oaths — swearing only by Allah's name in religious matters",
          'Sacrifice and vows — these are acts of worship for Allah alone'
        ] },
        { kind: 'h3', text: 'What Contradicts Tawhid al-Uluhiyyah' },
        { kind: 'p', text: 'The following oppose Tawhid al-Uluhiyyah and may fall into shirk:' },
        { kind: 'ul', items: [
          'Calling upon the deceased for spiritual help — believing they can assist',
          'Veneration of graves — performing tawaf, supplication, or sacrifice at them',
          'Sihr — using sorcery or polytheistic talismans',
          'Divination — seeking knowledge of the unseen from soothsayers',
          'Believing that any human — even the Prophet ﷺ — can forgive sins or grant Paradise',
          'Wearing polytheistic amulets believing they grant protection',
          "Swearing by anyone's name other than Allah's in religious matters"
        ] },
        { kind: 'h3', text: 'The Core of the Prophets\' Mission' },
        { kind: 'p', text: 'The prophets were not sent to teach people that there is a Lord who creates — that they already knew. They were sent to teach them to worship that Lord alone. Allah says of Nuh (AS):' },
        { kind: 'quote', text: '"O my people, worship Allah; you have no other god but Him."', cite: "Al-A'raf 7:59" },
        { kind: 'p', text: "These exact words are repeated of nearly every prophet in the Qur'an, indicating that Tawhid al-Uluhiyyah was the very essence of their message." },
      ],
    ),
    duration: '22:00',
    status: 'published',
    tags: ['tawhid', 'uluhiyyah', 'aqeedah', 'shahada'],
    createdAt: '2026-03-23',
    updatedAt: '2026-03-23',
  },

  {
    id: 'l-tawhidi-aina-asma',
    title: {
      sw: 'Tawhid al-Asma wa as-Sifat — Majina na Sifa za Allah',
      ar: 'توحيد الأسماء والصفات',
      en: 'Tawhid of the Names and Attributes',
    },
    slug: 'tawhid-asma-wa-sifat',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-aina',
    order: 3,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Tawhid al-Asma wa as-Sifat' },
        { kind: 'p', text: 'Tawhid al-Asma wa as-Sifat ni kumkubali Allah katika majina na sifa zake kama alivyojielezea katika Qur\'an na kama Mtume ﷺ alivyomweleza katika Sunna. Inahusisha kuthibitisha yale aliyojithibitishia mwenyewe na kukana yale aliyojikana, bila kumlinganisha na viumbe.' },
        { kind: 'h3', text: 'Kanuni Mbili Kuu' },
        { kind: 'p', text: 'Mwislamu anapaswa kufuata kanuni mbili kuu kuhusu majina na sifa za Allah:' },
        { kind: 'ol', items: [
          'Kuthibitisha bila kufananisha (Ithbat bila Tashbih) — Allah ana mkono, lakini si kama mkono wa mwanadamu; ana sikio, lakini si kama sikio la mwanadamu',
          'Kukana bila kuchakaza (Tanzih bila Ta\'til) — Allah hana mfano, lakini hii haimaanishi hana sifa kabisa'
        ] },
        { kind: 'p', text: 'Aya ya msingi inayoelezea kanuni hii:' },
        { kind: 'quote', text: 'لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ', cite: 'Ash-Shura 42:11' },
        { kind: 'p', text: '"Hapana kitu kama mfano wake; naye ndiye Mwenye Kusikia, Mwenye Kuona." Aya hii inajumuisha kanuni zote mbili — kuthibitisha sifa (Mwenye Kusikia, Mwenye Kuona) na kukana ufanano (hakuna kitu kama yeye).' },
        { kind: 'h3', text: 'Asili ya Majina ya Allah' },
        { kind: 'p', text: 'Majina ya Allah yana sifa kuu zifuatazo:' },
        { kind: 'ul', items: [
          'Yote ni mazuri kabisa (al-Asma al-Husna) — yanajumuisha sifa za ukamilifu mtupu',
          'Yote ni ya kweli kihalisi — sio ya kuanza tu',
          'Yana maana zinazohusiana na sifa — kila jina linaonyesha sifa fulani',
          'Mtume ﷺ alisema: "Allah ana majina tisini na tisa, mia moja kasoro moja; mwenye kuhifadhi yote ataingia peponi" (Bukhari na Muslim)'
        ] },
        { kind: 'h3', text: 'Mifano ya Majina na Sifa' },
        { kind: 'ul', items: [
          'Ar-Rahman, Ar-Rahim — Mwenye Huruma, Mwenye Rehema',
          'Al-Malik — Mfalme wa Kweli',
          'Al-Quddus — Aliye Safi',
          'As-Sami\' — Mwenye Kusikia',
          'Al-Basir — Mwenye Kuona',
          'Al-\'Alim — Mwenye Kujua kila kitu',
          'Al-Hayy — Aliye Hai milele',
          'Al-Qayyum — Anayesimama mwenyewe na anayedumisha viumbe vyote',
          'Al-\'Aziz — Mwenye Nguvu',
          'Al-Hakim — Mwenye Hekima'
        ] },
        { kind: 'h3', text: 'Makosa Manne ya Kuepukana' },
        { kind: 'p', text: 'Wanavyuoni wa Ahl as-Sunnah wamebainisha makosa makubwa manne yanayofanywa na watu kuhusu majina na sifa za Allah:' },
        { kind: 'ol', items: [
          'Tashbih (Ufananisho) — kufananisha Allah na viumbe — kosa la washabihi',
          'Ta\'til (Kuchakaza) — kukana sifa za Allah kabisa au baadhi yake — kosa la mu\'tazila',
          'Tahrif (Kupotosha) — kubadilisha maana ya majina au sifa kutoka kwa maana yake ya asili — kosa la wachache',
          'Takyif (Kueleza jinsi) — kujaribu kueleza jinsi sifa zinavyokuwa kwa Allah — hili lipo nje ya akili ya mwanadamu'
        ] },
        { kind: 'p', text: 'Mwanafunzi wa Ahl as-Sunnah anakubali yale aliyoyasema Allah kuhusu nafsi yake na yale aliyoyasema Mtume ﷺ kuhusu yake, bila kuyaelezea jinsi yake, kwa sababu Allah ni juu ya akili na ujuzi wetu.' },
      ],
      [
        { kind: 'h2', text: 'تعريف توحيد الأسماء والصفات' },
        { kind: 'p', text: 'توحيد الأسماء والصفات إثبات ما أثبته الله لنفسه ونفي ما نفاه عن نفسه على ما يليق بجلاله، دون تحريف أو تعطيل أو تكييف أو تمثيل.' },
        { kind: 'h3', text: 'القاعدتان الكبريان' },
        { kind: 'ol', items: [
          'الإثبات بلا تشبيه — لله يد ليست كأيدي المخلوقين',
          'التنزيه بلا تعطيل — ليس كمثله شيء، ولا يلزم نفي صفاته'
        ] },
        { kind: 'quote', text: 'لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ', cite: 'الشورى ٤٢:١١' },
        { kind: 'p', text: 'تجمع الآية القاعدتين — إثبات السمع والبصر، ونفي المماثلة.' },
        { kind: 'h3', text: 'خصائص أسماء الله' },
        { kind: 'ul', items: [
          'كلها حسنى — تتضمن صفات الكمال المطلق',
          'كلها أعلام وأوصاف — أعلام لذاته أوصاف لمعانيها',
          'قال ﷺ: "إن لله تسعة وتسعين اسماً، مائة إلا واحداً، من أحصاها دخل الجنة" (متفق عليه)'
        ] },
        { kind: 'h3', text: 'أمثلة من الأسماء' },
        { kind: 'ul', items: [
          'الرحمن، الرحيم',
          'الملك',
          'القدوس',
          'السميع، البصير',
          'العليم',
          'الحي، القيوم',
          'العزيز، الحكيم'
        ] },
        { kind: 'h3', text: 'الانحرافات الأربعة' },
        { kind: 'ol', items: [
          'التشبيه — مذهب المشبهة',
          'التعطيل — مذهب المعتزلة',
          'التحريف — تحريف معاني النصوص',
          'التكييف — وصف كيفية الصفة'
        ] },
        { kind: 'p', text: 'منهج أهل السنة إثبات ما أثبته الله ورسوله بلا تكييف ولا تمثيل ولا تحريف ولا تعطيل.' },
      ],
      [
        { kind: 'h2', text: 'The Meaning of Tawhid al-Asma wa as-Sifat' },
        { kind: 'p', text: "Tawhid al-Asma wa as-Sifat is to affirm Allah's names and attributes as He has described Himself in the Qur'an and as the Prophet ﷺ described Him in the Sunnah — affirming what He has affirmed of Himself and denying what He has denied, without comparing Him to created beings." },
        { kind: 'h3', text: 'The Two Major Principles' },
        { kind: 'p', text: "A Muslim adheres to two principles regarding Allah's names and attributes:" },
        { kind: 'ol', items: [
          "Affirming without comparison (Ithbat bila Tashbih) — Allah has a hand, but not like a human's; He has hearing, but not like a human's",
          "Transcendence without negation (Tanzih bila Ta'til) — Allah has no equal, yet this does not mean He has no attributes"
        ] },
        { kind: 'p', text: 'The foundational verse expressing both:' },
        { kind: 'quote', text: '"There is nothing like unto Him, and He is the All-Hearing, the All-Seeing."', cite: 'Ash-Shura 42:11' },
        { kind: 'p', text: 'This verse contains both principles — affirmation of attributes (All-Hearing, All-Seeing) and denial of resemblance (nothing like Him).' },
        { kind: 'h3', text: "Characteristics of Allah's Names" },
        { kind: 'ul', items: [
          "All are most beautiful (al-Asma al-Husna) — comprising attributes of absolute perfection",
          "Every name carries meaning related to an attribute",
          'The Prophet ﷺ said: "Allah has ninety-nine names, one less than a hundred; whoever counts them will enter Paradise" (Bukhari and Muslim)'
        ] },
        { kind: 'h3', text: 'Examples of Names and Attributes' },
        { kind: 'ul', items: [
          'Ar-Rahman, Ar-Rahim — the Most Compassionate, the Most Merciful',
          'Al-Malik — the True King',
          'Al-Quddus — the Holy',
          "As-Sami' — the All-Hearing",
          'Al-Basir — the All-Seeing',
          "Al-'Alim — the All-Knowing",
          'Al-Hayy — the Ever-Living',
          'Al-Qayyum — the Self-Subsisting and Sustainer of all',
          "Al-'Aziz — the Almighty",
          'Al-Hakim — the All-Wise'
        ] },
        { kind: 'h3', text: 'Four Errors to Avoid' },
        { kind: 'p', text: 'Scholars of Ahl as-Sunnah have identified four major errors people make regarding the names and attributes:' },
        { kind: 'ol', items: [
          'Tashbih (Likening) — comparing Allah to His creation — the error of the anthropomorphists',
          "Ta'til (Negation) — denying Allah's attributes wholly or in part — the error of the Mu'tazila",
          'Tahrif (Distortion) — twisting the meanings of names and attributes from their plain sense',
          'Takyif (Specifying how) — asking how Allah\'s attributes manifest — beyond human comprehension'
        ] },
        { kind: 'p', text: 'The student of Ahl as-Sunnah accepts what Allah has said about Himself and what the Prophet ﷺ has said about Him, without speculating on the "how," for Allah is beyond the scope of our reasoning and knowledge.' },
      ],
    ),
    duration: '24:00',
    status: 'published',
    tags: ['tawhid', 'asma-wa-sifat', 'aqeedah'],
    createdAt: '2026-03-26',
    updatedAt: '2026-03-26',
  },

  // ============================================
  // TAWHIDI — Shirk
  // ============================================
  {
    id: 'l-tawhidi-shirk-aina',
    title: {
      sw: 'Aina za Shirk na Hatari Yake',
      ar: 'أنواع الشرك وخطره',
      en: 'Types of Shirk and Its Gravity',
    },
    slug: 'aina-za-shirk',
    subjectId: 'tawhidi',
    levelId: 'awali',
    courseId: 'tawhidi-shirk',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Maana ya Shirk' },
        { kind: 'p', text: 'Shirk ni kinyume cha Tawhidi. Ni kumshirikisha Allah na kitu kingine au mtu mwingine katika yale yanayostahili yeye pekee — uola wake, ibada zake, au sifa zake. Ni dhambi kubwa zaidi kwa Allah, na ndiyo dhambi pekee asiyoisamehe asipotubia.' },
        { kind: 'quote', text: 'إِنَّ اللَّهَ لَا يَغْفِرُ أَنْ يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَنْ يَشَاءُ', cite: 'An-Nisa 4:48' },
        { kind: 'p', text: '"Hakika Allah hasamehe kushirikishwa na (kitu kingine), bali atasamehe yasiyo hayo kwa amtakaye." Hii ni kauli kali sana — dhambi nyingine zinaweza kusamehewa kwa rehema ya Allah hata bila toba, lakini shirk haisamehewi bila toba ya kweli kabla ya kifo.' },
        { kind: 'h3', text: 'Shirk Akbar (Shirk Kubwa)' },
        { kind: 'p', text: 'Shirk Akbar ni shirk inayotoka kabisa katika dini ya Uislamu. Mtu anayefanya shirk hii bila kutubia kabla ya kufa — atakuwa motoni milele. Aina zake:' },
        { kind: 'ul', items: [
          'Shirk katika ibada — kumuabudu mwingine pamoja na Allah, kama vile kuomba msaada wa kiroho kwa marehemu, kuabudu masanamu, au kuabudu nyota',
          'Shirk katika nia — kufanya ibada kwa ajili ya watu (riya kuu) au kwa ajili ya kupata umaarufu wa kidunia bila kutaka thawabu ya akhera',
          'Shirk katika utii — kuwatii watu katika kuhalalisha haramu au kuharamisha halali kwa kuamini kwamba wana mamlaka ya kibinafsi ya kufanya hivyo',
          'Shirk katika mapenzi — kupenda mtu mwingine kwa kiwango cha mapenzi ya Allah, kwa namna ambayo huipinga kumtii Allah'
        ] },
        { kind: 'h3', text: 'Shirk Asghar (Shirk Ndogo)' },
        { kind: 'p', text: 'Shirk Asghar ni shirk inayoharibu thawabu ya tendo lakini haitoi mtu kabisa katika Uislamu. Hata hivyo, ni dhambi kubwa sana, na Mtume ﷺ alionya juu yake mara kwa mara. Aina zake kuu:' },
        { kind: 'ul', items: [
          'Riya — kufanya ibada kwa kutaka kuonekana na watu, sio kwa sababu ya Allah pekee. Mtume ﷺ alisema: "Kile ninachowahofia kwenu zaidi ni shirk asghar" — wakauliza ni nini? Akasema: "Riya" (Ahmad)',
          'Sum\'a — kufanya ibada kwa siri kisha kuwaambia watu ili wasifu',
          'Kuapa kwa mtu mwingine asiye Allah — kama vile kuapa kwa Mtume au kwa baba',
          'Kusema "Kama si Allah na fulani" badala ya "Kama si Allah halafu fulani"',
          'Kuamini hirizi zinaweza kukinga kwa nguvu zao'
        ] },
        { kind: 'h3', text: 'Shirk Khafi (Shirk Iliyofichika)' },
        { kind: 'p', text: 'Hii ni aina ya hatari zaidi kwa sababu mtu anaweza kuingia ndani yake bila kujua. Ni kuwa na ndoto za kidunia ambazo zinapingana na ikhlasi. Mfano: kuswali vizuri zaidi watu wakiwepo. Mtume ﷺ alisema kuhusu shirk hii kuwa "ni siri zaidi kuliko mlilio wa siafu mweusi juu ya jiwe jeusi katika usiku wa giza" (Ahmad).' },
        { kind: 'h3', text: 'Njia za Kujikinga na Shirk' },
        { kind: 'ol', items: [
          'Kujifunza Tawhidi vizuri — kuelewa kile kinachostahili kwa Allah na kile kisichostahili',
          'Kusoma Qur\'an na kuielewa — Qur\'an inajaa onyo dhidi ya shirk',
          'Kuomba kinga ya Allah — Mtume ﷺ alikuwa akiomba: "Allahumma inni a\'udhu bika an ushrika bika wa ana a\'lam, wa astaghfiruka lima la a\'lam" (Allah, ninakuomba kinga ya kushirikishwa na wewe nikijua, na ninakuomba msamaha kwa nisichokijua)',
          'Kuwa makini na nia — kufanya ibada kwa ajili ya Allah pekee',
          'Kuepukana na watu wanaodumisha mila za kishirikina'
        ] },
      ],
      [
        { kind: 'h2', text: 'تعريف الشرك' },
        { kind: 'p', text: 'الشرك ضد التوحيد. وهو إشراك غير الله مع الله فيما يستحقه وحده — في ربوبيته أو ألوهيته أو أسمائه وصفاته. وهو أعظم الذنوب، والذنب الوحيد الذي لا يغفره الله بلا توبة.' },
        { kind: 'quote', text: 'إِنَّ اللَّهَ لَا يَغْفِرُ أَنْ يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَنْ يَشَاءُ', cite: 'النساء ٤:٤٨' },
        { kind: 'h3', text: 'الشرك الأكبر' },
        { kind: 'p', text: 'الشرك الأكبر ينقل صاحبه عن الإسلام، ومن مات عليه دون توبة فهو في النار خالداً. أنواعه:' },
        { kind: 'ul', items: [
          'الشرك في العبادة — كدعاء غير الله أو الذبح لغيره',
          'الشرك في النية — العمل لأجل الناس فحسب',
          'الشرك في الطاعة — اتباع البشر في تحليل الحرام أو تحريم الحلال',
          'الشرك في المحبة — محبة غير الله محبة عبادة'
        ] },
        { kind: 'h3', text: 'الشرك الأصغر' },
        { kind: 'p', text: 'الشرك الأصغر يُحبط العمل ولا يُخرج من الإسلام. لكنه كبيرة عظيمة، حذّر منها النبي ﷺ مراراً:' },
        { kind: 'ul', items: [
          'الرياء — قال ﷺ: "إن أخوف ما أخاف عليكم الشرك الأصغر، الرياء" (أحمد)',
          'السمعة — العمل سرّاً ثم إخبار الناس به',
          'الحلف بغير الله',
          '"لولا الله وفلان" بدلاً من "لولا الله ثم فلان"',
          'اعتقاد التمائم نافعة بذاتها'
        ] },
        { kind: 'h3', text: 'الشرك الخفي' },
        { kind: 'p', text: 'وهو أخطر لخفائه. قال ﷺ إنه "أخفى من دبيب النملة السوداء على الصخرة الصماء في ظلمة الليل" (أحمد).' },
        { kind: 'h3', text: 'الوقاية من الشرك' },
        { kind: 'ol', items: [
          'تعلّم التوحيد',
          'تدبّر القرآن',
          'الاستعاذة بالله — كان النبي ﷺ يقول: "اللهم إني أعوذ بك أن أشرك بك وأنا أعلم، وأستغفرك لما لا أعلم"',
          'تصحيح النية',
          'مجانبة أهل الشرك'
        ] },
      ],
      [
        { kind: 'h2', text: 'The Meaning of Shirk' },
        { kind: 'p', text: "Shirk is the opposite of Tawhid. It is associating something or someone else with Allah in what belongs to Him alone — His Lordship, His worship, or His names and attributes. It is the gravest sin in Allah's sight, and the only sin He does not forgive without repentance." },
        { kind: 'quote', text: '"Indeed, Allah does not forgive that partners be associated with Him, but He forgives anything less than that for whom He wills."', cite: 'An-Nisa 4:48' },
        { kind: 'p', text: "This is a severe statement — other sins may be forgiven by Allah's mercy even without explicit repentance, but shirk is not forgiven without sincere repentance before death." },
        { kind: 'h3', text: 'Shirk Akbar (Major Shirk)' },
        { kind: 'p', text: 'Major shirk takes a person entirely out of Islam. Whoever commits it without repentance before death will dwell in the Fire eternally. Its forms:' },
        { kind: 'ul', items: [
          'Shirk in worship — worshipping another alongside Allah, such as supplicating to the deceased, idols, or stars',
          'Shirk in intention — performing acts of worship purely for human approval (major riya), with no concern for the hereafter',
          'Shirk in obedience — obeying people in declaring forbidden what Allah permitted, or vice versa, with the belief that they have intrinsic authority to do so',
          "Shirk in love — loving someone with the supreme love that belongs only to Allah, in a manner that contradicts obeying Allah"
        ] },
        { kind: 'h3', text: 'Shirk Asghar (Minor Shirk)' },
        { kind: 'p', text: 'Minor shirk nullifies the reward of an act but does not remove a person from Islam. Yet it is a grave sin, and the Prophet ﷺ warned of it repeatedly:' },
        { kind: 'ul', items: [
          'Riya — performing acts of worship to be seen by people. The Prophet ﷺ said: "What I fear most for you is minor shirk." When asked what it was, he said: "Riya" (Ahmad)',
          "Sum'a — performing worship privately and then telling people about it for praise",
          'Swearing by other than Allah — by the Prophet, by one\'s father, etc.',
          'Saying "Were it not for Allah and so-and-so" instead of "Were it not for Allah, then so-and-so"',
          'Believing amulets protect by their inherent power'
        ] },
        { kind: 'h3', text: 'Shirk Khafi (Hidden Shirk)' },
        { kind: 'p', text: 'This is the most dangerous form because a person can fall into it unknowingly. It involves worldly motives that contradict sincerity. For example: praying more carefully when others are watching. The Prophet ﷺ said this kind of shirk is "more concealed than a black ant on a black stone in the dark of night" (Ahmad).' },
        { kind: 'h3', text: 'How to Guard Against Shirk' },
        { kind: 'ol', items: [
          'Studying Tawhid thoroughly — understanding what belongs to Allah and what does not',
          "Reciting and reflecting on the Qur'an — it is filled with warnings against shirk",
          'Seeking Allah\'s protection — the Prophet ﷺ used to supplicate: "O Allah, I seek refuge in You from associating partners with You knowingly, and I seek Your forgiveness for what I do not know"',
          'Examining intentions carefully — performing acts purely for Allah',
          'Avoiding company that maintains polytheistic customs'
        ] },
      ],
    ),
    duration: '22:00',
    status: 'published',
    tags: ['tawhid', 'shirk', 'aqeedah'],
    createdAt: '2026-03-29',
    updatedAt: '2026-03-29',
  },

  // ============================================
  // SIRA — Makkah
  // ============================================
  {
    id: 'l-sira-makkah-kuzaliwa',
    title: {
      sw: 'Kuzaliwa na Utoto wa Mtume ﷺ',
      ar: 'مولد النبي ﷺ ونشأته',
      en: 'The Birth and Childhood of the Prophet ﷺ',
    },
    slug: 'kuzaliwa-na-utoto',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-makkah',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Familia na Asili Yake' },
        { kind: 'p', text: 'Mtume Muhammad ﷺ alizaliwa katika kabila la Quraysh, kabila lenye heshima kubwa zaidi miongoni mwa Waarabu, lililochukua mamlaka ya kuangalia Ka\'bah. Asili yake inarudi kwa Mtume Ismail (AS), mwana wa Mtume Ibrahim (AS). Kwa hivyo, Mtume ﷺ alikuwa wa familia ya Mitume — mlolongo wake ulianzia kwa Ibrahim, baba wa wabsiri wengi.' },
        { kind: 'p', text: 'Babu yake mkubwa Hashim ibn Abd Manaf ndiye aliyeanzisha tawi la Bani Hashim ndani ya Quraysh. Babu yake Abdul-Muttalib alikuwa kiongozi wa Makkah na alikuwa anaheshimika sana. Baba yake Abdullah alifariki kabla ya Mtume kuzaliwa, akiwa katika safari ya biashara — Mtume ﷺ alikuja duniani akiwa yatima wa baba.' },
        { kind: 'h3', text: 'Mwaka wa Tembo na Kuzaliwa Kwake' },
        { kind: 'p', text: 'Mtume ﷺ alizaliwa katika mwaka unaojulikana kama "Mwaka wa Tembo" (Aam al-Fil), karibu na mwaka 570 BK. Mwaka huo unapata jina hili kwa sababu Abrahah, mfalme wa Habashah aliyekuwa anatawala Yemen, alipigana dhidi ya Makkah akiwa na jeshi la tembo lengo lake likiwa kuiharibu Ka\'bah na kuhamisha hijja kwa kanisa lake la San\'a. Allah aliwaponza katika tukio la kimungu lililorekodiwa katika Sura Al-Fil:' },
        { kind: 'quote', text: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ', cite: 'Al-Fil 105:1' },
        { kind: 'p', text: 'Tukio la Mwaka wa Tembo lilikuwa ishara kubwa kwa kuzaliwa kwa Mtume ﷺ — Allah alilinda Ka\'bah ili iwe kibla cha umma utakaouongozwa na Mtume aliyezaliwa muda mfupi baadaye.' },
        { kind: 'h3', text: 'Maziwa ya Halima' },
        { kind: 'p', text: 'Kufuatia desturi ya Waarabu wa kati ya jangwa, watoto walikuwa wakipelekwa kwa wanawake wa makabila ya jangwani ili wapate hewa nzuri na kujifunza Kiarabu safi. Mtume ﷺ alipelekwa kwa Halima as-Sa\'diyya wa kabila la Bani Sa\'d. Halima na familia yake walipata baraka kubwa kwa kuwa nyumbani kwao — kondoo wao walitoa maziwa mengi, mvua ilianza kunyesha katika eneo lao lililokuwa likikabiliwa na ukame, na maisha yao yote yalibadilika.' },
        { kind: 'h3', text: 'Tukio la Kufunguliwa Kifua' },
        { kind: 'p', text: 'Wakati Mtume ﷺ alikuwa mtoto mdogo akiwa na Halima, lilitokea tukio la ajabu. Alipokuwa anacheza na watoto wengine, malaika wawili walimletea, wakamlaza chini, wakamfungua kifua chake, wakatoa donge dogo jeusi kutoka moyoni mwake na kusema: "Hii ni sehemu ya shaytan ndani yako," kisha wakaiosha moyo wake kwa maji ya zamzam wakaurudisha mahali pake. Halima alishtuka sana na akamrudisha Mtume kwa mama yake Aamina kwa hofu ya usalama wake.' },
        { kind: 'h3', text: 'Vifo vya Watu wa Karibu' },
        { kind: 'p', text: 'Mtume ﷺ alipata mitihani mingi ya yatima:' },
        { kind: 'ul', items: [
          'Alipoteza baba yake kabla ya kuzaliwa',
          'Mama yake Aamina alifariki Mtume akiwa na umri wa miaka sita, baada ya safari ya kwenda kuzuru kaburi la baba yake',
          'Babu yake Abdul-Muttalib aliyemchukua chini ya ulinzi wake alifariki Mtume akiwa na miaka minane',
          'Mjomba wake Abu Talib akamlea hadi alipokuwa mtu mzima'
        ] },
        { kind: 'p', text: 'Allah amesema:' },
        { kind: 'quote', text: 'أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ', cite: 'Ad-Duha 93:6' },
        { kind: 'p', text: '"Je, hakukukuta yatima akakuhifadhi?" Allah alimchagua Mtume kuwa yatima ili afundishwe huruma kwa wenye kupatwa na shida — fadhila ambazo zingedhihirika baadaye katika ujumbe wake.' },
        { kind: 'h3', text: 'Sifa Zake za Awali' },
        { kind: 'p', text: 'Hata kabla ya unabii, Mtume ﷺ alikuwa anajulikana Makkah kwa sifa nzuri:' },
        { kind: 'ul', items: [
          'Al-Amin — Mwaminifu — watu walikuwa wakimwekea amana zao',
          'As-Sadiq — Mkweli — hakuna aliyemwahi kushtaki uwongo',
          'Mtu wa heshima na utulivu',
          'Mlinzi wa wahitaji na maskini',
          'Hakuwahi kuabudu masanamu wala kunywa pombe wakati wa kabla ya unabii'
        ] },
      ],
      [
        { kind: 'h2', text: 'الأسرة والنسب' },
        { kind: 'p', text: 'وُلد النبي ﷺ في قبيلة قريش، أشرف قبائل العرب وأكرمها عند العرب، التي أُسندت إليها سدانة الكعبة. ونسبه يرجع إلى نبي الله إسماعيل بن إبراهيم عليهما السلام. فالنبي ﷺ من بيت النبوة.' },
        { kind: 'p', text: 'وجده هاشم بن عبد مناف هو الذي أسس بطن بني هاشم في قريش. وجده عبد المطلب كان سيد مكة. ومات أبوه عبد الله قبل ولادته في رحلة تجارة، فجاء النبي ﷺ يتيم الأب.' },
        { kind: 'h3', text: 'عام الفيل والمولد' },
        { kind: 'p', text: 'وُلد النبي ﷺ في "عام الفيل" نحو سنة ٥٧٠ م. سُمي بهذا الاسم لأن أبرهة الحبشي حاكم اليمن أراد هدم الكعبة بجيش فيل. فأهلكهم الله بآية ربانية:' },
        { kind: 'quote', text: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ', cite: 'الفيل ١٠٥:١' },
        { kind: 'h3', text: 'حليمة السعدية' },
        { kind: 'p', text: 'جرت العادة عند العرب أن يُرسلوا أطفالهم إلى البادية ليتنشّأوا في الفصاحة. فأُرسل النبي ﷺ إلى حليمة السعدية. ونزلت في بيتها بركات عظيمة — كثرت ألبان غنمهم، ونزل المطر بعد جدب.' },
        { kind: 'h3', text: 'شقّ الصدر' },
        { kind: 'p', text: 'وهو في صباه نزل عليه ملكان، فألقياه على وجهه، وشقّا صدره، واستخرجا منه علقة سوداء وقالا: "هذا حظ الشيطان منك"، ثم غسلا قلبه بماء زمزم. ففزعت حليمة وأعادته إلى أمه.' },
        { kind: 'h3', text: 'وفاة الأقربين' },
        { kind: 'ul', items: [
          'مات أبوه قبل مولده',
          'ماتت أمه آمنة وهو ابن ست',
          'مات جده عبد المطلب وهو ابن ثمان',
          'فكفله عمه أبو طالب'
        ] },
        { kind: 'quote', text: 'أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ', cite: 'الضحى ٩٣:٦' },
        { kind: 'h3', text: 'صفاته قبل البعثة' },
        { kind: 'ul', items: [
          'الأمين — كانوا يأتمنونه على ودائعهم',
          'الصادق — لم يُعرف عنه كذبة قط',
          'الوقار والحياء',
          'حماية الضعيف',
          'لم يسجد لصنم ولم يشرب خمراً'
        ] },
      ],
      [
        { kind: 'h2', text: 'Family and Lineage' },
        { kind: 'p', text: 'Prophet Muhammad ﷺ was born into the tribe of Quraysh, the most respected of the Arab tribes, who held custodianship of the Ka\'bah. His lineage traces back to the Prophet Ismail (AS), son of Ibrahim (AS). The Prophet ﷺ was thus from a family of prophets — his line went back to Ibrahim, the father of many prophets.' },
        { kind: 'p', text: 'His great-grandfather Hashim ibn Abd Manaf founded the Banu Hashim branch within Quraysh. His grandfather Abdul-Muttalib was a leader of Makkah, deeply respected. His father Abdullah died before the Prophet was born, while on a trade journey — and so the Prophet ﷺ entered the world an orphan of his father.' },
        { kind: 'h3', text: 'The Year of the Elephant and the Birth' },
        { kind: 'p', text: 'The Prophet ﷺ was born in the year known as the "Year of the Elephant" (Aam al-Fil), approximately 570 CE. The year takes this name because Abrahah, the Abyssinian ruler of Yemen, marched against Makkah with an army that included elephants, intending to destroy the Ka\'bah and divert pilgrimage to his own cathedral in San\'a. Allah destroyed his army through a divine intervention recorded in Surah Al-Fil:' },
        { kind: 'quote', text: '"Have you not considered how your Lord dealt with the companions of the elephant?"', cite: 'Al-Fil 105:1' },
        { kind: 'p', text: 'The Year of the Elephant was a great sign accompanying the birth of the Prophet ﷺ — Allah preserved the Ka\'bah so that it would become the qibla of the nation that would soon be led by the Prophet born just months later.' },
        { kind: 'h3', text: 'The Wet-Nurse Halima' },
        { kind: 'p', text: 'Following the custom of the urban Arabs, infants were sent to women of the desert tribes for healthier air and to learn the purest Arabic. The Prophet ﷺ was placed with Halima as-Sa\'diyya of Banu Sa\'d. Halima and her household received remarkable blessings while he was with them — their sheep produced abundant milk, rain fell on their drought-stricken land, and their entire fortune changed.' },
        { kind: 'h3', text: 'The Splitting of the Chest' },
        { kind: 'p', text: 'When the Prophet ﷺ was a young child with Halima, an extraordinary event occurred. While he was playing with other children, two angels approached him, laid him down, opened his chest, removed a small black clot from his heart and said: "This is the share of Shaytan within you." Then they washed his heart with the water of Zamzam and replaced it. Halima was alarmed and returned the boy to his mother Aamina out of concern for his safety.' },
        { kind: 'h3', text: 'Successive Bereavements' },
        { kind: 'p', text: 'The Prophet ﷺ endured many trials of orphanhood:' },
        { kind: 'ul', items: [
          'He lost his father before he was born',
          'His mother Aamina died when he was six, returning from a visit to his father\'s grave',
          'His grandfather Abdul-Muttalib, who took him into his care, died when he was eight',
          'His uncle Abu Talib then raised him to manhood'
        ] },
        { kind: 'p', text: 'Allah says:' },
        { kind: 'quote', text: '"Did He not find you an orphan and shelter you?"', cite: 'Ad-Duha 93:6' },
        { kind: 'p', text: 'Allah chose for the Prophet to be an orphan so that he would learn compassion for those who suffer hardship — virtues that would shine through in his prophetic mission.' },
        { kind: 'h3', text: 'His Character Before Prophethood' },
        { kind: 'p', text: 'Even before prophethood, the Prophet ﷺ was known throughout Makkah for his outstanding qualities:' },
        { kind: 'ul', items: [
          'Al-Amin — The Trustworthy — people would entrust him with their valuables',
          'As-Sadiq — The Truthful — none ever accused him of a lie',
          'Dignified and reserved',
          'A protector of the needy and weak',
          'He never bowed to an idol, never drank wine, even before his prophethood'
        ] },
      ],
    ),
    duration: '22:00',
    status: 'published',
    tags: ['sirah', 'birth', 'makkah', 'childhood'],
    createdAt: '2026-04-01',
    updatedAt: '2026-04-01',
  },

  {
    id: 'l-sira-makkah-bi-tha',
    title: {
      sw: 'Mwanzo wa Unabii — Wahyi wa Kwanza katika Pango la Hira',
      ar: 'بداية البعثة — الوحي الأول في غار حراء',
      en: 'The Beginning of Prophethood — The First Revelation in the Cave of Hira',
    },
    slug: 'mwanzo-wa-unabii',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-makkah',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Maandalizi ya Roho' },
        { kind: 'p', text: 'Kabla ya kupokea wahyi, Mtume ﷺ alikuwa amejitenga sana na maisha ya kishirikina ya Makkah. Alichukia kuabudu masanamu, kunywa pombe, na maovu mengineyo yaliyokuwa yameenea. Aliposhuhudia ushirika wa walinzi wa Ka\'bah uliokuwa umejaa masanamu, alipendelea kuwa peke yake katika pango la Hira juu ya mlima Jabal an-Nour kilometa nne kutoka Makkah, akifanya tafakuri (tahannuth) kwa siku nyingi mfululizo.' },
        { kind: 'p', text: 'Mke wake Khadija (RA) alikuwa anamhudumia kwa chakula na maji, na yeye akiendelea kutafakari, akiomba Mola aliyeumba kuonekana kwake kwa nuru. Hii iliendelea kwa miaka kadhaa kabla ya wahyi.' },
        { kind: 'h3', text: 'Wahyi wa Kwanza' },
        { kind: 'p', text: 'Mtume ﷺ alipokuwa na umri wa miaka 40, katika mwezi wa Ramadhani, akiwa katika pango la Hira, malaika Jibril (AS) alimjia kwa mara ya kwanza. Aisha (RA) anasimulia tukio hili kama Mtume mwenyewe alivyolieleza:' },
        { kind: 'p', text: '"Malaika alikuja kwangu na akasema: \'Soma!\' Nikajibu: \'Sijui kusoma.\' Akaninyamazisha kwa nguvu hadi nikahisi sina nguvu, kisha akaniachilia na kusema: \'Soma!\' Nikajibu mara mbili kama hapo awali. Mara ya tatu, akasema:' },
        { kind: 'quote', text: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنْسَانَ مَا لَمْ يَعْلَمْ', cite: 'Al-Alaq 96:1-5' },
        { kind: 'p', text: '"Soma kwa jina la Mola wako aliyeumba; akamuumba mwanadamu kutoka pande la damu lililogandamana; soma na Mola wako ndiye Mkarimu mno; aliyemfundisha mwanadamu kwa kalamu; akamfundisha mwanadamu yale asiyoyajua." Hizi ndizo aya za kwanza za Qur\'an kuteremshwa.' },
        { kind: 'h3', text: 'Khadija na Waraqa ibn Nawfal' },
        { kind: 'p', text: 'Mtume ﷺ alirudi nyumbani akihofu, akimwambia mke wake: "Nivishe! Nivishe!" Alisikia hofu kubwa na akamwambia Khadija: "Ninahofia kwa nafsi yangu." Khadija alimfariji kwa maneno yaliyoendelea kuwa kati ya maneno mazuri zaidi yaliyowahi kusemwa na mke kwa mume:' },
        { kind: 'p', text: '"Hapana wallahi! Allah hatakufedhehesha kabisa. Wewe unaungana na ndugu, unawagusia wahitaji, unalipa fadhila, unawakirimu wageni, na unasaidia walio katika shida za haki."' },
        { kind: 'p', text: 'Khadija alimchukua kwa binamu yake Waraqa ibn Nawfal, mtu wa kale aliyekuwa amesoma vitabu vya Wakristo na Wayahudi. Mtume akamwambia tukio. Waraqa alisema: "Huyu ni Namus (yaani Jibril) aliyekuja kwa Musa. Lo, ningekuwa mdogo wakati huu! Lo, ningekuwa hai watakapokukufukuza watu wako!" Mtume akashangaa: "Watanifukuza?" Waraqa akajibu: "Ndiyo, hakuna mtu aliyeleta kile ulichokuja nacho ila alipigwa vita. Nikiishi hadi siku hiyo, nitakusaidia kwa nguvu zangu zote." Waraqa akafa muda mfupi baadaye.' },
        { kind: 'h3', text: 'Waumini wa Kwanza' },
        { kind: 'p', text: 'Mtume ﷺ alianza Da\'wa ya siri kwa miaka mitatu. Wachache walikubali ujumbe wake mwanzoni:' },
        { kind: 'ul', items: [
          'Khadija (RA) — mke wake — mwanamke wa kwanza kuingia katika Uislamu',
          'Ali ibn Abi Talib (RA) — binamu yake mdogo — mtoto wa kwanza kuingia katika Uislamu',
          'Zayd ibn Haritha (RA) — mtumwa wake aliyekombolewa kisha akafanywa mwana wa kuasili — mtumwa wa kwanza',
          'Abu Bakr as-Siddiq (RA) — rafiki yake mkubwa — mtu mzima wa kwanza kuingia katika Uislamu'
        ] },
        { kind: 'p', text: 'Abu Bakr aliwaita rafiki zake katika Uislamu, na kwa juhudi yake watu wengi walikubali — kati yao Uthman ibn Affan, Talha ibn Ubayd-Allah, Abdur-Rahman ibn Awf, Sa\'d ibn Abi Waqqas, na Az-Zubayr ibn al-Awwam — wote ambao wakaja kuwa miongoni mwa kumi waliopewa habari njema ya pepo (al-Asharah al-Mubasharah).' },
        { kind: 'h3', text: 'Da\'wa ya Wazi' },
        { kind: 'p', text: 'Baada ya miaka mitatu ya Da\'wa ya siri, Allah aliamuru Mtume kuanza Da\'wa wazi:' },
        { kind: 'quote', text: 'فَاصْدَعْ بِمَا تُؤْمَرُ وَأَعْرِضْ عَنِ الْمُشْرِكِينَ', cite: 'Al-Hijr 15:94' },
        { kind: 'p', text: '"Tangaza unayoamriwa, na jitenge na washirikina." Mtume akapanda mlima Safa na akawaita watu wote wa Quraysh, akiwauliza: "Mkikuambia kwamba kuna jeshi nyuma ya mlima huu linakuja kuvamia, mngeliniamini?" Wakajibu: "Naam, hatujakuwahi kukushuhudia uwongo." Akasema: "Basi mimi ni mtu anayewaonya kuhusu adhabu kali inayokuja." Hii ndiyo ilikuwa siku ya kuanza kwa upinzani mkubwa wa Quraysh dhidi yake.' },
      ],
      [
        { kind: 'h2', text: 'الإعداد الروحي' },
        { kind: 'p', text: 'قبل نزول الوحي كان النبي ﷺ يعتزل أهل الشرك في مكة. كان يكره عبادة الأصنام وشرب الخمر وسائر منكرات الجاهلية. واتخذ غار حراء في جبل النور على بعد أربعة كيلومترات من مكة مكاناً للتحنث، يلازمه الأيام ذوات العدد.' },
        { kind: 'p', text: 'وكانت زوجه خديجة رضي الله عنها تأتيه بزاده وهو يتفكر ويتأمل. واستمر هذا سنوات قبل البعثة.' },
        { kind: 'h3', text: 'الوحي الأول' },
        { kind: 'p', text: 'في الأربعين من عمره، في رمضان، وهو في الغار، نزل عليه جبريل عليه السلام أول مرة. روت عائشة رضي الله عنها قصته كما حكاها النبي ﷺ:' },
        { kind: 'p', text: '"جاءني الملك فقال: اقرأ. قلت: ما أنا بقارئ. فأخذني فغطّني حتى بلغ مني الجَهد، ثم أرسلني فقال: اقرأ. قلت: ما أنا بقارئ. ثم في الثالثة قال:' },
        { kind: 'quote', text: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِي عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنْسَانَ مَا لَمْ يَعْلَمْ', cite: 'العلق ٩٦:١-٥' },
        { kind: 'h3', text: 'خديجة وورقة بن نوفل' },
        { kind: 'p', text: 'رجع النبي ﷺ إلى بيته يرجف فؤاده يقول: "زمّلوني زمّلوني." قال لخديجة: "لقد خشيت على نفسي." فقالت كلمتها الخالدة:' },
        { kind: 'p', text: '"كلا والله، ما يخزيك الله أبداً. إنك لتصل الرحم، وتحمل الكلّ، وتكسب المعدوم، وتقري الضيف، وتعين على نوائب الحق."' },
        { kind: 'p', text: 'فأخذته إلى ابن عمها ورقة بن نوفل، وكان قد قرأ كتب اليهود والنصارى. لما أخبره النبي قال: "هذا الناموس الذي نزّل الله على موسى. ليتني فيها جذعاً، ليتني أكون حياً إذ يخرجك قومك." قال النبي: "أوَمخرجي هم؟" قال: "نعم، لم يأتِ رجل بمثل ما جئت به إلا عُودي." ومات ورقة بعد أيام.' },
        { kind: 'h3', text: 'السابقون الأولون' },
        { kind: 'ul', items: [
          'خديجة رضي الله عنها — أول النساء',
          'علي بن أبي طالب رضي الله عنه — أول الصبيان',
          'زيد بن حارثة رضي الله عنه — أول الموالي',
          'أبو بكر الصديق رضي الله عنه — أول الرجال الأحرار'
        ] },
        { kind: 'p', text: 'ودعا أبو بكر أصحابه فأسلم على يديه عثمان بن عفان وطلحة وعبد الرحمن بن عوف وسعد بن أبي وقاص والزبير بن العوام، وكلهم من العشرة المبشرين بالجنة.' },
        { kind: 'h3', text: 'الجهر بالدعوة' },
        { kind: 'p', text: 'بعد ثلاث سنوات من السرّية أمر الله بالجهر:' },
        { kind: 'quote', text: 'فَاصْدَعْ بِمَا تُؤْمَرُ وَأَعْرِضْ عَنِ الْمُشْرِكِينَ', cite: 'الحجر ١٥:٩٤' },
        { kind: 'p', text: 'فصعد النبي ﷺ على جبل الصفا ونادى قريشاً وقال: "أرأيتكم لو أخبرتكم أن خيلاً بسفح هذا الجبل تريد أن تغير عليكم، أكنتم مصدقيّ؟" قالوا: "نعم، ما جربنا عليك إلا صدقاً." قال: "فإني نذير لكم بين يدي عذاب شديد." وبهذا بدأت العداوة الكبرى من قريش.' },
      ],
      [
        { kind: 'h2', text: 'Spiritual Preparation' },
        { kind: 'p', text: 'Before receiving revelation, the Prophet ﷺ had grown deeply detached from the polytheistic life of Makkah. He despised idol-worship, intoxicants, and the other ills of his society. The polytheism he saw in the custodians of the Ka\'bah, which was filled with idols, drove him to seek seclusion in the cave of Hira on Mount Jabal an-Nour, four kilometres from Makkah, where he engaged in tahannuth (devotional contemplation) for many days at a stretch.' },
        { kind: 'p', text: 'His wife Khadija (RA) would bring him food and water, and he would continue meditating, beseeching the Creator who had drawn him to this contemplation. This continued for several years before the first revelation.' },
        { kind: 'h3', text: 'The First Revelation' },
        { kind: 'p', text: 'When the Prophet ﷺ was forty years old, in the month of Ramadan, while in the cave of Hira, the angel Jibril (AS) came to him for the first time. Aisha (RA) narrates the event as the Prophet himself described it:' },
        { kind: 'p', text: '"The angel came to me and said: \'Read!\' I replied: \'I cannot read.\' He gripped me until I could endure no more, then released me and said: \'Read!\' I said the same as before. He gripped me a second time and a third, and then said:' },
        { kind: 'quote', text: '"Read! In the name of your Lord who created — created man from a clinging clot. Read! And your Lord is the Most Generous, who taught by the pen, taught man what he did not know."', cite: 'Al-\'Alaq 96:1-5' },
        { kind: 'p', text: "These were the very first verses of the Qur'an to be revealed." },
        { kind: 'h3', text: 'Khadija and Waraqa ibn Nawfal' },
        { kind: 'p', text: 'The Prophet ﷺ returned home trembling, saying: "Wrap me! Wrap me!" He told his wife: "I fear for myself." Khadija comforted him with words that have remained among the most beautiful ever spoken by a wife to her husband:' },
        { kind: 'p', text: '"By no means! Allah will never disgrace you. You uphold ties of kinship, you bear the burdens of the weak, you give to the destitute, you honour the guest, and you assist those struck by the calamities of truth."' },
        { kind: 'p', text: 'Khadija took him to her cousin Waraqa ibn Nawfal, an aged man who had read the books of the Christians and Jews. The Prophet recounted the event. Waraqa said: "This is the Namus (Jibril) who came to Musa. If only I were young at this time! If only I were alive when your people will drive you out!" The Prophet asked in surprise: "Will they drive me out?" Waraqa replied: "Yes, no man has ever brought what you have brought without being opposed. If I live to that day, I will support you with all my strength." Waraqa died not long afterwards.' },
        { kind: 'h3', text: 'The First Believers' },
        { kind: 'p', text: 'The Prophet ﷺ began secret da\'wa for three years. The first to accept his message were:' },
        { kind: 'ul', items: [
          'Khadija (RA) — his wife — the first woman to enter Islam',
          'Ali ibn Abi Talib (RA) — his young cousin — the first child to enter Islam',
          'Zayd ibn Haritha (RA) — his freed servant whom he had adopted — the first freedman',
          'Abu Bakr as-Siddiq (RA) — his closest friend — the first free adult man'
        ] },
        { kind: 'p', text: "Abu Bakr called his friends to Islam, and through his efforts many accepted — among them Uthman ibn Affan, Talha ibn Ubayd-Allah, Abdur-Rahman ibn Awf, Sa'd ibn Abi Waqqas, and Az-Zubayr ibn al-Awwam — all of whom would become among the ten given glad tidings of Paradise (al-Asharah al-Mubasharah)." },
        { kind: 'h3', text: 'Public Da\'wa' },
        { kind: 'p', text: 'After three years of private call, Allah commanded the Prophet to begin public proclamation:' },
        { kind: 'quote', text: '"Proclaim openly what you are commanded, and turn away from the polytheists."', cite: 'Al-Hijr 15:94' },
        { kind: 'p', text: 'The Prophet ﷺ ascended Mount Safa and called out to all of Quraysh, asking: "If I told you that an army was behind this mountain about to attack you, would you believe me?" They answered: "Yes — we have never known you to lie." He said: "Then I am a warner to you of a severe punishment to come." This day marked the beginning of Quraysh\'s great hostility against him.' },
      ],
    ),
    duration: '24:00',
    status: 'published',
    tags: ['sirah', 'revelation', 'hira', 'dawa'],
    createdAt: '2026-04-04',
    updatedAt: '2026-04-04',
  },

  {
    id: 'l-sira-makkah-mateso',
    title: {
      sw: 'Mateso ya Quraysh na Subira ya Waislamu wa Kwanza',
      ar: 'اضطهاد قريش وصبر الصحابة الأوائل',
      en: 'The Persecution of Quraysh and the Patience of the Early Muslims',
    },
    slug: 'mateso-na-subira',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-makkah',
    order: 3,
    content: richContent(
      [
        { kind: 'h2', text: 'Aina za Mateso' },
        { kind: 'p', text: 'Baada ya Mtume ﷺ kuanza kuita waziwazi watu kuingia katika Tawhidi, Quraysh waliongeza upinzani wao. Mateso yaliyowasilishwa kwa Waislamu wa kwanza yalikuwa ya namna mbalimbali — kwa wakuu, mateso ya kimaadili na kihistoria; kwa wanyonge, mateso ya mwili yaliyokwenda kwa kuteseka kifo.' },
        { kind: 'h3', text: 'Mateso ya Kimaadili na Kiuchumi' },
        { kind: 'p', text: 'Quraysh walitumia njia mbalimbali kumkomesha Mtume ﷺ na wafuasi wake:' },
        { kind: 'ul', items: [
          'Kumdharau na kumwita "mwenye kichaa" au "mchawi" katika kongamano za umma',
          'Kuwakata Waislamu kutoka katika biashara na huduma za jamii',
          'Kuwafukuza Waislamu kutoka kwenye familia zao',
          'Kuiwekea Mtume ﷺ uchafu njiani na kwenye milango yake',
          'Kupata wapinzani wa kimaandishi waliojaribu kupinga ujumbe wake'
        ] },
        { kind: 'h3', text: 'Mateso ya Kimwili kwa Wanyonge' },
        { kind: 'p', text: 'Waislamu walio na nguvu za kifamilia — kama Mtume ﷺ chini ya ulinzi wa Abu Talib, na Abu Bakr ambaye alikuwa biashara — walipata kiasi fulani cha ulinzi. Lakini watumwa, wanawake wa kawaida, na wageni walikabiliwa na mateso ya kimwili:' },
        { kind: 'ul', items: [
          'Bilal ibn Rabah (RA), mtumwa wa Habashah, alilalishwa juu ya mchanga wa moto wa jangwa, akiwekewa jiwe kubwa kifuani, akijibu kwa neno moja: "Ahad! Ahad!" (Mungu ni Mmoja!)',
          'Sumayyah bint Khayyat na mumewe Yasir, wazazi wa Ammar — walipigwa hadi Sumayyah akawa shahidi wa kwanza wa Uislamu, alipopigwa na Abu Jahl katika sehemu ya siri ya mwili',
          'Khabbab ibn al-Aratt aliwekewa makaa ya moto chini, na nguo zake za nyuma zikishika moto, lakini alibakia thabiti katika imani yake',
          'Mus\'ab ibn Umayr, kijana wa familia tajiri ya Makkah, alifukuzwa na mama yake na akafanywa maskini hadi nguo zake zikatofautiana na alikuwa amevaa kazi'
        ] },
        { kind: 'h3', text: 'Hijra ya Habashah' },
        { kind: 'p', text: 'Mtume ﷺ alipoona maumivu ya wafuasi wake yakizidi, aliwashauri waende Habashah ambako kulikuwa na mfalme wa Kikristo, an-Najashi (Negus), aliyejulikana kwa uadilifu. Hivyo katika mwaka wa tano wa unabii, kundi la kwanza la Waislamu — kama 16 watu wakiongozwa na Uthman ibn Affan na mke wake Ruqayya bint Muhammad — wakahama. Baadaye, kundi la pili la zaidi ya 80 wakaungana nao.' },
        { kind: 'p', text: 'Quraysh walituma wajumbe — Amr ibn al-As na Abdullah ibn Abi Rabi\'a — wakitoa zawadi kwa Negus na kuomba awarudishe Waislamu. Negus akasikiliza pande zote mbili, akamwomba Ja\'far ibn Abi Talib aelezee kuhusu Uislamu. Ja\'far alitoa moja ya hotuba bora zaidi katika historia, akielezea jinsi Allah alivyowatoa katika ujahili kwa kuwapeleta Mtume mkweli, mwaminifu, anayeamuru ibada ya Allah pekee na maadili mema. Negus akabakia kuwasaidia Waislamu, akakataa zawadi za Quraysh, na akayalia macho yake aliposikia aya kuhusu Maryamu (Maryam) na Isa.' },
        { kind: 'h3', text: 'Boycott Mkubwa' },
        { kind: 'p', text: 'Quraysh walipomshindwa Mtume ﷺ kupitia mateso ya kibinafsi, walitumia mbinu nyingine — boycott ya kabila zima la Bani Hashim na Bani al-Muttalib (familia za Mtume). Waliandika hati iliyoning\'inizwa Ka\'bah ikisema kwamba hakuna mtu ataoana au kufanya biashara au mawasiliano yoyote nao. Boycott ulidumu miaka mitatu, na Bani Hashim walikabiliwa na njaa kali — wakaishi kwa kula majani na ngozi. Watoto wadogo walilia kwa njaa hadi sauti zao zilisikika nje ya boma. Boycott uliharibika kupitia juhudi za watu watano wa Quraysh wenyewe waliokerwa na ukatili wake.' },
        { kind: 'h3', text: 'Mwaka wa Huzuni' },
        { kind: 'p', text: 'Mwaka wa kumi wa unabii ulijulikana kama "Mwaka wa Huzuni" (Aam al-Huzn). Katika mwaka huu mmoja, Mtume ﷺ alipoteza watu wawili waliokuwa msingi mkubwa wa msaada wake:' },
        { kind: 'ul', items: [
          'Abu Talib — mjomba wake aliyemlinda kwa miaka kumi licha ya kutokuamini ujumbe wake. Mtume alimuomba shahada wakati wa kufa lakini akakataa, akiogopa kuwadhalilisha wenzake wa Quraysh. Hii ilikuwa huzuni kubwa kwa Mtume',
          'Khadija (RA) — mke wake mpenzi wa miaka 25 — mwanamke wa kwanza kuingia katika Uislamu, mtu aliyemfariji wakati wa mfadhaiko, mama wa watoto wake. Mtume alimkumbuka maisha yake yote akifariji'
        ] },
        { kind: 'p', text: 'Baada ya hizi hasara mbili, ulinzi wa Mtume ulipungua sana, na Quraysh wakaongeza dhuluma. Mtume akafanya safari ya Ta\'if akitafuta msaada, lakini watu wa Ta\'if walimrushia mawe na vijana wao wakambaki kwa kuvuja damu. Akarudi Makkah kwa hali ya huzuni kuu — lakini akiwa anaomba: "Ee Allah, kama hauna hasira juu yangu, basi sina jambo la kuhofiwa..."' },
        { kind: 'h3', text: 'Isra na Mi\'raj' },
        { kind: 'p', text: 'Katika kipindi hiki cha huzuni, Allah akampa Mtume ﷺ faraja kuu — Isra na Mi\'raj. Usiku mmoja, Mtume alichukuliwa kutoka Makkah hadi Bayt al-Maqdis (Yerusalemu) — hii inaitwa Isra. Kisha akapandishwa katika mbingu saba, akakutana na mitume waliotangulia, na hatimaye akafika mahali pa juu zaidi mbele ya Allah — hii inaitwa Mi\'raj. Katika safari hii, Allah akawajibisha swala tano juu yake na umma wake. Tukio hili limerekodiwa katika Al-Isra (17:1) na hadith nyingi.' },
      ],
      [
        { kind: 'h2', text: 'أنواع الاضطهاد' },
        { kind: 'p', text: 'لما جهر النبي ﷺ بالدعوة إلى التوحيد اشتدّت قريش في معاداته. وكانت أنواع التعذيب التي لقيها المسلمون الأوائل متنوعة — للأشراف اضطهاد معنوي واقتصادي، وللضعفاء تعذيب جسدي حتى الموت.' },
        { kind: 'h3', text: 'الاضطهاد المعنوي' },
        { kind: 'ul', items: [
          'السخرية والوصف بالجنون والسحر',
          'مقاطعة المسلمين تجارياً',
          'طرد المسلمين من بيوت أهلهم',
          'إلقاء الأذى في طريق النبي ﷺ',
          'استئجار الشعراء لمعارضة دعوته'
        ] },
        { kind: 'h3', text: 'تعذيب الضعفاء' },
        { kind: 'p', text: 'كان أصحاب الحماية القبلية كالنبي ﷺ تحت أبي طالب، وأبي بكر تاجراً، يحظون بحماية نسبية. أما الموالي والعبيد والنساء الفقيرات فقد لقوا تعذيباً جسدياً:' },
        { kind: 'ul', items: [
          'بلال بن رباح رضي الله عنه — وُضع على رمضاء مكة وعلى صدره صخرة، فيقول: "أحد، أحد"',
          'سمية بنت خياط — أم عمار — استُشهدت أول شهيدة في الإسلام طعنها أبو جهل',
          'خبّاب بن الأرتّ — وُضع على جمر النار حتى انطفأ بشحم ظهره',
          'مصعب بن عمير — كان من أغنى شباب مكة، طردته أمه فصار في فقر شديد'
        ] },
        { kind: 'h3', text: 'الهجرة إلى الحبشة' },
        { kind: 'p', text: 'لما رأى النبي ﷺ شدة ما يلقاه أصحابه أمرهم بالهجرة إلى الحبشة عند ملك نصراني عادل هو النجاشي. فهاجرت في السنة الخامسة من البعثة المجموعة الأولى نحو ١٦ شخصاً برئاسة عثمان بن عفان وزوجه رقية بنت محمد. ثم لحقت مجموعة ثانية أكثر من ٨٠.' },
        { kind: 'p', text: 'أرسلت قريش عمرو بن العاص وعبد الله بن أبي ربيعة بهدايا للنجاشي ليُسلمهم المسلمين. فاستمع النجاشي للجانبين، وطلب من جعفر بن أبي طالب شرح الإسلام. فألقى جعفر خطبته الشهيرة. فبكى النجاشي حين سمع آيات سورة مريم، ورفض هدايا قريش، وأقام المسلمين في حماه.' },
        { kind: 'h3', text: 'الحصار في شعب أبي طالب' },
        { kind: 'p', text: 'لما عجزت قريش عن إيقاف النبي ﷺ بالاضطهاد الفردي قاطعت بني هاشم وبني المطلب جميعاً. وعلّقوا صحيفة في الكعبة بحظر المناكحة والمبايعة. واستمر الحصار ثلاث سنوات، أكلوا فيها أوراق الشجر والجلود حتى سُمعت أصوات صبيانهم من الجوع.' },
        { kind: 'h3', text: 'عام الحزن' },
        { kind: 'p', text: 'في السنة العاشرة من البعثة فقد النبي ﷺ:' },
        { kind: 'ul', items: [
          'عمّه أبا طالب — حاميه طوال عقد، توفي على الشرك',
          'زوجه خديجة رضي الله عنها — أم المؤمنين الأولى'
        ] },
        { kind: 'p', text: 'فضعفت حمايته فاشتدت قريش. وذهب النبي ﷺ إلى الطائف يطلب النصرة فآذاه أهلها وسلّطوا عليه الصبيان حتى أدمت قدماه. ودعا الدعاء المعروف: "اللهم إن لم يكن بك علي غضب فلا أبالي..."' },
        { kind: 'h3', text: 'الإسراء والمعراج' },
        { kind: 'p', text: 'وفي هذه الفترة من الحزن أكرم الله نبيه ﷺ بالإسراء والمعراج. فأُسري به من مكة إلى بيت المقدس، ثم عُرج به إلى السماوات السبع، وفُرضت الصلوات الخمس. ذُكر هذا في الإسراء (١٧:١) وأحاديث كثيرة.' },
      ],
      [
        { kind: 'h2', text: 'Forms of Persecution' },
        { kind: 'p', text: "After the Prophet ﷺ began publicly calling people to Tawhid, Quraysh's hostility intensified. The persecution endured by the early Muslims took many forms — moral and economic for those of high standing, brutal physical torture for the vulnerable that sometimes ended in death." },
        { kind: 'h3', text: 'Moral and Economic Persecution' },
        { kind: 'p', text: 'Quraysh used various tactics to suppress the Prophet ﷺ and his followers:' },
        { kind: 'ul', items: [
          'Mocking him and calling him a "madman" or "sorcerer" in public assemblies',
          'Cutting Muslims off from trade and community services',
          'Disowning Muslims from their families',
          'Throwing filth in the Prophet\'s path and at his door',
          'Hiring poets to compose verse against his message'
        ] },
        { kind: 'h3', text: 'Physical Torture of the Weak' },
        { kind: 'p', text: 'Muslims with strong tribal protection — like the Prophet ﷺ under Abu Talib, or Abu Bakr the merchant — enjoyed some shelter. But slaves, ordinary women, and outsiders faced physical persecution:' },
        { kind: 'ul', items: [
          'Bilal ibn Rabah (RA), the Abyssinian slave, was laid on the burning desert sand with a heavy stone placed on his chest — he answered only with a single word: "Ahad! Ahad!" (One! One!)',
          'Sumayya bint Khayyat and her husband Yasir, parents of Ammar, were tortured until Sumayya became the first martyr of Islam, struck down by Abu Jahl',
          'Khabbab ibn al-Aratt was placed on burning coals until they were extinguished by the flesh of his own back, yet he remained firm in his faith',
          "Mus'ab ibn Umayr, a youth of one of Makkah's wealthiest families, was disowned by his mother and reduced to poverty so severe his garments became patched and worn"
        ] },
        { kind: 'h3', text: 'The Migration to Abyssinia' },
        { kind: 'p', text: 'When the Prophet ﷺ saw his followers\' suffering grow unbearable, he advised them to migrate to Abyssinia, where the Christian king an-Najashi (the Negus) was known for his justice. So in the fifth year of prophethood, the first group of Muslims — about 16, led by Uthman ibn Affan and his wife Ruqayya bint Muhammad — emigrated. Later, a second group of more than 80 joined them.' },
        { kind: 'p', text: 'Quraysh sent envoys — Amr ibn al-As and Abdullah ibn Abi Rabi\'a — bearing gifts for the Negus, asking that he return the Muslims. The Negus heard both sides and asked Ja\'far ibn Abi Talib to describe Islam. Ja\'far delivered one of the greatest speeches in history, explaining how Allah had drawn them out of ignorance through a Prophet who is truthful, trustworthy, and who commands the worship of Allah alone and noble character. The Negus wept on hearing the verses about Maryam (Mary) and Isa, refused Quraysh\'s gifts, and granted the Muslims protection.' },
        { kind: 'h3', text: 'The Great Boycott' },
        { kind: 'p', text: 'When Quraysh failed to break the Prophet ﷺ through individual persecution, they tried another tactic — a total boycott of Banu Hashim and Banu al-Muttalib (the Prophet\'s clans). They wrote a charter, hung in the Ka\'bah, that no one was to marry from them, trade with them, or speak to them. The boycott lasted three years, during which the Prophet\'s clan endured terrible hunger — eating leaves and leather. Children\'s cries of hunger could be heard outside the valley. The boycott was finally broken through the efforts of five Quraysh men disturbed by its cruelty.' },
        { kind: 'h3', text: 'The Year of Sorrow' },
        { kind: 'p', text: 'The tenth year of prophethood is known as the "Year of Sorrow" (Aam al-Huzn). In a single year, the Prophet ﷺ lost two of the great pillars of his support:' },
        { kind: 'ul', items: [
          "Abu Talib — his uncle who had protected him for ten years despite never accepting his message. The Prophet asked him for the Shahada at his deathbed, but he declined, fearing the disdain of his Quraysh peers. This grieved the Prophet deeply",
          "Khadija (RA) — his beloved wife of twenty-five years — the first woman to enter Islam, who had comforted him through every trial, mother of his children. The Prophet remembered her with love for the rest of his life"
        ] },
        { kind: 'p', text: 'After these two losses, the Prophet\'s protection was severely weakened, and Quraysh intensified their oppression. The Prophet journeyed to Ta\'if seeking support, but its people stoned him and incited their youth, until his feet bled. He returned to Makkah broken-hearted, yet making the famous supplication: "O Allah, so long as You are not angry with me, I do not mind..."' },
        { kind: 'h3', text: 'The Isra and Mi\'raj' },
        { kind: 'p', text: 'In this period of sorrow, Allah granted the Prophet ﷺ a tremendous consolation — the Isra and Mi\'raj. One night, the Prophet was taken from Makkah to Bayt al-Maqdis (Jerusalem) — known as the Isra. Then he was raised through the seven heavens, met the previous prophets, and reached the highest station before Allah — known as the Mi\'raj. During this journey, Allah ordained the five daily prayers upon him and his community. The event is recorded in Al-Isra (17:1) and many hadith.' },
      ],
    ),
    duration: '26:00',
    status: 'published',
    tags: ['sirah', 'persecution', 'patience', 'hijra', 'isra'],
    createdAt: '2026-04-07',
    updatedAt: '2026-04-07',
  },

  // ============================================
  // SIRA — Madinah
  // ============================================
  {
    id: 'l-sira-madinah-hijra',
    title: {
      sw: 'Hijra — Safari ya Kihistoria kutoka Makkah hadi Madinah',
      ar: 'الهجرة — الرحلة التاريخية من مكة إلى المدينة',
      en: 'The Hijra — The Historic Journey from Makkah to Madinah',
    },
    slug: 'hijra',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-madinah',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Maandalizi ya Hijra' },
        { kind: 'p', text: 'Mfululizo wa miaka kumi na tatu wa Da\'wa Makkah ulikuwa umefika mwisho. Quraysh walikuwa wanazidi kufanya njama za kumuua Mtume ﷺ. Wakati huo huo, kundi kutoka Yathrib (jina la asili la Madinah) lilikuwa likimjia Mtume kila Hijja kuingia katika Uislamu na kuomba aje katika mji wao. Walifanya viapo viwili — Kiapo cha Kwanza cha Aqaba (mwaka 11 wa unabii) na Kiapo cha Pili cha Aqaba (mwaka 13) — wakiahidi kumlinda Mtume kama wangelinda watoto wao.' },
        { kind: 'p', text: 'Mtume ﷺ akawapa idhini Waislamu wa Makkah waanze kuhamia Yathrib kwa hatua. Walihama kwa siri kwa siri, mtu mmoja au familia kwa wakati, hadi karibu wote walihama isipokuwa Mtume ﷺ, Abu Bakr, Ali, na wachache wa wenye udhuru.' },
        { kind: 'h3', text: 'Njama ya Mauaji' },
        { kind: 'p', text: 'Quraysh walikutana katika Dar an-Nadwah (jumba la mashauriano) kupanga jinsi ya kumzuia Mtume kuhama. Maoni mbalimbali yalitolewa, lakini hatimaye walikubaliana juu ya pendekezo la Abu Jahl: kuchagua kijana mwenye nguvu kutoka kila kabila la Quraysh, kisha wote pamoja wamkamate Mtume na kumchoma kwa silaha — ili damu yake imekwa kati ya makabila yote, na Bani Hashim wasiweze kushambulia kabila moja kwa kulipiza kisasi.' },
        { kind: 'p', text: 'Allah akamfahamisha Mtume njama hii kupitia wahyi:' },
        { kind: 'quote', text: 'وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا لِيُثْبِتُوكَ أَوْ يَقْتُلُوكَ أَوْ يُخْرِجُوكَ', cite: 'Al-Anfal 8:30' },
        { kind: 'h3', text: 'Usiku wa Hijra' },
        { kind: 'p', text: 'Mtume ﷺ alimuamuru Ali (RA) alale kitandani kwake na avae nguo zake za kawaida ili kuwadanganya wapelelezi wa Quraysh. Kisha akaenda nyumbani kwa Abu Bakr na akampasua: "Allah ameniidhinisha kuhama. Ni mimi na wewe." Abu Bakr akalia kwa furaha — alikuwa amejiandaa kwa ngamia wawili kwa ajili ya Hijra muda mrefu. Wakaacha mji usiku, wakianzia upande wa kusini badala ya kaskazini ili kuwadanganya wafuatiliaji.' },
        { kind: 'p', text: 'Quraysh walipogundua kwamba Mtume amekimbia, walitangaza tuzo kubwa — ngamia mia mbili wenye thamani — kwa atakayeleta Mtume akiwa hai au mfu.' },
        { kind: 'h3', text: 'Pango la Thawr' },
        { kind: 'p', text: 'Mtume na Abu Bakr walifika pango la Thawr kusini mwa Makkah na wakajificha humo kwa siku tatu. Wapelelezi wa Quraysu walifika hadi mlangoni mwa pango — Abu Bakr aliposhuhudia hili akahofia, akamwambia Mtume: "Ee Mtume wa Allah, kama mmoja wao angeangalia chini ya miguu yake, angetuona." Mtume akamtuliza kwa maneno ambayo Allah aliyaweka katika Qur\'an:' },
        { kind: 'quote', text: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', cite: 'At-Tawbah 9:40' },
        { kind: 'p', text: '"Usihuzunike, hakika Allah yu pamoja nasi." Allah aliwafichia kupitia mambo mengi: buibui akafuma utando mlangoni mwa pango, njiwa wakajenga kiota — vyote vikifanya pango lionekane kama halijaingiwa kwa muda mrefu.' },
        { kind: 'h3', text: 'Suraqa ibn Malik' },
        { kind: 'p', text: 'Baada ya siku tatu, Mtume na Abu Bakr wakaendelea na safari yao na mtumwa Amir ibn Fuhayra na mwongozaji asiye Mwislamu Abdullah ibn Urayqit. Walielekea kaskazini kupitia njia ya pwani isiyojulikana. Suraqa ibn Malik, akilenga tuzo la Quraysh, akawafuata. Lakini farasi wake aliporomoka chini mara mbili kabla ya kuwafikia, alipoinuka mara ya tatu na kuyaona macho ya Mtume, Mtume akamwambia: "Itakuaje wakati utakapovaa shumba mbili za Kisra?" Suraqa akasamehe na akasimama, akiomba msamaha. Mtume akampa hati ya usalama. Miaka kadhaa baadaye katika ukhalifa wa Umar, Suraqa kweli alipewa shumba mbili za Kisra wa Persia baada ya ushindi.' },
        { kind: 'h3', text: 'Kufika Madinah' },
        { kind: 'p', text: 'Watu wa Madinah walikuwa wanasubiri kwa hamu kuwasili kwa Mtume. Kila siku walikuwa wanapanda juu ya nyumba zao kuangalia. Mtume alipowasili Quba (kitongoji cha Madinah) tarehe 12 Rabi al-Awwal mwaka 622 BK, watu walifurahishwa sana. Mtume alikaa Quba kwa siku kadhaa na akajenga msikiti wa kwanza wa Uislamu — Masjid Quba, ambao Allah ulipasifu katika Qur\'an:' },
        { kind: 'quote', text: 'لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَنْ تَقُومَ فِيهِ', cite: 'At-Tawbah 9:108' },
        { kind: 'p', text: 'Kisha akapanda ngamia wake na akaingia mji. Watu wengi walitaka ngamia atulie nyumbani kwao, lakini Mtume akawaambia: "Mwacheni, ameamriwa." Ngamia akatulia mahali ambapo baadaye ulijengwa Msikiti wa Mtume — Masjid an-Nabawi.' },
        { kind: 'h3', text: 'Umuhimu wa Hijra' },
        { kind: 'p', text: 'Hijra ni tukio kuu sana katika historia ya Uislamu — ndio mwanzo wa kalenda ya Kiislamu (Hijriyya). Umar ibn al-Khattab (RA) aliichagua kama mwanzo wa kalenda kwa sababu Hijra ilibainisha mwelekeo mpya wa Uislamu — kutoka kuwa kundi la wanyonge linalopinga mateso, hadi kuwa jamii inayojenga taifa. Hijra haikuwa kukimbia tu — ilikuwa hatua iliyopangiwa, ya kimkakati, ambayo kupitia kwake Uislamu uliweza kupanua wigo wake.' },
      ],
      [
        { kind: 'h2', text: 'الإعداد للهجرة' },
        { kind: 'p', text: 'بعد ثلاث عشرة سنة من الدعوة في مكة، اشتدّ كيد قريش. وفي الوقت نفسه كان وفد من يثرب يأتون النبي ﷺ كل حج فأسلموا. وتمّت بيعتا العقبة الأولى والثانية. وأذن النبي ﷺ لأصحابه بالهجرة إلى يثرب أفراداً وأسراً، حتى لم يبقَ بمكة من المسلمين إلا النبي وأبو بكر وعلي وقليل من المعذورين.' },
        { kind: 'h3', text: 'مؤامرة الاغتيال' },
        { kind: 'p', text: 'اجتمعت قريش في دار الندوة لمنع هجرة النبي. وأخذت برأي أبي جهل: أن يختاروا من كل قبيلة فتى شجاعاً ليقتلوه جميعاً، ليتفرق دمه في القبائل فلا تستطيع بنو هاشم الانتقام من قبيلة واحدة.' },
        { kind: 'p', text: 'فأخبر الله نبيه:' },
        { kind: 'quote', text: 'وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا لِيُثْبِتُوكَ أَوْ يَقْتُلُوكَ أَوْ يُخْرِجُوكَ', cite: 'الأنفال ٨:٣٠' },
        { kind: 'h3', text: 'ليلة الهجرة' },
        { kind: 'p', text: 'أمر النبي ﷺ علياً أن ينام في فراشه ليُخدع جواسيس قريش. ثم ذهب إلى أبي بكر وقال له: إن الله أذن لي بالهجرة. فبكى أبو بكر فرحاً، وكان قد أعدّ راحلتين منذ مدة. خرجا ليلاً وذهبا جنوباً بدلاً من الشمال ليُضلّلا المتعقّبين.' },
        { kind: 'h3', text: 'غار ثور' },
        { kind: 'p', text: 'وصل النبي وأبو بكر غار ثور جنوب مكة وكمنا فيه ثلاثة أيام. ووصلت قريش إلى باب الغار. خاف أبو بكر فقال: لو نظر أحدهم إلى قدميه لرآنا. فطمأنه النبي:' },
        { kind: 'quote', text: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', cite: 'التوبة ٩:٤٠' },
        { kind: 'p', text: 'وستر الله بنسج العنكبوت وبيض الحمام على باب الغار.' },
        { kind: 'h3', text: 'سراقة بن مالك' },
        { kind: 'p', text: 'بعد ثلاثة أيام انطلق النبي وأبو بكر مع الخادم عامر بن فهيرة والدليل عبد الله بن أريقط. اتجهوا شمالاً عبر الساحل. فلحق بهم سراقة طمعاً في جائزة قريش، لكن فرسه ساخت ثلاث مرات، فاستأمن وأطلقه النبي ووعده بسواري كسرى. وفعلاً نالها زمن عمر بعد فتح الفرس.' },
        { kind: 'h3', text: 'الوصول إلى المدينة' },
        { kind: 'p', text: 'كان أهل المدينة يترقبون قدوم النبي ﷺ كل يوم. ووصل قباء يوم ١٢ ربيع الأول سنة ٦٢٢ م، فبنى أول مسجد في الإسلام — مسجد قباء.' },
        { kind: 'quote', text: 'لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَنْ تَقُومَ فِيهِ', cite: 'التوبة ٩:١٠٨' },
        { kind: 'p', text: 'ثم دخل المدينة. كان كل بطن يريد إنزاله، فقال: "خلّوها فإنها مأمورة." فبركت في المكان الذي بُني فيه المسجد النبوي.' },
        { kind: 'h3', text: 'أهمية الهجرة' },
        { kind: 'p', text: 'الهجرة حدث جلل في تاريخ الإسلام، وبها أرّخ المسلمون بعهد عمر رضي الله عنه. فقد كانت تحوّلاً من دعوة المضطهدين إلى بناء الأمة.' },
      ],
      [
        { kind: 'h2', text: 'Preparation for the Hijra' },
        { kind: 'p', text: "Thirteen years of da'wa in Makkah had reached their limit. Quraysh was actively plotting to assassinate the Prophet ﷺ. At the same time, a delegation from Yathrib (the original name of Madinah) had been visiting the Prophet at every Hajj season, accepting Islam and inviting him to their city. Two pledges were made — the First Pledge of Aqaba (year 11 of prophethood) and the Second Pledge of Aqaba (year 13) — in which they vowed to protect the Prophet as they would protect their own children." },
        { kind: 'p', text: 'The Prophet ﷺ then permitted the Muslims of Makkah to begin migrating to Yathrib. They left in secret, individuals or families at a time, until nearly all had emigrated except the Prophet ﷺ, Abu Bakr, Ali, and a few of the excused.' },
        { kind: 'h3', text: 'The Plot to Kill Him' },
        { kind: 'p', text: "Quraysh assembled at Dar an-Nadwah (the council house) to plan how to stop the Prophet from emigrating. After various proposals, they settled on Abu Jahl's plan: choose a strong young man from each Quraysh clan, and together they would seize the Prophet and strike him with their swords — so that his blood would be distributed among all the clans, and Banu Hashim could not retaliate against any single tribe." },
        { kind: 'p', text: 'Allah informed the Prophet of the plot through revelation:' },
        { kind: 'quote', text: '"And [remember] when those who disbelieved plotted against you to detain you, kill you, or banish you."', cite: 'Al-Anfal 8:30' },
        { kind: 'h3', text: 'The Night of the Hijra' },
        { kind: 'p', text: 'The Prophet ﷺ instructed Ali (RA) to sleep in his bed wearing his usual cloak to deceive the Quraysh watchers. Then he went to Abu Bakr\'s house and told him: "Allah has permitted me to emigrate. It is you and I." Abu Bakr wept for joy — he had been preparing two camels for the Hijra for some time. They left the city by night, heading south rather than north to mislead any pursuers.' },
        { kind: 'p', text: 'When Quraysh discovered the Prophet had escaped, they announced an enormous reward — one hundred camels for whoever brought him back, alive or dead.' },
        { kind: 'h3', text: 'The Cave of Thawr' },
        { kind: 'p', text: 'The Prophet and Abu Bakr reached the Cave of Thawr south of Makkah and concealed themselves inside for three days. Quraysh trackers came right up to the mouth of the cave. When Abu Bakr saw their feet, he feared and said: "O Messenger of Allah, if any of them looked down at his feet, he would see us." The Prophet calmed him with words Allah preserved in the Qur\'an:' },
        { kind: 'quote', text: '"Do not grieve. Indeed, Allah is with us."', cite: 'At-Tawbah 9:40' },
        { kind: 'p', text: 'Allah concealed them through many signs: a spider wove a web at the cave\'s entrance, doves built a nest — all making the cave appear undisturbed for ages.' },
        { kind: 'h3', text: 'Suraqa ibn Malik' },
        { kind: 'p', text: 'After three days, the Prophet and Abu Bakr continued their journey with the servant Amir ibn Fuhayra and a non-Muslim guide Abdullah ibn Urayqit. They travelled north along an unfamiliar coastal route. Suraqa ibn Malik, drawn by the Quraysh reward, pursued them. But his horse stumbled twice before he could reach them. When he stood the third time and saw the Prophet\'s face, the Prophet said to him: "What if you were to wear the two bracelets of Khosrau?" Suraqa was overcome and turned back, asking forgiveness. The Prophet gave him a writ of safety. Years later, in Umar\'s caliphate, Suraqa was indeed presented with the two bracelets of the Persian emperor after the conquest of Persia.' },
        { kind: 'h3', text: 'Arrival in Madinah' },
        { kind: 'p', text: 'The people of Madinah had been awaiting the Prophet\'s arrival with intense longing. Each day they climbed onto their roofs to watch. When the Prophet arrived in Quba (a settlement just outside Madinah) on the 12th of Rabi al-Awwal in the year 622 CE, the people overflowed with joy. The Prophet remained in Quba for several days and built the first mosque of Islam — Masjid Quba, which Allah praised in the Qur\'an:' },
        { kind: 'quote', text: '"A mosque founded on piety from the first day is more deserving for you to stand in."', cite: 'At-Tawbah 9:108' },
        { kind: 'p', text: 'Then he mounted his camel and entered the city itself. Many wanted his camel to halt at their home, but the Prophet said: "Leave it; it is under command." The camel finally rested at the spot where the Prophet\'s Mosque — Masjid an-Nabawi — would later be built.' },
        { kind: 'h3', text: 'The Significance of the Hijra' },
        { kind: 'p', text: 'The Hijra is a tremendous event in Islamic history — it is the start of the Islamic calendar (Hijri). Umar ibn al-Khattab (RA) chose it as the calendar\'s starting point because the Hijra marked a fundamental turning point for Islam — from being a persecuted minority resisting oppression, to being a community building a nation. The Hijra was not merely flight — it was a planned, strategic step through which Islam was able to expand its scope.' },
      ],
    ),
    duration: '24:00',
    status: 'published',
    tags: ['sirah', 'hijra', 'madinah', 'thawr'],
    createdAt: '2026-04-10',
    updatedAt: '2026-04-10',
  },

  {
    id: 'l-sira-madinah-jamii',
    title: {
      sw: 'Kujenga Jamii ya Kiislamu Madinah',
      ar: 'بناء المجتمع المسلم في المدينة',
      en: 'Building the Muslim Community in Madinah',
    },
    slug: 'kujenga-jamii-ya-kiislamu',
    subjectId: 'sira',
    levelId: 'awali',
    courseId: 'sira-madinah',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Hatua Tatu Kuu Mwanzoni' },
        { kind: 'p', text: 'Mtume ﷺ alipokuwa Madinah, mara moja akaanza hatua tatu zilizojenga msingi wa jamii ya Kiislamu — hatua ambazo bado zinatumika kama mwongozo wa jinsi ya kujenga jamii imara ya kidini popote pale duniani.' },
        { kind: 'h3', text: '1. Kujenga Msikiti' },
        { kind: 'p', text: 'Hatua ya kwanza ilikuwa kujenga msikiti — Masjid an-Nabawi. Mahali ambapo ngamia wa Mtume aliposimama palikuwa shamba la kuchuma tende lililomilikiwa na watoto wawili yatima. Mtume akalipa thamani yake na akajenga msikiti pale. Ujenzi ulikuwa wa kinyenyekevu — kuta za udongo, dari ya makuti ya mitende, sakafu ya mchanga. Mtume mwenyewe alichukua matofali na kufanya kazi pamoja na maswahaba wake.' },
        { kind: 'p', text: 'Msikiti haukuwa tu mahali pa kuswali — ulikuwa kituo cha jamii: shule ya kufundisha, mkutano wa mashauriano, makao ya wageni wasio na nyumba (Ahl as-Suffa), na kituo cha kuanzia katika maamuzi ya kisiasa na kijeshi. Hii inaonyesha kwamba dini katika Uislamu ni kamili — haiwezi kutenganishwa na maisha ya kawaida.' },
        { kind: 'h3', text: '2. Mu\'akhah — Undugu kati ya Muhajirun na Ansar' },
        { kind: 'p', text: 'Hatua ya pili ilikuwa kuanzisha undugu rasmi kati ya wahamiaji (Muhajirun) waliotoka Makkah na watu wa asili wa Madinah (Ansar — Wasaidizi). Mtume akawaita jozi na kila mmoja akamuunganisha na ndugu yake. Undugu huu haukuwa wa kilugha tu — ulikuwa wa kweli wa kifamilia. Wansari walishiriki nyumba zao, mali zao, hata wengi walitaka kuwapa wakeze ndugu zao kuwaoa baada ya talaka, ingawa Mtume alizuia hili.' },
        { kind: 'p', text: 'Sa\'d ibn ar-Rabi\' alimwambia ndugu yake Abdur-Rahman ibn Awf: "Nina ndugu wawili wa wakeze; chukua mmoja, nitamtaliki, kisha umuoe." Abdur-Rahman akamshukuru lakini akamwambia: "Allah akubariki katika familia yako na mali yako. Nielekeze tu sokoni." Akaenda sokoni, akaanza biashara, na ndani ya muda mfupi alikuwa miongoni mwa Waislamu matajiri zaidi. Hii inaonyesha sifa za pande zote — ukarimu wa Ansar na utu wa kujitegemea wa Muhajirun.' },
        { kind: 'h3', text: '3. Mkataba wa Madinah' },
        { kind: 'p', text: 'Hatua ya tatu ilikuwa kuandika "Sahifat al-Madinah" — Mkataba wa Madinah — hati ya kisheria iliyoanzisha uhusiano kati ya Waislamu, Wayahudi, na makabila mengine ya Madinah. Mkataba huu ni kati ya hati za kwanza za kihistoria ulimwenguni zinazoanzisha jamii yenye dini mbalimbali kwa msingi wa haki za pamoja.' },
        { kind: 'p', text: 'Mambo makuu ya mkataba:' },
        { kind: 'ul', items: [
          'Waislamu na Wayahudi wote ni umma mmoja kwa malengo ya kisiasa na ulinzi wa nchi',
          'Kila kundi lina dini yake — hakuna kulazimishwa',
          'Mizozo kati ya makundi hutatuliwa kwa kushauriana na Mtume ﷺ',
          'Hakuna mgeni anaweza kupata ulinzi bila idhini ya Mtume ﷺ',
          'Madinah ni mji takatifu — haitumiki kuanzisha vita ndani yake'
        ] },
        { kind: 'h3', text: 'Maendeleo ya Kijeshi na Kiuchumi' },
        { kind: 'p', text: 'Baada ya msingi wa jamii kuanzishwa, Quraysh waliendelea kupinga. Vita kuu zilipitiwa katika kipindi cha Madinah:' },
        { kind: 'ul', items: [
          'Vita ya Badr (mwaka 2 H) — mwanzo wa ushindi mkubwa wa kwanza wa Waislamu',
          'Vita ya Uhud (mwaka 3 H) — somo la utii kwa Mtume baada ya wapiga mishale walipoacha mahali walipopangiwa',
          'Vita ya Khandaq (Handaki) (mwaka 5 H) — Waislamu walitumia mbinu ya handaki la ulinzi',
          'Mkataba wa Hudaybiyya (mwaka 6 H) — uliokuwa "ushindi" wa kidiplomasia uliopelekea kuongezeka kwa Waislamu',
          'Ushindi wa Makkah (mwaka 8 H) — kurudi kwa Mtume Makkah kama mshindi, akiwa amesamehe wapinzani wake wa zamani'
        ] },
        { kind: 'h3', text: 'Sifa za Jamii ya Mtume ﷺ' },
        { kind: 'p', text: 'Jamii iliyojengwa Madinah ilikuwa na sifa kuu zifuatazo zinazopaswa kuwa kielelezo cha jamii zote za Kiislamu:' },
        { kind: 'ul', items: [
          'Tawhidi — msingi wa kila kitu, ujumbe wa kwanza wa Mtume',
          'Maadili mema — Mtume mwenyewe alisema: "Nimetumwa kukamilisha tabia njema" (Ahmad)',
          'Haki na usawa — kila mtu chini ya sheria, hata Mtume mwenyewe',
          'Huruma na kujenga — kushiriki rasilmali na kuwakaribisha wahitaji',
          'Elimu — Mtume aliwafundisha maswahaba kila siku, na maswahaba walifundisha wengine',
          'Ushauri — Mtume aliwauliza maswahaba katika maamuzi makubwa kabla ya kuamua'
        ] },
        { kind: 'h3', text: 'Hutuba ya Mwisho' },
        { kind: 'p', text: 'Katika mwaka wa kumi wa Hijra, Mtume ﷺ akafanya Hajj yake ya pekee — Hijjat al-Wada\' (Hijja ya Kuaga). Pamoja na karibu Waislamu 100,000, alipanda mlima wa Arafah na akatoa hutuba kuu inayojulikana na sehemu zake za muhimu. Akasisitiza:' },
        { kind: 'ul', items: [
          'Utakatifu wa damu, mali, na heshima ya kila Mwislamu',
          'Kumalizika kwa unyanyasaji wa kabla ya Uislamu — hakuna ribaa, hakuna damu ya zamani',
          'Haki za wanawake katika ndoa',
          'Usawa wa watu wote — "Hakuna ubora wa Mwarabu juu ya asiye Mwarabu... isipokuwa kwa taqwa"',
          'Kufuata Qur\'an na Sunnah baada ya kuondoka kwake'
        ] },
        { kind: 'p', text: 'Aya ya mwisho ya Qur\'an iliteremshwa wakati wa Hijja hii:' },
        { kind: 'quote', text: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا', cite: 'Al-Maidah 5:3' },
        { kind: 'p', text: 'Miezi mitatu baadaye, Mtume ﷺ akafariki Madinah, akiwa na umri wa miaka 63, akiacha umma uliokuwa umejengwa juu ya msingi imara wa Tawhidi, maadili, na undugu.' },
      ],
      [
        { kind: 'h2', text: 'الخطوات الثلاث الأولى' },
        { kind: 'p', text: 'لما وصل النبي ﷺ المدينة بدأ بثلاث خطوات أسّست المجتمع المسلم — خطوات لا تزال نموذجاً لبناء أيّ مجتمع إسلامي.' },
        { kind: 'h3', text: '١. بناء المسجد' },
        { kind: 'p', text: 'كان أول عمل بناء المسجد النبوي. وكان موضع بروك الناقة مربد ليتيمين، فاشتراه النبي ﷺ منهما. وبني المسجد بسيطاً — جدران من الطوب وسقف من جريد النخل وأرضية من الرمل. وعمل النبي ﷺ بنفسه مع الصحابة في البناء.' },
        { kind: 'p', text: 'لم يكن المسجد للصلاة فحسب — بل مدرسة وقاعة شورى ومأوى لأهل الصفّة وملتقى للقرارات السياسية والعسكرية. فالدين في الإسلام شامل لا يُفصل عن الحياة.' },
        { kind: 'h3', text: '٢. المؤاخاة' },
        { kind: 'p', text: 'الخطوة الثانية المؤاخاة بين المهاجرين والأنصار. آخى النبي ﷺ بين كل اثنين فصارا أخوين حقيقيين. تشاطر الأنصار بيوتهم وأموالهم. قال سعد بن الربيع لأخيه عبد الرحمن بن عوف: "لي زوجتان، أُطلّق إحداهما وتزوجها." قال: "بارك الله لك في أهلك ومالك، دلّني على السوق." فذهب وتاجر، وما لبث أن صار من أغنى المسلمين.' },
        { kind: 'h3', text: '٣. صحيفة المدينة' },
        { kind: 'p', text: 'كتب النبي ﷺ "صحيفة المدينة" التي نظّمت العلاقة بين المسلمين واليهود وقبائل المدينة. ومن أهم بنودها:' },
        { kind: 'ul', items: [
          'المسلمون واليهود أمة واحدة في الدفاع عن المدينة',
          'لكل قوم دينهم',
          'حلّ النزاعات بالشورى والرجوع إلى النبي ﷺ',
          'لا يُجار مغرّب إلا بإذن النبي ﷺ',
          'المدينة حرم لا يُحارب فيها'
        ] },
        { kind: 'h3', text: 'التطورات العسكرية والاقتصادية' },
        { kind: 'ul', items: [
          'غزوة بدر (٢ هـ) — أول نصر كبير',
          'غزوة أحد (٣ هـ) — درس في الطاعة',
          'غزوة الخندق (٥ هـ)',
          'صلح الحديبية (٦ هـ)',
          'فتح مكة (٨ هـ)'
        ] },
        { kind: 'h3', text: 'صفات المجتمع النبوي' },
        { kind: 'ul', items: [
          'التوحيد',
          'الأخلاق',
          'العدل والمساواة',
          'الرحمة والتعاون',
          'العلم',
          'الشورى'
        ] },
        { kind: 'h3', text: 'حجة الوداع' },
        { kind: 'p', text: 'في السنة العاشرة حج النبي ﷺ حجة الوداع، وخطب على عرفة بحضور نحو ١٠٠ ألف. ومن أعظم وصاياه:' },
        { kind: 'ul', items: [
          'حرمة الدم والمال والعرض',
          'إبطال ربا الجاهلية وثأرها',
          'حقوق المرأة',
          'لا فضل لعربي على عجمي إلا بالتقوى',
          'الاعتصام بالقرآن والسنة'
        ] },
        { kind: 'quote', text: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا', cite: 'المائدة ٥:٣' },
        { kind: 'p', text: 'وبعد ثلاثة أشهر توفي النبي ﷺ في المدينة عن ٦٣ سنة، تاركاً أمة قائمة على التوحيد والأخلاق والأخوة.' },
      ],
      [
        { kind: 'h2', text: 'Three Foundational Steps' },
        { kind: 'p', text: "When the Prophet ﷺ arrived in Madinah, he immediately undertook three steps that established the foundation of the Muslim community — steps that remain a model for how to build a strong religious community anywhere in the world." },
        { kind: 'h3', text: '1. Building the Mosque' },
        { kind: 'p', text: "The first step was building the mosque — Masjid an-Nabawi. The spot where the Prophet's camel had stopped was a date-drying yard owned by two orphan boys. The Prophet paid them its full price and built the mosque there. Construction was humble — mud walls, a roof of palm fronds, sandy floor. The Prophet himself carried bricks and worked alongside the Companions." },
        { kind: 'p', text: "The mosque was not merely a place of prayer — it was the community centre: a school, a council chamber, a shelter for the homeless (Ahl as-Suffa), and the headquarters for political and military decisions. This shows that religion in Islam is comprehensive — it cannot be separated from ordinary life." },
        { kind: 'h3', text: "2. Mu'akhah — Brotherhood Between Muhajirun and Ansar" },
        { kind: 'p', text: "The second step was to establish formal brotherhood between the emigrants from Makkah (Muhajirun) and the natives of Madinah (Ansar — the Helpers). The Prophet paired them up, and each became a true brother to the other. This brotherhood was no mere phrase — it was familial in the fullest sense. The Ansar shared their homes, their wealth; many even offered to divorce one of their wives so that an emigrant brother could marry her, though the Prophet forbade this." },
        { kind: 'p', text: "Sa'd ibn ar-Rabi' said to his brother Abdur-Rahman ibn Awf: 'I have two wives; choose one, I will divorce her, and you may marry her after her waiting period.' Abdur-Rahman thanked him and replied: 'May Allah bless you in your family and your wealth. Just direct me to the marketplace.' He went to the market, began trading, and within a short time was among the wealthiest of the Muslims. This story shows the qualities of both sides — the generosity of the Ansar and the dignified self-reliance of the Muhajirun." },
        { kind: 'h3', text: '3. The Constitution of Madinah' },
        { kind: 'p', text: '"Sahifat al-Madinah" — the Constitution of Madinah — was the third step: a written legal document establishing relations between the Muslims, the Jewish tribes, and the other communities of Madinah. It is among the earliest historical documents in the world establishing a multi-religious society on the basis of shared rights.' },
        { kind: 'p', text: 'Among its key provisions:' },
        { kind: 'ul', items: [
          'Muslims and Jews together formed one community for purposes of common defence',
          'Each group retained its own religion — none was forced upon another',
          'Disputes between groups were referred to the Prophet ﷺ',
          'No outsider could receive protection without the Prophet\'s permission',
          'Madinah itself was a sanctuary city — no warfare permitted within it'
        ] },
        { kind: 'h3', text: 'Military and Economic Developments' },
        { kind: 'p', text: 'Once the foundation was laid, Quraysh continued their opposition. Major battles took place during the Madinan period:' },
        { kind: 'ul', items: [
          'The Battle of Badr (year 2 AH) — the first decisive Muslim victory',
          'The Battle of Uhud (year 3 AH) — a lesson in obedience after the archers left their assigned position',
          'The Battle of the Trench (Khandaq) (year 5 AH) — the Muslims employed defensive trench warfare',
          'The Treaty of Hudaybiyya (year 6 AH) — a diplomatic "victory" that led to dramatic Muslim growth',
          'The Conquest of Makkah (year 8 AH) — the Prophet returned victorious, having forgiven his former oppressors'
        ] },
        { kind: 'h3', text: "Qualities of the Prophet's Community ﷺ" },
        { kind: 'p', text: 'The community built in Madinah possessed key qualities that should remain a model for all Muslim societies:' },
        { kind: 'ul', items: [
          "Tawhid — the foundation of everything, the Prophet's first message",
          'Excellent character — the Prophet himself said: "I was sent to perfect noble character" (Ahmad)',
          'Justice and equality — every person under the law, including the Prophet himself',
          'Compassion and constructiveness — sharing resources and welcoming the needy',
          'Knowledge — the Prophet taught the Companions daily, and they taught others',
          'Consultation — the Prophet sought the Companions\' counsel in major decisions before deciding'
        ] },
        { kind: 'h3', text: 'The Farewell Sermon' },
        { kind: 'p', text: "In the tenth year of the Hijra, the Prophet ﷺ performed his only Hajj — Hijjat al-Wada' (the Farewell Pilgrimage). With nearly 100,000 Muslims, he ascended Mount Arafat and delivered his great sermon. Among its central points:" },
        { kind: 'ul', items: [
          'The sanctity of every Muslim\'s life, property, and honour',
          'The abolition of pre-Islamic injustices — no riba, no old blood-feuds',
          'The rights of women in marriage',
          'The equality of all human beings — "There is no superiority of an Arab over a non-Arab... except by taqwa"',
          'The duty to hold fast to the Qur\'an and Sunnah after his departure'
        ] },
        { kind: 'p', text: "The final verse of the Qur'an was revealed during this Hajj:" },
        { kind: 'quote', text: '"This day I have perfected for you your religion, completed My favour upon you, and chosen Islam as your religion."', cite: 'Al-Maidah 5:3' },
        { kind: 'p', text: 'Three months later, the Prophet ﷺ passed away in Madinah at the age of sixty-three, leaving behind a community built on the firm foundation of Tawhid, character, and brotherhood.' },
      ],
    ),
    duration: '28:00',
    status: 'published',
    tags: ['sirah', 'madinah', 'community', 'farewell-sermon'],
    createdAt: '2026-04-13',
    updatedAt: '2026-04-13',
  },

  // ============================================
  // ADHKAR — Asubuhi & Jioni
  // ============================================
  {
    id: 'l-adhkar-asubuhi',
    title: {
      sw: 'Adhkar za Asubuhi',
      ar: 'أذكار الصباح',
      en: 'Morning Adhkar (Remembrances)',
    },
    slug: 'adhkar-za-asubuhi',
    subjectId: 'adhkar',
    levelId: 'awali',
    courseId: 'adhkar-asubuhi-jioni',
    order: 1,
    content: richContent(
      [
        { kind: 'h2', text: 'Umuhimu wa Adhkar za Asubuhi' },
        { kind: 'p', text: 'Adhkar za asubuhi ni dhikri zilizothibitishwa kutoka kwa Mtume ﷺ ambazo zinasomwa kati ya swala ya Alfajiri na jua kupanda. Ni ngao ya kiroho inayomlinda Mwislamu kwa siku nzima dhidi ya shari za jinni, watu, na mambo ya nje.' },
        { kind: 'p', text: 'Allah amesema:' },
        { kind: 'quote', text: 'وَاذْكُرْ رَبَّكَ كَثِيرًا وَسَبِّحْ بِالْعَشِيِّ وَالْإِبْكَارِ', cite: 'Aal Imran 3:41' },
        { kind: 'p', text: '"Mkumbuke Mola wako kwa wingi, na mtukuze jioni na asubuhi." Aya hii ndiyo msingi wa adhkar za asubuhi na jioni.' },
        { kind: 'h3', text: 'Ayat al-Kursi' },
        { kind: 'p', text: 'Mtume ﷺ alisema: "Atakayeisoma Ayat al-Kursi asubuhi, atakuwa chini ya ulinzi wa Allah hadi jioni; na atakayeisoma jioni, atakuwa chini ya ulinzi hadi asubuhi" (Al-Hakim). Ayat al-Kursi (aya ya Kiti cha Enzi) ni aya ya 255 ya Sura Al-Baqarah.' },
        { kind: 'quote', text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ', cite: "Al-Baqarah 2:255" },
        { kind: 'h3', text: 'Sura Tatu za Mwisho — Mu\'awwidhat' },
        { kind: 'p', text: 'Mtume ﷺ alisema: "Soma Qul Huwa Allahu Ahad na Mu\'awwidhatayn (Al-Falaq na An-Nas) mara tatu asubuhi na jioni — zitakutosha katika kila kitu" (Abu Dawud na Tirmidhi).' },
        { kind: 'ul', items: [
          'Sura Al-Ikhlas (112) — mara tatu',
          'Sura Al-Falaq (113) — mara tatu',
          'Sura An-Nas (114) — mara tatu'
        ] },
        { kind: 'h3', text: 'Dua ya Asubuhi' },
        { kind: 'p', text: 'Hii ni mojawapo ya dua maarufu zaidi za Mtume ﷺ asubuhi:' },
        { kind: 'quote', text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ' },
        { kind: 'p', text: 'Maana: "Tumeingia asubuhi, na ufalme wote ni wa Allah; sifa zote ni za Allah; hakuna mola apasaye kuabudiwa ila Allah pekee, hana mshirika; ufalme ni wake na sifa ni zake, naye ana uwezo juu ya kila kitu." Imepokelewa na Muslim.' },
        { kind: 'h3', text: 'Dhikri za Tasbih, Tahmid, na Takbir' },
        { kind: 'p', text: 'Mtume ﷺ alisema: "Atakayesema asubuhi na jioni, \'Subhana Allahi wa bihamdihi\' mara mia moja, dhambi zake zitafutwa hata kama ni nyingi kama povu la bahari" (Bukhari na Muslim). Pia ni sunna kusema:' },
        { kind: 'ul', items: [
          '"Subhana Allah" mara 33',
          '"Alhamdu lillah" mara 33',
          '"Allahu Akbar" mara 34'
        ] },
        { kind: 'h3', text: 'Dua ya Sayyid al-Istighfar' },
        { kind: 'p', text: 'Mtume ﷺ alisema: "Bwana wa kuomba msamaha (Sayyid al-Istighfar) ni:' },
        { kind: 'quote', text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ' },
        { kind: 'p', text: '"Atakayeisoma asubuhi akiwa anaiamini kwa moyo, akafa siku hiyo kabla ya jioni, ni miongoni mwa watu wa peponi; na atakayeisoma jioni akiwa anaiamini kwa moyo, akafa kabla ya asubuhi, ni miongoni mwa watu wa peponi" (Bukhari).' },
        { kind: 'h3', text: 'Dua za Ulinzi' },
        { kind: 'p', text: 'Dua nyingine zilizothibitishwa za asubuhi:' },
        { kind: 'ul', items: [
          '"A\'udhu bi kalimat-illah at-tammat min sharri ma khalaq" (Najikinga kwa maneno kamili ya Allah dhidi ya shari ya alichoiumba) — mara tatu — Muslim',
          '"Bismillahi alladhi la yadurru ma\'a-smihi shay\'un fi al-ardi wa la fi as-samai wa Huwa as-Sami\'u-l-Alim" (Kwa jina la Allah ambayo na jina lake hakuna kinachodhuru kwa mbingu wala ardhini, na yeye ni Mwenye Kusikia, Mwenye Kujua) — mara tatu — Abu Dawud na Tirmidhi'
        ] },
      ],
      [
        { kind: 'h2', text: 'أهمية أذكار الصباح' },
        { kind: 'p', text: 'أذكار الصباح أذكار ثابتة عن النبي ﷺ تُقرأ بين صلاة الفجر وطلوع الشمس. وهي درع روحي يحمي المسلم طوال اليوم من شرور الجن والإنس والأذى.' },
        { kind: 'quote', text: 'وَاذْكُرْ رَبَّكَ كَثِيرًا وَسَبِّحْ بِالْعَشِيِّ وَالْإِبْكَارِ', cite: 'آل عمران ٣:٤١' },
        { kind: 'h3', text: 'آية الكرسي' },
        { kind: 'p', text: 'قال ﷺ: "من قرأ آية الكرسي حين يصبح أُجير من الجن حتى يمسي، ومن قالها حين يمسي أُجير منهم حتى يصبح" (الحاكم).' },
        { kind: 'quote', text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ', cite: 'البقرة ٢:٢٥٥' },
        { kind: 'h3', text: 'المعوذات الثلاث' },
        { kind: 'p', text: 'قال ﷺ: "اقرأ قل هو الله أحد، والمعوذتين، حين تمسي وحين تصبح، ثلاث مرات تكفيك من كل شيء" (أبو داود والترمذي).' },
        { kind: 'ul', items: [
          'الإخلاص ثلاثاً',
          'الفلق ثلاثاً',
          'الناس ثلاثاً'
        ] },
        { kind: 'h3', text: 'دعاء الصباح المشهور' },
        { kind: 'quote', text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ' },
        { kind: 'p', text: 'رواه مسلم.' },
        { kind: 'h3', text: 'التسبيح والتحميد والتكبير' },
        { kind: 'p', text: 'قال ﷺ: "من قال حين يصبح وحين يمسي: سبحان الله وبحمده، مائة مرة، حُطّت خطاياه ولو كانت مثل زبد البحر" (متفق عليه). ومن السنة قول:' },
        { kind: 'ul', items: [
          'سبحان الله ٣٣',
          'الحمد لله ٣٣',
          'الله أكبر ٣٤'
        ] },
        { kind: 'h3', text: 'سيد الاستغفار' },
        { kind: 'p', text: 'قال ﷺ: "سيد الاستغفار أن تقول:' },
        { kind: 'quote', text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ' },
        { kind: 'p', text: '"من قالها من النهار موقناً بها فمات من يومه قبل أن يمسي فهو من أهل الجنة، ومن قالها من الليل موقناً بها فمات قبل أن يصبح فهو من أهل الجنة" (البخاري).' },
        { kind: 'h3', text: 'أدعية الحفظ' },
        { kind: 'ul', items: [
          'أعوذ بكلمات الله التامات من شر ما خلق — ثلاثاً (مسلم)',
          'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم — ثلاثاً (أبو داود والترمذي)'
        ] },
      ],
      [
        { kind: 'h2', text: 'The Importance of Morning Adhkar' },
        { kind: 'p', text: 'The morning adhkar are remembrances established from the Prophet ﷺ to be recited between the dawn prayer and sunrise. They serve as a spiritual shield that protects a Muslim throughout the day against harm from jinn, people, and external dangers.' },
        { kind: 'p', text: 'Allah says:' },
        { kind: 'quote', text: '"And remember your Lord much, and glorify Him in the evening and the morning."', cite: 'Aal Imran 3:41' },
        { kind: 'p', text: 'This verse is the foundation for the adhkar of morning and evening.' },
        { kind: 'h3', text: 'Ayat al-Kursi' },
        { kind: 'p', text: 'The Prophet ﷺ said: "Whoever recites Ayat al-Kursi in the morning will be under the protection of Allah until evening, and whoever recites it in the evening will be under His protection until morning" (al-Hakim). Ayat al-Kursi (the Verse of the Throne) is verse 255 of Surah Al-Baqarah.' },
        { kind: 'quote', text: '"Allah — there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth..."', cite: "Al-Baqarah 2:255" },
        { kind: 'h3', text: "The Three Mu'awwidhat" },
        { kind: 'p', text: 'The Prophet ﷺ said: "Recite Qul Huwa Allahu Ahad and the Mu\'awwidhatayn (Al-Falaq and An-Nas) three times in the morning and evening — they will suffice you against everything" (Abu Dawud and at-Tirmidhi).' },
        { kind: 'ul', items: [
          'Surah Al-Ikhlas (112) — three times',
          'Surah Al-Falaq (113) — three times',
          'Surah An-Nas (114) — three times'
        ] },
        { kind: 'h3', text: "The Morning Du'a" },
        { kind: 'p', text: "Among the most well-known morning supplications of the Prophet ﷺ:" },
        { kind: 'quote', text: '"We have entered the morning, and the entire dominion belongs to Allah; all praise is for Allah; there is no deity except Allah alone with no partner; to Him belongs the dominion and to Him belongs all praise, and He has power over all things."' },
        { kind: 'p', text: 'Reported by Muslim.' },
        { kind: 'h3', text: 'Tasbih, Tahmid, and Takbir' },
        { kind: 'p', text: 'The Prophet ﷺ said: "Whoever says morning and evening, \'SubhanAllahi wa bihamdihi,\' a hundred times, his sins will be erased even if they were as much as the foam of the sea" (Bukhari and Muslim). It is also from the Sunnah to say:' },
        { kind: 'ul', items: [
          '"SubhanAllah" 33 times',
          '"Alhamdu lillah" 33 times',
          '"Allahu Akbar" 34 times'
        ] },
        { kind: 'h3', text: 'Sayyid al-Istighfar — The Master of Seeking Forgiveness' },
        { kind: 'p', text: 'The Prophet ﷺ said: "The master of seeking forgiveness (Sayyid al-Istighfar) is to say:' },
        { kind: 'quote', text: '"O Allah, You are my Lord; there is no deity except You. You created me and I am Your servant. I am bound by Your covenant and Your promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favour upon me, and I acknowledge my sin. So forgive me, for none forgives sins except You."' },
        { kind: 'p', text: '"Whoever recites it during the day with conviction and dies that day before evening, he is among the people of Paradise; and whoever recites it at night with conviction and dies before morning, he is among the people of Paradise" (Bukhari).' },
        { kind: 'h3', text: 'Supplications for Protection' },
        { kind: 'ul', items: [
          '"A\'udhu bi kalimat-illah at-tammat min sharri ma khalaq" (I take refuge in the perfect words of Allah from the evil of all that He has created) — three times — Muslim',
          '"Bismillahi alladhi la yadurru ma\'a-smihi shay\'un fi al-ardi wa la fi as-samai wa Huwa as-Sami\'u-l-Alim" (In the Name of Allah, with whose Name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing) — three times — Abu Dawud and at-Tirmidhi'
        ] },
      ],
    ),
    duration: '20:00',
    status: 'published',
    tags: ['adhkar', 'morning', 'daily'],
    createdAt: '2026-04-16',
    updatedAt: '2026-04-16',
  },

  {
    id: 'l-adhkar-jioni',
    title: {
      sw: 'Adhkar za Jioni',
      ar: 'أذكار المساء',
      en: 'Evening Adhkar (Remembrances)',
    },
    slug: 'adhkar-za-jioni',
    subjectId: 'adhkar',
    levelId: 'awali',
    courseId: 'adhkar-asubuhi-jioni',
    order: 2,
    content: richContent(
      [
        { kind: 'h2', text: 'Wakati wa Adhkar za Jioni' },
        { kind: 'p', text: 'Adhkar za jioni husomwa kati ya swala ya Alasiri na giza la usiku. Wakati wenye ubora zaidi ni baada ya swala ya Alasiri. Adhkar hizi ni karibu sawa na zile za asubuhi, lakini maneno mengine yanabadilika kutoka "asbahna" (tumeingia asubuhi) hadi "amsayna" (tumeingia jioni).' },
        { kind: 'h3', text: 'Faida ya Adhkar za Jioni' },
        { kind: 'p', text: 'Mtume ﷺ alisema: "Atakayesema jioni: \'A\'udhu bi kalimat-illah at-tammat min sharri ma khalaq\' (Najikinga kwa maneno kamili ya Allah dhidi ya shari ya alichoiumba), hatadhuriwa na sumu yoyote ile usiku huo" (Tirmidhi). Hii inaonyesha ulinzi wa kipekee unaopatikana kupitia adhkar hizi.' },
        { kind: 'h3', text: 'Ayat al-Kursi' },
        { kind: 'p', text: 'Kama asubuhi, husomwa Ayat al-Kursi mara moja. Mtume ﷺ alisema kwamba mwenye kuisoma jioni atakuwa chini ya ulinzi wa Allah hadi asubuhi. Ayat al-Kursi inajumuisha ukamilifu wa Tawhidi katika nafasi yake ya juu zaidi — Allah ni mmoja, hai milele, anayedumisha viumbe vyote, asiyeshikwa na usingizi.' },
        { kind: 'h3', text: 'Sura Tatu za Mwisho — Mu\'awwidhat' },
        { kind: 'ul', items: [
          'Sura Al-Ikhlas (112) — mara tatu',
          'Sura Al-Falaq (113) — mara tatu',
          'Sura An-Nas (114) — mara tatu'
        ] },
        { kind: 'h3', text: 'Dua ya Jioni' },
        { kind: 'quote', text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ' },
        { kind: 'p', text: 'Maana: "Tumeingia jioni, na ufalme wote ni wa Allah; sifa zote ni za Allah; hakuna mola apasaye kuabudiwa ila Allah pekee, hana mshirika; ufalme ni wake na sifa ni zake, naye ana uwezo juu ya kila kitu." Imepokelewa na Muslim.' },
        { kind: 'h3', text: 'Dua Maalum ya Jioni' },
        { kind: 'p', text: 'Mtume ﷺ alimfundisha Abu Hurayrah (RA) dua hii kuisoma asubuhi na jioni:' },
        { kind: 'quote', text: 'اللَّهُمَّ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ' },
        { kind: 'h3', text: 'Sayyid al-Istighfar' },
        { kind: 'p', text: 'Husomwa kama ilivyotajwa katika lesson ya asubuhi.' },
        { kind: 'h3', text: 'Dua za Ulinzi wa Usiku' },
        { kind: 'ul', items: [
          'A\'udhu bi kalimat-illah at-tammat min sharri ma khalaq — mara tatu',
          'Bismillahi alladhi la yadurru ma\'a-smihi shay\'un — mara tatu',
          '"Hasbiya-Llahu la ilaha illa Huwa, alayhi tawakkaltu wa Huwa Rabbu-l-arshi-l-adheem" (Ametosha kwangu Allah, hakuna mola ila yeye, kwake nimeitegemea, naye ni Mola wa Arshi kuu) — mara saba (Abu Dawud)'
        ] },
        { kind: 'h3', text: 'Mtindo wa Kufanya Adhkar' },
        { kind: 'p', text: 'Wanavyuoni wamependekeza adhkar zifanyike kwa namna ifuatayo ili zilete athari yake kamili:' },
        { kind: 'ol', items: [
          'Kuwa na nia safi — kufanya kwa ajili ya Allah',
          'Kuelewa maana ya unayosema — sio kupitisha kwa ulimi tu',
          'Kuwa na utulivu — bila kuharakisha',
          'Kufuata idadi sahihi — kama Mtume aliivyofanya',
          'Kuendelea kila siku — bila kuruka, hata kama ni kiasi kidogo'
        ] },
        { kind: 'h3', text: 'Hadith ya Vifaa Bora' },
        { kind: 'p', text: 'Mtume ﷺ alisema: "Mtu mmoja alikuja kwa Mtume wa Allah na akasema: \'Ee Mtume wa Allah, sheria za Uislamu zimezidi kwa mimi, nipe kitu kinachonigusa.\' Mtume akasema: \'Acha ulimi wako uwe nyepesi sikuzote katika dhikri ya Allah\'" (Tirmidhi). Hadith hii inafundisha kwamba dhikri ni rasilmali rahisi inayotoa thawabu kubwa — haitaji nguvu maalum, haitaji malipo, lakini inaleta athari kuu.' },
      ],
      [
        { kind: 'h2', text: 'وقت أذكار المساء' },
        { kind: 'p', text: 'تُقرأ أذكار المساء بين العصر والمغرب، وأفضلها بعد العصر. وتشبه أذكار الصباح إلا في تغيير "أصبحنا" إلى "أمسينا".' },
        { kind: 'h3', text: 'فضل أذكار المساء' },
        { kind: 'p', text: 'قال ﷺ: "من قال حين يمسي: أعوذ بكلمات الله التامات من شر ما خلق، لم يضرّه شيء تلك الليلة" (الترمذي).' },
        { kind: 'h3', text: 'آية الكرسي' },
        { kind: 'p', text: 'تُقرأ كذلك مرة واحدة. ومن قرأها مساءً كان في حفظ الله حتى الصباح.' },
        { kind: 'h3', text: 'المعوذات' },
        { kind: 'ul', items: [
          'الإخلاص ثلاثاً',
          'الفلق ثلاثاً',
          'الناس ثلاثاً'
        ] },
        { kind: 'h3', text: 'دعاء المساء' },
        { kind: 'quote', text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ' },
        { kind: 'p', text: 'رواه مسلم.' },
        { kind: 'h3', text: 'دعاء أبي هريرة' },
        { kind: 'quote', text: 'اللَّهُمَّ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ' },
        { kind: 'h3', text: 'أدعية حفظ الليل' },
        { kind: 'ul', items: [
          'أعوذ بكلمات الله التامات من شر ما خلق — ثلاثاً',
          'بسم الله الذي لا يضر مع اسمه شيء — ثلاثاً',
          'حسبي الله لا إله إلا هو، عليه توكلت وهو رب العرش العظيم — سبعاً (أبو داود)'
        ] },
        { kind: 'h3', text: 'أدب الذكر' },
        { kind: 'ol', items: [
          'إخلاص النية',
          'فهم المعاني',
          'الطمأنينة',
          'الالتزام بالعدد',
          'المداومة'
        ] },
        { kind: 'h3', text: 'حديث وصية' },
        { kind: 'p', text: 'جاء رجل إلى النبي ﷺ فقال: "إن شرائع الإسلام قد كثرت عليّ، فأخبرني بشيء أتشبث به." قال: "لا يزال لسانك رطباً من ذكر الله" (الترمذي).' },
      ],
      [
        { kind: 'h2', text: 'The Time of Evening Adhkar' },
        { kind: 'p', text: 'Evening adhkar are recited between Asr prayer and the darkness of night. The best time is just after Asr. They are largely similar to the morning adhkar, with adjustments such as changing "asbahna" (we have entered the morning) to "amsayna" (we have entered the evening).' },
        { kind: 'h3', text: 'The Virtue of Evening Adhkar' },
        { kind: 'p', text: 'The Prophet ﷺ said: "Whoever says in the evening, \'A\'udhu bi kalimat-illah at-tammat min sharri ma khalaq\' (I take refuge in the perfect words of Allah from the evil of what He has created), no poison will harm him that night" (at-Tirmidhi). This shows the unique protection these adhkar provide.' },
        { kind: 'h3', text: 'Ayat al-Kursi' },
        { kind: 'p', text: 'As in the morning, Ayat al-Kursi is recited once. The Prophet ﷺ said that one who recites it in the evening will remain under the protection of Allah until morning. Ayat al-Kursi encapsulates Tawhid in its highest expression — Allah is one, ever-living, sustaining all of creation, never overcome by drowsiness or sleep.' },
        { kind: 'h3', text: 'The Three Mu\'awwidhat' },
        { kind: 'ul', items: [
          'Surah Al-Ikhlas (112) — three times',
          'Surah Al-Falaq (113) — three times',
          'Surah An-Nas (114) — three times'
        ] },
        { kind: 'h3', text: "The Evening Du'a" },
        { kind: 'quote', text: '"We have entered the evening, and the entire dominion belongs to Allah; all praise is for Allah; there is no deity except Allah alone with no partner; to Him belongs the dominion and to Him belongs all praise, and He has power over all things."' },
        { kind: 'p', text: 'Reported by Muslim.' },
        { kind: 'h3', text: 'A Special Evening Supplication' },
        { kind: 'p', text: 'The Prophet ﷺ taught Abu Hurayrah (RA) this supplication for morning and evening:' },
        { kind: 'quote', text: '"O Allah, Originator of the heavens and the earth, Knower of the unseen and the seen, Lord and Sovereign of all things, I bear witness that there is no deity except You. I take refuge in You from the evil of my soul, and from the evil of Shaytan and his polytheism, and from harming myself or bringing harm upon a fellow Muslim."' },
        { kind: 'h3', text: 'Sayyid al-Istighfar' },
        { kind: 'p', text: 'Recited as taught in the morning lesson.' },
        { kind: 'h3', text: 'Supplications for the Protection of the Night' },
        { kind: 'ul', items: [
          'A\'udhu bi kalimat-illah at-tammat min sharri ma khalaq — three times',
          'Bismillahi alladhi la yadurru ma\'a-smihi shay\'un — three times',
          '"Hasbiya-Llahu la ilaha illa Huwa, alayhi tawakkaltu wa Huwa Rabbu-l-arshi-l-adheem" (Sufficient for me is Allah; there is no deity except Him; upon Him I rely; and He is the Lord of the Magnificent Throne) — seven times (Abu Dawud)'
        ] },
        { kind: 'h3', text: 'The Etiquette of Performing Adhkar' },
        { kind: 'p', text: 'Scholars have recommended that adhkar be performed in this manner to bring their full effect:' },
        { kind: 'ol', items: [
          'Sincere intention — performing them for the sake of Allah alone',
          'Understanding what one is saying — not merely letting the tongue pass over the words',
          'Calmness and tranquillity — not rushing',
          'Following the prescribed numbers — as the Prophet ﷺ did',
          'Constancy — every day, even in small amounts, without skipping'
        ] },
        { kind: 'h3', text: 'A Hadith of Excellent Practice' },
        { kind: 'p', text: 'The Prophet ﷺ said: "A man came to the Messenger of Allah ﷺ and said: \'O Messenger of Allah, the laws of Islam have become many for me; tell me something I can hold to.\' He said: \'Let your tongue remain ever moist with the remembrance of Allah\'" (at-Tirmidhi). This hadith teaches that dhikr is a simple resource that brings tremendous reward — it requires no special exertion and no expense, yet it has a profound effect.' },
      ],
    ),
    duration: '20:00',
    status: 'published',
    tags: ['adhkar', 'evening', 'daily'],
    createdAt: '2026-04-19',
    updatedAt: '2026-04-19',
  },

  // ============================================
  // ADHKAR — Daily Activities
  // ============================================
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
    content: richContent(
      [
        { kind: 'h2', text: 'Adabu za Kula katika Uislamu' },
        { kind: 'p', text: 'Kula si tu kushibisha mwili — ni ibada inapokuwa imefanyika kwa adabu na nia sahihi. Mtume ﷺ ametufundisha jinsi ya kuanza chakula, jinsi ya kula, na jinsi ya kumaliza, akifanya kila mlo kuwa fursa ya kumkumbuka Allah na kupata thawabu.' },
        { kind: 'h3', text: 'Kabla ya Kula — "Bismillah"' },
        { kind: 'p', text: 'Mtume ﷺ alisema: "Mmoja wenu akila, na aseme \'Bismillah.\' Kama akisahau mwanzoni, na aseme \'Bismillahi awwalahu wa aakhirahu\' (Kwa jina la Allah mwanzoni mwake na mwishoni mwake)" (Tirmidhi na Abu Dawud).' },
        { kind: 'p', text: 'Hadith nyingine inaonyesha umuhimu wa Bismillah: "Ikiwa mtu hatamtaja Allah anapoanza kula, shaytan anakula naye" (Muslim). Kwa hivyo Bismillah si tu adabu — ni kinga dhidi ya shari za shaytan kuingia katika chakula chetu.' },
        { kind: 'h3', text: 'Wakati wa Kula' },
        { kind: 'p', text: 'Mtume ﷺ alituachia mafundisho mengi kuhusu jinsi ya kula:' },
        { kind: 'ul', items: [
          'Kula kwa mkono wa kulia — Mtume alisema: "Akila mtu kwa mkono wa kulia... kwa kuwa shaytan anakula kwa mkono wa kushoto" (Muslim)',
          'Kuanza kutoka karibu yako — "Akila kile kilicho mbele yako" (Bukhari na Muslim)',
          'Kutopumzika — Mtume alikataza kupumua katika chombo cha kunywa',
          'Kula chakula kilichoanguka — Mtume alisema: "Kama tone la chakula linaanguka, mtu na aitakase na kula" (Muslim)',
          'Kutosheba — Mtume alisema: "Theluthi ya tumbo kwa chakula, theluthi kwa kinywaji, theluthi kwa hewa" (Tirmidhi)'
        ] },
        { kind: 'h3', text: 'Baada ya Kula — Dua ya Shukrani' },
        { kind: 'p', text: 'Dua ya kawaida baada ya chakula:' },
        { kind: 'quote', text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ' },
        { kind: 'p', text: 'Maana: "Sifa zote ni za Allah aliyenilisha hiki na akanipa kama riziki, bila uwezo wala nguvu kutoka kwangu." Mtume ﷺ alisema: "Atakayemaliza chakula akasema dua hii, dhambi zake zilizotangulia zitasamehewa" (Tirmidhi na Ibn Majah).' },
        { kind: 'p', text: 'Dua nyingine ya baada ya kula:' },
        { kind: 'quote', text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ' },
        { kind: 'p', text: '"Sifa zote ni za Allah aliyetulisha na akatupa kunywa, na akatuteua kuwa Waislamu." Imepokelewa na Abu Dawud na Tirmidhi.' },
        { kind: 'h3', text: 'Dua za Maalum' },
        { kind: 'p', text: 'Dua kwa anayempa chakula au kunywa:' },
        { kind: 'quote', text: 'اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي، وَاسْقِ مَنْ سَقَانِي' },
        { kind: 'p', text: '"Ee Allah, mlishe yule aliyenilisha, na mpe kunywa yule aliyenipa kunywa" (Muslim).' },
        { kind: 'p', text: 'Dua wakati wa kuvunja saumu:' },
        { kind: 'quote', text: 'ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ، إِنْ شَاءَ اللَّهُ' },
        { kind: 'p', text: '"Kiu kimekwisha, mishipa imelowanika, na thawabu imethibitishwa, Inshaallah" (Abu Dawud).' },
        { kind: 'h3', text: 'Dua kwa Anayemwalika Chakula' },
        { kind: 'p', text: 'Mtume ﷺ alipokuwa anaalikwa nyumbani kwa watu na kula chakula chao, alikuwa anawaambia:' },
        { kind: 'quote', text: 'أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ، وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ' },
        { kind: 'p', text: '"Wenye kufunga wamevunja saumu pamoja nanyi, na watu wema wamekula chakula chenu, na malaika wamewaombea" (Abu Dawud).' },
      ],
      [
        { kind: 'h2', text: 'آداب الأكل في الإسلام' },
        { kind: 'p', text: 'الأكل ليس مجرّد إشباع للجسد — بل عبادة إذا قُرن بالأدب والنية الصالحة. علّمنا النبي ﷺ كيف نبدأ ونأكل وننهي، فيصبح كل وجبة فرصة لذكر الله ونيل الأجر.' },
        { kind: 'h3', text: 'قبل الأكل — التسمية' },
        { kind: 'p', text: 'قال ﷺ: "إذا أكل أحدكم فليذكر اسم الله. فإن نسي أن يذكر اسم الله في أوله فليقل: بسم الله أوله وآخره" (الترمذي وأبو داود).' },
        { kind: 'p', text: 'وقال ﷺ: "إذا لم يذكر العبد اسم الله أكل معه الشيطان" (مسلم).' },
        { kind: 'h3', text: 'أثناء الأكل' },
        { kind: 'ul', items: [
          'الأكل باليمين — قال ﷺ: "ليأكل أحدكم بيمينه... فإن الشيطان يأكل بشماله" (مسلم)',
          'الأكل مما يلي الإنسان (متفق عليه)',
          'النهي عن النفخ في الإناء',
          'أكل الطعام الساقط — قال ﷺ: "إذا سقطت لقمة أحدكم فليُمط ما بها من أذى وليأكلها" (مسلم)',
          'عدم الإسراف — "ثلث للطعام، وثلث للشراب، وثلث للنفس" (الترمذي)'
        ] },
        { kind: 'h3', text: 'بعد الأكل — دعاء الشكر' },
        { kind: 'quote', text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ' },
        { kind: 'p', text: 'قال ﷺ: "من قالها بعد طعامه غُفر له ما تقدّم من ذنبه" (الترمذي وابن ماجه).' },
        { kind: 'quote', text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ' },
        { kind: 'p', text: 'رواه أبو داود والترمذي.' },
        { kind: 'h3', text: 'أدعية خاصة' },
        { kind: 'p', text: 'دعاء لمن أطعمك:' },
        { kind: 'quote', text: 'اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي، وَاسْقِ مَنْ سَقَانِي' },
        { kind: 'p', text: 'دعاء عند الإفطار:' },
        { kind: 'quote', text: 'ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ، إِنْ شَاءَ اللَّهُ' },
        { kind: 'h3', text: 'دعاء لمن دعاك إلى طعامه' },
        { kind: 'quote', text: 'أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ، وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ' },
      ],
      [
        { kind: 'h2', text: 'Etiquettes of Eating in Islam' },
        { kind: 'p', text: "Eating is not merely satisfying the body — it becomes an act of worship when performed with proper etiquette and right intention. The Prophet ﷺ taught us how to begin a meal, how to eat, and how to conclude, making every meal an opportunity to remember Allah and earn reward." },
        { kind: 'h3', text: 'Before Eating — "Bismillah"' },
        { kind: 'p', text: "The Prophet ﷺ said: 'When one of you eats, let him say Bismillah. If he forgets at the start, let him say: Bismillahi awwalahu wa aakhirahu (In the name of Allah at its beginning and at its end)' (at-Tirmidhi and Abu Dawud)." },
        { kind: 'p', text: "Another hadith shows the importance of Bismillah: 'If a person does not mention Allah when beginning to eat, Shaytan eats with him' (Muslim). So Bismillah is not merely an etiquette — it is a barrier preventing Shaytan from sharing in our food." },
        { kind: 'h3', text: 'During the Meal' },
        { kind: 'p', text: 'The Prophet ﷺ left many teachings about how to eat:' },
        { kind: 'ul', items: [
          "Eating with the right hand — the Prophet said: 'Let one of you eat with his right hand... for Shaytan eats with his left' (Muslim)",
          "Eating from what is closest — 'Eat from what is in front of you' (Bukhari and Muslim)",
          "Not blowing into a vessel of drink",
          "Picking up dropped food — the Prophet said: 'If a morsel falls, let one wipe off any harm and eat it' (Muslim)",
          "Not overindulging — the Prophet said: 'A third for food, a third for drink, a third for breath' (at-Tirmidhi)"
        ] },
        { kind: 'h3', text: "After Eating — The Du'a of Gratitude" },
        { kind: 'p', text: 'The standard supplication after a meal:' },
        { kind: 'quote', text: '"All praise is for Allah who fed me this and provided it for me, without any strength or power on my part."' },
        { kind: 'p', text: "The Prophet ﷺ said: 'Whoever says this after his meal, his previous sins will be forgiven' (at-Tirmidhi and Ibn Majah)." },
        { kind: 'p', text: 'Another supplication after eating:' },
        { kind: 'quote', text: '"All praise is for Allah who fed us, gave us drink, and made us Muslims."' },
        { kind: 'p', text: 'Reported by Abu Dawud and at-Tirmidhi.' },
        { kind: 'h3', text: 'Special Supplications' },
        { kind: 'p', text: 'For one who has fed or given you drink:' },
        { kind: 'quote', text: '"O Allah, feed the one who has fed me, and give drink to the one who has given me drink." (Muslim)' },
        { kind: 'p', text: 'When breaking a fast:' },
        { kind: 'quote', text: '"The thirst is gone, the veins are moistened, and the reward is established, if Allah wills." (Abu Dawud)' },
        { kind: 'h3', text: "For One Who Hosts You" },
        { kind: 'p', text: 'When the Prophet ﷺ was invited to people\'s homes and ate their food, he would say to them:' },
        { kind: 'quote', text: '"May the fasting break their fast with you, may the righteous eat your food, and may the angels send blessings upon you." (Abu Dawud)' },
      ],
    ),
    duration: '16:00',
    status: 'published',
    tags: ['adhkar', 'eating', 'daily'],
    createdAt: '2026-04-22',
    updatedAt: '2026-04-22',
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
    content: richContent(
      [
        { kind: 'h2', text: 'Usingizi katika Uislamu' },
        { kind: 'p', text: 'Allah amesema:' },
        { kind: 'quote', text: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا', cite: 'An-Naba 78:9' },
        { kind: 'p', text: '"Na tumefanya usingizi wenu kuwa pumziko." Usingizi ni neema ya Allah na ishara ya rehema yake. Mtume ﷺ alituachia adhkar nyingi zinazopaswa kusomwa kabla ya kulala na pale unapoamka, ambazo zinabadilisha usingizi wa kawaida kuwa ibada.' },
        { kind: 'h3', text: 'Maandalizi ya Kulala' },
        { kind: 'p', text: 'Mtume ﷺ alikuwa anaifanya hatua zifuatazo kabla ya kulala:' },
        { kind: 'ol', items: [
          'Kufanya wudhu kabla ya kulala — "Akielekea kitanda cha kulala, na atawadhe kama wudhu wake wa swala" (Bukhari)',
          'Kupiga mswaki',
          'Kulalia upande wa kulia, mkono chini ya shavu',
          'Kuiweka pumzi yako kwa Allah'
        ] },
        { kind: 'h3', text: 'Kusoma Kabla ya Kulala' },
        { kind: 'p', text: 'Mtume ﷺ alipenda kusoma sura zifuatazo kabla ya kulala:' },
        { kind: 'ul', items: [
          'Ayat al-Kursi — Mtume alisema: "Atakayeisoma kabla ya kulala, atakuwa chini ya ulinzi wa Allah, na shaytan hatamkaribia hadi asubuhi" (Bukhari)',
          'Sura Al-Ikhlas, Al-Falaq, na An-Nas — Mtume alikuwa akizisoma kisha akizipuliza mikononi mwake na kupangusa mwili wake mzima — mara tatu (Bukhari)',
          'Aya mbili za mwisho za Sura Al-Baqarah (285-286) — "Atakayeisoma usiku, zitamtosha" (Bukhari na Muslim)'
        ] },
        { kind: 'h3', text: 'Dua Maalum ya Kulala' },
        { kind: 'p', text: 'Dua maarufu zaidi ya kulala:' },
        { kind: 'quote', text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا' },
        { kind: 'p', text: 'Maana: "Kwa jina lako, ee Allah, nafa na naishi." Imepokelewa na Bukhari. Hadith ya Mtume ﷺ inafananisha usingizi na kifo, kwani ni hali ya kupoteza fahamu na kurudi kwa nguvu za Allah; hivyo unapoamka ni kama kuhuishwa upya.' },
        { kind: 'h3', text: 'Dua Nyingine za Kulala' },
        { kind: 'quote', text: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا' },
        { kind: 'p', text: 'Pia:' },
        { kind: 'quote', text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ' },
        { kind: 'p', text: '"Ee Allah, niepushe na adhabu yako siku utakapowafufua waja wako" — Mtume alikuwa akiisema mara tatu kabla ya kulala (Abu Dawud).' },
        { kind: 'p', text: 'Dua ya kuwekewa nguo:' },
        { kind: 'quote', text: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ' },
        { kind: 'p', text: '"Kwa jina lako, ee Mola wangu, nimeweka ubavu wangu, na kwako naunyanyua. Ukinichukulia roho yangu, basi ihurumie; na ukiruhusu kurudi, basi ihifadhi kama unavyowahifadhi waja wako wema" (Bukhari na Muslim).' },
        { kind: 'h3', text: 'Dua za Kuamka' },
        { kind: 'p', text: 'Mtume ﷺ alipoamka usingizini, alikuwa anasema:' },
        { kind: 'quote', text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ' },
        { kind: 'p', text: '"Sifa zote ni za Allah aliyetuhuisha baada ya kutufa, na kwake ndio kufufuliwa." Imepokelewa na Bukhari.' },
        { kind: 'h3', text: 'Akiamka Usiku' },
        { kind: 'p', text: 'Mtu akiamka usiku — kwa hofu au sababu nyingine — Mtume ﷺ alifundisha kusema:' },
        { kind: 'quote', text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ' },
        { kind: 'p', text: 'Kisha kuomba kile anachotaka — Allah atajibu (Bukhari).' },
        { kind: 'h3', text: 'Wakati wa Kuona Ndoto' },
        { kind: 'p', text: 'Mtume ﷺ alisema kuhusu ndoto:' },
        { kind: 'ul', items: [
          'Ndoto njema ni kutoka kwa Allah — anapaswa kuipongeza na kumshukuru, na kuelezea wapendwao tu',
          'Ndoto mbaya ni kutoka kwa shaytan — anapaswa: kuomba kinga ya Allah mara tatu, kupiga mate (kavu) upande wa kushoto mara tatu, kugeuka upande mwingine, na asielezee mtu yeyote'
        ] },
      ],
      [
        { kind: 'h2', text: 'النوم في الإسلام' },
        { kind: 'quote', text: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا', cite: 'النبأ ٧٨:٩' },
        { kind: 'p', text: 'النوم نعمة من الله. وقد ترك لنا النبي ﷺ أذكاراً تُقرأ قبل النوم وعند الاستيقاظ تُحوّل النوم العادي إلى عبادة.' },
        { kind: 'h3', text: 'الاستعداد للنوم' },
        { kind: 'ol', items: [
          'الوضوء قبل النوم (البخاري)',
          'السواك',
          'النوم على الجنب الأيمن، اليد تحت الخدّ',
          'تسليم النفس لله'
        ] },
        { kind: 'h3', text: 'القراءة قبل النوم' },
        { kind: 'ul', items: [
          'آية الكرسي — يبيت في حفظ الله ولا يقربه شيطان (البخاري)',
          'الإخلاص والمعوذتين — يقرؤها وينفث في كفيه ويمسح بها جسده ثلاثاً (البخاري)',
          'الآيتان الأخيرتان من البقرة — كفتاه (متفق عليه)'
        ] },
        { kind: 'h3', text: 'دعاء النوم المشهور' },
        { kind: 'quote', text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا' },
        { kind: 'p', text: 'رواه البخاري.' },
        { kind: 'h3', text: 'أدعية أخرى' },
        { kind: 'quote', text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ' },
        { kind: 'p', text: 'كان النبي ﷺ يقولها ثلاثاً قبل النوم (أبو داود).' },
        { kind: 'quote', text: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ' },
        { kind: 'p', text: 'متفق عليه.' },
        { kind: 'h3', text: 'دعاء الاستيقاظ' },
        { kind: 'quote', text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ' },
        { kind: 'p', text: 'رواه البخاري.' },
        { kind: 'h3', text: 'الاستيقاظ في الليل' },
        { kind: 'quote', text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ' },
        { kind: 'p', text: 'ثم يدعو بما شاء فيُستجاب له (البخاري).' },
        { kind: 'h3', text: 'الرؤيا' },
        { kind: 'ul', items: [
          'الرؤيا الصالحة من الله — يحمده ولا يخبر بها إلا من يحبّ',
          'الحلم من الشيطان — يستعيذ بالله ثلاثاً، يتفل عن يساره ثلاثاً، يتحوّل عن جنبه، ولا يخبر أحداً'
        ] },
      ],
      [
        { kind: 'h2', text: 'Sleep in Islam' },
        { kind: 'quote', text: '"And We made your sleep a means of rest."', cite: 'An-Naba 78:9' },
        { kind: 'p', text: 'Sleep is a blessing from Allah and a sign of His mercy. The Prophet ﷺ left us many adhkar to be recited before sleeping and upon waking, transforming ordinary sleep into a form of worship.' },
        { kind: 'h3', text: 'Preparing for Sleep' },
        { kind: 'p', text: 'The Prophet ﷺ would do the following before sleeping:' },
        { kind: 'ol', items: [
          'Performing wudhu before bed — "When you go to your bed, perform wudhu as you would for prayer" (Bukhari)',
          'Using the siwak (toothstick)',
          'Lying on the right side, hand under the cheek',
          'Entrusting his soul to Allah'
        ] },
        { kind: 'h3', text: 'What to Recite Before Sleep' },
        { kind: 'p', text: 'The Prophet ﷺ favoured these recitations before sleep:' },
        { kind: 'ul', items: [
          'Ayat al-Kursi — "Whoever recites it before sleeping will remain under the protection of Allah, and Shaytan will not approach him until morning" (Bukhari)',
          'Surahs Al-Ikhlas, Al-Falaq, and An-Nas — the Prophet would recite each, blow into his palms, and wipe over as much of his body as he could reach — three times (Bukhari)',
          'The last two verses of Al-Baqarah (285-286) — "Whoever recites them at night, they will suffice him" (Bukhari and Muslim)'
        ] },
        { kind: 'h3', text: "The Most Famous Sleep Du'a" },
        { kind: 'quote', text: '"In Your name, O Allah, I die and I live."' },
        { kind: 'p', text: 'Reported by Bukhari. The Prophet\'s teachings draw a parallel between sleep and death, since both involve loss of consciousness and return to the power of Allah. Waking is thus like being given new life.' },
        { kind: 'h3', text: 'Other Sleep Supplications' },
        { kind: 'quote', text: '"O Allah, save me from Your punishment on the day You resurrect Your servants."' },
        { kind: 'p', text: 'The Prophet ﷺ would say this three times before sleeping (Abu Dawud).' },
        { kind: 'quote', text: '"In Your name, my Lord, I lay down my side, and by You I raise it. If You take my soul, have mercy upon it; and if You send it back, protect it as You protect Your righteous servants." (Bukhari and Muslim)' },
        { kind: 'h3', text: 'The Waking Supplication' },
        { kind: 'p', text: 'When the Prophet ﷺ would awaken, he would say:' },
        { kind: 'quote', text: '"All praise is for Allah who gave us life after death, and to Him is the resurrection."' },
        { kind: 'p', text: 'Reported by Bukhari.' },
        { kind: 'h3', text: 'Waking in the Night' },
        { kind: 'p', text: 'If one wakes in the night — through fear or any cause — the Prophet ﷺ taught us to say:' },
        { kind: 'quote', text: '"There is no deity except Allah alone with no partner; to Him belongs the dominion and to Him belongs all praise; and He has power over all things."' },
        { kind: 'p', text: 'Then to ask for whatever one wants — Allah will respond (Bukhari).' },
        { kind: 'h3', text: 'On Seeing a Dream' },
        { kind: 'p', text: 'The Prophet ﷺ taught about dreams:' },
        { kind: 'ul', items: [
          'A good dream is from Allah — one should give thanks and only mention it to those one loves',
          'A disturbing dream is from Shaytan — one should: seek refuge in Allah three times, blow lightly to the left three times, change sides, and not mention it to anyone'
        ] },
      ],
    ),
    duration: '18:00',
    status: 'published',
    tags: ['adhkar', 'sleep', 'waking', 'daily'],
    createdAt: '2026-04-25',
    updatedAt: '2026-04-25',
  },

  {
    id: 'l-adhkar-shughuli-msikiti',
    title: {
      sw: 'Dua za Kuingia na Kutoka Msikitini',
      ar: 'أدعية دخول المسجد والخروج منه',
      en: 'Supplications for Entering and Leaving the Mosque',
    },
    slug: 'dua-za-kuingia-na-kutoka-msikitini',
    subjectId: 'adhkar',
    levelId: 'awali',
    courseId: 'adhkar-shughuli',
    order: 3,
    content: richContent(
      [
        { kind: 'h2', text: 'Heshima ya Msikiti' },
        { kind: 'p', text: 'Misikiti ni nyumba za Allah, mahali ambapo wao huitwa kwa heshima. Allah amesema:' },
        { kind: 'quote', text: 'فِي بُيُوتٍ أَذِنَ اللَّهُ أَنْ تُرْفَعَ وَيُذْكَرَ فِيهَا اسْمُهُ', cite: 'An-Nur 24:36' },
        { kind: 'p', text: '"Katika nyumba alizoamuru Allah ziinuliwe, na ndani yake litajwe jina lake." Misikiti ni mahali pa heshima maalumu, na kuingia humo kunahitaji adabu na nia. Mtume ﷺ alituachia dua za kuingia na kutoka msikitini.' },
        { kind: 'h3', text: 'Adabu za Kabla ya Kuingia' },
        { kind: 'ol', items: [
          'Kuwa na wudhu',
          'Kuvaa nguo safi na zenye heshima',
          'Kuepuka harufu mbaya — Mtume ﷺ alikataza wenye kula vitunguu na kitunguu saumu kuingia msikitini',
          'Kutangaza Bismillah na dua maalumu',
          'Kuingia kwa mguu wa kulia',
          'Kuomba dua: "Allahumma-ftah li abwaba rahmatik"'
        ] },
        { kind: 'h3', text: 'Dua ya Kuingia' },
        { kind: 'p', text: 'Mtume ﷺ alipoingia msikitini, alikuwa anasema:' },
        { kind: 'quote', text: 'بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ' },
        { kind: 'p', text: 'Maana: "Kwa jina la Allah, na swala na salamu juu ya Mtume wa Allah. Ee Allah, nifungulie milango ya rehema yako." Imepokelewa na Muslim na Ibn Majah.' },
        { kind: 'p', text: 'Dua nyingine ya Mtume ﷺ akiingia:' },
        { kind: 'quote', text: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ' },
        { kind: 'p', text: '"Ninajikinga kwa Allah Mtukufu, na kwa uso wake mkarimu, na kwa mamlaka yake ya kale, kutoka kwa shaytan aliyefukuzwa" (Abu Dawud).' },
        { kind: 'h3', text: 'Tahiyat al-Masjid' },
        { kind: 'p', text: 'Mtume ﷺ alisema: "Mmoja wenu akiingia msikitini, asikae mpaka aswali rakaa mbili" (Bukhari na Muslim). Hizi ni "Tahiyat al-Masjid" (Salamu kwa Msikiti) — swala fupi ya rakaa mbili kabla ya kukaa. Madhumuni yake ni kuheshimu nyumba ya Allah na kupokea baraka za kuwa humo.' },
        { kind: 'h3', text: 'Tabia Ndani ya Msikiti' },
        { kind: 'ul', items: [
          'Kuepuka kupita mbele ya wenye kuswali',
          'Kupunguza sauti — Mtume ﷺ alichukia kelele za biashara au mazungumzo ya kiulimwengu',
          'Kutotema mate kwenye mchanga wa msikiti',
          'Kuepuka kuuliza vitu vilivyopotea — Mtume alisema mwenye anauliza hivyo, asiombee Allah amrudishie',
          'Kuongeza dhikri, swala za hiari, na kusoma Qur\'an'
        ] },
        { kind: 'h3', text: 'Dua ya Kutoka' },
        { kind: 'p', text: 'Mtume ﷺ alipotoka msikitini, alikuwa anasema:' },
        { kind: 'quote', text: 'بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ' },
        { kind: 'p', text: 'Maana: "Kwa jina la Allah, na swala na salamu juu ya Mtume wa Allah. Ee Allah, ninakuomba katika fadhila zako." Imepokelewa na Muslim na Ibn Majah.' },
        { kind: 'p', text: 'Tofauti ya kuvutia: anapoingia anaomba "milango ya rehema" — kwa sababu rehema ni neema kuu ya kuwa mbele ya Mola; anapotoka anaomba "fadhila" — kwa sababu sasa anaenda kuendelea na maisha ya dunia, akihitaji riziki na fadhila za kidunia. Mfumo huu unaonyesha hekima ya kina ya dini.' },
        { kind: 'h3', text: 'Kutoka kwa Mguu wa Kushoto' },
        { kind: 'p', text: 'Mtume ﷺ alipenda kuanzisha mambo ya heshima kwa upande wa kulia. Hivyo aliingia msikitini kwa mguu wa kulia na akatoka kwa mguu wa kushoto — kinyume cha mlango (kama vile choo, ambapo aliingia kwa mguu wa kushoto na akatoka kwa kulia).' },
      ],
      [
        { kind: 'h2', text: 'حرمة المسجد' },
        { kind: 'quote', text: 'فِي بُيُوتٍ أَذِنَ اللَّهُ أَنْ تُرْفَعَ وَيُذْكَرَ فِيهَا اسْمُهُ', cite: 'النور ٢٤:٣٦' },
        { kind: 'p', text: 'المساجد بيوت الله. ودخولها يقتضي أدباً ونية.' },
        { kind: 'h3', text: 'آداب قبل الدخول' },
        { kind: 'ol', items: [
          'الوضوء',
          'لبس ثياب نظيفة',
          'تجنب الرائحة الكريهة — نهى ﷺ آكل الثوم والبصل عن الدخول',
          'التسمية والدعاء',
          'الدخول بالقدم اليمنى',
          'دعاء الدخول'
        ] },
        { kind: 'h3', text: 'دعاء الدخول' },
        { kind: 'quote', text: 'بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ' },
        { kind: 'p', text: 'رواه مسلم وابن ماجه.' },
        { kind: 'quote', text: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ' },
        { kind: 'p', text: 'رواه أبو داود.' },
        { kind: 'h3', text: 'تحية المسجد' },
        { kind: 'p', text: 'قال ﷺ: "إذا دخل أحدكم المسجد فلا يجلس حتى يصلي ركعتين" (متفق عليه).' },
        { kind: 'h3', text: 'الأدب داخل المسجد' },
        { kind: 'ul', items: [
          'تجنب المرور بين يدي المصلي',
          'خفض الصوت',
          'عدم البصاق في حصير المسجد',
          'عدم نشدان الضالة فيه',
          'الإكثار من الذكر والصلاة وقراءة القرآن'
        ] },
        { kind: 'h3', text: 'دعاء الخروج' },
        { kind: 'quote', text: 'بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ' },
        { kind: 'p', text: 'رواه مسلم وابن ماجه.' },
        { kind: 'h3', text: 'الخروج بالقدم اليسرى' },
        { kind: 'p', text: 'كان النبي ﷺ يبدأ المكرمات باليمين، فيدخل المسجد بالقدم اليمنى ويخرج باليسرى.' },
      ],
      [
        { kind: 'h2', text: 'The Sanctity of the Mosque' },
        { kind: 'quote', text: '"In houses which Allah has ordered to be raised, in which His name is mentioned."', cite: 'An-Nur 24:36' },
        { kind: 'p', text: 'Mosques are the houses of Allah, places where He is invoked with reverence. Entering a mosque requires proper etiquette and intention. The Prophet ﷺ left us specific supplications for entering and leaving.' },
        { kind: 'h3', text: 'Etiquettes Before Entering' },
        { kind: 'ol', items: [
          'Being in a state of wudhu',
          'Wearing clean and respectable clothing',
          'Avoiding offensive smells — the Prophet ﷺ forbade those who had eaten raw garlic or onions from entering',
          'Saying Bismillah and the prescribed supplication',
          'Entering with the right foot first',
          'Reciting "Allahumma-ftah li abwaba rahmatik"'
        ] },
        { kind: 'h3', text: 'The Supplication for Entering' },
        { kind: 'p', text: 'When the Prophet ﷺ entered a mosque, he would say:' },
        { kind: 'quote', text: '"In the name of Allah, and may peace and blessings be upon the Messenger of Allah. O Allah, open for me the gates of Your mercy."' },
        { kind: 'p', text: 'Reported by Muslim and Ibn Majah.' },
        { kind: 'p', text: 'Another supplication of the Prophet ﷺ when entering:' },
        { kind: 'quote', text: '"I take refuge in Allah, the Magnificent, in His noble Face, and in His eternal authority, from the rejected Shaytan." (Abu Dawud)' },
        { kind: 'h3', text: 'Tahiyat al-Masjid (Greeting the Mosque)' },
        { kind: 'p', text: "The Prophet ﷺ said: 'When one of you enters the mosque, let him not sit down until he has prayed two rakaat' (Bukhari and Muslim). This is Tahiyat al-Masjid (the Greeting of the Mosque) — a brief two-rakaat prayer before sitting. Its purpose is to honour the house of Allah and receive the blessing of being within it." },
        { kind: 'h3', text: 'Conduct Inside the Mosque' },
        { kind: 'ul', items: [
          'Avoiding crossing in front of one who is praying',
          'Lowering one\'s voice — the Prophet ﷺ disapproved of business or worldly conversation',
          'Not spitting on the floor of the mosque',
          'Not announcing lost items inside — the Prophet said one who does so should be answered: "May Allah not return it to you"',
          'Increasing in dhikr, voluntary prayers, and Qur\'an recitation'
        ] },
        { kind: 'h3', text: 'The Supplication for Leaving' },
        { kind: 'p', text: 'When the Prophet ﷺ left a mosque, he would say:' },
        { kind: 'quote', text: '"In the name of Allah, and may peace and blessings be upon the Messenger of Allah. O Allah, I ask You from Your bounty."' },
        { kind: 'p', text: 'Reported by Muslim and Ibn Majah.' },
        { kind: 'p', text: 'A beautiful nuance: on entering one asks for "the gates of mercy" — for mercy is the supreme blessing of being before the Lord; on leaving one asks for "bounty" — for one is now returning to worldly life and needs sustenance and worldly grace. This pattern reveals the deep wisdom of the religion.' },
        { kind: 'h3', text: 'Leaving with the Left Foot' },
        { kind: 'p', text: 'The Prophet ﷺ would begin honourable acts with the right side. So he entered the mosque with his right foot first and exited with his left foot first — the opposite of, for example, the bathroom, which he entered with the left and exited with the right.' },
      ],
    ),
    duration: '16:00',
    status: 'published',
    tags: ['adhkar', 'mosque', 'masjid', 'daily'],
    createdAt: '2026-04-28',
    updatedAt: '2026-04-28',
  },

  {
    id: 'l-adhkar-shughuli-safari',
    title: {
      sw: 'Dua za Safari na Usafiri',
      ar: 'أدعية السفر والركوب',
      en: 'Supplications for Travel and Riding',
    },
    slug: 'dua-za-safari',
    subjectId: 'adhkar',
    levelId: 'awali',
    courseId: 'adhkar-shughuli',
    order: 4,
    content: richContent(
      [
        { kind: 'h2', text: 'Safari katika Uislamu' },
        { kind: 'p', text: 'Safari ni hali ya kipekee inayoambatana na hatari na changamoto. Mtume ﷺ alisema: "Safari ni sehemu ya adhabu — inamzuia mtu kutoka chakula chake, kunywa chake, na usingizi wake. Hivyo akimaliza haja yake, na arudi haraka kwa familia yake" (Bukhari na Muslim). Pamoja na hayo, safari ina baraka maalumu — dua za msafiri zinakubaliwa kwa namna ya pekee, kama hadith inavyofundisha.' },
        { kind: 'h3', text: 'Dua kabla ya Kuanza Safari' },
        { kind: 'p', text: 'Kabla ya kuanza safari, ni sunna kufanya rakaa mbili za hiari — Salat al-Safar — na kisha kuomba kinga ya Allah na maongozi yake. Mtume ﷺ alituachia dua maarufu ya kuingia kwenye gari/ngamia/chombo cha usafiri:' },
        { kind: 'quote', text: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ' },
        { kind: 'p', text: 'Maana: "Utukufu kwa aliyetudhalilishia hiki, na hatukuwa na uwezo wa kuipata, na hakika sisi tunarejea kwa Mola wetu" (Abu Dawud na Tirmidhi). Aya hii imenukuliwa kutoka Sura Az-Zukhruf 43:13-14, na inakumbuka kwamba uwezo wa kuendesha vyombo vya usafiri ni neema ya Allah, sio uwezo wetu binafsi.' },
        { kind: 'h3', text: 'Dua Kamili ya Safari' },
        { kind: 'p', text: 'Mtume ﷺ alipoanza safari, alikuwa anasema baada ya dua ya juu:' },
        { kind: 'quote', text: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا، وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ' },
        { kind: 'p', text: 'Maana: "Ee Allah, tunakuomba katika safari yetu hii wema na taqwa, na matendo yanayokuridhisha. Ee Allah, tufurahishie safari hii, na ifupishe umbali wake. Ee Allah, wewe ndiwe rafiki katika safari, na kibadala katika familia." Imepokelewa na Muslim.' },
        { kind: 'h3', text: 'Mwishoni mwa Dua ya Kuanza' },
        { kind: 'p', text: 'Mtume ﷺ alimaliza dua ya kuanza safari kwa kusema:' },
        { kind: 'quote', text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ' },
        { kind: 'p', text: '"Ee Allah, najikinga kwako kutokana na uchovu wa safari, mwonekano wa kusikitisha, na hali mbaya ya kurudi kwa familia na mali" (Muslim).' },
        { kind: 'h3', text: 'Wakati wa Kupanda na Kushuka' },
        { kind: 'p', text: 'Mtume ﷺ alikuwa akihamia maeneo, na hupanda na kushuka njiani. Akasema: "Tukipanda mlima, tunasema: \'Allahu Akbar!\' (Allah ni Mkubwa!), na tukishuka, tunasema: \'Subhana Allah!\' (Utukufu kwa Allah!)" (Bukhari).' },
        { kind: 'h3', text: 'Dua wakati wa Kufika Mahali' },
        { kind: 'p', text: 'Anapofika mahali fulani — mji, kijiji, nyumba — Mwislamu anapaswa kusema:' },
        { kind: 'quote', text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ' },
        { kind: 'p', text: '"Najikinga kwa maneno kamili ya Allah dhidi ya shari ya alichokiumba." Mtume ﷺ alisema: "Atakayeisoma anapofika mahali, hatadhuriwa na chochote hadi atakapoondoka pale" (Muslim).' },
        { kind: 'h3', text: 'Dua za Kurudi' },
        { kind: 'p', text: 'Mtume ﷺ aliporudi safari, alikuwa anasema dua ya safari iliyorudiwa, akiongezea:' },
        { kind: 'quote', text: 'آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ' },
        { kind: 'p', text: '"Tunarudi, tunatubu, tunaabudu, na kwa Mola wetu tunamhimidi" (Bukhari na Muslim).' },
        { kind: 'h3', text: 'Hekima ya Dua za Safari' },
        { kind: 'p', text: 'Dua za safari zinatoa mafundisho mengi:' },
        { kind: 'ul', items: [
          'Kumtumainia Allah katika hali ya hatari na kutokuwa na uhakika',
          'Kukumbuka kwamba uwezo wa kuendesha gari, kuruka katika ndege, au kupanda mlima ni kutoka kwa Allah',
          'Kuwa makini kwa wapendwao tulioacha nyumbani — Allah ndiye anayewaangalia',
          'Kuona safari kama mfano wa safari ya kwenda kwa Allah — kila mtu yu safari hadi akifa, na atarudi kwa Mola wake'
        ] },
      ],
      [
        { kind: 'h2', text: 'السفر في الإسلام' },
        { kind: 'p', text: 'قال النبي ﷺ: "السفر قطعة من العذاب، يمنع أحدكم طعامه وشرابه ونومه. فإذا قضى نهمته فليعجّل إلى أهله" (متفق عليه). ومع ذلك للسفر بركات — دعاء المسافر مستجاب.' },
        { kind: 'h3', text: 'دعاء قبل السفر' },
        { kind: 'p', text: 'يُسنّ صلاة ركعتي السفر ثم الدعاء.' },
        { kind: 'quote', text: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ' },
        { kind: 'p', text: 'الزخرف ٤٣:١٣-١٤. رواه أبو داود والترمذي.' },
        { kind: 'h3', text: 'تتمة دعاء السفر' },
        { kind: 'quote', text: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا، وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ' },
        { kind: 'p', text: 'رواه مسلم.' },
        { kind: 'quote', text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ' },
        { kind: 'h3', text: 'الصعود والنزول' },
        { kind: 'p', text: 'قال ﷺ: "كنا إذا صعدنا كبّرنا وإذا نزلنا سبّحنا" (البخاري).' },
        { kind: 'h3', text: 'دعاء النزول بمكان' },
        { kind: 'quote', text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ' },
        { kind: 'p', text: 'قال ﷺ: "من نزل منزلاً ثم قال: أعوذ بكلمات الله التامات من شر ما خلق، لم يضرّه شيء حتى يرتحل" (مسلم).' },
        { kind: 'h3', text: 'دعاء العودة' },
        { kind: 'quote', text: 'آيِبُونَ، تَائِبُونَ، عَابِدُونَ، لِرَبِّنَا حَامِدُونَ' },
        { kind: 'p', text: 'متفق عليه.' },
        { kind: 'h3', text: 'حكمة أدعية السفر' },
        { kind: 'ul', items: [
          'التوكل على الله في حال الخطر',
          'تذكّر أن القدرة على ركوب المراكب من نعم الله',
          'الاطمئنان على الأهل — الله يحفظهم',
          'رؤية السفر مَثَلاً للسفر إلى الله'
        ] },
      ],
      [
        { kind: 'h2', text: 'Travel in Islam' },
        { kind: 'p', text: "The Prophet ﷺ said: 'Travel is a portion of punishment — it prevents one of you from his food, his drink, and his sleep. So when one has fulfilled his purpose, let him hasten back to his family' (Bukhari and Muslim). Yet travel also carries unique blessings — the supplication of the traveller is answered in a special way." },
        { kind: 'h3', text: 'Supplication Before Setting Out' },
        { kind: 'p', text: "Before setting out, it is sunnah to perform two voluntary rakaat — Salat al-Safar — and then to seek Allah's protection and guidance. The Prophet ﷺ left us a famous supplication for mounting one's transportation:" },
        { kind: 'quote', text: '"Glory be to Him who has subjected this for us, when we ourselves had not the strength to overcome it. And surely to our Lord we shall return."' },
        { kind: 'p', text: 'Quoted from Surah Az-Zukhruf 43:13-14 (Abu Dawud and at-Tirmidhi). The verse reminds us that the ability to operate vehicles is a blessing from Allah, not our own intrinsic capacity.' },
        { kind: 'h3', text: 'The Full Travel Supplication' },
        { kind: 'p', text: 'On setting out, the Prophet ﷺ would continue:' },
        { kind: 'quote', text: '"O Allah, we ask You on this our journey for righteousness and piety, and from deeds those which please You. O Allah, ease this journey for us, and fold up its distance. O Allah, You are the Companion in travel, and the Custodian of our family." (Muslim)' },
        { kind: 'h3', text: 'Concluding the Opening Supplication' },
        { kind: 'p', text: 'The Prophet ﷺ would conclude with:' },
        { kind: 'quote', text: '"O Allah, I take refuge in You from the difficulty of travel, the gloom of unpleasant scenes, and an evil return to family and property." (Muslim)' },
        { kind: 'h3', text: 'On Ascending and Descending' },
        { kind: 'p', text: "The Prophet ﷺ said: 'When we ascended, we would say Allahu Akbar; when we descended, we would say SubhanAllah' (Bukhari)." },
        { kind: 'h3', text: 'On Arriving at a Place' },
        { kind: 'p', text: 'When arriving anywhere — a city, village, or dwelling — a Muslim should say:' },
        { kind: 'quote', text: '"I take refuge in the perfect words of Allah from the evil of all that He has created."' },
        { kind: 'p', text: "The Prophet ﷺ said: 'Whoever recites this on arriving at a place, nothing will harm him until he leaves' (Muslim)." },
        { kind: 'h3', text: 'Supplications on Returning' },
        { kind: 'p', text: 'When returning from a journey, the Prophet ﷺ would repeat the travel supplication and add:' },
        { kind: 'quote', text: '"We are returning, repenting, worshipping, and praising our Lord." (Bukhari and Muslim)' },
        { kind: 'h3', text: 'The Wisdom of Travel Supplications' },
        { kind: 'p', text: 'These supplications carry many lessons:' },
        { kind: 'ul', items: [
          'Trusting in Allah amidst the dangers and uncertainties of travel',
          'Remembering that the ability to drive a car, fly in a plane, or ascend a mountain is from Allah',
          'Being at peace concerning loved ones left behind — Allah is their guardian',
          "Seeing a journey as a metaphor for the soul's journey to its Lord — every person is a traveller until death, and will return to his Maker"
        ] },
      ],
    ),
    duration: '18:00',
    status: 'published',
    tags: ['adhkar', 'travel', 'safar', 'daily'],
    createdAt: '2026-05-01',
    updatedAt: '2026-05-01',
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
    progress: ['quran-ni-nini', 'aina-za-najisi', 'wudhu'],
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
    subject: 'Swali la kuhusu Wudhu',
    message: 'Assalamu alaykum. Nina swali kuhusu hukumu ya wudhu — je, kugusa mke kunavunja wudhu kweli? Nimeona maoni tofauti.',
    status: 'new',
    createdAt: '2026-05-01',
  },
  {
    id: 'msg-2',
    name: 'Kassim Mwita',
    email: 'kassim@test.com',
    subject: 'Pendekezo la somo jipya',
    message: 'Assalamu alaykum. Naomba mtunge somo la kuhusu hukumu za zakat ya hisa za makampuni — ni mada inayosumbua wengi siku hizi. Jazakum Allahu khayran.',
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
  // Subjects
  { id: 'quran', slug: 'quran', name: { sw: "Qur'an", ar: 'القرآن', en: "Qur'an" }, type: 'subject' },
  { id: 'hadith', slug: 'hadith', name: { sw: 'Hadith', ar: 'الحديث', en: 'Hadith' }, type: 'subject' },
  { id: 'fiqh', slug: 'fiqh', name: { sw: 'Fiqhi', ar: 'الفقه', en: 'Fiqh' }, type: 'subject' },
  { id: 'tawhid', slug: 'tawhid', name: { sw: 'Tawhidi', ar: 'التوحيد', en: 'Tawhid' }, type: 'subject' },
  { id: 'sirah', slug: 'sirah', name: { sw: 'Sira', ar: 'السيرة', en: 'Sirah' }, type: 'subject' },
  { id: 'adhkar', slug: 'adhkar', name: { sw: 'Adhkar', ar: 'الأذكار', en: 'Adhkar' }, type: 'subject' },

  // Topics
  { id: 'introduction', slug: 'introduction', name: { sw: 'Utangulizi', ar: 'مقدمة', en: 'Introduction' }, type: 'topic' },
  { id: 'tajwid', slug: 'tajwid', name: { sw: 'Tajwid', ar: 'التجويد', en: 'Tajwid' }, type: 'topic' },
  { id: 'twahara', slug: 'twahara', name: { sw: 'Twahara', ar: 'الطهارة', en: 'Purification' }, type: 'topic' },
  { id: 'swala', slug: 'swala', name: { sw: 'Swala', ar: 'الصلاة', en: 'Prayer' }, type: 'topic' },
  { id: 'saumu', slug: 'saumu', name: { sw: 'Saumu', ar: 'الصيام', en: 'Fasting' }, type: 'topic' },
  { id: 'zaka', slug: 'zaka', name: { sw: 'Zaka', ar: 'الزكاة', en: 'Zakat' }, type: 'topic' },
  { id: 'aqeedah', slug: 'aqeedah', name: { sw: 'Aqida', ar: 'العقيدة', en: 'Aqeedah' }, type: 'topic' },
  { id: 'shirk', slug: 'shirk', name: { sw: 'Shirk', ar: 'الشرك', en: 'Shirk' }, type: 'topic' },
  { id: 'makkah', slug: 'makkah', name: { sw: 'Makkah', ar: 'مكة', en: 'Makkah' }, type: 'topic' },
  { id: 'madinah', slug: 'madinah', name: { sw: 'Madinah', ar: 'المدينة', en: 'Madinah' }, type: 'topic' },
  { id: 'morning', slug: 'morning', name: { sw: 'Asubuhi', ar: 'الصباح', en: 'Morning' }, type: 'topic' },
  { id: 'evening', slug: 'evening', name: { sw: 'Jioni', ar: 'المساء', en: 'Evening' }, type: 'topic' },
  { id: 'daily', slug: 'daily', name: { sw: 'Kila Siku', ar: 'يومية', en: 'Daily' }, type: 'topic' },

  // Difficulty
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
