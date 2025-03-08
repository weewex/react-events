import { renderHook, act } from '@testing-library/react';
import { useListenEvent } from '../src';
import { eventEmitter } from '../src/events/emitter';

jest.mock('../src/events/emitter', () => ({
  eventEmitter: {
    emit: jest.fn(),
    listeners: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  },
}));

describe('useListenEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register the event listener on mount and remove it on unmount', () => {
    const eventName = 'testEvent';
    const handler = jest.fn();

    const { unmount } = renderHook(() => useListenEvent(eventName, handler));

    // Verify that the listener is registered on mount
    expect(eventEmitter.on).toHaveBeenCalledWith(eventName, handler);

    // Unmount the hook to trigger the cleanup effect
    unmount();

    // Verify that the listener is removed on unmount
    expect(eventEmitter.off).toHaveBeenCalledWith(eventName, handler);
  });

  it('should update the listener when eventName or handler changes', () => {
    const initialEvent = 'initialEvent';
    const newEvent = 'newEvent';
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    // Render the hook with initial props
    const { rerender, unmount } = renderHook(
        ({ eventName, handler }) => useListenEvent(eventName, handler),
        {
          initialProps: { eventName: initialEvent, handler: handler1 },
        }
    );

    // The initial registration should be made
    expect(eventEmitter.on).toHaveBeenCalledWith(initialEvent, handler1);

    // Rerender the hook with new props to simulate change
    rerender({ eventName: newEvent, handler: handler2 });

    // The cleanup effect should remove the listener for the old event/handler
    expect(eventEmitter.off).toHaveBeenCalledWith(initialEvent, handler1);
    // And a new registration should be made for the new event/handler
    expect(eventEmitter.on).toHaveBeenCalledWith(newEvent, handler2);

    // Unmount the hook to clean up the new registration
    unmount();
    expect(eventEmitter.off).toHaveBeenCalledWith(newEvent, handler2);
  });
});
