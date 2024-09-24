import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { NotFoundComponent } from './commons/not-found/not-found.component';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';

export const routes: Routes = [

    {path:"", redirectTo:"home", pathMatch:'full'},

    {path:"home", component:HomeComponent},
    {path:'not-found', component:NotFoundComponent},

    {path:"authors", component:AuthorsComponent},
    {path:"authors/:id", component:AuthorComponent},
    
    {path:"books", component:BooksComponent},
    {path:"books/:id", component:BookComponent},

    {path:"**", component:NotFoundComponent}
];
