import React, { useState } from 'react';
import { ComponentData } from '../types';

const generateTailwindCode = (component: ComponentData): string => {
    switch (component.type) {
        case 'button':
            const getBgClasses = () => {
                const style = component.props.style || {};
                
                // If there's a gradient, use it and ignore backgroundColor
                if (typeof style.background === 'string' && style.background.includes('gradient')) {
                    const gradientStr = style.background;
                    
                    // Get direction class based on angle
                    let directionClass = 'bg-gradient-to-r'; // default right
                    if (gradientStr.includes('45deg')) {
                        directionClass = 'bg-gradient-to-tr';
                    } else if (gradientStr.includes('90deg')) {
                        directionClass = 'bg-gradient-to-t';
                    } else if (gradientStr.includes('135deg')) {
                        directionClass = 'bg-gradient-to-tl';
                    }

                    // Extract colors
                    const colors = gradientStr
                        .match(/#[a-fA-F0-9]{6}/g)
                        ?.map(color => color.replace('#', ''));

                    if (colors && colors.length >= 2) {
                        return `${directionClass} from-[#${colors[0]}] to-[#${colors[1]}]`;
                    }
                }
                
                // If no gradient, use backgroundColor
                if (style.backgroundColor) {
                    return `bg-[${style.backgroundColor}]`;
                }

                // Default fallback
                return 'bg-blue-500';
            };

            const getPaddingClasses = () => {
                const style = component.props.style || {};
                if (typeof style.padding === 'string') {
                    const [y, x] = style.padding.split(' ');
                    return `py-[${y}] px-[${x}]`;
                }
                return 'px-4 py-2';
            };

            const getBorderRadiusClass = () => {
                const style = component.props.style || {};
                if (style.borderRadius) {
                    return `rounded-[${style.borderRadius}]`;
                }
                return 'rounded-lg';
            };

            const getTextColorClass = () => {
                const style = component.props.style || {};
                if (style.color) {
                    return `text-[${style.color}]`;
                }
                return 'text-white';
            };

            const getFlexClasses = () => {
                // Always add flex and items-center if there's an icon
                if (component.props.icon) {
                    return 'flex items-center';
                }
                return '';
            };

            return `<button className="${getBgClasses()} ${getTextColorClass()} ${getPaddingClasses()} ${getBorderRadiusClass()} ${getFlexClasses()} ${component.props.className || ''}">${
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
        case 'input':
            return `<input type="${component.props.type}" placeholder="${component.props.placeholder}" className="border rounded-${component.props.style?.borderRadius || 'lg'} ${component.props.style?.padding || 'px-4 py-2'} ${component.props.className || ''}"/>`;
        case 'link':
            return `<a href="${component.props.href}" className="text-${component.props.style?.color || 'blue'}-500 hover:text-${component.props.style?.color || 'blue'}-700 ${component.props.className || ''}">${
                component.props.icon ? 
                    `{/* Import ${component.props.icon} from 'react-icons/fi' */}\n  ${
                        component.props.iconPosition === 'only' ? 
                            `<${component.props.icon} size={${component.props.iconSize || 16}} />` :
                        component.props.iconPosition === 'right' ?
                            `${component.props.text} <${component.props.icon} size={${component.props.iconSize || 16}} className="ml-2" />` :
                            `<${component.props.icon} size={${component.props.iconSize || 16}} className="mr-2" /> ${component.props.text}`
                    }` : 
                    component.props.text
            }</a>`;
        case 'image':
          return `<img src="${component.props.src}" alt="${component.props.alt}" style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}"/>`
        case 'div':
        case 'p':
        case 'span':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'ul':
        case 'ol':
        case 'li':
            return `<${component.type} style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}">${component.props.text ?? ''}</${component.type}>`;
        case 'textarea':
            return `<textarea placeholder="${component.props.placeholder}" style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}">${component.props.text}</textarea>`;
        case 'select':
            return `<select style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}">${component.props.options?.map(option => `<option>${option}</option>`).join('')}</select>`;
        case 'card':
            return `<div className="p-6 bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow ${component.props.className || ''}">${component.props.text}${component.props.children ? `\n  ${component.props.children}` : ''}</div>`;
        case 'alert':
            const getAlertClasses = () => {
                const style = component.props.style || {};
                return `${style.backgroundColor ? `bg-[${style.backgroundColor}]` : ''} ${style.color ? `text-[${style.color}]` : ''} ${style.borderColor ? `border-[${style.borderColor}]` : ''}`;
            };
            
            return `<div className="p-4 rounded-lg border ${getAlertClasses()} ${component.props.className || ''}">${component.props.text}</div>`;
        case 'badge':
            return `<span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 ${component.props.className || ''}">${component.props.text}</span>`;
        case 'checkbox':
            return `<label className="flex items-center gap-2 ${component.props.className || ''}">
  <input type="checkbox" ${component.props.checked ? 'checked' : ''} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
  <span>${component.props.text}</span>
</label>`;
        case 'radio':
            return `<label className="flex items-center gap-2 ${component.props.className || ''}">
  <input type="radio" name="${component.props.name || 'radio-group'}" ${component.props.checked ? 'checked' : ''} className="border-gray-300 text-blue-600 focus:ring-blue-500"/>
  <span>${component.props.text}</span>
</label>`;
        case 'toggle':
            return `<button className="relative w-11 h-6 rounded-full transition-colors ${component.props.checked ? 'bg-blue-600' : 'bg-gray-200'} ${component.props.className || ''}">
  <span className="absolute w-5 h-5 bg-white rounded-full transform transition-transform ${component.props.checked ? 'translate-x-5' : 'translate-x-1'} top-0.5"></span>
</button>`;
        case 'section':
            return `<section className="p-8 bg-gray-50 rounded-xl border ${component.props.className || ''}">
  ${component.props.title ? `<h3 className="text-lg font-semibold mb-2">${component.props.title}</h3>` : ''}
  ${component.props.text}${component.props.children ? `\n  ${component.props.children}` : ''}
</section>`;
        default:
            return '';
    }
};

const generateNormalCode = (component: ComponentData): string => {
    switch (component.type) {
        case 'button':
            const style = {
                ...component.props.style,
                // Add flex styles if there's an icon
                ...(component.props.icon && {
                    display: 'flex',
                    alignItems: 'center'
                })
            };

            return `<button style={${JSON.stringify(style)}} className="${component.props.className ?? ''}">${
                component.props.icon ? 
                    `{/* Import ${component.props.icon} from 'react-icons/fi' */}\n  ${
                        component.props.iconPosition === 'only' ? 
                            `<${component.props.icon} size={${component.props.iconSize || 16}} />` :
                        component.props.iconPosition === 'right' ?
                            `${component.props.text} <${component.props.icon} size={${component.props.iconSize || 16}} style={{ marginLeft: '8px' }} />` :
                            `<${component.props.icon} size={${component.props.iconSize || 16}} style={{ marginRight: '8px' }} /> ${component.props.text}`
                    }` : 
                    component.props.text
            }</button>`;
        case 'input':
            return `<input type="${component.props.type}" placeholder="${component.props.placeholder}" style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}"/>`;
        case 'link':
            return `<a href="${component.props.href}" style={${JSON.stringify(component.props.style)}} className="${component.props.className || ''}">${
                component.props.icon ? 
                    `{/* Import ${component.props.icon} from 'react-icons/fi' */}\n  ${
                        component.props.iconPosition === 'only' ? 
                            `<${component.props.icon} size={${component.props.iconSize || 16}} />` :
                        component.props.iconPosition === 'right' ?
                            `${component.props.text} <${component.props.icon} size={${component.props.iconSize || 16}} style={{ marginLeft: '8px' }} />` :
                            `<${component.props.icon} size={${component.props.iconSize || 16}} style={{ marginRight: '8px' }} /> ${component.props.text}`
                    }` : 
                    component.props.text
            }</a>`;
        case 'image':
          return `<img src="${component.props.src}" alt="${component.props.alt}" style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}"/>`
        case 'div':
        case 'p':
        case 'span':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'ul':
        case 'ol':
        case 'li':
            return `<${component.type} style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}">${component.props.text ?? ''}</${component.type}>`;
        case 'textarea':
            return `<textarea placeholder="${component.props.placeholder}" style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}">${component.props.text}</textarea>`;
        case 'select':
            return `<select style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}">${component.props.options?.map(option => `<option>${option}</option>`).join('')}</select>`;
        case 'card':
            return `<div style={${JSON.stringify(component.props.style)}} className="${component.props.className || ''}">${component.props.text}${component.props.children ? `\n  ${component.props.children}` : ''}</div>`;
        case 'alert':
            return `<div style={${JSON.stringify(component.props.style)}} className="${component.props.className || ''}">${component.props.text}</div>`;
        case 'badge':
            return `<span style={${JSON.stringify(component.props.style)}} className="${component.props.className || ''}">${component.props.text}</span>`;
        case 'checkbox':
            return `<label style={${JSON.stringify(component.props.style)}} className="${component.props.className || ''}">
  <input type="checkbox" ${component.props.checked ? 'checked' : ''} style={{ marginRight: '0.5rem' }}/>
  <span>${component.props.text}</span>
</label>`;
        case 'radio':
            return `<label style={${JSON.stringify(component.props.style)}} className="${component.props.className || ''}">
  <input type="radio" name="${component.props.name || 'radio-group'}" ${component.props.checked ? 'checked' : ''} style={{ marginRight: '0.5rem' }}/>
  <span>${component.props.text}</span>
</label>`;
        case 'toggle':
            return `<button 
  style={{
    ...${JSON.stringify(component.props.style)},
    position: 'relative',
    width: '44px',
    height: '24px',
    backgroundColor: ${component.props.checked ? "'#2563EB'" : "'#E5E7EB'"},
    borderRadius: '9999px',
    transition: 'background-color 0.2s'
  }} 
  className="${component.props.className || ''}">
  <span style={{
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'transform 0.2s',
    transform: ${component.props.checked ? "'translateX(20px)'" : "'translateX(2px)'"},
    top: '2px'
  }}/>
</button>`;
        case 'section':
            return `<section style={${JSON.stringify(component.props.style)}} className="${component.props.className || ''}">
  ${component.props.title ? `<h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>${component.props.title}</h3>` : ''}
  ${component.props.text}${component.props.children ? `\n  ${component.props.children}` : ''}
</section>`;
        default:
            return '';
    }
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