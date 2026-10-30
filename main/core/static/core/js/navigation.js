        // Navegación entre secciones.

        const SECTIONS = {
            dashboard: {
                title: 'Resumen de activos',
                subtitle: 'Visibilidad total para mantener tu universidad en movimiento.'
            },
            assets: {
                title: 'Inventario de activos',
                subtitle: 'Cada equipo con su placa, su estado y su responsable.'
            },
            orders: {
                title: 'Órdenes de trabajo',
                subtitle: 'Prioriza, asigna y cierra el mantenimiento pendiente.'
            },
            history: {
                title: 'Historial e incidencias',
                subtitle: 'El registro completo de lo que le ha pasado a cada activo.'
            }
        };

        function showSection(name, button) {
            ['dashboard', 'assets', 'orders', 'history'].forEach(section => {
                document.querySelector('#' + section).style.display =
                    section === name ? 'block' : 'none';
            });

            document.querySelectorAll('.nav button').forEach(item => {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            });

            button?.classList.add('active');
            button?.setAttribute('aria-current', 'page');

            const meta = SECTIONS[name] || SECTIONS.dashboard;

            document.querySelector('#pageTitle').textContent = meta.title;
            document.querySelector('#pageSubtitle').textContent = meta.subtitle;

            const section = document.querySelector('#' + name);

            if (section && !reduceMotion()) {
                section.animate(
                    [
                        { opacity: 0, transform: 'translateY(8px)' },
                        { opacity: 1, transform: 'translateY(0)' }
                    ],
                    { duration: 260, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
                );
            }

            if (window.innerWidth <= 860) {
                window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
            }
        }
