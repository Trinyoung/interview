import React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'micro-app': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        name?: string;
        url?: string;
      };
    }
  }
}
