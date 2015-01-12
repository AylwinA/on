/* Redone:
Jan 04/15
*/

function pageSet(pageht){
    // eleminate old divs on page resize
    var pages = 1, 
        pagesID, 
        rawID,
        pagetxt,
        textbreak,
        textmove, 
        textkeep,
        textover,
        pageDone = false,
        createAfterID = '#ex-hidden',
        cutdivs = document.getElementsByClassName('excerpt-words');
        pageht = Math.round(0.9 * pageht);
    // elminate div.excerpt-words IF pre-exist
    while(cutdivs[0]) {
        cutdivs[0].parentNode.removeChild(cutdivs[0]);
    }

    // get text from hidden div
    var textID = document.getElementById('ex-hidden');
    pagetxt = textID.innerHTML;    
    //pagetxt = '<p>' + pagetxt + '</p>';
    //pagetxt = pagetxt.replace(/\r\n\r\n/g, "</p> <p>").replace(/\n\n/g, "</p> <p>")
    
// continue until there is nothing in next target to move
    while  (pagetxt !== "") {
// repeat while content height of contents of article element is greater than element
        pagesID = "#z" + pages; 
        rawID = "z" + pages;
    
// check to see if there is a div.excerpt-words#rawID element, make one if not       
    if ( !document.getElementById(rawID)) {
         var newDiv = document.createElement("div");
        newDiv.className = "excerpt-words";
        newDiv.id = rawID;
        newDiv.style.maxHeight = pageht + "px";
         document.getElementById('art-id').appendChild(newDiv);}  
    
    var target = document.getElementById(rawID),
        scrollH = target.scrollHeight;
    
// do the actual shifting of text from pagetxt to targetOld
    while ( !pageDone ) {
// search for first space in text, cut apart text before and after the space
        if (pagetxt === "") {break;}
        textbreak = pagetxt.indexOf("\n\n");
        textmove = pagetxt.slice(0, textbreak + 2);
        //textmove = textmove.replace("\n\n", "")
        textkeep = pagetxt.slice(textbreak + 2);

// write back smaller file to old container
        pagetxt = textkeep;

// move extra paragraph to new container
        target.innerHTML += "<p>" + textmove + "</p>";
        scrollH = target.scrollHeight;
            while ((scrollH > (pageht - 8))) {
// 'page' too full, pare back word by word.
                textover = target.innerHTML;
                textbreak = textover.lastIndexOf(" ");
                //find the last word
                textmove = textover.slice(textbreak);
                //cut space and word
                textmove = textmove.replace(/(<([^>]+)>)/ig,"");
                // removing all tags
                textmove = textmove.replace(/\.\n\n/g, ".</p><p>");
                pagetxt = textmove + pagetxt;
                //put last word back in FRONT of pagetxt (source)
                textover = textover.slice(0, textbreak);
                //put remainder from id z(n) in text to keep
                target.innerHTML = textover;            //replace ALL html with chopped html
                scrollH = target.scrollHeight;
                if (scrollH <= pageht - 8) {
                    //target.innerHTML += "</p>"
                    pageDone = true;
                    break;
                }
            }
 
        }
        pageDone = false;
        createAfterID = pagesID;
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
    var cbwidth = 900,
        cbleft = ($("body").width() - cbwidth)/2  + 'px';
    	$.colorbox({
            inline:true,
            width:cbwidth + "px",
            initialWidth:cbwidth + "px", 
            open:true,
            href:"#z0",
            height:"400px",
            initialHeight:"400px",
            scrolling:false,
            opacity:0.5,
            left:cbleft,
            onClosed:function(){
        // hide div#z0 which was just in popup
                document.getElementById("z0").style.display = 'none';
        }
    });
});

