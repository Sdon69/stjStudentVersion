/*
  Copyright 2016 Google, Inc.

  Licensed to the Apache Software Foundation (ASF) under one or more contributor
  license agreements. See the NOTICE file distributed with this work for
  additional information regarding copyright ownership. The ASF licenses this
  file to you under the Apache License, Version 2.0 (the "License"); you may not
  use this file except in compliance with the License. You may obtain a copy of
  the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License for the specific language governing permissions and limitations under
  the License.
*/

"use strict";

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expresshandlebars = require('express-handlebars');

var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expresshandlebars({
  layoutsDir: 'views',
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static('views'));
app.use('/', routes);

// catch 404 and forward to error handler
var err = new Error('Not Found');
app.use(function(req, res, next) {
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  var data = {
    message: err.message,
    error: err
  };
  if (req.xhr) {
    res.json(data);
  } else {
    res.render('error', data);
  }
});

module.exports = app;

//
// var bodyParser = require('body-parser');
// var fs = require('fs');
//
// const hbs = require('hbs');
//
// const  eventWriter = require('./eventWriter.js');
// const  eventViewer = require('./eventViewer.js');
//
// const  announcementViewer = require('./announcementViewer.js');
// const  announcementWriter = require('./announcementWriter.js');
//
// const  notesViewer = require('./notesViewer.js');
// const  notesWriter = require('./notesWriter.js');
//
// var globalFilteredData =  [{
//   str1: 'string1',
//   str2: 'string2'
// }];
//
// var dateToday;
//
// var sortedTitle;
// var sortedDescription;
// var sortedDateOfPublish;
// var sortedEventDate;
// var sortedLastDateofRegistration;
// var sortedFees;
// var sortedDepartment;
// var sortedFullName;
//
// var rawDataLength;
// module.exports.totalData = [{
//   str1: 'string1',
//   str2: 'string2'
// }];
//
// var totalData = [{
//   str1: 'string1',
//   str2: 'string2'
// }];
//
//
//
// var asyncAdd = (filter) =>
// {
//   return new Promise((resolve, reject) =>
//   {
//     dataFromSheets = eventViewer.getDataFromSheets(filter);
//
// resolve(eventViewer.itemDetails);
//
//
// });
// }
//
//
// var asyncAnnouncementViewer = (announcementDepartment,announcementSemester) =>
// {
//   return new Promise((resolve, reject) =>
//   {
//     dataFromSheets = announcementViewer.getDataFromSheets(announcementDepartment,announcementSemester);
//
// resolve(announcementViewer.itemDetails);
//
//
// });
// }
//
// var asyncNotesViewer = (notesDepartment,notesSemester) =>
// {
//   return new Promise((resolve, reject) =>
//   {
//     dataFromSheets = notesViewer.getDataFromSheets(notesDepartment,notesSemester);
//
// resolve(notesViewer.itemDetails);
//
//
// });
// }
//
//
//
// var raw_data;
//
// console.log(totalData);
//
// var dept_filter;
// var dataFromSheets;
//
//
//
// var json2html = require('node-json2html');
//
//
//
// var data = [{
//   name : 'name',
//   age : '56'
// }]
//
// var transformNotes =
//   {'<>':"div style='width:100%;padding-top:20px;'",'html':[
//                     {'<>':"form method='post' action='/detailedNotes' method ='post' ",'html':[
//                         {'<>':"input type='submit' value='${uniqueId}) \n Tap to Expand the content below'  style='background:#fff;color:#3f8acd;font-weight:550;' name='s3' ",'html':[
//                           {'<>':"font face='Roboto'",'html':[
//                       {'<>':"div style='width:100%;padding-top:20px; padding-bottom:10px; margin-right:20px; background:#ffffff;border-width:1px; border-color:rgba(130,130,130,1.00);border-style: solid; border-top:none;border-left:none;'",'children':[
//                         {
//                           '<>':"div style='width:100%'",'children':[
//                             {
//                               '<>':"table style='width:100%'",'children':[
//                                 {
//                                     '<>':"tr",'children':[
//                                       {
//                                         '<>':"td style='margin-bottom:3px; color:#3f8acd;font-size:14px; font-weight:500; padding-top:25px'",'html':"${title}"
//                                       },
//                                       {
//                                         '<>':"td style='margin-right:25px;padding-top:6px;font-size:8px; font-weight:600; color:#848587; padding-right:15px;' align='right'",'html':"${datePublished}"
//                                       }
//                                     ]
//                                 }
//                               ]
//                             }
//                           ]
//                         },{
//                             '<>':"div style='margin-left:6px; margin-top:4px; margin-bottom:4px;  font-size:10px ; font-weight:450;'",'children':[
//                               {
//                                 '<>':"table style='width:100%'",'children':[
//                                   {
//                                       '<>':"tr",'children':[
//                                         {
//                                             '<>':"td style='align-content:flex-start; font-size:10px;font-weight:450;'",'html':"Entry Fees : ${title}"
//                                         },
//                                         {
//                                             '<>':"td align='right' style='padding-right:8%;font-size:10px;font-weight:450;'",'html':"Date : ${title}"
//                                         }
//                                       ]
//                                   }
//                                 ]
//                               }
//                             ]
//                         },{
//                             '<>':"div style='margin-left:10x;margin-right:10x; font-size:12px; font-weight:450; padding-top:5px;'",'html':"${dottedString}"
//                         }
//                     ]}  ] }]}]}]};
//
//
// var transformAnnouncements =
//   {'<>':"div style='width:100%;padding-top:20px;'",'html':[
//                     {'<>':"form method='post' action='/detailedAnnouncement' method ='post' ",'html':[
//                         {'<>':"input type='submit' value='${uniqueId}) \n Tap to Expand the content below'  style='background:#fff;color:#3f8acd;font-weight:550;' name='s3' ",'html':[
//                           {'<>':"font face='Roboto'",'html':[
//                       {'<>':"div style='width:100%;padding-top:20px; padding-bottom:10px; margin-right:20px; background:#ffffff;border-width:1px; border-color:rgba(130,130,130,1.00);border-style: solid; border-top:none;border-left:none;'",'children':[
//                         {
//                           '<>':"div style='width:100%'",'children':[
//                             {
//                               '<>':"table style='width:100%'",'children':[
//                                 {
//                                     '<>':"tr",'children':[
//                                       {
//                                         '<>':"td style='margin-bottom:3px; color:#3f8acd;font-size:14px; font-weight:500; padding-top:25px'",'html':"${title}"
//                                       },
//                                       {
//                                         '<>':"td style='margin-right:25px;padding-top:6px;font-size:8px; font-weight:600; color:#848587; padding-right:15px;' align='right'",'html':"${datePublished}"
//                                       }
//                                     ]
//                                 }
//                               ]
//                             }
//                           ]
//                         },{
//                             '<>':"div style='margin-left:6px; margin-top:4px; margin-bottom:4px;  font-size:10px ; font-weight:450;'",'children':[
//                               {
//                                 '<>':"table style='width:100%'",'children':[
//                                   {
//                                       '<>':"tr",'children':[
//                                         {
//                                             '<>':"td style='align-content:flex-start; font-size:10px;font-weight:450;'",'html':"Entry Fees : ${title}"
//                                         },
//                                         {
//                                             '<>':"td align='right' style='padding-right:8%;font-size:10px;font-weight:450;'",'html':"Date : ${title}"
//                                         }
//                                       ]
//                                   }
//                                 ]
//                               }
//                             ]
//                         },{
//                             '<>':"div style='margin-left:10x;margin-right:10x; font-size:12px; font-weight:450; padding-top:5px;'",'html':"${dottedString}"
//                         }
//                     ]}  ] }]}]}]};
//
//
//                     var transform =
//                       {'<>':"div style='width:100%;padding-top:20px;'",'html':[
//                                         {'<>':"form method='post' action='/detailedEvent' method ='post' ",'html':[
//                                             {'<>':"input type='submit' value='${uniqueId}) \n Tap to Expand the content below'  style='background:#fff;color:#3f8acd;font-weight:550;' name='s3' ",'html':[
//                                               {'<>':"font face='Roboto'",'html':[
//                                           {'<>':"div style='width:100%;padding-top:20px; padding-bottom:10px; margin-right:20px; background:#ffffff;border-width:1px; border-color:rgba(130,130,130,1.00);border-style: solid; border-top:none;border-left:none;'",'children':[
//                                             {
//                                               '<>':"div style='width:100%'",'children':[
//                                                 {
//                                                   '<>':"table style='width:100%'",'children':[
//                                                     {
//                                                         '<>':"tr",'children':[
//                                                           {
//                                                             '<>':"td style='margin-bottom:3px; color:#3f8acd;font-size:14px; font-weight:500; padding-top:25px'",'html':"${title}"
//                                                           },
//                                                           {
//                                                             '<>':"td style='margin-right:25px;padding-top:6px;font-size:8px; font-weight:600; color:#848587; padding-right:15px;' align='right'",'html':"${dateOfPublish}"
//                                                           }
//                                                         ]
//                                                     }
//                                                   ]
//                                                 }
//                                               ]
//                                             },{
//                                                 '<>':"div style='margin-left:6px; margin-top:4px; margin-bottom:4px;  font-size:10px ; font-weight:450;'",'children':[
//                                                   {
//                                                     '<>':"table style='width:100%'",'children':[
//                                                       {
//                                                           '<>':"tr",'children':[
//                                                             {
//                                                                 '<>':"td style='align-content:flex-start; font-size:10px;font-weight:450;'",'html':"Entry Fees : ${entryFees}"
//                                                             },
//                                                             {
//                                                                 '<>':"td align='right' style='padding-right:8%;font-size:10px;font-weight:450;'",'html':"Date : ${eventDate}"
//                                                             }
//                                                           ]
//                                                       }
//                                                     ]
//                                                   }
//                                                 ]
//                                             },{
//                                                 '<>':"div style='margin-left:10x;margin-right:10x; font-size:12px; font-weight:450; padding-top:5px;'",'html':"${dottedString}"
//                                             }
//                                         ]}  ] }]}]}]};
//
//
//
// var htmlBody = json2html.transform(data,transform);
//
//
//   //The Server Processes Starts here
//   // .
//   // .
//   // .
//   // .
//   // const port = process.env.PORT || 3000;
//   //
//   // var app = express();
//   // hbs.registerPartials(__dirname + '/views/partials');
//   // hbs.registerHelper('screamIt',(text) =>
//   // {
//   //   return text;
//   // });
//   // app.set('view engine','hbs');
//
//   // app.use((req, res, next) =>
//   // {
//   // var now = new Date().toString();
//   // var log = `${now}: ${req.method} ${req.url}`;
//   // console.log(log);
//   // fs.appendFile('server.log', log + '\n' , (err)=>
//   // {
//   //   if(err)
//   //   {
//   //     console.log('Unable to append server log')
//   //   }
//   // })
//   // next();
//   // });
//
//   // app.use(express.static('views'));
//
//   // app.use(express.static(__dirname + '/public'));
//
//   app.get('/eventWriterPage',(req,res) =>
//   {
//     // res.send('<h1>Hello Express!</h1>');
//
//     res.render('eventWriterPage.hbs',{
//       pageTitle: 'About Page',
//
//
//     });
//   });
//
//   app.get('/announcementWriterPage',(req,res) =>
//   {
//     // res.send('<h1>Hello Express!</h1>');
//
//     res.render('annonuncementWriterPage.hbs',{
//       pageTitle: 'About Page',
//
//
//     });
//   });
//
//   app.get('/notesWriterPage',(req,res) =>
//   {
//     // res.send('<h1>Hello Express!</h1>');
//
//     res.render('notesWriterPage.hbs',{
//       pageTitle: 'About Page',
//
//
//     });
//   });
//   app.get('/annonuncementViewerPage',(req,res) =>
//   {
//     // res.send('<h1>Hello Express!</h1>');
//
//     res.render('annonuncementViewerPage.hbs',{
//       pageTitle: 'About Page',
//
//
//     });
//   });
// asyncAdd('All Events').then((res) =>
// {
//   app.get('/eventViewerPage',(req,res) =>
//   {
//     // res.send('<h1>Hello Express!</h1>');
//
//     res.render('eventViewerPage.hbs',{
//       pageTitle: 'About Page',
//
//
//     });
//   });
//     });
//
//
//     asyncAnnouncementViewer('All Departments','All Semesters').then((res) =>
//     {
//       app.get('/annonuncementViewerPage',(req,res) =>
//       {
//         // res.send('<h1>Hello Express!</h1>');
//
//         res.render('annonuncementViewerPage.hbs',{
//           pageTitle: 'About Page',
//
//
//         });
//       });
//         });
//
//         asyncNotesViewer('All Departments','All Semesters').then((res) =>
//     {
//       app.get('/notesViewerPage',(req,res) =>
//       {
//         // res.send('<h1>Hello Express!</h1>');
//
//         res.render('notesViewerPage.hbs',{
//           pageTitle: 'About Page',
//
//
//         });
//       });
//         });
//
//     app.get('/',(req,res) =>
//     {
//       // res.send('<h1>Hello Express!</h1>');
//
//       res.render('home.hbs',{
//         pageTitle: 'About Page',
//
//
//       });
//
//       app.get('partials/table',(req,res) =>
//       {
//         // res.send('<h1>Hello Express!</h1>');
//
//         res.send('<h1>Hello</h1>')
//
//         });
//         });
//   // app.get('/',(req,res) =>
//   // {
//   //   // res.send('<h1>Hello Express!</h1>');
//   //
//   //   res.send('<form method="post" action="/genres"><select name ="s1">  <option>All Events</option><option>Technology</option>  <option>Social Gathering</option>  <option>Debate</option>  <option>Social Awareness</option><option>Convention</option><option>Sports</option><option>Other</option></select><input type="submit" value="Submit"></form>' + htmlBody);
//   // });
//
//
//   app.get('/bad',(req,res) =>
//   {
//     // res.send('<h1>Hello Express!</h1>');
//     res.send({
//       errorMessage: 'Unable to handle request'
//     });
//   });
//   //
//   // app.listen(port, () =>{
//   //   console.log('Server is up on port ' + port);
//   // });
//
//   app.use(bodyParser.urlencoded({
//       extended: true
//   }));
//
//   /**bodyParser.json(options)
//    * Parses the text as JSON and exposes the resulting object on req.body.
//    */
//   app.use(bodyParser.json());
//   app.post("/genres", function (req, res) {
//
//
//       dept_filter = req.body.s1;
//
//       third_filter = req.body.s3;
//
//
//
//       raw_data = eventViewer.itemDetails;
//
//
//       var forLength = raw_data.length - 1;
// console.log('forLength' + forLength);
//
//    var used = false;
//    var anyNoteFromDept = false;
//
//    var filteredData = [{
//    name: 'str1',
//    age:   'str2'
//    }];
//      for(i=0;i<=forLength;i++)
//      {
//      var dept = raw_data[i].cataegories;
//
//
//        if(dept.includes(dept_filter))
//        {
//
//
//          if(!used)
//          {
//          filteredData.pop({
//          name: 'str1',
//          age:   'str2'
//            });
//            filteredData.push(raw_data[i]);
//            used = true;
//            anyNoteFromDept = true;
//
//          }else{
//            filteredData.push(raw_data[i]);
//            anyNoteFromDept = true;
//          }
//
//
//
//        }
//      }
//
//      if(!anyNoteFromDept)
//      {
//        filteredData.pop({
//        name: 'str1',
//        age:   'str2'
//          });
//          filteredData.push({
//          name: 'No Data for this filter Exists'
//            });
//      }
//      globalFilteredData = filteredData;
//       htmlBody = json2html.transform(filteredData,transform);
//
//
//         app.get('/eventViewerFrame',(req,res) =>{
//           res.send('Filter Choosen:'+ dept_filter + htmlBody);
//
//
//
//
//         });
//     res.redirect('back');
//
//
//
//
//
//
//
// });
//
//
//
//   app.post("/showAnnouncements", function (req, res) {
//
//
//           console.log('yup','hello');
//
//           var departmentFilter = req.body.s1;
//           var semesterFilter = req.body.s2;
//
//
//           raw_data = announcementViewer.itemDetails;
//
//           console.log('checka' + raw_data[0].title);
//           console.log('check' + raw_data[0].cataegories);
//
//           var forLength = raw_data.length - 1;
//     console.log('forLength' + forLength);
//
//        var used = false;
//        var anyNoteFromDept = false;
//
//        var filteredData = [{
//        name: 'str1',
//        age:   'str2'
//        }];
//          for(i=0;i<=forLength;i++)
//          {
//          var dept = raw_data[i].cataegories;
//
//          console.log('filtered',dept);
//
//            if(dept.includes(departmentFilter))
//            {
//              console.log('S1');
//              if(dept.includes(semesterFilter))
// {
//    console.log('S2');
//              if(!used)
//              {
//              filteredData.pop({
//              name: 'str1',
//              age:   'str2'
//                });
//                filteredData.push(raw_data[i]);
//                used = true;
//                anyNoteFromDept = true;
//
//              }else{
//                filteredData.push(raw_data[i]);
//                anyNoteFromDept = true;
//              }
//
//              console.log('filtered')
// }
//            }
//          }
//
//          if(!anyNoteFromDept)
//          {
//            filteredData.pop({
//            name: 'str1',
//            age:   'str2'
//              });
//              filteredData.push({
//              title: 'No Data for this filter Exists'
//                });
//          }
//          globalFilteredData = filteredData;
//           htmlBody = json2html.transform(filteredData,transformAnnouncements);
//
//
//             console.log('false');
//             console.log('k5',htmlBody);
//             app.get('/annonuncementViewerFrame',(req,res) =>{
//               res.send( htmlBody);
//
//
//
//
//             });
//         res.redirect('back');
//
//
//
//
//
//
//
// });
//
//
//   app.post("/showNotes", function (req, res) {
//
//
//           console.log('yup','hello');
//
//           var departmentFilter = req.body.s1;
//           var semesterFilter = req.body.s2;
//
//
//           raw_data = notesViewer.itemDetails;
//
//           console.log('checka' + raw_data[0].title);
//           console.log('check' + raw_data[0].cataegories);
//
//           var forLength = raw_data.length - 1;
//     console.log('forLength' + forLength);
//
//        var used = false;
//        var anyNoteFromDept = false;
//
//        var filteredData = [{
//        name: 'str1',
//        age:   'str2'
//        }];
//          for(i=0;i<=forLength;i++)
//          {
//          var dept = raw_data[i].cataegories;
//
//          console.log('filtered',dept);
//
//            if(dept.includes(departmentFilter))
//            {
//              console.log('S1');
//              if(dept.includes(semesterFilter))
// {
//    console.log('S2');
//              if(!used)
//              {
//              filteredData.pop({
//              name: 'str1',
//              age:   'str2'
//                });
//                filteredData.push(raw_data[i]);
//                used = true;
//                anyNoteFromDept = true;
//
//              }else{
//                filteredData.push(raw_data[i]);
//                anyNoteFromDept = true;
//              }
//
//              console.log('filtered')
// }
//            }
//          }
//
//          if(!anyNoteFromDept)
//          {
//            filteredData.pop({
//            name: 'str1',
//            age:   'str2'
//              });
//              filteredData.push({
//              title: 'No Data for this filter Exists'
//                });
//          }
//          globalFilteredData = filteredData;
//           htmlBody = json2html.transform(filteredData,transformNotes);
//
//
//             console.log('false');
//             console.log('k5',htmlBody);
//             app.get('/notesViewerFrame',(req,res) =>{
//               res.send( htmlBody);
//
//
//
//
//             });
//         res.redirect('back');
//
//
//
//
//
//
//
// });
//
//
//
// app.post("/detailedEvent", function (req, res) {
//
// var bValue = req.body.s3[0];
// // var title = req.body.title;
//
//
// console.log(bValue,'hermes');
//
// asyncSortDetailedInfo(bValue).then(() =>
// {
//
//
//       app.get('/projects',(req,res) =>{
//
//
//
//
//
//
//
//         res.render('projects.hbs',{
//           title: sortedTitle,
//           description:sortedDescription,
//           dateOfPublish: sortedDateOfPublish,
//           eventDate: sortedEventDate,
//           lastDateofRegistration:sortedLastDateofRegistration,
//           entryFees:sortedFees,
//           genres:sortedDepartment,
//           fullName:sortedFullName
//
//
//         });
//
//         });
//          res.redirect('/projects');
// });
//
//
//
//
//
//
//
// });
//
//
// app.post("/detailedAnnouncement", function (req, res) {
//
// var bValue = req.body.s3[0];
// // var title = req.body.title;
//
//
// console.log(bValue,'hermes');
//
// asyncSortDetailedAnnouncement(bValue).then(() =>
// {
//
//
//       app.get('/detailedAnnouncement',(req,res) =>{
//
//
//
//
//
//
//
//         res.render('detailedAnnouncement.hbs',{
//           title: sortedTitle,
//           description:sortedDescription,
//           dateOfPublish: sortedDateOfPublish,
//           genres:sortedDepartment,
//           fullName:sortedFullName
//
//
//         });
//
//         });
//          res.redirect('/detailedAnnouncement');
// });
//
//
//
//
//
//
// });
//
//
// app.post("/detailedNotes", function (req, res) {
//
// var bValue = req.body.s3[0];
// // var title = req.body.title;
//
//
// console.log(bValue,'hermes');
//
// asyncSortDetailedNotes(bValue).then(() =>
// {
//
//
//       app.get('/detailedNotes',(req,res) =>{
//
//
//
//
//
//
//
//         res.render('detailedNotes.hbs',{
//           title: sortedTitle,
//           description:sortedDescription,
//           dateOfPublish: sortedDateOfPublish,
//           genres:sortedDepartment,
//           fullName:sortedFullName
//
//
//         });
//
//         });
//          res.redirect('/detailedNotes');
// });
//
//
//
//
//
//
//
// });
//
//
//
//
//
//
//   setTimeout(() =>
//   {
//     console.log('Inside of callback');
//   },2000);
//
//
//
//
// // var somePromise = new Promise((resolve,reject) =>
// // {
//   //
//   // app.post("/genres", function (req, res) {
//   //
//   //
//   //     dept_filter = req.body.s1;
//   //
//   //     console.log(dept_filter + 'hello');
//     //     var second_filter = req.body.s2;
//   //
//   //     console.log(dept_filter);
//   //
//   //     checkingConsoleCommands();
//   //
//   //     if(second_filter.includes('false'))
//   //     {
//   //     console.log(dept_filter + 'debt');
//   //
//   //
//   //
//   //    dataFromSheets = quickstart.getDataFromSheets(dept_filter)
//   //   // console.log('done \n' + dataFromSheets);
//   // }
//   //   if(second_filter.includes('true'))
//   //   {
//   //     console.log('Timeout over')
//   //        var htmlBody = json2html.transform(dataFromSheets,transform);
//   //       console.log('felony'+ htmlBody);
//   //       app.get('/about',(req,res) =>{
//   //         res.send('Doing' + htmlBody);
//   //
//   //   });
//   // }
//   // });
//
//
// function checkingConsoleCommands()
// {
//   console.log('hello check 124')
// }
//
// // });
//
// // somePromise.then(() =>
// // {
// //   console.log('Timeout over')
// //      var htmlBody = json2html.transform(dataFromSheets,transform);
// //     console.log('felony'+ htmlBody);
// //     app.get('/about',(req,res) =>{
// //       res.send('Doing' + htmlBody);
// //
// // });
// // });
//
//   // .
//   // .
//   // .
//   // .
//   // The Server Processes Ends here
//
// module.exports.refresh = () =>
// {
//   app.get('/about',(req,res) =>
//   {
//     // res.send('<h1>Hello Express!</h1>');
//
//     res.redirect('back');
//
//
//     });
//   }
//
//
// app.post("/eventgenres", function (req, res) {
//
//       eventTitle = req.body.eventTitle;
//       eventDesc  = req.body.eventDesc;
//       entryFees = req.body.entryFees;
//       pass_check = req.body.pass_check;
//       date_of_event = req.body.date_of_event;
//       lastDateOfRegistration = req.body.lastDateOfRegistration;
//       var isGenreChecked = false;
//       var isDateOfEventPast = false;
//       var isLastDateofRegistrationPast = false;
//
//       var genres = ['1'];
//       genres.pop('1');
//       var genreString = 'All Events'
//       g0 = req.body.genres0;
//       g1 = req.body.genres1;
//       g2 = req.body.genres2;
//       g3 = req.body.genres3;
//       g4 = req.body.genres4;
//       g5 = req.body.genres5;
//       g6 = req.body.genres6;
//       var informationComplete = true;
//       if(g0)
//       {
//       genres.push(g0);
//       isGenreChecked = true;
//     }
//       if(g1)
//       {
//       genres.push(g1);
//       isGenreChecked = true;
//     }
//       if(g2)
//       {
//         genres.push(g3);
//       isGenreChecked = true;
//     }
//       if(g4)
//   {    genres.push(g4);
//       isGenreChecked = true;}
//       if(g5)
//     {  genres.push(g5);
//       isGenreChecked = true;}
//       if(g6)
//   {    genres.push(g6);
//       isGenreChecked = true;}
//
//       var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
//
// var yyyy = today.getFullYear();
// if(dd<10){
//     dd='0'+dd;
// }
// if(mm<10){
//     mm='0'+mm;
// }
// var today = dd+'/'+mm+'/'+yyyy;
// dateToday = today;
// if(date_of_event.length > 2)
// {
// var dateOfEventArray = date_of_event.split("-");
// var dateOfEventYear = dateOfEventArray[0];
// var dateOfEventMonth = dateOfEventArray[1];
// var dateOfEventDay = dateOfEventArray[2];
// var dateOfEventString = `${dateOfEventDay}/${dateOfEventMonth}/${dateOfEventYear} `;
// console.log(dateOfEventString);
//
// }
//
// if(lastDateOfRegistration.length > 2)
// {
//   var lastDateOfRegistrationArray = lastDateOfRegistration.split("-");
//   var lastDateOfRegistrationYear = lastDateOfRegistrationArray[0];
//   var lastDateOfRegistrationMonth = lastDateOfRegistrationArray[1];
//   var lastDateOfRegistrationDay = lastDateOfRegistrationArray[2];
//   var lastDateOfRegistrationString = `${lastDateOfRegistrationDay}/${lastDateOfRegistrationMonth}/${lastDateOfRegistrationYear} `;
//   console.log(lastDateOfRegistrationString);
// }
//
//
//
//
// if(dateOfEventYear<yyyy)
// {
//   isDateOfEventPast = true;
// }
// if (dateOfEventMonth < mm) {
//   if(dateOfEventYear<yyyy)
//   {
//     isDateOfEventPast = true;
//   }
// }
//
//
// if (dateOfEventDay < dd) {
//  if (dateOfEventMonth < mm) {
//      if(dateOfEventYear < yyyy){
// isDateOfEventPast = true;
//
//       }
//     }
//   }
//
//   if(lastDateOfRegistrationYear < yyyy)
//   {
// isLastDateofRegistrationPast = true;
//   }
//
//   if(lastDateOfRegistrationMonth < mm)
//   {
//     if(lastDateOfRegistrationYear < yyyy)
//     {
//   isLastDateofRegistrationPast = true;
//     }
//   }
//
//
// if (lastDateOfRegistrationDay < dd)
// {
//  if(lastDateOfRegistrationMonth < mm)
//  {
//    if(lastDateOfRegistrationYear < yyyy)
//    {
// isLastDateofRegistrationPast = true;
//    }
//  }
// }
//
//
//
// if(eventTitle.length < 1)
// {
// informationComplete = false;
// console.log(informationComplete + '1');
// }
// else if (eventDesc.length < 1) {
// informationComplete = false;
// console.log(informationComplete + '2');
// }
// else if (entryFees.length < 1) {
//   informationComplete = false;
//   console.log(informationComplete + '3');
// }
// else if (pass_check.length < 1) {
// informationComplete = false;
// console.log(informationComplete + '4');
// }
// else if(date_of_event.length < 2)
// {
//
// informationComplete = false;
// console.log(informationComplete + "5");
// }
// else if(isDateOfEventPast)
// {
// informationComplete = false;
// console.log(informationComplete + "6");
// }
//
// else if(lastDateOfRegistration.length < 2)
// {
//
// informationComplete = false;
// console.log(informationComplete + '7' );
// }
// else if(isLastDateofRegistrationPast)
// {
// informationComplete = false;
// console.log(informationComplete + '8' );
// }
// else if (!isGenreChecked) {
//
// informationComplete = false;
// console.log(informationComplete + '9' );
// }
//
// if(informationComplete)
// {
//
// }
// else {
//   console.log('booh');
// }
//
//
// if(!genres)
// {
//   console.log('Choose Atleast one genre');
// }
// else if(1<genres.length){
// for(i=0;i<=genres.length - 1;i++)
// {
//   genreString = genreString.concat(genres[i]);
// }
// }else {
//   genreString = genreString.concat(genres);
// }
// console.log(genreString);
//
// var fullName = "Sample Name";
// var userId = "SampleId";
//
//
//
// if(informationComplete)
// {
//
//   asyncWrite(eventTitle,eventDesc,dateToday,dateOfEventString,lastDateOfRegistrationString,entryFees,genreString,userId,fullName).then(() =>
//   {
//     console.log('Writing Done')
//      res.redirect('/');
//   });
//
//
//
// }
// else {
//   console.log('booh');
// }
//
//
//
// });
//
//
// app.post("/notesWriteCheck", function (req, res) {
//
//       notesTitle = req.body.eventTitle;
//       notesDesc  = req.body.eventDesc;
//
//       pass_check = req.body.pass_check;
//
//       var isDepartmentChecked = false;
//
//
//       var department = ['1'];
//       department.pop('1');
//       var cataegoryString = 'All Departments All Semesters'
//       d0 = req.body.department0;
//       d1 = req.body.department1;
//       d2 = req.body.department2;
//       d3 = req.body.department3;
//       d4 = req.body.department4;
//       d5 = req.body.department5;
//
//       var informationComplete = true;
//       if(d0)
//       {
//       department.push(d0);
//       isDepartmentChecked = true;
//     }
//       if(d1)
//       {
//       department.push(d1);
//       isDepartmentChecked = true;
//     }
//       if(d2)
//       {
//         department.push(d2);
//       isDepartmentChecked = true;
//     }
//     if(d3)
//     {
//       department.push(d3);
//     isDepartmentChecked = true;
//   }
//       if(d4)
//   {    department.push(d4);
//       isDepartmentChecked = true;}
//       if(d5)
//     {  department.push(d5);
//       isDepartmentChecked = true;}
//
//
//       var isSemesterChecked = false;
//
//
//           var semester = ['1'];
//           semester.pop('1');
//
//           s0 = req.body.semester0;
//           s1 = req.body.semester1;
//           s2 = req.body.semester2;
//           s3 = req.body.semester3;
//           s4 = req.body.semester4;
//           s5 = req.body.semester5;
//
//           var informationComplete = true;
//           if(s0)
//           {
//           semester.push(s0);
//           isSemesterChecked = true;
//         }
//           if(s1)
//           {
//           semester.push(s1);
//           isSemesterChecked = true;
//         }
//           if(s2)
//           {
//             semester.push(s2);
//           isSemesterChecked = true;
//         }
//         if(s3)
//         {
//           semester.push(s3);
//         isSemesterChecked = true;
//       }
//           if(s4)
//       {    semester.push(s4);
//           isSemesterChecked = true;}
//           if(s5)
//         {  semester.push(s5);
//           isSemesterChecked = true;}
//
//
//
// if(notesTitle.length < 1)
// {
// informationComplete = false;
// console.log(informationComplete + '1');
// }
// else if (notesDesc.length < 1) {
// informationComplete = false;
// console.log(informationComplete + '2');
// }
//
// else if (pass_check.length < 1) {
// informationComplete = false;
// console.log(informationComplete + '4');
// }
//
//
// else if (!isDepartmentChecked) {
//
// informationComplete = false;
//   console.log(informationComplete + '9' );
//   }
//
//
//   else if (!isSemesterChecked) {
//
//   informationComplete = false;
//     console.log(informationComplete + '10' );
//     }
//
// if(informationComplete)
// {
//
// }
// else {
//   console.log('booh');
// }
//
//
// if(!department)
// {
//   console.log('Choose Atleast one Department');
// }
// else if(1<department.length){
// for(i=0;i<=department.length - 1;i++)
// {
//   cataegoryString = cataegoryString.concat(department[i]);
// }
// }else {
//   cataegoryString = cataegoryString.concat(department);
// }
// console.log(cataegoryString);
//
//
//
// if(!semester)
// {
//   console.log('Choose Atleast one Semester');
// }
// else if(1<semester.length){
// for(i=0;i<=semester.length - 1;i++)
// {
//   cataegoryString = cataegoryString.concat(semester[i]);
// }
// }else {
//   cataegoryString = cataegoryString.concat(semester);
// }
// console.log(cataegoryString);
//
//
// var fullName = "Sample Name";
// var userId = "SampleId";
//
//
//
// if(informationComplete)
// {
//
//   asyncWriteNotes(notesTitle,notesDesc,cataegoryString,userId,fullName).then(() =>
//   {
//     console.log('Writing Done')
//      res.redirect('/notesViewerPage');
//   });
//
//
//
// }
// else {
//   console.log('booh');
// }
//
//
//
// });
//
//
//
// var asyncWrite = (eventTitle,eventDesc,dateToday,dateOfEventString,lastDateOfRegistrationString,entryFees,genreString,userId,fullName) =>
// {
//   return new Promise((resolve, reject) =>
//   {
//     eventWriter.eventWriteFunction(eventTitle,eventDesc,dateToday,dateOfEventString,lastDateOfRegistrationString,entryFees,genreString,userId,fullName);
//
// resolve('Worked');
//
//
// });
// }
//
//
// var asyncWriteNotes = (title,description,cataegories,userId,fullName) =>
// {
//   return new Promise((resolve, reject) =>
//   {
//     notesWriter.notesWriteFunction(title,description,cataegories,userId,fullName);
//
// resolve('Worked');
//
//
// });
// }
//
//
// var asyncWriteAnnouncements = (title,description,cataegories,userId,fullName,dateOfPublish) =>
// {
//   return new Promise((resolve, reject) =>
//   {
//     announcementWriter.announcementWriteFunction(title,description,cataegories,userId,fullName,dateOfPublish);
//
// resolve('Worked');
//
//
// });
// }
//
//
//
// var asyncSortDetailedInfo = (button_value) =>
// {
//   return new Promise((resolve, reject) =>
// {
//
//   var forLength = globalFilteredData.length - 1;
//
//     for(i=0;i<=forLength;i++)
//     {
//     var uniqueId = globalFilteredData[i].uniqueId;
//
//
//       if(button_value === uniqueId)
//       {
//
//         sortedTitle = globalFilteredData[i].title;
//         sortedDescription = globalFilteredData[i].description;
//         sortedDateOfPublish = globalFilteredData[i].dateOfPublish;
//         sortedEventDate = globalFilteredData[i].eventDate;
//         sortedLastDateofRegistration = globalFilteredData[i].lastDateofRegistration;
//         sortedFees = globalFilteredData[i].entryFees;
//         sortedDepartment = dept_filter;
//         sortedFullName = globalFilteredData[i].fullName;
//         console.log('filtered')
//
//
//       }
//
//     }
//
//     resolve('Worked');
//     reject('Didnt Worked');
// });
// }
//
//
// var asyncSortDetailedAnnouncement = (button_value) =>
// {
//   return new Promise((resolve, reject) =>
// {
//
//   var forLength = globalFilteredData.length - 1;
//
//     for(i=0;i<=forLength;i++)
//     {
//     var uniqueId = globalFilteredData[i].uniqueId;
//
//
//       if(button_value === uniqueId)
//       {
//
//         sortedTitle = globalFilteredData[i].title;
//         sortedDescription = globalFilteredData[i].description;
//         sortedDateOfPublish = globalFilteredData[i].datePublished;
//         sortedDepartment = dept_filter;
//         sortedFullName = globalFilteredData[i].fullName;
//         console.log('filtered')
//
//
//       }
//
//     }
//
//     resolve('Worked');
//     reject('Didnt Worked');
// });
// }
//
//
// app.post("/announcementWriteCheck", function (req, res) {
//
//       notesTitle = req.body.eventTitle;
//       notesDesc  = req.body.eventDesc;
//
//       pass_check = req.body.pass_check;
//
//       var isDepartmentChecked = false;
//
//       var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
//
// var yyyy = today.getFullYear();
// if(dd<10){
//     dd='0'+dd;
// }
// if(mm<10){
//     mm='0'+mm;
// }
// var today = dd+'/'+mm+'/'+yyyy;
// dateToday = today;
//
//
//       var department = ['1'];
//       department.pop('1');
//       var cataegoryString = 'All Departments All Semesters'
//       d0 = req.body.department0;
//       d1 = req.body.department1;
//       d2 = req.body.department2;
//       d3 = req.body.department3;
//       d4 = req.body.department4;
//       d5 = req.body.department5;
//
//       var informationComplete = true;
//       if(d0)
//       {
//       department.push(d0);
//       isDepartmentChecked = true;
//     }
//       if(d1)
//       {
//       department.push(d1);
//       isDepartmentChecked = true;
//     }
//       if(d2)
//       {
//         department.push(d2);
//       isDepartmentChecked = true;
//     }
//     if(d3)
//     {
//       department.push(d3);
//     isDepartmentChecked = true;
//   }
//       if(d4)
//   {    department.push(d4);
//       isDepartmentChecked = true;}
//       if(d5)
//     {  department.push(d5);
//       isDepartmentChecked = true;}
//
// console.log(department);
//       var isSemesterChecked = false;
//
//
//           var semester = ['1'];
//           semester.pop('1');
//
//           s0 = req.body.semester0;
//           s1 = req.body.semester1;
//           s2 = req.body.semester2;
//           s3 = req.body.semester3;
//           s4 = req.body.semester4;
//           s5 = req.body.semester5;
//
//           var informationComplete = true;
//           if(s0)
//           {
//           semester.push(s0);
//           isSemesterChecked = true;
//         }
//           if(s1)
//           {
//           semester.push(s1);
//           isSemesterChecked = true;
//         }
//           if(s2)
//           {
//             semester.push(s2);
//           isSemesterChecked = true;
//         }
//         if(s3)
//         {
//           semester.push(s3);
//         isSemesterChecked = true;
//       }
//           if(s4)
//       {    semester.push(s4);
//           isSemesterChecked = true;}
//           if(s5)
//         {  semester.push(s5);
//           isSemesterChecked = true;}
//
//
//
// if(notesTitle.length < 1)
// {
// informationComplete = false;
// console.log(informationComplete + '1');
// }
// else if (notesDesc.length < 1) {
// informationComplete = false;
// console.log(informationComplete + '2');
// }
//
// else if (pass_check.length < 1) {
// informationComplete = false;
// console.log(informationComplete + '4');
// }
//
//
// else if (!isDepartmentChecked) {
//
// informationComplete = false;
//   console.log(informationComplete + '9' );
//   }
//
//
//   else if (!isSemesterChecked) {
//
//   informationComplete = false;
//     console.log(informationComplete + '10' );
//     }
//
// if(informationComplete)
// {
//
// }
// else {
//   console.log('booh');
// }
//
//
// if(!department)
// {
//   console.log('Choose Atleast one Department');
// }
// else if(1<department.length){
// for(i=0;i<=department.length - 1;i++)
// {
//   cataegoryString = cataegoryString.concat(department[i]);
// }
// }else {
//   cataegoryString = cataegoryString.concat(department);
// }
// console.log(cataegoryString);
//
//
//
// if(!semester)
// {
//   console.log('Choose Atleast one Semester');
// }
// else if(1<semester.length){
// for(i=0;i<=semester.length - 1;i++)
// {
//   cataegoryString = cataegoryString.concat(semester[i]);
// }
// }else {
//   cataegoryString = cataegoryString.concat(semester);
// }
// console.log(cataegoryString);
//
//
// var fullName = "Sample Name";
// var userId = "SampleId";
//
//
//
// if(informationComplete)
// {
//
//   asyncWriteAnnouncements(notesTitle,notesDesc,cataegoryString,userId,fullName,dateToday).then(() =>
//   {
//     console.log('Writing Done')
//      res.redirect('/annonuncementViewerPage');
//   });
//
//
//
// }
// else {
//   console.log('booh');
// }
//
//
//
// });
//
//
//
//
//
//
// var asyncSortDetailedNotes = (button_value) =>
// {
//   return new Promise((resolve, reject) =>
// {
//
//   var forLength = globalFilteredData.length - 1;
//
//     for(i=0;i<=forLength;i++)
//     {
//     var uniqueId = globalFilteredData[i].uniqueId;
//
//
//       if(button_value === uniqueId)
//       {
//
//         sortedTitle = globalFilteredData[i].title;
//         sortedDescription = globalFilteredData[i].description;
//         sortedDepartment = dept_filter;
//         sortedFullName = globalFilteredData[i].fullName;
//         console.log('filtered')
//
//
//       }
//
//     }
//
//     resolve('Worked');
//     reject('Didnt Worked');
// });
// }
