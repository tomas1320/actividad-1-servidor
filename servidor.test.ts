import { test, before, after } from 'node:test';
import assert from 'node:assert';

let servidor: typeof import('./src/servidor.js').servidor;

before(async () => {
  process.env.NODE_ENV = 'test';
  ({ servidor } = await import('./src/servidor.js'));
  // Inicia el servidor en el puerto 3000 antes de correr la prueba
  servidor.listen(3000);
});

after(() => {
  // Cierra el servidor para liberar el puerto al terminar
  servidor.close();
});

test('GET /hora debe responder 200 y la hora actual en formato ISO', async () => {
  const respuesta = await fetch('http://127.0.0.1:3000/hora');
  const datos = await respuesta.json();

  assert.strictEqual(respuesta.status, 200);
  assert.ok(datos.hora);
  assert.doesNotThrow(() => new Date(datos.hora));
});