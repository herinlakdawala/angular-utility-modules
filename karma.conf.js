// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: 'src',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require ("karma-phantomjs-launcher"),
      require ("phantomjs-prebuilt"),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    exclude: [],  //  List of files/patterns to exclude from loaded files.
    preprocessors: {},  //  A map of preprocessors to use.
    reporters: ["progress", "coverage-istanbul"],  //  This will create a coverage report for every browser that the tests are run in. In addition, it will create a JSON file that outputs the intermediate data.

    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,  // if using webpack and pre-loaders, work around webpack breaking the source path
      combineBrowserReports: true,  //  Combines coverage information from multiple browsers into one report rather than outputting a report for each browser.
      skipFilesWithNoCoverage: false,  //  stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
      'report-config': {
        html: {
          subdir: 'html'  // outputs the report in ./coverage/html
        }
      }
    },
    port: 9876,
    colors: true, //  Enable or disable colors in the output (reporters and logs).
    logLevel: config.LOG_INFO,  //  Level of logging.
    autoWatch: true, // Enable or disable watching files and executing the tests whenever one of these files changes.
    autoWatchBatchDelay: 250, //  When Karma is watching the files for changes, it tries to batch multiple changes into a single run.
    browserDisconnectTimeout: 210000, //  How long does Karma wait for a browser to reconnect (in ms).
    browserDisconnectTolerance: 3,  //  The number of disconnections tolerated.
    browserNoActivityTimeout: 210000,  //  How long will Karma wait for a message from a browser before disconnecting from it (in ms).
    captureTimeout: 210000,  //  Timeout for capturing a browser (in ms).
    browsers: ["PhantomJS"],  //   A list of browsers to launch and capture. When Karma starts up, it will also start up each browser which is placed within this setting: PhantomJS, Chrome
    singleRun: false  //  If true, Karma will start and capture all configured browsers, run tests and then exit with an exit code of 0 or 1 depending on whether all tests passed or any tests failed.
  });
};
