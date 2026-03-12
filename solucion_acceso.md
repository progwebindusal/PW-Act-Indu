# 🔧 Solución: "No se puede acceder a este sitio"

## 🚨 Problema
El navegador muestra "No se puede acceder a este sitio" al intentar abrir los archivos HTML.

## ✅ Soluciones

### Opción 1: Servidor Python (Recomendado)
```bash
# En la terminal, navega a la carpeta del proyecto y ejecuta:
python server.py
# o si tienes Python 3:
python3 server.py
```

### Opción 2: Servidor Node.js
```bash
# En la terminal, navega a la carpeta del proyecto y ejecuta:
node server.js
```

### Opción 3: Servidor HTTP Simple de Python
```bash
# Python 3:
python -m http.server 8000

# Python 2:
python -m SimpleHTTPServer 8000
```

### Opción 4: Usar Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `test.html` o `index.html`
3. Selecciona "Open with Live Server"

### Opción 5: Navegador con flags especiales
```bash
# Chrome (desactivar seguridad CORS - solo para desarrollo):
google-chrome --disable-web-security --user-data-dir="/tmp/chrome_dev"

# Firefox (abrir archivo directamente):
firefox index.html
```

## 🧪 Verificación

1. **Primero prueba**: `test.html` - Página simple de verificación
2. **Luego prueba**: `index.html` - Página principal de Indusalca
3. **Finalmente**: `productos.html` - Página de productos

## 🔍 Diagnóstico de Problemas

### Si el servidor no inicia:
- **Puerto ocupado**: Cambia el puerto en el archivo del servidor
- **Python/Node no instalado**: Instala Python o Node.js
- **Permisos**: Ejecuta como administrador si es necesario

### Si las páginas no cargan correctamente:
1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console" para ver errores
3. Ve a la pestaña "Network" para ver archivos que no cargan

### Errores comunes y soluciones:

#### ❌ "CORS policy" o "file://" protocol
**Solución**: Usar un servidor HTTP local (opciones 1-3)

#### ❌ "404 Not Found" para CSS/JS
**Solución**: Verificar que todos los archivos estén en la misma carpeta

#### ❌ Fuentes no cargan
**Solución**: Conexión a internet requerida para Google Fonts y Font Awesome

#### ❌ JavaScript no funciona
**Solución**: Verificar errores en la consola del navegador

## 📱 URLs de Acceso

Una vez que el servidor esté funcionando:

- **Página de prueba**: http://localhost:8000/test.html
- **Página principal**: http://localhost:8000/index.html  
- **Página de productos**: http://localhost:8000/productos.html

## 🆘 Si nada funciona

1. **Verifica los archivos**:
   ```bash
   ls -la *.html *.css *.js
   ```

2. **Prueba con un archivo simple**:
   - Abre `test.html` directamente en el navegador
   - Si funciona, el problema está en los archivos principales

3. **Revisa la consola del navegador**:
   - Presiona F12
   - Ve a "Console" y busca errores en rojo

4. **Contacta soporte**:
   - Copia los errores de la consola
   - Indica qué método intentaste usar
   - Especifica tu sistema operativo y navegador

## 🎯 Método Rápido

```bash
# Copia y pega en la terminal:
python3 -m http.server 8000 && echo "Abre: http://localhost:8000/test.html"
```

¡La página de Indusalca debería funcionar perfectamente! 🚀