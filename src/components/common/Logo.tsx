import { cn } from '#/lib/utils'

export interface LogoProps {
  variant?: 'full' | 'compact' | 'icon'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  withText?: boolean
  className?: string
  showDome?: boolean
}

const LOGO_PATHS = {
  full: '/Ahlusunna-logo.png',
  compact: '/Ahlusunna-logo.png',
  icon: '/Ahlusunna-logo.png',
}

const SIZE_CLASSES = {
  sm: 'h-14',
  md: 'h-16',
  lg: 'h-24',
  xl: 'h-32',
}

const VARIANT_WRAPPER = {
  full: 'flex items-center gap-3',
  compact: 'flex items-center gap-2',
  icon: 'flex items-center',
}

function DomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 4C14 4 10 10 8 16C6 22 4 32 4 36H36V32C36 22 34 10 32 16C30 10 26 4 20 4Z"
        fill="#1B4332"
      />
      <rect x="2" y="30" width="36" height="6" fill="#1B4332" />
      <rect x="18" y="2" width="4" height="4" fill="#C9A84C" />
      <circle cx="20" cy="14" r="3" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
    </svg>
  )
}

function LogoText({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <span className="font-decorative text-xl font-bold leading-none text-[#1B4332]">
        Ahlusunna
      </span>
    </div>
  )
}

export function Logo({
  variant = 'full',
  size = 'md',
  withText = true,
  className,
  showDome = true,
}: LogoProps) {
  const heightClass = SIZE_CLASSES[size]
  const wrapperClass = VARIANT_WRAPPER[variant]

  const logoImage = (
    <img
      src={LOGO_PATHS[variant]}
      alt="Ahlusunna Islamic Learning Platform"
      className={cn(
        'h-full w-auto object-contain',
        'transition-all duration-200',
        heightClass,
      )}
      loading="eager"
    />
  )

  const domeIcon = showDome && variant !== 'icon' && (
    <DomeIcon className={cn('shrink-0', size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10')} />
  )

  if (variant === 'icon') {
    return (
      <div className={cn('relative', className)}>
        {logoImage}
      </div>
    )
  }

  return (
    <div className={cn(wrapperClass, className)}>
      <div className="relative flex h-full items-center">
        {logoImage}
      </div>
      {withText && <LogoText />}
      {domeIcon}
    </div>
  )
}

export function LogoNavbar({ className }: { className?: string }) {
  return (
    <img
      src="/Logos/Logo-with-no-background/Horizontal-icon-text-right.png"
      alt="Ahlusunna Islamic Learning"
      className={cn(
        'h-12 w-auto object-contain object-left sm:h-16 lg:h-20',
        className,
      )}
    />
  )
}

export function LogoHero({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <Logo
        variant="full"
        size="xl"
        withText={true}
        showDome={true}
        className="mx-auto"
      />
    </div>
  )
}

export function LogoFooter({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <img
        src={LOGO_PATHS.full}
        alt="Ahlusunna"
        className="h-14 w-auto object-contain"
      />
    </div>
  )
}

export function LogoAdmin({ className }: { className?: string }) {
  return (
    <Logo
      variant="compact"
      size="md"
      withText={false}
      showDome={false}
      className={className}
    />
  )
}

export function LogoAdminCollapsed({ className }: { className?: string }) {
  return (
    <img
      src={LOGO_PATHS.icon}
      alt="Ahlusunna"
      className={cn('h-9 w-auto object-contain', className)}
    />
  )
}
