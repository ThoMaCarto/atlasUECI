//Création des différents pane
map.createPane('fond');
map.getPane('fond').style.zIndex = 500;
map.getPane('fond').style.pointerEvents = 'none';
map.createPane('marker2');
map.getPane('marker2').style.zIndex = 600;


//Légende du score de vulnérabilité points d'eau
var div1 = L.DomUtil.create("div", "legendin");
var legendScoreVuln = L.control({position:"bottomleft",},);
legendScoreVuln.onAdd = function (){
	div1.innerHTML ='<div><strong>Vulnérabilité sanitaire<br>du point d\'eau</strong></div>'
+'<div style="display:flex;justify-content: space-between;">'
+'<div style="height:12px;width:12px;border-radius:5rem;background-color:white;border:4px solid green;"></div><div> Faible</div>'
+'</div>'
+'<div style="display:flex;justify-content: space-between;">'
+'<div style="height:12px;width:12px;border-radius:5rem;background-color:white;border:4px solid orange;"></div><div> Moyenne</div>'
+'</div>'
+'<div style="display:flex;justify-content: space-between;">'
+'<div style="height:12px;width:12px;border-radius:5rem;background-color:white;border:4px solid red;"></div><div> Élevée</div>'
+'</div>'
+'<div style="display:flex;justify-content: space-between;">'
+'<div style="height:12px;width:12px;border-radius:5rem;background-color:white;border:4px solid purple;"></div><div> Très élevée</div>'
+'</div>'
;
	return div1;
};

//Légende pollution aux alentours
var legendPollut = L.control({position:"bottomleft",},);
legendPollut.onAdd = function (){
	div1.innerHTML ='<div><strong>Sources de pollution<br>identifiables aux alentours</strong></div>'
+'<div style="display:flex;justify-content: space-between;">'
+'<div style="height:12px;width:12px;border-radius:5rem;background-color:white;border:4px solid red;"></div><div> Oui</div>'
+'</div>'

+'<div style="display:flex;justify-content: space-between;">'
+'<div style="height:12px;width:12px;border-radius:5rem;background-color:white;border:4px solid Darkblue;"></div><div> Aucune </div>'
+'</div>'



;
	return div1;
};

//Titre et légende de la carte
var omsLegend = L.control({position:"bottomright",},);
omsLegend.onAdd = function (){
var div3 = L.DomUtil.create("div", "legendin");
div3.innerHTML ='<div style="display:inline-block;">'
+'<div><strong>Analyse de l\'eau</strong></div>'
+'<div style="display:flex;justify-content: space-between;">'
+'<div style="height:10px;width:10px;border-radius:5rem;background-color:green;border:1px solid black;"></div><div> Conforme aux normes OMS</div>'
+'</div>'

+'<div style="display:flex;justify-content: space-between;">'
+'<div style="height:10px;width:10px;border-radius:5rem;background-color:red;border:1px solid black;"></div><div> Non-conforme aux normes OMS</div>'
+'</div>'
+'<details title="cliquer sur la flèche pour afficher la légende">'
+'<summary><strong>Normes OMS</strong>'
+'</summary>'
+'<table class="info-legend">'
+'<thead><tr><th>Élément analysé</th><th>Norme OMS</th></tr><thead>'
+'<tbody>'
+'<tr><td><em>Concentration en Chlore libre</em></td><td>entre 0,5 et 5 mg/l</td></tr>'
+'<tr><td><em>Concentration en Chlore total</em></td><td>inférieure à 5 mg/l</td></tr>'
+'<tr><td><em>Concentration en Ammoniac</em></td><td>inférieure à 1,5 mg/l</td></tr>'
+'<tr><td><em>Concentration en Nitrate</em></td><td>inférieure à 50 mg/l</td></tr>'
+'<tr><td><em>Concentration en Nitrite</em></td><td>inférieure à 0,1 mg/l</td></tr>'
+'<tr><td><em>Concentration en Arsenic</em></td><td>inférieure à 0,01 mg/l</td></tr>'
+'<tr><td><em>Concentration en Fluorure</em></td><td>inférieure à 1,5 mg/l</td></tr>'
+'<tr><td>Comptage <em>E. Coli</em></td><td>0 UFC/100ml</td></tr>'
+'</tbody>'
+'</table>'
+'<a href="https://www.who.int/water_sanitation_health/dwq/gdwq3rev/fr/">OMS : Directives pour la qualité de l\'eau de boisson</a></details>'
+'</div>'

;
return div3;
}
omsLegend.addTo(map);





        
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
	//controlLayers.addOverlay(typePE, "Type de Point d'eau", "Analyse de l'eau");
});    

function creatAlias(prop){
	switch(prop) {
		case 'Souspref' :return 'Sous-Préfecture';
		case 'Zone' :return 'Zone';
		case 'Quartier' :return 'Nom';
		case 'Sous-quart' :return 'Nom du sous-quartier';
		case 'ID' :return 'Identifiant';
		case 'Responsabl' :return 'Responsable de la construction';
		case 'Construct' :return 'Année de Construction';
		case 'Emplacemen' :return 'Emplacement';
		case 'Relief' :return 'Type de relief';
		case 'Type' :return 'Type de point d\'eau';
		case 'Profondeur' :return 'Profondeur';
		case 'LvlWater' :return 'Niveau de l\'eau';
		case 'Margelle' :return 'Dispose d\'une margelle';
		case 'Dalle' :return 'Dispose d\'une dalle anti-bourbier';
		case 'Trottoir' :return 'Dispose d\'un trottoir';
		case 'Cloture' :return 'Dispose d\'une clôture';
		case 'Canal' :return 'Dispose d\'un canal de drainage';
		case 'Couvercle' :return 'Dispose d\'un couvercle adapté';
		case 'Superstruc' :return 'État général de la superstructure';
		case 'Exhaure' :return 'Mode d\'exhaure';
		case 'Disponibil' :return 'Disponibilité de l\eau toute l\'année';
		case 'tarissmt' :return 'Mois de tarissement';
		case 'Entretien' :return 'Est entretenu';
		case 'typEntreti' :return 'Type d\'entretien';
		case 'FreqPanne' :return 'Nombre de panne par ans';
		case 'TypPanne' :return 'Type de panne';
		case 'piecePanne' :return 'Disponibilité des pièces de rechange';
		case 'Responsa_1' :return 'Responsable de l\'entretien';
		case 'Variation' :return 'Évolution de la ressource';
		case 'acces' :return 'Accès';
		case 'tarif' :return 'Tarif';
		case 'polluti' :return 'Source de pollution à proximité';
		case 'descrPollu' :return 'Description de la source de pollution';
		case 'Cloture2' :return 'Absence de clôture';
		case 'Canal2' :return 'Absence de canal de draînage';
		case 'Stagn2' :return 'Présence d\'eau stagnante';
		case 'Dalle2' :return 'Absence de dalle anti-bourbier';
		case 'fissur2' :return 'Présence de fissures sur la superstructure';
		case 'Couvercle2' :return 'Absence de courvercle';
		case 'etanch2' :return 'Défaut d\'étanchéité sur les 3 premiers mètres';
		case 'hygien2' :return 'Problème d\'hygiène aux alentours';
		case 'entreti2' :return 'Mauvais entretien du matériel d\'exhaure';
		case 'niveau2' :return 'Score de vulnérabilité sanitaire';
		case 'Couleur' :return 'Couleur';
		case 'descrcolor' :return 'Description de l\'aspect';
		case 'gout' :return 'Goût';
		case 'descrgout' :return 'Description du Goût';
		case 'Odeur' :return 'Odeur';
		case 'descrodeur' :return 'Description de l\'odeur';
		case 'pH' :return 'pH';
		case 'Conductivi' :return 'Conductivité (µS/cm)';
		case 'tub' :return 'Turbidité (UTM)';
		case 'temp' :return 'Température (°C)';
		case 'chlorelib' :return 'Chlore Libre (mg/l)';
		case 'chloretot' :return 'Chlore total (mg/l)';
		case 'ammoniac' :return 'Ammoniac (mg/l)';
		case 'nitrate' :return 'Nitrate (mg/l)';
		case 'nitrite' :return 'Nitrite (mg/l)';
		case 'arsenic' :return 'Arsenic (mg/l)';
		case 'fluor' :return 'Fluorure (mg/l)';
		case 'ecoli' :return '<em>E.Coli</em> (UFC/100ml)';
		case 'remarqu' :return 'Remarque sur la qualité de l\'eau';
		case 'Latitude' :return 'Lattitude';
		case 'Longitude' :return 'Longitude';
		case 'type_1' :return 'Type de point d\'eau';
		case 'descr' :return 'Description';
		case '__Date de' :return 'Date des analyses';
		
		
		
		
		
	}
};
       
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
                        	
                        	
                        	 if (feature.properties[prop] !== null
                        	 && prop !== '__Prendre' 
                        	 && prop !== '__Prendr_1' 
                        	 && prop !== '__Prendr_2' 
                        	 && prop !== '__Prendr_3' 
                        	 && prop !== '___index' 
                        	 ) 
                        		{
                        			tableNew += "<tr><td><strong>"+creatAlias(prop)+" : </strong></td><td>"+feature.properties[prop]+"</td></tr>" ;
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

// Couleur en fonction de la norme OMS
	function getColorOMS (Field,minOMS,maxOMS){
	if (Field < minOMS == true) {return('red');}
	else if (Field <= maxOMS == true) {return('green');}
	else if (Field > maxOMS == true) {return('red');}
	else  {return('grey');}
	};  

//Couleur en fonction du score de vulnérabilité
function getColorVulnSan(score) {
	if (score<=2 == true){return ('green');}
	if (score<=5 == true){return ('orange');}
	if (score<=8 == true){return ('red');}
	if (score<=10 == true){return ('purple');}
	else {return ('grey');}
	
};

//couleur en fonction Oui ou Non
function getColorBool(b){
	switch(b) {
	case 'Oui': return 'red';
	case 'Non' : return 'Darkblue';
	}
}; 
 


 

//lecture de la base de donnée
$.getJSON(urlpointdeau,function(data){
	
	
	
	////Groupe des couche ANALYSE DE L'EAU
	//transformation de la base de donnée en couche (Layer)
	var chlorelib = L.geoJson(data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'marker2',fillColor:getColorOMS(feature.properties.chlorelib,0.5,5),radius:5, fillOpacity:.8, color:'black',weight:1});
		}
	}).on("click", cible);
//	.addTo(map);
	controlLayers.addOverlay(chlorelib, "Concentration en Chlore Libre", "<strong>Analyse de l'eau</strong>");
	
	
	//transformation de la base de donnée en couche (Layer)
	var chloretot = L.geoJson(data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'marker2',fillColor:getColorOMS(feature.properties.chloretot,0,5),radius:5, fillOpacity:.8, color:'black',weight:1});
		}
	}).on("click", cible);
//	.addTo(map);
	controlLayers.addOverlay(chloretot, "Concentration en Chlore total", "<strong>Analyse de l'eau</strong>");
	
	
	//transformation de la base de donnée en couche (Layer)
	var ammoniac = L.geoJson(data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'marker2',fillColor:getColorOMS(feature.properties.ammoniac,0,1),radius:5, fillOpacity:.8, color:'black',weight:1});
		}
	}).on("click", cible);
//	.addTo(map);
	controlLayers.addOverlay(ammoniac, "Pollution Ammoniac", "<strong>Analyse de l'eau</strong>");
	
	//transformation de la base de donnée en couche (Layer)
	var nitrate = L.geoJson(data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'marker2',fillColor:getColorOMS(feature.properties.nitrate,0,50),radius:5, fillOpacity:.8, color:'black',weight:1});
		}
	}).on("click", cible);
//	.addTo(map);
	controlLayers.addOverlay(nitrate, "Pollution Nitrate", "<strong>Analyse de l'eau</strong>");
	
	
	//transformation de la base de donnée en couche (Layer)
	var nitrite = L.geoJson(data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'marker2',fillColor:getColorOMS(feature.properties.nitrite,0,0.1),radius:5, fillOpacity:.8, color:'black',weight:1});
		}
	}).on("click", cible);
//	.addTo(map);
	controlLayers.addOverlay(nitrite, "Pollution Nitrite", "<strong>Analyse de l'eau</strong>");
	
	
		
	//transformation de la base de donnée en couche (Layer)
	var arsenic = L.geoJson(data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'marker2',fillColor:getColorOMS(feature.properties.arsenic,0,0.01),radius:5, fillOpacity:.8, color:'black',weight:1});
		}
	}).on("click", cible);
//	.addTo(map);
	controlLayers.addOverlay(arsenic, "Pollution Arsenic", "<strong>Analyse de l'eau</strong>");
	
	
	//transformation de la base de donnée en couche (Layer)
	var fluor = L.geoJson(data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'marker2',fillColor:getColorOMS(feature.properties.fluor,0,1),radius:5, fillOpacity:.8, color:'black',weight:1});
		}
	}).on("click", cible);
	//.addTo(map);
	controlLayers.addOverlay(fluor, "Pollution fluorure", "<strong>Analyse de l'eau</strong>");
	
	
	//transformation de la base de donnée en couche (Layer)
	var ecoli = L.geoJson(data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'marker2',fillColor:getColorOMS(feature.properties.ecoli,0,0),radius:5, fillOpacity:.8, color:'black',weight:1});
		}
	}).on("click", cible)
	.addTo(map);
	controlLayers.addOverlay(ecoli, "Contamination <em>E. Coli</em>", "<strong>Analyse de l'eau</strong>");
	
	////groupe de couche état du point d'eau
	var scoreVuln = L.geoJson(data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'fond',color:getColorVulnSan(feature.properties.niveau2),radius:6, fillOpacity:0, fillColor:'black',weight:4});
		}
	}).on("click", cible);
	scoreVuln.addTo(map);
	legendScoreVuln.addTo(map);
	
	scoreVuln.beforeAdd = function (map) {legendPollut.remove(map);};
	scoreVuln.beforeAdd = function (map) {legendScoreVuln.addTo(map);};
	controlLayers.addOverlay(scoreVuln, "Vulnérabilité Sanitaire", "<strong>Analyse du point d'eau</strong>");
	
	var Pollution = L.geoJson (data,{
		onEachFeature: oneachfeature,
		
		pointToLayer: function (feature,latlng){
			return L.circleMarker(latlng,{pane : 'fond',color:getColorBool(feature.properties.polluti),radius:6, fillOpacity:0, fillColor:'black',weight:4});
		}
		
	}).on("click", cible);
	Pollution.beforeAdd = function (map) {legendScoreVuln.remove(map);};
	Pollution.beforeAdd = function (map) {legendPollut.addTo(map);};
	controlLayers.addOverlay(Pollution, "Sources de pollution", "<strong>Analyse du point d'eau</strong>");
	
});


//création dune couche geoJSON qui appelle le fichier "agglo_Bouake.geojson"
$.getJSON(urlAggloBouake,function(data)
{
	var tacheUrbBouake = L.geoJson(data,{
		style: function (feature){return { weight : 1, color : 'purple',fillColor:'white',fillOpacity : 0,};},
	});
	tacheUrbBouake.addTo(map);
	
//	controlLayers.addOverlay(tacheUrbBouake,'Agglomération de Bouaké'
//	+'<table class="legendin">'
//	+'<tr>'
//	+'<td style="width:30px;border:1px solid purple;text-align:center;"></td>'
//	+'<td>Tache urbaine en 2018</td>'
//	+'</tr>'
//	+'</table>','<strong>Urbanisation</strong>');
}
);

$.getJSON(urllocalites,function(data)
{
	var localites= L.geoJson(data,{style: function(feature){return { color : 'red', weight : 1.5, fillColor : 'red', fillOpacity : .0, };},
	});

localites.addTo(map);
//controlLayers.addOverlay(localites, 'Quartier ou village analysés'
//+'<table class="legendin">'
//+'<tr><td style="background-color:white;height:10px;width:30px;opacity:.8;border:2px solid red;"></td><td>Localité diagnostiquée</td></tr>'
//+'</table>',"<strong>Enquête Urgence Eau</strong>");
});





