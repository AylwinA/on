// function to set text in article elements to just fill each page and with page number in :after

// note: there is NO case here when text is too short!!!

function pageSet(pageht){
    var pages = 0, 
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
        targetNew= document.getElementById('z2');
//making sure pagesID scrollHeight works.... is just number, no 'px'
//    var testWhile = document.getElementById(rawID).scrollHeight; 
    
// set the class of text containers to window height    
    $( ".excerpt-words" ).css( "max-height", pageht + "px" );
while ( targetNew.innerHTML !== '' && targetNew.innerHTML !== null ) {
// repeat while content height of contents of article element is greater than element
        pages++;
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
         $( pagesID ).after( "<article class='excerpt-words' style='max-height;'" + pageht + "px;' id='" + rawNextID + "'></article>");}  
    
// do the actual shifting of text
    while ( targetOld.scrollHeight > pageht ) {
// search for last space in text, cut apart text before and after the space
        textbreak = pagetxt.lastIndexOf(" ");
        textmove = pagetxt.slice(textbreak);
        textkeep = pagetxt.slice(0,textbreak);

// write back smaller file to old container
        targetOld.innerHTML = textkeep;

// move extra text to lower article
        targetNew.innerHTML = textmove + targetNew.innerHTML;
    }
  }
}
       
// on window resize adjust 'page' size
$( window ).resize(function() {
    pageSet($( window ).height());
});

// document ready run function set page
$( document ).ready( function() {
    pageSet($( window ).height());
});