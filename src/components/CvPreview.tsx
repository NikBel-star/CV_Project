/**
 * @file CvPreview.tsx
 * @description რეზიუმეს (CV) ვიზუალიზაციის კომპონენტი.
 * აჩვენებს Redberry-ის ორიგინალი დიზაინის მიხედვით დაფორმატებულ რეზიუმეს
 * რეალურ დროში (Live Preview), ფოტოს, კონტაქტებს, გამოცდილებასა და განათლებას.
 */

import React from 'react';
import type { CvFormData } from '../types/cv';
import { Mail, Phone, Camera } from './Icons';
import { RedberryBadge } from './RedberryLogo';

interface Props {
  data: CvFormData;               // რეზიუმეს მონაცემები
  className?: string;             // დამატებითი CSS კლასები
  isPrintMode?: boolean;          // არის თუ არა ბეჭდვის რეჟიმი
  onPhotoClick?: () => void;      // ფოტოზე დაჭერის ჰენდლერი (ფოტოს ასატვირთად)
}

export const CvPreview: React.FC<Props> = ({
  data,
  className = '',
  isPrintMode = false,
  onPhotoClick,
}) => {
  const { personal, experiences, educations } = data;

  // ამოწმებს, არის თუ არა შევსებული ძირითადი ველები
  const hasName = Boolean(personal.name || personal.surname);
  const hasAbout = Boolean(personal.about_me && personal.about_me.trim());

  // ფილტრავს მხოლოდ იმ სამუშაო გამოცდილებას, სადაც მინიმუმ 1 ველი შევსებულია
  const validExperiences = experiences.filter(
    (exp) => exp.position || exp.employer || exp.description || exp.start_date || exp.due_date
  );

  // ფილტრავს მხოლოდ იმ განათლების ჩანაწერებს, სადაც მინიმუმ 1 ველი შევსებულია
  const validEducations = educations.filter(
    (edu) => edu.institute || edu.degree || edu.description || edu.due_date
  );

  return (
    <div
      id="cv-paper"
      className={`bg-white w-full max-w-[820px] min-h-[960px] p-10 md:p-14 flex flex-col justify-between border border-gray-100 shadow-[0_4px_35px_rgba(0,0,0,0.06)] relative print-only-container ${className}`}
    >
      {/* რეზიუმეს ზედა ძირითადი შინაარსი */}
      <div className="flex flex-col gap-6 w-full">
        {/* პირადი ინფორმაციის ბლოკი: სახელი, კონტაქტი, აღწერა და ფოტო */}
        <div className="flex items-start justify-between gap-6 pb-4">
          <div className="flex-1 space-y-3">
            {/* სახელი და გვარი (წითელი წამყვანი ფერით #F93B1D) */}
            {hasName ? (
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#F93B1D] tracking-wide break-words">
                {personal.name} {personal.surname}
              </h1>
            ) : (
              <div className="text-2xl font-bold text-gray-300 italic">
                სახელი გვარი
              </div>
            )}

            {/* საკონტაქტო ინფორმაცია: ელ.ფოსტა და მობილური */}
            <div className="flex flex-col gap-1.5 pt-1 text-[14px] text-[#1A1A1A]">
              {personal.email ? (
                <div className="flex items-center gap-2.5">
                  <span className="text-[#898989] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span className="font-normal text-gray-800 break-all">
                    {personal.email}
                  </span>
                </div>
              ) : null}

              {personal.phone_number ? (
                <div className="flex items-center gap-2.5">
                  <span className="text-[#898989] flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="font-normal text-gray-800">
                    {personal.phone_number}
                  </span>
                </div>
              ) : null}
            </div>

            {/* "ჩემ შესახებ" სექცია */}
            {hasAbout && (
              <div className="pt-3">
                <h2 className="text-[17px] font-bold text-[#F93B1D] uppercase tracking-wider mb-2">
                  ჩემ შესახებ
                </h2>
                <p className="text-[14px] leading-relaxed text-[#000000] break-words whitespace-pre-wrap">
                  {personal.about_me}
                </p>
                <hr className="mt-5 border-t border-[#E0E0E0]" />
              </div>
            )}
          </div>

          {/* პირადი ფოტო (ინტერაქტიული: დაჭერით იხსნება ატვირთვა) */}
          <div
            onClick={onPhotoClick}
            title={onPhotoClick ? 'დააჭირეთ ფოტოს ასატვირთად ან შესაცვლელად' : undefined}
            className={`flex-shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm bg-gray-50 relative group ${
              onPhotoClick ? 'cursor-pointer hover:ring-2 hover:ring-[#6B40E3] transition-all' : ''
            }`}
          >
            {personal.image ? (
              <>
                <img
                  src={personal.image}
                  alt="Profile photo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // სარეზერვო ფოტო შეცდომის შემთხვევაში
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                {onPhotoClick && (
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white no-print">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-[11px] font-medium tracking-wide">შეცვლა</span>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-full flex flex-col items-center justify-center text-gray-400 group-hover:border-[#6B40E3] group-hover:text-[#6B40E3] transition-colors p-2 text-center">
                <Camera className="w-6 h-6 mb-1 text-gray-400 group-hover:text-[#6B40E3]" />
                <span className="text-xs font-medium">დააჭირეთ ფოტოსთვის</span>
              </div>
            )}
          </div>
        </div>

        {/* სამუშაო გამოცდილების სექცია */}
        {validExperiences.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[17px] font-bold text-[#F93B1D] uppercase tracking-wider">
              გამოცდილება
            </h2>

            <div className="flex flex-col gap-5">
              {validExperiences.map((exp, idx) => (
                <div key={exp.id || idx} className="flex flex-col">
                  {/* თანამდებობა და კომპანია */}
                  <div className="text-[15px] font-bold text-[#1A1A1A]">
                    {exp.position || 'თანამდებობა'}
                    {exp.employer ? `, ${exp.employer}` : ''}
                  </div>

                  {/* დაწყების და დასრულების თარიღები */}
                  {(exp.start_date || exp.due_date) && (
                    <div className="text-[13px] text-[#909090] italic mt-0.5">
                      {exp.start_date || '...'} – {exp.due_date || '...'}
                    </div>
                  )}

                  {/* მოვალეობების აღწერა */}
                  {exp.description && (
                    <p className="text-[14px] text-[#000000] leading-relaxed mt-1.5 break-words whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  )}

                  {idx < validExperiences.length - 1 && (
                    <hr className="mt-4 border-t border-gray-100" />
                  )}
                </div>
              ))}
            </div>

            <hr className="mt-2 border-t border-[#E0E0E0]" />
          </div>
        )}

        {/* განათლების სექცია */}
        {validEducations.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[17px] font-bold text-[#F93B1D] uppercase tracking-wider">
              განათლება
            </h2>

            <div className="flex flex-col gap-5">
              {validEducations.map((edu, idx) => (
                <div key={edu.id || idx} className="flex flex-col">
                  {/* სასწავლებელი და მიღებული ხარისხი */}
                  <div className="text-[15px] font-bold text-[#1A1A1A]">
                    {edu.institute || 'სასწავლებელი'}
                    {edu.degree ? `, ${edu.degree}` : ''}
                  </div>

                  {/* დამთავრების თარიღი */}
                  {edu.due_date && (
                    <div className="text-[13px] text-[#909090] mt-0.5">
                      {edu.due_date}
                    </div>
                  )}

                  {/* განათლების აღწერა */}
                  {edu.description && (
                    <p className="text-[14px] text-[#000000] leading-relaxed mt-1.5 break-words whitespace-pre-wrap">
                      {edu.description}
                    </p>
                  )}

                  {idx < validEducations.length - 1 && (
                    <hr className="mt-4 border-t border-gray-100" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ქვედა Redberry-ის ვარსკვლავის ემბლემა */}
      <div className="pt-10 flex items-center justify-between">
        <RedberryBadge size={44} />
        {isPrintMode && (
          <span className="text-xs text-gray-400 font-sans">
            Redberry CV Generator
          </span>
        )}
      </div>
    </div>
  );
};
