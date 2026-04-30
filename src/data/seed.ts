import type {
  Lesson,
  Level,
  LevelId,
  MultilingualContent,
  Subject,
  SubjectId,
  TiptapDocument,
  User,
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
      sw: "Makosa ya Tafsiri ya Qur'an",
      ar: 'أحكام تجويد القرآن',
      en: 'Quranic Recitation Rules',
    },
    slug: 'quranic-recitation-rules',
    subjectId: 'quran',
    levelId: 'awali',
    order: 2,
    content: content(
      "Makosa ya Tafsiri ya Qur'an",
      "Kusoma Qur'an kwa ufanisi kunahitaji kuzingatia kanuni za tajwid. Tajwid ni sayansi ya kusoma Qur'an kwa maumbile yake sahihi.",
      'أحكام تجويد القرآن',
      'قراءة القرآن بإتقان تتطلب اتباع قواعد التجويد. التجويد هو علم قراءة القرآن بشكله الصحيح.',
      'Quranic Recitation Rules',
      'Reading the Quran proficiently requires following the rules of tajwid. Tajwid is the science of reading the Quran in its proper form.',
    ),
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
    content: content(
      'Maana ya Sura Al-Ikhlas',
      'Sura Al-Ikhlas ni sura fupi yenye aya nne tu, lakini ina umuhimu mkubwa katika Uislamu. Inasimamia imani ya Muislamu katika Mungu mmoja.',
      'معاني سورة الإخلاص',
      'سورة الإخلاص هي سورة قصيرة تتكون من أربع آيات فقط، لكنها ذات أهمية كبيرة في الإسلام. تؤكد إيمان المسلم بالإله الواحد.',
      'Meaning of Surah Al-Ikhlas',
      'Surah Al-Ikhlas is a short surah of only four verses, but it holds great importance in Islam. It affirms the Muslim belief in one God.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    audioType: 'lecture',
    duration: '18:45',
    thumbnail: '/thumbnails/ikhlas.jpg',
    createdAt: '2024-01-25',
  },
  {
    id: 'hadith-1',
    title: { sw: 'Utangulizi wa Hadith', ar: 'مقدمة في الحديث', en: 'Introduction to Hadith' },
    slug: 'introduction-to-hadith',
    subjectId: 'hadith',
    levelId: 'awali',
    order: 1,
    content: content(
      'Utangulizi wa Hadith',
      "Hadith ni taarifa zinazohusu maneno, matendo, au ridha ya Mtume Muhammad (SAW). Hadith ni chanzo cha pili cha sheria ya Kiislamu baada ya Qur'an.",
      'مقدمة في الحديث',
      'الحديث هو الخبر المتعلق بأقوال أو أفعال أو موافقات النبي محمد ﷺ. الحديث هو المصدر الثاني للشريعة الإسلامية بعد القرآن.',
      'Introduction to Hadith',
      'Hadith refers to reports concerning the words, actions, or approval of Prophet Muhammad (PBUH). Hadith is the second source of Islamic law after the Quran.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    audioType: 'lecture',
    duration: '20:00',
    thumbnail: '/thumbnails/hadith-intro.jpg',
    createdAt: '2024-02-01',
  },
  {
    id: 'hadith-2',
    title: { sw: 'Hadith 40 za Nawawi', ar: 'الأربعون النووية', en: 'The 40 Hadith of Nawawi' },
    slug: 'forty-hadith-of-nawawi',
    subjectId: 'hadith',
    levelId: 'awali',
    order: 2,
    content: content(
      'Hadith 40 za Nawawi',
      'Imam Nawawi aliichagua hadith 40 muhimu zaidi katika Uislamu. Hadith hizi zinafunza misingi ya imani, ibada, na maadili.',
      'الأربعون النووية',
      'اختار الإمام النووي أربعين حديثًا هي الأكثر أهمية في الإسلام. هذه الأحاديث تعلم أساسيات الإيمان والعبادة والأخلاق.',
      'The 40 Hadith of Nawawi',
      'Imam Nawawi selected the 40 most important hadith in Islam. These hadith teach the fundamentals of faith, worship, and morality.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    audioType: 'lecture',
    duration: '25:00',
    thumbnail: '/thumbnails/nawawi.jpg',
    createdAt: '2024-02-05',
  },
  {
    id: 'hadith-3',
    title: { sw: 'Hadith za Maadili', ar: 'أحاديث الأخلاق', en: 'Hadith on Morality' },
    slug: 'hadith-on-morality',
    subjectId: 'hadith',
    levelId: 'awali',
    order: 3,
    content: content(
      'Hadith za Maadili',
      'Mtume Muhammad (SAW) alitufundisha maadili mema katika kila sekta ya maisha. Hadith hizi zinatuonyesha jinsi ya kuwa Muislamu mwema.',
      'أحاديث الأخلاق',
      'علمنا النبي محمد ﷺ الأخلاق الحميدة في كل مجال من مجالات الحياة. هذه الأحاديث تُرينا كيف نكون مسلمًا صالحًا.',
      'Hadith on Morality',
      'Prophet Muhammad (PBUH) taught us good morals in every aspect of life. These hadith show us how to be a righteous Muslim.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    audioType: 'lecture',
    duration: '19:15',
    thumbnail: '/thumbnails/morality.jpg',
    createdAt: '2024-02-10',
  },
  {
    id: 'fiqhi-1',
    title: { sw: 'Mafunzo ya Tahara', ar: 'أحكام الطهارة', en: 'Rules of Purification' },
    slug: 'rules-of-purification',
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 1,
    content: content(
      'Mafunzo ya Tahara',
      'Tahara ni msingi wa ibada katika Uislamu. Bila usafi, sala zetu hazikubaliwi.',
      'أحكام الطهارة',
      'الطهارة هي أساس العبادة في الإسلام. بدون طهارة، لا تقبل صلاتنا.',
      'Rules of Purification',
      'Purification is the foundation of worship in Islam. Without purification, our prayers are not accepted.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    audioType: 'lecture',
    duration: '21:30',
    thumbnail: '/thumbnails/tahara.jpg',
    createdAt: '2024-02-15',
  },
  {
    id: 'fiqhi-2',
    title: { sw: 'Mafunzo ya Sala', ar: 'أحكام الصلاة', en: 'Rules of Prayer' },
    slug: 'rules-of-prayer',
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 2,
    content: content(
      'Mafunzo ya Sala',
      'Sala ni nguzo ya Uislamu. Ni faradhi kwa kila Muislamu mwenye akili timamu na umri wa kufika.',
      'أحكام الصلاة',
      'الصلاة هي ركن الإسلام. هي فرض على كل مسلم بالغ عاقل.',
      'Rules of Prayer',
      'Prayer is the pillar of Islam. It is obligatory for every Muslim of sound mind who has reached puberty.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    audioType: 'lecture',
    duration: '28:00',
    thumbnail: '/thumbnails/sala.jpg',
    createdAt: '2024-02-20',
  },
  {
    id: 'fiqhi-3',
    title: { sw: 'Mafunzo ya Saumu', ar: 'أحكام الصيام', en: 'Rules of Fasting' },
    slug: 'rules-of-fasting',
    subjectId: 'fiqhi',
    levelId: 'awali',
    order: 3,
    content: content(
      'Mafunzo ya Saumu',
      'Saumu ya mwezi wa Ramadhani ni faradhi kwa kila Muislamu mwenye akili timamu na umri wa kufika.',
      'أحكام الصيام',
      'صيام شهر رمضان فرض على كل مسلم بالغ عاقل.',
      'Rules of Fasting',
      'Fasting during the month of Ramadan is obligatory for every Muslim of sound mind who has reached puberty.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    audioType: 'lecture',
    duration: '24:00',
    thumbnail: '/thumbnails/saumu.jpg',
    createdAt: '2024-02-25',
  },
  {
    id: 'tawhidi-1',
    title: { sw: 'Maana ya Tawhidi', ar: 'معنى التوحيد', en: 'Meaning of Tawhid' },
    slug: 'meaning-of-tawhid',
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 1,
    content: content(
      'Maana ya Tawhidi',
      'Tawhidi ni imani katika Mungu mmoja pekee. Ni msingi wa Uislamu na jambo la kwanza ambalo Mtume (SAW) aliliita watu.',
      'معنى التوحيد',
      'التوحيد هو الإيمان بالإله الواحد الأحد. هو أساس الإسلام وأول ما دعا إليه النبي ﷺ.',
      'Meaning of Tawhid',
      'Tawhid is the belief in one God alone. It is the foundation of Islam and the first thing the Prophet (PBUH) called people to.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    audioType: 'lecture',
    duration: '17:00',
    thumbnail: '/thumbnails/tawhid-intro.jpg',
    createdAt: '2024-03-01',
  },
  {
    id: 'tawhidi-2',
    title: { sw: 'Aina za Tawhidi', ar: 'أنواع التوحيد', en: 'Types of Tawhid' },
    slug: 'types-of-tawhid',
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 2,
    content: content(
      'Aina za Tawhidi',
      'Tawhidi imegawanywa katika aina tatu: Tawhidi Rububiyyah, Tawhidi Uluhiyyah, na Tawhidi Asma wa Sifa.',
      'أنواع التوحيد',
      'ينقسم التوحيد إلى ثلاثة أنواع: توحيد الربوبية، وتوحيد الألوهية، وتوحيد الأسماء والصفات.',
      'Types of Tawhid',
      'Tawhid is divided into three types: Tawhid Rububiyyah, Tawhid Uluhiyyah, and Tawhid Asma wa Sifa.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    audioType: 'lecture',
    duration: '23:30',
    thumbnail: '/thumbnails/tawhid-types.jpg',
    createdAt: '2024-03-05',
  },
  {
    id: 'tawhidi-3',
    title: { sw: 'Shirk na Jinsi ya Kuepuka', ar: 'الشرك وكيفية تجنبه', en: 'Shirk and How to Avoid It' },
    slug: 'shirk-and-how-to-avoid',
    subjectId: 'tawhidi',
    levelId: 'awali',
    order: 3,
    content: content(
      'Shirk na Jinsi ya Kuepuka',
      'Shirk ni kuunganisha washirika na Mungu katika ibada au sifa zake. Ni dhambi kubwa zaidi katika Uislamu.',
      'الشرك وكيفية تجنبه',
      'الشرك هو إشراك غير الله في العبادة أو صفاته. هو أكبر ذنب في الإسلام.',
      'Shirk and How to Avoid It',
      'Shirk is associating partners with God in worship or His attributes. It is the greatest sin in Islam.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    audioType: 'lecture',
    duration: '26:00',
    thumbnail: '/thumbnails/shirk.jpg',
    createdAt: '2024-03-10',
  },
  {
    id: 'sira-1',
    title: { sw: 'Kuzaliwa kwa Mtume (SAW)', ar: 'مولد النبي ﷺ', en: 'Birth of the Prophet (PBUH)' },
    slug: 'birth-of-the-prophet',
    subjectId: 'sira',
    levelId: 'awali',
    order: 1,
    content: content(
      'Kuzaliwa kwa Mtume (SAW)',
      'Mtume Muhammad (SAW) alizaliwa katika mji wa Makkah mnamo mwaka 571 BK. Jina lake la kwanza lilikuwa Muhammad, na jina la pili lilikuwa Ahmad.',
      'مولد النبي ﷺ',
      'وُلد النبي محمد ﷺ في مدينة مكة المكرمة عام 571 م. اسمه الأول محمد، واسمه الثاني أحمد.',
      'Birth of the Prophet (PBUH)',
      'Prophet Muhammad (PBUH) was born in the city of Makkah in the year 571 CE. His first name was Muhammad, and his second name was Ahmad.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    audioType: 'lecture',
    duration: '16:30',
    thumbnail: '/thumbnails/birth.jpg',
    createdAt: '2024-03-15',
  },
  {
    id: 'sira-2',
    title: { sw: 'Utoaji wa Ujumbe wa Uislamu', ar: 'بعثة النبي ﷺ', en: 'The Prophetic Mission' },
    slug: 'the-prophetic-mission',
    subjectId: 'sira',
    levelId: 'awali',
    order: 2,
    content: content(
      'Utoaji wa Ujumbe wa Uislamu',
      'Mtume Muhammad (SAW) alianza kupokea ujumbe wa Uislamu akiwa na umri wa miaka arobaini. Ujumbe wa kwanza ulikuwa "Iqra" kutoka Sura Al-Alaq.',
      'بعثة النبي ﷺ',
      'بدأ النبي محمد ﷺ في تلقي الرسالة الإسلامية وهو في الأربعين من عمره. الرسالة الأولى كانت "اقرأ" من سورة العلق.',
      'The Prophetic Mission',
      'Prophet Muhammad (PBUH) began receiving the message of Islam at the age of forty. The first message was "Iqra" from Surah Al-Alaq.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    audioType: 'lecture',
    duration: '27:00',
    thumbnail: '/thumbnails/mission.jpg',
    createdAt: '2024-03-20',
  },
  {
    id: 'sira-3',
    title: { sw: 'Hijra ya Madina', ar: 'الهجرة إلى المدينة', en: 'The Hijra to Madinah' },
    slug: 'hijra-to-madinah',
    subjectId: 'sira',
    levelId: 'awali',
    order: 3,
    content: content(
      'Hijra ya Madina',
      'Hijra ni uhamiaji wa Mtume Muhammad (SAW) kutoka Makkah kwenda Madina mnamo mwaka 622 BK. Tukio hili ndilo lilioanza kalenda ya Kiislamu.',
      'الهجرة إلى المدينة',
      'الهجرة هي هجرة النبي محمد ﷺ من مكة إلى المدينة عام 622 م. هذا الحدث هو بداية التقويم الهجري.',
      'The Hijra to Madinah',
      'The Hijra is the migration of Prophet Muhammad (PBUH) from Makkah to Madinah in the year 622 CE. This event marks the beginning of the Islamic calendar.',
    ),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    audioType: 'lecture',
    duration: '25:30',
    thumbnail: '/thumbnails/hijra.jpg',
    createdAt: '2024-03-25',
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
    createdAt: '2024-04-01',
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
    createdAt: '2024-04-05',
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
    createdAt: '2024-04-10',
  },
]

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
]

export const mockCredentials: Record<string, string> = {
  'admin@ahlusunna.info': 'admin123',
  'mwanafunzi@ahlusunna.info': 'user123',
  'mwanajumuia@ahlusunna.info': 'user123',
}

export const getLessonsBySubject = (subjectId: SubjectId): Lesson[] =>
  lessons.filter((lesson) => lesson.subjectId === subjectId).sort((a, b) => a.order - b.order)

export const getLessonsByLevel = (levelId: LevelId): Lesson[] =>
  lessons.filter((lesson) => lesson.levelId === levelId).sort((a, b) => a.order - b.order)

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
