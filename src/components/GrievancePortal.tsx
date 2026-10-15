import React, { useState } from 'react';
import { GrievanceItem, Language } from '../types';
import { INITIAL_GRIEVANCES, TOLE_COMMITTEES, CONTACT_INFO } from '../data/initialData';
import {
  MessageSquareQuote,
  Search,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  FileCheck2,
  Phone,
  User,
  MapPin,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrievancePortalProps {
  language: Language;
}

export const GrievancePortal: React.FC<GrievancePortalProps> = ({ language }) => {
  const [grievances, setGrievances] = useState<GrievanceItem[]>(() => {
    try {
      const saved = localStorage.getItem('rsp_phidim12_grievances');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_GRIEVANCES;
  });

  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');
  const [searchToken, setSearchToken] = useState('');
  const [trackedItem, setTrackedItem] = useState<GrievanceItem | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);

  const [form, setForm] = useState({
    citizenName: '',
    phone: '',
    tole: 'नांगीन पलभञ्याङ्ग बजार',
    category: 'सडक तथा पूर्वाधार',
    title: '',
    description: '',
  });

  const categories = [
    'सडक तथा पूर्वाधार (Roads & Infrastructure)',
    'खानेपानी तथा सरसफाइ (Drinking Water & Sanitation)',
    'स्वास्थ्य सेवा तथा औषधि (Health & Medicines)',
    'कृषि तथा शीतभण्डार (Agriculture & Cold Store)',
    'सामुदायिक विद्यालय तथा शिक्षा (Education & Schools)',
    'विद्युत तथा सञ्चार (Electricity & Telecom)',
    'प्रशासनिक ढिलासुस्ती तथा भ्रष्टाचार (Governance & Anti-corruption)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.citizenName.trim() || !form.phone.trim() || !form.title.trim()) {
      alert(language === 'ne' ? 'कृपया सम्पूर्ण आवश्यक विवरण भर्नुहोस्।' : 'Please fill all required fields.');
      return;
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const token = `PHD12-GR-2081-${randomNum}`;

    const newGrievance: GrievanceItem = {
      id: `gr-${Date.now()}`,
      token,
      citizenName: form.citizenName,
      phone: form.phone,
      tole: form.tole,
      category: form.category.split(' ')[0],
      title: form.title,
      description: form.description,
      status: 'registered',
      submittedDate: '२०८१-०७-०२',
      officialNote: 'कार्यालय सञ्चालक लोक बहादुर रिमालद्वारा गुनासो दर्ता भएको छ। स्थलगत अनुगमन तथा सहजीकरण प्रक्रिया सुरु गरिएको छ।',
    };

    const updated = [newGrievance, ...grievances];
    setGrievances(updated);
    setSubmittedToken(token);
    setTrackedItem(newGrievance);

    try {
      localStorage.setItem('rsp_phidim12_grievances', JSON.stringify(updated));
    } catch {
      // ignore
    }

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setForm({
      citizenName: '',
      phone: '',
      tole: 'नांगीन पलभञ्याङ्ग बजार',
      category: 'सडक तथा पूर्वाधार',
      title: '',
      description: '',
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(false);
    if (!searchToken.trim()) return;

    const cleaned = searchToken.trim().toLowerCase();
    const found = grievances.find(
      (g) => g.token.toLowerCase() === cleaned || g.phone.includes(cleaned)
    );

    if (found) {
      setTrackedItem(found);
    } else {
      setTrackedItem(null);
      setSearchError(true);
    }
  };

  const getStatusBadge = (status: GrievanceItem['status']) => {
    switch (status) {
      case 'registered':
        return (
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            {language === 'ne' ? '१. दर्ता सम्पन्न' : '1. Registered'}
          </span>
        );
      case 'reviewing':
        return (
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {language === 'ne' ? '२. अध्ययनरत' : '2. Under Review'}
          </span>
        );
      case 'in_progress':
        return (
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            {language === 'ne' ? '३. प्रक्रियामा' : '3. In Progress'}
          </span>
        );
      case 'resolved':
        return (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {language === 'ne' ? '४. समाधान सम्पन्न' : '4. Resolved'}
          </span>
        );
    }
  };

  return (
    <section id="grievance" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{language === 'ne' ? 'नागरिक गुनासो तथा सुझाव पेटिका' : 'Civic Grievance Box'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'ne'
              ? 'आफ्नो गुनासो सिधै वडा कार्यालयमा दर्ता गर्नुहोस्'
              : 'Submit Your Grievance Directly to Ward Office'}
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
            {language === 'ne'
              ? 'सडक, खानेपानी, स्वास्थ्य, कृषि वा प्रशासनिक ढिलासुस्ती सम्बन्धी गुनासो दर्ता गरी अनलाइन ट्र्याकिङ टोकन प्राप्त गर्नुहोस्।'
              : 'Report civic issues and track the 4-stage resolution status in real-time.'}
          </p>

          {/* Switch Tab buttons */}
          <div className="inline-flex p-1 bg-slate-200/80 rounded-xl mt-6">
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'submit' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'ne' ? 'नयाँ गुनासो दर्ता गर्नुहोस्' : 'Submit New Grievance'}
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'track' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'ne' ? 'टोकनबाट स्थिति खोजी (Track)' : 'Track by Token'}
            </button>
          </div>
        </div>

        {/* Tab 1: Submit Form */}
        {activeTab === 'submit' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-sm">
            {submittedToken && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-950">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-sm block">
                      {language === 'ne' ? 'गुनासो सफलतापूर्वक दर्ता भयो!' : 'Grievance Registered Successfully!'}
                    </span>
                    <span className="text-xs text-emerald-800">
                      {language === 'ne'
                        ? 'तपाईंको ट्र्याकिङ टोकन सुरक्षित राख्नुहोस्:'
                        : 'Your tracking token:'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-white border border-emerald-300 font-mono font-black text-sm text-emerald-900 rounded-lg">
                    {submittedToken}
                  </span>
                  <button
                    onClick={() => {
                      setSearchToken(submittedToken);
                      setActiveTab('track');
                    }}
                    className="text-xs font-bold underline text-blue-700 cursor-pointer"
                  >
                    {language === 'ne' ? 'अहिले हेर्नुहोस्' : 'Track Now'}
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ne' ? 'नागरिकको नाम *' : 'Citizen Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={form.citizenName}
                      onChange={(e) => setForm({ ...form, citizenName: e.target.value })}
                      placeholder={language === 'ne' ? 'पूरा नाम' : 'Full name'}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ne' ? 'सम्पर्क फोन नम्बर *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="९८XXXXXXXX"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'ne' ? 'सम्बन्धित टोल' : 'Associated Tole'}
                  </label>
                  <select
                    value={form.tole}
                    onChange={(e) => setForm({ ...form, tole: e.target.value })}
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
                    {language === 'ne' ? 'गुनासोको विषय क्षेत्र' : 'Category'}
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
                  >
                    {categories.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'ne' ? 'गुनासोको मुख्य शीर्षक *' : 'Grievance Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder={language === 'ne' ? 'उदा: नांगीन मुख्य बाटोमा हिलो र नालाको समस्या' : 'Brief subject of the issue'}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'ne' ? 'विस्तृत समस्या र समाधान सुझाव' : 'Detailed Description'}
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder={language === 'ne' ? 'समस्याको स्थान, प्रभावित घरधुरी तथा सुझाव खुलाउनुहोस्...' : 'Describe the exact location, affected households, and urgent requirement...'}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {language === 'ne' ? 'गुनासो पेश गर्नुहोस् र ट्र्याकिङ कोड लिनुहोस्' : 'Submit & Receive Tracking Token'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Track Status */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchToken}
                    onChange={(e) => setSearchToken(e.target.value)}
                    placeholder={language === 'ne' ? 'ट्र्याकिङ टोकन (उदा: PHD12-GR-2081-101) वा फोन नं...' : 'Enter token (e.g. PHD12-GR-2081-101) or phone...'}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  {language === 'ne' ? 'स्थिति खोज्नुहोस्' : 'Check Status'}
                </button>
              </form>

              {searchError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>
                    {language === 'ne'
                      ? 'उक्त टोकन वा फोन नम्बरको गुनासो फेला परेन। कृपया टोकन जाँच गरी पुनः प्रयास गर्नुहोस्।'
                      : 'No record found for this token or phone number. Please recheck.'}
                  </span>
                </div>
              )}
            </div>

            {/* Tracked Item Display */}
            {trackedItem && (
              <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-700 block">
                      {trackedItem.token}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {trackedItem.title}
                    </h3>
                  </div>
                  <div>{getStatusBadge(trackedItem.status)}</div>
                </div>

                {/* 4-Step Progress Visual */}
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                    {language === 'ne' ? 'समाधान चरण स्थिति:' : 'Resolution Progress:'}
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        trackedItem.status === 'registered' ||
                        trackedItem.status === 'reviewing' ||
                        trackedItem.status === 'in_progress' ||
                        trackedItem.status === 'resolved'
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      १. दर्ता सम्पन्न
                    </div>
                    <div
                      className={`p-2.5 rounded-xl border ${
                        trackedItem.status === 'reviewing' ||
                        trackedItem.status === 'in_progress' ||
                        trackedItem.status === 'resolved'
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      २. अध्ययनरत
                    </div>
                    <div
                      className={`p-2.5 rounded-xl border ${
                        trackedItem.status === 'in_progress' ||
                        trackedItem.status === 'resolved'
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      ३. प्रक्रियामा
                    </div>
                    <div
                      className={`p-2.5 rounded-xl border ${
                        trackedItem.status === 'resolved'
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      ४. समाधान सम्पन्न
                    </div>
                  </div>
                </div>

                {/* Grievance Details & Official Remark */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                    <span className="font-bold text-slate-800 block text-sm">
                      {language === 'ne' ? 'नागरिक विवरण:' : 'Citizen Submission:'}
                    </span>
                    <p>
                      <strong className="text-slate-600">नाम:</strong> {trackedItem.citizenName}
                    </p>
                    <p>
                      <strong className="text-slate-600">टोल:</strong> {trackedItem.tole}
                    </p>
                    <p>
                      <strong className="text-slate-600">श्रेणी:</strong> {trackedItem.category}
                    </p>
                    <p>
                      <strong className="text-slate-600">दर्ता मिति:</strong> {trackedItem.submittedDate}
                    </p>
                    <p className="pt-2 text-slate-700 leading-relaxed border-t border-slate-200">
                      {trackedItem.description}
                    </p>
                  </div>

                  <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-xs space-y-2">
                    <span className="font-bold text-blue-900 block text-sm flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-blue-700" />
                      <span>{language === 'ne' ? 'कार्यालय सञ्चालकको टिप्पणी:' : 'Coordinator Note:'}</span>
                    </span>
                    <p className="text-blue-950 font-medium leading-relaxed">
                      {trackedItem.officialNote ||
                        (language === 'ne'
                          ? 'तपाईंको गुनासो वडा कार्यसमितिमा छलफल भइरहेको छ।'
                          : 'Your case is currently under active committee coordination.')}
                    </p>
                    <div className="pt-3 border-t border-blue-200/80 text-[11px] text-blue-800 flex items-center justify-between">
                      <span>सम्पर्क: ९८१७९९७३५९</span>
                      <a href="tel:9817997359" className="font-bold underline">
                        सिधै बुझ्नुहोस्
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
