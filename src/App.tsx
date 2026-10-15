import React, { useState, useEffect } from 'react';
import { Language, MembershipCardData } from './types';
import { WARD_STATS, INITIAL_MEMBERSHIPS, CONTACT_INFO } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AgendasSection } from './components/AgendasSection';
import { LivePollSection } from './components/LivePollSection';
import { ToleCommitteesSection } from './components/ToleCommitteesSection';
import { MembershipPortal } from './components/MembershipPortal';
import { LeadershipSection } from './components/LeadershipSection';
import { GrievancePortal } from './components/GrievancePortal';
import { ActivitiesSection } from './components/ActivitiesSection';
import { CardSearchModal } from './components/CardSearchModal';
import { Footer } from './components/Footer';
import { Phone, Search, Bell } from 'lucide-react';
import { playBellSound } from './components/RspLogo';

export default function App() {
  const [language, setLanguage] = useState<Language>('ne');
  const [isCardSearchOpen, setIsCardSearchOpen] = useState(false);
  const [preselectedTole, setPreselectedTole] = useState<string | undefined>(undefined);

  // Membership registry with localStorage persistence
  const [memberships, setMemberships] = useState<MembershipCardData[]>(() => {
    try {
      const saved = localStorage.getItem('rsp_phidim12_memberships');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MEMBERSHIPS;
  });

  const handleNewMembership = (newCard: MembershipCardData) => {
    const updated = [newCard, ...memberships];
    setMemberships(updated);
    try {
      localStorage.setItem('rsp_phidim12_memberships', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyForTole = (toleName: string) => {
    setPreselectedTole(toleName);
    handleNavigate('membership');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        onOpenCardSearch={() => setIsCardSearchOpen(true)}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* 1. Official Ward 12 Home & Profile Banner */}
        <HeroSection
          stats={WARD_STATS}
          language={language}
          onApplyClick={() => handleNavigate('membership')}
          onSearchClick={() => setIsCardSearchOpen(true)}
          onTolesClick={() => handleNavigate('tole-committees')}
        />

        {/* 2. Ward 12 Core 4 Agendas */}
        <AgendasSection language={language} />

        {/* 3. Live Citizen Poll */}
        <LivePollSection language={language} />

        {/* 4. 8 Tole Committees */}
        <ToleCommitteesSection
          language={language}
          onApplyForTole={handleApplyForTole}
        />

        {/* 5. Online Membership Portal & Digital Card Generator */}
        <MembershipPortal
          language={language}
          preselectedTole={preselectedTole}
          onNewMembershipCreated={handleNewMembership}
        />

        {/* 6. Ward Committee Leadership Directory */}
        <LeadershipSection language={language} />

        {/* 7. Civic Grievance Box & Tracking */}
        <GrievancePortal language={language} />

        {/* 8. Field Reports & Campaign Anthems */}
        <ActivitiesSection language={language} />
      </main>

      {/* Floating Action Button for Emergency Ring & Direct Call */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={playBellSound}
          title="घण्टी बजाउनुहोस् (Ring RSP Bell)"
          className="w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer hover:shadow-xl"
        >
          <Bell className="w-6 h-6 animate-bounce" />
        </button>

        <a
          href={`tel:${CONTACT_INFO.officeCoordinator.phone}`}
          title={`कार्यालय सञ्चालक लोक बहादुर रिमाल (${CONTACT_INFO.officeCoordinator.formattedPhone})`}
          className="hidden sm:inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2.5 rounded-full shadow-lg text-xs font-bold transition-all hover:shadow-xl cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          <span>{language === 'ne' ? 'कार्यालय डेस्क कल' : 'Call Desk'}</span>
        </a>
      </div>

      {/* Membership Card Verification Modal */}
      <CardSearchModal
        isOpen={isCardSearchOpen}
        onClose={() => setIsCardSearchOpen(false)}
        memberships={memberships}
        language={language}
      />

      {/* Official Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
        onOpenCardSearch={() => setIsCardSearchOpen(true)}
      />
    </div>
  );
}
