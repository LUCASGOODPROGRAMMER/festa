import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import partyFetch from "../axios/config";
import useToast from "../hook/useToast";

const EditParty = () => {
  const [party, setParty] = useState(null);
  const [partyServices, setPartyServices] = useState([]);
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadParty = async () => {
      const response = await partyFetch.get(`/parties/${id}`);
      setParty(response.data);
      setPartyServices(response.data.services); // já marca os serviços escolhidos
    };

    const loadServices = async () => {
      const response = await partyFetch.get("/services");
      setServices(response.data);
    };

    loadParty();
    loadServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParty({
      ...party,
      [name]: value,
    });
  };

  const handleServiceChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const selectedService = services.find((service) => service._id === value);

    if (checked) {
      setPartyServices((prev) => [...prev, selectedService]);
    } else {
      setPartyServices((prev) => prev.filter((s) => s._id !== value));
    }
  };

  const updateParty = async (e) => {
    e.preventDefault();
    try {
      const newParty = {
        ...party,
        services: partyServices,
      };

      const res = await partyFetch.put(`/parties/${id}`, newParty);

      if (res.status === 200) {
        useToast(res.data.msg, "success");
        navigate(`/party/${id}`);
      }
    } catch (error) {
      useToast(error.response?.data?.msg || "Erro ao atualizar a festa", "error");
    }
  };

  if (!party) return <p>Carregando...</p>;

  return (
    <div className="form-page">
      <h2>Editando: {party.title}</h2>
      <form onSubmit={updateParty}>
        <label>
          <span>Nome da festa:</span>
          <input
            type="text"
            name="title"
            value={party.title}
            onChange={handleChange}
            placeholder="Seja criativo..."
            required
          />
        </label>
        <label>
          <span>Anfitrião:</span>
          <input
            type="text"
            name="author"
            value={party.author}
            onChange={handleChange}
            placeholder="Quem vai dar a festa?"
            required
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            name="description"
            value={party.description}
            onChange={handleChange}
            placeholder="Conte mais sobre a festa"
            required
          />
        </label>
        <label>
          <span>Orçamento:</span>
          <input
            type="number"
            name="budget"
            value={party.budget}
            onChange={handleChange}
            placeholder="Limite de preço da festa"
            required
          />
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type="text"
            name="image"
            value={party.image}
            onChange={handleChange}
            placeholder="Insira a URL de uma imagem"
            required
          />
        </label>
        <div>
          <h2>Escolha os serviços</h2>
          <div className="services-container">
            {services.length === 0 && <p>Buscando serviços...</p>}
            {services.length > 0 &&
              services.map((service) => (
                <div className="service" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">R${service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      checked={partyServices.some((s) => s._id === service._id)}
                      onChange={handleServiceChange}
                    />
                    <p>Deseja esse serviço?</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Atualizar Festa" className="btn" />
      </form>
    </div>
  );
};

export default EditParty;
