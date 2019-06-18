# use-cancelable-timeout

[![npm version](http://img.shields.io/npm/v/use-cancelable-timeout.svg?style=flat)](https://npmjs.org/package/use-cancelable-timeout "View this project on npm")
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

A react hook for executing a function after a timeout, with an option to cancel
it.

### Install

```
npm install use-cancelable-timeout
```

&nbsp;

### Usage

```js
import useCancelableTimeout from "use-cancelable-timeout";

function SimpleExample() {
  const [message, setMessage] = useState("Not hovered");

  const [onPointerEnter, onPointerLeave] = useCancelableTimeout(
    () => setMessage("Hovered for 1 second!"),
    1000,
  );

  return (
    <div onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      {message}
    </div>
  );
}
```

&nbsp;

### License

MIT © [ardsh](https://github.com/ardsh)
