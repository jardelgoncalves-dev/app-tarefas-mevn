import Vue from "vue";
import App from "./components/App.vue";
new Vue ({
    render: function (createElement) {
        return createElement(App);
    }
}).$mount('#app');