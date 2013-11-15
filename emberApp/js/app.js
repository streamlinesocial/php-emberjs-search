App = Ember.Application.create({});

App.File = Ember.Object.extend({
  id: null,
  title: null,
  body: null,
  author_firstname: null,
  author_lastname: null,

  author_fullname: function()  {
    return this.get('author_firstname') + ' ' + this.get('author_lastname') ;
  }.property('author_firstname', 'author_lastname')

});

App.Router.map(function() {
  this.resource('about');
  this.resource('files', function() {
    this.resource('file', { path: ':file_id' });
    // If files model is in memory, and file id exists, it doesnt make another ajax.
    // @TODO: check this in ember doc, is working in that way not sure why 
    
  });
});

App.FilesRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('../backend.php').then(function(data){
      return data.files.map(function(fileData){       
        return App.File.create(fileData);
      }) ;
    });
  },

  /**
   * To tell one of these controllers which model to present, 
   * set its model property in the route handler's setupController hook.
   */
  setupController: function(controller, model) {
    controller.set('model', model);
  }

});

App.FileRoute = Ember.Route.extend({
  model: function(params) {
    if (!files) {
      return $.getJSON('../backend.php?id='+params.file_id).then(function(data){
          var fileData = data.files[0]
          return App.File.create(fileData);
      });
    }
  }
});



App.FilesController = Ember.ArrayController.extend({
  query: "" , 
  content: [],
  queryDidChange: function() {
    var self = this ;
    $.getJSON('../backend.php?query='+this.get('query')).then(function(data){
      self.set('content', data.files.map(function(fileData){ 
        return App.File.create(fileData);
      })) 
      files = self.content ;       
    })   
  }.observes('query')

});


/**
 * Some helpers that prettyfies the dates
 */
var showdown = new Showdown.converter();
Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

// Files global scope
var files = null;