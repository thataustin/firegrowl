firegrowl
=========

#### For use with Node/Firebase
If you don't have growl installed, then see https://github.com/visionmedia/node-growl
I'm using a fork of that repo; setup should be equivalent

#### Why use this?
I got tired of switching between my firebase browser tab and my app tab to figure out which actions were triggering unexpected fb updates.
By plugging this in, you get something like this:

![Screenshot](http://imgur.com/OsotOTo)

####Getting started

`npm install --save-dev firegrowl`

~~~
app.configure('development', function(){
  firegrowl('<YOUR-FIREBASE-URL>');
});
~~~

__Note that at the moment, you must disable .read rules in order for this to work.  This goes without saying, but don't disable any security rules in production, as this is only intended for use in development__

####Options
In theory, you can pass anything into the growl call that you can pass into the [node-terminal-notifier](https://github.com/evanw/node-terminal-notifier) npm module.
They aren't all tested; let me know if anything is broken or coule be improved.

#### Demo
`node demo.js`
_Note:_ You need to enter a firebase demo into the url.  Once connected, feel free to update/delete values from the firebase db to watch notifications appear on your machine.

#### Tests
The tests don't cover the actual growl-ing or the firebasing...just some object diff stuff.  To run, just:
~~~
cd tests
jasmine-node .
~~~

If you don't have jasmine-node: `npm install -g jasmin-node`, though it should have been included when you installed this package.
####License
[WTFPL](http://www.wtfpl.net/about/)

Pull request welcome.  Currently, I haven't setup any sort of authentication such that you could listen on an authenticated firebase channel, but if I get enough feedback, I'd be glad to look into it.

This should only be used in development.
