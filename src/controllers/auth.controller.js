const userModel = require("../models/user.model");

async function registerUser(req,res){

  const { username , email , password , role ="user"} = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or:[ // or use krne se ye hoga ki dono mese koi ek condtion bhi true hogi toh true return kr dega
      {username},
      {email}
    ]
  })

  if(isUserAlreadyExist){
    return res.status(409).json({
      message:"User already exist"
    })
  }

  const user = await userModel.create({
    username,
    email,
    password,
    role
  })
}