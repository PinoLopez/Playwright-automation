import { setupServer } from "msw/node"

import { handlers } from "../mocks/handlers"

const server = setupServer(...handlers)

export default async function globalSetup() {
  // Inicia MSW antes de todas las pruebas
  server.listen({ onUnhandledRequest: "bypass" })
  console.log("MSW está corriendo")

  // Retorna una función de cleanup que se ejecuta al final de todas las pruebas
  return async () => {
    server.close()
    console.log("MSW detenido")
  }
}
