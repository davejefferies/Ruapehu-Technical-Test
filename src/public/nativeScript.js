var timer;

function nativeJS() {
    document.getElementById("reset").addEventListener("click", function(ev) {
        ev.preventDefault();
        document.getElementById("input").value = '';
        if (!timer)
            run();
    });
    document.getElementById("submit").addEventListener("click", function(ev) {
        ev.preventDefault();
        if (timer)
            clearInterval(timer);
            document.getElementById("output").innerHTML = nativeQuery(false, document.getElementById("input").value);
    });
    run();
}

function run() {
    let num = true;
    document.getElementById("output").innerHTML = nativeQuery(num);
    timer = setInterval(() => {
        if (num) {
            num = 59;
        } else {
            num = !num;
            document.getElementById("output").innerHTML = nativeQuery(num);
        }
    }, 5000);
}

function nativeQuery(num, custom) {
    var http = new XMLHttpRequest();
    http.open( "GET", `api/v1/${custom ? 'custom-' : ''}query?num=${num ? 59 : 58}&icon=${num ? 1 : 2}&custom=${custom ? encodeURI(custom) : ''}`, false );
    http.send( null );
    return JSON.parse(http.responseText).result;
}