# mySQL / php REST / AngularJs
---
[![npm version](https://badge.fury.io/js/%40angular%2Fcore.svg)](https://badge.fury.io/js/%40angular%2Fcore)

## Brief
REST server in php with mySQL database. AngularJs as a web api consumer. All on Apache web server.
Automation: npm, bower, composer, gulp
Folder structure:

`/api`: PHP Rest service, get, add or edit data through JSON format
`/app`: AngularJs frontend
`/app/core/ui-translations`: Localization strings for the UI
`/bower_component`: Bower folder
`/dist`: Destination folder for the production release of the project
`/log`: Log folder
`/node_modules`: Node package manager folder
`/public`: Folder style section
`/sql_scripts`: Sql scripts folder
`/vendor`: Composer folder

# Requirements
*[NodeJs](https://nodejs.org)* (>6.1)
*[PHP](http://windows.php.net/)* (>7.0)
*[Apache](https://www.apachelounge.com/)* (2.4)
*[mySQL](https://www.mysql.it/)*
*[Composer](https://getcomposer.org/)*

# How to start
Clone the repository:
```sh
$ git clone git@github.com:sandhaka/phpRESTStarter.git
```
Install dependencies
```sh
$ npm install & bower install & composer install
```
Create the sample Db with the following sql script (sql_scripts/db_init.sql)
```sql
CREATE DATABASE IF NOT EXISTS myDb;
 
USE myDb;

--
-- Table structure for table `samples`
--

CREATE TABLE IF NOT EXISTS `demo_samples` (
  `customerNumber` int(11) NOT NULL AUTO_INCREMENT,
  `customerName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  PRIMARY KEY (`customerNumber`)
);

--
-- Dumping data for table `demo_samples`
--
INSERT INTO `demo_samples` (`customerNumber`, `customerName`, `email`, `address`, `city`, `state`, `postalCode`, `country`) VALUES
(103, 'Atelier graphique', 'Nantes@gmail.com', '54, rue Royale', 'Nantes', NULL, '44000', 'France'),
(112, 'Signal Gift Stores', 'LasVegas@gmail.com', '8489 Strong St.', 'Las Vegas', 'NV', '83030', 'USA'),
(114, 'Australian Collectors, Co.', 'Melbourne@gmail.com', '636 St Kilda Road', 'Melbourne', 'Victoria', '3004', 'Australia'),
(119, 'La Rochelle Gifts', 'Nantes@gmail.com', '67, rue des Cinquante Otages', 'Nantes', NULL, '44000', 'France'),
(121, 'Baane Mini Imports', 'Stavern@gmail.com', 'Erling Skakkes gate 78', 'Stavern', NULL, '4110', 'Norway'),
(124, 'Mini Gifts Distributors Ltd.', 'SanRafael@gmail.com', '5677 Strong St.', 'San Rafael', 'CA', '97562', 'USA'),
(125, 'Havel & Zbyszek Co', 'Warszawa@gmail.com', 'ul. Filtrowa 68', 'Warszawa', NULL, '01-012', 'Poland'),
(128, 'Blauer See Auto, Co.', 'Frankfurt@gmail.com', 'Lyonerstr. 34', 'Frankfurt', NULL, '60528', 'Germany'),
(129, 'Mini Wheels Co.', 'SanFrancisco@gmail.com', '5557 North Pendale Street', 'San Francisco', 'CA', '94217', 'USA'),
(131, 'Land of Toys Inc.', 'NYC@gmail.com', '897 Long Airport Avenue', 'NYC', 'NY', '10022', 'USA'),
(141, 'Euro+ Shopping Channel', 'Madrid@gmail.com', 'C/ Moralzarzal, 86', 'Madrid', NULL, '28034', 'Spain'),
(145, 'Danish Wholesale Imports', 'Kobenhavn@gmail.com', 'Vinbltet 34', 'Kobenhavn', NULL, '1734', 'Denmark'),
(146, 'Saveley & Henriot, Co.', 'Lyon@gmail.com', '2, rue du Commerce', 'Lyon', NULL, '69004', 'France'),
(148, 'Dragon Souveniers, Ltd.', 'Singapore@gmail.com', 'Bronz Sok.', 'Singapore', NULL, '079903', 'Singapore'),
(151, 'Muscle Machine Inc', 'NYC@gmail.com', '4092 Furth Circle', 'NYC', 'NY', '10022', 'USA'),
(157, 'Diecast Classics Inc.', 'Allentown@gmail.com', '7586 Pompton St.', 'Allentown', 'PA', '70267', 'USA'),
(161, 'Technics Stores Inc.', 'Burlingame@gmail.com', '9408 Furth Circle', 'Burlingame', 'CA', '94217', 'USA'),
(166, 'Handji Gifts& Co', 'Singapore@gmail.com', '106 Linden Road Sandown', 'Singapore', NULL, '069045', 'Singapore'),
(167, 'Herkku Gifts', 'Bergen@gmail.com', 'Brehmen St. 121', 'Bergen', NULL, 'N 5804', 'Norway  '),
(168, 'American Souvenirs Inc', 'NewHaven@gmail.com', '149 Spinnaker Dr.', 'New Haven', 'CT', '97823', 'USA');
```
Configure Apache to listen on port 86 and enable the following modules (httpd.conf):
```
    LoadModule include_module modules/mod_include.so
    LoadModule rewrite_module modules/mod_rewrite.so
```
Enable PHP by adding (httpd.conf):
```
    AddHandler application/x-httpd-php .php
    AddType application/x-httpd-php .php .html
    LoadModule php7_module "c:/php/php7apache2_4.dll"
    PHPIniDir "c:/php"
```
Create a virtual host (extra/httpd-vhosts.conf):
```
<VirtualHost *:86>
        DocumentRoot "C:/Users/<YOUR PATH>/phpRESTStarter"
        
        <Directory "C:/Users/<YOUR PATH>/phpRESTStarter">
            Options Indexes FollowSymLinks Includes
            Require all granted
            AllowOverride All
        </Directory>

        DirectoryIndex index.html
        
        AddCharset UTF-8 .html .css .js .inc
        AddOutputFilter INCLUDES .inc .html

        ErrorLog "logs/myProject-error.log"
        CustomLog "logs/myProject-access.log" common
        
    </VirtualHost>
```
Configure PHP (php.ini):
```
    extension=php_openssl.dll
    extension=php_mysqli.dll
    date.timezone = "Europe/Rome"
```
If you want use XDebug for debugging, adding also:
```
    zend_extension = C:\php\ext\php_xdebug-2.5.0-7.1-vc14-x86_64.dll
```
```
    [XDebug]
    xdebug.remote_enable=1
    xdebug.remote_autostart=1
```
(download php_xdebug-2.5.0-7.1-vc14-x86_64.dll from XDebug site and add to ext/ php folder)
### Browse to http://localhost:86

# watch
Autmatic injection of any new js files into index.html
```sh
$ gulp watch
```
# deploy 
```sh
$ gulp build
```
This will create a release into the "dist/" folder

License
----

MIT