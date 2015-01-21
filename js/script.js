
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

    // YOUR CODE GOES HERE!
    // todo: figure out why value selection is not working
    var $street = $(".street").val();
    var $city = $(".city").val();

    var streetviewUrl = '<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' +
            $street + ', ' + $city + '">';

    $body.append(streetviewUrl);

    return false;
}

$('#form-container').submit(loadData);



// loadData();
