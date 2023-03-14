const db = require("./db");

///import json webtoken

const jwt = require("jsonwebtoken");

const register = (pno, pswd, uname, photo) => {
  //use mongo db data.

  return db.Contact.findOne({
    photo: pno,
  }).then((result) => {
    console.log(result);
    if (result) {
      //acno already exists.

      return {
        statusCode: 403,
        message: "Account Already exists",
      };
    } else {
      //to add new user.
      const newUser = new db.Contact({
        username: uname,
        profilepic: photo,
        phone: pno,
        password: pswd,
        messages: [],
        contacts: [],
      });
      //to save new user inside Mongodb use save()

      newUser.save();
      return {
        statusCode: 200,
        message: "Regestration successful",
      };
    }
  });
};

const login = (pno, pswd) => {
  console.log("inside login");

  return db.Contact.findOne({
    phone: pno,
    password: pswd,
  }).then((result) => {
    if (result) {
      const token = jwt.sign(
        {
          phone: pno,
        },
        "nissangtr"
      );

      return {
        statusCode: 200,
        message: "login successful",
        username: result.username,
        phone:pno,
        token,
      };
    } else {
      return {
        statusCode: 403,
        message: "Invalid Phone Number/Password ",
      };
    }
  });
};



const allContacts = (id) => {
  return db.Contact.find().then((result) => {
    if (result) {
      return {
        statusCode: 200,
        Contact: result,
      };
    } else {
      return {
        statusCode: 404,
        message: "No data present",
      };
    }
  });
};


const msgUpdate=(msg,toPhn,fromph,dir)=>{
  return db.Contact.findOne({
    phone: toPhn,

}).then((result)=>{
  if(result){
    result.messages.push({
      message:msg,
      direction:dir,
      phone:fromph
    })

    result.save();
      return {
        statusCode: 200,
      };
  }
  else{
    return {
      statusCode: 403,
      message: "not processed ",
    };

  }

})
}



const getChat = (phn)=>{
  return db.Contact.findOne({
    phone:phn,
  }).then((result)=>{
    if(result){
      return{
        statusCode:200,
        message:result
      }
    }
    else{
      return {
        statusCode: 403,
        message: "not processed ",
      };

    }
  })

}

module.exports = {
  register,
  login,allContacts,msgUpdate,getChat
};
