import {useState} from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.post(
        'https://reqres.in/api/users',
        {name: 'Sara Connor', job: 'tintin-tin-tintiin'},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data, null, 4));

      setData(data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    <div>
      {err && <h2>{err}</h2>}

      <button onClick={handleClick}>Make request</button>

      {isLoading && <h2>Loading...</h2>}

      {data && (
        <div>
          <h2>Name: {data.name}</h2>
          <h2>Job: {data.job}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
