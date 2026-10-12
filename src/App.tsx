import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import type { CvFormData } from './types/cv';
import {
  INITIAL_FORM_DATA,
  DEMO_FORM_DATA,
} from './types/cv';
import {
  personalSchema,
  experienceSchema,
  educationSchema,
  fullCvSchema,
} from './validations/cvSchema';
import { HomePage } from './components/HomePage';
import { StepPersonal } from './components/StepPersonal';
import { StepExperience } from './components/StepExperience';
import { StepEducation } from './components/StepEducation';
import { CvPreview } from './components/CvPreview';
import { CompletedCvView } from './components/CompletedCvView';
import { GlobalNavbar } from './components/GlobalNavbar';
import { DemoModalOverlay } from './components/DemoModalOverlay';
import { ChevronLeft, Eye, X } from './components/Icons';

// localStorage გასაღებები
const STORAGE_KEY = 'redberry_cv_data';
const STEP_STORAGE_KEY = 'redberry_cv_step';

/**
 * დამხმარე კომპონენტი: Formik-ის მონაცემების ავტომატური სინქრონიზაცია
 * React State-თან და localStorage-თან ყოველი ცვლილებისას.
 */
const FormikSync: React.FC<{
  onUpdate: (data: CvFormData) => void;
}> = ({ onUpdate }) => {
  const { values } = useFormikContext<CvFormData>();

  useEffect(() => {
    onUpdate(values);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // localStorage-ის კვოტის შეზღუდვის უსაფრთხო დამუშავება
    }
  }, [values, onUpdate]);

  return null;
};

// CV Preview-ის ავტომატური Scaling — A4 ზომის ქაღალდი container-ის მიხედვით იკუმშება
const CV_PAPER_WIDTH = 820; // CvPreview-ის ფიქსირებული სიგანე (max-w-[820px])

const ScaledCvPreview: React.FC<{
  data: CvFormData;
  onPhotoClick?: () => void;
}> = ({ data, onPhotoClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newScale = Math.min(1, containerWidth / CV_PAPER_WIDTH);
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  return (
    <div ref={containerRef} className="w-full" style={{ height: `${Math.round(scale * 960)}px` }}>
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${CV_PAPER_WIDTH}px`,
        }}
      >
        <CvPreview data={data} onPhotoClick={onPhotoClick} />
      </div>
    </div>
  );
};

export default function App() {
  // აპლიკაციის ეკრანის მდგომარეობა: 'home' (მთავარი), 'form' (ფორმა), 'completed' (დასრულებული)

  const [view, setView] = useState<'home' | 'form' | 'completed'>('home');
  // მიმდინარე ეტაპი ფორმაში (1/3: პირადი, 2/3: გამოცდილება, 3/3: განათლება)
  const [currentStep, setCurrentStep] = useState<number>(1);
  // მომხმარებლის მიერ შეყვანილი რეალური ფორმის მონაცემები (ნაგულისხმევად სუფთა)
  const [formData, setFormData] = useState<CvFormData>(INITIAL_FORM_DATA);
  // აქვს თუ არა მომხმარებელს დაუსრულებელი მონახაზი
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  // მობილურ ეკრანზე CV-ის გადახედვის მოდალის მდგომარეობა
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState<boolean>(false);

  // დემო მოდალის გადაფარვის მდგომარეობა (არ ცვლის მომხმარებლის ფორმის მონაცემებს)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  const cvPhotoInputRef = useRef<HTMLInputElement>(null);

  // localStorage-დან შენახული მონახაზის წაკითხვა გვერდის ჩატვირთვისას
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.personal?.name || parsed?.personal?.surname || parsed?.experiences?.[0]?.position) {
          setFormData(parsed);
          setHasDraft(true);
        }
      }
      const savedStep = localStorage.getItem(STEP_STORAGE_KEY);
      if (savedStep) {
        const stepNum = parseInt(savedStep, 10);
        if (stepNum >= 1 && stepNum <= 3) {
          setCurrentStep(stepNum);
        }
      }
    } catch {
      // JSON პარსინგის შეცდომის უგულებელყოფა
    }
  }, []);

  // ეტაპის შეცვლა და localStorage-ში შენახვა
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem(STEP_STORAGE_KEY, step.toString());
  };

  // სუფთა რეზიუმეს შევსების დაწყება
  const handleStart = () => {
    setView('form');
  };

  // დემო საბოლოო CV-ის ნახვა (მხოლოდ მთავარი გვერდიდან)
  const handleLoadFinalDemo = () => {
    setFormData(DEMO_FORM_DATA);
    setView('completed');
  };

  // დემო პროცესის დროებითი მოდალის გახსნა (სესია არ წყდება!)
  const handleOpenDemoProcess = () => {
    setIsDemoModalOpen(true);
  };

  // მონახაზის სრული გასუფთავება
  const handleClearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_STORAGE_KEY);
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setHasDraft(false);
  };

  // ჰედერის უკან ღილაკი
  const handleBackFromHeader = () => {
    if (currentStep === 1) {
      setView('home');
    } else {
      handleStepChange(currentStep - 1);
    }
  };

  // საბოლოო დასრულება და გაგზავნა
  const handleFinalSubmit = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_STORAGE_KEY);
    setHasDraft(false);
    setView('completed');
  };

  // დასრულებული CV-დან რედაქტირებაზე დაბრუნება
  const handleEditCompleted = () => {
    setView('form');
    handleStepChange(3);
  };

  // ახალი CV-ის დაწყება
  const handleNewCv = () => {
    handleClearDraft();
    setView('form');
    handleStepChange(1);
  };

  // ვალიდაციის სქემის შერჩევა მიმდინარე ეტაპის მიხედვით
  const getValidationSchema = () => {
    if (currentStep === 1) return personalSchema;
    if (currentStep === 2) return experienceSchema;
    if (currentStep === 3) return educationSchema;
    return fullCvSchema;
  };

  // ეტაპების ქართული სათაურები
  const stepTitles: Record<number, string> = {
    1: 'პირადი ინფო',
    2: 'გამოცდილება',
    3: 'განათლება',
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col relative">
      {/* მუდმივი გლობალური ჰედერი (მუდამ ჩანს ყველა ეკრანზე) */}
      <GlobalNavbar
        view={view}
        currentStep={currentStep}
        hasDraft={hasDraft}
        onGoHome={() => setView('home')}
        onOpenDemoProcess={handleOpenDemoProcess}
        onLoadFinalDemo={handleLoadFinalDemo}
        onClearDraft={handleClearDraft}
        stepTitles={stepTitles}
      />

      {/* დემო პროცესის დროებითი მოდალი (გადაეფარება ეკრანს მომხმარებლის სესიის შეუცვლელად) */}
      <DemoModalOverlay
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      {/* მთავარი საწყისი გვერდი */}
      {view === 'home' && (
        <HomePage onStart={handleStart} hasDraft={hasDraft} />
      )}

      {/* დასრულებული რეზიუმეს გვერდი */}
      {view === 'completed' && (
        <CompletedCvView
          data={formData}
          onEdit={handleEditCompleted}
          onNew={handleNewCv}
          onGoHome={() => setView('home')}
        />
      )}

      {/* რეალური ფორმის შევსების ორსვეტიანი ინტერფეისი */}
      {view === 'form' && (
        <Formik<CvFormData>
          initialValues={formData}
          validationSchema={getValidationSchema()}
          onSubmit={handleFinalSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex-1 flex flex-col lg:flex-row min-h-screen">
              {/* მონაცემების ავტო-სინქრონიზაცია */}
              <FormikSync onUpdate={setFormData} />

              {/* დამალული ფაილის ინპუტი რეზიუმეში ფოტოზე პირდაპირ დაჭერისას */}
              <input
                ref={cvPhotoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target?.result as string;
                    img.onload = () => {
                      const canvas = document.createElement('canvas');
                      const MAX_SIZE = 400;
                      let width = img.width;
                      let height = img.height;
                      if (width > height && width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                      } else if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                      }
                      canvas.width = width;
                      canvas.height = height;
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        ctx.drawImage(img, 0, 0, width, height);
                        const compressed = canvas.toDataURL('image/jpeg', 0.85);
                        setFieldValue('personal.image', compressed);
                      } else {
                        setFieldValue('personal.image', event.target?.result as string);
                      }
                    };
                  };
                  reader.readAsDataURL(file);
                }}
              />

              {/* მარცხენა სვეტი: ფორმა (58% დესკტოპზე) */}
              <div className="w-full lg:w-[58%] xl:w-[55%] bg-white p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between border-r border-gray-100">
                <div className="flex flex-col">
                  {/* ზედა ნავიგაცია: უკან ისარი + სათაური და 1/3 მაჩვენებელი */}
                  <div className="flex items-center gap-6 mb-8">
                    <button
                      type="button"
                      onClick={handleBackFromHeader}
                      className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer flex-shrink-0"
                      title="უკან"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                          {stepTitles[currentStep]}
                        </h2>
                        <span className="text-lg font-medium text-gray-500">
                          {currentStep}/3
                        </span>
                      </div>
                      <hr className="mt-3 border-t border-[#1A1A1A]" />
                    </div>
                  </div>

                  {/* ფორმის მიმდინარე ეტაპის კომპონენტი */}
                  <div className="mt-2">
                    {currentStep === 1 && (
                      <StepPersonal onNext={() => handleStepChange(2)} />
                    )}

                    {currentStep === 2 && (
                      <StepExperience
                        onBack={() => handleStepChange(1)}
                        onNext={() => handleStepChange(3)}
                      />
                    )}

                    {currentStep === 3 && (
                      <StepEducation
                        onBack={() => handleStepChange(2)}
                        onSubmit={handleFinalSubmit}
                        isSubmitting={isSubmitting}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* მარჯვენა სვეტი: Live CV Preview (42% დესკტოპზე) */}
              <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] bg-[#F9F9F9] p-6 xl:p-10 items-start justify-center overflow-y-auto">
                <div className="w-full sticky top-6">
                  <ScaledCvPreview
                    data={formData}
                    onPhotoClick={() => cvPhotoInputRef.current?.click()}
                  />
                </div>
              </div>

              {/* მობილური/ტაბლეტი: მცურავი ღილაკი CV-ის გადასახედად */}
              <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <button
                  type="button"
                  onClick={() => setIsMobilePreviewOpen(true)}
                  className="h-12 px-5 rounded-full bg-[#1A1A1A] text-white shadow-xl flex items-center gap-2 text-sm font-semibold hover:bg-black active:scale-95 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>CV გადახედვა</span>
                </button>
              </div>

              {/* მობილური CV გადახედვის მოდალი */}
              {isMobilePreviewOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end p-2 sm:p-4">
                  <div className="bg-[#F9F9F9] rounded-2xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative flex flex-col items-center">
                    <div className="w-full flex items-center justify-between pb-4 border-b border-gray-200 mb-4 sticky top-0 bg-[#F9F9F9] z-10">
                      <span className="font-bold text-gray-800 text-lg">
                        რეზიუმეს გადახედვა
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsMobilePreviewOpen(false)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <ScaledCvPreview
                      data={formData}
                      onPhotoClick={() => {
                        setIsMobilePreviewOpen(false);
                        cvPhotoInputRef.current?.click();
                      }}
                    />
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
