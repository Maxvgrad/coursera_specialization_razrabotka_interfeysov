// const {subscriberEvents} = require("./index");
module.exports = {

    subscriberEvents: new Map(),

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if(!this.subscriberEvents.has(subscriber)) {
            this.subscriberEvents.set(subscriber, {});
        }
        const events = this.subscriberEvents.get(subscriber);
        if (!events.hasOwnProperty(event)) {
            events[event] = [];
        }
        events[event].push(handler);
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        delete this.subscriberEvents.get(subscriber)[event];
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        this.subscriberEvents.forEach((eventHandlers, subscriber) => {
            if (eventHandlers.hasOwnProperty(event)) {
                eventHandlers[event].forEach(handler => {
                    handler.call(subscriber);
                });
            }
        })
        return this;
    }
};
