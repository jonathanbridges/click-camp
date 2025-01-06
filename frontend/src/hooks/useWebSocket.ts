import { useEffect } from 'react';
import consumer from '../utils/cable';

export function useWebSocket(channelName: string, params = {}, callbacks = {}) {
  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: channelName, ...params },
      {
        connected() {
          console.log(`Connected to ${channelName}`);
          callbacks.connected?.();
        },
        disconnected() {
          console.log(`Disconnected from ${channelName}`);
          callbacks.disconnected?.();
        },
        received(data: any) {
          console.log(`Received data from ${channelName}:`, data);
          callbacks.received?.(data);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [channelName, JSON.stringify(params)]);
} 