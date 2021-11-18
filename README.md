# DateValueAccessor for Angular
[![NPM version][npm-image]][npm-url]
[![Tests][tests-image]][tests-url]

A set of `ControlValueAccessor`s for Angular to work with Browser's native date input elements. 
Now you can use `<input type="date">` directly with two-way data bindings (`ngModel`) as well as with reactive forms (`formControlName`/`formControl`). Choose freely between date objects and ISO-formatted strings.

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


## Installation

Download the package via NPM:

```bash
npm install angular-date-value-accessor
```


## UTC Time or Local Time
When working with Dates in Javascript you either operate in UTC or Local Time.

* UTC is has no timezone offset.
* Local Time depends on the host system time zone and offset.

Javascript Dates support both the UTC and the Local Time representation.
Depending on the requirements of your application you can choose from these Value Accessors:
* [DateValueAccessor (UTC)](#datevalueaccessor-utc)
* [LocalDateValueAccessor (Local Time)](#localdatevalueaccessor-local-time)
* [IsoDateValueAccessor (UTC as ISO 8601 string)](#isodatevalueaccessor-utc-as-iso-8601-string)
* [LocalIsoDateValueAccessor (Local Time as ISO 8601 string)](#localisodatevalueaccessor-local-time-as-iso-8601-string)


> **ℹ️ Hint:** Most UI component libraries like Angular Material, Kendo Angular, PrimeNG implement their DatePickers operating in Local Time. The Angular Date Pipe uses the Local Time representation of the Date Object by default, too.

## Installation & Usage

You have to explicitly opt-in by adding one of these attribute directives to a HTML date input control: `useValueAsDate`, `useValueAsLocalDate`, `useValueAsIso` or `useValueAsLocalIso`.


### DateValueAccessor (UTC)

The original `DateValueAccessor` operates in UTC (Coordinated Universal Time).
The HTML date input will use the UTC representation of a given Date Object.
When you select a date it will output an UTC date with the time set to 00:00 (UTC).

**If you are unsure what to use, use the `LocalDateValueAccessor` and not the `DateValueAccessor`.**
**Most users will expect the input field to correlate to their local clock.**

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

Now you can apply the `useValueAsDate` to your date input controls:

```html
<!-- DateValueAccessor (UTC) --->

<input type="date"
       name="myBirthday"
       [(ngModel)]="myBirthday"
       useValueAsDate>

OR

<input type="date"
       formControlName="myBirthday"
       useValueAsDate>
```


### LocalDateValueAccessor (Local Time)

The improved `LocalDateValueAccessor` operates in your Local Time.
The HTML date input will use the Local Time representation of a given the Date Object.
When you select a date it will output a Local Date with the time set to 00:00 (Local Time).

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

Now you can apply the `useValueAsLocalDate` to your date input controls:

```html
<!-- LocalDateValueAccessor (Local Time) ⭐️ --->

<input type="date"
       name="myBirthday"
       [(ngModel)]="myBirthday"
       useValueAsLocalDate>

OR

<input type="date"
       formControlName="myBirthday"
       useValueAsLocalDate>
```


### IsoDateValueAccessor (UTC as ISO 8601 string)

This directive gets and sets ISO 8601 formatted date strings in HTML date inputs.
The handling of the dates is the same as for the `DateValueAccessor`.

The `IsoDateValueAccessor` operates in UTC (Coordinated Universal Time).
The HTML date input will use the UTC representation of a given ISO 8601 formatted date string.
When you select a date it will output an ISO-formatted string with the time set to 00:00 (UTC).

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

Now you can apply the `useValueAsIso` to your date input controls:

```html
<!-- IsoDateValueAccessor (UTC as ISO string) --->

<input type="date"
       name="myBirthday"
       [(ngModel)]="myBirthday"
       useValueAsIso>

OR

<input type="date"
       formControlName="myBirthday"
       useValueAsIso>
```


### LocalIsoDateValueAccessor (Local Time as ISO 8601 string)

This directive gets and sets ISO 8601 formatted date strings in HTML date inputs.
The handling of the dates is the same as for the `LocalDateValueAccessor`.

The `LocalIsoDateValueAccessor` operates in your Local Time.
The HTML date input will use the Local Time representation of a given ISO 8601 formatted date string.
When you select a date it will output an ISO-formatted string with a time that equals to 00:00 (Local Time).<br>
<br>
Note: The timezone of the outputted string is always zero UTC offset, as denoted by the suffix "Z".

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

Now you can apply the `useValueAsLocalIso` to your date input controls:

```html
<!-- LocalIsoDateValueAccessor (Local Time as ISO string) ⭐️ --->

<input type="date"
       name="myBirthday"
       [(ngModel)]="myBirthday"
       useValueAsLocalIso>

OR

<input type="date"
       formControlName="myBirthday"
       useValueAsLocalIso>
```


## License

This code is published under the [MIT license](LICENSE).



[npm-url]: https://npmjs.org/package/angular-date-value-accessor
[npm-image]: https://badge.fury.io/js/angular-date-value-accessor.svg
[tests-url]: https://github.com/JohannesHoppe/angular-date-value-accessor/actions?query=workflow%3ATests
[tests-image]: https://github.com/JohannesHoppe/angular-date-value-accessor/workflows/Tests/badge.svg
