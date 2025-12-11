const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());

// Quitar X-Powered-By
app.use(helmet.hidePoweredBy());

// Proteger contra clickjacking (X-Frame-Options: DENY)
app.use(helmet.frameguard({ action: 'deny' }));

// Mitigar ataques XSS
app.use(helmet.xssFilter());

// Evitar que el navegador adivine el MIME-type
app.use(helmet.noSniff());

// Evitar que IE abra descargas en el contexto del sitio
app.use(helmet.ieNoOpen());


// Seguridad HSTS: Habilitar HTTPS por 90 días
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));

// Desactivar DNS Prefetching
app.use(helmet.dnsPrefetchControl());


// Desactivar caché del navegador
app.use(helmet.noCache());

// ----- AÑADIR CSP (la parte que pide el test) -----
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com']
    }
  })
);

// -----------------------------------------------
























module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Your app is listening on port ${port}`);
});
