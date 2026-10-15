import React, { useState, useEffect } from 'react';
import { PollOption, Language } from '../types';
import { INITIAL_POLL_OPTIONS } from '../data/initialData';
import { Vote, CheckCircle2, BarChart3, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LivePollSectionProps {
  language: Language;
}

export const LivePollSection: React.FC<LivePollSectionProps> = ({ language }) => {
  const [pollOptions, setPollOptions] = useState<PollOption[]>(() => {
    try {
      const saved = localStorage.getItem('rsp_phidim12_poll_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_POLL_OPTIONS;
  });

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rsp_phidim12_user_voted') === 'true';
    } catch {
      return false;
    }
  });
  const [userVotedId, setUserVotedId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('rsp_phidim12_user_vote_id') || null;
    } catch {
      return null;
    }
  });

  const totalVotes = pollOptions.reduce((acc, opt) => acc + opt.votes, 0);

  const handleVoteSubmit = () => {
    if (!selectedOptionId || hasVoted) return;

    const updated = pollOptions.map((opt) =>
      opt.id === selectedOptionId ? { ...opt, votes: opt.votes + 1 } : opt
    );

    setPollOptions(updated);
    setHasVoted(true);
    setUserVotedId(selectedOptionId);

    try {
      localStorage.setItem('rsp_phidim12_poll_data', JSON.stringify(updated));
      localStorage.setItem('rsp_phidim12_user_voted', 'true');
      localStorage.setItem('rsp_phidim12_user_vote_id', selectedOptionId);
    } catch {
      // storage blocked
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // confetti
    }
  };

  const handleResetVote = () => {
    setHasVoted(false);
    setUserVotedId(null);
    setSelectedOptionId(null);
    try {
      localStorage.removeItem('rsp_phidim12_user_voted');
      localStorage.removeItem('rsp_phidim12_user_vote_id');
    } catch {
      // ignore
    }
  };

  return (
    <section id="live-poll" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Vote className="w-3.5 h-3.5" />
              <span>{language === 'ne' ? 'नागरिक प्रत्यक्ष जनमत (Live Poll)' : 'Citizen Priority Poll'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'ne'
                ? 'वडाको पहिलो विकास प्राथमिकता कुन हुनुपर्छ?'
                : 'What should be the top development priority for Ward 12?'}
            </h2>

            <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
              {language === 'ne'
                ? 'नांगीन पलभञ्याङ्ग तथा सम्पूर्ण ८ टोलवासी नागरिकले आफ्नो मत सिधै जाहेर गर्न सक्नुहुन्छ। तपाईंको अभिमत वडा बजेट योजनामा समावेश गरिनेछ।'
                : 'Cast your online vote directly. Your mandate will directly guide our ward budget planning.'}
            </p>
          </div>

          {/* Voting Options */}
          <div className="space-y-3 mb-6">
            {pollOptions.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isVotedByUser = userVotedId === option.id;
              const percent = totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : '0';

              return (
                <div
                  key={option.id}
                  onClick={() => !hasVoted && setSelectedOptionId(option.id)}
                  className={`relative overflow-hidden rounded-xl border transition-all duration-200 ${
                    hasVoted
                      ? 'border-slate-200 bg-slate-50 p-4'
                      : isSelected
                      ? 'border-blue-600 bg-blue-50/50 p-4 shadow-xs cursor-pointer'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 p-4 cursor-pointer'
                  }`}
                >
                  {/* Progress background bar when voted */}
                  {hasVoted && (
                    <div
                      className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                        isVotedByUser ? 'bg-blue-100/70' : 'bg-slate-200/50'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  )}

                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      {!hasVoted && (
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      )}

                      <div>
                        <span className="text-sm font-bold text-slate-900 block">
                          {language === 'ne' ? option.textNe : option.textEn}
                        </span>
                        {hasVoted && isVotedByUser && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 mt-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            {language === 'ne' ? 'तपाईंले दिनुभएको मत' : 'Your submitted vote'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Percentage & Vote Count badge */}
                    {hasVoted && (
                      <div className="text-right shrink-0">
                        <span className="text-base font-extrabold text-slate-900 font-mono">
                          {percent}%
                        </span>
                        <span className="text-xs text-slate-500 block font-mono">
                          ({option.votes.toLocaleString('ne-NP')} {language === 'ne' ? 'मत' : 'votes'})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>
                {language === 'ne'
                  ? `कुल खसेको मत: ${totalVotes.toLocaleString('ne-NP')} जना`
                  : `Total Votes Cast: ${totalVotes} citizens`}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!hasVoted ? (
                <button
                  disabled={!selectedOptionId}
                  onClick={handleVoteSubmit}
                  className={`w-full sm:w-auto px-6 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    selectedOptionId
                      ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-xs cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {language === 'ne' ? 'आफ्नो मत सुरक्षित गर्नुहोस्' : 'Submit My Vote'}
                </button>
              ) : (
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {language === 'ne' ? 'मतदान सम्पन्न भयो' : 'Vote Registered'}
                  </span>
                  <button
                    onClick={handleResetVote}
                    title="पुनः मतदान परीक्षण (Reset Vote for testing)"
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 text-xs inline-flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span className="text-[11px]">{language === 'ne' ? 'पुनः मत' : 'Re-vote'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
