import { useMemo } from 'react';
import { eventEmitter } from '../events/emitter';
import { isDebugMode } from '../events/debug';

type EmitReturn = boolean;
type EmitFunction = (...args: any[]) => EmitReturn;

function emitFunctionFactory(eventName: string): EmitFunction {
  return (...args: any[]): EmitReturn => {
    /* istanbul ignore next */
    if (
      isDebugMode() &&
      console &&
      typeof console.groupCollapsed === 'function' &&
      eventEmitter.listeners(eventName).length
    ) {
      console.groupCollapsed('React Events - event emitted:', eventName);
      console.log('Sent arguments:', args);
      console.log('To handlers:', eventEmitter.listeners(eventName));
      console.groupEnd();
    }

    return eventEmitter.emit(eventName, ...args);
  };
}

export function useEmitEvent(eventName: string): { emit: EmitFunction } {
  return useMemo(() => {
    return { emit: emitFunctionFactory(eventName) };
  }, [eventName]);
}
