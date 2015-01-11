## Website Performance Optimization portfolio project
===========================================

### Running the optimized pages
- Open index.html in a web browser
- Google Chrome is required to render pizza.html correctly
- for pizza.html run the minified version pizza.min.html when testing performance
- Here is a live version of the project:
    http://georgejdli.github.io/frontend-nanodegree-mobile-portfolio/views/pizza.min.html

### Tools used
- Python SimpleHTTPServer to host a local server
- ngrok to get a secure tunnel for Google Pagespeed Insights testing
- Gulp task runner
- gulp-uncss to remove unused CSS rules from bootstrap-grid
- gulp-csso to minify CSS
- gulp-minify-html to minify HTML
- gulp-uglify to minify javascript

### Minimum optimizations required
-index.html must have a score 90 or above for mobile and desktop Pagespeed Insights
-images should be compressed
-scrolling and changing pizza sizes on pizza.html should have FPS 60 or greater
	-achieved primarily by caching variables out of loops and avoiding unnecessary calculations

### Optimizations performed on pizza.html beyond the minimum requirements
-pizza.html scores above 90 for mobile and desktop Pagespeed Insights
-use of innerHTML has been replaced with textContent to avoid numerous Parse HTML events
	-this reduces the initial load time of pizza.html

