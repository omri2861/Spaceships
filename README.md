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
