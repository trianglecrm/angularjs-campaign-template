
The purpose of this SDK is to allow our customers who have servers running PHP to use an already tested angular.js front-end implementation

##Getting started

- In case that you want to use Gulp and separated JS files(recommended):
   - Install Node.js on your computer.
   - Install Gulp using *npm install gulp -g*.
   - Check and install any missing dependencies.
   - Run *Gulp* while you are located on the application folder.
- In case you don't want to use gulp, just edit any code you want in the *app.js* file

##Config explain

The config.ini file is located under TriangleCRM folder, and it is in charged of handle all the information related with the costumer, you should updated this file with all your information.

Also there are sections called *billingFormRequired* and *ccFormRequired* which are in charge of tell to the SKD which fields should be shown. 


##Config example

User settings example
```
[Settings]
USERNAME = 'Triangle'
PASSWORD = '4rYY9!vf'
DOMAIN = 'Triangle'
SITE = ''
WSDL = '/api/2.0/billing_ws.asmx?wsdl'

```

Billing form required example
```
[billingFormRequired]
firstName = true
lastName = true
address = true
address2 = false
city = true
state = true
zip = true
country = false
phone = true
email = true
```

Credit Card form required example
```
[ccFormRequired]
paymentType = true
creditCard = true
cvv = true
exp = true
```

##Bootstrap explained

This SDK uses a bootstrap object coming from the server, with information like:

- planID
- trialPackageID
- paymentType
- chargeForTrial
- campaign_id
- successRedirect
- downSell
- upSell

the purpose of this implementations is to avoid JS edition, only being needed the editing of the config.ini file.

##Bootstrap example

```
[indexBootstrap]
planID = '56'
trialPackageID = '2'
paymentType = ''
chargeForTrial = true
campaign_id = '117'
successRedirect = 'order.php'
downSell = 'step3.php'
upSell = 'step2-order.php'
```

##Templates explain

Because modular is always better, we have all the html files separated into templates:

- header
- footer
- Main content
- Billing Form (Information related to the costumer: First Name, Last Name...)
- Credit Card Form (Information related to the CC: CC Number, CVV...)


