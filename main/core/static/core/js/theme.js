        // Tema claro / oscuro.

        function updateThemeButton() {
            const theme = document.documentElement.getAttribute('data-theme');

            const button = document.querySelector('#themeToggle');

            if (!button) return;

            const icon = theme === 'dark' ? 'sun' : 'moon';
            const label = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';

            button.innerHTML = `
                <i data-lucide="${icon}" aria-hidden="true"></i>
                <span id="themeLabel">${label}</span>
            `;

            button.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');

            lucide.createIcons();
        }

        function toggleTheme() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', next);

            try {
                localStorage.setItem('atlas-theme', next);
            } catch (error) {
                /* almacenamiento no disponible */
            }

            updateThemeButton();
        }

        // Cerrar con Escape y gestos de arrastre.

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                if (document.querySelector('#assetDrawer').classList.contains('open')) {
                    closeDrawer();
                } else {
                    closeModals();
                }
            }
        });
