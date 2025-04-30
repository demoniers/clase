const Home = () => {
    return (
        <div>
            <h1>Interfaz para conectar con la API de Gemini</h1>
            <p>Introduce tu consulta y obtén una respuesta de la API.</p>
            
      <div class="sidebar">
        <h2>Menú</h2>
        <a href="/">Inicio</a>
        <a href="/chat">Chatea</a>
        <a href="/graph">Graficos</a>
        <div class="section">
          <a href="#settings">Ajustes</a>
          <a href="#logout">Cerrar sesión</a> 
        </div>
      </div>
        </div>
    );
};

export default Home;
