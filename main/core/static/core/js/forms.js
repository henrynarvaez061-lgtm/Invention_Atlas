        // Guardar activo.

        async function saveAsset(event) {
            event.preventDefault();

            const form = event.target;
            const data = formObj(form);

            data.id = data.codigo;
            data.valor = Number(data.valor || 0);
            data.vidaUtil = 0;

            try {
                await post('activos_universidad', data);

                closeModals();
                form.reset();

                toast('Activo registrado correctamente');
                await refreshAll();

            } catch (error) {
                toast(error.message, true);
            }
        }

        // Guardar orden de trabajo.

        async function saveOrder(event) {
            event.preventDefault();

            const form = event.target;
            const data = formObj(form);

            data.id = 'OT-' + Date.now();
            data.fecha = date();

            try {
                await post('ordenes_activos', data);

                closeModals();
                form.reset();

                toast('Orden de trabajo creada');
                await refreshAll();

            } catch (error) {
                toast(error.message, true);
            }
        }

        // Guardar registro del historial.

        async function saveHistory(event) {
            event.preventDefault();

            const form = event.target;
            const data = formObj(form);

            data.id = 'H-' + Date.now();
            data.fecha = date();
            data.costo = Number(data.costo || 0);
            data.cantidad = Number(data.cantidad || 0);

            try {
                await post('historial_activos', data);

                closeModals();
                form.reset();

                toast('Registro guardado en el historial');
                await refreshAll();

            } catch (error) {
                toast(error.message, true);
            }
        }

        // Crear orden directamente desde un activo.

        function newOrder(id) {
            showSection(
                'orders',
                document.querySelectorAll('.nav button')[2]
            );

            openModal('orderModal');

            document.querySelector('#orderAsset').value = id;
        }
