const Config = require("../../models/Config.js");
const Lodge = require('../../models/Lodges.js');
var data = ['Dish', 'Transport', 'PreBook'];

const checkConfig = async (req,res,next) => {
  
  Config.find({lodge : req.params.id})
    .then(data => {
      res.status(200).json({
        success : true,
        message : data,
      })
    })
    .catch(err => {
      res.status(200).json({
        success : false,
        message : err
      })
    })
}

const checkMatrix = async (req, res, next) => {
  try {
    // Fetching config
    const config = await Lodge.findById(req.params.id),
          actionItems = await Config.find({lodge: req.params.id});
    res.status(200).json({
      success: true,
      object: config,
      actionItems: actionItems
    });
  } catch (err) {
    // If an error occurs, send an error response
    res.status(500).json({
      success: false,
      message: "Internal server error occurred!"
    });
  }
};

const showConfig = (req,res,next) => {
  res.status(200).json({
    success : true,
    message : data
  })
}

const create_config = async (req,res,next) => {
  if(req.body.config === "Choose..."){
    res.status(200).json({
      success: false,
      message : "Please choose the valid config!"
    })
  } else if(req.body.config == undefined) {
    res.status(200).json({
      success : false,
      message : "Please choose the valid config!"
    })
  } else {
    if(await checkDuplicate(req.params.id, req.body.config) === 0){
      try{
        const config = new Config({
          config : req.body.config,
          lodge : req.params.id
        })
        if(config){
          await Lodge.findByIdAndUpdate({_id : config.lodge}, {$push : {config : config._id}})
        }
        await config.save();
        res.status(200).json({
          success : true,
          message : "Config created."
        })
      } catch(err){
        res.status(200).json({
          success: false, 
          message : err
        })
      }
    } else {
      res.status(200).json({
        success :  false,
        message : "Config already exists!"
      })
    }
  }
}

const checkDuplicate = async (lodgeId, config) => {
  const value = await Config.find({lodge: lodgeId, config: config});
  return value.length;
}

// GST enable/ disable controller!
const updateMatrix = (req,res,next) => {
  Lodge.findByIdAndUpdate(req.params.id, {
    isGst: req.body.isGst,
    isHourly: req.body.isHourly,
    isChannel: req.body.isChannel,
    updatePrice: req.body.updatePrice,
    isExtra: req.body.isExtra,
    isExclusive: req.body.isExclusive,
    isInsights: req.body.isInsights,
    isSpecific: req.body.isSpecific,
    canDelete: req.body.canDeleteRooms,
    extraCalc: req.body.extraCalc,
    grcPreview: req.body.grcPreview,
    redirectTo: req.body.redirectTo,
    multipleLogins: req.body.multipleLogin,
    validateInvoiceDetails: req.body.validateInvoiceDetails,
    printManager: req.body.printManager,
    removePan: req.body.removePan,
    universalMessage: req.body.universalMessage,
    isRefundTrackerEnabled: req.body.refundTracker,
    afterCheckedout: req.body.afterCheckedout,
    inCleaning: req.body.inCleaning,
    afterCheckin: req.body.afterCheckin,
    afterCleaned: req.body.afterCleaning,
    linkVouchersWithLivixius: req.body.linkVouchersWithLivixius,
    restrictAdvance: req.body.restrictAdvance,
    checkinDateEditable: req.body.checkinDateEditable,
    showFullDetails: req.body.showFullDetails,
    customHtmlContent: req.body.customHtmlContent,
    customAdminConfig: req.body.customAdminConfig
  })
  .then(data => {
    res.status(200).json({
      success: true,
      message: "Matrix has been updated!"
    })
  })
  .catch(err => {
    res.status(200).json({
      success: false,
      message: "Some internal  error occured!", err
    })
  })
}

const deleteConfig = (req,res,next) => {
  Config.findByIdAndDelete({_id : req.body.id})
    .then(data => {
      res.status(200).json({
        success : true,
        message : "Config removed."
      })
    })
    .catch(err => {
      res.status(200).json({
        success : false,
        message : "Some internal error occured!"
      })
    })
}

module.exports = {
  checkConfig, create_config, deleteConfig, showConfig, checkMatrix, updateMatrix
}