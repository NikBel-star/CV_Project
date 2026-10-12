/**
 * @file FormControls.tsx
 * @description ფორმის ინტერაქტიული ველების კომპონენტები (Input, Textarea, Select, ImageUpload).
 * მოიცავს Figma-ს ზუსტ ვიზუალურ ვალიდაციას (მწვანე ჩარჩო და ✓, წითელი ჩარჩო და !),
 * ფოტოს ოპტიმიზაციას Canvas-ით, Drag & Drop-სა და პირდაპირი ბმულის (URL) ჩაწერას.
 */

import React, { useRef, useState } from 'react';
import { Check, AlertCircle, Upload, X, Camera } from './Icons';

// ==========================================
// 1. ტექსტური შეყვანის ველი (InputField)
// ==========================================
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;          // ველის დასახელება
  name: string;           // ველის სახელი (Formik-ისთვის)
  hint?: string;          // დამხმარე მინიშნება ქვემოთ
  error?: string;         // შეცდომის ტექსტი ვალიდაციიდან
  touched?: boolean;      // შეეხო თუ არა მომხმარებელი ველს
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  hint,
  error,
  touched,
  className = '',
  value,
  ...props
}) => {
  // ვალიდაციის სტატუსის განსაზღვრა
  const isInvalid = touched && Boolean(error);
  const isValid = touched && !error && Boolean(value);

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {/* ველის ლეიბლი */}
      <label
        htmlFor={name}
        className={`text-[15px] font-semibold transition-colors ${isInvalid ? 'text-[#EF5050]' : 'text-[#1A1A1A]'
          }`}
      >
        {label}
      </label>

      {/* ინპუტი შესაბამისი ვალიდაციის ჩარჩოთი */}
      <div className="relative flex items-center">
        <input
          id={name}
          name={name}
          value={value}
          className={`w-full h-[48px] px-4 rounded-[4px] border text-[15px] outline-none transition-all duration-200 placeholder:text-gray-400 bg-white ${isInvalid
            ? 'border-[#EF5050] pr-10 focus:ring-1 focus:ring-[#EF5050]'
            : isValid
              ? 'border-[#98E37E] pr-10 focus:ring-1 focus:ring-[#98E37E]'
              : 'border-[#BCBCBC] focus:border-[#6B40E3] focus:ring-1 focus:ring-[#6B40E3]'
            }`}
          {...props}
        />

        {/* წითელი გამაფრთხილებელი იკონკა შეცდომისას */}
        {isInvalid && (
          <span className="absolute right-3.5 text-[#EF5050] pointer-events-none">
            <AlertCircle className="w-5 h-5 text-[#EF5050]" />
          </span>
        )}

        {/* მწვანე Checkmark სწორად შევსებისას */}
        {isValid && (
          <span className="absolute right-3.5 text-[#98E37E] pointer-events-none">
            <Check className="w-5 h-5 text-[#98E37E] stroke-[2.5]" />
          </span>
        )}
      </div>

      {/* დამხმარე მინიშნება ან შეცდომის ტექსტი */}
      {hint && (
        <span
          className={`text-[12px] font-normal leading-4 ${isInvalid ? 'text-[#EF5050]' : 'text-[#2E2E2E]/70'
            }`}
        >
          {isInvalid ? error : hint}
        </span>
      )}
      {!hint && isInvalid && (
        <span className="text-[12px] font-normal text-[#EF5050] leading-4">
          {error}
        </span>
      )}
    </div>
  );
};

// ==========================================
// 2. მრავალსტრიქონიანი ტექსტი (TextareaField)
// ==========================================
interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  touched?: boolean;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  hint,
  error,
  touched,
  className = '',
  value,
  rows = 4,
  ...props
}) => {
  const isInvalid = touched && Boolean(error);
  const isValid = touched && !error && Boolean(value);

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label
        htmlFor={name}
        className={`text-[15px] font-semibold transition-colors ${isInvalid ? 'text-[#EF5050]' : 'text-[#1A1A1A]'
          }`}
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          className={`w-full p-4 rounded-[4px] border text-[15px] outline-none transition-all duration-200 placeholder:text-gray-400 bg-white resize-y ${isInvalid
            ? 'border-[#EF5050] focus:ring-1 focus:ring-[#EF5050]'
            : isValid
              ? 'border-[#98E37E] focus:ring-1 focus:ring-[#98E37E]'
              : 'border-[#BCBCBC] focus:border-[#6B40E3] focus:ring-1 focus:ring-[#6B40E3]'
            }`}
          {...props}
        />
        {isInvalid && (
          <span className="absolute top-4 right-3.5 text-[#EF5050] pointer-events-none">
            <AlertCircle className="w-5 h-5 text-[#EF5050]" />
          </span>
        )}
        {isValid && (
          <span className="absolute top-4 right-3.5 text-[#98E37E] pointer-events-none">
            <Check className="w-5 h-5 text-[#98E37E] stroke-[2.5]" />
          </span>
        )}
      </div>
      {hint && (
        <span
          className={`text-[12px] font-normal leading-4 ${isInvalid ? 'text-[#EF5050]' : 'text-[#2E2E2E]/70'
            }`}
        >
          {isInvalid ? error : hint}
        </span>
      )}
      {!hint && isInvalid && (
        <span className="text-[12px] font-normal text-[#EF5050] leading-4">
          {error}
        </span>
      )}
    </div>
  );
};

// ==========================================
// 3. ჩამოსაშლელი სია (SelectField) - ხარისხისთვის
// ==========================================
interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  hint?: string;
  error?: string;
  touched?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  placeholder = 'აირჩიეთ ხარისხი',
  hint,
  error,
  touched,
  className = '',
  value,
  ...props
}) => {
  const isInvalid = touched && Boolean(error);
  const isValid = touched && !error && Boolean(value);

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label
        htmlFor={name}
        className={`text-[15px] font-semibold transition-colors ${isInvalid ? 'text-[#EF5050]' : 'text-[#1A1A1A]'
          }`}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <select
          id={name}
          name={name}
          value={value}
          className={`w-full h-[48px] px-4 pr-10 rounded-[4px] border text-[15px] outline-none appearance-none transition-all duration-200 bg-white ${!value ? 'text-gray-400' : 'text-[#1A1A1A]'
            } ${isInvalid
              ? 'border-[#EF5050] focus:ring-1 focus:ring-[#EF5050]'
              : isValid
                ? 'border-[#98E37E] focus:ring-1 focus:ring-[#98E37E]'
                : 'border-[#BCBCBC] focus:border-[#6B40E3] focus:ring-1 focus:ring-[#6B40E3]'
            }`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-[#1A1A1A]">
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 pointer-events-none flex items-center gap-1.5 text-gray-500">
          {isValid && <Check className="w-4 h-4 text-[#98E37E] stroke-[2.5]" />}
          {isInvalid && <AlertCircle className="w-4 h-4 text-[#EF5050]" />}
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {hint && (
        <span
          className={`text-[12px] font-normal leading-4 ${isInvalid ? 'text-[#EF5050]' : 'text-[#2E2E2E]/70'
            }`}
        >
          {isInvalid ? error : hint}
        </span>
      )}
      {!hint && isInvalid && (
        <span className="text-[12px] font-normal text-[#EF5050] leading-4">
          {error}
        </span>
      )}
    </div>
  );
};

// ==========================================
// 4. ფოტოს ატვირთვა (ImageUploadField)
// ==========================================
interface ImageUploadProps {
  label: string;
  name: string;
  value: string;
  onChange: (base64: string) => void;
  error?: string;
  touched?: boolean;
}

/**
 * სურათის ოპტიმიზაცია და კომპრესია Canvas-ით
 * უზრუნველყოფს, რომ დიდი ზომის ფოტომ არ გადაავსოს localStorage და სწრაფად ჩაიტვირთოს.
 */
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

// მზა ნიმუში ავატარები სწრაფი ტესტირებისთვის
const SAMPLE_AVATARS = [
  {
    name: 'ანზორ (მამაკაცი)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'ავატარი 2 (მამაკაცი)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'ავატარი 3 (მამაკაცი კოსტიუმში)',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  },
];

export const ImageUploadField: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  error,
  touched,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInvalid = touched && Boolean(error);
  const isValid = Boolean(value);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // ფაილის დამუშავება და კომპრესია
  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('გთხოვთ ატვირთოთ მხოლოდ სურათის ფორმატის ფაილი (JPG, PNG, WEBP)');
      return;
    }

    try {
      setIsProcessing(true);
      const compressedDataUrl = await compressImage(file);
      onChange(compressedDataUrl);
    } catch {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`text-[15px] font-semibold ${isInvalid ? 'text-[#EF5050]' : 'text-[#1A1A1A]'
            }`}
        >
          {label}
        </span>

        {/* მზა ნიმუში ავატარების არჩევა ერთი კლიკით */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span>ან აირჩიეთ ნიმუში:</span>
          <div className="flex items-center gap-1">
            {SAMPLE_AVATARS.map((av, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChange(av.url)}
                className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 hover:scale-110 transition-transform cursor-pointer focus:ring-1 focus:ring-[#6B40E3]"
                title={av.name}
              >
                <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* დამალული Native ფაილის ინპუტი */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* ატვირთვის ღილაკი და Drag & Drop ზონა */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-wrap items-center gap-4 p-3 rounded-lg border transition-all ${isDragging
          ? 'border-[#6B40E3] bg-[#6B40E3]/5'
          : isInvalid
            ? 'border-[#EF5050] bg-red-50/20'
            : isValid
              ? 'border-[#98E37E] bg-emerald-50/20'
              : 'border-dashed border-gray-300 bg-gray-50/40'
          }`}
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="h-[38px] px-5 rounded-[4px] bg-[#0E80BF] hover:bg-[#0c70a8] text-white text-[14px] font-medium transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {isProcessing ? 'იტვირთება...' : 'ატვირთვა'}
        </button>

        <span className="text-xs text-gray-400">
          JPG, PNG ან ჩააგდეთ ფაილი აქ
        </span>

        {/* ატვირთული ფოტოს მინიატურა (დაჭერით ფოტო იცვლება) */}
        {isValid && (
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm ml-auto">
            <div
              onClick={() => fileInputRef.current?.click()}
              title="დააჭირეთ ფოტოს შესაცვლელად"
              className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-200 cursor-pointer group"
            >
              <img
                src={value}
                alt="Uploaded avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col cursor-pointer"
              title="დააჭირეთ ფოტოს შესაცვლელად"
            >
              <span className="text-xs text-gray-800 font-semibold flex items-center gap-1 hover:text-[#6B40E3] transition-colors">
                ფოტო დაყენებულია
                <Check className="w-3.5 h-3.5 text-[#98E37E] stroke-[2.5]" />
              </span>
              <span className="text-[10px] text-gray-400">დააჭირეთ შესაცვლელად</span>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded cursor-pointer ml-1"
              title="ფოტოს წაშლა"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ფოტოს პირდაპირი ბმულის (URL) ჩაწერის ველი */}
      <div className="flex items-center gap-2 mt-1">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ან ჩაწერეთ ფოტოს პირდაპირი ბმული (URL / ლინკი)..."
            className="w-full h-[40px] px-3.5 rounded-[4px] border border-gray-300 text-xs text-gray-700 outline-none focus:border-[#6B40E3] focus:ring-1 focus:ring-[#6B40E3] transition-all bg-white placeholder:text-gray-400"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              title="გასუფთავება"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {isInvalid && (
        <span className="text-[12px] font-normal text-[#EF5050] flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </span>
      )}
    </div>
  );
};
