
 
jQuery(document).ready(function() {
 
var offset = 250;
 
var duration = 300;
 
jQuery(window).scroll(function() {
 
if (jQuery(this).scrollTop() > offset) {
 
jQuery('.my-float').fadeIn(duration);
 
} else {
 
jQuery('.my-float').fadeOut(duration);
 
}
 
});
 
 
 
jQuery('.my-float').click(function(event) {
 
event.preventDefault();
 
jQuery('html, body').animate({scrollTop: 0}, duration);
 
return false;
 
})
 
});
 

