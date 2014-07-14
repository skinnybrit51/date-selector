booty-datepicker
================

[![Build Status](https://travis-ci.org/skinnybrit51/booty-datepicker.svg?branch=master)](https://travis-ci.org/skinnybrit51/booty-datepicker)
[![NPM version](https://badge.fury.io/js/booty-datepicker.svg)](http://badge.fury.io/js/booty-datepicker)


#### Description
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

#### Initializing JavaScript
````
var $ = require('jquery'),
    datepicker = require('booty-datepicker');

$(function() {
    // requires the document to be loaded
    datepicker({
        formatter: function (value /*string(YYYY-MM-DD)*/) {
            return value;
        },
        validate: function (value /*string*/) {
            return true;
        },
        parser: function (value /*string*/) {
            return value;
        }
    });
});
````

#### How it works
The datepicker listens for click events off the <code>data-toggle</code> attribute.


#### Demo
Visit http://skinnybrit51.com/booty-datepicker