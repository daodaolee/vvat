# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"

# 记录
## antdv
1. antdv安装如果按照之前的就只能安装 `1.7.x` 版本，需要 `yarn add ant-design-vue@next`，加一个 `@next`，官网有提到。
**安装之后要重启项目，不然会报错。**

2. 在引入自定义的 `antdv` 样式的时候，报了一个错，找半天有关这个 `color()` 的定义，以为是源码里 `color` 方法的调用有问题……最终发现原来是自己的 `less` 写错了……还是得细心啊!😢
![](https://i.loli.net/2021/03/23/VMlHJIFTBLEkPfw.png)
    ```css
    /* 这样是不对的 */
    @primary-color: '#FE5F23';

    /* 这样才对 */
    @primary-color: #FE5F23;
    ```