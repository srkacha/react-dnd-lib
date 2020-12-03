import React, { useState } from 'react';
import { DragArea, DragItem } from './DragAndDrop';
import users from '../data/users.json';

export const DraggableUserList = () => {
	const [exampleUsers, setExampleUsers] = useState(users);

	return (
		<ul>
			<DragArea items={exampleUsers} onChange={setExampleUsers}>
				{exampleUsers.map((user, i) => (
					<DragItem key={user.id} index={user.id}>
						<li>
							<span>{user.id}</span>
							<span>{user.firstName}</span>
							<span>{user.email}</span>
						</li>
					</DragItem>
				))}
			</DragArea>
		</ul>
	);
};
