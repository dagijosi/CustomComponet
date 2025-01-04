import React, { useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import { FiSearch, FiLoader } from 'react-icons/fi';
import * as Fi from 'react-icons/fi';
import * as Ai from 'react-icons/ai';
import * as Bi from 'react-icons/bi';
import * as Bs from 'react-icons/bs';
import * as Hi from 'react-icons/hi';
import * as Md from 'react-icons/md';

interface IconSearchProps {
    value: string;
    onChange: (iconComponent: string) => void;
    onPositionChange?: (position: 'left' | 'right' | 'only') => void;
    onSizeChange?: (size: number) => void;
    onSpacingChange?: (spacing: { x?: string | number; y?: string | number }) => void;
    position?: 'left' | 'right' | 'only';
    size?: number;
    spacingX?: string | number;
    spacingY?: string | number;
}

const IconSearch: React.FC<IconSearchProps> = ({ 
    value, 
    onChange, 
    onPositionChange,
    onSizeChange,
    onSpacingChange,
    position = 'left',
    size = 16,
    spacingX,
    spacingY
}) => {
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [icons, setIcons] = useState<{ name: string; component: IconType }[]>([]);
    const [filteredIcons, setFilteredIcons] = useState<{ name: string; component: IconType }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIconSet, setCurrentIconSet] = useState<string>('Fi');

    const iconSets = {
        'Fi': Fi,
        'Ai': Ai,
        'Bi': Bi,
        'Bs': Bs,
        'Hi': Hi,
        'Md': Md,
    };

    const loadIconSet = (prefix: string) => {
        setIsLoading(true);
        try {
            if (!iconSets[prefix as keyof typeof iconSets]) {
                throw new Error(`Icon set ${prefix} is not available`);
            }

            const iconModule = iconSets[prefix as keyof typeof iconSets];
            const iconList = Object.entries(iconModule)
                .filter(([name]) => name !== 'default')
                .map(([name, component]) => ({
                    name,
                    component: component as IconType
                }));
            
            setIcons(iconList);
            setFilteredIcons(iconList.slice(0, 100));
            setCurrentIconSet(prefix);
        } catch (error) {
            console.error('Error loading icons:', error);
            setFilteredIcons([]);
        }
        setIsLoading(false);
    };

    // Load initial icon set (FiIcons)
    useEffect(() => {
        loadIconSet('Fi');
    }, []);

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm);
        const filtered = icons.filter(icon => 
            icon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredIcons(filtered.slice(0, 100));
    };

    const getCurrentIcon = (iconName: string) => {
        if (!iconName) return false;
        const prefix = iconName.substring(0, 2);
        return prefix === currentIconSet;
    };

    const handleIconSelect = (iconName: string) => {
        onChange(iconName);
        setShowDropdown(false);
        setSearch('');
    };

    return (
        <div className="space-y-2">
            <div className="relative">
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="Search icons..."
                        className="w-full p-2 pl-10 border rounded text-sm"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Icon Set Selector */}
                <div className="mt-2 flex gap-1 flex-wrap">
                    {Object.keys(iconSets).map((prefix) => (
                        <button
                            key={prefix}
                            onClick={() => loadIconSet(prefix)}
                            className={`px-2 py-1 text-xs rounded ${
                                currentIconSet === prefix 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {prefix}
                        </button>
                    ))}
                </div>

                {value && !showDropdown && (
                    <div className="mt-2 p-2 border rounded flex items-center gap-2">
                        {getCurrentIcon(value) && 
                            <CurrentIcon icon={value} size={size} />
                        }
                        <span className="text-sm text-gray-600">{value}</span>
                    </div>
                )}

                {showDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-500">
                                <FiLoader className="animate-spin inline-block mr-2" />
                                Loading icons...
                            </div>
                        ) : (
                            <div className="p-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {filteredIcons.map(({ name, component: Icon }) => (
                                    <button
                                        key={name}
                                        onClick={() => handleIconSelect(name)}
                                        className="p-2 hover:bg-gray-100 rounded flex flex-col items-center gap-1"
                                    >
                                        <Icon size={size} className="text-gray-600" />
                                        <span className="text-xs text-gray-500 truncate w-full text-center">
                                            {name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {value && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-2 border rounded bg-gray-50">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Display:</label>
                        <select
                            value={position}
                            onChange={(e) => onPositionChange?.(e.target.value as 'left' | 'right' | 'only')}
                            className="text-sm border rounded p-1"
                        >
                            <option value="left">Icon Left</option>
                            <option value="right">Icon Right</option>
                            <option value="only">Icon Only</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Size:</label>
                        <input
                            type="range"
                            min="12"
                            max="24"
                            value={size}
                            onChange={(e) => onSizeChange?.(parseInt(e.target.value))}
                            className="w-24"
                        />
                        <span className="text-sm text-gray-600">{size}px</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Spacing:</label>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">X:</span>
                                <input
                                    type="text"
                                    value={spacingX || ''}
                                    onChange={(e) => onSpacingChange?.({ 
                                        x: e.target.value,
                                        y: spacingY 
                                    })}
                                    placeholder="8px"
                                    className="w-16 text-sm p-1 border rounded"
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">Y:</span>
                                <input
                                    type="text"
                                    value={spacingY || ''}
                                    onChange={(e) => onSpacingChange?.({ 
                                        x: spacingX,
                                        y: e.target.value 
                                    })}
                                    placeholder="0px"
                                    className="w-16 text-sm p-1 border rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Separate component for current icon to handle static imports
const CurrentIcon: React.FC<{ icon: string; size: number }> = ({ icon, size }) => {
    const [IconComponent, setIconComponent] = useState<IconType | null>(null);

    useEffect(() => {
        const loadIcon = () => {
            try {
                const prefix = icon.substring(0, 2).toLowerCase();
                const iconName = icon.slice(2);
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

                const IconComponent = iconModule[iconName as keyof typeof iconModule] as IconType;
                if (IconComponent) {
                    setIconComponent(() => IconComponent);
                }
            } catch (error) {
                console.error('Error loading icon:', error);
                setIconComponent(null);
            }
        };

        if (icon) {
            loadIcon();
        }
    }, [icon]);

    if (!IconComponent) return null;
    return <IconComponent size={size} className="text-gray-600" />;
};

export default IconSearch;