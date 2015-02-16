(function ($) {

    "use strict";

    // CLASS DEFINITION
    // ============================

    var Slidify = function (element) {
        this.$element = $(element);
        this.$count = this.$element.find("div").length;
        this.$element.children("div:not(:first)").each(function(index, elem){
            $(this).addClass("slidify-inactive");
        });
        this.SelectFirstDiv = SelectFirstDiv;
        this.$selected = this.SelectFirstDiv();
    }

    Slidify.prototype.showNext = function(){
        
        this.$selected.removeClass("slidify-active");
        var next = this.$selected.next().addClass("slidify-active");
        if (next.length == 0)
            next = this.SelectFirstDiv()
        this.$selected = next;
    }

    function SelectFirstDiv(){
        return this.$element.find("div:first").addClass("slidify-active");
    }

    // PLUGIN DEFINITION
    // =============================

    $.fn.slidify = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('expertime.slidify');
            if (!data) $this.data('expertime.slidify', (data = new Slidify(this)));
            
            var temporisation = 3000;
            if (option != undefined && option.temporisation != undefined)
                temporisation = option.temporisation * 1000;

            if ($this.data("duration") != undefined)
                temporisation =  $this.data("duration") * 1000;
            var interval = setInterval(function(){ 
                data.showNext()
            }, temporisation);

            $this.children("div").click(function(){
                data.showNext();
                clearInterval(interval);
            });
        })
    };

     // PLUGIN API
    // =============================

})(window.jQuery);