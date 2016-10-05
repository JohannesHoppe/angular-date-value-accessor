# DateValueAccessor for Angular 2

A custom value accessor for Angular 2.  
Now you can use JavaScript Date objects directly with two-way data bindings (ngModel).

## Example:
```html
<input type="date" name="myBirthday" ngModel useValueAsDate>
```

## Installation:

Download the package via NPM:

```bash
npm install --save angular2-date-value-accessor
```

Then import the module via NgModule:

```js
// app.module.ts

import { DateValueAccessorModule } from 'angular2-date-value-accessor';

@NgModule({
  imports: [
    DateValueAccessorModule
  ]
})
export class AppModule { }
```
