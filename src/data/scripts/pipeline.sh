#!/bin/bash
cd ../processing

jq -r '. | select((.pos=="noun") or (.pos=="verb") or (.pos=="adj") or (.pos=="adv")) | select((.word | test("[^a-z]"))|not) | {word: .word, type: .pos, pronunciation: .sounds[0].ipa, definitions: (try .senses|map(.glosses|join(" ")))}' \
wiktionary.json > wiktionary-p1.json

jq --slurp '. | group_by(.word)[] | {word:.[0].word, pronunciation:.[0].pronunciation, meanings:[.[]|{type:.type, form_of:(try .form_of), definitions:[try .definitions[]]| select(.!=[]) |map({(.):1})|add|keys_unsorted}]}' \
wiktionary-p1.json > wiktionary-p2.json

jq --slurp '.' wiktionary-p2.json > wiktionary-p3.json

#extract samples
timestamp=$(date +%s)
jsonl=wiktionary-p2.json
 jq '. | select(.word=="chocolate")' $jsonl > ../samples/chocolate-$timestamp.json
 jq '. | select(.word=="write")' $jsonl > ../samples/write-$timestamp.json
 jq '. | select(.word=="terrible")' $jsonl > ../samples/terrible-$timestamp.json
 jq '. | select(.word=="look")' $jsonl > ../samples/look-$timestamp.json
 jq '. | select(.word=="looks")' $jsonl > ../samples/looks-$timestamp.json
 jq '. | select(.word=="edges")' $jsonl > ../samples/edges-$timestamp.json
