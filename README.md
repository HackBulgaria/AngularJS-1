# Стартиране на слайдовете

За да стартирате слайдовете трябва да имате инсталиран node.js, npm и grunt.
За да инсталирате grunt използвайте:

```bash
npm install -g grunt-cli
npm install -g grunt
```

За да стартирате презентация:

```bash
cd slides_folder
# Required only once
npm install
grunt server
```
Изпълнението на последната команда трябва да отвори браузър с url `localhost:\d+` (например localhost:9000).

# Предварителни изисквания

1. Добро владеене на HTML и CSS.
2. Добро владеене на JavaScript.
3. Познаване на HTTP протокола.
4. Опит с използване на back-end API.
5. Основни познания по git.
6. Опит с MVW framework (не задължително, но ще бъде полезно).
7. По възможност компютър с Linux или Mac OS X.

# Практически умения, които ще придобиете

1. Познаване на особеностите на Single-Page Applications.
2. Ще научите основните компоненти на едно AngularJS приложение:
  1. Модули
  2. Контролери
  3. Директиви
  4. Услуги
  5. Филтри
3. Ще научите как да организирате вашето AngularJS приложение.
4. Ще научите архитектурните шаблони използвани в AngularJS.
5. Ще се научите да използвате Bower, Yeoman.
6. Ще знаете как да използвате RESTful API с AngularJS.
7. Ще знаете как да използвате Jasmine и Karma за unit testing.
8. Ще научите различни стратегии за оптимизиране на вашето AngularJS приложение, като например:
  1. Lazy pre-fetching на темплейти.
  2. Използване на аспектно-ориентирано програмиране с AngularJS.

По време на целия курс ще създаваме практически проекти, чрез които да илюстрираме концепциите за учене.

# Лектор Минко Гечев

Минко е завършил бакалавърска степен във ФМИ, в момента преборва магистратурата по Софтуерни Технологии.

Занимава се с консултантска дейност и разработка на софтуер за различни клиенти - в момента LearnCapital.

Използвал е различни езици за програмиране, сред които Haskell, AspectJ, JavaScript, PHP, Ruby, C и други. С уеб се занимава от ученическите си години, а през свободното си време се стреми да:

- [Move the web forward](https://github.com/mgechev)
- [Пише блог постове свързани с проектите, над които работи](http://blog.mgechev.com)
- Помага във ФМИ, като:
 - води лекции в курса "JavaScript за напреднали"
 - "критикува" в курса по "Анализ и Проектиране на Информационни Системи"
- Спортува
- Да намира време за сън.

Социални контакти на Минко:

1. [GitHub](https://github.com/mgechev)
2. [Twitter](https://twitter.com/mgechev)
3. [LinkedIn](https://www.linkedin.com/pub/minko-gechev/33/831/9a7)
4. [Личен блог](http://blog.mgechev.com)


# Програма на курса

1. Основни концепции и Bower
  - Видимост на променливите
  - * Създаване на обекти в JavaScript
  - * Bower - the package manager of the web
  - * Observer и Publish/subscribe
  - AngularJS - какво представлява и защо ни е да го използваме?
  - Хоризонтални и вертикални Single-Page Applications
  - * Bootstrap на AngularJS приложение и модулите в AngularJS
  - * Създаване на просто Todo приложение с AngularJS темплейти
2. Контекст, контролери и dirty-checking
  - Какво представлява контекстът в едно AngularJS приложение?
    - * Chain of Responsibilities и Publish/subscribe
    - * Създаване на приложение с dirty-checking data-binding
  - * Dependency Injection в AngularJS
  - Шаблонът page controller и контролерите в AngularJS
  - * AngularJS $parse
  - * Рефакториране на Todo приложението, използвайки AngularJS контролери
3. Услуги, типове услуги, вградени услуги. $provide, декоратори.
  - Дефиниране на услуги в AngularJS
  - * Рефакториране на приложението с цел добавяне на модели и persistance
  - * Шаблонът декоратор
  - * Декориране на добавените услуги
  - * Дъздаване на конфигурируем provider за persistance
4. Филтри, $q, $http, $resource и използване на RESTful API
  - * Какво представляват promises?
  - * Създаване на custom филтри
  - $http vs $resource и АctiveRecord шалонът
  - * Рефакториране на Todo приложението, използвайки RESTful API
5. Директиви и routing
  - * Рефакториране на приложението, добавяне на валидация на формата за добавяне на todos
  - * "Hello, world!" директива
  - * **mg**-repeat директива (link vs render)
  - * $location
  - * Transclusion
  - * $sce и $compile
  - * Вградени директиви
6. Директиви, routing, nested views
  - * Добавяне на маршрути в Todo приложението
  - * Рефакториране на Todo приложението, използвайки директиви
  - * Вложени маршрути с ui-view
  - * ng-animate
7. Yeoman, тестване и "теми за напреднали"
  - * Yeoman, Grunt/Gulp
  - Unit тестване с Jasmine и Karma
    - * Test all the things!
  - Наследяване
    - * Контролери
    - * Услуги
  - Добри практики
8. AOP, lazy-prefetching и други
  - * Какво е aspect-oriented programming, защо да го използваме?
  - * Lazy-prefetching на темплейти
  - * Създаване на VNC клиент

Към всички точки с (*) има предвидена практическа задача.

