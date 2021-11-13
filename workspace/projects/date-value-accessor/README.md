# DateValueAccessor for Angular
[![NPM version][npm-image]][npm-url]
[![Tests][tests-image]][tests-url]

A set of custom value accessors for Angular.  
Now you can use `<input type="date">` (provides real JavaScript date objects) directly with two-way data bindings (ngModel) as well as with reactive forms (formControlName/formControl).

## Demo

Here you can see the `DateValueAccessor` - the binding works!
Changes to the input field are propagated to the model.

![Example: works](https://johanneshoppe.github.io/angular-date-value-accessor/assets/reactive-works.gif)

And here you can see the `LocalDateValueAccessor` ⭐️.
Please notice how the date is adjusted due to the German time zone (UTC+1) and how the time offset works.

![Example: works](https://johanneshoppe.github.io/angular-date-value-accessor/assets/reactive-works-local.gif)

And this shows a not working form field (the default behaviour).
Changes in the input field are propagated to the model, but unfortunately the date becomes a string which is not very useful for any further processing.

![Example: does not work](https://johanneshoppe.github.io/angular-date-value-accessor/assets/reactive-does-not-work.gif)

**You can try out a full demo at the following page:**  
**→ http://johanneshoppe.github.io/angular-date-value-accessor/**

## Usage

You have to explicitly opt-in by adding one of these attribute directives to a HTML date input control: `useValueAsDate`, `useValueAsLocalDate`, `useValueAsIso` or `useValueAsLocalIso`.

```html
<!-- DateValueAccessor (UTC) --->

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

```html
<!-- LocalDateValueAccessor (Local Time) ⭐️ --->

<input type="date"
       name="myBirthday"
       ngModel
       useValueAsLocalDate>

OR

<input type="date"
       name="myBirthday"
       [(ngModel)]="myBirthday"
       useValueAsLocalDate>

OR

<input type="date"
       formControlName="myBirthday"
       useValueAsLocalDate>
```

```html
<!-- IsoDateValueAccessor (UTC as ISO string) --->

<input type="date"
       name="myBirthday"
       ngModel
       useValueAsIso>

OR

<input type="date"
       name="myBirthday"
       [(ngModel)]="myBirthday"
       useValueAsIso>

OR

<input type="date"
       formControlName="myBirthday"
       useValueAsIso>
```

```html
<!-- LocalIsoDateValueAccessor (Local Time as ISO string) ⭐️ --->

<input type="date"
       name="myBirthday"
       ngModel
       useValueAsLocalIso>

OR

<input type="date"
       name="myBirthday"
       [(ngModel)]="myBirthday"
       useValueAsLocalIso>

OR

<input type="date"
       formControlName="myBirthday"
       useValueAsLocalIso>
```

## Installation

Download the package via NPM:

```bash
npm install angular-date-value-accessor
```

## UTC Time and Local Time
When working with Dates in Javascript you either operate in UTC or Local Time.

* UTC is has no timezone offset.
* Local Time depends on the host system time zone and offset.

Javascript Dates support both the UTC and the Local Time representation.
Depending on the requirements of your application you can choose from these Value Accessors:
* [DateValueAccessor (UTC)](#datevalueaccessor-utc)
* [LocalDateValueAccessor (Local Time)](#localdatevalueaccessor-local-time)
* [IsoDateValueAccessor (UTC as ISO 8601 string)](#isodatevalueaccessor-utc-as-iso-8601-string)
* [LocalIsoDateValueAccessor (Local Time as ISO 8601 string)](#localisodatevalueaccessor-local-time-as-iso-8601-string)


## DateValueAccessor (UTC)

The `DateValueAccessor` operates in UTC (Coordinated Universal Time).
The HTML date input will read the UTC representation of the Date Object. When you select a date it will output an UTC date with the time set to 00:00 (UTC).

Import the module via NgModule:

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

Now you can apply the `useValueAsDate` to your date input controls.

## LocalDateValueAccessor (Local Time)

If you prefer to work with Local Dates then you can use the `LocalDateValueAccessorModule`.

The HTML date input will read the Local Time representation of the Date Object. When you select a date it will output a Local Date with the time set to 00:00 (Local Time).

Import the module via NgModule:

```js
// app.module.ts

import { LocalDateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
  imports: [
    LocalDateValueAccessorModule
  ]
})
export class AppModule { }
```

Now you can apply the `useValueAsLocalDate` to your date input controls.

> **ℹ️ Hint:** Most UI component libraries like Angular Material, Kendo Angular, PrimeNG implement their DatePickers operating in Local Time. The Angular Date Pipe uses the Local Time representation of the Date Object by default, too.


## IsoDateValueAccessor (UTC as ISO 8601 string)

This additional directive gets and sets ISO 8601 formatted date strings in HTML date inputs.
The handling of the dates is the same as for the `DateValueAccessor`.

Import the module via NgModule:

```js
// app.module.ts
import { IsoDateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
  imports: [
    IsoDateValueAccessorModule
  ]
})
export class AppModule { }
```

Now you can apply the `useValueAsIso` to your date input controls.


## LocalIsoDateValueAccessor (Local Time as ISO 8601 string)

This additional directive gets and sets ISO 8601 formatted date strings in HTML date inputs.
The handling of the dates is the same as for the `LocalDateValueAccessor`.

Import the module via NgModule:

```js
// app.module.ts
import { LocalIsoDateValueAccessorModule } from 'angular-date-value-accessor';

@NgModule({
  imports: [
    LocalIsoDateValueAccessorModule
  ]
})
export class AppModule { }
```

Now you can apply the `useValueAsLocalIso` to your date input controls.


[npm-url]: https://npmjs.org/package/angular-date-value-accessor
[npm-image]: https://badge.fury.io/js/angular-date-value-accessor.svg
[tests-url]: https://github.com/JohannesHoppe/angular-date-value-accessor/actions?query=workflow%3ATests
[tests-image]: https://github.com/JohannesHoppe/angular-date-value-accessor/workflows/Tests/badge.svg
