// Awards.jsx
import Award from '../components/Award';
import "../styles/index.css";

function Awards() {
  const awardsData = [
    { id: 1, name: 'Mexican Fiesta', title: 'Visited 5 Mexican restaurants' },
    { id: 2, name: 'Tom Yum Soup', title: 'Visited 5 Thai restaurants' },
    { id: 3, name: 'Sushi Samurai', title: 'Visited 5 Japanese restaurants' },
    { id: 4, name: 'Korean Bibimbap', title: 'Visited 5 Korean restaurants' },
    { id: 5, name: 'Flat White', title: 'Visited 5 Cafes', },
    { id: 6, name: 'Fortune Cookie', title: 'Visited 5 Chinese restaurants' },
    { id: 7, name: 'Buon Appetito', title: 'Visited 5 Italian restaurants' },
    { id: 8, name: 'Spice Seeker', title: 'Visited 5 Indian restaurants' },
    { id: 9, name: 'French Feast', title: 'Visited 5 French restaurants' },
    { id: 10, name: 'Souvlaki Story', title: 'Visited 5 Greek restaurants' },
    { id: 11, name: 'Bavarian Brewskis', title: 'Visited 5 German restaurants', },
    { id: 12, name: 'Turkish Delight', title: 'Visited 5 Turkish restaurants' },
    
  ];

  return (
    <div className="awards-page">
      <div className="awards-title">
        <h1>Awards</h1>
      </div>
      <div className="awards-container">
        {awardsData.map((award) => (
          <Award key={award.id} name={award.name} title={award.title} />
        ))}
      </div>
    </div>
  );    
}

export default Awards;
