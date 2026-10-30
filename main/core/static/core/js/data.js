        const API = '/api/storages';

        let assets = [];
        let orders = [];
        let history = [];

        let loading = false;
        let lastFocused = null;

        const reduceMotion = () =>
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Seguridad: escapar texto antes de insertarlo en HTML.

        const esc = value =>
            String(value ?? '').replace(/[&<>"']/g, char => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            })[char]);

        // Consultas al backend.

        async function get(name) {
            const response = await fetch(`${API}/${name}?all=true`, {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('No se pudo cargar ' + name);
            }

            const data = await response.json();

            return data.items || data || [];
        }

        async function post(name, body) {
            const response = await fetch(`${API}/${name}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);

                throw new Error(data?.error || 'No se pudo guardar');
            }

            return response.json();
        }

        function date() {
            return new Date().toISOString().slice(0, 10);
        }

        // Actualizar información.

        async function refreshAll() {
            loading = true;

            if (!assets.length && !orders.length && !history.length) {
                showSkeletons();
            }

            try {
                [assets, orders, history] = await Promise.all([
                    get('activos_universidad'),
                    get('ordenes_activos'),
                    get('historial_activos')
                ]);

                loading = false;

                updateDashboard();
                renderAssets();
                renderOrders();
                renderHistory();
                fillSelectors();

            } catch (error) {
                loading = false;

                toast(error.message, true);

                renderAssets();
                renderOrders();
                renderHistory();
            }
        }
