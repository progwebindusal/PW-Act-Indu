#!/usr/bin/env node
/**
 * Servidor HTTP simple para desarrollo local de Indusalca
 * Ejecutar con: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;
const HOST = 'localhost';

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // Redirigir raíz a test.html
    if (filePath === './') {
        filePath = './test.html';
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Archivo no encontrado
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - Archivo no encontrado</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #e74c3c; }
                            a { color: #2c5aa0; text-decoration: none; }
                        </style>
                    </head>
                    <body>
                        <h1>404 - Archivo no encontrado</h1>
                        <p>El archivo <code>${req.url}</code> no existe.</p>
                        <p><a href="/test.html">← Volver a la página de prueba</a></p>
                        <p><a href="/index.html">← Ir a la página principal</a></p>
                    </body>
                    </html>
                `);
            } else {
                res.writeHead(500);
                res.end('Error del servidor: ' + error.code);
            }
        } else {
            // Headers para desarrollo (sin cache)
            res.writeHead(200, {
                'Content-Type': mimeType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log('🚀 Servidor iniciado en http://' + HOST + ':' + PORT);
    console.log('📁 Sirviendo archivos desde:', __dirname);
    console.log('📋 Páginas disponibles:');
    console.log('   • http://' + HOST + ':' + PORT + '/test.html (página de prueba)');
    console.log('   • http://' + HOST + ':' + PORT + '/index.html (página principal)');
    console.log('   • http://' + HOST + ':' + PORT + '/productos.html (página de productos)');
    console.log('\n💡 Consejos:');
    console.log('   • Usa Ctrl+C para detener el servidor');
    console.log('   • Recarga la página si haces cambios en los archivos');
    console.log('   • Abre las herramientas de desarrollador (F12) para ver errores');
    
    // Intentar abrir el navegador
    const url = `http://${HOST}:${PORT}/test.html`;
    const start = process.platform === 'darwin' ? 'open' : 
                  process.platform === 'win32' ? 'start' : 'xdg-open';
    
    exec(`${start} ${url}`, (error) => {
        if (error) {
            console.log('\n🌐 Abre manualmente:', url);
        } else {
            console.log('\n🌐 Abriendo navegador en:', url);
        }
    });
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`❌ Error: El puerto ${PORT} ya está en uso`);
        console.log('💡 Intenta con otro puerto o cierra el proceso que lo está usando');
    } else {
        console.log('❌ Error del servidor:', error);
    }
});

process.on('SIGINT', () => {
    console.log('\n👋 Servidor detenido');
    process.exit(0);
});