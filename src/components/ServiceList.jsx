import React from "react";
import { Form } from "react-bootstrap";

const ServiceList = ({ services, selected = new Set(), onChange }) => {
  const handleToggle = (index) => {
    const updated = new Set(selected);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    onChange(updated);
  };

  return (
    <div>
      {services.map((s, idx) => (
        <Form.Check
          key={idx}
          type="checkbox"
          id={`serv-${idx}`}
          label={`${s.nombre} — $${s.precio}`}
          checked={selected.has(idx)}
          onChange={() => handleToggle(idx)}
          className="servicio-check"
        />
      ))}
    </div>
  );
};

export default ServiceList;
