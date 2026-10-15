import React, { useState } from 'react';
import { Leader, Language } from '../types';
import { LEADERS, CONTACT_INFO } from '../data/initialData';
import {
  Users,
  Phone,
  MapPin,
  Search,
  Shield,
  Star,
  CheckCircle2,
} from 'lucide-react';

interface LeadershipSectionProps {
  language: Language;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'key' | 'executive' | 'members'>('all');

  const filteredLeaders = LEADERS.filter((leader) => {
    const matchesQuery =
      leader.nameNe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.roleNe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.roleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.toleNe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (leader.phone && leader.phone.includes(searchQuery));

    if (activeCategory === 'key') return matchesQuery && leader.isKeyContact;
    if (activeCategory === 'executive') return matchesQuery && (leader.category === 'executive' || leader.category === 'coordinator' || leader.category === 'president');
    if (activeCategory === 'members') return matchesQuery && leader.category === 'member';

    return matchesQuery;
  });

  return (
    <section id="leadership" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'ne' ? 'वडा कार्यसमिति नामावली' : 'Ward Committee Leadership'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'ne'
                ? 'रास्वपा फिदिम-१२ कार्यसमिति पदाधिकारी तथा सदस्यहरू'
                : 'RSP Phidim-12 Executive Committee & Members'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              {language === 'ne'
                ? 'कार्यालय सञ्चालक, वडा सभापति, पदाधिकारी तथा टोल प्रतिनिधिहरूको पद, टोल र सिधै सम्पर्क गर्न मिल्ने फोन नम्बरहरू।'
                : 'Direct directory of Ward 12 coordinator, president, executives, and representatives with direct call buttons.'}
            </p>
          </div>

          {/* Search bar & filter pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ne' ? 'नाम, पद वा फोन खोज्नुहोस्...' : 'Search leader by name, role, phone...'}
                className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 w-56 text-slate-900"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ne' ? 'सम्पूर्ण (१४)' : 'All (14)'}
              </button>
              <button
                onClick={() => setActiveCategory('key')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCategory === 'key'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ne' ? 'प्रमुख नेतृत्व' : 'Key Leaders'}
              </button>
              <button
                onClick={() => setActiveCategory('members')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeCategory === 'members'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ne' ? 'वडा सदस्यहरू' : 'Members'}
              </button>
            </div>
          </div>
        </div>

        {/* Committee Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredLeaders.map((leader) => {
            const isKey = leader.isKeyContact;
            const hasPhone = Boolean(leader.phone);

            return (
              <div
                key={leader.id}
                className={`rounded-2xl border p-4.5 transition-all duration-200 flex flex-col justify-between ${
                  isKey
                    ? 'bg-gradient-to-b from-blue-50/60 to-white border-blue-300 shadow-xs ring-1 ring-blue-200/60'
                    : 'bg-slate-50/60 hover:bg-white border-slate-200 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        isKey
                          ? 'bg-blue-600 text-white'
                          : leader.category === 'executive'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {language === 'ne' ? leader.roleNe : leader.roleEn}
                    </span>

                    {isKey && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {language === 'ne' ? 'प्रमुख सम्पर्क' : 'Key Desk'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'ne' ? leader.nameNe : leader.nameEn}
                  </h3>

                  <div className="mt-2 space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{language === 'ne' ? `टोल: ${leader.toleNe}` : `Tole: ${leader.toleEn}`}</span>
                    </div>

                    {hasPhone && (
                      <div className="flex items-center gap-1.5 font-mono text-slate-800">
                        <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-semibold">{leader.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Call action */}
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  {hasPhone ? (
                    <a
                      href={`tel:${leader.phone}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{language === 'ne' ? 'सिधै कल गर्नुहोस्' : 'Direct Call'}</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      {language === 'ne' ? 'कार्यालयमार्फत सम्पर्क' : 'Contact via Office'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
