const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

const result = `:root, ::before, ::after {
    --colors-custom-property: #666
}`

const colors = {
  "custom": {
    "property": '#666'
  }
}

it('transforms to custom property', async () => {
  await run('', result, {colors})
});
