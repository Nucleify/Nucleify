# Modules

In this directory each folder is separated module. It can be:

1. Standalone app like Vue, React (just use build files) or HTML, CSS and JS. We can also make Atomic Design component and export it inside index files and define them in app.ts
2. We can add Laravel files from folders: ```app```, ```config```, ```database```, ```routes``` (keep Laravel files structure and namespaces) and they will be instantly available in whole Laravel application. Yes it works!!! 
3. ```tests``` files actually doesn't work, so tests files should be inside  ```tests/Modules/``` directory, and then follow other tests structure. Tests for module's frontend should be inside ```vitests/modules``` directory and then follow other tests structure.
