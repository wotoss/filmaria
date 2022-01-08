import { useEffect, useState } from 'react';
import './home.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Home(){
/*criar um states para armazenar os filmes que pegarmos da url*/
const [filmes, setFilmes] = useState([]);

/*useEffect => é o nosso cliclo de vida*/
useEffect(() => {
    async function loadFilmes(){
        /*lembrando que api já traz a baseUrl get esta juntando com o restante que estamos passando => (('r-api/?api=filmes'))*/
        const response = await api.get('r-api/?api=filmes')
        /*estamos passando await como a requisição é assincrona ele esta dizendo => await => espera pra mim */
        //console.log(response.data);
        /*neste momento eu estou passando dentro do meu setFilmes que esta lá na constant[] á minha lista de todos os filmes*/
        setFilmes(response.data);
     }
     loadFilmes();
}, []);

    return(
      <div className="container">
       <div className="lista-filmes">
         {filmes.map((filme)=>{
           return(
             <article key={filme.id}>
                 <strong>{filme.nome}</strong>
                 <img src={filme.foto} alt={filme.nome} />
                 <Link to={`/filme/${filme.id}`}>Acessar</Link>
             </article>
           )
         })}

       </div>
      </div>
    );
  }