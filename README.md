firegrowl
=========

#### For use with Node/Firebase
If you don't have growl installed, then see https://github.com/visionmedia/node-growl
I'm using a fork of that repo; setup should be equivalent

#### Why use this?
I got tired of switching between my firebase browser tab and my app tab to figure out which actions were triggering unexpected fb updates

This should only be used in development.

####Getting started

`npm install --save-dev firegrowl`

~~~
app.configure('development', function(){
  firebaseGrowl('<YOUR-FIREBASE-URL>');
});
~~~

__Note that at the moment, you must disable .read rules in order for this to work.  This goes without saying, but don't disable any security rules in production, as this is only intended for use in development__

Pull request welcome.  Currently, I haven't setup any sort of authentication such that you could listen on an authenticated firebase channel, but if I get enough feedback, I'd be glad to look into it.

####License
[WTFPL](http://www.wtfpl.net/about/)
