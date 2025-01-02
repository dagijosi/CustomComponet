import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

interface GradientPickerProps {
    value?: string;
    onChange: (gradient: string) => void;
}

const GradientPicker: React.FC<GradientPickerProps> = ({ value = '', onChange }) => {
    const [showColorPicker1, setShowColorPicker1] = useState(false);
    const [showColorPicker2, setShowColorPicker2] = useState(false);
    const [color1, setColor1] = useState('#ff0000');
    const [color2, setColor2] = useState('#0000ff');
    const [angle, setAngle] = useState('90');

    const presetGradients = [
        { name: 'Sunset', value: 'linear-gradient(45deg, #ff6b6b, #feca57)' },
        { name: 'Ocean', value: 'linear-gradient(45deg, #4834d4, #686de0)' },
        { name: 'Forest', value: 'linear-gradient(45deg, #6ab04c, #badc58)' },
        { name: 'Purple Rain', value: 'linear-gradient(45deg, #8e44ad, #9b59b6)' },
    ];

    const updateGradient = (c1: string, c2: string, deg: string) => {
        const gradientValue = `linear-gradient(${deg}deg, ${c1}, ${c2})`;
        onChange(gradientValue);
    };

    const currentGradient = value || `linear-gradient(${angle}deg, ${color1}, ${color2})`;

    return (
        <div className="space-y-4 p-4 border rounded">
            <h4 className="font-medium text-sm">Gradient</h4>
            
            {/* Preset Gradients */}
            <div className="grid grid-cols-2 gap-2">
                {presetGradients.map((preset, index) => (
                    <button
                        key={index}
                        className="h-8 rounded cursor-pointer border"
                        style={{ background: preset.value }}
                        onClick={() => onChange(preset.value)}
                        title={preset.name}
                    />
                ))}
            </div>

            {/* Custom Gradient Controls */}
            <div className="space-y-2">
                <div className="flex gap-2">
                    {/* Color 1 */}
                    <div className="relative">
                        <button
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: color1 }}
                            onClick={() => setShowColorPicker1(!showColorPicker1)}
                        />
                        {showColorPicker1 && (
                            <div className="absolute z-10 mt-2">
                                <div 
                                    className="fixed inset-0" 
                                    onClick={() => setShowColorPicker1(false)}
                                />
                                <SketchPicker
                                    color={color1}
                                    onChange={(color) => {
                                        setColor1(color.hex);
                                        updateGradient(color.hex, color2, angle);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Color 2 */}
                    <div className="relative">
                        <button
                            className="w-8 h-8 rounded border"
                            style={{ backgroundColor: color2 }}
                            onClick={() => setShowColorPicker2(!showColorPicker2)}
                        />
                        {showColorPicker2 && (
                            <div className="absolute z-10 mt-2">
                                <div 
                                    className="fixed inset-0" 
                                    onClick={() => setShowColorPicker2(false)}
                                />
                                <SketchPicker
                                    color={color2}
                                    onChange={(color) => {
                                        setColor2(color.hex);
                                        updateGradient(color1, color.hex, angle);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Angle Slider */}
                    <div className="flex-1">
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={angle}
                            onChange={(e) => {
                                setAngle(e.target.value);
                                updateGradient(color1, color2, e.target.value);
                            }}
                            className="w-full"
                        />
                        <div className="text-sm text-gray-600 text-center">{angle}°</div>
                    </div>
                </div>

                {/* Preview */}
                <div 
                    className="h-12 rounded border"
                    style={{ background: currentGradient }}
                />
            </div>
        </div>
    );
};

export default GradientPicker; 