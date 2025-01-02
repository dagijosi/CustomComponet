import React, { useState } from 'react';
import { ComponentData } from '../types';

const generateTailwindCode = (component: ComponentData): string => {
    switch (component.type) {
        case 'button':
            return `<button className="bg-${component.props.style?.backgroundColor || 'blue'}-500 text-${component.props.style?.color || 'white'} ${component.props.style?.padding || 'px-4 py-2'} rounded-${component.props.style?.borderRadius || 'lg'} ${component.props.className || ''}">${component.props.icon ? `<i class="${component.props.icon}"></i>` : ''}${component.props.text}</button>`;
        case 'input':
            return `<input type="${component.props.type}" placeholder="${component.props.placeholder}" className="border rounded-${component.props.style?.borderRadius || 'lg'} ${component.props.style?.padding || 'px-4 py-2'} ${component.props.className || ''}"/>`;
        case 'link':
            return `<a href="${component.props.href}" className="text-${component.props.style?.color || 'blue'}-500 hover:text-${component.props.style?.color || 'blue'}-700 ${component.props.className || ''}">${component.props.icon ? `<i class="${component.props.icon}"></i>` : ''}${component.props.text}</a>`;
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
        default:
            return '';
    }
};

const generateNormalCode = (component: ComponentData): string => {
    switch (component.type) {
        case 'button':
            return `<button style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}">${component.props.icon ? `<i class="${component.props.icon}"></i>` : ''}${component.props.text}</button>`;
        case 'input':
            return `<input type="${component.props.type}" placeholder="${component.props.placeholder}" style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}"/>`;
        case 'link':
            return `<a href="${component.props.href}" style={${JSON.stringify(component.props.style)}} className="${component.props.className ?? ''}">${component.props.icon ? `<i class="${component.props.icon}"></i>` : ''}${component.props.text}</a>`;
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