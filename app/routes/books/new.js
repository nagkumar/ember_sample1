import Ember from 'ember';

export default Ember.Route.extend({

                                    actions: {
                                      createBook: function ()
                                      {
                                        var that = this;
                                        var publisher = that.store.createRecord("publisher", {
                                          "name": that.get("controller.name"),
                                          "organizationName": that.get("controller.organizationName"),
                                          "address": that.get("controller.address")
                                        });

                                        var author = that.store.createRecord("author", {
                                          "firstName": that.get("controller.firstName"),
                                          "lastName": that.get("controller.lastName"),
                                          "bio": that.get("controller.bio")
                                        });

                                        var bookNew2 = that.store.createRecord("book", {
                                          "id": 4,
                                          "title": "Some Other Book On Ember.js",
                                          "isbn": "ISBN2",
                                          "pages": 200,
                                          "description": "Some Description",
                                          //"authors": [2],
                                          "publisher": 1,
                                          //"reviews": [4, 5, 6]
                                        });

                                        var bookNew = that.store.createRecord("book", {
                                          "title": that.get("controller.title"),
                                          "isbn": that.get("controller.isbn"),
                                          "pages": that.get("controller.pages"),
                                          "description": that.get("controller.description")
                                        });

                                        publisher.save().then(function (publisherFromDB)
                                                              {
                                                                bookNew.set("publisher", publisherFromDB);
                                                                bookNew2.set("publisher", publisherFromDB);

                                                                author.save().then(function (authorFromServer)
                                                                                   {
                                                                                     //Set The Author to the books
                                                                                     bookNew.get("authors").then(function (authors)
                                                                                                                 {
                                                                                                                   authors.pushObject(authorFromServer);
                                                                                                                 });

                                                                                     bookNew2.get("authors").then(function (authors)
                                                                                                                  {
                                                                                                                    authors.pushObject(authorFromServer);
                                                                                                                  });

                                                                                     //Save the book
                                                                                     bookNew.save().then(function (bookNewAny)
                                                                                                         {
                                                                                                           that.transitionTo('books.book', bookNewAny);
                                                                                                         });
                                                                                   });
                                                              });
                                      }
                                    }
                                  });
