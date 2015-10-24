/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    describe('RSS Feeds', function() {
        //loops through each feed in the allFeeds object 
        //and ensures it has a URL defined and that the URL is not empty.
         it('has a URL property', function(){
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
                expect(allFeeds[i].url).not.toBe(null);
            }
         });


        //loops through each feed in the allFeeds object 
        //and ensures it has a name defined and that the name is not empty.
         it('has a name property', function(){
             for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
                expect(allFeeds[i].name).not.toBe(null);
            }
         });
    });


    describe('The Menu', function() {
        var menuIcon, body;

        beforeEach(function() {
            menuIcon = $('.menu-icon-link');
            body = $("body");
        });
        

        it('is hidden on load', function() {
            expect(body).toHaveClass('menu-hidden');
        });


        it ('toggles when clicked', function() {
            menuIcon.trigger('click');
            expect(body).not.toHaveClass('menu-hidden');
            menuIcon.trigger('click');
            expect(body).toHaveClass('menu-hidden');
        });
        
    });


    describe('Initial Entries', function(){
        var container, feed, entries, feedURL;

        beforeEach(function(done) {
            container = $('.feed');
            loadFeed(0, done);
            spyOn(window, 'loadFeed');
        });

        //ensures when the loadFeed function is called and completes its work, 
        //there is at least a single .entry element within the .feed container.
        it('should call the loadFeed function', function(done) {
            expect(loadFeed).toHaveBeenCalled();
            done();
        });

        it('should fill "entries" with at least one entry', function(done){
            expect(container[0].children.length).toBeGreaterThan(0);
            done();
        });
    });


    describe('New Feed Selection', function(){
        var container, titles, orig_titlesList = [];

        beforeEach(function(done) {
            container = $('.feed');

            //load up the page 
            loadFeed(0);
            //retrieve all of the <h2> tags 
            titles = $('h2');
            //create and array of this page's <h2> tags, which are
            //the visible titles on the html page
            for (var i = 0; i < titles.length; i++){
                orig_titlesList.push(titles[i].innerHTML);
            }

            
            //reload the feed with new information
            loadFeed(1, done);
        });

        it('should update if there is new information', function(){
            //retrieve a list of the current <h2> tags
            titles = $('h2');
            //compare each <h2> to the previous list of <h2>s 
            //expect them to be different
            for (var i = 0; i < titles.length; i++){
                expect(orig_titlesList).not.toContain(titles[i].innerHTML);
            }
          });
    });

}());


