var Document = {};
Meteor.Collection.prototype.helpers = function(helpers) {
  var self = this;
  if (! Document[self._name]) Document[self._name] = function(doc) { return _.extend(this, doc); };
  if (! self._transform) self._transform = function(doc) { return new Document[self._name](doc); };
  // A cheeky reference to the Collection is placed on the Document to give it more
  // introspective powers.  Note, the data type is lost if passed through to a Meteor method
  // or any other such magix.
  Document[self._name].prototype['Collection'] = self;
  _.each(helpers, function(helper, key) {
    Document[self._name].prototype[key] = helper;
  });

};
