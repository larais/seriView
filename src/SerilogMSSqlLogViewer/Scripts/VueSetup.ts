import Vue from 'vue';

var app = new Vue({
    el: "#app",
    data: {
        logEntries: [
            {
                id: 123,
                message: "some message",
                timestamp: new Date()
            },
            {
                id: 4534,
                message: "message 222",
                timestamp: new Date()
            }
        ]
    }
});