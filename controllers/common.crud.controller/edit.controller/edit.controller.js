const BaseController = require('../base.controller');
class EditController extends BaseController {
    constructor(req, res, next) {
        super(req, res, next);
    };

    async doAction(){
      this.options.implOptions = this.options.request.body;
      this._addParamsInImplOptions();
      this._initiateAction().then((result) => {
          if(!result?.notUpdated){
              this.responseHandler.parser(this.options.response, {statusCode: 200, result: result, success: true});
          } else {
              this.responseHandler.parser(this.options.response, {statusCode: 200, message: result.message, success: false});
          }
      })
    };
}

module.exports = EditController;