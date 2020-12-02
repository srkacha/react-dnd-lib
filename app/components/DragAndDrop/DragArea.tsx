import React, { useState } from 'react';
import DragContext from './context/DragContext';

type Props = {
    items: {},
    onChange: (data: any[]) => void,
    children: JSX.Element | JSX.Element[]
}

export const DragArea = ({children, items, onChange}: Props) => {
    const [dragAndDropInfo, setDragAndDropInfo] = useState({
        draggedItemIndex: null,
        draggedOverIndex: null
    });

    const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        // Preventing the default behaviour because it canceles the drop
        event.preventDefault();


    }

    const onDropHandler = () => {

    }

    return (
        <DragContext.Provider value={{items, onChange, dragAndDropInfo, setDragAndDropInfo}}>
            <div onDragOver={onDragOverHandler}
                 onDrop={onDropHandler}>
                {children}
            </div>
        </DragContext.Provider>
    );
}