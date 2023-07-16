export default function makeToot(data){
    console.dir(data)
    let newString = ""
    const maxIterations = 3

    for(let i=0;i<=data.meanings.length-1;i++){
        const e = data.meanings[i]
        newString=newString+`
**${e.partOfSpeech}**

`
        for(let j=0;j<=e.definitions.length-1;j++){
            const definition = e.definitions[j]
            newString = 
`${newString} *${definition.definition}*
${definition.example ? `> ${definition.example}

` : ``}`
            if(j+1>=maxIterations){break}
        }
        if(i+1>=maxIterations){break}
    }

    const definitionsArray = data.meanings[0].definition
    const string =
`Today's prompt is:
# **${data.word}**
*${data.phonetic}*
${newString}
${data.sourceUrls}`
    
    console.log(string)
}