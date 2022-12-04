const parseRecursive = (key, value) => {
  if (typeof value === 'string') return { prop: `--${key}`, value };
  if (typeof value === 'number') return { prop: `--${key}`, value };
  if (Array.isArray(value)) return { prop: `--${key}`, value };

  return Object.keys(value).flatMap((val) => parseRecursive(`${key}-${val}`, value[val]));
};


/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (colors = {}) => {
  return {
    postcssPlugin: 'postcss-custom-properties-generator',
    prepare() {
      return {
        Once: async (root, { Rule }) => {
          const parsed = Object
            .keys(colors)
            // .filter((key) => IGNORED_DESIGN_TOKENS_FOR_CUSTOM_PROPERTIES.indexOf(key) === -1)
            .flatMap((key) => parseRecursive(key, colors[key]));

          const rule = new Rule({ selector: ':root, ::before, ::after' });
          parsed.forEach((decl) => rule.append(decl));

          root.append(rule);
        },
      };
    },
  }
}

module.exports.postcss = true
