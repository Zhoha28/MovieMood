import React, {useState} from 'react';
import Search from "./components/Search.jsx";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <main>
            <div className="pattern" />
            <div className="wrapper" >
                <header>
                    <img src='../hero-img.png' alt="Hero Banner" />
                    <h1 className="title">Movies <span className="text-gradient"> Tailored </span>For You!!</h1>
                    <p className="text-white text-center">
                       <Search searchTerm = {searchTerm} setSearchTerm={setSearchTerm} />
                    </p>

                </header>
            </div>
        </main>
    );
};

export default App;