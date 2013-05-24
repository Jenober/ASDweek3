// Houston Bennett
// ASD 1305
// JavaScript Template
var editKey;

$('#home').on('pageinit', function () {

});

$('#addNew').on('pageinit', function () {


    console.log('addNew Init ok');
    var myForm = $('#addCharForm');

    myForm.validate({
        invalidHandler: function (form, validator) {
            console.log('WRONG!');
        },
        submitHandler: function () {
            console.log('Validation OK. Begin Form Serialize.');
            var data = myForm.serializeArray();
            console.log("This is the serialized data: " + data);
            console.log("Calling storeData!");

            storeData();
        }
    });
    //any other code needed for addItem page goes here

});

$('#xmlPage').on('pageinit', function(){
    $('#xmlBtn').on('click', getXML);


});

$('#jsonPage').on('pageinit',function(){

    $('#jsonBtn').on('click',function(){

        console.log("getJSON has been called!")
        var charList = $('#jsonList');
        console.log(charList);

        $.ajax({
            url: 'json.json',
            type: 'GET',
            dataType: 'json',
            success: function(response){
                console.log('Succeessful AJAX CALL!')
                  // console.log(response.Default[1]);

                for(var key in response){
                    console.log("this is the key: " + key);
                    var each = response[key];
                    console.log("This is the each: " + each);
                    for (var char in each){
                        //console.log("This is Char: "+ each[char][0]);

                        charList.append("<li>" + each[char][0] + " " + each[char][1]+'</li>')

                    }
                    charList.append("<p></p>");

                }

            },
            error: function(error,parseerror){
                console.log(error);
                console.log(parseerror);
                console.log("Yall done fucked up!")
            }



        });


            charList.append("<p></p>")
        $('#charList').html('</ul>');
    });

});

$('#newestPage').on('pageinit', function () {
    console.log("Newest Char page has loaded!!");

    console.log("CAlling getData!!");
    getData();
    console.log("Getdata has finished");

    console.log("adding click event for editbtn");
    $('.editBtn').on('click', function () {
        console.log('CLICKY CLICKY!!')
        editKey = $(this).data('id');
        console.log(editKey);
    });

    console.log("adding click event for delbtn");

    $('.delBtn').on('click', function(){
        console.log("deleteItem function has been called by: " + this);
        var key = $(this).data('id');
        console.log("deleting item at key: "+ key);
        localStorage.removeItem(key);
        //alert('The item #' + key + ' had been deleted!!');


    });

});

$('#editChar').on('pageinit', function () {

    var data = localStorage.getItem(editKey),
        fieldValues = JSON.parse(data),
        myForm = $('#editCharForm');

    myForm.validate({
        invalidHandler: function (form, validator) {
            console.log('WRONG!');
        },
        submitHandler: function () {
            console.log('Validation OK. Begin Form Serialize.');
            var data = myForm.serializeArray();
            console.log("This is the serialized data: " + data);
            console.log("Calling storeData!");

            saveEdits(editKey);
        }
    });

    console.log(fieldValues);
    $('#editDate').val(fieldValues.date[1]);
    $('#editName').val(fieldValues.name[1]);
    $('#editRace').val(fieldValues.race[1]);
    $('#editClass').val(fieldValues.class[1]);
    $('#editStr').val(fieldValues.str[1]);
    $('#editCon').val(fieldValues.con[1]);
    $('#editDex').val(fieldValues.dex[1]);
    $('#editInt').val(fieldValues.int[1]);
    $('#editWis').val(fieldValues.wis[1]);
    $('#editCha').val(fieldValues.cha[1]);

});



//The functions below can go inside or outside the pageinit function for the page in which it is needed.

//Variables for use in functions below




var autofillData = function () {

};

var saveEdits = function (key) {


    var inputData = {};

    inputData.date = ["Creation Date: ", $('#editDate').val()];
    inputData.name = ["Character Name: ", $('#editName').val()];
    inputData.race = ["Character Race: ", $('#editRace').val()];
    inputData.class = ["Class: ", $('#editClass').val()];
    inputData.str = ["Strength: ", $('#editStr').val()];
    inputData.con = ["Constitution: ", $('#editCon').val()];
    inputData.dex = ["Dexterity: ", $('#editDex').val()];
    inputData.int = ["Intelligence: ", $('#editInt').val()];
    inputData.wis = ["Wisdom: ", $('#editWis').val()];
    inputData.cha = ["Charisma: ", $('#editCha').val()];
    //This block above seems silly to me. There must be a way to loop through the DOM
    //and gather each input value. I think traversing could accomplish this
    // I don't know how to implement the idea just yet.
    console.log(inputData);
    localStorage.setItem(key, JSON.stringify(inputData));
    console.log("Save Complete!")


};

var getData = function () {

    $.ajax({
        "url": "_view/clerics",
        "dataType": "json",
        "success": function(data){
            var charList = $('#charList');
            $.each(data.rows,function(index,character){
                var char = character;
                console.log(char);
                charList.append("<li>"+char.value.Date[0]+" "+char.value.Date[1]+"</li>");
                charList.append("<li>"+char.value.Name[0]+" "+char.value.Name[1]+"</li>");
                charList.append("<li>"+char.value.Race[0]+" "+char.value.Race[1]+"</li>");
                charList.append("<li>"+char.value.Class[0]+" "+char.value.Class[1]+"</li>");
                charList.append("<p></p>");

            })



        }


    });




    //charList.listview('refresh');
    $('#charList').html('</ul>');




};

var getXML = function () {
console.log('getting XML sir!');
    var xmlList = $('#xmlList');


    $.ajax({
        url: 'charSheet.xml',
        //type: "GET",
        dataType: 'xml',
        success: function(xml){
            console.log('SUCCESSFUL AJAX CALL!');
            console.log(xml);

            $(xml).find('char').each(function() {

                var thing = $(this);

                console.log(thing.find('date').text());
                var listItem = "Creation date: " + thing.find('date').text();
                console.log(listItem);
                xmlList.append('<li>'+listItem+'</li>' );
                console.log(thing.find('name').text());
                listItem = "Character Name: " + thing.find('name').text();
                xmlList.append("<li>" + listItem + "</li>");
                xmlList.append("<p></p>")


            });
           // $('#xmlList').listview('refresh');

        },
        error: function(){
            alert("Something went wrong!")
        }
    })
    $('#charList').html('</ul>');
};

var getJSON = function() {



};

var storeData = function () {
    console.log('Creating randoms')
    var userID = Math.floor(Math.random() * 1000001);

    var inputData = {};

    inputData.date = ["Creation Date: ", $('#CharDate').val()];
    inputData.name = ["Character Name: ", $('#CharName').val()];
    inputData.race = ["Character Race: ", $('#CharRace').val()];
    inputData.class = ["Class: ", $('#CharClass').val()];
    inputData.str = ["Strength: ", $('#CharStr').val()];
    inputData.con = ["Constitution: ", $('#CharCon').val()];
    inputData.dex = ["Dexterity: ", $('#CharDex').val()];
    inputData.int = ["Intelligence: ", $('#CharInt').val()];
    inputData.wis = ["Wisdom: ", $('#CharWis').val()];
    inputData.cha = ["Charisma: ", $('#CharCha').val()];
    //This block above seems silly to me. There must be a way to loop through the DOM
    //and gather each input value. I think traversing could accomplish this
    // I don't know how to implement the idea just yet.
    console.log(inputData);
    localStorage.setItem(userID, JSON.stringify(inputData));
    console.log("Save Complete!")
};

var deleteItem = function () {
    console.log("deleteItem function has been called by: " + this);
    var key = $(this).data('id');

    localStorage.removeItem(key);
    //alert('The item #' + key + ' had been deleted!!');
};

var clearLocal = function () {

};