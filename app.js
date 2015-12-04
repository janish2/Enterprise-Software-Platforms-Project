
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
app.use(express.cookieParser());
app.use(express.session({secret:'Mtaas',duration:30*60*1000}));

// all environments
app.set('port', process.env.PORT || 3031);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development'  === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/addsupplierdetails',user.addsupplierdetails);
app.post('/signin',user.signin);
app.get('/login', user.login);
app.post('/signup', user.signup);
app.get('/home', user.home);
app.get('/logoutsession', user.logoutsession);
app.get('/register', user.register);
app.get('/checklogin', user.checklogin);
app.get('/addsupplier', user.addsupplier);
app.get('/editsupplier', user.editsupplier);
app.get('/processsupplier', user.processsupplier);
app.get('/processsupplier_fmanager', user.processsupplier_fmanager);
app.get('/processsupplier_pmanager', user.processsupplier_pmanager);
app.get('/searchsupplier', user.searchsupplier);
app.get('/searchsupplierdetails', user.searchsupplierdetails);
app.get('/processsupplierdetails', user.processsupplierdetails);
app.get('/processsupplierdetails_pmanager', user.processsupplierdetails_pmanager);
app.get('/processsupplierdetails_fmanager', user.processsupplierdetails_fmanager);
app.get('/email', user.email);
app.get('/loginmanager', user.loginmanager);
app.post('/signinmanager', user.signinmanager);
app.get('/contactus', user.contactus);
app.get('/aboutus', user.aboutus);
app.get('/terms', user.terms);
app.get('/viewdashboard', user.viewdashboard);
app.get('/countsupplier', user.countsupplier);
app.get('/countprocess', user.countprocess);
app.post('/processfetch',user.processfetch);
app.get('/processview',user.processview);
app.get('/processview2',user.processview2);
app.post('/approvedsupplier',user.approvedsupplier);
app.post('/approvedsupplier1',user.approvedsupplier1);
app.get('/homeusernamef',user.homeusernamef);
app.get('/statistics', user.statistics);
app.get('/statistics1', user.statistics1);


app.get('/homeusername', user.homeusername);
app.get('/homeusername1', user.homeusername1);

app.get('/managerhome',user.managerhome);
app.get('/managerhome1',user.managerhome1);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
