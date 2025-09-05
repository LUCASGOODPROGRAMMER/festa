import partyFetch from "../axios/config";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Home.css"

const Home = () => {
  const [parties, setParties] = useState(null);

  useEffect(() => {
    const loadParties = async () => {
      const response = await partyFetch.get("/parties");
      setParties(response.data);
    };

    loadParties();
  }, []);

  if (!parties) return <p>loading...</p>;

  return (
    <>
      <div className="home-container">
        <h1>minhas waifus</h1>
        <div className="parties-container">
          {parties && parties.length > 0 ? (
            parties.map((party) => (
              <div className="party" key={party._id}>
                <img src={party.image} alt="logo da festa" />
                <h3>{party.title}</h3>
                <Link to={`/party/${party._id}`} className="btn-secondary">sobre</Link>
              </div>
            ))
          ) : (
            <p>nenhuma waifu foi cadastrada</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
