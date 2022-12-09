import type * as PostCSS from 'postcss'

type ImportExportObject = { customProperties: {} }

export interface PluginOptions {
  /** Specifies sources where Custom Properties can be imported from, which might be CSS, JS, and JSON files, functions, and directly passed objects. */
  vars?: ImportExportObject
}

export interface Plugin {
  (options?: PluginOptions): {
    postcssPlugin: 'postcss-custom-properties-generator',
    prepare({ root }: { root: any }): (
      | {
        Declaration: (decl: any) => void;
        Once?: undefined;
      }
      | {
        Once: (root: any) => Promise<void>;
        Declaration: (decl: any) => void;
      }
    )
  },
  postcss: true
}

declare const plugin: Plugin

export default plugin
