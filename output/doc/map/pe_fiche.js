//Titre et légende de la carte
var maptitle = L.control({position:"bottomright",},);
maptitle.onAdd = function (map){
var div = L.DomUtil.create("div", "legendin");
div.innerHTML ='<table class="info-legend"><thead><tr><th></th><th>Diagnostic des points d\'eau</th></tr</thead><tbody><tr></tr><tr><td style="background-color:Red;height:10px;width:30px;opacity:1;border:1px solid Red;"></td><td>Non conforme aux normes de potabilité</td></tr><tr></tr><tr><td style="background-color:green;height:10px;width:30px;opacity:1;border:1px solid green;"></td><td>Conforme aux normes de potabilité</td></tr></tbody></table><details title="cliquer sur la flèche pour afficher la légende"><summary><strong>Normes OMS</strong></summary><table class="info-legend"><thead><tr><th>Élément analysé</th><th>Norme OMS</th></tr><thead><tbody><tr><td><em>E. Coli</em></td><td>0 UFC/100ml</td></tr><tr><td><em>Concentration en Ammoniac</em></td><td>1,5 mg/l</td></tr><tr><td><em>Concentration en Nitrate</em></td><td>50 mg/l</td></tr></tbody></table><a href="https://www.who.int/water_sanitation_health/dwq/gdwq3rev/fr/">OMS : Directives pour la qualité de l\'eau de boisson</a></details>';
return div;
}
maptitle.addTo(map);





        
////Création des icones par type de points d'eau

var modernIcon = L.icon({shadowUrl:urlwhiteshadow,shadowSize:[,30],shadowAnchor: [15, 15],iconAnchor:[10,5],iconSize:[20,],iconUrl: urlpuitsmoderne});
var tradiIcon = L.icon({shadowUrl:urlwhiteshadow,shadowSize:[,30],shadowAnchor: [15, 15],iconAnchor:[ 10,5],iconSize:[20,],iconUrl: urlpuitstradi});
var forageIcon = L.icon({shadowUrl:urlwhiteshadow,shadowSize:[,30],shadowAnchor: [15, 15],iconAnchor:[5,10],iconSize:[,20],iconUrl: urlforage}); 
var borneIcon = L.icon({shadowUrl:urlwhiteshadow,shadowSize:[,30],shadowAnchor: [15, 15],iconAnchor:[5,10],iconSize:[,20],iconUrl: urlborne}); 
var surfaceIcon = L.icon({shadowUrl:urlwhiteshadow,shadowSize:[,30],shadowAnchor: [15, 15],iconAnchor:[10,10],iconSize:[,20],iconUrl: urlsurface});
var testIcon = L.icon({shadowUrl:urlredshadow,shadowSize:[,30],shadowAnchor: [15, 15],iconAnchor:[10,10],iconSize:[,20],iconUrl: urlredshadow});

//création de la fonction qui appliquera l'icone en fonction de la variable type de points d'eau feature.properties.Type de point d'eau
function geticontype(t) {
          switch (t) {
            case 'Marigot':
              return  surfaceIcon;
            case 'Mare':
              return  surfaceIcon;
            case 'Lac':
              return  surfaceIcon;
            case 'Rivière':
              return  surfaceIcon;
              
             case 'Borne fontaine':
              return borneIcon;
              
            case 'Puits traditionnels':
              return  tradiIcon;
              
            case 'Puits busés':
              return  modernIcon;                                                                                   
            case 'Puits maçonnés':
              return modernIcon;  
              
//            case 'Puits équipé d\'une PMH':
  //            return modernIcon;
    //        case 'Puits équipé d\'une  pompe immergée':
      //        return modernIcon;
              
 //            case 'Forage équipé d\'une pompe immergée':
   //           return  forageIcon;
     //       case 'Forage équipé d\'une PMH':
       //       return forageIcon;
              
     		default:
              return forageIcon;
          }
        }
 //création de la couche type de point d'eau
$.getJSON(urlpointdeau,function(data){
	//transformation de la base de donnée en couche (Layer)
	
	var typePE = L.geoJson(data,{
		
		onEachFeature: oneachfeature,
		//Affichage sous forme de point
		pointToLayer:function(feature,latlng){
			//caractéristique des points
			var marker = L.marker(latlng,{icon:geticontype(feature.properties.Type)});
			//caractéristiques des popup
			//marker2.bindPopup('<p>Comptage <em>E. coli</em>: ' + feature.properties.ecoli + ' UFC / 100 ml</p>');
			//Affichage des marqueurs
			return marker;
		}
		
		
		});
		//.on("click", cible);
	//Affichage sur la carte
	
	//typePE.addTo(map);
	//Affichage dans le controleur de couche
	
	//controlLayers.addOverlay(Ecoli, "" );
	//controlLayers.addOverlay(typePE, "Type de Point d'eau", "Diagnostic des points d'eau");
});    
        
 // fonction pour l'affichage dans le panneau à droite des données du point       
function oneachfeature(feature, layer){
		 	//marker.setOpacity(0); 
           layer.on({
                click: function showResultsInDiv() {
                    var d = document.getElementById('popupstatic');
                    d.innerHTML = "";
                    tableNew = "<table>";
                    //tableNew += "<tr><td></td></tr>";
                       
                        for (prop in feature.properties){
                        	
                        	
                        	 if (feature.properties[prop] !== null) 
                        		{
                        			tableNew += "<tr><td><strong>"+prop+" : </strong></td><td>"+feature.properties[prop]+"</td></tr>" ;
                        			}
                        		else {;}
                        		;
                        		
                        	  }                     	
                        	
                        
                    
                    tableNew += "</table>";
                    d.innerHTML = tableNew;
                    
                    
                }
            }) }
//fonction pour afficher un cible bleu autour du point sélectionné
function cible(e){
						
		var marker = new L.circleMarker([e.latlng.lat, e.latlng.lng],{radius: 10, color: 'dodgerblue', fillColor: 'dodgerblue',weight: 3,fillOpacity: 0,dashArray:"5",})
		.addTo(map);
		if (markers.length > 0) {map.removeLayer(markers.pop());}
		var marker;
		markers.push(marker)
      return marker;
		
		
}

//Création d'un compteur de marker
var markers = [];	   


//Création de la couche contamination Ecoli
//Couleur en fonction de la présence d'E. coli

  function getColorEcoli(ecoli) {
          if (ecoli == 0 == true) {
          	return('green');
          }
          else if (ecoli > 0 == true) {
          	return('Red');
          }
          else {
          	return('grey');
          }
       };
       
//transformation de la base de donné "point_eau.geojson" en une couche E.coli
//lecture de la base de donnée
$.getJSON(urlpointdeau,function(data){
	//transformation de la base de donnée en couche (Layer)
	
	var Ecoli = L.geoJson(data,{
		
		onEachFeature: oneachfeature,
		//Affichage sous forme de point
		pointToLayer:function(feature,latlng){
			//caractéristique des points
			var marker2 = L.circleMarker(latlng,{radius: 5,fillOpacity: 1, color: 'black', fillColor: getColorEcoli(feature.properties.ecoli),weight: 1,fillOpacity: 0.8,});
			//caractéristiques des popup
			//marker2.bindPopup('<p>Comptage <em>E. coli</em>: ' + feature.properties.ecoli + ' UFC / 100 ml</p>');
			//Affichage des marqueurs
			return marker2;
		}
		
		
		}).on("click", cible);
	//Affichage sur la carte
	
	Ecoli.addTo(map);
	//Affichage dans le controleur de couche
	
	//controlLayers.addOverlay(Ecoli, "" );
	controlLayers.addOverlay(Ecoli, "Contamination par E. coli", "Diagnostic des points d'eau");
});


//Création de la couche pollution nitrates
//Couleur en fonction de la concentration en Nitrates

  function getColorNitrates(Nitrate) {
          if (Nitrate < 50 == true) {
          	return('green');
          }
          else if (Nitrate >= 50 == true) {
          	return('Red');
          }
          else {
          	return('grey');
          }
       };     
//transformation de la base de donné "point_eau.geojson" en une couche nitrate
//lecture de la base de donnée
$.getJSON(urlpointdeau,function(data){
	//transformation de la base de donnée en couche (Layer)
	
	var Nitrate = L.geoJson(data,{
		
		onEachFeature: oneachfeature,
		//Affichage sous forme de point
		pointToLayer:function(feature,latlng){
			//caractéristique des points
			var marker = L.circleMarker(latlng,{radius: 5,fillOpacity: 1, color: 'black', fillColor: getColorNitrates(feature.properties.nitrate),weight: 1,fillOpacity: 0.8,});
			//caractéristiques des popup
			//marker.bindPopup(' <p>Concentration en <em>Nitrate</em>: ' + feature.properties.nitrate + ' mg/l </p>');
			//Affichage des marqueurs
			return marker;
		}
		}).on("click", cible);
	//Affichage sur la carte
	
	
	//controlLayers.addOverlay(Ecoli, "" );
	controlLayers.addOverlay(Nitrate, "Pollution au Nitrate", "Diagnostic des points d'eau");
});

//Création de la couche pollution Ammoniac
//Couleur en fonction de la concentration en Ammoniac

  function getColorAmmoniac(Ammoniac) {
          if (Ammoniac < 1 == true) {
          	return('green');
          }
          else if (Ammoniac >= 1 == true) {
          	return('Red');
          }
          else {
          	return('grey');
          }
       };     
//transformation de la base de donné "point_eau.geojson" en une couche Ammoniac
//lecture de la base de donnée
$.getJSON(urlpointdeau,function(data){
	//transformation de la base de donnée en couche (Layer)
	
	var Ammoniac = L.geoJson(data,{
		
		onEachFeature: oneachfeature,
		//Affichage sous forme de point
		pointToLayer:function(feature,latlng){
			//caractéristique des points
			var marker = L.circleMarker(latlng,{radius: 5,fillOpacity: 1, color: 'black', fillColor: getColorAmmoniac(feature.properties.ammoniac),weight: 1,fillOpacity: 0.8,});
			//caractéristiques des popup
			//marker.bindPopup(' <p>Concentration en <em>Ammoniac</em>: ' + feature.properties.ammoniac + ' mg/l </p>');
			//Affichage des marqueurs
			return marker;
		}
		}).on("click", cible);
	//Affichage sur la carte
	
	
	
	controlLayers.addOverlay(Ammoniac, "Pollution à l'Ammoniac", "Diagnostic des points d'eau");
});

//Création d'une couche avec un icone



