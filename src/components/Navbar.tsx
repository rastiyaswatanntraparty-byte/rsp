import React, { useState } from 'react';
import { RspLogo } from './RspLogo';
import { Language } from '../types';
import { Search, Phone, Menu, X, ShieldCheck, Languages, BellRing } from 'lucide-react';
import { CONTACT_INFO } from '../data/initialData';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenCardSearch: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  onOpenCardSearch,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', labelNe: 'गृहपृष्ठ', labelEn: 'Home' },
    { id: 'agendas', labelNe: '४ मुख्य एजेन्डा', labelEn: '4 Agendas' },
    { id: 'tole-committees', labelNe: '८ टोल समिति', labelEn: '8 Toles' },
    { id: 'leadership', labelNe: 'कार्यसमिति', labelEn: 'Leadership' },
    { id: 'live-poll', labelNe: 'नागरिक जनमत', labelEn: 'Live Poll' },
    { id: 'grievance', labelNe: 'गुनासो पेटिका', labelEn: 'Grievance' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top emergency & office contact notice strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400" />
            <span className="font-medium text-white">
              {language === 'ne' ? 'रास्वपा फिदिम-१२ कार्यालय डेस्क:' : 'RSP Ward 12 Desk:'}
            </span>
            <span>
              {language === 'ne'
                ? `लोक बहादुर रिमाल: ${CONTACT_INFO.officeCoordinator.formattedPhone}`
                : `Coordinator: ${CONTACT_INFO.officeCoordinator.phone}`}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline">
              {language === 'ne'
                ? `वडा सभापति राजेन्द्र बहादुर न्यौपाने: ९७०६१०६३५०`
                : `President: 9706106350`}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-blue-300 transition-colors hidden sm:inline"
            >
              {CONTACT_INFO.email}
            </a>
            <button
              onClick={() => setLanguage(language === 'ne' ? 'en' : 'ne')}
              className="inline-flex items-center gap-1 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-[11px] font-medium transition-colors"
              title="भाषा परिवर्तन (Change Language)"
            >
              <Languages className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'ne' ? 'English (EN)' : 'नेपाली'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark with interactive Bell Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => handleLinkClick('home')}>
          <RspLogo size={46} interactiveSound={true} />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold text-blue-900 tracking-tight">
                {language === 'ne' ? 'राष्ट्रिय स्वतन्त्र पार्टी' : 'Rastriya Swatantra Party'}
              </span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded uppercase">
                {language === 'ne' ? 'रास्वपा' : 'RSP'}
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-600">
              {language === 'ne'
                ? 'फिदिम न.पा. - १२ (नांगीन पलभञ्याङ्ग), पाँचथर'
                : 'Phidim-12 (Nangin Pulbhanjyang), Panchthar'}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 text-left py-1 hover:border-b-2 hover:border-blue-600 cursor-pointer"
            >
              {language === 'ne' ? link.labelNe : link.labelEn}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenCardSearch}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title="सदस्यता कार्ड खोजी तथा प्रमाणीकरण"
          >
            <Search className="w-3.5 h-3.5 text-blue-700" />
            <span>{language === 'ne' ? 'कार्ड खोजी' : 'Verify Card'}</span>
          </button>

          <button
            onClick={() => handleLinkClick('membership')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 shadow-sm rounded-lg transition-all whitespace-nowrap cursor-pointer hover:shadow"
          >
            <ShieldCheck className="w-4 h-4 text-blue-200" />
            <span>{language === 'ne' ? 'सदस्यता लिनुहोस्' : 'Join Member'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCardSearch}
            className="p-2 text-slate-600 hover:text-blue-700 bg-slate-100 rounded-lg"
            title="कार्ड खोजी"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-blue-700 rounded-lg bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 shadow-lg space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left py-2 px-3 text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
              >
                {language === 'ne' ? link.labelNe : link.labelEn}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('membership');
              }}
              className="w-full text-center py-2.5 px-4 text-sm font-bold text-white bg-blue-700 rounded-lg shadow-sm"
            >
              {language === 'ne' ? 'अनलाइन सदस्यता फारम भर्नुहोस्' : 'Apply Online Membership'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCardSearch();
              }}
              className="w-full text-center py-2 px-4 text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg"
            >
              {language === 'ne' ? 'डिजिटल सदस्यता कार्ड खोजी' : 'Search Digital Card'}
            </button>
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>९८१७९९७३५९ (लोक बहादुर रिमाल)</span>
            </span>
            <a href="tel:9817997359" className="text-blue-700 font-bold underline">
              {language === 'ne' ? 'कल गर्नुहोस्' : 'Call Desk'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
