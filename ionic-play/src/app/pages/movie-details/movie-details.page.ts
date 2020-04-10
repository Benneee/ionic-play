import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  information = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.loadingCtrl
      .create({
        message: 'Loading details',
      })
      .then((loader) => {
        loader.present();
        this.movieService.getDetails(id).subscribe((result) => {
          this.information = result;
          loader.dismiss();
        });
      });
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }
}
