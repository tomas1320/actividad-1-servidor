import { createServer } from "node:http";

const puerto = Number(process.env.PORT ?? 3000);

export const servidor = createServer((solicitud, respuesta) => {
  respuesta.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  // Endpoint 1: GET /salud
  if (solicitud.method === "GET" && solicitud.url === "/salud") {
    respuesta.writeHead(200);
    respuesta.end(
      JSON.stringify({
        estado: "ok",
        fecha: new Date().toISOString()
      })
    );
    return;
  }

  // NUEVO ENDPOINT (XP / TDD): GET /hora
  if (solicitud.method === "GET" && solicitud.url === "/hora") {
    respuesta.writeHead(200);
    respuesta.end(
      JSON.stringify({
        hora: new Date().toISOString()
      })
    );
    return;
  }

  // Ruta no encontrada
  respuesta.writeHead(404);
  respuesta.end(
    JSON.stringify({
      error: "Recurso no encontrado"
    })
  );
});

// Arrancar servidor
if (process.env.NODE_ENV !== "test") {
  servidor.listen(puerto, () => {
    console.log(`Servidor disponible en http://localhost:${puerto}`);
  });
}