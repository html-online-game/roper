var originalEval = eval;
evalx = function () {
  arguments[0] = arguments[0].replace(
    "aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw==",
    "I3ViZzIzNQ=="
  );
  arguments[0] = arguments[0].replace("'location'", "'xlocation'");
  return originalEval.apply(this, arguments);
};

navigator.sendBeacon = function () {};

WebSocket = function () {};

xlocation = new Proxy(location, {
  get: function (target, property, receiver) {
    let targetObj = target[property];
    if (typeof targetObj == "function") {
      return (...args) => target[property].apply(target, args);
    } else {
      if (property == "host" || property == "hostname") {
        return "localhost";
      }
      if (property == "href") {
        return "https://localhost/";
      }
      if (property == "origin") {
        return "https://localhost/";
      }
      return targetObj;
    }
  },
  set: function (target, property, receiver) {
    return true;
  },
});

xwindow = new Proxy(window, {
  get: function (target, property, receiver) {
    if (typeof target[property] == "function") {
      return (...args) => target[property].apply(target, args);
    } else {
      if (property == "location") {
        return target["xlocation"];
      }

      return target[property];
    }
  },
});
