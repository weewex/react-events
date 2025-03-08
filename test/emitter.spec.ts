import { eventEmitter } from '../src/events/emitter';

describe('eventEmitter', () => {

  afterEach(() => {
    eventEmitter.removeAllListeners();
  });

  it('should be an instance of EventEmitter', () => {
    expect(eventEmitter.constructor.name).toBe('EventEmitter');
  });

  it('should call event listeners when an event is emitted', () => {
    const callback = jest.fn();
    eventEmitter.on('testEvent', callback);

    eventEmitter.emit('testEvent', 'data1', 'data2');

    expect(callback).toHaveBeenCalledWith('data1', 'data2');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call removed event listeners', () => {
    const callback = jest.fn();
    eventEmitter.on('testEvent', callback);
    eventEmitter.off('testEvent', callback);

    eventEmitter.emit('testEvent', 'data');

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call a once-registered listener only one time', () => {
    const callback = jest.fn();
    eventEmitter.once('testEvent', callback);

    eventEmitter.emit('testEvent', 'data');
    eventEmitter.emit('testEvent', 'data');

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should return an array of listeners for a given event', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventEmitter.on('testEvent', callback1);
    eventEmitter.on('testEvent', callback2);

    const listeners = eventEmitter.listeners('testEvent');
    expect(listeners).toEqual(expect.arrayContaining([callback1, callback2]));
  });
});
