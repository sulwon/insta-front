// src/hooks/useWebSocket.js
import { useState, useEffect, useCallback } from 'react';
import { webSocketService } from '../services/webSocketService';

const useWebSocket = (userId) => {
    const [isConnected, setIsConnected] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    // WebSocket 연결
    useEffect(() => {
        if (userId) {
            webSocketService.connect(
                userId,
                () => setIsConnected(true),
                (err) => setError(err)
            );

            return () => {
                webSocketService.disconnect();
                setIsConnected(false);
            };
        }
    }, [userId]);

    // 채팅방 입장
    const joinRoom = useCallback((roomId) => {
        if (!isConnected || !userId) return;

        // 이전 채팅방 구독 해제
        if (currentRoom) {
            webSocketService.unsubscribe(currentRoom);
        }

        // 새로운 채팅방 구독
        webSocketService.subscribe(roomId, (message) => {
            setMessages(prev => [...prev, message]);
        });

        // 입장 메시지 전송
        webSocketService.sendJoinMessage(roomId, userId);

        setCurrentRoom(roomId);
        setMessages([]); // 메시지 초기화
    }, [isConnected, userId, currentRoom]);

    // 채팅방 퇴장
    const leaveRoom = useCallback(() => {
        if (currentRoom && userId) {
            webSocketService.sendLeaveMessage(currentRoom, userId);
            webSocketService.unsubscribe(currentRoom);
            setCurrentRoom(null);
            setMessages([]);
        }
    }, [currentRoom, userId]);

    // 메시지 전송
    const sendMessage = useCallback((content) => {
        if (!currentRoom || !userId) return;
    
        const message = {
            type: 'CHAT',
            roomId: currentRoom,
            senderId: Number(userId),  // userId를 숫자로 확실히 변환
            content,
            timestamp: Date.now()
        };
    
        webSocketService.sendMessage(currentRoom, message);
    }, [currentRoom, userId]);
    
    return {
        isConnected,
        currentRoom,
        messages,
        error,
        joinRoom,
        leaveRoom,
        sendMessage
    };
};

export default useWebSocket;