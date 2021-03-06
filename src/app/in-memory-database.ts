import {InMemoryDbService} from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.model";

export class InMemoryDataBase implements InMemoryDbService{
    createDb(){
        const categories:Category[] = [
            {id:1, nome:"Lazer", descricao:"Cinema, Parque, Praia"},
            {id:2, nome:"Saúde", descricao:"Plano de Saúde e Remédios"},
            {id:3, nome:"Moradia", descricao:"Pagamentos de Contas de casa"},
            {id:4, nome:"Sálario", descricao:"Recebimento de salario"},
        ];
        
        return {categories};
    }
}