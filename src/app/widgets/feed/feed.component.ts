import { Component, Input, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  // Inputs
  @Input() users : Array<Users> = []
  @Input() posts: Array<Posts> = []
  @Input()filteredId = 0
  @Input()activePage = 1

  allPosts = []

  constructor() {
  }

  ngOnInit(): void {
  }

  //GET USER INFO FROM A POST USING USERID
  getUsername(id : number) : string{
    let user : Users = this.findUserById(id)
    return user? user.username.toString() : ""
  }
  getLocation(id : number) : string{
    let user : Users = this.findUserById(id)
    return user? user.address.city.toString() : ""
  }
  getEmail(id : number) : string{
    let user : Users = this.findUserById(id)
    return user? user.email.toString() : ""
  }
  getSrc(id : number): string{
    return `../../../assets/img/dummies/image-placeholder-${id}.png`
  }

  findUserById(id : number): Users{
    let user : Users = this.users.find(s => { if(s.id === id) return s})
    return user;
  }

}
