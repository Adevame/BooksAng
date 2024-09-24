import { Component, OnInit } from '@angular/core';
import Book from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {

    book!: Book;

    constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

    private subscribeBook(id: number): void 
    {
      this.bookService.getBook(id).subscribe(
        {
          next:data=>{
            this.book = data
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
        this.subscribeBook(+id)
        
      }else if (!id){
        this.router.navigate(['home'])
      }
    }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id') 
      this.setSubscribe(id)
    }
}


