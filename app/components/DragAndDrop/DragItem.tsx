import React, { useContext } from 'react';
import DragContext from './context/DragContext';

type Props = {
    children: JSX.Element | JSX.Element[]
}

export const DragItem = ({children}: Props) => {
    const { data, setData } = useContext(DragContext);

    return (
        <div>
            {children}
        </div>
    );
}