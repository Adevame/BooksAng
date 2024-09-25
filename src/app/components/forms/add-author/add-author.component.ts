import { Component } from '@angular/core';
import Author, { AuthorCreate } from '../../../models/author.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../../services/author.service.service';
import { Router } from '@angular/router';
import { AuthorComponent } from '../../author/author.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [AuthorComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent {
  author!: Author;
  createAuthorForm: FormGroup;
  submitted = false;
  message = false;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router,
  ) {
    this.createAuthorForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.createAuthorForm.valid) {
      const authorId = this.createAuthorForm.get('authorId')?.value;
        const authorData: AuthorCreate = {
          firstName: this.createAuthorForm.get('firstName')?.value,
          lastName: this.createAuthorForm.get('lastName')?.value,
        };
        this.authorService.createAuthor(authorData).subscribe({
          next: () => {
            this.message = true;
            this.createAuthorForm.reset();
            alert('Auteur créé');
            this.router.navigate(['authors']);
          },
          error: () => {
            alert('Echec de création de l\'auteur');
          }
      });
    }
  }

  public get firstName(): string {
    return this.createAuthorForm.get('firstName')?.value;
  }

  public get lastName(): string {
    return this.createAuthorForm.get('lastName')?.value;
  }
}
