const path = require('path')
const { addWebpackAlias } = require('customize-cra')

module.exports = function override(config, env) {
    config = addWebpackAlias({
        ['@api']: path.resolve(__dirname, 'src', 'api'),
        ['@atoms']: path.resolve(__dirname, 'src', 'widgets', 'atoms'),
        ['@widgets']: path.resolve(__dirname, 'src', 'widgets'),
        ['@store']: path.resolve(__dirname, 'src', 'store')
    })(config)

    return config
}
