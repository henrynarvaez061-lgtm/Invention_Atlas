# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- University operations/maintenance teams
- Facilities management staff
- IT/technical staff responsible for equipment
- Administrative personnel managing university assets

## Product Purpose

Atlas is a university asset management system that centralizes inventory tracking, work orders, and maintenance history. It enables operations teams to maintain visibility over assets, prioritize maintenance, and ensure university resources remain operational.

Success means: reduced downtime, timely maintenance, complete asset visibility, and efficient work order management.

## Positioning

A focused asset management tool tailored to university operations with clear operational health indicators and Spanish-language interface.

## Operating Context

- Web-based dashboard accessed by operations teams
- Daily management of physical assets (equipment, furniture, infrastructure)
- Work order creation and tracking
- Maintenance history logging
- Multi-user access for different roles

## Capabilities and Constraints

**Capabilities:**
- Asset registration and inventory (code, category, location, responsible, status, metadata)
- Work order management
- Maintenance/incident history tracking
- Dashboard with metrics and alerts
- Search and filtering
- Real-time status updates via API

**Constraints:**
- Spanish interface
- Django + DRF backend, vanilla HTML/CSS/JS frontend (no build step)
- Must maintain API compatibility with `/api/storages/*`
- Uses localStorage-like persistence via DRF API backed by SQLite
- Responsive design required

## Accessibility & Inclusion

Basic responsive design implemented. Further accessibility improvements may be considered.

## Evidence on Hand

- Live application at http://127.0.0.1:8000/
- Source: main/core/templates/core/index.html, Django backend
- API endpoints documented in README.md
