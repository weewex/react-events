import EventEmitter from 'eventemitter3';

export const eventEmitter = new EventEmitter();
/* istanbul ignore next */
export const debugMode =
  process.env.NODE_ENV === 'development' &&
  (process.env.REACT_EVENTS_DEBUG === 'true' ||
    process.env.NEXT_PUBLIC_REACT_EVENTS_DEBUG === 'true');
