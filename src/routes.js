import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from './pages/Home';



const Routes = () => {
    return(
       <BrowserRouter>
       <Header/>
       {/*Switch é um componente por pagina*/}
         <Switch>
             {/* exact => só chama quando cair exatamente na rota home*/}
             <Route exact path="/" component={Home} />
         </Switch>
       </BrowserRouter> 
    )
}
export default Routes