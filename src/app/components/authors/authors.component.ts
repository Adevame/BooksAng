import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service.service';
import Author from '../../models/author.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit {
  authors!: Author[];

  constructor(private authorService: AuthorService){ }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((data) => {
      console.log(data);
      this.authors = data;
    })
  }

  trackByAuthorId(id: number, author: Author): number {
    return author.id;
  }

}
