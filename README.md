# Markdown Links

## Resumen del proyecto

Es una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.



## Instalación


El módulo es instalable via `npm install jossacosta/md-links`.


#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función retorna una promesa que resuelva a un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).


#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("example.md")
  .then(links => {
    // => [{ href, text}]
  })
  .catch(console.error);

mdLinks("fileName", --validate)
  .then(links => {
    // => [{ href, text, status, ok }]
  })
  .catch(console.error);

mdLinks("fileName")
  .then(links => {
    // => [{ href, text}]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación se ejecut de la siguiente
manera a través de la terminal:

`validate-md <path-to-file> [options]`

Por ejemplo:

```sh
$ validate-md README.md
Correct File extension
[
  { HREF: 'https://es.wikipedia.org/wiki/Markdown', TEXT: 'Markdown' },
  { HREF: 'https://nodejs.org/', TEXT: 'Node.js' },
  { HREF: 'https://nodejs.org/es/', TEXT: 'Node.js' },
]

$ validate-md README.md --validate
Correct File extension
{
  ok: [
    {
      href: 'https://en.wikipedia.org/wiki/Parsing',
      status: 200,
      result: 'OK',
      text: 'Parsing'
    },
    {
      href: 'http://community.laboratoria.la/c/js',
      status: 200,
      result: 'OK',
      text: 'foro de la comunidad'
    },
    {
      href: 'https://semver.org/',
      status: 200,
      result: 'OK',
      text: 'semver'
    },

$ validate-md README.md --stats
Correct File extension
{ TOTAL: 49, UNIQUE: 47 }

$ validate-md README.md --validate--stats
Correct File extension
{ TOTAL: 49, UNIQUE: 47, BROKEN: 2 }

```
