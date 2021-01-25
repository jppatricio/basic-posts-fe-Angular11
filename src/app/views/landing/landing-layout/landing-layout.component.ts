import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Posts } from 'src/app/models/posts';
import { Users } from 'src/app/models/users';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss']
})
export class LandingLayoutComponent implements OnInit {

  users: Array<Users> = [] // Obtain all users on GET req
  posts: Array<Posts> = [] // for pagination issues
  allPosts: Array<Posts> = []// Obtain all posts on GET req
  currentShowingText = "All posts" // Upper text to show currently showing

  settingsIsVisible = false // Manage ciew changes for smaller wscreens
  usersIsVisible = false

  activePage = 1
  filteredId = 0 // Check user id filtering

  noSort = false

  subscriptions: Array<Subscription> = [] // Save all subscriptions here for later destruction

  constructor(private api: ApiService) { 

  }

  ngOnInit(): void {
    // Check window size for mobile view
    if (window.innerWidth > 700) {
      this.settingsIsVisible = false
      this.usersIsVisible = false
    }
    else{
      this.settingsIsVisible = true
      this.usersIsVisible = true
    }
    //---------------------------

    // GET POSTS AND USERS - add subs to subscription array for later garbage collection
    this.subscriptions.push(this.api.getPosts().subscribe(list => {
      this.posts = this.allPosts = list
    }))


    this.subscriptions.push(this.api.getUsers().subscribe(list => {
      this.users = list
    }))
    //--------------------------------------
  }

  // Check Window resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(window.innerWidth);
    
    if (window.innerWidth > 700) {
      this.settingsIsVisible = false
      this.usersIsVisible = false
    }
    else{
      this.settingsIsVisible = true
      this.usersIsVisible = true
    }
  }
  
  // Unsubscribe on destroy DOM
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe)
  }

  // /tooglers
  toggleSettings() {
    this.settingsIsVisible = !this.settingsIsVisible
  }
  toggleUsers() {
    this.usersIsVisible = !this.usersIsVisible
  }

  //Event listeners 

  filterChange(id: number) { // When a user is selected
    this.filteredId = id;

    // Retrieve original posts
    this.posts = this.allPosts

    // Check if there is a filter over a user
    if (id !== 0) {
      this.noSort = true
      this.activePage = 1

      // Filter posts
      this.posts = this.posts.filter(v => {
        if (v.userId === this.filteredId) {
          return v
        }
      })
      this.currentShowingText = `Posts from ${this.users.find(u => { if (u.id === id) return u }).username}`
    }
    //Show all posts
    else {
      this.noSort = false
      this.posts = this.allPosts
      this.currentShowingText = `All posts`

    }
  }
// Make sort on ascending or descending
  onSortChange(ascending: boolean) {
    if (ascending) this.posts.sort((a, b) => a.userId - b.userId)
    else this.posts.sort((a, b) => b.userId - a.userId)
  }
// Updtae current page
  onPageChange(page: number) {
    this.activePage = page;
  }

}
