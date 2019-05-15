<script>
 function initialize() {
	
// création de la carte et paramétrage général : centre et niveau de zoom
        var map = L.map('mapid1').setView([7.7, -5.0], 11);
        
        // Fonds de carte				
		 
		// création d'une couche "HumanitarianLayer"
        var HumanitarianLayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: 'Données © <a href="http://urgenceeau.com/urgence-eau-cote-divoire-ueci/">Urgence Eaux Côte d\'Ivoire</a> | Fond de carte © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        });
		// la couche "HumanitarianLayer" est ajoutée à la carte		
        map.addLayer(HumanitarianLayer);
        
    
		}
</script>