import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
/*
  14/05/24
  Fede:
  Para poder acceder a los dispositivos de sonido y video y poder odificar settings es neecsario que el servidor local que arma Vite para desarrolo sea https, a tal fin
  se configura en este archivo el https server que te pide key y certificado.
  Para generar key y certificado utilizo el openssl que viene instalado con git, en mi caso C:\Program Files\Git\usr\bin
  ejecuto, dentro de la carpeta mencionada, el comando openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout receta_private.key -out receta_certificate.crt
  sigo las instrucciones y una vez finalizado copio los archivos de salida a la raiz de este proyecto.
  (El actual dura 1 año, no es válido pero cumple la función que se necesita)
*/ 
export default defineConfig({
  server: {
    https: {
      key: "receta_private.key",
      cert: "receta_certificate.crt"
    }
  },
  plugins: [react()],
})
