import React from "react";

export interface ComponentProps {
    text?: string;
    children?: string;
    style?: React.CSSProperties;
    className?: string;
    icon?: string;
    href?: string;
    src?: string;
    alt?: string;
    type?: string;
    placeholder?: string;
    options?: string[];
    checked?: boolean;
    name?: string;
    title?: string;
    alertType?: 'error' | 'success' | 'warning' | 'info';
    iconPosition?: 'left' | 'right';
    iconSize?: number;
}

export interface ComponentData {
    id: string;
    type: string;
    props: ComponentProps;
}
