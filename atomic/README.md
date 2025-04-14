# What is Atomic Design?

The files in the atomic folder follow the **[Atomic Design](https://medium.com/@kevinkurniawan97/atomic-design-with-vue-fa1b50a1251e)** methodology, which organizes UI components into a hierarchical structure to promote **reusability**, **maintainability**, and **scalability**. 

<br>


Below is an overview of the typical roles these files play:
<br>

### 1. Bosons - <img src="/public/img/technologies/vue.svg" width="15"> <img src="/public/img/technologies/typescript.svg" width="15">

Bosons are the smallest, indivisible pieces of reusable logic or data. Put it in component's folder if possible.

    Constants, styles, types and utils.
<br>

### 2. Atoms - <img src="/public/img/technologies/vue.svg" width="15"> <img src="/public/img/technologies/typescript.svg" width="15">

Atoms are the fundamental building blocks of the UI. They represent the smallest, indivisible elements that can exist independently or be combined to form more complex components.

    Examples: Buttons, inputs, labels, icons, and other standalone elements.

<br>

### 3. Molecules - <img src="/public/img/technologies/vue.svg" width="15"> <img src="/public/img/technologies/typescript.svg" width="15">

Molecules are combinations of atoms that work together as a single functional unit. These are slightly more complex components but still relatively simple and reusable.

    Examples: A label with placeholder, or an anchor tag with text and image.

<br>

### 4. Organisms - <img src="/public/img/technologies/vue.svg" width="15"> <img src="/public/img/technologies/typescript.svg" width="15">

Organisms are more complex UI structures made up of groups of molecules and/or atoms, or just complex standalone components with functions.

    Examples: datatable, chart, card, dialog, or forms.

<br>

### 5. Templates - <img src="/public/img/technologies/vue.svg" width="15"> <img src="/public/img/technologies/typescript.svg" width="15">

Templates define the structure and layout of combining organisms and other components. **They just serve as a blueprint for components combinations.**

    Examples: card with datatable or chart, custom sections etc.

<br>

### 6. Pages - <img src="/public/img/technologies/vue.svg" width="15"> <img src="/public/img/technologies/typescript.svg" width="15">

Pages are specific implementations of templates with functions. **They can be also treated as a "templates", but just for pages.**

    Examples: The homepage, settings page template etc.

**pages** folder moved to ```modules/dm_pages/pages```

<br>

### 7. Views  - <img src="/public/img/technologies/laravel.svg" width="15"> <img src="/public/img/technologies/php.svg" width="15">

Views are specific implementations of pages, with actual routes binding. ```.blade.php``` filenames serves as routes names. **We put in all specific-route components + meta tags, canonicals, scripts etc.**   

**views** folder moved to ```modules/dm_pages/views```