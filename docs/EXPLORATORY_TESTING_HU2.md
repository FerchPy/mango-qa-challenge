# 🔍 Reporte de Pruebas Exploratorias (Exploratory Testing Charter)

## 1. Product Overview (Buggy Cars Rating)
* **Nombre del producto:** Buggy Cars Rating (`https://buggy.justtestit.org/`)
* **Tipo de producto:** Aplicación Web (SPA) de opiniones y votación de automóviles.
* **Problema que resuelve:** Permite a entusiastas del automovilismo votar, comentar y consultar rankings y especificaciones técnicas de modelos de autos populares.
* **Usuarios principales:** Usuarios invitados (lectores) y usuarios registrados (votantes/comentaristas).

---

## 2. Charter de Pruebas Exploratorias (HU_2)
* **Título:** Exploración del flujo de votación, comentarios y visibilidad de controles según estado de autenticación.
* **Misión:** Explorar el comportamiento de la interfaz de usuario en la vista de detalle de un automóvil, evaluando el bloqueo de controles para invitados, la actualización de totales de votos y la consistencia de los datos en la tabla de comentarios al estar autenticado.
* **Área principal explorada:** Ficha de vehículo (Descripción, Especificaciones, Total Votos), Formulario de Votación/Comentario y Tabla de Comentarios (`Date`, `Author`, `Comment`).
* **Tester:** José Fernando Paniagua Benitez
* **Duración:** 45 minutos

---

## 3. Desglose de Tareas
* **15 min:** Exploración del flujo de invitado (Navegación sin login, verificación de elementos ocultos y mensajes de advertencia).
* **20 min:** Exploración del flujo de usuario autenticado (Efectividad de votación, opcionalidad de comentarios, actualización de tabla y contadores).
* **10 min:** Pruebas de bordes y consistencia de UI (Verificación de columnas Date, Author, Comment, especificaciones del vehículo y comportamientos ante clics repetidos).

---

## 4. Lista de Riesgos Identificados
* **Experiencia de Usuario (Invitado):** Si los controles de votación no se ocultan correctamente sin sesión activa, un usuario no autenticado podría intentar interactuar y experimentar fallos imprevistos.
* **Integridad de Votación:** La duplicación de votos por parte de un mismo usuario dentro de la misma sesión distorsionaría las estadísticas del vehículo.
* **Renderización de la Tabla:** Si los campos de la tabla no mapean correctamente la fecha, el autor o el comentario, se degrada la credibilidad de las reseñas de la comunidad.

---

## 5. Reporte de Defectos (Bugs) e Incidentes (HU_2)

### 🐛 Bug 1: Ausencia de redirección automática y persistencia de formulario tras un registro exitoso
* **Pasos para reproducir:**
  1. Navegar a la pantalla de registro (`/register`).
  2. Completar todos los campos obligatorios del formulario con datos válidos.
  3. Hacer clic en el botón **"Register"**.
* **Resultado esperado:** Tras mostrar el mensaje de confirmación de registro exitoso (*"Registration is successful"*), la aplicación debería limpiar los campos del formulario y redirigir automáticamente al usuario a la página de inicio (`/`) o habilitar la vista de login.
* **Resultado actual:** La aplicación muestra el mensaje de éxito en la cabecera, pero el formulario permanece estático en la pantalla manteniendo los datos ingresados. El usuario se ve obligado a hacer clic manualmente en la marca principal del menú (`Buggy Rating`) para navegar a la página de inicio.
* **Impacto:** **Medio** – Afecta la experiencia de usuario (UX) al requerir una interacción manual extra para salir del flujo de registro y deja expuestas las credenciales ingresadas en la pantalla si el usuario no navega hacia otra sección.

### ⚠️ Incidente / Issue 1: Falta de paginación en la tabla de comentarios
* **Observación:** Cuando un vehículo acumula una cantidad alta de reseñas, la tabla de comentarios aumenta considerablemente su altura vertical sin presentar controles claros de paginación, lo que degrada la navegación en la vista del detalle.