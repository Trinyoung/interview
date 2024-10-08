## 什么是babel，它的作用是什么？
Babel 是一个广泛使用的 JavaScript 编译器，主要用于将现代 JavaScript 代码（如 ES6+ 语法）转换为向后兼容的版本，以便在旧版浏览器或环境中运行。以下是 Babel 的主要概念和作用：

### 1. **主要功能**

- **语法转换**：Babel 可以将使用现代 JavaScript 特性（如箭头函数、类、模板字符串等）的代码转换为 ES5 语法，使其能够在不支持这些特性的旧版浏览器中运行。

- **Polyfill**：Babel 还可以通过 `@babel/polyfill` 提供对新特性（如 `Promise`、`Array.prototype.includes` 等）的支持，确保这些特性在旧环境中可用。

- **插件和预设**：Babel 具有灵活的插件系统，允许开发者根据需要选择特定的转换功能。常用的预设（如 `@babel/preset-env`）可以自动选择所需的插件，以支持特定的浏览器环境。

### 2. **使用场景**

- **现代 JavaScript 开发**：在使用现代 JavaScript 特性（如 ES6、ES7、TypeScript 等）进行开发时，Babel 可以确保代码在各种环境中都能正常运行。

- **React 和 Vue 等框架**：Babel 通常与 React 和 Vue 等现代前端框架一起使用，以支持 JSX 语法和其他新特性。

- **构建工具集成**：Babel 可以与构建工具（如 Webpack、Rollup 等）集成，作为构建流程的一部分，自动处理代码转换。

### 3. **基本配置**

Babel 的配置通常通过 `.babelrc` 文件或 `babel.config.js` 文件进行。以下是一个简单的 Babel 配置示例：

```json
{
  "presets": ["@babel/preset-env"]
}
```

### 4. **总结**

Babel 是一个强大的工具，主要用于将现代 JavaScript 代码转换为向后兼容的版本，以便在旧版浏览器和环境中运行。它通过语法转换、polyfill 和灵活的插件系统，帮助开发者使用最新的 JavaScript 特性，同时确保代码的兼容性。

## 什么是AST 抽象语法树？
抽象语法树（Abstract Syntax Tree，AST），也称抽象语法树，是源代码的抽象表示形式，它把源代码抽象为一种树形结构，方便计算机理解、分析。在计算机科学中，抽象语法树（AST）是源代码的结构化表示，它描述了源代码的结构、语义和控制流。
### babel的流程
3个阶段： parsing（解析），transformation（转换），generation（生成）。
1. 通过babylon将js 转换成ast（抽象语法树）；
2. 通过babel-traverse遍历ast，通过babel插件转换成新的ast；
3. 通过babel-generator将ast转换成js；