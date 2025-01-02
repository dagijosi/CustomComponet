import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import { IconType } from 'react-icons';
import { FiSearch, FiLoader } from 'react-icons/fi';

interface IconSearchProps {
    value: string;
    onChange: (iconComponent: string) => void;
    onPositionChange?: (position: 'left' | 'right') => void;
    onSizeChange?: (size: number) => void;
    position?: 'left' | 'right';
    size?: number;
}

const IconSearch: React.FC<IconSearchProps> = ({ 
    value, 
    onChange, 
    onPositionChange,
    onSizeChange,
    position = 'left',
    size = 16 
}) => {
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [icons, setIcons] = useState<{ name: string; component: IconType }[]>([]);
    const [filteredIcons, setFilteredIcons] = useState<{ name: string; component: IconType }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadIcons = async () => {
            setIsLoading(true);
            // Simulate loading delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const iconSets = [
                { prefix: 'Fi', icons: FiIcons },
                { prefix: 'Ai', icons: AiIcons },
                { prefix: 'Bi', icons: BiIcons },
                { prefix: 'Bs', icons: BsIcons },
                { prefix: 'Hi', icons: HiIcons },
                { prefix: 'Md', icons: MdIcons },
            ];

            const allIcons = iconSets.flatMap(({ prefix, icons }) =>
                Object.entries(icons)
                    .filter(([name]) => name !== 'default')
                    .map(([name, component]) => ({
                        name: `${prefix}${name}`,
                        component: component as IconType
                    }))
            );

            setIcons(allIcons);
            setFilteredIcons(allIcons);
            setIsLoading(false);
        };

        loadIcons();
    }, []);

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm);
        const filtered = icons.filter(icon => 
            icon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredIcons(filtered.slice(0, 100));
    };

    const handleSelectIcon = (iconName: string) => {
        onChange(iconName);
        setShowDropdown(false);
        setSearch('');
    };

    const getCurrentIcon = () => {
        if (!value) return null;
        const icon = icons.find(i => i.name === value);
        return icon?.component;
    };

    const IconComponent = getCurrentIcon();

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

                {value && !showDropdown && (
                    <div className="mt-2 p-2 border rounded flex items-center gap-2">
                        {IconComponent && <IconComponent size={size} className="text-gray-600" />}
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
                            <div className="p-2 grid grid-cols-4 gap-2">
                                {filteredIcons.map(({ name, component: Icon }) => (
                                    <button
                                        key={name}
                                        onClick={() => handleSelectIcon(name)}
                                        className="p-2 hover:bg-gray-100 rounded flex flex-col items-center gap-1"
                                    >
                                        <Icon size={size} className="text-gray-600" />
                                        <span className="text-xs text-gray-500 truncate w-full text-center">
                                            {name}
                                        </span>
                                    </button>
                                ))}
                                {filteredIcons.length === 0 && (
                                    <div className="col-span-4 p-4 text-center text-gray-500">
                                        No icons found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {value && (
                <div className="flex items-center gap-4 p-2 border rounded bg-gray-50">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Position:</label>
                        <select
                            value={position}
                            onChange={(e) => onPositionChange?.(e.target.value as 'left' | 'right')}
                            className="text-sm border rounded p-1"
                        >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
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
                </div>
            )}
        </div>
    );
};

export default IconSearch; 