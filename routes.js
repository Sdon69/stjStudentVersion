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

'use strict';

var express = require('express');
var router = express.Router();
var models = require('./models');
var Sequelize = require('sequelize');
// var SheetsHelper = require('./sheets');
const fs = require('fs');

var json2html = require('node-json2html');
var   mode = 'eventViewer';
var cataegory1;
var cataegory2;
var enrty = 0;
var initialEnrty = true;
var tMode;
var gTitle;
var gDescription;

var gCataegories;

var gUserId;
var gFullName;
var gDateOfPublish;



var gDateOfEventString;
var gLastDateOfRegistrationString;
var gEntryFees;

var globalHtmlBody;
var notesHtmlBody;
var eventHtmlBody;
var announcementHtmlBody;


var notesCataegory1;
var notesCataegory2;


var eventCataegory1;
var eventCataegory2;

var announcementCataegory1;
var announcementCataegory2;

var initialRun = true;

var gFirstName;
var gLastName;
var gSignupUserId;
var gPassword;
var gSemester;
var gDepartment;
var gClassName;
var gSection;
var gEmailAddress;
var gPhoneNo;
var announcementRawData;
var eventRawData;
var notesRawData;
var classRawData;
var sectionRawData;
var subjectRawData;
var userRawData;
var userIdDetailedRawData;
var didSignUp;

var globalLoadedString;

var passwordFound = false;

var loadFromJson = (mode) =>
{
  var loadedString = fs.readFileSync(`${mode}.json`);
  return loadedString;
}


var globalAccessToken = 'ya29.GlxhBXcqpZB1tGkkNHwKz6gT2adRRQMdPLEz8Ud2Vr5aeVWfKqszcjLfNh3JfsXnd8LC6-5X2aP_8dkSDByJ6DJJkoM0jQ2HwtDvKksLM2NT-KzC_r4KWCUdjJL7Fg';
//
// if(initialRun)
// {
//     console.log('initialRun');
//
//     tMode = 'viewer';
//
//
//     mode = 'announcementViewer';
//
//     announcementRawData = loadFromJson(mode);
//
//    mode = 'notesViewer';
//    notesRawData = loadFromJson(mode);
//
//   mode = 'eventViewer'
//   eventRawData = loadFromJson(mode);
//
//   mode = 'sectionViewer';
//   sectionRawData = loadFromJson(mode);
//
//   mode = 'classViewer';
//   classRawData = loadFromJson(mode);
//
//   mode = 'subjectViewer';
//   subjectRawData = loadFromJson(mode);
//
//   mode = 'userIdFeed';
//   userRawData  = loadFromJson(mode);
//
//   mode = 'userIdDetailedFeed';
//   userIdDetailedRawData = loadFromJson(mode);
//
//
//   console.log(userIdDetailedRawData);
//
//
//
//
//   initialRun = false;
// }
//
//
// setInterval(function(){
//
//   console.log('Interval');
//       var helper = new SheetsHelper(globalAccessToken);
//   tMode = 'viewer';
//   mode = 'announcementViewer'
//   helper.createSpreadsheet('title',mode,'cataegory1','cataegory2',tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
//   if (err) {
//       return next(err);
//     }
//
//  });
//
//  mode = 'notesViewer';
//  helper.createSpreadsheet('title',mode,'cataegory1','cataegory2',tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
//  if (err) {
//      return next(err);
//    }
//
// });
//
// mode = 'eventViewer';
// helper.createSpreadsheet('title',mode,'cataegory1','cataegory2',tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
// if (err) {
//     return next(err);
//   }
//
// });
//
//
//   mode = 'sectionViewer';
//   helper.createSpreadsheet('title',mode,'cataegory1','cataegory2',tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
//   if (err) {
//       return next(err);
//     }
//
//   });
//
//   mode = 'classViewer';
//   helper.createSpreadsheet('title',mode,'cataegory1','cataegory2',tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
//   if (err) {
//       return next(err);
//     }
//
//   });
//
//   mode = 'subjectViewer';
//   helper.createSpreadsheet('title',mode,'cataegory1','cataegory2',tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
//   if (err) {
//       return next(err);
//     }
//
//   });
//
//   mode = 'userIdFeed';
//   helper.createSpreadsheet('title',mode,'cataegory1','cataegory2',tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
//   if (err) {
//       return next(err);
//     }
//
//   });
//
//   mode = 'userIdDetailedFeed';
//   helper.createSpreadsheet('title',mode,'cataegory1','cataegory2',tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
//   if (err) {
//       return next(err);
//     }
//     });
//
//
// }, 100000); //100 Seconds



router.get('/', function(req, res, next) {


     res.render('index');


});

router.get('/profile', function(req, res, next) {





     res.render('profile');


});



router.get('/attendance', function(req, res, next) {


     res.render('attendance');


});


router.get('/editProfile', function(req, res, next) {
    




      res.render('editProfile');


});


router.get('/signIn', function(req, res, next) {

      var userIdData =  userIdDetailedRawData;


     res.render('signIn.handlebars');


});




router.get('/annonuncementViewerPage', function(req, res, next) {


    res.render('annonuncementViewerPage');
});


router.get('/notesViewerPage', function(req, res, next) {

    res.render('notesViewerPage');
});



router.get('/eventViewerPage', function(req, res, next) {

    res.render('eventViewerPage');
});






router.get('/annonuncementWriterPage', function(req, res, next) {

    res.render('annonuncementWriterPage.handlebars');
});


router.get('/notesWriterPage', function(req, res, next) {

    res.render('notesWriterPage.handlebars');
});

router.get('/eventWriterPage', function(req, res, next) {

    res.render('eventWriterPage.handlebars');
});



router.get('/signUp', function(req, res, next) {


      res.render('signUp.handlebars');
});


















// Route for syncing spreadsheet.

module.exports = router;
