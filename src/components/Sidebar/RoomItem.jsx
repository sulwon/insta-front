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

function RoomItem({ room, currentUserId }) {
  const otherParticipants = room.participants
    .filter(p => p.id != currentUserId)
    .map(p => p.username)
    .join(', ');

  return (
    <RoomItemContainer>
      <ProfileImage />
      <RoomInfo>
        <RoomName>{otherParticipants || `Room ${room.id}`}</RoomName>
      </RoomInfo>
    </RoomItemContainer>
  );
}

export default RoomItem;