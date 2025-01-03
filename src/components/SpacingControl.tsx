import React from 'react';

const SpacingControl: React.FC<{
    type: 'margin' | 'padding';
    values: { top?: string | number; right?: string | number; bottom?: string | number; left?: string | number };
    onChange: (property: string, value: string) => void;
}> = ({ type, values, onChange }) => {
    const handleChange = (side: string, value: string) => {
        console.log(`Updating ${type}${side.charAt(0).toUpperCase() + side.slice(1)} to ${value}`);
        onChange(`${type}${side.charAt(0).toUpperCase() + side.slice(1)}`, value);
    };

    const toString = (value: string | number | undefined): string => {
        if (value === undefined) return '';
        return value.toString();
    };

    const handleReset = () => {
        ['top', 'right', 'bottom', 'left'].forEach((side) => handleChange(side, ''));
    };

    return (
        <div className="space-y-2">
            <h6 className="text-sm font-medium capitalize">{type} Control</h6>
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Top"
                        title="Set top spacing"
                        value={toString(values.top)}
                        onChange={(e) => handleChange('top', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Bottom"
                        title="Set bottom spacing"
                        value={toString(values.bottom)}
                        onChange={(e) => handleChange('bottom', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Right"
                        title="Set right spacing"
                        value={toString(values.right)}
                        onChange={(e) => handleChange('right', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Left"
                        title="Set left spacing"
                        value={toString(values.left)}
                        onChange={(e) => handleChange('left', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                    />
                </div>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={handleReset}
                    className="text-xs text-red-500 hover:text-red-600"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default SpacingControl;
