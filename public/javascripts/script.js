/**
 * Created by tianhengzhou on 11/13/15.
 */
function mapViewModel() {
    var self = this;
    // Define search term and assign initial value as Chinese food
    self.searchTerm = ko.observable('Chinese Food');
    // update search result function
    self.updateSearchResult = function(){
            ko.computed(function(){
                window.setTimeout(function(){
                    yelpSearch('94087', self.searchTerm());
                },600)
            }, self);
        };
}
// Bind the view model to view.
$(function(){
    ko.applyBindings(new mapViewModel());
});

