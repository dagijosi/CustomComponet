import React from 'react';
import { ComponentData } from '../types';

interface SpecificStylePropertiesProps {
    component: ComponentData;
    localProps: any;
    handleStyleChange: (property: keyof React.CSSProperties, value: string) => void;
}

const SpecificStyleProperties: React.FC<SpecificStylePropertiesProps> = ({ component, localProps, handleStyleChange }) => {
    const renderInput = (placeholder: string, property: keyof React.CSSProperties) => (
        <input
            type="text"
            placeholder={placeholder}
            value={localProps.style?.[property] || ""}
            onChange={(e) => handleStyleChange(property, e.target.value)}
            className="p-2 border rounded"
        />
    );

    const renderSelect = (property: keyof React.CSSProperties, options: { value: string, label: string }[]) => (
        <select
            value={localProps.style?.[property] || ""}
            onChange={(e) => handleStyleChange(property, e.target.value)}
            className="p-2 border rounded"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );

    const renderTransformInput = () => (
        <div>
            <label className="text-xs text-gray-600 mb-1 block">Transform</label>
            <select
                value={localProps.style?.transform || ''}
                onChange={(e) => handleStyleChange('transform', e.target.value)}
                className="w-full p-2 text-sm border rounded"
            >
                <option value="">None</option>
                <option value="rotate(45deg)">Rotate 45°</option>
                <option value="rotate(90deg)">Rotate 90°</option>
                <option value="scale(1.5)">Scale 1.5x</option>
                <option value="scale(2)">Scale 2x</option>
            </select>
        </div>
    );

    const renderBorderControls = () => (
        <div>
            <label className="text-xs text-gray-600 mb-1 block">Border</label>
            <select
                value={localProps.style?.border || ''}
                onChange={(e) => handleStyleChange('border', e.target.value)}
                className="w-full p-2 text-sm border rounded"
            >
                <option value="">None</option>
                <option value="1px solid">Solid</option>
                <option value="1px dashed">Dashed</option>
                <option value="1px dotted">Dotted</option>
            </select>
        </div>
    );

    const renderSpecificStyleProperties = () => {
        switch (component.type) {
            case 'button':
                return (
                    <div className="grid grid-cols-2 gap-2">
                        {renderInput("Font Size", "fontSize")}
                        {renderSelect("fontWeight", [
                            { value: "", label: "Font Weight" },
                            { value: "normal", label: "Normal" },
                            { value: "500", label: "Medium" },
                            { value: "600", label: "Semi Bold" },
                            { value: "700", label: "Bold" }
                        ])}
                        {renderSelect("boxSizing", [
                            { value: "content-box", label: "Content Box" },
                            { value: "border-box", label: "Border Box" }
                        ])}
                        {renderInput("Padding", "padding")}
                        {renderTransformInput()}
                        {renderBorderControls()}
                    </div>
                );
            case 'image':
                return (
                    <div className="grid grid-cols-2 gap-2">
                        {renderInput("Object Fit", "objectFit")}
                        {renderInput("Object Position", "objectPosition")}
                        {renderInput("Border Radius", "borderRadius")}
                        {renderTransformInput()}
                        {renderBorderControls()}
                    </div>
                );
            case 'p':
            case 'h1':
            case 'h2':
                return (
                    <div className="grid grid-cols-2 gap-2">
                        {renderInput("Line Height", "lineHeight")}
                        {renderInput("Letter Spacing", "letterSpacing")}
                        {renderSelect("textAlign", [
                            { value: "", label: "Text Align" },
                            { value: "left", label: "Left" },
                            { value: "center", label: "Center" },
                            { value: "right", label: "Right" },
                            { value: "justify", label: "Justify" }
                        ])}
                        {renderTransformInput()}
                        {renderBorderControls()}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {renderSpecificStyleProperties()}
        </>
    );
};

export default SpecificStyleProperties;
