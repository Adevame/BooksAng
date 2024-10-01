import { Component } from '@angular/core';
import Author, { AuthorUpdate } from '../../../models/author.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../../../services/author.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsComponent } from '../../authors/authors.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-author',
  standalone: true,
  imports: [AuthorsComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './update-author.component.html',
  styleUrl: './update-author.component.css'
})
export class UpdateAuthorComponent {
  author!: Author;
  updateAuthorForm: FormGroup;
  submitted = false;
  message = false;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router) {
      this.updateAuthorForm = this.fb.group({
        firstName: ['', [Validators.minLength(3)]],
        lastName: ['', [Validators.minLength(3)]],
      });
    }
  ngOnInit(): void {
    const authorId = this.route.snapshot.paramMap.get('id')
    if (authorId) {
      this.authorService.getAuthor(+authorId).subscribe({
        next: (author) => {
          this.author = author;
          this.updateAuthorForm.patchValue({
            firstName: author.firstName,
            lastName: author.lastName,
          });
        },
        error: (error) => {
          console.error(error);
          alert('Auteur non trouvé');
        }
      });
    }
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.updateAuthorForm.valid) {
      const authorData: AuthorUpdate = {
        firstName: this.updateAuthorForm.get('firstName')?.value || this.author.firstName,
        lastName: this.updateAuthorForm.get('lastName')?.value || this.author.lastName,
      };
      const updatedAuthor = { ...authorData, id: this.author.id };
      this.authorService.updateAuthor(updatedAuthor).subscribe({
        next: () => {
          this.message = true;
          this.updateAuthorForm.reset();
          alert('Auteur mis à jour');
          this.router.navigate(['authors']);
        },
        error: () => {
          alert('Echec de mise à jour de l\'auteur');
        }
      });
    }
  }  
}
