import { Component } from '@angular/core';
import Author from '../../models/author.model';
import { AuthorService } from '../../services/author.service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {

  author!: Author;

    constructor(private authorService: AuthorService, private route: ActivatedRoute, private router: Router) { }

    private subscribeAuthor(id: number): void 
    {
      this.authorService.getAuthor(id).subscribe(
        {
          next:data=>{
            this.author = data
            console.log(data);
            
          },
          error: error => { 
            if (error) {            
              this.router.navigateByUrl("/not-found")
            }
          }
        }
      )
    }

    private setSubscribe(id: string | null){
      if (id) {
        this.subscribeAuthor(+id)
        
      }else if (!id){
        this.router.navigate(['home'])
      }
    }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id') 
      this.setSubscribe(id)
    }

    retourAuthor(): void {
      this.router.navigate(['authors']);
    }
}
