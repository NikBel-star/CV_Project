/**
 * @file DemoModalOverlay.tsx
 * @description დემო პროცესის დროებითი გადაფარვის (Modal Overlay) კომპონენტი.
 * აჩვენებს ანზორ მუმლაძის რეალურ შევსებულ CV-ს ნაბიჯ-ნაბიჯ (1/3 -> 2/3 -> 3/3 -> საბოლოო CV).
 * არ ეხება და არ ცვლის მომხმარებლის რეალურ მონაცემებს — დახურვისას მომხმარებელი
 * ბრუნდება ზუსტად თავის ფორმაში.
 */

import React, { useState, useEffect } from 'react';
import type { CvFormData } from '../types/cv';
import { DEMO_FORM_DATA } from '../types/cv';
import { CvPreview } from './CvPreview';
import { StepPersonal } from './StepPersonal';
import { StepExperience } from './StepExperience';
import { StepEducation } from './StepEducation';
import { Formik, Form } from 'formik';
import {
  personalSchema,
  experienceSchema,
  educationSchema,
  fullCvSchema,
} from '../validations/cvSchema';
import {
  X,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  ArrowRight,
  CheckCircle,
} from './Icons';

interface Props {
  isOpen: boolean;    // გახსნილია თუ არა დემო მოდალი
  onClose: () => void; // დემოს დახურვის და მომხმარებლის ფორმაზე დაბრუნების ფუნქცია
}

export const DemoModalOverlay: React.FC<Props> = ({ isOpen, onClose }) => {
  const [demoStep, setDemoStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [demoView, setDemoView] = useState<'form' | 'completed'>('form');

  // მოდალის გახსნისას ყოველთვის იწყება პირველი ეტაპიდან
  useEffect(() => {
    if (isOpen) {
      setDemoStep(1);
      setDemoView('form');
      setIsPlaying(true);
    }
  }, [isOpen]);

  // ავტო-თამაშის ტაიმერი: ყოველ 3.6 წამში გადადის შემდეგ ეტაპზე
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setTimeout(() => {
      if (demoView === 'form') {
        if (demoStep === 1) {
          setDemoStep(2);
        } else if (demoStep === 2) {
          setDemoStep(3);
        } else if (demoStep === 3) {
          setDemoView('completed');
          setIsPlaying(false);
        }
      }
    }, 3600);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, demoStep, demoView]);

  if (!isOpen) return null;

  const stepTitles: Record<number, string> = {
    1: 'პირადი ინფო',
    2: 'გამოცდილება',
    3: 'განათლება',
  };

  const getValidationSchema = () => {
    if (demoStep === 1) return personalSchema;
    if (demoStep === 2) return experienceSchema;
    if (demoStep === 3) return educationSchema;
    return fullCvSchema;
  };

  const handleNextStage = () => {
    if (demoStep < 3) {
      setDemoStep((prev) => prev + 1);
    } else {
      setDemoView('completed');
      setIsPlaying(false);
    }
  };

  const handleRestartDemo = () => {
    setDemoStep(1);
    setDemoView('form');
    setIsPlaying(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="დემო ტური"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in duration-200"
    >
      {/* ზედა დემო ზოლი */}
      <div className="w-full bg-[#1A1A1A] text-white px-4 sm:px-8 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-lg z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-sm font-bold text-white tracking-wide">
            დემო ტური
          </span>
        </div>

        {/* დემოს მართვის ღილაკები */}
        <div className="flex items-center gap-2 sm:gap-3">
          {demoView === 'form' ? (
            <>
              {/* პაუზა / დაკვრა */}
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="h-8 px-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>პაუზა</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>დაკვრა</span>
                  </>
                )}
              </button>

              {/* შემდეგი ეტაპი */}
              <button
                type="button"
                onClick={handleNextStage}
                className="h-8 px-3 rounded-full bg-[#6B40E3] hover:bg-[#5b32d1] text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>შემდეგი ეტაპი</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleRestartDemo}
              className="h-8 px-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>თავიდან ნახვა</span>
            </button>
          )}

          {/* დემოს დახურვის ღილაკი - მომენტალურად აბრუნებს მომხმარებელს თავის რეალურ სესიაზე */}
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-4 rounded-full bg-white text-[#1A1A1A] hover:bg-gray-100 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ml-2 active:scale-95"
            title="დემოს დახურვა და თქვენს რეზიუმეზე დაბრუნება"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>ჩემს რეზიუმეზე დაბრუნება</span>
          </button>
        </div>
      </div>

      {/* დემო შინაარსის არე */}
      <div className="flex-1 w-full overflow-y-auto bg-[#F9F9F9] flex flex-col items-center">
        {demoView === 'completed' ? (
          <div className="w-full py-8 flex flex-col items-center">
            <div className="w-full max-w-[820px] mb-4 flex items-center justify-between px-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                ასე გამოიყურება დასრულებული რეზიუმე
              </span>

              <button
                type="button"
                onClick={onClose}
                className="text-xs font-bold text-[#6B40E3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>დავუბრუნდე ჩემს რეზიუმეს</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <CvPreview data={DEMO_FORM_DATA} isPrintMode={false} />
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto">
            {/* დემო ფორმის მხარე */}
            <div className="w-full lg:w-[58%] xl:w-[55%] bg-white p-6 sm:p-10 lg:p-12 border-r border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-extrabold text-[#1A1A1A]">
                    {stepTitles[demoStep]}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6B40E3] font-semibold border border-purple-100">
                    დემო რეჟიმი
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-400">
                  {demoStep}/3
                </span>
              </div>

              <Formik<CvFormData>
                initialValues={DEMO_FORM_DATA}
                validationSchema={getValidationSchema()}
                onSubmit={() => {}}
                enableReinitialize={true}
              >
                {() => (
                  <Form className="flex flex-col">
                    {demoStep === 1 && <StepPersonal onNext={() => setDemoStep(2)} />}
                    {demoStep === 2 && (
                      <StepExperience
                        onBack={() => setDemoStep(1)}
                        onNext={() => setDemoStep(3)}
                      />
                    )}
                    {demoStep === 3 && (
                      <StepEducation
                        onBack={() => setDemoStep(2)}
                        onSubmit={() => {
                          setDemoView('completed');
                          setIsPlaying(false);
                        }}
                      />
                    )}
                  </Form>
                )}
              </Formik>
            </div>

            {/* დემო Live CV Preview მხარე */}
            <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] bg-[#F9F9F9] p-8 lg:p-12 items-start justify-center overflow-y-auto">
              <div className="w-full sticky top-4 flex justify-center">
                <CvPreview data={DEMO_FORM_DATA} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ქვედა დამხმარე ზოლი */}
      <div className="w-full bg-white border-t border-gray-200 py-2.5 px-4 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
        <span>თქვენი რეალური მონაცემები უცვლელად შენახულია.</span>
        <button
          type="button"
          onClick={onClose}
          className="text-[#6B40E3] font-bold hover:underline cursor-pointer"
        >
          დახურვა და ჩემს ფორმაზე დაბრუნება ✕
        </button>
      </div>
    </div>
  );
};
