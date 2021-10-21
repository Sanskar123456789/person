import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, timer} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PersonService } from '../../service/person.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../../model/person';
@Component({
  selector: 'person-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit,OnDestroy{

  $endsub : Subject<any> = new Subject();
  form!: FormGroup;
  constructor(private formbuilder: FormBuilder,private router:Router,private personService:PersonService,private messageService:MessageService,private route:ActivatedRoute) { }
  
  tag = 'Create';
  edit =false;
  person : Person={};
  ngOnDestroy() {
    this.$endsub.next();
    this.$endsub.complete();
  }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      Name:['',Validators.required],
      Age:['',Validators.required],
      Gender:['',Validators.required],
      Mobile:['',Validators.required]
    })

    this._checkEditmode();
  }

  private _checkEditmode(): void {
    if(this.route.snapshot.paramMap.get('id')){
      this.edit =true;
      this.tag = 'Update';
      const id = String(this.route.snapshot.paramMap.get('id'));
      this.personService.findperson(id).pipe(takeUntil(this.$endsub)).subscribe(person =>{
        this.person = person;
      })
      
      this.form.controls.Name.setValue(this.person.Name);
      this.form.controls.Age.setValue(this.person.Age);
      this.form.controls.Gender.setValue(this.person.Gender);
      this.form.controls.Mobile.setValue(this.person.Mobile);
      console.log(this.form.controls.Name.value);
    }
  }

  onSubmit(){
    if(this.form.invalid){
      return
    }else{
      const data ={
        Name:this.form.controls.Name.value,
        Age:this.form.controls.Age.value,
        Gender:this.form.controls.Gender.value,
        Mobile:this.form.controls.Mobile.value,
        _id:this.route.snapshot.paramMap.get('id')
      }     
      if(!this.edit){
        this.personService.postperson(data).pipe(takeUntil(this.$endsub)).subscribe(data=>{
          if(data.status){
            this.messageService.add({severity:'success', summary:'Success', detail:'User is added'});
          }else{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'User is not added'});
          }
        },(err)=>{
          console.log(err);
        })
      }else{
        this.personService.updateperson(data).pipe(takeUntil(this.$endsub)).subscribe(data=>{
          if(!data.error){
            this.messageService.add({severity:'success', summary:'Success', detail:'User is updated'});
          }else{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'User is not updated'});
          }
        },(err)=>{
          console.log(err);
        })
        timer(1000).toPromise().then(()=>{
          this.router.navigate(['/']);
        })
      }

    }
  }



}
