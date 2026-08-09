# 🎭 Buggy Cars Rating - Suite de Pruebas Automatizadas E2E (Playwright)

Este repositorio contiene la suite de automatización de pruebas End-to-End (E2E) desarrollada con **Playwright** para la **Historia de Usuario 2 (HU_2)** de la plataforma de pruebas [Buggy Cars Rating](https://buggy.justtestit.org/).

---

## 📌 Alcance de la Automatización

La suite cubre las siguientes funcionalidades y casos de prueba:

* **`TC_WEB_001` - [Invitado] Validación de componentes del auto y restricciones:**
  Verifica que un usuario no autenticado pueda consultar la descripción del vehículo, la tarjeta de especificaciones (`Engine`, `Max Speed`) y el contador total de votos (`Votes: X`), confirmando además que las funciones de votación estén restringidas con el mensaje informativo correspondiente.

* **`TC_WEB_002` - [Autenticado] Registro dinámico, login y voto con comentario:**
  Valida el flujo de punta a punta registrando un usuario dinámico mediante *timestamps*, realizando inicio de sesión, navegación hacia la ficha del auto y emisión de voto adjuntando un comentario.

* **`TC_WEB_003` - [Autenticado] Voto exitoso sin comentario (Campo Opcional):**
  Confirma la opcionalidad del área de texto de comentarios al emitir un voto exitoso dejando el campo vacío.

---

## 🛠️ Requisitos Previos

Asegúrate de contar con lo siguiente instalado en tu sistema:

* [Node.js](https://nodejs.org/) (Versión 18 o superior)
* [Git](https://git-scm.com/)

---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/FerchPy/mango-qa-challenge.git
   cd mango-qa-challenge
   ```

2. **Instalar las dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Instalar el navegador Chromium de Playwright:**
   ```bash
   npx playwright install chromium
   ```

---

## 🧪 Ejecución de Pruebas

Para ejecutar las pruebas en el entorno de ejecución oficial (**Chromium**):

```bash
npx playwright test --project=chromium
```

Para ejecutar las pruebas en modo encabezado (*headed*) y visualizar la interacción gráfica en pantalla:

```bash
npx playwright test --project=chromium --headed
```

---

## 📊 Generación de Reportes

Para generar y visualizar el reporte interactivo en HTML que ofrece Playwright:

1. **Ejecutar las pruebas indicando el reporter HTML:**
   ```bash
   npx playwright test --project=chromium --reporter=html
   ```

2. **Abrir el reporte visual interactivo en el navegador:**
   ```bash
   npx playwright show-report
   ```

---

## ⚙️ Decisiones Técnicas y Estrategia de Testing

* **Idempotencia de Datos:** Para garantizar la independencia de cada ejecución y evitar conflictos de duplicidad en la base de datos de la plataforma, la creación de usuarios emplea sufijos dinámicos (`qa_user_${Date.now()}`).

---

## 📁 Estructura del Proyecto

```text
mango-qa-challenge/
├── tests/
│   └── hu2_buggy_cars.spec.js   # Suite principal de pruebas E2E
├── playwright.config.js         # Configuración global de Playwright
├── package.json                 # Dependencias y scripts del proyecto
└── README.md                    # Documentación del repositorio
```

---

## ✒️ Autor
**José Fernando Paniagua** — *QA Analyst*