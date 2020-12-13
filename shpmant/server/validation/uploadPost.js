const Validator = require('validator');
const isEmpty = require('./isEmpty');


const validateUploadPost = (data) => {
    let errors = {}
    data.imgUrl = !isEmpty(data.imgUrl) ? data.imgUrl : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if (Validator.isEmpty(data.imgUrl)) {
        errors.imgUrl = 'Image field is required';
    }

    if (!Validator.isLength(data.title, { min: 3, max: 3 })) {
        errors.title = 'Title must contain atleast 3 character';
    }

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if (!Validator.isLength(data.decription, { min: 6, max: 6 })) {
        errors.description = 'Description must contain atleast 6 character';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateUploadPost