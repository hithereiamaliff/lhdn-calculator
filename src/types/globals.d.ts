declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'tailwindcss' {
  const content: Record<string, unknown>;
  export default content;
}
