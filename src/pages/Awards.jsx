// Awards.jsx
import Award from '../components/Award';
import "../styles/index.css";

function Awards() {
  const awardsData = [
    { id: 1, name: 'Mexican Fiesta', title: 'Visited 5 Mexican restaurants', ifAchieved: false },
    { id: 2, name: 'Tom Yum Soup', title: 'Visited 5 Thai restaurants', ifAchieved: false },
    { id: 3, name: 'Sushi Samurai', title: 'Visited 5 Japanese restaurants', ifAchieved: true },
    { id: 4, name: 'Korean Bibimbap', title: 'Visited 5 Korean restaurants', ifAchieved: false },
    { id: 5, name: 'Flat White', title: 'Visited 5 Cafes', ifAchieved: true },
    { id: 6, name: 'Fortune Cookie', title: 'Visited 5 Chinese restaurants', ifAchieved: true },
    { id: 7, name: 'Buon Appetito', title: 'Visited 5 Italian restaurants', ifAchieved: false },
    { id: 8, name: 'Spice Seeker', title: 'Visited 5 Indian restaurants', ifAchieved: true },
    { id: 9, name: 'French Feast', title: 'Visited 5 French restaurants', ifAchieved: false },
    { id: 10, name: 'Souvlaki Story', title: 'Visited 5 Greek restaurants', ifAchieved: false },
    { id: 11, name: 'Bavarian Brewskis', title: 'Visited 5 German restaurants', ifAchieved: true },
    { id: 12, name: 'Turkish Delight', title: 'Visited 5 Turkish restaurants', ifAchieved: true },
    
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
