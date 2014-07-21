booty-datepicker
================

[![Build Status](https://travis-ci.org/skinnybrit51/booty-datepicker.svg?branch=master)](https://travis-ci.org/skinnybrit51/booty-datepicker)
[![NPM version](https://badge.fury.io/js/booty-datepicker.svg)](http://badge.fury.io/js/booty-datepicker)


#### Description

##### [View Demo with Implementation Code](http://skinnybrit51.com/booty-datepicker "Demo")

Date picker based off bootstrap styles.

![](http://skinnybrit51.com/images/booty-datepicker.png)

#### Functionality
* Selects the current month if no input date value is present.
* The current day is highlighted by a gray background.
* Selects the input date value and displays the selected day with a yellowish background.
* Ability to scroll through months and years.

#### Installation
* <code>npm install booty-datepicker --save</code>
* Make sure you load bootstraps css and font files before referencing datepicker less file. 
* Reference datepicker.less file in your own less file.

Example page.less
````
@import '../node_modules/booty-datepicker/less/datepicker';
````

#### Markup
````
<div class="input-group">
    <input type="text" class="form-control" placeholder="yyyy-mm-dd">
    <span class="input-group-addon" data-toggle="booty-datepicker">     
        <span class="glyphicon glyphicon-calendar"></span>
    </span>
</div>
````

#### JavaScript
````
var $ = require('jquery'),
    moment = require('moment'),
    datepicker = require('booty-datepicker');

$(function() {
    // datepicker requires the document to be loaded
       
    // default options already internally set
    var defaultOptions = {
        RAW_FORMAT: 'YYYY-MM-DD',
        INPUT_FORMATS: ['MM/DD/YYYY'],
        DISPLAY_FORMAT: 'MM/DD/YYYY',
        formatter: function (value) {
            return moment(value, this.RAW_FORMAT, true).format(this.DISPLAY_FORMAT);
        },
        validate: function (value) {
            return moment(value, this.INPUT_FORMATS, true).isValid();
        },
        parser: function (value) {
            return moment(value, this.INPUT_FORMATS, true).format(this.RAW_FORMAT);
        }
    };
    datepicker(defaultOptions);
});
````

#### How it works
* The datepicker listens for click events off the <code>data-toggle</code> attribute.
* If the none of the <code>INPUT_FORMATS</code> are met then when the datepicker is opened, today date is selected instead.
* For form validation separate listeners need to be used.
* To get the value, just use <code>input.val()</code>.  You will need to use your own validator and parser against this value.
