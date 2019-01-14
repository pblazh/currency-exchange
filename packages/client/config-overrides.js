const path = require('path')
const { addWebpackAlias } = require('customize-cra')

module.exports = function override(config, env) {
    config = addWebpackAlias({
        ['@atoms']: path.resolve(__dirname, 'src', 'widgets', 'atoms'),
        ['@store']: path.resolve(__dirname, 'src', 'store')
    })(config)

    return config
}
