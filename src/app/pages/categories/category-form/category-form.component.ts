import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Route, Router } from '@angular/router'

import { CategoryService } from '../shared/category.service';
import { switchMap } from "rxjs/operators";
import toastr from "toaster";
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
              private formBiulder : FormBuilder) { }

  ngOnInit() {
    this.setcurrentAction();
    this.buildCategoryForm();
    this.loadCategory
  }

  /*ngAfterContentChecked(){
    this.setPageTitle();
  }*/

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
}
