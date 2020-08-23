const Koa = require("koa");
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors")
const fs = require('fs');
const app = new Koa();
const router = new Router();

/**
 * Used for routing
 */
app.use(bodyParser())
    .use(cors())
    .use(router.allowedMethods())
    .use(router.routes());

/**
 * Testing hello world on the front page localhost:8080
 */
app.use(async ctx => {
    ctx.body = "Server running on port 8080";
});

/**
 * Returns the data from 'devices.json'
 */
router.get("/devices", ctx => {
    ctx.response.body = JSON.parse(fs.readFileSync('devices.json','utf8'));
    ctx.response.status = 200;
    console.log("Performed GET request on /devices \n");
});

/**
 * Returns a single device from 'devices.json' regarding the passed identifier
 */
router.get("/device/:identifier", ctx => {
    let device = findInList(ctx.params.identifier, "object");

    if(device !== null) {
        ctx.response.body = JSON.stringify(device);
        ctx.response.status = 200;
        console.log("Performed GET request on /device/" + ctx.params.identifier + " withs status 200 \n");
    } else {
        ctx.response.status = 403;
        console.log("Performed GET request on /device/" + ctx.params.identifier + " with status 403 \n");
    }
});

/**
 * Reads 'devices.json', adds the request body and writes it back to 'devices.json'
 */
router.post("/devices", ctx => {
    let deviceList = JSON.parse(fs.readFileSync('devices.json','utf8'));

    // Error handling by incoming data
    if(allValuesAreValid(ctx.request.body)) {
        console.log("POST request is valid");

        // If the identifier is already given in the list, then return an error
        if(!findInList(ctx.request.body.identifier, "boolean")) {
            deviceList.devices.push(ctx.request.body);
            fs.writeFileSync("devices.json", JSON.stringify(deviceList));
            ctx.response.status = 201;
            console.log("Performed POST request and returned 201 \n");
        } else {
            ctx.response.status = 403;
            console.log("Performed POST request and returned 403 \n");
        }
    } else {
        console.log("POST request is invalid \n");
        ctx.throw(400, "One of the parameters is not set");
    }
});

router.del("/device/:identifier", ctx => {
    let index = findInList(ctx.params.identifier, "index");

    if(index !== null) {
        let deviceList = JSON.parse(fs.readFileSync('devices.json','utf8'));
        deviceList.devices.splice(index, 1);
        fs.writeFileSync("devices.json", JSON.stringify(deviceList));
        ctx.response.status = 204;
        console.log("Performed DELETE request and returned 204 \n");
    } else {
        ctx.response.status = 403;
        console.log("Performed DELETE request and returned 403 \n");
    }
});

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

/**
 * Checks if the values of an object are neither empty, blank, null or undefined
 * @param object that is checked
 * @returns {boolean}
 */
function allValuesAreValid(object) {
    for (let property in object) {
        if(isEmptyOrBlank(object[property])) {
            return false;
        }
    }
    return true;
}

/**
 * Finds an entry in the 'devices.json' with a dynamic return value
 * @param identifier:string to identify the element
 * @param whatToReturn:string to decide what to return
 * @returns {null|string|boolean|undefined|*}
 */
function findInList(identifier, whatToReturn) {
    let deviceList = JSON.parse(fs.readFileSync('devices.json','utf8'));
    for (let device in deviceList.devices) {
        if(identifier === deviceList.devices[device].identifier) {
            switch (whatToReturn) {
                case "boolean":
                    return true;
                case "object":
                    return deviceList.devices[device];
                case "index":
                    return device;
                default:
                    return undefined;
            }
        }
    }
    return null;
}