import Vue from 'vue'
import axios from 'axios'

var app = new Vue({
    el: "#app",
    data: {
        isErrorVisible: false,
        errorMessage: "",
        logdata: []
    },
    mounted() {
        axios.get("/Log")
            .then((response) => {
                this.isErrorVisible = false;
                this.logdata = response.data;
                console.debug("loaded " + response.data.length + " items.");
            })
            .catch((error) => {
                this.isErrorVisible = true;
                this.errorMessage = error.response.data;
                console.log(this);
                console.log(error);
            });
    }
});