import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPickerButton: React.FC<{
    color: string;
    onChange: (color: string) => void;
    label: string;
}> = ({ color, onChange, label }) => {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div className="relative">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <button
                className="w-full h-10 rounded border flex items-center px-3 gap-2 bg-white hover:bg-gray-50"
                onClick={() => setShowPicker(!showPicker)}
            >
                <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-600">{color}</span>
            </button>
            {showPicker && (
                <div className="absolute z-10 mt-2">
                    <div 
                        className="fixed inset-0" 
                        onClick={() => setShowPicker(false)}
                    />
                    <SketchPicker
                        color={color}
                        onChange={(color) => onChange(color.hex)}
                    />
                </div>
            )}
        </div>
    );
};

export default ColorPickerButton; 