/**
 * @file StepPersonal.tsx
 * @description ფორმის პირველი ეტაპი (1/3): პირადი ინფორმაცია.
 * ველები: სახელი, გვარი, ფოტოს ატვირთვა, ჩემ შესახებ (არასავალდებულო),
 * ელ.ფოსტა (@redberry.ge) და მობილურის ნომერი (+995 ...).
 */

import React from 'react';
import { useFormikContext } from 'formik';
import type { CvFormData } from '../types/cv';
import { InputField, TextareaField, ImageUploadField } from './FormControls';

interface Props {
  onNext: () => void; // შემდეგ ეტაპზე (გამოცდილებაზე) გადასვლის ფუნქცია
}

export const StepPersonal: React.FC<Props> = ({ onNext }) => {
  // Formik-ის კონტექსტიდან ვიღებთ მნიშვნელობებს, შეცდომებსა და ჰენდლერებს
  const { values, errors, touched, handleChange, handleBlur, setFieldValue, validateForm, setFieldTouched } =
    useFormikContext<CvFormData>();

  const pValues = values.personal;
  const pErrors = errors.personal as Record<string, string> | undefined;
  const pTouched = touched.personal as Record<string, boolean> | undefined;

  // "შემდეგი" ღილაკზე დაჭერისას მოწმდება ვალიდაცია
  const handleNextClick = async () => {
    // მოვნიშნოთ ველები touched სტატუსით, რომ ცარიელ ველებზე შეცდომები გამოჩნდეს
    setFieldTouched('personal.name', true, true);
    setFieldTouched('personal.surname', true, true);
    setFieldTouched('personal.image', true, true);
    setFieldTouched('personal.email', true, true);
    setFieldTouched('personal.phone_number', true, true);

    const formErrors = await validateForm();
    // თუ პირადი ინფოს ველებში შეცდომა არაა, გადავიდეთ შემდეგ ეტაპზე
    if (!formErrors.personal) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* სახელი და გვარი (2 სვეტად) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField
          label="სახელი"
          name="personal.name"
          value={pValues.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="ანზორ"
          hint="მინიმუმ 2 ასო, ქართული ასოები"
          error={pErrors?.name}
          touched={pTouched?.name}
        />
        <InputField
          label="გვარი"
          name="personal.surname"
          value={pValues.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="მუმლაძე"
          hint="მინიმუმ 2 ასო, ქართული ასოები"
          error={pErrors?.surname}
          touched={pTouched?.surname}
        />
      </div>

      {/* პირადი ფოტოს ატვირთვა */}
      <ImageUploadField
        label="პირადი ფოტოს ატვირთვა"
        name="personal.image"
        value={pValues.image}
        onChange={(val) => {
          setFieldValue('personal.image', val);
          setFieldTouched('personal.image', true, true);
        }}
        error={pErrors?.image}
        touched={pTouched?.image}
      />

      {/* ჩემ შესახებ (არასავალდებულო ველი) */}
      <TextareaField
        label="ჩემ შესახებ (არასავალდებულო)"
        name="personal.about_me"
        value={pValues.about_me}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={4}
        placeholder="ზოგადი ინფო შენ შესახებ"
      />

      {/* ელ.ფოსტა (უნდა მთავრდებოდეს @redberry.ge-ით) */}
      <InputField
        label="ელ.ფოსტა"
        name="personal.email"
        type="email"
        value={pValues.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="anzor666@redberry.ge"
        hint="უნდა მთავრდებოდეს @redberry.ge-ით"
        error={pErrors?.email}
        touched={pTouched?.email}
      />

      {/* მობილურის ნომერი (+995 ქართული ფორმატი) */}
      <InputField
        label="მობილურის ნომერი"
        name="personal.phone_number"
        type="tel"
        value={pValues.phone_number}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="+995 597 63 45 16"
        hint="უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"
        error={pErrors?.phone_number}
        touched={pTouched?.phone_number}
      />

      {/* შემდეგ ეტაპზე გადასვლის ღილაკი */}
      <div className="flex justify-end pt-6">
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
