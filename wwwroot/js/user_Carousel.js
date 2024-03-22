
$(document).ready(function() {
    console.log("Page fully loaded");
    
	// 可調整參數
	$('#carouselLeftBtn').hide();
	$('#carouselRightBtn').hide();
	// 輪播內容物的顯示數量
	const contentToShow = 5;

	// 選取會使用的element，querySelector 會選取第一個使用此 class OR ID 的元素標籤
	const carousel = document.querySelector(".user_carousel");
	const container = document.querySelector(".user_container");
	const allContent = document.querySelectorAll(".user_content");
	const content = document.querySelector(".user_content");
	const prevBtn = document.querySelector(".prevBtn");
	const nextBtn = document.querySelector(".nextBtn");
	const contentComputeStyle = getComputedStyle(content);

	// 取得輪播內容物個數
	const contentAmount = document.querySelectorAll(".user_content").length;
	let distanceBetweenContent;

	// 輪播容器之位置
	let position = 0;

	const setContentWidth = function() {
		const carouselWidth = carousel.offsetWidth;

		// 可藉由給予輪播內容物margin-right屬性來設定內容物間的間隔
		const gap = parseInt(contentComputeStyle["margin-right"]);

		// 基於內容物的顯示數量，計算各內容物所需的大小
		const contentWidth = (carouselWidth - gap * Math.ceil(contentToShow - 1)) / contentToShow;



		allContent.forEach((el) => (el.style.width = `${contentWidth}px`));

		// 設定完內容物寬度後
		// 設定內容物間x軸之差，此為容器移動1單位之距離
		distanceBetweenContent = content.nextElementSibling.offsetLeft - content.offsetLeft;
	};

	const setContentHeight = function() {
		// 基於內容物的高度來設定容器高度
		carousel.style.height = contentComputeStyle.height;
	};

	// 按鈕初始化
	const defaultCarouselBtn = function() {
		if (contentAmount > contentToShow) {
			$('#carouselRightBtn').show();
		}
	};

	// 更新位置
	const move = function(step) {
		// 向右邏輯
		if ((contentAmount - step + position) < step) {
			var toRight = contentAmount - step + position;
			position -= toRight;
		}
		// 向左邏輯
		else if (position - step > 0) {
			position -= position;
		}
		// 在中間的時候左右都可以移動
		else {
			position -= step;
		}
		if (contentAmount > contentToShow) {
			if (position == 0) {
				$('#carouselLeftBtn').hide();
				$('#carouselRightBtn').show();
				console.log(position)
			} else if (position == - (contentAmount - step)) {
				$('#carouselLeftBtn').show();
				$('#carouselRightBtn').hide();
			} else {
				$('#carouselLeftBtn').show();
				$('#carouselRightBtn').show();
			}
		}
		return container.style.transform = `translateX(${distanceBetweenContent * position}px`;
	};
	prevBtn.addEventListener("click", function() {
		move(-5);
	});
	nextBtn.addEventListener("click", function() {
		move(5);
	});

	setContentWidth();
	setContentHeight();

	defaultCarouselBtn();
});


