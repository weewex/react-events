import { renderHook, act } from '@testing-library/react';
import { useEmitEvent } from '../src';
import { eventEmitter } from '../src/events/emitter';

jest.mock('../src/events/emitter', () => ({
  eventEmitter: {
    emit: jest.fn(),
  },
}));

describe('useEmitEvent', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an emit function', () => {
    const { result } = renderHook(() => useEmitEvent('testEvent'));
    expect(typeof result.current.emit).toBe('function');
  });

  it('should call eventEmitter.emit with the provided arguments', () => {
    // Setup: make sure emit returns a falsy value
    (eventEmitter.emit as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => useEmitEvent('testEvent'));

    act(() => {
      result.current.emit('arg1', 'arg2');
    });

    expect(eventEmitter.emit).toHaveBeenCalledWith('testEvent', 'arg1', 'arg2');
  });

  it('should return the value from eventEmitter.emit', () => {
    const emittedValue = 'emitted result';
    (eventEmitter.emit as jest.Mock).mockReturnValue(emittedValue);

    const { result } = renderHook(() => useEmitEvent('normalEvent'));
    let returnValue;
    act(() => {
      returnValue = result.current.emit('data');
    });

    expect(eventEmitter.emit).toHaveBeenCalledWith('normalEvent', 'data');
    expect(returnValue).toBe(emittedValue);
  });

  it('should update the emit function when eventName', () => {
    // Use initial props and later change them using rerender
    const { result, rerender } = renderHook(
        ({ eventName }) => useEmitEvent(eventName),
        {
          initialProps: { eventName: 'firstEvent' },
        }
    );

    const firstEmitFn = result.current.emit;

    // Update eventName and debug
    rerender({ eventName: 'secondEvent' });
    const updatedEmitFn = result.current.emit;
    expect(updatedEmitFn).not.toBe(firstEmitFn);

    // Setup mocks for updated event
    (eventEmitter.emit as jest.Mock).mockReturnValue(true);

    let returnValue;
    act(() => {
      returnValue = updatedEmitFn('newData');
    });

    expect(eventEmitter.emit).toHaveBeenCalledWith('secondEvent', 'newData');
  });
});


describe('emitFunctionFactory (via public API)', () => {
  beforeEach(() => {

    // Mock the eventEmitter so we can spy on its functions
    jest.mock('../src/events/emitter', () => ({
      eventEmitter: {
        emit: jest.fn(),
        listeners: jest.fn(),
      },
    }));

    jest.clearAllMocks();
  });

  it('should return an object with an emit function', () => {
    const { result } = renderHook(() => useEmitEvent('testEvent'));
    expect(typeof result.current.emit).toBe('function');
  });

  it('should return the emitted value', () => {
    // the return value should be what emit returns.
    const emittedValue = 'truthy value';
    (eventEmitter.emit as jest.Mock).mockReturnValue(emittedValue);

    const { result } = renderHook(() => useEmitEvent('normalEvent'));

    let returnValue: any;
    act(() => {
      returnValue = result.current.emit('data');
    });

    expect(eventEmitter.emit).toHaveBeenCalledWith('normalEvent', 'data');
    expect(returnValue).toBe(emittedValue);
  });

});
