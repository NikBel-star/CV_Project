/**
 * @file cv.ts
 * @description რეზიუმეს ტიპები, საწყისი მონაცემები და დემო შაბლონი
 */

/** გამოცდილების ბლოკის ინტერფეისი */
export interface Experience {
  id: string;
  position: string;    // თანამდებობა
  employer: string;    // დამსაქმებელი
  start_date: string;  // დაწყების თარიღი
  due_date: string;    // დასრულების თარიღი
  description: string; // აღწერა
}

/** განათლების ბლოკის ინტერფეისი */
export interface Education {
  id: string;
  institute: string;   // სასწავლებელი
  degree: string;      // ხარისხი
  due_date: string;    // დამთავრების თარიღი
  description: string; // აღწერა
}

/** პირადი ინფორმაციის ბლოკი */
export interface PersonalInfo {
  name: string;         // სახელი
  surname: string;      // გვარი
  image: string;        // ფოტო (Base64 ან URL)
  about_me: string;     // ჩემ შესახებ (არასავალდებულო)
  email: string;        // ელ.ფოსტა (@redberry.ge)
  phone_number: string; // ტელეფონის ნომერი (+995 ...)
}

/** რეზიუმეს სრული მონაცემების მოდელი */
export interface CvFormData {
  personal: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
}

/** ხარისხის არჩევანის სია Redberry-ის ოფიციალური დიზაინის მიხედვით */
export const DEGREE_OPTIONS = [
  'საშუალო სკოლის დიპლომი',
  'ზოგადსაგანმანათლებლო დიპლომი',
  'ბაკალავრი',
  'მაგისტრი',
  'დოქტორი',
  'ასოცირებული ხარისხი',
  'სტუდენტი',
  'კოლეჯი',
  'სხვა',
];

/** სუფთა საწყისი მონაცემები (ნაგულისხმევი ახალი რეზიუმესთვის) */
export const INITIAL_FORM_DATA: CvFormData = {
  personal: {
    name: '',
    surname: '',
    image: '',
    about_me: '',
    email: '',
    phone_number: '',
  },
  experiences: [
    {
      id: 'exp-1',
      position: '',
      employer: '',
      start_date: '',
      due_date: '',
      description: '',
    },
  ],
  educations: [
    {
      id: 'edu-1',
      institute: '',
      degree: '',
      due_date: '',
      description: '',
    },
  ],
};

/** სადემონსტრაციო მონაცემები (ანზორ მუმლაძე - დემო პროცესისა და ტურისთვის) */
export const DEMO_FORM_DATA: CvFormData = {
  personal: {
    name: 'ანზორ',
    surname: 'მუმლაძე',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    about_me: 'მე ვარ გამოცდილი ვებ-დეველოპერი, მაქვს მრავალწლიანი გამოცდილება თანამედროვე ტექნოლოგიებში. ვმუშაობდი სხვადასხვა მასშტაბურ პროექტებზე Redberry-ში და წამყვან ტექნოლოგიურ კომპანიებში.',
    email: 'anzor666@redberry.ge',
    phone_number: '+995 597 63 45 16',
  },
  experiences: [
    {
      id: 'exp-1',
      position: 'Front-end Developer',
      employer: 'Redberry',
      start_date: '2021-09-01',
      due_date: '2023-01-15',
      description: 'ვმუშაობდი React, TypeScript და Tailwind CSS-ის გამოყენებით ინტერაქტიული ვებ-აპლიკაციების შემუშავებაზე, დიზაინ-სისტემების შექმნასა და კოდის ოპტიმიზაციაზე.',
    },
    {
      id: 'exp-2',
      position: 'UI/UX Engineer',
      employer: 'Digital Wave',
      start_date: '2019-03-01',
      due_date: '2021-08-30',
      description: 'ვქმნიდი მომხმარებლის ინტერფეისებს, ინტერაქტიულ პროტოტიპებსა და კომპონენტების ბიბლიოთეკებს გუნდთან მჭიდრო კოლაბორაციით.',
    },
  ],
  educations: [
    {
      id: 'edu-1',
      institute: 'თბილისის სახელმწიფო უნივერსიტეტი',
      degree: 'ბაკალავრი',
      due_date: '2020-07-01',
      description: 'კომპიუტერული მეცნიერებების ფაკულტეტი, პროგრამული უზრუნველყოფის ინჟინერია და ალგორითმები.',
    },
    {
      id: 'edu-2',
      institute: 'Redberry Bootcamp',
      degree: 'სხვა',
      due_date: '2021-02-15',
      description: 'ინტენსიური პრაქტიკული კურსი თანამედროვე Full-stack ვებ-დეველოპმენტში (React, TypeScript, UI).',
    },
  ],
};
