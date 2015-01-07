// function to set text in div elements to just fill each 'page' and with 'page' number in :after

// note: there is NO case here when text is too short!!!

function pageSet(pageht){
    var pages = 1, 
        cnt = 0,
        pagesID = 0, 
        rawID = 'z1',
        pagetxt = 0,
        nextPage = 0, 
        nextID = 0,
        rawNextID = 0,
        textbreak = 0,
        textmove = 0, 
        textkeep = 0,
        targetOld = 0,
        targetDivs = $('.excerpt-words').length + 1,
        targetNew = document.getElementById('z2');
//making sure pagesID scrollHeight works.... is just number, no 'px'
//    var testWhile = document.getElementById(rawID).scrollHeight; 
    
// set the class of text containers to window height    
    $( ".excerpt-words" ).css( "max-height", pageht + "px" );
    
// markdown won't apply paragraphs within html block elements, so need to wrap <p>s
    for (cnt = 1; cnt < targetDivs; cnt++) {
    pagesID = "z" + cnt; 
        var textID = document.getElementById(pagesID);
    pagetxt = textID.innerHTML;    
    pagetxt = '<p>' + pagetxt + '</p>';
    pagetxt = pagetxt.replace(/\r\n\r\n/g, "</p> <p>").replace(/\n\n/g, "</p> <p>");
    document.getElementById(pagesID).innerHTML = pagetxt;
}
    
// continue until there is nothing in next target to move
while  (targetNew.innerHTML !== '') {
// repeat while content height of contents of article element is greater than element

        pagesID = "#z" + pages; 
        rawID = "z" + pages;
        pagetxt = $(pagesID).text();
        nextPage = pages + 1; 
        nextID = "#z" + nextPage;
        rawNextID = "z" + nextPage;
        targetOld = document.getElementById(rawID);
        targetNew = document.getElementById(rawNextID);
    

    
// check to see if there are is an extra article element, make one if not       
    if ( !targetNew ) {
         $( pagesID ).after( "<div class='excerpt-words' id='" + rawNextID + "'></div>");}  
    
// do the actual shifting of text
    while ( targetOld.scrollHeight > pageht ) {
// search for last space in text, cut apart text before and after the space
        textbreak = pagetxt.lastIndexOf(" ");
        textmove = pagetxt.slice(textbreak);
        textkeep = pagetxt.slice(0,textbreak);

// write back smaller file to old container
        targetOld.innerHTML = textkeep;

// move extra text to newer container
        targetNew.innerHTML = textmove + targetNew.innerHTML;
    }
        pages++;
  }
}
       
// window resize adjust 'page' size, flow text
$( window ).resize(function() {
    pageSet($( window ).height());
});

// document ready adust 'page' size, flow text
$( document ).ready( function() {
    pageSet($( window ).height());
});