import type { FormEvent } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, ChevronLeft, ChevronRight, HelpCircle, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import { useState } from 'react'

import { contactService } from '#/data/services'
import { useLanguage } from '#/hooks/useLanguage'
import type { Language } from '#/types'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

const pageCopy: Record<Language, any> = {
  sw: {
    breadcrumbHome: 'Nyumbani',
    breadcrumbContact: 'Wasiliana Nasi',
    eyebrow: 'Tuko Hapa Kukusaidia',
    title: 'Wasiliana Nasi',
    subtitle: 'Una swali kuhusu Uislamu? Umeona kosa katika somo? Au unataka kuchangia? Andika kwetu — tutajibu ndani ya saa 24.',
    formTitle: 'Tuma Ujumbe',
    formDesc: 'Jaza fomu hii — tutajibu kupitia barua pepe ndani ya masaa 24 ya kazi.',
    labelName: 'Jina kamili',
    placeholderName: 'Mfano: Asha Mohamed',
    labelEmail: 'Barua pepe',
    placeholderEmail: 'jina@email.com',
    labelType: 'Aina ya ujumbe',
    typeOptions: ['Swali la kidini', 'Kosa katika somo', 'Kuchangia / Waqf', 'Ushirikiano', 'Mengineyo'],
    labelTitle: 'Kichwa',
    placeholderTitle: 'Kichwa kifupi cha ujumbe wako',
    labelMessage: 'Ujumbe',
    placeholderMessage: 'Andika ujumbe wako kwa undani...',
    messageHelp: 'Kima cha chini cha herufi 20 · Tumia Kiswahili au Kiingereza',
    termsAgree: 'Nakubali',
    termsPrivacy: 'Sera ya Faragha',
    termsRest: 'na ninafahamu kuwa ujumbe wangu utachukuliwa kwa heshima.',
    btnSubmit: 'Tuma Ujumbe',
    btnSending: 'Inatuma...',
    infoTitle: 'Njia za Mawasiliano',
    infoDesc: 'Chagua njia inayokufaa zaidi.',
    contactEmail: 'Barua Pepe',
    contactEmailHelp: 'Jibu ndani ya saa 24',
    contactPhone: 'WhatsApp',
    contactPhoneHelp: 'Jumatatu – Ijumaa, 9 asubuhi – 5 jioni (EAT)',
    contactOffice: 'Ofisi',
    contactOfficeHelp: 'Tanzania · Karibu kwa miadi',
    contactFatwa: 'Fatwa & Maswali ya Dini',
    contactFatwaHelp: 'Jibu kutoka kwa masheikh wenye mafunzo',
    faqTitle: 'Maswali Yanayoulizwa Sana',
    faqs: [
      'Je, ninahitaji akaunti kuanza?',
      'Masomo yapo Kiswahili tu?',
      'Ninawezaje kuchangia?',
      'Mahatua ya Kati zinapatikana lini?',
    ],
    successToast: 'Ujumbe wako umetumwa kikamilifu!',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbContact: 'Contact Us',
    eyebrow: 'We Are Here To Help',
    title: 'Contact Us',
    subtitle: 'Have a question about Islam? Found an error in a lesson? Or want to donate? Write to us — we will reply within 24 hours.',
    formTitle: 'Send a Message',
    formDesc: 'Fill out this form — we will reply via email within 24 business hours.',
    labelName: 'Full Name',
    placeholderName: 'Example: Asha Mohamed',
    labelEmail: 'Email',
    placeholderEmail: 'name@email.com',
    labelType: 'Message Type',
    typeOptions: ['Religious question', 'Error in lesson', 'Donation / Waqf', 'Partnership', 'Other'],
    labelTitle: 'Subject',
    placeholderTitle: 'A short subject for your message',
    labelMessage: 'Message',
    placeholderMessage: 'Write your message in detail...',
    messageHelp: 'Minimum 20 characters · Use Swahili or English',
    termsAgree: 'I accept the',
    termsPrivacy: 'Privacy Policy',
    termsRest: 'and understand that my message will be treated with respect.',
    btnSubmit: 'Send Message',
    btnSending: 'Sending...',
    infoTitle: 'Contact Channels',
    infoDesc: 'Choose the most convenient channel for you.',
    contactEmail: 'Email',
    contactEmailHelp: 'Reply within 24 hours',
    contactPhone: 'WhatsApp',
    contactPhoneHelp: 'Monday – Friday, 9 AM – 5 PM (EAT)',
    contactOffice: 'Office',
    contactOfficeHelp: 'Tanzania · Welcome by appointment',
    contactFatwa: 'Fatwa & Religious Questions',
    contactFatwaHelp: 'Reply from trained scholars',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      'Do I need an account to start?',
      'Are lessons only in Swahili?',
      'How can I donate?',
      'When will the Intermediate levels be available?',
    ],
    successToast: 'Your message has been sent successfully!',
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbContact: 'اتصل بنا',
    eyebrow: 'نحن هنا للمساعدة',
    title: 'اتصل بنا',
    subtitle: 'هل لديك سؤال عن الإسلام؟ هل وجدت خطأ في درس؟ أو تريد التبرع؟ اكتب إلينا — سنقوم بالرد خلال ٢٤ ساعة.',
    formTitle: 'إرسال رسالة',
    formDesc: 'املأ هذا النموذج — سنرد عبر البريد الإلكتروني خلال ٢٤ ساعة عمل.',
    labelName: 'الاسم الكامل',
    placeholderName: 'مثال: عائشة محمد',
    labelEmail: 'البريد الإلكتروني',
    placeholderEmail: 'name@email.com',
    labelType: 'نوع الرسالة',
    typeOptions: ['سؤال ديني', 'خطأ في الدرس', 'تبرع / وقف', 'شراكة', 'أخرى'],
    labelTitle: 'الموضوع',
    placeholderTitle: 'موضوع قصير لرسالتك',
    labelMessage: 'الرسالة',
    placeholderMessage: 'اكتب رسالتك بالتفصيل...',
    messageHelp: 'الحد الأدنى ٢٠ حرفًا · استخدم السواحيلية أو الإنجليزية أو العربية',
    termsAgree: 'أوافق على',
    termsPrivacy: 'سياسة الخصوصية',
    termsRest: 'وأدرك أن رسالتي ستعامل باحترام.',
    btnSubmit: 'إرسال الرسالة',
    btnSending: 'جارٍ الإرسال...',
    infoTitle: 'قنوات الاتصال',
    infoDesc: 'اختر القناة الأكثر ملاءمة لك.',
    contactEmail: 'البريد الإلكتروني',
    contactEmailHelp: 'الرد خلال ٢٤ ساعة',
    contactPhone: 'واتساب',
    contactPhoneHelp: 'الاثنين - الجمعة، ٩ صباحاً - ٥ مساءً (بتوقيت شرق إفريقيا)',
    contactOffice: 'المكتب',
    contactOfficeHelp: 'تنزانيا · مرحب بك عن طريق موعد',
    contactFatwa: 'فتاوى وأسئلة دينية',
    contactFatwaHelp: 'رد من علماء متدربين',
    faqTitle: 'الأسئلة الشائعة',
    faqs: [
      'هل أحتاج إلى حساب للبدء؟',
      'هل الدروس باللغة السواحيلية فقط؟',
      'كيف يمكنني التبرع؟',
      'متى ستتوفر المستويات المتوسطة؟',
    ],
    successToast: 'تم إرسال رسالتك بنجاح!',
  }
}

function ContactPage() {
  const { currentLang } = useLanguage()
  const copy = pageCopy[currentLang]
  const isRtl = currentLang === 'ar'
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await contactService.sendMessage()
      
      e.currentTarget.reset()
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background flex flex-col min-h-[calc(100vh-64px)] relative" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Custom Toast */}
      {showToast && (
        <div className={cn(
          "fixed top-4 z-50 flex items-center gap-3 bg-[#1B4332] text-white px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-top-4",
          isRtl ? "left-4" : "right-4"
        )}>
          <CheckCircle2 className="size-5 text-accent" />
          <div className="text-[13px] font-medium">{copy.successToast}</div>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-8 lg:px-12 lg:py-10">
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
            <span className="text-[#FAF7F0]/85 font-semibold">{copy.breadcrumbContact}</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
          
          {/* Form */}
          <div className="bg-surface p-8 lg:p-10">
            <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-1.5">{copy.formTitle}</h3>
            <p className="text-[13px] text-muted-foreground mb-6 leading-[1.55]">
              {copy.formDesc}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-foreground mb-1.5 tracking-[0.02em]">
                    {copy.labelName}<span className={cn("text-accent", isRtl ? "mr-0.5" : "ml-0.5")}>*</span>
                  </label>
                  <input 
                    name="name"
                    required
                    className="w-full font-sans text-[14px] p-[11px_14px] bg-background border border-border text-foreground transition-colors focus:outline-none focus:border-primary focus:bg-surface" 
                    type="text" 
                    placeholder={copy.placeholderName}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-foreground mb-1.5 tracking-[0.02em]">
                    {copy.labelEmail}<span className={cn("text-accent", isRtl ? "mr-0.5" : "ml-0.5")}>*</span>
                  </label>
                  <input 
                    name="email"
                    required
                    className="w-full font-sans text-[14px] p-[11px_14px] bg-background border border-border text-foreground transition-colors focus:outline-none focus:border-primary focus:bg-surface text-left" 
                    dir="ltr"
                    type="email" 
                    placeholder={copy.placeholderEmail}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-foreground mb-1.5 tracking-[0.02em]">
                  {copy.labelType}<span className={cn("text-accent", isRtl ? "mr-0.5" : "ml-0.5")}>*</span>
                </label>
                <select 
                  name="type"
                  required
                  className="w-full font-sans text-[14px] p-[11px_14px] bg-background border border-border text-foreground transition-colors focus:outline-none focus:border-primary focus:bg-surface"
                >
                  {copy.typeOptions.map((opt: string, i: number) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-foreground mb-1.5 tracking-[0.02em]">
                  {copy.labelTitle}<span className={cn("text-accent", isRtl ? "mr-0.5" : "ml-0.5")}>*</span>
                </label>
                <input 
                  name="title"
                  required
                  className="w-full font-sans text-[14px] p-[11px_14px] bg-background border border-border text-foreground transition-colors focus:outline-none focus:border-primary focus:bg-surface" 
                  type="text" 
                  placeholder={copy.placeholderTitle}
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-foreground mb-1.5 tracking-[0.02em]">
                  {copy.labelMessage}<span className={cn("text-accent", isRtl ? "mr-0.5" : "ml-0.5")}>*</span>
                </label>
                <textarea 
                  name="message"
                  required
                  minLength={20}
                  className="w-full font-sans text-[14px] p-[11px_14px] bg-background border border-border text-foreground transition-colors focus:outline-none focus:border-primary focus:bg-surface min-h-32.5 resize-y leading-[1.55]" 
                  placeholder={copy.placeholderMessage}
                ></textarea>
                <div className="text-[11px] text-muted-foreground mt-1.5">
                  {copy.messageHelp}
                </div>
              </div>

              <div>
                <label className="flex items-start gap-2.5 text-[13px] text-muted-foreground cursor-pointer leading-normal">
                  <input type="checkbox" required className="w-4 h-4 mt-0.5 shrink-0 accent-primary" />
                  <span>
                    {copy.termsAgree} <Link to="/" className="text-primary font-semibold hover:underline">{copy.termsPrivacy}</Link> {copy.termsRest}
                  </span>
                </label>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "mt-2 w-full p-3.25 bg-primary text-white border-none font-sans text-[14px] font-semibold cursor-pointer transition-colors letter-spacing-[0.01em] flex items-center justify-center gap-2",
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-dark",
                  isRtl ? "flex-row-reverse" : ""
                )}
              >
                {isSubmitting ? copy.btnSending : copy.btnSubmit}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {isRtl ? (
                    <>
                      <line x1="2" y1="12" x2="13" y2="12" />
                      <polygon points="2 12 9 5 13 12 2 12" />
                    </>
                  ) : (
                    <>
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </>
                  )}
                </svg>
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="bg-[#FDFCF8] p-8 lg:p-10">
            <h3 className="text-[18px] font-bold tracking-[-0.01em] mb-1.5">{copy.infoTitle}</h3>
            <p className="text-[13px] text-muted-foreground mb-4 leading-[1.55]">
              {copy.infoDesc}
            </p>

            <div className="flex gap-3.5 py-4.5 border-b border-border">
              <div className="flex size-10 shrink-0 items-center justify-center bg-[#1B4332]/6 border border-border">
                <Mail className="size-4.5 text-primary" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground">{copy.contactEmail}</div>
                <div className="mt-0.5 text-[14px] font-semibold text-foreground">info@ahlusunna.info</div>
                <div className="mt-0.75 text-[12px] text-muted-foreground">{copy.contactEmailHelp}</div>
              </div>
            </div>

            <div className="flex gap-3.5 py-4.5 border-b border-border">
              <div className="flex size-10 shrink-0 items-center justify-center bg-[#1B4332]/6 border border-border">
                <Phone className="size-4.5 text-primary" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground">{copy.contactPhone}</div>
                <div className="mt-0.5 text-[14px] font-semibold text-foreground" dir="ltr">+255 777 123 456</div>
                <div className="mt-0.75 text-[12px] text-muted-foreground">{copy.contactPhoneHelp}</div>
              </div>
            </div>

            <div className="flex gap-3.5 py-4.5 border-b border-border">
              <div className="flex size-10 shrink-0 items-center justify-center bg-[#1B4332]/6 border border-border">
                <MapPin className="size-4.5 text-primary" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground">{copy.contactOffice}</div>
                <div className="mt-0.5 text-[14px] font-semibold text-foreground">Stone Town, Zanzibar</div>
                <div className="mt-0.75 text-[12px] text-muted-foreground">{copy.contactOfficeHelp}</div>
              </div>
            </div>

            <div className="flex gap-3.5 py-4.5">
              <div className="flex size-10 shrink-0 items-center justify-center bg-[#1B4332]/6 border border-border">
                <MessageSquare className="size-4.5 text-primary" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground">{copy.contactFatwa}</div>
                <div className="mt-0.5 text-[14px] font-semibold text-foreground">fatwa@ahlusunna.info</div>
                <div className="mt-0.75 text-[12px] text-muted-foreground">{copy.contactFatwaHelp}</div>
              </div>
            </div>

            <div className="mt-7 bg-background border border-border p-6 lg:p-7">
              <h4 className="flex items-center gap-2 text-[13px] font-bold mb-3.5">
                <HelpCircle className="size-3.5 text-primary" strokeWidth={2.5} />
                {copy.faqTitle}
              </h4>
              {copy.faqs.map((faq: string, i: number) => (
                <div key={i} className="flex items-center justify-between cursor-pointer border-t border-border py-2.5 text-[13px] text-muted-foreground hover:text-primary transition-colors">
                  {faq} {isRtl ? <ChevronLeft className="size-3.5 text-accent" /> : <ChevronRight className="size-3.5 text-accent" />}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </div>
  )
}
