#!/bin/bash
cd ../processing

jq -r '. | select((.pos=="noun") or (.pos=="verb") or (.pos=="adj") or (.pos=="adv")) | select((.word | test("[^a-z]"))|not) | {word: .word, type: .pos, pronunciation: .sounds[0].ipa, definitions: .senses|map(.glosses)}' \
wiktionary.json > wiktionary-processed.json

jq --slurp '.' wiktionary-processed.json > wiktionary-processed-array.json

jq '. | group_by(.word)[] | {word:.[0].word, pronunciation:.[0].pronunciation, meanings:[.[]|{type:.type, definitions:[try .definitions[][]]| select(.!=[]) |map({(.):1})|add|keys_unsorted}]}' \
wiktionary-processed-array.json > wiktionary-grouped-objects.json

jq --slurp '.' wiktionary-grouped-objects.json > wiktionary-grouped-objects-array.json

#extract samples
timestamp=$(date +%s)
 jq '. | select(.word=="chocolate")' wiktionary-grouped-objects.json > ../samples/chocolate-$timestamp.json
 jq '. | select(.word=="write")' wiktionary-grouped-objects.json > ../samples/write-$timestamp.json
 jq '. | select(.word=="terrible")' wiktionary-grouped-objects.json > ../samples/terrible-$timestamp.json
 jq '. | select(.word=="look")' wiktionary-grouped-objects.json > ../samples/look-$timestamp.json

