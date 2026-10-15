import React from 'react';
import { RspLogo, playBellSound } from './RspLogo';
import { WardStats, Language } from '../types';
import { CONTACT_INFO } from '../data/initialData';
import {
  Users,
  Vote,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Bell,
  ArrowRight,
  Shield,
  HeartHandshake,
  TrendingUp,
  Scale,
  Sparkles,
  School,
  Building2,
  ShieldAlert,
} from 'lucide-react';

interface HeroSectionProps {
  stats: WardStats;
  language: Language;
  onApplyClick: () => void;
  onSearchClick: () => void;
  onTolesClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stats,
  language,
  onApplyClick,
  onSearchClick,
  onTolesClick,
}) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-8 pb-14 border-b border-slate-200">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top official emblem banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-200 px-3.5 py-1.5 rounded-full text-blue-900 text-xs font-bold tracking-wide uppercase shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            {language === 'ne'
              ? 'आधिकारिक वडा डिजिटल पोर्टल • फिदिम नगरपालिका - १२, पाँचथर'
              : 'Official Ward Digital Portal • Phidim Municipality - 12, Panchthar'}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto text-balance">
            {language === 'ne' ? (
              <>
                राष्ट्रिय स्वतन्त्र पार्टी <span className="text-blue-700">(रास्वपा)</span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
                  फिदिम-१२ (नांगीन पलभञ्याङ्ग) वडा समिति
                </span>
              </>
            ) : (
              <>
                Rastriya Swatantra Party <span className="text-blue-700">(RSP)</span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
                  Ward 12 Committee (Nangin Pulbhanjyang), Phidim
                </span>
              </>
            )}
          </h1>

          <p className="mt-2 text-sm sm:text-base font-medium text-slate-600 max-w-2xl mx-auto">
            {language === 'ne' ? CONTACT_INFO.officialTaglineNe : CONTACT_INFO.officialTaglineEn}
          </p>
        </div>

        {/* 2-Column Split: Office Information & Leadership Card + 4 Pillars & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          {/* Left Column: Office Banner & Leadership Desk (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              {/* Emblem & Title Lockup */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-slate-100">
                <div className="relative cursor-pointer group shrink-0" onClick={playBellSound}>
                  <RspLogo size={76} interactiveSound={true} />
                  <span className="block text-[10px] text-center text-blue-700 font-bold mt-1 group-hover:underline">
                    {language === 'ne' ? 'घण्टी बजाउनुहोस्' : 'Ring Bell'}
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-block text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mb-1">
                    {language === 'ne' ? 'गोलाकार निलो-सेतो घण्टी चुनाव चिह्न' : 'Circular Blue-White Bell Emblem'}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {language === 'ne' ? 'पार्टी कार्यालय: पुलभञ्ज्याङ' : 'Party Office: Pulbhanjyang'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{language === 'ne' ? CONTACT_INFO.officeLocationNe : CONTACT_INFO.officeLocationEn}</span>
                  </p>
                </div>
              </div>

              {/* Coordinator & President Hotlines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                      {language === 'ne' ? 'कार्यालय सञ्चालक' : 'Office Coordinator'}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {language === 'ne' ? CONTACT_INFO.officeCoordinator.nameNe : CONTACT_INFO.officeCoordinator.nameEn}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-800">
                        {CONTACT_INFO.officeCoordinator.formattedPhone}
                      </span>
                    </p>
                  </div>
                  <a
                    href={`tel:${CONTACT_INFO.officeCoordinator.phone}`}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{language === 'ne' ? 'सिधै सम्पर्क गर्नुहोस्' : 'Call Coordinator'}</span>
                  </a>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                      {language === 'ne' ? 'वडा सभापति' : 'Ward President'}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {language === 'ne' ? CONTACT_INFO.wardPresident.nameNe : CONTACT_INFO.wardPresident.nameEn}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-800">
                        {CONTACT_INFO.wardPresident.formattedPhone}
                      </span>
                    </p>
                  </div>
                  <a
                    href={`tel:${CONTACT_INFO.wardPresident.phone}`}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{language === 'ne' ? 'सभापतिलाई कल' : 'Call President'}</span>
                  </a>
                </div>
              </div>

              {/* Official email & office note */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>{language === 'ne' ? 'आधिकारिक इमेल:' : 'Official Email:'}</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="font-bold underline hover:text-blue-950">
                    {CONTACT_INFO.email}
                  </a>
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                  {language === 'ne' ? 'नांगीन पलभञ्याङ्ग समन्वय' : 'Nangin Pulbhanjyang'}
                </span>
              </div>
            </div>

            {/* Quick 1-click prompt action button */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onApplyClick}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition-all cursor-pointer hover:shadow"
              >
                <MapPin className="w-4 h-4 text-blue-200" />
                <span>
                  {language === 'ne'
                    ? '📍 फिदिम-१२ (नांगीन पलभञ्याङ्ग) का लागि फारम भर्नुहोस्'
                    : '📍 Apply for Phidim-12 (Nangin Pulbhanjyang)'}
                </span>
              </button>

              <button
                onClick={onSearchClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                <span>{language === 'ne' ? 'कार्ड खोजी / डाउनलोड' : 'Search Card'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Party Pillars + Office Visual Snapshot (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-blue-800/80 pb-3 mb-4">
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-300">
                  {language === 'ne' ? 'रास्वपाका ४ मूल स्तम्भहरू' : '4 Foundational Pillars'}
                </span>
                <span className="text-[10px] font-bold bg-blue-800 px-2 py-0.5 rounded text-blue-200">
                  {language === 'ne' ? 'सिद्धान्त' : 'Pillars'}
                </span>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center mb-2">
                    <Shield className="w-4 h-4 text-blue-300" />
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {language === 'ne' ? 'स्वच्छ राजनीति' : 'Clean Politics'}
                  </h4>
                  <p className="text-[11px] text-blue-200/80 mt-0.5 leading-snug">
                    {language === 'ne' ? 'पारदर्शिता र निष्कलंक निष्ठा' : 'Transparent & clean leaders'}
                  </p>
                </div>

                <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-300" />
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {language === 'ne' ? 'समृद्ध नेपाल' : 'Prosperous Nepal'}
                  </h4>
                  <p className="text-[11px] text-blue-200/80 mt-0.5 leading-snug">
                    {language === 'ne' ? 'किसान, युवा र उत्पादनमुखी अर्थतन्त्र' : 'Agro & youth economy'}
                  </p>
                </div>

                <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/30 flex items-center justify-center mb-2">
                    <HeartHandshake className="w-4 h-4 text-amber-300" />
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {language === 'ne' ? 'समान अवसर' : 'Equal Opportunity'}
                  </h4>
                  <p className="text-[11px] text-blue-200/80 mt-0.5 leading-snug">
                    {language === 'ne' ? 'प्रत्येक नागरिकको अधिकार' : 'Justice for every citizen'}
                  </p>
                </div>

                <div className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl p-3 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/30 flex items-center justify-center mb-2">
                    <Scale className="w-4 h-4 text-cyan-300" />
                  </div>
                  <h4 className="font-bold text-sm text-white">
                    {language === 'ne' ? 'सुशासन' : 'Good Governance'}
                  </h4>
                  <p className="text-[11px] text-blue-200/80 mt-0.5 leading-snug">
                    {language === 'ne' ? 'शून्य भ्रष्टाचार र छिटो सेवा' : 'Zero corruption & swift service'}
                  </p>
                </div>
              </div>

              {/* Office Room Detail Box */}
              <div className="bg-blue-950/60 border border-blue-700/50 rounded-xl p-3.5 text-xs text-blue-100">
                <div className="flex items-center gap-2 font-bold text-blue-300 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    {language === 'ne'
                      ? 'परिवर्तनका लागि हाम्रो अभियान — फिदिम-१२'
                      : 'Campaign for Change — Phidim-12'}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {language === 'ne'
                    ? 'नांगीन पलभञ्याङ्ग, मिलनचोक, बुधुक, भोटेगाउँ, खत्रीगाउँ, छापे सेपेनी, याक्सुम्बा जरिङ्गे र सिबुवा टोललाई जोड्ने भ्रष्टाचारमुक्त डिजिटल शासन।'
                    : 'Connecting all 8 toles of Ward 12 with honest leadership, farmer protection, and youth enterprise.'}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-blue-800/80 flex items-center justify-between text-xs text-blue-300">
              <span className="flex items-center gap-1">
                <Bell className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'ne' ? 'जय घण्टी • जय रास्वपा' : 'Jai Ghanti • Jai RSP'}</span>
              </span>
              <button
                onClick={onTolesClick}
                className="text-white hover:text-blue-200 font-bold underline cursor-pointer"
              >
                {language === 'ne' ? '८ टोल समिति हेर्नुहोस् →' : 'Explore 8 Toles →'}
              </button>
            </div>
          </div>
        </div>

        {/* Ward Profile Statistics Ribbon (Verified Ward 12 Data) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-700" />
                <span>
                  {language === 'ne'
                    ? 'फिदिम नगरपालिका - १२ वडा प्रोफाइल तथ्याङ्क'
                    : 'Phidim Municipality - Ward 12 Official Profile'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ne'
                  ? 'जनसंख्या, मतदाता विवरण, पार्टी सदस्यता तथा सामुदायिक पूर्वाधार'
                  : 'Population, voter demographics, party membership, and public infrastructure'}
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
              {language === 'ne' ? 'स्रोत: वडा तथ्याङ्क अभिलेख' : 'Source: Official Ward Register'}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {/* Stat 1: Total Population */}
            <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'ne' ? 'कुल जनसंख्या' : 'Population'}
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">
                {stats.population.toLocaleString('ne-NP')}+
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {language === 'ne' ? 'नांगीन पलभञ्याङ्ग क्षेत्र' : 'Nangin Pulbhanjyang'}
              </span>
            </div>

            {/* Stat 2: Total Voters */}
            <div className="bg-blue-50/70 rounded-xl p-3.5 border border-blue-200/70">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                {language === 'ne' ? 'कुल मतदाता' : 'Total Voters'}
              </span>
              <span className="text-2xl font-extrabold text-blue-900 font-mono mt-1 block">
                {stats.totalVoters.toLocaleString('ne-NP')}
              </span>
              <span className="text-[11px] text-blue-700/80 mt-0.5 block">
                {language === 'ne' ? 'दर्ता भएका मतदाता' : 'Registered Voters'}
              </span>
            </div>

            {/* Stat 3: Male Voters */}
            <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'ne' ? 'पुरुष मतदाता' : 'Male Voters'}
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">
                {stats.maleVoters.toLocaleString('ne-NP')}
              </span>
              <span className="text-[11px] text-emerald-700 font-bold mt-0.5 block">
                ५१.८% (51.8%)
              </span>
            </div>

            {/* Stat 4: Female Voters */}
            <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'ne' ? 'महिला मतदाता' : 'Female Voters'}
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">
                {stats.femaleVoters.toLocaleString('ne-NP')}
              </span>
              <span className="text-[11px] text-purple-700 font-bold mt-0.5 block">
                ४८.२% (48.2%)
              </span>
            </div>

            {/* Stat 5: Party Members */}
            <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'ne' ? 'पार्टी सदस्य' : 'Party Members'}
              </span>
              <span className="text-2xl font-extrabold text-blue-700 font-mono mt-1 block">
                {stats.partyMembers}+
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {language === 'ne' ? 'वडा कार्यसमिति सहित' : 'Active Members'}
              </span>
            </div>

            {/* Stat 6: Tole Committees */}
            <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'ne' ? 'टोल समितिहरू' : 'Tole Committees'}
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono mt-1 block">
                {stats.toleCount}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {language === 'ne' ? 'स्थानीय टोल एकाइहरू' : 'Village Units'}
              </span>
            </div>
          </div>

          {/* Infrastructure sub-strip */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <School className="w-4 h-4 text-blue-600" />
                <span>{language === 'ne' ? 'सामुदायिक विद्यालयहरू: ५ वटा' : 'Community Schools: 5'}</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ne' ? 'स्वास्थ्य चौकी: १ वटा' : 'Health Post: 1'}</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>{language === 'ne' ? 'अस्थायी प्रहरी चौकी: १ वटा' : 'Temporary Police Post: 1'}</span>
              </span>
            </div>

            <div className="text-slate-500">
              {language === 'ne' ? 'अन्य मतदाता: ० (०.०%)' : 'Other Voters: 0 (0.0%)'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
