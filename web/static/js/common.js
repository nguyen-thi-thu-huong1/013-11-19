//导航下拉
$("._nav-bar__nav_ul__2w1iF li").hover(function(){
  $(this).find(".navStyles__navbox__2Mgk6").css("height","");
},function(){
  $(this).find(".navStyles__navbox__2Mgk6").css("height","0");
});

//底部logo鼠标经过效果
$(".style__logbox__1U__O img").hover(function(){
  var src=$(this).attr("src");
  src=src.substring(0,src.lastIndexOf("."));
  $(this).attr("src",src+"-hover.png");
},function(){
  var src=$(this).attr("src");
  src=src.substring(0,src.lastIndexOf("-hover.png"));
  $(this).attr("src",src+".png");
});