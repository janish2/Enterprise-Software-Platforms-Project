var mysql = require('./mysql');
var nodemailer = require('nodemailer');
var process_id;
/*
 * GET users listing.
 */
//var uname;
//LOGOUT FUNCTION
exports.logoutsession = function(req, res) {
	console.log("checking logout");
	req.session.destroy();
	res.send({
		"status" : 200
	});
};

var process_status = 'pending';

//MAINTAINING SESSION LOGIN
exports.checklogin = function(req, res) {
	console.log("checking session");
	console.log(req.session.uname);
	if (req.session.uname) {
		console.log("session is" + req.session.uname);
		res.send({
			"status" : 200
		});
	} else {
		res.send({
			"status" : 300
		});
	}
};

//LOGIN PAGE
exports.signin = function(req, res) {

	console.log(req.param("name", "password"));
	var name = req.param("name");
	var password = req.param("password");

	var myquery = "Select * from authenticate where username = '"+name+"'and passwordd='"+password+"' ";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				req.session.uname = results[0].username;
				console.log("success");
				res.render('home');
			} else {
				console.log("Invalid User Name & Password");
				res.send({
					"status" : 100
				});
			}

		}

	}, myquery);
};


//FETCH USERLOGIN NAME ON HOME PAGE
//FECTH SUPPLIER DETAILS ON SEARCH SUPPLIER PAGE

/*exports.homeusername = function(req, res){
			var getUser="select * from authenticate";
		
			console.log("Query is:"+getUser);	
			mysql.fetchData(function(err,results){
							if(!err){
								console.log(results);
								var jsonstr=JSON.stringify(results);
							console.log("Successfully Fetched");
							 res.send({"result":JSON.stringify(results)});
							        }
							        else {
							            console.log(err);
							        }  
						}
				,getUser);
		};
	
		   */
		   exports.homeusername = function(req, res){
			   console.log(req.session.uname);
			   var myquery = "select * from suppliersignup where username = '"+req.session.uname+"'";
			   mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var jsonstr=JSON.stringify(results);
						console.log(jsonstr);
						console.log("Entry successfully fethced and displayed on GUI");
						//res.send(JSON.stringify(results));
							res.send({"result":jsonstr});
					}
				}, myquery);

			};

exports.homeusername1 = function(req, res){
	console.log(req.session.uname);
	var myquery = "select * from addsupplierpage where addsupplierpage_id = "+process_id;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log(results);
			var jsonstr=JSON.stringify(results);
			console.log(jsonstr);
			console.log("Entry successfully fethced and displayed on GUI");
			//res.send(JSON.stringify(results));
			res.send({"result":jsonstr});
		}
	}, myquery);
};
/// manager login home page name displya
exports.homeusernamef = function(req, res){
			   console.log(req.session.uname);
			   var myquery = "select * from managerauthenticate where username = '"+req.session.uname+"'";
			   mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
					} else {
						console.log(results);
						var jsonstr=JSON.stringify(results);
						console.log(jsonstr);
						console.log("Entry successfully fethced and displayed on GUI");
						//res.send(JSON.stringify(results));
							res.send({"result":jsonstr});
					}
				}, myquery);

			};



//SUPPLIER SIGNUP PAGE
exports.signup = function(req, res) {
	console.log(req.param("fname", "lname", "email", "name", "password",
			"cpassword", "company", "supplier"));
	var fname = req.param("fname");
	var lname = req.param("lname");
	var email = req.param("email");
	var name = req.param("name");
	var password = req.param("password");
	var cpassword = req.param("cpassword");
	var company = req.param("company");
	var supplier = req.param("supplier");

	var myquery = "insert into suppliersignup (firstname,lastname,email,username,passwordd,cpasswordd,company,supplier) values ('" + fname + "','" + lname + "','" + email + "','" + name + "','" + password + "','" + cpassword + "','" + company + "','" + supplier + "')";
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} else {

							var myquery1 = "insert into authenticate (username,passwordd)values ('" + name + "', '" + password + "')";

							mysql
									.fetchData(
											function(err, results1) {
												if (err) {
													throw err;
												} else {
													console
															.log("Entry successfully made in authenticate table");
													res.render('login');
												}
											}, myquery1);

							console
									.log("Entry successfully made in suppliersignup table");
						}
					}, myquery);

};






//

exports.viewdashboard = function(req, res) {
	res.render('viewdashboard');
};


//CONTACT US PAGE
exports.contactus = function(req, res) {
	res.render('contactus');
};
//about US PAGE
exports.aboutus = function(req, res) {
	res.render('aboutus');
};
//terms PAGE
exports.terms = function(req, res) {
	res.render('terms');
};

//SIGNUP PAGE
exports.register = function(req, res) {
	res.render('signup');
};

exports.login = function(req, res) {
	res.render('login');
};

// MANAGER LOGIN PAGE
exports.managerhome1 = function(req, res) {
	res.render('managerhome1');
};

exports.loginmanager = function(req, res) {
	res.render('loginmanager');

};
//MANAGER HOME PAGE
//SIGNUP PAGE
exports.managerhome = function(req, res) {
	res.render('managerhome');
};
//MANAGER SIGN IN VERIFICATION

exports.signinmanager = function(req, res) {

	console.log(req.param("name", "password"));
	var name = req.param("name");
	var password = req.param("password");

	var myquery = "Select * from managerauthenticate where username = '" + name+ "'and passwordd='" + password + "'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				req.session.uname = results[0].username;
                var manager_role= results[0].role;
				console.log("manager_role", manager_role);
				//res.render('managerhome');
                if(manager_role == 'fmanager')
                {
                    res.send({
					"status" : 500
                        });
                }
                else if(manager_role == 'pmanager')
                {
                    res.send({
					"status" : 600
                        });
                }
			} else {
				console.log("Invalid User Name & Password");
				res.send({
					"status" : 100
				});
			}

		}

	}, myquery);
};
//ADD SUPPLIER PAGE
exports.addsupplier = function(req, res) {
	res.render('addsupplier');
};

//EDIT SUPPLIER PAGE
exports.editsupplier = function(req, res) {
	res.render('editsupplier');
};

//UPDATE SUPPLIER PAGE
exports.updatesupplier = function(req, res) {
	res.render('updatesupplier');
};

//SEARCH SUPPLIER PAGE
exports.searchsupplier = function(req, res) {
	res.render('searchsupplier');
};

//PROCESS SUPPLIER PAGE
exports.processsupplier = function(req, res) {
	res.render('processsupplier');
};

//PROCESS view PAGE
exports.processview = function(req, res) {
	res.render('processview');
};
exports.processview2 = function(req, res) {
	res.render('processview2');
};

//statistical pmanager PAGE
exports.statistics1 = function(req, res) {
	res.render('statistics1');
};

//statistical fmanager page
exports.statistics = function(req, res) {
	res.render('statistics');
};



//Process supplier page for finance manager

//PROCESS SUPPLIER PAGE
exports.processsupplier_pmanager = function(req, res) {
	res.render('processsupplier_pmanager');
};
//PROCESS SUPPLIER PAGE
exports.processsupplier_fmanager = function(req, res) {
	res.render('processsupplier_fmanager');
};


//HOME SUPPLIER PAGE
exports.home = function(req, res) {
	res.render('home');
};
//ADDIGN SUPPLIER DETAILS IN DETAILED PAGE
//TESTER SIGNUP PAGE
exports.addsupplierdetails = function(req, res) {
	console.log(req.param("suppliername", "supplieremail", "legal",
			"commodity", "website", "glocation", "addressline1",
			"addressline2", "city", "postcode", "country", "state",
			"sfirstname", "slastname", "phone", "email", "fax", "pemail"));
	var suppliername = req.param("suppliername");
	var supplieremail = req.param("supplieremail");
	var legal = req.param("legal");
	var commodity = req.param("commodity");
	var website = req.param("website");
	var glocation = req.param("glocation");
	var addressline1 = req.param("addressline1");
	var addressline2 = req.param("addressline2");
	var city = req.param("city");
	var postcode = req.param("postcode");
	var country = req.param("country");
	var state = req.param("state");
	var sfirstname = req.param("sfirstname");
	var slastname = req.param("slastname");
	var phone = req.param("phone");
	var email = req.param("email");
	var fax = req.param("fax");
	var pemail = req.param("pemail");

	var myquery = "insert into addsupplierpage(suppliername,emailaddress,legalstructure,commodity,website,location,addressline1,addressline2,city,postcode,country,state,supplierfirstname,supplierlastname,phone,fax,primaryemail) values ('" + suppliername + "','" + supplieremail + "','" + legal + "','" + commodity + "','" + website + "','" + glocation + "','" + addressline1 + "','" + addressline2 + "','" + city + "','" + postcode + "','" + country + "','" + state + "','" + sfirstname + "','" + slastname + "','" + email + "','" + fax + "','" + pemail + "')";	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							throw err;
						} else {

							var id = "select addsupplierpage_id from addsupplierpage where suppliername= '"+ suppliername + "' ";
							var myquery1 = "insert into process(process_id,suppliername,process_type,process_status,username) values (("	+ id+ "), '"+ suppliername+ "','add','"+ process_status + "','"+req.session.uname+"')";
							mysql
									.fetchData(
											function(err, results) {
												if (err) {
													throw err;
												} else {
													console
															.log("Entry successfully made in authenticate table");
												}
											}, myquery1);

							console
									.log("Entry successfully made in authenticate table");
							res.render('home');
						}
					}, myquery);
};



//FECTH SUPPLIER DETAILS ON SEARCH SUPPLIER PAGE
 exports.searchsupplierdetails = function(req, res){
				var getUser="select * from addsupplierpage where approval is null";
			
				console.log("Query is:"+getUser);	
				mysql.fetchData(function(err,results){
								if(!err){
									console.log(results);
									var jsonstr=JSON.stringify(results);
								console.log("Successfully Fetched");
								 res.send({"result":JSON.stringify(results)});
								        }
								        else {
								            console.log(err);
								        }  
							}
					,getUser);
			};
exports.approvedsupplier = function(req, res){
	console.log("Test:" + req.param("approval"));
	var result =req.param("approval");
	var myquery= "update process set status_pmanager='"+result+"' where process_id="+process_id+"";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}
		else {

res.render('processsupplier_pmanager');
			console.log("Entry successfully updated in addsuppplierpage table");

		}
	}, myquery);
};

exports.approvedsupplier1 = function(req, res){
	console.log("Test:" + req.param("approval"));
	var result =req.param("approval");
	var myquery= "update addsupplierpage set approval='"+result+"' where addsupplierpage_id="+process_id+"";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}
		else {
			var myquery1="update process set process_status = '"+result+"' where process_id="+process_id+"";
			mysql.fetchData(function(err, results) {
				if (err) {
					throw err;
				}
				else {

					console.log("Entry successfully updated in process table");
					res.render('processsupplier')
				}
			}, myquery1);

			console.log("Entry successfully updated in addsuppplierpage table");

		}
	}, myquery);
};
 
 //sandeep code
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* exports.searchsupplierdetails = function(req, res) {
	var getUser = "select * from addsupplierpage";

	console.log("Query is:" + getUser);
	mysql.fetchData(function(err, results) {
		if (!err) {
			//console.log(results);
			var myjsondata = [];

			for (var i = 0; i < results.length; i++) {
				var item = results[i];
				// Each column of the database can be accessed through its name:
				//console.log(">------------------------name = " + item.suppliername);
				//console.log(">------------------------email-address = " + item.emailaddress);
				myjsondata.push({
					"label" : item.suppliername,
					"value" : item.addsupplierpage_id.toString()
				});
			}
			var jsonstr = JSON.stringify(myjsondata);
			console.log("Successfully jsondd - ", jsonstr);
			res.send({
				"result" : jsonstr
			});
		} else {
			console.log(err);
		}
	}, getUser);
};

*/
//////////////////////////////////////////////////sandeep code





//FETCH PROCESS DETAILS ON PROCESS PAGE	 

exports.processsupplierdetails = function(req, res) {
	var getUser = "select * from process where username ='"+req.session.uname+"'";

	console.log("Query is:" + getUser);
	mysql.fetchData(function(err, results) {
		if (!err) {
			console.log(results);
			var jsonstr = JSON.stringify(results);
			console.log("Successfully Fetched");
			res.send({
				"result" : JSON.stringify(results)
			});
		} else {
			console.log(err);
		}
	}, getUser);
};




// F MANGER PROCESS PAGE
exports.processsupplierdetails_fmanager = function(req, res) {
	var getUser = "select * from process where status_pmanager='approved'";

	console.log("Query is:" + getUser);
	mysql.fetchData(function(err, results) {
		if (!err) {
			console.log(results);
			var jsonstr = JSON.stringify(results);
			console.log("Successfully Fetched");
			res.send({
				"result" : JSON.stringify(results)
			});
		} else {
			console.log(err);
		}
	}, getUser);
};



//P MANAGER PROCESS PAGE
exports.processsupplierdetails_pmanager = function(req, res) {
	var getUser = "select * from process";

	console.log("Query is:" + getUser);
	mysql.fetchData(function(err, results) {
		if (!err) {
			console.log(results);
			var jsonstr = JSON.stringify(results);
			console.log("Successfully Fetched");
			res.send({
				"result" : JSON.stringify(results)
			});
		} else {
			console.log(err);
		}
	}, getUser);
};
// processfetch
exports.processfetch = function(req, res){
	console.log(req.param("processid"));
	process_id=req.param("processid");
	//console.log("testing process id: " +process_id);
	res.render('processview');

};



/*
//practice post			

exports.addcontact = function(req, res) {
	console.log(req.param("fname", "lname", "email"));
	var fname = req.param("fname");
	var lname = req.param("lname");
	var email = req.param("email");
	var myquery = "insert into contactlist(firstname,lastname,email) values ('" + fname + "','" + lname + "','" + email + "')";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		}
		else {
			console.log("Entry successfully made in contactlist table");
			res.render('addentry');
		}
	}, myquery);
};
//practice get 

exports.contactlist = function(req, res){
	var getUser="select * from contactlist";

	console.log("Query is:"+getUser);	
	mysql.fetchData(function(err,results){
					if(!err){
						console.log(results);
						var jsonstr=JSON.stringify(results);
					console.log("Successfully Fetched");
					 res.send({"result":JSON.stringify(results)});
					        }
					        else {
					            console.log(err);
					        }  
				}
		,getUser);
};
	   	
 */




//supplier count
exports.countsupplier = function(req, res){
							var count1="SELECT COUNT(DISTINCT addsupplierpage_id) AS addsupplierpage_id FROM addsupplierpage";
						
							console.log("Query is:"+count1);	
							mysql.fetchData(function(err,results){
											if(!err){
												console.log(results);
												var jsonstr=JSON.stringify(results);
											console.log("Successfully Fetched count of developers");
											 res.send({"result":JSON.stringify(results)});
											        }
											        else {
											            console.log(err);
											        }  
										}
								,count1);
						};

//process count
exports.countprocess = function(req, res){
							var count1="SELECT COUNT(DISTINCT process_auto_id) AS process_auto_id FROM process";
						
							console.log("Query is:"+count1);	
							mysql.fetchData(function(err,results){
											if(!err){
												console.log(results);
												var jsonstr=JSON.stringify(results);
											console.log("Successfully Fetched count of developers");
											 res.send({"result":JSON.stringify(results)});
											        }
											        else {
											            console.log(err);
											        }  
										}
								,count1);
						};



								
//emailllll///////////////

exports.email = function(req, res) {
	console.log("In user JS Email");

	var transporter = nodemailer.createTransport({
		service: 'yahoo',
		auth: {
			user: 'mtaascrowdsourcing@yahoo.com',
			pass: 'password2015'
		}
	});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
	var mailOptions = {
		from: 'mtaascrowdsourcing@yahoo.com', // sender address
		to: 'siroyajanish@gmail.com', // list of receivers
		subject: 'SIM Process Generated', // Subject line
		text: 'Hi Tester, ', // plaintext body
		html: '<h4>Hello Tester, <br></br><br></br>Weclome to the world of MTaaS Crowdsourcing. You have been selected to the project uploaded on MTaaS Crowdsourcing. Looking to see you forward. <br></br><br></br> In case of any issues please feel free to contact us on mtaascrowdsourcing@yahoo.com<br></br><br></br>Have a Great Day. <br></br><br></br>Thanks,<br></br>MTaaS Crowdsourcing</h4>' // html body
	}
};
