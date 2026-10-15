import React, { useState } from 'react';
import { ToleCommittee, Language } from '../types';
import { TOLE_COMMITTEES } from '../data/initialData';
import {
  MapPin,
  Phone,
  Mail,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface ToleCommitteesSectionProps {
  language: Language;
  onApplyForTole: (toleName: string) => void;
}

export const ToleCommitteesSection: React.FC<ToleCommitteesSectionProps> = ({
  language,
  onApplyForTole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'in_process'>('all');

  const filteredToles = TOLE_COMMITTEES.filter((tole) => {
    const matchesSearch =
      tole.nameNe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tole.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tole.coordinatorNe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tole.coordinatorEn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ? true : tole.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <section id="tole-committees" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'ne' ? 'वडा संरचना र संगठन' : 'Ward Organizational Units'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'ne' ? 'फिदिम-१२ अन्तर्गतका ८ टोल समितिहरू' : '8 Tole Committees of Phidim-12'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              {language === 'ne'
                ? 'नांगीन पलभञ्याङ्ग बजारदेखि सिबुवा टोलसम्मका स्थानीय एकाइ, संयोजक तथा प्रत्यक्ष सम्पर्क डेस्क।'
                : 'Local units from Nangin Pulbhanjyang Bazar to Sibuwa Tole with direct coordinator contacts.'}
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ne' ? 'टोल वा संयोजक खोज्नुहोस्...' : 'Search tole or coordinator...'}
                className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 w-56 text-slate-900"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  filterStatus === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ne' ? 'सबै (८)' : 'All (8)'}
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  filterStatus === 'active'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ne' ? 'सक्रिय संयोजक' : 'Active'}
              </button>
              <button
                onClick={() => setFilterStatus('in_process')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  filterStatus === 'in_process'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'ne' ? 'पुनर्गठन प्रक्रियामा' : 'In Process'}
              </button>
            </div>
          </div>
        </div>

        {/* 8 Tole Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredToles.map((tole) => {
            const hasPhone = Boolean(tole.phone);

            return (
              <div
                key={tole.id}
                className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:shadow-md hover:border-blue-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded font-mono">
                      #{tole.id}
                    </span>

                    {tole.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{language === 'ne' ? 'संयोजक बहाल' : 'Active'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Clock className="w-3 h-3" />
                        <span>{language === 'ne' ? 'प्रक्रियामा' : 'In Process'}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {language === 'ne' ? tole.nameNe : tole.nameEn}
                  </h3>

                  <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1.5 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">
                        {language === 'ne' ? 'टोल संयोजक / सम्पर्क व्यक्ति:' : 'Coordinator / Contact:'}
                      </span>
                      <span className="font-bold text-slate-800">
                        {language === 'ne' ? tole.coordinatorNe : tole.coordinatorEn}
                      </span>
                    </div>

                    {hasPhone && (
                      <div className="flex items-center gap-1.5 font-mono text-slate-700">
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span className="font-semibold">{tole.phone}</span>
                      </div>
                    )}

                    {tole.email && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-600 truncate">
                        <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{tole.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Key focus */}
                  <p className="text-xs text-slate-600 mt-3 pt-2.5 border-t border-slate-100 leading-relaxed">
                    <span className="font-semibold text-slate-700 block mb-0.5">
                      {language === 'ne' ? 'मुख्य स्थानीय मुद्दा:' : 'Key Focus:'}
                    </span>
                    {language === 'ne' ? tole.keyFocusNe : tole.keyFocusEn}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2">
                  {hasPhone ? (
                    <a
                      href={`tel:${tole.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{language === 'ne' ? 'सिधै कल' : 'Call'}</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">
                      {language === 'ne' ? 'समन्वय: ९८१७९९७३५९' : 'Desk: 9817997359'}
                    </span>
                  )}

                  <button
                    onClick={() => onApplyForTole(tole.nameNe)}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                  >
                    {language === 'ne' ? 'सदस्यता लिने' : 'Join'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
