# Start project

To start the project, simply run `npm install`.
After installing all packages then run `npm run dev` command on terminal.

## Component description

There is one MainPage which handles all the other components:

- Data Table, which contain the representation of the data inside data_table from the response (json files).
- Histograms, which contains the representation of the data inside histograms from the response (json files).
- Kpi Grid, which contain the representation of the data inside kpis, more specifically the carrier and client objects from the response (json files).
- Scalars, which contains the representation the data inside scalars using Doughnut and Statistic component by Chart.js and Antd.

There is also a Header visualizing the tab to navigate through the different components

Also a component Skeleton is being created to handle the loading state.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
