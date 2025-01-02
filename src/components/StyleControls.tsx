import React from 'react';
import ColorPickerButton from './ColorPickerButton';

interface StyleControlsProps {
    style: React.CSSProperties;
    onStyleChange: (property: string, value: string) => void;
}

const StyleControls: React.FC<StyleControlsProps> = ({ style, onStyleChange }) => {
    return (
        <div className="space-y-4">
            {/* Layout */}
            <div>
                <h4 className="font-medium text-sm mb-2">Layout</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Width</label>
                        <input
                            type="text"
                            value={style.width || ''}
                            onChange={(e) => onStyleChange('width', e.target.value)}
                            placeholder="e.g., 100px, 50%"
                            className="w-full p-2 text-sm border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Height</label>
                        <input
                            type="text"
                            value={style.height || ''}
                            onChange={(e) => onStyleChange('height', e.target.value)}
                            placeholder="e.g., 100px, auto"
                            className="w-full p-2 text-sm border rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Typography */}
            <div>
                <h4 className="font-medium text-sm mb-2">Typography</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Font Size</label>
                        <input
                            type="text"
                            value={style.fontSize || ''}
                            onChange={(e) => onStyleChange('fontSize', e.target.value)}
                            placeholder="e.g., 16px"
                            className="w-full p-2 text-sm border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Font Weight</label>
                        <select
                            value={style.fontWeight || ''}
                            onChange={(e) => onStyleChange('fontWeight', e.target.value)}
                            className="w-full p-2 text-sm border rounded"
                        >
                            <option value="">Default</option>
                            <option value="300">Light</option>
                            <option value="400">Regular</option>
                            <option value="500">Medium</option>
                            <option value="600">Semibold</option>
                            <option value="700">Bold</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Line Height</label>
                        <input
                            type="text"
                            value={style.lineHeight || ''}
                            onChange={(e) => onStyleChange('lineHeight', e.target.value)}
                            placeholder="e.g., 1.5"
                            className="w-full p-2 text-sm border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Text Align</label>
                        <select
                            value={style.textAlign || ''}
                            onChange={(e) => onStyleChange('textAlign', e.target.value)}
                            className="w-full p-2 text-sm border rounded"
                        >
                            <option value="">Default</option>
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                            <option value="justify">Justify</option>
                        </select>
                    </div>
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
                </div>
            </div>

            {/* Border */}
            <div>
                <h4 className="font-medium text-sm mb-2">Border</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Border Radius</label>
                        <input
                            type="text"
                            value={style.borderRadius || ''}
                            onChange={(e) => onStyleChange('borderRadius', e.target.value)}
                            placeholder="e.g., 4px"
                            className="w-full p-2 text-sm border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Border Width</label>
                        <input
                            type="text"
                            value={style.borderWidth || ''}
                            onChange={(e) => onStyleChange('borderWidth', e.target.value)}
                            placeholder="e.g., 1px"
                            className="w-full p-2 text-sm border rounded"
                        />
                    </div>
                    <div className="col-span-2">
                        <ColorPickerButton
                            color={style.borderColor || '#e5e7eb'}
                            onChange={(color) => onStyleChange('borderColor', color)}
                            label="Border Color"
                        />
                    </div>
                </div>
            </div>

            {/* Effects */}
            <div>
                <h4 className="font-medium text-sm mb-2">Effects</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Opacity</label>
                        <input
                            type="number"
                            min="0"
                            max="1"
                            step="0.1"
                            value={style.opacity || '1'}
                            onChange={(e) => onStyleChange('opacity', e.target.value)}
                            className="w-full p-2 text-sm border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-600 mb-1 block">Box Shadow</label>
                        <select
                            value={style.boxShadow || ''}
                            onChange={(e) => onStyleChange('boxShadow', e.target.value)}
                            className="w-full p-2 text-sm border rounded"
                        >
                            <option value="">None</option>
                            <option value="0 1px 2px rgba(0,0,0,0.1)">Small</option>
                            <option value="0 1px 3px rgba(0,0,0,0.12)">Medium</option>
                            <option value="0 4px 6px rgba(0,0,0,0.1)">Large</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StyleControls; 