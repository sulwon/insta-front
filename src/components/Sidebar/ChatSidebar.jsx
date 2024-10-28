import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RoomList from './RoomList';
import edit from '../../assets/images/edit.png';

const SidebarContainer = styled.div`
  width: 350px;
  height: 100vh;
  border-right: 1px solid #dbdbdb;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Username = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;

  input {
    padding: 5px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    margin-right: 8px;
  }
`;

const NewMessageButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

function ChatSidebar() {
    const [userId, setUserId] = useState('');
    const [rooms, setRooms] = useState([]);

    const loadRooms = async () => {
        try {
            const response = await fetch(`/api/dm/rooms?userId=${userId}`);
            const data = await response.json();
            setRooms(data);
        } catch (error) {
            console.error('Error loading rooms:', error);
        }
    };

    const createRoom = async () => {
        const otherUserId = prompt('Enter the ID of the user you want to chat with:');
        if (!otherUserId || !userId) return;

        try {
            const response = await fetch('/api/dm/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: Number(userId),
                    otherUserId: Number(otherUserId)
                })
            });

            if (response.ok) {
                loadRooms();
            }
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            loadRooms();
        }
    }, [userId]);

    return (
        <SidebarContainer>
            <SidebarHeader>
                <Username>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                    />
                    <button onClick={loadRooms}>Load</button>
                </Username>
                <NewMessageButton src={edit} alt="New Message" onClick={createRoom} />
            </SidebarHeader>
            <RoomList rooms={rooms} currentUserId={userId} />
        </SidebarContainer>
    );
}

export default ChatSidebar;