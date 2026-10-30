        // Deslizar para cerrar (drawer y toast), con umbral por velocidad.

        function swipeToClose(element, handleSelector, onClose) {
            const handle = element.querySelector(handleSelector) || element;

            let startY = 0;
            let currentY = 0;
            let startTime = 0;
            let dragging = false;

            handle.addEventListener('pointerdown', event => {
                if (event.pointerType === 'mouse') return;
                dragging = true;
                startY = event.clientY;
                currentY = 0;
                startTime = Date.now();
                try { handle.setPointerCapture(event.pointerId); } catch (error) { /* sin captura */ }
            });

            handle.addEventListener('pointermove', event => {
                if (!dragging) return;
                currentY = Math.max(0, event.clientY - startY);

                if (reduceMotion()) return;

                element.style.transform = `translateY(${currentY}px)`;
                element.style.transition = 'none';
            });

            const end = () => {
                if (!dragging) return;
                dragging = false;

                element.style.transform = '';
                element.style.transition = '';

                const velocity = currentY / (Date.now() - startTime);

                if (currentY > 90 || velocity > 0.5) onClose();
            };

            handle.addEventListener('pointerup', end);
            handle.addEventListener('pointercancel', end);
        }

        const toastElement = document.querySelector('#toast');
        const drawerElement = document.querySelector('#assetDrawer');

        swipeToClose(toastElement, 'span', () => toastElement.classList.remove('show'));
        swipeToClose(drawerElement, '.drawer-head', closeDrawer);

        // Sincronizar el tema si el sistema cambia.

        window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', event => {
            if (localStorage.getItem('atlas-theme')) return;

            const next = event.matches ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', next);
            updateThemeButton();
        });

        // Inicializar la aplicación.

        updateThemeButton();
        lucide.createIcons();
        refreshAll();
