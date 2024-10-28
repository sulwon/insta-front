import React from 'react';
import styled from 'styled-components';

const RoomItemContainer = styled.div`
  padding: 8px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fafafa;
  }

  &.active {
    background-color: #efefef;
  }
`;

const ProfileImage = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #dbdbdb;
  margin-right: 12px;
`;

const RoomInfo = styled.div`
  flex: 1;
`;

const RoomName = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

// RoomItem.jsx
function RoomItem({ room, currentUserId, onClick }) {  // onClick prop 추가
  const otherParticipants = room.participants
    ? room.participants
        .filter(p => p.id !== Number(currentUserId))  // currentUserId를 숫자로 변환
        .map(p => p.username)
        .join(', ')
    : `Room ${room.id}`;

  return (
    <RoomItemContainer onClick={onClick}>  {/* onClick 이벤트 추가 */}
      <ProfileImage />
      <RoomInfo>
        <RoomName>{otherParticipants || `Room ${room.id}`}</RoomName>
      </RoomInfo>
    </RoomItemContainer>
  );
}

export default RoomItem;
