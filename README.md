## Website Performance Optimization portfolio project
===========================================

### Running the optimized pages
- Google Chrome is required to render the html pages correctly
- for pizza.html run the minified version pizza.min.html when testing

### Tools used
- Python SimpleHTTPServer to host a local server
- ngrok to get a secure tunnel for Google Pagespeed Insights testing
- Gulp task runner
- gulp-uncss to remove unused CSS rules from bootstrap-grid
- gulp-csso to minify CSS
- gulp-minify-html to minify HTML
- gulp-uglify to minify javascript

### Resources used

-Web Font Loader used to load google fonts asynchronously. This reduces the amount of time the DOM is blocked from rendering.
  -https://github.com/typekit/webfontloader

-Using transform: translate instead of left to animate the moving pizzas. This reduces the amount work the browser does to animate the pizzas.
  -http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/