# What's Kquery?

This library is based on Jquery, because jquery is somewhat outdated is that this clone is born. 

Kquery works in the same way as jquery, however, many of the events or functions of jquery are not recreated here. Either to simplify the code or because it may be a future feature, Kquery is easy and fast to use. 

### CDN

```html
<script src="https://cdn.jsdelivr.net/gh/Neyunse/kquery/dist/kquery.bundle.min.js"></script>
```

## Some examples

### Html manipulation

Get the `nav` element and assign the class `active`

```javascript
_k("nav").addClass("active")
```

### Event handlers

A button when receiving the event click calls to a remote api and consumes from it the information, then it proceeds to paint it in html.

```javascript
_k("button").event('click', async () => {

      const r = await _k().remote("https://api.sampleapis.com/coffee/hot").get();

      r.map(r => {
                  _k('#coffe').insertHTML(`<li><b>${r.title}:</b> ${r.description}</li>`)
            })

})
```

### Remote

Using Remote call to an api using `get()` method

```javascript
_k().remote("https://api.sampleapis.com/coffee/hot").get();
```