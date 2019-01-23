class MenuTree {
  constructor(listId, bulletPoint) {
    return this.createTree(listId, bulletPoint);
  }
  searchList(listId, searchTerm) {
    var i, j, lilNodes, liItems = document.getElementsByTagName("LI");
    for (i = 0; i < liItems.length; i++) {
      if (liItems[i].hasChildNodes()) {
        for (j = 0; j < liItems[i].childNodes.length; j++) {
          if (liItems[i].childNodes[j].innerHTML == searchTerm) {
            //?????
          }
        }
      }
    }
  }

  collapseAll(listId) {
    var i, ulLists = document.getElementsByTagName("UL");
    for (i = 0; i < ulLists.length; i++) {
      if (ulLists[i].className == "jsl-collapsed") {
        console.log(ulLists[i].className + '\n' + '@');
      }
    }
  }

  openAll(listId) {
    var i, olLists = Array.prototype.slice.call(document.getElementsByTagName("UL")),
      ulLists = Array.prototype.slice.call(document.getElementsByTagName("OL"))
    var gLists = olLists.concat(ulLists);

    for (i = 1; i < gLists.length; i++) {
      gLists[i].setAttribute('class', 'jsl-open');
    };
  }

  padUnorderedLists(listId) {
    var i, listItems = document.getElementById(listId).getElementsByTagName("UL");
    for (i = 0; i < listItems.length; i++) {
      listItems[i].classList.add('jslist-ul');
    }
  }

  padOrderedLists(listId) {
    var i, listItems = document.getElementById(listId).getElementsByTagName("UL");
    for (i = 0; i < listItems.length; i++) {
      listItems[i].classList.add('jslist-ol');
    }
  }

  padLists(listId) {
    var i, listItems = document.getElementById(listId).getElementsByTagName("LI");
    for (i = 0; i < listItems.length; i++) {
      if (listItems[i].childNodes[0].className != "jsl-collapsed-arrow") {
        listItems[i].classList.add('jslist-li');
      }
    }
    for (i = 1; i < listItems.length; i++) {
      // console.log(listItems[i].childNodes.length);
      if (listItems[i].classList = "jslist-li" && listItems[i].childNodes.length < 2) {
        listItems[i].innerHTML = blackCircle + listItems[i].innerHTML
      }
    }
    this.padUnorderedLists(listId);
    this.padOrderedLists(listId);
  }

  createTree(listId, bulletPoint) {
    document.getElementById(listId).style.display = "none;"
    var i, j, curElem, ulCount, listItems = document.getElementById(listId).getElementsByTagName('LI'); //this should be the main parent
    for (i = 0; i < listItems.length; i++) {
      if (listItems[i].id.length > 0) {
        curElem = document.getElementById(listItems[i].id);
        ulCount = document.getElementById(listItems[i].id).getElementsByTagName("UL");
        if (ulCount.length > 0) {
          for (j = 0; j < ulCount.length; j++) {
            if (ulCount[j].nodeName == "UL") {
              break;
            }
          }
          ulCount[j].setAttribute('class', 'jsl-collapsed');
          var tglDiv = document.createElement("div");
          tglDiv.setAttribute('class', 'jsl-list-closed');
          tglDiv.setAttribute("id", listItems[i].id + i + '_tgl');
          curElem.insertBefore(tglDiv, curElem.childNodes[0]);

          document.getElementById(listItems[i].id + i + '_tgl').addEventListener('click', function (e) {
            document.getElementById(e.target.id).classList.toggle('jsl-list-open');
            document.getElementById(e.target.id).parentElement.lastElementChild.classList.toggle('jsl-open');
            e.stopPropagation();
          }, true);
        }
      } else {
        listItems[i].setAttribute("id", listId + "tmp" + i);
        curElem = document.getElementById(listId + "tmp" + i);
        ulCount = document.getElementById(listItems[i].id).getElementsByTagName("UL");

        if (ulCount.length > 0) { //There is a nested UL in this LI element, now find the position of the UL
          for (j = 0; j < ulCount.length; j++) {
            if (ulCount[j].nodeName == "UL") {
              break; //Multiple UL's? //Set class collapseAll here
            }
          }
          ulCount[j].setAttribute('class', 'jsl-collapsed');
          var tglDiv = document.createElement("div");
          tglDiv.setAttribute('class', 'jsl-list-closed');
          tglDiv.setAttribute("id", listItems[i].id + i + '_tgl');
          curElem.insertBefore(tglDiv, curElem.childNodes[0]);

          document.getElementById(listItems[i].id + i + '_tgl').addEventListener('click', function (e) {
            document.getElementById(e.target.id).classList.toggle('jsl-list-open');
            document.getElementById(e.target.id).parentElement.lastElementChild.classList.toggle('jsl-open');
            e.stopPropagation();
          }, true);
        }
        listItems[i].removeAttribute("id");
      }
    }
    setTimeout(function () {
      document.getElementById(listId).style.display = "block;"
    }, 50); // stops FOUC!
    this.padLists(listId);
  }

  applyToList(listId, bulletPoint) {
    this.createTree(listId, "UL");
  }
  setAttr(elem, attrs = {}) {
    const { style = {} } = attrs;
    for (var key in style) {
      elem.style[key] = style[key];
    }
  }
}

module.exports = MenuTree;
