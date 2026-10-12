/**
 * @file CompletedCvView.tsx
 * @description დასრულებული რეზიუმეს ჩვენების კომპონენტი.
 * აჩვენებს გენერირებულ CV-ს, სადღესასწაულო კონფეტის ეფექტს,
 * წარმატების შეტყობინებას და ბეჭდვის/რედაქტირების ღილაკებს.
 */

import React, { useEffect, useState } from 'react';
import type { CvFormData } from '../types/cv';
import { CvPreview } from './CvPreview';
import { ArrowLeft, Printer, Edit3, PlusCircle, CheckCircle, X } from './Icons';
import { triggerConfetti } from '../utils/confetti';

interface Props {
  data: CvFormData;           // შევსებული რეზიუმეს სრული მონაცემები
  onEdit: () => void;         // რედაქტირების რეჟიმში დაბრუნების ფუნქცია
  onNew: () => void;          // ახალი CV-ის შექმნის ფუნქცია
  onGoHome: () => void;       // მთავარ გვერდზე დაბრუნების ფუნქცია
}

export const CompletedCvView: React.FC<Props> = ({ data, onEdit, onNew, onGoHome }) => {
  // Toast შეტყობინების გამოჩენის მდგომარეობა
  const [showToast, setShowToast] = useState(true);

  // გვერდის ჩატვირთვისას ირთვება სადღესასწაულო კონფეტის ანიმაცია
  useEffect(() => {
    triggerConfetti();
  }, []);

  // ბრაუზერის ბეჭდვის / PDF შენახვის ფანჯრის გამოძახება
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] relative py-8 px-4 flex flex-col items-center">
      {/* ზედა მცურავი წარმატების შეტყობინება (Toast - Figma-ს მიხედვით) */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 pr-10 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 no-print">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900">
              რეზიუმე წარმატებით გაიგზავნა ⚑
            </h4>
            <p className="text-xs text-gray-500">
              თქვენი CV მზადაა გასაზიარებლად ან დასაბეჭდად
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"
            title="დახურვა"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ნავიგაციის პანელი: მთავარზე დაბრუნება, რედაქტირება, ბეჭდვა, ახალი CV */}
      <div className="w-full max-w-[820px] mb-6 flex flex-wrap items-center justify-between gap-4 no-print">
        {/* უკან დაბრუნების მრგვალი ღილაკი */}
        <button
          type="button"
          onClick={onGoHome}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          title="მთავარზე დაბრუნება"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* მოქმედების ღილაკები */}
        <div className="flex items-center gap-3">
          {/* რედაქტირება */}
          <button
            type="button"
            onClick={onEdit}
            className="h-10 px-4 rounded-[4px] bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Edit3 className="w-4 h-4" />
            რედაქტირება
          </button>

          {/* ბეჭდვა / PDF ექსპორტი */}
          <button
            type="button"
            onClick={handlePrint}
            className="h-10 px-5 rounded-[4px] bg-[#6B40E3] hover:bg-[#5b32d1] text-white text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md active:scale-98"
          >
            <Printer className="w-4 h-4" />
            ბეჭდვა / PDF
          </button>

          {/* ახალი რეზიუმეს დაწყება */}
          <button
            type="button"
            onClick={onNew}
            className="h-10 px-4 rounded-[4px] bg-[#F93B1D] hover:bg-[#e02f13] text-white text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm active:scale-98"
          >
            <PlusCircle className="w-4 h-4" />
            ახალი CV
          </button>
        </div>
      </div>

      {/* საბოლოო რეზიუმეს ვიზუალიზაცია (დასაბეჭდი სუფთა ფურცელი) */}
      <div className="w-full flex justify-center">
        <CvPreview data={data} isPrintMode={true} />
      </div>
    </div>
  );
};
