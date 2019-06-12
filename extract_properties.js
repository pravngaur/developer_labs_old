var fs = require('fs');
const cheerio = require('cheerio');
var decode = require('unescape');
var inputFile = process.argv[ 2 ];
fs.readFile(`${__dirname}/${inputFile}`, {encoding: 'utf8'}, function (err, doc) {
    const $ = cheerio.load(doc, {decodeEntities: false, normalizeWhitespace: true, xmlMode: true});

    $('content').each(function (idx, content) {
        var contentId = $(content).attr('content-id');
        $(content).find('display-name').each(function (dataIdx, data) {
            var lang = $(data).attr('xml:lang');
            var text = $(data).html();
            var final = `${contentId}.display-name.${lang}.text=${text}`;
        });

        $(content).find('data').each(function (dataIdx, data) {
            var lang = $(data).attr('xml:lang');
            var json = JSON.parse($(data).html());
            var property;
            // TODO: get all properties with '*_localizable'
            // console.log(json)
            Object.keys(json).forEach(function (a, b) {
                if (a && a.length && a.lastIndexOf('_localizable') !== -1) {
                    // console.log(a, b)
                    property = a;
                    property = json[ property ] ? decode(json[ property ]) : '';
                    var final = `${contentId}.data.${lang}.text_headline_localizable=${property}`;
                    console.log(final);
                }
            });

            // console.log(contentId, lang, $(`content[content-id='${contentId}'] data[xml\\:lang='${lang}']`).html());
            // var newLangJson = json;
            // json.var
            // newData = $(`<data xml:lang="fr_FR">`)

        });
    });
});


