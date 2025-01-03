import React, { useState } from 'react';
import { ComponentData } from '../types';
import GradientPicker from './GradientPicker';

import ComponentPreview from './ComponentPreview';
import SpacingControl from './SpacingControl';
import StyleControls from './StyleControls';
import IconSearch from './IconSearch';

interface ComponentEditorProps {
    component: ComponentData;
    onChange: (newProps: any) => void;
    onDelete?: () => void;
}

// type CSSSpacingProperty = 'margin' | 'padding';
// type CSSSpacingSide = 'Top' | 'Right' | 'Bottom' | 'Left';
// // type CSSSpacingKey = `${CSSSpacingProperty}${CSSSpacingSide}`;

// const applySpacingPreset = (
//     preset: 'equal' | 'content' | 'reset',
//     currentStyle: React.CSSProperties
// ): React.CSSProperties => {
//     const style = { ...currentStyle };
//     const sides: CSSSpacingSide[] = ['Top', 'Right', 'Bottom', 'Left'];

//     switch (preset) {
//         case 'equal':
//             sides.forEach(side => {
//                 (style as any)[`margin${side}`] = '16px';
//                 (style as any)[`padding${side}`] = '16px';
//             });
//             break;
//         case 'content':
//             sides.filter(side => side === 'Top' || side === 'Bottom').forEach(side => {
//                 (style as any)[`margin${side}`] = '16px';
//                 (style as any)[`padding${side}`] = '8px';
//             });
//             sides.filter(side => side === 'Right' || side === 'Left').forEach(side => {
//                 (style as any)[`margin${side}`] = '32px';
//                 (style as any)[`padding${side}`] = '16px';
//             });
//             break;
//         case 'reset':
//             sides.forEach(side => {
//                 (style as any)[`margin${side}`] = '0px';
//                 (style as any)[`padding${side}`] = '0px';
//             });
//             break;
//     }
//     return style;
// };

const ComponentEditor: React.FC<ComponentEditorProps> = ({ component, onChange, onDelete }) => {
    const [localProps, setLocalProps] = useState(component.props);
    const [useGradient, setUseGradient] = useState(false);
    const [activeTab, setActiveTab] = useState<'content' | 'style' | 'spacing'>('content');

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | 
        { target: { name: string; value: any } }
    ) => {
        const { name, value } = event.target;
        console.log("ComponentEditor handleChange:", name, value);
        
        // When setting an icon, ensure iconPosition is initialized
        const newProps = {
            ...localProps,
            [name]: value,
            // Initialize iconPosition with proper type when an icon is first added
            ...(name === 'icon' && !localProps.iconPosition && { 
                iconPosition: 'left' as 'left' | 'right' | 'only'
            })
        };
        
        console.log("New props:", newProps);
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
                    <div className="space-y-4">
                        {/* Only show text input if not in icon-only mode */}
                        {localProps.iconPosition !== 'only' && (
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {component.type === 'button' ? 'Button Text' : 'Link Text'}
                                </label>
                                <input
                                    type="text"
                                    name="text"
                                    value={localProps.text || ''}
                                    onChange={handleChange}
                                    placeholder={`${component.type === 'button' ? 'Button' : 'Link'} Text`}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        )}

                        {/* Icon Search */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Icon</label>
                            <IconSearch
                                value={localProps.icon || ''}
                                onChange={(iconName) => handleChange({
                                    target: { name: 'icon', value: iconName }
                                })}
                                position={localProps.iconPosition || 'left'}
                                onPositionChange={(position) => handleChange({
                                    target: { name: 'iconPosition', value: position }
                                })}
                                size={localProps.iconSize || 16}
                                onSizeChange={(size) => handleChange({
                                    target: { name: 'iconSize', value: size }
                                })}
                            />
                        </div>

                        {/* Additional properties for link */}
                        {component.type === 'link' && (
                            <div>
                                <label className="block text-sm font-medium mb-1">URL</label>
                                <input
                                    type="text"
                                    name="href"
                                    value={localProps.href || ''}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        )}
                    </div>
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
            case 'card':
                return (
                    <>
                        <input
                            type="text"
                            name="text"
                            value={localProps.text || ''}
                            onChange={handleChange}
                            placeholder="Card Title"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <textarea
                            name="children"
                            value={localProps.children || ''}
                            onChange={handleChange}
                            placeholder="Card Content"
                            className="w-full p-2 border rounded"
                            rows={3}
                        />
                    </>
                );
            case 'alert':
                return (
                    <>
                        <input
                            type="text"
                            name="text"
                            value={localProps.text || ''}
                            onChange={handleChange}
                            placeholder="Alert Message"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <select
                            name="type"
                            value={localProps.alertType || 'error'}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="error">Error</option>
                            <option value="success">Success</option>
                            <option value="warning">Warning</option>
                            <option value="info">Info</option>
                        </select>
                    </>
                );
            case 'badge':
                return (
                    <input
                        type="text"
                        name="text"
                        value={localProps.text || ''}
                        onChange={handleChange}
                        placeholder="Badge Text"
                        className="w-full p-2 border rounded"
                    />
                );
            case 'checkbox':
            case 'radio':
                return (
                    <>
                        <input
                            type="text"
                            name="text"
                            value={localProps.text || ''}
                            onChange={handleChange}
                            placeholder="Label Text"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="checked"
                                checked={localProps.checked || false}
                                onChange={(e) => handleChange({
                                    target: { name: 'checked', value: e.target.checked }
                                })}
                            />
                            Default Checked
                        </label>
                    </>
                );
            case 'toggle':
                return (
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="checked"
                            checked={localProps.checked || false}
                            onChange={(e) => handleChange({
                                target: { name: 'checked', value: e.target.checked }
                            })}
                        />
                        Default State
                    </label>
                );
            case 'section':
                return (
                    <>
                        <input
                            type="text"
                            name="title"
                            value={localProps.title || ''}
                            onChange={handleChange}
                            placeholder="Section Title"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <textarea
                            name="text"
                            value={localProps.text || ''}
                            onChange={handleChange}
                            placeholder="Section Content"
                            className="w-full p-2 border rounded"
                            rows={3}
                        />
                    </>
                );
            default:
                return null;
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
                <h3 className="font-bold text-lg capitalize">{component.type}</h3>
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
                <div className="w-full lg:w-2/3">
                    {/* Tab Navigation */}
                    <div className="flex border-b mb-4">
                        <button
                            className={`px-4 py-2 font-medium text-sm ${
                                activeTab === 'content' 
                                    ? 'border-b-2 border-blue-500 text-blue-600' 
                                    : 'text-gray-600'
                            }`}
                            onClick={() => setActiveTab('content')}
                        >
                            Content
                        </button>
                        <button
                            className={`px-4 py-2 font-medium text-sm ${
                                activeTab === 'style' 
                                    ? 'border-b-2 border-blue-500 text-blue-600' 
                                    : 'text-gray-600'
                            }`}
                            onClick={() => setActiveTab('style')}
                        >
                            Style
                        </button>
                        <button
                            className={`px-4 py-2 font-medium text-sm ${
                                activeTab === 'spacing' 
                                    ? 'border-b-2 border-blue-500 text-blue-600' 
                                    : 'text-gray-600'
                            }`}
                            onClick={() => setActiveTab('spacing')}
                        >
                            Spacing
                        </button>
                    </div>

                    {/* Content Tab */}
                    {activeTab === 'content' && (
                        <div className="space-y-4 bg-white p-4 rounded-lg border">
                            {renderContentProperties()}
                            <input
                                type="text"
                                name="className"
                                value={localProps.className || ''}
                                onChange={handleChange}
                                placeholder="CSS Classes"
                                className="w-full p-2 border rounded mt-4"
                            />
                        </div>
                    )}

                    {/* Style Tab */}
                    {activeTab === 'style' && (
                        <div className="space-y-4 bg-white p-4 rounded-lg border">
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

                            {useGradient ? (
                                <GradientPicker
                                    value={localProps.style?.background?.toString() || ''}
                                    onChange={handleGradientChange}
                                />
                            ) : (
                                <StyleControls 
                                    style={localProps.style || {}}
                                    onStyleChange={handleStyleChange}
                                />
                            )}

                            {/* Component-specific style properties */}
                            {renderSpecificStyleProperties()}
                        </div>
                    )}

                    {/* Spacing Tab */}
                    {activeTab === 'spacing' && (
                        <div className="space-y-4 bg-white p-4 rounded-lg border">
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComponentEditor;