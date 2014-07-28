## Architecture

First, lets take a look at our architecture:

![Architecture](http://blog.mgechev.com/wp-content/uploads/2014/02/angular-vnc.png "Architecture")

We should have a VNC server on the machine we want to control. This machine provides interface accessible through the [RFB protocol][10]. The proxy in the middle has RFB client, which knows how to talk to the RFB server. The proxy also provides HTTP server, which is responsible for serving static files to the client and also allows communication through [socket.io][11]. The last component in our diagram is the "AngularJS VNC client", which consists few HTML and JavaScript files provided to the browser by the proxy. This is what actually the user of our VNC client sees. He or she use the form provided in the "AngularJS VNC client" in order to enter connection details and connect to the machine he or she wants to control

## Demo

https://www.youtube.com/watch?v=FwPjTt4dQmw

## AngularJS & Yeoman VNC client

First, of all you will need to install Yeoman, if you don't already have it on your computer:

```bash
# Installs Yeoman
npm install -g yo
# Installs the AngularJS generator for Yeoman
npm install -g generator-angular
```

Now we can begin! Inside the directory `angular-vnc` create a directory called `client`:

```bash
cd project_folder
mkdir client
cd client
# Creates new AngularJS application
yo angular
```

Yeoman will ask you few questions, you should answer as follows:

![Yeoman selection](http://blog.mgechev.com/wp-content/uploads/2014/02/Screen-Shot-2014-02-08-at-19.29.28.png "Yeoman selection")

We are going to use Bootstrap and \`angular-route.js\`. Wait few seconds and all required dependencies will be resolved.

Look at: `app/scripts/app.js`, its content should be something like:

```javascript
'use strict';

angular.module('angApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

Now in the `client` directory run:

```bash
yo angular:route vnc
```

After the command completes, the content of `app/scripts/app.js`, should be magically turned into:

```javascript
'use strict';

angular.module('angApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/vnc', {
        templateUrl: 'views/vnc.html',
        controller: 'VncCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

For next step, replace the content of `app/views/main.html` with:

```"html
<div class="container">
  <div class="row" style="margin-top:20px">
      <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
      <form role="form">
        <fieldset>
          <h2>VNC Login</h2>
          <hr class="colorgraph">
          <div class="form-error" ng-bind="errorMessage"></div>
          <div class="form-group">
              <input type="text" name="hostname" id="hostname-input" class="form-control input-lg" placeholder="Hostname">
          </div>
          <div class="form-group">
              <input type="number" min="1" max="65535" name="port" id="port-input" class="form-control input-lg" placeholder="Port">
          </div>
          <div class="form-group">
              <input type="password" name="password" id="password-input" class="form-control input-lg" placeholder="Password" ng-model="host.password">
          </div>
          <div class="form-group">
              <a href="" class="btn btn-lg btn-primary btn-block" ng-click="login()">Login</a>
          </div>
          <hr class="colorgraph">
        </fieldset>
      </form>
    </div>
  </div>
</div>
```

Add validation to the form following the rules:

1. The hostname (first text field) should be required with minimum length of 3 symbols. Bind it to the variable `host.hostname`.
2. The port must be required and it should have a numeric value. Bind it to the variable `host.port`.


You should also insert some CSS at `app/styles/main.css`:

```css
.colorgraph {
  margin-bottom: 7px;
  height: 5px;
  border-top: 0;
  background: #c4e17f;
  border-radius: 5px;
  background-image: -webkit-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
  background-image: -moz-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
  background-image: -o-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
  background-image: linear-gradient(to right, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
}

input.ng-invalid.ng-dirty {
  border-color: #ff0000 !important;
}

.form-error {
  width: 100%;
  height: 25px;
  color: red;
  text-align: center;
}
```

This defines the markup and styles for simple Bootstrap form.

After you start the proxy:

```bash
cd ../proxy
node index.js
```

and open [http://localhost:8090](http://localhost:8090), you should see something like this:

![VNC Login](http://blog.mgechev.com/wp-content/uploads/2014/02/Screen-Shot-2014-02-08-at-20.43.44.png "VNC Login")

The awesome thing is that we already have validation for the form! Did you notice that we added selector `form.ng-invalid.ng-dirty input.ng-invalid`? AngularJS is smart enough to validate the fields in our form by seeing their type (for example `input type="number"`, for the port) and their attributes (`required`, `ng-minlength`). When AngularJS detects that any field is not valid it adds the class: `ng-invalid` to the field, it also adds the class `ng-invalid` to the form, where this field is located. We, simply, take advantage, of this functionality provided by AngularJS, and define the styles: `form.ng-invalid.ng-dirty input.ng-invalid`. If you're still not aware how the validation works checkout [Form Validation in NG-Tutorial][17].

We already have attached controller, to our view (because of Yeoman), so we only need to change its behavior.

Inside `app/scripts/controllers/main.js`:

1. Inject the dependencies `$scope`, `$location` and `VNCClient`.
2. Initialize new scope property called `host`.
3. Add property to the scope property called `proxyUrl` with value the URL of the proxy.
4. Add a `login` method to the scope, which when the form is valid invokes the `connect` method of the `VNCClient`, otherwise sets the form to `dirty`.
  1. When the form is valid, once the connection was successful redirect the user to path `/vnc`.
  2. Otherwise show error message, by setting value to `errorMessage`: "Connection timeout. Please, try again.".


Lets create a wrapper of socketio:

Run in the terminal:
```bash
yo angular:factory Io
```

Inside the service located in `app/scripts/services/io.js` return object with `connect` method, which delegates its call to the `connect` method of the global `io` object.

Don't forget to include the line:

```html
<script src="/socket.io/socket.io.js"></script>
```

in `app/index.html`.


The next component we are going to look at is the service `VNCClient`. Before that, lets create it using Yeoman:

```bash
yo angular:service VNCClient
```

Now open the file: `app/scripts/services/vncclient.js`.

For bootstrapping the `VNCClient` you can use the following source code:

```javascript
'use strict';

function VNCClient($q, Io) {

  this.setConnectionTimeout = function (deferred) {
    var self = this;
    this.connectionTimeout = setTimeout(function () {
      self.disconnect();
      deferred.reject();
    }, CONNECTION_TIMEOUT);
  };

  this.addHandlers = function (success) {
    var self = this;
    this.socket.on('frame', function (frame) {
      self.update(frame);
    });
  };

  this.toRfbKeyCode = function (code, shift) {
    var keyMap = VNCClient.keyMap;
    for (var i = 0, m = keyMap.length; i < m; i++)
      if (code == keyMap[i][0])
        return keyMap[i][shift ? 2 : 1];
    return null;
  };

}

VNCClient.keyMap = [[8,65288,65288],[9,65289,65289],[13,65293,65293],[16,65505,65505],[16,65506,65506],[17,65507,65507],[17,65508,65508],[18,65513,65513],[18,65514,65514],[27,65307,65307],[32,32,32],[33,65365,65365],[34,65366,65366],[35,65367,65367],[36,65360,65360],[37,65361,65361],[38,65362,65362],[39,65363,65363],[40,65364,65364],[45,65379,65379],[46,65535,65535],[48,48,41],[49,49,33],[50,50,64],[51,51,35],[52,52,36],[53,53,37],[54,54,94],[55,55,38],[56,56,42],[57,57,40],[65,97,65],[66,98,66],[67,99,67],[68,100,68],[69,101,69],[70,102,70],[71,103,71],[72,104,72],[73,105,73],[74,106,74],[75,107,75],[76,108,76],[77,109,77],[78,110,78],[79,111,79],[80,112,80],[81,113,81],[82,114,82],[83,115,83],[84,116,84],[85,117,85],[86,118,86],[87,119,87],[88,120,88],[89,121,89],[90,122,90],[97,49,49],[98,50,50],[99,51,51],[100,52,52],[101,53,53],[102,54,54],[103,55,55],[104,56,56],[105,57,57],[106,42,42],[107,61,61],[109,45,45],[110,46,46],[111,47,47],[112,65470,65470],[113,65471,65471],[114,65472,65472],[115,65473,65473],[116,65474,65474],[117,65475,65475],[118,65476,65476],[119,65477,65477],[120,65478,65478],[121,65479,65479],[122,65480,65480],[123,65481,65481],[186,59,58],[187,61,43],[188,44,60],[189,45,95],[190,46,62],[191,47,63],[192,96,126],[220,92,124],[221,93,125],[222,39,34],[219,91,123]];

angular.module('clientApp').service('VNCClient', VNCClient);
```

The constructor function called VNCClient, should requre the dependencies `$q` and `Io`.

To the prototype of the constructor function add the following methods:

- `connect`
- `disconnect`
- `addFrameCallback`
- `removeFrameCallback`
- `update`
- `sendMouseEvent`
- `sendKeyboardEvent`
- `setConnectionTimeout`
- `addHandlers`
- `toRfbKeyCode`

Define new constant `CONNECTION_TIMEOUT` with value `2000`.

In the constructor function add property called `frameCallbacks` with initial value an empty array.

### connect(config)

1. The connect method should accept a configuration object and return a promise, which will be resolved once the connection is established.
2. If the `config` object has `forceNewConnection` property set with value `true` create new socketio socket by using the `Io` service, by passing a config object: `{ 'force new connection': true }`, otherwise create new socketio socket only by invoking the connect method, without any additional arguments (except the proxy URL).
3. Emit new `init` event with the host's hostname, port and password.
4. Call the method `addHandlers`.
5. Set new connection timeout, by invoking the `setConnectionTimeout` method with the deferred object, which promise is being returned.
6. Add event handler to the socket, which handles `init` events. Ones `init` event is being received set the properties:
  1. `screenWidth` to `config.width`
  2. `screenHeight` to `config.height`
  3. `connected` to `true`
Resolve the promise and clean the `connectionTimeout`.

### addFrameCallback(fn)

1. Add the passed callback to the `frameCallbacks` array.

### removeFrameCallback(fn)

1. Remove the passed callback from the `frameCallbacks` array.

### update(frame)

1. Invoke all `frameCallbacks` by passing them the given frame, passed as argument to `update`.

### sendMouseEvent(x, y, mask)

1. Emit new socketio event with name `mouse` and data object, which has the properties:
  1. `x` equals to `x`
  2. `y` equals to `y`
  3. `button` equals to `mask`

### sendKeyboardEvent(code, shift, isDown)

1. Convert the keycode to `rfb` key by using the method `toRfbKeyCode`.
2. If such key exists, emit new `keyboard` socketio event with argument object containing the properties:
  1. `keyCode` - the rfb key
  2. `isDown

### disconnect

1. Disconnect the socket
2. Set the value of `connected` to `false`


I know it is a lot of code but we will look only at the most important methods. You might noticed that we don&#8217;t follow the best practices for defining constructor functions &#8211; we don&#8217;t add the methods to the function&#8217;s prototype. Don&#8217;t worry about this, AngularJS will create a single instance of this constructor function and keep it in the services cache.

Lets take a quick look at `connect`:

```javascript
this.connect = function (config) {
    var deferred = $q.defer(),
        self = this;
    if (config.forceNewConnection) {
      this.socket = Io.connect(config.proxyUrl);
    } else {
      this.socket = Io.connect(config.proxyUrl, { 'force new connection': true });
    }
    this.socket.emit('init', {
      hostname: config.hostname,
      port: config.port,
      password: config.password
    });
    this.addHandlers();
    this.setConnectionTimeout(deferred);
    this.socket.on('init', function (config) {
      self.screenWidth = config.width;
      self.screenHeight = config.height;
      self.connected = true;
      clearTimeout(self.connectionTimeout);
      deferred.resolve();
    });
    return deferred.promise;
  };
```

The [VNC screen][19] directive is responsible for calling these methods. In the `sendKeyboardEvent` we transform the `keyCode`, received by handling the keydown/up event with JavaScript, to one, which is understandable by the RFB protocol. We do this using the array `keyMap` defined above. 


And now, the last component is the VNC screen directive! But before looking at it, replace the content of `app/views/vnc.html` with the following markup:

```html
<div class="screen-wrapper">
  <vnc-screen></vnc-screen>
  <button class="btn btn-danger" ng-show="connected()" ng-click="disconnect()">Disconnect</button>
  <a href="#/" ng-hide="connected()">Back</a>
</div>
```

as you see we include our VNC screen completely declaratively: `<vnc-screen></vnc-screen>`. In the markup above, we have few directives: ` ng-show="connected()", ng-click="disconnect()", ng-hide="connected()"`, they has expressions referring to methods attached to the scope in the `VncCtrl`:

```javascript
'use strict';

angular.module('clientApp')
  .controller('VncCtrl', function ($scope, $location, VNCClient) {
    $scope.disconnect = function () {
      VNCClient.disconnect();
      $location.path('/');
    };
    $scope.connected = function () {
      return VNCClient.connected;
    };
  });
```

`VncCtrl` is already located in `app/scripts/controllers/vnc.js`. You don't have to worry about it because when we instantiated the `vnc` route, Yeoman was smart enough to create this controller for us.

Now lets create the VNC screen directive:

```bash
yo angular:directive vnc-screen
```

and now open `app/scripts/directives/vnc-screen.js`. This is our directive definition:

```javascript
var VNCScreenDirective = function (VNCClient) {
  return {
    template: '<canvas class="vnc-screen"></canvas>',
    replace: true,
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      //body...
    }
  };
};
angular.module('clientApp').directive('vncScreen', VNCScreenDirective);
```

Now lets take a quick look at the other properties of the directive. The template of our directive is simple canvas with class `vnc-screen`, it should replace the directive. We define that the user of the `vnc-screen` directive should use it as element. It is also quite important to notice that we have a single dependency - the `VNCClient` service, we described above.

Now lets look what happens in the link function:

```javascript
if (!VNCClient.connected) {
  angular.element('<span>No VNC connection.</span>').insertAfter(element);
  element.hide();
  return;
}

function frameCallback(buffer, screen) {
  return function (frame) {
    buffer.drawRect(frame);
    screen.redraw();
  };
}

function createHiddenCanvas(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.position = 'absolute';
  canvas.style.top = -height + 'px';
  canvas.style.left = -width + 'px';
  canvas.style.visibility = 'hidden';
  document.body.appendChild(canvas);
  return canvas;
}

var bufferCanvas = createHiddenCanvas(VNCClient.screenWidth, VNCClient.screenHeight),
    buffer = new VNCClientScreen(bufferCanvas),
    screen = new Screen(element[0], buffer),
    callback = frameCallback(buffer, screen);

VNCClient.addFrameCallback(callback);
screen.addKeyboardHandlers(VNCClient.sendKeyboardEvent.bind(VNCClient));
screen.addMouseHandler(VNCClient.sendMouseEvent.bind(VNCClient));

scope.$on('$destroy', function () {
  VNCClient.removeFrameCallback(callback);
  bufferCanvas.remove();
});
```

As first step the link function checks whether the `VNCClient` is connected, if it isn&#8217;t the directive simply adds the text `"No VNC connection."` and hides the template (actually now a DOM element). We can also take more advanced approach here, we can watch the `connected` property and undertake different actions depending on its value. Doing this will make our directive more dynamic. But for simplicity lets stick to the current implementation.

The line `var bufferCanvas = createHiddenCanvas(VNCClient.screenWidth, VNCClient.screenHeight)` creates new hidden canvas. It is responsible for capturing the current state of the remote screen in size the same as the screen itself. So if the size of the remote screen is 1024x768px this hidden canvas will be with 1024px width and 768px height. We instantiate new instance of `VNCClientScreen` with parameter the hidden canvas. The constructor function `VNCClientScreen` wraps the canvas and provides method for drawing on it:

```javascript
function VNCClientScreen(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.onUpdateCbs = [];
}

VNCClientScreen.prototype.drawRect = function (rect) {
  // Draw the image onto the canvas, using the appropriate method.
  // The base64 format image could be found in the `rect` object.
  // Since the image has specific position, it needs to be drawn with appopriate
  // coordinates, width and height. Once the image is drawn onto the canvas
  // invoke all onUpdateCbs.
  self.onUpdateCbs.forEach(function (cb) {
    cb();
  });
};

VNCClientScreen.prototype.getCanvas = function () {
  return this.canvas;
};
```

As next step we create new instance of `Screen`. This is the last component we are going to look at in the current task but before taking a look at it lets see how we use it.

We instantiate the `Screen` instance by passing our visible canvas and the VNC screen buffer (the wrapper of the hidden canvas) to it. For each received frame we are going to draw the buffer canvas over the VNC screen. We do this because the VNC screen could be scaled (i.e. with size different from the one of the remote machine's screen) and we simplify our work by using this approach. Otherwise, we should calculate the relative position of each received frame before drawing it onto the canvas, taking in account the scale factor.

In the `frameCallback` we draw the received rectangle (changed part of the screen) on the buffer screen and after that draw the buffer screen over the `Screen` instance.

In the link function we also invoke the methods:

* `addKeyboardHandlers`
* `addMouseHandler`

They simply delegate handling of mouse and keyboard event to the `VNCClient`. Here is the implementation of the `addKeyboardHandlers`:

```javascript
Screen.prototype.addKeyboardHandlers = function (cb) {
  document.addEventListener('keydown', this.keyDownHandler(cb), false);
  document.addEventListener('keyup', this.keyUpHandler(cb), false);
};

Screen.prototype.keyUpHandler = function (cb) {
  return this.keyUpHandler = function (e) {
    cb.call(null, e.keyCode, e.shiftKey, 1);
    e.preventDefault();
  };
};

Screen.prototype.keyDownHandler = function (cb) {
  return this.keyDownHandler = function (e) {
    cb.call(null, e.keyCode, e.shiftKey, 0);
    e.preventDefault();
  };
};
```

Now you also see why we used `VNCClient.sendKeyboardEvent.bind(VNCClient)`, because in `keyDownHandler` and `keyUpHandler` we invoke the callback with context `null`. By using `bind` we force the context to be the `VNCClient` itself.

And we are done! We skipped some of the methods of `Screen` because I think their consideration is not that essential for the purpose of this tutorial. Anyway, here is the whole implementation of the `Screen` constructor function:

```javascript
function Screen(canvas, buffer) {
  var bufferCanvas = buffer.getCanvas();
  this.originalWidth = bufferCanvas.width;
  this.originalHeight = bufferCanvas.height;
  this.buffer = buffer;
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.resize(bufferCanvas);
}

Screen.prototype.resize = function () {
  var canvas = this.buffer.getCanvas(),
      ratio = canvas.width / canvas.height,
      parent = this.canvas.parentNode,
      width = parent.offsetWidth,
      height = parent.offsetHeight;
  this.canvas.width = width;
  this.canvas.height = width / ratio;
  if (this.canvas.height &gt; height) {
    this.canvas.height = height;
    this.canvas.width = height * ratio;
  }
  this.redraw();
};

Screen.prototype.addMouseHandler = function (cb) {
  var buttonsState = [0, 0, 0],
      self = this;

  function getMask() {
    var copy = Array.prototype.slice.call(buttonsState),
        buttons = copy.reverse().join('');
    return parseInt(buttons, 2);
  }

  function getMousePosition(x, y) {
    var c = self.canvas,
        oc = self.buffer.getCanvas(),
        pos = c.getBoundingClientRect(),
        width = c.width,
        height = c.height,
        oWidth = oc.width,
        oHeight = oc.height,
        widthRatio = width / oWidth,
        heightRatio = height / oHeight;
    return {
      x: (x - pos.left) / widthRatio,
      y: (y - pos.top) / heightRatio
    };
  }

  this.canvas.addEventListener('mousedown', function (e) {
    if (e.button === 0 || e.button === 2) {
      buttonsState[e.button] = 1;
      var pos = getMousePosition(e.pageX, e.pageY);
      cb.call(null, pos.x, pos.y, getMask());
    }
    e.preventDefault();
  }, false);
  this.canvas.addEventListener('mouseup', function (e) {
    if (e.button === 0 || e.button === 2) {
      buttonsState[e.button] = 0;
      var pos = getMousePosition(e.pageX, e.pageY);
      cb.call(null, pos.x, pos.y, getMask());
    }
    e.preventDefault();
  }, false);
  this.canvas.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });
  this.canvas.addEventListener('mousemove', function (e) {
    var pos = getMousePosition(e.pageX, e.pageY);
    cb.call(null, pos.x, pos.y, getMask());
    e.preventDefault();
  }, false);
};

Screen.prototype.addKeyboardHandlers = function (cb) {
  document.addEventListener('keydown', this.keyDownHandler(cb), false);
  document.addEventListener('keyup', this.keyUpHandler(cb), false);
};

Screen.prototype.keyUpHandler = function (cb) {
  return this.keyUpHandler = function (e) {
    cb.call(null, e.keyCode, e.shiftKey, 1);
    e.preventDefault();
  };
};

Screen.prototype.keyDownHandler = function (cb) {
  return this.keyDownHandler = function (e) {
    cb.call(null, e.keyCode, e.shiftKey, 0);
    e.preventDefault();
  };
};

Screen.prototype.redraw = function () {
  var canvas = this.buffer.getCanvas();
  this.context.drawImage(canvas, 0, 0, this.canvas.width, this.canvas.height);
};

Screen.prototype.destroy = function () {
  document.removeEventListener('keydown', this.keyDownHandler);
  document.removeEventListener('keyup', this.keyUpHandler);
  this.canvas.removeEventListener('contextmenu');
  this.canvas.removeEventListener('mousemove');
  this.canvas.removeEventListener('mousedown');
  this.canvas.removeEventListener('mouseup');
};
```

The last step is to run the VNC client! Make sure you have a computer with VNC server on it.

Run the following command:

```bash
cd angular-vnc
cd proxy
node index.js
```

Now open the url: [http://localhost:8090](http://localhost:8090).

 [1]: http://blog.mgechev.com/wp-content/uploads/2014/02/yeoman-vnc-angular.png
 [2]: http://angularjs.org/
 [3]: http://yeoman.io/
 [4]: https://github.com/mgechev/angular-vnc
 [5]: #vnc-demo-video
 [6]: https://github.com/mgechev
 [7]: https://github.com/mgechev/js-vnc-demo-project
 [8]: https://github.com/mgechev/devtools-vnc
 [9]: http://blog.mgechev.com/wp-content/uploads/2014/02/angular-vnc.png
 [10]: https://en.wikipedia.org/wiki/RFB_protocol
 [11]: http://socket.io/
 [12]: #angular-vnc
 [13]: https://github.com/mgechev/angular-vnc/tree/master/proxy
 [14]: https://en.wikipedia.org/wiki/Lazy_evaluation
 [15]: http://blog.mgechev.com/wp-content/uploads/2014/02/Screen-Shot-2014-02-08-at-19.29.28.png
 [16]: http://blog.mgechev.com/wp-content/uploads/2014/02/Screen-Shot-2014-02-08-at-20.43.44.png
 [17]: http://ng-tutorial.mgechev.com/#?tutorial=form-validation&step=basic-validation
 [18]: https://en.wikipedia.org/wiki/Observer_pattern
 [19]: https://github.com/mgechev/angular-vnc/blob/master/client/app/scripts/directives/vnc-screen.js
