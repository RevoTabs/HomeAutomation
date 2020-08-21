# Home Automation
 
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
- `404 NOT FOUND` if there is no device with this identifier

```json
[
  {
    "identifier" : "samsung-tv",
    "name": "Samsung TV",
    "device_type": "tv",
    "gateway_address": "192.167.2.0" 
  }
]
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
- `410 ALREADY EXISTING` if the identifier already exists

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

- `202 DELETED` on success
- `404 NOT FOUND` if there is no device with this identifier
