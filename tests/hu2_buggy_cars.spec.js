const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://buggy.justtestit.org/';

test.describe('HU_2: Suite Automatizada E2E - Buggy Cars Rating', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  test('TC_WEB_001: [Invitado] Validar componentes del auto (Descripción, Specs, Votos) y restricción a invitados', async ({ page }) => {
    // 1. Navegar a Overall Rating
    await page.click('a[href="/overall"]');
    await page.waitForURL('**/overall');
    
    // Opción A: Selecciona de forma semántica el enlace "View more" de la primera fila
    const firstModelLink = page.locator('table tbody tr').first().getByRole('link', { name: 'View more' });
    await expect(firstModelLink).toBeVisible({ timeout: 15000 });

    // 2. Navegar al detalle del modelo
    await firstModelLink.click();
    await page.waitForURL('**/model/**');

    // --- REQUISITO: Validaciones de la vista del auto seleccionado ---
    
    // a. Descripción / Ficha del Auto
    const carDescriptionCard = page.locator('.card').first();
    await expect(carDescriptionCard).toBeVisible({ timeout: 15000 });

    // b. Tarjeta de Especificación (Specification)
    const specCard = page.locator('.card', { hasText: 'Specification' });
    await expect(specCard).toBeVisible({ timeout: 15000 });
    await expect(specCard).toContainText('Engine');
    await expect(specCard).toContainText('Max Speed');

    // c. Cantidad total de votos
    const votesHeader = page.locator('h4', { hasText: 'Votes:' });
    await expect(votesHeader).toBeVisible();
    await expect(votesHeader).toContainText('Votes:');

    // --- Controles de usuario invitado ---
    const voteButton = page.locator('button:has-text("Vote!")');
    const commentInput = page.locator('textarea#comment');
    
    await expect(voteButton).not.toBeVisible();
    await expect(commentInput).not.toBeVisible();

    // Mensaje de aviso informativo
    const infoMessage = page.locator('p.card-text');
    await expect(infoMessage).toContainText('You need to be logged in to vote');

    // Estructura de la tabla de comentarios
    const tableHeaders = page.locator('table.table thead th');
    await expect(tableHeaders.nth(0)).toContainText('Date');
    await expect(tableHeaders.nth(1)).toContainText('Author');
    await expect(tableHeaders.nth(2)).toContainText('Comment');
  });

  test('TC_WEB_002: [Autenticado] Registro dinámico, login y voto CON comentario', async ({ page }) => {
    const timestamp = Date.now();
    const dynamicUser = `qa_user_${timestamp}`;
    const password = 'Password123!';

    // 1. Registro
    await page.click('a:has-text("Register")');
    await page.waitForURL('**/register');

    await page.fill('#username', dynamicUser);
    await page.fill('#firstName', 'QA');
    await page.fill('#lastName', 'Tester');
    await page.fill('#password', password);
    await page.fill('#confirmPassword', password);

    await page.click('button[type="submit"]:has-text("Register")');

    const alertSuccess = page.locator('.alert-success');
    await expect(alertSuccess).toContainText('Registration is successful', { timeout: 15000 });

    // 2. Login
    await page.fill('input[name="login"]', dynamicUser);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]:has-text("Login")');

    await page.click('a.navbar-brand');
    await page.waitForURL('**/');

    const userGreeting = page.locator('span:has-text("Hi,")');
    await expect(userGreeting).toBeVisible({ timeout: 15000 });

    // 3. Navegación al auto usando la Opción A
    await page.click('a[href="/overall"]');
    await page.waitForURL('**/overall');

    const firstModelLink = page.locator('table tbody tr').first().getByRole('link', { name: 'View more' });
    await expect(firstModelLink).toBeVisible({ timeout: 15000 });
    await firstModelLink.click();
    await page.waitForURL('**/model/**');

    // 4. Voto CON comentario
    const commentInput = page.locator('textarea#comment');
    await expect(commentInput).toBeVisible({ timeout: 15000 });
    await commentInput.fill(`Comentario de prueba - ${timestamp}`);

    const voteButton = page.locator('button:has-text("Vote!")');
    await expect(voteButton).toBeVisible();
    await voteButton.click();

    // Aserción final
    const thankYouNotice = page.locator('p.card-text');
    await expect(thankYouNotice).toContainText('Thank you for your vote!', { timeout: 15000 });
  });

  test('TC_WEB_003: [Autenticado] Voto exitoso SIN ingresar comentario (Campo Opcional)', async ({ page }) => {
    const timestamp = Date.now();
    const dynamicUser = `qa_no_comment_${timestamp}`;
    const password = 'Password123!';

    // 1. Registro
    await page.click('a:has-text("Register")');
    await page.waitForURL('**/register');

    await page.fill('#username', dynamicUser);
    await page.fill('#firstName', 'QA');
    await page.fill('#lastName', 'NoComment');
    await page.fill('#password', password);
    await page.fill('#confirmPassword', password);

    await page.click('button[type="submit"]:has-text("Register")');

    const alertSuccess = page.locator('.alert-success');
    await expect(alertSuccess).toContainText('Registration is successful', { timeout: 15000 });

    // 2. Login
    await page.fill('input[name="login"]', dynamicUser);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]:has-text("Login")');

    await page.click('a.navbar-brand');
    await page.waitForURL('**/');

    const userGreeting = page.locator('span:has-text("Hi,")');
    await expect(userGreeting).toBeVisible({ timeout: 15000 });

    // 3. Navegación al auto usando la Opción A
    await page.click('a[href="/overall"]');
    await page.waitForURL('**/overall');

    const firstModelLink = page.locator('table tbody tr').first().getByRole('link', { name: 'View more' });
    await expect(firstModelLink).toBeVisible({ timeout: 15000 });
    await firstModelLink.click();
    await page.waitForURL('**/model/**');

    // 4. Voto SIN llenar el textarea (se deja vacío deliberadamente)
    const voteButton = page.locator('button:has-text("Vote!")');
    await expect(voteButton).toBeVisible({ timeout: 15000 });
    await voteButton.click();

    // 5. Confirmar que el voto fue aceptado correctamente
    const thankYouNotice = page.locator('p.card-text');
    await expect(thankYouNotice).toContainText('Thank you for your vote!', { timeout: 15000 });
  });

});