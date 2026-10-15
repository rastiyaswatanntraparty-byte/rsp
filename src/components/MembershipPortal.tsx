import React, { useState, useRef } from 'react';
import { MembershipCardData, Language } from '../types';
import { RspLogo } from './RspLogo';
import { TOLE_COMMITTEES, CONTACT_INFO } from '../data/initialData';
import {
  ShieldCheck,
  Download,
  Printer,
  Sparkles,
  MapPin,
  CheckCircle2,
  QrCode,
  User,
  Phone,
  Calendar,
  CreditCard,
  Camera,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MembershipPortalProps {
  language: Language;
  preselectedTole?: string;
  onNewMembershipCreated: (card: MembershipCardData) => void;
}

export const MembershipPortal: React.FC<MembershipPortalProps> = ({
  language,
  preselectedTole,
  onNewMembershipCreated,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'पुरुष (Male)',
    dob: '२०५५-०२-१५',
    phone: '',
    tole: preselectedTole || 'नांगीन पलभञ्याङ्ग बजार',
    citizenshipNo: '',
    occupation: 'कृषि तथा व्यवसाय',
    bloodGroup: 'B+',
    photoUrl: '',
  });

  const [issuedCard, setIssuedCard] = useState<MembershipCardData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 1-Click Fast Fill for Phidim-12 Nangin Pulbhanjyang
  const handleQuickWardFill = () => {
    setFormData((prev) => ({
      ...prev,
      tole: 'नांगीन पलभञ्याङ्ग बजार',
      occupation: prev.occupation || 'स्थानीय कृषक / व्यवसायी',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert(language === 'ne' ? 'कृपया पूरा नाम र फोन नम्बर प्रविष्ट गर्नुहोस्।' : 'Please enter full name and phone number.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const memberNumber = `RSP-KOS-PAN-2081-${randomSeq}`;

      const newCard: MembershipCardData = {
        id: `card-${Date.now()}`,
        membershipNo: memberNumber,
        fullName: formData.fullName,
        gender: formData.gender,
        dob: formData.dob || '२०५०-०१-०१',
        phone: formData.phone,
        tole: formData.tole,
        citizenshipNo: formData.citizenshipNo || '१०१-०४-XXXX',
        occupation: formData.occupation,
        bloodGroup: formData.bloodGroup,
        issuedDate: '२०८१-०७-०१',
        levelWard: 'फिदिम न.पा. - १२ (नांगीन पलभञ्याङ्ग)',
        photoUrl: formData.photoUrl,
      };

      setIssuedCard(newCard);
      onNewMembershipCreated(newCard);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }, 400);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPNG = () => {
    if (!cardRef.current || !issuedCard) return;

    // Use HTML5 Canvas to render high-resolution membership card
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

    // Outer border
    ctx.strokeStyle = '#0052CC';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 980, 600);

    // Inner hairline
    ctx.strokeStyle = '#93C5FD';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, 952, 572);

    // Header Blue Band
    ctx.fillStyle = '#0052CC';
    ctx.fillRect(26, 26, 948, 120);

    // Header Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 34px Mukta, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('राष्ट्रिय स्वतन्त्र पार्टी (रास्वपा)', 500, 70);

    ctx.font = '600 22px Mukta, sans-serif';
    ctx.fillText('वडा समिति: फिदिम नगरपालिका - १२ (नांगीन पलभञ्याङ्ग), पाँचथर', 500, 108);

    ctx.font = '500 16px Mukta, sans-serif';
    ctx.fillStyle = '#E0F2FE';
    ctx.fillText('स्वच्छ राजनीति • समृद्ध नेपाल • समान अवसर • सुशासन', 500, 134);

    // Bell logo badge on left
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

    // Membership Card Ribbon
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 22px Mukta, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('आधिकारिक डिजिटल सदस्यता परिचयपत्र (DIGITAL MEMBERSHIP CARD)', 60, 185);

    ctx.fillStyle = '#DC2626';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(issuedCard.membershipNo, 930, 185);

    // Horizontal line
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
    ctx.font = '500 16px Mukta, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('प्रमाणित फोटो', 145, 330);
    ctx.font = '36px sans-serif';
    ctx.fillText('👤', 145, 300);

    // Details Grid
    ctx.textAlign = 'left';
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 16px Mukta, sans-serif';

    const startX = 260;
    const startY = 245;
    const lineGap = 34;

    const fields = [
      { label: 'सदस्यको नाम:', val: issuedCard.fullName },
      { label: 'तह / वडा:', val: issuedCard.levelWard },
      { label: 'टोल / ठेगाना:', val: issuedCard.tole },
      { label: 'सम्पर्क फोन:', val: issuedCard.phone },
      { label: 'लिङ्ग / रक्त समूह:', val: `${issuedCard.gender}  |  ${issuedCard.bloodGroup}` },
      { label: 'नागरिकता नं:', val: issuedCard.citizenshipNo },
      { label: 'जारी मिति:', val: `${issuedCard.issuedDate} (२०८१)` },
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

    // Signature 1: President
    ctx.fillStyle = '#0F172A';
    ctx.font = 'italic bold 17px Mukta, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('राजेन्द्र बहादुर न्यौपाने', 240, 520);
    ctx.fillStyle = '#0052CC';
    ctx.font = 'bold 14px Mukta, sans-serif';
    ctx.fillText('वडा सभापति (हस्ताक्षर)', 240, 545);
    ctx.fillStyle = '#64748B';
    ctx.font = '12px Mukta, sans-serif';
    ctx.fillText('फिदिम-१२ वडा समिति', 240, 565);

    // Official Seal in Center
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

    // Signature 2: Coordinator
    ctx.fillStyle = '#0F172A';
    ctx.font = 'italic bold 17px Mukta, sans-serif';
    ctx.fillText('लोक बहादुर रिमाल', 760, 520);
    ctx.fillStyle = '#0052CC';
    ctx.font = 'bold 14px Mukta, sans-serif';
    ctx.fillText('कार्यालय सञ्चालक (हस्ताक्षर)', 760, 545);
    ctx.fillStyle = '#64748B';
    ctx.font = '12px Mukta, sans-serif';
    ctx.fillText('फोन: ९८१७९९७३५९', 760, 565);

    // Export & Download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `RSP-Phidim12-Member-${issuedCard.membershipNo}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="membership" className="py-16 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-200 px-3.5 py-1.5 rounded-full text-blue-900 text-xs font-bold uppercase tracking-wide mb-3">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>{language === 'ne' ? 'अनलाइन सदस्यता पोर्टल' : 'Online Membership Portal'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'ne'
              ? 'रास्वपा डिजिटल सदस्यता फारम तथा परिचयपत्र'
              : 'RSP Digital Membership Application & Card'}
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
            {language === 'ne'
              ? 'फारम पेश गर्नासाथ तह/वडा: फिदिम न.पा. - १२ (नांगीन पलभञ्याङ्ग) सहितको आधिकारिक डिजिटल सदस्यता कार्ड तुरुन्त जारी हुन्छ।'
              : 'Submit the application to instantly receive your official digital membership card with verified card number.'}
          </p>
        </div>

        {/* 1-Click Auto Fill Banner */}
        <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">
                {language === 'ne'
                  ? 'फिदिम-१२ का बासिन्दा हुनुहुन्छ?'
                  : 'Resident of Phidim Ward 12?'}
              </h3>
              <p className="text-xs text-blue-100 mt-0.5">
                {language === 'ne'
                  ? '१-क्लिकमै नांगीन पलभञ्याङ्ग वडा विवरण स्वतः फारममा भर्नुहोस्।'
                  : '1-Click auto-fill Ward 12 Nangin Pulbhanjyang details into the application.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickWardFill}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 text-xs font-extrabold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-700" />
            <span>
              {language === 'ne'
                ? '📍 फिदिम-१२ (नांगीन पलभञ्याङ्ग) का लागि फारम भर्नुहोस्'
                : 'Auto-fill Phidim-12 Details'}
            </span>
          </button>
        </div>

        {/* Main 2-Column: Form on Left (or full), Card Preview on Right when issued */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (6 or 7 cols) */}
          <div className={issuedCard ? 'lg:col-span-5' : 'lg:col-span-8 lg:col-start-3'}>
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  {language === 'ne' ? 'सदस्यता फारम विवरण' : 'Member Information'}
                </span>
                <span className="text-xs text-slate-400">
                  {language === 'ne' ? '* अनिवार्य विवरण' : '* Required fields'}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ne' ? 'पूरा नाम, थर *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={language === 'ne' ? 'उदा: लोक बहादुर रिमाल' : 'e.g. Lok Bahadur Rimal'}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                {/* Phone & Gender in 2-cols */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ne' ? 'सम्पर्क फोन / मोबाइल नं. *' : 'Phone / Mobile No. *'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="९८XXXXXXXX"
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ne' ? 'लिङ्ग' : 'Gender'}
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
                    >
                      <option value="पुरुष (Male)">पुरुष (Male)</option>
                      <option value="महिला (Female)">महिला (Female)</option>
                      <option value="अन्य (Other)">अन्य (Other)</option>
                    </select>
                  </div>
                </div>

                {/* Tole selection & Date of Birth */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ne' ? 'फिदिम-१२ को टोल समिति' : 'Ward 12 Tole'}
                    </label>
                    <select
                      value={formData.tole}
                      onChange={(e) => setFormData({ ...formData, tole: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
                    >
                      {TOLE_COMMITTEES.map((t) => (
                        <option key={t.id} value={t.nameNe}>
                          {t.nameNe}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ne' ? 'जन्म मिति (वि.सं.)' : 'Date of Birth (B.S.)'}
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        placeholder="२०४५-०५-१०"
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Citizenship No & Blood Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ne' ? 'नागरिकता / परिचयपत्र नं.' : 'Citizenship / ID No.'}
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.citizenshipNo}
                        onChange={(e) => setFormData({ ...formData, citizenshipNo: e.target.value })}
                        placeholder="१०१-०४-२३९८"
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {language === 'ne' ? 'रक्त समूह (Blood Group)' : 'Blood Group'}
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 font-mono"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ne' ? 'पेशा / व्यवसाय' : 'Occupation'}
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    placeholder={language === 'ne' ? 'उदा: अलैंची कृषक / व्यवसायी / शिक्षक' : 'e.g. Farmer / Entrepreneur / Student'}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
                  />
                </div>

                {/* Auto fixed ward indication */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>
                    {language === 'ne' ? 'तह र वडा:' : 'Level / Ward:'}{' '}
                    <strong className="text-blue-900 font-bold">
                      फिदिम न.पा. - १२ (नांगीन पलभञ्याङ्ग)
                    </strong>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {language === 'ne' ? 'प्रमाणीकृत' : 'Verified'}
                  </span>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 hover:shadow"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-200" />
                  <span>
                    {isSubmitting
                      ? (language === 'ne' ? 'कार्ड तयार गर्दैछ...' : 'Generating Card...')
                      : (language === 'ne' ? 'फारम बुझाउनुहोस् र डिजिटल कार्ड पाउनुहोस्' : 'Submit & Generate Digital Card')}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Issued Official Digital Card Preview (7 cols) */}
          {issuedCard && (
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-xs flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {language === 'ne'
                      ? 'बधाई छ! तपाईंको डिजिटल सदस्यता कार्ड तुरुन्त जारी भएको छ।'
                      : 'Congratulations! Your digital membership card is issued.'}
                  </span>
                </span>
                <span className="font-mono font-bold text-emerald-800">
                  {issuedCard.membershipNo}
                </span>
              </div>

              {/* The Official Card Component */}
              <div
                ref={cardRef}
                className="bg-gradient-to-br from-white via-slate-50 to-blue-50/60 rounded-3xl border-4 border-blue-700 p-6 sm:p-7 shadow-xl relative overflow-hidden text-slate-800"
              >
                {/* Watermark in background */}
                <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
                  <RspLogo size={240} interactiveSound={false} />
                </div>

                {/* Card Top Blue Banner */}
                <div className="bg-blue-700 -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 p-4 text-white text-center rounded-t-2xl mb-5 flex items-center justify-between gap-4">
                  <div className="shrink-0">
                    <RspLogo size={48} interactiveSound={false} />
                  </div>
                  <div className="flex-1 text-center">
                    <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                      राष्ट्रिय स्वतन्त्र पार्टी (रास्वपा)
                    </h3>
                    <p className="text-xs font-semibold text-blue-100">
                      फिदिम नगरपालिका - १२ (नांगीन पलभञ्याङ्ग) वडा समिति
                    </p>
                    <p className="text-[10px] text-blue-200/90 tracking-wider">
                      स्वच्छ राजनीति • समृद्ध नेपाल • समान अवसर • सुशासन
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Card Title & Number */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    डिजिटल सदस्यता परिचयपत्र
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-red-600 font-mono tracking-tight">
                    {issuedCard.membershipNo}
                  </span>
                </div>

                {/* Middle details */}
                <div className="grid grid-cols-12 gap-4 items-center mb-5">
                  {/* Photo area (3 cols) */}
                  <div className="col-span-4 sm:col-span-3">
                    <div className="w-full aspect-3/4 rounded-xl border-2 border-slate-300 bg-slate-100 flex flex-col items-center justify-center p-2 text-slate-500 shadow-xs overflow-hidden">
                      {issuedCard.photoUrl ? (
                        <img
                          src={issuedCard.photoUrl}
                          alt={issuedCard.fullName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <User className="w-10 h-10 text-slate-400 mb-1" />
                          <span className="text-[10px] text-center font-bold text-slate-600 leading-tight">
                            प्रमाणित फोटो
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Field details (8 or 9 cols) */}
                  <div className="col-span-8 sm:col-span-9 space-y-1.5 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">{language === 'ne' ? 'सदस्यको नाम:' : 'Name:'}</span>
                      <span className="font-extrabold text-sm text-slate-900">{issuedCard.fullName}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">{language === 'ne' ? 'तह / वडा:' : 'Level/Ward:'}</span>
                      <span className="font-bold text-blue-900">{issuedCard.levelWard}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">{language === 'ne' ? 'टोल / ठेगाना:' : 'Tole:'}</span>
                      <span className="font-bold text-slate-800">{issuedCard.tole}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">{language === 'ne' ? 'सम्पर्क फोन:' : 'Phone:'}</span>
                      <span className="font-semibold text-slate-800 font-mono">{issuedCard.phone}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-slate-500 font-medium">{language === 'ne' ? 'रक्त समूह / लिङ्ग:' : 'Blood/Gender:'}</span>
                      <span className="font-semibold text-slate-800 font-mono">
                        {issuedCard.bloodGroup} | {issuedCard.gender}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Both Signatures (Rajendra Bahadur Neupane & Lok Bahadur Rimal) */}
                <div className="bg-slate-50/90 rounded-2xl p-3 border border-slate-200/90 grid grid-cols-2 gap-4 text-center">
                  <div className="border-r border-slate-200 pr-2">
                    <p className="font-serif italic font-bold text-xs text-slate-900 mb-0.5">
                      राजेन्द्र बहादुर न्यौपाने
                    </p>
                    <span className="text-[10px] font-extrabold text-blue-700 block uppercase">
                      वडा सभापति (हस्ताक्षर)
                    </span>
                    <span className="text-[9px] text-slate-400">फिदिम-१२ वडा समिति</span>
                  </div>

                  <div className="pl-2">
                    <p className="font-serif italic font-bold text-xs text-slate-900 mb-0.5">
                      लोक बहादुर रिमाल
                    </p>
                    <span className="text-[10px] font-extrabold text-blue-700 block uppercase">
                      कार्यालय सञ्चालक (हस्ताक्षर)
                    </span>
                    <span className="text-[9px] text-slate-400">फोन: ९८१७९९७३५९</span>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-3 text-[10px] text-slate-500 text-center font-medium">
                  {language === 'ne'
                    ? 'यो कार्ड राष्ट्रिय स्वतन्त्र पार्टी फिदिम-१२ को आधिकारिक डिजिटल प्रणालीबाट जारी गरिएको हो।'
                    : 'Issued through the official RSP Phidim-12 digital verification registry.'}
                </div>
              </div>

              {/* Action Buttons: PNG Download & Print */}
              <div className="flex flex-wrap items-center gap-3 justify-center pt-2">
                <button
                  onClick={handleDownloadPNG}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'ne' ? 'PNG फोटो डाउनलोड गर्नुहोस्' : 'Download PNG Card'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>{language === 'ne' ? 'सीधै प्रिन्ट गर्नुहोस्' : 'Print Card'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
