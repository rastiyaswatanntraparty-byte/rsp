import React from 'react';
import { RspLogo, playBellSound } from './RspLogo';
import { Language } from '../types';
import { CONTACT_INFO } from '../data/initialData';
import { MapPin, Phone, Mail, Bell, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
  onOpenCardSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenCardSearch,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Identity & Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <RspLogo size={48} interactiveSound={true} />
              <div>
                <h3 className="text-white font-extrabold text-base tracking-tight leading-tight">
                  {language === 'ne' ? 'राष्ट्रिय स्वतन्त्र पार्टी' : 'Rastriya Swatantra Party'}
                </h3>
                <span className="text-xs text-blue-400 font-semibold">
                  {language === 'ne' ? 'फिदिम-१२ वडा समिति, पाँचथर' : 'Phidim-12 Committee, Panchthar'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {language === 'ne'
                ? 'नांगीन पलभञ्याङ्ग, मिलनचोक, बुधुक, भोटेगाउँ, खत्रीगाउँ, छापे सेपेनी, याक्सुम्बा जरिङ्गे र सिबुवा टोलको सुशासन तथा समृद्धि।'
                : 'Dedicated to clean politics, agriculture cold storage, rural road upgrades, and youth self-employment.'}
            </p>

            <button
              onClick={playBellSound}
              className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-white bg-blue-950/80 hover:bg-blue-900 border border-blue-800/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'ne' ? 'जय घण्टी बजाउनुहोस्' : 'Ring Party Bell'}</span>
            </button>
          </div>

          {/* Col 2: Office Coordinates & Contacts */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-white tracking-wider mb-3">
              {language === 'ne' ? 'पार्टी कार्यालय डेस्क' : 'Office Desk'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {language === 'ne' ? CONTACT_INFO.officeLocationNe : CONTACT_INFO.officeLocationEn}
                </span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>
                  {language === 'ne'
                    ? `कार्यालय सञ्चालक: ${CONTACT_INFO.officeCoordinator.formattedPhone}`
                    : `Coordinator: ${CONTACT_INFO.officeCoordinator.phone}`}
                </span>
              </p>
              <p className="flex items-center gap-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>
                  {language === 'ne'
                    ? `वडा सभापति: ${CONTACT_INFO.wardPresident.formattedPhone}`
                    : `President: ${CONTACT_INFO.wardPresident.phone}`}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-blue-300 underline font-medium truncate"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Col 3: Direct Navigation */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-white tracking-wider mb-3">
              {language === 'ne' ? 'द्रुत पहुँच' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {language === 'ne' ? 'गृहपृष्ठ (Official Home)' : 'Official Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('agendas')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {language === 'ne' ? '४ मुख्य विकास एजेन्डा' : '4 Ward Agendas'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tole-committees')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {language === 'ne' ? '८ स्थानीय टोल समितिहरू' : '8 Tole Committees'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('leadership')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {language === 'ne' ? 'वडा कार्यसमिति नामावली' : 'Executive Leadership'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {language === 'ne' ? 'अनलाइन सदस्यता फारम' : 'Membership Portal'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCardSearch}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {language === 'ne' ? 'डिजिटल सदस्यता कार्ड प्रमाणीकरण' : 'Verify Membership Card'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Four Pillars & Slogan */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-white tracking-wider mb-3">
              {language === 'ne' ? 'मूल मन्त्र' : 'Core Philosophy'}
            </h4>
            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/80 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-white block">
                {language === 'ne' ? 'जय घण्टी! जय नेपाल!' : 'Jai Ghanti! Jai Nepal!'}
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {language === 'ne' ? CONTACT_INFO.officialTaglineNe : CONTACT_INFO.officialTaglineEn}
              </p>
              <div className="pt-2 border-t border-slate-700 text-[10px] text-blue-400 font-semibold">
                {language === 'ne' ? 'परिवर्तनका लागि हाम्रो अभियान' : 'Campaign for Positive Change'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © २०८१ राष्ट्रिय स्वतन्त्र पार्टी (रास्वपा), फिदिम-१२ वडा समिति, पाँचथर। सर्वाधिकार सुरक्षित।
          </p>
          <div className="flex items-center gap-2">
            <span>फिदिम नगरपालिका-१२ (नांगीन पलभञ्याङ्ग)</span>
            <span>·</span>
            <span>कोशी प्रदेश, नेपाल</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
