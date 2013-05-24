function(doc){
    if (doc._id.substr(0,5) === "char1"){
        emit(doc._id, {
            "Date":doc.Date,
            "Name":doc.Name,
            "Race":doc.Race,
            "Class":doc.Class
        });
    }

}