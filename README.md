# Sistema de Reservas — Hotel Pequeño
Prototipo académico de gestión de reservas, check-in, check-out y servicios del hotel.

---

## Tecnologías
- **Backend:** Node.js + Express + SQLite (better-sqlite3)
- **Frontend:** Vite + Vanilla JS
- **Base de datos:** SQLite — archivo `hotel.db`

---

## Instalación y ejecución

### Requisitos
- Node.js v18+
- Git

### Backend
```bash
cd Hotel-SaaS-Backend
npm install
npm run dev
```
El servidor corre en `http://localhost:3000`

### Base de datos
1. Abrir **DB Browser for SQLite**
2. Abrir el archivo `database/hotel.db`
3. Ejecutar `database/schema.sql` en la pestaña "Execute SQL"
4. Ejecutar `database/seed.sql` para cargar los datos iniciales
5. Cerrar DB Browser antes de correr el servidor

### Frontend
```bash
cd Hotel-SaaS-Frontend/frontend
npm install
npm run dev
```
El frontend corre en `http://localhost:5173`

> ⚠️ Nunca tener DB Browser abierto mientras el servidor está corriendo — SQLite no permite dos procesos simultáneos.

---

## Arquitectura

### Tipo
**Monolítica modular con patrón MVC extendido en 4 capas:**
```
Route → Controller → Service → Repository → SQLite
```

Cada capa tiene una única responsabilidad:
- **Route** — define los endpoints HTTP
- **Controller** — recibe el request y devuelve el response
- **Service** — aplica las reglas de negocio
- **Repository** — ejecuta las queries SQL

### C1 — Contexto del sistema
![image](https://github.com/linuxenthusiastic/Hotel-SaaS/blob/main/c4-diagram/C1-CONTEXT.png)
El sistema tiene un único actor (recepcionista) que interactúa con el sistema de reservas. No hay integraciones externas.

### C2 — Contenedores
![image](https://github.com/linuxenthusiastic/Hotel-SaaS/blob/main/c4-diagram/C2-CONTENEDORES.png)
| Contenedor | Tecnología | Descripción |
|---|---|---|
| Frontend | Vite + Vanilla JS | SPA con navegación por pestañas |
| Backend | Node.js + Express | API REST en puerto 3000 |
| Base de datos | SQLite | Archivo hotel.db con 5 tablas |

### C3 — Componentes del backend
![image](https://github.com/linuxenthusiastic/Hotel-SaaS/blob/main/c4-diagram/C3-COMPONENTES.png)
```
controllers/    → GuestController, ReservationController, CheckinController,
                  CheckoutController, RoomController, HotelServiceController
services/       → GuestService, ReservationService, CheckinService,
                  CheckoutService, RoomService, HotelServiceService
repositories/   → GuestRepository, ReservationRepository, CheckinRepository,
                  RoomRepository, HotelServiceRepository
models/         → Guest, GuestFactory, RoomStrategy, ReservationState, ReservationStatus
config/         → database.js, container.js
```

---

## Modelo de base de datos
![image](https://github.com/linuxenthusiastic/Hotel-SaaS/blob/main/db-model/ModeloBaseDeDatos.png)
---

## Patrones de diseño implementados

### Backend

| Patrón | Dónde | Para qué |
|---|---|---|
| **Repository** | `repositories/` | Centraliza el acceso a la DB |
| **Factory** | `GuestFactory.js` | Construye y valida objetos Guest |
| **Strategy** | `RoomStrategy.js` | Define características por tipo de habitación |
| **State** | `ReservationState.js` | Controla el ciclo de vida de una reserva |
| **Singleton** | `database.js` | Una sola conexión a SQLite en todo el sistema |
| **Dependency Injection** | `container.js` | Desacopla las capas del sistema |

### Frontend

| Patrón | Dónde | Para qué |
|---|---|---|
| **Module** | Cada archivo `.js` | Encapsula la lógica de cada página |
| **Observer** | `addEventListener` | Reacciona a eventos del usuario |

---

## Ciclo de vida de una reserva
```
CONFIRMED ──→ CHECKED_IN ──→ CHECKED_OUT
     │
     └──→ CANCELLED (con mora del 10%)
```

El patrón **State** garantiza que no se puedan hacer transiciones inválidas.
Por ejemplo — intentar hacer checkout de una reserva CONFIRMED lanza un error de negocio.

---

## Decisiones de diseño

**SQLite sobre PostgreSQL** — para un prototipo académico de una semana, SQLite elimina la necesidad de instalar y configurar un servidor de base de datos. El sistema es completamente portable — el archivo `hotel.db` contiene toda la información.

**Datos precargados vs CRUD** — las habitaciones y servicios del hotel se cargan via seed y no tienen módulo de administración. Decisión consciente del alcance del prototipo. Cualquier hotel puede adaptar el `seed.sql` a su realidad sin modificar el código.

**Strategy hardcodeado vs DB** — los tipos de habitación están definidos en `RoomStrategy.js` porque la HU-05 define tipos fijos del negocio. En un sistema productivo estos tipos vivirían en la base de datos para permitir configuración sin cambios de código.

**Dependency Injection manual vs framework** — se implementó un `container.js` artesanal en lugar de usar un framework de DI. Decisión pedagógica — demuestra el principio sin agregar dependencias externas.

---

## Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/guests` | Lista huéspedes |
| POST | `/api/guests` | Registra huésped |
| GET | `/api/guests/doc/:document` | Busca por documento |
| GET | `/api/reservations/active` | Reservas activas |
| POST | `/api/reservations` | Crea reserva |
| PATCH | `/api/reservations/:id/cancel` | Cancela con mora |
| PATCH | `/api/checkin/:reservationId` | Registra check-in |
| PATCH | `/api/checkout/:reservationId` | Registra check-out |
| GET | `/api/rooms/types` | Tipos de habitación |
| GET | `/api/rooms/available` | Habitaciones disponibles |
| GET | `/api/hotel-services` | Servicios del hotel |
