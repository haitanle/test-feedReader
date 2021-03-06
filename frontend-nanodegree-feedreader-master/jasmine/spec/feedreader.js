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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('feed URL is defined and not emtpy', function(){
            for (let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('feed Name is defined and not empty', function(){
            for (let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });


    /* A new test suite named "The menu" to test menu button functionality*/
    describe('The menu', function(){

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu display hidden by default', function(){
            const body = document.getElementsByTagName('body');
            expect(body[0].classList.contains('menu-hidden')).toEqual(true);

         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu toggles display when clicked', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* A new test suite named "Initial Entries" to test inital feed of asynchronous function */
    describe('Initial Entries', function(){

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
         });

         it('at least 1 entry element in feed container when loadFeed first is called',function(done){
            let entries = document.querySelector('.feed').querySelectorAll('.entry').length;
            expect(entries).toBeGreaterThanOrEqual(1);
            done();
         });
    });


    /* A new test suite named "New Feed Selection" that test asynchronous function changes*/
    describe('New Feed Selection', function(){

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let firstContent;
        let secondContent;

        beforeEach(

        function(done) {

            loadFeed(0, function() {
                firstContent = document.getElementsByClassName('feed')[0].firstElementChild.innerText;

                loadFeed(1, function() {
                    try {
                        secondContent = document.getElementsByClassName('feed')[0].firstElementChild.innerText;
                        done();
                    } catch (e){
                        done.fail(e);
                    }
                });
            });
        });

        it('expect that feed content has changed', function(done){
            expect(firstContent).not.toBe(secondContent);  
            done();
        });
    });

}());
