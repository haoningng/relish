// Awards.jsx
import Award from '../components/Award';
import "../styles/index.css";

function Awards() {
  const awardsData = [
    { id: 1, name: 'Neato Burrito', title: 'Visited 5 Mexican restaurants', ifAchieved: false },
    { id: 2, name: 'Thai-riffic!', title: 'Visited 5 Thai restaurants', ifAchieved: false },
    { id: 3, name: 'Miso Happy', title: 'Visited 5 Japanese restaurants', ifAchieved: true },
    { id: 4, name: 'Jjigae All The Way', title: 'Visited 5 Korean restaurants', ifAchieved: false },
    { id: 5, name: 'Espresso Patronum', title: 'Visited 5 Cafes', ifAchieved: true },
    { id: 6, name: 'Crazy A-Bao You', title: 'Visited 5 Chinese restaurants', ifAchieved: true },
    { id: 7, name: 'I Am Pho Real', title: 'Visited 5 Vietnamese restaurants', ifAchieved: true },
    { id: 8, name: 'Spice Spice Baby', title: 'Visited 5 Indian restaurants', ifAchieved: true },
    { id: 9, name: 'It\'s Cwasont', title: 'Visited 5 French restaurants', ifAchieved: false },
    { id: 10, name: 'Feta Late Than Never', title: 'Visited 5 Greek restaurants', ifAchieved: false },
    { id: 11, name: 'Avengers A-Sambal', title: 'Visited 5 Malaysian restaurants', ifAchieved: true },
    { id: 12, name: 'Pasta-La-Vista Baby', title: 'Visited 5 Italian restaurants', ifAchieved: false },
    
  ];

  return (
    <div className="awards-page">
      <div className="awards-title">
        <h1>Awards</h1>
      </div>
      <div className="awards-container">
        {awardsData.map((award) => (
          <Award key={award.id} name={award.name} title={award.title} ifAchieved={award.ifAchieved} />
        ))}
      </div>
    </div>
  );    
}

export default Awards;
