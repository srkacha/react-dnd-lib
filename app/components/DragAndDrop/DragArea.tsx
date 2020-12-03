import React, { useState } from 'react';
import DragContext from './context/DragContext';

type Props = {
    items: {},
    onChange: (data: any[]) => void,
    children: JSX.Element | JSX.Element[]
}

// DragArea acts as a Context Provider and shares the data state 
// adn the drag info state with the encapsulated drag items
export const DragArea = ({children, items, onChange}: Props) => {
    const [dragAndDropInfo, setDragAndDropInfo] = useState({
        draggedItemIndex: null,
        draggedOverIndex: null
    });

    return (
        <DragContext.Provider value={{items, onChange, dragAndDropInfo, setDragAndDropInfo}}>
            <div>
                {children}
            </div>
        </DragContext.Provider>
    );
}