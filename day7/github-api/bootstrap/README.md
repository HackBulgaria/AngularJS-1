# RESTful API usage

In this exercise we will continue by creating SPA using the GitHub REST API.

## Setup

```bash
cd app_root
bower install
python -m SimpleHTTPServer 3000
```

Now open [http://localhost:3000](http://localhost:3000).


## Routing

1. Create new module called `github.stats`. As dependencies add:
  - `ngRoute`
  - `utils`
  - `ngGrid`
  - `googlechart`
2. Define constant called `GITHUB_API`, with value `https://api.github.com`.
3. Configure the created module by adding the following routes, using `$routeProvider`:
  - `/home`, with controller `HomeCtrl` and template with URL `partials/home.html`.
  - `/users/:username`, with controller `UserCtrl` and template with URL `partials/user.html`. The route should have a resolve object, which resolves the current user using the `User` service (described bellow).
  - `/repos/:username`, with controller `UserReposCtrl` and template with URL `partials/user-repos.html`. The resolve object should resolve the current user (with key `user` in the resolve object) and repositories (with key `repos` in the resolve object).
  - `/repos/:username/:repository`, with controller `RepoCtrl` and template with URL `partials/repo.html`. The resolve object should resolve the local dependencies:
    - `repo` - the current repository for the given user (use the `Repo` service, described bellow).
    - `user` - the current user, passed as parameter.
  - `/stats/users`, with controller `UsersStatsCtrl` and template `partials/users-stats.html`. The resolve object should have a property called `users`, which once resolved should return all users.
  - `/stats/users/:username` with controller `UserRepoStatsCtrl` and template with URL `partials/user-repo-stats.html`. The resolve object, should have the key:
    - `repos`, which resolves all repositories for the given user
4. In case the user tries to reach different URL, redirect him/her to `/home`.

## Services

1. Define module called `utils`.
2. Using `module.factory` and the `utils` module, define a service called `req`. `req` should export a single method called `get`, which delegates its execution to `$http.get`. It should wrap `$http` by broadcasting an error message using the `$rootScope`, once the HTTP GET request fails (the broadcasted message should be with topic `error` and value equals to `res.data.message`). If the request was successful `req`'s get method should return the response, received from the `$http.get` call. 
3. Using the `github.stats` module and the `.factory` method define a service called `CachableModel`. It should accept as dependencies `$interpolate`, `$cacheFactory`, `$q` and `req`.
4. Inside the factory method of the service define a local object literal called `cache`.
5. Inside the factory method of the service define a constructor function called `CachableModel`, it should have a single static method called `get`, which accepts a `config` object as argument. The config object has the following properties:
  - `url` - the current URL plus placeholders (i.e. `https://api.github.com/users/{{username}}`)
  - `context` - context used for resolving the current URL (i.e. `{ username: "foo" }`, for resolving the URL above to `https://api.github.com/users/foo`).
  - `constructor` - constructor function used for wrapping the returned instances from the server.
  - `isArray` - boolean property indicating whether the returned result should be an array.
Once the `get` method is being called it should create new cache object and add it to the `cache` literal, with key the value of `config.url`. You should create the cache object by invoking `$cacheFactory` with key `config.url`. Once the cache have been created or retrieved (in case it was already created and put into the `cache` object), check whether it has data with key the interpolated URL (i.e. the processed value of `config.url` in the context of `config.context`). If such value exists return it by wrapping it into a promise. If it doesn't exists, then initiate new `get` request. In the resolve function depending on the type of the result (the value of `isArray`), iterate over the result by creating new domain objects with `config.constructor` or create a single instance of `config.constructor`, put the result into the cache and return the result through chaining.
6. The result of the factory method should be the constructor function `CachableModel`.
7. Define a service called `User`, using the factory syntax and `github.stats` module. As dependencies it should accept the constant defined for the GitHub API URL, `CachableModel`, `storage`, `$q`, `Repo`.
8. Inside the factory method define a constructor function called `User`, which as argument accepts a configuration object and sets the following properties of `this`:
  - `username`, equals to `config.login`
  - `avatarUrl`, equals to `config.avatar_url`
  - `createdAt`, equals to `config.created_at`
  - `followers`, equals to `config.followers`
  - `following`, equals to `config.following`
  - `publicReposCount`, equals to `config.public_repos`
  - `type`, equals to `config.type`
  - `htmlUrl`, equals to `config.html_url`
For more information review the [GitHub API Docs](https://developer.github.com/v3/).
9. Using `Object.defineProperty`, define property called `repos` to `this`, with getter, which returns all repositories for the given user, delegating the call to `Repo`.
10. Define a static method to `User`, called `get`, which delegates its call to `CachableModel.get` invoked within the current context, with config object:
  - `url`, equals to `GITHUB_API + '/users/{{username}}'`
  - `context, equals to `{ username: username }`
  - `isArray`, equals to false
  - `constructor`, equals to `User`
11. Define a local variable called `usernamesList`, which as initial value accepts the result of the invokation of `storage.get('users')` or an empty array, in case `storage.get('users')` is empty.
12. Add static method called `getUsernames` to `User`, which returns `usernamesList`.
13. Add static method called `addUsername` to `User`, which accepts username as argument and appends it to the `usernamesList` array, after that puts the array into the storage using `storage.put`.
14. Add static method called `removeUsername` to `User`, which accepts username as argument, removes it from the array and saves the new value of the array into the storage.
15. Add static method called `all` to `User`, which returns promise, which combines the promises returned by the execution of `User.get(username)`, for all users in the `usernamesList`.
16. Define a service called `Repo` using the `github.stats` module and the `factory` method. As local dependencies it should accept the GitHub API URL and `CachableModel`.
17. The constructor function should accept a configuration object and set the properties:
  - `name` equals to `config.name`
  - `createdAt` equals to `config.created_at`
  - `forksCount` equals to `config.forks_count`
  - `language` equals to `config.language`
  - `starsCount` equals to `config.stargazers_count`
  - `url` equals to `config.url`
  - `fork` equals to `config.fork`
  - `htmlUrl` equals to `config.html_url`
18. Define a static method called `getAllForUser`, which accepts a username and returns the result of the invokation of `CachableModel.get` with appopriate arguments. Note that the returned result is array and the URL for getting all repositories for given user is: `https://api.github.com/users/{{username}}/repos`.
19. Define a static method called `get`, which accepts username and name of repository as arguments and returns the coresponding repository.


## Configuration

1. Configure the `$httpProvider` by adding a `request` interceptor. The interceptor should append the following search parameters to the URL, if the request is to the GitHub's API: `'?client_id=8f3b8d572129632cf422&client_secret=f0669941c23378c30fb89f6c37be9075a5628bba'`.

## Controllers

1. Define a controller called `HeaderCtrl`, which accepts `$scope` as dependency. Inside the body of the controller add event handlers for the events `$routeChangeSuccess`, `$routeChangeStart`, `$routeChangeError`. Inside the event handlers of these events change the value of a property called `loading` attached to the current scope. The value of the property should be `true` if the route is currently being changed, otherwise it should be equals to false (do you find any advantages in using controller instead of directive?).
2. Define a controller called `HomeCtrl`. It should accept `$scope` and `User` as dependencies. Inside its body set property called `users` to the scope, which is equals to `User.getUsernames()`. Attach methods to the scope called `add` and `remove`, which add and respectively remove given username calling the methods `User.addUsername` and `User.removeUsername`.
3. Define a controller called `RepoCtrl`, which accepts `$scope`, `repo` and `user` as dependencies and set the values of `$scope` properties called `$scope.repo` and `$scope.user`.
5. Define a controller called `UserCtrl`, which accepts `$scope` and `user` as arguments and sets property called `$scope.user` equals to `user`.
6. Define a controller called `UserReposCtrl`. Inside its body you should define `gridOptions` property, used for configuring `ng-grid`. It should indicates that the data property of the grid is with name `repos` and the grid should visualize the following columns:
  - `name`
  - `starsCount`
  - `createdAt`
Inject the `$location` service and add `beforeSelectionChange` callback to the grid. Once the callback is being called change the location to: `$location.path($location.path() + '/' + row.entity.name);`, where `row` is the first argument of the callback.
Set properties called `repos` and `user` to the current scope, which values are accepted as dependencies.

More about ngGrid [here](https://angular-ui.github.io/ng-grid/).
7. Define a controller called `UserRepoStatsCtrl`. Inside its body aggregate the passed `repos` data in order to show the following charts:
  - PieChart, which shows how many projects of each languages has the given user (the scope property used for rendering the chart should be called `languageStats`)
  - BarChart, showing the repositories with more than a 100 stars for the given user (the scope property used for rendering the chart should be called `starsStats`)

8. Define a controller called `UsersStatsCtrl`. Inside its body aggragate the passed `users` data in order to show the following charts:
  - BarChart, which shows how many followers the different users have (the scope property used for rendering the chart should be called `userFollowers`)
  - BarChart, showing how many users are been followed by the given users (the scope property used for rendering the chart should be called `userFollowing`)
  - BarChart, which shows how many repositories do the different users have (the scope property used for rendering the chart should be called `userRepos`)

More about the AngularJS charts used in the project [here](https://bouil.github.io/angular-google-chart/).


## Directives

1. Define a directive called `ghAlert`, which factory accepts `$timeout` and `$rootScope` as dependencies.
  - The directive should has an isolated scope
  - It should have the template `<div class="alert alert-danger" role="alert" ng-bind="message"></div>`
  - The directive should replace the current content
  - Inside the link function of the directive catch the `$routeChangeStart` event and hide the current element inside the event handler.
  - Add event listener to the `$rootScope`, which listens for the `error` event. Inside the event handler add property to the current scope, called `message`, with value equals to the second argument of the event handler. Show the current element and hide it using a 4000ms timeout.

## Partials

### index.html

1. Associate `HeaderCtrl` with the `header` element
2. Add `ng-view` attribute to the `section` element.
3. To `div#alert-container` add attribute `gh-alert`.
4. Show the loading gif based on the value of the `loading` property.


### home.html

1. Add two-way data-binding between the input field and a model called `currentUser`.
2. On click of the add button invoke the `add` method
3. When the array `users` is empty show the label `There are no any users`.
4. When the array `users` is not empty show the unordered list
5. Iterate over each user and bind the span element to the user's username
6. On click of the `[X]` link invoke the `remove` method with the current user
7. In the anchor inside the unordered list (the one which wraps the span element), using the interpolation directive set href equals to `#/users/{{user}}`.

### repo.html

1. Inside the `img` element use `ng-src` directive in order to show the current user's avatar photo. Use `user.avatarUrl`.
2. Near the label `Repository` bind the span element to the appropriate property in order to show the repository's name.
3. Near the labels `Stargazers`, `Forks` and `Created at` bind the elements to the appopriate values.

### user-repo-stats.html

1. To the first and the second `div` elements add the attribute `google-chart`.
2. To the first div element add attribute `chart` with value `languageStats`.
2. To the second div element add attribute `chart` with value `starsStats`.

### user-repos.html

1. Bind the element `h2>span` to the username of the current user
2. Hide the label `No repositories` if the current user has any repos
3. Show the div element if the current user has any repos. Add attribute called `ng-grid` to the div element. The value of the attribute should be `gridOptions`. Notice that you have you have defined property called `gridOptions` inside your `UserReposCtrl`, which defines the configuration of `ng-grid`.

### user.html

1. Show the avatar of the current user by using `ng-src` and the user's avatarUrl.
2. Bind the appopriate values to the elements next to `Followers`, `Following`, `Created at`.
3. Set appropriate values to the href attribute of the links to the user's repositories and user's statistics.

### users-stats.html

1. To all div elements add the attribute `google-chart`.
2. To the first div element add attribute `chart` with value `userFollowers`.
3. To the second div element add attribute `chart` with value `userFollowing`.
4. To the third div element add attribute `chart` with value `userRepos`.

