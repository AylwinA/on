




// document ready make popup of intro paragraphs
$( document ).ready( function() {
    
var cbwidth = Math.round($("body").width() * 0.75 ),
    cbleft = ($("body").width() - cbwidth)/2  + 'px';
    $.colorbox({
        inline:true,
        width:cbwidth + "px",
        initialWidth:cbwidth + "px", 
        open:true,
        href:"#z0",
        height:(385000/cbwidth) + "px",
        initialHeight:"430px",
        scrolling:false,
        opacity:0.5,
        left:cbleft,
        onClosed:function(){
    // hide div#z0 which was just in popup
        document.getElementById("z0").style.display = 'none';
    // display the paged divs in simplePagination
        buildPages();
        },
    });
  
    // put paragraphs into 'ex-hidden', the source of all text
    var textID = document.getElementById('ex-hidden');
    var pagetxt = textID.innerHTML;
    pagetxt = pagetxt.replace(/\r\n\r\n/g, "</p> <p>").replace(/\n\n/g, "</p> <p>");
    textID.innerHTML = "<p>" + pagetxt + "</p>";
    var    page = 1;
    buildNewsletter(page);
});

	// the height of the content, discluding the header/footer

function buildNewsletter(page){
    var content_height = 652,
        textLength = document.getElementById('ex-hidden').textContent.length;// the beginning page number to show in the footer
        //alert(textLength);
        if(textLength > 0){
            // when we need to add a new page, use a jq object for a template
            // or use a long HTML string, whatever your preference
            $page = $(".page_template:first").clone().addClass("page").css("display", "block");

            // fun stuff, like adding page numbers to the footer
            $page.find(".footer span").append(page);
            $("body").append($page);
            page++;

            // here is the columnizer magic
            $('#ex-hidden').columnize({
                columns: 2,
                target: ".page:last .content",
                overflow: {
                    height: content_height,
                    id: "#ex-hidden",
                    doneFunc: function(){
                        if (window.console) {console.log("done with page " + page);}
                        buildNewsletter(page);
                    }
                }
            });
        }
    }


function buildPages(){
        // Grab whatever we need to paginate
    var pageParts = $(".page");

    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var perPage = 1;

    // When the document loads we're on page 1
    // So to start with... hide everything else
    pageParts.slice(perPage).hide();

    // Apply simplePagination to our placeholder
    $("#gallery").pagination({
        items: numPages,
        itemsOnPage: perPage,
        displayedPages: 10,
        cssTheme: "light-theme",


    // We implement the actual pagination
    //   in this next function. It runs on
    //   the event that a user changes page
        onPageClick: function(pageNum) {
    // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

    // First hide all page parts
    // Then show those just for our page
            pageParts.hide().slice(start, end).show();
        }
    });
}