import React, { useState } from 'react';
import DragContext from './context/DragContext';

type Props = {
    items: {},
    onChange: (data: any[]) => void,
    children: JSX.Element | JSX.Element[]
}

export const DragArea = ({children, items, onChange}: Props) => {
    const [data, setData] = useState(items);

    return (
        <DragContext.Provider value={{data, setData}}>
            {children}
        </DragContext.Provider>
    );
}