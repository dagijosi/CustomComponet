import React from 'react';

export interface ComponentData {
  type: 'button' | 'input' | 'link' | 'image' | 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'ul' | 'ol' | 'li' | 'textarea' | 'select';
  id: string;
  props: {
    text?: string;
    href?: string;
    src?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: ComponentData[];
    placeholder?: string;
    type?: string;
    onClick?: () => void;
    alt?: string;
    options?: string[]; // For select component
    icon?: string; // For adding icons
    gradient?: string; // For gradient backgrounds
  };
}