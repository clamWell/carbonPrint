$(function(){
	var ieTest = false,
		screenWidth = $(window).width(),
		screenHeight = $(window).height(),
		imgURL = "http://img.khan.co.kr/spko/storytelling/2020/2030-invest-report-2/",
		isMobile = screenWidth <= 800 && true || false,
		isNotebook = (screenWidth <= 1300 && screenHeight < 750) && true || false,
		isMobileLandscape = ( screenWidth > 400 && screenWidth <= 800 && screenHeight < 450 ) && true || false;
	window.onbeforeunload = function(){ window.scrollTo(0, 0) ;}
	var randomRange = function(n1, n2) {
		return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
	};
	$(window).resize(function() {
		screenWidth = $(window).width();
		screenHeight = $(window).height();
    });


	$(".close-ie-block").on("click", function(){
		$(".ie-block-9").hide();
	})


    var ieUnder = false;
    function checkIe(){
        var word;
        if (navigator.userAgent.indexOf("MSIE") >= 0) {
            console.log("ieUNDER 10");
            ieUnder = true;
            return true;
        }else {
            return false;
        }
    }
    checkIe();


	/*								*/
	/*------  INTRO ANIMATION	-----*/
	/*								*/


	//$(".money--4").delay(2400).animate({"opacity":1, "left":"30%"}, 1200, "easeOutElastic")

	/*								*/
	/*------  INTRO ANIMATION	-----*/
	/*								*/


	/*								*/
	/*------    QUERY CLICK     -----*/
	/*								*/

	var $el = $(".select-el-holder ul li .each-el"),
		$down = $(".countDown"),
		$up = $(".countUp");
	var itemNameArr = ["일회용컵","비닐봉지","페트병","배달용기"];
	var userSelectCountArr = [null,null,null,null];
    var userSelectValueArr = [false,false,false,false];
    var _data = [
      {
        "name": "일회용컵",
        "weight": "13.84",
        "emit": "8",
        "footprint": "8"
      },
      {
        "name": "비닐봉지",
        "weight": "20",
        "emit": "13",
        "footprint": "13"
      },
      {
        "name": "페트병",
        "weight": "14.5",
        "emit": "9",
        "footprint": "9"
      },
      {
        "name": "배달용기",
        "weight": "19.28",
        "emit": "17",
        "footprint": "17"
      }
    ];
    var koreanAvrData = [11800, 23146]; //한국인 연간 사용 무게와 탄소발자국

    var totalWeight = 0,
        totalEmit = 0,
        totalFP = 0;

	var countMax = 100;

	function printUserSelect(){
		console.log(userSelectValueArr);
		console.log(userSelectCountArr);
	};

	$el.on("click", function(e){
		var _ei = $(this).parent("li").attr("data-index");
		if($(this).hasClass("el-selected")){
			/*
			$(this).removeClass("el-selected");
			userSelectValueArr[_ei] = false;
			$(".non-alert-des").html(itemNameArr[_ei]+" 선택을 취소했습니다.");
			$(".non-alert-des").stop().animate({"opacity":"1"}, 500, function(){
				$(".non-alert-des").delay(1000).animate({"opacity":"0"},50);
			});

			var type = Number(_ei)+1;
			var itemClassStr = ".el-t"+type;
			$(itemClassStr).hide();*/

		}else{
			$(this).addClass("el-selected");
			userSelectValueArr[_ei] = true;
			if(userSelectCountArr[_ei]){
				userSelectCountArr[_ei] = userSelectCountArr[_ei];
			}else{
				userSelectCountArr[_ei] = 1;
			}
			$el.find(".count-view .count-value").html(userSelectCountArr[_ei]);
			$(".non-alert-des").html(itemNameArr[_ei]+"을(를) 선택했습니다.");
			$(".non-alert-des").stop().animate({"opacity":"1"}, 500, function(){
				$(".non-alert-des").delay(1000).animate({"opacity":"0"},50);
			});
			var type = Number(_ei)+1;
			var itemClassStr = ".el-t"+type;
			$(itemClassStr).show();

		}
		printUserSelect();
	});

	$(".cancel-btn").on("click", function(e){
		var _ei = $(this).parent("li").attr("data-index");
		$(this).siblings(".each-el").removeClass("el-selected");
		userSelectValueArr[_ei] = false;
		$(".non-alert-des").html(itemNameArr[_ei]+" 선택을 취소했습니다.");
		$(".non-alert-des").stop().animate({"opacity":"1"}, 500, function(){
			$(".non-alert-des").delay(1000).animate({"opacity":"0"},50);
		});

		var type = Number(_ei)+1;
		var itemClassStr = ".el-t"+type;
		$(itemClassStr).hide();

	});

	$down.on("click", function(e){
		var _ei = $(this).parent(".count-control").parent("li").attr("data-index");
		removeItemBasket(_ei, userSelectCountArr[_ei]);
		if( userSelectCountArr[_ei] == 1){
			//최소값은 1
		}else{
			userSelectCountArr[_ei] -= 1;
		}
		$(this).siblings(".count-view").find(".count-value").html(userSelectCountArr[_ei]);
		printUserSelect();
	});

	$up.on("click", function(e){
		var _ei = $(this).parent(".count-control").parent("li").attr("data-index");
		//console.log(_ei);
		if( userSelectCountArr[_ei] == countMax){
			window.alert("선택 최대값은 100개 입니다!")//최대값은 100
		}else{
			userSelectCountArr[_ei] += 1;
		}
		$(this).siblings(".count-view").find(".count-value").html(userSelectCountArr[_ei]);
		addItemBasket(_ei, userSelectCountArr[_ei]);
		printUserSelect();
	});

   function addItemBasket(item_type, count){
	   var $basket = $(".basket-inside");
	   var type = Number(item_type)+1;
	   var count = count;

	   var classStr = "el el-t"+type+" el-t"+type+"-"+count;
	   var $item =  $("<div />", { "class": classStr } );
	   var x = randomRange(0, $(".basket-inside").width()-20)+"px";
	  // var y = randomRange(0, 50)+"px";
	   var rotate = randomRange(-20, 20);

	   $item.css({"left": x});
	   $item.css({"bottom": "150px"});
	   $item.css({"transform": "rotate("+rotate+"deg)", "-webkit-transform": "rotate("+rotate+"deg)"});
	   $item.append("<img src='img/select-item-"+type+"-line.png' alt='사용한플라스틱'>")

	   $basket.append($item);

	   if(count<=10){
		   $item.animate({"bottom":"0px"}, 500, "easeOutBounce");
	   }else{
		   $item.animate({"bottom":"0px"}, 500, "easeOutBounce");
	   }
   }

   function removeItemBasket(item_type, count){
	   var $basket = $(".basket-inside");
	   var type = Number(item_type)+1;
	   var count = count;

	   var classStr = ".el-t"+type+"-"+count;
	   console.log(classStr);
	   $(classStr).remove();

   }


   var drawResult = function(w,e,p){
        var w = Math.round(w),
            e = Math.round(e),
            p = Math.round(p);

        $("#weightWeek").html(reviseWeight(w));
        $("#weightYear").html(reviseWeight(w*52));
        $("#printWeek").html(reviseWeight(p));
        $("#printYear").html(reviseWeight(p*52));

        if(w*52>koreanAvrData[0]){
            $("#ifWeightMore").html("많은");
        }else{
            $("#ifWeightMore").html("적은");
        }

        if(p*52>koreanAvrData[1]){
            $("#ifPrintMore").html("많은");
        }else{
             $("#ifPrintMore").html("적은");
        }

        showResult();
   }

   var showResult = function(){
	    $(".basket-fixed").hide();
        $(".sec--test").addClass("test-done");
        $(".sec--result").addClass("result-show");
        $("#TEST_AGAIN_BTN_TOP").show();
        //$(".test-toggle-area").slideUp();
        $(".test-result-body").slideDown(function(){
            var movePos = $(".test-result-wrap").offset().top;
			$("html, body").animate({scrollTop: movePos},1200, "easeOutCubic");
        });
		makePoleGraph(1);
		makePoleGraph(2);

    };

    var hideResult = function(){
        $("#TEST_AGAIN_BTN_TOP").hide();
        $(".sec--test").removeClass("test-done");
        $(".sec--result").removeClass("result-show");
        var movePos = $(".sec--test").offset().top-30;
        resetUserSelect();
        $("html, body").animate({scrollTop: movePos},1200, "easeOutCubic");
        $(".test-result-body").slideUp();
    }

    var resetUserSelect = function(){
        userSelectCountArr = [null,null,null,null],
		userSelectValueArr = [false,false,false,false];
        totalWeight = 0;
        totalEmit = 0;
        totalFP = 0;
        $el.removeClass("el-selected");
        $(".count-control .count-view .count-value").html("1");
		$(".basket-fixed").find(".basket-inside").html("");
		$(".basket-fixed").show();
		resetPoleGraph();
    }

    var countUserSelect = function(){
        for(u=0; u<userSelectValueArr.length;u++){
            if(userSelectValueArr[u] == true){
                var count = userSelectCountArr[u];
                var tempWeight, tempEmit, tempPrint;

                for(d=0;d<_data.length;d++){
                    if(_data[d].name == itemNameArr[u]){
                        tempWeight = ( _data[d].weight * count );
                        tempEmit = (_data[d].emit * count);
                        tempPrint = (_data[d].footprint * count);
                    }
                }
                totalWeight += tempWeight;
                totalEmit += tempEmit;
                totalFP += tempPrint;
            }
        }
        console.log(totalWeight, totalEmit, totalFP);
        drawResult(totalWeight, totalEmit, totalFP);
        return [totalWeight, totalEmit, totalFP];
    };

	var reviseWeight = function(n) { // 단위로 환산해서 return
		if(n==0){ return 0;
		} else {
            var r_w;
            if(n>=1000){
                r_w = ((n/1000)+"kg");
            }else{
                r_w = (n+"g");
            }
            /*
			var u = ["g", "kg"],
				sU = 1000,
				r_a = [],
				r_s = "";

			for (var i = 0; i < u.length; i++) {
				var unitResult = Math.floor( (n % Math.pow(sU, i + 1)) / Math.pow(sU, i) );
				if (unitResult > 0) { r_a[i] = unitResult; }
			}
			for (var i = 0; i < r_a.length; i++) {
				if (!r_a[i]) continue;
				r_s = String(r_a[i]) + u[i] + r_s;
			}*/
			return r_w;
		}
	}
	/*								*/
	/*------    QUERY CLICK     -----*/
	/*								*/


	$("#GO_RESULT_BTN").on("click", function(e){
		if( userSelectValueArr.includes(true) ){
			countUserSelect();
		}else{
			$(".non-alert-des").html("항목을 선택해주세요");
			$(".non-alert-des").stop().animate({"opacity":"1"}, 500, function(){
				$(".non-alert-des").delay(1000).animate({"opacity":"0"},50);
			});
		}

	});

    $("#TEST_AGAIN_BTN, #TEST_AGAIN_BTN_TOP").on("click", function(e){
		hideResult();
	});

	/*								*/
	/*          CHART FUNCTION      */
	/*								*/


	function resetPoleGraph(){
		$(".pole-graph").each(function(){
				var $poles = $(this).find(".each-pole");
				for(p=0;p<$poles.length;p++){
					$poles.eq(p).css({"width":"1px"});
					//$poles.eq(p).find(".value").hide();
					$poles.eq(p).find(".value").css({"opacity":"0"});
				}
		});
	}
	resetPoleGraph();

	function makePoleGraph(secType){
		var tempValueArr = new Array;
		var valueMax;
		var multiple;

		var _userData = (secType==1)? totalWeight:totalFP;
		_userData =  Math.round(_userData)*52;
		var _kAvrData = (secType==1)? koreanAvrData[0] : koreanAvrData[1];

		tempValueArr.push( _userData );
		tempValueArr.push( _kAvrData );

		valueMax = tempValueArr.reduce(function(a, b) {
		    return Math.max(a, b);
		});

		multiple = $(".pole-holder").width() / valueMax;

		var $polebody = $(".pole-holder").eq(secType-1);
		var $poles = $polebody.find(".each-pole");
		$poles.eq(0).find(".value").html(reviseWeight(_userData));
		$poles.eq(1).find(".value").html(reviseWeight(_kAvrData));

		for(p=0;p<$poles.length;p++){
			var ani_width = ( (tempValueArr[p]) * multiple);
			//console.log(ani_width);
			if(ani_width <= 35){
				if(ani_width== 0){
					ani_width = 5
				}
				$poles.eq(p).addClass("pole-short")
			};
			$poles.eq(p).delay(p*200).animate({"width": ani_width+"px"}, 1500, "easeOutCubic", function(){
				$(this).find(".value").animate({"opacity":"1"}, 500);
			});
		}

	}

	/*								*/
	/*          CHART FUNCTION      */
	/*								*/

	/*							*/
	/*         MAKE GRAPH      */
	/*							*/

	var makePlasticGraph = function(){
		var _data = [
			  {
			    "year": "2011",
			    "consume": "5344000",
			    "produce": "12028000"
			  },
			  {
			    "year": "2012",
			    "consume": "5391000",
			    "produce": "12531000"
			  },
			  {
			    "year": "2013",
			    "consume": "5507000",
			    "produce": "13084000"
			  },
			  {
			    "year": "2014",
			    "consume": "5571000",
			    "produce": "13093000"
			  },
			  {
			    "year": "2015",
			    "consume": "5836000",
			    "produce": "13109000"
			  },
			  {
			    "year": "2016",
			    "consume": "6519000",
			    "produce": "13687000"
			  },
			  {
			    "year": "2017",
			    "consume": "6600000",
			    "produce": "14060000"
			  },
			  {
			    "year": "2018",
			    "consume": "6325000",
			    "produce": "14060000"
			  }
		];

		var $graphHolder = $("#OUTRO_PG_GRAPH");
		var startYear = 2011,
			endYear = 2018;
		var totalYearNumb = endYear-startYear+1;
		var eachYearWidth = $graphHolder.find(".graph-body").width()/8;
		//console.log($(".graph-body").width(), eachYearWidth);
		var eachYearMargin = 20;
		var eachPoleWidth = (eachYearWidth-eachYearMargin)/2;
		var maxValue = 14060000;
		var heightMultiple = $graphHolder.find(".graph-body").height()/14060000;

		$graphHolder.find(".each-p").width(eachPoleWidth);

		var $cp = $(".pole-consume-holder .each-p");
		var $pp =  $(".pole-produce-holder .each-p");
		var $xTick = $(".graph-holder .x-axis .each-tick");

		for(d=0;d<_data.length; d++){
			$cp.eq(d).css({"left": eachYearWidth*d + "px", "height":Math.floor(_data[d].consume*heightMultiple)+"px", "top": $graphHolder.find(".graph-body").height()-Math.floor(_data[d].consume*heightMultiple)+"px"});
			$cp.eq(d).find(".value").html(gtoT(_data[d].consume));

			$pp.eq(d).css({"left": eachYearWidth*d+eachPoleWidth+4 + "px", "height":Math.floor(_data[d].produce*heightMultiple)+"px", "top": $graphHolder.find(".graph-body").height()-Math.floor(_data[d].produce*heightMultiple)+"px"});
			$pp.eq(d).find(".value").html(gtoT(_data[d].produce));

			$xTick.eq(d).css({"width":(eachYearWidth-eachYearMargin)+"px", "left": eachYearWidth*d+"px"});
		}

		function gtoT(n){
			var numb = n/10000;
			if(isMobile==true){
				return numb;
			}else{
				return numb+"만톤";
			}

		}

		var $yTick = $(".graph-holder .y-axis .each-tick");
		for(y=0; y<$yTick.length;y++){
			 $yTick.eq(y).css({"bottom": 5000000*(y+1)*heightMultiple+"px"});
		}
		$yTick.find(".line").css({"width":  $graphHolder.find(".graph-body").width() });
		$yTick.eq(2).hide();

	};
	makePlasticGraph();

	$(".each-legend-btn").on("click", function(e){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			 resoleHighlight();
		}else{
			$(".each-legend-btn").removeClass("on");
			$(this).addClass("on");
			var btnType = $(this).attr("data-type");
			highlightPole(btnType);
		}
	});

	var highlightPole = function(t){
		$p = (t=="consume")? $(".pole-consume-holder .each-p") : $(".pole-produce-holder .each-p");
		$("#OUTRO_PG_GRAPH").find(".each-p").css({"opacity":"0.15"});
		$p.stop().animate({"opacity":"1"}, 500);
	}
	var resoleHighlight = function(){
		$("#OUTRO_PG_GRAPH").find(".each-p").css({"opacity":"1"});
	}

	/*							*/
	/*         MAKE GRAPH      */
	/*							*/


	$(".opt-holder").on("mousedown", function(){
		$("#click-01").fadeOut();
	});
	$(".opt-holder").on("touchstart", function(){
		$("#click-01").fadeOut();
	});

	var art_banner_pos = $(".banner-list").offset().top;
	$("#GO_ART_BANNER").on("click", function(){
		$("html, body").animate({scrollTop: art_banner_pos}, 1200, "easeOutCubic");
	});

	function animateIntoFootprint(){
		var $fp = $(".story-top-graphic").find(".each-footprint");
		for(x=0;x<$fp.length;x++){
			(function(x){
				setTimeout(function(){
					$fp.eq(x).removeClass("beforeInit");
				}, 350*x);
			 })(x);
		}
	};


	function init(){
        if(isMobile==true){
            $(".page-title-main .back").animate({ "top": "2px", "left":"2px"}, 1000, "swing");

        }else{
            $(".page-title-main .back").animate({ "top": "3px", "left":"3px"}, 1000, "swing");
        }
		animateIntoFootprint();
	}


	$(".loading-page").fadeOut(200, function(){
		init();
	});


	/******** 모바일 전용 조정 ********/

	if(isMobile==true){
		$(".title-sub").attr("src","img/sub-title-m.png");
	}else{

	}
	/******** 모바일 전용 조정 ********/

	$(window).scroll(function(){
		var nowScroll = $(window).scrollTop();
		var nowScrollWithCon = nowScroll+screenHeight*0.6;
		var footPrintOpacity = (isMobile==true)? "0.15":"0.3";

		$(".hideme").each(function(i){
			if( $(this).hasClass("shown") == false && nowScroll + screenHeight > $(this).offset().top + $(this).outerHeight()*0.5 ){
				$(this).addClass("shown")
				$(this).stop().animate({"opacity":footPrintOpacity},1000);
			}
		});

	});




});


function sendSns(s) {
  var url = encodeURIComponent(location.href),
	  txt = encodeURIComponent($("title").html());
  switch (s) {
    case 'facebook':
      window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
      break;
    case 'twitter':
      window.open('http://twitter.com/intent/tweet?text=' + txt + '&url=' + url);
      break;
  }
}
