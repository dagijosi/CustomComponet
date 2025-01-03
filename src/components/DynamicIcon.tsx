import React, { useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import { FiLoader } from 'react-icons/fi';
import * as Fi from 'react-icons/fi';
import * as Ai from 'react-icons/ai';
import * as Bi from 'react-icons/bi';
import * as Bs from 'react-icons/bs';
import * as Hi from 'react-icons/hi';
import * as Md from 'react-icons/md';

const DynamicIcon: React.FC<{ 
    iconName: string; 
    size?: number;
    className?: string;
}> = ({ iconName, size = 16, className = "" }) => {
    const [IconComponent, setIconComponent] = useState<IconType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadIcon = () => {
            setIsLoading(true);
            setError(null);
    
            try {
                const prefix = iconName.substring(0, 2).toLowerCase();
                const name = iconName.slice(2);
                let iconModule;

                // Map the icon sets
                switch (prefix) {
                    case 'fi':
                        iconModule = Fi;
                        break;
                    case 'ai':
                        iconModule = Ai;
                        break;
                    case 'bi':
                        iconModule = Bi;
                        break;
                    case 'bs':
                        iconModule = Bs;
                        break;
                    case 'hi':
                        iconModule = Hi;
                        break;
                    case 'md':
                        iconModule = Md;
                        break;
                    default:
                        throw new Error(`Icon set ${prefix} not found`);
                }

                const Icon = iconModule[name as keyof typeof iconModule] as IconType;
                if (Icon) {
                    setIconComponent(() => Icon);
                } else {
                    throw new Error(`Icon ${name} not found in ${prefix}`);
                }
            } catch (err) {
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
