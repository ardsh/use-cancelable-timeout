"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefBox = useRefBox;
exports.useCancelableTimeout = useCancelableTimeout;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function useRefBox(value) {
  var ref = _react["default"].useRef(value);

  _react["default"].useEffect(function () {
    ref.current = value;
  }, [value]);

  return ref;
}

function useCancelableTimeout(callback, timeout) {
  var timer = _react["default"].useRef();

  var savedCallback = useRefBox(callback);
  var savedTimeout = useRefBox(timeout);

  var execute = _react["default"].useCallback(function () {
    function tick() {
      savedCallback.current();
    }

    timer.current = setTimeout(tick, savedTimeout.current);
  }, [savedTimeout, savedCallback]);

  var cancel = _react["default"].useCallback(function () {
    clearTimeout(timer.current);
  }, []);

  return _react["default"].useMemo(function () {
    return [execute, cancel];
  }, [execute, cancel]);
}

var _default = useCancelableTimeout;
exports["default"] = _default;
