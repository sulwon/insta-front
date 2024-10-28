// RoomList.jsx
import React from 'react';
import styled from 'styled-components';
import RoomItem from './RoomItem';

const ListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
`;

function RoomList({ rooms, currentUserId, onRoomSelect }) {
    return (
        <ListContainer>
            {rooms.map(room => (
                <RoomItem 
                    key={room.id}
                    room={room}
                    currentUserId={currentUserId}
                    onClick={() => onRoomSelect(room.id)}  // 클릭 이벤트 핸들러 추가
                />
            ))}
        </ListContainer>
    );
}

export default RoomList;