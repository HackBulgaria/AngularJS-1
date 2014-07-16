## $routeProvider

```javascript
module.config(function ($routeProvider) {
  $routeProvider
  .when('/article/:id', {
    controller: 'ArticleCtrl',
    resolve: {
      article: function (Article, $route) {
        return Article.get(parseInt($route.current.params.id));
      }
    }
  })
  .when('/articles' {
    controller: 'ArticlesCtrl'
  })
  .otherwise({ redirectTo: '/articles' });
});
```
