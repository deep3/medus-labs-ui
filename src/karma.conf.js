// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '/tests',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-junit-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        junitReporter: {
            outputDir: path.join(__dirname, '../reports/test-reports/'), // results will be saved as $outputDir/$browserName.xml
            outputFile: 'junit.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            useBrowserName: false // add browser name to report and classes names
          },
        coverageIstanbulReporter: {
            dir: path.join(__dirname, '../coverage'),
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true
        },
        reporters: ['progress', 'junit', 'coverage-istanbul','kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false
    });
};