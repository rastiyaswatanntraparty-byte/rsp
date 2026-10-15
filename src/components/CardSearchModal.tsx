import React, { useState } from 'react';
import { MembershipCardData, Language } from '../types';
import { RspLogo } from './RspLogo';
import {
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  User,
  QrCode,
  Phone,
  Calendar,
  CreditCard,
  MapPin,
} from 'lucide-react';

interface CardSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberships: MembershipCardData[];
  language: Language;
}

export const CardSearchModal: React.FC<CardSearchModalProps> = ({
  isOpen,
  onClose,
  memberships,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundCard, setFoundCard] = useState<MembershipCardData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (termToSearch?: string) => {
    const term = (termToSearch !== undefined ? termToSearch : searchTerm).trim().toLowerCase();
    setHasSearched(true);
    if (!term) {
      setFoundCard(null);
      return;
    }

    const match = memberships.find(
      (m) =>
        m.membershipNo.toLowerCase().includes(term) ||
        m.phone.includes(term) ||
        m.fullName.toLowerCase().includes(term) ||
        (m.fullNameEn && m.fullNameEn.toLowerCase().includes(term)) ||
        m.citizenshipNo.toLowerCase().includes(term)
    );

    setFoundCard(match || null);
  };

  const handleQuickLookup = (phone: string) => {
    setSearchTerm(phone);
    handleSearch(phone);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPNG = () => {
    if (!foundCard) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 620;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 1000, 620);
    bgGradient.addColorStop(0, '#FFFFFF');
    bgGradient.addColorStop(0.6, '#F8FAFC');
    bgGradient.addColorStop(1, '#EFF6FF');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1000, 620);

    // Border
    ctx.strokeStyle = '#0052CC';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 980, 600);

    ctx.strokeStyle = '#93C5FD';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, 952, 572);

    // Header Blue Band
    ctx.fillStyle = '#0052CC';
    ctx.fillRect(26, 26, 948, 120);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 34px Mukta, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('राष्ट्रिय स्वतन्त्र पार्टी (रास्वपा)', 500, 70);

    ctx.font = '600 22px Mukta, sans-serif';
    ctx.fillText('वडा समिति: फिदिम नगरपालिका - १२ (नांगीन पलभञ्याङ्ग), पाँचथर', 500, 108);

    ctx.font = '500 16px Mukta, sans-serif';
    ctx.fillStyle = '#E0F2FE';
    ctx.fillText('स्वच्छ राजनीति • समृद्ध नेपाल • समान अवसर • सुशासन', 500, 134);

    // Bell logo badge
    ctx.fillStyle = '#0066FF';
    ctx.beginPath();
    ctx.arc(100, 86, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('🔔', 100, 96);

    // Subheader
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 22px Mukta, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('आधिकारिक डिजिटल सदस्यता परिचयपत्र', 60, 185);

    ctx.fillStyle = '#DC2626';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(foundCard.membershipNo, 930, 185);

    // Line
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 200);
    ctx.lineTo(940, 200);
    ctx.stroke();

    // Photo Box
    ctx.fillStyle = '#F1F5F9';
    ctx.fillRect(60, 220, 170, 210);
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 220, 170, 210);

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 16px Mukta, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('प्रमाणित फोटो', 145, 330);
    ctx.font = '36px sans-serif';
    ctx.fillText('👤', 145, 300);

    // Details Grid
    ctx.textAlign = 'left';
    const startX = 260;
    const startY = 245;
    const lineGap = 34;

    const fields = [
      { label: 'सदस्यको नाम:', val: foundCard.fullName },
      { label: 'तह / वडा:', val: foundCard.levelWard },
      { label: 'टोल / ठेगाना:', val: foundCard.tole },
      { label: 'सम्पर्क फोन:', val: foundCard.phone },
      { label: 'लिङ्ग / रक्त समूह:', val: `${foundCard.gender}  |  ${foundCard.bloodGroup}` },
      { label: 'नागरिकता नं:', val: foundCard.citizenshipNo },
      { label: 'जारी मिति:', val: `${foundCard.issuedDate} (२०८१)` },
    ];

    fields.forEach((f, idx) => {
      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 15px Mukta, sans-serif';
      ctx.fillText(f.label, startX, startY + idx * lineGap);

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 18px Mukta, sans-serif';
      ctx.fillText(f.val, startX + 160, startY + idx * lineGap);
    });

    // Signatures box
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(60, 480, 880, 100);
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 480, 880, 100);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'italic bold 17px Mukta, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('राजेन्द्र बहादुर न्यौपाने', 240, 520);
    ctx.fillStyle = '#0052CC';
    ctx.font = 'bold 14px Mukta, sans-serif';
    ctx.fillText('वडा सभापति (हस्ताक्षर)', 240, 545);

    // Official Seal
    ctx.beginPath();
    ctx.arc(500, 530, 36, 0, Math.PI * 2);
    ctx.fillStyle = '#EFF6FF';
    ctx.fill();
    ctx.strokeStyle = '#0052CC';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#0052CC';
    ctx.font = 'bold 12px Mukta, sans-serif';
    ctx.fillText('वडा छाप', 500, 526);
    ctx.fillText('फिदिम-१२', 500, 544);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'italic bold 17px Mukta, sans-serif';
    ctx.fillText('लोक बहादुर रिमाल', 760, 520);
    ctx.fillStyle = '#0052CC';
    ctx.font = 'bold 14px Mukta, sans-serif';
    ctx.fillText('कार्यालय सञ्चालक (हस्ताक्षर)', 760, 545);

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `RSP-Phidim12-Verified-${foundCard.membershipNo}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <RspLogo size={36} interactiveSound={false} />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'ne' ? 'सदस्यता स्थिति खोजी तथा प्रमाणीकरण' : 'Membership Status & Card Search'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'ne'
                  ? 'फिदिम-१२ नांगीन पलभञ्याङ्ग डिजिटल सदस्यता रजिस्टर'
                  : 'Phidim-12 Nangin Pulbhanjyang Digital Membership Registry'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg text-xl font-bold cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="mt-5 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === 'ne'
                    ? 'मोबाइल नम्बर (उदा: ९८१७९९७३५९) वा सदस्यता नं...'
                    : 'Search by phone (e.g. 9817997359) or card number...'
                }
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              {language === 'ne' ? 'प्रमाणीकरण गर्नुहोस्' : 'Search'}
            </button>
          </form>

          {/* Quick test lookups from prompt */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 font-medium">
              {language === 'ne' ? 'तुरुन्त जाँच्नुहोस्:' : 'Quick verify:'}
            </span>
            <button
              type="button"
              onClick={() => handleQuickLookup('9817997359')}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-md font-mono font-semibold cursor-pointer"
            >
              ९८१७९९७३५९ (लोक बहादुर रिमाल)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLookup('9706106350')}
              className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded-md font-mono font-semibold cursor-pointer"
            >
              ९७०६१०६३५० (राजेन्द्र बहादुर न्यौपाने)
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="mt-6">
          {foundCard ? (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === 'ne'
                      ? 'प्रमाणीकरण सफल: आधिकारिक सक्रिय सदस्य'
                      : 'Verified: Official Active Member'}
                  </span>
                </span>
                <span className="font-mono font-bold text-emerald-800">
                  {foundCard.membershipNo}
                </span>
              </div>

              {/* Card Visual in Modal */}
              <div className="bg-gradient-to-br from-white to-blue-50/70 rounded-2xl border-2 border-blue-600 p-5 shadow-sm text-slate-800">
                <div className="bg-blue-700 -mx-5 -mt-5 p-3 text-white rounded-t-xl mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RspLogo size={34} interactiveSound={false} />
                    <div>
                      <h4 className="text-sm font-bold leading-tight">
                        राष्ट्रिय स्वतन्त्र पार्टी (रास्वपा)
                      </h4>
                      <p className="text-[10px] text-blue-100">
                        फिदिम न.पा. - १२ (नांगीन पलभञ्याङ्ग)
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-white/20 px-2 py-0.5 rounded">
                    {foundCard.membershipNo}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">सदस्यको नाम:</span>
                    <strong className="text-sm text-slate-900">{foundCard.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">टोल / ठेगाना:</span>
                    <strong className="text-slate-800">{foundCard.tole}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">फोन नम्बर:</span>
                    <strong className="text-slate-800 font-mono">{foundCard.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">रक्त समूह / लिङ्ग:</span>
                    <strong className="text-slate-800 font-mono">
                      {foundCard.bloodGroup} | {foundCard.gender}
                    </strong>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-center text-[10px] text-slate-600">
                  <div className="border-r border-slate-200">
                    <span className="font-serif italic font-bold block text-slate-900">
                      राजेन्द्र बहादुर न्यौपाने
                    </span>
                    <span className="text-[9px] text-blue-700 font-semibold">वडा सभापति</span>
                  </div>
                  <div>
                    <span className="font-serif italic font-bold block text-slate-900">
                      लोक बहादुर रिमाल
                    </span>
                    <span className="text-[9px] text-blue-700 font-semibold">कार्यालय सञ्चालक</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleDownloadPNG}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'ne' ? 'PNG डाउनलोड' : 'Download PNG'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{language === 'ne' ? 'प्रिन्ट गर्नुहोस्' : 'Print'}</span>
                </button>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {language === 'ne'
                  ? 'कुनै सदस्यता कार्ड फेला परेन। कृपया फोन वा सदस्यता नम्बर पुनः जाँच्नुहोस् वा नयाँ सदस्यता लिनुहोस्।'
                  : 'No membership card found with this query. Please check or register as a new member.'}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
