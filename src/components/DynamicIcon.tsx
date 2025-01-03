import React, { useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import { FiLoader } from 'react-icons/fi';

const DynamicIcon: React.FC<{ 
    iconName: string; 
    size?: number;
    className?: string;
}> = ({ iconName, size = 16, className = "" }) => {
    const [IconComponent, setIconComponent] = useState<IconType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadIcon = async () => {
            setIsLoading(true);
            setError(null);
    
            try {
                // Extract the prefix (e.g., "Fi" from "FiSearch")
                const prefix = iconName.substring(0, 2);
                const iconNameWithoutPrefix = iconName.slice(2);
    
                // Dynamically import the relevant icon library
                const iconModule = await import(`react-icons/${prefix.toLowerCase()}`);
                
                // Access the icon
                const Icon = iconModule[iconNameWithoutPrefix];
                
                if (Icon) {
                    setIconComponent(() => Icon);
                } else {
                    throw new Error(`Icon ${iconNameWithoutPrefix} not found in ${prefix}`);
                }
            } catch (err) {
                // Check if 'err' is an Error before accessing 'message'
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Unknown error occurred while loading the icon');
                }
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
    
        if (iconName) {
            loadIcon();
        } else {
            setIconComponent(null);
            setIsLoading(false);
        }
    }, [iconName]);
    

    if (isLoading) {
        return <FiLoader className="animate-spin" />;
    }

    if (error) {
        return (
            <div className="text-red-500 text-sm">
                Error: {error}
            </div>
        );
    }

    if (!IconComponent) {
        return null;
    }

    return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;
