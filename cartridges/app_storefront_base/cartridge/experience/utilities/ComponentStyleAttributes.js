function setComponentStyleAttributes(model, content) {

    //
    // Bootstrap style classes
    //
    model.bootstrapPadding = content.bootstrapPadding;
    model.bootstrapWidth = content.bootstrapWidth;
    model.bootstrapHeight = content.bootstrapHeight;
    model.bootstrapAlign = content.bootstrapAlign;

    model.bootstrapClasses = model.bootstrapPadding
        + ' ' + model.bootstrapWidth
        + ' ' + model.bootstrapHeight
        + ' ' + model.bootstrapAlign;
}

module.exports = setComponentStyleAttributes;
