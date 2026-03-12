#!/usr/bin/env python3
"""
Servidor HTTP simple para desarrollo local de Indusalca
Ejecutar con: python server.py
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

# Configuración
PORT = 8001
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Agregar headers para desarrollo
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 Servidor iniciado en http://localhost:{PORT}")
            print(f"📁 Sirviendo archivos desde: {DIRECTORY}")
            print("📋 Archivos disponibles:")
            
            # Listar archivos HTML
            for file in DIRECTORY.glob("*.html"):
                print(f"   • http://localhost:{PORT}/{file.name}")
            
            print("\n💡 Consejos:")
            print("   • Usa Ctrl+C para detener el servidor")
            print("   • Recarga la página si haces cambios en los archivos")
            print("   • Abre las herramientas de desarrollador (F12) para ver errores")
            
            # Abrir navegador automáticamente
            try:
                webbrowser.open(f'http://localhost:{PORT}/test.html')
                print(f"\n🌐 Abriendo navegador en http://localhost:{PORT}/test.html")
            except:
                print(f"\n🌐 Abre manualmente: http://localhost:{PORT}/test.html")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n👋 Servidor detenido")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: El puerto {PORT} ya está en uso")
            print("💡 Intenta con otro puerto o cierra el proceso que lo está usando")
        else:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()