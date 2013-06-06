express-quick-routes
================================
Essentially I wanted a neater way to access my routes on my express servers. That is the intention of this project.

Usage
--------------------------------
By default, the module will look for the routes in the root of your project inside the /routes folder.

Assuming you have the folder structure:
\
\routes
\routes\index.js
\routes\auth.js

The file \routes\index.js has the functions login() and logout() and the file
\routes\auth.js has the functions googleAuth() and googleCallback() then you could
use the following code.

```
var express = require('express');

/* Express options code */
...

/* Setup your routes */

var router = require('express-quick-routes').init();
app.get('/auth/google', router.auth.googleAuth);
app.get('/auth/googleCallback', router.auth.googleCallback);
app.get('/login', router.index.login);
app.get('/logout', router.index.logout);


/* Start listening */
server.listen(3000);
```

It's some what difficult for me to explain exactly how to use it, hopefully that was helpful. But the bottom line is
when you add files to the routes folder in your server root those javascript/coffeescript files are autoloaded into
the router object. Then you can easily access the functions.

If you don't want to store the routes in the default location you can pass an alternate location to the init() like so:

```
var router = require('express-quick-routes').init('/opt/site/myRouteFolder');
```

or a relative path:

```
var router = require('express-quick-routes').init('../../anotherRouteFolderLocation');
```

If you have any questions or find any bugs please let me know and I'll be sure to address them.

For testing (very simple tests):
```
npm test
```