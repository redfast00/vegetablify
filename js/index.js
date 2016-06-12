'use strict';
/*global $*/
/*global Cookies*/
const international_vegetables = {
    nl: ["aardaker", "knolcyperus", "aardamandel", "aardappel", "aardpeer", "champagneblad", "abc-kruid", "adelaarsvaren", "baobab", "luzerne", "alfalfa", "alocasie", "amsoi", "andijvie", "antruwa", "arrowroot", "artisjok", "asperge", "asperge-erwt", "aubergine", "augurk", "avocado", "ayote", "bamboescheut", "bieslook", "biet", "bindsla", "bleekselderij", "bloemkool", "boomkalebas", "boon", "boerenkool", "bosui", "brandnetel", "broccoli", "broodboom", "broodvrucht", "bimi", "cassave", "cayennepeper", "chayote", "chilipeper", "citroengras", "courgette", "doperwt", "erwt", "fleskalebas", "savooiekool", "groenlof", "haverwortel", "hertshoornweegbree", "ijsbergsla", "ijskruid", "nangka", "kailan", "kannibaaltomaat", "kapucijner", "kardoen", "kervel", "kikkererwt", "kiwano", "kliswortel", "knolcapucien", "knolkervel", "knoflook", "knolraap", "knolselderij", "venkel", "komkommer", "konjak", "kool", "koolraap", "koolrabi", "kousenband", "kudzu", "lamsoor", "bosui", "lente-ui", "linze", "lotuswortel", "mais", "meiraap", "molsla", "melindjoe", "mergkool", "mungboon", "muskaatpompoen", "oca", "okra", "olifantenyam", "paksoi", "paprika", "pastinaak", "patisson", "pereskia", "peterselie", "peultjes", "pompoen", "postelein", "pijlkruid", "bosui", "pijpajuin", "prei", "pronkboon", "raapstelen", "rabarber", "radijs", "rammenas", "rapunzelklokje", "repelsteeltje", "rodekool", "romanesco", "roodlof", "rucola", "sago", "savooiekool", "schorseneren", "selderij", "sint-jansui", "sjalot", "sla", "snijbiet", "snijboon", "snijselderij", "spekboon", "sopropo", "sperzieboon", "spinazie", "spinaziezuring", "spitskool", "wittekool", "savooiekool", "splijtkool", "sponskomkommer", "spruitkool", "suikermais", "suikerwortel", "sojaboon", "takako", "taro", "taugé", "tayer", "tetragonia", "teunisbloem", "tindola", "tomaat", "topinamboer", "tuinkers", "tuinboon", "tuinmelde", "ui", "veldsla", "veldzuring", "venkel", "vijgenbladpompoen", "vleugelkomkommer", "vleugelboon", "waspompoen", "waterkers", "waterspinazie", "winterpostelein", "witlof", "wittekool", "mimosa", "wortel", "wortelpeterselie", "yam", "yamboon", "zeekool", "zeekraal", "bataat", "zonnewortel", "zuurkool"],
    en: ["acornsquash", "alfalfasprout", "amaranth", "anise", "artichoke", "arugula", "asparagus", "aubergine", "azukibean", "bananasquash", "basil", "beansprout", "beet", "blackbean", "black-eyedpea", "bokchoy", "borlottibean", "broadbeans", "broccoflower", "broccoli", "brusselssprout", "butternutsquash", "cabbage", "calabrese", "caraway", "carrot", "cauliflower", "cayennepepper", "celeriac", "celery", "chamomile", "chard", "chayote", "chickpea", "chives", "cilantro", "collardgreen", "corn", "cornsalad", "courgette", "cucumber", "daikon", "delicata", "dill", "eggplant", "endive", "fennel", "fiddlehead", "frisee", "garlic", "gemsquash", "ginger", "greenbean", "greenpepper", "habanero", "herbsandspice", "horseradish", "hubbardsquash", "jalapeno", "jerusalemartichoke", "jicama", "kale", "kidneybean", "kohlrabi", "lavender", "leek", "legume", "lemongrass", "lentils", "lettuce", "limabean", "mamey", "mangetout", "marjoram", "mungbean", "mushrooms", "mustardgreen", "navybean", "nettles", "newzealandspinach", "nopale", "okra", "onion", "oregano", "paprika", "parsley", "parsnip", "pattypan", "peas", "pintobean", "potato", "pumpkin", "radicchio", "radish", "rhubarb", "rosemary", "runnerbean", "rutabaga", "sage", "scallion", "shallot", "skirret", "snappea", "soybean", "spaghettisquash", "spinach", "squash", "sweetpotato", "tabascopepper", "taro", "tatsoi", "thyme", "tomato", "topinambur", "tubers", "turnip", "wasabi", "waterchestnut", "watercress", "whiteradish", "yam", "zucchini"]
};
$('document').ready(function() {
    $("form").on("submit", function(event) {
        //This prevents forms from refreshing the page
        event.preventDefault();
    });
    $("#nameform").submit(function() {
        var name = $('#name').val().toLowerCase();
        // lowercases name so search will match
        var list = $("#answerlist");
        var language = Cookies.get('lang') || 'en';
        var veggies = international_vegetables[language];
        var vegetabled_names = [];
        for (var i = 2; i < name.length + 1; i++) {
            vegetabled_names = vegetabled_names.concat(getVegetableNames(name, veggies, i));
        }
        for (var i = 0; i < vegetabled_names.length; i++) {
            var vegetabled_name = vegetabled_names[i].charAt(0).toUpperCase() + vegetabled_names[i].slice(1);
            $('<li/>').text(vegetabled_name).addClass('collection-item').appendTo(list);
        }
        //This hides the inputbox
        $('#form-container').hide(500);
        //This shows the answers
        $('#answers').show(500);
    });
    $("#back-btn").click(function() {
        //This shows the inputbox
        $('#form-container').show(1000);
        //This hides and deletes old answersq
        $('#answers').hide(1000);
        $("#answerlist").empty();
    });
});

function getVegetableNames(name, arr_vegetables, length) {
    /*
    This function checks if the first `length` letters of a vegetable are the same as the last 
    `length` letters of the name and then returns an array of modified names.
    */
    var chars_to_check = name.substr(name.length - length);
    var base_name = name.substr(0, name.length - length);
    var return_array = [];
    for (var index in arr_vegetables) {
        var last_n_chars = arr_vegetables[index].substr(0, length);
        if (last_n_chars === chars_to_check) {
            var veggi_name = base_name + arr_vegetables[index];
            return_array.push(veggi_name);
        }
    }
    return return_array;
}