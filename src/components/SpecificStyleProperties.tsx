import React from 'react';
import { ComponentData } from '../types';

interface SpecificStylePropertiesProps {
    component: ComponentData;
    localProps: any;
    handleStyleChange: (property: string, value: string) => void;
}

const SpecificStyleProperties: React.FC<SpecificStylePropertiesProps> = ({ component, localProps, handleStyleChange }) => {
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
                        <select
                            value={localProps.style?.boxSizing || ""}
                            onChange={(e) => handleStyleChange("boxSizing", e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="content-box">Content Box</option>
                            <option value="border-box">Border Box</option>
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
        <>
            {renderSpecificStyleProperties()}
        </>
    );
};

export default SpecificStyleProperties;
