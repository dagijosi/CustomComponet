import React from "react";
import { ComponentData } from "../types";
import IconSearch from "./IconSearch";

interface ContentPropertiesProps {
  component: ComponentData;
  localProps: any;
  handleChange: (event: any) => void;
  onChange: (newProps: any) => void;
  setLocalProps: (newProps: any) => void;
}

const ContentProperties: React.FC<ContentPropertiesProps> = ({
  component,
  localProps,
  handleChange,
}) => {
  const renderTextInput = (label: string, name: string, placeholder: string) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={localProps[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
    </div>
  );

  const renderTextarea = (label: string, name: string, placeholder: string) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={localProps[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
    </div>
  );

  const renderCheckbox = (label: string, name: string) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="checkbox"
        name={name}
        checked={localProps[name] || false}
        onChange={handleChange}
        className="p-2 border rounded"
      />
    </div>
  );

  const renderNumberInput = (label: string, name: string, placeholder: string) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="number"
        name={name}
        value={localProps[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
    </div>
  );

  const renderSelectOptions = () => (
    <div>
      <label className="block text-sm font-medium mb-1">Options</label>
      <textarea
        name="options"
        value={localProps.options?.join("\n") || ""}
        onChange={(e) =>
          handleChange({
            target: {
              name: "options",
              value: e.target.value.split("\n"),
            },
          })
        }
        placeholder="Enter options here, one per line"
        className="w-full p-2 border rounded"
      />
    </div>
  );

  const renderContentProperties = () => {
    switch (component.type) {
      case "button":
      case "link":
        return (
          <div className="space-y-4">
            {localProps.iconPosition !== "only" &&
              renderTextInput(
                component.type === "button" ? "Button Text" : "Link Text",
                "text",
                component.type === "button" ? "Button Text" : "Link Text"
              )}
            <div>
              <label className="block text-sm font-medium mb-1">Icon</label>
              <IconSearch
                value={localProps.icon || ""}
                onChange={(iconName) =>
                  handleChange({
                    target: { name: "icon", value: iconName },
                  })
                }
                position={localProps.iconPosition || "left"}
                onPositionChange={(position) =>
                  handleChange({
                    target: { name: "iconPosition", value: position },
                  })
                }
                size={localProps.iconSize || 16}
                onSizeChange={(size) =>
                  handleChange({
                    target: { name: "iconSize", value: size },
                  })
                }
              />
            </div>
            {component.type === "link" &&
              renderTextInput("URL", "href", "https://example.com")}
          </div>
        );
      case "input":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Input Type</label>
              <select
                name="type"
                value={localProps.type || "text"}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="text">Text</option>
                <option value="password">Password</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="datetime-local">Datetime Local</option>
                <option value="time">Time</option>
                <option value="url">URL</option>
              </select>
            </div>
            {renderTextInput("Placeholder", "placeholder", "Placeholder")}
            {renderTextInput("Value", "value", "Value")}
          </div>
        );
      case "image":
        return (
          <div className="space-y-4">
            {renderTextInput("Image URL", "src", "https://example.com/image.jpg")}
            {renderTextInput("Alt Text", "alt", "Alt Text")}
            {renderNumberInput("Width", "width", "Width")}
            {renderNumberInput("Height", "height", "Height")}
          </div>
        );
      case "div":
      case "p":
      case "section":
      case "card":
      case "alert":
      case "badge":
      case "blockquote":
        return (
          <div className="space-y-4">
            {renderTextarea("Text", "text", "Enter text here")}
     
          </div>
        );
      case "textarea":
        return (
          <div className="space-y-4">
            {renderTextInput("Placeholder", "placeholder", "Placeholder")}
            {renderTextarea("Text", "text", "Enter text here")}
            {renderNumberInput("Rows", "rows", "Rows")}
          </div>
        );
      case "select":
        return (
          <div className="space-y-4">
            {renderSelectOptions()}
            {renderTextInput("Default Value", "defaultValue", "Default Value")}
          </div>
        );
      case "checkbox":
      case "radio":
      case "toggle":
        return (
          <div className="space-y-4">
            {renderTextInput(
              `${component.type.charAt(0).toUpperCase() + component.type.slice(1)} Text`,
              "text",
              `${component.type.charAt(0).toUpperCase() + component.type.slice(1)} Text`
            )}
            {renderCheckbox("Checked", "checked")}
          </div>
        );
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return (
          <div className="space-y-4">
            {renderTextInput("Heading", "text", "Heading")}
            {renderTextInput("Class Name", "className", "Class Name")}
          </div>
        );
      case "ul":
      case "ol":
        return (
          <div className="space-y-4">
            {renderTextarea("List Items", "items", "Enter list items here")}
          
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderContentProperties()}</>;
};

export default ContentProperties;
