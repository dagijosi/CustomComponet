import React, { useState } from 'react';
import { ComponentData } from '../types';
import GradientPicker from './GradientPicker';
import ComponentPreview from './ComponentPreview';
import SpacingControl from './SpacingControl';
import StyleControls from './StyleControls';
import ContentProperties from './ContentProperties';
import SpecificStyleProperties from './SpecificStyleProperties';

interface ComponentEditorProps {
    component: ComponentData;
    onChange: (newProps: any) => void;
    onDelete?: () => void;
}

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
                            <ContentProperties 
                                component={component} 
                                localProps={localProps} 
                                handleChange={handleChange} 
                                onChange={onChange} 
                                setLocalProps={setLocalProps} 
                            />
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
                            <SpecificStyleProperties 
                                component={component} 
                                localProps={localProps} 
                                handleStyleChange={handleStyleChange} 
                            />
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