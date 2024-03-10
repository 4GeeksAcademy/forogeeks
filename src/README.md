### Guía de Inicio Rápido - Proyecto FORO

**Instalar Dependencias:**

-   Navega al directorio del proyecto y ejecuta el siguiente comando para
    instalar las dependencias:

```
npm install
```

---

🚀 **Comandos Principales:**

-   **🔴 Compilar SASS 🔴**

    -   Activa el compilador de Sass en modo observador para compilar
        automáticamente los cambios en los archivos SCSS:

    ```
    npm run sass:watch
    ```
---

-   **🐛 Common BUGS: 🐛**
    ```
    - La BACKEND_URL= no tiene direccion asignada en .env
        Solucion: Arrancar backend y actualizar la backend url
    ```
    ```
    - Se han instalado dependencias en backend o frontend 
        Solucion: Hacer npm install o pipenv install
    ```
    ```
    - Los estilos no se aplican
        Solucion: Compilar SASS, Importar archivo CSS el layout, Limpiar cache
    ```
---

-   **🐱 Git: 🐱**

    -   **🐱 Cambiar de Rama:**

        ```
        git checkout nombre-de-la-rama
        ```

    -   **🐱 Hacer un Commit:**

        ```
        git add .
        git commit -m "Descripción del cambio"
        ```

    -   **🐱 Subir Cambios para que se aprueben:**

        ```
        git push origin nombre-de-la-rama
        ```

    -   **🐱 Agregar mas cambios a un commit ya hecho:**

        ```
        git commit --amend -m "Change version"
        ```

    -   **🐱 Si todavia no has hecho push de tus cambios al repositorio y
        quieres desacer el commit**

            * --soft si quieres desacer pero mantener el codigo escrito

            ```
            git reset --soft HEAD~1
            ```

            * --hard si tambien quieres que se borren los cambios

            ```
            git reset --hard HEAD~1
            ```

    -   **🐱 Has pusheado el commit y estaba mal:**

        ```
        git log
        ```

        Copia el commit que al que te interesa volver

        ```
        git revert b4wfb32s (ej de commitId)
        ```

        Esto creara un commit que va a desacer todos los cambios y volver al que
        has indicado

        -   **🐱 Forzar el merge de main a tu rama por la fuerza:**

        ```
        git merge --strategy-option=theirs main
        ```

        -   **🐱 Abortar merge:**

        ```
        git merge --abort
        ```

---

-   **🌅 Cambiar favicon**

    ```
    1. Ir al archivo => webpack.common.js

    2. 	Abajo en plugins/favicon poner el nombre de la imagen donde pone
    		favicon: "ejemplo.jpg",

    Nota: La imagen debe estar en la carpeta public

    ```

---

-   **🟢 Add icons**

```
👀 Ver iconos
 ➡️ https://tabler.io/icons
```

```
👉 Add iconos
1. import { IconArrowLeft } from '@tabler/icons-react';

2. <IconArrowLeft color={opcional} size={opcional} stroke={opcional} />

name	type	default
size	Number	24
color	String	currentColor
stroke	Number	2
```

---

-   **🌈 Text Editor**

```
https://www.npmjs.com/package/react-quill
https://medium.com/@aalam-info-solutions-llp/how-to-build-a-text-editor-in-react-js-d5c7fdb321ef

```
