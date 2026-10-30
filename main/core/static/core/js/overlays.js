        // Control de ventanas modales.

        function openModal(id, trigger) {
            lastFocused = trigger || document.activeElement;

            const modal = document.querySelector('#' + id);

            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');

            fillSelectors();

            const first = modal.querySelector('input, select, textarea, button');

            if (first && !reduceMotion()) {
                setTimeout(() => first.focus({ preventScroll: true }), 60);
            }
        }

        function closeModals() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('open');
                modal.setAttribute('aria-hidden', 'true');
            });

            if (lastFocused) lastFocused.focus?.({ preventScroll: true });
        }

        // Detalle del activo (placa).

        function openAsset(id) {
            const asset = assets.find(item => item.id === id);

            if (!asset) return;

            lastFocused = document.activeElement;

            const money = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            });

            const fields = [
                ['Código', asset.codigo],
                ['Estado', asset.estado],
                ['Categoría', asset.categoria],
                ['Ubicación', asset.ubicacion],
                ['Responsable', asset.responsable],
                ['Marca', asset.marca || '–'],
                ['Modelo', asset.modelo || '–'],
                ['Adquisición', asset.adquisicion || '–'],
                ['Próxima revisión', asset.proximaRevision || '–'],
                ['Valor', money.format(Number(asset.valor || 0))]
            ];

            const relatedOrders = orders.filter(order => order.activoId === asset.id);
            const relatedHistory = history.filter(record => record.activoId === asset.id);

            document.querySelector('#drawerTitle').textContent = asset.nombre;
            document.querySelector('#drawerCode').textContent = `${asset.codigo} · ${asset.estado}`;

            document.querySelector('#drawerBody').innerHTML = `
                <div class="plate-grid">
                    ${fields.map(([label, value]) => `
                        <div class="plate-field">
                            <dt>${esc(label)}</dt>
                            <dd>${esc(value)}</dd>
                        </div>
                    `).join('')}
                </div>

                <div class="drawer-section">
                    <h3>Órdenes de trabajo</h3>
                    ${relatedOrders.length
                        ? `<div class="mini-list">
                            ${relatedOrders.map(order => `
                                <div class="mini-item">
                                    <div class="row-between">
                                        <strong>${esc(order.titulo)}</strong>
                                        ${badge(order.estado)}
                                    </div>
                                    <p>${esc(order.responsable)} · vence ${esc(order.vencimiento)}</p>
                                </div>
                            `).join('')}
                        </div>`
                        : '<p class="muted">Sin órdenes asociadas a este activo.</p>'}
                </div>

                <div class="drawer-section">
                    <h3>Historial</h3>
                    ${relatedHistory.length
                        ? `<div class="mini-list">
                            ${relatedHistory.map(record => `
                                <div class="mini-item">
                                    <div class="row-between">
                                        <strong>${esc(record.tipo)}</strong>
                                        <time class="num">${esc(record.fecha)}</time>
                                    </div>
                                    <p>${esc(record.detalle)}</p>
                                    <p class="muted">${esc(record.tecnico)} · $${Number(record.costo || 0).toLocaleString('es-CO')}</p>
                                </div>
                            `).join('')}
                        </div>`
                        : '<p class="muted">Sin registros en el historial.</p>'}
                </div>
            `;

            const drawer = document.querySelector('#assetDrawer');
            const backdrop = document.querySelector('#drawerBackdrop');

            document.querySelector('#drawerBody').scrollTop = 0;

            backdrop.hidden = false;
            requestAnimationFrame(() => backdrop.classList.add('show'));

            drawer.classList.add('open');
            drawer.setAttribute('aria-hidden', 'false');

            if (!reduceMotion()) {
                setTimeout(() => {
                    drawer.querySelector('button')?.focus({ preventScroll: true });
                }, 80);
            }

            lucide.createIcons();
        }

        function closeDrawer() {
            const drawer = document.querySelector('#assetDrawer');
            const backdrop = document.querySelector('#drawerBackdrop');

            drawer.classList.remove('open');
            drawer.setAttribute('aria-hidden', 'true');

            backdrop.classList.remove('show');
            setTimeout(() => { backdrop.hidden = true; }, 220);

            if (lastFocused) lastFocused.focus?.({ preventScroll: true });
        }

        // Mostrar notificaciones.

        let toastTimer = null;

        function toast(message, error = false) {
            const element = document.querySelector('#toast');

            element.className = 'toast' + (error ? ' error' : '');
            element.innerHTML = `
                <i data-lucide="${error ? 'alert-octagon' : 'check-circle'}" aria-hidden="true"></i>
                <span>${esc(message)}</span>
            `;

            lucide.createIcons();

            requestAnimationFrame(() => element.classList.add('show'));

            clearTimeout(toastTimer);

            toastTimer = setTimeout(() => {
                element.classList.remove('show');
            }, 3200);
        }
