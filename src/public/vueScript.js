function vueJS() {
    Vue.use(VueResource);
    var vm = new Vue({
        el: '#container',
        data: {
            num: 59,
            output: '',
            custom: '',
            timer: null
        },
        methods: {
            loadData: function() {
                this.$http.get(`api/v1/query?num=${this.num ? 59 : 58}&icon=${this.num ? 1 : 2}`).then(response => {
                    if (response.body.result)
                        this.output = response.body.result;
                }, error => {
                    console.error(error);
                });
            },
            loadCustom: function() {
                this.$http.get(`api/v1/custom-query?custom=${encodeURI(this.custom)}`).then(response => {
                    if (this.timer)
                        clearInterval(this.timer);
                    this.output = response.body.result;
                }, error => {
                    console.error(error);
                });
            },
            start: function() {
                this.num = 59;
                this.loadData();
                this.timer = setInterval(() => {
                    this.num = !this.num;
                    this.loadData();
                }, 5000);
            },
            reset: function(e) {
                e.preventDefault();
                if (this.custom) {
                    this.custom = '';
                    this.start();
                }
            },
            submit: function(e) {
                e.preventDefault();
                this.loadCustom();
            }
        },
        mounted: function () {
            this.start();
        }
    });
}