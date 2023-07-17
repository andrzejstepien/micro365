#!/bin/bash
cd ../processing

jq -r '. | select((.pos=="noun") or (.pos=="verb") or (.pos=="adj") or (.pos=="adv")) | select((.word | test("[^a-z]"))|not) | {word: .word, type: .pos, pronunciation: .sounds[0].ipa, definition: .senses[].glosses}' \
wiktionary.json > wiktionary-processed.json

jq --slurp '.' wiktionary-processed.json > wiktionary-processed-array.json

jq '. | group_by(.word)[] | {word:.[0].word, pronunciation:.[0].pronunciation, meanings:([.[] | {type:.type, definition:(try .definition[])}]|unique)}' \
wiktionary-processed-array.json > wiktionary-grouped-objects.json

jq --slurp '.' wiktionary-grouped-objects.json > wiktionary-grouped-objects-array.json

