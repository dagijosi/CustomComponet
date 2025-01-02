import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FiSun, FiMoon, FiSave, FiPlus } from 'react-icons/fi';
import ComponentPalette from './components/ComponentPalette';
import EditingArea from './components/EditingArea';
import CodeOutput from './components/CodeOutput';
import { ComponentData } from './types';

function App() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [showCode, setShowCode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleAddComponent = (component: ComponentData) => {
    setComponents([...components, component]);
  };

  const handleComponentsChange = (newComponents: ComponentData[]) => {
    setComponents(newComponents);
  };

  const handleSaveTemplate = () => {
    const template = {
      components,
      version: '1.0',
      savedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'component-template.json';
    a.click();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-200"
              >
                {showMobileMenu ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>

              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                Component Builder
              </h1>
              
              <nav className="hidden md:flex space-x-4">
                <button 
                  onClick={() => setShowCode(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    !showCode 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  Editor
                </button>
                <button 
                  onClick={() => setShowCode(true)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    showCode 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  Code
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={handleSaveTemplate}
                className="hidden md:flex px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                <FiSave className="mr-2" />
                <span>Save Template</span>
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-700 dark:text-gray-200"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t dark:border-gray-700 py-2">
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => {
                    setShowCode(false);
                    setShowMobileMenu(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    !showCode ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
                  }`}
                >
                  Editor
                </button>
                <button 
                  onClick={() => {
                    setShowCode(true);
                    setShowMobileMenu(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    showCode ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="px-3 py-2 text-left text-sm font-medium text-gray-600"
                >
                  <FiSave className="inline mr-2" />
                  Save Template
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {!showCode ? (
          <div className="relative flex flex-col md:flex-row gap-6">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg"
            >
              <FiPlus size={24} />
            </button>

            {/* Left Sidebar - Component Palette */}
            <div className={`
              fixed md:static inset-0 z-40 bg-gray-50 dark:bg-gray-900 md:bg-transparent
              w-full md:w-64 flex-shrink-0 transform transition-transform duration-300
              ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
              <div className="h-full overflow-y-auto p-4 md:p-0">
                <div className="sticky top-24">
                  <div className="flex justify-between items-center md:hidden mb-4">
                    <h2 className="text-lg font-semibold">Components</h2>
                    <button onClick={() => setShowSidebar(false)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <ComponentPalette onAddComponent={(component) => {
                    handleAddComponent(component);
                    setShowSidebar(false);
                  }} />
                </div>
              </div>
            </div>

            {/* Main Content - Editing Area */}
            <div className="flex-1">
              <EditingArea 
                components={components} 
                onComponentsChange={handleComponentsChange}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 md:p-6">
            <CodeOutput components={components} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t py-4 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              Built with React & Tailwind CSS
            </p>
            <div className="flex gap-4">
              <button className="text-sm text-gray-600 dark:text-gray-400">
                Documentation
              </button>
              <button className="text-sm text-gray-600 dark:text-gray-400">
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;