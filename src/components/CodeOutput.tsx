import React, { useState } from 'react';
import { ComponentData } from '../types';

const generateTailwindCode = (component: ComponentData): string => {
    const style = component.props.style || {};

    const getBgClasses = () => {
        if (style.backgroundColor === 'transparent') {
            return 'bg-transparent';
        }
        if (typeof style.background === 'string' && style.background.includes('gradient')) {
            const gradientStr = style.background;
            let directionClass = 'bg-gradient-to-r';
            if (gradientStr.includes('45deg')) {
                directionClass = 'bg-gradient-to-tr';
            } else if (gradientStr.includes('90deg')) {
                directionClass = 'bg-gradient-to-t';
            } else if (gradientStr.includes('135deg')) {
                directionClass = 'bg-gradient-to-tl';
            }
            const colors = gradientStr.match(/#[a-fA-F0-9]{6}/g)?.map(color => color.replace('#', ''));
            if (colors && colors.length >= 2) {
                return `${directionClass} from-[#${colors[0]}] to-[#${colors[1]}]`;
            }
        }
        if (style.backgroundColor) {
            return `bg-[${style.backgroundColor}]`;
        }
        return 'bg-blue-500';
    };

    const getPaddingClasses = () => {
        if (style.paddingTop || style.paddingBottom || style.paddingLeft || style.paddingRight) {
            return [
                style.paddingTop && `pt-[${style.paddingTop}]`,
                style.paddingRight && `pr-[${style.paddingRight}]`,
                style.paddingBottom && `pb-[${style.paddingBottom}]`,
                style.paddingLeft && `pl-[${style.paddingLeft}]`
            ].filter(Boolean).join(' ');
        }
        if (style.padding) {
            if (typeof style.padding === 'string' && style.padding.includes(' ')) {
                const [y, x] = style.padding.split(' ');
                return `py-[${y}] px-[${x}]`;
            } else {
                return `p-[${style.padding}]`;
            }
        }
        return '';
    };

    const getBorderRadiusClass = () => {
        if (style.borderRadius) {
            return `rounded-[${style.borderRadius}]`;
        }
        return 'rounded-lg';
    };

    const getTextColorClass = () => {
        if (style.color) {
            return `text-[${style.color}]`;
        }
        return 'text-white';
    };

    const getFlexClasses = () => {
        if (component.props.icon) {
            return 'flex items-center';
        }
        return '';
    };

    const getTransformClasses = () => {
        const transform = style.transform || '';
        const rotateMatch = transform.match(/rotate\((\d+)deg\)/);
        const scaleMatch = transform.match(/scale\((\d+(\.\d+)?)\)/);
        const rotateClass = rotateMatch ? `rotate-[${rotateMatch[1]}deg]` : '';
        const scaleClass = scaleMatch ? `scale-[${scaleMatch[1]}]` : '';
        return `${rotateClass} ${scaleClass}`.trim();
    };

    const getBorderClasses = () => {
        if (style.border) {
            return `border-[${style.border}]`;
        }
        return '';
    };

    return `<button className="${getBgClasses()} ${getTextColorClass()} ${getPaddingClasses()} ${getBorderRadiusClass()} ${getFlexClasses()} ${getTransformClasses()} ${getBorderClasses()} ${component.props.className || ''}">${
        component.props.icon ? 
            `{/* Import ${component.props.icon} from 'react-icons/fi' */}\n  ${
                component.props.iconPosition === 'only' ? 
                    `<${component.props.icon} size={${component.props.iconSize || 16}} />` :
                component.props.iconPosition === 'right' ?
                    `${component.props.text} <${component.props.icon} size={${component.props.iconSize || 16}} className="ml-2" />` :
                    `<${component.props.icon} size={${component.props.iconSize || 16}} className="mr-2" /> ${component.props.text}`
            }` : 
            component.props.text
    }</button>`;
};

const generateNormalCode = (component: ComponentData): string => {
    const processStyles = (style: React.CSSProperties): React.CSSProperties => {
        const processedStyle: React.CSSProperties = { ...style };
        (Object.keys(processedStyle) as Array<keyof React.CSSProperties>).forEach(key => {
            if (processedStyle[key] === undefined) {
                delete processedStyle[key];
            }
        });
        if (processedStyle.padding && (
            processedStyle.paddingTop || 
            processedStyle.paddingRight || 
            processedStyle.paddingBottom || 
            processedStyle.paddingLeft
        )) {
            delete processedStyle.padding;
        }
        return processedStyle;
    };

    const buttonStyle: React.CSSProperties = {
        ...component.props.style,
        ...(component.props.icon && {
            display: 'flex',
            alignItems: 'center',
            gap: component.props.iconSpacingX || '0.5rem',
            rowGap: component.props.iconSpacingY || '0'
        }),
        backgroundColor: component.props.style?.backgroundColor === 'transparent' ? 'transparent' : component.props.style?.backgroundColor
    };

    const cleanedStyle = processStyles(buttonStyle);

    return `<button style={${JSON.stringify(cleanedStyle)}} className="${component.props.className ?? ''}">${
        component.props.icon ? 
            `{/* Import ${component.props.icon} from 'react-icons/fi' */}\n  ${
                component.props.iconPosition === 'only' ? 
                    `<${component.props.icon} size={${component.props.iconSize || 16}} />` :
                component.props.iconPosition === 'right' ?
                    `${component.props.text} <${component.props.icon} size={${component.props.iconSize || 16}} />` :
                    `<${component.props.icon} size={${component.props.iconSize || 16}} /> ${component.props.text}`
            }` : 
            component.props.text
    }</button>`;
};

const CodeOutput: React.FC<{ components: ComponentData[] }> = ({ components }) => {
    const [copied, setCopied] = useState(false);
    const [useTailwind, setUseTailwind] = useState(false);
    
    const code = components.map(useTailwind ? generateTailwindCode : generateNormalCode).join('\n');

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-2 w-full sm:w-auto">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Generated Code</h2>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <input
                                type="radio"
                                checked={!useTailwind}
                                onChange={() => setUseTailwind(false)}
                                className="text-blue-500"
                            />
                            Normal CSS
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <input
                                type="radio"
                                checked={useTailwind}
                                onChange={() => setUseTailwind(true)}
                                className="text-blue-500"
                            />
                            Tailwind CSS
                        </label>
                    </div>
                </div>
                <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                             dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 
                             rounded-lg transition-colors w-full sm:w-auto"
                >
                    {copied ? 'Copied!' : 'Copy Code'}
                </button>
            </div>

            <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 sm:p-6 rounded-lg overflow-x-auto text-sm">
                    <code>{code}</code>
                </pre>
                {useTailwind && (
                    <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded">
                            Tailwind CSS
                        </span>
                    </div>
                )}
            </div>

            {useTailwind && (
                <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="font-medium">Note:</p>
                    <p>Make sure to include Tailwind CSS in your project:</p>
                    <pre className="bg-gray-800 text-gray-100 p-3 rounded mt-2 text-xs">
                        <code>{`npm install tailwindcss
npx tailwindcss init`}</code>
                    </pre>
                </div>
            )}
        </div>
    );
};

export default CodeOutput;