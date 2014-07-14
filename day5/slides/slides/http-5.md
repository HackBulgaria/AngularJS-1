## $http config

By configuring the `$httpProvider` you can set specific headers for each request type like:

```
$httpProvider.defaults.headers.methodName
```

or general:

```
$httpProvider.defaults.headers.common
```

## Enabling cache

```
$httpProvider.defaults.cache = true; //or instance of $cacheFactory
```
