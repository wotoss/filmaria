import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from './pages/Home';
import Filme from "./pages/Filme";
//1 - componente Favoritos => Já este outro é o caminho da pasta =>./pages/Favoritos
import Favoritos from "./pages/Favoritos";



const Routes = () => {
    return(
       <BrowserRouter>
       <Header/>
       {/*Switch é um componente por pagina*/}
         <Switch>
             {/* exact => só chama quando cair exatamente na rota home*/}
             <Route exact path="/" component={Home} />
             <Route exact path="/filme/:id" component={Filme} />
             {/*quero que ele acesse /favoritos => quando eu passo exact ele acessa exatamente esta pagina => 
             depois vai renderizar o componente Favoritos*/}
             <Route exact path="/favoritos" component={Favoritos} />
         </Switch>
       </BrowserRouter> 
    )
}
export default Routes