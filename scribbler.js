// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

// setup typewriter effect in the terminal demo
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
//   var txt = `"""pip install fake-useragent"""
// from fake_useragent import UserAgent
// import requests
// import json
//
//
// def collect_data():
// ua = UserAgent()
// result = []
// url="https://aws.amazon.com/api/dirs/items/search?item.directoryId=aws-products&sort_by=item.additionalFields.launchDate&sort_order=desc&size=1000&item.locale=ru_RU&tags.id=GLOBAL%23free-tier%23always-free&tags.id=!aws-products%23type%23feature&tags.id=!aws-products%23type%23variant&page=0"
// response = requests.get(
//   url=url,
//   headers={
//       "Accept": "*/*",  #
//       "User-Agent": ua.random
//   }
// )
// data = response.json()
// items = data.get('items')
// for i in items:
//   name = i['item'].get('name')
//   dateCreated = i['item'].get('dateCreated')
//   dateUpdated = i['item'].get('dateUpdated')
//   productSummary = i['item']['additionalFields'].get('productSummary')
//   launchDate = i['item']['additionalFields'].get('launchDate')
//   productUrl = i['item']['additionalFields'].get('productUrl')
//   productName = i['item']['additionalFields'].get('productName').replace(" ", " ")
//   productCategory = i['item']['additionalFields'].get('productCategory')
//
//   result.append(
//       {
//           'name': name,
//           'dateCreated': dateCreated,
//           'dateUpdated': dateUpdated,
//           'productSummary': productSummary,
//           'launchDate': launchDate,
//           'productUrl': productUrl,
//           'productName': productName,
//           'productCategory': productCategory,
//       }
//   )
//
// with open('resulting.json', 'w', encoding='utf-8') as file:
//   json.dump(result, file, indent=4, ensure_ascii=False)
// # print(len(result))
//
// def main():
// print(collect_data())
//
//
// if __name__ == '__main__':
// main()`;
  var speed = 5;

  function typeItOut () {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1800);
}

// toggle tabs on codeblock
window.addEventListener("load", function() {
  // get all tab_containers in the document
  var tabContainers = getAll(".tab__container");

  // bind click event to each tab container
  for (var i = 0; i < tabContainers.length; i++) {
    get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
  }

  // each click event is scoped to the tab_container
  function tabClick (event) {
    var scope = event.currentTarget.parentNode;
    var clickedTab = event.target;
    var tabs = getAll('.tab', scope);
    var panes = getAll('.tab__pane', scope);
    var activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

    // remove all active tab classes
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    // remove all active pane classes
    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    // apply active classes on desired tab and pane
    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }
});

//in page scrolling for documentaiton page
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveLink(event) {
  // remove all active tab classes
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function smoothScrollTo(i, event) {
  var element = sections[i];
  setActiveLink(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop - 20,
    'left': 0
  });
}

if (btns.length && sections.length > 0) {
  for (var i = 0; i<btns.length; i++) {
    btns[i].addEventListener('click', smoothScrollTo.bind(this,i));
  }
}

// fix menu to page-top once user starts scrolling
window.addEventListener('scroll', function () {
  var docNav = get('.doc__nav > ul');

  if( docNav) {
    if (window.pageYOffset > 63) {
      docNav.classList.add('fixed');
    } else {
      docNav.classList.remove('fixed');
    }
  }
});

// responsive navigation
var topNav = get('.menu');
var icon = get('.toggle');

window.addEventListener('load', function(){
  function showNav() {
    if (topNav.className === 'menu') {
      topNav.className += ' responsive';
      icon.className += ' open';
    } else {
      topNav.className = 'menu';
      icon.classList.remove('open');
    }
  }
  icon.addEventListener('click', showNav);
});
