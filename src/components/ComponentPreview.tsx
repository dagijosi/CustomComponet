import React from 'react';
import { ComponentData } from '../types';
import DynamicIcon from './DynamicIcon';

// Create a separate component for dynamically loading icons
const ComponentPreview: React.FC<{ component: ComponentData }> = ({ component }) => {
    const renderComponent = () => {
        const { type, props } = component;
        
        // Add default flex alignment styles
        const defaultFlexStyles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: props.iconSpacingX || '0.5rem',
            rowGap: props.iconSpacingY || '0',
            ...props.style
        };
        
        switch (type) {
            case 'button':
                return (
                    <button style={defaultFlexStyles} className={props.className}>
                        {props.icon && props.iconPosition === 'left' && (
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                            />
                        )}
                        {props.iconPosition !== 'only' && props.text}
                        {props.icon && props.iconPosition === 'only' && (
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                            />
                        )}
                        {props.icon && props.iconPosition === 'right' && (
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                            />
                        )}
                    </button>
                );
            case 'input':
                return (
                    <input 
                        type={props.type || 'text'}
                        placeholder={props.placeholder}
                        style={props.style}
                        className={props.className}
                    />
                );
            case 'link':
                return (
                    <a href={props.href} style={defaultFlexStyles} className={props.className}>
                        {props.icon && props.iconPosition === 'left' && (
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                            />
                        )}
                        {props.iconPosition !== 'only' && props.text}
                        {props.icon && props.iconPosition === 'only' && (
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                            />
                        )}
                        {props.icon && props.iconPosition === 'right' && (
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                            />
                        )}
                    </a>
                );
            case 'image':
                return (
                    <img 
                        src={props.src || 'https://via.placeholder.com/150'} 
                        alt={props.alt} 
                        style={props.style}
                        className={props.className}
                    />
                );
            case 'div':
                return (
                    <div style={defaultFlexStyles} className={props.className}>
                        {props.icon && 
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                            />
                        }
                        {props.text}
                        {props.children}
                    </div>
                );
            case 'p':
                return <p style={props.style} className={props.className}>{props.text}</p>;
            case 'textarea':
                return (
                    <textarea 
                        placeholder={props.placeholder}
                        style={props.style}
                        className={props.className}
                    >{props.text}</textarea>
                );
            case 'select':
                return (
                    <select style={props.style} className={props.className}>
                        {props.options?.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </select>
                );
            case 'card':
                return (
                    <div style={props.style} className={props.className}>
                        {props.icon && 
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                                className="inline-block mr-2" 
                            />
                        }
                        {props.text}
                        {props.children}
                    </div>
                );
            case 'alert':
                return (
                    <div style={props.style} className={props.className}>
                        {props.icon && 
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                                className="inline-block mr-2" 
                            />
                        }
                        {props.text}
                    </div>
                );
            case 'badge':
                return (
                    <span style={props.style} className={props.className}>
                        {props.text}
                    </span>
                );
            case 'checkbox':
                return (
                    <label style={props.style} className={props.className}>
                        <input 
                            type="checkbox" 
                            className="mr-2"
                            defaultChecked={props.checked}
                        />
                        {props.text}
                    </label>
                );
            case 'radio':
                return (
                    <label style={props.style} className={props.className}>
                        <input 
                            type="radio" 
                            className="mr-2"
                            name={props.name || 'radio-group'}
                            defaultChecked={props.checked}
                        />
                        {props.text}
                    </label>
                );
            case 'toggle':
                return (
                    <button 
                        style={{
                            ...props.style,
                            backgroundColor: props.checked ? '#3B82F6' : '#E5E7EB'
                        }} 
                        className={props.className}
                    >
                        <span 
                            style={{
                                position: 'absolute',
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                transition: 'transform 0.2s',
                                transform: props.checked ? 'translateX(20px)' : 'translateX(2px)',
                                top: '2px',
                            }}
                        />
                    </button>
                );
            case 'section':
                return (
                    <section style={props.style} className={props.className}>
                        {props.title && <h3 className="text-lg font-semibold mb-2">{props.title}</h3>}
                        {props.text}
                        {props.children}
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="preview-container border rounded p-4 bg-white">
            <div className="preview-content flex items-center justify-center min-h-[100px]">
                {renderComponent()}
            </div>
        </div>
    );
};

export default ComponentPreview; 