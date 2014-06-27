# Manual pub/sub

Using Vanilla JS create minimalistic publish/subscribe implementation.

It should has the methods:

* `publish` - accepts event name and data. When called all callbacks associated with the provided event should be invoked and the data should be passed as argument.
* `subscribe` - accepts event name and callback.

The only global object you have should be named `pubsub`.

