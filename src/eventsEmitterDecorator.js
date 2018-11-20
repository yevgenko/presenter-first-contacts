var canEmitEvents = function(obj, events) {
    obj.eventListeners = {};
    events.forEach(function(event) {
        obj.eventListeners[event] = [];
    })
    obj.emit = function(eventName) {
        this.eventListeners[eventName].forEach(function(listener) {
            listener();
        });
    };
    obj.when = function(eventName, listener) {
        obj.eventListeners[eventName].push(listener);
    }
    return obj;
}
