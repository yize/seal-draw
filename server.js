var port,
    service,
    system = require("system"),
    page = require("webpage").create(),
    server = require("webserver").create();
page.paperSize = {
    width : 500,
    height: 300,
    border: 0
};
page.viewportSize = {
    width : 500,
    height: 300,
    border: 0
};
if (system.args.length !== 2) {
    console.log("Usage: server.js <portnumber>");
    phantom.exit(1);
} else {
    port = system.args[1] || 8888;
    service = server.listen(port, {
        keepAlive: true
    }, function (request, response) {
        page.open('http://image.rakuten.co.jp/harumi-inkan/cabinet/inkan/recipt/img62539927.jpg', function (status) {
            setTimeout(function () {
                var pic = page.renderBase64('png');
                var body = '<img src="data:image/png;base64,' + pic + '"/>';
                response.statusCode = 200;
                response.headers = {
                    Cache           : "no-cache",
                    "Content-Type"  : "text/html",
                    Connection      : "Keep-Alive",
                    "Keep-Alive"    : "timeout=5, max=100",
                    "Content-Length": body.length
                };
                response.write(body);
                response.close();
                page.render("test.png");
            }, 200)
        })
    });
    if (service) {
        console.log("Web server running on port " + port);
    } else {
        console.log("Error: Could not create web server listening on port " + port);
        phantom.exit();
    }
}