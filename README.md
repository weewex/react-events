# @weewex/react-events

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Install

```bash
npm install @weewex/react-events
```

## API

## Debugging

### How to

> The debug message will appear in devtools console when an event has been emitted

Will work only if `NODE_ENV` is set to development in .env

```dotenv
NODE_ENV=development
```

Set any of these to true

```dotenv
REACT_EVENTS_DEBUG=true
NEXT_PUBLIC_REACT_EVENTS_DEBUG=true
```

## useEmitEvent

### Description
The `useEmitEvent` hook provides an `emit` function that allows you to trigger an event via a shared event emitter. Under the hood, it uses an internal helper to create an emit function bound to a specific event name. Optionally, it can operate in debug mode; when enabled, if the event emitter's `emit` call returns a truthy value, the hook returns the current listeners for that event.

### Signature
```ts
useEmitEvent(eventName)
```

### Parameters

- **`eventName`** (`string`):  
  The name of the event that you want to emit. This string is passed to the event emitter to identify which event is being triggered.

### Return Value
An object with a single property:
- **`emit`** (`(...args: any[]) => any`):  
  A function that, when called, emits the event with the provided arguments. The function returns:
    - true if there were any handlers called, false if none.

### Example Usage

```tsx
import React from 'react';
import { useEmitEvent } from './useEmitEvent';

function MyComponent() {
  // Create an emit function for the "dataUpdate" event
  const { emit } = useEmitEvent('dataUpdate');

  const handleClick = () => {
    // Emit the event with some data
    const status = emit({ id: 1, value: 'sample data' });
    console.log('Did call attached handlers:', status);
  };

  return <button onClick={handleClick}>Emit Event</button>;
}

export default MyComponent;
```

---

## useListenEvent

### Description
The `useListenEvent` hook registers an event listener on a shared event emitter. It sets up the listener when the component mounts and automatically cleans it up when the component unmounts. Additionally, if the event name or handler changes, the hook updates the listener accordingly.

### Signature
```ts
useListenEvent(eventName, handler)
```

### Parameters

- **`eventName`** (`string`):  
  The name of the event to listen for. When this event is emitted, the provided handler will be executed.

- **`handler`** (`(...args: any[]) => any`):  
  The callback function that will be invoked when the event is emitted. This function receives any arguments passed during the event emission.

### Return Value
This hook does not return any value. Its sole purpose is to register and unregister the event listener as a side effect.

### Example Usage

```tsx
import React, { useState } from 'react';
import { useListenEvent } from './useListenEvent';

function MyComponent() {
  const [message, setMessage] = useState('');

  // Register a listener for the "messageReceived" event
  useListenEvent('messageReceived', (data) => {
    setMessage(data);
  });

  return (
    <div>
      <p>Latest Message: {message}</p>
    </div>
  );
}

export default MyComponent;
```

---

## Summary

- **`useEmitEvent`**  
  Use this hook when you need to trigger an event.

- **`useListenEvent`**  
  Use this hook to subscribe to events. It handles the registration and cleanup of event listeners, ensuring that your components remain in sync with the event emitter's state.

These hooks provide a convenient interface for event-based communication in React applications using a shared event emitter.



[build-img]:https://github.com/weewex/react-events/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/weewex/react-events/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/@weewex/react-events
[downloads-url]:https://www.npmtrends.com/@weewex/react-events
[npm-img]:https://img.shields.io/npm/v/@weewex/react-events
[npm-url]:https://www.npmjs.com/package/@weewex/react-events
[issues-img]:https://img.shields.io/github/issues/weewex/react-events
[issues-url]:https://github.com/weewex/react-events/issues
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
