import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Route, Router } from '@angular/router'

import { CategoryService } from '../shared/category.service';
import { switchMap } from "rxjs/operators";
import swal from 'sweetalert';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string; // declarar se esta editando ou cadastrando
  categoryForm: FormGroup;
  pageTitle: string; // Titulo quando ouver a validação de edição ou cadastro
  serverErrorMessagens: string[] = null; // mensagens retornadas do servior
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(private categoryService : CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private formBiulder : FormBuilder,
             ) { }

  ngOnInit() {
    this.setcurrentAction();
    this.buildCategoryForm();
    this.loadCategory
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitCategory(){
    this.submittingForm = true;
    if(this.currentAction == 'new'){
      this.createCategory();
    }else{
    
    }
  }

  //Metodos Privados

  private setcurrentAction(){
    if(this.route.snapshot.url[0].path == "new"){
      this.currentAction = "new"
    }else{
      this.currentAction = "edit"
    }
  }

  private buildCategoryForm(){
    this.categoryForm = this.formBiulder.group({
      id: [null],
      nome:[null,[Validators.required, Validators.minLength(2)]],
      descricao:[null]
    })
  }

  private loadCategory(){
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      ).subscribe(
        (category) => {
          this.category = category
          this.categoryForm.patchValue(category)//bins de categoria
        }
      )
    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = "Cadatro de nova Categoria"
    }else{
      const categoryName = this.category.nome || ""
      this.pageTitle = "Editando Categoria :"+ categoryName;
    }
  }

  private createCategory(category : Category){
   // const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category).subscribe(
      category => this.actionsForSucess(category),
     // error => this.actionsForError(error)
    )
  }

  private actionsForSucess(category: Category){


    //redireciona a página ao form edit pelo novo id
    
  }

  /*private actionsForError(error){

    this.submittingForm = false;
    if(error.status === 422){
      this.serverErrorMessagens = JSON.parse(error._body).erros;
      ["Nome já existe", "O email não pode ficar em branco"]
    }else{
      this.serverErrorMessagens = ["Falha na comunicação com o servidor. Por favor tente mais tarde"]
    }
  }*/
}
