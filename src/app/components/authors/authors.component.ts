import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service.service';
import Author from '../../models/author.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit {
  authors!: Author[];

  constructor(private authorService: AuthorService, private router: Router){ }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((data) => {
      console.log(data);
      this.authors = data;
    })
  }

  trackByAuthorId(id: number, author: Author): number {
    return author.id;
  }

  deleteAuthor(id: number): void {
    this.authorService.deleteAuthor(id).subscribe({
      next: () => {
        this.authors = this.authors.filter(author => author.id !== id);
        this.router.navigate([this.router.url]);
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
}
