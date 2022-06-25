$(function(){
	$("#navToggle").blur(function(event){
		var screenWidth = window.innerWidth;
		if(screenWidth < 768){
			$("#collapsable-nav").collapse('hide');
		}
	});
	$("#navbarToggle").click(function (event) {
    	$(event.target).focus();
  	});
  
});

(function(global){
    var dc = {}; 
    var homeHtml = "../snippets/home-snippet.html";
    var aboutTitleHtml = "partials/about-snippet.html";
    var informationTitleHtml = "partials/information-snippet.html";
    var categoryHtml = "partials/category-snippet.html";
    //var menuItemsUrl =
      //"https://trinas-tax-info.herokuapp.com/menu_items.json?category=";
    var menuItemsTitleHtml = "partials/menu-items-title.html";
    var menuItemHtml = "partials/menu-item.html";

	function parallax(){
		var prlx_layer_1 = document.getElementById('main-content');
		prlx_layer_1.style.top = (window.pageYOffset / 5)+'px';
	}

	window.addEventListener("scroll", parallax, false);

	var insertHtml = function(selector, html){
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	}

	var showLoading = function(selector){
		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'></div>";
		insertHtml(selector, html);
	}
	var insertProperty = function(string, propName, propValue){
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	}
	var switchMenuToActive = function(){
		var class1 = document.querySelector("#navHomeButton").className;
		class1 = class1.replace(new RegExp("active","g"), "");
		document.querySelector("#navHomeButton").className = class1;
		class1 = document.querySelector("#navMenuButton").className;
		if(class1.indexOf("active") == -1){
			class1 += " active";
			document.querySelector("#navMenuButton").className = class1;
		}

		var class2 = document.querySelector("#navServicesButton").className;
		class2 = class2.replace(new RegExp("active","g"), "");
		document.querySelector("#navServicesButton").className = class2;
		class2 = document.querySelector("#navMenuButton").className;
		if(class2.indexOf("active") == -1){
			class2 += " active";
			document.querySelector("#navMenuButton").className = class2;
		}
	};
	var switchServicesToActive = function(){
		var class1 = document.querySelector("#navHomeButton").className;
		class1 = class1.replace(new RegExp("active","g"), "");
		document.querySelector("#navHomeButton").className = class1;

		class1 = document.querySelector("#navServicesButton").className;
		if(class1.indexOf("active") == -1){
			class1 += " active";
			document.querySelector("#navServicesButton").className = class1;
		}

		var class2 = document.querySelector("#navMenuButton").className;
		class2 = class2.replace(new RegExp("active","g"), "");
		document.querySelector("#navMenuButton").className = class2;

		class2 = document.querySelector("#navServicesButton").className;
		if(class2.indexOf("active") == -1){
			class2 += " active";
			document.querySelector("#navServicesButton").className = class2;
		}
	};
	dc.loadAboutPage = function(){
		showLoading("#main-content");
		buildAboutPage();
	}
	dc.loadInformationPage = function(){
		showLoading("#main-content");
		buildInformationPage();
	}
	dc.loadMenuItems = function(categoryShort){
		switchServicesToActive();
		showLoading("#main-content");
		buildMenuItemsPage();
	}

	document.addEventListener("DOMContentLoaded", function(event){
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			homeHtml, function(homeHtml){
				document.querySelector("#main-content").innerHTML = homeHtml;
			}, false);
	});


	function buildMenuItemsPage(){
		$ajaxUtils.sendGetRequest(menuItemsTitleHtml, function(menuItemsTitleHtml){
				switchMenuToActive();
				var categoriesViewHtml = buildMenuItemsViewHtml(menuItemsTitleHtml);
				insertHtml("#main-content", categoriesViewHtml);
		}, false)
	}
	function buildAboutPage(){
		$ajaxUtils.sendGetRequest(aboutTitleHtml, function(aboutTitleHtml){
				var categoriesViewHtml = buildAboutViewHtml(aboutTitleHtml);
				insertHtml("#main-content", categoriesViewHtml);
		}, false)
	}
	function buildInformationPage(){
		$ajaxUtils.sendGetRequest(informationTitleHtml, function(informationTitleHtml){

				switchMenuToActive();
				var categoriesViewHtml = buildInformationViewHtml(informationTitleHtml);
				insertHtml("#main-content", categoriesViewHtml);
		}, false)
	}
	function buildInformationViewHtml(informationTitleHtml){
				var finalHtml = informationTitleHtml;

				return finalHtml;
	}
	

	function buildAboutViewHtml(aboutTitleHtml){
		var finalHtml = aboutTitleHtml;

		return finalHtml;
	}

	function buildMenuItemsViewHtml(menuItemsHtml){
		var finalHtml = menuItemsHtml;

		return finalHtml;
	}
	/*function buildAndShowMenuItemsHTML(categoryMenuItems){
		$ajaxUtils.sendGetRequest(menuItemsTitleHtml, function(menuItemsTitleHtml){
			$ajaxUtils.sendGetRequest(menuItemHtml, function(menuItemHtml){
			
				var menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml);
				insertHtml("#main-content", menuItemsViewHtml);
			}, false);
		}, false);

	}
	function buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml){
		menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name", categoryMenuItems.category.name);
		menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "special_instructions", categoryMenuItems.category.special_instructions);
		var finalHtml = menuItemsTitleHtml;
		finalHtml += "<section class='row'>";
		var menuItems = categoryMenuItems.menu_items;
		var catShortName = categoryMenuItems.category.short_name;
		for(var i = 0; i < menuItems.length; i++){
			var html = menuItemHtml;
			html = insertProperty(html, "short_name", menuItems[i].short_name);
			html = insertProperty(html, "catShortName", catShortName);
			html = insertItemPrice(html, "price_small", menuItems[i].price_small);
			html = insertItemPortionName(html, "small_portion_name", menuItems[i].small_portion_name);
			html = insertItemPrice(html, "price_large", menuItems[i].price_large);
			html = insertItemPortionName(html, "large_portion_name", menuItems[i].large_portion_name);
			html = insertProperty(html, "name", menuItems[i].name);
			html = insertProperty(html, "description", menuItems[i].description);
			if (i % 2 != 0){
			html += "<div class='clearfix visible-lg-block visible-md-block'></div>";
		
		}

			finalHtml += html;
		}
		finalHtml += "</section>";
		return finalHtml;
	}

	function insertItemPortionName(html,
                               portionPropName,
                               portionValue) {
	  if (!portionValue) {
	    return insertProperty(html, portionPropName, "");
	  }

	  portionValue = "(" + portionValue + ")";
	  html = insertProperty(html, portionPropName, portionValue);
	  return html;
	}

	function insertItemPrice(html, pricePropName, priceValue){
		if (!priceValue){
			return insertProperty(html, pricePropName, "");
		}
		priceValue = "$" + priceValue.toFixed(2);
		html = insertProperty(html, pricePropName, priceValue);
		return html;
	}*/

	global.$dc = dc;
})(window);
