import React, { useState } from 'react';
import { ComponentData } from '../types';
import { SketchPicker } from 'react-color';
import GradientPicker from './GradientPicker';
import { FiSearch } from 'react-icons/fi';

interface ComponentEditorProps {
    component: ComponentData;
    onChange: (newProps: any) => void;
    onDelete?: () => void;
}

// type CSSSpacingProperty = 'margin' | 'padding';
type CSSSpacingSide = 'Top' | 'Right' | 'Bottom' | 'Left';
// type CSSSpacingKey = `${CSSSpacingProperty}${CSSSpacingSide}`;

const ComponentPreview: React.FC<{ component: ComponentData }> = ({ component }) => {
    const renderComponent = () => {
        const { type, props } = component;
        
        switch (type) {
            case 'button':
                return (
                    <button style={props.style} className={props.className}>
                        {props.icon && <i className={props.icon}></i>}
                        {props.text}
                    </button>
                );
            case 'input':
                return (
                    <input 
                        type={props.type || 'text'}
                        placeholder={props.placeholder}
                        style={props.style}
                        className={props.className}
                    />
                );
            case 'link':
                return (
                    <a href={props.href} style={props.style} className={props.className}>
                        {props.icon && <i className={props.icon}></i>}
                        {props.text}
                    </a>
                );
            case 'image':
                return (
                    <img 
                        src={props.src || 'https://via.placeholder.com/150'} 
                        alt={props.alt} 
                        style={props.style}
                        className={props.className}
                    />
                );
            case 'div':
                return <div style={props.style} className={props.className}>{props.text}</div>;
            case 'p':
                return <p style={props.style} className={props.className}>{props.text}</p>;
            case 'textarea':
                return (
                    <textarea 
                        placeholder={props.placeholder}
                        style={props.style}
                        className={props.className}
                    >{props.text}</textarea>
                );
            case 'select':
                return (
                    <select style={props.style} className={props.className}>
                        {props.options?.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </select>
                );
            default:
                return null;
        }
    };

    return (
        <div className="preview-container border rounded p-4 bg-white">
            <div className="preview-content flex items-center justify-center min-h-[100px]">
                {renderComponent()}
            </div>
        </div>
    );
};

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

const applySpacingPreset = (
    preset: 'equal' | 'content' | 'reset',
    currentStyle: React.CSSProperties
): React.CSSProperties => {
    const style = { ...currentStyle };
    const sides: CSSSpacingSide[] = ['Top', 'Right', 'Bottom', 'Left'];

    switch (preset) {
        case 'equal':
            sides.forEach(side => {
                (style as any)[`margin${side}`] = '16px';
                (style as any)[`padding${side}`] = '16px';
            });
            break;
        case 'content':
            sides.filter(side => side === 'Top' || side === 'Bottom').forEach(side => {
                (style as any)[`margin${side}`] = '16px';
                (style as any)[`padding${side}`] = '8px';
            });
            sides.filter(side => side === 'Right' || side === 'Left').forEach(side => {
                (style as any)[`margin${side}`] = '32px';
                (style as any)[`padding${side}`] = '16px';
            });
            break;
        case 'reset':
            sides.forEach(side => {
                (style as any)[`margin${side}`] = '0px';
                (style as any)[`padding${side}`] = '0px';
            });
            break;
    }
    return style;
};

const ComponentEditor: React.FC<ComponentEditorProps> = ({ component, onChange, onDelete }) => {
    const [localProps, setLocalProps] = useState(component.props);
    const [useGradient, setUseGradient] = useState(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        const newProps = { ...localProps, [name]: value };
        setLocalProps(newProps);
        onChange(newProps);
    };

    const handleStyleChange = (property: string, value: string) => {
        const newStyle = { ...localProps.style, [property]: value };
        const newProps = { ...localProps, style: newStyle };
        setLocalProps(newProps);
        onChange(newProps);
    };

    const handleGradientChange = (gradient: string) => {
        const newStyle = { ...localProps.style, background: gradient };
        const newProps = { ...localProps, style: newStyle };
        setLocalProps(newProps);
        onChange(newProps);
        setUseGradient(true);
    };

    const handleBackgroundChange = (color: string) => {
        const newStyle = { ...localProps.style, background: undefined, backgroundColor: color };
        const newProps = { ...localProps, style: newStyle };
        setLocalProps(newProps);
        onChange(newProps);
        setUseGradient(false);
    };

    const renderContentProperties = () => {
        switch (component.type) {
            case 'button':
            case 'link':
                return (
                    <>
                        <input
                            type="text"
                            name="text"
                            value={localProps.text || ''}
                            onChange={handleChange}
                            placeholder={`${component.type === 'button' ? 'Button' : 'Link'} Text`}
                            className="w-full p-2 border rounded"
                        />
                        <div className="relative mt-2">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="icon"
                                value={localProps.icon || ''}
                                onChange={handleChange}
                                placeholder="Search for an icon..."
                                className="w-full p-2 pl-10 border rounded"
                            />
                        </div>
                    </>
                );
            case 'input':
                return (
                    <>
                        <input
                            type="text"
                            name="placeholder"
                            value={localProps.placeholder || ''}
                            onChange={handleChange}
                            placeholder="Placeholder text"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <select
                            name="type"
                            value={localProps.type || 'text'}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="text">Text</option>
                            <option value="password">Password</option>
                            <option value="email">Email</option>
                            <option value="number">Number</option>
                            <option value="tel">Phone</option>
                            <option value="url">URL</option>
                            <option value="date">Date</option>
                        </select>
                    </>
                );
            case 'link':
                return (
                    <>
                        <input
                            type="text"
                            name="text"
                            value={localProps.text || ''}
                            onChange={handleChange}
                            placeholder="Link Text"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="text"
                            name="href"
                            value={localProps.href || ''}
                            onChange={handleChange}
                            placeholder="URL"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="text"
                            name="icon"
                            value={localProps.icon || ''}
                            onChange={handleChange}
                            placeholder="Icon class"
                            className="w-full p-2 border rounded"
                        />
                    </>
                );
            case 'image':
                return (
                    <>
                        <input
                            type="text"
                            name="src"
                            value={localProps.src || ''}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="text"
                            name="alt"
                            value={localProps.alt || ''}
                            onChange={handleChange}
                            placeholder="Alt text"
                            className="w-full p-2 border rounded"
                        />
                    </>
                );
            case 'select':
                return (
                    <textarea
                        name="options"
                        value={(localProps.options || []).join('\n')}
                        onChange={(e) => {
                            const options = e.target.value.split('\n').filter(Boolean);
                            const newProps = { ...localProps, options };
                            setLocalProps(newProps);
                            onChange(newProps);
                        }}
                        placeholder="Enter options (one per line)"
                        className="w-full p-2 border rounded"
                        rows={5}
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        name="text"
                        value={localProps.text || ''}
                        onChange={handleChange}
                        placeholder="Content"
                        className="w-full p-2 border rounded"
                    />
                );
        }
    };

    const renderSpecificStyleProperties = () => {
        switch (component.type) {
            case 'button':
                return (
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="Font Size"
                            value={localProps.style?.fontSize || ""}
                            onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                            className="p-2 border rounded"
                        />
                        <select
                            value={localProps.style?.fontWeight || ""}
                            onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="">Font Weight</option>
                            <option value="normal">Normal</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                            <option value="700">Bold</option>
                        </select>
                    </div>
                );
            case 'image':
                return (
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="Object Fit"
                            value={localProps.style?.objectFit || ""}
                            onChange={(e) => handleStyleChange("objectFit", e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Object Position"
                            value={localProps.style?.objectPosition || ""}
                            onChange={(e) => handleStyleChange("objectPosition", e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                );
            case 'p':
            case 'h1':
            case 'h2':
                return (
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="Line Height"
                            value={localProps.style?.lineHeight || ""}
                            onChange={(e) => handleStyleChange("lineHeight", e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Letter Spacing"
                            value={localProps.style?.letterSpacing || ""}
                            onChange={(e) => handleStyleChange("letterSpacing", e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{component.type}</h3>
                {onDelete && (
                    <button 
                        onClick={onDelete}
                        className="text-red-500 hover:text-red-700"
                    >
                        Delete
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left column - Preview */}
                <div className="w-full lg:w-1/3">
                    <div className="lg:sticky lg:top-4">
                        <h4 className="font-semibold mb-2">Preview</h4>
                        <ComponentPreview component={component} />
                    </div>
                </div>

                {/* Right column - Properties */}
                <div className="w-full lg:w-2/3 space-y-4">
                    {/* Content Properties */}
                    <div className="space-y-2 bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold">Content</h4>
                        {renderContentProperties()}
                    </div>

                    {/* Style Properties */}
                    <div className="space-y-4 bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold">Styling</h4>
                        
                        {/* Background Type Toggle */}
                        <div className="flex items-center gap-4 mb-2">
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="radio"
                                    checked={!useGradient}
                                    onChange={() => {
                                        setUseGradient(false);
                                        handleBackgroundChange(localProps.style?.backgroundColor || '#ffffff');
                                    }}
                                    className="text-blue-500"
                                />
                                Solid Color
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="radio"
                                    checked={useGradient}
                                    onChange={() => setUseGradient(true)}
                                    className="text-blue-500"
                                />
                                Gradient
                            </label>
                        </div>

                        {/* Colors */}
                        {!useGradient ? (
                            <div className="grid grid-cols-2 gap-4">
                                <ColorPickerButton
                                    color={localProps.style?.backgroundColor || '#ffffff'}
                                    onChange={handleBackgroundChange}
                                    label="Background Color"
                                />
                                <ColorPickerButton
                                    color={localProps.style?.color || '#000000'}
                                    onChange={(color) => handleStyleChange('color', color)}
                                    label="Text Color"
                                />
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium">Gradient</label>
                                    <button
                                        onClick={() => {
                                            setUseGradient(false);
                                            handleBackgroundChange(localProps.style?.backgroundColor || '#ffffff');
                                        }}
                                        className="text-sm text-red-500 hover:text-red-700"
                                    >
                                        Clear Gradient
                                    </button>
                                </div>
                                <GradientPicker
                                    value={localProps.style?.background?.toString() || ''}
                                    onChange={handleGradientChange}
                                />
                            </div>
                        )}

                        {/* Component-specific style properties */}
                        {renderSpecificStyleProperties()}

                        {/* Common style properties */}
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <input
                                type="text"
                                placeholder="Border Radius"
                                value={localProps.style?.borderRadius || ""}
                                onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Width"
                                value={localProps.style?.width || ""}
                                onChange={(e) => handleStyleChange("width", e.target.value)}
                                className="p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Height"
                                value={localProps.style?.height || ""}
                                onChange={(e) => handleStyleChange("height", e.target.value)}
                                className="p-2 border rounded"
                            />
                        </div>

                        {/* Spacing Controls */}
                        <div className="mt-4 space-y-4">
                            <h5 className="font-medium text-sm">Spacing</h5>
                            <div className="grid grid-cols-2 gap-4">
                                <SpacingControl
                                    type="margin"
                                    values={{
                                        top: localProps.style?.marginTop?.toString(),
                                        right: localProps.style?.marginRight?.toString(),
                                        bottom: localProps.style?.marginBottom?.toString(),
                                        left: localProps.style?.marginLeft?.toString(),
                                    }}
                                    onChange={handleStyleChange}
                                />
                                <SpacingControl
                                    type="padding"
                                    values={{
                                        top: localProps.style?.paddingTop?.toString(),
                                        right: localProps.style?.paddingRight?.toString(),
                                        bottom: localProps.style?.paddingBottom?.toString(),
                                        left: localProps.style?.paddingLeft?.toString(),
                                    }}
                                    onChange={handleStyleChange}
                                />
                            </div>
                            {/* Quick presets */}
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => {
                                        const newStyle = applySpacingPreset('equal', localProps.style || {});
                                        const newProps = { ...localProps, style: newStyle };
                                        setLocalProps(newProps);
                                        onChange(newProps);
                                    }}
                                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                                >
                                    Equal Spacing (16px)
                                </button>
                                <button
                                    onClick={() => {
                                        const newStyle = applySpacingPreset('content', localProps.style || {});
                                        const newProps = { ...localProps, style: newStyle };
                                        setLocalProps(newProps);
                                        onChange(newProps);
                                    }}
                                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                                >
                                    Content Layout
                                </button>
                                <button
                                    onClick={() => {
                                        const newStyle = applySpacingPreset('reset', localProps.style || {});
                                        const newProps = { ...localProps, style: newStyle };
                                        setLocalProps(newProps);
                                        onChange(newProps);
                                    }}
                                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                                >
                                    Reset Spacing
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional Properties */}
                    <div className="space-y-2 bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold">Additional Properties</h4>
                        <input
                            type="text"
                            name="className"
                            value={localProps.className || ''}
                            onChange={handleChange}
                            placeholder="CSS Classes"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentEditor;