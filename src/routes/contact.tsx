import { createFileRoute } from '@tanstack/react-router'
import { Mail, MapPin } from 'lucide-react'

import { useLanguage } from '#/hooks/useLanguage'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="container-main py-12 lg:py-16">
      <h1 className="text-[28px] font-bold leading-[1.3] text-foreground lg:text-[36px]">
        {t('navigation.contact')}
      </h1>
      <div className="mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
        <div className="border border-border bg-white p-6">
          <Mail aria-hidden="true" size={32} className="mb-4 text-accent" />
          <h2 className="mb-2 text-[20px] font-semibold text-foreground">Email</h2>
          <p className="text-muted-foreground">info@ahlusunna.info</p>
        </div>
        <div className="border border-border bg-white p-6">
          <MapPin aria-hidden="true" size={32} className="mb-4 text-accent" />
          <h2 className="mb-2 text-[20px] font-semibold text-foreground">Zanzibar</h2>
          <p className="text-muted-foreground">Tanzania</p>
        </div>
      </div>
    </div>
  )
}
