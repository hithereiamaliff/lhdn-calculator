declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module 'csstype' {
  interface Properties {
    '--tw-ring-color'?: string;
    '--tw-ring-offset-width'?: string;
    '--tw-ring-offset-color'?: string;
    '--tw-ring-opacity'?: string;
  }
}

// Add support for className prop
declare namespace JSX {
  interface IntrinsicAttributes {
    className?: string;
  }
}
