import React, { useState } from 'react';
import { FieldReport, Language } from '../types';
import { INITIAL_FIELD_REPORTS } from '../data/initialData';
import {
  Calendar,
  MapPin,
  ChevronRight,
  Video,
  Play,
  Share2,
  Newspaper,
  Radio,
} from 'lucide-react';

interface ActivitiesSectionProps {
  language: Language;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ language }) => {
  const [selectedReport, setSelectedReport] = useState<FieldReport | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const campaignVideos = [
    {
      id: 'video-desh-daami',
      titleNe: 'रास्वपा चुनावी अभियान गीत: "देश बनाउँछौँ दामी"',
      titleEn: 'RSP Campaign Anthem: "Desh Banauchhaun Daami"',
      singerNe: 'केशव अधिकारी / सरिता सुनार • रवि लामिछाने नेतृत्व अभियान',
      singerEn: 'Keshav Adhikari / Sarita Sunar • Ravi Lamichhane Lead',
      duration: '०८:४२ मिनेट',
      accentColor: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'video-balen-fan',
      titleNe: 'युवा जागरण तथा सुशासन: "म त ठूलो फ्यान बालेन शाहको"',
      titleEn: 'Youth Awakening & Governance: "Ma Ta Thulo Fan Balen Shahko"',
      singerNe: 'बालेन शाहको विकास मोडेल, सार्वजनिक जग्गा फिर्ता र सफा नगर',
      singerEn: 'Balen Shah development, public land recovery & clean city',
      duration: '२४:३८ मिनेट',
      accentColor: 'from-slate-800 to-blue-900',
    },
    {
      id: 'video-dashain-lok',
      titleNe: 'कार्यालय सञ्चालक लोक बहादुर रिमालद्वारा बडा दशैं २०८० को शुभकामना',
      titleEn: 'Dashain 2080 Video Greetings by Office Coordinator Lok Bahadur Rimal',
      singerNe: 'फिदिम नगरपालिका-१२ पाँचथर वडा समितिको आधिकारिक शुभकामना',
      singerEn: 'Official festival message from Phidim-12 Panchthar committee',
      duration: '०४:०० मिनेट',
      accentColor: 'from-amber-700 to-red-800',
    },
  ];

  return (
    <section id="activities" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1.5">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{language === 'ne' ? 'स्थलगत समाचार तथा अभियान' : 'Field Reports & Media'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'ne'
                ? 'वडा गतिविधि, कृषक संवाद तथा सार्वजनिक सुनुवाइ'
                : 'Ward Activities, Farmer Talks & Public Hearings'}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              {language === 'ne'
                ? 'नांगीन पलभञ्याङ्ग बजारमा सदस्यता वितरण, कृषक संवाद र ग्रामीण सडक सार्वजनिक सुनुवाइका ताजा विवरण।'
                : 'Verified field updates, farmer interactions, and public hearings from across Ward 12.'}
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            {language === 'ne' ? 'नियमित स्थलगत अपडेट' : 'Updated Regularly'}
          </div>
        </div>

        {/* 3 Field Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {INITIAL_FIELD_REPORTS.map((report) => (
            <div
              key={report.id}
              className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-blue-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    {language === 'ne' ? report.categoryNe : report.categoryEn}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{report.date}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-blue-700 transition-colors">
                  {language === 'ne' ? report.titleNe : report.titleEn}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{language === 'ne' ? report.locationNe : report.locationEn}</span>
                </p>

                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {language === 'ne' ? report.excerptNe : report.excerptEn}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <button
                  onClick={() => setSelectedReport(report)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <span>{language === 'ne' ? 'पूर्ण समाचार पढ्नुहोस्' : 'Read Full Report'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Audio & Video Highlights */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 block mb-1">
                {language === 'ne' ? 'अभियान भिडियो तथा गीतहरू' : 'Campaign Video & Anthems'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {language === 'ne'
                  ? 'परिवर्तन र सुशासनका गीत तथा आधिकारिक सन्देश'
                  : 'Anthems of Change, Governance & Official Messages'}
              </h3>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 self-start sm:self-auto">
              {language === 'ne' ? '३ वटा आधिकारिक अडियो-भिडियो' : '3 Official Media Tracks'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {campaignVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideoModal(video.id)}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-4.5 cursor-pointer transition-all hover:border-blue-500 hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-full h-32 rounded-xl bg-gradient-to-r ${video.accentColor} flex items-center justify-center relative overflow-hidden mb-3 shadow-inner`}>
                    <div className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-white/30 backdrop-blur-xs flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/60 px-2 py-0.5 rounded text-white">
                      {video.duration}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                    {language === 'ne' ? video.titleNe : video.titleEn}
                  </h4>

                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                    {language === 'ne' ? video.singerNe : video.singerEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-blue-400 font-semibold">
                  <span>{language === 'ne' ? 'प्ले गर्नुहोस्' : 'Play Highlight'}</span>
                  <Play className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                {language === 'ne' ? selectedReport.categoryNe : selectedReport.categoryEn}
              </span>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <span className="text-xs text-slate-500 font-mono block">
                {selectedReport.date} · {selectedReport.locationNe}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {language === 'ne' ? selectedReport.titleNe : selectedReport.titleEn}
              </h3>

              <div className="mt-4 text-sm text-slate-700 leading-relaxed space-y-3">
                <p className="font-semibold text-slate-900">
                  {language === 'ne' ? selectedReport.excerptNe : selectedReport.excerptEn}
                </p>
                <p>
                  {language === 'ne' ? selectedReport.contentNe : selectedReport.contentEn}
                </p>
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <strong className="block text-slate-800 mb-1">
                  {language === 'ne' ? 'कार्यालय समन्वय:' : 'Ward Desk Coordination:'}
                </strong>
                <span>
                  {language === 'ne'
                    ? 'उक्त कार्यक्रम र निर्णयहरूको पूर्ण प्रतिवेदन फिदिम-१२ कार्यालय सञ्चालक लोक बहादुर रिमाल (९८१७९९७३५९) वा वडा सभापति राजेन्द्र बहादुर न्यौपाने (९७०६१०६३५०) सँग सम्पर्क गरी प्राप्त गर्न सकिन्छ।'
                    : 'Full proceedings available through Office Coordinator Lok Bahadur Rimal (9817997359).'}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                {language === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Highlight Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                अभियान भिडियो विवरण
              </span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-white text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-500/40">
                <Play className="w-8 h-8 fill-blue-400 ml-1" />
              </div>

              <h3 className="text-xl font-bold text-white">
                {activeVideoModal === 'video-desh-daami'
                  ? 'देश बनाउँछौँ दामी — रास्वपा चुनावी अभियान गीत'
                  : activeVideoModal === 'video-balen-fan'
                  ? 'म त ठूलो फ्यान बालेन शाहको — सुशासन र विकास'
                  : 'बडा दशैं २०८० को शुभकामना — लोक बहादुर रिमाल'}
              </h3>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed max-w-md mx-auto">
                {activeVideoModal === 'video-desh-daami'
                  ? 'परिवर्तन चाहन्छौँ भने सोच बदलौँ अब हामी... राष्ट्रिय स्वतन्त्र पार्टी अब जान्नेलाई छान्ने! फिदिम-१२ मा युवाहरूले बजाए घण्टी।'
                  : activeVideoModal === 'video-balen-fan'
                  ? 'काठमाडौँमा देखियो विकासको नयाँ मोडल। अब पाँचथर फिदिम-१२ मा पनि स्वच्छ राजनीति र शून्य भ्रष्टाचार लागू गर्दै युवा नेतृत्वलाई अघि बढाउने संकल्प।'
                  : 'फिदिम नगरपालिका-१२ (नांगीन पलभञ्याङ्ग) वडा कार्यालय सञ्चालक लोक बहादुर रिमालद्वारा सम्पूर्ण वडाबासी दाजुभाइ दिदीबहिनीहरूमा बडा दशैंको हार्दिक मंगलमय शुभकामना!'}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-3">
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl cursor-pointer"
                >
                  बन्द गर्नुहोस्
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
