# Instrucciones para Añadir Logos de Clientes

## Carrusel de Logos de Clientes

Se ha añadido un carrusel horizontal de logos de clientes en la página principal, justo antes de la sección de contacto.

## Características del Carrusel

- **Diseño**: Carrusel horizontal largo y delgado
- **Efecto**: Los logos aparecen en escala de grises (grayscale) y se colorean al pasar el mouse
- **Animación**: Desplazamiento automático continuo e infinito
- **Pausa**: El carrusel se pausa cuando pasas el mouse sobre él
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## Cómo Añadir tus Logos

### Paso 1: Crear la Carpeta
Crea una carpeta llamada `clientes` dentro de la carpeta `catalogo`:
```
catalogo/
  └── clientes/
      ├── logo1.png
      ├── logo2.png
      ├── logo3.png
      └── ...
```

### Paso 2: Preparar los Logos
- **Formato recomendado**: PNG con fondo transparente
- **Tamaño recomendado**: 400x200 píxeles (ancho x alto)
- **Calidad**: Alta resolución para que se vean bien
- **Nombres**: Puedes usar nombres descriptivos como `cliente-empresa.png`

### Paso 3: Actualizar el HTML
Abre el archivo `index.html` y busca la sección `<!-- Clients Carousel Section -->`.

Reemplaza los logos de ejemplo con tus logos reales:

```html
<div class="client-logo">
    <img src="catalogo/clientes/tu-logo-1.png" alt="Nombre Cliente 1">
</div>
<div class="client-logo">
    <img src="catalogo/clientes/tu-logo-2.png" alt="Nombre Cliente 2">
</div>
<!-- Añade más logos según necesites -->
```

### Paso 4: Duplicar para Efecto Infinito
Para que el carrusel se vea continuo, duplica todos los logos al final:

```html
<!-- Primera serie de logos -->
<div class="client-logo">
    <img src="catalogo/clientes/logo1.png" alt="Cliente 1">
</div>
<!-- ... más logos ... -->

<!-- Segunda serie (duplicada) -->
<div class="client-logo">
    <img src="catalogo/clientes/logo1.png" alt="Cliente 1">
</div>
<!-- ... mismos logos duplicados ... -->
```

## Personalización

### Cambiar la Velocidad del Carrusel
En el archivo `styles.css`, busca:
```css
animation: scroll-clients 30s linear infinite;
```
- Aumenta el número (ej: 40s) para hacerlo más lento
- Disminuye el número (ej: 20s) para hacerlo más rápido

### Cambiar el Espacio entre Logos
En el archivo `styles.css`, busca:
```css
.clients-track {
    gap: 4rem;
}
```
- Aumenta el valor para más espacio
- Disminuye el valor para menos espacio

### Cambiar el Tamaño de los Logos
En el archivo `styles.css`, busca:
```css
.client-logo {
    width: 180px;
    height: 100px;
}
```
Ajusta estos valores según tus necesidades.

## Ejemplo de Estructura Completa

```html
<div class="clients-track">
    <!-- Primera serie -->
    <div class="client-logo">
        <img src="catalogo/clientes/empresa1.png" alt="Empresa 1">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa2.png" alt="Empresa 2">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa3.png" alt="Empresa 3">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa4.png" alt="Empresa 4">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa5.png" alt="Empresa 5">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa6.png" alt="Empresa 6">
    </div>
    
    <!-- Segunda serie (duplicada para efecto infinito) -->
    <div class="client-logo">
        <img src="catalogo/clientes/empresa1.png" alt="Empresa 1">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa2.png" alt="Empresa 2">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa3.png" alt="Empresa 3">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa4.png" alt="Empresa 4">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa5.png" alt="Empresa 5">
    </div>
    <div class="client-logo">
        <img src="catalogo/clientes/empresa6.png" alt="Empresa 6">
    </div>
</div>
```

## Notas Importantes

1. **Cantidad de logos**: Puedes añadir tantos logos como quieras. El carrusel se ajustará automáticamente.

2. **Duplicación**: Siempre duplica todos los logos para que el efecto infinito funcione correctamente.

3. **Calidad**: Usa imágenes de alta calidad para que se vean profesionales.

4. **Derechos**: Asegúrate de tener permiso para usar los logos de tus clientes.

5. **Optimización**: Comprime las imágenes para que la página cargue más rápido.

## Soporte

Si necesitas ayuda adicional o quieres personalizar más el carrusel, no dudes en preguntar.
