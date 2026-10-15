import React, { useState } from 'react';
import { WardAgenda, Language } from '../types';
import { WARD_AGENDAS } from '../data/initialData';
import {
  FileText,
  ShieldCheck,
  Wheat,
  Truck,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AgendasSectionProps {
  language: Language;
}

export const AgendasSection: React.FC<AgendasSectionProps> = ({ language }) => {
  const [selectedAgenda, setSelectedAgenda] = useState<WardAgenda | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'transparency':
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'agriculture':
        return <Wheat className="w-6 h-6 text-emerald-600" />;
      case 'infrastructure':
        return <Truck className="w-6 h-6 text-amber-600" />;
      case 'youth_fund':
        return <Briefcase className="w-6 h-6 text-indigo-600" />;
      default:
        return <FileText className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="agendas" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with editorial numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1.5">
              <span>{language === 'ne' ? 'नीति तथा विकास मार्गचित्र' : 'Policy & Roadmap'}</span>
              <span>·</span>
              <span>{language === 'ne' ? 'फिदिम-१२ को संकल्प' : 'Ward 12 Commitment'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              {language === 'ne' ? 'वडा १२ का ४ मुख्य विकास एजेन्डा' : '4 Core Development Agendas of Ward 12'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              {language === 'ne'
                ? 'नांगीन र पलभञ्याङ्गवासीको आर्थिक, सामाजिक तथा भौतिक रूपान्तरणका लागि रास्वपाको स्पष्ट प्रतिवद्धता पत्र।'
                : 'A grounded commitment letter for the economic, agrarian, and infrastructural transformation of Ward 12.'}
            </p>
          </div>

          <div className="shrink-0 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg">
            {language === 'ne' ? 'त्रैमासिक सार्वजनिक सुनुवाइसहित' : 'Subject to Quarterly Public Audit'}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {WARD_AGENDAS.map((agenda) => {
            return (
              <div
                key={agenda.id}
                className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 transition-all duration-200 hover:shadow-md hover:border-blue-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center">
                      {getIcon(agenda.id)}
                    </div>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors font-mono">
                      {agenda.number}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                    {agenda.category}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {language === 'ne' ? agenda.titleNe : agenda.titleEn}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {language === 'ne' ? agenda.descriptionNe : agenda.descriptionEn}
                  </p>

                  {/* Key bullet points */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-slate-200/80">
                    {(language === 'ne' ? agenda.keyPointsNe : agenda.keyPointsEn).map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    {language === 'ne' ? 'नागरिक सहभागिता अनिवार्य' : 'Citizen Monitoring Required'}
                  </span>
                  <button
                    onClick={() => setSelectedAgenda(agenda)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>{language === 'ne' ? 'विस्तृत कार्ययोजना' : 'Detailed Blueprint'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAgenda && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                <span className="font-mono text-base">{selectedAgenda.number}</span>
                <span>·</span>
                <span>{selectedAgenda.category}</span>
              </div>
              <button
                onClick={() => setSelectedAgenda(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-900">
                {language === 'ne' ? selectedAgenda.titleNe : selectedAgenda.titleEn}
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {language === 'ne' ? selectedAgenda.descriptionNe : selectedAgenda.descriptionEn}
              </p>

              <div className="my-6 p-4 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-900">
                <span className="font-bold block text-sm mb-1">
                  {language === 'ne' ? 'कार्यान्वयन संयन्त्र (Execution Framework)' : 'Execution Framework'}
                </span>
                <p className="leading-relaxed">
                  {language === 'ne'
                    ? 'वडा कार्यालय सञ्चालक लोक बहादुर रिमाल र वडा सभापति राजेन्द्र बहादुर न्यौपानेको प्रत्यक्ष नेतृत्वमा हरेक टोलका संयोजकहरू सम्मिलित नागरिक अनुगमन समिति गठन गरी योजना कार्यान्वयन गरिनेछ।'
                    : 'Implementation will be directly monitored by Ward Coordinator Lok Bahadur Rimal, President Rajendra Bahadur Neupane, and tole coordinators.'}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'ne' ? 'मुख्य कार्यबिन्दुहरू:' : 'Key Operational Deliverables:'}
                </h4>
                {(language === 'ne' ? selectedAgenda.keyPointsNe : selectedAgenda.keyPointsEn).map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedAgenda(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                {language === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
