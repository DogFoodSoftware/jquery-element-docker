 /* <div id="Overview" class="blurbSummary grid_12">
 *  <div class="blurbTitle">Overview</div>
 *  <div class="p">
 *   A plugin to easily pin and fade elements so they are always available and unabtrusive. 
 *   For instance, allowing the site menue to scroll from the bottom of the header and catch at the top, with optional opacity effects.
 *    <span data-todo="linked demo">(TODO) As demonstrated here:</span>
 *  </div>
 * </div> <!-- #Overview.blurbSummary -->
 * 
 * <div id="Details" class="blurbSummary grid_12">
 *  <div class="blurbTitle">Details</div>
 *  <div class="p">
 *   -how is works
 *    $("#header").scroll_control();
 *    The scroll_controlled will scroll normally at which time they will be absolutely positioned, 
 *    with the inverse treatment of scrolling the other way. Once the scroll positioned is reached, a fade of optional opacity can be applied.
 *    <span data-todo="check sticky logic">(TODO) Check on the Sticky page documentation to see what the plugin does to the DOM.</span>
 *  </div>
 *  <div class="subHeader"><span>Options</span></div>
 *  <div class="p">
 *   <ul> 
 *    <li> pin_target: (bind scroll event to the pin target, but the defaut is the window) select the containing element to pin the scroll_controlled element to. Default value: body</li>
 *    <li> piadding_top: Accepts any CSS length value to indiciate padding from the top of the containing element. Default value: 0px </li>
 *    <li> fade_min: Minimum fade opacity as an decimal value between zero and one. Default value: 0.35 </li>
 *    <li> fade_travel: Fade rate is controlled by specifying the travel of element faded in pixels. Default value: 250</li>
 *    <li> menu_pop: Functionality to pop the menu out on mouseover. Default value: true </li>
 *   </ul>
 *  </div>
 * </div> <!-- #Details.blurbSummary -->
 *
 * <div id="Future-Options" class="blurbSummary grid_12">
 *  <div class="blurbTitle">Future Options</div>
 *    <div class="p">    
 *    Future Options 
 *    Fade_easing: Adjust opacity animation for fade height and speed. 
 *  </div>
 * </div> <!-- #Future-Options.blurbSummary -->
 * <div id="Implementation" class="blurbSummary grid_12">
 * <div class="blurbTitle">Implementation</div>
 */
 (function($) {
  var instances = new Array();
  var count = 0;
  /**
   * The <a href="/documentation/kibbles/ref/Widget_Reference#canvas-container">
   * canvas container</a> and primary template. Brief description.
   */
   ich.addTemplate('scroll_control', '<div class="scroll-control"></div>');

   var methods = {
    init : function(options) {
      return this.each(function() {
        var $this = $(this);
        instances.push($this);

    $(window).bind('scroll', function($this){
      return function() {
        var fadeStart = (! options || ! options.fadeStart ? 0 : options.fadeStart);
        var fadeUntil = (! options || ! options.fadeUntil ? 250 : options.fadeUntil);
        var offset = $(this).scrollTop();
        var opacity = (! options || ! options.opacity ? 0: options.opacity);
        var pop_opacity = (! options || ! options.pop_opacity ? 1 : options.pop_opacity);
        var min_opacity = (! options || ! options.min_opacity ? 0.35 : options.min_opacity);
        var topSpacing = (! options || ! options.topSpacing ? 0 : options.topSpacing);
        var bottomSpacing = (! options || ! options.bottomSpacing ? 0 : options.bottomSpacing); 

        if( offset<=fadeStart ){
          opacity=1;
          } 
        else if ( offset<=fadeUntil ){
          opacity= 1-offset/fadeUntil;
          } 
        else if ( offset === fadeUntil ){
          opacity= 1 - (offset/fadeUntil) * (1 - min_opacity);
          } 
        else {
          opacity= min_opacity;
          }

        $this.css('opacity',opacity);
       };
    }($this));

   $this.bind('mouseenter', function(){
      var opacity=1;
      count = count +1;
      //since there are possibly multiple elements on the page having scroll_control applied, 
      //we want to fade as a group.
      if (count == 1){
        for (var i = 0; i < instances.length; i += 1)
        instances[i].css("opacity", opacity);
      }
    });

   $this.bind('mouseleave', function(){
        var opacity = function(){
       if (fadeStart == 0){
          return 1;
        } 
       else if (fadeStart >= 1){
         return 0.35;
       }
      };
      count = count -1;
      //see mouseenter comment above. 
      if (count == 0){
        for (var i = 0; i < instances.length; i += 1)
        //instances[i].css("opacity", opacity());
        instances[i].css("opacity", opacity());
      }
  });

    $this.sticky(options);

        var index_highest = 0;   
        $("*").each(function() {
              // always use a radix when using parseInt
              var index_current = parseInt($(this).css("zIndex"), 10);
              if(index_current > index_highest) {
                index_highest = index_current;
              }
            });  
          $this.css("z-index", index_highest +1);
      });
    },

    destroy : function() {
      return this.each(function() {
        // clean up data as necessary
        // clean up event bindings as necessary
      });
    }//,
    // other widget specific functions as necessary; specifically, any
    // asynchronous communication necessary to perfect the data should be
    // handled through plugin methods, allowing a user to manually load data
    // themselves using the same infrastructure
  };
  // load the plugin into jQuery
  $.fn.scroll_control = function(method) {
    if (methods[method])
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    else if ( typeof method === 'object' || ! method )
      return methods.init.apply( this, arguments );
    else $.error( 'Method ' +  method + ' does not exist on jquery.scroll_control');
  };

  // as Kibbles widgets, we will generally want to set up default bindings
  // here 

  // $this.sticky();

})(jQuery);

/**
* </div> <!-- #Implementation.blurbSummary -->
*/
