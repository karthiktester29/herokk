
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var $street = $("#street").val();
    var $city = $("#city").val();
    var address = $street + ', ' + $city;

    $greeting.text('So, you want to live at '+ address +'?');
    $nytHeaderElem.text("New York Times Articles About "+ $city);

    var streetviewUrl = '<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' +
           address + '">';

    $body.append(streetviewUrl);

    $.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+$city+"&sort=newest&api-key=<insert key here>", function( data ) {
        var docs = data.response.docs;
        var articles = [];

        $.each(docs, function(index, value){
            if(value.document_type == 'article') {
                articles.push('<li class="article"><a href="'+value.web_url+'">'+value.headline.main+'</a><p>' + value.snippet + '</p>');
            }
        });

        $(articles.join( " " )).appendTo( $("#nytimes-articles") );

        // udacity solution
        // for(...)
        //   $nytElem.append(<article list item>);
    }).error(function(e) {
            $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
        }
    );

    //udacity answer
    //todo: change the code to try this out
    //'http://en.wikipedia.org/w/api.php?action=opensearch&search='+$city+'&format=json&callback=wikiCallBack'

    $.ajax("http://en.wikipedia.org/w/api.php?action=query&prop=links&format=json&titles="+$city+"&indexpageids&continue=", {dataType: "jsonp"
    }).done(function(data) {
        var pageIds = data.query.pageids;
        var numberOfPages = pageIds.length;
        for(var i = 0; i < numberOfPages; i++) {
            var index = pageIds[i];
            var pageLink = data.query.pages[index].links[0].title;
            $wikiElem.append('<li><a href="http://en.wikipedia.org/wiki/'+pageLink+'">'+pageLink+'</a></li>');
        }
    });

    return false;
}

$('#form-container').submit(loadData);



// loadData();
