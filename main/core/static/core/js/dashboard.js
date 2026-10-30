        // Actualizar el resumen.

        function updateDashboard() {
            const total = assets.length;

            const good = assets.filter(
                asset => asset.estado === 'Operativo'
            ).length;

            const urgent = assets.filter(
                asset =>
                    asset.estado === 'Fuera de servicio' ||
                    asset.estado === 'En mantenimiento'
            ).length;

            const value = assets.reduce(
                (sum, asset) => sum + Number(asset.valor || 0),
                0
            );

            const due = assets.filter(
                asset => asset.proximaRevision &&
                    asset.proximaRevision < date()
            ).length;

            const money = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            });

            animateNumber('#total', total);
            animateNumber('#operativos', good);
            animateNumber('#prioridad', urgent);
            animateNumber('#valor', value, v => money.format(v));

            const cell = document.querySelector('#kpiPrioridad');
            cell?.classList.remove('attn', 'crit');

            if (assets.filter(a => a.estado === 'Fuera de servicio').length) {
                cell?.classList.add('crit');
            } else if (urgent) {
                cell?.classList.add('attn');
            }

            const percentage = total
                ? Math.round(good / total * 100)
                : 0;

            document.querySelector('#health').textContent = percentage + '%';

            document.querySelector('#healthBar').style.width = percentage + '%';
            document.querySelector('#healthBar').style.background =
                percentage >= 85 ? 'var(--ok)' : percentage >= 60 ? 'var(--warn)' : 'var(--danger)';

            const marker = document.querySelector('#healthMarker');

            if (marker) marker.style.left = percentage + '%';

            document.querySelector('#overdue').textContent = due;

            document.querySelector('#recent').innerHTML = assets.length
                ? table(assets.slice(-5).reverse(), false)
                : empty('boxes', 'Aún no hay activos', 'Registra el primer equipo para verlo aquí.');

            document.querySelector('#alerts').innerHTML = urgent
                ? assets
                    .filter(asset => asset.estado !== 'Operativo')
                    .slice(0, 3)
                    .map(asset => `
                        <div class="alert ${asset.estado === 'Fuera de servicio' ? 'd' : ''}">
                            <i data-lucide="${asset.estado === 'Fuera de servicio' ? 'x-circle' : 'triangle-alert'}" aria-hidden="true"></i>
                            <div>
                                <strong>${esc(asset.nombre)}</strong>
                                <span>${esc(asset.estado)} · ${esc(asset.ubicacion)}</span>
                            </div>
                        </div>
                    `).join('')
                : `
                    <div class="alert ok">
                        <i data-lucide="check-circle" aria-hidden="true"></i>
                        <div>
                            <strong>Todo bajo control</strong>
                            <span>No hay alertas activas en el inventario.</span>
                        </div>
                    </div>
                `;

            lucide.createIcons();
        }

        function animateNumber(selector, value, format = String) {
            const element = document.querySelector(selector);

            if (!element) return;

            if (reduceMotion()) {
                element.textContent = format(value);
                return;
            }

            const from = Number(String(element.textContent).replace(/[^\d.-]/g, '')) || 0;
            const start = performance.now();
            const duration = 480;

            const step = now => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                element.textContent = format(Math.round(from + (value - from) * eased));

                if (progress < 1) requestAnimationFrame(step);
                else element.textContent = format(value);
            };

            requestAnimationFrame(step);
        }
