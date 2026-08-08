const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  /* Tiempo límite de tolerancia global por test (60 segundos por la lentitud de la página) */
  timeout: 60000,
  expect: {
    /* Tiempo máximo para que se cumpla una aserción/expectativa (15 segundos) */
    timeout: 15000,
  },
  fullyParallel: true,
  /* Genera el reporte HTML con las capturas de pantalla integradas para evidencia */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: 'https://buggy.justtestit.org/',
    /* Tiempos de tolerancia ajustados a la latencia real del sitio */
    actionTimeout: 20000,     // Tolerancia para clics e ingreso de texto
    navigationTimeout: 30000, // Tolerancia para carga de páginas/URLs
    
    /* Capturas de pantalla e imágenes para adjuntar como evidencias */
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  /* Proyectos y Compatibilidad Multi-Navegador */
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});