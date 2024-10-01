import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { NotFoundComponent } from './commons/not-found/not-found.component';
import { BookComponent } from './components/book/book.component';
import { AuthorComponent } from './components/author/author.component';
import { AddBookComponent } from './components/forms/add-book/add-book.component';
import { AddAuthorComponent } from './components/forms/add-author/add-author.component';
import { UpdateAuthorComponent } from './components/forms/update-author/update-author.component';
import { UpdateBookComponent } from './components/forms/update-book/update-book.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [

    {path:"", redirectTo:"home", pathMatch:'full'},

    {path:"home", component:HomeComponent},
    {path:'not-found', component:NotFoundComponent},

    {path:"authors", component:AuthorsComponent},
    {path:"authors/:id", component:AuthorComponent},
    {path:"addAuthor", component:AddAuthorComponent, canActivate: [authGuard]},
    {path:"updateAuthor/:id", component:UpdateAuthorComponent, canActivate: [authGuard]},
    
    {path:"books", component:BooksComponent},
    {path:"books/:id", component:BookComponent},
    {path:"addBook", component:AddBookComponent, canActivate: [authGuard]},
    {path:"updateBook/:id", component:UpdateBookComponent, canActivate: [authGuard]},

    {path:"login", component:LoginComponent},
    {path:"signup", component:SignupComponent},
    {path:"admin", component:AdminComponent, canActivate: [authGuard]},


    {path:"**", component:NotFoundComponent}
];
