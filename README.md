# Spaceships

## Intro

This project is a nice web utility which helps track interstellar transportation networks.

For each interstellar vessel, the app calculates the following:

1. Which planets can it reach with it's speed?
2. How far can it go with it's fuel? Where can it refuel?
3. Which are the other vesseles it might encounter in it's path?

In addition to these, each element in the transportation network may have some server functions
it can run.

## Code Terms

These are some important code terms you should know about if you're diving in.

### The Map

The map is the big space in the middle of the site which allows to view the transportation network & elements. It includes some other compoenents, so I'll line these up:

1. The map - Refers to this area as a whole, along with the rest of it's sub components and elements.
2. The pane - The flow rendring area itself, without the sub components.
3. `FlowRenderer`, `Canvas` - Deprecated, and should be removed from the code. Used these back when
   I wasn't sure about my names.

### The Elements

The map contains some elements, so we'll address these as well.

1. Element - An element is a single thing presented in the map. It could be an entity, or a connection
   between entities.
2. Entity - A single transportation unit, presented on the map. More of a logical term. May refer to
   the element's data property.
3. Node - The technical term, for the implementataion of an Entity.
4. Edge - A connection between two nodes.
5. Connection - An alias for `Edge`. Or, a connection between two entities, if you'd like.

## Websockets

In order to make the functions work, I had to use websockets.

These are the basics:

1. `socket.io` is a neat library with supports many programming languages and
   does most of the job for you. I'll explain it's basics.
2. The basic principle is asynchronous work mode - both sides are asynchronous,
   setting handlers for events. The `socket.io` library takes care of the paralellism.
3. In the client side, setting an event handler is pretty straight forward and
   obvious. Setting an event which updates a react state (like a progress bar)
   is pretty classic.
4. Server side looks very similar. You simply set event handlers.
5. If you're using `Flask`, it has a neat plugin called `flask-socketio`. It
   allows you to define socketio event handlers just as you'd set app routes and
   you can run the application just as you run a flask application.

I had some trouble making the websocket plugin run at all. Turns out Flask
needs an asynchrounous connection handler / manager. The default connection
manager is old and poorly implemented. The two recommended alternatives are
`gevent` and `eventlet`, `eventlet` being the better, more reliable one. However,
it seems to be interfering with `pymongo`.
The way this thing works, is by setting hooks over python library functtion
\(I have no clue how\). This means that any library that might be using similar
API to handle asyncrhonous connections will use the connection manager, as well
(like `pymongo` does). The neat this is `pymongo` supports `gevent` out of the
box, and it seemed to give me less trouble.

I also had some trouble making the http server and the flask socketio server
run from the same python program. This might be because I didn't set a
namespace to the socket.io events, and I should.
