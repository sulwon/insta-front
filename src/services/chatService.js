const BASE_URL = '/api/dm';  // proxy 설정으로 인해 전체 URL 불필요

export const chatService = {
    // 채팅방 목록 조회
    async getRooms(userId) {
        try {
            const response = await fetch(`${BASE_URL}/rooms?userId=${userId}`);
            if (!response.ok) throw new Error('Failed to fetch rooms');
            return await response.json();
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw error;
        }
    },

    // 새 채팅방 생성
    async createRoom(userId, otherUserId) {
        try {
            const response = await fetch(`${BASE_URL}/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, otherUserId })
            });
            if (!response.ok) throw new Error('Failed to create room');
            return await response.json();
        } catch (error) {
            console.error('Error creating room:', error);
            throw error;
        }
    },

    // 채팅방 나가기
    async leaveRoom(roomId, userId) {
        try {
            const response = await fetch(`${BASE_URL}/rooms/${roomId}?userId=${userId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to leave room');
            return true;
        } catch (error) {
            console.error('Error leaving room:', error);
            throw error;
        }
    }
};