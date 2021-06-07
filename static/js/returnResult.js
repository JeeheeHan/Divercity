"use strict";

console.log("i am saving input!");

function returnResults(evt) {

    evt.preventDefault();


    let url = "/save-city";

    let savedData = {
                     'city': $('#user-city').val(),
                    };


    $.post(url, savedData, (response) => {


        let final_url = response;


        let settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": final_url,
                        "method": "GET",
                        "headers": {}
                        }


        $.ajax(settings).done(function (data) {


        document.getElementById('flickr').replaceChildren();
        $("#galleryTitle").html("<span>You have searched for people in </span>" + savedData["city"]+".");
        $("#instructions").html("<p class='notbold'>Click the top right hand corner to select pictures.</p>");
        $("#ending").html("<br><p>Log in to save these images to your account 😀  </p>");
        // window.scrollBy(-10000, -10000);
        document.getElementById("flickr").scrollIntoView({ block: 'start',  behavior: 'smooth' });

        $.each( data.photos.photo, function( i, gp ) {

                let farmId = gp.farm;
                let serverId = gp.server;
                let id = gp.id;
                let secret = gp.secret;


        console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

        
        $("#flickr").append('<a href="https://www.flickr.com/photo.gne?id=' + id + '/" target="_blank"><img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/></a><input class="form-check-input" type="checkbox" name="selected" value="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg">');

        });
        });
        $("#image-form").on("submit", saveImages);
        });
}

$("#city-form").on("submit", returnResults);


// $("#city-form").reload(true);