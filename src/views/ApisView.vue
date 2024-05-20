<template>
  <div class="readme">
    <h2>Recommended IDE Setup for AppHub</h2>
    <ul>
      <li><a href="https://code.visualstudio.com/">VSCode</a></li>
      <li><a href="https://marketplace.visualstudio.com/items?itemName=Vue.volar">Vue Plugin for Language support
          (Volar)</a></li>
      <li><a href="https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin">Vue Plugin for
          TypeScript server (Volar)</a>. Disable Vetur extension if installed.</li>
    </ul>

    <h2>This section only applies for VSCode + Volar.</h2>
    <p>
      To get Vue SFCs "Single File Components." and TypeScript working together, Volar creates a separate TS language
      service instance patched with Vue-specific support, and uses it in Vue SFCs. At the same time, plain TS files are
      still handled by VSCode's built-in TS language service, which is why we need TypeScript Vue Plugin to support Vue
      SFC imports in TS files. This default setup works, but for each project we are running two TS language service
      instances: one from Volar, one from VSCode's built-in service. This is a bit inefficient and can lead to
      performance issues in large projects.
    </p>

    <h2>Type Support for .vue Imports in TS</h2>
    <ul>
      <li>
        TypeScript cannot handle type information for .vue imports by default, so we replace the tsc CLI with vue-tsc
        for type checking. vue-tsc is being used in the type-check script used in the build script.
      </li>
      <li>
        We need TypeScript Vue Plugin (Volar) to make the TypeScript language service aware of .vue types.
      </li>
    </ul>

    <h2>Volar Takeover Mode Configuration</h2>
    <p>
      Volar provides a feature called "Takeover Mode" to improve performance. In takeover mode, Volar provides support
      for both Vue and TS files using a single TS language service instance.
    </p>
    <p>
      To enable Takeover Mode, you need to disable VSCode's built-in TS language service in your project's workspace
      only by following these steps:
    </p>
    <ol>
      <li>In your project workspace, bring up the command palette with Ctrl + Shift + P (macOS: Cmd + Shift + P).</li>
      <li>Type built and select "Extensions: Show Built-in Extensions".</li>
      <li>Type typescript in the extension search box (do not remove @builtin prefix).</li>
      <li>Click the little gear icon of "TypeScript and JavaScript Language Features", and select "Disable (Workspace)".
      </li>
      <li>Reload the workspace. Takeover mode will be enabled when you open a Vue or TS file.</li>
    </ol>
    <p>
      More info <a href="https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669">Take Over
        Mode</a>.
    </p>

    <h2>Versioning</h2>
    <pre>
    <code>
      Node v20.11.1
      NPM v10.4.0
    </code>
    </pre>

    <h2>Customize configuration</h2>
    <p>See <a href="https://vitejs.dev/config/">Vite Configuration Reference</a>.</p>

    <h2>Project Setup</h2>
    <pre><code>npm install</code></pre>

    <h3>Compile and Hot-Reload for Development</h3>
    <pre><code>npm run dev</code></pre>

    <h3>Type-Check, Compile and Minify for Production</h3>
    <pre><code>npm run build</code></pre>

    <h3>Run Unit Tests with <a href="https://vitest.dev/">Vitest</a></h3>
    <pre><code>npm run test:unit</code></pre>

    <h3>Run End-to-End Tests with <a href="https://www.cypress.io/">Cypress</a></h3>
    <pre><code>npm run test:e2e:dev</code></pre>
    <p>
      This runs the end-to-end tests against the Vite development server. It is much faster than the production build.
    </p>

    <h3>Run End-to-End Tests in production</h3>
    <p>
      Production build test with <code>test:e2e</code> before deploying (e.g. in CI environments):
    </p>
    <pre><code>npm run build
npm run test:e2e
    </code></pre>

    <h3>Lint with <a href="https://eslint.org/">ESLint</a></h3>
    <p>Error checking</p>
    <pre><code>npm run lint</code></pre>
  </div>
</template>


<style lang="scss">
.readme {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    margin-top: 40px;
  }

  h3 {
    margin-top: 20px;
  }

  ul {
    list-style: none;
    padding-left: 20px;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  pre {
    background-color: var(--black-soft);
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  code {
    font-family: Consolas, monospace;
  }
}
</style>
