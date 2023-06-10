# Practica 3 Marcos Silva

Para iniciar el servidor es necesario seguir los siguientes pasos:

## Instalación

Desde la consola posicionarse en la carpeta practica-backend-final y ejecutar lo siguiente:

#### Para instalar las dependencias:
```bash
  npm install 
```

### Luego y opcionalmente las veces que sean necesarias para reiniciar la base de datos:

Posicionarse en la carpeta seeders y ejecutar lo siguiente para activar el seeder:
```bash
  node index.js 
```

y finalmente para iniciar el servidor en el puerto 3000 (esto siempre desde la carpeta practica-backend-final):
```bash
  node index.js 
```

Como opción voy a dejar el backend corriendo en la nube (render.com) por si la configuración de mongodb no funciona correctamente.
La version del backend de la nube siempre se actualiza automaticamente cuando se hace un push o pull request a la rama master, por lo que siempre sera la version mas nueva.