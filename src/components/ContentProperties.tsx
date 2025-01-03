import React from 'react';
import { ComponentData } from '../types';
import IconSearch from './IconSearch';

interface ContentPropertiesProps {
    component: ComponentData;
    localProps: any;
    handleChange: (event: any) => void;
    onChange: (newProps: any) => void;
    setLocalProps: (newProps: any) => void;
}

const ContentProperties: React.FC<ContentPropertiesProps> = ({ component, localProps, handleChange }) => {
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
            // ...existing code for other component types...
            default:
                return null;
        }
    };

    return (
        <>
            {renderContentProperties()}
        </>
    );
};

export default ContentProperties;
