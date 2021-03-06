# SpringCM Node.js REST API SDK

[![NPM](https://nodei.co/npm/springcm-node-sdk.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/springcm-node-sdk/)

[![Build Status](https://travis-ci.org/paulholden2/springcm-node-sdk.svg?branch=master)](https://travis-ci.org/paulholden2/springcm-node-sdk) [![Coverage Status](https://coveralls.io/repos/github/paulholden2/springcm-node-sdk/badge.svg?branch=master)](https://coveralls.io/github/paulholden2/springcm-node-sdk?branch=master) [![dependencies Status](https://david-dm.org/paulholden2/springcm-node-sdk/status.svg)](https://david-dm.org/paulholden2/springcm-node-sdk) [![devDependencies Status](https://david-dm.org/paulholden2/springcm-node-sdk/dev-status.svg)](https://david-dm.org/paulholden2/springcm-node-sdk?type=dev)

This SDK currently provides a limited feature set, as it was created and is developed primarily for internal IT work at Stria.

Accessing the REST API requires you create an API user in your SpringCM account and assign a client ID to that user in the REST API section of Account Preferences. Once set, you can use the API by providing the client ID and corresponding secret. The client ID and client secret are provided by SpringCM's support staff on request. For more information, visit [this webpage](https://developer.springcm.com/guides/rest-api-authentication).

# Examples

## SpringCM Client

#### Connect

Before you can interact with your SpringCM account, you need to connect via
the SpringCM client.

```js
const SpringCM = require('springcm-node-sdk');

// Create a new client
var springCm = new SpringCM({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret',
  dataCenter: 'uatna11' // na11, na21, etc.
});

springCm.connect((err) => {
  // You are now connected
});
```

#### Disconnect

Once you are done using the SpringCM client, you should close the connection,
especially if your program is going to close immediately. Closing the
connection ensures all queued requests and operations are completed.

Comments shown below are only applicable when execution reaches that line,
i.e. comment \#3 occurs after \#2.

```js
// 1) Queue up 10 requests then immediately call close()
springCm.close(() => {
  // 3) All requests are complete. You can exit the program safely.
});

// 2) Requests can no longer be submitted. Most operations will return an error.
```

## Folders

#### Root folder

```js
springCm.getRootFolder((err, root) => {
  // root represents the top level folder of your account
});
```

#### Subfolders

```js
springCm.getRootFolder((err, root) => {
  springCm.getSubfolders(root, (err, folders) => {
    // folders is an array of all folders under the top level /
    // e.g. Trash and Other Sources
  });
});
```

#### Get folder by path

```js
springCm.getFolder('/HR/Employee Files', (err, folder) => {
  // folder is an object referencing the /HR/Employee Files/ folder in SpringCM
});
```

#### Get folder by UID

If you'll know the UID of a folder beforehand, you can reference it by this
UID.

```js
springCm.getFolder('758afbfa-1f18-e812-9d16-3ca24a1e3f40', (err, folder) => {
  // folder is an object referencing the folder with the above UID
});
```

#### Subfolder pages

If you have a folder with a large number of subfolders, you may want to
use paging. To do so, pass an options object as the second argument instead
of the callback.

```js
springCm.getSubfolders(parent, {
  offset: 0,
  limit: 20
}, (err, folders) => {
  // folders is an array of the first (no more than) 20 subfolders
});
```
