express-quick-routes
================================
Essentially I wanted a neater way to access my routes on my express servers. That is the intention of this project.

Version 1.0.0 introduces breaking changes to version 0.0.0. Please read the updated documentation for new usage.

Support for nested folders also added in 1.0.0


Usage
--------------------------------
By default, the module will look for the routes in the root of your project inside the /routes folder relative to the
file being executed.

Assuming you have the folder structure:

    \

    \routes

    \routes\index.js

    \routes\auth.js

The file \routes\index.js has the functions login() and logout() and the file
\routes\auth.js has the functions googleAuth() and googleCallback() then you could
use the following code.


```javascript
var express = require('express');
var app = express();
/* Express options code */
...

/* Setup your routes */
var quickRoutes = require('express-quick-routes');
var router      = quickRoutes();
app.get('/auth/google', router.auth.googleAuth);
app.get('/auth/googleCallback', router.auth.googleCallback);
app.get('/login', router.index.login);
app.get('/logout', router.index.logout);


/* Start listening */
app.listen(3000);
```

If you don't want to store the routes in the default location you can pass an alternate location to the init() like so:

```javascript
var quickRoutes = require('express-quick-routes');

var router      = quickRoutes('/opt/site/myRouteFolder');
```

or a relative path:

```javascript
var quickRoutes = require('express-quick-routes');

var router      = quickRoutes('../../anotherRouteFolderLocation');
```

If you have any questions or find any bugs please let me know and I'll be sure to address them.

For testing (very simple tests):
```
npm test
```