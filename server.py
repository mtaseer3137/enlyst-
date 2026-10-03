"""
Enlyst Platform Local Development Server
Automatically finds an available port and opens the browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

DEFAULT_PORT = 8000

class EnlystHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable caching-friendly headers & cors for local preview
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    port = DEFAULT_PORT

    # Attempt to bind to port
    for p in range(DEFAULT_PORT, DEFAULT_PORT + 20):
        try:
            with socketserver.TCPServer(("", p), EnlystHTTPRequestHandler) as httpd:
                url = f"http://localhost:{p}"
                print(f"======================================================")
                print(f"  🚀 Enlyst Platform Live Server Running!")
                print(f"  👉 URL: {url}")
                print(f"  Press Ctrl+C to stop the server.")
                print(f"======================================================")
                
                # Automatically open default browser
                webbrowser.open(url)
                httpd.serve_forever()
                break
        except OSError:
            continue

if __name__ == '__main__':
    try:
        run_server()
    except KeyboardInterrupt:
        print("\nServer stopped gracefully.")
        sys.exit(0)
