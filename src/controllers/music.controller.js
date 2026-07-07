const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");

async function createMusic(req,res){


  /**
   * for below some code we use middleware which do this work because it is commom in another function so we create middleware to not repeat the code
   */
  // const token = req.cookies.token;

  // if(!token){
  //   return res.status(401).json({
  //     message:"Unauthorised"
  //   })
  // }

  // try{
  //   const decoded = jwt.verify(token,process.env.JWT_SECRET)

  //   if(decoded.role != "artist"){
  //     return res.status(403).json({
  //       message:"You don't have access to create a music"
  //     })
  //   }
      const { title } = req.body;
    const file = req.file;
    
    const result = await uploadFile(file.buffer.toString('base64'))
    
    const music = await musicModel.create({
      uri:result.url,
      title,
      artist:req.user.id,
    })
    
    res.status(201).json({
      message:"Music created successfully",
      music:{
        id:music._id,
        uri:music.uri,
        title:music.title,
        artist:music.artist,
      }
    })
//   } catch(err){

//     console.log(err);
//     return res.status(500).json({
//       message:err.message
//     })
//   }
}

async function createAlbum(req,res){
  // const token = req.cookies.token;
  // if(!token){
  //   return res.status(401).json({
  //     message:"Unauthorized"
  //   })
  // }

  // try {

  //   const decoded = jwt.verify(token,process.env.JWT_SECRET)

  //   if(decoded.role != "artist"){
  //     return res.status(403).json({
  //       message:"You don't have access to create an album"
  //     })
  //   }

    const { title , musics } = req.body;

    const album = await albumModel.create({
      title,
      artist:req.user.id,
      musics:musics,
    })

    res.status(201).json({
      message:"Album created successfully",
      album:{
        id:album.id,
        title:album.title,
        artist:album.artist,
        musics:album.musics,
      }
    })

//   } catch(err){
//     console.log(err);
//     return res.status(401).json({
//       message:"Unauthorized"
//     })
//   }
}

async function getAllMusics(req,res){

  const musics = await musicModel.find().limit(2).populate("artist")
  // if we only use find so only get what we like artist id but if we use populate so we get artist details also 

  res.status(200).json({
    message:"Musics fetched successfully",
    musics:musics,
  })
}

async function getAllAlbums(req,res){
  const albums = await albumModel.find().select("title artist").populate("artist","username email")

  res.status(201).json({
    message:"Album created successfully",
    albums:albums
  })
}

async function getAllAlbumsById(req,res){
  const albumId = req.params.albumId;

  const album = await albumModel.findById(albumId).populate("artist","username email")

  return res.status(200).json({
    message:"Album created successfully",
    albums:albums,
  })
}
module.exports = { createMusic , createAlbum , getAllMusics , getAllAlbums , getAllAlbumsById}