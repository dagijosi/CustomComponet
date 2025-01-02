import React, { useState, useEffect } from 'react';
import { ComponentData } from '../types';
import { IconType } from 'react-icons';
import { FiLoader } from 'react-icons/fi';

// Create a separate component for dynamically loading icons
const DynamicIcon: React.FC<{ 
    iconName: string; 
    size?: number;
    className?: string;
}> = ({ iconName, size = 16, className = "" }) => {
    const [IconComponent, setIconComponent] = useState<IconType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadIcon = async () => {
            try {
                const prefix = iconName.substring(0, 2).toLowerCase();
                const iconSet = await import(`react-icons/${prefix}`);
                setIconComponent(iconSet[iconName] as IconType);
            } catch (error) {
                console.error('Error loading icon:', error);
            }
            setIsLoading(false);
        };

        loadIcon();
    }, [iconName]);

    if (isLoading) return <FiLoader className="animate-spin" />;
    if (!IconComponent) return null;
    return <IconComponent size={size} className={className} />;
};

const ComponentPreview: React.FC<{ component: ComponentData }> = ({ component }) => {
    const renderComponent = () => {
        const { type, props } = component;
        
        switch (type) {
            case 'button':
                return (
                    <button style={props.style} className={props.className}>
                        {props.iconPosition !== 'right' && props.icon && 
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                                className="inline-block mr-2" 
                            />
                        }
                        {props.text}
                        {props.iconPosition === 'right' && props.icon && 
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                                className="inline-block ml-2" 
                            />
                        }
                    </button>
                );
            case 'link':
                return (
                    <a href={props.href} style={props.style} className={props.className}>
                        {props.iconPosition !== 'right' && props.icon && 
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                                className="inline-block mr-2" 
                            />
                        }
                        {props.text}
                        {props.iconPosition === 'right' && props.icon && 
                            <DynamicIcon 
                                iconName={props.icon} 
                                size={props.iconSize || 16} 
                                className="inline-block ml-2" 
                            />
                        }
                    </a>
                );
            // ... rest of the cases ...
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