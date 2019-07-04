"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefBox = useRefBox;
exports.useCancelableTimeout = useCancelableTimeout;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

  _react["default"].useEffect(function () {
    //Auto cancel on unmount
    return cancel;
  }, [cancel]);

  return _react["default"].useMemo(function () {
    return [execute, cancel];
  }, [execute, cancel]);
}

var _default = useCancelableTimeout;
exports["default"] = _default;
