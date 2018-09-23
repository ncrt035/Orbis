var mapDiv;
var map;

var marker = [];

var alphabets = ["A","B","C","D","E","F","G","H","I","L","M","N","O","P","Q","R","S","U","V","T","Z"];

class LocClass {

  constructor(row, column){
    this.row = row;
    this.column = column;
    this.name = data[row][column].name;
    this.text = data[row][column].name;
    this.description = data[row][column].description;
    this.lat = data[row][column].lat;
    this.long = data[row][column].long;
    this.category = data[row][column].category;
    this.flag = 0;

    //change options of label according to category
    switch (this.category) {
      case "city":
        this.labelOpts = {
          text: this.name,
          color: "black",
          fontFamily: "EB Garamond, serif",
          fontSize: "12px",
          fontWeight: "normal"
        }
        break;
      case "island":
        this.labelOpts = {
          text: this.name,
          color: "blue",
          fontFamily: "EB Garamond, serif",
          fontSize: "12px",
          fontWeight: "normal"
        }
        break;
      case "region":
        this.labelOpts = {
          text: this.name,
          color: "black",
          fontFamily: "EB Garamond, serif",
          fontSize: "20px",
          fontWeight: "normal"
        }
        break;
      case "mountain":
        this.labelOpts = {
          text: this.name,
          color: "brown",
          fontFamily: "EB Garamond, serif",
          fontSize: "12px",
          fontWeight: "normal"
        }
        break;
      default:
        this.labelOpts = {
          text: this.name,
          color: "black",
          fontFamily: "EB Garamond, serif",
          fontSize: "24px",
          fontWeight: "normal"
        }
        break;
    }

    this.center = new google.maps.LatLng(this.lat, this.long);

  }

  renewMap(row, column){

    //Options for marker
    var mopts = {
      title: this.name,
      position: this.center,
      map: map,
      icon: "icon.png",
      label: this.labelOpts
    }

    marker[row][column].setOptions(mopts);
    if (this.flag==0) {
      marker[row][column].setMap(map);
      this.renewExplanation();
      //map.setCenter(this.center);
      this.flag = 1;
    }else {
      marker[row][column].setMap(null);
      this.flag = 0;
    }

  }

  renewExplanation(){

    var laDiv = document.getElementById("laLemma");
    var grDiv = document.getElementById("grLemma");
    var enDiv = document.getElementById("en");
    var explDiv = document.getElementById("expl");
    var jpDiv = document.getElementById("jp");
    laDiv.textContent = this.description.la;
    grDiv.textContent = this.description.gr;
    enDiv.textContent = this.description.en;
    explDiv.textContent = this.description.expl;
    jp.textContent = this.description.jp;
  }
}

window.addEventListener("DOMContentLoaded", function(){

  var wordlist = document.getElementById("wordlist");
  var mapWrap = document.getElementById("mapWrap");

  mapDiv = document.getElementById("map");

  //initiation of map
  initMap();

  var loc = [];
  for (var i = 0; i < data.length; i++) {
    loc[i] = [];
    marker[i] = [];
    for (var j = 0; j < data[i].length; j++) {
      loc[i][j] = new LocClass(i, j);
      //generate markers
       marker[i][j] = new google.maps.Marker();
    }

  }
  //loc[0].renewMap(map);
  //map.setCenter(loc[0].center);

  //create html
  for (var i = 0; i < data.length; i++) {

    var baseDiv = document.getElementById(alphabets[i]);
    var opDiv = document.createElement("div");
    var clDiv = document.createElement("div");
    opDiv.num = i;
    opDiv.id = "open" + String(opDiv.num);
    opDiv.textContent = alphabets[i];
    opDiv.style.display = "block";
    clDiv.num = i;
    clDiv.id = "close" + String(clDiv.num);
    clDiv.textContent = alphabets[i];
    clDiv.style.display = "none";

    opDiv.addEventListener("click", function(){
      var closeName = "close" + String(this.num);
      var ulName = "l" + alphabets[this.num];
      var cp = document.getElementById(closeName);
      var ulp = document.getElementById(ulName);
      ulp.style.display = "block";
      cp.style.display = "block";
      this.style.display = "none";

    });
    clDiv.addEventListener("click", function(){
      var openName = "open" + String(this.num);
      var ulName = "l" + alphabets[this.num];
      var op = document.getElementById(openName);
      var ulp = document.getElementById(ulName);
      ulp.style.display = "none";
      op.style.display = "block";
      this.style.display = "none";

    });

    var ulElem = document.createElement("ul");

    ulElem.id = "l" + alphabets[i];
    ulElem.style.display = "none";
    wordlist.appendChild(ulElem);

    for (var j = 0; j < data[i].length; j++) {

      var liElem = document.createElement("li");

      liElem.row = loc[i][j].row;
      liElem.column = loc[i][j].column;
      liElem.name = loc[i][j].name;
      liElem.textContent = loc[i][j].name;

      liElem.addEventListener("click", function(){

        loc[this.row][this.column].renewMap(this.row, this.column);

      });

      ulElem.appendChild(liElem);

    }
    //Add Elements
    baseDiv.appendChild(opDiv);
    baseDiv.appendChild(clDiv);
    baseDiv.appendChild(ulElem);

  }

});


function initMap(){
  var opts = {
    zoom: 5,
    center: new google.maps.LatLng(37.983810, 23.727539),
    styles: [
      {
        "elementType": "labels",
        "stylers": [
          { "visibility": "off" }
        ]
      }
    ]
  };
  map = new google.maps.Map(mapDiv, opts);
}
