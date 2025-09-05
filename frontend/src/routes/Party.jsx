import partyFetch from "../axios/config";
import useToast from "../hook/useToast";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "./Party.css";

const Party = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [party, setParty] = useState(null);

  // load party
  useEffect(() => {
    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);
      setParty(res.data);
    };
    loadParty();
  }, []);

  // delete this party
  const handleDelete = async () => {
    try {
      const res = await partyFetch.delete(`/parties/${id}`);
      if (res.status === 200) {
        navigate("/");
        useToast(res.data.msg, "success");
      }
    } catch (error) {
      useToast(error.response.data.msg);
    }
  };

  if (!party) return <p>carregando</p>;

  return (
    <div className="party-container">
      <h1>{party.title}</h1>
      <img src={party.image} alt="" />
      <div className="config-container">
        <Link className="btn-edit" to={`/party/edit/${party._id}`}>
          Editar
        </Link>
        <button className="btn-delete" onClick={handleDelete}>
          Deletar
        </button>
      </div>
      <p>Orçamento: R${party.budget}</p>
      <h3>Serviços contratados:</h3>
      <div className="service-container">
        {party.services.map((service) => (
          <div className="my-services" key={service._id}>
            <img src={service.image} alt={service.name} />
            <p>{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Party;
