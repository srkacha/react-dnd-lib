import React, { useContext } from 'react';
import DragContext from './context/DragContext';

// Some basic DragItem style
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

// Drag items act as a Context Consumers and use the provided data array to 
// update the array order when drag and drop operations are performed
export const DragItem = ({index, children}: Props) => {
    const {items, onChange, dragAndDropInfo, setDragAndDropInfo } = useContext(DragContext);

    const onDragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
        // Setting the index of dragged data
        setDragAndDropInfo({
            ...dragAndDropInfo,
            draggedItemIndex: index
        });
    };

    const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) =>{
        // Setting the index of data we are currently hovering over
        setDragAndDropInfo({
            ...dragAndDropInfo,
            draggedOverIndex: index
        });

        // Preventing the default onDragOver action because it canceles 
        // the drop event if not prevented
        event.preventDefault();
    };

    const onDropHandler = () => {
        // Copying the original data array
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

        // If the index is found
        if (itemToReplaceIndex !== (-1)){
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