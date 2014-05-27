booty-datepicker
================

Datepicker based on Twitter Bootstrap styling.

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
require('booty-datepicker');
````

#### How it works
The datepicker listens for click events off the <code>data-toggle</code> attribute.


#### Demo
Visit http://skinnybrit51.com/booty-datepicker