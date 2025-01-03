import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ComponentData } from '../types';
import ComponentEditor from './ComponentEditor';

interface EditingAreaProps {
    components: ComponentData[];
    onComponentsChange: (newComponents: ComponentData[]) => void;
}

const EditingArea: React.FC<EditingAreaProps> = ({ components, onComponentsChange }) => {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(components);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        onComponentsChange(items);
    };

    const handleComponentChange = (id: string, newProps: any) => {
        const updatedComponents = components.map(c => 
            c.id === id ? { ...c, props: newProps } : c
        );
        onComponentsChange(updatedComponents);
    };

    const handleDeleteComponent = (id: string) => {
        const updatedComponents = components.filter(c => c.id !== id);
        onComponentsChange(updatedComponents);
    };

    return (
        <div className="p-2 sm:p-4 border rounded-lg bg-white dark:bg-gray-800 h-[calc(100vh-11rem)] flex flex-col">
            <h2 className="text-lg font-bold mb-2">Editing Area</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="components" type="COMPONENT">
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps} 
                            className="flex-1 border-2 border-dashed border-gray-300 dark:border-gray-600 p-2 sm:p-4 rounded-lg overflow-y-auto"
                        >
                            {components.length === 0 && (
                                <div className="text-gray-400 dark:text-gray-500 text-center py-8">
                                    Drag components here
                                </div>
                            )}
                            {components.map((component, index) => (
                                <Draggable 
                                    key={component.id} 
                                    draggableId={component.id} 
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="border rounded-lg p-4 mb-4 bg-gray-50 dark:bg-gray-700 shadow-sm"
                                        >
                                            <ComponentEditor 
                                                component={component} 
                                                onChange={(newProps) => handleComponentChange(component.id, newProps)}
                                                onDelete={() => handleDeleteComponent(component.id)}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default EditingArea;