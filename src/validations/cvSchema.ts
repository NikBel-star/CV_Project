/**
 * @file cvSchema.ts
 * @description Yup ვალიდაციის სქემები Redberry-ის მოთხოვნების მიხედვით:
 * - სახელი და გვარი: მინიმუმ 2 ასო, ქართული ან ლათინური სიმბოლოები
 * - ფოტო: სავალდებულო
 * - ელ.ფოსტა: სავალდებულო, უნდა მთავრდებოდეს @redberry.ge-ით
 * - მობილური: ქართული მობილურის ნომრის ფორმატი (+995 ...)
 * - გამოცდილება და განათლება: სავალდებულო ველები მინიმუმ 2 სიმბოლოთი
 */

import * as Yup from 'yup';

// ქართული და ლათინური ასოების რეგულარული გამოსახულება
const nameRegex = /^[ა-ჰa-zA-Z]+$/;

// Redberry-ის ოფიციალური ელ.ფოსტის ფორმატი
const redberryEmailRegex = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/i;

// ქართული მობილურის ნომრის ფორმატი (+995 597 12 34 56 ან +995597123456)
const georgianPhoneRegex = /^\+995\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}\s?[0-9]{2}$|^\+995[0-9]{9}$/;

/** პირველი ეტაპის ვალიდაცია: პირადი ინფორმაცია */
export const personalSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('სავალდებულო ველი')
    .min(2, 'მინიმუმ 2 ასო')
    .matches(nameRegex, 'მხოლოდ ქართული ან ლათინური ასოები'),
  surname: Yup.string()
    .trim()
    .required('სავალდებულო ველი')
    .min(2, 'მინიმუმ 2 ასო')
    .matches(nameRegex, 'მხოლოდ ქართული ან ლათინური ასოები'),
  image: Yup.string()
    .required('ფოტოს ატვირთვა სავალდებულოა'),
  about_me: Yup.string().optional(),
  email: Yup.string()
    .trim()
    .required('სავალდებულო ველი')
    .email('არასწორი ელ.ფოსტის ფორმატი')
    .matches(redberryEmailRegex, 'უნდა მთავრდებოდეს @redberry.ge-ით'),
  phone_number: Yup.string()
    .trim()
    .required('სავალდებულო ველი')
    .matches(georgianPhoneRegex, 'უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს (+995 ...)'),
});

/** ერთი გამოცდილების ბლოკის ვალიდაცია */
export const experienceItemSchema = Yup.object().shape({
  position: Yup.string()
    .trim()
    .required('სავალდებულო ველი')
    .min(2, 'მინიმუმ 2 სიმბოლო'),
  employer: Yup.string()
    .trim()
    .required('სავალდებულო ველი')
    .min(2, 'მინიმუმ 2 სიმბოლო'),
  start_date: Yup.string()
    .required('სავალდებულო ველი'),
  due_date: Yup.string()
    .required('სავალდებულო ველი'),
  description: Yup.string()
    .trim()
    .required('სავალდებულო ველი')
    .min(2, 'მინიმუმ 2 სიმბოლო'),
});

/** მეორე ეტაპის ვალიდაცია: გამოცდილების მასივი */
export const experienceSchema = Yup.object().shape({
  experiences: Yup.array()
    .of(experienceItemSchema)
    .min(1, 'მინიმუმ 1 გამოცდილება'),
});

/** ერთი განათლების ბლოკის ვალიდაცია */
export const educationItemSchema = Yup.object().shape({
  institute: Yup.string()
    .trim()
    .required('სავალდებულო ველი')
    .min(2, 'მინიმუმ 2 სიმბოლო'),
  degree: Yup.string()
    .trim()
    .required('აირჩიეთ ხარისხი'),
  due_date: Yup.string()
    .required('სავალდებულო ველი'),
  description: Yup.string()
    .trim()
    .required('სავალდებულო ველი')
    .min(2, 'მინიმუმ 2 სიმბოლო'),
});

/** მესამე ეტაპის ვალიდაცია: განათლების მასივი */
export const educationSchema = Yup.object().shape({
  educations: Yup.array()
    .of(educationItemSchema)
    .min(1, 'მინიმუმ 1 განათლება'),
});

/** სრული რეზიუმეს ვალიდაცია */
export const fullCvSchema = Yup.object().shape({
  personal: personalSchema,
  experiences: Yup.array().of(experienceItemSchema).min(1),
  educations: Yup.array().of(educationItemSchema).min(1),
});
