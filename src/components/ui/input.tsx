'use client'

import React, { useState } from 'react';
import Select, { Props as SelectProps } from 'react-select';

interface Input extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "id" | "disabled" | "className"> {
  id: string;
  className?: string;
  label: string;
  type?: "number" | "text" | "email" | "password";
  disable?: boolean;
}
interface Textarea extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "disabled"> {
  id: string;
  label: string;
  rows?: number;
  disable?: boolean,
}
interface FloatingLabelSelectProps extends SelectProps {
  id: string;
  label: string;
  className?: string;
  disable?: boolean;
}

export const FloatingLabelInput: React.FC<Input> = ({
  id,
  label,
  type = 'text', // nilai default untuk type
  className,
  disable = false,
  ...rest
}) => {
  return (
    <div className={`relative my-2 ${className}`}>
      <input
        id={id}
        type={type}
        className={`
          peer
          w-full
          px-3
          py-3
          border
          ${disable === true ?
            'border-blue-600 cursor-not-allowed'
            :
            'border-gray-500'
          }
          rounded-lg
          text-gray-800
          bg-white
          placeholder-transparent
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition-colors
          duration-200
        `}
        disabled={disable}
        placeholder={label}
        {...rest}
      />
      <label
        htmlFor={id}
        // Logika utama ada di sini dengan `peer-placeholder-shown`
        className={`
          absolute
          left-3
          -top-2.5
          px-1
          text-sm
          text-gray-500
          bg-white
          pointer-events-none
          transition-all
          duration-200
          peer-placeholder-shown:top-3.5
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-500
          peer-focus:-top-2.5
          peer-focus:text-sm
          peer-focus:text-blue-600
        `}
      >
        {label}
      </label>
    </div>
  );
};
export const FloatingLabelDate: React.FC<Input> = ({
  id,
  label,
  type = 'date', // nilai default untuk type
  className,
  disable = false,
  ...rest
}) => {
  return (
    <div className={`relative my-2 ${className}`}>
      <input
        id={id}
        type={type}
        className={`
          peer
          w-full
          px-3
          py-3
          border
          ${disable === true ?
            'border-blue-600 cursor-not-allowed'
            :
            'border-gray-500'
          }
          rounded-lg
          text-gray-800
          bg-white
          placeholder-transparent
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition-colors
          duration-200
        `}
        disabled={disable}
        placeholder={label}
        {...rest}
      />
      <label
        htmlFor={id}
        // Logika utama ada di sini dengan `peer-placeholder-shown`
        className={`
          absolute
          left-3
          -top-2.5
          px-1
          text-sm
          text-gray-500
          bg-white
          pointer-events-none
          transition-all
          duration-200
          peer-placeholder-shown:top-3.5
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-500
          peer-focus:-top-2.5
          peer-focus:text-sm
          peer-focus:text-blue-600
        `}
      >
        {label}
      </label>
    </div>
  );
};

export const FloatingLabelTextarea: React.FC<Textarea> = ({ id, label, rows = 3, disable = false, ...rest }) => {

  return (
    <div className="relative my-2">
      <textarea
        id={id}
        rows={rows} // Menentukan tinggi awal textarea
        className={`
          peer
          w-full
          px-3
          py-3
          border
         ${disable === true ?
            'border-blue-600 cursor-not-allowed'
            :
            'border-gray-500'
          }
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition-all
          duration-300
          ease-in-out
          text-gray-800
          bg-white
          resize-y /* Izinkan pengguna mengubah ukuran secara vertikal */
          placeholder-transparent /* Hide default placeholder */
        `}
        placeholder={label}
        disabled={disable}
        {...rest}
      ></textarea>
      <label
        htmlFor={id}
        className={`
          absolute
          left-3
          -top-2.5
          px-1
          text-sm
          text-gray-500
          bg-white
          pointer-events-none
          transition-all
          duration-200
          peer-placeholder-shown:top-3.5
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-500
          peer-focus:-top-2.5
          peer-focus:text-sm
          peer-focus:text-blue-600
        `}
      >
        {label}
      </label>
    </div>
  );
};

export const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({
  id,
  label,
  className,
  disable = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false); // State untuk melacak fokus

  return (
    <div className={`relative my-2 ${className}`}>
      <Select
        inputId={id} // Menggunakan inputId untuk menghubungkan label
        isDisabled={disable}
        classNamePrefix="react-select" // Memberikan prefix untuk styling
        placeholder="" // Kosongkan placeholder bawaan react-select
        onFocus={() => setIsFocused(true)} // Set isFocused menjadi true saat difokuskan
        onBlur={() => setIsFocused(false)}   // Set isFocused menjadi false saat blur
        styles={{
          control: (base, state) => ({
            ...base,
            // Styling dasar control
            width: '100%',
            padding: '4px 8px', // Sesuaikan padding
            borderRadius: '0.5rem', // rounded-lg
            borderColor: disable ? '#2563EB' : '#6B7280', // border-blue-600 atau border-gray-500
            borderWidth: '1px',
            boxShadow: 'none', // Menghilangkan shadow bawaan

            // Focus state
            '&:hover': {
              borderColor: state.isFocused ? '#3B82F6' : (disable ? '#2563EB' : '#6B7280'), // focus:border-blue-500
            },
            // borderColor: state.isFocused ? '#3B82F6' : (disable ? '#2563EB' : '#6B7280'), // focus:border-blue-500

            // Background color
            backgroundColor: 'white',
            cursor: disable ? 'not-allowed' : 'default',
          }),
          valueContainer: (base) => ({
            ...base,
            paddingTop: '1px', // Sesuaikan agar ada ruang untuk label saat "floating"
            paddingBottom: '0px',
          }),
          placeholder: (base) => ({
            ...base,
            color: 'transparent', // Sembunyikan placeholder bawaan
          }),
          singleValue: (base) => ({
            ...base,
            color: '#1F2937', // text-gray-800
          }),
          input: (base) => ({
            ...base,
            color: '#1F2937', // text-gray-800
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: '#6B7280', // Warna ikon panah
            '&:hover': {
              color: '#3B82F6',
            },
          }),
          clearIndicator: (base) => ({
            ...base,
            color: '#6B7280', // Warna ikon silang
            '&:hover': {
              color: '#EF4444',
            },
          }),
          indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: '#D1D5DB', // Warna separator
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999, // Pastikan menu muncul di atas elemen lain
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // Sesuaikan shadow
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? '#3B82F6' // bg-blue-500 saat terpilih
              : state.isFocused
                ? '#EFF6FF' // bg-blue-50 saat di-hover
                : 'white',
            color: state.isSelected ? 'white' : '#1F2937', // Warna teks saat terpilih atau tidak
            '&:active': {
              backgroundColor: '#2563EB', // bg-blue-600 saat aktif
            },
          }),
        }}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`
          absolute
          left-3
          px-1
          text-sm
          bg-white
          pointer-events-none
          transition-all
          duration-200
          cursor-pointer
          ${
          // Logika untuk label floating:
          // Jika select memiliki nilai ATAU sedang difokuskan, label akan "mengambang" di atas
          // Kita menggunakan state `isFocused` yang kita kelola sendiri
          // dan `rest.value` (jika ada nilai yang dipilih)
          (rest.value && (rest.value as any).value !== '') || isFocused // Cek apakah ada nilai atau sedang fokus
            ? '-top-2.5'
            : 'top-3.5'
          }
          ${disable
            ? 'text-gray-400' // Warna label saat disable
            : isFocused
              ? 'text-blue-600' // Warna saat fokus
              : (rest.value && (rest.value as any).value !== '')
                ? 'text-gray-600' // Warna saat ada nilai tapi tidak fokus
                : 'text-gray-500' // Warna default
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};
