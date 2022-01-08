/*hooks*/
import { useEffect, useState } from 'react';
import './filme-info.css'
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Filme(){
  const { id } = useParams();
  const history = useHistory();

  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  

  /*vou criar meu hook*/
  /*quando a nossa aplicação abrir ele vai execultar o useEffect => hook*/
  //#region useEffect
  useEffect(()=>{

    async function loadFilme(){
        const response = await api.get(`r-api/?api=filmes/${id}`);
        
        if(response.data.length === 0){
          //tentou acessar com um ID que não existe, navego ele para home
          //quando dou um replace eu troco a rota dele e encaminho para home.
          history.replace('/');
          return;
        }
        //agora vindo inoformação do cons response ai eu pulo o if e faço o carreagamento do filme
        setFilme(response.data);
        setLoading(false);
    }
    /*caso não coloque o loadFilme fora das chaves ele da erro*/
    loadFilme();

    return () => {
      console.log('COMPONENTE DESMONTADO')
    }
    
  }, [history, id]);
//#endregion
  function salvarFilme(){
    /*vou no meu localStorage com o getItem e passo palavra chave (filmes)*/
    /*ele esta vindo em forma de texto, vou passar pa JSON na proxima linha*/
    const minhaLista = localStorage.getItem('filmes');
    //neste momento eu estou transformando o que esta vindo do meu getItem(string) para JSON atraves do (parse)
    //sacada => coloco um array vazio => entaão ele verifica JSON se tem informação ele passa => e se o array 
    //estiver vazio ele tambem inseri na variavel (filmesSalvos)
    let filmesSalvos = JSON.parse(minhaLista) || [];

    //se tiver um filme salvo com esse mesmo id precisa ignorar
    //esta função do JavaScript vai percorres o que tem dentro de (filmesSalvos e verificar se tem pelo meno 1 igual)
    //Lembrando que o (some do js da um retorno na variavel de um boolean então => ele vai colocar de da const hasFilme => true ou false)
      const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)
      
      /*estou verificando no localStorange se este filme já existir eu não armazeno e dou esta msg no alert e o return*/
      if(hasFilme){
        alert('Você já possui esse filme salvo.')
        return;
      }
      /*caso não exista o filme no localStorage ai eu adiciono.*/
      /*neste momento eu estou adicionando um novo filme dentro do meu localStorage usando o useState que foi declarado lá no inicio 
      e que recebe os nossos filme*/
      filmesSalvos.push(filme);
      /*agora vou salvar no localSotrage com os dados alterados atraves do setItem => passo a chave que eu criei logo acima
       dou virgula e passo que eu quero realmente salvar => ele esta vindo em forma de array [] filmesSalvos, 
       NÂO POSSO SALVAR COMO ARRAY, => então dou um  JSON.stringify(filmesSalvos)) para salvar como TEXTO*/
      localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
      alert('Filme salvo com sucesso!');
  }

  if(loading){
      return(
          <div className="filme-info">
            <h1>Carregando seu filme</h1>
          </div>
      )
  }

    return(
        <div className="filme-info">
         <h1> {filme.nome} </h1>
         <img src={filme.foto} alt={filme.nome} />

         <h3>Sinopse</h3>
         {filme.sinopse}

         <div className="botoes">
           {/*armazenando no localStorage*/}
            <button onClick={ salvarFilme } >Salvar</button>

            <button>
              <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                Trailer
              </a>
            </button>
         </div>
        </div>
    )   
}