# How to develop

Development happens in ./src:

```js
npm i
npm run build
npm test
```

# How to publish

All the .ts files are transpiled to ES5/commonjs for best consumability. 

```js
npm test
npm run prebublish
[ ... a lot of silly small javascript artifacts are added to ./
  that's by design! review the result ]
npm publish
```

