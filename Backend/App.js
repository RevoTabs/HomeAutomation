const Koa = require("koa");
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser");
const fs = require('fs');
const app = new Koa();
const router = new Router();

/**
 * Used for routing
 */
app.use(bodyParser())
    .use(router.allowedMethods())
    .use(router.routes());

/**
 * Testing hello world on the frontpage localhost:8080
 */
app.use(async ctx => {
    ctx.body = "Hello World!";
});

/**
 * Returns the data from 'devices.json'
 */

router.get("/devices", ctx => {
    ctx.response.body = JSON.parse(fs.readFileSync('devices.json','utf8'));
    ctx.response.status = 200;
});

/**
 * Reads 'devices.json', adds the request body and writes it back to 'devices.json'
 */

router.post("/devices", ctx => {
    let deviceList = JSON.parse(fs.readFileSync('devices.json','utf8'));

    if(!isIdentifierInList(ctx.request.identifier)) {
        deviceList.push(ctx.request.body);
        fs.writeFileSync("devices.json", JSON.stringify(deviceList));
        ctx.response.status = 201;
    } else {
        ctx.response.status = 410;
    }
});

/**
 * Checks if a given identifier is present in the json file.
 * @param identifier that is checked if it's in the file.
 * @returns {boolean} if identifier is in the file or not
 */
function isIdentifierInList(identifier) {
    let deviceList = JSON.parse(fs.readFileSync('devices.json','utf8'));
    for (let device in deviceList.devices) {
        if(identifier === device.identifier) {
            return true;
        }
    }
    return false;
}

/**
 * Let the server listen on port 8080.
 */
app.listen("8080", () => {
    console.log("Server running on port 8080");
});
