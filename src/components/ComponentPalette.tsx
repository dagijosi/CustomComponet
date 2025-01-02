import React from 'react';
import { ComponentData } from '../types';
import { 
  FiBox, 
  FiType, 
  FiLink, 
  FiImage, 
  FiSquare, 
  FiAlignLeft, 
  FiList,
  FiChevronDown,
  FiCreditCard,
  FiAlertCircle,
  FiTag,
  FiCheckSquare,
  FiToggleLeft,
  FiRadio,
  FiLayout
} from 'react-icons/fi';

const getIconForComponent = (type: string) => {
  const iconProps = { size: 18, className: "text-blue-500" };
  
  switch (type) {
    case 'button':
      return <FiBox {...iconProps} />;
    case 'input':
      return <FiType {...iconProps} />;
    case 'link':
      return <FiLink {...iconProps} />;
    case 'image':
      return <FiImage {...iconProps} />;
    case 'div':
      return <FiSquare {...iconProps} />;
    case 'p':
      return <FiAlignLeft {...iconProps} />;
    case 'textarea':
      return <FiAlignLeft {...iconProps} />;
    case 'select':
      return <FiChevronDown {...iconProps} />;
    case 'h1':
    case 'h2':
      return <FiType {...iconProps} size={20} />;
    case 'ul':
      return <FiList {...iconProps} />;
    case 'card':
      return <FiCreditCard {...iconProps} />;
    case 'alert':
      return <FiAlertCircle {...iconProps} />;
    case 'badge':
      return <FiTag {...iconProps} />;
    case 'checkbox':
      return <FiCheckSquare {...iconProps} />;
    case 'toggle':
      return <FiToggleLeft {...iconProps} />;
    case 'radio':
      return <FiRadio {...iconProps} />;
    case 'section':
      return <FiLayout {...iconProps} />;
    default:
      return <FiBox {...iconProps} />;
  }
};

const ComponentPalette: React.FC<{ onAddComponent: (component: ComponentData) => void }> = ({ onAddComponent }) => {
  const availableComponents: ComponentData[] = [
    { 
      type: 'button', 
      id: 'button-1', 
      props: { 
        text: 'Click me',
        style: {
          backgroundColor: '#3B82F6',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s',
        },
        className: 'hover:bg-blue-600 active:bg-blue-700 shadow-sm',
      } 
    },
    { 
      type: 'input', 
      id: 'input-1', 
      props: { 
        placeholder: 'Type something...',
        type: 'text',
        style: {
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          width: '100%',
          fontSize: '14px',
          transition: 'all 0.2s',
          outline: 'none',
        },
        className: 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
      } 
    },
    { 
      type: 'link', 
      id: 'link-1', 
      props: { 
        text: 'Learn more →',
        href: '#',
        style: {
          color: '#3B82F6',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        },
        className: 'hover:text-blue-700 hover:underline',
      } 
    },
    { 
      type: 'image', 
      id: 'image-1', 
      props: { 
        src: 'https://via.placeholder.com/300x200',
        alt: 'Description',
        style: {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '12px',
          objectFit: 'cover',
        },
        className: 'shadow-md hover:shadow-lg transition-shadow',
      } 
    },
    { 
      type: 'div', 
      id: 'div-1', 
      props: { 
        text: 'Container content',
        style: {
          padding: '24px',
          backgroundColor: '#F9FAFB',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
        },
        className: 'shadow-sm hover:shadow-md transition-shadow',
      } 
    },
    { 
      type: 'p', 
      id: 'p-1', 
      props: { 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        style: {
          lineHeight: '1.6',
          color: '#374151',
          fontSize: '14px',
          margin: '12px 0',
        },
        className: 'text-gray-600',
      } 
    },
    { 
      type: 'textarea', 
      id: 'textarea-1', 
      props: { 
        placeholder: 'Enter your message...',
        text: '',
        style: {
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          width: '100%',
          minHeight: '120px',
          fontSize: '14px',
          lineHeight: '1.5',
          resize: 'vertical',
        },
        className: 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
      } 
    },
    { 
      type: 'select', 
      id: 'select-1', 
      props: { 
        options: ['Select an option', 'Option 1', 'Option 2', 'Option 3'],
        style: {
          padding: '10px 16px',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          backgroundColor: 'white',
          width: '100%',
          fontSize: '14px',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236B7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          backgroundSize: '16px',
        },
        className: 'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
      } 
    },
    {
      type: 'h1',
      id: 'h1-1',
      props: {
        text: 'Main Heading',
        style: {
          fontSize: '32px',
          fontWeight: '700',
          color: '#111827',
          lineHeight: '1.2',
          marginBottom: '16px',
        },
        className: 'tracking-tight',
      }
    },
    {
      type: 'h2',
      id: 'h2-1',
      props: {
        text: 'Section Heading',
        style: {
          fontSize: '24px',
          fontWeight: '600',
          color: '#1F2937',
          lineHeight: '1.3',
          marginBottom: '12px',
        },
        className: 'tracking-tight',
      }
    },
    {
      type: 'card',
      id: 'card-1',
      props: {
        text: 'Card Content',
        style: {
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
        className: 'hover:shadow-lg transition-shadow',
      }
    },
    {
      type: 'alert',
      id: 'alert-1',
      props: {
        text: 'This is an important message!',
        style: {
          padding: '16px',
          backgroundColor: '#FEF2F2',
          color: '#991B1B',
          borderRadius: '8px',
          border: '1px solid #FEE2E2',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        },
        className: 'text-sm',
      }
    },
    {
      type: 'badge',
      id: 'badge-1',
      props: {
        text: 'New',
        style: {
          padding: '2px 8px',
          backgroundColor: '#EFF6FF',
          color: '#1D4ED8',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: '500',
        },
        className: 'inline-block',
      }
    },
    {
      type: 'checkbox',
      id: 'checkbox-1',
      props: {
        text: 'Check me',
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
        },
        className: 'text-sm text-gray-700',
      }
    },
    {
      type: 'radio',
      id: 'radio-1',
      props: {
        text: 'Select me',
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
        },
        className: 'text-sm text-gray-700',
      }
    },
    {
      type: 'toggle',
      id: 'toggle-1',
      props: {
        style: {
          width: '44px',
          height: '24px',
          backgroundColor: '#E5E7EB',
          borderRadius: '9999px',
          position: 'relative',
          cursor: 'pointer',
        },
        className: 'transition-colors',
      }
    },
    {
      type: 'section',
      id: 'section-1',
      props: {
        text: 'Section Content',
        style: {
          padding: '32px',
          backgroundColor: '#F9FAFB',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
        },
        className: 'space-y-4',
      }
    }
  ];

  // Group components by category
  const componentCategories = {
    'Form Elements': ['button', 'input', 'textarea', 'select', 'checkbox', 'radio', 'toggle'],
    'Typography': ['p', 'h1', 'h2', 'link'],
    'Layout': ['div', 'section', 'card'],
    'Media': ['image'],
    'Feedback': ['alert', 'badge'],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-3 sm:p-4 h-[calc(100vh-11rem)] flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Components</h2>
      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        {Object.entries(componentCategories).map(([category, types]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
              {availableComponents
                .filter(comp => types.includes(comp.type))
                .map((component) => (
                  <button
                    key={component.id}
                    className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 
                             rounded-lg border border-gray-200 transition-colors
                             flex items-center gap-2 text-gray-700 font-medium"
                    onClick={() => onAddComponent({ ...component, id: crypto.randomUUID() })}
                  >
                    {getIconForComponent(component.type)}
                    {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentPalette;