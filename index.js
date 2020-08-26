//-----------------------------------------定义和初始化变量----------------------------------------
var loadBox = $('aside.loadBox');
var articleBox = $('article');
var windowScale = window.innerWidth / 750;

//----------------------------------------页面初始化----------------------------------------
icom.init(init);//初始化
icom.screenScrollUnable();//如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

function init() {
	requestAnimationFrame(function () {
		if (os.screenProp < 0.54) articleBox.addClass("screen189");
		if (os.screenProp <= 0.64 && os.screenProp >= 0.54) articleBox.addClass("screen169");
		if (os.screenProp > 0.64) articleBox.addClass("screen159");
		icom.fadeIn(loadBox);
		load_handler();
	});
	wxUser.init();
}//edn func


//----------------------------------------加载页面图片----------------------------------------
function load_handler() {
	var loader = new PxLoader();
	loader.addImage('images/common/turn_phone.png');

	for (var i = 0; i < 51; i++) {
		loader.addImage('images/q1/' + i + '.jpg');
	}

	loader.addCompletionListener(function () {
		icom.fadeIn(articleBox);
		pageInit();
		loader = null;
	});
	loader.start();
}//end func

//模拟加载进度
function load_timer(per) {
	per = per || 0;
	per += imath.randomRange(1, 3);
	per = per > 100 ? 100 : per;
	loadPer.html(per + '%');
	if (per == 100) setTimeout(pageInit, 200);
	else setTimeout(load_timer, 33, per);
}//edn func

//----------------------------------------页面逻辑代码----------------------------------------
var videoBox = $("#videoBox");
var indexBox = $("#indexBox");
var questionBox = $("#questionBox");
var qsBg = $("#qsBg");

var myVideo = $("#myVideo")[0];


/**
 * 页面初始化
 */
function pageInit() {
	eventInit();
	// DevelopTest();
	loadBox.hide();
	monitor_handler();
}//end func

/**
 * 开发测试使用
 */
function DevelopTest() {
	// loadingBox.hide();
	// QABox.show();
	showQuestionBox();
}

/**
 * 事件初始化
 */
function eventInit() {
	$(".limitBtn").on("touchend", limitClick);

	$(".btn").on("touchend", hideBtnAnime);

	$(".start").on("click", function () {
		indexBox.hide();
		videoBox.show();
		myVideo.play();
		setTimeout(function(){
			showQuestionBox();
		},34650)
	})
}

function hideBtnAnime(){
	$(".qsBox").removeClass("btnEnterAnime")
	.addClass("btnOutAnime");
}

function showQuestionBox() {
	gifInit();
	videoBox.hide();
	$(".qsBox").show()
	.addClass("btnEnterAnime");
}

function gifInit() {
	qsBg.gifOn({ path: 'images/q1/', filetype: "jpg", type: 'image', num: 51, repeat: 999, speed: 66 });
}

/**
 * 限制点击
 */
function limitClick() {
	$(".limitBtn").addClass('noPointer');
	setTimeout(function () { $(".limitBtn").removeClass('noPointer') }, 800);
}//end func

//----------------------------------------页面监测代码----------------------------------------
function monitor_handler() {
	//		imonitor.add({obj:$('a.btnTest'),action:'touchstart',category:'default',label:'测试按钮'});
}//end func
