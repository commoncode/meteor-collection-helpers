var Document = {};

Meteor.Collection.prototype.helpers = function(helpers) {
  var self = this;

  if (! Document[self._name])
    Document[self._name] = function(doc) { return _.extend(this, doc); };

  if (! self._transform)
    self._transform = function(doc) { return new Document[self._name](doc); };

  _.each(helpers, function(helper, key) {
    Document[self._name].prototype[key] = helper;
  });
};

Meteor.Collection.helpers = function(helpers, collections) {
  if (_.isUndefined(collections))
    return;

  if (! _.isArray(collections))
    collections = [collections];
  
  _.each(collections, function(collection) {
    if (! Document[collection._name])
      Document[collection._name] = function(doc) { return _.extend(this, doc); };

    if (! collection._transform)
      collection._transform = function(doc) { return new Document[collection._name](doc); };

    _.each(helpers, function(helper, key) {
      Document[collection._name].prototype[key] = helper;
    });
  });
};
