/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Make sure that the allFeeds variable has been defined 
         * and that it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('has a URL property', function(){
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toContain("http");
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has a name property', function(){
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeTruthy();
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        var menuIcon, body;

        beforeEach(function() {
            menuIcon = $('.menu-icon-link');
            body = $("body");
        });
        
        /* TODO: Write a test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden on load', function() {
            expect(body).toHaveClass("menu-hidden");
        });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it ('toggles when clicked', function() {
            menuIcon.trigger('click');
            expect(body).not.toHaveClass("menu-hidden");
            menuIcon.trigger('click');
            expect(body).toHaveClass("menu-hidden");
        });
        
    });

    /* TODO: Write an async test suite named "Initial Entries" */
    describe('Initial Entries', function(){
        var feed, entries, feedURL;

        // Calls to beforeEach, it, and afterEach can take an optional 
        // single argument that should be called when the async work is complete.
        beforeEach(function(done) {
            setTimeout(function() {
                feedUrl = allFeeds[0].url;
                feed = new google.feeds.Feed(feedUrl);
                
                done();
            }, 1000);
        });

        // TODO: Write a test that ensures when the loadFeed
        // function is called and completes its work, there is at least
        // a single .entry element within the .feed container.
        
        // This spec will not start until the done function is called in 
        // beforeEach(), above. And this spec will not complete until its done is called.
        it("should call the loadFeed function", function(done) {
            spyOn(window, "loadFeed");
            init();
            expect(window.loadFeed).toHaveBeenCalledWith(0);
            done();
        });

        it("should fill 'entries' with at least one entry", function(done){
            //this code snippett is google's code to load the feeds:
            feed.load(function(result) {
                entries = result.feed.entries;
                
                expect(entries.length).toBeGreaterThan(0);
                done();
            });
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection"
     */
    describe('New Feed Selection', function(){
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
        var container, 
            entries, 
            DOMlist = [];

        beforeEach(function(done) {
            setTimeout(function() {
                container = $('.feed');
                done();
            }, 2000);
        });

        it("should load entries in the DOM", function(done) {
            //the container should start empty (coded like this in app.js)
            container.empty();
            expect(container).toBeEmpty();

            //load the feed so we can make some expectations of what will happen below
            loadFeed(0);

            //make a list of all DOM <h2> tags in the newly loaded page
            setTimeout(function() {
                entries = $('h2');

                //there should be at least one <h2> tag in the <h2> array
                expect(entries.length).toBeGreaterThan(0);

                //there should be something in each <h2> in the array
                for (var i = 0; i < entries.length; i++){
                    expect(entries[i].innerHTML.length).toBeGreaterThan(0);
                }
                done();
            }, 2000);

        });
    });

}());


