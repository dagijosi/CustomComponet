import React from 'react';

const SpacingControl: React.FC<{
    type: 'margin' | 'padding';
    values: { top?: string | number; right?: string | number; bottom?: string | number; left?: string | number };
    onChange: (property: string, value: string) => void;
}> = ({ type, values, onChange }) => {
    const handleChange = (side: string, value: string) => {
        onChange(`${type}${side.charAt(0).toUpperCase() + side.slice(1)}`, value);
    };

    const toString = (value: string | number | undefined): string => {
        if (value === undefined) return '';
        return value.toString();
    };

    return (
        <div className="space-y-2">
            <h6 className="text-sm font-medium capitalize">{type}</h6>
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Top"
                        value={toString(values.top)}
                        onChange={(e) => handleChange('top', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Bottom"
                        value={toString(values.bottom)}
                        onChange={(e) => handleChange('bottom', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Right"
                        value={toString(values.right)}
                        onChange={(e) => handleChange('right', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Left"
                        value={toString(values.left)}
                        onChange={(e) => handleChange('left', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                    />
                </div>
            </div>
            <button
                onClick={() => {
                    const value = '8px';
                    handleChange('top', value);
                    handleChange('right', value);
                    handleChange('bottom', value);
                    handleChange('left', value);
                }}
                className="text-xs text-blue-500 hover:text-blue-600"
            >
                Set all to 8px
            </button>
        </div>
    );
};

export default SpacingControl; 