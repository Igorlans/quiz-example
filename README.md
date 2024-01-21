### Documentation

Project uses module architecture with such layers as: 
    1. `ui` - UI components
    2. `components` - Components that can be used across application and do not have buisness logic. Can use components from `ui` layer. 
    3. `modules` - Also components but **independent**. This layer can use components from `ui` and `components` layers and also can have its own `api`, `utils`, `lib` folders to handle logic inside of a module. Must have **public api** (index.ts file to export only files that are needed outside of module).
    4. `pages` - 


 