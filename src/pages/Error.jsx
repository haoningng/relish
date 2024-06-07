import { useOutletContext, useNavigate } from "react-router-dom";
import "../styles/index.css";

function NotFound() {
  return (
      <div>
        <h1>
              404
          </h1>
          <h1 style={{ color: "green" }}>
              Whoops... Chef Not Found!
          </h1>
      </div>
  );
}

export default NotFound;