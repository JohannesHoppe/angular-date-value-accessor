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

Then import the module via NgModue:

```js
// app.module.ts

import { DateValueAccessor } from 'angular2-date-value-accessor';

@NgModule({
  imports: [
    DateValueAccessor
  ]
})
export class AppModule { }


```

------


# How to develop

Development happens in ./src:

```bash
npm i
npm run build
npm test
```

# How to publish

All the .ts files are transpiled to ES5/commonjs for best consumability. 

```bash
npm test
npm run prebublish
[ ... a lot of small javascript artifacts are added to ./
  that's by design! review the result ]
npm publish
```

