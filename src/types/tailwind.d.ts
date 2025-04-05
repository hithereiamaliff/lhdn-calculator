declare module 'tailwind-classes' {
  interface TailwindClasses {
    // Layout
    'mt-1': string;
    'block': string;
    'w-full': string;
    'rounded-md': string;
    'shadow-sm': string;

    // Colors
    'border-red-300': string;
    'border-gray-300': string;
    'focus:border-red-500': string;
    'focus:border-blue-500': string;
    'focus:ring-blue-500': string;
    'text-red-600': string;
  }

  const classes: TailwindClasses;
  export default classes;
}
