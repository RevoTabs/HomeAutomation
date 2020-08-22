# Home Automation

## General infrastructure
- React or Angular frontend if we want to stay in the HTTP region
    - Later we can swap to an App (only for iPhone master race)
- Koa or Express backend
    - Mocking the missing hardware and create a working app beforehand
- Divide functionality into microservices
- Are we using a database?
    - Could use Sequelize and SQL
- Accessible only via home network (Think about your education!)
- Hardware has to have an open API interface
- Use an open source framework like [Home Assistant](https://www.home-assistant.io/getting-started/)?

## Open API hardware
- [LIFX](https://eu.lifx.com/)
    - [API](https://api.developer.lifx.com/docs/introduction)

## Useful links
- [Home Automation Reddit](https://www.reddit.com/r/homeautomation/)
- [27 Home Automation devices](https://medium.com/@mr_moodnode/27-smart-devices-that-have-open-api-11698813b474)
- [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_Server_errors)
- [JavaScript JSON](https://www.w3schools.com/js/js_json_intro.asp)

## API

### Request all registered devices

**Definiton**

`GET /devices`

**Response**

- `200 OK` on success

```json
[
  {
    "identifier" : "bathroom-lamp",
    "name": "Bathroom Lamp",
    "device_type": "switch",
    "gateway_address": "192.1.0.21"
  },
  {
    "identifier" : "samsung-tv",
    "name": "Samsung TV",
    "device_type": "tv",
    "gateway_address": "192.167.2.0" 
  }
]
```

### Request a specific registered device

**Definiton**

`GET /device/<identifier>`

**Response**

- `200 OK` on success
- `403 FORBIDDEN` if there is no device with this identifier

```json
{
"identifier" : "samsung-tv",
"name": "Samsung TV",
"device_type": "tv",
"gateway_address": "192.167.2.0" 
}
```
### Add a new device

**Definition**

`POST /devices`

**Arguments**

-  `"identifier":string` a globally unique identifier for the device
-  `"name":string` a readable name for the user
-  `"device_type":string` the type of the device
-  `"gateway_address":string` the IP address of the device

**Response**

- `201 CREATED` on success
- `400 BAD REQUEST` if the body is empty
- `403 FORBIDDEN` if the identifier already exists


```json
{
  "identifier" : "bathroom-lamp",
  "name": "Bathroom Lamp",
  "device_type": "switch",
  "gateway_address": "192.1.0.21"
}
```

### Delete a registered device

**Definition**

`DELETE /device/<identifier>`

**Response**

- `204 NO CONTENT` on success
- `403 FORBIDDEN` if there is no device with this identifier
