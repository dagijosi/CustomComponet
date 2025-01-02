import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ComponentData } from '../types';
import ComponentEditor from './ComponentEditor';

interface EditingAreaProps {
    components: ComponentData[];
    onComponentsChange: (newComponents: ComponentData[]) => void;
}

const EditingArea: React.FC<EditingAreaProps> = ({ components, onComponentsChange }) => {
    const onDragEnd = (result: any) => {
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
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-bold mb-4">Editing Area</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="components">
                    {(provided) => (
                        <div 
                            {...provided.droppableProps} 
                            ref={provided.innerRef} 
                            className="min-h-[200px] border-2 border-dashed border-gray-300 p-4 rounded-lg"
                        >
                            {components.length === 0 && (
                                <div className="text-gray-400 text-center py-8">
                                    Drag components here
                                </div>
                            )}
                            {components.map((component, index) => (
                                <Draggable key={component.id} draggableId={component.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-sm"
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