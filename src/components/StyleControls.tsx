import React from 'react';
import ColorPickerButton from './ColorPickerButton';

interface StyleControlsProps {
    style: React.CSSProperties;
    onStyleChange: (property: keyof React.CSSProperties, value: string) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({ style, onStyleChange }) => {
    const renderInput = (label: string, property: keyof React.CSSProperties, type: string = 'text', placeholder: string = '') => (
        <div>
            <label className="text-xs text-gray-600 mb-1 block">{label}</label>
            <input
                type={type}
                value={style[property] || ''}
                onChange={(e) => onStyleChange(property, e.target.value)}
                placeholder={placeholder}
                className="w-full p-2 text-sm border rounded"
            />
        </div>
    );

    const renderSelect = (label: string, property: keyof React.CSSProperties, options: { value: string, label: string }[]) => (
        <div>
            <label className="text-xs text-gray-600 mb-1 block">{label}</label>
            <select
                value={style[property] || ''}
                onChange={(e) => onStyleChange(property, e.target.value)}
                className="w-full p-2 text-sm border rounded"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );

    const renderTransformInput = () => (
        <div>
            <label className="text-xs text-gray-600 mb-1 block">Transform</label>
            <select
                value={style.transform || ''}
                onChange={(e) => onStyleChange('transform', e.target.value)}
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
                value={style.border || ''}
                onChange={(e) => onStyleChange('border', e.target.value)}
                className="w-full p-2 text-sm border rounded"
            >
                <option value="">None</option>
                <option value="1px solid">Solid</option>
                <option value="1px dashed">Dashed</option>
                <option value="1px dotted">Dotted</option>
            </select>
        </div>
    );

    return (
        <div className="space-y-4">
            {/* Layout */}
            <div>
                <h4 className="font-medium text-sm mb-2">Layout</h4>
                <div className="grid grid-cols-2 gap-2">
                    {renderInput('Width', 'width', 'text', 'e.g., 100px, 50%')}
                    {renderInput('Height', 'height', 'text', 'e.g., 100px, auto')}
                    {renderSelect('Box Sizing', 'boxSizing', [
                        { value: 'content-box', label: 'Content Box' },
                        { value: 'border-box', label: 'Border Box' }
                    ])}
                    {renderInput('Padding', 'padding', 'text', 'e.g., 10px')}
                </div>
            </div>

            {/* Typography */}
            <div>
                <h4 className="font-medium text-sm mb-2">Typography</h4>
                <div className="grid grid-cols-2 gap-2">
                    {renderInput('Font Size', 'fontSize', 'text', 'e.g., 16px')}
                    {renderSelect('Font Weight', 'fontWeight', [
                        { value: '', label: 'Default' },
                        { value: '300', label: 'Light' },
                        { value: '400', label: 'Regular' },
                        { value: '500', label: 'Medium' },
                        { value: '600', label: 'Semibold' },
                        { value: '700', label: 'Bold' }
                    ])}
                    {renderInput('Line Height', 'lineHeight', 'text', 'e.g., 1.5')}
                    {renderSelect('Text Align', 'textAlign', [
                        { value: '', label: 'Default' },
                        { value: 'left', label: 'Left' },
                        { value: 'center', label: 'Center' },
                        { value: 'right', label: 'Right' },
                        { value: 'justify', label: 'Justify' }
                    ])}
                </div>
            </div>

            {/* Colors */}
            <div>
                <h4 className="font-medium text-sm mb-2">Colors</h4>
                <div className="grid grid-cols-2 gap-2">
                    <ColorPickerButton
                        color={style.backgroundColor || '#ffffff'}
                        onChange={(color) => onStyleChange('backgroundColor', color)}
                        label="Background"
                    />
                    <ColorPickerButton
                        color={style.color || '#000000'}
                        onChange={(color) => onStyleChange('color', color)}
                        label="Text Color"
                    />
                    <button
                        onClick={() => onStyleChange('backgroundColor', 'transparent')}
                        className="w-full p-2 text-sm border rounded"
                    >
                        Make Background Transparent
                    </button>
                </div>
            </div>

            {/* Border */}
            <div>
                <h4 className="font-medium text-sm mb-2">Border</h4>
                <div className="grid grid-cols-2 gap-2">
                    {renderInput('Border Radius', 'borderRadius', 'text', 'e.g., 4px')}
                    {renderInput('Border Width', 'borderWidth', 'text', 'e.g., 1px')}
                    <div className="col-span-2">
                        <ColorPickerButton
                            color={style.borderColor || '#e5e7eb'}
                            onChange={(color) => onStyleChange('borderColor', color)}
                            label="Border Color"
                        />
                    </div>
                    {renderBorderControls()}
                </div>
            </div>

            {/* Effects */}
            <div>
                <h4 className="font-medium text-sm mb-2">Effects</h4>
                <div className="grid grid-cols-2 gap-2">
                    {renderInput('Opacity', 'opacity', 'number', '1')}
                    {renderSelect('Box Shadow', 'boxShadow', [
                        { value: '', label: 'None' },
                        { value: '0 1px 2px rgba(0,0,0,0.1)', label: 'Small' },
                        { value: '0 1px 3px rgba(0,0,0,0.12)', label: 'Medium' },
                        { value: '0 4px 6px rgba(0,0,0,0.1)', label: 'Large' }
                    ])}
                    {renderTransformInput()}
                </div>
            </div>
        </div>
    );
};

export default StyleControls;