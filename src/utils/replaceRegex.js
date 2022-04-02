// apiCall.js
const replaceRegex = (questions) => {
    const useReplaceRegex = (string) => {
        return string.replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&quot;/g, '"').replace(/&rsquo;/g, "'").replace(/&#039;/g, "'").replace(/&shy;/g, "").replace(/&hellip;/g, "...").replace(/&auml;/g, "Ä").replace(/&ouml;/g, "Ö").replace(/&uuml;/g, "ü").replace(/&Ouml;/g, "Ö").replace(/&ntilde;/g, "ñ").replace(/&eacute;/g, "é").replace(/&rsquo;/g, "'").replace(/&amp;/g, "&").replace(/&Eacute;/g, "é").replace(/&#039;/g, "'").replace(/&shy;/g, "").replace(/&iacute;/g, "í").replace(/&oacute;/g, "Ó").replace(/&reg;/g, "®").replace(/&trade;/g, "™").replace(/&lt;/g, "<")
    }
    const replaceEntities = questions.map((elem) => {
        elem.question = useReplaceRegex(elem.question);
        elem.answerButtons.forEach(element => 
            useReplaceRegex(element.name)
        )
        return elem;
    })
    return replaceEntities;
}

export default replaceRegex;