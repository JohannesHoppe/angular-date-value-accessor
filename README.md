# Angular2DateValueAccessor

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.16.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


# About

Working with forms is pretty easy with Angular 2.
You have to decide between Template-Driven or Reactive Forms and you are ready to start with some bindings and validation.
The following code shows a banana-box-binding with `ngModel` against a `string`.

```
<input type="text" name="name" [(ngModel)]="release1.name">
```

However it turns out, that working with date-objects and the HTML5 date input control is not working as expected:

```
<input type="date" name="releaseDate" [(ngModel)]="release1.releaseDate">
```

Even if `release1.releaseDate` contains a valid date, the date input control is not showing it.
It turns out, that we are supposed to set a string that is representing a full-date as defined in [RFC 3339](https://www.w3.org/TR/html-markup/references.html#refsRFC3339).
The same string is written back to the model, when changes have been made, e.g. "2016-09-30".
This behavior is specified in the [W3C HTML language reference](https://www.w3.org/TR/html-markup/input.date.html#input.date.attrs.value).
The downside is, that we have to do some string conversions in our code.

Let's review the possible solutions:

1. We could create a [custom form control](http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html), which would be a clean and extendable solution.

2. We could convert the strings directly in our @Component as described [here](http://stackoverflow.com/a/37055451). But the questions is, if we really want to bloat our "business code layer" with boilerplate.

3. We could create a __custom value accessor__
 