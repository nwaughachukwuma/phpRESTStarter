mySQL / php REST / angularjs frontend with static HTML files SEO friendly

# Folders structure:
/api: PHP Rest service, get, add or edit data through JSON format
/app: AngularJs frontend MPA
    /app/core/ui-translations: Localization strings for the UI
/bower_component: Bower folder archive for dependencies
/DbChangeLog: Database version control with liquibase
/dist: Destination folder for the production release of the project
/html: Folder with html main files. For SEO
/log: Log folder
/node_modules: Node package manager folder archive for dependencies
/public: Folder style section
/sql_scripts: Sql scripts folder
/vendor: Composer folder archive for dependencies
gulpfile.js: Project automation script

# Environment configurations:

- PHP:
.Download PHP thread-safe version for APACHE
.Into C:\php edit file php.ini. This the rows to edit:
    extension=php_openssl.dll
    extension=php_mysqli.dll
    ...
    date.timezone = "Europe/Rome"
    (If you want use XDebug):
    zend_extension = C:\php\ext\php_xdebug-2.5.0-7.1-vc14-x86_64.dll
    ...
    [XDebug]
    xdebug.remote_enable=1
    xdebug.remote_autostart=1
    (download php_xdebug-2.5.0-7.1-vc14-x86_64.dll from XDebug site and add to ext php folder)

- APACHE: (2.4)
.Create a VirtualHost like the following in extra/httpd-vhosts.conf:
    '<VirtualHost *:85>
        DocumentRoot "C:/Users/shams/Documents/Customers/Zetanet/Bassoli/project"
        ServerName lo.bassoli.eu
        
        <Directory "C:/Users/shams/Documents/Customers/Zetanet/Bassoli/project>
            Options Indexes FollowSymLinks Includes
            Require all granted
            AllowOverride All
        </Directory>

        DirectoryIndex index.html
        
        AddCharset UTF-8 .html .css .js .inc
        AddOutputFilter INCLUDES .inc .html

        ErrorLog "logs/bassoli-error.log"
        CustomLog "logs/bassoli-access.log" common
        
    </VirtualHost>'

.Enable rewrite module in httpd.conf:
    LoadModule rewrite_module modules/mod_rewrite.so
.Enable include module:
    LoadModule include_module modules/mod_include.so
.Enable php, add these lines:
    'AddHandler application/x-httpd-php .php
    AddType application/x-httpd-php .php .html
    LoadModule php7_module "c:/php/php7apache2_4.dll"
    PHPIniDir "c:/php"'

- mySQL
.Create a database called 'bassolidb', using the sql script: sql_scripts/db_init.sql

- PHP DEV:
.Download and install composer (https://getcomposer.org).
.Install dependencies with composer:
    $: composer install

- JS DEV:
.Install NodeJs version > 6.x.x (https://nodejs.org/it/download/)
.Install globally via npm the needed modules: (open shell and exec the following commands)
    $: npm install -g gulp
.Enter into the project folder with a shell and type: (this command will install all the frontend dependencies)
    $: npm install
    $: bower install

--> Browse to http://localhost:85

# How to browse the API:
.You can call the WEB API via a Restlet client with: 
    GET http://localhost:85/api/<ACTION NAME>
    (You can use DHC extension for Chrome for example: https://chrome.google.com/webstore/detail/dhc-restlet-client/aejoelaoggembcahagimdiliamlcdmfm)
    API return format is JSON

# How to add a module (js script/library) to the frontend:
$: bower install <pkg name> --save (install by bower)
$: gulp inject (inject the new dependencies into html files)

# How to add a php module:
(You have to install composer for windows first)
$: composer require <pkg_name>

# Production deploy:
.Run the follow gulp command to uglify and compress js/html app and third party files for the production in the 'dist' folder.
    $: gulp build

# How to edit the database
.Add or edit a .xml file into the DbChangeLog folder, describe the changes into this file
(See liquibase documentation for the syntax)
.Enter from a shell into the project/DbChangeLog folder
.Apply the changes with the following command:
    $: update.bat (wait for a successfull message)

# How to add REST API service (See the 'samples' demo service):
.To create a new service, create a .php file (into a new folder) to extend base\BaseServiceRepository abstract class.
.Call the parent constructor:
	public function __construct() {		
		parent::__construct();		
	}	
.Create into the api.php file, a method called with the same name of the route, for example for the route: /api/customers
create a private method called customers
.This method should call your new service and return the result/perform actions.
.You should use dependency injection service to load your class into api.php (see di/config.php).

# Use gulp watch during development:
.Run gulp watch to run automatically some actions if you add/delete/edit a css/js file:
    $: gulp watch
    Actions:
     -Injection