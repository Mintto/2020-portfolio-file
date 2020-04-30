/* drop down*/
$(document).on("click",".first_semester",function () {
    $(".sub_first_semester").css({display:"block"});
    $(".sub_summer_vacation").css({display:"none"});
    $(".sub_second_semester").css({display:"none"});
    $(".sub_winter_vacation").css({display:"none"});
});
$(document).on("click",".summer_vacation",function () {
    $(".sub_summer_vacation").css({display:"block"});
    $(".sub_first_semester").css({display:"none"});
    $(".sub_second_semester").css({display:"none"});
    $(".sub_winter_vacation").css({display:"none"});
});
$(document).on("click",".second_semester",function () {
    $(".sub_second_semester").css({display:"block"});
    $(".sub_summer_vacation").css({display:"none"});
    $(".sub_first_semester").css({display:"none"});
    $(".sub_winter_vacation").css({display:"none"});
});
$(document).on("click",".winter_vacation",function () {
    $(".sub_winter_vacation").css({display:"block"});
    $(".sub_second_semester").css({display:"none"});
    $(".sub_summer_vacation").css({display:"none"});
    $(".sub_first_semester").css({display:"none"});
});
$(document).on("click",".mega_close",function () {
    $(".mega_box").slideUp(300);
});
$(document).on("mouseenter",".school",function () {
   $(".sub_school").css({display:"block"})
});
$(document).on("mouseleave",".school",function () {
   $(".sub_school").css({display:"none"})
});

$(document).on("mouseenter",".wed_design",function () {
    $(".sub_wed_design").css({display:"block"})
});
$(document).on("mouseleave",".wed_design",function () {
    $(".sub_wed_design").css({display:"none"})
});

$(document).on("mouseenter",".mod",function () {
    $(".sub_mod").css({display:"block"})
});
$(document).on("mouseleave",".mod",function () {
    $(".sub_mod").css({display:"none"})
});

