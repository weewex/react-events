import { useEffect } from 'react';
import { eventEmitter } from '../events/emitter';

type AnyFunction = (...args: any[]) => any;

export function useListenEvent(eventName: string, handler: AnyFunction): void {
  useEffect(() => {
    eventEmitter.on(eventName, handler);

    return () => {
      eventEmitter.off(eventName, handler);
    };
  }, [eventName, handler]);
}
