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
 *    $("#header").element_docker();
 *    The element_dockerled will scroll normally at which time they will be absolutely positioned, 
 *    with the inverse treatment of scrolling the other way. Once the scroll positioned is reached, a fade of optional opacity can be applied.
 *    <span data-todo="check sticky logic">(TODO) Check on the Sticky page documentation to see what the plugin does to the DOM.</span>
 *  </div>
 *  <div class="subHeader"><span>Options</span></div>
 *  <div class="p">
 *   <ul> 
 *    <li> pin_target: (bind scroll event to the pin target, but the defaut is the window) select the containing element to pin the element_dockerled element to. Default value: body</li>
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
   ich.addTemplate('element_docker', '<div class="element-docker"></div>');

   var methods = {
    init : function(options) {
      return this.each(function() {
        var $this = $(this);
        var settings = $.extend({
           fadeStart: 0,
           fadeUntil: 250,
           pop_opacity: 1,
           min_opacity: 0.35,
           topSpacing: 0,
           bottomSpacing: 0 
        }, options);

        //if (!$this.data('element_docker'))
          $this.data('element_docker', settings);
          // alert($this.data('element_docker') + $this.data('element_docker').fadeStart);
        instances.push($this);
        //alert("instances.length: " + instances.length);

    $(window).bind('scroll', (function($this){
      return function() {
        $this.css('opacity', determine_opacity.call($this));
       };
    })($this));

   $this.bind('mouseenter', (function($this){
      return function() {
        count = count +1;
        //since there are possibly multiple elements on the page having element_docker applied, 
        //we want to fade as a group.
        if (count == 1){
          // alert("foo; " + instances[0].data('element_docker'));
          for (var i = 0; i < instances.length; i += 1)
         instances[i].css("opacity", 1);
        }
      };
    })($this));

   $this.bind('mouseleave', (function($this){
      return function() {
        count = count -1;
        //see mouseenter comment above. 
        if (count == 0){
          for (var i = 0; i < instances.length; i += 1)
          instances[i].css("opacity", determine_opacity.call(instances[i]));
        }
    };
  })($this));

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
        var $this = $(this);
        // clean up data as necessary
        $this.removeData('element_docker');
        // clean up event bindings as necessary
      });
    }//,
    // other widget specific functions as necessary; specifically, any
    // asynchronous communication necessary to perfect the data should be
    // handled through plugin methods, allowing a user to manually load data
    // themselves using the same infrastructure
  };
  // load the plugin into jQuery
  $.fn.element_docker = function(method) {
    if (methods[method])
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    else if ( typeof method === 'object' || ! method )
      return methods.init.apply( this, arguments );
    else $.error( 'Method ' +  method + ' does not exist on jquery.element_docker');
  };

  // as Kibbles widgets, we will generally want to set up default bindings
  // here 

  // $this.sticky();

  function determine_opacity(debug) {
    var $this = this; // Method invoked with 'call($this)'
    var settings = this.data('element_docker');
    var current_offset = $(window).scrollTop();
    
    if( current_offset<= settings.fadeStart ){
      return 1;
    } 
    else if ( current_offset<= settings.fadeUntil ){
      return 1 - (current_offset/settings.fadeUntil) * (1 - settings.min_opacity);
    } 
    else {
      return settings.min_opacity;
    }
  };

})(jQuery);

/**
* </div> <!-- #Implementation.blurbSummary -->
*/
