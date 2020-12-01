# DateValueAccessor for Angular
[![NPM version][npm-image]][npm-url]
[![Tests][tests-image]][tests-url]

A custom value accessor for Angular.  
Now you can use `<input type="date">` (provides real JavaScript date objects) directly with two-way data bindings (ngModel) as well as with reactive forms (formControlName/formControl).

## Demo

Here you can see the DateValueAccessor - the binding works!

![Example: works](https://johanneshoppe.github.io/angular-date-value-accessor/assets/reactive-works.gif)

And this shows a not working form field (the default behaviour).

![Example: does not work](https://johanneshoppe.github.io/angular-date-value-accessor/assets/reactive-does-not-work.gif)

**There is an example application at:**  
http://johanneshoppe.github.io/angular-date-value-accessor/

## Usage

You have to explicitly opt-in by adding the attribute `useValueAsDate` to a date input control:

```html
<input type="date"
       name="myBirthday"
       ngModel
       useValueAsDate>

OR

<input type="date"
       name="myBirthday"
       [(ngModel)]="myBirthday"
       useValueAsDate>

OR

<input type="date"
       formControlName="myBirthday"
       useValueAsDate>
```

## Installation

Download the package via NPM:

```bash
npm install --save angular-date-value-accessor
```

Then import the module via NgModule:

```js
// app.module.ts

import { DateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
  imports: [
    DateValueAccessorModule
  ]
})
export class AppModule { }
```

Now you can apply the "useValueAsDate" to your date input controls.



[npm-url]: https://npmjs.org/package/angular-date-value-accessor
[npm-image]: https://badge.fury.io/js/angular-date-value-accessor.svg
[tests-url]: https://github.com/JohannesHoppe/angular-date-value-accessor/actions?query=workflow%3ATests
[tests-image]: https://github.com/JohannesHoppe/angular-date-value-accessor/workflows/Tests/badge.svg
