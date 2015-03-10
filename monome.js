// on document load
$(function() {

    initialiseMonome();
    cycleMonome();
});

var currentSelectedColumn = 0;
var numberOfRows = 8;
var numberOfColumns = 16; 

var sounds = [
    new Howl({urls: ['resources/001.wav']}),
    new Howl({urls: ['resources/002.wav']}),
    new Howl({urls: ['resources/003.wav']}),
    new Howl({urls: ['resources/004.wav']}),
    new Howl({urls: ['resources/005.wav']}),
    new Howl({urls: ['resources/006.wav']}),
    new Howl({urls: ['resources/007.wav']}),
    new Howl({urls: ['resources/008.wav']})
];
    
function initialiseMonome() {
    
    var wrapper = $("#wrapper");
    var square = $(".square").first();
    
    // layout the squares
    for (var row = 0; row < numberOfRows; row++) {     
        for (var column = 0; column < numberOfColumns; column++) {
            wrapper.find(".square").last().after(square.clone().attr("data-row", row).attr("data-column", column));
        }        
    }

    // we remove the template
    wrapper.find(".square").first().remove();
        
    // toggle the square selection
    wrapper.find(".square").click(function(e) {
        if($(this).is(".on")) $(this).removeClass("on");
        else $(this).addClass("on");
    });
}

function cycleMonome() {

    var tempo = 220;
    var wrapper = $("#wrapper");
    
    wrapper.find(".square").removeClass("mid");
    
    wrapper.find("[data-column=" + currentSelectedColumn +"]").each(function(index) {
        
        var index = parseInt($(this).attr("data-row"));

        if (!$(this).is(".on"))
            $(this).addClass("mid");
        else
            sounds[index].play();
    });
    
    currentSelectedColumn = (currentSelectedColumn + 1) % numberOfColumns;
    
    var timer = setTimeout(function() {
        cycleMonome(); 
    }, tempo);
    
    
}



