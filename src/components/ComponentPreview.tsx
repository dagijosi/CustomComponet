import React from 'react';
import { ComponentData } from '../types';

const ComponentPreview: React.FC<{ component: ComponentData }> = ({ component }) => {
    const renderComponent = () => {
        const { type, props } = component;
        
        switch (type) {
            case 'button':
                return (
                    <button style={props.style} className={props.className}>
                        {props.icon && <i className={props.icon}></i>}
                        {props.text}
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
                        {props.icon && <i className={props.icon}></i>}
                        {props.text}
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