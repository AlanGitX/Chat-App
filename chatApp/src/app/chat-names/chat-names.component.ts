import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../servives/api.service';
import { BehaviorSubject } from 'rxjs';    


@Component({
  selector: 'app-chat-names',
  templateUrl: './chat-names.component.html',
  styleUrls: ['./chat-names.component.css'],
})
export class ChatNamesComponent implements OnInit {
  chatActivator: boolean = false;
  contacts: any = [];
  chatmsges: any = [];
  chatContent: any = [];
  changedContacts: any = [];
  activeno: number = 0;
  activename: string = '';
  activeimg: string = '';
  newNumber: number = 0;
  lastNumber: number = 0;

  searchTerm:string = ''
  currPh: string = JSON.parse(localStorage.getItem('phone') || '');
  constructor(private router: Router, private api: ApiService) {}
  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      alert('Login');
      this.router.navigateByUrl('');
    } else {
      this.api.getContacts().subscribe((result: any) => {
        console.log(result.Contact);
        this.contacts = result.Contact;
        this.contacts.forEach((element: any) => {
          if (element['phone'] == this.currPh) {
            console.log(this.currPh);
          } else {
            this.changedContacts.push(element);
          }
        });
        console.log(this.changedContacts);
      });

      setInterval(() => {
        this.getThechats(this.currPh, this.activeno);
      }, 2000);
    }
  }

  viewContactmsg(contact: any) {
    this.activeno = contact.phone;
    this.activename = contact.username;
    this.activeimg = contact.profilepic;
    this.chatActivator = true;
    //get data

    this.getdata(this.currPh, this.activeno);
  }

  msgclick() {
    let msgdata = (document.getElementById('messagebar') as HTMLInputElement)
      .value;
    console.log(msgdata);
    (document.getElementById('messagebar') as HTMLInputElement).value = '';
    this.api
      .updateChat(msgdata, this.currPh, this.activeno, 'to')
      .subscribe((result: any) => {
        console.log(result);
        this.getdata(this.currPh, this.activeno);
      });
    this.api
      .updateChat(msgdata, this.activeno, this.currPh, 'from')
      .subscribe((result: any) => {
        console.log(result);
      });
  }

  //get data

  getdata(phn: any, activeno: any) {
    this.chatContent = [];
    this.api.getChat(phn).subscribe((result: any) => {
      console.log(result);
      this.chatmsges = result.message.messages;
      console.log(this.chatmsges);

      this.chatmsges.forEach((element: any) => {
        if (element.phone == activeno) {
          this.chatContent.push(element);
        } else {
          console.log(element);
        }
      });
      console.log(this.chatContent);
    });
  }

  getThechats(phn: any, activeno: any) {
    let chatContent2: any = [];
    this.newNumber = 0;

    this.api.getChat(phn).subscribe((result: any) => {
      console.log(result);
      this.chatmsges = result.message.messages;

      this.chatmsges.forEach((element: any) => {
        if (element.phone == activeno) {
          chatContent2.push(element);
        }
      });

      if (this.chatContent.length < chatContent2.length) {
        this.chatContent = chatContent2;
      }
      console.log(chatContent2.length);
    });
  }



  search(event:any){
    this.searchTerm = event.target.value

    console.log(this.searchTerm);

    
    
  }
}
