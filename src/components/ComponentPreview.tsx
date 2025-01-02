import React from 'react';
import { ComponentData } from '../types';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';

const ComponentPreview: React.FC<{ component: ComponentData }> = ({ component }) => {
    const getIconComponent = (iconName: string) => {
        const iconSets = {
            'Fi': FiIcons,
            'Ai': AiIcons,
            'Bi': BiIcons,
            'Bs': BsIcons,
            'Hi': HiIcons,
            'Md': MdIcons,
        };
        
        if (!iconName) return null;
        
        const prefix = iconName.substring(0, 2);
        const iconSet = iconSets[prefix as keyof typeof iconSets];
        
        if (!iconSet) return null;
        
        return (iconSet as any)[iconName];
    };

    const renderComponent = () => {
        const { type, props } = component;
        const IconComponent = props.icon ? getIconComponent(props.icon) : null;
        
        switch (type) {
            case 'button':
                return (
                    <button style={props.style} className={props.className}>
                        {props.iconPosition !== 'right' && IconComponent && 
                            <IconComponent size={props.iconSize || 16} className="inline-block mr-2" />
                        }
                        {props.text}
                        {props.iconPosition === 'right' && IconComponent && 
                            <IconComponent size={props.iconSize || 16} className="inline-block ml-2" />
                        }
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
                    <a href={props.href} style={props.style} className={props.className}>
                        {props.iconPosition !== 'right' && IconComponent && 
                            <IconComponent size={props.iconSize || 16} className="inline-block mr-2" />
                        }
                        {props.text}
                        {props.iconPosition === 'right' && IconComponent && 
                            <IconComponent size={props.iconSize || 16} className="inline-block ml-2" />
                        }
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
                return <div style={props.style} className={props.className}>{props.text}</div>;
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
                        {IconComponent && <IconComponent className="inline-block mr-2" />}
                        {props.text}
                        {props.children}
                    </div>
                );
            case 'alert':
                return (
                    <div style={props.style} className={props.className}>
                        {IconComponent && <IconComponent className="inline-block mr-2" />}
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