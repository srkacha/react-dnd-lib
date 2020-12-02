import React, { useContext } from 'react';
import DragContext from './context/DragContext';

const dragItemStyle = {
    padding: "5px",
    marginBottom: "1px",
    borderStyle: "solid",
    listStyleType: "none",
    borderRadius: '5px'
}

type Props = {
    index: any,
    children: JSX.Element | JSX.Element[]
}

export const DragItem = ({index, children}: Props) => {
    const {items, onChange, dragAndDropInfo, setDragAndDropInfo } = useContext(DragContext);

    const onDragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
        // Setting the idex of dragged data
        setDragAndDropInfo({
            ...dragAndDropInfo,
            draggedItemIndex: index
        });
    };

    const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) =>{
        setDragAndDropInfo({
            ...dragAndDropInfo,
            draggedOverIndex: index
        });
    };

    const onDropHandler = () => {
        const dataCopy = [...items];

        // Filtering the array data to remove dragged element from original position
        const filteredData = dataCopy.filter((item) => {
            return item.id !== dragAndDropInfo.draggedItemIndex;
        });

        // Getting the value of the dragged item
        const [draggedItem] = dataCopy.filter((item) => {
            return item.id === dragAndDropInfo.draggedItemIndex;
        });

        // Finding a new index for the item
        const itemToReplaceIndex = filteredData.findIndex( (item) => {
            return item.id === dragAndDropInfo.draggedOverIndex}
        );

        // If the item is found
        if (itemToReplaceIndex !== -1){
             // Inserting the dragged item to the new position
            const reorderedData = [
                ...filteredData.slice(0, itemToReplaceIndex),
                draggedItem,
                ...filteredData.slice(itemToReplaceIndex)];

            onChange(reorderedData);
        }
    }

    return (
        <div draggable={true}
             onDragStart={onDragStartHandler}
             onDragOver={onDragOverHandler}
             onDrop={onDropHandler}
             key={index}
             style={dragItemStyle}>
            {children}
        </div>
    );
}