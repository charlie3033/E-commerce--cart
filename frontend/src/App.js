import './App.css';
import {CartProvider} from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import "./styles/dark.css";


function App() {
  return (
    <CartProvider>  
      <div style={{ maxWidth: 1000, margin: '24px auto', padding: 12 }}>
        <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h1>E Commerce — Cart</h1>
        </header>
        <main style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 20 }}>
          <div>
            <h2>Products</h2>
            <ProductList />
          </div>
          <aside>
            <Cart />
          </aside>
        </main>
      </div>
    </CartProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
