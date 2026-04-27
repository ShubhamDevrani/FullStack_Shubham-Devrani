const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement} style={{ margin: "0 10px" }}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Counter />);
