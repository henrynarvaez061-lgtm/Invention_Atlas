        // Colores de los estados.

        function badge(status) {
            const color =
                status === 'Operativo' || status === 'Completada'
                    ? 'ok'
                    : status === 'Fuera de servicio' || status === 'Urgente'
                        ? 'danger'
                        : status === 'En mantenimiento' || status === 'Alta'
                            ? 'warn'
                            : '';

            return `
                <span class="status-tab ${color}">
                    ${esc(status || '–')}
                </span>
            `;
        }

        // Crear tablas de activos.

        function table(items, actions = true) {
            return `
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Activo</th>
                                <th scope="col">Ubicación</th>
                                <th scope="col">Responsable</th>
                                <th scope="col">Estado</th>
                                ${actions ? '<th scope="col"><span class="sr-only">Acciones</span></th>' : ''}
                            </tr>
                        </thead>

                        <tbody>
                            ${items.map((asset, index) => `
                                <tr class="clickable" style="animation-delay:${Math.min(index, 10) * 45}ms"
                                    onclick="openAsset('${esc(asset.id)}')">
                                    <td class="cell-primary" data-label="Activo">
                                        <div class="asset">
                                            <div class="asset-plate">
                                                <span class="asset-code">${esc(asset.codigo)}</span>
                                                <strong class="asset-name">${esc(asset.nombre)}</strong>
                                                <span class="asset-meta">${esc(asset.marca || '')}${asset.modelo ? ' · ' + esc(asset.modelo) : ''}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td data-label="Ubicación">${esc(asset.ubicacion)}</td>
                                    <td data-label="Responsable">${esc(asset.responsable)}</td>
                                    <td data-label="Estado">${badge(asset.estado)}</td>

                                    ${actions ? `
                                        <td class="cell-actions" data-label="Acciones">
                                            <span class="row-actions">
                                                <button
                                                    class="btn icon ghost"
                                                    onclick="event.stopPropagation(); newOrder('${esc(asset.id)}')"
                                                    aria-label="Crear orden de trabajo"
                                                    title="Crear orden de trabajo"
                                                >
                                                    <i data-lucide="wrench" aria-hidden="true"></i>
                                                </button>
                                                <button
                                                    class="btn icon ghost"
                                                    onclick="event.stopPropagation(); openAsset('${esc(asset.id)}')"
                                                    aria-label="Ver detalle del activo"
                                                    title="Ver detalle del activo"
                                                >
                                                    <i data-lucide="panel-right" aria-hidden="true"></i>
                                                </button>
                                            </span>
                                        </td>
                                    ` : ''}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // Buscar y filtrar activos.

        function renderAssets() {
            const query = (
                document.querySelector('#search')?.value || ''
            ).toLowerCase();

            const status = document.querySelector('#status')?.value || '';

            const list = assets.filter(asset =>
                (!status || asset.estado === status) &&
                (!query || Object.values(asset).join(' ').toLowerCase().includes(query))
            );

            document.querySelector('#assetsTable').innerHTML = loading
                ? skeleton()
                : list.length
                    ? table(list)
                    : empty('search', 'Sin resultados', 'No encontramos activos con esos filtros.');

            const count = document.querySelector('#assetsCount');

            if (count) {
                count.textContent = loading
                    ? ''
                    : `${list.length} de ${assets.length} activos`;
            }

            lucide.createIcons();
        }

        // Mostrar órdenes de trabajo.

        function renderOrders() {
            document.querySelector('#ordersTable').innerHTML = loading
                ? skeleton()
                : orders.length
                    ? `
                        <div class="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Orden</th>
                                        <th scope="col">Activo</th>
                                        <th scope="col">Responsable</th>
                                        <th scope="col">Prioridad</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Vencimiento</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    ${orders.map((order, index) => `
                                        <tr style="animation-delay:${Math.min(index, 10) * 45}ms">
                                            <td class="cell-primary" data-label="Orden">
                                                <strong>${esc(order.titulo)}</strong>
                                                <br>
                                                <span class="muted num">${esc(order.id)}</span>
                                            </td>

                                            <td data-label="Activo">
                                                ${esc(
                                                    assets.find(asset => asset.id === order.activoId)?.nombre
                                                    || order.activoId
                                                )}
                                            </td>

                                            <td data-label="Responsable">${esc(order.responsable)}</td>
                                            <td data-label="Prioridad">${badge(order.prioridad)}</td>
                                            <td data-label="Estado">${badge(order.estado)}</td>
                                            <td data-label="Vencimiento" class="num">${esc(order.vencimiento)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `
                    : empty('clipboard-list', 'Sin órdenes', 'No hay órdenes de trabajo abiertas.');

            lucide.createIcons();
        }

        // Mostrar historial de incidencias.

        function renderHistory() {
            document.querySelector('#historyTable').innerHTML = loading
                ? skeleton()
                : history.length
                    ? `
                        <div class="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Activo</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Detalle</th>
                                        <th scope="col">Prioridad</th>
                                        <th scope="col">Costo</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    ${history.slice().reverse().map((record, index) => `
                                        <tr style="animation-delay:${Math.min(index, 10) * 45}ms">
                                            <td class="num" data-label="Fecha">${esc(record.fecha)}</td>

                                            <td data-label="Activo">
                                                ${esc(
                                                    assets.find(asset => asset.id === record.activoId)?.nombre
                                                    || record.activoId
                                                )}
                                            </td>

                                            <td data-label="Tipo">${esc(record.tipo)}</td>
                                            <td data-label="Detalle">${esc(record.detalle)}</td>
                                            <td data-label="Prioridad">${badge(record.prioridad)}</td>
                                            <td class="num" data-label="Costo">$${Number(record.costo || 0).toLocaleString('es-CO')}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    `
                    : empty('history', 'Sin registros', 'Aún no hay incidencias o revisiones.');

            lucide.createIcons();
        }

        // Mensajes cuando no existen registros.

        function empty(icon, message, detail = '') {
            return `
                <div class="empty">
                    <i data-lucide="${icon}" aria-hidden="true"></i>
                    <strong>${message}</strong>
                    <div>${detail}</div>
                </div>
            `;
        }

        // Esqueletos de carga.

        function skeleton(rows = 5) {
            return `
                <div class="table-wrap" aria-hidden="true">
                    ${Array.from({ length: rows }).map(() => `
                        <div class="sk-row">
                            <span class="sk"></span><span class="sk"></span><span class="sk"></span><span class="sk"></span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function showSkeletons() {
            ['#recent', '#assetsTable', '#ordersTable', '#historyTable'].forEach(selector => {
                const element = document.querySelector(selector);

                if (element) element.innerHTML = skeleton();
            });

            document.querySelector('#assetsCount').textContent = '';
        }

        // Llenar selectores de activos.

        function fillSelectors() {
            ['orderAsset', 'historyAsset'].forEach(id => {
                document.querySelector('#' + id).innerHTML =
                    '<option value="">Selecciona un activo...</option>' +
                    assets.map(asset => `
                        <option value="${esc(asset.id)}">
                            ${esc(asset.codigo)} · ${esc(asset.nombre)}
                        </option>
                    `).join('');
            });
        }

        // Convertir formularios a objetos.

        function formObj(form) {
            return Object.fromEntries(new FormData(form).entries());
        }
