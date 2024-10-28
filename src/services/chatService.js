// chatService.js
// const BASE_URL = '/api/dm';  // 기존 코드 주석 처리
const BASE_URL = 'http://192.168.10.45:8080/api/dm';  // 실제 서버 주소로 변경

export const chatService = {
    // 채팅방 목록 조회
    async getRooms(userId) {
        try {
            const response = await fetch(`${BASE_URL}/rooms?userId=${userId}`, {
                // CORS 관련 설정 추가
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
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
                credentials: 'include',  // CORS 설정 추가
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
                method: 'DELETE',
                credentials: 'include'  // CORS 설정 추가
            });
            if (!response.ok) throw new Error('Failed to leave room');
            return true;
        } catch (error) {
            console.error('Error leaving room:', error);
            throw error;
        }
    }
};
// 테스트 코드
if (typeof module !== 'undefined' && require.main === module) {
    (async () => {
        try {
            const rooms = await chatService.getRooms(1);
            console.log('Loaded rooms:', rooms);
        } catch (error) {
            console.error('Error in test:', error);
        }
    })();
}