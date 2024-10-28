import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

class WebSocketService {
    constructor() {
        this.stompClient = null;
        this.subscriptions = new Map();
    }

    connect(userId, onConnected, onError) {
        const socket = new SockJS('http://localhost:8080/ws');  // 백엔드 WebSocket 엔드포인트
        this.stompClient = Stomp.over(socket);
        this.stompClient.debug = null;

        this.stompClient.connect(
            {
                userId: userId
            },
            () => {
                console.log('WebSocket Connected');
                if (onConnected) onConnected();
            },
            (error) => {
                console.error('WebSocket Error:', error);
                if (onError) onError(error);
            }
        );
    }

    disconnect() {
        if (this.stompClient) {
            this.subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
            this.subscriptions.clear();
            this.stompClient.disconnect();
        }
    }

    subscribe(roomId, callback) {
        if (!this.stompClient) {
            console.error('STOMP client not connected');
            return;
        }

        const topic = `/topic/rooms.${roomId}`;
        const subscription = this.stompClient.subscribe(topic, (message) => {
            const messageData = JSON.parse(message.body);
            callback(messageData);
        });

        this.subscriptions.set(roomId, subscription);
        return subscription;
    }

    unsubscribe(roomId) {
        const subscription = this.subscriptions.get(roomId);
        if (subscription) {
            subscription.unsubscribe();
            this.subscriptions.delete(roomId);
        }
    }

    sendMessage(roomId, message) {
        if (!this.stompClient) {
            console.error('STOMP client not connected');
            return;
        }

        this.stompClient.send(
            `/app/chat.sendMessage/${roomId}`,
            {},
            JSON.stringify(message)
        );
    }

    sendJoinMessage(roomId, userId) {
        if (!this.stompClient) return;

        const joinMessage = {
            type: 'JOIN',
            roomId: roomId,
            senderId: userId,
            content: `User ${userId} joined`,
            timestamp: Date.now()
        };

        this.stompClient.send(
            `/app/chat.join/${roomId}`,
            {},
            JSON.stringify(joinMessage)
        );
    }

    sendLeaveMessage(roomId, userId) {
        if (!this.stompClient) return;

        const leaveMessage = {
            type: 'LEAVE',
            roomId: roomId,
            senderId: userId,
            content: `User ${userId} left`,
            timestamp: Date.now()
        };

        this.stompClient.send(
            `/app/chat.leave/${roomId}`,
            {},
            JSON.stringify(leaveMessage)
        );
    }
}

export const webSocketService = new WebSocketService();