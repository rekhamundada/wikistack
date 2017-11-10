var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING, allowNull: false
  },
  email: {
   type: Sequelize.STRING,
    allowNull: false,
    validate:{
      isEmail:true
    }
  }
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,allowNull: false
  },

  urlTitle: {
    type: Sequelize.STRING,allowNull: false
  },

  content: {
    type: Sequelize.TEXT,allowNull: false
  },

  status: {
    type: Sequelize.ENUM('open','closed')
   },
   date: {
     type: Sequelize.DATE,
     defaultValue:Sequelize.NOW
   }
}, {
  getterMethods:{
  route(){
    return '/wiki/' + this.urlTitle;
  }
}
})

module.exports = {
  Page: Page,
  User: User
}
