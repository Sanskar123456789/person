import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Person } from '../../model/person';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'person-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy {

  person : Person[] = [];
  $endsub: Subject<any> = new Subject();
  constructor(private personService: PersonService,private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
    this._getPersonList();
  }

  ngOnDestroy(){
    this.$endsub.next();
    this.$endsub.complete();
  }

  private _getPersonList(){
    
    this.personService.getperson().pipe(takeUntil(this.$endsub)).subscribe(person => {
      this.person = person;
    },(err)=>{
      console.log(err);
    })
  }

  updateperson(person:any){
    localStorage.setItem('person', person);
    this.router.navigate([`update/${person._id}`]);
  }

  deleteperson(person:any){
    this.personService.deleteperson(person._id).pipe(takeUntil(this.$endsub)).subscribe(()=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'User is Deleted'});
    },(err)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: `${err}`});
    })
    timer(1000).toPromise().then(() => {
      this._getPersonList();
    })
  }

}
