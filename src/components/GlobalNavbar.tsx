/**
 * @file GlobalNavbar.tsx
 * @description აპლიკაციის მთავარი მუდმივი ჰედერი (Sticky Header).
 * მუდამ ჩანს ყველა გვერდზე, რათა მომხმარებელს არ დაეკარგოს აქტიური სესია,
 * შეეძლოს მთავარზე დაბრუნება, დემოს გამოძახება ან სტატუსის ხილვა.
 */

import React from 'react';
import { RedberryLogo } from './RedberryLogo';
import { Home, Play, CheckCircle2, RotateCcw, Check, Sparkles } from './Icons';

interface Props {
  view: 'home' | 'form' | 'completed';     // მიმდინარე ეკრანი
  currentStep: number;                     // მიმდინარე ეტაპი (1, 2 ან 3)
  hasDraft: boolean;                       // არსებობს თუ არა შენახული მონახაზი
  onGoHome: () => void;                    // მთავარ გვერდზე გადასვლა
  onOpenDemoProcess: () => void;           // დემო მოდალის გახსნა
  onLoadFinalDemo: () => void;             // მზა დემო CV-ის ნახვა (მხოლოდ მთავარიდან)
  onClearDraft: () => void;                // მონახაზის გასუფთავება
  stepTitles: Record<number, string>;      // ეტაპების ქართული სათაურები
}

export const GlobalNavbar: React.FC<Props> = ({
  view,
  currentStep,
  hasDraft,
  onGoHome,
  onOpenDemoProcess,
  onLoadFinalDemo,
  onClearDraft,
  stepTitles,
}) => {
  return (
    <header className="w-full bg-white sticky top-0 z-40 no-print" style={{ borderBottom: '1px solid #E8E8E8', height: '56px' }}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 flex items-center justify-between h-full gap-4">
        {/* მარცხენა მხარე: Redberry ლოგო და ეტაპის ინდიკატორი */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onGoHome}
            className="cursor-pointer hover:opacity-85 transition-opacity flex items-center"
            title="მთავარ გვერდზე გადასვლა"
          >
            <RedberryLogo size="sm" />
          </button>

          {/* ფორმის შევსებისას ვაჩვენებთ მიმდინარე ეტაპსა და შენახვის სტატუსს */}
          {view === 'form' && (
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6B40E3] font-semibold text-xs border border-purple-100">
                {currentStep}/3 {stepTitles[currentStep]}
              </span>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <Check className="w-3 h-3 stroke-[2.5]" />
                ავტო-შენახულია
              </span>
            </div>
          )}

          {/* დასრულებულ CV-ზე შესაბამისი ბეიჯი */}
          {view === 'completed' && (
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                მზა რეზიუმე
              </span>
            </div>
          )}
        </div>

        {/* მარჯვენა მხარე: მართვის ღილაკები */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* მთავარზე დაბრუნების ღილაკი (როცა ფორმაში ვართ) */}
          {view !== 'home' && (
            <button
              type="button"
              onClick={onGoHome}
              className="text-xs sm:text-sm font-medium text-gray-700 hover:text-[#1A1A1A] hover:bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
              title="მთავარზე დაბრუნება (მონახაზი შენახულია)"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">მთავარი</span>
            </button>
          )}

          {/* დემო ტურის ღილაკი (ხსნის დროებით გადაფარვას) */}
          <button
            type="button"
            onClick={onOpenDemoProcess}
            className="text-xs sm:text-sm font-semibold text-white bg-[#6B40E3] hover:bg-[#5b32d1] px-3 sm:px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow active:scale-95"
            title="დემო ტურის ჩვენება (დროებითი გადაფარვა)"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>დემო ტური</span>
          </button>

          {/* დემო CV (ნაჩვენებია მხოლოდ მთავარ გვერდზე) */}
          {view === 'home' && (
            <button
              type="button"
              onClick={onLoadFinalDemo}
              className="text-xs sm:text-sm font-medium text-gray-700 hover:text-[#F93B1D] px-3 sm:px-3.5 py-1.5 rounded-full border border-gray-200 hover:border-[#F93B1D] transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
              title="საბოლოო მზა დემო CV-ის ნახვა"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>დემო CV</span>
            </button>
          )}

          {/* მონახაზის გასუფთავება (მხოლოდ მთავარზე) */}
          {hasDraft && view === 'home' && (
            <button
              type="button"
              onClick={onClearDraft}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 flex items-center gap-1 cursor-pointer"
              title="მონახაზის გასუფთავება"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">გასუფთავება</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
