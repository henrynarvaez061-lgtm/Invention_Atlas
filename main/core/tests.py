"""
Pruebas básicas de la API y de la interfaz de Atlas MN.

Nota IA: parte de este código fue generado con ayuda de IA (OpenCode/Claude).
Ejecutar con: python manage.py test
"""
from rest_framework import status
from rest_framework.test import APITestCase

ACTIVO_DE_PRUEBA = {
    "id": "ACT-TEST-001",
    "codigo": "ACT-TEST-001",
    "nombre": "Monitor de prueba",
    "categoria": "Computación",
    "ubicacion": "Edificio C · Sala 1",
    "responsable": "QA",
    "estado": "Operativo",
}


class HealthTests(APITestCase):
    def test_health_responde_ok(self):
        response = self.client.get("/api/health/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "ok")


class InterfazTests(APITestCase):
    def test_pagina_principal_se_interpreta(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, "Atlas")


class ActivosAPITests(APITestCase):
    def test_crear_listar_y_eliminar(self):
        # Crear
        response = self.client.post(
            "/api/storages/activos_universidad", ACTIVO_DE_PRUEBA, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Listar
        response = self.client.get("/api/storages/activos_universidad")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("items", response.data)
        self.assertIn("total", response.data)
        self.assertTrue(
            any(item["id"] == "ACT-TEST-001" for item in response.data["items"])
        )

        # Eliminar
        response = self.client.delete("/api/storages/activos_universidad/ACT-TEST-001")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["deleted"], "ACT-TEST-001")

        # Volver a eliminar: ya no existe → 404
        response = self.client.delete("/api/storages/activos_universidad/ACT-TEST-001")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_recurso_invalido_responde_404(self):
        response = self.client.get("/api/storages/recurso_inexistente")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_datos_invalidos_responde_400(self):
        response = self.client.post(
            "/api/storages/activos_universidad", {"id": "X"}, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_listado_devuelve_estructura_items_y_total(self):
        response = self.client.get("/api/storages/activos_universidad")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(list(response.data.keys()), ["items", "total"])
        self.assertEqual(response.data["total"], len(response.data["items"]))

