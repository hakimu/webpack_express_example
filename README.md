When I run `webpack` I see...

```
hakimu-mbp:webpack_express_example hakimu$ webpack
Hash: d62ddd418d54671f6630
Version: webpack 2.3.2
Time: 449ms
    Asset    Size  Chunks             Chunk Names
bundle.js  135 kB       0  [emitted]  main
   [7] ./~/parseurl/index.js 582 bytes {0} [built]
   [8] ./~/utils-merge/index.js 381 bytes {0} [built]
  [10] ./~/express/lib/middleware/query.js 782 bytes {0} [built]
  [11] ./~/express/lib/router/index.js 9.1 kB {0} [built]
  [12] ./~/express/lib/router/route.js 3.79 kB {0} [built]
  [15] ./~/send/index.js 40 bytes {0} [built]
  [18] ./app.js 261 bytes {0} [built]
  [23] ./~/express/index.js 104 bytes {0} [built]
  [25] ./~/express/lib/application.js 12 kB {0} [built]
  [26] ./~/express/lib/express.js 1.73 kB {0} [built]
  [28] ./~/express/lib/request.js 9.31 kB {0} [built]
  [29] ./~/express/lib/response.js 18.1 kB {0} [built]
  [41] ./~/serve-static/index.js 2.99 kB {0} [built]
  [47] ./~/type-is/index.js 2.3 kB {0} [built]
  [53] multi ./app.js 28 bytes {0} [built]
    + 39 hidden modules

WARNING in ./~/express/lib/view.js
43:48-69 Critical dependency: the request of a dependency is an expression

ERROR in ./~/express/index.js
Module not found: Error: Can't resolve './lib-cov/express' in '/Users/hakimu/Documents/scribble/webpack_express_example/node_modules/express'
 @ ./~/express/index.js 3:4-32
 @ ./app.js
 @ multi ./app.js

ERROR in ./~/methods/index.js
Module parse failed: /Users/hakimu/Documents/scribble/webpack_express_example/node_modules/methods/index.js 'return' outside of function (9:2)
You may need an appropriate loader to handle this file type.
|   });
|
|   return;
| }
|
 @ ./~/express/lib/application.js 8:14-32
 @ ./~/express/lib/express.js
 @ ./~/express/index.js
 @ ./app.js
 @ multi ./app.js
 ```

 When I run `webpack-dev-server`, I see this...

 ```
 hakimu-mbp:webpack_express_example hakimu$ webpack-dev-server
Project is running at http://localhost:8080/
webpack output is served from /
Hash: 3810645f740f3dbe6ee8
Version: webpack 2.3.2
Time: 1088ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  474 kB       0  [emitted]  [big]  main
chunk    {0} bundle.js (main) 458 kB [entry] [rendered]
   [59] ./~/express/lib/middleware/query.js 782 bytes {0} [built]
   [60] ./~/express/lib/router/index.js 9.1 kB {0} [built]
   [68] (webpack)-dev-server/client?http://localhost:8080 5.44 kB {0} [built]
   [69] ./app.js 261 bytes {0} [built]
   [70] (webpack)-dev-server/client/overlay.js 3.6 kB {0} [built]
   [71] (webpack)-dev-server/client/socket.js 856 bytes {0} [built]
   [72] (webpack)-dev-server/~/ansi-html/index.js 4.26 kB {0} [built]
   [73] (webpack)-dev-server/~/ansi-regex/index.js 135 bytes {0} [built]
   [75] (webpack)-dev-server/~/html-entities/index.js 231 bytes {0} [built]
   [82] (webpack)-dev-server/~/sockjs-client/lib/entry.js 244 bytes {0} [built]
  [111] (webpack)-dev-server/~/strip-ansi/index.js 161 bytes {0} [built]
  [128] (webpack)/hot/emitter.js 77 bytes {0} [built]
  [133] ./~/express/index.js 104 bytes {0} [built]
  [136] ./~/express/lib/express.js 1.73 kB {0} [built]
  [161] multi (webpack)-dev-server/client?http://localhost:8080 ./app.js 40 bytes {0} [built]
     + 147 hidden modules

WARNING in ./~/express/lib/view.js
43:48-69 Critical dependency: the request of a dependency is an expression

ERROR in ./~/express/index.js
Module not found: Error: Can't resolve './lib-cov/express' in '/Users/hakimu/Documents/scribble/webpack_express_example/node_modules/express'
 @ ./~/express/index.js 3:4-32
 @ ./app.js
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./app.js

ERROR in ./~/methods/index.js
Module parse failed: /Users/hakimu/Documents/scribble/webpack_express_example/node_modules/methods/index.js 'return' outside of function (9:2)
You may need an appropriate loader to handle this file type.
|   });
|
|   return;
| }
|
 @ ./~/express/lib/application.js 8:14-32
 @ ./~/express/lib/express.js
 @ ./~/express/index.js
 @ ./app.js
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./app.js
webpack: Failed to compile.
```