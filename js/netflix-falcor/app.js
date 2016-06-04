// var express = require("express");
// var app     = express();
// var falcor  = require("falcor");
// var port    = process.env.PORT || 3000;


// // We can prime the model cache with a new falcor.Model
// var model = new falcor.Model({
//   cache: {
//     events: [
//       {
//         name: "ng-conf",
//         description: "The worlds best Angular Conference",
//         location: { city: "Salt Lake City", state: "Utah" }
//       },
//       {
//         name: "React Rally",
//         description: "Conference focusing on Facebook's React",
//         location: { city: "Salt Lake City", state: "Utah" }
//       },
//       {
//         name: "ng-Vegas",
//         description: "Two days jam-packed with Angular goodness with a focus on Angular 2",
//         location: { city: "Las Vegas", state: "Nevada" }
//       },
//       {
//         name: "Midwest JS",
//         description: "Midwest JS is a premier technology conference focused on the JavaScript ecosystem.",
//         location: { city: "Minneapolis", state: "Minnesota" }
//       },
//       {
//         name: "NodeConf",
//         description: "NodeConf is the longest running community driven conference for the Node community.",
//         location: { city: "Walker Creek Ranch", state: "California" }
//       }

//     ]
//   }  
// });

// //=====================================================================================================================

// model
//   // We want the name and description values for the first three items
//   // from the data model
//   .get(["events", {from: 0, to: 2}, ["name", "description"]])
//   .then(function(response) {
//     document.getElementById("event-data").innerHTML = JSON.stringify(response, null, 2);
//   });


// app.listen(port, function() {
//   console.log('server is running on port ', port);
// })

// module.exports = app;