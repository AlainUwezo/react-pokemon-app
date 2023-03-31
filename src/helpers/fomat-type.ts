const formatType = (type: string): string => {
    let color: string;
   
    switch (type) {
      case 'Feu': 
        color = 'bg-red-500'; 
        break; 
      case 'Eau': 
        color = 'bg-blue-500'; 
        break; 
      case 'Plante': 
        color = 'bg-green-500'; 
        break; 
      case 'Insecte': 
        color = 'bg-gray-500'; 
        break; 
      case 'Normal': 
        color = 'bg-gray-500'; 
        break; 
      case 'Vol': 
        color = 'bg-blue-200'; 
        break; 
      case 'Poison': 
        color = 'bg-purple-900'; 
        break; 
      case 'Fée': 
        color = 'bg-pink-400'; 
        break; 
      case 'Psy': 
        color = 'ng-purple-600'; 
        break; 
      case 'Electrik': 
        color = 'bg-lime-400'; 
        break; 
      case 'Combat': 
        color = 'bg-orange-900'; 
        break; 
      default: 
        color = 'bg-gray-100'; 
        break; 
    }
   
    return `px-3 rounded-lg ${color}`;
  }
 

  export default formatType;