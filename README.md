# Pokemon_TCG_Offline
A simple playmat for experimenting with old pokemon card decks.


Goals and milestones
-Include Base, Jungle, and Fossil sets.
-Allow users to build and name decks that are then stored as JSON files locally. No database connection needed and no dependences aside from the card images (possibly download all later).
-Users can then select two decks and load them onto a play mat.
-Play operations:
    -Begin match (shuffle decks, select prize cards, draw hands).
    -Draw card into hand.
    -Drag/drop cards freely.
    -Discard card from hand and play mat.
    -Shuffle deck.
    -Snapping to various places on the mat: active pokemon, benched pokemon, attached energy
