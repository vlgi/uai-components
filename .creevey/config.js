module.exports = {
    browsers: {
        chrome: {
            browserName: 'chrome',
        },
        firefox: {
            browserName: 'firefox',
        },
        safari: {
            browserName: 'webkit',
            dockerImage: 'browsers/safari:13.0',
            version: '13.0',
        }
    }
}