# jQuery pub/sub

Using jQuery create minimalistic publish/subscribe implementation.

It should has the methods:

* `publish` - accepts event name and data. When called all callbacks associated with the provided event should be invoked and the data should be passed as argument.
* `subscribe` - accepts event name and callback.

The only global object you have (except jQuery) should be `pubsub`.

