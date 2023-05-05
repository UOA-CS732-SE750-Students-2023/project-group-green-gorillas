import { useState } from 'react';

type FormProps = {
  onSubmit: (name: string) => void;
};

export default function Form({ onSubmit }: FormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
