import { Component, inject, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service.service';
import Author from '../../models/author.model';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterOutlet],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit {
  authors!: Author[];
  p: number = 1;
  total: number = 0;
  itemsPerPage: number = 3;
  private authService = inject(AuthService);

  constructor(private authorService: AuthorService, private router: Router){ }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
      this.total = data.length;
    })
  }

  trackByAuthorId(id: number, author: Author): number {
    return author.id;
  }

  deleteAuthor(id: number): void {
    this.authorService.deleteAuthor(id).subscribe({
      next: () => {
        this.authors = this.authors.filter(author => author.id !== id);
        this.total = this.authors.length;
      },
      error: error => {
        console.error('failed to delete', error);
      }
    });
  }

  retourBook(): void {
    this.router.navigate(['books'])
  }

  detailAuthor(author: Author): void {
    this.router.navigate(['authors', author.id]); 

  }

  updateAuthor(id: number): void {
    this.router.navigate(['updateAuthor', id]);
  }

  isHidden (): boolean {
    const token = this.authService.getToken();
    if(this.authService.isAdmin(JSON.stringify(token))){
      return true;
    } else {
      return false;
    }
  }
}
