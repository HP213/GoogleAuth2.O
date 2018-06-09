//add this file to .gitignore

module.exports = {
  google :{
    clientID : 'Add your client id Here',
    clientSecret : 'Add your clientSecret Here'
    //Both are provided by google developer console
  },
  mongodb :{
    dbURI : 'mongodb://<username>:<password>@ds14745.mlab.com:47450/hash-auth-test'
    //Provided by Mlab
  },
  session:{
    cookieKey : 'Create your own',
    //for example you can also use above one
  }

}
