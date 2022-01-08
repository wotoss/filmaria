import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from './pages/Home';
import Filme from "./pages/Filme";



const Routes = () => {
    return(
       <BrowserRouter>
       <Header/>
       {/*Switch é um componente por pagina*/}
         <Switch>
             {/* exact => só chama quando cair exatamente na rota home*/}
             <Route exact path="/" component={Home} />
             <Route exact path="/filme/:id" component={Filme} />
         </Switch>
       </BrowserRouter> 
    )
}
export default Routes