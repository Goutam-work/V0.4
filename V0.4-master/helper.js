const path = require('path');


//const onRegisteringPartials =  () => {
      var hbs = {
            defaultLayout: 'layout',
            extname: '.hbs',
            partialsDir: path.join(__dirname, 'views/partials'),
            layoutsDir: path.join(__dirname, 'views/layouts'),

            // Specify helpers which are only registered on this instance.rs
            helpers: {
                equal: function (lvalue,rvalue,options) {
                  if(lvalue == rvalue){
                            return options.fn(this)
                  } else {
                        return options.inverse(this)
                  }
                },
                greater: function (lvalue,rvalue,options) {
                  if(lvalue > rvalue){
                            return options.fn(this)
                  } else {
                        return options.inverse(this)
                  }
                }
            }
        };
      module.exports = hbs;
//}

//expressHbs.registerPartials(__dirname + 'views/partials',onRegisteringPartials);


