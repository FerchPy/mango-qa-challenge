# 📊 Matriz de Casos de Prueba - HU_2 (Buggy Cars Rating)

**Módulo:** HU_2 - Detalle del Vehículo, Especificaciones y Votación  
**Proyecto:** Buggy Cars Rating  
**QA Analyst:** José Fernando Paniagua Benitez  

---

| ID | Nombre del caso | Descripción | Precondiciones | Pasos | Resultado esperado | Estado | Prioridad |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: |
| **HU2_01** | **Visualización del modelo** | Verificar que al seleccionar un modelo desde el ranking general se muestre su página de detalle. | Acceso al sitio principal. | 1. Acceder a `/overall`.<br>2. Hacer clic en "View more" del primer modelo. | Se muestra la página de detalle del modelo. | **Aprobado** | Alta |
| **HU2_02** | **Usuario invitado – restricción de acciones** | Validar que un usuario no autenticado no pueda comentar ni votar. | Estar deslogueado del sistema. | 1. Acceder al detalle del modelo.<br>2. Verificar ausencia de caja de comentario y botón "Vote!". | No se muestran los campos. Se muestra el mensaje *"You need to be logged in to vote"*. | **Aprobado** | Alta |
| **HU2_03** | **Estructura de especificaciones** | Validar presencia de "Specification", "Votes" y "Descripción". | Estar en la página del modelo. | 1. Localizar "Specification" y verificar "Engine" y "Max Speed".<br>2. Verificar encabezado "Votes:".<br>3. Verificar tarjeta de descripción. | Se visualizan correctamente los datos de ficha técnica, cantidad de votos y descripción. | **Aprobado** | Media |
| **HU2_04** | **Estructura de la tabla de comentarios** | Validar que los encabezados de la tabla de comentarios sean correctos. | Estar en la página del modelo. | 1. Desplazarse a la tabla.<br>2. Verificar encabezados de columnas. | La tabla contiene las columnas "Date", "Author" y "Comment". | **Aprobado** | Media |
| **HU2_05** | **Registro e Inicio de sesión exitoso** | Verificar que un usuario pueda registrarse e iniciar sesión dinámicamente. | Formulario de registro disponible. | 1. Completar registro dinámico.<br>2. Ingresar usuario y contraseña en Login.<br>3. Presionar "Login" y refrescar la SPA. | El usuario inicia sesión y la barra superior muestra *"Hi, [Nombre]"*. | **Aprobado** | Alta |
| **HU2_06** | **Usuario autenticado – campo visible** | Validar que al estar logueado se habiliten los controles de votación. | Haber iniciado sesión correctamente. | 1. Acceder nuevamente al modelo.<br>2. Verificar el campo "Your Comment" y el botón "Vote!". | El campo de texto y el botón "Vote!" se muestran visibles y habilitados. | **Aprobado** | Media |
| **HU2_07** | **Usuario autenticado – voto CON comentario** | Validar que el usuario pueda enviar un comentario al emitir su voto. | Estar logueado y en la página del modelo. | 1. Escribir un comentario.<br>2. Presionar "Vote!".<br>3. Validar mensaje de confirmación. | Aparece el mensaje *"Thank you for your vote!"* y el voto se registra exitosamente. | **Aprobado** | Media |
| **HU2_08** | **Usuario autenticado – voto SIN comentario** | Validar que el sistema permita emitir un voto dejando el comentario en blanco. | Estar logueado y en la página del modelo. | 1. Dejar el campo "Your Comment" vacío.<br>2. Presionar "Vote!". | El sistema procesa el voto y muestra *"Thank you for your vote!"*. | **Aprobado** | Media |