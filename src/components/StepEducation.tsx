/**
 * @file StepEducation.tsx
 * @description ფორმის მესამე ეტაპი (3/3): განათლება.
 * მომხმარებელს შეუძლია დაამატოს სასწავლებელი, აირჩიოს ხარისხი (ბაკალავრი, მაგისტრი...),
 * დამთავრების თარიღი და განათლების აღწერა.
 */

import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import type { CvFormData, Education } from '../types/cv';
import { DEGREE_OPTIONS } from '../types/cv';
import { InputField, TextareaField, SelectField } from './FormControls';
import { Trash2, Plus } from './Icons';

interface Props {
  onBack: () => void;           // წინა ეტაპზე (გამოცდილებაზე) დაბრუნება
  onSubmit: () => void;         // ფორმის საბოლოო გაგზავნა / დასრულება
  isSubmitting?: boolean;       // გაგზავნის პროცესის სტატუსი
}

export const StepEducation: React.FC<Props> = ({ onBack, onSubmit, isSubmitting = false }) => {
  const { values, errors, touched, handleChange, handleBlur, validateForm, setFieldTouched } =
    useFormikContext<CvFormData>();

  const eduErrors = errors.educations as any;
  const eduTouched = touched.educations as any;

  // "დასრულება" ღილაკზე დაჭერისას მოწმდება განათლების ველების ვალიდაცია
  const handleSubmitClick = async () => {
    values.educations.forEach((_, index) => {
      setFieldTouched(`educations.${index}.institute`, true, true);
      setFieldTouched(`educations.${index}.degree`, true, true);
      setFieldTouched(`educations.${index}.due_date`, true, true);
      setFieldTouched(`educations.${index}.description`, true, true);
    });

    const formErrors = await validateForm();
    if (!formErrors.educations) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* FieldArray დინამიური განათლების ბლოკებისთვის */}
      <FieldArray name="educations">
        {({ push, remove }) => (
          <div className="flex flex-col gap-8">
            {values.educations.map((edu, index) => {
              const itemErrors = eduErrors?.[index] || {};
              const itemTouched = eduTouched?.[index] || {};

              return (
                <div
                  key={edu.id || index}
                  className="flex flex-col gap-6 p-6 rounded-lg border border-gray-100 bg-[#FAFAFA]/50 relative"
                >
                  {/* ბლოკის სათაური და წაშლა */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      განათლება #{index + 1}
                    </span>
                    {values.educations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded cursor-pointer flex items-center gap-1 text-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                        წაშლა
                      </button>
                    )}
                  </div>

                  {/* სასწავლებელი */}
                  <InputField
                    label="სასწავლებელი"
                    name={`educations.${index}.institute`}
                    value={edu.institute}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="უნივერსიტეტი, კოლეჯი, სკოლა..."
                    hint="მინიმუმ 2 სიმბოლო"
                    error={itemErrors.institute}
                    touched={itemTouched.institute}
                  />

                  {/* ხარისხი და დამთავრების თარიღი */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <SelectField
                      label="ხარისხი"
                      name={`educations.${index}.degree`}
                      value={edu.degree}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={DEGREE_OPTIONS}
                      placeholder="აირჩიეთ ხარისხი"
                      hint="აირჩიეთ ხარისხი"
                      error={itemErrors.degree}
                      touched={itemTouched.degree}
                    />

                    <InputField
                      label="დამთავრების რიცხვი"
                      name={`educations.${index}.due_date`}
                      type="date"
                      value={edu.due_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={itemErrors.due_date}
                      touched={itemTouched.due_date}
                    />
                  </div>

                  {/* განათლების აღწერა */}
                  <TextareaField
                    label="აღწერა"
                    name={`educations.${index}.description`}
                    value={edu.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    placeholder="განათლების აღწერა"
                    hint="მინიმუმ 2 სიმბოლო"
                    error={itemErrors.description}
                    touched={itemTouched.description}
                  />
                </div>
              );
            })}

            {/* "მეტი განათლების დამატება" ღილაკი */}
            <div>
              <button
                type="button"
                onClick={() =>
                  push({
                    id: `edu-${Date.now()}`,
                    institute: '',
                    degree: '',
                    due_date: '',
                    description: '',
                  } as Education)
                }
                className="h-[44px] px-6 rounded-[4px] bg-[#62A1EB] hover:bg-[#518fdb] text-white text-[14px] font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm active:scale-98"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                მეტი განათლების დამატება
              </button>
            </div>
          </div>
        )}
      </FieldArray>

      {/* ნავიგაციის ღილაკები: უკან და დასრულება */}
      <div className="flex items-center justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="h-[48px] px-8 rounded-[4px] bg-[#6B40E3] hover:bg-[#5b32d1] text-white text-[16px] font-semibold tracking-wide transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
        >
          უკან
        </button>

        <button
          type="button"
          onClick={handleSubmitClick}
          disabled={isSubmitting}
          className="h-[48px] px-9 rounded-[4px] bg-[#6B40E3] hover:bg-[#5b32d1] text-white text-[16px] font-semibold tracking-wide transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg active:scale-98 disabled:opacity-50"
        >
          {isSubmitting ? 'იგზავნება...' : 'დასრულება'}
        </button>
      </div>
    </div>
  );
};
