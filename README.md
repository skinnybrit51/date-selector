booty-datepicker
================

Datepicker based on Twitter Bootstrap styling.

#### Dependencies
* jquery
* underscore
* moment

#### Functionality
* Selects the current month if no input date value is present.
* The current day is highlighted by a gray background.
* Selects the input date value and displays the selected day with a yellowish background.
* Ability to scroll through months and years.

#### Installation
* <code>npm install booty-datepicker --save</code>
* copy style/datepicker.less to local style directory

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