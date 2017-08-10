const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.bigben = functions.https.onRequest((req, res) => {
  // const formattedDate = 'algo';
  // console.log('Sending Formatted date:', formattedDate);

 res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, cel");

  var cel = req.get('cel');
  var voluntariosRef = admin.database().ref().child(`voluntariosCuu`);

 if (cel != null) {
    return voluntariosRef.once('value').then((snapshot) => {
      var data = snapshot.val();
      var voluntario = null;

     Object.keys(data).forEach((elementId) => {
        if (data[elementId].cel == cel) {
          voluntario = {
            uid: elementId,
            birthyear: data[elementId].birthyear,
            cel: data[elementId].cel,
            email: data[elementId].email,
            gender: data[elementId].gender,
            name: data[elementId].name,
            school: data[elementId].school,
            size: data[elementId].size
          };
        }
      });
    if (voluntario != null) {
      res.status(200).send(voluntario);
    } else {
      res.status(200).send({});
    }

    });
  } else {
    res.status(200).send('not a valid header found');
  }


});
