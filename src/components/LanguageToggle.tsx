import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="nav-liquid-link flex items-center gap-1.5"
      aria-label={lang === 'en' ? 'Switch to Bulgarian' : 'Switch to English'}
    >
      <span className="relative z-10 text-sm font-semibold">
        {lang === 'en' ? '🇧🇬 BG' : '🇬🇧 EN'}
      </span>
    </button>
  )
}
