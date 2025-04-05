declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'tailwindcss' {
  const content: any;
  export default content;
}

interface Window {
  // Add any custom window properties here
}
