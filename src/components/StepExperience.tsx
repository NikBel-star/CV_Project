/**
 * @file StepExperience.tsx
 * @description ფორმის მეორე ეტაპი (2/3): სამუშაო გამოცდილება.
 * საშუალებას აძლევს მომხმარებელს დაამატოს ერთი ან რამდენიმე გამოცდილება
 * (თანამდებობა, დამსაქმებელი, დაწყების/დამთავრების თარიღები, აღწერა).
 */

import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import type { CvFormData, Experience } from '../types/cv';
import { InputField, TextareaField } from './FormControls';
import { Trash2, Plus } from './Icons';

interface Props {
  onBack: () => void; // პირველ ეტაპზე დაბრუნების ფუნქცია
  onNext: () => void; // მესამე ეტაპზე (განათლებაზე) გადასვლის ფუნქცია
}

export const StepExperience: React.FC<Props> = ({ onBack, onNext }) => {
  const { values, errors, touched, handleChange, handleBlur, validateForm, setFieldTouched } =
    useFormikContext<CvFormData>();

  const expErrors = errors.experiences as any;
  const expTouched = touched.experiences as any;

  // "შემდეგი" ღილაკზე დაჭერისას მოწმდება ყველა გამოცდილების ბლოკის ვალიდაცია
  const handleNextClick = async () => {
    values.experiences.forEach((_, index) => {
      setFieldTouched(`experiences.${index}.position`, true, true);
      setFieldTouched(`experiences.${index}.employer`, true, true);
      setFieldTouched(`experiences.${index}.start_date`, true, true);
      setFieldTouched(`experiences.${index}.due_date`, true, true);
      setFieldTouched(`experiences.${index}.description`, true, true);
    });

    const formErrors = await validateForm();
    if (!formErrors.experiences) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* FieldArray დინამიური გამოცდილების ბლოკებისთვის */}
      <FieldArray name="experiences">
        {({ push, remove }) => (
          <div className="flex flex-col gap-8">
            {values.experiences.map((exp, index) => {
              const itemErrors = expErrors?.[index] || {};
              const itemTouched = expTouched?.[index] || {};

              return (
                <div
                  key={exp.id || index}
                  className="flex flex-col gap-6 p-6 rounded-lg border border-gray-100 bg-[#FAFAFA]/50 relative"
                >
                  {/* ბლოკის სათაური და წაშლის ღილაკი */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      გამოცდილება #{index + 1}
                    </span>
                    {values.experiences.length > 1 && (
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

                  {/* თანამდებობა */}
                  <InputField
                    label="თანამდებობა"
                    name={`experiences.${index}.position`}
                    value={exp.position}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="დეველოპერი, დიზაინერი..."
                    hint="მინიმუმ 2 სიმბოლო"
                    error={itemErrors.position}
                    touched={itemTouched.position}
                  />

                  {/* დამსაქმებელი კომპანია */}
                  <InputField
                    label="დამსაქმებელი"
                    name={`experiences.${index}.employer`}
                    value={exp.employer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="დამსაქმებელი კომპანია"
                    hint="მინიმუმ 2 სიმბოლო"
                    error={itemErrors.employer}
                    touched={itemTouched.employer}
                  />

                  {/* დაწყებისა და დამთავრების თარიღები */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField
                      label="დაწყების რიცხვი"
                      name={`experiences.${index}.start_date`}
                      type="date"
                      value={exp.start_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={itemErrors.start_date}
                      touched={itemTouched.start_date}
                    />

                    <InputField
                      label="დამთავრების რიცხვი"
                      name={`experiences.${index}.due_date`}
                      type="date"
                      value={exp.due_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={itemErrors.due_date}
                      touched={itemTouched.due_date}
                    />
                  </div>

                  {/* სამუშაო მოვალეობების აღწერა */}
                  <TextareaField
                    label="აღწერა"
                    name={`experiences.${index}.description`}
                    value={exp.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    hint="მინიმუმ 2 სიმბოლო"
                    error={itemErrors.description}
                    touched={itemTouched.description}
                  />
                </div>
              );
            })}

            {/* "მეტი გამოცდილების დამატება" ღილაკი */}
            <div>
              <button
                type="button"
                onClick={() =>
                  push({
                    id: `exp-${Date.now()}`,
                    position: '',
                    employer: '',
                    start_date: '',
                    due_date: '',
                    description: '',
                  } as Experience)
                }
                className="h-[44px] px-6 rounded-[4px] bg-[#62A1EB] hover:bg-[#518fdb] text-white text-[14px] font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm active:scale-98"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                მეტი გამოცდილების დამატება
              </button>
            </div>
          </div>
        )}
      </FieldArray>

      {/* ნავიგაციის ღილაკები: უკან და შემდეგი */}
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
          onClick={handleNextClick}
          className="h-[48px] px-9 rounded-[4px] bg-[#6B40E3] hover:bg-[#5b32d1] text-white text-[16px] font-semibold tracking-wide transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
        >
          შემდეგი
        </button>
      </div>
    </div>
  );
};
