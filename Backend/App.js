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
 * Testing hello world on the front page localhost:8080
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
    console.log("Performed GET request on /devices\n");
});

/**
 * Reads 'devices.json', adds the request body and writes it back to 'devices.json'
 */
router.post("/devices", ctx => {
    let deviceList = JSON.parse(fs.readFileSync('devices.json','utf8'));

    // Error handling by incoming data
    if(!isEmptyOrBlank(ctx.request.body.identifier) &&
        !isEmptyOrBlank(ctx.request.body.name) &&
        !isEmptyOrBlank(ctx.request.body.device_type) &&
        !isEmptyOrBlank(ctx.request.body.gateway_address)) {

        console.log("POST request is valid");

        // If the identifier is already given in the list, then return an error
        if(!isIdentifierInList(ctx.request.body.identifier, deviceList)) {
            deviceList.devices.push(ctx.request.body);
            fs.writeFileSync("devices.json", JSON.stringify(deviceList));
            ctx.response.status = 201;
            console.log("Performed POST request and returned 201\n");
        } else {
            ctx.response.status = 403;
            console.log("Performed POST request and returned 403\n");

        }

    } else {
        console.log("POST request is invalid\n");
        ctx.throw(400, "One of the parameters are not set");
    }
});

/**
 * Checks if a given identifier is present in the json file.
 * @param identifier that is checked if it's in the file.
 * @returns {boolean} if identifier is in the file or not
 */
function isIdentifierInList(identifier, deviceList) {
    for (let device in deviceList.devices) {
        if(identifier === deviceList.devices[device].identifier) {
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

/**
 * Error handling
 */
app.on("error", err => {
    console.log("The server encountered an error: ", err);
});

/**
 * Checks if a string is empty, null or undefined
 * @param str - string to check
 * @returns {boolean}
 */
function isEmpty(str) {
    return (!str || str.length === 0);
}

/**
 * Checks if a string is blank, null or undefined
 * @param str - string to check
 * @returns {boolean}
 */
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

/**
 * Checks if a string is empty, blank, null or undefined
 * @param str - string to check
 * @returns {boolean}
 */
function isEmptyOrBlank(str) {
    return (!str || str.length === 0 || /^\s*$/.test(str));
}

// {
//     "identifier": "kitchen-lamp",
//     "name": "Kitchen Lamp",
//     "device_type": "switch",
//     "gateway_address": "192.123.43.1"
// }